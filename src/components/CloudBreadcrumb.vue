<template>
  <div class="CloudBreadcrumb"></div>
</template>



<script lang='ts'>
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  watch,
} from "vue";
export default defineComponent({
  name: "CloudBreadcrumb",
  components: {},
  props: {
    paths: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props: any) {
    const navs = reactive([""]);
    watch(props.paths, (to: any) => {
      navs.splice(0, navs.length);
      navs.push(...to);
      nextTick(pathUpdate);
    });

    function pathUpdate() {
      let breadcrumb = heightTool(".preview-breadcrumb");
      let preview = heightTool(".preview-nav");
      if (breadcrumb > preview) {
        navs.splice(0, navs.length);
        navs.push(
          ...[props.paths[0], "...", props.paths[props.paths.length - 1]]
        );
      }
    }
    function heightTool(element: any) {
      if (typeof element === "string") {
        return document.querySelector(element).getBoundingClientRect().width;
      }
      return element.getBoundingClientRect().width;
    }
    onMounted(() => {
      console.log("");
    });
    return { navs };
  },
});
</script>



<style lang="scss" scoped>
</style>