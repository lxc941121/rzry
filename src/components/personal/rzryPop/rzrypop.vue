<template>
  <div id="rzryPop">
    <div v-transfer-dom>
      <confirm
        v-model="gypShow"
        theme="ios"
        :show-cancel-button="false"
        :show-confirm-button="false"
        :hide-on-blur="true"
      >
        <!-- 头像 -->
        <!-- <div class="tx">
          <img src="../../img/person.png" />
          <p>张三</p>
        </div>-->
        <!-- 标题 -->
        <div class="title">
          <img :src="require('../../img/xqx.png')" style="left: 10px;" />
          <h3>我的公益牌</h3>
          <img :src="require('../../img/xqx.png')" class="imgborder" />
        </div>
        <!-- 树苗二维码、编号 -->
        <div class="sm">
          <!-- <div class="ewm">
            <div class="pic">
              <qrcode :size="70" :value="gypdata[0].value" :fg-color="gypdata[0].fgColor"></qrcode>
            </div>
            <img class="ts" src="../../img/ts.png" />
          </div> -->
          <img :src="gypdata[0].value" style="display:block;width:100%;padding:10px 0px;" />
          <p class="bh">树苗编号：{{gypdata[0].snum}}</p>
        </div>
        <!-- 标题 -->
        <!-- <div class="title">
          <img :src="require('../../img/xqx.png')" style="left: 10px;" />
          <h3>个性寄语</h3>
          <img :src="require('../../img/xqx.png')" class="imgborder" />
        </div> -->
        <!-- 个性寄语 -->
        <!-- <div class="gxtext">
          <p>认养人/单位：{{gypdata[0].name}}</p>
          <p>寄语：{{gypdata[0].text}}</p>
        </div> -->
        <x-button :gradients="['#28ce84', '#28ce86']" @click.native="share">去分享</x-button>
      </confirm>
    </div>
  </div>
</template>

<script>
import bus from "../../../assets/config/eventBus";
import { url } from "../../../assets/config/config";
import wx from "weixin-js-sdk";
import {
  Confirm,
  TransferDomDirective as TransferDom,
  Qrcode,
  XButton,
} from "vux";
export default {
  directives: {
    TransferDom,
  },
  components: {
    Confirm,
    Qrcode,
    XButton,
  },
  data() {
    return {
      gypShow: null,
      gypdata: [
        {
          name: "嘉",
          text: "百年好合，白头到老！",
          value: "",
          fgColor: "#28ce84",
          snum: "18a4w9934d3aw",
        },
      ],
    };
  },
  mounted() {
    var that = this;

    bus.$on("tcEvent", function (date,value) {
      that.gypShow = date;
      that.gypdata[0].snum = value.tree_num;
      that.gypdata[0].value = value.path;
    });
  },
  methods:{
    share(option){

    }
  },
};
</script>

<style lang="less" scoped>
/deep/ .weui-dialog__bd:first-child {
  padding: 1em 20px 1.7em;
}
.tx {
  img {
    width: 30%;
  }
  p {
    color: #28ce84;
  }
}
.title {
  margin-top: 10px;
  text-align: center;
  position: relative;
  h3 {
    margin: 0;
    font-size: 14px;
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
.sm {
  .ewm {
    width: 150px;
    height: 175px;
    margin: auto;
    background-image: url("../../img/ewmbg.png");
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    .pic {
      width: 90px;
      height: 65px;
      margin: auto;
      position: relative;
      top: 27px;
      /* background-color: #fff; */
      padding: 5px;
    }
    .ts {
      position: absolute;
      width: 100px;
      top: 46px;
      right: 5px;
    }
  }
  .bh {
    color: #28ce84;
  }
}
.gxtext {
  background-color: #e9faf2;
  padding: 1px 0px;
  margin-top: 10px;
  margin-bottom: 15px;
  font-size: 12px;
}
</style>
