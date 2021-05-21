<template>
  <div id="treeDiv">
    <!-- 数据列表 -->
    <Grid class="grid" :cols="1" :show-lr-borders="false">
      <Grid-item v-for="(i) in listi" :key="i.name">
        <div class="carBg" v-if="i.pubstate=='1'" @click="ryqy(i.id)">
          <!-- 公园照片 -->
          <div class="imgDiv">
            <img :src="i.project_cover" />
            <div class="pro_type" v-if="i.type==1">认种</div>
            <div class="pro_type2" v-if="i.type==2">认养</div>
            <div class="pricebox">价格：￥{{i.tree_price}}/株</div>
            <!-- 公园名称 -->
            <h3>{{`${i.project_name} 距离：${i.km||0}km`}}</h3>
            <!-- 价格 -->
          </div>
          <div>
            <p style="float: left;">{{i.tree_name}}</p>
            <div class="progress">
              <x-progress
                :percent="((i.yrzs / i.project_scale)*100)"
                :show-cancel="false"
                style="width:100%"
              ></x-progress>
              <p>已认种{{i.yrzs}}棵/全部{{i.project_scale}}棵</p>
            </div>
            <x-button :gradients="['#fda422', '#fda422']" v-if="i.type==1" class="btn">立即认种</x-button>
            <x-button :gradients="['#fda422', '#fda422']" v-if="i.type==2" class="btn">立即认养</x-button>
          </div>
        </div>
      </Grid-item>
      <Grid-item v-for="(i) in listf" :key="i.name">
        <div class="carBg" v-if="i.pubstate=='0'" @click="finish">
          <!-- 公园照片 -->
          <div class="imgDiv">
            <img :src="i.project_cover" />
            <div class="pro_type" v-if="i.type==1">认种</div>
            <div class="pro_type2" v-if="i.type==2">认养</div>
            <div class="pricebox">价格：￥{{i.tree_price}}/株</div>
            <!-- 公园名称 -->
            <h3>{{`${i.project_name} 距离：${i.km||0}km`}}</h3>
            <!-- 价格 -->
<!--            <p>· 价格：{{i.tree_price}} 元/株</p>-->
          </div>
          <div class="temp" :style="{'background-color':'#999'}"></div>
          <div>
            <p style="float: left;">{{i.tree_name}}</p>
            <div class="progress">
              <x-progress
                :percent="((i.yrzs / i.project_scale)*100)"
                :show-cancel="false"
                style="width:100%"
              ></x-progress>
              <p>已认种{{i.yrzs}}棵/全部{{i.project_scale}}棵</p>
            </div>
            <x-button :gradients="['#09ab7c', '#09ab7c']" class="btnTemp">已结束</x-button>
          </div>
        </div>
      </Grid-item>
      <a class="more" @click="pageNum++;getData();" v-if="hasNext">加载更多</a>
      <a class="more" v-else>没有更多了~</a>
    </Grid>
    <!-- 报错弹框 -->
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
import { Grid, GridItem, XButton, XProgress, trim, Toast } from "vux";
import wx from "weixin-js-sdk";
import bus from "../../../assets/config/eventBus";
export default {
  components: {
    Grid,
    GridItem,
    XButton,
    XProgress,
    trim,
    Toast,
  },
  data() {
    return {
      //percent: (trim(this.lastNum) / trim(this.num)) * 100, //进度条
      showPositionValue: false,
      text: null,
      localtion:{},
      list: [],
      list1:[],
      treeList:[],
      listf:[],
      listi:[],
      pageNum: 1,
      hasNext: true,
      key:'',
    };
  },
  methods: {
    ryqy(item) {
      //console.log(item);
      this.$parent.treefatherjump(item); //跳转树详情
    },
    /* 获取距离 */
    GetDistance() {
      const ponitX = this.localtion.x;
      const ponitY = this.localtion.y;
      for (let i = 0; i < this.list.length; i++) {
        const parkX = this.list[i].centerx;
        const parkY = this.list[i].centery;
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
        this.list[i].km = s.toFixed(2); //计算结果保留2位小数
      }
    },
    //获取位置
    wxGetLocation(fn) {
      const that = this;
      wx.getLocation({
        type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
          const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          that.localtion.x = longitude;
          that.localtion.y = latitude;
          that.getDataOrderByDist()
        },
      });
    },
    // async getToken(){
    //   const self = this;
    //   await this.$axios.get('/fapi/public/main/doLogintest?id=o3ttg1rWgdtcWyI2zHqKzXekf8zU&openid=o3ttg1rWgdtcWyI2zHqKzXekf8zU')
    //     .then(res=>{
    //       window.sessionStorage.setItem('token',res.data.wxscToken);
    //     });
    // },
    async getData(key){
      const self = this;
      self.$vux.loading.show();
      if (!!key){
        self.key = key;
      }else{
        self.key = '';
      }
      await self.$axios.post("/api/sys/yl/project/list", {
        "nowPage": self.pageNum,
        "pageSize": 20,
        "key":self.key,
        "orderByStr":"tree_price",
        "orderByType":1
      }, {
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then(function (res) {
        // debugger
        if (res.data.code == -1){
          window.location.href="/#/map";
        }else{
          const length = res.data.datas.length;
          //self.list = [],
          //self.list1 = res.data.datas;
          self.list = res.data.datas;
          self.hasNext = true;
          if (length>0){
            //self.list = self.list.concat(self.list1)
            self.list = self.list.sort(function (a,b) {
              return Number(b.pubstate)-Number(a.pubstate);
            })
            self.GetDistance(); //获取距离
            self.listi = self.list.filter(function(item){return item.pubstate ==1})
            self.listf = self.list.filter(function(item){return item.pubstate ==0})
            if (length<20){
              self.hasNext = false;
            }
          }
          if (length==0){
            self.hasNext = false;
          }
        }
      });
      self.$vux.loading.hide();
      // console.log("排序后的list",self.list)
    },

    


    async getDataOrderByDist(key){
      const self = this;
      self.$vux.loading.show();
      if (!!key){
        self.key = key;
      }else{
        self.key = '';
      }
      await self.$axios.post("/api/sys/yl/project/list", {
        "nowPage": self.pageNum,
        "pageSize": 20,
        "key":self.key,
        "orderByStr":"tree_price",
        "orderByType":1
      }, {
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then(function (res) {
        // debugger
        if (res.data.code == -1){
          window.location.href="/#/map";
        }else{
          const length = res.data.datas.length;
          self.list = res.data.datas;
          self.hasNext = true;
          self.GetDistance(); //获取距离
          self.listi = self.list.filter(function(item){return item.pubstate ==1})
          self.listf = self.list.filter(function(item){return item.pubstate ==0})
          self.listi.sort((item,item2)=>{
            return (Number(item.km)-Number(item2.km));
          })
          if (length<20){
            self.hasNext = false;
          }
          if (length==0){
            self.hasNext = false;
          }
        }
      });
      self.$vux.loading.hide();

      // console.log("排序后的list",self.list)
    },


    finish(){
      this.$vux.toast.text('所选项目不在认种期');
    },
    init(){
      this.list=[];
      this.list1=[];
      this.treeList=[];
      this.pageNum=1;
      this.hasNext=true;
    }
  },
  mounted() {
    var that = this;
    that.init();
    wx.ready(function () {
      that.wxGetLocation(); //结束后获取位置
      // that.$nextTick(()=>{
      //   that.getDataOrderByDist();
      // })
    });
    
    bus.$on("search", function (key) {
      that.list = [];
      if (!!!key){
        that.pageNum=1;
      }
      that.getDataOrderByDist(key);
    });
    that.$utils.wxgetsign(that, wx); //获取wx.config

  },

};
</script>

<style lang="less" scoped>
@import "../../../assets/config/common.css";
#treeDiv /deep/ .weui-progress__bar {
  height: 15px;
  background-color: #e1e1e1;
  border-radius: 8px;
}
#treeDiv /deep/ .weui-progress__inner-bar {
  border-radius: 8px;
}
#treeDiv {
  .grid {
    margin-left: 15px;
    margin-right: 15px;
  }
  .weui-grid {
    padding: 0;
    margin-bottom: 15px;
    img {
      width: 100%;
      overflow: hidden;
    }
    .carBg {
      height: 180px;
      color: #fff;
      border: 1px solid #09ab7c;
      p {
        margin: 0;
        color: #09ab7c;
        padding: 6px 5px;
      }
      .progress {
        padding: 8px 0;
        width: 60%;
        float: left;
        position: relative;
        p {
          position: absolute;
          top: 0px;
          width: 100%;
          text-align: center;
          color: #000;
          font-size: 12px;
        }
      }
      .btn {
        float: right;
        width: 70px;
        height: 26px;
        margin: 2px 2px;
        padding: 0;
        font-size: 14px;
        line-height: 28px;
      }
      .imgDiv {
        height: 150px;
        overflow: hidden;
        position: relative;
        h3 {
          position: absolute;
          bottom: 0;
          left: 0;
          margin: 0;
          background-color: #fda421;
          padding: 3px 15px;
          border-radius: 0 16px 16px 0;
          box-sizing: border-box;
          height:25px;
        }
        .pricebox {
          position: absolute;
          top:0px;
          left: 0;
          margin: 0;
          background-color: #09AB7C;
          padding: 0px 10px;
          border-radius:25px;
          box-sizing: border-box;
          height:20px;
          font-size:12px;
          line-height: 20px;
          font-weight: bold;
        }
        .pro_type{
          position: absolute;
          top:0px;
          right:0px;
          background-color:#5396F0;
          padding:0px 10px;
          box-sizing: border-box;
          height:25px;
          font-size:12px;
          line-height:25px;
          color:#fff;
          font-weight: bold;
          border-bottom-left-radius: 5px;
        }

        .pro_type2 {
          position: absolute;
          top:0px;
          right:0px;
          background-color:#FD8122;
          padding:0px 10px;
          box-sizing: border-box;
          height:25px;
          font-size:12px;
          line-height:25px;
          color:#fff;
          font-weight: bold;
          border-bottom-left-radius: 5px;
        }
        p {
          position: absolute;
          right: 5px;
          bottom: 5px;
          padding: 3px 7px;
          background-color: #09ab7c;
          border-radius: 12px;
          font-size: 12px;
          color: #fff;
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
}

  .temp{
    position: absolute;
    width: 100%;
    height: 83%;
    z-index: 2;
    top: 0vh;
    opacity: 0.6;
  }
  .btnTemp{
    width: 80px;
    height: 30px;
    margin: 2px 2px;
    padding: 0;
    font-size: 15px;
    line-height: 28px;
    position: absolute;
    z-index: 2;
    top:30%;
    left:50%;
    margin-left:-40px;
  }
</style>
