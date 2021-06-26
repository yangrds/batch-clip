<template>
  <div class="teamControl">
    <div class="system-header">
      <el-button type="primary" size="small" @click="teamInfoEvoke('add')"
        >创建团队</el-button
      >
      <el-button size="small" @click="removeTeamCclick(null)">删除</el-button>
    </div>
    <el-table
      :height="scrollH - 50"
      empty-text="团队数据为空"
      @selection-change="teamChange"
      :data="teamData"
      style="width: 100%"
    >
      <el-table-column type="selection" width="25"> </el-table-column>
      <el-table-column prop="title" label="团队名称" width="180">
      </el-table-column>
      <el-table-column prop="title" label="创建者" width="180">
      </el-table-column>
      <el-table-column label="团队成员" width="180">
        <template #default="scope">
          <span>{{ scope.row.members.length }}人</span>
        </template>
      </el-table-column>

      <el-table-column prop="title" width="180" label="管理员">
        <template #default="scope">
          <span
            >{{
              scope.row.members.filter((item) => item.isAdmin).length
            }}人</span
          >
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200px">
        <template #default="scope">
          <el-button type="text" @click="teamInfoEvoke('editor', scope.row)"
            >编辑</el-button
          >
          <el-button type="text" @click="removeTeamCclick(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="`团队信息`"
      v-model="teamInfoVisible"
      top="50px"
      width="1000px"
      :before-close="(none) => none()"
    >
      <div class="team-model">
        <div class="model-child">
          <span>团队名称</span>
          <el-input
            style="width: 200px"
            v-model="teamState.title"
            size="small"
            placeholder="请输入角色名称"
          ></el-input>
        </div>
        <div class="model-child">
          <span>团队成员</span>
          <div class="model-member">
            <div class="member-title">
              <el-button size="small" @click="memberClick" type="primary"
                >选择成员</el-button
              >
            </div>

            <el-table
              :data="teamState.members"
              empty-text="成员数据为空"
              maxHeight="600px"
              style="width: 100%"
            >
              <el-table-column prop="title" label="名称">
                <template #default="scope">
                  <span>{{ userTool(scope.row.memberId).title }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="jobName" label="权限">
                <template #default="scope">
                  <span
                    :style="{
                      color: scope.row.isAdmin ? '#5A9CF8' : '#DB7093',
                    }"
                    >{{ scope.row.isAdmin ? "团队管理员" : "普通成员" }}</span
                  >
                </template>
              </el-table-column>
              <el-table-column prop="jobId" label="工号">
                <template #default="scope">{{
                  userTool(scope.row.memberId).jobId
                }}</template>
              </el-table-column>
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button
                    :style="{ color: scope.row.isAdmin ? '#888' : '#5A9CF8' }"
                    type="text"
                    @click="() => (scope.row.isAdmin = !scope.row.isAdmin)"
                    >{{
                      scope.row.isAdmin ? "取消管理员" : "设为管理员"
                    }}</el-button
                  >
                  <el-button
                    :style="{ color: 'red' }"
                    type="text"
                    @click="removeMember(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="model-btn">
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      title="用户列表"
      v-model="memberVisible"
      ref="memberTable"
      width="700px"
      top="50px"
      :before-close="(none) => none()"
    >
      <el-table
        :data="userTable"
        empty-text="用户数据为空"
        v-if="memberVisible"
        @selection-change="memberChange"
        style="width: 100%"
      >
        <el-table-column type="selection" width="25"> </el-table-column>
        <el-table-column prop="title" label="名称"> </el-table-column>
        <el-table-column prop="jobName" label="职位"></el-table-column>
        <el-table-column prop="jobId" label="工号"> </el-table-column>
      </el-table>
      <div class="preview-btn">
        <el-button size="small" type="warning" @click="memberSubmit"
          >确定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>



<script lang='ts'>
import {
  userList,
  addTeamInfo,
  teamList,
  editorTeamInfo,
  teamDelete,
} from "@/server/api";
import store from "@/store";
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";

interface TeamType {
  title: string;
  members: any[];
  _id?: string;
}
import { ElNotification, ElMessageBox, ElMessage } from "element-plus";
import { result } from "lodash";

export default defineComponent({
  name: "teamControl",
  components: {},
  setup() {
    /* 团队列表高度 */
    const scrollH = computed(() => store.state.scrollH);

    /* 团队列表数据 */
    const teamData = reactive([]);

    /* 用户列表（选择数据） */
    const memberVisible = ref(false);

    /* 当前勾选数据 */
    const memberSelection = reactive([]);

    /* 用户数据（初始） */
    const userOptions = reactive([]);

    /* 用户数据（列表） */
    const userTable = reactive([]);

    /* 团队当前勾选信息 */
    const teamSelection = reactive([]);

    /* 当前团队信息 */
    const teamState: TeamType = reactive({
      title: "",
      members: [],
    });

    /* 团队信息对话框显示 */
    const teamInfoVisible = ref(false);

    onMounted(async () => {
      await getuser();
      getteam();
    });

    /* 成员待选列表，数据同步 */
    function teamChange(selection: any[]) {
      ArrayUpdate(teamSelection, selection);
    }

    function removeTeamCclick(id?: string): void {
      const ids = id ? [id] : extract(teamSelection, "_id");
      if (ids.length < 1) {
        ElMessage.error('操作失败，没有数据被勾选！');
        return;
      }

      ElMessageBox.confirm(
        `此操作将永久删除 ${ids.length} 条数据, 是否继续?`,
        "团队信息删除",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          const { code } = await teamDelete({ ids });
          ElNotification({
            title: "团队信息",
            message: `团队删除${code === 200 ? "成功" : "失败"}`,
            type: code === 200 ? "success" : "error",
          });
          getteam();
        })
        .catch(() => {
          /*  */
        });
    }

    /* 成员选择 */
    function memberSubmit(): void {
      memberVisible.value = false;
      ArrayUpdate(teamState.members, [
        ...teamState.members,
        ...memberSelection,
      ]);
    }

    /* 成员选择列表，删除数据 */
    function removeMember(row: any): void {
      const list = teamState.members.filter(
        (item: any) => row.memberId != item.memberId
      );
      ArrayUpdate(teamState.members, list);
    }

    /* 成员待选列表，数据同步 */
    function memberChange(selection: any[]) {
      ArrayUpdate(memberSelection, selection);
    }

    /* 团队成员名称提取 */
    function userTool(id: string) {
      let obj = {};
      userOptions.map((item) => {
        item._id === id && (obj = item);
      });
      return obj;
    }

    /* 选择团队成员 */
    function memberClick(): void {
      /* 提取memberId，筛选 */
      const members = extract(teamState.members, "memberId");
      const temps = [];
      /* 数据加工，members已有的数据，将不加入temps */
      userOptions.forEach(
        (item: any) => members.indexOf(item.memberId) == -1 && temps.push(item)
      );

      /* 更新用户数据userTable */
      ArrayUpdate(userTable, temps);
      /* 唤起用户选择列表 */
      memberVisible.value = true;
    }

    /* proxy 数组 替换数据 */
    function ArrayUpdate(arr: any[], list: any[]) {
      arr.splice(0, arr.length);
      arr.push(...list);
    }

    /* 将数组内指定key提取出来形成一个全新的数组 */
    function extract(arr: any, key: string): string[] {
      return arr.map((item: any) => {
        return item[key];
      });
    }

    /* 团队列表 */
    async function getteam() {
      const { data, code } = await teamList();
      code === 200 && ArrayUpdate(teamData, data);
    }

    /* 保存数据（添加/修改） */
    async function save() {
      teamState.members = teamState.members.map((item: any) => {
        return {
          memberId: item.memberId,
          isAdmin: item.isAdmin,
        };
      });
      let result: any;
      if (teamState._id) {
        result = await editorTeamInfo(teamState);
      } else {
        result = await addTeamInfo(teamState);
      }
      const { code } = result;

      teamInfoVisible.value = false;
      ElNotification({
        title: "团队信息",
        message: `团队更新${code === 200 ? "成功" : "失败"}`,
        type: code === 200 ? "success" : "error",
      });
      getteam();
    }

    /* 用户数据 */
    async function getuser() {
      const { data, code } = await userList();
      if (code === 200) {
        let temp = [];
        data.map((item: any) =>
          temp.push({ ...item, memberId: item._id, isAdmin: false })
        );
        ArrayUpdate(userOptions, temp);
      }
    }

    /* 唤起团队添加模块 */
    function teamInfoEvoke(type: string, row?: any): void {
      if (type === "add") {
        teamState.title = "";
        ArrayUpdate(teamState.members, []);
      } else {
        teamState.title = row.title;
        teamState._id = row._id;
        ArrayUpdate(teamState.members, row.members);
      }

      teamInfoVisible.value = true;
    }

    return {
      teamData,
      teamState,
      scrollH,
      userOptions,
      memberVisible,
      userTable,
      teamInfoVisible,
      teamInfoEvoke,
      save,
      userTool,
      memberClick,
      memberSubmit,
      memberChange,
      removeMember,
      removeTeamCclick,
      teamChange,
    };
  },
});
</script>



<style lang="scss" scoped>
.teamControl {
  .team-model {
    width: 100%;
    .model-child {
      width: 100%;
      margin-bottom: 30px;
      display: flex;
      padding-left: 100px;
      box-sizing: border-box;
      position: relative;
      > span {
        width: 100px;
        font-size: 16px;
        text-align: right;
        margin-right: 10px;
        position: absolute;
        left: 0;
        top: 0;
        padding-right: 10px;
        box-sizing: border-box;
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
    .model-member {
      width: 100%;
      overflow: auto;
      .member-title {
        width: 100%;
        height: 40px;
      }
    }
  }
  .preview-model {
    width: 100%;
    min-height: 150px;
    overflow: auto;
  }
  .preview-btn {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }
}
</style>