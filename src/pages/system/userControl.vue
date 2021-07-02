<template>
  <div class="userControl">
    <div class="system-header">
      <el-button type="primary" size="small" @click="userInfoEvoke('add')"
        >添加</el-button
      >
      <el-button size="small" @click="userInfoEvoke('editor')">编辑</el-button>
      <el-button size="small" @click="removeUserCclick(null)">删除</el-button>
    </div>
    <el-table
      :data="userData"
      @selection-change="userChange"
      :height="scrollH - 50"
      style="width: 100%"
    >
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
      <el-table-column prop="title" label="昵称"> </el-table-column>
      <el-table-column prop="user" label="用户名"> </el-table-column>
      <el-table-column prop="superUser" label="超级用户">
        <template #default="scope">
          <span>{{ scope.row.superUser ? "是" : "否" }}</span>
        </template>
      </el-table-column>
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
      width="700px"
      :before-close="(none) => none()"
    >
      <div class="user-model">
        <el-form
          ref="form"
          :model="userState"
          :inline="true"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="活动名称" prop="title">
            <el-input
              style="width: 200px"
              v-model="userState.title"
              placeholder="请输入昵称"
            ></el-input>
          </el-form-item>

          <el-form-item label="用户名" prop="user">
            <el-input
              style="width: 200px"
              v-model="userState.user"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              style="width: 200px"
              v-model="userState.password"
              show-password
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              style="width: 200px"
              v-model="userState.confirmPassword"
              show-password
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>

          <el-form-item label="工号" prop="jobId">
            <el-input
              style="width: 200px"
              v-model="userState.jobId"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>

          <el-form-item label="职位" prop="jobName">
            <el-input
              style="width: 200px"
              v-model="userState.jobName"
              placeholder="请输入职位"
            ></el-input>
          </el-form-item>

          <el-form-item label="团队">
            <el-select
              multiple
              v-model="userState.team"
              style="width: 490px"
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
          </el-form-item>

          <el-form-item label="用户头像">
            <div class="model-child" style="width: 200px">
              <div class="portrait" @click="portraitUpload">
                <i class="el-icon-plus"></i>
                <img
                  width="100"
                  v-if="userState.portrait"
                  :src="`${host}${userState.portrait}`"
                />
              </div>
            </div>
          </el-form-item>

          <el-form-item label="超级用户">
            <el-switch
              v-model="userState.superUser"
              style="margin-top: 2px; width: 200px"
            ></el-switch>
          </el-form-item>

          <el-form-item>
            <div style="width: 660px; display: flex; justify-content: flex-end">
              <el-button type="primary" @click="save">保存</el-button>
            </div>
          </el-form-item>
        </el-form>
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
import { _remove } from "@/Utils/curd";
import { ElMessage } from "element-plus";
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
      confirmPassword: "",
      jobId: "",
      jobName: "",
      portrait: "",
      superUser: false,
      team: [],
    });

    const form = ref(null);

    const teamOptions = reactive([]);

    const cities = reactive([]);

    const rules = reactive({
      title: [
        { required: true, message: "请输入昵称", trigger: "blur" },
        { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
      ],
      user: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" },
      ],

      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
      ],

      confirmPassword: [
        { required: true, message: "请确认密码", trigger: "blur" },
        { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
      ],

      jobId: [
        { required: true, message: "请输入工号", trigger: "blur" },
        { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
      ],

      jobName: [
        { required: true, message: "请输入职位", trigger: "blur" },
        { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
      ],
    });

    /* 用户当前勾选信息 */
    let userSelection = [];

    const userAddVisible = ref(false);
    onMounted(async () => {
      getuser();
      getteam();
    });

    /* 成员待选列表，数据同步 */
    function userChange(selection: any[]) {
      userSelection = selection;
    }

    function removeUserCclick(id?: string | null): void {
      const ids = id ? [id] : extract(userSelection, "_id");
      _remove("userDelete", ids, getuser);
    }

    /* 将数组内指定key提取出来形成一个全新的数组 */
    function extract(arr: any, key: string): string[] {
      return arr.map((item: any) => {
        return item[key];
      });
    }

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

      code === 200 && ArrayUpdate(teamOptions, temps);
    }

    function userInfoEvoke(type: string): void {
      if (type === "add") {
        userState.title = "";
        userState.user = "54645645";
        userState.password = "123456";
        userState.jobId = "564464353";
        userState.jobName = "高级项目经理";
        userState.portrait = "";
        userState.superUser = false;
        ArrayUpdate(userState.team, []);
      }

      userAddVisible.value = true;
    }
    function save() {
      const reg = /^[0-9a-zA-Z]+$/;

      if (!reg.test(userState.user)) {
        ElMessage.warning("用户名非法");
        return;
      }

      if (userState.confirmPassword != userState.password) {
        ElMessage.warning("两次密码输入不一致");
        return;
      }

      form.value.validate((valid: boolean) => {
        if (valid) {
          addUserInfo(userState);
          userAddVisible.value = false;
          getuser();
        } else {
          return false;
        }
      });
    }
    return {
      userData,
      host: process.env.VUE_APP_HOST,
      userState,
      userAddVisible,
      scrollH,
      confirmPassword,
      teamOptions,
      rules,
      form,
      userInfoEvoke,
      save,
      portraitUpload,
      userChange,
      removeUserCclick,
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
      > img {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
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