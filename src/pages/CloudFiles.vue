<template>
  <div class="Files" v-loading="loading">
    <el-table
      ref="filelist"
      @selection-change="selectionChange"
      :data="FileList"
      style="width: 100%"
      :height="scrollH"
    >
      <el-table-column type="selection" size="medium" width="25">
      </el-table-column>
      <el-table-column label="名称">
        <template #default="scope">
          <div class="file-name">
            <svg class="icon" aria-hidden="true">
              <use
                :xlink:href="`#${IconTool(scope.row.FileName, scope.row.dir)}`"
              ></use>
            </svg>

            <span @click="pathClick(scope.row)"> {{ scope.row.FileName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" width="200">
        <template #default="scope">
          <span style="font-size: 14px">
            {{ dateFormat("YY-mm-dd HH:MM:SS", scope.row.mtimeMs) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="大小" width="200">
        <template #default="scope">
          <span style="font-size: 14px">
            {{ scope.row.dir ? "" : renderSize(scope.row.size) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="类型" width="200">
        <template #default="scope">
          <span style="font-size: 14px">
            {{ scope.row.dir ? "目录" : "文件" }}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>



<script lang='ts'>
import { getFiles } from "../server/api";
import { dateFormat, renderSize, IconTool } from "../Utils/Tool";
import { useStore } from "vuex";
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  computed,
  watch,
} from "vue";

export default defineComponent({
  name: "Files",
  components: {},
  setup() {
    /* Vuex状态管理 */
    const store = useStore();
    let status = {
      paths: computed(() => store.state.paths),
      loading: computed(() => store.state.loading),
      scrollH: computed(() => store.state.scrollH),
      FileList: computed(() => store.state.FileList),
    };

    // store.commit("setState", {
    //   name: "utilsBars",
    //   data: [
    //     {
    //       title: "文件上传",
    //       click: "SimplyUpload",
    //       size: "16px",
    //       bgColor: "#f5f5f5",
    //       txtColor: "#333",
    //     },
    //     {
    //       title: "复制",
    //       click: "copy",
    //       size: "16px",
    //       bgColor: "#F08080",
    //       txtColor: "#fff",
    //     },
    //     {
    //       title: "移动",
    //       click: "mobile",
    //       size: "16px",
    //       bgColor: "#BC8F8F",
    //       txtColor: "#fff",
    //     },
    //     {
    //       title: "删除",
    //       click: "deleteFile",
    //       size: "16px",
    //       bgColor: "red",
    //       txtColor: "#fff",
    //     },
    //   ],
    // });

    interface FileItem {
      FileName: string;
      birthtimeMs: number;
      dir: boolean;
      mtimeMs: number;
      checked?: boolean;
    }

    watch(
      status.paths,
      () => {
        /*  */
        store.dispatch("updateFile");
      },
      {
        deep: true,
      }
    );

    const funcs = {
      pathClick: (row: FileItem) => {
        if (!row.dir) {
          return;
        }
        let paths = status.paths.value;
        paths.push(row.FileName);
        store.commit("setState", { name: "paths", data: paths });
      },

      selectionChange: (selection: any) => {
        store.commit("setState", { name: "selectFiles", data: selection });
      },
    };

    onMounted(async () => {
      store.dispatch("updateFile");
    });

    return {
      ...status,
      ...funcs,
      dateFormat,
      renderSize,
      IconTool,
    };
  },
});
</script>


<style lang="scss">
</style>

<style lang="scss" scoped>
.Files {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f8f8f8;
  position: relative;
  user-select: none;
}
</style>