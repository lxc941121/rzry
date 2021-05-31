<template>
  <div class="declare_personal">
    <div class="his_bar his_bar2 ">填写信息</div>
    <div class="perline">
      <span class="per_txt">类型</span>
      <van-radio-group v-model="radio" direction="horizontal" icon-size="12" checked-color="#28CE84">
        <van-radio name="1" shape="square">认种</van-radio>
        <van-radio name="2" shape="square">认养</van-radio>
      </van-radio-group>
    </div>
    <div class="perline">
      <span class="per_txt">名称</span>
      <div class="per_input"><input type="text" placeholder="请填写您的单位名称"></div>
    </div>
    <div class="perline">
      <span class="per_txt">电话号码</span>
      <div class="per_input"><input type="text" placeholder="请填写您的联系方式"></div>
    </div>
    <div class="perline">
      <span class="per_txt">验证码</span>
      <div class="per_input yzm"><input type="text" placeholder="请输入验证码"></div>
      <div class="per_send">发送验证码</div>
    </div>
    <div class="perline">
      <span class="per_txt">场地地点</span>
      <div class="per_input"><input type="text" placeholder="请填写您的地点"></div>
    </div>
    <div class="perline">
      <span class="per_txt">树种</span>
      <div class="per_input"><input type="text" placeholder="请填写您的树种"></div>
    </div>
    <div class="perline">
      <span class="per_txt">数量</span>
      <van-stepper v-model="saplingNum" />
    </div>
    <div class="perline">
      <span class="per_txt">年限</span>
      <van-stepper v-model="years" />
    </div>
    <div class="perline">
      <span class="per_txt">价格</span>
      <div class="per_input"><input type="text" placeholder="请填写您的价格"></div>
    </div>
    <div class="perline">
      <span class="per_txt">期望开始时间</span>
      <div class="per_input per_inputbg"><input type="text" placeholder="请填写您的日期" readonly="readonly" @click="showpopuptime" v-model="datetime"></div>

      <!-- <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" /> -->
    </div>

    <!-- 时间弹窗 -->
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" :max-date="maxDate" :formatter="formatter" @cancel="onCancel" @confirm="onConfirm" @change="endTimeChange" />
    </van-popup>
    <div class="per_blok">
      <div class="per_tip">
        <img src="@/style/img/other/small_icon2.png" alt=""> 为更好服务项目实行，建议开始时间选择至少三个月后。
      </div>
      <div class="per_btn">提交申报申请</div>
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