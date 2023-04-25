<template>
  <div class="home container">
    <header>
      <home-header></home-header>
      <ly-tabs
        class="ly-tabs"
        v-model="value"
        activeColor="#b0352f"
        :lineWidth="lineWidth"
        @change="changeTab"
        :lineHeight="lineHeight"
      >
        <ly-tab-item
          v-for="(item, index) in dataList.titleList"
          :key="index"
          :name="String(index)"
          :title="item.name"
        ></ly-tab-item>
      </ly-tabs>
    </header>
    <section ref="wrapper">
      <div>
        <swiper class="swiper" :swiperList="dataList.swiperList"></swiper>
        <home-nav :navList="dataList.navList"></home-nav>
        <recommend :recommendList="dataList.recommendList"></recommend>
        <like :likeList="dataList.likeList"></like>
      </div>
    </section>
    <tabber></tabber>
  </div>
</template>

<script>
import http from "@/request/axios";
import BetterScroll from "better-scroll";

import Tabber from "@/components/common/Tabber.vue";
import Like from "@/components/common/Like.vue";
import Swiper from "@/components/common/Swiper";

import HomeHeader from "@/components/content/home/HomeHeader.vue";
import HomeNav from "@/components/content/home/HomeNav";
import Recommend from "@/components/content/home/Recommend";

export default {
  name: "Home",
  components: {
    Tabber,
    HomeHeader,
    Swiper,
    HomeNav,
    Recommend,
    Like,
  },
  data() {
    return {
      value: "0",
      lineWidth: 44,
      lineHeight: 2,
      dataList: {},
      BScroll: "",
      tabIndex: 1,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await http.$axios({
        url: "/api/index_list/home_data",
      });
      this.dataList = Object.freeze(res.data);
      // 在dom渲染完成后进行的nextTick
      this.$nextTick(() => {
        setTimeout(() => {
          this.BScroll = new BetterScroll(this.$refs.wrapper, {
            movable: true,
            zoom: true,
            click: true,
            bounce: false,
          });
        }, 300);
      });
    },
    changeTab(index) {
      let path = this.dataList.titleList[index].path;
      if (index != 0) this.$router.push(path);
    },
  },
  mounted() {},
};
</script>

<style scoped lang="scss">
header {
  width: 100%;
  height: 88px;
  // height: 88px;
}
::v-deep .ly-tabs__tab-list {
  height: 44px;
}
::v-deep .ly-tabs__active-line {
  bottom: 0;
}
</style>