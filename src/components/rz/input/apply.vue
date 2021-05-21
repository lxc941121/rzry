<style>
  .weui-input{box-sizing: border-box;height:35px !important;font-size:14px !important;background-color:#F5F5F5 !important;border-radius:5px;padding:7px;color:#000 !important }
  .weui-icon-success,.weui-icon-success-circle{font-size:16px !important;}
  .weui-icon-circle{font-size: 16px !important;}
  .vux-number-input{font-size:14px !important;}
  .weui-textarea{background-color: #F5F5F5;padding:7px;box-sizing: border-box;border-radius:5px;height:110px;;}
   .vux-x-icon {
    fill: #fda422;
  }
  .weui-textarea-counter{font-size:12px;}
  .vux-check-icon > span{font-size:12px !important;color:#999 !important}
</style>
<template>
  <div id="apply" v-if="finish">
    <div class="nav">
      <div class="nav_item" ><a :class="acttype==1?'active':''" @click="goAnchor('#proinfo',1)" >项目介绍</a></div>
      <div class="nav_item"><a :class="acttype==2?'active':''" @click="goAnchor('#treeinfo',2)">树种介绍</a></div>
      <div class="nav_item"><a :class="acttype==3?'active':''" @click="goAnchor('#priceinfo',3)">价格明细</a></div>
    </div>
    <div class="blank"></div>
    <div class="projectinfo" id="proinfo">
      <div class="infobox">
        <div class="proimg">
            <div class="imgbox">
              <img @click="lookZs(projectData.project_cover)" :src="projectData.project_cover" />
            </div>
            <div class="proname">{{projectData.project_name}}</div>
        </div>
        <div class="proinfobox">
          <div class="infoitem">
            <div class="tl">项目名称:</div>
            <div class="infotxt">{{projectData.project_name}}</div>
          </div>
          <div class="infoitem">
            <div class="tl">项目树种:</div>
            <div class="infotxt">{{projectData.tree_name}}</div>
          </div>
          <div class="infoitem">
            <div class="tl">树木总量:</div>
            <div class="infotxt">{{projectData.project_scale}}株</div>
          </div>
          <div class="infoitem">
            <div class="tl">报名截止日期:</div>
            <div class="infotxt">{{formatDate(projectData.funding_deadline,0)}}</div>
          </div>
          <div class="infoitem">
            <div class="tl">认种认养单价:</div>
            <div class="infotxt">{{tree.tree_price}}元</div>
          </div>
        </div>
      </div>
      <img class="contentpic" :src="projectData.project_text" />
    </div>
    <div class="projectinfo" id="treeinfo">
      <img class="contentpic" :src="projectData.tree_text" />
    </div>
    <div class="projectinfo" id="priceinfo">

      <div class="infobox2">
        <div class="infoitem">
          <span class="tl">树苗价格（含运费、税费等）：</span>
          <span class="infotxt">{{tree.sapling_price}}元/株</span>
        </div>
        <div class="infoitem">
          <span class="tl">种植费用（含运费、施基肥等）：</span>
          <span class="infotxt">{{tree.tree_plant_price}}元/株</span>
        </div>
        <div class="infoitem">
          <span class="tl">养护费用（含运费、施肥、淋水等）：</span>
          <span class="infotxt">{{tree.tree_curing_price}}元/株</span>
        </div>
        <div class="infoitem">
          <span class="tl">认种认养时间：</span>
          <span class="infotxt">{{tree.maintain_years}}年</span>
        </div>
      </div>
      <img class="contentpic" :src="projectData.price_text" />
    </div>
    <div class="btblank"></div>
    <div class="paybox">
      <div class="kf" @click="linkto()">
        <svg class="icon" style="width:30px;color:#28CE84;display:block" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7005">
          <path d="M175.38 541.16c-12.01 0-21.97-9.49-22.45-21.6-0.19-4.75-0.36-9.52-0.36-14.32 0-198.32 161.35-359.67 359.67-359.67 124.8 0 238.88 63.3 305.15 169.34 6.57 10.53 3.38 24.39-7.16 30.98-10.5 6.6-24.38 3.38-30.98-7.16-58-92.79-157.82-148.2-267.02-148.2-173.54 0-314.71 141.18-314.71 314.71 0 4.21 0.15 8.39 0.32 12.57 0.49 12.4-9.17 22.85-21.58 23.34-0.29 0.01-0.59 0.01-0.88 0.01zM512.24 864.91c-124.81 0-238.89-63.31-305.15-169.35a22.465 22.465 0 0 1-0.55-22.89c3.97-7.1 11.48-11.5 19.61-11.5 1.15-0.03 2.81 0.01 4.23 0.01 84.96 0 198.66-20.04 312.88-55.22 116.01-35.74 222.82-84.09 293.04-132.66 6.75-4.66 15.5-5.31 22.83-1.62 7.33 3.67 12.1 11.03 12.41 19.23 0.19 4.75 0.36 9.53 0.36 14.34 0.01 198.3-161.34 359.66-359.66 359.66z m-243.2-159.95c59.45 72.64 147.74 114.99 243.2 114.99 164.01 0 299.13-126.12 313.46-286.47-71.73 42.93-167.26 84.03-269.2 115.44-101.95 31.4-204.04 51.17-287.46 56.04z" fill="#28CE84" p-id="1461"></path>
          <path d="M226.15 706.12h-0.16c-114-0.87-148.51-35.41-157.39-64.23-8.88-28.85 0.22-76.83 94-141.69 6.74-4.68 15.49-5.3 22.83-1.62a22.446 22.446 0 0 1 12.41 19.23c2.14 54.55 18.53 107.78 47.37 153.92 4.35 6.96 4.56 15.73 0.56 22.89a22.481 22.481 0 0 1-19.62 11.5z m-114.59-77.47c3.67 11.88 25.95 25.51 75.64 30.54a359.178 359.178 0 0 1-30.25-98.37c-38.29 32.14-49.04 55.96-45.39 67.83zM849.09 514.26c-3.42 0-6.87-0.78-10.04-2.37a22.45 22.45 0 0 1-12.41-19.22c-2.15-54.56-18.54-107.8-47.37-153.94a22.464 22.464 0 0 1-0.55-22.89c3.97-7.1 11.48-11.5 19.61-11.5h0.18c113.98 0.87 148.49 35.41 157.37 64.24 8.88 28.83-0.22 76.81-93.99 141.68-3.83 2.65-8.31 4-12.8 4z m-11.82-162.99a359.543 359.543 0 0 1 30.26 98.37c38.27-32.13 49.03-55.95 45.38-67.82-3.67-11.89-25.94-25.52-75.64-30.55z" fill="#28CE84" p-id="1462"></path><path d="M230.3 706.13c-1.45 0-2.89 0-4.32-0.01a22.473 22.473 0 0 1-18.89-10.56c-32.98-52.77-51.72-113.64-54.16-176-0.49-12.4 9.18-22.85 21.58-23.34 12.39-0.87 22.85 9.18 23.34 21.58 1.99 50.41 16.12 99.71 41.03 143.32 83.96-1.27 193.93-21.15 304.38-55.17 110.42-34.02 212.5-79.47 282.64-125.65-3.97-50.22-19.98-98.92-46.64-141.58-6.57-10.53-3.38-24.39 7.16-30.98 10.52-6.57 24.39-3.38 30.98 7.16 32.97 52.76 51.7 113.63 54.16 175.98 0.31 7.69-3.34 15-9.67 19.37-73.85 51.08-185.16 101.62-305.38 138.65-118.36 36.47-236.9 57.23-326.21 57.23z" fill="#28CE84" p-id="1463"></path><path d="M515.18 639.2m-67.44 0a67.44 67.44 0 1 0 134.88 0 67.44 67.44 0 1 0-134.88 0Z" fill="#28CE84" p-id="1464"></path>
        </svg>
        <span class="icon-name" title="客服" p-id="7008"><span p-id="7009">全景</span></span>
      </div>
      <div class="pricebox">
        <div class="price">
          <span class="psp1">◆ 费用合计：</span>
          <span class="psp2">￥{{onePrice}}</span>
        </div>
        <div class="topay" @click="showpay()">立即认养认种</div>
      </div>
    </div>
    <div v-transfer-dom>
      <popup v-model="payshow" position="bottom" max-height="70%" class="payinfobox">
        <img class="imgtitle" src="../../img/paytitle.png" />
        <div class="params">
          <div class="param_item">
            <div class="params_name">个人/团队</div>
            <div class="params_input">
              <div class="checkbox" style="padding-right:15px" @click="radio1(1)">
                <div class="checkicon" :class="chark==1?'active':''"></div>
                <div class="checkname">个人</div>
              </div>
              <div class="checkbox" @click="radio1(2)">
                <div class="checkicon" :class="chark==2?'active':''"></div>
                <div class="checkname">团队</div>
              </div>
            </div>
          </div>

          <div class="param_item">
            <div class="params_name">名称</div>
            <div class="params_input">
              <x-input
                type="text"
                placeholder="请输入不超过30个字的个人姓名/团队名"
                v-model=name
                :show-clear="false"
                :required="true"
                style="box"
              ></x-input>
            </div>
          </div>
          <div class="param_item">
            <div class="params_name">电话号码</div>
            <div class="params_input">
              <x-input
                type="text"
                placeholder="请输入您的联系方式"
                v-model=phone
                :show-clear="false"
                :required="true"
                style="box"
              ></x-input>
            </div>
          </div>

          <div class="param_item">
            <div class="params_name">现场种植</div>
            <div class="params_input">
              <div class="checkbox" style="padding-right:15px" @click="radio2(1)">
                <div class="checkicon" :class="cychark==1?'active':''"></div>
                <div class="checkname">参与</div>
              </div>
              <div class="checkbox" @click="radio2(2)">
                <div class="checkicon" :class="cychark==2?'active':''"></div>
                <div class="checkname">不参与</div>
              </div>
            </div>
          </div>

          <div class="param_item">
            <div class="params_name">数量</div>
            <div class="params_input" style="height:35px;">
              <inline-x-number
                style="vertical-align: inherit;font-size:14px;padding:3px 0px"
                :min="1"
                :max="projectData.max_purchase_count"
                v-model=choseNum
                width="30px"
                @on-change="sub(choseNum)"
              ></inline-x-number>
            </div>
          </div>

          <div class="param_item">
            <div class="params_name">认种寄语</div>
            <div class="params_input">
              <x-textarea
                :autosize="true"
                placeholder="请输入5-30字个性寄语，个性寄语会打印在公益牌上，并悬挂在认种认养树木上,如认种多棵树可输入多条寄语，以“;”分隔"
                v-model=wish
                :show-clear="false"
                :style="{'line-height':'30px'}"
              ></x-textarea>
            </div>
          </div>

          <p style="text-align: center;margin:0;position: relative;height:25px;">
            <check-icon :value.sync="check" type="plain" style="font-size: 12px !important;line-heihgt:25px">我已阅读并同意</check-icon>
            <a style="color:#28CE84;font-size:12px;line-height:25px" @click="rztk">《认种认养条款》</a>
          </p>
          <!-- <div class="smDiv">
            <p>
              <x-icon type="ios-information-outline" size="15" style="vertical-align: bottom;"></x-icon>
              注：公益项目，暂不支持退款，介意请勿下单
            </p>
          </div> -->
          <div class="pBox">
            <div class="btn-pay" @click="pay()">支付</div>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <previewer :list="IMGlist" ref="previewer"></previewer>
    </div>
    <agreement ref="agreement"></agreement>
  </div>
</template>
<script>
import CountDown from "../../rzry/item/CountDown";
import agreement from "../../rzry/item/agreement"
import wx from "weixin-js-sdk";
import timeTool from "../../rzry/item/timeTool";
import * as formatDate from "@/assets/formatDate.js";
import {inde_url, url} from "@/assets/config/config";
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
  TransferDom,
  Previewer,
  Popup
} from "vux";
import * as WeixinJSBridge from "q";
export default {
  directives: {
    TransferDom
  },
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
    Previewer,
    Cell,
    Popup,
  },
  data() {
    return {
      finish:false,
      acttype:1,
      check:false,
      doing:false,
      payshow:false,
      endTime:"2020-12-30 9:51:00",
      showDetail:true,
      check: true,
      showMX:false,
      defaultValue: "gr",
      xcValue: "bcy",
      slValue: "1",
      chark: "1",
      cychark: "2",
      IMGlist: [],
      project_num:"",
      sl: [
        { key: "1", value: "1棵" },
        { key: "2", value: "2棵" },
        { key: "3", value: "3棵" },
        { key: "4", value: "4棵" },
        { key: "5", value: "5棵" },
      ],
      choseNum:1,
      money:330,
      onePrice:0,
      projectData :{},
      name:'',
      wish:'',
      tree:{},
      list:{},
      phone:"",
      number:0,
    };
  },
  methods:{
    linkto(){
      window.location.href=this.arurl;
    },
    lookZs(imgpath) {
      let item = {
        src: imgpath,
      };
      this.IMGlist.length = 0;
      this.IMGlist.push(item);
      this.$refs.previewer.show(0);
    },
    async getTreeDetail(value){
      const self = this;
      await self.$axios.post("/api/sys/yl/tree/list", {
        "key":value
      }, {
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then( res =>{
        // debugger
        self.onePrice = self.tree.tree_price;
      })
    },
    radio1(value){
      this.chark = value;
    },
    radio2(value){
      this.cychark = value;
    },

    showpay(){
      this.payshow = true;
    },
     rztk(){
      const that = this;
      that.$refs.agreement.show = true;
    },
    goAnchor (selector,type) {
      this.acttype = type;
      var anchor = document.querySelector(selector)
      //   没有动画
      //   document.documentElement.scrollTop = anchor.offsetTop
      //   有动画
        this.scrollTo(anchor.offsetTop, 500)  
    },
    scrollTo (y, duration) {
      /* y:目标纵坐标,duration:时间(毫秒) */
      y=y-50;
      var scrollTop = document.documentElement.scrollTop /* 页面当前滚动距离 */

      var distance =
                y -
                scrollTop /* 结果大于0,说明目标在下方,小于0,说明目标在上方 */

      var scrollCount = duration / 10 /* 10毫秒滚动一次,计算滚动次数 */

      var everyDistance = parseInt(
        distance / scrollCount
      ) /* 滚动距离除以滚动次数计算每次滚动距离 */
//window.scrollTo(0, y)
      for (
        var index = 1;
        index <= scrollCount;
        index++ /* 循环设置scrollBy事件,在duration之内,完成滚动效果 */
      ){
      setTimeout(function () {
        scrollTop = scrollTop+everyDistance
        if (scrollTop<0) {
          scrollTop = y;
        }
        window.scrollTo(0,scrollTop);
      }, 10*index)
    }
    },


    sub(num){
      const self = this;
      self.money = num * self.onePrice;
      console.log(self.money);
    },


    getData(){
      const that = this;
      that.$axios.post("/api/sys/yl/project/info?id="+that.$route.query.projectItem,"",{
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then( res =>{
        // debugger
        that.$nextTick(()=>{
          that.projectData = res.data.formItem;
          console.log(that.projectData);
          that.finish=true;
          that.arurl = that.projectData.ar_url;
          that.getTreeDetail(res.data.formItem.tree_name)
          that.$vux.loading.hide();
          if(that.$route.query.topay==1)
          {
            this.showpay();
          }
        })
      })
    },


    getEndTime(){
      const that = this;
      this.endTime = this.formatDate(that.projectData.funding_deadline,1)
      
    },


    formatDate(time,type) {
      let date = new Date(time)
      var year = date.getFullYear();
      var month = date.getMonth()<9?"0"+(date.getMonth()+1):(date.getMonth()+1);
      var day = date.getDate()<10?"0"+date.getDate():date.getDate();
      var hour = date.getHours()<10?"0"+date.getHours():date.getHours();
      var minuter = date.getMinutes()<10?"0"+ date.getMinutes():date.getMinutes();
      var second = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
      var tm = year+"-"+month+"-"+day+" "+hour+":"+minuter;
      if(type==0)
      {
        tm = year+"-"+month+"-"+day;
      }
      
      return tm;
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
        console.log(self.tree);
        
        self.onePrice = self.tree.tree_price;
        self.sub(1);
      })
    },

    async getuserinfo(){
      const self = this;
      await self.$axios.post("/api/sys/yl/user/userInfo", "", {
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then( res =>{
        // debugger
        if (res.data.msg && res.data.msg.indexOf("未登录")!=-1){
          window.sessionStorage.removeItem("person");
          if (!window.sessionStorage.getItem("person")) {
            // if (!this.$cookies.get("person")) {
            let code = self.$utils.getUrlKey("code");
            self.persondata(code, (boolean) => {
              if (boolean) {
                //  code..
                console.log("成功了");
                
                self.$utils.wxgetsign(self,wx);//获取wx.config
                self.getsessioninfo();
              } else {
                //  验证 跳转
                self.wxAuthorization();
              }
            });
          } else {
            //  验证 跳转
            const that = this;
            console.log("已有cookie");
            const person = JSON.parse(window.sessionStorage.getItem('person'))
            self.headimg = person.headpic;
            self.name = person.nickname;
            // that.headimg = this.$cookies.get("person").headpic;
            // that.name = this.$cookies.get("person").nickname;
            self.$utils.wxgetsign(that, wx); //获取wx.config
            //this.wxAuthorization();
          }
        }else{
          self.name = res.data.data.nickname;
          self.phone = res.data.data.phone;
        }
      })
    },
    
    getsessioninfo(){
      var person =JSON.parse(window.sessionStorage.getItem("person"));
      this.name = person.nickname;
      this.phone = person.phone;
    },

    async pay(){
      const self = this;

      if (self.name=="" || self.phone==""){
        self.$vux.toast.text('必填项目不能为空~')
        return
      }
      if(self.name.length>30)
      {
        self.$vux.toast.text('姓名/团队名不能超过30个字')
        return
      }
      if (!self.check){
        self.$vux.toast.text("请先阅读认种认养条款")
        return
      }
      if(!self.wish||self.wish.length<5||self.wish.length>30)
      {
        self.$vux.toast.text("认种寄语必须在5~30个字之间");
        return
      }
      // if (self.projectData.pubstate=='1'){
      await self.$axios.post("/api/sys/yl/order/unifiedOrderWithJsApi", {
        project_num:Number(self.projectData.id),
        description:self.projectData.tree_name,
        amount:Number(self.onePrice*self.choseNum),
        currency:'CNY',
        registered_name:self.name,
        wishes:self.wish,
        unit_price:Number(self.onePrice),
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
          const orderid = JSON.parse(res.data.msg).orderId;
          // const temp = that.test.JsParams;
          //console.log(tp.appId);
          //const a = JSON.parse(tp); //tp.split('(')[1].split(')')[0].split(', ');
          const list = {};
          list.appId =tp.appId; //a[0].split('=')[1];
          list.timeStamp =tp.timeStamp; //a[1].split('=')[1];
          list.nonceStr =tp.nonceStr; //a[2].split('=')[1];
          list.packageStr =tp.packageStr; //a[3].split('packageStr=')[1];
          list.signType =tp.signType; //a[4].split('=')[1];
          list.paySign =tp.paySign; //a[5].split('=')[1];
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
                  self.$router.push({path:"/complete",query:{projectItem:self.projectData,orderid:orderid}});
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

    },
    init(){
      // debugger
      const str = window.sessionStorage.getItem("person");
      const person = JSON.parse(str);
      this.name = person.nickname;
    },

    getUrlKey: function(name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || [, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    },
    wxgetsign(that, wx) {
      const href = location.href.split("#")[0];
      that.$axios
        .get(
          `/fapi/public/main/GetConfig?url=${encodeURIComponent(href)}`,
          {} //部署后需调整
        )
        .then(res => {
          console.log("登录",res)
          if (res.data.appid) {
            const datad = res.data;
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来
              appId: datad.appid, // 必填，公众号的唯一标识
              timestamp: datad.timestamp, // 必填，生成签名的时间戳
              nonceStr: datad.nonceStr, // 必填，生成签名的随机串
              signature: datad.signature, // 必填，签名，见附录1
              jsApiList: ["scanQRCode", "getLocation","chooseWXPay","updateTimelineShareData","onMenuShareTimeline","updateAppMessageShareData","onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.ready(function() {
              // config信息验证后会执行ready方法，所有接口调用都必须在config接口获
            });
            wx.error(function(res) {
              that.showPositionValue = true;
              that.text = res.errMsg;
            });
          }
        });
    },
    wxAuthorization() {
      this.$axios
        .get(
          `/fapi/public/main/oauth?redirect_uri=${encodeURIComponent(
            url+"/#/apply?projectItem="+this.project_num //部署后需调整
          )}&response_url=null`,
          {}
        )
        .then((res) => {
          console.log(res.data);
          window.sessionStorage.setItem('res',res.data);//存入sessionStorage
          //this.$cookies.set("res", res.data); //存入cookise
          window.location.href = res.data;
        });
    },

  persondata(cookie, fn) {
    window.sessionStorage.setItem('code',this.getUrlKey("code"));
    // this.$cookies.set("code", this.$utils.getUrlKey("code"));
    // const code = this.$cookies.get("code");
    const that = this;
    const code = window.sessionStorage.getItem('code');
    console.log('code',code);
    this.$axios
      .get(`/fapi/public/main/invoke?code=${code}`, {})
      .then((res) => {
        if (res.data.code != 100) {
          //JSON.parse(res.data.user_info).errcode
          fn && fn(false);
        } else {
          // console.log('res',res.data);
          window.sessionStorage.setItem("token",res.data.wxscToken);
          // this.$cookies.set('token',res.data.wxscToken);
          const person = JSON.parse(res.data.userInfo); //用户全部信息
          that.headimg = person.headpic;
          that.name = person.nickname;
          console.log(person);
          console.log(JSON.parse(res.data.userInfo));
          window.sessionStorage.setItem('person',res.data.userInfo);
          //this.$cookies.set("person", person); //存入cookise
          fn && fn(true);
        }
      });
    },
  },
  mounted() {
    const that = this;
    that.$vux.loading.show({
      text: '加载中'
    })
    that.project_num = that.$route.query.projectItem;
    // that.getuserinfo();

    const self = this;
    that.$axios.post("/api/sys/yl/user/userInfo", "", {
      headers: {
        "token":  window.sessionStorage.getItem('token')
      }
    }).then( res =>{
      // debugger
      if (res.data.msg && res.data.msg.indexOf("未登录")!=-1){
        window.sessionStorage.removeItem("person");
        if (!window.sessionStorage.getItem("person")) {
          // if (!this.$cookies.get("person")) {
          let code = self.$utils.getUrlKey("code");
          self.persondata(code, (boolean) => {
            if (boolean) {
              //  code..
              console.log("成功了");
              
              self.$utils.wxgetsign(self,wx);//获取wx.config
              self.getsessioninfo();
              that.getData();
            } else {
              //  验证 跳转
              self.wxAuthorization();
            }
          });
        } else {
          //  验证 跳转
          const that = this;
          console.log("已有cookie");
          const person = JSON.parse(window.sessionStorage.getItem('person'))
          self.headimg = person.headpic;
          self.name = person.nickname;
          // that.headimg = this.$cookies.get("person").headpic;
          // that.name = this.$cookies.get("person").nickname;
          self.$utils.wxgetsign(that, wx); //获取wx.config
          that.getData();
          //this.wxAuthorization();
        }
      }else{
        console.log(res);

        self.name = res.data.data.nickname;
        self.phone = res.data.data.phone;
        that.getData();
      }
    })


    // that.choseNum = 1;
    // that.init();
    // that.$utils.wxgetsign(that, wx); //获取wx.config
    // wx.ready(function () {
    //   //that.getData();
    //   that.$axios.post("api/sys/yl/project/info?id="+that.$route.query.projectItem,"",{
    //     headers: {
    //       "token":  window.sessionStorage.getItem('token')
    //     }
    //   }).then( res =>{
    //     // debugger
    //     that.$nextTick(()=>{
    //       that.projectData = res.data.formItem;
    //        that.getTreeDetail();
    //        that.getEndTime();
    //     })
    //   })
    // });
  },

};
</script>

<style lang="less" scoped>



#apply{
  .blank{width:100%;height:50px;}
  .nav{
    width:100%;
    height:50px;
    position: fixed;
    top:0px;
    background-color: #fff;
    z-index:1;

    .nav_item{
      width:33%;
      height:100%;
      box-sizing: border-box;
      float: left;
      padding:7px 10px;
      text-align: center;

      a{
        display: inline-block;
        font-size:16px;
        height:100%;
        line-height: 30px;
      }
      a.active{
        color:#FDA422;
        background:url("../../img/line.png") bottom center no-repeat;
        background-size:100% 2px;
      }
    }
  }
  .projectinfo{
    overflow: hidden;
    width:100%;
    background-color: #EFEFEF;
    .infobox{
      overflow: hidden;
      margin:10px;
      background:url("../../img/titleimg1.png") top 10px center no-repeat;
      background-size:80% auto;
      background-color: #fff;
      padding:45px 0px 15px 5px;
      border-radius:5px;


      .proimg{
        display:block;
        width:30%;
        float:left;
        height:120px;
        box-sizing: border-box;
        padding:5px 5px 0px;
        background-color:#28CE84;
        transform: rotate(5deg);
        margin-left: 10px;
        margin-top:5px;


        .imgbox{
          width:100%;
          height:95px;
          display:block;
          overflow: hidden;

          img{display:block;height:100%;}
        }

        .proname{
          height:20px;
          width:100%;
          font-size: 10px;
          color:#fff;
          line-height:20px;
          font-weight: bold;
          text-align: center;
        }
      }

      .proinfobox{
        float: right;
        width:60%;
        background-color:rgba(40, 206, 132, 0.08);
        padding:5px;

        .infoitem{
          overflow: hidden;
          width:100%;

          .tl{
            display: block;
            float: left;
            font-size:12px;
            line-height:25px;
            color:#0B9B6F;
          }
          .infotxt{
            display: block;
            float: left;
            font-size:12px;
            line-height:25px;
            color:#666666;
          }
        }
      }
    }
    .infobox2{
      overflow: hidden;
      margin:10px;
      background:url("../../img/titleimg2.png") top 10px center no-repeat;
      background-size:80% auto;
      background-color: #fff;
      padding:45px 0px 15px 5px;
      border-radius:5px;

      .infoitem{
        width:100%;
        overflow: hidden;
        text-align: center;
        .tl{
          width:65%;
          text-align:right;
          font-size: 12px;
          line-height:25px;
          font-weight:bold;
          color:#333;
          display: block;
          float: left;
        }
        .infotxt{
          width:35%;
          text-align:left;
          font-size:12px;
          line-height:25px;
          color:#28CE84;
          display: block;
          float: left;
        }
      }
    }
    .contentpic{display:block;width:100%;}
  }
  .btblank{
    width:100%;
    height:60px;
  }
  .paybox{
    width:100%;
    height:60px;
    position: fixed;
    bottom: 0px;
    background-color: #fff;
    box-sizing: border-box;
    padding:5px 15px;
  }

  .kf{
    float: left;
    .icon-name{display: block;text-align: center;font-size:10px !important ;color:#28CE84;line-height:20px;}
  }

  .pricebox{
    height:100%;
    float:right;
    overflow:hidden;

    .price{
      float: left;
      height:100%;
    }
    .psp1{
      display: block;
      font-size:14px;
      line-height:50px;
      color:#FDA422;
      float: left;
    }
    .psp2{
      display: block;
      font-size:17px;
      line-height:50px;
      font-weight:bold;
      color:#FDA422;
      display: block;
      float:right;
    }

    .topay{
      float:right;
      width:100px;
      height:35px;
      border-radius:25px;
      line-height: 35px;
      font-size:14px;
      color:#fff;
      text-align: center;
      margin:7px 0 0 10px;
      background-color:#FDA422;
    }
  }
}
.payinfobox{
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #fff;
  box-sizing: border-box;
  padding:15px;
  
  .imgtitle{
    display: block;
    width:100%;
  }
  .params{padding:15px 0}
  .param_item{width:100%;overflow: hidden;margin-bottom: 3px;}
  .params_name{float: left;width:25%;height:35px;line-height:35px;text-align: center;box-sizing:border-box;padding-right:10px;font-size: 14px;color:#28CE84}
  .params_input{float: left;width:75%;color:#999}
  .weui-cell{padding:0px;}
  
  .smDiv {
    background-color: #feedd1;
    padding: 1px 10px;
    border-radius: 8px;
    color: #fda422;
    font-size:12px;
    text-align: center;
  }

  .pBox{
    height:60px;
    width:100%;
    overflow: hidden;
    box-sizing: border-box;
    //padding:10px 0px;


    .btn-pay{
      height:35px;
      width:112px;
      margin:10px auto 0px;
      font-size:16px;
      line-height:35px;
      color:#fff;
      border-radius:25px;
      text-align:center;
      background-color:#FDA422

    }
  }

  .checkbox{
    float: left;
    overflow: hidden;


    .checkicon{
      width:16px;
      height:16px;
      float: left;
      background:url("../../img/check.png") center center no-repeat;
      background-size: 100% 100%; 
      margin-top:10px;  
      margin-right:5px;
    }

    .checkicon.active{
       background:url("../../img/checked.png") center center no-repeat;
       background-size: 100% 100%; 
    }
    .checkname{
      float: left;
      height:35px;
      font-size:14px;
      color:#999;
      line-height:35px;
    }
  }
}

// #applyInput /deep/ .vux-x-icon {
//   fill: #fda422;
// }
// .treeDh{
//   max-height: 50px;
//   overflow: hidden;
//   transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
// }
// .treeDetail{
//   /*display: -webkit-box;*/
//   /*-webkit-box-orient: vertical;*/
//   /*-webkit-line-clamp: 3;*/
//   /*overflow: hidden;*/
//   max-height: 99999px;
//   transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
//   transition-delay: 0s;
// }
// .dh{
//   overflow: hidden;
//   max-height: 0;
//   transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
// }
// .animate {
//   max-height: 9999px;
//   transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
//   transition-delay: 0s;
// }
// #applyInput {
//   .smDiv {
//     background-color: #feedd1;
//     padding: 1px 10px;
//     border-radius: 8px;
//     color: #fda422;
//   }
//   .imgDiv {
//     width: 100%;
//     height: 150px;
//     overflow: hidden;
//     position: relative;
//     img {
//       width: 100%;
//       margin: 0;
//     }
//     h3 {
//       background-color: #fda422;
//       width: 70px;
//       margin: 0;
//       height: 30px;
//       text-align: center;
//       line-height: 30px;
//       float: left;
//     }
//     .money {
//       position: absolute;
//       bottom: 0;
//       color: #fff;
//       width: 100%;
//       height: 30px;
//       background-color: #28ce84;
//       text-align: right;
//       display: flex;
//       p {
//         margin: 0;
//         line-height: 30px;
//         padding-right: 10px;
//       }
//       .time {
//         display: inline;
//         line-height: 30px;
//       }
//     }
//   }
//   .textDetails {
//     padding-left: 10px;
//     padding-right: 10px;

//   }
//   .title {
//     margin-left: 10px;
//     margin-right: 10px;
//     text-align: center;
//     position: relative;
//     h3 {
//       margin: 0;
//       font-size: 16px;
//     }
//     img {
//       width: 30%;
//       position: absolute;
//       top: 5px;
//     }
//     .imgborder {
//       right: 10px;
//       transform: rotate(180deg);
//       -ms-transform: rotate(180deg); /* Internet Explorer */
//       -moz-transform: rotate(180deg); /* Firefox */
//       -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
//       -o-transform: rotate(180deg); /* Opera */
//     }
//   }
//   .tableDiv {

//     margin-left: 15px;
//     margin-right: 15px;
//     font-size: 14px;
//     th {
//       width: 50%;
//       text-align: right;
//       color: #289b7a;
//     }
//     td {
//       width: 50%;
//       text-align: left;
//       color: #dfaa59;
//     }
//   }
//   .heji {
//     margin-left: 15px;
//     width: 160px;
//     color: #fda422;
//     padding: 9px 10px;
//     font-weight: bold;
//     margin-top: 10px;
//     float: left;
//     font-size: 16px;
//   }
//   .applyInput {
//     // border: 1px solid #76b198;
//     margin-left: 15px;
//     margin-right: 15px;
//     border-radius: 6px;
//     padding: 10px 10px;
//     margin-bottom: 15px;
//     table {
//       color: #16a57b;
//       th {
//         width: 25%;
//         text-align: right;
//       }
//       td {
//         width: 75%;
//       }
//     }
//   }
//   .nextBtn {
//     width: 100%;
//     position: fixed;
//     bottom: 0;
//     left: 0;
//     background-color: #fff;
//     border-top: 1px solid #ddd;
//     z-index: 10;
//     .btn {
//       width: 80px;
//       float: right;
//       margin-right: 10px;
//       margin-bottom: 10px;
//       margin-top: 10px;
//       border-radius: 25px;
//     }
//   }
//   .item {
//     border: 1px solid #ececec;
//     padding: 0px 15px;
//   }
//   .item-selected {
//     border: 2px solid #09ab7c;
//   }
// }
</style>
