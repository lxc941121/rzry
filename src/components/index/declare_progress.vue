<template>
  <div class="declare_progress">
    <ul class="pro_ul">
      <li class="pro_li" @click="handleGoA('declare_status')">
        <div class="pro_txt">
          <div class="pro_xz"></div> <span> 温州设计集团业主申报</span>
        </div>
        <div class="pro_time">2020年5月18日</div>
      </li>
      <li class="pro_li" @click="handleGoA('declare_status')">
        <div class="pro_txt">
          <div class="pro_xz"></div> <span> 温州设计集团业主申报</span>
        </div>
        <div class="pro_time">2020年5月18日</div>
      </li>
      <li class="pro_li">
        <div class="pro_txt">
          <div class="pro_xz"></div> <span> 温州设计集团业主申报</span>
        </div>
        <div class="pro_time">2020年5月18日</div>
      </li>
      <li class="pro_li">
        <div class="pro_txt">
          <div class="pro_xz"></div> <span> 温州设计集团业主申报</span>
        </div>
        <div class="pro_time">2020年5月18日</div>
      </li>

    </ul>

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