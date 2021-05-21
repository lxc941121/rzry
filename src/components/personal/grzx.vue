<template>
  <view-box ref="viewBox" body-padding-top="0px" class="wxsc-idx">
    <!--头像昵称-->
    <div class="y-personal-head">
      <img src="@/components/img/my-bg.jpg" alt="" style="width: 100%;">
      <div class="y-head-img">
        <img v-if="yuser.headpic" :src="yuser.headpic"
             style="width: 100px;position: absolute;bottom:-50px;left:50%;margin-left:-50px;border-radius: 50%;" alt="">
        <img v-else src="@/components/img/headpic.png"
             style="width: 100px;position: absolute;bottom:-50px;left:50%;margin-left:-50px;border-radius: 50%;" alt="">
      </div>
    </div>
    <h3 style="text-align: center;margin-bottom: 10px;">{{yuser.nickname}}</h3>
    <!-- 信息 -->
    <div style="background: #f4f4f4">
      <div style="height:15px;"></div>
      <!-- 列表按钮 -->
      <div class="weui-cells" style="margin-top:0;">
        <a class="weui-cell weui-cell_access">
          <div class="weui-cell__hd">

          </div>
          <div class="weui-cell__bd">
            <p>我的领养</p>
          </div>
          <div class="weui-cell__ft"></div>
        </a>

      </div>
    </div>

  </view-box>
</template>
<script>
  import {ViewBox} from 'vux';

  export default {
    components: {
      ViewBox
    },
    data() {
      return {
        yuser: {}
      }
    },
    methods: {
      init() {
        const self = this;

      }
    },
    mounted() {
      // this.init();
    }
  }
</script>
