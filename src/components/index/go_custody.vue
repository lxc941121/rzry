<template>
  <div class="go_custody">
    <div class="custody_bg">
      <img src="@/style/img/other/applybg.png" alt="">
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
        <span class="per_txt2 color2">无</span>
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
    </div>
    <div class="declare_personal">
      <div class="his_bar his_bar2 ">填写信息</div>
      <div class="perline">
        <span class="per_txt"> 监护人<em>*</em></span>
        <div class="per_input"><input type="text" placeholder="请填写您的姓名"></div>
      </div>
      <div class="perline">
        <span class="per_txt">身份证</span>
        <div class="per_input"><input type="text" placeholder="请填写您的身份证号码"></div>
      </div>
      <div class="perline">
        <span class="per_txt">电话号码<em>*</em></span>
        <div class="per_input"><input type="text" placeholder="请填写您的固定联系方式"></div>
      </div>
      <div class="perline">
        <span class="per_txt">验证码<em>*</em></span>
        <div class="per_input yzm"><input type="text" placeholder="请输入验证码"></div>
        <div class="per_send">发送验证码</div>
      </div>
      <div class="">
        <div class="per_tip per_tip2">
          <img src="@/style/img/other/small_icon2.png" alt=""> 监护须知：通过点击阅读并勾选此须知，自愿成为古树名木的监护人，在监护期内每年不少于6次实施监护义务，每次间隔不少于1个月，监护后须向城市数林公众服务平台上传古树名木最新状态，如有养护不到位，古树濒临死亡等问题需在上传时注明。如因监护人监护不到位导致的古树名木最终死亡，将取消后续监护资格。
        </div>
        <div class="per_btn" @click="handleGoA('submit_custody')">提交监护申请</div>
      </div>
    </div>

    <!-- <div class="per_blok">
       
        <div class="per_btn">修改申报</div>
        <div class="per_btn per_btn2">删除申请</div>
      </div> -->

  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleGoA(Obj) {
      this.$router.push({
        path: "/" + Obj,
      });
    },
  },
};
</script>
<style lang="less">
@import "../../style/subcommon.less";
@import "../../style/declare.less";
</style>