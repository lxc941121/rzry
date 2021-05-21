
<template>
  <div id="detailsRecord" style="padding-bottom: 9vh;overflow:hidden;background-color:#efefef" v-if="finish">
    <!-- 图片 -->
    <!-- <div class="imgDiv">
      <img :src="require('../img/rs1.jpg')" /> -->
      <!-- 标题 -->
      <!-- <div class="protab amn" :class="showtab==1?'active':''" @click="showpage(1)">项目</div>
      <h3 class="amn" :class="showtab==0?'active':''" @click="showpage(0)">榕树</h3>
    </div>
    <div class="msgcontent amn">
        <div class="amn txt" :class="showtab==1?'active':''">{{yhinfo.description}}</div>
        <div class="amn txt" :class="showtab==0?'active':''">{{tree.tree_describe}}</div>
    </div> -->
    <!-- 标题 -->
    <!-- <div class="title">
      <img :src="require('../img/xqx.png')" style="left: 10px;" />
      <h3>认养信息</h3>
      <img :src="require('../img/xqx.png')" class="imgborder" />
    </div> -->
      <div style="margin:5px;background:#fff;border-radius: 5px;padding-bottom:10px">
        <div class="shareinfo">
          <img :src="require('../img/sharetitle.png')" class="sharetitle" />
          <div class="rzrinfo">
            <div class="rztl">认种认养人</div>
            <div class="psinfo">
                <img :src="headimg" />
                <div class="rzrname">{{registered_name}}</div>
            </div>
            <div class="ryjy">
                <span class="jytl">认种认养寄语：</span>
                <span class="jycontent">{{wishes}}</span>
            </div>
            <div class="lficon"></div>
          </div>
          <div class="rzorderinfo">
            <div class="infoitem">
                <div class="s1">认种认养项目：</div>
                <div class="s2">{{yhinfo.project_name}}</div>
            </div>
            <div class="infoitem">
                <div class="s1">认种认养树种：</div>
                <div class="s2">{{yhinfo.tree_name}}</div>
            </div>
            <div class="infoitem">
                <div class="s1">认种认养时间：</div>
                <div class="s2">{{paytime}}</div>
            </div>
            <div class="infoitem">
                <div class="s1">养护机构：</div>
                <div class="s2">{{yhinfo.proprietor}}</div>
            </div>
          </div>
        </div>
    <!-- 养护信息 -->
    <!-- <div class="tableDiv">
      <x-table :full-bordered="false" :content-bordered="false" :cell-bordered="false">
        <tbody>
          <tr>
            <th>认养人：</th>
            <td>{{registered_name}}</td>
          </tr>
          <tr>
            <th>认养项目：</th>
            <td>{{yhinfo.project_name}}</td>
          </tr>
          <tr>
            <th>认养树种:</th>
            <td>{{yhinfo.tree_name}}</td>
          </tr>
          <tr>
            <th>认养时间：</th>
            <td>{{paytime}}</td>
          </tr>
          <tr>
            <th>养护机构：</th>
            <td>{{yhinfo.proprietor}}</td>
          </tr>
           <tr>
            <th>认养寄语：</th>
            <td>{{wishes}}</td>
          </tr>
        </tbody>
      </x-table>
    </div> -->
    <!-- 标题 -->
      <div class="title">
        <img :src="require('../img/xqx.png')" style="left: 10px;" />
        <h3>养护信息</h3>
        <img :src="require('../img/xqx.png')" class="imgborder" />
      </div>
      <!-- 养护记录 -->
      <group v-for="(list,index) in newyhjllist" :key="index">
        <cell
          :value="list.strcreatetime"
          is-link
          :arrow-direction="list.showContent ? 'up' : 'down'"
          @click.native="doslide(index)"
          style="color: #009470;font-size:14px;height:30px"
        >
            <div slot="title" style="width:40px;height:20px;font-size:12px;text-align:center;background-color:#FFF6E7;line-height:20px;color:#DAA966" v-if="list.maintence_flg==1">种植</div>
            <div slot="title" style="width:40px;height:20px;font-size:12px;text-align:center;background-color:#E9FAF2;line-height:20px;color:#4ABC88" v-if="list.maintence_flg==2">养护</div>
        </cell>
        <div class="slide" :class="list.showContent?'animate':''" >
          <p>养护人：{{list.person_name}}</p>
          <p>描述：{{list.content}}</p>
          <scroller lock-y scrollbar-x style="margin-bottom: 15px;">
            <div class="img" :style="{width:list.piccount*215+'px'}">
              <div class="img-item" v-if="list.picture_1">
                <img :src="list.attachment_1.path" @click="previewImage" />
                <div v-transfer-dom>
                  <previewer :list="IMGlist" ref="previewer"></previewer>
                </div>
              </div>
              <div class="img-item" v-if="list.picture_2">
                <img :src="list.attachment_2.path" @click="previewImage" />
                <div v-transfer-dom>
                  <previewer :list="IMGlist" ref="previewer"></previewer>
                </div>
              </div>
              <div class="img-item" v-if="list.picture_3">
                <img :src="list.attachment_3.path" @click="previewImage" />
                <div v-transfer-dom>
                  <previewer :list="IMGlist" ref="previewer"></previewer>
                </div>
              </div>
              <div class="img-item" v-if="list.picture_4">
                <img :src="list.attachment_4.path" @click="previewImage" />
                <div v-transfer-dom>
                  <previewer :list="IMGlist" ref="previewer"></previewer>
                </div>
              </div>
              <div class="img-item" v-if="list.picture_5">
                <img :src="list.attachment_5.path" @click="previewImage" />
                <div v-transfer-dom>
                  <previewer :list="IMGlist" ref="previewer"></previewer>
                </div>
              </div>
            </div>
          </scroller>
        </div>
      </group>
      <div v-if="!newyhjllist||newyhjllist.length<=0" style="line-height: 25px;box-sizing: border-box;padding: 10px 10px 0px;text-align:center">
        暂无养护记录
      </div>
    </div>
    <div class="probox" v-if="yhinfo.project_text" style="margin-top:0px">
      <img :src="yhinfo.project_text"/>
    </div>
    <div class="probox" v-if="yhinfo.tree_text" style="">
      <img :src="yhinfo.tree_text"/>
    </div>
    <div class="nextBtn">
      <x-button class="btn" :gradients="['#fda422', '#fda422']" @click.native="upload">上传养护记录</x-button>
      <x-button class="btn" :gradients="['#09ab7c', '#09ab7c']" @click.native="zhongShu" style="margin-right:4%">去认种认养</x-button>
    </div>
    <choice-identity ref="choiceIdentity"></choice-identity>
  </div>
</template>

<script>
import {
  XTable,
  Scroller,
  Cell,
  CellBox,
  CellFormPreview,
  Group,
  Previewer,
  XButton,
  TransferDom,
} from "vux";
import {inde_url, url} from "../../assets/config/config";
import wx from "weixin-js-sdk";
import ChoiceIdentity from "./choiceIdentity";
export default {
  directives: {
    TransferDom,
  },
  components: {
    ChoiceIdentity,
    XButton,
    XTable,
    Scroller,
    Cell,
    CellBox,
    CellFormPreview,
    Group,
    Previewer,
  },
  data() {
    return {
      //暂时存储图片
      showtab:0,
      finish:false,
      IMGlist: [],
      active:true,
      yhinfo:{},
      tree:{},
      wishes:"",
      paytime:"",
      registered_name:"",
      newyhjllist:[],
      yhjlList: [
        {
          id: 3,
          showContent: true,
          time: "2020-08-11",
          text:
            "对公园内认种认养植物进行浇水、施肥。",
          img: [
            { id: 1, src: require("@/components/img/10.jpg") },
            { id: 2, src: require("@/components/img/11.jpg") },
            { id: 3, src: require("@/components/img/12.png") },
          ],
        },
        {
          id: 2,
          showContent: true,
          time: "2020-07-12",
          text:
            "对公园内认种认养植物进行剪枝。",
          img: [
            { id: 1, src: require("@/components/img/4.jpg") },
            { id: 2, src: require("@/components/img/5.jpg") },
            { id: 3, src: require("@/components/img/6.jpg") },
          ],
        },
        {
          id: 1,
          showContent: true,
          time: "2020-06-18",
          text:
            "对公园内认种认养植物进行除虫、施肥。",
          img: [
            { id: 1, src: require("@/components/img/7.jpg") },
            { id: 2, src: require("@/components/img/8.jpg") },
            { id: 3, src: require("@/components/img/9.jpg") },
          ],
        },
      ],
      headimg:undefined,
      name:undefined,
      orderCount:undefined,
      roleCount:undefined,
      identity:undefined,
    };
  },
  methods: {
    async getTreeDetail(){
      const self = this;
      await self.$axios.post("/api/sys/yl/tree/list", {
        "key":self.yhinfo.tree_name
      }, {
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then( res =>{
        // debugger
        self.tree = res.data.datas[0];
        self.onePrice = self.tree.tree_price;
      })
    },

    sttime(value)
    {
      var dt = new Date(value);
      var year = dt.getFullYear();
      var month = dt.getMonth()+1;
      var day = dt.getDate();
      return year+"年"+month+"月"+day+"日";
    },

    async getorderinfo(id){
      const self = this;
      await self.$axios.post("/api/sys/yl/ordertree/info?id="+id,"", {
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then( res =>{
         var rs =res.data.order; //JSON.parse(res.data.order);
         self.registered_name = rs.registered_name;
         self.wishes = rs.wishes;
         self.paytime = self.sttime(rs.finishtime)
      })
    },


    showpage(type)
    {
      this.showtab = type;
    },
    doslide(value){
      var rs = !this.newyhjllist[value].showContent;
      this.$set(this.newyhjllist[value],"showContent",rs)
    },
    previewImage(e) {
      if (e.target.nodeName == "IMG") {
        let url = e.target.currentSrc;
        let item = {
          src: url,
        };
        this.IMGlist.length = 0;
        this.IMGlist.push(item);
        this.$refs.previewer[0].show(0);
      } else {
        return;
      }
    },
    upload(){
      /*
      * rolecount > 0 代表他是业主单位,
      * ordercount > 0 代表他认种了
      * */
      if (this.roleCount>0 && this.orderCount>0){
        this.$refs.choiceIdentity.identityShow = true
        this.$vux.toast.text("请先选择要上传记录的身份")
        // if (!!this.identity){
        //   this.$router.push('/yhjl');
        // }else {
        //   this.$vux.toast.text("请先选择要上传记录的身份")
        // }
      }else {
        if (this.roleCount>0 && this.orderCount ==0){
          //业主单位
          this.identity = "1";
        }else if (this.orderCount>0 && this.roleCount==0){
          //认种人
          this.identity = "2";
        }
        if (!!this.identity){
          this.$router.push('/yhjl?project_num='+this.project_num+"&identity="+this.identity+"&orderid="+this.orderid);
        }
      }



    },
    zhongShu(){
      console.log("认种认养")
      // debugger
      this.$router.push('/map');
    },
    wxAuthorization() {
      this.$axios
        .get(
          `/fapi/public/main/oauth?redirect_uri=${encodeURIComponent(
            `${url}/#/map` //部署后需调整
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
      window.sessionStorage.setItem('code',this.$utils.getUrlKey("code"));
      // this.$cookies.set("code", this.$utils.getUrlKey("code"));
      // const code = this.$cookies.get("code");
      const code = window.sessionStorage.getItem('code');
      console.log('code',code);
      const that = this;
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
    async getYHJL(){
      
      const self = this;
      await self.$axios.post("/api/sys/yl/userrole/getUserRoleMobile", {}, {
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then(function (res) {
        if (res.data.msg.indexOf("成功")!=-1&&window.sessionStorage.getItem('person')){
          if (res.data.code == 100){
            self.orderCount = res.data.datas.orderCount;
            self.roleCount = res.data.datas.roleCount;
            const person = JSON.parse(window.sessionStorage.getItem('person'))
            self.headimg = person.headpic;
            self.name = person.nickname;
          }
        }else{
          window.sessionStorage.removeItem("person");
          if (!window.sessionStorage.getItem("person")) {
            // if (!this.$cookies.get("person")) {
            let code = self.$utils.getUrlKey("code");
            self.persondata(code, (boolean) => {
              if (boolean) {
                //  code..
                console.log("成功了");

                self.$utils.wxgetsign(self, wx); //获取wx.config
              } else {
                //  验证 跳转
                self.wxAuthorization();
              }
            });
          } else {
            //  验证 跳转
            console.log("已有cookie");
            const person = JSON.parse(window.sessionStorage.getItem('person'))
            self.headimg = person.headpic;
            self.name = person.nickname;
            // that.headimg = this.$cookies.get("person").headpic;
            // that.name = this.$cookies.get("person").nickname;
            self.$utils.wxgetsign(self, wx); //获取wx.config
            //this.wxAuthorization();
          }
        }
      });


      await self.$axios.post("/api/sys/yl/ordertree/list", {
        "nowPage": self.pageNum,
        "pageSize": 10,
        "key":""
      }, {
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then(function (res) {
        if(res.data.datas.length>0)
        {
          self.project_num = res.data.datas[0].project_num;
          self.orderid = res.data.datas[0].id;
        }
      })
      await self.$axios.post("/api/sys/yl/maintain/list", {
        "pageSize":10,
        "nowPage":1,
        "key":"",
        "bean":{"project_num":self.project_num}
        //"bean":{"project_num":7}
        }, {
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then(function (res) {
        console.log(res);
        if (res.data.msg.indexOf("成功")!=-1){
          if (res.data.code == 100){
            self.$nextTick(()=>{
              self.yhinfo = res.data.projectdata;
              self.newyhjllist = res.data.page.datas;
              self.newyhjllist.forEach((value,index)=>{
                //var strdate = new Date(value.createtime)
                var strdate = new Date(value.createtime.replace(/-/g, '/'))
                var year = strdate.getFullYear();
                var month = strdate.getMonth()<9?"0"+(strdate.getMonth()+1):strdate.getMonth()+1;
                var day = strdate.getDate()<10?"0"+strdate.getDate():strdate.getDate();
                var piccount = 0;
                if(!!value.picture_1){piccount++;}
                if(!!value.picture_2){piccount++;}
                if(!!value.picture_3){piccount++;}
                if(!!value.picture_4){piccount++;}
                if(!!value.picture_5){piccount++;}
                self.$set(value,"strcreatetime",year+"年"+month+"月"+day+"日");
                self.$set(value,"showContent",true);
                self.$set(value,"piccount",piccount)
              })

              self.getTreeDetail();

            })
          }
        }else{
          window.sessionStorage.removeItem("person");
          if (!window.sessionStorage.getItem("person")) {
            // if (!this.$cookies.get("person")) {
            let code = self.$utils.getUrlKey("code");
            self.persondata(code, (boolean) => {
              if (boolean) {
                //  code..
                console.log("成功了");
      
                that.$utils.wxgetsign(that, wx); //获取wx.config
              } else {
                //  验证 跳转
                that.wxAuthorization();
              }
            });
          } else {
            //  验证 跳转
            console.log("已有cookie");
            const person = JSON.parse(window.sessionStorage.getItem('person'))
            that.headimg = person.headpic;
            that.name = person.nickname;
            // that.headimg = this.$cookies.get("person").headpic;
            // that.name = this.$cookies.get("person").nickname;
            that.$utils.wxgetsign(that, wx); //获取wx.config
            //this.wxAuthorization();
          }
        }
      });
      await self.getorderinfo(this.orderid);
      
      this.finish=true;
      this.$vux.loading.hide();
    }
  },
  mounted() {

    this.$vux.loading.show({
      text: '加载中'
    })
    ////"https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx10e914f13eeac627&redirect_uri=http%3A%2F%2Frzry.go577.net%2F%23%2Fmap&response_type=code&scope=snsapi_userinfo&state=null#wechat_redirect"
    /* 获取用户信息,通过存入用户信息判断 */
    console.log("测试进入");
    const self = this;
    self.$axios.post("/api/sys/yl/user/userInfo","", {
      headers: {
          "token":  window.sessionStorage.getItem('token')
      }
    }).then(function (res) {
        console.log(res)
        if (res.data.msg && res.data.msg.indexOf("未登录")!=-1){
            window.sessionStorage.removeItem("person");
            // if (!window.sessionStorage.getItem("person")) {
                // if (!this.$cookies.get("person")) {
            let code = self.$utils.getUrlKey("code");
            self.persondata(code, (boolean) => {
                if (boolean) {
                //  code..
                    console.log("成功了");
                    self.$utils.wxgetsign(self,wx);//获取wx.config
                    self.getYHJL();
                } else {
                //  验证 跳转
                  self.wxAuthorization();
                }
            });
        }else{
            self.headimg = res.data.data.headpic;
            self.name = res.data.data.nickname;
            self.getYHJL();
        }     
    });
    
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/config/common.css";
.amn{transition: all .3s;}
#detailsRecord /deep/ .weui-cell__ft {
  color: #009470;
  font-size: 16px;
}
#detailsRecord /deep/ .weui-cell_access .weui-cell__ft:after {
  color: #009470;
  border-color: #009470;
}
#detailsRecord /deep/ .weui-cells:after,
#detailsRecord /deep/ .weui-cells:before {
  border: none;
}
#detailsRecord {

  .vux-label{position: relative;}
  .msgcontent{
    position: relative;
    font-size:14px;
    padding:10px 15px;
    .txt{opacity:0;position:absolute;top:0px;}
    .txt.active{opacity: 1;position: relative;}
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
      margin: 0;
      position: absolute;
      bottom: 0;
      left: 0;
      text-align:center;
      width:40px;
      height: 20px;
      line-height: 20px;
      color: #fff;
      padding: 5px 15px;
      font-size: 14px;
      background-color: #999;
      border-radius: 0 16px 16px 0;
    }
    .protab {
      margin: 0;
      position: absolute;
      bottom: 30px;
      left: 0;
      text-align:center;
      width:40px;
      height: 20px;
      line-height: 20px;
      color: #fff;
      padding: 5px 15px;
      font-size: 14px;
      background-color: #999;
      border-radius: 0 16px 16px 0;
    }
    h3.active,.protab.active{width:60px;background-color: #FDA422;}
  }
  .title {
    margin-top: 15px;
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
      width: 40%;
      text-align: right;
      color: #000;
    }
    td {
      width: 60%;
      text-align: left;
      color: #45CC91;
    }
  }
  .img {
    height: 100px;
    position: relative;
    width: 650px;
  }
  .img-item {
    width: 200px;
    height: 100px;
    background-color: #ccc;
    display: inline-block;
    margin-left: 15px;
    float: left;
    text-align: center;
    line-height: 100px;
    img {
      width: 100%;
    }
  }
  .slide {
    padding: 0px 11px 0px 10px;
    margin: 0px 15px 0px 15px;
    border-radius: 8px;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
    background-color: #f5f5f5;
  }
  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
.probox{
  width:100%;
  overflow:hidden;

  img{display:block;width:100%;}
}
    .shareinfo{
     
      background-color: #fff;
      border-radius:5px;
      box-sizing: border-box;
      padding:10px 10px 0px;

      .sharetitle{
          display: block;
          width:100%;

      }

      .rzrinfo{
          position: relative;
          background:rgba(40,206,132,0.08);
          border:solid 1px #0B9B6F;
          margin:10px;
          box-sizing: border-box;
          padding:0px 10px 20px;

          .rztl{
              width:100%;
              height:25px;
              background:url(../img/rzricon.png) top center no-repeat;
              background-size:102px 22px;
              font-size:12px;
              font-weight:bold;
              color: #fff;
              line-height:22px;
              text-align: center;
          }

          .psinfo{
              width:100%;
              overflow: hidden;
              padding:10px 0px;

              img{
                  display: block;
                  width:40px;
                  height:40px;
                  margin: 0 auto;
                  border-radius: 100%;
              }
              .rzrname{
                  display: block;
                  font-size:12px;
                  line-height:25px;
                  color:#045E43;
                  text-align: center;
                  margin-top:5px;
              }
          }

          .ryjy{
              width:100%;
              overflow: hidden;
              text-align: center;
              .jytl{font-size:12px;color:#FD8122;font-weight:bold;}
              .jycontent{font-size:12px;color:#FDA422}
          }
          .lficon{
              position: absolute;
              width:23px;
              height:12px;
              z-index:1;
              background:url(../img/lf.png) center center no-repeat;
              background-size:100% 100%;
              bottom:-6px;
          }
      }
      .rzorderinfo{
          display: block;
          width:100%;
          box-sizing: border-box;
          padding:10px;

          .infoitem{
              width:100%;
              overflow: hidden;
              padding:5px 0px;
              .s1{display:block;float: left;width:45%;font-size:12px;color:#333;font-weight:bold;text-align:right;}
              .s2{display:block;float: left;width:55%;font-size: 12px;color:#28CE84;text-align: left;}
          }
      }

      .btnbox{
          position: relative;
          width:100%;
          padding:25px 0px 10px;

          .rzbtn{
              width:100%;
              height:50px;
              background: url(../img/rzbtn.png) top center no-repeat;
              background-size:100% 100%;
              font-size:16px;
              line-height: 50px;
              color:#fff;
              text-align:center;
          }

          .lficon2{
              position:absolute;
              top:0px;
              width:23px;
              height:12px;
              right:15%;
              background:url(../img/lf2.png) center center no-repeat;
              background-size:100% 100%;
          }
          .lficon3{
              position:absolute;
              width:24px;
              height:14px;
              right:5%;
              bottom:-7px;
              background:url(../img/lf3.png) center center no-repeat;
              background-size:100% 100%;
          }
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
  box-sizing: border-box;
  padding:0 15px;
  z-index: 10;
  .btn {
    width: 48%;
    float: right;
    margin-bottom: 10px;
    margin-top: 10px;
    height: 35px;
    font-size: 15px;
  }
}
</style>
