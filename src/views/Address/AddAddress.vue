<template>
  <div>
    <header-bar>
      <template #left>
        <div class="left" @click="$router.back()">
          <i class="iconfont icon-fanhui"></i>
        </div>
      </template>
      <template #center>
        <div class="center">
          <span>添加地址</span>
        </div>
      </template>
      <template #right>
        <div class="left"></div>
      </template>
    </header-bar>
    <van-address-edit
      v-if="true"
      :area-list="areaList"
      show-set-default
      @save="onSave"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import { areaList } from "@vant/area-data";

import HeaderBar from "@/components/common/HeaderBar.vue";

import http from "@/request/axios";

export default {
  name: "AddAddress",
  data() {
    return {
      areaList,
    };
  },
  components: {
    HeaderBar,
  },
  methods: {
    onSave(content) {
      content.isDefault = content.isDefault ? 1 : 0;
      console.log(content);
      http
        .$axios({
          url: "/api/goods/addAddress",
          method: "POST",
          headers: {
            token: true,
          },
          data: {
            ...content,
          },
        })
        .then((res) => {
          Toast(res.msg);
          this.$router.back();
        });
    },
    onDelete() {
      Toast("delete");
    },
  },
};
</script>

<style scoped lang="scss">
.left {
  width: 50px;
  i {
    font-size: 26px;
    color: #fff;
  }
}
.center {
  font-size: 16px;
  color: #fff;
}
</style>