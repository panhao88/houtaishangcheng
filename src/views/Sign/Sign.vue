<template>
  <div class="box">
    <div class="box1">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <h1
          style="width:100%; border-bottom: 1px solid black;height:60px;display: flex;justify-content: center;align-items: center;"
        >欢迎来到小艾后台管理系统</h1>
        <div class="box2">
          <div>
            <el-form-item label="请输入用户名" prop="username">
              <el-input v-model="ruleForm.username" style="width:100%"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="请输入密码" prop="password">
              <el-input v-model="ruleForm.password" show-password style="width:100%"></el-input>
            </el-form-item>
          </div>
        </div>
        <h3 style="text-align: center;">特别提醒: 如果您是管理员,请使用管理员账号登录,如果不知道账号,请联系公司人事。</h3>
        <div class="box3">
          <el-form-item>
            <div>
              <el-button type="primary" @click="submitForm">立即登录</el-button>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      ruleForm: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "用户名在2~10位之间",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur",
          },
          {
            min: 6,
            max: 15,
            message: "密码在6~15位之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$store.dispatch("user/login", {
        username: this.ruleForm.username,
        password: this.ruleForm.password,
      });
      console.log(this.$store)
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang='scss'>
.box {
  width: 100%;
  height: 100%;
  background: url("../../assets/timg.jpg");
  background-size: 100% 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box1 {
  width: 60%;
  height: 60%;
  background: beige;
}
.box2 {
  width: 819px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.box3 {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -30px;
  margin-top: 40px;
}
</style>