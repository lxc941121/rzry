<template>
  <div id="complete">
    <success id="success" ref="success" calss="success" name="success"></success>
  </div>
</template>

<script>
import success from "./item/success";
import err from "./item/err";
import wx from "weixin-js-sdk";
import {url} from "../../../assets/config/config";
export default {
  components: {
    success,
    err,
  },
  mounted() {
    const that = this;
    that.$utils.wxgetsign(that, wx); //获取wx.config
    wx.checkJsApi({
      jsApiList: ["updateTimelineShareData","onMenuShareTimeline","updateAppMessageShareData","onMenuShareAppMessage"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: function(res) {
        console.log(res)
      }
      });
    console.log('test')
    const projectData = that.$refs.success.projectData
    let title = `我在${projectData.project_name}认种了一棵${projectData.tree_name}`
    let link = `${url}/#/share?orderid=`+that.$refs.success.orderid
    let imgUrl = 'https://rzryht.go577.net/upload/linkicon.png'
    wx.ready(function () {      //需在用户可能点击分享按钮前就先调用

      wx.updateTimelineShareData({
        title,
        link,
        imgUrl
      })
    });

  }
};
</script>

<style lang="less" scoped>
#complete {
  overflow: hidden;

  #success {
    margin-top: 30%;
  }
  p {
    width: 100%;
    position: absolute;
    bottom: 5px;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}
</style>
