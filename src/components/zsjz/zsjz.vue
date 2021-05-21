<template>
  <div id="jzDiv">
    <!-- 首图 -->
    <div class="bgDiv">
      <img src="../img/jzbg.jpg" />
    </div>
    <!-- 尽责排行 -->
    <div class="phDiv">
      <img src="../img/jzph.png" />
    </div>
    <!-- 说明 -->
    <div class="smDiv">
      <!-- 标题 -->
      <div class="title">
        <h3>1.捐资捐物</h3>
        <x-button :gradients="['#fda422', '#fda422']" class="btn" link="/zsjzInput">我要参与</x-button>
      </div>
      <p class="text">指自愿向合法公募组织捐赠资金用于国土绿化，或者捐献当地国土绿化急需物资的尽责形式。</p>
      <!-- 说明文字 -->
      <p
        class="smText"
      >折算标准：按一类地区（北京、天津、上海、江苏、浙江）20元、二类地区（内蒙古、辽宁、福建、山东、广东、湖南）15元、三类地区（其他省、自治区、直辖市，新疆生产建设兵团）10元的标准，折算完成1株植树任务。捐献当地国土绿化急需物资按时价折算植树株数。</p>
      <!-- 标题 -->
      <div class="title">
        <h3>2.造林绿化</h3>
        <x-button :gradients="['#999', '#999']" class="btn" disabled>暂不开放</x-button>
      </div>
      <p class="text">指直接参加乔、灌、草植被育苗、栽植全部或者部分过程的劳动的尽职形式</p>
      <!-- 说明文字 -->
      <p
        class="smText"
      >折算标准：栽植乔木1株，栽植灌木1丛，培育苗木10株，栽植容器苗10株，栽植绿篱3平方米，种植或铺设草坪3平方米，对屋顶、墙体、阳台等进行绿化1平方米。在单位、街道等公共场所节日摆花10株（盆），完成其中一项折算1株植物任务，参加整地、挖穴等造林绿化劳动半个工作日，折算完成3株植树任务。</p>
      <!-- 标题 -->
      <div class="title">
        <h3>3.抚育管理</h3>
        <x-button :gradients="['#999', '#999']" class="btn" link="/zsjzInput">暂不开放</x-button>
      </div>
      <p class="text">指直接参加对现有乔、灌、草植被除草除杂、浇水、松土施肥、有害生物预防、整枝修剪、间伐等抚育管护活动全部或部分过程的劳动的尽责形式</p>
      <!-- 说明文字 -->
      <p
        class="smText"
      >折算标准：抚育幼树5株，抚育密植灌木5株（丛），管护绿篱或者草坪6平方米，管护屋顶、墙体、阳台或者其他公共场所绿化面积2平方米，完成其中一项折算1株植树任务。参加抚育管护劳动半个工作日，折算完成3株植树任务。</p>
      <!-- 标题 -->
      <div class="title">
        <h3>4.自然保护</h3>
        <x-button :gradients="['#999', '#999']" class="btn" link="/zsjzInput">暂不开放</x-button>
      </div>
      <p class="text">指按有关规范要求，身体力行参加保护生物多样性、野生动物栖息地，修复退化或者受损土地自然生态功能的全部或者部分过程的劳动的尽责形式。</p>
      <!-- 说明文字 -->
      <p
        class="smText"
      >折算标准：繁育珍贵树种苗木5株，主动向管理部门报告需要救护的保护级别陆生野生动物情况，清理、拆除非法设置的毒饵、猎夹、猎套等非法猎捕工具1个（件、套），林中悬挂人工鸟巢1个，完成其中一项折算1株植树任务。参加野生动物栖息地修复，荒漠化防治、退耕还林（草）、退耕还湿、山体或者废弃地生态修复等劳动半个工作日，折算完成3株植树任务。</p>
      <!-- 标题 -->
      <div class="title">
        <h3>5.认种认养</h3>
        <x-button :gradients="['#999', '#999']" class="btn" link="/zsjzInput">暂不开放</x-button>
      </div>
      <p class="text">指通过直接投工投劳或者捐资代劳，在指定地点新建乔、灌、草植被，或者对指定乔、灌、草植被进行冠名或者非冠名养护的尽责形式。</p>
      <!-- 说明文字 -->
      <p
        class="smText"
      >折算标准：认建城市绿地或者屋顶、墙体等立体绿化1平方米；认养其它乔灌木3株（丛），认养密植灌木、绿篱、草坪10平方米，完成其中一项折算1株植树任务。认养和保护古树名木1株，折算完成3株植树任务。</p>
      <!-- 标题 -->
      <div class="title">
        <h3>6.基础设施</h3>
        <x-button :gradients="['#999', '#999']" class="btn" link="/zsjzInput">暂不开放</x-button>
      </div>
      <p class="text">指在技术人员指导下，修建森林作业道、森林防火带、森林公园步道，绿地灌溉（排涝）渠道，以及各类绿地游憩、服务、管理设施等全部或者部分过程的劳动的尽责形式。</p>
      <!-- 说明文字 -->
      <p
        class="smText"
      >折算标准：修建森林作业道，森林公园、湿地公园、沙漠公园步道5米（宽1米以上），森林防火带10平方米，参加修建绿化设施劳动半个工作日，完成其中一项折算3株植树任务。</p>
      <!-- 标题 -->
      <div class="title">
        <h3>7.志愿服务</h3>
        <x-button :gradients="['#999', '#999']" class="btn" link="/zsjzInput">暂不开放</x-button>
      </div>
      <p class="text">指自愿参加国土绿化公益宣传活动，或者按有关要求提供与国土绿化相关的普及推广、培训指导、公益活动组织管理等志愿服务的尽责形式。</p>
      <!-- 说明文字 -->
      <p
        class="smText"
      >折算标准：自愿参加宣传报道、信息化建设、科学或者法规普及、技术推广、教育培训、专业指导、国土绿化公益活动组织管理等半个工作日，折算完成3株植树任务。主动报告违反国土绿化法律法规行为或者初发林业灾情，折算完成3株植树任务。</p>
      <!-- 标题 -->
      <div class="title">
        <h3>8.其他</h3>
        <x-button :gradients="['#999', '#999']" class="btn" link="/zsjzInput">暂不开放</x-button>
      </div>
      <p class="text">指其他与国土绿化相关的劳动或者贡献，折算标准由省级绿化委员会结合当地实际，依法自行规定。</p>
      <!-- 按钮 -->
      <!-- <x-button :gradients="['#fda422', '#fda422']" style="margin-top: 10px;" link="/zsjzInput">捐资尽责</x-button> -->
      <!-- 备注 -->
      <div class="bzDiv">
        <p>
          <x-icon type="ios-information-outline" size="18" style="vertical-align:top;"></x-icon>当前仅开放捐资尽责通道，后续将陆续开放实体参与项目尽责
          形式申报，敬请关注。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { XButton } from "vux";
export default {
  components: {
    XButton,
  },
};
</script>

<style lang="less" scoped>
#jzDiv /deep/ .vux-x-icon {
  fill: #eaab4e;
}
.bgDiv {
  width: 100%;
  height: 150px;
  overflow: hidden;
  img {
    width: 100%;
  }
}
.phDiv {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 40px;
  img {
    width: 100%;
  }
}
.smDiv {
  margin-left: 15px;
  margin-right: 15px;
  .title {
    background-image: url(../img/title.png);
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    height: 30px;
    position: relative;
    .btn {
      position: absolute;
      top: 0;
      right: 0;
      width: 66px;
      height: 25px;
      font-size: 12px;
      padding: 0;
      margin: 0;
    }
    h3 {
      margin: auto;
      padding-left: 30px;
      color: #28ce84;
      font-weight: normal;
      font-size: 1em;
    }
  }
  .text {
    margin-top: 5px;
    font-size: 14px;
    color: #87b52f;
    font-weight: bold;
  }
  .smText {
    background-color: rgba(40, 206, 132, 0.1);
    padding: 10px 10px;
    font-size: 12px;
    border-radius: 8px;
  }
  .bzDiv {
    background-color: #feedd1;
    padding: 1px 10px;
    margin-top: 15px;
    margin-bottom: 15px;
    border-radius: 8px;
    color: #ecad50;
    font-size: 12px;
  }
}
</style>