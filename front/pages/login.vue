<template>
  <div class="login-container">
    <el-form :relus="relus" :model="form" class="login-form">
      <el-form-item prop="email">
        <span>
          <i class="el-icon-mobile"></i>
        </span>
        <el-input placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span>
          <i class="el-icon-lock"></i>
        </span>
        <el-input type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <img @click="updateCaptcha" :src="captchaUrl" alt="" />
        <el-input placeholder="验证码"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  layout: "login",
  data() {
    return {
      captchaUrl: "/api/captcha?_t=" + new Date().getTime(),
      form: {},
      relus: {},
    };
  },
  methods: {
    updateCaptcha() {
      this.captchaUrl = "/api/captcha?_t=" + new Date().getTime();
    },
  },
};
</script>
<style>
</style>