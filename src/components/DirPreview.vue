<template>
  <div class="DirPreview">
    <div
      :class="`preview-body ${delay}`"
      @animationend="animation"
      v-loading="previewLoading"
      element-loading-text="拼命拷贝中..."
      element-loading-spinner="el-icon-loading"
    >
      <div class="preview-title">
        <span
          class="iconfont icon-changyongicon-1 back"
          @click="backClick"
        ></span>
        <span>请选择目标目录</span>
      </div>

      <div class="preview-nav">
        <el-breadcrumb
          class="preview-breadcrumb"
          separator-class="el-icon-arrow-right"
        >
          <el-breadcrumb-item v-for="item in navs" :key="item">{{
            item ? item : "首页"
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="preview-list">
        <div class="preview-child" v-for="item in fileList" :key="item.path">
          <div class="file-name" style="font-size: 18px">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wenjianjia1"></use>
            </svg>
            <span
              @click="pathClick(item)"
              :style="{
                color: item.disabled ? '#888' : '#333',
              }"
              style="font-size: 14px"
            >
              {{ item.FileName }}</span
            >
          </div>
        </div>
        <div class="preview-mask" v-if="fileList.length <= 0">
          <span>当前目录为空</span>
        </div>
      </div>

      <div class="preview-footer">
        <CloudButton
          :row="{ title: '新建文件夹', bgColor: '#586BF6', txtColor: '#fff' }"
          @click="mkDirShow"
        />
        <div>
          <CloudButton @click="closeClick" :row="{ title: '取消' }" />
          <CloudButton
            @click="save"
            :row="{ title: '保存', bgColor: '#EDE7B2' }"
          />
        </div>
      </div>
    </div>

    <el-dialog
      title="新建文件夹"
      v-model="mkdirVisible"
      width="400px"
      :before-close="(none) => none()"
    >
      <div class="mkdir">
        <el-input
          v-model="dirName"
          style="width: 240px"
          placeholder="请输入目录名"
        ></el-input>
        <el-button type="primary" style="margin-left: 14px" @click="mkdir"
          >创建</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>



<script lang='ts'>
import store from "@/store";
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { getFiles } from "../server/api";
import { ElNotification } from "element-plus";
export default defineComponent({
  name: "DirPreview",
  components: {},
  setup(prop, context) {
    /* 文件/目录列表 */
    const fileList = reactive([]);
    /* 文件/目录列表（校验） */
    let checkFiles = [];
    /* 当前路径（数据） */
    const paths = reactive([...store.state.paths]);
    /* 当前路径（显示） */
    const navs = reactive([""]);
    /* 创建文件夹对话框（显示） */
    const mkdirVisible = ref(false);
    /* 文件夹名称（mkdir） */
    const dirName = ref("");
    /* 文件夹路径（mkdir） */
    const dirPath = ref("");
    /* 延迟过渡，进场/离场 */
    const delay = ref("delay-start");

    const selectFiles = computed(() => store.state.selectFiles);
    const previewLoading = computed(() => store.state.previewLoading);
    onMounted(() => {
      // navs.splice(0, navs.length);
      // navs.push(...paths);
      updateFile();
    });

    /* 监听当前路径更新 */
    watch(
      paths,
      (to) => {
        /* 更新目录列表 */
        updateFile();
        /* 更新路径显示内容 */
        navs.splice(0, navs.length);
        navs.push(...to);
        /* 动态调整路径显示长度 */
        nextTick(pathUpdate);
      },
      { deep: true, immediate: true }
    );
    /* 唤起创建文件夹对话框 */
    function mkDirShow(): void {
      mkdirVisible.value = true;
      dirName.value = checkFile("新建文件夹").title;
    }

    /* 返回上级目录 */
    function backClick(): void {
      if (paths.length < 2) return;
      paths.pop();
    }

    function save() {
      context.emit("save", { path: paths.join("/"), checkFiles });
    }

    function closeClick() {
      delay.value = "delay-end";
    }

    /* 创建文件夹 */
    async function mkdir(): Promise<void> {
      /* 检测重名 */
      if (checkFile(dirName.value).isRepeat) {
        ElNotification({
          title: "新建文件夹",
          dangerouslyUseHTMLString: true,
          message: "文件夹名称已存在",
          type: "warning",
        });
        return;
      }
      /* 创建目录 */
      await store.dispatch("mkdir", {
        dirPath: paths.join("/"),
        dirName: dirName.value,
      });
      /* 关闭创建对话框 */
      mkdirVisible.value = false;
      /* 清除文件名 */
      dirName.value = "";
      /* 更新目录 */
      updateFile();
    }

    /* 文件重名检测/重置 */
    function checkFile(title: string): { title: string; isRepeat: boolean } {
      /* 待反馈文件/目录名称 */
      let fileName = "";
      /* 是否重名 */
      let isRepeat = false;
      /* 重名后缀 */
      let index = 1;
      /* 是否重名，重名自动后缀（递归） */
      function isName(name: string) {
        index++;
        /* 初始化是否重名状态 */
        let flag = true;
        /* 循环当前目录列表，检测重名并标记状态 */
        fileList.map((item) => item.FileName === name && (flag = false));
        /* 判断重名标记 */
        if (!flag) {
          /* 确定重名 */
          isRepeat = true;
          /* 设置当前文件名+1 */
          fileName = `${title} ${index}`;
          /* 再次调用重名检测，递归循环 */
          isName(fileName);
        }
      }
      /* 重名检测，设置新文件名 */
      isName(title);
      /* 返回新文件名，以及重名状态 */
      return { title: fileName || title, isRepeat };
    }

    /* 目录导航长度判断 */
    function pathUpdate(): void {
      let breadcrumb = heightTool(".preview-breadcrumb");
      let preview = heightTool(".preview-nav");
      if (breadcrumb > preview) {
        navs.splice(0, navs.length);
        navs.push(...[paths[0], "...", paths[paths.length - 1]]);
      }
    }

    /* 返回指定DOM对象/ID的宽度*/
    function heightTool(element: any): number {
      if (typeof element === "string") {
        return document.querySelector(element).getBoundingClientRect().width;
      }
      return element.getBoundingClientRect().width;
    }

    /* 目录更新 */
    async function updateFile(): Promise<void> {
      let { code, Files } = await getFiles({ navPath: paths.join("/") });
      if (code != 200) return;

      let temps = Files.filter((item: any) => item.dir);
      checkFiles = Files;
      fileList.splice(0, fileList.length);
      fileList.push(...FilesTool(temps));
    }

    function FilesTool(temps: any) {
      const dirs = [];
      const Files = [];
      selectFiles.value.map((item: any) => {
        item.dir && dirs.push(item.path);
      });

      temps.forEach((item: any) => {
        const disabled = !(dirs.indexOf(item.path) === -1);
        Files.push({ ...item, disabled });
      });
      return Files;
    }

    /* 进入目录 */
    function pathClick({ FileName, path, disabled }: any): void {
      if (disabled) return;
      paths.push(FileName);
      dirPath.value = path;
    }

    function animation({ target }: any) {
      if (target.className.split(" ")[1] === "delay-end") {
        store.commit("setState", { name: "previewVisible", data: false });
      }
    }

    return {
      fileList,
      paths,
      navs,
      mkdirVisible,
      dirName,
      delay,
      previewLoading,
      pathClick,
      backClick,
      closeClick,
      mkDirShow,
      mkdir,
      save,
      animation,
    };
  },
});
</script>

<style lang="scss">
.el-breadcrumb {
  display: flex;
  align-items: center;
}
.el-dialog__body {
  padding: 5px 20px 15px;
}
</style>

<style lang="scss" scoped>
@keyframes start {
  0% {
    height: 0px;
    opacity: 0;
  }
  100% {
    height: 380px;
    opacity: 1;
  }
}

@keyframes end {
  0% {
    height: 380px;
    opacity: 1;
  }
  100% {
    height: 100px;
    opacity: 0;
  }
}

.delay-start {
  animation: start 1s;
}

.delay-end {
  animation: end 0.3s;
}

@import "../assets/css/mixin.scss";
.DirPreview {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba($color: #000000, $alpha: 0.3);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  .preview-body {
    width: 480px;
    height: 380px;
    background-color: #fff;
    padding: 64px 0 45px;
    box-sizing: border-box;
    position: relative;
    opacity: 1;
    border-radius: 2px;
    .preview-title {
      width: 100%;
      height: 40px;
      position: absolute;
      left: 0;
      top: 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      font-size: 16px;
      box-shadow: 0 2px 12px 0 rgba($color: #000000, $alpha: 0.1);
      .back {
        width: 30px;
        height: 26px;
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        background-color: #f5f5f5;
        border-radius: 5px;
        cursor: pointer;
        z-index: 9;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      > span:nth-child(2) {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
      }
    }
    .preview-nav {
      width: 100%;
      height: 24px;
      position: absolute;
      left: 0;
      top: 40px;
      box-sizing: border-box;
      padding-left: 10px;
      display: flex;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .preview-list {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      overflow: auto;
      position: relative;
      .preview-child {
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        padding-left: 10px;
        box-sizing: border-box;
      }
      .preview-mask {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        > span {
          color: #888;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
    .preview-footer {
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 10px;
      box-shadow: 0 2px 12px 0 rgba($color: #000000, $alpha: 0.1);
    }
  }
  .mkdir {
    width: 100%;
    display: flex;
    align-items: center;
  }
}
</style>