<template>
  <div class="treesList">
    <div class="top"><img src="@/style/img/other/treebg.png" alt=""></div>
    <div class="main">
      <div class="search">
        <div class="inputKey">
          <input type="text" placeholder="请输入想查询的区域或树木" class="input">
          <div class="btn"></div>
        </div>
        <div class="select">
          <div class="select_one active">距离</div>
          <div class="select_one">编号</div>
        </div>
      </div>
      <div class="tree">
        <ul class="tree_ul">
          <li class="tree_li" @click="handleGoA('custody_detail')">
            <div class="tree_border">
              <div class="tree_full">监护名额已满</div>
              <img src="@/style/img/other/tree2.png" alt="">
              <div class="tree_sn1">江心樟树（距离7.9km）</div>
              <div class="tree_btm">
                <div class="tree_sn2">监护人：陈喜喜、陈喜</div>
                <div class="tree_sn2">挂牌号：3-208</div>
              </div>
            </div>

          </li>
          <li class="tree_li">
            <div class="tree_border">
              <img src="@/style/img/other/tree2.png" alt="">
              <div class="tree_sn1">江心樟树（距离7.9km）</div>
              <div class="tree_btm">
                <div class="tree_sn2">监护人：陈喜喜、陈喜</div>
                <div class="tree_sn2">挂牌号：3-208</div>
              </div>
            </div>

          </li>
          <li class="tree_li">
            <div class="tree_border">
              <img src="@/style/img/other/tree2.png" alt="">
              <div class="tree_sn1">江心樟树（距离7.9km）</div>
              <div class="tree_btm">
                <div class="tree_sn2">监护人：陈喜喜、陈喜</div>
                <div class="tree_sn2">挂牌号：3-208</div>
              </div>
            </div>

          </li>
          <li class="tree_li">
            <div class="tree_border">
              <img src="@/style/img/other/tree2.png" alt="">
              <div class="tree_sn1">江心樟树（距离7.9km）</div>
              <div class="tree_btm">
                <div class="tree_sn2">监护人：陈喜喜、陈喜</div>
                <div class="tree_sn2">挂牌号：3-208</div>
              </div>
            </div>

          </li>
        </ul>
      </div>
    </div>
    <div id="container" style="display:none"></div>
    <footer-bar />
  </div>
</template>
<script>
import footerBar from "@/subComponent/footer";
export default {
  data() {
    return {
      startname: "",
      startlat: "",
      startlng: "",
    };
  },
  components: { footerBar },
  computed: {},
  methods: {
    //获取定位信息
    getLoact() {
      let that = this;
      var map, geolocation;
      //加载地图，调用浏览器定位服务
      map = new AMap.Map("container", {
        resizeEnable: true,
        zoom: 1,
      });
      map.plugin("AMap.Geolocation", function () {
        geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：无穷大
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          buttonPosition: "RB",
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
        AMap.event.addListener(geolocation, "error", onError); //返回定位出错信息
      });
      //解析定位结果
      function onComplete(data) {
        var str = ["定位成功"];
        str.push("经度：" + data.position.getLng());
        str.push("纬度：" + data.position.getLat());
        let lnglatXY = [data.position.getLng(), data.position.getLat()]; //已知点坐标
        regeocoder(lnglatXY);
        if (data.accuracy) {
          str.push("精度：" + data.accuracy + " 米");
        } //如为IP精确定位结果则没有精度信息
        str.push("是否经过偏移：" + (data.isConverted ? "是" : "否"));
        // console.log(str.join("<br>"));

        if (process.env.NODE_ENV != "production") {
          console.info(data.position);
          that.startlat = data.position.getLat();
          that.startlng = data.position.getLng();
          // that.$store.commit("getPosition", {
          //   positionlat: that.startlat,
          //   positionlng: that.startlng,
          // });
        }
      }
      //解析定位错误信息
      function onError(data) {
        console.log("定位失败");
      }

      function regeocoder(loc) {
        //逆地理编码
        var geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all",
        });
        geocoder.getAddress(loc, function (status, result) {
          if (status === "complete" && result.info === "OK") {
            // console.dir(result);
            geocoder_CallBack(result);
          }
        });
      }
      function geocoder_CallBack(data) {
        console.info(data);
        var address = data.regeocode.formattedAddress; //返回地址描述
        console.info(address);
        address = address.substring(address.indexOf("区") + 1, address.length);

        that.startname = address;
        // that.$store.commit("getPositionName", {
        //   positionName: address,
        // });
      }
    },
    getWxLoact() {
      let that = this;
      wx.getLocation({
        type: "gcj02",
        success: function (res) {
          var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          var speed = res.speed; // 速度，以米/每秒计
          var accuracy = res.accuracy; // 位置精度
          let url =
            "https://restapi.amap.com/v3/geocode/regeo?output=json&location=" +
            res.longitude +
            "," +
            res.latitude +
            "&key=5c140d70aca84b65146da5f0ac249810&radius=1000&extensions=all";
          axios
            .get(url, {
              params: {},
            })
            .then((obj) => {
              console.info(obj);
              // let address = obj.data.regeocode.formatted_address.replace(
              //   /浙江省温州市/,
              //   ""
              // );
              // address = address.substring(
              //   address.indexOf("区") + 1,
              //   address.length
              // );
              let street = obj.data.regeocode.addressComponent.streetNumber;
              let aois = obj.data.regeocode.aois;
              let aoisName = "";
              if (aois.length > 0) {
                aoisName = aois[0].name;
              }
              let address = street.street + street.number + aoisName;

              that.startname = address;
              that.startlat = res.latitude;
              that.startlng = res.longitude;

              // that.$store.commit("getPositionName", {
              //   positionName: address,
              // });
              // that.$store.commit("getPosition", {
              //   positionlat: that.startlat,
              //   positionlng: that.startlng,
              // });
            });

          // alert(latitude);
          // if (typeof (callback) != 'undefined' && typeof (callback) != 'function') {
          //   callback(latitude, longitude);
          // }
        },
        fail: function () {},
      });
    },
    handleGoA(Obj) {
      this.$router.push({
        path: "/" + Obj,
      });
    },
  },
  created() {
    console.info(process.env.NODE_ENV);
  },
  mounted() {
    if (process.env.NODE_ENV === "production") {
      wx.ready((res) => {
        this.getWxLoact();
      });
    } else {
      this.getLoact();
    }
  },
};
</script>
<style lang="less">
@import "../../style/subcommon.less";
@import "../../style/declare.less";
#container {
  width: 100%;
  height: 180px;
  z-index: 0;
}
</style>