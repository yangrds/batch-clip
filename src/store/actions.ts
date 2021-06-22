import { deleteFileBatch, getFiles, getFileClass, setMkdir, fileCopy } from '../server/api'
import { ElNotification, ElMessageBox } from "element-plus";

export default {
    /* 新建文件夹 */
    async mkdir({ state, dispatch }: any, { dirPath, dirName }) {
        const code = await setMkdir({ dirName: dirPath + "/" + dirName })
        return code
    },
    /* 主目录更新 */
    async updateFile({ state }: any) {
        state.loading = true
        const { code, Files } = await getFiles({
            navPath: state.paths.join("/"),
        });
        state.loading = false
        code === 200 && (state.FileList = Files)
    },
    /* 文件分类列表更新 */
    async updateFileClass({ state }: any) {
        const { code, files } = await getFileClass({ suffixs: state.suffixs });
        code === 200 && (state.FileClassList = files)
    },
    /* 删除 */
    deleteFile({ state, dispatch }: any) {
        if (state.selectFiles.length < 1) {
            ElNotification({
                title: "非法操作",
                message: '勾选项为空，请检查！',
                type: "warning",
            });
            return
        }
        ElMessageBox.confirm('此操作将永久删除所选文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async () => {
            const paths = []
            state.selectFiles.map((item: any) => {
                paths.push(item.path)
            })
            const { code } = await deleteFileBatch({ paths })
            /* 更新主目录 */
            dispatch('updateFile')
            /* 更新分类列表目录 */
            dispatch('updateFileClass')
            ElNotification({
                title: "文件删除",
                message: `文件删除${code === 200 ? '成功' : '失败'}`,
                type: code === 200 ? "success" : "error",
            });
        }).catch(() => {
            /*  */
        });
    },
    /*  */
    async copyMobile({ state }: any, path: string) {
        const files = state.selectFiles.map((item: any) => {
            return { targetPath: `${path}/${item.FileName}`, path: item.path }
        })
        await fileCopy({ files, model: state.previewModel })
        state.previewVisible = false
        state.paths = path.split('/')
    }
}





