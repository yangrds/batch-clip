/*
 * @Author: 杨荣代
 * @Date: 2021-05-17 17:34:52
 * @LastEditTime: 2021-06-01 17:41:24
 * @LastEditors: 杨荣代
 * @Description:
 * @FilePath: \free-cloud\src\Utils\ChunkUpload.ts
 */

import axios from "axios";

import { renderSize, distanceDate, formatSeconds, formatDuring, ElNotificationHtmlTool } from "./Tool";
import { ElNotification } from "element-plus";
import { computed, watch } from "vue";
import CloudChunk from "./CloudChunk";
import store from "../store/index";
const transmission = computed(() => store.state.transmission);

interface progressEvent {
  id: string;
  current: number;
  statusTxt: string;
}



async function ChunkUpload(file: File, targetPath: string) {
  const chunk = new CloudChunk({
    url: `http://127.0.0.1:7001/transmission/chunk-upload`,
    file
  });

  const obj = transmission.value;

  obj[chunk.chunkId] = {
    current: 0,
    statusTxt: '等待上传',
    id: chunk.chunkId,
    totalSize: chunk.file.size,
    file: chunk.file,
    model: "chunk",
    readIndex: 0,
    chunk
  };

  store.commit("setState", {
    name: "transmission",
    data: obj,
  });


  /* 返回一个FormData实例对象，注入chunk作为单次切片的上传数据 */
  chunk.formdata = (fileId: string, file: Blob, index: number) => {
    // 创建数据容器
    const formdata = new FormData();
    // 文件ID（随内存清空）
    formdata.append("fileId", fileId);
    // 文件切片下标
    formdata.append("index", index.toString());
    // 文件切片
    formdata.append("file", file);
    /* 将数据注入CloudChunk实例对象 */
    return formdata;
  };

  /* 文件读取中 */
  chunk.onReadFile = (num: number) => {
    transmission.value[chunk.chunkId].statusTxt = "文件读取中"
    transmission.value[chunk.chunkId].readIndex = num
  }


  /* 文件读取失败 */
  chunk.onReadFileErr = (err: any) => {
    transmission.value[chunk.chunkId].statusTxt = "文件读取失败"
  }

  /* 文件读取完毕 */
  chunk.onReadFileEnd = (fileId, send) => {
    send()
  }
  /* 暂停 */
  chunk.onStop = () => {
    ElNotification({
      title: "文件传输",
      dangerouslyUseHTMLString: true,
      message: ElNotificationHtmlTool(
        file.name,
        "上传已经暂停",
        distanceDate(chunk.startDate)
      ),
      type: "warning",
    });
  }

  /* 切片上传中（每次上传成功） */
  chunk.onSingleChange = (progress: { id: string, current: number }, data?: any) => {
    transmission.value[chunk.chunkId].current = progress.current
    transmission.value[chunk.chunkId].statusTxt = "文件上传中"
  };

  /* 文件上传完毕 */
  chunk.onAllChange = async () => {
    transmission.value[chunk.chunkId].statusTxt = "文件写入中"
    /* 状态重置为写入中 */
    const _this: CloudChunk = this;
    // 创建数据容器
    const formdata = new FormData();
    // 文件ID（随内存清空）
    formdata.append("fileId", chunk.fileId);
    formdata.append("navPath", targetPath);
    formdata.append("fileName", chunk.file.name);
    const { data } = await axios.post(
      `http://127.0.0.1:7001/transmission/chunk-all`,
      formdata
    );

    if (data.code === 200) {
      /* 状态重置为上传完毕 */
      transmission.value[chunk.chunkId].statusTxt = "上传完毕"
      /* 文件名，当前状态 */
      ElNotification({
        title: "文件传输",
        dangerouslyUseHTMLString: true,
        message: ElNotificationHtmlTool(file.name, '上传完毕', distanceDate(chunk.startDate)),
        type: "success",
      });
    }
  };

  /* 上传失败 */
  chunk.onFailureChange = () => {
    transmission.value[chunk.chunkId].statusTxt = "上传失败"
    /* 状态重置为上传完毕 */
    ElNotification({
      title: "文件传输",
      dangerouslyUseHTMLString: true,
      message: ElNotificationHtmlTool(
        file.name,
        "上传失败",
        distanceDate(chunk.startDate)
      ),
      type: "error",
    });
  };

  /* 开始上传 */
  chunk.readFileSync();
}


export default ChunkUpload;
