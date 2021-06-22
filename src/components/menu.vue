<!--
 * @Author: 杨荣代
 * @Date: 2021-06-21 09:22:54
 * @LastEditTime: 2021-06-21 09:36:41
 * @LastEditors: 杨荣代
 * @Description: 
 * @FilePath: \free-cloud\src\components\menu.vue
-->

<template>
  <div class="menu">
    <div class="menu-child">
      <span class="iconfont icon-home"></span>
      <span>主页管理</span>
    </div>
  </div>
</template>



<script lang='ts'>
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "menu",
  components: {},
  setup() {
    onMounted(() => {
      console.log("");
    });
  },
});
</script>



<style lang="scss" scoped>
@import "../assets/css/mixin.scss";
.menu {
  width: 100%;
  height: 400px;
  box-sizing: border-box;
  .menu-child {
    width: 100%;
    height: 50px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    @include before(0.6);
    cursor: pointer;
    >span:nth-child(1){
        margin-top: 2px;
        color: #888;
    }
    >span:nth-child(2){
        margin-left: 6px;
    }
  }
}
</style>