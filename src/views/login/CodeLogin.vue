<template>
  <div class="login container">
    <header-bar class="header-bar">
      <template #left>
        <div class="left" @click="goBack">
          <i class="iconfont icon-fanhui"></i>
        </div>
      </template>
      <template #center>
        <span>短信登录</span>
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
        <div class="get-code">
          <input type="text" placeholder="请输入验证码" v-model="userCode" />
          <button
            class="code-btn"
            @click="getCode"
            :disabled="disabled"
            :style="codeStyle"
          >
            {{ codeMsg }}
          </button>
        </div>
        <div class="login-btn" @click="goLogin">登录</div>
        <div class="btn-list">
          <div @click="goPwdLogin">
            <i class="iconfont icon-icon_password"></i>密码登录
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
import { mapMutations } from "vuex";

import HeaderBar from "../../components/common/HeaderBar.vue";
import Tabber from "../../components/common/Tabber.vue";
export default {
  name: "Login",
  data() {
    return {
      userTel: "",
      userCode: "",
      disabled: false,
      codeTime: 6,
      codeStyle: "",
      rules: {
        // 手机号验证
        userTel: {
          rule: /^1[23456789]\d{9}$/,
          msg: "手机号格式错误",
        },
      },
      codeMsg: "获取短信验证码",
      code: "",
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
    goPwdLogin() {
      this.$router.push("/login");
    },
    goRegister() {
      this.$router.push("/register");
    },
    goRecovery() {
      this.$router.push("/recovery");
    },
    getCode() {
      if (!this.validate("userTel")) return;
      http
        .$axios({
          method: "POST",
          url: "/api/user/tel",
          data: {
            userTel: this.userTel,
          },
        })
        .then((res) => {
          if (res.success) {
            http
              .$axios({
                method: "POST",
                url: "/api/user/code",
                data: {
                  userTel: this.userTel,
                },
              })
              .then((res) => {
                Toast("验证码为" + res.data);
                this.code = res.data;
              });
          } else {
            Toast("用户不存在");
          }
        });

      this.disabled = true;
      this.codeMsg = "重新发送(7)";
      this.codeStyle = {
        background: "#eeeeee",
        color: "#848689",
      };
      let timer = setInterval(() => {
        --this.codeTime;
        this.codeMsg = "重新发送(" + this.codeTime + ")";
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        this.disabled = false;
        this.codeMsg = "获取短信验证码";
        this.codeTime = 6;
        this.codeStyle = {
          background: "#b0352f",
          color: "#fff",
        };
      }, 6000);
    },
    goLogin() {
      if (!this.validate("userTel")) return;
      if (!this.code || this.code != this.userCode) {
        Toast("验证码错误");
        return;
      }
      http
        .$axios({
          method: "POST",
          url: "/api/user/codeLogin",
          data: {
            userTel: this.userTel,
          },
        })
        .then((res) => {
          Toast(res.msg);
          if (!res.success) return;
          this.userLogin(res.data);
          this.$router.push("/my");
        });
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
    .get-code {
      display: flex;
      border: 1px solid #d7d7d7;
      border-radius: 3px;
      input {
        flex: 1;
        border: none;
      }
      .code-btn {
        line-height: 44px;
        padding: 0 20px;
        background-color: #b0352f;
        border-radius: 3px;
        color: #fff;
        font-size: 14px;
      }
    }
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