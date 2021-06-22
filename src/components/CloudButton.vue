<template>
  <div
    class="CloudButton"
    :style="{ backgroundColor: row.bgColor, color: row.txtColor }"
  >
    <span>{{ row.title }}</span>
  </div>
</template>



<script lang='ts'>
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "CloudButton",
  props: {
    row: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
});
</script>



<style lang="scss" scoped>
.CloudButton {
  height: 30px;
  padding: 0 8px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid rgba($color: #888, $alpha: 0.2);
  cursor: pointer;
  display: inline-block;
  text-align: center;
  line-height: 30px;
  border-radius: 3px;
  user-select: none;
  margin-right: 10px;

  color: #333;
  > span {
    font-size: 12px;
    margin-left: 2x;
  }
  &:hover {
    opacity: 0.8;
  }
}
</style>