<template>
  <div id="infoDiv">
    <!-- 标题 -->
    <div class="title">
      <img :src="require('../img/xqx.png')" style="left: 0px;" />
      <h3>个人信息</h3>
      <img :src="require('../img/xqx.png')" class="imgborder" />
    </div>
    <!-- 表格 -->
    <div class="tableDiv">
      <x-table :full-bordered="false" :content-bordered="false" :cell-bordered="false">
        <tbody>
          <tr>
            <th>姓名：</th>
            <td>陈佳佳</td>
          </tr>
          <tr>
            <th>电话：</th>
            <td>15687569853</td>
          </tr>
          <tr>
            <th>证件号码:</th>
            <td>330381199457587451</td>
          </tr>
          <tr>
            <th>认养寄语：</th>
            <td>生命在于运动</td>
          </tr>
        </tbody>
      </x-table>
    </div>
    <!-- 标题 -->
    <div class="title">
      <img :src="require('../img/xqx.png')" style="left: 0px;" />
      <h3>认种信息</h3>
      <img :src="require('../img/xqx.png')" class="imgborder" />
    </div>
    <!-- 表格 -->
    <div class="tableDiv">
      <x-table :full-bordered="false" :content-bordered="false" :cell-bordered="false">
        <tbody>
          <tr>
            <th>认种数量：</th>
            <td>1</td>
          </tr>
          <tr>
            <th>树木编号：</th>
            <td>BCE5486FE8767W96</td>
          </tr>
          <tr>
            <th>树种:</th>
            <td>榕树</td>
          </tr>
          <tr>
            <th>所属义务指数点：</th>
            <td>杨府山公园</td>
          </tr>
          <tr>
            <th>是否参加现场栽种：</th>
            <td>是</td>
          </tr>
        </tbody>
      </x-table>
    </div>
    <!-- 标题 -->
    <div class="title">
      <img :src="require('../img/xqx.png')" style="left: 0px;" />
      <h3>价格明细</h3>
      <img :src="require('../img/xqx.png')" class="imgborder" />
    </div>
    <!-- 表格 -->
    <div class="tableDiv">
      <x-table :full-bordered="false" :content-bordered="false" :cell-bordered="false">
        <tbody>
          <tr>
            <th>树苗价格（含运费、税费等）：</th>
            <td>50元/株（榕树）</td>
          </tr>
          <tr>
            <th>种植费用（含运费、施肥等）：</th>
            <td>30元/株</td>
          </tr>
          <tr>
            <th>养护费用（含运费、施肥、淋水等）:</th>
            <td>100元/株</td>
          </tr>
          <tr>
            <th>认种认养公益牌制作费：</th>
            <td>50元/个</td>
          </tr>
          <tr>
            <th>认种认养时间：</th>
            <td>2年</td>
          </tr>
        </tbody>
      </x-table>
    </div>
    <!-- 说明 -->
    <div class="smDiv">
      <p>
        <x-icon type="ios-information-outline" size="20" style="vertical-align: bottom;"></x-icon>树木的成长栽植初期的种植和养护非常关键，为确保认种树木的存活率，所有认种人需承诺至少认种认养2年，详细信息可查看《认种认养条款》
      </p>
    </div>
    <!-- 合计 -->
    <div class="heji">
      <p>合计费用：￥330</p>
    </div>
    <!-- 按钮 -->
    <p style="text-align: center;">
      <x-button :gradients="['#fda422', '#fda422']" style="margin-top: 10px;margin-bottom:15px">确认信息，立即支付</x-button>
    </p>
  </div>
</template>

<script>
import { XTable, XButton } from "vux";
export default {
  components: {
    XTable,
    XButton,
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/config/common.css";
#infoDiv /deep/ .vux-x-icon {
  fill: #cf2e2e;
}
#infoDiv {
  margin-left: 15px;
  margin-right: 15px;
  .title {
    margin-top: 15px;
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
  .tableDiv {
    font-size: 14px;
    th {
      text-align: right;
      color: #289b7a;
    }
    td {
      text-align: left;
    }
  }
  .smDiv {
    background-color: #fdebeb;
    padding: 1px 10px;
    border-radius: 8px;
    color: #d02e2e;
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
</style>>
