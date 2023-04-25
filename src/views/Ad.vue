<template>
  <div>
    <header-bar>
      <template #left>
        <div class="left" @click="goback">
          <i class="iconfont icon-fanhui"></i>
        </div>
      </template>
      <template #center>
        <span>思茶网</span>
      </template>
      <template #right> <div class="right"></div> </template>
    </header-bar>
    <h2>广告页面还在制作中...</h2>
  </div>
</template>

<script>
import HeaderBar from "@/components/common/HeaderBar";
export default {
  name: "Ad",
  data() {
    return {};
  },
  components: {
    HeaderBar,
  },
  methods: {
    goback() {
      this.$router.back();
    },
    goSearch() {
      const path = "/search/searchlist";
      if (this.$route.path != path) this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.left {
  padding: 0 10px;
  i {
    color: #fff;
    font-size: 30px;
  }
}
span {
  color: #fff;
}
.right {
  width: 50px;
}
</style>