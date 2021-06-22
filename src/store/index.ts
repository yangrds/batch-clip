import { createStore } from 'vuex'
import actions from './actions'
import mutations from './mutations'

// 创建 store 容器实例.
const store = createStore({
    state() {
        return {
            /* 当前路径 */
            paths: [''],
            /* 主目录文件列表 */
            FileList: [],
            /* 文件分类列表 */
            FileClassList: [],
            /* 当前勾选项列表 */
            selectFiles: [],
            /* 当前工具栏列表 */
            utilsBars: [],
            /* 当前传输列表 */
            transmission: {},
            /* 当前文件分类后缀列表 */
            suffixs: [],
            /* 当前加载状态 */
            loading: true,
            /* 当前主模块弹性高度 */
            scrollH: 0,
            /* 目录预览 */
            previewVisible: false,
            /* 目录预览（加载） */
            previewLoading: false,
            /* 复制/移动（模式） */
            previewModel: 'copy'
        }
    },
    mutations,
    actions
})

export default store
