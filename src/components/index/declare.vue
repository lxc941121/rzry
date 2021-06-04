<template>
  <div class="declare">
    <div class="declare_top">
      <div class="decl_lf">
        <div class="decl_sn1">申报人：陈喜喜</div>
        <div class="decl_sn2">当前申请记录：0</div>
      </div>
      <div class="decl_rg">
        <div class="headIcon">
          <img src="@/style/img/other/head.png" alt="">
          <div class="headRank">排行：1000+</div>
        </div>
      </div>
    </div>
    <div class="declare_main">
      <div class="decl_bar">
        <div class="decl_sn3" @click="handleGoA('declare_progress')">我的订单</div>
        <div class="decl_go">历史订单</div>
      </div>
      <div class="decl_flex">
        <div class="decl_bk" @click="handleGoA('declare_progress')">
          <img src="@/style/img/other/declare1.png" alt="">
          <div class="decl_bktxt">需求用地</div>
        </div>
        <div class="decl_bk" @click="handleGoA('declare_progress')">
          <img src="@/style/img/other/declare2.png" alt="">
          <div class="decl_bktxt">业主用地</div>
        </div>
        <div class="decl_bk" @click="handleGoA('declare_progress')">
          <img src="@/style/img/other/declare3.png" alt="">
          <div class="decl_bktxt">申请通过</div>
        </div>
        <div class="decl_bk" @click="handleGoA('declare_progress')">
          <img src="@/style/img/other/declare4.png" alt="">
          <div class="decl_bktxt">申请失败</div>
        </div>
        <div class="decl_bk" @click="handleGoA('declare_progress')">
          <img src="@/style/img/other/declare5.png" alt="">
          <div class="decl_bktxt">取消申请</div>
        </div>
      </div>
      <div class="decl_bflex">
        <div class="decl_bk2" @click="handleGoA('declare_owner')">
          <img src="@/style/img/other/declare_big1.png" alt="">
        </div>
        <div class="decl_bk2" @click="handleGoA('declare_personal')">
          <img src="@/style/img/other/declare_big2.png" alt="">
        </div>
      </div>
    </div>
    <div class="decl_tip">
      <div class="decl_detail">
        <span class="decl_icon"></span>
        注：1.业主单位为提供认种认养场地资源的甲方单位；<br />
        <span class="decl_empty"></span>2.需求单位为希望通过本平台登记认种认养需求，平台协商相应资源以满足相应的申报需求的单位
      </div>
    </div>
    <footer-bar />
  </div>
</template>
<script>
import footerBar from "@/subComponent/footer";

export default {
  data() {
    return {};
  },
  components: {
    footerBar,
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