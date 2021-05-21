// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

import Axios from "axios";
import VueCookies from "vue-cookies";

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.use(require("vue-wechat-title"));
Vue.use(VueCookies);
Vue.config.productionTip = false;

// 不需要每次都 import一下 axios了，直接使用 $axios 即可
Vue.prototype.$axios = Axios;
// step3：使每次请求都会带一个 /api 前缀

//Axios.defaults.baseURL = "/api"; //关键代码

import utils from "./assets/config/utils";
Vue.prototype.$utils = utils; // main.js中全局引入
Vue.config.productionTip = false;

/* 倒计时组件 */
Vue.filter("filterTime", function(value) {
  if (!value) {
    return "";
  }

  // value 不是时间格式 时：分： 秒
  if (value.indexOf(":") === -1) {
    return value;
  }

  let result = "";
  const arr = value.split(":");
  // 对小时、分钟、0秒数 补0
  if (parseInt(arr[0]) < 10) {
    result = "0" + arr[0];
  } else {
    result = arr[0];
  }

  if (parseInt(arr[1]) < 10) {
    result = result + ":0" + arr[1];
  } else {
    result = result + ":" + arr[1];
  }

  if (parseInt(arr[2]) < 10) {
    result = result + ":0" + arr[2];
  } else {
    result = result + ":" + arr[2];
  }
  return result;
});
// import Vconsole from 'vconsole'
// let vConsole = new Vconsole()
// Vue.use(vConsole)
/* eslint-disable no-new */


import {ToastPlugin, LoadingPlugin} from 'vux';
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);

new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
