<template>
  <div class="list container">
    <section>
      <div class="content">
        <div class="left" :style="leftStyle">
          <ul>
            <li
              v-for="(item, index) in rightData"
              :key="index"
              :class="{ active: index == currentIndex }"
              @click="goScroll(index)"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
        <div class="right" ref="wrapper">
          <div class="scroll-content" :style="rightStyle">
            <list-header class="header"></list-header>
            <div class="list">
              <div class="ad">
                <img :src="adImg" alt="" />
              </div>
              <ul class="list-box" ref="right">
                <li
                  class="shop-list"
                  v-for="(item, index) in rightData"
                  :key="index"
                >
                  <theme-title class="theme-title">
                    <span>{{ item.title }}</span>
                  </theme-title>
                  <ul>
                    <li v-for="(i, k) in item.listData" :key="k">
                      <img :src="i.imgUrl" alt="" />
                      <span>{{ i.name }}</span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <tabber></tabber>
  </div>
</template>
<script>
import BetterScroll from "better-scroll";
import http from "@/request/axios";

import Tabber from "@/components/common/Tabber.vue";
import ListHeader from "@/components/content/list/ListHeader.vue";
import ThemeTitle from "@/components/common/ThemeTitle.vue";

export default {
  name: "List",
  data() {
    return {
      Bscroll: "",
      adImg: "./images/swiper2.jpeg",
      leftStyle: {},
      allHeigth: [],
      leftData: "",
      rightData: "",
      scrollY: "",
      rightStyle: "",
      lastLiHeight: "",
    };
  },
  components: {
    Tabber,
    ListHeader,
    ThemeTitle,
  },
  methods: {
    getData() {
      http
        .$axios({
          url: "/api/goods/list",
        })
        .then((res) => {
          this.leftData = res.leftData;
          this.rightData = res.rightData;
        });
    },
    goScroll(index) {
      this.Bscroll.scrollTo(0, -this.allHeigth[index], 300);
      console.log(-this.allHeigth[index]);
    },
  },
  computed: {
    // 滚动激活active区域设置
    currentIndex() {
      return this.allHeigth.findIndex((item, index) => {
        return this.scrollY >= item && this.scrollY < this.allHeigth[index + 1];
      });
    },
  },
  created() {
    this.getData();
  },
  mounted() {
    setTimeout(() => {
      this.$nextTick(() => {
        this.Bscroll = new BetterScroll(this.$refs.wrapper, {
          movable: true,
          zoom: true,
          probeType: 3,
          click: true,
          bounce: false,
        });
        this.Bscroll.on("scroll", (pos) => {
          let posY = Math.abs(pos.y);
          let top = 44 - posY;
          if (top > 0) {
            this.leftStyle = {
              top: top + "px",
            };
          } else {
            this.leftStyle = {
              top: 0,
            };
          }
        });
        let lis = this.$refs.right.getElementsByClassName("shop-list");
        let ad = document.getElementsByClassName("ad");

        // let height = 10 + ad[0].offsetHeight;
        let height = 0;
        this.allHeigth.push(height);
        this.lastLiHeight =
          Array.from(lis)[Array.from(lis).length - 1].offsetHeight;

        Array.from(lis).forEach((v) => {
          if (height == 0) {
            height += v.offsetHeight + ad[0].offsetHeight + 54;
          } else {
            height += v.offsetHeight;
          }
          this.allHeigth.push(height);
        });

        this.Bscroll.on("scroll", (pos) => {
          this.scrollY = Math.abs(pos.y);
        });
        this.rightStyle = {};
      });
    }, 500);
  },
};
</script>

<style scoped lang="scss">
.list {
  section {
    flex: 1;
    .content {
      .left {
        width: 25%;
        position: fixed;
        z-index: 999;
        top: 44px;
        bottom: 54px;
        border-right: 1px solid #e7e7e7;
        li {
          line-height: 30px;
          text-align: center;
          margin: 15px 0;
          font-size: 14px;
          &.active {
            color: #b54f4a;
            border-left: 3px solid #b54f4a;
          }
        }
      }
      .right {
        width: 100vw;
        height: calc(100vh - 54px);
        overflow: hidden;
        .header {
          width: 100%;
        }
        .scroll-content {
          padding-bottom: 300px;
        }
        .list {
          box-sizing: border-box;
          padding: 10px;
          margin-left: 25%;
          width: 75%;
          .ad {
            width: 100%;
            font-size: 0;
            img {
              width: 100%;
            }
          }
          .list-box {
            display: flex;
            flex-direction: column;
            .theme-title {
              margin: 10px 0;
            }
            > li {
              ul {
                display: flex;
                flex-wrap: wrap;
                li {
                  width: 33.3%;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  font-size: 12px;
                  box-sizing: border-box;
                  padding: 10px;
                  img {
                    width: 80%;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>