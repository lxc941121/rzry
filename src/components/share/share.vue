<template>
  <div id="share" v-if="active">
    <div class="shareinfo">
      <img :src="require('../img/sharetitle.png')" class="sharetitle" />
      <div class="rzrinfo">
        <div class="rztl">认种认养人</div>
        <div class="psinfo">
          <img :src="headimg" />
          <div class="rzrname">{{name}}</div>
        </div>
        <div class="ryjy">
          <span class="jytl">认种认养寄语：</span>
          <span class="jycontent">{{orderinfo.wishes}}</span>
        </div>
        <div class="lficon"></div>
      </div>
      <div class="rzorderinfo">
        <div class="infoitem">
          <div class="s1">认种认养项目：</div>
          <div class="s2">{{projectinfo.project_name}}</div>
        </div>
        <div class="infoitem">
          <div class="s1">认种认养树种：</div>
          <div class="s2">{{projectinfo.tree_name}}</div>
        </div>
        <div class="infoitem">
          <div class="s1">认种认养时间：</div>
          <div class="s2">{{sttime(orderinfo.payment_date)}}</div>
        </div>
        <div class="infoitem">
          <div class="s1">养护机构：</div>
          <div class="s2">{{projectinfo.proprietor}}</div>
        </div>
      </div>
      <div class="btnbox">
        <div class="lficon2"></div>
        <div class="rzbtn" @click="tojoin()">立即和TA一起认种认养！</div>
        <div class="lficon3"></div>
      </div>
    </div>

    <div class="proinfo" v-if="projectinfo.project_text">
      <img :src="projectinfo.project_text" />
    </div>
    <div class="proinfo" v-if="projectinfo.tree_text">
      <img :src="projectinfo.tree_text" />
    </div>
  </div>
</template>
<script>
import {
  XTable,
  Scroller,
  Cell,
  CellBox,
  CellFormPreview,
  Group,
  Previewer,
  XButton,
  TransferDom,
} from "vux";
import { inde_url, url } from "../../assets/config/config";
import wx from "weixin-js-sdk";
export default {
  directives: {
    TransferDom,
  },
  components: {
    XButton,
    XTable,
    Scroller,
    Cell,
    CellBox,
    CellFormPreview,
    Group,
    Previewer,
  },
  data() {
    return {
      //暂时存储图片
      showtab: 0,
      finish: false,
      headimg: undefined,
      name: undefined,
      orderCount: undefined,
      roleCount: undefined,
      identity: undefined,
      orderinfo: {},
      projectinfo: {},
      active: false,
      name: "",
      headimg: "",
    };
  },
  methods: {
    async getTreeDetail() {
      const self = this;
      await self.$axios
        .post(
          "/api/sys/yl/tree/list",
          {
            key: self.yhinfo.tree_name,
          },
          {
            headers: {
              token: window.sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          // debugger
          self.tree = res.data.datas[0];
          self.onePrice = self.tree.tree_price;
        });
    },
    tojoin() {
      if (this.projectinfo.pubstate == "1") {
        this.$router.push({
          path: "/apply",
          query: { projectItem: this.projectinfo.id },
        });
      } else {
        this.$router.push({ path: "/rzlist" });
      }
    },
    sttime(value) {
      var dt = new Date(value);
      var year = dt.getFullYear();
      var month = dt.getMonth() + 1;
      var day = dt.getDate();
      return year + "年" + month + "月" + day + "日";
    },

    // async getorderinfo(id){
    //   const self = this;
    //   await self.$axios.post("/api/sys/yl/ordertree/info?id="+id,"", {
    //     headers: {
    //       "token":  window.sessionStorage.getItem('token')
    //     }
    //   }).then( res =>{
    //      var rs = JSON.parse(res.data.order);
    //      self.registered_name = rs.registered_name;
    //      self.wishes = rs.wishes;
    //      self.paytime = self.sttime(rs.finishtime)
    //   })
    // },

    getprojectinfo(proid) {
      const self = this;
      self.$axios
        .post("/api/sys/yl/project/info?id=" + proid, "", {
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          self.projectinfo = res.data.formItem;
          self.$vux.loading.hide();
          self.active = true;
        });
    },

    getorderinfo(id) {
      const self = this;
      self.$axios
        .post("/api/sys/yl/order/info?id=" + id, "", {
          headers: {
            token: window.sessionStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res);
          var rs = res.data.formItem; //JSON.parse(res.data.order);
          self.orderinfo = rs;
          self.getprojectinfo(self.orderinfo.project_num);
        });
    },

    previewImage(e) {
      if (e.target.nodeName == "IMG") {
        let url = e.target.currentSrc;
        let item = {
          src: url,
        };
        this.IMGlist.length = 0;
        this.IMGlist.push(item);
        this.$refs.previewer[0].show(0);
      } else {
        return;
      }
    },

    wxAuthorization() {
      return;
      this.$axios
        .get(
          `/fapi/public/main/oauth?redirect_uri=${encodeURIComponent(
            `${url}/#/share?orderid=` + this.$route.query.orderid //部署后需调整
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
      const code = window.sessionStorage.getItem("code");
      console.log("code", code);
      const that = this;
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
            window.sessionStorage.setItem("person", res.data.userInfo);
            //this.$cookies.set("person", person); //存入cookise
            fn && fn(true);
          }
        });
    },
  },
  mounted() {
    this.$vux.loading.show({
      text: "加载中",
    });
    const self = this;
    self.orderid = self.$route.query.orderid;
    self.$axios
      .post("/api/sys/yl/user/userInfo", "", {
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      })
      .then(function (res) {
        console.log(res);
        if (res.data.msg && res.data.msg.indexOf("未登录") != -1) {
          window.sessionStorage.removeItem("person");
          // if (!window.sessionStorage.getItem("person")) {
          // if (!this.$cookies.get("person")) {
          let code = self.$utils.getUrlKey("code");
          self.persondata(code, (boolean) => {
            if (boolean) {
              //  code..
              console.log("成功了");
              self.$utils.wxgetsign(self, wx); //获取wx.config
              self.getorderinfo(self.orderid);
            } else {
              //  验证 跳转
              self.wxAuthorization();
            }
          });
        } else {
          self.headimg = res.data.data.headpic;
          self.name = res.data.data.nickname;
          self.getorderinfo(self.orderid);
        }
      });
  },
};
</script>
<style lang="less" scoped>
#share {
  overflow: hidden;
  background: url(../img/sharebg.png) top center no-repeat;
  background-size: 100% auto;
  background-color: #dfdfdf;
  width: 100%;

  .shareinfo {
    margin: calc(100% / 3) 10px 0px;
    background-color: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 10px 10px 0px;

    .sharetitle {
      display: block;
      width: 100%;
    }

    .rzrinfo {
      position: relative;
      background: rgba(40, 206, 132, 0.08);
      border: solid 1px #0b9b6f;
      margin: 10px;
      box-sizing: border-box;
      padding: 0px 10px 20px;

      .rztl {
        width: 100%;
        height: 25px;
        background: url(../img/rzricon.png) top center no-repeat;
        background-size: 102px 22px;
        font-size: 12px;
        font-weight: bold;
        color: #fff;
        line-height: 22px;
        text-align: center;
      }

      .psinfo {
        width: 100%;
        overflow: hidden;
        padding: 10px 0px;

        img {
          display: block;
          width: 40px;
          height: 40px;
          margin: 0 auto;
          border-radius: 100%;
        }
        .rzrname {
          display: block;
          font-size: 12px;
          line-height: 25px;
          color: #045e43;
          text-align: center;
          margin-top: 5px;
        }
      }

      .ryjy {
        width: 100%;
        overflow: hidden;
        text-align: center;
        .jytl {
          font-size: 12px;
          color: #fd8122;
          font-weight: bold;
        }
        .jycontent {
          font-size: 12px;
          color: #fda422;
        }
      }
      .lficon {
        position: absolute;
        width: 23px;
        height: 12px;
        z-index: 1;
        background: url(../img/lf.png) center center no-repeat;
        background-size: 100% 100%;
        bottom: -6px;
      }
    }
    .rzorderinfo {
      display: block;
      width: 100%;
      box-sizing: border-box;
      padding: 10px;

      .infoitem {
        width: 100%;
        overflow: hidden;
        padding: 5px 0px;
        .s1 {
          display: block;
          float: left;
          width: 45%;
          font-size: 12px;
          color: #333;
          font-weight: bold;
          text-align: right;
        }
        .s2 {
          display: block;
          float: left;
          width: 55%;
          font-size: 12px;
          color: #28ce84;
          text-align: left;
        }
      }
    }

    .btnbox {
      position: relative;
      width: 100%;
      padding: 25px 0px 10px;

      .rzbtn {
        width: 100%;
        height: 50px;
        background: url(../img/rzbtn.png) top center no-repeat;
        background-size: 100% 100%;
        font-size: 16px;
        line-height: 50px;
        color: #fff;
        text-align: center;
      }

      .lficon2 {
        position: absolute;
        top: 0px;
        width: 23px;
        height: 12px;
        right: 15%;
        background: url(../img/lf2.png) center center no-repeat;
        background-size: 100% 100%;
      }
      .lficon3 {
        position: absolute;
        width: 24px;
        height: 14px;
        right: 5%;
        bottom: -7px;
        background: url(../img/lf3.png) center center no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .proinfo {
    width: 100%;
    overflow: hidden;
    margin-top: 15px;

    img {
      display: block;
      width: 100%;
    }
  }
}
</style>