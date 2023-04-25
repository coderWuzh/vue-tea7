<template>
  <div class="list">
    <ul>
      <li v-for="(item, index) in goodsList" :key="index">
        <img :src="item.imgUrl" alt="" />
        <div class="title">{{ item.name }}</div>
        <div class="buy">
          <div class="price">
            <b>￥</b>
            <span>{{ item.price }}</span>
          </div>
          <div class="btn">
            <span>立即购买</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import http from "@/request/axios.js";
export default {
  name: "SearchMenu",
  data() {
    return {
      goodsList: [],
    };
  },
  components: {},
  methods: {
    getData() {
      http
        .$axios({
          url: "/api/goods/search_goods",
          params: {
            searchName: this.$route.query.key,
          },
        })
        .then((res) => {
          this.goodsList = res;
        });
    },
  },
  created() {
    this.getData();
  },
  watch: {
    $route() {
      this.getData();
    },
  },
};
</script>

<style scoped lang="scss">
.list {
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      width: 50%;
      padding: 8px;
      box-sizing: border-box;
      .title {
        font-size: 14px;
        padding: 3.5px 0 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      img {
        width: 100%;
      }
      .buy {
        display: flex;
        justify-content: space-between;
        height: 40px;
        align-items: center;
        .price {
          color: #b0352b;
          b {
            font-size: 12px;
          }
          span {
            font-size: 16px;
          }
        }
        .btn {
          background-color: #b0352b;
          font-size: 14px;
          color: #fff;
          padding: 4px 8px;
          border-radius: 5px;
        }
      }
    }
  }
}
</style>