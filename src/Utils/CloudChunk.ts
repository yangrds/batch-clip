import axios from "axios";
import BMF from 'browser-md5-file';
import { uuid, renderSize, Percentage } from "./Tool";

interface ChunkParameter {
  url: string;
  file: File;
  chunkSize?: number;
}

interface progressEvent {
  id: string;
  current: number;
}

function _chunk(arr: any, num: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += num) {
    const add = arr.slice(i, i + num);
    result.push(add);
  }
  return result;
}

/* 大文件切片上传工具类 */
class CloudChunk {
  /* 切片上传地址 */
  url: string;
  /* 待上传文件对象 */
  file: File;
  /* 切片大小 */
  chunkSize: number;
  /* 切片状态容器（已上传） */
  sliceChunks: any = {};
  /* 当前实例ID */
  chunkId: string = uuid(16, 16);
  /* 当前文件md5 */
  fileId: string;
  /* 当前上传开始时间 */
  startDate: number
  /* 当前上传状态（控制） */
  status: boolean;
  /* 当前读取状态 */
  readFileStatus: boolean
  /* 文件上传信息（进度） */
  progress: progressEvent

  /* 初始化 */
  constructor({ url, file, chunkSize }: ChunkParameter) {
    /* 初始化服务端切片接口地址 */
    this.url = url;
    /* 初始化文件对象 */
    this.file = file;
    /* 初始化切片大小 */
    this.chunkSize = chunkSize ? chunkSize : 1 * 1024 * 1024;
    /* 初始化受控上传状态 */
    this.status = false
    /* 初始化上传状态（进度） */
    this.progress = {
      current: 0,
      id: this.chunkId,
    }
  }

  /* 文件md5读取 */
  FileMd5Handle(): Promise<{ md5: string | null, err: any }> {
    const _this: CloudChunk = this;
    const bmf = new BMF();
    return new Promise((resolve) => {
      bmf.md5(
        _this.file,
        (err: any, md5: any) => {
          if (err) {
            resolve({ md5: null, err })
          } else {
            resolve({ md5, err })
          }
        },
        (progress: any) => _this.onReadFile(parseFloat((progress * 100).toFixed(2))) ,
      );
    })

  }


  async readFileSync() {
    const _this: CloudChunk = this;
    _this.readFileStatus = true
    /* 开始时间 */
    _this.startDate = Date.parse(new Date().toString())
    /* 读取文件md5 */
    const { md5, err } = await _this.FileMd5Handle()
    /* 文件md5读取失败 */
    if (!md5) {
      _this.onReadFileErr(err)
      return
    }
    _this.onReadFileEnd(md5, (fileId?: string) => {
      _this.send({ fileId: fileId ? fileId : md5 })
    })
  }

  /* 对文件进行切片，并进行封装处理 */
  static fileSlice(file: File, chunkSize: number): any {
    let start = 0;
    let end = 0;
    let chunks = [];
    let chunkNum = 0
    /* 文件切片 */
    while (start < file.size) {
      end = start + chunkSize;
      const temp = file.slice(start, end);
      chunks.push(temp);
      start = end;
    }

    /* 切片组数量 */
    chunkNum = chunks.length

    /* 将切片按照顺序注入编号 */
    chunks = chunks.map((item: any, index: number) => {
      item.index = index;
      return item;
    });
    /* 
      以Chrome为标准的最大并发量限制，创建切片分组（稳定性提高）
    */
    return { chunks: _chunk(chunks, 6), chunksMax: chunks.length }
  }

  /* 开关切换 */
  chunkSwitch() {
    this.status ? this.stop() : this.continue()
  }

  /* 主动停止当前上传 */
  stop() {
    this.status = false
  }

  /* 续传 */
  continue() {
    const _this: CloudChunk = this;
    _this.send({ fileId: _this.fileId, sliceChunks: _this.sliceChunks })
  }

  /* 开始上传 */
  async send({ fileId, sliceChunks }: { fileId: string, sliceChunks?: any }) {
    const _this: CloudChunk = this;
    _this.readFileStatus = false
    _this.progress.current = 0
    _this.fileId = fileId
    /* 
    常规运行环境下是通过检测实例内的sliceChunks，进行筛查已有上传记录的分片模块
    但是有些业务场景是通过服务端获取的切片记录，这里提供一个入参替换上传记录
    */
    sliceChunks && (_this.sliceChunks = sliceChunks)

    /* 状态（开始） */
    _this.status = true

    /* 切片容器（二维数组），切片数量 */
    const { chunks, chunksMax } = CloudChunk.fileSlice(_this.file, _this.chunkSize);

    for (let i = 0; i < chunks.length; i++) {
      if (!_this.status) {
        _this.onStop()
        return
      }
      await _this.queue(chunks[i])
    }

    if (chunksMax === Object.keys(_this.sliceChunks).length) {
      for (const key in _this.sliceChunks) {
        if (!_this.sliceChunks[key]) {
          _this.onFailureChange()
          return
        }
      }
      _this.status = false
      _this.onAllChange(_this.chunkId, _this.file.name)
    } else {
      _this.onFailureChange()
    }
  }


  /* 任务队列（上传） */
  queue(temps: any) {
    return new Promise((resolve, reject) => {
      const _this: CloudChunk = this;
      const list = []
      for (let i = 0; i < temps.length; i++) {
        const item = temps[i]
        list.push(this.upload(_this.url, item, item.index));
      }
      Promise.all(list).then(() => resolve(true)).catch(() => reject(null))
    })
  }



  /* 切片上传函数 */
  upload(url: string, file: Blob, index: number) {
    const _this: CloudChunk = this;


    return new Promise((resolve, reject) => {
      // 获取formdata数据
      const formdata = _this.formdata(_this.fileId, file, index);


      /* 检测该分片是否存在上传记录 */
      if (_this.sliceChunks[index]) {
        _this.progress.current += file.size;
        _this.onSingleChange(_this.progress);
        resolve(true);
        return
      }
      // 发送请求
      axios.post(url, formdata).then((data) => {
        _this.progress.current += file.size;
        _this.onSingleChange(_this.progress, data);
        _this.sliceChunks[index] = true
        resolve(true);
      }).catch(() => {
        _this.sliceChunks[index] = false
        reject(false)
      });
    });
  }

  /* 单次上传调用，返回一个FormData实例对象 */
  formdata(chunkId: string, file: Blob, index: number): any {/* formdata加工函数 */ }

  /* CloudChunk钩子函数（生命周期） */

  onReadFileErr(err: any): void {/* 文件读取失败 */ }

  onReadFile(progress: number): void {/* 文件读取中 */ }

  onReadFileEnd(md5: string, next?: any): void {/* 文件读取完毕 */ }

  onSingleChange(progress: { id: string, current: number }, data?: any): void {/* 单切片文件上传 */ }

  onStop(): void { /* 主动停止数据传输（暂停） */ }

  onAllChange(chunkId: string, fileName: string): void {/* 上传完毕 */ }

  onFailureChange(): void {/* 上传失败 */ }
}

export default CloudChunk;
