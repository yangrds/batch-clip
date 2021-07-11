/*
 * @Date: 2020-12-01 14:56:17
 * @LastEditTime: 2021-03-05 11:10:17
 * @LastEditors: Please set LastEditors
 * @FilePath: \WEB-OSS-Browser\src\tool\clip.js
 * @sketch: 滑动插件
 */

import { getCss, Percentage, getObjectURL, sizeCount, fileImgTool, zoomImgTool, toImage, _a, _q, uuid } from './utils'


export default class Clip {
  element
  params
  isFile
  zoom
  zoomSize
  cacheFiles
  fileImgs
  fileId
  size
  sizeUpdate() {
    _q('.size-x_c7de2eb38b9644f7a21f57b2348af5fd').value = _q('#clip_c7de2eb38b9644f7a21f57b2348af5fd').offsetLeft - _q('#main-img_c7de2eb38b9644f7a21f57b2348af5fd').offsetLeft
    _q('.size-y_c7de2eb38b9644f7a21f57b2348af5fd').value = _q('#clip_c7de2eb38b9644f7a21f57b2348af5fd').offsetTop - 20
    _q('.size-w_c7de2eb38b9644f7a21f57b2348af5fd').value = parseInt(getCss(_q('#clip_c7de2eb38b9644f7a21f57b2348af5fd'), "width"))
    _q('.size-h_c7de2eb38b9644f7a21f57b2348af5fd').value = parseInt(getCss(_q('#clip_c7de2eb38b9644f7a21f57b2348af5fd'), "height"))
  }

  constructor({ el, Files, isFile, zoom }) {
    /* 渲染容器 */
    this.element = typeof (el) === 'string' ? _q(el) : el
    this.params = {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      currentX: 0,
      currentY: 0,
      flag: false,
      kind: "drag",
    }
    /* 是否为缩放模式 */
    this.zoom = !!zoom
    /* 是否为文件模式 */
    this.isFile = !!isFile
    /* 缓存容器 */
    this.cacheFiles = {}
    /* 实时数据 */
    this.fileImgs = {}
    /* 当前文件（图像）id */
    this.fileId = ''
    /* 当前尺寸信息 */
    this.size = {
      w: 0,
      h: 0,
      byte: 0,
    }

    /* 模板渲染 */
    this.template()

    /* 容器缩放尺寸 */
    this.zoomSize = {
      width: _q('.img-wrap_c7de2eb38b9644f7a21f57b2348af5fd').getBoundingClientRect().width - 40,
      height: _q('.img-wrap_c7de2eb38b9644f7a21f57b2348af5fd').getBoundingClientRect().height - 46
    }

    /* 初始化 */
    this.clipInit(Files)
  }


  /* 初始化 */
  async clipInit(Files) {
    const _this = this

    _q('.clip-loading_c7de2eb38b9644f7a21f57b2348af5fd>i').style.width = '0%'



    for (let i = 0; i < Files.length; i++) {
      _q('.clip-loading_c7de2eb38b9644f7a21f57b2348af5fd>i').style.width = `${Percentage(i + 1, Files.length)}%`
      const id = 'tab_' + uuid(16, 16)
      /* 加载文件 */
      const res = await _this.urlToFile(Files[i], _this.isFile)
      /* 文件 */
      let file = res.file
      /* 资源加载失败（常规错误均为跨域，或者url地址404）中断当次循环 */
      if (res.err) {
        console.warn(`图像资源加载失败 ${res.err.path[0].currentSrc}\n请检查该资源的Access-Control-Allow-Origin响应头信息\nClip已忽略该资源`)
        _this.LoadFailed(res.err.path[0].currentSrc)
        continue;
      }
      /* 文件容器 */
      _this.fileImgs[id] = file
      /* 缓存文件（只读） */
      _this.cacheFiles[id] = file
    }

    /* 图像加载完毕，进度遮罩层隐藏 */
    _q('.clip-mask_c7de2eb38b9644f7a21f57b2348af5fd').style.display = 'none'

    /* 图像容器为空（无加载成功资源） */
    if (JSON.stringify(_this.fileImgs) === '{}') {
      _this.interrupt()
      console.warn(`可加载资源数量不足，已停止程序执行。`)
      return
    }

    /* 顶部图组 */
    const headImgs = _q('.files-tab_c7de2eb38b9644f7a21f57b2348af5fd')
    /* 图组DOM容器 */
    let html = ''
    /* 遍历容器图像，注入图组DOM容器 */
    for (const key in _this.fileImgs) {
      html += `<img src="${getObjectURL(_this.fileImgs[key])}" id="${key}" />`
    }
    /* DOM容器渲染 */
    headImgs.innerHTML = html

    /* 遍历DOM容器，注册交互事件 */
    Array.from(headImgs.childNodes).map((element) => {
      element.onclick = () => {
        /* 记录文件ID */
        _this.fileId = element.id
        /* 图组内容->渲染主图 */
        _q('#main-img_c7de2eb38b9644f7a21f57b2348af5fd').src = element.src
        /* 初始化裁剪框，Xaxis、Yaxis、width、height */
        _this.resetTool(100, 100)
        /* 图像信息更新 */
        _this.infoUpdate()
      }
    })
    /* 首图初始化 */
    headImgs.childNodes[0].onclick()

    /* 图像信息更新 */
    _this.infoUpdate()

    /* 初始化裁剪框，Xaxis、Yaxis、width、height */
    _this.resetTool(100, 100)

    /* 裁剪区域尺寸设置 */
    _this.sizeUpdate()

    /* 裁剪区域交互监听 */
    _q('.size-y_c7de2eb38b9644f7a21f57b2348af5fd').oninput = (e) => _this.setSize.call(_this, 'size-y_c7de2eb38b9644f7a21f57b2348af5fd', e.target.value)
    _q('.size-x_c7de2eb38b9644f7a21f57b2348af5fd').oninput = (e) => _this.setSize.call(_this, 'size-x_c7de2eb38b9644f7a21f57b2348af5fd', e.target.value)
    _q('.size-w_c7de2eb38b9644f7a21f57b2348af5fd').oninput = (e) => _this.setSize.call(_this, 'size-w_c7de2eb38b9644f7a21f57b2348af5fd', e.target.value)
    _q('.size-h_c7de2eb38b9644f7a21f57b2348af5fd').oninput = (e) => _this.setSize.call(_this, 'size-h_c7de2eb38b9644f7a21f57b2348af5fd', e.target.value)


    /* 废弃当前所裁剪图像，从缓存容器恢复原图（如果该图片发生过重载入，那么只能恢复原图到上一次的重载入的图像） */
    _q('#clip-back_c7de2eb38b9644f7a21f57b2348af5fd').onclick = () => {
      _this.fileImgs[this.fileId] = _this.cacheFiles[_this.fileId]
      _this.infoUpdate()
    }

    /* 
    保存图片，将剪辑完毕的图片注入submit钩子函数（用户可通过重写该实例方法，接收裁剪完毕的图像）
    格式为：File[]
    */
    _q('#clip-save_c7de2eb38b9644f7a21f57b2348af5fd').onclick = () => {
      const files = []
      for (const key in _this.fileImgs) {
        files.push(_this.fileImgs[key])
      }
      _this.submit(files)
    }

    /* 图片重载（单） */
    _this.clipReload()

    /* 裁剪事件注册 */
    _this.drawImageFun()

    /* 裁剪区域，八方向、拖拽、移动注册 */
    this.moveinit()

  }

  /* 提交 */
  submit() { }

  /* 资源加载失败 */
  LoadFailed() { }

  /* 程序中断 */
  interrupt() { }



  setSize(type, value) {
    const _this = this
    if (type === "size-x_c7de2eb38b9644f7a21f57b2348af5fd") {
      _this.params.left = parseInt(value) + 20 + "px";
      _q('#clip_c7de2eb38b9644f7a21f57b2348af5fd').style.left = parseInt(value) + 20 + "px";
    } else if (type === "size-y_c7de2eb38b9644f7a21f57b2348af5fd") {
      _this.params.top = parseInt(value) + 20 + "px";
      _q('#clip_c7de2eb38b9644f7a21f57b2348af5fd').style.top = parseInt(value) + 20 + "px";
    } else if (type === "size-w_c7de2eb38b9644f7a21f57b2348af5fd") {
      _this.params.width = parseInt(value) + "px";
      _q('#clip_c7de2eb38b9644f7a21f57b2348af5fd').style.width = parseInt(value) + "px";
    } else if (type === "size-h_c7de2eb38b9644f7a21f57b2348af5fd") {
      _this.params.height = parseInt(value) + "px";
      _q('#clip_c7de2eb38b9644f7a21f57b2348af5fd').style.height = parseInt(value) + "px";
    }
  }


  async urlToFile(file, isFile) {
    const _this = this
    let res = null
    /* url转换 */
    const url = isFile ? getObjectURL(file) : file
    /* 文件名提取 */
    const fileName = isFile ? file.name : file.split('/')[file.split('/').length - 1]
    /* 根据缩放定义，加载图像 */
    if (_this.zoom) {
      /* 缩放模式 */
      res = await zoomImgTool({ url, fileName, width: _this.zoomSize.width, height: _this.zoomSize.height })
    } else {
      /* 原图模式 */
      res = await fileImgTool(url, fileName)
    }
    return res
  }



  async infoUpdate() {
    const _this = this
    const file = _this.fileImgs[_this.fileId]

    const img = await toImage(file)
    /* 通过文件id更新当前tabs组图 */
    _q('#' + _this.fileId).src = img.src

    /* 更新主图 */
    _q('#main-img_c7de2eb38b9644f7a21f57b2348af5fd').src = img.src



    /* 更新当前图像像素 */
    _q('#file-pixel_c7de2eb38b9644f7a21f57b2348af5fd').innerText = img.naturalWidth + '*' + img.naturalHeight
    /* 更新当前文件大小 */
    _q('#file-byte_c7de2eb38b9644f7a21f57b2348af5fd').innerText = sizeCount(file.size)

  }


  resetTool(width, height) {
    _q('#clip_c7de2eb38b9644f7a21f57b2348af5fd').style.left = '20px';
    _q('#clip_c7de2eb38b9644f7a21f57b2348af5fd').style.top = '20px';
    _q('#clip_c7de2eb38b9644f7a21f57b2348af5fd').style.width = width + 'px';
    _q('#clip_c7de2eb38b9644f7a21f57b2348af5fd').style.height = height + 'px';
    this.params.left = '20px';
    this.params.top = '20px';
    this.params.width = width + 'px';
    this.params.height = height + 'px';
  }


  /* 
   拖拽，缩放 事件注册
   [params.currentX] 鼠标按下时坐标x轴
   [params.currentY] 鼠标按下时坐标y轴
   [point.onselectstart] 防止IE文字选中，有助于拖拽平滑
   [point.onmousedown] point当前注册事件的DOM节点
   [document.onmousemove] 开启全DOM拖拽（只有通过point.onmousedown注册的节点才具备权限）
   [e.stopPropagation()] 阻止事件继续传播
   */
  moveDragFun(point, target, kind) {

    const _this = this

    _this.params.width = getCss(target, "width");
    _this.params.height = getCss(target, "height");
    _this.params.left = getCss(target, "left");
    _this.params.top = getCss(target, "top");

    point.onmousedown = function (event) {
      _this.params.flag = true;

      const e = event || window.event

      _this.params.currentX = e.clientX;
      _this.params.currentY = e.clientY;

      point.onselectstart = function () {
        return false;
      };

      e.stopPropagation();

      document.onmousemove = function (e) {
        if (_this.params.flag) {
          var nowX = e.clientX; // 鼠标移动时x坐标
          var nowY = e.clientY; // 鼠标移动时y坐标
          var disX = nowX - _this.params.currentX; // 鼠标x方向移动距离
          var disY = nowY - _this.params.currentY; // 鼠标y方向移动距离
          _this.sizeUpdate()
          // 拖拽，八方向缩放
          if (kind === 'leftTop') {
            target.style.left = parseInt(_this.params.left) + disX + "px";
            target.style.width = parseInt(_this.params.width) - disX + "px";
            target.style.top = parseInt(_this.params.top) + disY + "px";
            target.style.height = parseInt(_this.params.height) - disY + "px";
          } else if (kind === 'rightTop') {
            target.style.top = parseInt(_this.params.top) + disY + "px";
            target.style.height = parseInt(_this.params.height) - disY + "px";
            target.style.width = parseInt(_this.params.width) + disX + "px";
          } else if (kind === 'rightBot') {
            target.style.width = parseInt(_this.params.width) + disX + "px";
            target.style.height = parseInt(_this.params.height) + disY + "px";
          } else if (kind === 'topCenter') {
            target.style.top = parseInt(_this.params.top) + disY + "px";
            target.style.height = parseInt(_this.params.height) - disY + "px";
          } else if (kind === 'botCenter') {
            target.style.height = parseInt(_this.params.height) + disY + "px";
          } else if (kind === 'rightCenter') {
            target.style.width = parseInt(_this.params.width) + disX + "px";
          } else if (kind === 'leftCenter') {
            target.style.left = parseInt(_this.params.left) + disX + "px";
            target.style.width = parseInt(_this.params.width) - disX + "px";
          } else if (kind === 'leftBot') {
            target.style.left = parseInt(_this.params.left) + disX + "px";
            target.style.width = parseInt(_this.params.width) - disX + "px";
            target.style.height = parseInt(_this.params.height) + disY + "px";
          } else {
            target.style.left = parseInt(_this.params.left) + disX + "px";
            target.style.top = parseInt(_this.params.top) + disY + "px";
          }
          // 鼠标抬起
          document.onmouseup = function () {
            _this.params.flag = false;
            _this.params.left = getCss(target, "left");
            _this.params.top = getCss(target, "top");
            _this.params.width = getCss(target, "width");
            _this.params.height = getCss(target, "height");
            document.onmousemove = null
          }

        }

      }

    }

  }

  /* 
    裁剪信息
    [sx] X轴偏移量
    [sy] Y轴偏移量
    [swidth] 裁剪宽度
    [sheight] 裁剪高度
    */
  async drawImageFun() {
    const _this = this
    _q('#clip-determine_c7de2eb38b9644f7a21f57b2348af5fd').onclick = async () => {
      let img = _q('#main-img_c7de2eb38b9644f7a21f57b2348af5fd')
      let sx = parseInt(_this.params.left) - img.offsetLeft
      let sy = parseInt(_this.params.top) - img.offsetTop
      let swidth = parseInt(_this.params.width)
      let sheight = parseInt(_this.params.height)
      let fileName = _this.fileImgs[_this.fileId].name
      let res = await fileImgTool(img.src, fileName, { sx, sy, swidth, sheight })
      _this.fileImgs[_this.fileId] = res.file
      this.infoUpdate()
      _this.resetTool(swidth, sheight)
    }
  }

  /* 
    图像重载，重载入一个新的图像
    替换[数据容器][缓存容器]内fileId相同的图片
   */
  clipReload() {
    const _this = this
    _q('#clip-reload_c7de2eb38b9644f7a21f57b2348af5fd').onclick = () => {
      /* 在内存中创建一个input对象（无需注入DOM） */
      const input = document.createElement('input')
      /* 改为文件模式 */
      input.type = 'file'
      /* 文件可选类型 */
      input.accept = "image/png,image/jpeg,image/webp"
      /* 定义文件选择监听 */
      input.onchange = async function (e) {
        const { file, err } = await _this.urlToFile.call(_this, e.target.files[0], true)
        if (err) {
          _this.LoadFailed(res.err.path[0].currentSrc)
          return
        }
        _this.fileImgs[_this.fileId] = file
        _this.cacheFiles[_this.fileId] = file
        _this.infoUpdate()
      }
      input.click()
    }
  }





  // 拖拽事件注册，八方向缩放事件注册
  moveinit() {
    // 拖拽
    this.moveDragFun(_q('#mask_c7de2eb38b9644f7a21f57b2348af5fd'), _q('#clip_c7de2eb38b9644f7a21f57b2348af5fd'), 'clip')
    // 左上
    this.moveDragFun(_q('#leftTop_c7de2eb38b9644f7a21f57b2348af5fd'), _q('#clip_c7de2eb38b9644f7a21f57b2348af5fd'), 'leftTop')
    // 左下
    this.moveDragFun(_q('#leftBot_c7de2eb38b9644f7a21f57b2348af5fd'), _q('#clip_c7de2eb38b9644f7a21f57b2348af5fd'), 'leftBot')
    // 右上
    this.moveDragFun(_q('#rightTop_c7de2eb38b9644f7a21f57b2348af5fd'), _q('#clip_c7de2eb38b9644f7a21f57b2348af5fd'), 'rightTop')
    // 右下
    this.moveDragFun(_q("#rightBot_c7de2eb38b9644f7a21f57b2348af5fd"), _q("#clip_c7de2eb38b9644f7a21f57b2348af5fd"), "rightBot");
    // 上中
    this.moveDragFun(_q("#topCenter_c7de2eb38b9644f7a21f57b2348af5fd"), _q("#clip_c7de2eb38b9644f7a21f57b2348af5fd"), "topCenter");
    // 下中
    this.moveDragFun(_q("#botCenter_c7de2eb38b9644f7a21f57b2348af5fd"), _q("#clip_c7de2eb38b9644f7a21f57b2348af5fd"), "botCenter");
    // 右中
    this.moveDragFun(_q("#rightCenter_c7de2eb38b9644f7a21f57b2348af5fd"), _q("#clip_c7de2eb38b9644f7a21f57b2348af5fd"), "rightCenter");
    // 左中
    this.moveDragFun(_q("#leftCenter_c7de2eb38b9644f7a21f57b2348af5fd"), _q("#clip_c7de2eb38b9644f7a21f57b2348af5fd"), "leftCenter");

  }

  template() {
    let html = `<div id="clip-tailoring_c7de2eb38b9644f7a21f57b2348af5fd">

    <div class="clip-mask_c7de2eb38b9644f7a21f57b2348af5fd">
        <div class="clip-loading_c7de2eb38b9644f7a21f57b2348af5fd">
            <i></i>
        </div>
    </div>

    <div class="files-tab_c7de2eb38b9644f7a21f57b2348af5fd">
    </div>

    <div class="utils_c7de2eb38b9644f7a21f57b2348af5fd">
        <div class="child-size_c7de2eb38b9644f7a21f57b2348af5fd">
            <span>X：</span>
            <input class="size-x_c7de2eb38b9644f7a21f57b2348af5fd" type="number" />
        </div>

        <div class="child-size_c7de2eb38b9644f7a21f57b2348af5fd">
            <span>Y：</span>
            <input class="size-y_c7de2eb38b9644f7a21f57b2348af5fd" type="number" />
        </div>

        <div class="child-size_c7de2eb38b9644f7a21f57b2348af5fd">
            <span>W：</span>
            <input class="size-w_c7de2eb38b9644f7a21f57b2348af5fd" type="number" />
        </div>

        <div class="child-size_c7de2eb38b9644f7a21f57b2348af5fd">
            <span>H：</span>
            <input class="size-h_c7de2eb38b9644f7a21f57b2348af5fd" type="number" />
        </div>
        <div class="child-pixel_c7de2eb38b9644f7a21f57b2348af5fd">
            <span>P：</span>
            <span id="file-pixel_c7de2eb38b9644f7a21f57b2348af5fd"></span>
        </div>
        <div class="child-pixel_c7de2eb38b9644f7a21f57b2348af5fd">
            <span>S：</span>
            <span id="file-byte_c7de2eb38b9644f7a21f57b2348af5fd"></span>
        </div>

        <div class="clip-btns_c7de2eb38b9644f7a21f57b2348af5fd">
            <div class="clip-child_c7de2eb38b9644f7a21f57b2348af5fd" id="clip-reload_c7de2eb38b9644f7a21f57b2348af5fd">
                <span>重载</span>
            </div>
            <div class="clip-child_c7de2eb38b9644f7a21f57b2348af5fd" id="clip-determine_c7de2eb38b9644f7a21f57b2348af5fd">
                <span>裁剪</span>
            </div>
            <div class="clip-child_c7de2eb38b9644f7a21f57b2348af5fd" id="clip-back_c7de2eb38b9644f7a21f57b2348af5fd">
                <span>回退</span>
            </div>
            <div class="clip-child_c7de2eb38b9644f7a21f57b2348af5fd" id="clip-save_c7de2eb38b9644f7a21f57b2348af5fd">
                <span>保存</span>
            </div>
        </div>
    </div>
    <div class="img-wrap_c7de2eb38b9644f7a21f57b2348af5fd">
        <div id="clip_c7de2eb38b9644f7a21f57b2348af5fd">
            <div id="mask_c7de2eb38b9644f7a21f57b2348af5fd"></div>
            <div id="leftTop_c7de2eb38b9644f7a21f57b2348af5fd"></div>
            <div id="rightTop_c7de2eb38b9644f7a21f57b2348af5fd"></div>
            <div id="leftBot_c7de2eb38b9644f7a21f57b2348af5fd"></div>
            <div id="rightBot_c7de2eb38b9644f7a21f57b2348af5fd"></div>
            <div id="leftCenter_c7de2eb38b9644f7a21f57b2348af5fd"></div>
            <div id="rightCenter_c7de2eb38b9644f7a21f57b2348af5fd"></div>
            <div id="topCenter_c7de2eb38b9644f7a21f57b2348af5fd"></div>
            <div id="botCenter_c7de2eb38b9644f7a21f57b2348af5fd"></div>
        </div>
        <img id="main-img_c7de2eb38b9644f7a21f57b2348af5fd" ondragstart="return false" src="" />
    </div>
</div>`
    this.element.innerHTML = html
  }

}










