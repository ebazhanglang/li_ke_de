<template>
  <div class="login-container">
    <el-form
      ref="loginFrom"
      :model="loginFrom"
      :rules="rules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">
          <img src="http://likede2-admin.itheima.net/img/logo.595745bd.png" alt="">
        </h3>
      </div>

      <el-form-item prop="Account">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginFrom.Account"
          placeholder="请输入账号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="pwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="password"
          v-model="loginFrom.pwd"
          :type="passwordType"
          placeholder="请输入密码"
          prop="pwd"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" @click="changeIcon" />
        </span>
      </el-form-item>

      <el-form-item prop="validateCode">
        <span class="svg-container">
          <i class="el-icon-fork-spoon" />
        </span>
        <el-input v-model="loginFrom.validateCode" maxlength="4" class="code">
          <template #suffix>
            <img ref="code" :src="urlCode" alt="" @click="getCode">
          </template>
        </el-input>

      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" @click="login">登录</el-button>

    </el-form>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import { getCodeAPI } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      urlCode: '',
      clientToken: '',
      passwordType: 'password',
      loginFrom: {
        Account: '',
        pwd: '',
        validateCode: ''

      },
      rules: {
        Account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 1, max: 5, message: '账户格式不对', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 1, max: 5, message: '账户格式不对', trigger: 'blur' }
        ],
        validateCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getCode()
  },
  methods: {
    changeIcon() {
      this.passwordType === 'password' ? this.passwordType = '' : this.passwordType = 'password'
    },
    async login() {
      this.$refs.loginFrom.validate(islogin => {
        if (islogin) {
          this.$store.dispatch('user/login', {
            loginName: this.loginFrom.Account,
            password: this.loginFrom.pwd,
            code: this.loginFrom.validateCode,
            loginType: 0,
            clientToken: this.clientToken
          })
          if (this.$store.state.user.token) {
            this.$router.push('/')
          }
        }
      })
    },
    // 获取验证码
    async getCode() {
      const randomNum = Math.random() * 10
      this.clientToken = randomNum
      const data = await getCodeAPI(randomNum)
      this.urlCode = data.config.url
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px white inset !important;
        -webkit-text-fill-color: #999 !important;
      }
    }
     .el-input__inner{
      background-color: white;
      color:  #999;
    }
  }

  .el-form-item {
    border: 1px solid #e2e2e2;
    background: #ffffff;
    border-radius: 5px;
    color: #454545;

  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url('http://likede2-admin.itheima.net/img/background.be4fae7d.png');
  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -194px;
    margin-left: -259px;
    width: 520px;
    max-width: 100%;
    // overflow: hidden;
    border-radius: 10px;
    background-color: white;
    padding: 76px 35px 0;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      margin-bottom: 0 !important;
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      img{
        position: absolute;
        width: 96px;
        top: -120px;
        left: 170px;
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .code{
    img{
      margin-right: -45px;
    }
  }
}
</style>
