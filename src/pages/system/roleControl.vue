<!--
 * @Author: 杨荣代
 * @Date: 2021-06-22 14:32:49
 * @LastEditTime: 2021-06-23 17:58:28
 * @LastEditors: 随风
 * @Description: 
 * @FilePath: \free-cloud\src\pages\system\roleControl.vue
-->

<template>
  <div class="roleControl">
    <el-table :data="roleData" :height="scrollH" style="width: 100%">
      <el-table-column type="selection" width="25"> </el-table-column>
      <el-table-column prop="title" label="名称" width="300px">
      </el-table-column>
      <el-table-column prop="title" label="权限">
        <template #default="scope">
          <el-tag
            size="small"
            type="warning"
            effect="dark"
            v-for="(item, key) in scope.row.permissions"
            :key="key"
            v-show="item"
            style="margin-right: 10px"
            >{{ permissionsName(key) }}</el-tag
          >
        </template>
      </el-table-column>
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
              v-model="roleState.permissions.personal"
              label="个人空间"
            ></el-checkbox>
            <el-checkbox
              v-model="roleState.permissions.organization"
              label="公司空间"
            ></el-checkbox>
            <el-checkbox
              v-model="roleState.permissions.team"
              label="部门空间"
            ></el-checkbox>
            <el-checkbox
              v-model="roleState.permissions.share"
              label="文件分享"
            ></el-checkbox>
            <el-checkbox
              v-model="roleState.permissions.settings"
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
import { addRoleInfo, roleList } from "../../server/api";

export default defineComponent({
  name: "roleControl",
  components: {},
  setup() {
    const scrollH = computed(() => store.state.scrollH);
    const roleAddVisible = ref(false);
    const checkList = reactive([]);
    const roleState = reactive({
      title: "",
      permissions: {
        personal: true,
        organization: true,
        team: true,
        share: true,
        settings: false,
      },
    });
    const roleData = reactive([]);

    function permissionsName(key: string): string {
      let name = "";
      switch (key) {
        case "personal":
          name = "个人空间";
          break;
        case "organization":
          name = "公司空间";
          break;
        case "team":
          name = "部门空间";
          break;
        case "share":
          name = "文件分享";
          break;
        case "settings":
          name = "系统设置";
          break;
        default:
          break;
      }
      return name;
    }

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

    async function save(): Promise<void> {
      const { code } = await addRoleInfo(roleState);
      if (code === 200) {
        roleAddVisible.value = false;
      }
    }

    function roleAdd() {
      roleAddVisible.value = true;
    }

    onMounted(async () => {
      const { data } = await roleList();
      roleData.splice(0, roleData.length - 1);
      roleData.push(...data);

      console.log(roleData);
    });
    return {
      roleData,
      roleAddVisible,
      scrollH,
      roleState,
      checkList,
      save,
      permissionsName,
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
