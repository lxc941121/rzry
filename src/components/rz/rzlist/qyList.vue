<template>
  <div id="qyDiv">
    <!-- 数据列表 -->
    <Grid class="grid" :cols="1" :show-lr-borders="false">
      <Grid-item v-for="i in list" :key="i.name">
        <div class="carBg" @click="ryqy()">
          <!-- 公园照片 -->
          <div class="imgDiv">
            <img :src="i.img"/>
            <!-- 名称 -->
            <h3>{{i.name}} 距离:{{i.km}}km</h3>
            <p>· 剩余：{{i.lastNum}} 棵</p>
          </div>
          <div>
            <p style="float: left;">可认种：{{i.tree}}</p>
            <p style="float: right;">认种数量：{{i.num}} 棵</p>
          </div>
        </div>
      </Grid-item>
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
  import {Grid, GridItem, Toast} from "vux";
  import wx from "weixin-js-sdk";

  export default {
    components: {
      Grid,
      GridItem,
      Toast,
    },
    data() {
      return {
        showPositionValue: false,
        text: null,
        x: 120.663,
        y: 27.994,
        list: [
          {
            id: 1,
            name: "白鹿洲公园",
            img: require("@/components/img/blz.jpg"),
            x: 120.6635,
            y: 27.9997,
            tree: "榕树（亲情树）",
            num: "2000",
            lastNum: "87",
            km: null,
          },
          {
            id: 2,
            name: "马鞍池公园",
            img: require("@/components/img/mac.jpg"),
            x: 120.67,
            y: 28.019,
            tree: "梧桐（爱情树）",
            num: "2000",
            lastNum: "87",
            km: null,
          },
          {
            id: 3,
            name: "杨府山公园",
            img: require("@/components/img/yfs.jpg"),
            x: 120.711585,
            y: 28.013918,
            tree: "杨梅树（友情树）",
            num: "2000",
            lastNum: "24",
            km: null,
          },
          {
            id: 4,
            name: "绣山公园",
            img: require("@/components/img/xs.jpg"),
            x: 120.704012,
            y: 28.003687,
            tree: "榕树（亲情树）",
            num: "2000",
            lastNum: "150",
            km: null,
          },
        ],


      };
    },
    methods: {
      ryqy() {
        this.$parent.qyfatherjump(); //跳转公园详情(区域)
      },
      /* 获取距离 */
      GetDistance() {
        const ponitX = this.x;
        const ponitY = this.y;
        for (let i = 0; i < this.list.length; i++) {
          const parkX = this.list[i].x;
          const parkY = this.list[i].y;
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

        that.GetDistance(); //获取距离
        /* wx.getLocation({
          type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            that.x = longitude;
            that.y = latitude;

          },
        }); */
      },
    },
      mounted() {
        var that = this;
        // that.$utils.wxgetsign(that, wx); //获取wx.config
        // wx.ready(function () {
        //   that.wxGetLocation(); //结束后获取位置
        //
        // });
      },
      computed: {}
    };
</script>

<style lang="less" scoped>
  @import "../../../assets/config/common.css";

  #qyDiv {
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


  }
</style>
