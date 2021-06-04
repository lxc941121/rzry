<template>
  <div id="myRzry">
    <!-- 首图 -->
    <div class="bgDiv">
      <img src="../img/rzrybg.jpg" />
    </div>
    <!-- 标题 -->
    <div class="title">
      <img :src="require('../img/xqx.png')" style="left: 10px;" />
      <h3>我的认种认养</h3>
      <img :src="require('../img/xqx.png')" class="imgborder" />
    </div>
    <!-- 列表 -->
    <ul class="list">
      <li v-for="(list,index) in dataList" :key="index">
        <!-- 图片 -->
        <div class="img">
          <img :src="list.tree_pic" />
        </div>
        <div class="text">
          <p>{{list.tree_name}}</p>
          <p>项目名称：{{list.project_name}}</p>
          <p>认养时间：{{strtime(list.maintain_startTime)}}</p>
          <p>到期时间：{{strtime(list.maintain_endTime)}}</p>
          <p>价格：￥{{list.tree_price}}元</p>
          <x-button :gradients="['#28ce86', '#28ce86']" class="btn" :link="'/detailsRecord?project_num='+list.project_num+'&orderid='+list.id">养护信息</x-button>
          <x-button :gradients="['#fda421', '#fda421']" class="btn" @click.native="showGYP(list)" v-if="list.path">公益牌</x-button>
        </div>
      </li>
    </ul>
    <a class="more" @click="pageNum++;getDataList();" v-if="hasNext">加载更多</a>
    <a class="more" v-else>没有更多了~</a>
    <!-- 弹框 -->
    <rzrypop></rzrypop>
    <footer-bar />
  </div>
</template>

<script>
import bus from "../../assets/config/eventBus";
import rzrypop from "./rzryPop/rzrypop.vue";
import { XButton, ButtonTab, ButtonTabItem } from "vux";
import { inde_url, url } from "../../assets/config/config";
import wx from "weixin-js-sdk";
import footerBar from "@/subComponent/footer";
export default {
  components: {
    XButton,
    ButtonTab,
    ButtonTabItem,
    rzrypop,
    footerBar,
  },
  data() {
    return {
      gypShow: true,
      rzrylist: [],
      dataList: [],
      pageNum: 1,
      hasNext: true,
      headimg: undefined,
      name: undefined,
    };
  },
  methods: {
    strtime(value) {
      var strdate = new Date(value.replace(/-/g, "/"));
      var year = strdate.getFullYear();
      var month =
        strdate.getMonth() < 9
          ? "0" + (strdate.getMonth() + 1)
          : strdate.getMonth() + 1;
      var day =
        strdate.getDate() < 10 ? "0" + strdate.getDate() : strdate.getDate();
      return year + "年" + month + "月" + day + "日";
    },

    showGYP(value) {
      console.log(bus);
      bus.$emit("tcEvent", this.gypShow, value);
    },
    wxAuthorization() {
      this.$axios
        .get(
          `/fapi/public/main/oauth?redirect_uri=${encodeURIComponent(
            url + "/#/myRzry" //部署后需调整
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
      window.sessionStorage.setItem("code", this.$utils.getUrlKey("code"));
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
    async getDataList() {
      const self = this;
      await self.$axios
        .post(
          "/api/sys/yl/ordertree/list",
          {
            nowPage: self.pageNum,
            pageSize: 10,
            key: "",
          },
          {
            headers: {
              token: window.sessionStorage.getItem("token"),
            },
          }
        )
        .then(function (res) {
          if (res.data.msg && res.data.msg.indexOf("未登录") != -1) {
            window.sessionStorage.removeItem("person");
            if (!window.sessionStorage.getItem("person")) {
              // if (!this.$cookies.get("person")) {
              let code = self.$utils.getUrlKey("code");
              self.persondata(code, (boolean) => {
                if (boolean) {
                  //  code..
                  console.log("成功了");
                  self.$utils.wxgetsign(self, wx); //获取wx.config
                } else {
                  //  验证 跳转
                  self.wxAuthorization();
                }
              });
            } else {
              //  验证 跳转
              const that = this;
              console.log("已有cookie");
              const person = JSON.parse(
                window.sessionStorage.getItem("person")
              );
              self.headimg = person.headpic;
              self.name = person.nickname;
              // that.headimg = this.$cookies.get("person").headpic;
              // that.name = this.$cookies.get("person").nickname;
              self.$utils.wxgetsign(that, wx); //获取wx.config
              //this.wxAuthorization();
            }
          }
          // console.log(self.format(res.data.datas.publish_date));
          const list = res.data.datas;
          list.forEach((item) => {
            if (!!!item.maintain_endTime) {
              item.maintain_endTime = "暂未种植";
            } else {
              item.maintain_endTime = self.format(item.maintain_endTime);
            }
            if (!!!item.maintain_startTime) {
              item.maintain_startTime = "暂未种植";
            } else {
              item.maintain_startTime = self.format(item.maintain_startTime);
            }
            self.dataList.push(item);
          });
          console.log(self.dataList);
          if (list.length == 0) {
            self.hasNext = false;
          }
        });
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    format(shijianchuo) {
      const self = this;
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return (
        y +
        "-" +
        self.add0(m) +
        "-" +
        self.add0(d) +
        " " +
        self.add0(h) +
        ":" +
        self.add0(mm) +
        ":" +
        self.add0(s)
      );
    },
    dingWei(x, y) {
      const point = { x, y };
      console.log(point);
    },
  },

  mounted() {
    const that = this;
    that.pageNum = 1;
    that.getDataList();
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/config/common.css";
#myRzry /deep/ .vux-button-group > a {
  color: #28ce84;
}
#myRzry /deep/ .vux-button-group > a.vux-button-group-current {
  color: #fff;
}
#myRzry {
  .bgDiv {
    width: 100%;
    height: 120px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .title {
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 15px;
    text-align: center;
    position: relative;
    h3 {
      margin: 0;
      font-size: 16px;
    }
    img {
      width: 30%;
      position: absolute;
      top: 5px;
    }
    .imgborder {
      right: 10px;
      transform: rotate(180deg);
      -ms-transform: rotate(180deg); /* Internet Explorer */
      -moz-transform: rotate(180deg); /* Firefox */
      -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
      -o-transform: rotate(180deg); /* Opera */
    }
  }
  .tab {
    padding: 20px 15px;
  }
  .list {
    padding-top: 2vh;
    li {
      margin-left: 15px;
      margin-right: 15px;
      margin-bottom: 15px;
      height: 200px;
      .img {
        width: 38%;
        height: 100%;
        float: left;
        overflow: hidden;
        img {
          height: 100%;
        }
      }
      .text {
        width: 55%;
        height: 100%;
        background-color: #f5f5f5;
        float: left;
        padding: 0px 10px 0px 10px;
        p {
          margin-top: 5px;
          margin-bottom: 10px;
          font-size: 12px;
        }
        .btn {
          width: 48%;
          display: inline-block;
          font-size: 12px;
          margin-top: 10px;
        }
      }
    }
  }
}
.more {
  color: #666;
  display: block;
  text-align: center;
  padding: 15px 0;
}
</style>
