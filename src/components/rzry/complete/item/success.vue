<template>
  <div id="success">
    <img src="../../../img/gmcg.png" />
    <p>恭喜您</p>
    <div style="text-align:center">
      <span>您是第</span>
      <span style="font-weight:bold;color:#fda421;font-size:25px;">{{`${projectData1.yrzs+1}`}}</span>
      <span>位认养成功的绿化爱好者</span>
    </div>

    <x-button
      class="btn"
      style="margin-top: 20%;"
      :gradients="['#28ce84', '#28ce84']"
      link="/myRzry"
    >返回我的认种认养</x-button>
    <x-button class="btn" :gradients="['#fca422', '#fca422']" @click.native="showGYP">分享至朋友圈</x-button>
    <div style="background:rgba(0,0,0,0.6);position: fixed;left:0;top:0;height:100%;width:100%;z-index:9999;"
         v-if="showImage" @click="showImage=false">
      <img src="@/components/img/share.png" style="width:100%" alt="">
    </div>
    <!-- 弹框 -->
    <rzrypop></rzrypop>
  </div>
</template>

<script>
import bus from "../../../../assets/config/eventBus";
import { XButton } from "vux";
import rzrypop from "@/components/personal/rzryPop/rzrypop";
import wx from "weixin-js-sdk";
import {url} from "../../../../assets/config/config";

export default {
  components: {
    XButton,
    rzrypop,
  },
  data() {
    return {
      gypShow: true,
      showImage:false,
      projectData: {
        yrzs:0
      },
      projectData1: {
        yrzs:0
      },
    };
  },
  methods: {
    showGYP() {
      this.showImage = true;
    },
    // async getToken(){
    //   const self = this;
    //   await this.$axios.get('/fapi/public/main/doLogintest?id=o3ttg1rWgdtcWyI2zHqKzXekf8zU&openid=o3ttg1rWgdtcWyI2zHqKzXekf8zU')
    //     .then(res=>{
    //       window.sessionStorage.setItem('token',res.data.wxscToken);
    //     });
    // },
    async getdata(){
      const self = this;
      await self.$axios.post("/api/sys/yl/project/list", {
        "nowPage": 1,
        "pageSize": 10,
        "key":"",
        "bean":{"project_name":self.projectData.project_name}
      }, {
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then(function (res) {
        // debugger
        if (res.data.code == -1){
          //self.getToken();
          self.getdata()
        }else{
          const length = res.data.datas.length;

          if (length>0){
            self.projectData1 = res.data.datas[0];
          }
        }
      });
    }
  },
  mounted() {
    this.projectData = this.$route.query.projectItem;
    this.orderid = this.$route.query.orderid;
    this.getdata();
  }
};
</script>

<style lang="less" scoped>
#success {
  margin-left: 15px;
  margin-right: 15px;
  img {
    width: 50%;
    margin: auto;
    display: block;
  }
  p {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #009470;
    margin: 10px 0;
  }
  span {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #009470;
    margin: 10px 0;
  }
  .btn {
    /*  margin-top: 20%; */
  }
}
</style>
