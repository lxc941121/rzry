<template>
  <div id="applyInput">
    <!-- 图片 -->
    <div class="imgDiv">
      <img :src="require('../../img/rs1.jpg')" />
      <!-- 标题 -->
      <div class="money">
        <h3>￥330</h3>
        <p style="display: inline;">认养倒计时：</p>
        <CountDown :endHours="24" class="time"></CountDown>
      </div>
    </div>
    <!-- 标题 -->
    <div class="title">
      <img :src="require('../../img/xqx.png')" style="left: 10px;" />
      <h3>详细信息</h3>
      <img :src="require('../../img/xqx.png')" class="imgborder" />
    </div>
    <!-- 价格明细 -->
    <div class="tableDiv">
      <x-table :full-bordered="false" :content-bordered="false" :cell-bordered="false">
        <tbody>
          <tr>
            <th>编号：</th>
            <td>0000001</td>
          </tr>
          <tr>
            <th>胸径：</th>
            <td>13.3厘米</td>
          </tr>
          <tr>
            <th>高度：</th>
            <td>6米</td>
          </tr>
          <tr>
            <th>冠幅：</th>
            <td>2米</td>
          </tr>
          <tr>
            <th>认养年限：</th>
            <td>2年</td>
          </tr>
          <tr>
            <th>树木位置：</th>
            <td>杨府山公园</td>
          </tr>
          <tr>
            <th>可获取绿色能量：</th>
            <td>300/株</td>
          </tr>
        </tbody>
      </x-table>
    </div>
    <!-- 标题 -->
    <div class="title" style="margin-top: 15px;">
      <img :src="require('../../img/xqx.png')" style="left: 10px;" />
      <h3>填写信息</h3>
      <img :src="require('../../img/xqx.png')" class="imgborder" />
    </div>
    <!-- 表单 -->
    <div class="applyInput">
      <x-table :full-bordered="false" :content-bordered="false" :cell-bordered="false">
        <tbody>
          <tr>
            <th>个人/团队</th>
            <td>
              <checker
                v-model="chark"
                default-item-class="item"
                selected-item-class="item-selected"
                style="text-align: left;margin-left: 15px;"
              >
                <checker-item value="1">个人</checker-item>
                <checker-item value="2">团队</checker-item>
              </checker>
            </td>
          </tr>
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
            <th>种养寄语</th>
            <td>
              <x-textarea
                :max="30"
                :autosize="true"
                placeholder="请输入5-30字个性寄语"
                value="百年好合，白头到老！"
                :show-clear="false"
              ></x-textarea>
            </td>
          </tr>
        </tbody>
      </x-table>
      <!-- 说明 -->
      <div class="smDiv">
        <p>
          <x-icon type="ios-information-outline" size="20" style="vertical-align: bottom;"></x-icon>请输入5-30字个性寄语，个性寄语会打印在公益牌上，并悬挂在认种认养树木上。
        </p>
      </div>
      <!-- 阅读条款 -->
      <p style="text-align: center;margin-bottom: 50px;">
        <check-icon :value.sync="check" type="plain" style="font-size: 12px;">我已阅读并同意</check-icon>
        <span style="color:#9fc25c" @click="()=>$router.push('/agreement')">《认种认养条款》</span>
      </p>
      <div class="nextBtn">
        <!-- 合计 -->
        <p class="heji">合计费用：￥330</p>
        <x-button class="btn" :gradients="['#fda422', '#fda422']" link="/complete">支付</x-button>
      </div>
    </div>
  </div>
</template>
<script>
import CountDown from "../../rzry/item/CountDown";
import {
  XTable,
  XInput,
  CheckIcon,
  XButton,
  Checker,
  CheckerItem,
  XTextarea,
} from "vux";
/* import pdf from 'vue-pdf' */
export default {
  components: {
    XTable,
    XInput,
    CheckIcon,
    XButton,
    Checker,
    CheckerItem,
    CountDown,
    XTextarea,
  },
  data() {
    return {
      check: true,
      chark: "1",
    };
  },
};
</script>

<style lang="less" scoped>
@import "../../../assets/config/common.css";
#applyInput /deep/ .vux-x-icon {
  fill: #fda422;
}
#applyInput {
  .smDiv {
    background-color: #feedd1;
    padding: 1px 10px;
    border-radius: 8px;
    color: #fda422;
  }
  .imgDiv {
    width: 100%;
    height: 150px;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      margin: 0;
    }
    h3 {
      background-color: #fda422;
      width: 70px;
      margin: 0;
      height: 30px;
      text-align: center;
      line-height: 30px;
      float: left;
    }
    .money {
      position: absolute;
      bottom: 0;
      color: #fff;
      width: 100%;
      height: 30px;
      background-color: #28ce84;
      text-align: right;
      p {
        margin: 0;
        line-height: 30px;
        padding-right: 10px;
      }
      .time {
        display: inline;
        line-height: 30px;
      }
    }
  }
  .title {
    margin-top: 15px;
    margin-left: 10px;
    margin-right: 10px;
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
      right: 10px;
      transform: rotate(180deg);
      -ms-transform: rotate(180deg); /* Internet Explorer */
      -moz-transform: rotate(180deg); /* Firefox */
      -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
      -o-transform: rotate(180deg); /* Opera */
    }
  }
  .tableDiv {

    margin-left: 15px;
    margin-right: 15px;
    font-size: 14px;
    th {
      width: 50%;
      text-align: right;
      color: #289b7a;
    }
    td {
      width: 50%;
      text-align: left;
      color: #dfaa59;
    }
  }
  .heji {
    margin-left: 15px;
    width: 160px;
    color: #fda422;
    padding: 9px 10px;
    font-weight: bold;
    margin-top: 10px;
    float: left;
    font-size: 16px;
  }
  .applyInput {
    // border: 1px solid #76b198;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 6px;
    padding: 10px 10px;
    margin-bottom: 15px;
    table {
      color: #16a57b;
      th {
        width: 25%;
        text-align: right;
      }
      td {
        width: 75%;
      }
    }
  }
  .nextBtn {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    border-top: 1px solid #ddd;
    z-index: 10;
    .btn {
      width: 80px;
      float: right;
      margin-right: 10px;
      margin-bottom: 10px;
      margin-top: 10px;
      border-radius: 25px;
    }
  }
  .item {
    border: 1px solid #ececec;
    padding: 0px 15px;
  }
  .item-selected {
    border: 2px solid #09ab7c;
  }
}
</style>
