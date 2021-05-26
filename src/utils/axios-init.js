import axios from 'axios'
import qs from 'qs'
// import createRouter from '../router'
// import createStore from '../store'

// axios.defaults.crossDomain = true;
// axios.defaults.withCredentials = true; //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
// axios.defaults.headers.common['Authorization'] = ''; // 设置请求头为 Authorization
console.log(process.env)
export const isDev = process.env.NODE_ENV === 'development'
// const TARGET_SERVER = process.env.VUE_ENV === "server";
if (typeof window !== 'undefined') {
  axios.defaults.baseURL = isDev ? '/api' : '/index.php?s=/Api/'
} else {
  axios.defaults.baseURL = 'http://www1.biaosh.cn/index.php?s=/Api/'
}
// 默认地址
// axios.defaults.baseURL = isDev ? '/api' : 'http://test.biaosh.cn/index.php?s=/Api/'
axios.defaults.timeout = 100000
axios.defaults.withCredentials = true

function changeUrl(arr) {
  let str = '';
  for (let key in arr) {
    str = `${str}&${key}=${arr[key]}`
  }
  return str
}
// 路由请求拦截
// http request 拦截器
axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // store.commit('setShowLoading', { res: true })
    var token = {}
    if (config.method === 'post') {
      config.data = Object.assign(token, config.data, config.params);
      config.data = qs.stringify(config.data)
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    } else {
      config.params = Object.assign(token, config.params);

      config.url = config.url + changeUrl(config.params);
      // console.info("url")
      // console.info(config.url)
    }
    config.params = Object.create(null)

    return config;
  },
  // 对请求错误做些什么
  error => {
    return Promise.reject(error.response);
  });

// 路由响应拦截
// http response 拦截器
axios.interceptors.response.use(

  response => {
    // const router = createRouter()
    // store.commit('setShowLoading', { res: false })
    // const store = createStore()
    // 对响应数据做点什么
    if (response.data.status == "-1") {
      // router.replace({ path: '/login.html' })
      // store.dispatch('clearUserInfo')
      return
    } else {
      return response;
    }
  },
  // 对响应错误做点什么
  error => {
    console.log('请求异常')
    console.log(error)
    return Promise.reject(error)
  });
export default axios;
