<template>
  <div class="go_custody">
    <div class="custody_bg">
      <img src="@/style/img/other/applybg2.png" alt="">
    </div>
    <div class="declare_personal declare_status">
      <div class="his_bar his_bar2 ">监护信息</div>
      <div class="perline">
        <span class="per_txt color1">树种：</span>
        <span class="per_txt2 color2">榕树</span>
      </div>
      <div class="perline">
        <span class="per_txt color1">年龄：</span>
        <span class="per_txt2 color2">105年</span>
      </div>
      <div class="perline">
        <span class="per_txt color1">历史监护人：</span>
        <span class="per_txt2 color2">陈喜喜、陈喜嘉、陈喜嘉</span>
        <span class="per_txt4">监护名额已满</span>
        <span class="per_txt3">（监护名额剩余1人）</span>
      </div>

      <div class="perline">
        <span class="per_txt color1">挂牌号：</span>
        <span class="per_txt2 color2">1-62</span>
      </div>
      <div class="perline">
        <span class="per_txt color1">区（县）：</span>
        <span class="per_txt2 color2">鹿城区</span>
      </div>
      <div class="perline">
        <span class="per_txt color1">所属街道：</span>
        <span class="per_txt2 color2">南汇街道</span>
      </div>
      <div class="perline">
        <span class="per_txt color1">地址：</span>
        <span class="per_txt2 color2">南浦xxx</span>
      </div>
      <div class="perline">
        <span class="per_txt color1">保护级别：</span>
        <span class="per_txt2 color2">国家三级</span>
      </div>
      <div class="perline">
        <span class="per_txt color1">管养单位：</span>
        <span class="per_txt2 color2">村委会</span>

        <!-- <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" /> -->
      </div>

      <div class="per_blok">
        <div class="per_btn">去监护</div>
        <div class="per_btn per_btn3">不可监护</div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="less">
@import "../../style/subcommon.less";
@import "../../style/declare.less";
</style>