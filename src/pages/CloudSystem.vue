<template>
  <div class="CloudSystem">
    <CloudHeader />
    <div class="cloud-main">
      <router-view></router-view>
    </div>
    <CloudSidebar />
    <PluginDocument />
  </div>
</template>



<script lang='ts'>
import store from "@/store";
import { computed, defineComponent, onMounted, nextTick } from "vue";
import CloudHeader from "../components/CloudHeader.vue";
import CloudSidebar from "../components/CloudSidebar.vue";
import PluginDocument from "../components/pluginDocument.vue";
export default defineComponent({
  name: "CloudSystem",
  components: { CloudHeader, CloudSidebar, PluginDocument },
  setup() {
    const previewVisible = computed(() => store.state.previewVisible);
    onMounted(() => {
      nextTick(() => {
        store.commit("setScrollH");
      });
    });

    return { previewVisible };
  },
});
</script>



<style lang="scss" scoped>
.CloudSystem {
  width: 100%;
  min-width: 1100px;
  height: 100%;
  position: fixed;
  background-color: #fff;
  padding: 90px 0 0 200px;
  box-sizing: border-box;
  .cloud-main {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>