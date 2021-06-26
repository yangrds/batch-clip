<template>
  <div class="userControl">
    <div class="system-header">
      <el-button type="primary" size="small" @click="userAdd">添加</el-button>
      <el-button size="small">编辑</el-button>
      <el-button size="small">删除</el-button>
    </div>
    <el-table :data="userData" :height="scrollH - 50" style="width: 100%">
       <el-table-column type="selection" width="25"> </el-table-column>
      <el-table-column prop="title" label="名称"> </el-table-column>
      <el-table-column prop="jobName" label="职位"> </el-table-column>
      <el-table-column prop="jobId" label="工号"> </el-table-column>
    </el-table>
    <el-dialog
      title="添加角色"
      v-model="userAddVisible"
      width="400px"
      :before-close="(none) => none()"
    >
      <div class="user-model">
        <div class="model-child">
          <span>名称</span>
          <el-input
            v-model="userState.title"
            placeholder="请输入角色名称"
          ></el-input>
        </div>
        <div class="model-child">
          <span>工号</span>
          <el-input
            v-model="userState.jobId"
            placeholder="请输入角色名称"
          ></el-input>
        </div>
        <div class="model-child">
          <span>职位</span>
          <el-input
            v-model="userState.jobName"
            placeholder="请输入角色名称"
          ></el-input>
        </div>
        <div class="model-btn">
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>



<script lang='ts'>
import store from "@/store";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { addUserInfo, userList } from "../../server/api";
export default defineComponent({
  name: "userControl",
  components: {},
  setup() {
    const scrollH = computed(() => store.state.scrollH);
    const userData = reactive([]);
    const userState = reactive({
      title: "",
      jobId: "",
      jobName: "",
    });
    const userAddVisible = ref(false);
    onMounted(async () => {
      const { data } = await userList();
      userData.splice(0, userData.length - 1);
      userData.push(...data);
    });
    function userAdd(): void {
      userAddVisible.value = true;
    }
    function save() {
      addUserInfo(userState);
      userAddVisible.value = false;
    }
    return {
      userData,
      userState,
      userAddVisible,
      scrollH,
      userAdd,
      save,
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
      width: 50px;
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