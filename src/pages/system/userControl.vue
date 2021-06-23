<template>
  <div class="userControl">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
    </el-table>
    <el-dialog
      title="添加角色"
      v-model="userAddVisible"
      width="400px"
      :before-close="(none) => none()"
    >
      <div class="user-model">
        <div class="model-child">
          <span>用户名称</span>
          <el-input
            v-model="userState.title"
            placeholder="请输入角色名称"
          ></el-input>
        </div>
        <div class="model-child">
          <span>权限</span>
        </div>
        <div class="model-btn">
          <el-button type="primary">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>



<script lang='ts'>
import store from "@/store";
import { defineComponent, onMounted, reactive, ref } from "vue";

export default defineComponent({
  name: "userControl",
  components: {},
  setup() {
    const tableData = reactive([]);
    const userState = reactive({
      title: "",
    });
    const userAddVisible = ref(false);
    onMounted(() => {
      console.log("");
    });
    store.commit("setState", {
      name: "utilsBars",
      data: [
        {
          title: "用户添加",
          size: "16px",
          bgColor: "#f5f5f5",
          txtColor: "#333",
          click: userAdd,
        },
      ],
    });
    function userAdd(): void {
      userAddVisible.value = true
    }
    return {
      tableData,
      userState,
      userAddVisible
    };
  },
});
</script>



<style lang="scss" scoped>
  .user-model {
  width: 100%;
  .model-child {
    width: 100%;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    > span {
      width: 100px;
      font-size: 16px;
      text-align: right;
      margin-right: 10px;
    }
  }
  .model-btn {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }
  .model-check {
    width: 100%;
    display: flex;
    // flex-direction: column;
    flex-wrap: wrap;
  }
}
</style>