<template>
  <div class="login-container">
    <div class="logoText">
      <span>Welcome to Jackson first Nuxt Admin</span>
    </div>
    <el-form
      :rules="rules"
      label-width="100px"
      :model="form"
      class="login-form"
      ref="registerForm"
    >
      <el-form-item prop="email" label="邮箱">
        <!-- <i class="el-icon-mobile"></i> -->
        <el-input v-model="form.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="captcha" label="验证码" class="captcha">
        <img @click="updateCaptcha" :src="captchaUrl" alt="" />
        <el-input
          v-model="form.captcha"
          placeholder="请输入验证码"
          class="captchaInput"
        ></el-input>
      </el-form-item>
      <el-form-item prop="nickName" label="昵称">
        <el-input v-model="form.nickName" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <!-- <i class="el-icon-lock"></i> -->
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <!-- <span>
          <i class="el-icon-lock"></i>
        </span> -->
        <el-input
          v-model="form.repassword"
          type="password"
          placeholder="请确认密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="handleRegister"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import md5 from "md5";
export default {
  layout() {
    return "login";
  },
  data() {
    return {
      captchaUrl: "/api/captcha?_t=" + new Date().getTime(),
      form: {
        email: "1060428669@qq.com",
        nickName: "Jackson",
        captcha: "",
        password: "123456",
        repassword: "123456",
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱" },
          { type: "email", message: "请输入正确的邮箱格式" },
        ],
        captcha: [{ required: true, message: "请输入验证码" }],
        nickName: [{ required: true, message: "请输入昵称" }],
        password: [{ required: true, message: "请输入密码" }],
        repassword: [
          { required: true, message: "请再次输入密码" },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
                callback(new Error("两次密码不一致！"));
              }
              callback();
            },
          },
        ],
      },
    };
  },
  methods: {
    updateCaptcha() {
      this.captchaUrl = "/api/captcha?_t=" + new Date().getTime();
    },
    handleRegister() {
      this.$refs.registerForm.validate(async (valid) => {
        if (valid) {
          console.log("校验成功");
          let obj = {
            email: this.form.email,
            password: md5(this.form.password),
            captcha: this.form.captcha,
            nickName: this.form.nickName,
          };
          let ret = await this.$http.post("/user/register", obj);
          console.log(ret);
          if (ret.code == 0) {
            this.$alert("注册成功", "成功", {
              confirmButtonText: "去登录",
              callback: () => {
                this.$router.push("/login");
              },
            });
          } else {
            this.$message.error(ret.massage);
          }
        } else {
          console.log("校验失败");
        }
      });
    },
  },
};
</script>
<style>
</style>