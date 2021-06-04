<template>
  <div>
    <div id="cj">
      <!-- 头部背景颜色 -->
      <div class="titleDiv">
        <div class="person">
          <img :src="headimg" />
        </div>
        <div class="text">
          <h3>{{name}}</h3>
          <p style="height:21px">
            <!-- 解锁树种：
          <span>{{treecount}}</span> -->
          </p>
        </div>
        <div>
          <div class="btn_user" style="width:100%;position: relative;">
            <img src="../img/phone.png" class="icon">
            <x-button :gradients="['#fff', '#fff']" class="btnPhone" v-if="phonenum" @click.native="Phone">{{phonenum}}</x-button>
            <x-button :gradients="['#fff', '#fff']" class="btnPhone" v-else @click.native="Phone">绑定手机号</x-button>
          </div>
          <div class="btn_user" style="width:100%;position: relative;margin-top: 15px;">
            <x-button :gradients="['#fff', '#fff']" class="btn" link="/myRzry">我的认种认养</x-button>
          </div>
        </div>

        <div class="hz" style="box-sizing: border-box;padding:1% 0px;">
          <div class="jb">
            <img :src="require('../img/jb.png')" />
            排名：{{rank}}
          </div>
          <div class="nl">
            <img :src="require('../img/nl.png')" />
            绿色能量：0
          </div>
        </div>
      </div>
      <!-- 标题 -->
      <div class="title">
        <img :src="require('../img/xqx.png')" style="left: 10px;" />
        <h3>我的证书</h3>
        <img :src="require('../img/xqx.png')" class="imgborder" />
      </div>
      <!-- 列表 -->
      <div style="box-sizing: border-box;padding:0 15px;overflow:hidden">
        <scroller lock-y scrollbar-x style="width:1oo%">
          <ul class="hzlist" style="overflow:hidden;margin:15px 0px" :style="{width:(rylist.length*33.33)+'%'}">
            <li v-for="item in rylist" :key="item.id" @click="lookZs(item)" style="margin:0px" :style="{width:(100/rylist.length)+'%'}">
              <img :src="item.path" />
              <!-- <div class="text">芙蓉树</div> -->
            </li>
          </ul>
        </scroller>
      </div>
      <div v-transfer-dom>
        <previewer :list="IMGlist" ref="previewer"></previewer>
      </div>
      <!-- 标题 -->
      <div class="title">
        <img :src="require('../img/xqx.png')" style="left: 10px;" />
        <h3>已解锁树种</h3>
        <img :src="require('../img/xqx.png')" class="imgborder" />
      </div>
      <!-- 列表 -->
      <ul class="hzlist">
        <li v-for="i in cjList" :key="i.id">
          <img v-if="i.unlock==true" :src="require('../img/'+i.name+'.png')" />
          <img v-if="i.unlock==false" :src="require('../img/'+i.name+'2.png')" />
        </li>
      </ul>
      <!-- 绑定手机号-->
      <phoneDialog />
      <!-- 弹框 -->
      <rzrypop></rzrypop>

    </div>
    <footer-bar />
  </div>
</template>

<script>
import bus from "../../assets/config/eventBus";
import { XButton, Popover, Previewer, TransferDom, Scroller } from "vux";
import rzrypop from "../personal/rzryPop/rzrypop";
import PhoneDialog from "./phoneDialog";
import { inde_url, url } from "../../assets/config/config";
import footerBar from "@/subComponent/footer";

export default {
  directives: {
    TransferDom,
  },
  components: {
    PhoneDialog,
    XButton,
    Popover,
    Previewer,
    TransferDom,
    Scroller,
    rzrypop,
    footerBar,
  },
  data() {
    return {
      headimg: "",
      name: "",
      timeValue: "2020",
      gypShow: true,
      IMGlist: [],
      rylist: [],
      phonenum: "",
      treecount: 0,
      rank: 0,
      zsList: [
        {
          id: 1,
          img: require("../img/zs.jpg"),
        },
        {
          id: 2,
          img: require("../img/zs.jpg"),
        },
        {
          id: 3,
          img: require("../img/zs.jpg"),
        },
      ],
      cjList: [
        {
          id: 1,
          name: "银杏",
          unlock: false,
        },
        {
          id: 2,
          name: "白杨",
          unlock: false,
        },
        {
          id: 3,
          name: "梧桐",
          unlock: false,
        },
        {
          id: 4,
          name: "松树",
          unlock: false,
        },
      ],
    };
  },
  mounted() {
    this.getRouterData();
    this.getDataList();
    this.getrylist();
    this.getphinfo();
  },
  methods: {
    getphinfo() {
      const that = this;
      that.$axios
        .post(
          "/api/sys/yl/ranking/peranking",
          {
            nowPage: self.pageNum,
            pageSize: 20,
            key: "",
          },
          {
            headers: {
              token: window.sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          that.rank = res.data.myranking.ranked;
        });
    },
    lookZs(list) {
      console.log(list.path);
      let item = {
        src: list.path,
      };
      console.log(item);
      this.IMGlist.length = 0;
      this.IMGlist.push(item);
      this.$refs.previewer.show(0);
    },
    showGYP() {
      console.log(bus);
      bus.$emit("tcEvent", this.gypShow);
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
                  // self.wxAuthorization();
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
          const orderlist = res.data.datas;
          self.cjList.forEach((element) => {
            var param = orderlist.filter(function (item) {
              return item.tree_name == element.name;
            });
            element.unlock = param.length > 0 ? true : false;
          });
          self.treecount = self.cjList.filter(function (item) {
            return item.unlock == true;
          }).length;
        });
    },

    getrylist() {
      const self = this;
      self.$axios
        .post(
          "/api/sys/yl/cert/list",
          {
            nowPage: 1,
            pageSize: 20,
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
                  // self.wxAuthorization();
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
          self.rylist = res.data.datas;
        });
    },

    getRouterData() {
      const self = this;
      self.$axios
        .post("/api/sys/yl/user/userInfo", "", {
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          self.headimg = self.$route.query.headimg;
          self.name = self.$route.query.name;
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
                  // self.wxAuthorization();
                }
              });
            } else {
              //  验证 跳转
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
          self.phonenum = res.data.data.phone;
          // debugger
          console.log(res);
        });
    },
    Phone() {
      // this.$refs.phoneDialog.phoneShow = true;
      bus.$emit("bangDingPhone");
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/config/common.css";
#cj {
  height: 100%;
  .titleDiv {
    width: 100%;
    /*overflow-x: hidden;*/
    height: 145px;
    background-image: url(../img/cjbg.jpg);
    background-size: 100%;
    position: relative;
    padding-top: 25px;
    div {
      width: 30%;
      display: inline-block;
      padding: 1%;
      vertical-align: middle;
      img {
        width: 65%;
        margin: auto;
        display: block;
        border-radius: 50%;
      }
      .btn {
        font-size: 12px;
        color: #28ce84 !important;
        border-radius: 20px;
        width: 102px;
        // margin: auto;
        display: block;
        margin-left: 0px;
        // position: absolute;
        // top: 47%;
        // right: 2%;
      }
      .btnPhone {
        font-size: 12px;
        color: #28ce84 !important;
        border-radius: 20px;
        width: 102px;
        //margin: auto;
        display: block;
        margin-left: 0px;
        // position: absolute;
        // top: 6vh;
        // left: 24vh;
        text-align: right;
      }
    }
    .text {
      color: #fff;
      position: relative;
      left: -2vh;
      p {
        span {
          font-size: 16px;
          font-weight: bold;
        }
      }
      h3 {
        font-size: 16px;
      }
    }
    .hz {
      width: 100%;
      text-align: right;
      color: #fff;
      position: relative;
      right: 0vh;
      img {
        width: 35px;
        display: inline-block;
        position: absolute;
        top: -4px;
        left: -17px;
      }
      .jb {
        width: 80px;
        display: inline-block;
        background-color: #27ce84;
        position: relative;
        padding: 5px 10px;
        margin-right: 30px;
      }
      .nl {
        width: 120px;
        display: inline-block;
        background-color: #27ce84;
        position: relative;
        padding: 5px 10px;
      }
    }
    .icon {
      width: 2.5vh;
      height: 3.5vh;
      position: absolute;
      top: 0.5vh;
      left: 1.2vh;
      z-index: 1;
    }
  }
  .title {
    margin-top: 15px;
    margin-left: 10px;
    margin-right: 10px;
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
  .hzlist {
    margin-top: 15px;
    margin-left: 15px;
    margin-right: 15px;
    li {
      width: 30%;
      float: left;
      margin-left: 2%;
      margin-top: 10px;
      img {
        width: 80%;
        margin: auto;
        display: block;
      }
    }
    .text {
      text-align: center;
      color: #fff;
      font-size: 14px;
      background-image: url(../img/bd.png);
      background-repeat: no-repeat;
      background-size: 80%;
      background-position: center;
    }
  }
}
</style>
