import axios, { Method } from "axios";

const address = `http://127.0.0.1:7001`

/* 文件列表 */
export const getFiles = (params?: any): any => serve('post', `${address}/file/list`, params ? params : {})
/* 文件分类 */
export const getFileClass = (params?: any): any => serve('post', `${address}/file/class`, params ? params : {})
/* 文件删除（批量） */
export const deleteFileBatch = (params?: any): any => serve('post', `${address}/file/delete`, params ? params : {})
/* 新建文件夹 */
export const setMkdir = (params?: any): any => serve('post', `${address}/file/mkdir`, params ? params : {})
/* 文件拷贝/移动 */
export const fileCopy = (params?: any): any => serve('post', `${address}/file/copy`, params ? params : {})


/* system */
/* 添加角色 */
export const addRoleInfo = (params?: any): any => serve('post', `${address}/system/role/add`, params ? params : {})
/* 角色列表 */
export const roleList = (params?: any): any => serve('post', `${address}/system/role/list`, params ? params : {})


function serve(type: string, url: string, params: any): any {
  return new Promise(resolve => {
    axios[type](url, params).then(({
      data
    }: { data: any }) => {
      if (data.code === 200) {
        resolve({ ...data, error: false })
      } else {
        resolve({
          error: true,
        })
      }

    }).catch((error: any) => {
      resolve({
        error
      })
    })
  })
}



// export default { getFiles, getFileClass }

