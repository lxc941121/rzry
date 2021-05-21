<template>
  <div id="parkDetails">
    <!-- 列表 -->
    <grid :cols="2" :show-vertical-dividers="false" :show-lr-borders="false">
      <grid-item v-for="(i,index) in projectData" :key="index">
        <div class="gridList" @click="rzryInput()">
          <!-- 图片 -->
          <div class="imgDiv">
            <!-- 序号 -->
            <div class="xhnum">
              <span>{{index+1}}</span>
            </div>
            <img :src="i.project_cover"/>
          </div>
          <!-- 进度条 -->
          <div class="jd">
            <p>{{i.tree_name}}：</p>
            <div class="progressDiv">
              <x-progress :percent="(i.yrzs / i.project_scale) * 100" :show-cancel="false"></x-progress>
              <p>{{i.yrzs}}/{{i.project_scale}}</p>
            </div>
          </div>
          <div class="jiage">
            <p>￥{{onePrice}}/株</p>
            <x-button :gradients="['#fda422', '#fda422']" class="btn">立即认种</x-button>
          </div>
        </div>
      </grid-item>
    </grid>
  </div>
</template>

<script>
import {
  Grid,
  GridItem,
  Previewer,
  TransferDom,
  XProgress,
  XButton,
} from "vux";
export default {
  directives: {
    TransferDom,
  },
  components: {
    Grid,
    GridItem,
    Previewer,
    XProgress,
    XButton,
  },
  data() {
    return {
      IMGlist: [
        {
          id: 1,
          src: require("@/components/img/mac.jpg"),
        },
      ],
      treelist: [
        {
          id: 1,
          name: "榕树",
          src: require("@/components/img/rs1.jpg"),
          num: "2000",
          lastNum: "110",
          money: 200,
        },
        {
          id: 2,
          name: "樟树",
          src: require("@/components/img/zs.png"),
          num: "1000",
          lastNum: "120",
          money: 199,
        },
        {
          id: 3,
          name: "喜树",
          src: require("@/components/img/xis.png"),
          num: "800",
          lastNum: "80",
          money: 150,
        },
        {
          id: 4,
          name: "合欢树",
          src: require("@/components/img/hhs.png"),
          num: "200",
          lastNum: "150",
          money: 120,
        },
      ],
      projectData:[],
      onePrice:"",
    };
  },
  methods: {
    previewImage(e) {
      if (e.target.nodeName == "IMG") {
        let url = e.target.currentSrc;
        let item = {
          src: url,
        };
        this.IMGlist.length = 0;
        this.IMGlist.push(item);
        this.$refs.previewer.show(0);
      } else {
        return;
      }
    },

    rzryInput() {
      this.$parent.fatherjump(); //跳下单界面
    },
    init(){
      this.projectData = [];
    },
    async getTreeDetail(){
      const self = this;
      await self.$axios.post("/api/sys/yl/tree/list", {
        "key":self.projectData.tree_name
      }, {
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then( res =>{
        // debugger
        const tree = res.data.datas[0];
        self.$nextTick(()=>{
          self.onePrice = tree.tree_price;
        })
      })
    },
  },
  mounted() {
    const that = this;
    that.init();

    that.$axios.post("/api/sys/yl/project/info?id="+this.$route.query.projectItem,"",{
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then( res =>{
        // debugger
        this.$nextTick(()=>{
         that.projectData.push(res.data.formItem);
         that.getTreeDetail();
         console.log("temp11",that.projectData)
        })
      })   
  }
};
</script>
<style lang="less" scoped>
#parkDetails /deep/ .weui-grids:before {
  border-top: none;
}
#parkDetails /deep/ .weui-grid {
  padding: 10px 10px;
}
#parkDetails /deep/ .weui-grid:after {
  border-bottom: none;
}
#parkDetails /deep/ a:-webkit-any-link {
  text-decoration: none;
}
#parkDetails /deep/ .weui-progress__bar {
  height: 10px;
  border-radius: 10px;
  background-color: #e1e1e1;
}
#parkDetails /deep/ .weui-progress__inner-bar {
  border-radius: 10px;
  background-color: #15ae6b;
}
#parkDetails {
  .gridList {
    width: 100%;
    height: 250px;
    border: 1px solid #28ce84;
    background-color: #28ce84;
    position: relative;
    .progressDiv {
      position: absolute;
      bottom: 8px;
      right: 5px;
      width: 55%;
      p {
        position: absolute;
        bottom: -5px;
        width: 100%;
        text-align: center;
        font-size: 10px;
        color: #000;
      }
    }
    .imgDiv {
      width: 100%;
      height: 190px;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
      }
      .xhnum {
        position: absolute;
        width: 0px;
        height: 0;
        border: 17px solid transparent;
        border-top-color: #28ce84;
        border-left-color: #28ce84;
        span {
          position: absolute;
          top: -15px;
          left: -12px;
          color: #fff;
          font-size: 14px;
        }
      }
    }
    p {
      margin: 0;
      color: #15ae6b;
      font-size: 14px;
      padding: 2px 6px;
    }
    .jd {
      width: 100%;
      height: 25px;
      background-color: #f5f5f5;
      position: relative;
    }
    .jiage {
      height: 35px;
      background-color: #fff;
      padding: 0px 5px;
      line-height: 32px;
      p {
        float: left;
        font-size: 14px;
        font-weight: bold;
        color: #fda422;
      }
      .btn {
        width: 55px;
        font-size: 12px;
        margin: 4px 1px;
        padding: 0px 0px;
        float: right;
        border-radius: 20px;
      }
    }
  }
}
</style>
