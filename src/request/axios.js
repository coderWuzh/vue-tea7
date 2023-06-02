import axios from "axios";
import { Toast } from "vant";
import store from "@/store";
export default {
  common: {
    method: 'GET',
    data: {},
    headers: {},
    headers: {},
    baseURL:"http://8.130.121.204:3000"
  },
  $axios(options = {}) {
    options.method = options.method || this.common.method;
    options.data = options.data || this.common.data;
    options.params = options.params || this.common.params;
    options.headers = options.headers || this.common.headers;
    options.baseURL = options.baseURL || this.common.baseURL;

    if (options.headers.token) {
      options.headers.token = store.state.user.token
      if (!options.headers.token) {
        Toast('请先登录')
      }
    }
    return axios(options).then(v => {
      let data = v.data.data;
      return new Promise((res, rej) => {
        if (!v) return rej();
        res(data)
      })
    })
  }
}