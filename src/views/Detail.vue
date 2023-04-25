<template>
  <div class="detail container">
    <header-bar
      class="header-bar"
      :class="active ? 'bfStyle' : 'afStyle'"
      :style="opacitystyle"
      v-show="true"
    >
      <template #left>
        <div class="left" @click="goBack">
          <i class="iconfont icon-fanhui"></i>
        </div>
      </template>
      <template #center>
        <div v-show="!active" class="center">
          <ul>
            <li
              v-for="(item, index) in centerList"
              :key="index"
              :class="{ titleActive: currentIndex == index }"
              @click="toScroll(index)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </template>
      <template #right>
        <div class="right" @click="goHome">
          <i class="iconfont icon-home-g"></i>
        </div>
      </template>
    </header-bar>
    <section ref="wrapper">
      <div>
        <div id="info">
          <swiper :swiperList="swiperList"></swiper>
          <div class="title">
            <h1>{{ detailList.name }}</h1>
            <p>花香更显，色更油亮，香甜饱满，属于浓香型优品口粮茶。</p>
          </div>
          <div class="price">
            <div class="n_price">
              <b>￥</b>
              <span>{{ detailList.price }}</span>
            </div>
            <div class="r_price">
              价格:<del> {{ +detailList.price + 80 }}</del>
            </div>
          </div>
          <bonus></bonus>
        </div>
        <ul class="introduce" id="introduce">
          <li v-for="(item, index) in swiperList" :key="index">
            <img :src="item.imgUrl" alt="" @load="imgLoad()" />
            <img :src="item.imgUrl" alt="" />
            <img :src="item.imgUrl" alt="" />
            <img :src="item.imgUrl" alt="" />
            <img :src="item.imgUrl" alt="" />
          </li>
        </ul>
      </div>
    </section>
    <div class="bottom-bar">
      <ul>
        <li class="btn">
          <i class="iconfont icon-kefu"></i>
          <span>客服</span>
        </li>
        <li class="btn">
          <i class="iconfont icon-gouwuche"></i>
          <span>购物车</span>
        </li>
        <li class="btn">
          <i class="iconfont icon-shoucang"></i>
          <span>收藏</span>
        </li>
        <li class="cart" @click="addCart">加入购物车</li>
        <li class="buy-now">立即购买</li>
      </ul>
    </div>
  </div>
</template>

<script>
import HeaderBar from "../components/common/HeaderBar.vue";
import Swiper from "../components/common/Swiper.vue";
import Bonus from "../components/content/detail/Bonus.vue";

import BetterScroll from "better-scroll";
import http from "@/request/axios";
import { Toast } from "vant";
export default {
  name: "Detial",
  data() {
    return {
      centerList: ["商品详细", "商品评价"],
      swiperList: [],
      active: true,
      BScroll: "",
      detailList: "",
      posY: 0,
      heightArr: [],
      opacitystyle: {},
      id: 0,
    };
  },
  components: {
    HeaderBar,
    Swiper,
    Bonus,
  },
  computed: {
    currentIndex() {
      return this.heightArr.findIndex((item, index) => {
        return (
          this.posY >= item &&
          (this.posY < this.heightArr[index + 1] || !this.heightArr[index + 1])
        );
      });
    },
  },
  methods: {
    imgLoad() {
      this.BScroll && this.BScroll.refresh();
    },
    goBack() {
      this.$router.back();
    },
    goHome() {
      this.$router.push("/home");
    },
    toScroll(index) {
      this.BScroll.scrollTo(0, -this.heightArr[index], 300);
    },
    getData() {
      http
        .$axios({
          url: "api/goods/detail",
          params: {
            id: this.$route.query.id,
          },
        })
        .then((res) => {
          this.detailList = res;
          this.swiperList = [
            { imgUrl: this.detailList.imgUrl },
            { imgUrl: this.detailList.imgUrl },
            { imgUrl: this.detailList.imgUrl },
          ];
        });
      setTimeout(() => {
        this.$nextTick(() => {
          this.BScroll = new BetterScroll(this.$refs.wrapper, {
            movable: true,
            zoom: true,
            probeType: 3,
            click: true,
            bounce: false,
          });
          let infoHeight = document.getElementById("info").offsetHeight - 44;
          let introduceHeight =
            document.getElementById("introduce").offsetHeight + infoHeight;
          this.heightArr.push(infoHeight, introduceHeight);
          this.BScroll.on("scroll", (pos) => {
            this.posY = Math.abs(pos.y);
            let opacity = 0;
            if (this.posY >= 200) {
              opacity = this.posY / 600;
              this.active = false;
              opacity = opacity > 1 ? 1 : opacity;
              this.opacitystyle = {
                opacity: opacity,
              };
            } else if (this.posY > 100 && this.posY <= 200) {
              opacity = 50 / this.posY;
              this.opacitystyle = {
                opacity: opacity,
              };
            } else {
              this.active = true;
            }
          });
        });
      }, 300);
    },
    addCart() {
      http
        .$axios({
          url: "api/goods/addCart",
          method: "POST",
          data: {
            goodsId: this.id,
          },
          headers: {
            token: true,
          },
        })
        .then((res) => {
          if (res.success) {
            Toast(res.msg);
          }
        });
    },
  },
  created() {
    this.id = this.$route.query.id;
    this.getData();
  },
  activated() {
    if (this.$route.query.id != this.id) {
      this.getData();
      this.id = this.$route.query.id;
    }
  },
};
</script>

<style scoped lang="scss">
.detail {
  background-color: #f5f5f5;
  .header-bar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    line-height: 44px;
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
  .title {
    padding: 11.25px;
    background-color: #fff;
    h1 {
      line-height: 25px;
      font-weight: normal;
      font-size: 18px;
    }
    p {
      padding-top: 3.75px;
      font-size: 14px;
      color: #999;
    }
  }
  .price {
    margin-top: 2px;
    background-color: #fff;
    margin-bottom: 5px;
    padding: 11px;
    .n_price {
      color: #d22531;
      line-height: 28px;
      b {
        font-size: 15px;
      }
      span {
        font-size: 26px;
      }
    }
    .r_price {
      line-height: 15px;
      padding-top: 5px;
      color: #999;
      font-size: 13px;
    }
  }
  .bfStyle {
    background-color: rgba($color: #fff, $alpha: 0);
    div {
      background-color: rgba($color: #000, $alpha: 0.3);
      border-radius: 50%;
    }
    i {
      color: #fff;
    }
  }
  .afStyle {
    background-color: #fff;
    .center {
      ul {
        width: 100%;
        li {
          width: 30%;
          margin: 0 10%;
        }
      }
    }
  }
  .titleActive {
    border-bottom: 2px solid #dd2727;
    font-weight: 600;
  }
  .introduce {
    img {
      width: 100%;
    }
  }
  .bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 49px;
    background-color: #fff;
    z-index: 999;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      .btn {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 49px;
        height: 49px;
        color: #999;
        border-right: 1px solid #f2f2f2;
        i {
          font-size: 20px;
        }
      }
      .cart,
      .buy-now {
        flex: 1;
        height: 100%;
        line-height: 49px;
        background-color: #ff9500;
        color: #fff;
        text-align: center;
      }
      .buy-now {
        background-color: #dd2727;
      }
    }
  }
}
</style>