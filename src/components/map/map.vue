<template>
  <div ref="map" class="map" id="map">
    <!-- <Loading :show="show" :text="aa"></Loading> -->
  </div>
</template>

<script>
import esriLoader from "esri-loader";
import bus from "../../assets/config/eventBus";
/* import { Loading } from "vux"; */
import {
  ARCGIS_API_URL,
  OPTION,
  DT_url,
  YX_url,
  Park_url,
  SHDT_url,
} from "../../assets/config/config";
export default {
  data() {
    return {
      map: null,
      view: null,
      radius:0,

    };
  },
  methods: {
    //定位
    mapGoTo(x, y,radius) {
      // x=120.66890;
      // y=28.00339;
      const that = this;
      esriLoader
        .loadModules(
          [
            "esri/symbols/PictureMarkerSymbol",
            "esri/geometry/Point",
            "esri/geometry/Circle",
            "esri/Graphic",
            "esri/layers/GraphicsLayer",
            "dojo/on",
          ],
          OPTION
        )
        .then(
          ([
            PictureMarkerSymbol,
            Point,
            Circle,
            Graphic,
            GraphicsLayer,
            on,
          ]) => {
            that.view
              .goTo({ zoom: 15, center: [x, y] })
              .catch(function (error) {
                if (error.name != "AbortError") {
                  alert(JSON.stringify(error));
                }
              });
            /* const gLayer = new GraphicsLayer({
            id: "point",
          }); */
            const point = new Point(x, y);
            const symbol = {
              type: "picture-marker",
              url: require("../img/point.png"), //图片地址
              width: "30px",
              height: "30px",
            };
            /* 画圆 */
            if (!!radius){
              that.radius = radius
            }
            const circle = new Circle({
              hasZ: true,
              hasM: true,
              center: point,
              radius: that.radius, //半径
            });
            const graphicCircle = new Graphic({
              geometry: circle,
              symbol: {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [10, 179, 85, 0.5],
                style: "solid",
                outline: {
                  // autocasts as new SimpleLineSymbol()
                  color: [10, 179, 85, 0.5],
                  width: 1,
                },
              },
            });
            const graphic = new Graphic(point, symbol);
            //gLayer.graphics.add(graphic); //添加到图层中显示
            that.view.graphics.removeAll(); //清除上一次点击目标
            that.view.graphics.add(graphicCircle);
            that.view.graphics.add(graphic);
            
            //bus.$emit("FindProject","",1,x,y)
            //bus.$emit("listPopup",point); //定位后弹框
          }
        );
    },
    /*专题图切换*/
    addZtLayer(zlist) {
      const that = this;
      esriLoader
        .loadModules(["esri/layers/FeatureLayer"], OPTION)
        .then(([FeatureLayer]) => {
          var url = zlist.url;
          if (!that.map.findLayerById(zlist.name)) {
            const zt = new FeatureLayer({
              url: url,
              id: zlist.name,
            });
            that.map.add(zt);
            // debugger
          } else {
            that.map.findLayerById(zlist.name).visible = zlist.check;
          }
          // console.log('test',that.map.findLayerById('公园'));
          console.log(zlist);
        });
    },
    /*矢量影像切换*/
    addTileLayer(dtlist) {
      const that = this;
      esriLoader
        .loadModules(
          ["esri/Map", "esri/views/MapView", "esri/layers/TileLayer"],
          OPTION
        )
        .then(([Map, MapView, TileLayer]) => {
          var url = dtlist.url;
          if (dtlist.name == "矢量图") {
            that.map.findLayerById("sl").visible = true;
            that.map.findLayerById("yx") == undefined
              ? " "
              : (that.map.findLayerById("yx").visible = false);
            return;
          }
          if (dtlist.name == "影像图") {
            that.map.findLayerById("sl").visible = false;
            if (that.map.findLayerById("yx") == undefined) {
              const baseLayer = new TileLayer({
                id: "yx",
                url: url,
              });
              that.map.add(baseLayer, 1);
              return;
            } else {
              that.map.findLayerById("yx").visible = true;
              return;
            }
          }
        });
    },
    addMap(fn) {
      const that = this;
      esriLoader
        .loadModules(
          ["esri/Map", "esri/views/MapView", "esri/layers/VectorTileLayer"],
          OPTION
        )
        .then(([Map, MapView, VectorTileLayer, FeatureLayer]) => {
          const baseLayer = new VectorTileLayer({
            id: "sl",
            url: DT_url,
          });
          that.map = new Map();
          that.view = new MapView({
            container: "map",
            map: that.map,
            zoom: 17,
            constraints:{
              maxZoom:17,
              rotationEnabled:false
            },
            center: [120.722669, 27.966677], //120.6595, 28.007
          });
          that.view.ui.remove('zoom')
          that.map.add(baseLayer, 1);
          fn && fn();
        });
    },
    addPark() {
      const that = this;
      esriLoader
        .loadModules(
          ["esri/layers/MapImageLayer", "esri/layers/TileLayer"],
          OPTION
        )
        .then(([MapImageLayer, TileLayer]) => {
          const park = new TileLayer({
            id: "park",
            url: SHDT_url, //手绘地图,
            opacity: 1,
          });
          that.map.add(park, 2);
        });
    },
    
    addArea() {
      const that = this;
      esriLoader
        .loadModules(
          ["esri/layers/FeatureLayer", "esri/layers/support/LabelClass"],
          OPTION
        )
        .then(([FeatureLayer, LabelClass]) => {

          const statesLabelClass = new LabelClass({
            labelExpressionInfo: { expression: "$feature.DKBH" },
            symbol: {
              type: "text", // autocasts as new TextSymbol()
              color: "#fff",
              // xoffset: "-26pt",
              // yoffset: "-24pt",
              font: {
                size: 12,
              },
            },
          });
          let render = {
            type:"simple",
            symbol:{
              type:"picture-marker",
              width:50,
              height:50
            }
          };
          // var trailheadsRenderer = {
          //   "type": "simple",
          //   "symbol": {
          //     "type": "picture-marker",
          //     "url": require("../img/rzl.png"),
          //     "width": "60px",
          //     "height": "60px"
          //   }
          // }
          const gyp = new FeatureLayer({
            url: Park_url + "/0",
            id:"gyp",
            opacity: 1,
            //renderer: trailheadsRenderer,
          });
          gyp.minScale = 30000;
          //area.labelingInfo
          // that.map.add(area, 50);
          // 认种认养面= [statesLabelClass];
          // const hd = new FeatureLayer({
          //   url: Park_url + "/1",
          //   opacity: 1,
          // });
          const gym = new FeatureLayer({
            url: Park_url + "/1",
            id:"gym",
            opacity: 1,
          });
          const gymdt = new FeatureLayer({
            url: Park_url + "/2",
            id:"gymdt",
            opacity: 0.5,
          });
          //手绘地图 30
          that.map.add(gym, 1); //公园面
          that.map.add(gymdt, 1)
          that.addPark(); //叠加公园
          // that.map.add(hd, 51); //活动
          that.map.add(gyp, 35); //公益牌

        });
    },
    clickMap() {
      const that = this;
      that.view.on("click", (evt) => {
        const mapPoint = evt.mapPoint
        if (mapPoint) {
          console.log(evt)
          esriLoader
            .loadModules(
              ["esri/tasks/IdentifyTask", "esri/tasks/support/IdentifyParameters"],
              OPTION
            )
            .then(([IdentifyTask, IdentifyParameters]) => {       
              // 0-点   1-面
              const identifyTask = new IdentifyTask({
                url: Park_url,
              });
              const query = new IdentifyParameters();
              query.tolerance = 40;
              // query.outFields = ["*"];
              query.width = that.view.width;
              query.height = that.view.height;
              query.geometry = mapPoint;
              query.mapExtent = that.view.extent;
              query.returnGeometry = true;
              console.log("query",query)
              identifyTask.execute(query).then((response) => {
                that.view.graphics.removeAll(); //清除上一次点击目标
                if (response.results.length) {
                  // debugger
                  
                  const graphic = response.results[0].feature;
                  const attributes = graphic.attributes;
                  if (graphic) {
                    // 在此操作
                    graphic.symbol = {
                      type: "simple-fill",
                      color: [40, 153, 206, 0],
                      // style: "backward-diagonal",
                      outline: {
                        color: [40, 153, 206, 0],
                        width: "0.5px",
                      },
                    };
                    that.view.graphics.removeAll(); //清除上一次点击目标
                    that.view.graphics.add(graphic, 1); //添加新的点击目标
                    //bus.$emit("userDefinedEvent", attributes);
                    that.$parent.wxGetLocation2(attributes.NAME,0)
                    //this.$parent.show=true;
                  }
                }
              });
            });
        }
      });
    },
    popupDetail() {
      const that = this;

      that.view.popup.autoOpenEnabled = false;
      that.view.popup.visible = false;

      that.view.on("click", function (event) {
        //获取经纬度
        var lat = Math.round(event.mapPoint.latitude * 1000) / 1000;
        var lon = Math.round(event.mapPoint.longitude * 1000) / 1000;
        esriLoader
          .loadModules(["esri/widgets/Popup"], OPTION)
          .then(([Popup]) => {
            that.view.popup.open({
              // Set the popup's title to the coordinates of the location
              title: "Reverse geocode: [" + lon + ", " + lat + "]",
              location: event.mapPoint, // Set the location of the popup to the clicked location
              //content: "1111",
            });
          });
      });
    },

  },
  mounted: function () {
    const that = this;
    that.addMap(() => {
      this.addArea(); //叠加认养区块
      this.clickMap(); //要素点击
      window.map = this.map;
      //this.popupDetail(); //认养弹框
    }); //地图
    bus.$on('search', (radius) => {
      that.mapGoTo(120.663, 27.994,radius);
    })
  },
};
</script>

<style lang="less">
  @import url("https://js.arcgis.com/4.16/esri/themes/light/main.css");

#map {
  position: absolute;
  top: 0%;
  left: 0;
  width: 100%;
  height: 100%;
}
.esri-ui-top-left {
  position: fixed;
  left: 2%;
  top: 55px !important;
}
.esri-widget--button {
  width: 38px;
}
.esri-attribution {
  display: none !important;
}
.esri-view .esri-view-surface--inset-outline:focus::after,
.esri-widget *,
.esri-widget *:before,
.esri-widget *:after {
  outline: none !important;
}
</style>
