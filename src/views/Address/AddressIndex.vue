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
          <span>我的地址</span>
        </div>
      </template>
      <template #right>
        <div class="left"></div>
      </template>
    </header-bar>
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      :switchable="false"
      @click-item="chooseItem"
    >
    </van-address-list>
  </div>
</template>

<script>
import HeaderBar from "@/components/common/HeaderBar.vue";
import http from "@/request/axios";
export default {
  name: "AddressIndex",
  data() {
    return {
      chosenAddressId: "1",
      list: [],
    };
  },
  components: {
    HeaderBar,
  },
  created() {
    this.getData();
  },
  methods: {
    onAdd() {
      this.$router.push("/addAddress");
    },
    chooseItem(item) {
      if (this.$route.query.flag == "choose") {
        this.$router.push({
          path: "/order",
          query: {
            orderArr: this.$route.query.orderList,
            address: JSON.stringify(item),
          },
        });
      }
    },
    onEdit(item, index) {
      this.$router.push({
        name: "ChangeAddress",
        params: {
          key: item,
        },
      });
    },
    getData() {
      http
        .$axios({
          url: "/api/goods/addressList",
          method: "POST",
          headers: {
            token: true,
          },
        })
        .then((res) => {
          let data = res.data;
          data = data.forEach((v) => {
            v["address"] =
              v.province + v.city + v.county + " " + v.addressDetail;
            v.isDefault = v.isDefault == 1 ? true : false;
          });
          this.list = res.data;
          let _index;
          this.list.forEach((v, index) => {
            if (v.isDefault == true) {
              _index = index;
            }
          });
          this.list.splice(0, 1, ...this.list.splice(_index, 1, this.list[0]));
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