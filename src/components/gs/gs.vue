<template>
  <div id="gs">
    <!-- 头部背景颜色 -->
    <div class="titleDiv">
      <ul>
        <li>
          <h3>选择年份:</h3>
        </li>
        <li>
          <selector direction="rtl" :options="time" v-model="timeValue" class="select"></selector>
        </li>
      </ul>
    </div>
    <!-- 列表 -->
    <ul class="gsList" v-for="list in month" :key="list.id">
      <li @click="()=>$router.push('/lookPdf')">
        <p class="title">· {{timeValue+"年"+list.month}}月认种认养资金收入与支出公示</p>
        <p>{{parseInt(list.month)>11?2021:timeValue}}年{{parseInt(list.month)>11?1:parseInt(list.month)+1}}月1号</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { Selector } from "vux";
export default {
  components: {
    Selector,
  },
  data() {
    return {
      timeValue: "2020",
      time: [
        { key: "2020", value: "2020年" },
        { key: "2019", value: "2019年" },
        { key: "2018", value: "2018年" },
        { key: "2017", value: "2017年" },
        { key: "2016", value: "2016年" },
      ],
      month: [
        { id: 12, month: "12" },
        { id: 11, month: "11" },
        { id: 10, month: "10" },
        { id: 9, month: "9" },
        { id: 8, month: "8" },
        { id: 7, month: "7" },
        { id: 6, month: "6" },
        { id: 5, month: "5" },
        { id: 4, month: "4" },
        { id: 3, month: "3" },
        { id: 2, month: "2" },
        { id: 1, month: "1" },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/config/common.css";
#gs {
  .titleDiv {
    width: 100%;
    height: 100px;
    background-image: linear-gradient(to right, #33d0b1, #87dd92);
    position: relative;
    ul {
      position: absolute;
      width: 95%;
      text-align: center;
      bottom: 20px;
      li {
        text-align: left;
        width: 50%;
        float: left;
      }
    }
    h3 {
      bottom: 20px;
      color: #fff;
      font-weight: normal;
      margin: 6px;
      margin-left: 15px;
      font-size: 17px;
    }
    .select {
      width: 95px;
      float: right;
      border-radius: 20px;
    }
  }
  .gsList li {
    margin: 10px 15px;
    padding: 0px 15px;
    caret-color: #fbfbfb;
    border: 1px solid #009470;
    font-size: 14px;

    p {
      margin: 10px 0;
      color: #999;
      font-size: 12px;
    }
    .title {
      color: #000;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>