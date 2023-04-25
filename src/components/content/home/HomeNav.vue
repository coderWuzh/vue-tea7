<template>
  <ul class="home-nav">
    <li v-for="(item, index) in navList" :key="index">
      <img :src="item.imgUrl" alt="" />
      <span>{{ item.name }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {};
  },
  props: {
    navList: [],
    typeof: Array,
  },
  components: {},
  methods: {},
};
</script>

<style scoped lang="scss">
.home-nav {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #e7e7e7;
  li {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 15px;
    img {
      padding: 0 15px 11.25px 15px;
      width: 37.5px;
      height: 37.5px;
    }
  }
}
</style>
