<template>
  <div class="login">
    <div class="loginBox">
      <el-form ref="form" :model="form">
        <el-form-item label="用户名">
          <el-input
            v-model="form.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="form.passWord"
            show-password
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-top: 20px" type="primary" @click="login()"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        userName: "",
        passWord: "",
      },
    };
  },
  mounted(){
    // console.clear()
  },
  methods: {
    async login() {
      const res = await this.axios.post("/user/userLogin", this.form);
      if (res.data.code === "0") {
        this.$message.success("登录成功");
        this.$store.state.ticket = res.data.data[0].UUID;
        this.$store.state.userName = res.data.data[0].userName;
        this.$router.push("/");
      } else {
        this.$message.error(res.data.msg);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginBox {
    width: 400px;
    height: 300px;
    // border: 1px solid #ccc;
    // border-radius: 5px;
    padding: 20px;
  }
}
</style>
