<template>
  <div class="like">
    <theme-titleVue>
      <span>猜你喜欢</span>
    </theme-titleVue>
    <ul>
      <li
        v-for="(item, index) in likeList"
        :key="index"
        @click="goDetail(item.id)"
      >
        <div class="goods-item">
          <img :src="item.imgUrl" alt="" />
        </div>
        <div class="title">{{ item.name }}</div>
        <div class="price">
          <span>￥</span>
          <b>{{ item.price }}</b>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ThemeTitleVue from "./ThemeTitle.vue";
export default {
  name: "Like",
  data() {
    return {};
  },
  props: {
    likeList: [],
    typeof: Array,
  },
  components: {
    ThemeTitleVue,
  },
  methods: {
    goDetail(id) {
      this.$router.push({
        name: "Detail",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
ul {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  li {
    width: 50%;
    padding: 3px;
    box-sizing: border-box;
    margin-bottom: 8px;
    .goods-item {
      width: 100%;
      background-color: #f3f3f3;

      img {
        width: 100%;
      }
    }
    .title {
      padding: 8px 0;
      font-size: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .price {
      color: #b0352f;
      span {
        font-size: 12.75px;
      }
      b {
        font-size: 18.75px;
        font-weight: normal;
      }
    }
  }
}
</style>