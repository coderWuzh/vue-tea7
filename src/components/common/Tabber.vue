<template>
  <div class="tabber">
    <ul>
      <li v-for="(item, index) in tabberList" :key="index" @click="toPath(item.path)"
        :class="isActive(item.path) ? 'active' : ''">
        <van-icon size="25px" :name="item.icon" v-if="item.name == '购物车'" :badge="cartNum" />
        <van-icon size="25px" :name="item.icon" v-else />
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import http from "@/request/axios";

export default {
  name: "Tabber",
  data() {
    return {
      tabberList: [
        {
          name: "主页",
          path: "/home",
          icon: "wap-home-o",
        },
        {
          name: "分类",
          path: "/list",
          icon: "other-pay",
        },
        {
          name: "购物车",
          path: "/cart",
          icon: "shopping-cart-o",
        },
        {
          name: "我的",
          path: "/my",
          icon: "user-o",
        },
      ],
      cartNum: "",
    };
  },
  components: {},
  computed: {
    isActive() {
      return function (path) {
        return this.$route.path.includes(path);
      };
    },
  },
  created() {
    let user = JSON.parse(localStorage.getItem("teaUserInfo"));
    if (user && user.token)
      http
        .$axios({
          url: "/api/goods/cartData",
          method: "POST",
          headers: {
            token: true,
          },
        })
        .then((res) => {
          this.cartNum = res.data.length > 0 ? res.data.length : "";
        });
  },
  methods: {
    toPath(path) {
      if (this.$route.path != path) this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabber {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  width: 100%;

  ul {
    display: flex;
    justify-content: space-around;
    padding: 3.5px 0;

    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      span {
        font-size: 12px;
      }

      &.active {
        color: #b0352f;
      }
    }
  }

  .van-info {
    border: none;
    top: 4px;
    right: -3px;
  }
}
</style>