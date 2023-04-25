<template>
  <header-bar>
    <template #left>
      <div class="left">
        <i class="iconfont icon-chaye"><i>思茶网</i></i>
      </div>
    </template>
    <template #center>
      <div class="search" @click="goSearch">
        <i class="iconfont icon-sousuo"></i>
        <input
          type="text"
          placeholder="搜索你喜欢的..."
          onclick="javascript:document.activeElement.blur()"
        />
      </div>
    </template>
    <template #right>
      <div class="right">
        <i class="iconfont icon-kefu"></i>
      </div>
    </template>
  </header-bar>
</template> 

<script>
import HeaderBar from "@/components/common/HeaderBar.vue";
export default {
  name: "HomeHeader",
  data() {
    return {};
  },
  components: {
    HeaderBar,
  },
  methods: {
    goSearch() {
      this.$router.push("./search");
    },
  },
};
</script>

<style scoped lang="scss">
.left {
  padding: 0 10px;
  i {
    color: #fff;
    font-size: 33px;
    i {
      position: relative;
      top: -4px;
      font-size: 20px;
    }
  }
}
.search {
  height: 30px;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  line-height: 30px;
  i {
    padding-left: 10px;
    font-size: 15px;
  }
  input {
    font-size: 14px;
    padding-left: 5px;
    width: 100%;
    height: 100%;
  }
}
.right {
  width: 44px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  color: #fff;
  i {
    font-size: 30px;
  }
}
</style>