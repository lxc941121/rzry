<template>
  <div id="app">
    <div v-wechat-title="$route.name?$route.name:'城市数林公众服务平台'"></div>
    <!-- <router-link to="../components/rzry/index">Page1</router-link> -->
    <router-view />
    <div class="backhome" @click="tohome()"></div>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import { inde_url, url } from "@/assets/config/config";
/* eslint-disable */
// import Head from "./components/head.vue";
window.onload = function () {
  document.addEventListener("touchstart", function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener("gesturestart", function (event) {
    event.preventDefault();
  });
};
export default {
  name: "App",
  data() {
    return {
      temp: 1,
      inde_url: "http://rzry.go577.net/#/map",
    };
  },
  methods: {
    tohome() {
      window.location.href = inde_url;
    },
    getUrlKey: function (name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    },
    wxgetsign(that, wx) {
      const href = location.href.split("#")[0];
      that.$axios
        .get(
          `/fapi/public/main/GetConfig?url=${encodeURIComponent(href)}`,
          {} //部署后需调整
        )
        .then((res) => {
          console.log("登录", res);
          if (res.data.appid) {
            const datad = res.data;
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
              appId: datad.appid, // 必填，公众号的唯一标识
              timestamp: datad.timestamp, // 必填，生成签名的时间戳
              nonceStr: datad.nonceStr, // 必填，生成签名的随机串
              signature: datad.signature, // 必填，签名，见附录1
              jsApiList: [
                "scanQRCode",
                "getLocation",
                "chooseWXPay",
                "updateTimelineShareData",
                "onMenuShareTimeline",
                "updateAppMessageShareData",
                "onMenuShareAppMessage",
              ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function () {
              // config信息验证后会执行ready方法，所有接口调用都必须在config接口获
            });
            wx.error(function (res) {
              that.showPositionValue = true;
              that.text = res.errMsg;
            });
          }
        });
    },
    wxAuthorization() {
      this.$axios
        .get(
          `/fapi/public/main/oauth?redirect_uri=${encodeURIComponent(
            this.inde_url //部署后需调整
          )}&response_url=null`,
          {}
        )
        .then((res) => {
          console.log(res.data);
          window.sessionStorage.setItem("res", res.data); //存入sessionStorage
          //this.$cookies.set("res", res.data); //存入cookise
          window.location.href = res.data;
        });
    },

    persondata(cookie, fn) {
      window.sessionStorage.setItem("code", this.getUrlKey("code"));
      // this.$cookies.set("code", this.$utils.getUrlKey("code"));
      // const code = this.$cookies.get("code");
      const that = this;
      const code = window.sessionStorage.getItem("code");
      console.log("code", code);
      this.$axios
        .get(`/fapi/public/main/invoke?code=${code}`, {})
        .then((res) => {
          if (res.data.code != 100) {
            //JSON.parse(res.data.user_info).errcode
            fn && fn(false);
          } else {
            // console.log('res',res.data);
            window.sessionStorage.setItem("token", res.data.wxscToken);
            // this.$cookies.set('token',res.data.wxscToken);
            const person = JSON.parse(res.data.userInfo); //用户全部信息
            that.headimg = person.headpic;
            that.name = person.nickname;
            console.log(person);
            console.log(JSON.parse(res.data.userInfo));
            window.sessionStorage.setItem("person", res.data.userInfo);
            //this.$cookies.set("person", person); //存入cookise
            fn && fn(true);
          }
        });
    },
  },
  // created(){
  //   // let code = this.$utils.getUrlKey("code");
  //   // this.persondata(code, (boolean) => {
  //   //   if (boolean) {
  //   //     //  code..
  //   //     console.log("成功了");
  //   //     var that = this;
  //   //     that.$utils.wxgetsign(that, wx); //获取wx.config
  //   //     //that.showtxt = true;
  //   //     that.navtxt = true;
  //   //   } else {
  //   //     //  验证 跳转
  //   //     this.wxAuthorization();
  //   //   }
  //   // });
  // },
  mounted() {
    const that = this;
  },
};
</script>

<style lang="less">
@import "style/common.less";
</style>
<style lang="less">
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  .backhome {
    background-color: #000;
    width: 50px;
    height: 50px;
    position: fixed;
    bottom: 70px;
    right: 10px;
    z-index: 15;
    background: url("components/img/index/home.png") center center no-repeat;
    background-size: 100% 100%;
  }
}
</style>
