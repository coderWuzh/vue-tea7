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
          <span>编辑地址</span>
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
      show-delete
      :address-info="addressInfo"
      @save="onSave"
      @delete="onDelete"
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
      addressInfo: {},
    };
  },
  components: {
    HeaderBar,
  },
  created() {
    this.addressInfo = this.$route.params.key;
  },
  methods: {
    onSave(content) {
      content.isDefault = content.isDefault ? 1 : 0;
      http
        .$axios({
          url: "/api/goods/changeAddress",
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
    onDelete(content) {
      http
        .$axios({
          url: "/api/goods/delAddress",
          method: "POST",
          headers: {
            token: true,
          },
          data: {
            id: content.id,
          },
        })
        .then((res) => {
          Toast(res.msg);
          this.$router.back();
        });
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