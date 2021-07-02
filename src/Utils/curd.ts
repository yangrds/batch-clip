import { ElMessage, ElMessageBox, ElNotification } from "element-plus";

import api from '../server/api'

export function _remove(key: string, ids: string[], cb: () => any): void {

    if (ids.length < 1) {
        ElMessage.error('操作失败，没有数据被勾选！');
        return;
    }

    ElMessageBox.confirm(
        `此操作将永久删除 ${ids.length} 条数据, 是否继续?`,
        "团队信息删除",
        {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        }
    )
        .then(async () => {
            console.log(api[key]);
            
            const { code } = await api[key]({ ids });
            ElNotification({
                title: "提示信息",
                message: `数据删除${code === 200 ? "成功" : "失败"}`,
                type: code === 200 ? "success" : "error",
            });
            cb();
        })
        .catch(() => { /*  */ });
}
