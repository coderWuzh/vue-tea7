<template>
  <div class="recommend">
    <theme-titleVue></theme-titleVue>
    <ul>
      <li v-for="(item, index) in recommendList" :key="index">
        <div>
          <a :href="item.path">
            <img :src="item.imgUrl" alt="" />
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ThemeTitleVue from "../../common/ThemeTitle.vue";
export default {
  name: "Recommend",
  data() {
    return {};
  },
  props: {
    recommendList: [],
    typeof: Array,
  },
  components: {
    ThemeTitleVue,
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.recommend {
  ul {
    display: flex;
    justify-content: space-around;
    padding: 0 3px 3px;
    li {
      box-sizing: border-box;
      width: 48%;
      a {
        width: 100%;
      }
      img {
        width: 100%;
      }
    }
  }
}
</style>