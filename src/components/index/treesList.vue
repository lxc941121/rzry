<template>
  <div class="treesList">
    <div class="top"><img src="@/style/img/other/treebg.png" alt=""></div>
    <div class="main">
      <div class="search">
        <div class="inputKey">
          <input type="text" placeholder="请输入想查询的区域或树木" class="input">
          <div class="btn"></div>
        </div>
        <div class="select">
          <div class="select_one active">距离</div>
          <div class="select_one">树种</div>
        </div>
      </div>
      <div class="tree">
        <ul class="tree_ul">
          <li class="tree_li">
            <div class="tree_border">
              <div class="tree_full">监护名额已满</div>
              <img src="@/style/img/other/tree2.png" alt="">
              <div class="tree_sn1">江心樟树（距离7.9km）</div>
              <div class="tree_btm">
                <div class="tree_sn2">监护人：陈喜喜、陈喜</div>
                <div class="tree_sn2">挂牌号：3-208</div>
              </div>
            </div>

          </li>
          <li class="tree_li">
            <div class="tree_border">
              <img src="@/style/img/other/tree2.png" alt="">
              <div class="tree_sn1">江心樟树（距离7.9km）</div>
              <div class="tree_btm">
                <div class="tree_sn2">监护人：陈喜喜、陈喜</div>
                <div class="tree_sn2">挂牌号：3-208</div>
              </div>
            </div>

          </li>
          <li class="tree_li">
            <div class="tree_border">
              <img src="@/style/img/other/tree2.png" alt="">
              <div class="tree_sn1">江心樟树（距离7.9km）</div>
              <div class="tree_btm">
                <div class="tree_sn2">监护人：陈喜喜、陈喜</div>
                <div class="tree_sn2">挂牌号：3-208</div>
              </div>
            </div>

          </li>
          <li class="tree_li">
            <div class="tree_border">
              <img src="@/style/img/other/tree2.png" alt="">
              <div class="tree_sn1">江心樟树（距离7.9km）</div>
              <div class="tree_btm">
                <div class="tree_sn2">监护人：陈喜喜、陈喜</div>
                <div class="tree_sn2">挂牌号：3-208</div>
              </div>
            </div>

          </li>
        </ul>
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