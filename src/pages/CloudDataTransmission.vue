<template>
  <div class="CloudDataTransmission scroll-h">
    <div class="header">
      <div class="header-child" style="width: 30px">
        <el-checkbox v-model="checked"></el-checkbox>
      </div>
      <div class="header-child" style="flex: 1">
        <span>名称</span>
      </div>
      <div class="header-child" style="width: 190px">
        <span>大小</span>
      </div>
      <div class="header-child" style="width: 190px">
        <span>进度</span>
      </div>
      <div class="header-child" style="width: 190px">
        <span>状态</span>
      </div>
      <div class="header-child" style="width: 190px">
        <span>操作</span>
      </div>
    </div>
    <div class="transmission">
      <div class="transmission-tr" v-for="item in transmission" :key="item.id">
        <div class="transmission-td" style="width: 30px">
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="transmission-td" style="flex: 1">
          <span style="font-size: 16px">{{ item.file.name }}</span>
        </div>
        <div class="transmission-td" style="width: 190px">
          <span>{{
            renderSize(item.current) + "/" + renderSize(item.totalSize)
          }}</span>
        </div>

        <div class="transmission-td" style="width: 190px">
          <div class="progress-child">
            <i
              :style="{
                width:
                  item.statusTxt === '文件读取中'
                    ? item.readIndex + '%'
                    : Percentage(item.current, item.totalSize) + '%',
                backgroundColor: progressColor(item.statusTxt),
              }"
            ></i>
          </div>
        </div>

        <div class="transmission-td" style="width: 190px">
          <span> {{ item.statusTxt }}</span>
        </div>

        <div class="transmission-td" style="width: 190px">
          <el-button
            v-if="item.current < 100 && item.current > 0"
            style="width: 30px"
            @click="item.chunk.chunkSwitch()"
            type="text"
            >{{ item.chunk.status ? "暂停" : "开始" }}</el-button
          >
          <el-button type="text" @click="uploadDelete(item.id)">删除</el-button>
        </div>
      </div>

      <div class="null" v-if="Object.keys(transmission).length === 0">
        <img src="../assets/images/data-disk.svg" />
        <span>空空如也</span>
      </div>
    </div>
  </div>
</template>



<script lang='ts'>
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { useStore } from "vuex";
import { renderSize, IconTool, Percentage } from "../Utils/Tool";
export default defineComponent({
  name: "CloudDataTransmission",
  components: {},
  setup() {
    const store = useStore();
    const transmission = computed(() => store.state.transmission);
    const chunkStatus = ref(true);
    onMounted(() => {
      /*  */
    });

    function uploadDelete(id: string) {
      const obj = transmission.value;
      delete obj[id];
      store.commit("setState", {
        name: "transmission",
        data: obj,
      });
    }

    function chunkAction(chunk: any) {
      let info = { title: "开始", disabled: chunk.readFileStatus };

      info.title = chunk.statusTxt === "文件上传中" ? "暂停" : "开始";

      return info;
    }

    function progressColor(txt: string) {
      let color = "";
      switch (txt) {
        case "文件读取中":
          color = "#008B8B";
          break;
        case "上传完毕":
          color = "#DCA550";
          break;
        case "上传失败":
          color = "#A0522D";
          break;
        case "文件写入中":
          color = "#191970";
          break;
        default:
          color = "	#00BFFF";
          break;
      }
      return color;
    }

    return {
      renderSize,
      IconTool,
      transmission,
      Percentage,
      checked: true,
      progressColor,
      uploadDelete,
      chunkStatus,
      chunkAction,
    };
  },
});
</script>



<style lang="scss" scoped>
@import "../assets/css/mixin.scss";
.CloudDataTransmission {
  background-color: #fff;
  .progress-child {
    width: 100px;
    height: 15px;
    background-color: #f5f5f5;
    position: relative;
    border-radius: 2px;
    overflow: hidden;
    i {
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .file-name {
    width: 100%;
    font-size: 20px;
    display: flex;
    align-items: center;
    > span {
      font-size: 14px;
      margin-left: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .header {
    width: 100%;
    height: 50px;
    display: flex;
    position: relative;
    @include before(0.6);
    background-color: #fff;
    > .header-child {
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 10px;
      box-sizing: border-box;
      > span {
        color: #333;
        font-size: 15px;
        font-weight: 700;
      }
    }
  }
  > .transmission {
    width: 100%;

    position: relative;
    > .null {
      width: 100%;
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 100px;
      position: relative;
      img {
        width: 200px;
        height: 200px;
      }
      > span {
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translateX(-50%);
        font-size: 13px;
        color: #888;
      }
    }
    > .transmission-tr {
      width: 100%;
      height: 50px;
      display: flex;
      @include before(0.6);
      position: relative;
      background-color: #fff;
      .transmission-td {
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 10px;
        box-sizing: border-box;
        color: #606266;
        font-size: 14px;
      }
    }
  }
}
</style>