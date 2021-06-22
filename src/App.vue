<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  components: {},
});
</script>

<style lang="scss">
@import "./assets/css/ress.css";
@import "./assets/css/public.scss";
.ElNotification-html {
  width: 260px;
  > p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
th > .cell {
  font-size: 15px;
  color: #333;
  font-weight: 700;
}
</style>
