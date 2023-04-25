<template>
  <div class="login container">
    <header-bar class="header-bar">
      <template #left>
        <div class="left" @click="goBack">
          <i class="iconfont icon-fanhui"></i>
        </div>
      </template>
      <template #center>
        <span>找回密码</span>
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
          <input type="password" placeholder="请输入新密码" v-model="userPwd" />
        </div>
        <div>
          <input type="password" placeholder="确认新密码" v-model="userRePwd" />
        </div>
        <div class="login-btn" @click="goChange">完成</div>
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
export default {
  name: "Login",
  data() {
    return {
      userPwd: "",
      userRePwd: "",
      userTel: "",
      rules: {
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
    goBack() {
      this.$router.back();
    },
    goHome() {
      this.$router.push("/home");
    },
    goChange() {
      if (!this.validate("userPwd")) return;
      if (this.userPwd != this.userRePwd) {
        Toast("前后密码不一致");
        return;
      }
      this.userTel = this.$route.params.tel;
      http
        .$axios({
          method: "POST",
          url: "/api/user/recovery",
          data: {
            userTel: this.userTel,
            userPwd: this.userPwd,
          },
        })
        .then((res) => {
          Toast(res.msg);
          this.$router.push("./login");
        });
    },
    validate(key) {
      let bool = true;
      if (!this.rules[key].rule.test(this[key])) {
        // 提示信息
        Toast(this.rules[key].msg);
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
  }
}
</style>