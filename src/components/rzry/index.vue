<style>
#showinfo .el-dialog__header{padding:0px;}
#showinfo .el-dialog{border-radius:5px;background:url("../img/index/activebg.png") no-repeat;background-size:100% 100%;}
#navinfo .el-dialog{background-color:rgba(255, 255, 255, 0);height:100%;margin:0px !important;position: relative;}
#showinfo .el-dialog__body{padding:30px 15px 7px;}
#showinfo .el-dialog__headerbtn{right:10px;top:10px;z-index:10;}
#navinfo .el-dialog__body,#navinfo .el-dialog__header{padding:0px;}
.swiper-pagination-bullet-active{background:#fff !important;opacity:1 !important;}
.swiper-pagination-bullet{opacity:0.5}
</style>
<template>
  <div>
    <div style="position: absolute;width: 50px;z-index: 3;top: 10px;left: 2%;" @click="headjump()">
      <img :src="headimg" style="display: block;border-radius: 100%;height: 50px;width: 50px;" />
      <div class="phnum">
        {{rank}}
      </div>
    </div>
     
    <!-- 地图模块 -->
    <Map id="map" class="map" name="map" ref="map"></Map>
    <!-- 搜索 -->
    <mapSearch ref="search" id="mapSearch" class="mapSearch"></mapSearch>
    <!-- 图层-定位 -->
    <ul id="leftBtn">
      <li @click="a">
        <img :src="require('@/components/img/tc.png')" />
        <p>图层</p>
      </li>
      <li @click="wxGetLocation">
        <img :src="require('@/components/img/dwz.png')" />
        <p>定位</p>
      </li>
    </ul>
    <!-- 成就图标 -->
    <ul class="leftCj">
      <li style="display: flex;flex-flow: column;" v-for="item in myRzry" :key="item.id">
        <img class="icons" src="../img/合欢树.png" :value="item.tree_name" @click="getsearchlist(item.project_num,0)">
        <!-- <img class="icons" src="../img/枇杷树.png">
        <img class="icons" src="../img/白玉兰.png"> -->
      </li>
    </ul>
    <!-- 右按钮 -->
    <ul id="mapBtn">
      <li v-for="item in btn" :key="item.name">
        <!-- @click="()=>$router.push(item.herf)" -->
        <img :src="require('@/components/img/'+item.url+'.png')" @click="jump(item)" />
        <p :style="'color:'+item.color">{{item.name}}</p>
      </li>
    </ul>
    <!-- 右侧弹框 -->
    <rightPop id="rightPop" class="rightPop" @mapSwitch="mapSwitch" @mapZt="mapZt"></rightPop>
    <!-- 弹幕滚轮 -->
    <Marquee id="barrageDiv" :item-height="35" :interval="2000">
      <Marquee-item v-for="item in barrage" :key="item.id" class="align-middle">
        <div class="bx">
          <span style="margin-left:40px">{{item.registered_name}}认种了{{item.quantity}}株{{item.tree_name}}</span>
        </div>
      </Marquee-item>
    </Marquee>
    <!-- 弹框 -->
    <detailPopup id="detailPopup" class="detailPopup"></detailPopup>
    <!-- 列表弹框 -->
    <listPopup id="listPopup" class="listPopup"></listPopup>

    <!-- 报错弹框 -->
    <toast
      v-model="showPositionValue"
      type="text"
      :time="3000"
      is-show-mask
      :text="this.text"
      position="middle"
    ></toast>

    <div id="showinfo">
      <el-dialog
        :visible.sync="showtxt"
        width="305px"
        height="450px"
      >
      <div style="display:block;width:100%;position:absolute;top: -25px;left: 0;padding:0 46px;box-sizing: border-box;">
         <img src="@/components/img/index/activetitle.png" style="display:block;width:100%"/>
      </div>
      <div class="newactswiper">
        <swiper :options="swiperOptions" ref="mySwiper" class="newswbox">
          <swiper-slide>
            <a class="newact-block">
              <img src="@/components/img/index/actimg.jpg" class="newact-block-img">
            </a>
          </swiper-slide>
          <swiper-slide>
            <a class="newact-block">
              <img src="@/components/img/index/actimg2.jpg" class="newact-block-img">
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="joinbtn" @click="gotoactive(23)"></div>
       <!-- <div class="usertitle">您好，{{name}}</div>
       <div class="infotxt">欢迎进入城市数林公众服务平台,</div>
       <div class="infotxt">平台累计发布{{project_count}}个认种认养项目,</div>
       <div class="infotxt">您参与了其中的{{join_count}}个,</div>
       <div class="infotxt">已认种认养树木{{tree_count}}株,</div>
       <div class="infotxt">目前排名第{{rank}}位。</div>
       <div class="infotxt">感谢您为公益植树所做的贡献。</div>
       <div class="btn_close" @click="showclose()">已知晓</div> -->
      </el-dialog>
    </div>

    <div id="navinfo" @click="closenav()">
      <el-dialog
        :visible.sync="navtxt"
        :show-close="false"
        width="100%"
        
      >
      <img src="../img/nav1.png" style="width:50%;position: absolute;top:55px;left: 15%;">
      <img src="../img/nav2.png" style="width:50%;position: absolute;top:20%;left: 50px;margin-top:55px;">
      <img src="../img/nav3.png" style="width:50%;position: absolute;top:40%;left: 50px;margin-top:50px;">
      </el-dialog>
    </div>



  </div>
</template>

<script>
/* eslint-disable */
import wx from "weixin-js-sdk";
import bus from "../../assets/config/eventBus";
import Map from "../map/map";
import mapSearch from "./map/search";
import detailPopup from "./map/detailPopup";
import listPopup from "./map/listPopup";
import rightPop from "./map/rightPop";
import { Marquee, MarqueeItem, Toast } from "vux";
import { url, inde_url } from "../../assets/config/config";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import 'swiper/dist/css/swiper.css'



// var graphicLayer,map=null;
export default {

  components: {
    Map,
    mapSearch,
    Marquee,
    MarqueeItem,
    detailPopup,
    listPopup,
    rightPop,
    Toast,
    swiper,
    swiperSlide,
  },
  data() {
    return {
      popShow: false,
      code: null,
      openid: null,
      showPositionValue: false,
      text: null,
      headimg: null,
      name: null,
      showtxt:false,
      navtxt:false,
      project_count:0,
      join_count:0,
      tree_count:0,
      rank:0,
      btn: [
        /* { id: 1, name: "图层", url: "tc", herf: "/rzlist", fun: "a" }, */
        { id: 2, name: "种养", url: "ry", herf: "/rzlist", fun: "b",color:"#28CE84"},
        // { id: 3, name: "认养", url: "rz", herf: "/rylist", fun: "b" },
        // { id: 4, name: "尽责", url: "jz", herf: "/zsjz", fun: "b" },
        { id: 5, name: "排名", url: "pm", herf: "/ph", fun: "b",color:"#FDA422" },
        { id: 6, name: "成就", url: "cj", herf: "/myRzry", fun: "b",color:"#2C98F7" },
        // { id: 7, name: "公示", url: "gsp", herf: "/gs", fun: "b" },
        // { id: 8, name: "AR", url: "AR", herf: "/rzlist", fun: "c" },
      ],
      barrage: [
        // { id: 1, type: "认种", text: "张三认领了100棵芙蓉树" },
        // { id: 2, type: "捐资", text: "李四捐资了60元" },
        // { id: 3, type: "认种", text: "张二认领了100棵芙蓉树" },
        // { id: 4, type: "认养", text: "小二认养了100棵芙蓉树" },
        // { id: 5, type: "捐资", text: "王五捐资了60元" },
        // { id: 6, type: "捐资", text: "赵四捐资了60元" },
      ],
      swiperOptions: {
        observer: true,
        observeParents: true,
        loop: false,
        autoplay: {
          disableOnInteraction: false,
          delay: 10000
        },
        pagination: {
          el: '.swiper-pagination'
        },
        on: {
        slideChangeTransitionEnd: function(){
            
          },
        },
      },
      localtion:{},
      myRzry:{},
    };
  },
  methods: {
    gotoactive(id){
      this.$router.push({path:'/rzlist'});
    },
    closenav(){
      console.log(this.navtxt)
      this.navtxt = false;
      this.showtxt=true;
    },
    showclose(){
      this.showtxt = false;
    },

    getsearchlist(data,type){
      this.$axios.post("/rzry/api/sys/yl/project/info?id="+data,"",{
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then( res =>{
        // debugger
        if(res.data.code==100)
        {
          var strx = Math.round(res.data.formItem.centerx * 100000) / 100000;
          var stry = Math.round(res.data.formItem.centery * 100000) / 100000;
          this.$refs.map.mapGoTo(strx, stry); 
          this.wxGetLocation2(res.data.formItem.project_name,type);
        }
      })   
    },


    wxAuthorization() {
      this.$axios
        .get(
          `/rzry/fapi/public/main/oauth?redirect_uri=${encodeURIComponent(
            inde_url //部署后需调整
          )}&response_url=null`,
          {}
        )
        .then((res) => {
          console.log(res.data);
          window.sessionStorage.setItem('res',res.data);//存入sessionStorage
          //this.$cookies.set("res", res.data); //存入cookise
          window.location.href = res.data;
        });
    },
    persondata(cookie, fn) {
      window.sessionStorage.setItem('code',this.$utils.getUrlKey("code"));
      // this.$cookies.set("code", this.$utils.getUrlKey("code"));
      // const code = this.$cookies.get("code");
      const that = this;
      const code = window.sessionStorage.getItem('code');
      console.log('code',code);
      this.$axios
        .get(`/rzry/fapi/public/main/invoke?code=${code}`, {})
        .then((res) => {
          console.log("psd",res)
          if (res.data.code != 100) {
            //JSON.parse(res.data.user_info).errcode
            fn && fn(false);
          } else {
            // console.log('res',res.data);
            window.sessionStorage.setItem("token",res.data.wxscToken);
            // this.$cookies.set('token',res.data.wxscToken);
            const person = JSON.parse(res.data.userInfo); //用户全部信息
            that.headimg = person.headpic;
            that.name = person.nickname;
            console.log(person);
            console.log(JSON.parse(res.data.userInfo));
            window.sessionStorage.setItem('person',res.data.userInfo);
            that.$utils.wxgetsign(that, wx);
            if(res.data.newUser)
            {
              that.navtxt = true;
            }else{
              that.showtxt=true;
            }
            //this.$cookies.set("person", person); //存入cookise
            fn && fn(true);
          }
        });
    },


        //获取用户位置
    wxGetLocation() {
      const that = this;
      // that.$refs.map.mapGoTo(120.663, 27.994); //定位
      wx.getLocation({
        type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          // const latitude = res.latitude; // 纬度x，浮点数，范围为90 ~ -90
          // const longitude = res.longitude; // 经度y，浮点数，范围为180 ~ -180。
          that.localtion.y = res.latitude;
          that.localtion.x = res.longitude;
          that.$refs.map.mapGoTo(res.longitude, res.latitude); //定位
          bus.$emit("FindProject","",1,that.localtion.x,that.localtion.y)
        },
      });
      
    },
    getdmlist(){
      this.$axios.post("/api/sys/yl/order/GetOrderMsg",{
        "nowPage": 1,
        "pageSize": 10,
        "total":0
      },{
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then( res =>{
        this.barrage = res.data.datas
        this.barrage = this.barrage.filter((item)=>{
          return item.registered_name
        })
        this.barrage.forEach((item)=>{
           if(item.registered_name.length>5){
             item.registered_name = item.registered_name.substring(0,5)+"..."
           }
        })
      })   
    },
   wxGetLocation2(data,type) {
      const that = this;
      // that.$refs.map.mapGoTo(120.663, 27.994); //定位
      wx.getLocation({
        type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          that.localtion.y = res.latitude;
          that.localtion.x = res.longitude;
           bus.$emit("FindProject",data,type,that.localtion.x,that.localtion.y)
          //that.$refs.map.mapGoTo(x, y); //定位
        },
      });
    },
    /* 矢量影像切换 */
    mapSwitch(dtlist) {
      this.$refs.map.addTileLayer(dtlist);
    },
    /* 专题叠加切换 */
    mapZt(zlist) {
      this.$refs.map.addZtLayer(zlist);
    },
    jump(data) {
      console.log("11",data.fun)
      this[data.fun](data);
    },
    a(data) {
      /* 弹框 */
      this.popShow == false ? (this.popShow = true) : (this.popShow = false);
      //console.log(this.popShow);
      bus.$emit("tcEvent", this.popShow);
      //
    },
    b(data) {
      /* 跳转 */
      this.$router.push({
        path: data.herf,
        query: {
          headimg: this.headimg,
          name: this.name,
        },
      });
      console.log(this.headimg)
    },
    c() {
      this.showPositionValue = true;
      this.text = "暂不开放";
    },


    headjump() {
      /* 跳转 */
      this.$router.push({
        path: "/cj",
        query: {
          headimg: this.headimg,
          name: this.name,
        },
      });
      console.log(this.headimg)
    },

    async getMyRzry(){
      const self = this;

      await self.$axios.post("/api/sys/yl/ordertree/list", {
        "nowPage": self.pageNum,
        "pageSize": 10,
        "key":""
      }, {
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then(function (res) {
        if (res.data.msg && res.data.msg.indexOf("未登录")!=-1){
          window.sessionStorage.removeItem("person");
          if (!window.sessionStorage.getItem("person")) {
            // if (!this.$cookies.get("person")) {
            let code = self.$utils.getUrlKey("code");
            self.persondata(code, (boolean) => {
              if (boolean) {
                //  code..
                console.log("成功了");
                self.$utils.wxgetsign(that,wx);//获取wx.config
              } else {
                //  验证 跳转
                self.wxAuthorization();
              }
            });
          } else {
            //  验证 跳转
            const that = this;
            console.log("已有cookie");
            const person = JSON.parse(window.sessionStorage.getItem('person'))
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
        self.myRzry = list;
        var newarr = new Array();
        list.forEach(element => {
          if(newarr.indexOf(element.project_num)==-1)
          {
            newarr.push(element.project_num);
          }
        });
        self.join_count = newarr.length;
        self.tree_count = list.length;
      });


      await self.$axios.post("/api/sys/yl/project/list", {
        "nowPage": self.pageNum,
        "pageSize": 10,
        "key":""
      }, {
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then(function (res) {
        self.project_count = res.data.total;
      });

      await self.$axios.post("/api/sys/yl/ranking/peranking",{
        "nowPage": self.pageNum,
        "pageSize": 20,
        "key":""
      },{
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then( res =>{
        self.rank = res.data.myranking.ranked
      })

    },
  },
  mounted() {
    /* 获取用户信息,通过存入用户信息判断 */
    const that = this;
    this.$axios.post("/rzry/api/sys/yl/user/userInfo","",{
      headers: {
        "token":  window.sessionStorage.getItem('token')
      }
    }).then( res =>{
      if(res.data.code==-1)
      {
        that.$vux.loading.show({
          text: '加载中'
        })
        let code = that.$utils.getUrlKey("code");
        if(!!code)
        {
          that.persondata(code, (boolean) => {
            console.log("psdrs",boolean);    
            if (boolean) {
              //  code..
              //var that = this;
              //获取wx.config
              that.getMyRzry();
              that.getdmlist();
              that.$vux.loading.hide();
              //that.navtxt = true;
            }else{
              that.wxAuthorization();
            }
          });
        }else{
          that.wxAuthorization();
        }
      }else{
        const person = JSON.parse(window.sessionStorage.getItem('person'))
        that.headimg = person.headpic;
        that.name = person.nickname;
        that.$utils.wxgetsign(that, wx);
        that.getMyRzry();
        that.getdmlist();
        that.showtxt = true;
      }
    })
  },

};
</script>
<style lang="less" scoped>
@import "../../assets/config/common.css";

.phnum{
    width:100%;
    height:15px;
    background:url(../img/phpic.png) center center no-repeat;
    background-size:100% 100%;
    font-size:10px;
    line-height:15px;
    color:#fff;
    font-weight: bold;
    text-align:center;
    position: absolute;
    bottom: -10px;
  }
#showinfo{
  .joinbtn{
    width:122px;
    height:45px;
    background:url("../img/index/joinbtn.png") no-repeat;
    background-size:100% 100%;
    margin:10px auto 0px;
  }

  .usertitle{
    width:100%;
    font-size: 14px;
    color:#333;
    line-height:35px;
    font-weight: bold;
  }

  .infotxt{
    width:100%;
    font-size: 12px;
    color:#333;
    line-height:25px;
  }

  .btn_close{
    width:80px;
    height:25px;
    border-radius:25px;
    font-size:12px;
    line-height:25px;
    color:#fff;
    background-color:#28CE84;
    text-align: center;
    margin:20px auto 0px;
    
  }
  
}
#mapSearch {
  position: fixed;
  top: 10px;
  left: 2%;
  width: 96%;
  height: 44px;
  z-index: 1;
}
.leftCj {
  position: absolute;
  left: 2%;
  top: 40%;
  background-color: rgba(255,255,255, 0.6);//#fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow-y: scroll;
  height: 15vh;
  .icons{
    width: 3vh;
    height: 3vh;
    padding-bottom: 1vh;
  }

  li {
    padding: 3px 7px;
    text-align: center;
    img {
      width: 20px;
    }
    p {
      margin: 0;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
      font-size: 10px;
    }
  }
  li:last-child p {
    border-bottom: none;
  }
}
.leftCj::-webkit-scrollbar {
  width:0px;
  height:0px;
}
#leftBtn {
  position: absolute;
  left: 2%;
  top: 20%;
  background-color:rgba(255, 255,255, 0.6); //#fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  li {
    padding: 3px 7px;
    text-align: center;
    img {
      width: 20px;
    }
    p {
      margin: 0;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
      font-size: 10px;
    }
  }
  li:last-child p {
    border-bottom: none;
  }
}
#mapBtn {
  position: absolute;
  right: 2%;
  top: 10%;
  background-color: rgba(255, 255,255, 0.6);//#fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  li {
    padding: 3px 7px;
    text-align: center;
    img {
      width: 20px;
    }
    p {
      margin: 0;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
      font-size: 10px;
    }
  }
  li:last-child p {
    border-bottom: none;
  }
}

.newactswiper{
  box-sizing: border-box;
  overflow: hidden;
  width:274px;
  height:358px;
  position: relative;


  .newswbox,.newact-block,.newact-block-img{
    display:block;
    width:100%;
    height:100%;
  }
  .swiper-pagination{
    position: absolute;
    bottom:10px;
    z-index: 10;
    text-align: center;
  }
  .swiper-pagination-bullet-active{
    background:#fff;
  }
}
#barrageDiv {
  position: absolute;
  width: 250px;
  bottom: 10px;
  left: 10px;
  li {
    //width: 198px;
    height:35px;
    
    padding: 3px 0px;
    position: relative;
    box-sizing: border-box;
    padding:5px 4px;

    .bx{
       width:100%;
       height:100%;
       background:url(../img/mar.png) left center no-repeat;
       box-sizing: border-box;
       background-size:auto 100%;
       box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
       overflow: hidden;
       text-overflow:ellipsis;
       white-space: nowrap;
       border-radius: 20px;
       background-color: #fff;
       line-height:25px;
    }
  }
}
</style>
