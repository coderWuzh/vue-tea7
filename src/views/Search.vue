<template>
  <div class="search">
    <search-header></search-header>
    <section>
      <router-view></router-view>
    </section>
    <tabber></tabber>
  </div>
</template>

<script>
import Tabber from "@/components/common/Tabber.vue";
import SearchHeader from "@/components/content/search/SearchHeader";
export default {
  name: "Search",
  data() {
    return {};
  },
  components: {
    SearchHeader,
    Tabber,
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.search {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
section {
  flex: 1;
  width: 100%;
  overflow: hidden;
}
</style>