import axios from "axios";
import { uuid, ElNotificationHtmlTool, distanceDate } from "./Tool";
import { computed } from "vue";
import ChunkUpload from './ChunkUpload'
import { ElNotification } from "element-plus";
import store from "../store/index";



const url = `http://127.0.0.1:7001/transmission/simply-upload`



const transmission = computed(() => store.state.transmission)


function alk(data:any) {
    console.log(data);

    const transmission = JSON.parse(window.localStorage.getItem('transmission'))||{}

    transmission[data.id] = data
    
    window.localStorage.setItem('transmission',JSON.stringify(transmission))
}


function upload(file: File, path: string) {
    const startDate = Date.parse(new Date().toString())
    /* 定义主键 */
    const id: string = uuid(16, 16)
    /* 数据加入上传列表 */
    const obj = transmission.value;
    /* 定义文件信息 */
    obj[id] = {
        current: 0,
        statusTxt: '等待上传',
        id,
        totalSize: file.size,
        model: "simple",
        file
    };
    /* 更新上传列表 */
    store.commit("setState", {
        name: "transmission",
        data: obj
    });
    const formdata = new FormData()
    formdata.append('file', file)
    formdata.append('navPath', path)
    return new Promise((resolve) => {
        axios.post(url, formdata, {
            /* 上传进度 */
            onUploadProgress: (progressEvent) => {
                transmission.value[id].current = progressEvent.loaded
                transmission.value[id].totalSize = progressEvent.total
                transmission.value[id].statusTxt = "文件上传中"
            }
        }).then((_data: any) => {
            transmission.value[id].statusTxt = "上传完毕"
            alk(transmission.value[id])
            ElNotification({
                title: "文件传输",
                dangerouslyUseHTMLString: true,
                message: ElNotificationHtmlTool(file.name, '上传完毕', distanceDate(startDate)),
                type: "success",
            });
            resolve(_data)
        }).catch((err: any) => {
            transmission.value[id].statusTxt = "上传完毕"
        })
    })
}


function SimplyUpload(path: string) {
    /* 定义简单上传和分片上传之间的临界值 */
    const maxSize = 50 * 1024 * 1024
    /* 创建input对象（不渲染至DOM） */
    const input: HTMLInputElement = document.createElement('input')
    /* 改为文件模式 */
    input.type = 'file'
    /* 多选模式 */
    input.multiple = true
    /* 定义文件选择监听 */
    input.onchange = function (e: any) {
        /* 初始化文件容器 */
        const Files: File[] = Array.from(e.path[0].files)
        /* 超过临界值触发分片上传 */
        Files.map((file) => file.size > maxSize ? ChunkUpload(file, path) : upload(file, path))
    }
    input.click()
}


export default SimplyUpload