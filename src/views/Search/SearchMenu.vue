<template>
  <div class="menu">
    <div class="history">
      <div class="topText">
        <div class="left">
          <i class="iconfont icon-shijian"></i>
          <span>历史搜索</span>
        </div>

        <span class="clear" @click="clearData">清空</span>
      </div>
      <ul>
        <li
          v-for="(item, index) in searchArr"
          :key="index"
          @click="searchLi(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchMenu",
  data() {
    return {
      searchArr: [],
    };
  },
  components: {},
  methods: {
    searchLi(item) {
      this.$router.push({
        path: "searchlist",
        query: {
          key: item,
        },
      });
    },
    clearData() {
      localStorage.clear();
      this.searchArr = [];
    },
  },
  created() {
    this.searchArr = JSON.parse(localStorage.getItem("searchList"));
  },
};
</script>

<style scoped lang="scss">
.history {
  padding: 10px 20px 20px;
  .topText {
    display: flex;
    justify-content: space-between;
    i {
      color: #b0352b;
      font-size: 18px;
    }
    .clear {
      color: #a1a1a1;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 5px;
    li {
      padding: 5px;
      border: 1px solid #e7e7e7;
      margin: 0 15px 15px 0;
      font-size: 12px;
      color: #a1a1a1;
    }
  }
}
</style>