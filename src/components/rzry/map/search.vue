<template>
  <div class="searchDiv">
    <input type="text" class="mapsearch" @focus="focus()" @blurs="blurs()" v-model="searchKey" placeholder="搜索项目"/>
    <!-- <div id="searchBtn">搜索</div> -->
    <!-- <x-button type="primary" action-type="button" id="searchBtn" @click="search">搜索</x-button> -->
    <!-- 扫一扫 -->
    <div class="sys" @click="wxSys()">
      <img src="../../img/sys.png" alt />
    </div>

    <div class="search_list_box amn" :style="'height:'+actheight">
      <ul class="search_list_ul">
        <!-- <li><span class="ptitle">杨府山公园2020抗疫纪念林纪念林</span><span class="tcount">500株待认种</span></li>
        <li class="se"><span class="ptitle">会展中心2020环江亲子林</span><span class="tcount">500株待认种</span></li>
        <li><span class="ptitle">白鹿洲公园2021爱情养护林 </span><span class="tcount">0株待认种</span></li>
        <li style="text-align:center;border-top:solid 1px #999" @click="close()">关闭</li> -->
        <li v-for="(item,index) in prolist" :key="index" :class="index%2==0?'':'se'" @click="toproject(item.project_name,0,item.centerx,item.centery)"><span class="ptitle">{{item.project_name}}</span><span class="tcount">{{item.project_scale-(item.yrzs?item.yrzs:0)}}株待认种</span></li>
        <li style="text-align:center;border-top:solid 1px #999" @click="close()">关闭</li>
      </ul>
    </div>


    <!-- 列表 -->
    <div class="y-wrap mt10" v-if="showPark">
      <div class="y-title">
        <div>{{title}}</div>
        <div>
          <img src="@/components/img/close.png" style="z-index:999;" @click="showPark=false;" class="cls" alt="">
        </div>
      </div>
      <div class="mt15 y-gylist">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="公园" name="first">
            <!-- 公园搜索 -->
            <div class="weui-media-box weui-media-box_text"
                 v-for="(i,idx) in parkList"
                 @click="parkDetail(i.geometry.longitude ,i.geometry.latitude)">
              <p class="weui-media-box__title">{{idx+1}}、{{i.attributes.NAME}}<span><!--{{i.distance}}--></span></p>
              <p class="weui-media-box__desc">{{`地址:${i.attributes.ADDRESS}`}}</p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="景区" name="second">
            <!-- 景区搜索 -->
            <div class="weui-media-box weui-media-box_text"
                 v-for="(i,idx) in parkList"
                 @click="parkDetail(i.geometry.longitude ,i.geometry.latitude)">
              <p class="weui-media-box__title">{{idx+1}}、{{i.attributes.name}}<span><!--{{i.distance}}--></span></p>
              <p class="weui-media-box__desc">{{`地址:${i.attributes.address || '暂无数据'}`}}</p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 弹框 -->
    <toast
      v-model="showPositionValue"
      type="text"
      :time="3000"
      is-show-mask
      :text="this.text"
      position="middle"
    ></toast>
  </div>
</template>

<script>
/* eslint-disable */
import { XButton, Toast } from "vux";
import wx from "weixin-js-sdk";
import bus from "../../../assets/config/eventBus";
import esriLoader from "esri-loader";
import {OPTION, Park_url, Zt_url} from "../../../assets/config/config";
import SearchPopup from "./searchPopup";
export default {
  components: {
    SearchPopup,
    XButton,
    Toast,
  },
  data() {
    return {
      activeName:"first",
      actheight:"0px",
      activecount:0,
      map: null,
      showPositionValue: false,
      text: null,
      key:'',
      showDetail:false,
      showPark:false,
      showScenery:false,
      title:"搜索结果",
      searchKey:'',
      location:null,//当前坐标
      parkList:[],
      sceneryList:[],
      prolist:[],
      himg:"",
      localtion:{
        x: 120.663,
        y: 27.994,
      },
    };
  },
  methods: {
    focus() {
      this.getprolist();
    },

    blurs(){
      this.actheight = "0px";
    },
    close(){
      this.actheight = "0px";
    },
    //授权扫一扫
    wxSys() {
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          //console.log(JSON.stringify(res));
          var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
          //console.log("扫描结果：" + result);
          window.location.href = result; //因为我这边是扫描后有个链接，然后跳转到该页面
        },
        error: function (res) {
          this.showPositionValue = true;
          this.text = res;
        },
      });
    },
    async queryZhoubian(){
      const self = this;

      esriLoader.loadModules([
        "esri/tasks/QueryTask",
        "esri/tasks/support/Query",
        "esri/geometry/Polyline",
        "esri/geometry/geometryEngine",
        'esri/geometry/Circle',
        'esri/geometry/Point'
      ]).then(([QueryTask, Query, Polyline, geometryEngine, Circle, Point]) => {
        var queryTask = new QueryTask({
          url: Zt_url + '/3'
        });
        var queryTask2 = new QueryTask({
          url: Zt_url + '/4'
        });
        var query = new Query();
        query.returnGeometry = true;
        query.outFields = ["*"];
        query.start = 0;//开始
        query.num = 2;//多少
        // debugger
        console.log('周边查询半径',this.defaultValue);
        //3公里
        var geo = new Circle({
          "center": new Point({
            "x": 120.663,
            "y": 27.994,
            "spatialReference": {
              wkid: 4326 //84坐标系
            }
          }),
          "radius": 1000 //半径 1Km
        });
        // query.geometry = geo;

        query.where = "1=1";
        queryTask.execute(query).then(function (results) {
          if (results.features && results.features.length) {
            results.features.forEach(function (poi) {
              console.log('公园--Task0--poi',poi.attributes);
            })
          }
        });
        queryTask2.execute(query).then(function (results) {
          if (results.features && results.features.length) {
            results.features.forEach(function (poi) {
              var arr;
              console.log('景区--Task2--poi',poi.attributes);
            })
          }
        });
      });
    },

    toproject(data,type,x,y){
      var strx = Math.round(x * 100000) / 100000;
      var stry = Math.round(y * 100000) / 100000;
      this.$parent.wxGetLocation2(data,type);
      this.$parent.$refs.map.mapGoTo(strx, stry); //定位
    },
    async search(){
      const self = this;
      // bus.$emit('enter',self.searchKey)
      // await self.addParkLayer();

      self.showPark = true;
      if(self.activeName === 'first'){
        // self.showScenery=false;
        self.parkList = [];
        self.parkInit();
      }else if (self.activeName === 'second'){
        // self.showPark=false;
        self.parkList = [];
        self.sceneryInit();
      }
    },
    async parkInit() {
       const self = this;

        //http://117.149.228.89:6080/arcgis/rest/services/LY/LYZT/MapServer/3
       esriLoader.loadModules([
         "esri/tasks/QueryTask",
         "esri/tasks/support/Query",
         "esri/geometry/Polyline",
         "esri/geometry/geometryEngine",
         'esri/geometry/Circle',
         'esri/geometry/Point'
       ]).then(([QueryTask, Query, Polyline, geometryEngine, Circle, Point]) => {
         var queryTask = new QueryTask({
           url: "http://117.149.228.89:6080/arcgis/rest/services/LY/LYZT/MapServer/3"
         });
         var query = new Query();
         query.returnGeometry = true;
         query.outFields = ["*"];
         // query.start = 0;//开始
         // query.num = 300;//多少
         if (self.searchKey && self.searchKey != ""){
           query.where = "1 = 1 AND NAME like '%"+self.searchKey+"%'";
         }else {
           query.where = "1 = 1";
         }
         queryTask.execute(query).then(function (results) {
           // console.log('周边查询--公园--Task0-res',results);
           if (results.features && results.features.length) {
             self.parkList = results.features;
           }
         });
       });
      },
    async sceneryInit(){
      const self = this;
      //http://117.149.228.89:6080/arcgis/rest/services/LY/LYZT/MapServer/3
      esriLoader.loadModules([
        "esri/tasks/QueryTask",
        "esri/tasks/support/Query",
        "esri/geometry/Polyline",
        "esri/geometry/geometryEngine",
        'esri/geometry/Circle',
        'esri/geometry/Point'
      ]).then(([QueryTask, Query, Polyline, geometryEngine, Circle, Point]) => {
        const queryTask = new QueryTask({
          url: Zt_url + '/4' //景点
        });
        const query = new Query();
        query.returnGeometry = true;
        query.outFields = ["*"];
        // query.start = 0;//开始
        // query.num = 300;//多少
        if (self.searchKey && self.searchKey != ""){
          query.where = "1 = 1 AND NAME like '%"+self.searchKey+"%'";
        }else {
          query.where = "1 = 1";
        }
        queryTask.execute(query).then(function (results) {
          if (results.features && results.features.length) {
            self.parkList = results.features;
          }
        });
      });
    },
    async addParkLayer(){
      const self = this;
      const temp = {
        id: 2,
        name: "公园",
        url: Zt_url + "/3",
        img: require("../../img/gy.png"),
        fun: "addFeatureayer",
        check: false,
      };
      await self.$parent.$refs.map.addZtLayer(temp);
    },
      //公园详细
    parkDetail(lon,lat) {
        //location.href="/#/park/con";
        // const layer = map.getLayer('garden_PY');
        const self = this;
        esriLoader.loadModules(['esri/Map',
          'esri/Basemap',
          'esri/layers/TileLayer',
          "esri/views/MapView",
          "esri/Graphic"], OPTION)
          .then(([Map, Basemap, TileLayer, MapView, Graphic]) => {
            let position = {
              type: 'point',
              longitude: lon,
              latitude: lat
            };
            const symbol = {
              type: "picture-marker",
              url: require("@/components/img/point.png"), //图片地址
              width: "30px",
              height: "30px",
            };
            let Ghc = new Graphic({
              geometry: position,
              symbol: symbol
            });
            const view = self.$parent.$refs.map.view;
            view.graphics.removeAll(); //清除上一次点击目标
            view.graphics.add(Ghc);
            view.goTo({ zoom: 15, center: [lon, lat] })
              .catch(function (error) {
              if (error.name != "AbortError") {
                console.error(error);
              }});
          });

        // var marker = new self.map.Marker({
        //   position: point,
        //   map: map,
        //   title:p[i].title,
        //   icon:image,
        //   visible:true
        // });
      },
    handleClick(tab, event) {
      const self = this;
      if(self.activeName === 'first'){
        // self.showScenery=false;
        self.parkList = [];
        self.parkInit();
      }else if (self.activeName === 'second'){
        // self.showPark=false;
        self.parkList = [];
        self.sceneryInit();
      }
    },
    GetDistance() {
      const ponitX = this.localtion.x;
      const ponitY = this.localtion.y;
      for (let i = 0; i < this.prolist.length; i++) {
        const parkX = this.prolist[i].centerx;
        const parkY = this.prolist[i].centery;
        var radLat1 = (ponitY * Math.PI) / 180.0;
        var radLat2 = (parkY * Math.PI) / 180.0;
        var a = radLat1 - radLat2;
        var b = (ponitX * Math.PI) / 180.0 - (parkX * Math.PI) / 180.0;
        var s =
          2 *
          Math.asin(
            Math.sqrt(
              Math.pow(Math.sin(a / 2), 2) +
                Math.cos(radLat1) *
                  Math.cos(radLat2) *
                  Math.pow(Math.sin(b / 2), 2)
            )
          );
        s = s * 6378.137; //地球半径
        s = Math.round(s * 10000) / 10000;
        this.prolist[i].km = s.toFixed(2); //计算结果保留2位小数
      }
      this.prolist.sort(function(a,b){
        return (Number(a.km)-Number(b.km))
      });
      console.log("我的",this.prolist)
    },


    getprolist(){
      const self = this;
      self.$axios.post("/api/sys/yl/project/list", {
        "nowPage": 1,
        "pageSize": 20,
        "key":""
      }, {
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then(function (res) {
        const length = res.data.datas.length;
        self.prolist = res.data.datas;
        self.hasNext = true;
        self.prolist = self.prolist.filter(function(item){
          return item.pubstate=="1";
        })
        self.prolist = self.prolist.filter(function(item){
          return (item.project_scale-(item.yrzs?item.yrzs:0))>0
        })
        //self.activecount = self.prolist.length;
        self.GetDistance(); //获取距离
        self.actheight = (self.prolist.length+1)*30+"px";
      });
    }
  },



  mounted() {
    
      // if(!!window.sessionStorage.getItem('person'))
      // {
      // const personparams = JSON.parse(window.sessionStorage.getItem('person'))
      // self.himg = personparams.headpic;
      // }

    //var that = this;
    //that.$utils.wxgetsign(that); //获取wx.config
  },
};
</script>

<style lang="less" scoped>

@import url("../../img/css.less");
.amn{transition: all .3s;}
.searchDiv {
  .search_list_box{
    position:absolute;
    right:50%;
    margin: 5px -35% 0px 0px;
    width: 70%;
    overflow: hidden;

    .search_list_ul{
      width:100%;
      overflow: hidden;
      border-radius: 5px;

      li{
        height:30px;
        width:100%;
        background-color: rgba(255, 255, 255, 0.7);
        font-size:12px !important;
        color:#333;
        line-height:30px;
        box-sizing: border-box;
        padding:0 10px;

        .ptitle{
          display:block;
          width:65%;
          float: left;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
          font-size: 12px;
        }

        .tcount{

          display: block;
          float:right;
          text-align:right;
          width:35%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
          font-size: 12px;
        }
      }
      li.se{
        background-color:rgba(204, 204, 204, 0.5)
      }
    }
  }
  
  input {
    outline: none;
    -webkit-appearance: none; /*去除系统默认的样式*/
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* 点击高亮的颜色*/
  }
  .mapsearch {
    width: 70%;
    display:block;
    margin: 0 auto;
    box-sizing: border-box;
    height: 100%;
    padding: 0% 4%;
    border: 1px solid #ddd;
    border-radius: 8px;
    outline: none;
    background:url(../../img/arrow.png) right 4% center no-repeat;
    background-size:9px 6px;
    background-color:rgba(255, 255, 255, 0.7)
  }
  .sys {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 44px;
    height: 44px;
    background-color:rgba(255, 255, 255, 0.7);
    border-radius: 10px;
    img {
      display: block;
      width: 16px;
      height:15px;
      margin:14px auto;
    }
  }
  #searchBtn {
    position: absolute;
    top: 1px;
    width: 54px;
    height: 100%;
    right: 12%;
    font-size: 12px;
    color: #fff;
  }
}
.cls{
  position:absolute;right:10px;top:10px;
  width: 18px;
  height: 18px;
}
.el-tabs__header {
  padding: 0;
  position: relative;
  margin: 0 0 !important;
}
</style>
