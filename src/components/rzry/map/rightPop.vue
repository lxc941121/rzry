<template>
  <div>
    <div v-transfer-dom>
      <popup id="rightPopDiv" v-model="show" position="right">
        <!-- 矢量 -->
        <checker
          class="dtDiv"
          v-model="dt"
          :radio-required="true"
          default-item-class="item"
          selected-item-class="item-selected"
          v-if="this.mapList && this.mapList.length"
        >
          <checker-item
            v-for="dtlist in mapList"
            :key="dtlist.id"
            :value="dtlist.id"
            class="qh"
            @on-item-click="addFeatureayer(dtlist)"
          >
            <x-icon type="ios-checkmark-empty" size="18" class="icon"></x-icon>
            <img :src="dtlist.img" />
            <p>{{dtlist.name}}</p>
          </checker-item>
        </checker>
        <!-- 标题 -->
        <p class="title">| 专题</p>
        <checker
          class="ztDiv"
          type="checkbox"
          default-item-class="item"
          selected-item-class="item-selected"
        >
          <checker-item
            v-for="zlist in ztList"
            :key="zlist.id"
            :value="zlist.id"
            class="ztqh"
            @on-item-click="ztadd(zlist)"
          >
            <x-icon type="ios-checkmark-empty" size="18" class="icon"></x-icon>
            <img :src="zlist.img" />
            <p>{{zlist.name}}</p>
          </checker-item>
        </checker>
        <!-- 标题 -->
        <p class="title">| 活动</p>
        <checker
          class="hdDiv"
          v-model="hd"
          default-item-class="item"
          selected-item-class="item-selected"
        >
          <checker-item v-for="hd in hdList" :key="hd.id" :value="hd.id" class="hdqh">
            <x-icon type="ios-checkmark-empty" size="18" class="icon"></x-icon>
            <img :src="hd.img" />
            <p>{{hd.name}}</p>
          </checker-item>
        </checker>
      </popup>
    </div>
  </div>
</template>

<script>
import bus from "../../../assets/config/eventBus";
import { DT_url, YX_url, Zt_url } from "../../../assets/config/config";
import { TransferDom, Popup, Checker, CheckerItem } from "vux";
export default {
  directives: {
    TransferDom,
  },
  components: {
    Popup,
    Checker,
    CheckerItem,
  },
  data() {
    return {
      show: null,
      dt: 1,
      //zt: " ",
      hd: " ",
      mapList: [
        {
          id: 1,
          name: "矢量图",
          url: DT_url,
          img: require("../../img/sl.png"),
          fun: "addTileLayer",
          check: false,
        },
        {
          id: 2,
          name: "影像图",
          url: YX_url,
          img: require("../../img/yx.png"),
          fun: "addTileLayer",
          check: true,
        },
      ],
      ztList: [
        {
          id: 1,
          name: "古树",
          url: Zt_url + "/2",
          img: require("../../img/gs.png"),
          fun: "addFeatureayer",
          check: false,
        },
        {
          id: 2,
          name: "公园",
          url: Zt_url + "/3",
          img: require("../../img/gy.png"),
          fun: "addFeatureayer",
          check: false,
        },
        {
          id: 3,
          name: "学校",
          url: Zt_url + "/0",
          img: require("../../img/xx.png"),
          fun: "addFeatureayer",
          check: false,
        },
        {
          id: 4,
          name: "景区",
          url: Zt_url + "/4",
          img: require("../../img/jq.png"),
          fun: "addFeatureayer",
          check: false,
        },
        {
          id: 5,
          name: "单位",
          url: Zt_url + "/1",
          img: require("../../img/dw.png"),
          fun: "addFeatureayer",
          check: false,
        },
      ],
      hdList: [
        {
          id: 1,
          name: "亲子种植",
          url: Zt_url,
          img: require("../../img/hd1.png"),
          check: false,
        },
        {
          id: 2,
          name: "公园踏青",
          url: Zt_url,
          img: require("../../img/hd2.png"),
          check: false,
        },
        {
          id: 3,
          name: "绿植养护",
          url: Zt_url,
          img: require("../../img/hd3.png"),
          check: false,
        },
      ],
    };
  },
  methods: {
    /* 矢量影像切换 */
    addFeatureayer(dtlist) {
      var that = this;
      /* for (let i = 0; i < that.mapList.length; i++) {
        that.mapList[i].check = false;
      }
      dtlist.check = true;
      console.log(dtlist); */
      //dtlist.check ? (dtlist.check = false) : (dtlist.check = true);
      //console.log(dtlist.check);
      that.$emit("mapSwitch", dtlist);
    },
    /* 专题切换 */
    ztadd(zlist) {
      var that = this;
      zlist.check ? (zlist.check = false) : (zlist.check = true);
      that.$emit("mapZt", zlist);
    },
  },
  mounted() {
    var that = this;
    bus.$on("tcEvent", function (date) {
      if (date) {
        that.show = true;
      }
    });
  },
};
</script>
<style lang="less" scoped>
@import "../../../assets/config/common.css";
.icon {
  position: absolute;
  right: 2px;
  bottom: 25px;
  background-color: #28ce84;
  border-radius: 2px;
  fill: #fff;
}
.dtDiv {
  width: 200px;
  height: 85px;
  .qh {
    width: 85px;
    margin-left: 10px;
    margin-top: 10px;
    float: left;
    position: relative;
    img {
      width: 100%;
    }
    p {
      text-align: center;
      margin: 0;
    }
  }
  .item {
    img {
      border: 2px solid #eee;
      box-sizing: border-box;
    }
    .icon {
      opacity: 0;
    }
  }
  .item-selected {
    img {
      border: 2px solid #28ce84;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .icon {
      opacity: 1;
    }
  }
}
.ztDiv {
  width: 200px;
  height: 185px;
  .ztqh {
    width: 56px;
    margin-left: 10px;
    margin-top: 10px;
    position: relative;
    img {
      width: 100%;
    }
    p {
      text-align: center;
      margin: 0;
    }
  }
  .item {
    .icon {
      opacity: 0;
    }
  }
  .item-selected {
    .icon {
      opacity: 1;
    }
  }
}
.hdDiv {
  width: 200px;
  height: auto;
  .hdqh {
    width: 85px;
    margin-left: 10px;
    margin-top: 10px;
    float: left;
    position: relative;
    img {
      width: 100%;
    }
    p {
      text-align: center;
      margin: 0;
    }
  }
  .item {
    img {
      border: 2px solid #eee;
      box-sizing: border-box;
    }
    .icon {
      opacity: 0;
    }
  }
  .item-selected {
    img {
      border: 2px solid #28ce84;
      border-radius: 4px;
      box-sizing: border-box;
    }
    .icon {
      opacity: 1;
    }
  }
}
#rightPopDiv {
  .title {
    width: 90%;
    height: 20px;
    margin: auto;
    background-color: #e9e7e7;
    padding: 5px 10px;
  }
}
</style>
