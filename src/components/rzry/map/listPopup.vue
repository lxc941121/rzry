<template>
  <!-- 显示框 -->
  <div v-transfer-dom>
    <popup v-model="show">
      <div class="list">
        <p>| 推荐认种认养</p>
<!--        <selector class="sselect" :options="list" v-model="defaultValue"></selector>-->
        <ul>
          <li
            v-for="(item, index) in dataList"
            :key="index"
            style="height: 5vh;"
          >
            <p>{{`${item.NAME} 距离：${item.km}公里`}}</p>
            <x-button :gradients="['#fda422', '#fda422']" class="btn" link="/rzlist">立即认种</x-button>
          </li>
        </ul>
      </div>
    </popup>
  </div>
</template>

<script>
/* eslint-disable */
import bus from "../../../assets/config/eventBus";
import esriLoader from 'esri-loader';
import { TransferDom, Popup, XButton, Selector } from "vux";
import {Park_url} from "../../../assets/config/config";
import wx from "weixin-js-sdk";
export default {
  directives: {
    TransferDom,
  },
  components: {
    Popup,
    XButton,
    Selector,
  },
  data() {
    return {
      show: false,
      defaultValue: "500",
      list: [
        { key: "500", value: "500米" },
        { key: "1000", value: "1000米" },
        { key: "2000", value: "2000米" },
      ],
      dataList:[],
      point:{}
    };
  },
  methods: {
    /* vr跳转 */
    VRjump() {
      window.location.href = this.VR;
    },
    //周边查询
    async queryZhoubian(point) {
      const self = this;
      esriLoader.loadModules([
        "esri/tasks/QueryTask",
        "esri/tasks/support/Query",
        "esri/geometry/Polyline",
        "esri/geometry/geometryEngine",
        'esri/geometry/Circle',
        'esri/geometry/Point'
      ]).then(([QueryTask, Query, Polyline, geometryEngine, Circle, Point]) => {
        var queryTask2 = new QueryTask({
          url: Park_url + '/0'
        });
        var query = new Query();
        query.returnGeometry = true;
        query.outFields = ["*"];
        //3公里
        var geo = new Circle({
          "center": new Point({
            "x": 120.663,
            "y": 27.994,
            "spatialReference": {
              wkid: 4326 //84坐标系
            }
          }),
          "radius": self.defaultValue //半径
        });
        // query.geometry = geo;
        query.where = "1=1";

        queryTask2.execute(query).then(function (results) {
          if (results.features && results.features.length) {
            results.features.forEach(function (poi) {
              const parkY = poi.geometry.y;
              const parkX = poi.geometry.x;
              const ponitX = self.point.x;
              const ponitY = self.point.y;
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
              poi.attributes.km = s.toFixed(2); //计算结果保留2位小数
              self.dataList.push(poi.attributes)
            });
            self.dataList = self.dataList.sort(function(a,b){
              return Number(a.km)-Number(b.km)});
            console.log(self.dataList);
          }
        });

      });
    },
  },
  watch:{
    defaultValue(val, oldVal){//普通的watch监听
      console.log("defaultValue: "+val, oldVal);
      bus.$emit('search',val);
    },
  },
  mounted() {
    /* vr跳转 */
    var that = this;
    //that.$utils.wxgetsign(that); //获取wx.config
    bus.$on("listPopup", point => {
      that.show = true;
      that.dataList = [];
      that.point = point
      that.queryZhoubian(that.point);
    });
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/config/common.css";
.list {
  padding: 5px 10px;
  .sselect {
    width: 100px;
    height: 25px;
    position: absolute;
    top: 15px;
    right: 7px;
    border-radius: 26px;
    border: 1px solid #ddd;
    font-size: 12px;
  }
  p {
    font-weight: bold;
  }
  ul {
    li {
      p {
        float: left;
        line-height: 5px;
        color: #595959;
        font-weight: normal;
      }
    }
  }
  .btn {
    width: 78px;
    display: inline-block;
    float: right;
    font-size: 12px;
    border-radius: 16px;
  }
}
</style>
