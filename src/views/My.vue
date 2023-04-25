<template>
  <div class="my container">
    <section>
      <header>
        <header-bar class="header-bar" v-show="true">
          <template #left>
            <div class="left" @click="goBack">
              <i class="iconfont icon-fanhui"></i>
            </div>
          </template>
          <template #center>
            <span></span>
          </template>
          <template #right>
            <div class="right" @click="goHome">
              <i class="iconfont icon-home-g"></i>
            </div>
          </template>
        </header-bar>
        <div class="login-bar">
          <div class="info" v-if="loginStatus">
            <div class="user-info" v-if="loginStatus">
              <img :src="userInfo.imgUrl" alt="" />
              <p>{{ userInfo.nickName }}</p>
              <!-- {{ userInfo }} -->
            </div>
          </div>
          <div class="login" @click="goLogin" v-else>登录 / 注册</div>
        </div>
      </header>
      <div class="menu-list">
        <ul>
          <li class="menu-title">个人中心</li>
          <li @click="goAddress">
            地址管理<i class="iconfont icon-qianjin"></i>
          </li>
          <li v-if="loginStatus" @click="loginOut">退出登录</li>
        </ul>
      </div>
    </section>
    <tabber></tabber>
  </div>
</template>

<script>
import HeaderBar from "../components/common/HeaderBar.vue";
import Tabber from "@/components/common/Tabber.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "My",
  data() {
    return {};
  },
  components: {
    Tabber,
    HeaderBar,
  },
  computed: {
    ...mapState({
      loginStatus: (state) => state.user.loginStatus,
      userInfo: (state) => state.user.userInfo,
    }),
  },
  methods: {
    ...mapMutations(["loginOut"]),
    goBack() {
      this.$router.back();
    },
    goHome() {
      this.$router.push("/home");
    },
    goLogin() {
      this.$router.push("/login");
    },
    goAddress() {
      this.$router.push("/addressIndex");
    },
  },
};
</script>

<style scoped lang="scss">
.my {
  background-color: #f5f5f5;
}
header {
  background: url(../../public/images/mybc.jpg);
  background-size: 100% 100%;
  .header-bar {
    z-index: 9;
    line-height: 44px;
    color: #fff;
    background-color: rgba($color: #fff, $alpha: 0);
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
  .login-bar {
    height: 112px;
    display: flex;
    justify-content: center;
    align-items: center;
    .login {
      background-color: #ffb500e6;
      height: 20px;
      font-size: 14px;
      padding: 5px 20px;
      border-radius: 5px;
      color: #fff;
    }
    .info {
      box-sizing: border-box;
      padding: 0 10px;
      .user-info {
        display: flex;
        align-items: center;
        color: #fff;
        img {
          width: 20%;
          border-radius: 50px;
          margin-right: 10px;
        }
      }
    }
  }
}
.menu-list {
  ul {
    li {
      background-color: #fff;
      font-size: 14px;
      padding: 0 10px;
      margin-bottom: 15px;
      line-height: 44px;
      border-bottom: 1px solid #f5f6f7;
      display: flex;
      justify-content: space-between;
      &:last-child {
        border-bottom: none;
      }
      &:first-child {
        margin-bottom: 0px;
      }
      &.menu-title {
        color: #9e9e9e;
      }
    }
  }
}
</style>