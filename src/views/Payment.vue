<template>
  <h2>
    支付成功,{{ second }}秒后跳转回
    <router-link to="/home" :style="{ color: 'blue' }">主页</router-link>
    ...
  </h2>
</template>

<script>
export default {
  name: "Payment",
  data() {
    return {
      second: 5,
    };
  },
  components: {},
  created() {
    let timer = setInterval(() => {
      this.second--;
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      this.$router.push("/home");
    }, 5000);
  },
  methods: {},
};
</script>

<style scoped lang="scss">
</style>