<template>
  <div class="CloudFileClass">
    <el-table
      empty-text="啥JB都没有"
      @selection-change="selectionChange"
      :data="FileClassList"
      style="width: 100%"
      :height="scrollH"
    >
      <el-table-column type="selection" size="medium" width="25">
      </el-table-column>
      <el-table-column label="名称">
        <template #default="scope">
          <div class="file-name">
            <svg class="icon" aria-hidden="true">
              <use
                :xlink:href="`#${IconTool(scope.row.fileName, false)}`"
              ></use>
            </svg>

            <span @click="pathClick(scope.row)"> {{ scope.row.fileName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" width="200">
        <template #default="scope">
          <span style="font-size: 14px">
            {{ dateFormat("YY-mm-dd HH:MM:SS", scope.row.mtimeMs) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="大小" width="200">
        <template #default="scope">
          <span style="font-size: 14px">
            {{ scope.row.dir ? "" : renderSize(scope.row.size) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="类型" width="200"> </el-table-column>
    </el-table>
  </div>
</template>



<script lang='ts'>
import { useStore } from "vuex";
import { computed, defineComponent, onMounted, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { dateFormat, renderSize, IconTool } from "../Utils/Tool";
import { getFileClass } from "../server/api";
import {_menus} from "../CloudData/menus";

export default defineComponent({
  name: "CloudFileClass",
  components: {},
  setup() {
    const store = useStore();
    const route = useRoute();
    const suffixs = computed(() => store.state.suffixs);
    const scrollH = computed(() => store.state.scrollH);
    const FileClassList = computed(() => store.state.FileClassList);

    /* 监听suffixs文件分类 */
    watch(suffixs, () => store.dispatch("updateFileClass"));

    onMounted(() => {
      let temps = [];
      // _menus.forEach((obj: any) => temps.push(...obj));
      temps.forEach(
        (obj: any) =>
          route.path === obj.path && store.dispatch("updateFileClass")
      );
    });
    const methods = {
      selectionChange: (selection: any) => {
        store.commit("setState", { name: "selectFiles", data: selection });
      },
      IconTool,
      dateFormat,
      renderSize,
    };

    return {
      ...methods,
      FileClassList,
      suffixs,
      scrollH,
    };
  },
});
</script>



<style lang="scss" scoped>
</style>