<template>
  <div class="container">
    <header-bar>
      <template #left>
        <div class="left" @click="$router.back()">
          <i class="iconfont icon-fanhui"></i>
        </div>
      </template>
      <template #center>
        <div class="center">
          <span>提交订单</span>
        </div>
      </template>
      <template #right>
        <div class="left">
          <i class="iconfont icon-home-g" @click="$router.push('/home')"></i>
        </div>
      </template>
    </header-bar>
    <section>
      <div class="path">
        <h3 class="path-title">收货信息:</h3>
        <div class="path-content" @click="goPath('choose')">
          <div class="content-l">
            <div>
              <span>{{ address.name }}</span>
              <span>{{ address.tel }}</span>
            </div>
            <div>
              <span>{{ address.province }}</span>
              <span>{{ address.county }}</span>
              <span>{{ address.city }}</span>
              <span>{{ address.addressDetail }}</span>
            </div>
          </div>
          <div class="content-r">
            <i class="iconfont icon-qianjin"></i>
          </div>
        </div>
      </div>
      <div class="payment">
        <van-radio-group v-model="radio">
          <van-radio name="alipay">支付宝</van-radio>
          <van-radio name="wechat">微信</van-radio>
        </van-radio-group>
      </div>
      <div class="goods">
        <h3 class="path-title">订单号:{{ list.order_id }}</h3>
        <ul class="goods-list">
          <li
            class="goods-item"
            v-for="(item, index) in orderList"
            :key="index"
          >
            <img :src="item.goods_imgUrl" alt="" />

            <div class="goods-detail">
              <div class="title">{{ item.goods_name }}</div>
              <div class="spe">规格：无</div>
              <span class="price">￥{{ item.goods_price }}</span>
            </div>
            <div class="goods-num">
              <span>x{{ item.goods_num }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="detail"></div>
    </section>
    <footer>
      <div class="order-total">
        <span>共</span>
        <b>{{ list.goods_num }}</b>
        <span>件,</span>
        <span>总金额：</span>
        <em>¥{{ list.goods_price }}</em>
      </div>
      <div class="order-topay" @click="toPay">提交订单</div>
    </footer>
  </div>
</template>

<script>
import HeaderBar from "@/components/common/HeaderBar.vue";
import { mapState } from "vuex";
import http from "@/request/axios";
export default {
  name: "Order",
  data() {
    return {
      radio: "alipay",
      orderList: [],
      address: [],
      orderIdArr: [],
    };
  },
  computed: {
    ...mapState({
      list: (state) => state.order.list,
    }),
  },
  components: {
    HeaderBar,
  },
  created() {
    this.orderList = JSON.parse(this.$route.query.orderArr);
    this.address = JSON.parse(this.$route.query.address);
    this.orderList.forEach((v) => {
      this.orderIdArr.push(v.goods_id);
    });
  },
  methods: {
    toPay() {
      console.log(123);
      http
        .$axios({
          url: "/api/goods/toPay",
          method: "POST",
          headers: {
            token: true,
          },
          data: {
            order_id: this.list.order_id,
            orderIdArr: this.orderIdArr,
          },
        })
        .then((res) => {
          this.$router.push("/payment");
        });
    },
    goPath(flag) {
      this.$router.push({
        path: "/addressIndex",
        query: {
          flag,
          orderList: JSON.stringify(this.orderList),
          address: JSON.stringify(this.address),
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.left {
  width: 50px;
  i {
    font-size: 26px;
    color: #fff;
  }
}
.center {
  font-size: 16px;
  color: #fff;
}
section {
  background-color: #f5f5f5;
  .path-title {
    padding: 5px;
    font-size: 14px;
    font-weight: normal;
  }
  .path-content {
    padding: 15px 8px;
    font-size: 12px;
    background-color: #ffffff;
    display: flex;
    .content-l {
      flex: 1;
      div {
        height: 12px;
        padding: 5px 2px;
        span {
          padding: 0 2px;
        }
      }
    }
    .content-r {
      line-height: 44px;
    }
  }
  .payment {
    padding: 5px 10px;
    margin-top: 10px;
    font-size: 14px;
    background-color: #ffffff;
    .van-radio-group {
      display: flex;
      padding: 5px 0;
      .van-radio {
        padding-right: 8px;
      }
    }
  }
  .goods {
    background-color: #fff;
    margin-top: 15px;
    .goods-item {
      display: flex;
      height: 106px;
      padding: 13px 15px;
      box-sizing: border-box;
      img {
        border: 1px solid #e5e5e5;
        width: 74px;
        height: 74px;
      }
      .goods-detail {
        flex: 1;
        padding-left: 10px;
        .title {
          height: 34px;
          font-size: 12px;
        }
        .spe {
          font-size: 12px;
          height: 20px;
          color: #999;
        }
        .price {
          font-size: 14px;
          color: #b0352f;
        }
      }
      .goods-num {
        margin-top: 52px;
        font-size: 14px;
      }
    }
  }
}
footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 45px;
  border-top: 1px solid #ccc;
  padding-left: 15px;
  box-sizing: border-box;
  .order-total {
    font-size: 14px;
    b {
      color: #b0352f;
    }
    em {
      font-size: 18px;
      color: #b0352f;
    }
  }
  .order-topay {
    width: 120px;
    line-height: 45px;
    color: #fff;
    font-size: 18px;
    text-align: center;
    background-color: #b0352f;
  }
}
</style>