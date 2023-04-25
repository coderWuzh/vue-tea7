import { USER_LOGIN, INIT_USER, LOGIN_OUT } from "./mutations-types"
import { Toast } from "mint-ui";
export default {
  state: {
    // 登录状态
    loginStatus: false,
    // token
    token: null,
    // 用户信息
    userInfo: {}
  },
  getters: {},
  mutations: {
    // 设置
    [USER_LOGIN](state, user) {
      state.loginStatus = true;
      state.token = user.token;
      state.userInfo = user;
      localStorage.setItem('teaUserInfo', JSON.stringify(user))
    },
    // 读取
    [INIT_USER](state) {
      let userInfo = JSON.parse(localStorage.getItem('teaUserInfo'))
      if (userInfo) {
        state.loginStatus = true;
        state.token = userInfo.token;
        state.userInfo = userInfo;
      }
    },
    // 退出登录
    [LOGIN_OUT](state) {
      state.loginStatus = false;
      state.token = null;
      state.userInfo = {};
      localStorage.removeItem('teaUserInfo')
      Toast('退出成功')
    }
  },
  actions: {
  },
}