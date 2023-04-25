<template>
  <ul class="content">
    <li class="bonus">
      <span class="title_line">优惠券</span>
      <div class="bonus_one">
        <div class="left">
          <div class="price">
            <b>￥</b>
            10
          </div>
          <span>满60减10</span>
        </div>
        <div class="right">
          <span>立</span>
          <span>即</span>
          <span>领</span>
          <span>取</span>
        </div>
      </div>
      <div class="bonus_two">
        <div class="left">
          <div class="price">
            <b>￥</b>
            10
          </div>
          <span>满60减10</span>
        </div>
        <div class="right">
          <span>立</span>
          <span>即</span>
          <span>领</span>
          <span>取</span>
        </div>
      </div>
      <span class="title_line"
        >共四张
        <i class="iconfont icon-qianjin"></i>
      </span>
    </li>
    <li class="serve">
      <span>服务</span>
      <div class="slist"><i class="iconfont icon-dagou"></i>全国包邮</div>
      <div class="slist"><i class="iconfont icon-dagou"></i>48小时发货</div>
      <div class="slist"><i class="iconfont icon-dagou"></i>七天无理由退货</div>
      <span>
        <i class="iconfont icon-qianjin"></i>
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Bonus",
  data() {
    return {};
  },
  components: {},
  methods: {},
};
</script>

<style scoped lang="scss">
.content {
  background-color: #fff;
  .bonus {
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 10px;
    border-bottom: 1px solid #f4f4f4;
    .bonus_one,
    .bonus_two {
      display: flex;
      width: 112px;
      height: 56px;
      color: #ff615e;
      background-color: #fff1f1;
      border-radius: 5px;
      .left {
        flex: 1;
        display: flex;
        flex-direction: column;
        .price {
          font-size: 28px;
          b {
            font-size: 13px;
          }
        }
        span {
          padding: 0 5px;
          font-size: 12px;
        }
      }

      .right {
        padding: 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        span {
          font-size: 12px;
          justify-content: start;
          line-height: 12px;
        }
      }
    }
    .title_line {
      font-size: 13px;
      color: #999;
    }
  }
  .serve {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    > span {
      color: #999;
      font-size: 13px;
    }
    .slist {
      font-size: 13px;
      i {
        color: #b4282d;
      }
    }
  }
}
</style>