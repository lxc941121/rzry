<template>
  <div class="water_record">
    <div class="water_bk">
      <div class="time">今天</div>
      <div class="water_area">
        <div class="water_top"><img src="@/style/img/other/kettle.png" alt="">
          <span>今日共获得60g</span>
        </div>
        <div class="water_main">
          <div class="wt_top">
            <img src="@/style/img/other/head.png" alt="" class="headimg">
            <div class="wt_line">
              <div class="wt_all">黄必胜等5位好友 帮你浇水50g</div>
              <div class="wt_zk" @click="show = !show">{{show?'展开':'收起'}}</div>
              <img src="@/style/img/other/gomore.png" alt="" :class="{'dropicon':show,'dropicon wt_drop':!show}">
            </div>

          </div>
          <transition name="fade">
            <ul class="wt_ul" v-if="show">
              <li class="wt_li">
                <img src="@/style/img/other/head.png" alt="" class="headimg">
                <span class="wt_sn1">黄必胜 帮你浇水10g</span>
                <div class="wt_sn2">拜访</div>
              </li>
              <li class="wt_li">
                <img src="@/style/img/other/head.png" alt="" class="headimg">
                <span class="wt_sn1">黄必胜 帮你浇水10g</span>
                <div class="wt_sn2">拜访</div>
              </li>
              <li class="wt_li">
                <img src="@/style/img/other/head.png" alt="" class="headimg">
                <span class="wt_sn1">黄必胜 帮你浇水10g</span>
                <div class="wt_sn2">拜访</div>
              </li>

            </ul>
          </transition>
        </div>

      </div>

    </div>
    <div class="water_bk">
      <div class="time">05-23</div>
      <div class="water_area">
        <div class="water_top"><img src="@/style/img/other/kettle.png" alt="">
          <span>今日共获得60g</span>
        </div>
        <div class="water_main">
          <div class="wt_top">
            <img src="@/style/img/other/head.png" alt="" class="headimg">
            <div class="wt_line">
              <div class="wt_all">黄必胜等5位好友 帮你浇水50g</div>
              <div class="wt_zk" @click="show = !show">{{show?'展开':'收起'}}</div>
              <img src="@/style/img/other/gomore.png" alt="" :class="{'dropicon':show,'dropicon wt_drop':!show}">
            </div>

          </div>
          <transition name="fade">
            <ul class="wt_ul" v-if="show">
              <li class="wt_li">
                <img src="@/style/img/other/head.png" alt="" class="headimg">
                <span class="wt_sn1">黄必胜 帮你浇水10g</span>
                <div class="wt_sn2">拜访</div>
              </li>
              <li class="wt_li">
                <img src="@/style/img/other/head.png" alt="" class="headimg">
                <span class="wt_sn1">黄必胜 帮你浇水10g</span>
                <div class="wt_sn2">拜访</div>
              </li>
              <li class="wt_li">
                <img src="@/style/img/other/head.png" alt="" class="headimg">
                <span class="wt_sn1">黄必胜 帮你浇水10g</span>
                <div class="wt_sn2">拜访</div>
              </li>

            </ul>
          </transition>
        </div>

      </div>

    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
    };
  },
};
</script>
<style lang="less">
@import "../../style/subcommon.less";
@import "../../style/declare.less";
</style>
<style>
body {
  background: #eaeaea;
}
.router-slid-enter-active,
.router-slid-leave-active {
  transition: all 0.4s;
}
.router-slid-enter,
.router-slid-leave-active {
  transform: translate3d(0, 3rem, 0);
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>