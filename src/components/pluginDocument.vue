<template>
  <div class="plugin">
    <DirPreview v-if="previewVisible" @save="previewSave" />
  </div>
</template>
 


<script lang='ts'>
import DirPreview from "../components/DirPreview.vue";
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import { ElNotification, ElMessageBox } from "element-plus";
import { fileCopy } from "../server/api";
export default defineComponent({
  name: "plugin",
  components: { DirPreview },
  setup() {
    const store = useStore();
    const paths = computed(() => store.state.paths);
    const previewVisible = computed(() => store.state.previewVisible);
    const selectFiles = computed(() => store.state.selectFiles);
    const previewModel = computed(() => store.state.previewModel);

    onMounted(() => {
      console.log("");
    });

    async function previewSave({ path, checkFiles }: any) {
      checkFiles = checkFiles.map((item: any) => item.FileName);
      const names = [];
      selectFiles.value.map((item: any) => {
        if (checkFiles.indexOf(item.FileName) != -1) {
          names.push(item.FileName);
        }
      });

      if (names.length > 0) {
        ElMessageBox.confirm(
          `此位置存在${names.length}个相同名称的文件/目录，您要使用正在移动的项目来替换它吗？`,
          "提示",
          {
            confirmButtonText: "替换",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(async () => copy())
          .catch(() => {
            /*  */
          });
      }else{
        copy();
      }

      

      /* 拷贝/移动 操作 */
      async function copy() {
        store.commit("setState", { name: "previewLoading", data: true });
        const files = selectFiles.value.map((item: any) => {
          return {
            targetPath: `${path}/${item.FileName}`,
            path: item.path,
          };
        });
        await fileCopy({ files, model: previewModel.value });
        store.commit("setState", { name: "previewVisible", data: false });
        store.commit("setState", { name: "previewLoading", data: false });
        store.commit("setState", { name: "paths", data: path.split("/") });
      }
    }
    return { previewSave, previewVisible };
  },
});
</script> 



<style lang="scss" scoped>
</style>