<template>
  <header-bar>
    <template #left>
      <div class="left" @click="goback">
        <i class="iconfont icon-fanhui"></i>
      </div>
    </template>
    <template #center>
      <div class="search-main">
        <i class="iconfont icon-sousuo"></i>
        <input
          type="text"
          placeholder="搜索你喜欢的..."
          v-model="searchValue"
          @keyup.enter="goSearch"
        />
      </div>
    </template>
    <template #right>
      <div class="right" @click="goSearch">
        <span> 搜索 </span>
      </div>
    </template>
  </header-bar>
</template> 

<script>
import HeaderBar from "@/components/common/HeaderBar.vue";
export default {
  name: "HomeHeader",
  data() {
    return {
      searchValue: "",
      searchArr: [],
    };
  },
  components: {
    HeaderBar,
  },
  methods: {
    goback() {
      this.$router.back();
      this.searchValue = "";
    },
    goSearch() {
      // 搜索栏为空不提交搜索
      if (!this.searchValue) return;
      // 本地存储没有这个数组就创建一个
      if (!localStorage.getItem("searchList")) {
        localStorage.setItem("searchList", "[]");
      } else {
        this.searchArr = JSON.parse(localStorage.getItem("searchList"));
      }
      // 插入新的搜索记录
      this.searchArr.unshift(this.searchValue);
      // ES6去重
      let newArr = new Set(this.searchArr);
      // 给本地存储赋值
      localStorage.setItem("searchList", JSON.stringify(Array.from(newArr)));
      const path = "searchlist";
      if (this.$route.query.key != this.searchValue)
        this.$router.push({
          path: path,
          query: {
            key: this.searchValue,
          },
        });
    },
  },
  watch: {
    $route() {
      this.searchValue = this.$route.query.key;
    },
  },
  // created() {
  //   this.$bus.$on("send", (msg) => {
  //     this.searchValue = msg;
  //   });
  // },
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
.search-main {
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
    padding-right: 20px;
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