<template>
  <div class="theme-title">
    <slot>
      <span>热门推荐</span>
    </slot>
  </div>
</template>

<script>
export default {
  name: "ThemeTitle",
  data() {
    return {};
  },
  components: {},
  methods: {},
};
</script>

<style scoped lang="scss">
.theme-title {
  width: 100%;
  text-align: center;
  height: 26.25px;
  line-height: 26.25px;
  padding: 7.5px 0;
  font-size: 19px;
  span {
    position: relative;
    padding: 0 17px;
  }
  span::before,
  span::after {
    content: "";
    position: absolute;
    top: 50%;
    display: block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #d4c0a7;
    margin-top: -3px;
  }
  span::before {
    left: 0px;
  }
  span::after {
    right: 0px;
  }
}
</style>