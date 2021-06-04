<template>
  <div class="declare_personal declare_status">
    <div class="his_bar his_bar2 ">填写信息</div>
    <div class="perline">
      <span class="per_txt">类型：</span>
      <span class="per_txt2">认种</span>
    </div>
    <div class="perline">
      <span class="per_txt">名称：</span>
      <span class="per_txt2">温州设计集团</span>
    </div>
    <div class="perline">
      <span class="per_txt">电话号码：</span>
      <span class="per_txt2">温州设计集团</span>
    </div>

    <div class="perline">
      <span class="per_txt">需求地点：</span>
      <span class="per_txt2">温州设计集团</span>
    </div>
    <div class="perline">
      <span class="per_txt">需求树种：</span>
      <span class="per_txt2">温州设计集团</span>
    </div>
    <div class="perline">
      <span class="per_txt">需求数量：</span>
      <span class="per_txt2">温州设计集团</span>
    </div>
    <div class="perline">
      <span class="per_txt">年限：</span>
      <span class="per_txt2">1年</span>
    </div>
    <div class="perline">
      <span class="per_txt">需求价格：</span>
      <span class="per_txt2">200元</span>
    </div>
    <div class="perline">
      <span class="per_txt">期望开始时间：</span>
      <span class="per_txt2">2021年3月12日</span>

      <!-- <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" /> -->
    </div>

    <div class="his_bar his_bar2 ">审核回复</div>
    <!-- 审核中 -->
    <div class="verify_status">
      <div class="verify">审核等待中</div>
      <div class="verify_txt1">暂无任何信息，请再等待几日~</div>

    </div>
    <!-- 审核失败 -->
    <!-- <div class="verify_status verify_fail">
      <div class="verify">审核未通过</div>
      <div class="verify_txt1">暂无适配场地~</div>

    </div> -->
    <!-- 审核通过 -->
    <!-- <div class="verify_status verify_complete">
      <div class="verify">审核通过！</div>
      <div class="verify_txt1">已批复在三垟湿地公园开展温州设计集团认种认养项目，请知悉~</div>

      <div class="verify_txt2">审批人：某某某</div>
      <div class="verify_txt2">审批日期：2021年2月12日</div>

    </div> -->

    <div class="per_blok">
      <!-- <div class="per_tip">
        <img src="@/style/img/other/small_icon2.png" alt=""> 为更好服务项目实行，建议开始时间选择至少三个月后。
      </div> -->
      <div class="per_btn">修改申报</div>
      <div class="per_btn per_btn2">删除申请</div>
    </div>

  </div>
</template>
<script>
import { formatTime, format } from "@/utils/index.js";

export default {
  data() {
    return {
      radio: "1",
      saplingNum: 100,
      years: 1,
      show: false,
      datetime: "",
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
    };
  },

  methods: {
    // 通过传入 formatter 函数对选项文字进行处理
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    },
    showpopuptime() {
      if (!this.show) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    onConfirm(value) {
      console.info(value);
      console.log(`当前值：${value}`);
      this.datetime = format(value, 0);
      this.show = false;
    },
    endTimeChange(e) {
      console.info(e);
      let endTimeArr = e.getValues(); //["2019", "03", "22", "17", "28"]
      console.info(endTimeArr);
      let data = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]}  ${endTimeArr[3]}:${endTimeArr[4]}:00`;
      console.info(data);
    },
    onCancel() {
      this.show = false;
    },
  },
};
</script>
<style lang="less">
@import "../../style/subcommon.less";
@import "../../style/declare.less";
</style>
<style>
.declare_personal .van-radio__icon .van-icon {
  border: 1px solid #28ce84;
}
.declare_personal .van-radio__label {
  font-size: 12px;
}
</style>
<style scoped>
html,
body {
  height: 100%;
}
</style>