<template>
  <div class="login container">
    <header-bar class="header-bar">
      <template #left>
        <div class="left" @click="goBack">
          <i class="iconfont icon-fanhui"></i>
        </div>
      </template>
      <template #center>
        <span>密码登录</span>
      </template>
      <template #right>
        <div class="right" @click="goHome">
          <i class="iconfont icon-home-g"></i>
        </div>
      </template>
    </header-bar>
    <section>
      <div class="input-content">
        <div>
          <input type="text" placeholder="请输入手机号" v-model="userTel" />
        </div>
        <div>
          <input type="password" placeholder="请输入密码" v-model="userPwd" />
        </div>
        <div class="login-btn" @click="goLogin">登录</div>
        <div class="btn-list">
          <div @click="goCodeLogin">
            <i class="iconfont icon-duanxin"></i>短信登录
          </div>
          <div @click="goRecovery">
            <i class="iconfont icon-mimadenglu"></i>找回密码
          </div>
          <div @click="goRegister">
            <i class="iconfont icon-shouji_o"></i>快速注册
          </div>
        </div>
      </div>
    </section>
    <tabber></tabber>
  </div>
</template>

<script>
import http from "@/request/axios";
import { Toast } from "vant";

import HeaderBar from "../../components/common/HeaderBar.vue";
import Tabber from "../../components/common/Tabber.vue";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      userTel: "",
      userPwd: "",
      rules: {
        // 手机号验证
        userTel: {
          rule: /^1[23456789]\d{9}$/,
          msg: "手机号格式错误",
        },
        // 密码验证
        userPwd: {
          rule: /^\w{6,12}$/,
          msg: "密码为6-12位",
        },
      },
    };
  },
  components: {
    HeaderBar,
    Tabber,
  },
  methods: {
    ...mapMutations(["userLogin"]),
    goBack() {
      this.$router.back();
    },
    goHome() {
      this.$router.push("/home");
    },
    goLogin() {
      if (!this.validate("userTel")) return;
      if (!this.validate("userPwd")) return;
      http
        .$axios({
          method: "POST",
          url: "/api/user/login",
          data: {
            userTel: this.userTel,
            userPwd: this.userPwd,
          },
        })
        .then((res) => {
          Toast(res.msg);
          if (!res.success) return;
          this.userLogin(res.data);
          this.$router.push("/my");
        });
    },
    goCodeLogin() {
      this.$router.push("/codeLogin");
    },
    goRegister() {
      this.$router.push("/register");
    },
    goRecovery() {
      this.$router.push("/recovery");
    },
    validate(key) {
      let bool = true;
      if (!this.rules[key].rule.test(this[key])) {
        // 提示信息
        Toast(this.rules[key].msg);
        console.log(this.rules[key].msg);
        bool = false;
        return false;
      }
      return bool;
      
    },
  },
};
</script>

<style scoped lang="scss">
.header-bar {
  z-index: 9;
  line-height: 44px;
  color: #fff;
  .right,
  .left {
    width: 35px;
    height: 35px;
    line-height: 35px;
    margin: 4.5px;
  }
  i {
    font-size: 20px;
  }
}
section {
  background-color: #f5f5f5;
  width: 100%;
  .input-content {
    padding: 20px;
    width: 100%;
    height: 270px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    box-sizing: border-box;
    input {
      width: 100%;
      height: 44px;
      padding: 0 10px;
      box-sizing: border-box;
      border: 1px solid #d7d7d7;
      background-color: #fff;
      border-radius: 3px;
    }
    .login-btn {
      width: 100%;
      height: 44px;
      line-height: 44px;
      background-color: #b0352f;
      color: #fff;
    }
    .btn-list {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      i {
        padding: 0 5px;
      }
    }
  }
}
</style>