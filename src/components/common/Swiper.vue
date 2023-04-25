<template>
  <swiper ref="mySwiper" :options="swiperOptions" class="swiper-main">
    <swiper-slide v-for="(item, index) in swiperList" :key="index">
      <img :src="item.imgUrl" alt="" />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
export default {
  name: "carrousel",
  props: {
    swiperList: Array,
  },
  data() {
    return {
      swiperOptions: {
        autoplay: true,
        speed: 1000,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
        },
        // Some Swiper option/callback...
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {
    this.swiper.slideTo(1, 1000, false);
  },
};
</script>
<style lang="scss" scoped>
::v-deep .swiper-slide {
  width: 100%;
  img {
    width: 100%;
  }
}
::v-deep .swiper-pagination-bullet-active {
  background-color: #b0352f;
}
</style>