<template>
  <div class="cart container">
    <header>
      <header-bar class="header-bar">
        <template #left>
          <div class="left" @click="goBack">
            <i class="iconfont icon-fanhui"></i>
          </div>
        </template>
        <template #center>
          <span>购物车</span>
        </template>
        <template #right>
          <div
            class="right"
            @click="listDel"
            v-text="deleteAll ? '完成' : '编辑'"
          ></div>
        </template>
      </header-bar>
      <van-notice-bar left-icon="volume-o" :scrollable="false">
        <van-swipe
          vertical
          class="notice-swipe"
          :autoplay="3000"
          :show-indicators="false"
        >
          <van-swipe-item>专区满赠</van-swipe-item>
          <van-swipe-item>专区满赠</van-swipe-item>
          <van-swipe-item>专区满赠</van-swipe-item>
        </van-swipe>
      </van-notice-bar>
    </header>
    <section v-if="list.length <= 0">
      <van-empty
        class="custom-image"
        image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
        description="购物车为空"
      />
    </section>
    <section v-else>
      <div class="cart-title">
        <van-checkbox
          :value="selectAll"
          checked-color="#b0352f"
          icon-size="18px"
          @click="selectAllFn"
        ></van-checkbox>
        商品
      </div>
      <ul class="cart-goods">
        <li class="goods-item" v-for="(item, index) in list" :key="index">
          <van-checkbox
            v-model="item.checked"
            checked-color="#b0352f"
            icon-size="18px"
            @click="itemCheck(index)"
          ></van-checkbox>
          <img :src="item.goods_imgUrl" alt="" />
          <div class="goods-detail">
            <div class="title">{{ item.goods_name }}</div>
            <div class="price">￥{{ item.goods_price }}</div>
            <div class="count">
              <van-stepper
                v-model="item.goods_num"
                integer
                button-size="24px"
                @change="changeNum($event, item)"
              />
            </div>
            <div class="delete">
              <i
                class="iconfont icon-lajitong"
                @click="deleteItem(item.goods_id)"
              ></i>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <footer>
      <tabber v-if="list.length <= 0"></tabber>
      <ul class="cart-footer" v-else>
        <li class="checkAll">
          <van-checkbox
            :value="selectAll"
            checked-color="#b0352f"
            icon-size="18px"
            @click="selectAllFn"
          ></van-checkbox>
        </li>
        <li class="detail" v-if="deleteAll"></li>
        <li class="detail" v-else>
          <div>
            共有
            <span>{{ total.num }}</span>
            件商品
          </div>
          <div>
            总计:
            <span>￥{{ total.price }}</span>
            +
            <span>0茶币</span>
          </div>
        </li>
        <li v-if="deleteAll" class="but-btn" @click="deleteAllFn">删除</li>
        <li
          v-else
          class="but-btn"
          :style="
            selectList.length > 0
              ? { backgroundColor: '#b0352f' }
              : { backgroundColor: '#ddd', color: '#999' }
          "
          @click="goOrder()"
        >
          去结算
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
import HeaderBar from "../components/common/HeaderBar.vue";
import Tabber from "@/components/common/Tabber.vue";
import http from "@/request/axios";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Cart",
  data() {
    return {
      checked: true,
      value: 1,
      cartList: [],
      deleteAll: false,
    };
  },
  components: { Tabber, HeaderBar },
  created() {
    this.getData();
  },
  computed: {
    ...mapState({
      list: (state) => state.cart.list,
      selectList: (state) => state.cart.selectList,
    }),
    ...mapGetters(["selectAll", "total"]),
  },
  methods: {
    ...mapMutations(["cartData", "itemCheck", "deleteItem", "initOrder"]),
    ...mapActions(["selectAllFn", "deleteAllFn"]),
    goOrder() {
      let orderArr = [];
      this.list.forEach((item) => {
        this.selectList.forEach((v) => {
          if (item.goods_id == v) {
            orderArr.push(item);
          }
        });
      });
      // 生成一个订单
      http
        .$axios({
          url: "/api/goods/addOrder",
          method: "POST",
          headers: {
            token: true,
          },
          data: {
            orderArr,
          },
        })
        .then((res) => {
          this.initOrder(res.data[0]);
          if (res.success) {
            http
              .$axios({
                url: "/api/goods/getAddress",
                method: "POST",
                headers: {
                  token: true,
                },
              })
              .then((r) => {
                let address = r.data;
                this.$router.push({
                  path: "/order",
                  query: {
                    orderArr: JSON.stringify(orderArr),
                    address: JSON.stringify(address),
                  },
                });
              });
          }
        });
    },
    listDel() {
      this.deleteAll = !this.deleteAll;
    },
    changeNum(value, item) {
      if (!value) return;
      http
        .$axios({
          url: "/api/goods/changeNum",
          method: "POST",
          headers: {
            token: true,
          },
          data: {
            goodsId: item.goods_id,
            goodsNum: value,
          },
        })
        .then((res) => {
          console.log(res);
        });
    },
    goBack() {
      this.$router.back();
    },
    getData() {
      http
        .$axios({
          url: "/api/goods/cartData",
          method: "POST",
          headers: {
            token: true,
          },
        })
        .then((res) => {
          this.cartList = res.data;
          res.data.forEach((v) => {
            v["checked"] = true;
          });
          this.cartData(res.data);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
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
    font-size: 30px;
  }
}
.van-checkbox {
  padding: 0 10px;
}
section {
  background-color: #f5f5f5;

  .cart-title {
    height: 60px;
    line-height: 60px;
    padding: 0 5px;
    display: flex;
    border-bottom: 1px solid #e8e8e8;
  }
  .cart-goods {
    .goods-item {
      width: 100%;
      height: 96px;
      display: flex;
      padding: 10px 5px;
      position: relative;
      background-color: #fff;
      border-bottom: 1px solid #e8e8e8;
      box-sizing: border-box;
      img {
        width: 74px;
        height: 74px;
        border: 1px solid #e9e9e9;
      }
      .goods-detail {
        padding: 0 10px;
        .title {
          font-size: 12px;
          height: 34px;
        }
        .price {
          font-size: 14px;
          color: #b0352f;
        }
        .delete {
          position: absolute;
          top: 10px;
          right: 10px;
        }
        .count {
          border: 1px solid #e8e8e8;
          position: absolute;
          bottom: 5px;
          right: 10px;
        }
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }
}

footer {
  .cart-footer {
    height: 45px;
    display: flex;
    align-items: center;
    box-shadow: -3px 0 3px rgba($color: #000000, $alpha: 0.3);
    span {
      color: #b0352f;
    }

    .detail {
      flex: 1;
      font-size: 13px;
    }
    .but-btn {
      width: 120px;
      line-height: 45px;
      color: #fff;
      text-align: center;
      background-color: #b0352f;
    }
  }
}
</style>