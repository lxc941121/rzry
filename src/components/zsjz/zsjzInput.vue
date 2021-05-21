<template>
  <div id="jzInput">
    <!-- 首图 -->
    <div class="bgDiv">
      <img src="../img/jzbg.jpg" />
    </div>
    <!-- 价格 -->
    <p class="yw">捐赠义务：￥20/份</p>
    <p class="jz">当年完成尽责人数：165875人</p>
    <div class="content">
      <!-- 说明 -->
      <p
        class="sm"
      >根据《关于开展全民义务植树运动的决议》、《关于开展全民义务植物运动的实施办法》、《全民义务植树尽责形式管理办法（试行）》等法律法规，年满11岁的中华人民共和国公民，除老弱病残者外，每人每年义务植树3棵以上。义务捐资可折算当年义务植树法定任务，每20元折算完成一棵植树任务，折算达到3棵以上的，由市园林绿化管理中心出具尽责证明。</p>
      <!-- 标题 -->
      <div class="title" style="margin-top: 15px;">
        <img :src="require('../img/xqx.png')" style="left: 0px;" />
        <h3>我要尽责</h3>
        <img :src="require('../img/xqx.png')" class="imgborder" />
      </div>
      <!-- 表单 -->
      <div class="applyInput">
        <x-table :full-bordered="false" :content-bordered="false" :cell-bordered="false">
          <tbody>
            <tr>
              <th>名称</th>
              <td>
                <x-input
                  type="text"
                  placeholder="请输入您的个人姓名/团队名"
                  value="嘉"
                  :show-clear="false"
                  :required="true"
                ></x-input>
              </td>
            </tr>
            <tr>
              <th>电话号码</th>
              <td>
                <x-input
                  type="text"
                  placeholder="请输入您的联系电话"
                  :show-clear="false"
                  :required="true"
                  is-type="china-mobile"
                ></x-input>
              </td>
            </tr>
            <tr>
              <th>捐资份数</th>
              <td style="text-align: left">
                <inline-x-number
                  style="margin-left:15px;vertical-align: inherit;"
                  :min="1"
                  :max="10"
                  :value="3"
                  width="30px"
                ></inline-x-number>
                <!-- <selector :options="jz" v-model="jzValue"></selector> -->
              </td>
            </tr>
          </tbody>
        </x-table>
        <!-- 合计 -->
        <div class="heji">
          <p>费用合计：￥60</p>
        </div>
        <!-- 说明 -->
        <div class="smDiv">
          <p>
            <x-icon type="ios-information-outline" size="20" style="vertical-align: bottom;"></x-icon>注：每年累计义务捐赠3份以上，才能获得植树尽责证书！
          </p>
        </div>
        <!-- 按钮 -->
        <p style="text-align: center;">
          <x-button
            :gradients="['#fda422', '#fda422']"
            style="margin-top: 10px;"
            link="/complete"
          >提交</x-button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { XTable, XInput, Selector, XButton, InlineXNumber } from "vux";
export default {
  components: {
    XTable,
    XInput,
    Selector,
    XButton,
    InlineXNumber,
  },
  data() {
    return {
      jzValue: "3",
      jz: [
        { key: "1", value: "1份" },
        { key: "2", value: "2份" },
        { key: "3", value: "3份" },
        { key: "4", value: "4份" },
        { key: "5", value: "5份" },
        { key: "6", value: "6份" },
        { key: "7", value: "7份" },
        { key: "8", value: "8份" },
        { key: "9", value: "9份" },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/config/common.css";
#jzInput /deep/ .vux-x-icon {
  fill: #eaab4e;
}
#jzInput {
  .bgDiv {
    width: 100%;
    height: 150px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .yw {
    position: absolute;
    right: 5px;
    top: 85px;
    background-color: #28ce84;
    padding: 5px 10px;
    border-radius: 6px;
    color: #fff;
  }
  .jz {
    position: absolute;
    right: 5px;
    top: 0px;
    background-color: #fda321;
    padding: 5px 10px;
    border-radius: 6px;
    color: #fff;
    font-size: 12px;
  }
  .content {
    margin-left: 15px;
    margin-right: 15px;
    .sm {
      margin-top: 0;
      font-size: 14px;
    }
    .heji {
      width: 160px;
      color: #fda422;
      font-weight: bold;
      margin-top: 10px;
      p {
        margin: auto;
        border: 2px solid #fda422;
        padding: 5px 5px;
        font-size: 16px;
      }
    }
  }
  .title {
    text-align: center;
    position: relative;
    h3 {
      margin: 0;
      font-size: 16px;
    }
    img {
      width: 30%;
      position: absolute;
      top: 5px;
    }
    .imgborder {
      right: 0px;
      transform: rotate(180deg);
      -ms-transform: rotate(180deg); /* Internet Explorer */
      -moz-transform: rotate(180deg); /* Firefox */
      -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
      -o-transform: rotate(180deg); /* Opera */
    }
  }
  .applyInput {
    border: 1px solid #76b198;
    margin-top: 15px;
    border-radius: 6px;
    padding: 10px 10px;
    margin-bottom: 15px;
    table {
      color: #16a57b;
      th {
        text-align: right;
      }
    }
  }
  .smDiv {
    margin-top: 15px;
    background-color: #feedd1;
    padding: 1px 10px;
    border-radius: 8px;
    color: #eaab4e;
  }
}
</style>