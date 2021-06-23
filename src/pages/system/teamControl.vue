<template>
  <div class="teamControl">
    <el-table :data="teamData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    </el-table>
    <el-dialog
      title="添加角色"
      v-model="teamAddVisible"
      width="800px"
      :before-close="(none) => none()"
    >
      <div class="team-model">
        <div class="model-child">
          <span>团队名称</span>
          <el-input
            style="width: 200px"
            v-model="teamState.title"
            placeholder="请输入角色名称"
          ></el-input>
        </div>
        <div class="model-child">
          <span>创建者</span>
          <el-input
            style="width: 200px"
            placeholder="请输入角色名称"
          ></el-input>
        </div>
        <div class="model-child">
          <span>团队成员</span>
          <div class="model-member">
              <el-checkbox>杜生平</el-checkbox>
              <el-checkbox>杨浩楠</el-checkbox>
              <el-checkbox>刘雯生</el-checkbox>
              <el-checkbox>湖光年</el-checkbox>
          </div>
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
  name: "teamControl",
  components: {},
  setup() {
    const teamData = reactive([]);
    const teamState = reactive({
      title: "",
    });
    const teamAddVisible = ref(false);

    onMounted(() => {
      console.log("");
    });

    store.commit("setState", {
      name: "utilsBars",
      data: [
        {
          title: "创建团队",
          size: "16px",
          bgColor: "#f5f5f5",
          txtColor: "#333",
          click: teamAdd,
        },
      ],
    });

    function teamAdd(): void {
      teamAddVisible.value = true;
    }

    return {
      teamData,
      teamState,
      teamAddVisible,
    };
  },
});
</script>



<style lang="scss" scoped>
.team-model {
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
    flex-wrap: wrap;
  }
  .model-member{
      width: 500px;
      max-height: 500px;
      overflow: auto;
  }
}
</style>