<template>
  <div class="watering">
    <div class="water_top">
      <div class="head">
        <div class="head_icon">
          <div class="head_lf">
            <img src="@/style/img/other/head.png" alt="" class="head_img">
            <div class="head_sn1">VIP10</div>
          </div>

          <div class="head_info">
            <div class="head_name">月亮与六便士</div>
            <div class="head_num">1233</div>
          </div>

        </div>
        <div class="head_rule" @click="show = true"></div>
      </div>
      <div class="main">
        <div class="water_info"><img src="@/style/img/other/water_success.png" alt=""></div>
        <div class="main_lf"><img src="@/style/img/other/water_lf.png" alt=""></div>
        <div class="main_rg"><img src="@/style/img/other/water_rg.png" alt=""></div>
        <div class="main_one">
          <img src="@/style/img/other/waterbtn1.png" alt="">
        </div>
        <div class="main_two">
          <img src="@/style/img/other/waterbtn2.png" alt="">
        </div>
        <div class="main_three">
          <img src="@/style/img/other/waterbtn3.png" alt="">
        </div>

      </div>
    </div>
    <div class="main_speed">
      <div class="speedline"></div>
      <div class="speed1"><img src="@/style/img/other/speed1.png" alt=""></div>
      <div class="speed1 speed2"><img src="@/style/img/other/speed2.png" alt=""></div>
      <div class="speed1 speed3"><img src="@/style/img/other/speed3.png" alt=""></div>
      <div class="speed1 speed4"><img src="@/style/img/other/speed4.png" alt=""></div>

    </div>
    <div class="water_rank">
      <div class="btm">
        <ul class="rank_ul">
          <li class="rank_li">
            <div class="rank_num"><img src="@/style/img/other/medal1.png" alt=""></div>
            <div class="rank_head"><img src="@/style/img/other/head.png" alt=""></div>
            <div class="rank_name">昵称昵称昵称昵称昵称昵称</div>
            <div class="rank_vip">vip10</div>
            <div class="rank_star">888</div>
          </li>
          <li class="rank_li">
            <div class="rank_num"><img src="@/style/img/other/medal2.png" alt=""></div>
            <div class="rank_head"><img src="@/style/img/other/head.png" alt=""></div>
            <div class="rank_name">昵称昵称昵称昵称昵称昵称</div>
            <div class="rank_vip">vip10</div>
            <div class="rank_star">888</div>
          </li>
          <li class="rank_li">
            <div class="rank_num"><img src="@/style/img/other/medal3.png" alt=""></div>
            <div class="rank_head"><img src="@/style/img/other/head.png" alt=""></div>
            <div class="rank_name">昵称昵称昵称昵称昵称昵称</div>
            <div class="rank_vip">vip10</div>
            <div class="rank_star">888</div>
          </li>
          <li class="rank_li">
            <div class="rank_num rank_index">4</div>
            <div class="rank_head"><img src="@/style/img/other/head.png" alt=""></div>
            <div class="rank_name">昵称昵称昵称昵称昵称昵称</div>
            <div class="rank_vip">vip10</div>
            <div class="rank_star">888</div>
          </li>
          <li class="rank_li">
            <div class="rank_num rank_index">5</div>
            <div class="rank_head"><img src="@/style/img/other/head.png" alt=""></div>
            <div class="rank_name">昵称昵称昵称昵称昵称昵称</div>
            <div class="rank_vip">vip10</div>
            <div class="rank_star">888</div>
          </li>
          <li class="rank_li">
            <div class="rank_num rank_index">6</div>
            <div class="rank_head"><img src="@/style/img/other/head.png" alt=""></div>
            <div class="rank_name">昵称昵称昵称昵称昵称昵称</div>
            <div class="rank_vip">vip10</div>
            <div class="rank_star">888</div>
          </li>
        </ul>
      </div>

    </div>
    <!-- 规则 -->
    <van-overlay :show="show" @click="show = false">
      <div class="rule_bk" @click.stop>

        <div class="rule_cnt">
          <div class="rule_close" @click="show = false"><img src="@/style/img/other/close2.png" alt="" srcset=""></div>

          <h3>《虚拟养护规则说明》</h3>
          <div class="rule_dt">
            1、虚拟养护是城市数林公众服务平台推出的虚拟树木养成类
            游戏；
            2、用户可通过本界面领取种子，本人或邀请好友完成线上浇
            水，积累绿植，增加树木成长进度，当树木养护完成后，可至
            商城（暂未上线，敬请期待）兑换实体小礼品；
            3、每位用户每天可以为自己养护中的树木浇水<em class="rule_num1">1次</em>
            <em class="rule_num2">1次</em>
          </div>

        </div>
      </div>
    </van-overlay>

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