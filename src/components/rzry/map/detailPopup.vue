<template>
  <!-- 显示框 -->
  <div v-transfer-dom>
    <popup v-model="show" class="transbox" style="max-height:300px">
      <div class="textDiv" v-for="(item,index) in prolist" :key="index">
        <div class="line1">
          <div class="pro_title">{{item.project_name}}</div>
          <div class="pro_type" v-if="item.type==1">认种</div>
          <div class="pro_type2" v-if="item.type==2">认养</div>
          
          <a v-if="item.ar_url" class="vr" :href="item.ar_url">
            <img src="../../img/XVR.png">
          </a>
          <a v-else class="vr">
            <img src="../../img/XVR.png">
          </a>
        </div>
        <div class="tree_info_box">
          <div class="tree_info_left">
            <span>树种：{{item.tree_name}}</span>
            <span>距离：{{item.km}}km</span>
          </div>
          <div class="tree_info_right">
            <div class="btn_xq" @click="topayinfo(item.id,0)">查看详情</div>
            <div class="btn_rz" @click="topayinfo(item.id,1)">立即认养</div>
          </div>
        </div>
         <div style="padding: 10px 0;clear: both;border-bottom: solid 1px #CCCCCC;">
          <x-progress :percent="((item.yrzs?item.yrzs:0)/item.project_scale) * 100" :show-cancel="false" style="width:100%"></x-progress>
          <p style="text-align: center;">
            已认养：
            <span style="color:#28ce84">{{(item.yrzs?item.yrzs:0)}}/{{item.project_scale}}</span>
            棵
          </p>
        </div>
        <!-- <x-button v-show="!projectShow" :gradients="['#28CE84', '#28CE84']" class="btn" link="/detailsRecord">查看详情</x-button>
        <x-button v-show="projectShow" :gradients="['#fda422', '#fda422']" class="btn" @click.native="xiangQing(projectData)">立即认种</x-button> -->
        <!-- <p style="float: left;">详细地址：{{xxdz}}</p>
        <div style="padding: 15px 0;clear: both;">
          <x-progress :percent="(snum / znum) * 100" :show-cancel="false" style="width:100%"></x-progress>
          <p style="text-align: center;">
            已认种：
            <span style="color:#28ce84">{{snum||0}}/{{znum}}</span>
            棵
          </p>
        </div> -->
      </div>
    </popup>
  </div>
</template>

<script>
/* eslint-disable */
import bus from "../../../assets/config/eventBus";
import { TransferDom, Popup, XProgress, XButton, trim } from "vux";
export default {
  directives: {
    TransferDom,
  },
  components: {
    Popup,
    XProgress,
    XButton,
    trim,
  },
  data() {
    return {
      show: false,
      projectShow:false,
      percent: undefined,
      xxdz:undefined,
      ssgy: undefined,
      dkbh: undefined,
      znum: undefined,
      snum: undefined,
      dklx: undefined,
      smlx:undefined,
      xmmc:undefined,
      VR: undefined,
      list:undefined,
      projectData:undefined,
      prolist:[],
    };
  },
  methods: {
    topayinfo(id,topay){
      console.log("天才");
      if(topay==1)
      {
        this.$router.push({path:"/apply",query:{projectItem:id,topay:1}});
      }else{
        this.$router.push({path:"/apply",query:{projectItem:id}});
      }
      
      //http://rzry.go577.net/#/apply?projectItem=19
    },
    /* vr跳转 */
    VRjump() {
      window.location.href = this.VR;
    },

    // async getToken(){
    //   const self = this;
    //   await this.$axios.get('/fapi/public/main/doLogintest?id=o3ttg1rWgdtcWyI2zHqKzXekf8zU&openid=o3ttg1rWgdtcWyI2zHqKzXekf8zU')
    //     .then(res=>{
    //       window.sessionStorage.setItem('token',res.data.wxscToken);
    //     });
    // },

    GetDistance(x,y) {
      const ponitX = x;
      const ponitY = y;
      for (let i = 0; i < this.prolist.length; i++) {
        const parkX = this.prolist[i].centerx;
        const parkY = this.prolist[i].centery;
        var radLat1 = (ponitY * Math.PI) / 180.0;
        var radLat2 = (parkY * Math.PI) / 180.0;
        var a = radLat1 - radLat2;
        var b = (ponitX * Math.PI) / 180.0 - (parkX * Math.PI) / 180.0;
        var s =
          2 *
          Math.asin(
            Math.sqrt(
              Math.pow(Math.sin(a / 2), 2) +
                Math.cos(radLat1) *
                  Math.cos(radLat2) *
                  Math.pow(Math.sin(b / 2), 2)
            )
          );
        s = s * 6378.137; //地球半径
        s = Math.round(s * 10000) / 10000;
        this.prolist[i].km = s.toFixed(2); //计算结果保留2位小数
      }
    },

    async getData(key,fn){
      const self = this;
      if (!!key){
        self.key = key;
      }else{
        self.key = '';
      }
      await self.$axios.post("/api/sys/yl/project/list", {
        "nowPage": self.pageNum,
        "pageSize": 10,
        "key":self.key
      }, {
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then(function (res) {
        if (res.data.code == -1){
          //self.getToken();
          window.location.href("/#/map")
          //self.getData()
        }else{
          self.list = res.data.datas;
          self.projectData = res.data.datas[0];
          if (self.projectData && self.projectData.pubstate =="1"){
            self.projectShow = true;
          }
        }
      });
    },


    async getprolist(key,type,x,y){
      const self = this;
      await self.$axios.post("/api/sys/yl/project/list", {
        "nowPage": self.pageNum,
        "pageSize": 10,
        "key":key
      }, {
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then(function (res) {
        if (res.data.code == -1){
          //self.getToken();
          window.location.href="/#/map"
          //self.getData()
        }else{
          self.prolist = res.data.datas;
          self.projectData = res.data.datas[0];
          if (type =="1"){
            self.prolist = self.prolist.filter(function(item){
              return item.pubstate=="1";
            })
            self.prolist = self.prolist.filter(function(item){
              return (item.project_scale-(item.yrzs?item.yrzs:0))>0
            })
          }
          self.GetDistance(x,y);
          self.show = true;
        }
      });
    },

    // async getProjectlist(data,type,x,y)
    // {
    //     const that = this;
    //     await that.getprolist(data,type,x,y);
        
    // },

    async getProjectDetail(data){
      if (data) {
        const that = this;
        await that.getData(data.NAME);
        if (that.prolist && that.prolist.length){
          // debugger
          that.show = true;
          const item = that.list[0]
          that.ssgy = data.NAME; //所属公园
          that.xmmc = item.project_name;
          that.smlx = item.tree_name; //树木类型
          that.xxdz = data.ADDRESS;
          that.znum = item.project_scale; //总树木
          that.snum = item.yrzs; //剩余树木
          that.VR = item.ar_url; //vr
          // that.VR = "https://720yun.com/t/aabjvpuktv6";
          // that.percent = (trim(that.snum) / trim(that.znum)) * 100; //进度条
        }else {
          that.$vux.toast.text("所选区域暂无发布的项目")
        }
        // that.show = true;

        //console.log(date);
      }
    },

    xiangQing(project){
      this.$router.push({path:"/applyInput",query:{projectItem:project}}); //跳转树详情
    }
  },
  mounted() {
    /* vr跳转 */
    var that = this;
    bus.$on("userDefinedEvent", function (data) {
        that.getProjectDetail(data);
    });
    bus.$on("FindProject", function (data,type,x,y) {
        that.getprolist(data,type,x,y);
    });
  },
};
</script>
<style lang="less" scoped>
.textDiv /deep/ .weui-progress__bar {
  height: 10px;
  background-color: #e1e1e1;
  border-radius: 8px;
}
.textDiv /deep/ .weui-progress__inner-bar {
  border-radius: 8px;
}
.transbox{
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
.textDiv {
  padding: 5px 15px;
  height:150px;
  .tree_info_box{
    overflow: hidden;
    padding:5px 0px;
    .tree_info_left{
      float: left;
      overflow: hidden;
      span{
        display: block;
        line-height:25px;
        font-size:12px;
        color:#666;
      }
    }

    .tree_info_right{
      float:right;
      overflow: hidden;
      
      .btn_xq{
        float: left;
        width:80px;
        height:20px;
        overflow: hidden;
        background-color:#28CE84;
        font-size:12px;
        line-height:20px;
        color:#fff;
        border-radius: 25px;
        text-align: center;
      }
      .btn_rz{
        float: left;
        width:80px;
        height:20px;
        overflow: hidden;
        background-color:#FDA422;
        font-size:12px;
        line-height:20px;
        color:#fff;
        border-radius: 25px;
        text-align: center;
        margin-left:15px;
      }
    }
  }

  .vr {
    display:block;
    float:right;
    width:20px;
    height:20px;
    
    img {
      display: block;
      width:100%;
      // width: 17px;
      // vertical-align: middle;
    }
  }
  .btn {
    width: 81px;
    position: absolute;
    top: 10px;
    right: 10px;
    height: 28px;
    font-size: 12px;
  }
  .line1 {
    margin: 0;
    margin-top: 10px;
    position: relative;
    background:url(../../img/line2.png) left center no-repeat;
    background-size: 2px 10px;
    padding-left:10px;
    color:#666;
    overflow: hidden;
    .pro_title{
      float: left;
    }

    .pro_type{
      float: left;
      width: 38px;
      height: 16px;
      border:solid 1px #5396F0;
      border-radius:2px;
      text-align: center;
      font-size: 12px;
      color:#5396F0;
      margin-left:20px;
    }

    .pro_type2{
      float: left;
      width: 38px;
      height: 16px;
      border:solid 1px #FD8122;
      border-radius:2px;
      text-align: center;
      font-size: 12px;
      color:#FD8122;
      margin-left:20px;
    }
  }
  p {
    margin: 0;
    margin-top: 5px;
    color:#28CE84;
    font-size: 12px;
  }
}
</style>
