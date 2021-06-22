<template>
  <div class="CloudSidebar">
    <div class="menu">
      <div class="menu-child" v-for="(item, index) in menus" :key="index">
        <div class="menu-item" @click="menuClick(item)" :style="{color: item.checked ? '#387ff7' : '#888'}">
          <span :class="`iconfont ${item.icon}`"></span>
          <span>{{ item.title }}</span>
          <i
            v-if="item.children.length > 0"
            :class="`el-icon-arrow-down ${
              item.open ? 'icon-open' : 'icon-close'
            }`"
            style="transition:.4s"
          ></i>
        </div>
        <div
          class="menu-children"
          v-for="(child, num) in item.children"
          :key="num"
        >
          <div
            :class="`children-item ${item.open ? 'open' : 'close'}`"
            :style="{
              backgroundColor: child.checked ? '#387ff7' : '#fff',
              color: child.checked ? '#fff' : '#555',
            }"
            @click="navigation(child)"
          >
            <span>{{ child.title }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="disk">
        <div class="disk-progress">
          <i></i>
        </div>
        <span>167MB/5GB</span>
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
import { uuid } from "../Utils/Tool";
import { _menus } from "../CloudData/menus";
import { useRoute, useRouter } from "vue-router";
import store from "@/store";

export default defineComponent({
  name: "CloudSidebar",
  components: {},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const menus = reactive(_menus);

    const active = reactive({ path: route.path });
    const transmission = computed(() => store.state.transmission);
    function toFun(path: string, suffixs?: string[]) {
       store.commit("setState", {
      name: "utilsBars",
      data: []
    });

      console.log(path);
      
      router.push({ path });
      // store.commit("setState", { name: "suffixs", data: suffixs });
    }

    function activeClick(row: any) {
      active.path = row.path;
      toFun(row.path, row.suffixs);
    }

    function toIndex() {
      return Object.keys(transmission.value).length;
    }
    function menuActive(id: string) {
      menus.map((item: any) => {
        item.checked = id === item.id;
        item.children.map((temp: any) => {
          temp.checked = id === temp.id;
        });
      });
    }

    
    function navigation(item:any){
      menuActive(item.id)
      toFun(item.path)
    }



    onMounted(() => {
      /*  */
    });

    function menuClick(row: any) {
      if (row.children.length > 0) {
        row.open = !row.open;
      } else {
        menuActive(row.id);
        toFun(row.path)
      }
    }

    function handleOpen(key: any, keyPath: any) {
      console.log(key, keyPath);
    }
    function handleClose(key: any, keyPath: any) {
      console.log(key, keyPath);
    }

    return {
      menus, // 菜单数据
      active, // 当前活跃
      menuClick,
      activeClick, // 触发活跃
      toIndex,
      handleOpen,
      handleClose,
      navigation,
      transmission,
    };
  },
});
</script>

<style lang="scss">
.open {
  height: 40px !important;
}
.close {
  height: 0 !important;
  opacity: 0;
}
.icon-open {
  transform: translateY(-50%) rotate(-180deg);
}
.icon-close {
  transform: translateY(-50%) rotate(0deg);
}
</style>



<style lang="scss" scoped>
@import "../assets/css/mixin.scss";
.CloudSidebar {
  width: 200px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding-top: 90px;
  padding-bottom: 60px;
  box-sizing: border-box;
  background-color: #fcfcfc;
  box-shadow: 0 2px 12px 0 rgba($color: #888, $alpha: 0.1);
  .menu {
    width: 100%;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: relative;
    .menu-child {
      width: 100%;
      position: relative;
      .menu-item {
        width: 100%;
        min-height: 50px;
        padding-left: 40px;
        position: relative;
        display: flex;
        align-items: center;
        position: relative;
        color: #888;
        border-radius: 10px;
        box-sizing: border-box;
        cursor: pointer;
        user-select: none;
        @include before(0.6);
        > span:nth-child(1) {
          font-size: 18px;
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
        }
        > span:nth-child(2) {
          font-size: 15px;
          font-weight: 800;
        }
        > i {
          box-sizing: border-box;
          font-size: 15px;
          color: #888;
          position: absolute;
          right: 10px;
          top: 50%;
        }
      }
      .menu-children {
        width: 100%;
        background-color: #fff;
        .children-item {
          width: 100%;
          height: 0px;
          overflow: hidden;
          cursor: pointer;
          font-size: 14px;
          color: #555;
          display: flex;
          align-items: center;
          padding-left: 40px;
          box-sizing: border-box;
          position: relative;
          @include before(0.2);
          transition: 0.2s;
          &:hover {
            background-color: #387ff7 !important;
            color: #fff !important;
          }
        }
      }
    }
  }
  .disk{
    width: 100%;
    height: 60px;
    padding: 0 20px;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @include TopBefore(0.9);
    .disk-progress{
      width: 100%;
      height: 16px;
      background-color: #f5f5f5;
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      >i{
        width: 40%;
        height: 100%;
        background-color: #0081ff;
      }
    }
    >span{
      color: #888;
      margin-top: 4px;
      font-weight: 700;
    }
  }
}
</style>