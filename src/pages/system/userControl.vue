<template>
  <div class="userControl">
    <div class="system-header">
      <el-button type="primary" size="small" @click="userAdd">添加</el-button>
      <el-button size="small">编辑</el-button>
      <el-button size="small">删除</el-button>
    </div>
    <el-table :data="userData" :height="scrollH - 50" style="width: 100%">
      <el-table-column type="selection" width="25"> </el-table-column>
      <el-table-column label="头像" width="70">
        <template #default="scope">
          <img
            style="border-radius: 4px"
            width="40"
            :src="host + scope.row.portrait"
          />
        </template>
      </el-table-column>
      <el-table-column prop="user" label="用户名"> </el-table-column>
      <el-table-column prop="superUser" label="超级用户">
        <template #default="scope">
          <span>{{ scope.row.superUser ? "是" : "否" }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="昵称"> </el-table-column>
      <el-table-column prop="jobName" label="职位"> </el-table-column>
      <el-table-column prop="jobId" label="工号"> </el-table-column>

      <el-table-column label="操作" width="200px">
        <template #default="">
          <el-button type="text">修改</el-button>
          <el-button type="text">注销</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="用户注册"
      v-model="userAddVisible"
      width="800px"
      :before-close="(none) => none()"
    >
      <div class="user-model">
        <div class="model-child">
          <span>昵称</span>
          <el-input
            v-model="userState.title"
            placeholder="请输入昵称"
          ></el-input>
        </div>
        <div class="model-child">
          <span>用户名</span>
          <el-input
            v-model="userState.user"
            placeholder="请输入用户名"
          ></el-input>
        </div>
        <div class="model-child">
          <span>密码</span>
          <el-input
            show-password
            v-model="userState.password"
            placeholder="请输入密码"
          ></el-input>
        </div>

        <div class="model-child">
          <span>工号</span>
          <el-input
            v-model="userState.jobId"
            placeholder="请输入工号"
          ></el-input>
        </div>

        <div class="model-child">
          <span>确认密码</span>
          <el-input
            v-model="confirmPassword"
            show-password
            placeholder="确认密码"
          ></el-input>
        </div>

        <div class="model-child">
          <span>职位</span>
          <el-input
            v-model="userState.jobName"
            placeholder="请输入职位"
          ></el-input>
        </div>

        <div class="model-child" style="width: 80%">
          <span>加入团队</span>
          <el-select
            multiple
            v-model="userState.team"
            style="width: 600px"
            placeholder="请选择"
          >
            <el-option
              v-for="item in teamOptions"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
              <span style="float: left">{{ item.title }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.index
              }}</span>
            </el-option>
          </el-select>
        </div>

        <div class="model-child">
          <span>用户头像</span>
          <div class="portrait" @click="portraitUpload">
            <i class="el-icon-plus"></i>
            <img
              v-if="userState.portrait"
              :src="`${host}${userState.portrait}`"
            />
          </div>
        </div>

        <div class="model-child">
          <span>超级用户</span>
          <el-switch
            v-model="userState.superUser"
            style="margin-top: 2px"
          ></el-switch>
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
import { addUserInfo, userList, teamList } from "../../server/api";
import { upload } from "../../server/upload";
import CloudChunk from "file-chunk";
export default defineComponent({
  name: "userControl",
  components: {},
  setup() {
    const scrollH = computed(() => store.state.scrollH);
    const userData = reactive([]);
    const confirmPassword = ref("");
    const userState = reactive({
      title: "",
      user: "",
      password: "",
      jobId: "",
      jobName: "",
      portrait: "",
      superUser: false,
      team: [],
    });

    const teamOptions = reactive([]);

    const cities = reactive([]);

    const userAddVisible = ref(false);
    onMounted(async () => {
      getuser();
      getteam();
    });

    /* proxy 数组 替换数据 */
    function ArrayUpdate(arr: any[], list: any[]) {
      arr.splice(0, arr.length);
      arr.push(...list);
    }

    async function portraitUpload(): Promise<void> {
      const files = await CloudChunk.FilelShow();
      const { url } = await upload(files[0]);
      userState.portrait = url;
    }

    /* 用户列表 */
    async function getuser() {
      const { data } = await userList();
      ArrayUpdate(userData, data);
    }

    /* 团队列表 */
    async function getteam() {
      const { data, code } = await teamList();
      const temps = [];
      data.map((item: any) => {
        temps.push({
          title: item.title,
          index: item.members.length,
          id: item._id,
        });
      });

      console.log(temps);
      

      code === 200 && ArrayUpdate(teamOptions, temps);
    }

    function userAdd(): void {
      userState.title = "";
      userState.user = "54645645";
      userState.password = "123456";
      userState.jobId = "564464353";
      userState.jobName = "高级项目经理";
      userState.portrait = "/files/1624902949047_3242.jpg";
      userState.superUser = false;
      userAddVisible.value = true;
    }
    function save() {
      addUserInfo(userState);
      userAddVisible.value = false;
    }
    return {
      userData,
      host: process.env.VUE_APP_HOST,
      userState,
      userAddVisible,
      scrollH,
      confirmPassword,
      teamOptions,
      userAdd,
      save,
      portraitUpload,
    };
  },
});
</script>



<style lang="scss" scoped>
.user-model {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .model-child {
    width: 50%;
    padding-left: 80px;
    margin-bottom: 30px;
    display: flex;
    position: relative;
    box-sizing: border-box;
    > span {
      width: 80px;
      padding-right: 10px;
      margin-right: 10px;
      box-sizing: border-box;
      position: absolute;
      left: 0;
      top: 0;
      font-size: 16px;
      text-align: right;
    }
    .portrait {
      width: 100px;
      height: 100px;
      border: 1px solid rgba($color: #888, $alpha: 0.1);
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      position: relative;
      > i {
        font-size: 50px;
        color: rgba($color: #888, $alpha: 0.2);
      }
      > img {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
      }
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