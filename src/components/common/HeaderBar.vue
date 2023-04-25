<template>
  <div class="header_bar">
    <ul>
      <li>
        <slot name="left"> </slot>
      </li>
      <li class="center">
        <slot name="center"> </slot>
      </li>
      <li>
        <slot name="right"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: "./K.jpg",
    };
  },
};
</script>

<style scoped lang="scss">
.header_bar {
  width: 100%;
  background-color: #b0352f;
  ul {
    display: flex;
    align-items: center;
    width: 100%;
    height: 44px;
    li {
      text-align: center;
      &.center {
        flex: 1;
      }
    }
  }
}
</style>