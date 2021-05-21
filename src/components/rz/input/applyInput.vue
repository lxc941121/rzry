<template>
  <div id="applyInput">
    <!-- 图片 -->
    <div class="imgDiv">
      <img :src="require('../../img/rs1.jpg')" />
      <!-- 标题 -->
      <div class="money">
        <h3>{{`￥${onePrice}`}}</h3>
        <span style="padding-top: 1%;padding-left: 8vh">认种倒计时：</span>
        <timeTool :endTime='endTime'></timeTool>
<!--        <timeTool :endTime='endTime'></timeTool>-->
<!--        <CountDown :endHours="24" class="time"></CountDown>-->
      </div>

    </div>
    <!-- 简介 -->
    <group>
      <cell
        title="树木介绍"
        is-link
        :arrow-direction="!showDetail ? 'up' : 'down'"
        @click.native="showDetail = !showDetail"
        style="color: #009470;font-size:16px"
        :style="{padding:'0 15px',height:'5vh'}"
      >
      </cell>
      <div class="treeDh" :class="!showDetail?'treeDetail':''">
        <p class="textDetails"
        >{{tree.tree_describe}}</p>
      </div>
    </group>
    <!-- 价格明细 -->
    <group>
      <cell
        title="价格明细"
        is-link
        :arrow-direction="showMX ? 'up' : 'down'"
        @click.native="showMX = !showMX"
        style="color: #009470;font-size:16px"
      >
      </cell>
      <div class="dh" :class="showMX?'animate':''">
        <div class="tableDiv" >
          <x-table :full-bordered="false" :content-bordered="false" :cell-bordered="false">
            <tbody>
            <tr>
              <th>树苗价格：</th>
              <td>{{`${tree.sapling_price}元/株`}}</td>
            </tr>
            <tr>
              <th>种植费用：</th>
              <td>{{`${tree.tree_plant_price}元/株`}}</td>
            </tr>
            <tr>
              <th>养护费用：</th>
              <td>{{`${tree.tree_curing_price}元/株`}}</td>
            </tr>
            <tr>
              <th>公益牌制作费：</th>
              <td>50元/个</td>
            </tr>
            <tr>
              <th>认种时间：</th>
              <td>2年</td>
            </tr>
            <tr>
              <th>可获取绿色能量：</th>
              <td>{{`${tree.tree_price}/株`}}</td>
            </tr>
            </tbody>
          </x-table>
          <!-- 说明 -->
          <!--          <div class="smDiv">-->
          <!--            <p>-->
          <!--              <x-icon type="ios-information-outline" size="20" style="vertical-align: bottom;"></x-icon>树木的成长栽植初期的种植和养护非常关键，为确保认种树木的存活率，所有认种人需承诺至少认种认养2年，详细信息可查看《认种认养条款》-->
          <!--            </p>-->
          <!--          </div>-->
        </div>
      </div>
    </group>
    <!-- 标题 -->
    <div class="title" style="margin-top: 15px;">
      <img :src="require('../../img/xqx.png')" style="left: 10px;" />
      <h3>填写信息</h3>
      <img :src="require('../../img/xqx.png')" class="imgborder" />
    </div>
    <!-- 表单 -->
    <div class="applyInput">
      <x-table :full-bordered="false" :content-bordered="false" :cell-bordered="false">
        <tbody>
          <tr>
            <th>人员</th>
            <td>
              <checker
                v-model="chark"
                default-item-class="item"
                selected-item-class="item-selected"
                style="text-align: left;margin-left: 15px;"
              >
                <checker-item value="1">个人</checker-item>
                <checker-item value="2">团队</checker-item>
              </checker>
            </td>
          </tr>
          <tr>
            <th>名称</th>
            <td>
              <x-input
                type="text"
                placeholder="请输入您的个人姓名/团队名"
                v-model=name
                :show-clear="false"
                :required="true"
              ></x-input>
            </td>
          </tr>
          <tr>
            <th>电话号码</th>
            <td>
              <x-input
                type="text"
                placeholder="请输入您的联系电话"
                :show-clear="false"
                :required="true"
                is-type="china-mobile"
                v-model=phone
              ></x-input>
            </td>
          </tr>
          <tr>
            <th>种植现场</th>
            <td>
              <checker
                v-model="cychark"
                default-item-class="item"
                selected-item-class="item-selected"
                style="text-align: left;margin-left: 15px;"
              >
                <checker-item value="1">参与</checker-item>
                <checker-item value="2">不参与</checker-item>
              </checker>
            </td>
          </tr>
          <tr>
            <th>认种数量</th>
            <td style="text-align: left;">
              <inline-x-number
                style="margin-left:15px;vertical-align: inherit;"
                :min="1"
                :max="projectData.max_purchase_count"
                v-model=choseNum
                width="30px"
                @on-change="sub(choseNum)"
              ></inline-x-number>
            </td>
          </tr>
          <tr>
            <th>种养寄语</th>
            <td>
              <x-textarea
                :max="30"
                :autosize="true"
                placeholder="请输入5-30字个性寄语，个性寄语会打印在公益牌上，并悬挂在认种认养树木上,如认种多棵树可输入多条寄语，以“;”分隔"
                v-model=wish
                :show-clear="false"
                :style="{'line-height':'30px'}"
              ></x-textarea>
            </td>
          </tr>
        </tbody>
      </x-table>
      <!-- 阅读条款 -->
      <p style="text-align: center;margin-bottom: 50px;position: relative;bottom: 4vh">
        <check-icon :value.sync="check" type="plain" style="font-size: 12px;">我已阅读并同意</check-icon>
        <a style="color:#9fc25c" @click="rztk">《认种认养条款》</a>
      </p>
    </div>
    <div style="position:relative;bottom: 13vh">
      <p style="position:relative;bottom: -2vh;text-align: center">客服热线：0577-88368820</p>
      <div class="nextBtn" >
        <!-- 合计 -->
        <p class="heji">{{`合计费用：￥${money}`}}</p>
        <x-button class="btn" :gradients="['#fda422', '#fda422']" @click.native="pay">支付</x-button>
      </div>

    </div>
    <agreement ref="agreement"></agreement>

  </div>
</template>
<script>
import CountDown from "../../rzry/item/CountDown";
import agreement from "../../rzry/item/agreement"
import wx from "weixin-js-sdk";
import timeTool from "../../rzry/item/timeTool";
import * as formatDate from "@/assets/formatDate.js"
import {
  Cell,
  Scroller,
  Group,
  Flexbox,
  FlexboxItem,
  XTable,
  XInput,
  Selector,
  CheckIcon,
  XButton,
  Checker,
  CheckerItem,
  InlineXNumber,
  XTextarea,
} from "vux";
import * as WeixinJSBridge from "q";
export default {
  components: {
    timeTool,
    Group,
    Scroller,
    agreement,
    Flexbox,
    FlexboxItem,
    XTable,
    XInput,
    Selector,
    CheckIcon,
    XButton,
    Checker,
    CheckerItem,
    InlineXNumber,
    CountDown,
    XTextarea,
    Cell,
  },
  data() {
    return {
      endTime:"2020-12-30 9:51:00",
      showDetail:true,
      check: false,
      showMX:false,
      defaultValue: "gr",
      xcValue: "bcy",
      slValue: "1",
      chark: "1",
      cychark: "2",
      sl: [
        { key: "1", value: "1棵" },
        { key: "2", value: "2棵" },
        { key: "3", value: "3棵" },
        { key: "4", value: "4棵" },
        { key: "5", value: "5棵" },
      ],
      choseNum:1,
      money:330,
      onePrice:330,
      projectData :{},
      name:'嘉',
      wish:'',
      tree:{},
      list:{},
      phone:"15111111111",
      number:0,
    };
  },
  methods:{
    sub(num){
      const self = this;
      self.money = num * self.onePrice;
      console.log(self.money);
    },
    getData(){
      const that = this;
      this.$axios.post("/api/sys/yl/project/info?id="+this.$route.query.projectItem,"",{
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then( res =>{
        // debugger
        this.$nextTick(()=>{
          console.log("调用结果：",res.data.formItem)
          this.projectData = res.data.formItem;
        })
      })
    },
    getEndTime(){
      const that = this;
      this.endTime = this.formatDate(that.projectData.funding_deadline)
      
    },
    formatDate(time) {
      let date = new Date(time)
      var year = date.getFullYear();
      var month = date.getMonth()<9?"0"+(date.getMonth()+1):(date.getMonth()+1);
      var day = date.getDate()<10?"0"+date.getDate():date.getDate();
      var hour = date.getHours()<10?"0"+date.getHours():date.getHours();
      var minuter = date.getMinutes()<10?"0"+ date.getMinutes():date.getMinutes();
      var second = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
      var tm = year+"-"+month+"-"+day+" "+hour+":"+minuter;
      return tm;
    },
    rztk(){
      const that = this;
      that.$refs.agreement.show = true;
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
        self.tree = res.data.datas[0];
        self.onePrice = self.tree.tree_price;
        self.sub(1);
      })
    },
    async getToken(){
      const self = this;
      await this.$axios.get('/fapi/public/main/doLogintest?id=o3ttg1rWgdtcWyI2zHqKzXekf8zU&openid=o3ttg1rWgdtcWyI2zHqKzXekf8zU')
        .then(res=>{
          window.sessionStorage.setItem('token',res.data.wxscToken);
        });
    },
    async pay(){
      const self = this;

      if (self.name=="" || self.phone==""){
        self.$vux.toast.text('必填项目不能为空~')
        return
      }
      if (!self.check){
        self.$vux.toast.text("请先阅读认种认养条款")
        return
      }
      // if (self.projectData.pubstate=='1'){
      await self.$axios.post("/api/sys/yl/order/unifiedOrderWithJsApi", {
        project_num:Number(self.projectData.id),
        description:self.projectData.tree_name,
        amount:Number(1),
        currency:'CNY',
        registered_name:self.name,
        wishes:self.wish,
        unit_price:Number(1),
        quantity:Number(self.choseNum),
        attending_flg:Number(self.cychark),
      },{
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then(function (res) {
        self.number++;
        if (res.data.msg.indexOf("量不足")!=-1){
          self.$vux.toast.text(res.data.msg)
          return
        }
        if (res.data.code == 100) {
          const tp = JSON.parse(res.data.msg).JsParams;
          const out_trade_no = JSON.parse(res.data.msg).out_trade_no;
          // const temp = that.test.JsParams;
          const a = tp.split('(')[1].split(')')[0].split(', ');
          const list = {};
          list.appId = a[0].split('=')[1];
          list.timeStamp = a[1].split('=')[1];
          list.nonceStr = a[2].split('=')[1];
          list.packageStr = a[3].split('packageStr=')[1];
          list.signType = a[4].split('=')[1];
          list.paySign = a[5].split('=')[1];
          self.list = list;
          wx.ready(function(){
            wx.chooseWXPay({
              appId:self.list.appId,
              timestamp: self.list.timeStamp,
              nonceStr: self.list.nonceStr,
              package: self.list.packageStr,
              signType:self.list.signType,
              paySign:self.list.paySign,
              // 支付成功后的回调函数
              success: function (res) {
                console.log(res)
                // res.errMsg === 'chooseWXPay:ok'方式判断前端返回,微信团队郑重提示：
                // res.errMsg将在用户支付成功后返回ok，但并不保证它绝对可靠， 切记。
                if (res.errMsg === 'chooseWXPay:ok') {
                  console.log("支付成功")
                  self.$router.push({path:"/complete",query:{projectItem:self.projectData}});
                }
              },
              // 支付取消回调函数
              cencel: function (res) {
                self.$vux.toast.text('取消支付')
              },
              // 支付失败回调函数
              fail: function (res) {
                self.$axios.post(`/api/sys/yl/order/orderQuery?outTradeNo=${out_trade_no}`, {
                  "outTradeNo":`${out_trade_no}`
                },{
                  headers: {
                    "token":  window.sessionStorage.getItem("token")
                  }
                }).then(function (res) {
                  // console.log('订单编号',out_trade_no)
                  self.$vux.toast.text(res.data.msg)
                  self.$router.push({path:"/complete",query:{projectItem:self.projectData}});
                });

              }
            })
          })
        }else {
          //token 过期
          console.log(res)
          if (res.data.msg.indexOf("未登录")!=-1){
            self.$vux.toast.text("支付失败，长时间操作，请重新选择项目下单")
            window.sessionStorage.removeItem("person")
            setTimeout(()=>{
              self.$router.push("/map")
            },2000)
          }
        if (res.data.msg.indexOf("出错了")!=-1){
          console.log(self.number)
          if (self.number>3){
            self.$vux.toast.text('支付失败，请重新选择项目下单')
            window.sessionStorage.removeItem("person")
            setTimeout(()=>{
              self.$router.push("/map")
            },2000)
          }else {
            self.$vux.toast.text('支付失败，请检查填写的信息')
          }

        }

        }
      });
      // }else {
      //   self.$vux.toast.text('该商品暂无法下单~')
      // }
    },
    init(){
      // debugger
      const str = window.sessionStorage.getItem("person");
      const person = JSON.parse(str);
      this.name = person.nickname;
    }
  },
  mounted() {
    const that = this;
    that.choseNum = 1;
    that.init();
    that.$utils.wxgetsign(that, wx); //获取wx.config
    wx.ready(function () {
      //that.getData();
      that.$axios.post("/api/sys/yl/project/info?id="+that.$route.query.projectItem,"",{
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then( res =>{
        // debugger
        that.$nextTick(()=>{
          console.log("调用结果111：",res.data.formItem)
          that.projectData = res.data.formItem;
           that.getTreeDetail();
           that.getEndTime();
           console.log("1111",that.projectData)
        })
      })
     

    });
  },

};
</script>

<style lang="less" scoped>
@import "../../../assets/config/common.css";
#applyInput /deep/ .vux-x-icon {
  fill: #fda422;
}
.treeDh{
  max-height: 50px;
  overflow: hidden;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
}
.treeDetail{
  /*display: -webkit-box;*/
  /*-webkit-box-orient: vertical;*/
  /*-webkit-line-clamp: 3;*/
  /*overflow: hidden;*/
  max-height: 99999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
.dh{
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
}
.animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
#applyInput {
  .smDiv {
    background-color: #feedd1;
    padding: 1px 10px;
    border-radius: 8px;
    color: #fda422;
  }
  .imgDiv {
    width: 100%;
    height: 150px;
    overflow: hidden;
    position: relative;
    img {
      width: 100%;
      margin: 0;
    }
    h3 {
      background-color: #fda422;
      width: 70px;
      margin: 0;
      height: 30px;
      text-align: center;
      line-height: 30px;
      float: left;
    }
    .money {
      position: absolute;
      bottom: 0;
      color: #fff;
      width: 100%;
      height: 30px;
      background-color: #28ce84;
      text-align: right;
      display: flex;
      p {
        margin: 0;
        line-height: 30px;
        padding-right: 10px;
      }
      .time {
        display: inline;
        line-height: 30px;
      }
    }
  }
  .textDetails {
    padding-left: 10px;
    padding-right: 10px;

  }
  .title {
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
    position: relative;
    h3 {
      margin: 0;
      font-size: 16px;
    }
    img {
      width: 30%;
      position: absolute;
      top: 5px;
    }
    .imgborder {
      right: 10px;
      transform: rotate(180deg);
      -ms-transform: rotate(180deg); /* Internet Explorer */
      -moz-transform: rotate(180deg); /* Firefox */
      -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
      -o-transform: rotate(180deg); /* Opera */
    }
  }
  .tableDiv {

    margin-left: 15px;
    margin-right: 15px;
    font-size: 14px;
    th {
      width: 50%;
      text-align: right;
      color: #289b7a;
    }
    td {
      width: 50%;
      text-align: left;
      color: #dfaa59;
    }
  }
  .heji {
    margin-left: 15px;
    width: 160px;
    color: #fda422;
    padding: 9px 10px;
    font-weight: bold;
    margin-top: 10px;
    float: left;
    font-size: 16px;
  }
  .applyInput {
    // border: 1px solid #76b198;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 6px;
    padding: 10px 10px;
    margin-bottom: 15px;
    table {
      color: #16a57b;
      th {
        width: 25%;
        text-align: right;
      }
      td {
        width: 75%;
      }
    }
  }
  .nextBtn {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    border-top: 1px solid #ddd;
    z-index: 10;
    .btn {
      width: 80px;
      float: right;
      margin-right: 10px;
      margin-bottom: 10px;
      margin-top: 10px;
      border-radius: 25px;
    }
  }
  .item {
    border: 1px solid #ececec;
    padding: 0px 15px;
  }
  .item-selected {
    border: 2px solid #09ab7c;
  }
}
</style>
