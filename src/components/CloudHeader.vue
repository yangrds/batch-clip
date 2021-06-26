<!--
 * @Author: 杨荣代
 * @Date: 2021-05-04 16:34:23
 * @LastEditTime: 2021-06-22 17:45:38
 * @LastEditors: 杨荣代
 * @Description: 
 * @FilePath: \free-cloud\src\components\CloudHeader.vue
-->

<template>
  <div class="CloudHeader">
    <div class="h-top">
      <div class="operation">
        <!-- 刷新 -->
        <div class="refresh">
          <span class="iconfont icon-shuaxin"></span>
        </div>

        <!-- 前进后退 -->
        <div class="back" @click="toClick('1')">
          <span class="iconfont icon-back" style="color: #333"></span>
        </div>
      </div>
      <!-- 路劲导航 -->
      <div class="nav-path">
        <i class="start iconfont icon-changyongicon-1"></i>
        <span
          v-for="(item, index) in paths"
          :key="index"
          :class="!item && 'iconfont icon-home'"
          @click="pathClick(index)"
          :style="{
            backgroundColor: index === paths.length - 1 ? '#0081ff' : '#f0f0f0',
            color: index === paths.length - 1 ? '#fff' : '#333',
          }"
          >{{ item }}</span
        >

        <i class="end iconfont icon-changyongicon-"></i>
      </div>

      <div class="tool-bar">
        <!-- 搜索 -->
        <div class="search">
          <span class="iconfont icon-search"></span>
        </div>
        <!-- 宫格 -->
        <div class="grid">
          <span class="iconfont icon-menu-s"></span>
        </div>
        <!-- 列表 -->
        <div class="list">
          <span class="iconfont icon-liebiao3"></span>
        </div>
      </div>
    </div>
    <!-- 工具栏 -->
    <!-- <div class="h-bottom">
      <CloudButton
        v-for="(item, index) in utilsBars"
        :key="index"
        :row="item"
        @click="item.click"
      />
    </div> -->
  </div>
</template>



<script lang='ts'>
import { defineComponent, onMounted, computed, watch, reactive } from "vue";
import { useStore } from "vuex";
import Upload from "../Utils/SimplyUpload";
import { ElNotification } from "element-plus";
export default defineComponent({
  name: "CloudHeader",
  components: {},
  
  setup() {
    /* Vuex状态管理 */
    const store = useStore();
    let status = {
      paths: computed(() => store.state.paths),
      utilsBars: computed(() => store.state.utilsBars),
      selectFiles: computed(() => store.state.selectFiles),
    };
    onMounted(() => {
      /*  */
    });

    const funcs: any = {
      barClick: (type: string) => {
        switch (type) {
          case "SimplyUpload":
            Upload(status.paths.value.join("/"));
            break;
          case "deleteFile":
            store.dispatch("deleteFile");
            break;
          case "copy":
            if (!funcs.ischeck()) break;
            store.commit("setState", { name: "previewModel", data: "copy" });
            store.commit("setState", { name: "previewVisible", data: true });
            break;
          case "mobile":
            if (!funcs.ischeck()) break;
            store.commit("setState", { name: "previewModel", data: "mobile" });
            store.commit("setState", {
              name: "previewVisible",
              data: true,
            });
            break;
          default:
            break;
        }
      },
      pathClick: (index: number) => {
        let paths = status.paths.value;

        /* 检测末尾 */
        if (index === paths.length - 1) {
          return;
        }

        store.commit("setState", {
          name: "paths",
          data: paths.slice(0, index + 1),
        });
      },

      ischeck: () => {
        if (status.selectFiles.value.length < 1) {
          ElNotification({
            title: "文件移动",
            message: "未勾选数据",
            type: "warning",
          });
          return false;
        }
        return true;
      },

      toClick: (type: any) => {
        let paths = status.paths.value;
        if (paths.length < 2) return;
        store.commit("setState", {
          name: "paths",
          data: paths.slice(0, paths.length - 1),
        });
      },
    };

    return {
      ...status,
      ...funcs,
      store,
    };
  },
});
</script>



<style lang="scss" scoped>
@import "../assets/css/mixin.scss";
.CloudHeader {
  width: 100%;
  height: 90px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
  box-shadow: 0 2px 12px 0 rgba($color: #888, $alpha: 0.2);
  box-sizing: border-box;
  background-color: #fff;
  user-select: none;
  > .h-top {
    width: 100%;
    height: 50px;
    padding-left: 85px;
    padding-right: 180px;
    box-sizing: border-box;
    display: flex;
    position: relative;
    @include before(0.6);
    .operation {
      width: 85px;
      height: 50px;
      position: absolute;
      left: 0;
      top: 0;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .home,
      .upload,
      .back,
      .refresh,
      .new-dir {
        width: 32px;
        height: 32px;
        margin-left: 10px;
        background-color: #f5f5f5;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
          background-color: #e5e5e5;
        }
        > span {
          font-size: 20px;
        }
      }
    }
    .nav-path {
      width: 100%;
      height: 50px;
      padding-right: 20px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      position: relative;
      overflow-y: auto;
      margin-left: 10px;
      > .start,
      .end {
        cursor: pointer;
        display: none;
        margin: 0 10px 0 0px;
      }
      > span {
        min-width: 15px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        color: #424d68;
        font-size: 14px;
        border-radius: 10px;
        margin-right: 10px;
        cursor: pointer;
      }
    }
    .tool-bar {
      width: 180px;
      height: 50px;
      position: absolute;
      right: 0;
      top: 0;
      padding: 0 20px;
      display: flex;
      box-sizing: border-box;
      align-items: center;
      justify-content: space-between;
      .grid,
      .list,
      .search,
      .more {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: #f8f8f8;
        &:hover {
          background-color: #e5e5e5;
        }
        > span {
          color: #333;
          font-size: 18px;
        }
      }
    }
  }
  > .h-bottom {
    width: 100%;
    height: 40px;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
}
</style>