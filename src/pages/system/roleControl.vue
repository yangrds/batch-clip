<!--
 * @Author: 杨荣代
 * @Date: 2021-06-22 14:32:49
 * @LastEditTime: 2021-06-22 16:25:00
 * @LastEditors: 杨荣代
 * @Description: 
 * @FilePath: \free-cloud\src\pages\system\roleControl.vue
-->

<template>
  <div class="roleControl">
    <el-table :data="roleData" :height="scrollH" style="width: 100%">
      <el-table-column type="selection" width="25"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="name" label="权限"> </el-table-column>
      <el-table-column prop="name" label="硬盘占用"> </el-table-column>
    </el-table>

    <el-dialog
      title="添加角色"
      v-model="roleAddVisible"
      width="400px"
      :before-close="(none) => none()"
    >
      <div class="role-model">
        <div class="model-child">
          <span>角色名称</span>
          <el-input
            v-model="roleState.title"
            placeholder="请输入角色名称"
          ></el-input>
        </div>
        <div class="model-child">
          <span>权限</span>
          <div class="model-check">
            <el-checkbox
              v-model="roleState.jurisdiction.personal"
              label="个人空间"
            ></el-checkbox>
            <el-checkbox
              v-model="roleState.jurisdiction.organization"
              label="公司空间"
            ></el-checkbox>
            <el-checkbox
              v-model="roleState.jurisdiction.team"
              label="部门空间"
            ></el-checkbox>
            <el-checkbox
              v-model="roleState.jurisdiction.share"
              label="文件分享"
            ></el-checkbox>
            <el-checkbox
              v-model="roleState.jurisdiction.settings"
              label="系统设置"
            ></el-checkbox>
          </div>
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
import { addRoleInfo } from "../../server/api";

export default defineComponent({
  name: "roleControl",
  components: {},
  setup() {
    const scrollH = computed(() => store.state.scrollH);
    const roleAddVisible = ref(false);
    const checkList = reactive([]);
    const roleState = reactive({
      title: "",
      jurisdiction: {
        personal: true,
        organization: true,
        team: true,
        share: true,
        settings: false,
      },
    });
    const roleData = reactive([
      {
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄",
      },
      {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄",
      },
      {
        date: "2016-05-01",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1519 弄",
      },
      {
        date: "2016-05-03",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1516 弄",
      },
    ]);

    store.commit("setState", {
      name: "utilsBars",
      data: [
        {
          title: "角色添加",
          size: "16px",
          bgColor: "#f5f5f5",
          txtColor: "#333",
          click: roleAdd,
        },
      ],
    });

    function save(): void {
      addRoleInfo(roleState);
    }

    function roleAdd() {
      roleAddVisible.value = true;
    }

    onMounted(() => {
      console.log("");
    });
    return {
      roleData,
      roleAddVisible,
      scrollH,
      roleState,
      checkList,
      save,
    };
  },
});
</script>



<style lang="scss" scoped>
.role-model {
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
