import { CART_DATA, CHECK_ALL, UNCHECK_ALL, ITEM_CHECK, DELETE_ITEM } from "./mutations-types"
import http from "@/request/axios";
import { Toast, Dialog } from "vant";
export default {
  state: {
    list: [],
    selectList: [],
  },
  getters: {
    selectAll(state) {
      return state.selectList.length == state.list.length
    },
    total(state) {
      let total = {
        price: 0,
        num: 0
      }
      state.selectList.forEach(item => {
        state.list.forEach(v => {
          if (v.goods_id == item) {
            total.price += v.goods_price * v.goods_num
            total.num += parseInt(v.goods_num)
          }
        })

      })
      return total
    }
  },
  mutations: {
    [CART_DATA](state, cartData) {
      state.list = cartData;
      state.selectList = state.list.map(v => {
        return v.goods_id
      })
    },
    [CHECK_ALL](state) {
      state.selectList = state.list.map(v => {
        v.checked = true;
        return v.goods_id;
      })
    },
    [UNCHECK_ALL](state) {
      state.list.forEach(v => {
        v.checked = false;
      })
      state.selectList = [];
    },
    [ITEM_CHECK](state, index) {
      let id = state.list[index].goods_id;
      let sId = state.selectList.indexOf(id)
      // 找到选中数组中的id，删除
      if (sId > -1) {
        state.selectList.splice(sId, 1)
      }
      // 找不到，添加进入选中数组
      else {
        state.selectList.push(id)
      }
      // console.log(state.selectList, state.list);
    },
    [DELETE_ITEM](state, goodsId) {
      http.$axios({
        url: '/api/goods/deleteCart',
        method: 'POST',
        headers: {
          token: true
        },
        data: {
          goodsId
        }
      }).then(res => {
        Toast(res.msg);
        state.list = state.list.filter(v => {
          return v.goods_id != goodsId
        })
        state.selectList = state.selectList.filter(v => {
          return v != goodsId
        })
        console.log(state.list, state.selectList);
      })
    }
  },
  actions: {
    selectAllFn({ commit, getters }) {
      getters.selectAll ? commit('uncheckAll') : commit('checkAll')
    },
    deleteAllFn({ commit, state }) {
      Dialog.confirm({
        title: '删除',
        message: '确认删除这些商品？',
      })
        .then(() => {
          state.selectList.forEach(v => {
            console.log(v);
            commit('deleteItem', v)
          })
        })
    }
  }
}