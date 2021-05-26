/* eslint-disable */
//import { url } from "../../assets/config/config";
//import wx from "weixin-js-sdk";

export default {
  getUrlKey: function (name) {
    return (
      decodeURIComponent(
        (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
          location.href
        ) || [, ""])[1].replace(/\+/g, "%20")
      ) || null
    );
  },
  // 获取配置
  wxgetsign(that, wx) {
    const href = location.href.split("#")[0];
    that.$axios
      .get(
        `/fapi/public/main/GetConfig?url=${encodeURIComponent(href)}`,
        {} //部署后需调整
      )
      .then(res => {
        if (res.data.appid) {
          const datad = res.data;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
            appId: datad.appid, // 必填，公众号的唯一标识
            timestamp: datad.timestamp, // 必填，生成签名的时间戳
            nonceStr: datad.nonceStr, // 必填，生成签名的随机串
            signature: datad.signature, // 必填，签名，见附录1
            jsApiList: ["scanQRCode", "getLocation", "chooseWXPay", "updateTimelineShareData", "onMenuShareTimeline", "updateAppMessageShareData", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
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
  }
};
