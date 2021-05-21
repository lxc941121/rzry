<template>
  <div id="index">
    <div class="banner">
      <swiper :options="swiperOptions" ref="mySwiper" class="banner-swiper">
        <swiper-slide>
          <div class="banner-block">
            <img src="@/components/img/index/banner1.png" class="banner-block-img">
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="banner-block">
            <img src="@/components/img/index/banner1.png" class="banner-block-img">
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <div class="nav">
      <div class="navitem">
        <div class="navbox"  @click="routeto('rzlist')">
          <img src="@/components/img/index/rzicon.png">
          <span>认种</span>
        </div>
      </div>
       <div class="navitem">
        <div class="navbox" @click="routeto('rzlist')">
          <img src="@/components/img/index/ryicon.png">
          <span>认养</span>
        </div>
      </div>
       <div class="navitem">
        <div class="navbox" @click="routeto('ph')">
          <img src="@/components/img/index/phicon.png">
          <span>排行</span>
        </div>
      </div>
       <div class="navitem">
        <div class="navbox" @click="routeto('map')">
          <img src="@/components/img/index/mapicon.png">
          <span>种养地图</span>
        </div>
      </div>
    </div>

    <div class="actswiper">
      <img src="@/components/img/index/rzrytl.png" class="titlebox">
      <swiper :options="swiperOptions2" ref="mySwiper" class="swbox">
        <swiper-slide v-for="(item,index) in prolisti" :key="index" >
          <div class="act-block" :data-value="item.id" @click="prorouteto(item.id)">
            <img src="@/components/img/index/activelist.png" class="act-block-img">
          </div>
        </swiper-slide>
        <div class="swiper-pagination2" slot="pagination"></div>
      </swiper>
    </div>

    <div class="record">
      <div class="tl">
        <div class="tlicon1">累计捐款额：</div>
        <div class="tl_value">79045.00</div>    
        <div class="tl_value" style="float:right">12255</div>
        <div class="tlicon2" style="float:right">累计种养树木：</div>
      </div>
      <div class="rowbox">
        <img src="@/components/img/index/rimg.png" class="rimg">
        <div class="relist">
          <div class="reitem" v-for="(item,index) in barrage" :key="index">
            <i></i>
            <div class="reinfo">{{item.registered_name}}认种了{{item.quantity}}株{{item.tree_name}}</div>
            <div class="redate">{{item.redate}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="newactbox">
      <img src="@/components/img/index/titlebg.png" class="titlebox">
      <div class="infobox">
        <div class="sp1">已参与人次：</div>
        <div class="sp2">119,955</div>
      </div>
      <div class="newactswiper">
        <swiper :options="swiperOptions3" ref="mySwiper" class="newswbox">
          <swiper-slide>
            <a class="newact-block" href="https://v.xiumi.us/board/v5/4eXia/262910215">
              <img src="@/components/img/index/newactimg.jpg" class="newact-block-img">
            </a>
          </swiper-slide>
          <div class="swiper-pagination3" slot="pagination"></div>
        </swiper>
      </div>
    </div>

    <div class="phbox">
      <img src="@/components/img/index/phicon2.png" class="titlebox">
      <div class="rowline">
        <div class="infobox">
          <div class="sp1">累计项目数：</div>
          <div class="sp2">119,955</div>
        </div>
        <div class="btn-more">查看更多</div>
      </div>
      <div class="phlist">
        <div class="phitembox" v-for="(item,index) in prolist" :key="index">
          <div class="phitem fst" v-if="index<3">
            <div class="phnum">
              <img src="@/components/img/index/champion.png" v-if="index==0">
              <img src="@/components/img/index/second.png" v-if="index==1">
              <img src="@/components/img/index/third.png" v-if="index==2">
            </div>
            <div class="phinfobox">
              <div class="r1">
                <div class="actname">{{item.project_name}}</div>
                <div class="acttype">认养</div>
                <div class="wcl">完成率：{{parseInt((item.yrzs/item.project_scale)*100)}}%</div>
              </div>
              <div class="r2">
                  <x-progress :percent="parseInt((item.yrzs/item.project_scale)*100)" :show-cancel="false"></x-progress>
                  <div class="rzinfo">已认种{{item.yrzs}}/{{item.project_scale}}</div>
              </div>
            </div>
          </div>
          <div class="phitem" v-if="index>=3">
            <div class="phnum">
              <div class="numbox">{{index+1}}</div>
            </div>
            <div class="phinfobox">
              <div class="r1">
                <div class="actname">{{item.project_name}}</div>
                <div class="acttype">认养</div>
                <div class="wcl">完成率：{{parseInt((item.yrzs/item.project_scale)*100)}}%</div>
              </div>
              <div class="r2">
                  <x-progress :percent="parseInt((item.yrzs/item.project_scale)*100)" :show-cancel="false"></x-progress>
                  <div class="rzinfo">已认种{{item.yrzs}}/{{item.project_scale}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="phitembox">
          <div class="phitem fst">
            <div class="phnum"><img src="@/components/img/index/second.png"></div>
            <div class="phinfobox">
              <div class="r1">
                <div class="actname">白鹿洲公园爱情认种林</div>
                <div class="acttype">认养</div>
                <div class="wcl">完成率：90%</div>
              </div>
              <div class="r2">
                  <x-progress :percent="90" :show-cancel="false"></x-progress>
                  <div class="rzinfo">已认种490/700</div>
              </div>
            </div>
          </div>
        </div>
        <div class="phitembox">
          <div class="phitem fst">
            <div class="phnum"><img src="@/components/img/index/third.png"></div>
            <div class="phinfobox">
              <div class="r1">
                <div class="actname">白鹿洲公园爱情认种林</div>
                <div class="acttype">认养</div>
                <div class="wcl">完成率：90%</div>
              </div>
              <div class="r2">
                  <x-progress :percent="90" :show-cancel="false"></x-progress>
                  <div class="rzinfo">已认种490/700</div>
              </div>
            </div>
          </div>
        </div>
        <div class="phitembox">
          <div class="phitem">
            <div class="phnum">
              <div class="numbox">4</div>
            </div>
            <div class="phinfobox">
              <div class="r1">
                <div class="actname">白鹿洲公园爱情认种林</div>
                <div class="acttype">认养</div>
                <div class="wcl">完成率：90%</div>
              </div>
              <div class="r2">
                  <x-progress :percent="90" :show-cancel="false"></x-progress>
                  <div class="rzinfo">已认种490/700</div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div style="height:55px;"></div>
    <div class="floor">
      <div class="flnav" v-for="(item,index) in navlist" :key="index" @click="cjrouteto(item.page)">
        <div class="navicon" :style="{backgroundImage: 'url(' + item.backgroundimage + ')'}"></div>
        <div class="navname">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import wx from "weixin-js-sdk";
import bus from "../../assets/config/eventBus";
import { url, inde_url } from "../../assets/config/config";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import 'swiper/dist/css/swiper.css'
import { XProgress } from "vux";

// var graphicLayer,map=null;
export default {
  name: 'index',
  components: {
    swiper,
    swiperSlide,
    XProgress
  },
  
  data() {
    return {
      swiperOptions: {
        observer: true,
        observeParents: true,
        loop: false,
        autoplay: {
          disableOnInteraction: false,
          delay: 5000
        },
        pagination: {
          el: '.swiper-pagination'
        },
      },

      swiperOptions2: {
        observer: true,
        observeParents: true,
        loop: false,
        autoplay: {
          disableOnInteraction: false,
          delay: 5000
        },
        pagination: {
          el: '.swiper-pagination2'
        }
      },

      swiperOptions3: {
        observer: true,
        observeParents: true,
        loop: false,
        autoplay: {
          disableOnInteraction: false,
          delay: 5000
        },
        pagination: {
          el: '.swiper-pagination3'
        }
      },
      prolist:[],
      prolisti:[],
      barrage:[],
      navlist:[{
        page:"index",
        name:"每日打卡",
        backgroundimage:require('../img/index/sign.png')
      },{
        page:"myRzry",
        name:"养护记录上传",
        backgroundimage:require('../img/index/update.png')
      },{
        page:"index",
        name:"绿植商城",
        backgroundimage:require('../img/index/shop.png')
      },{
        page:"cj",
        name:"个人中心",
        backgroundimage:require('../img/index/userinfo.png')
      }]
    };
  },
  methods: {
    async getData(){
      const self = this;
      await self.$axios.post("/api/sys/yl/project/list", {
        "nowPage": self.pageNum,
        "pageSize": 20,
        "orderByStr":"tree_price",
        "orderByType":1
      }, {
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then(function (res) {
        // debugger
        if (res.data.code == -1){
          window.location.href="/#/index";
        }else{
          const length = res.data.datas.length;
          self.prolist = res.data.datas;
          self.prolist.forEach(element => {
            if(!element["yrzs"])
            {
              element["yrzs"] = 0;
            }
          });
          self.prolist = self.prolist.sort((value1,value2)=>{
            return parseInt((value2.yrzs/value2.project_scale)*100) - parseInt((value1.yrzs/value1.project_scale)*100) 
          })

          console.log(self.prolist)
          if (length>0){
            self.prolisti = self.prolist.filter(function(item){return item.pubstate ==1})
          }
        }
      });

      await this.$axios.post("/api/sys/yl/order/GetOrderMsg",{
        "nowPage": 1,
        "pageSize": 10,
        "total":0
      },{
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then( res =>{
        this.barrage = res.data.datas
        this.barrage = this.barrage.filter((item)=>{
          return item.registered_name
        })
        this.barrage.forEach((item)=>{
           var diffminute =Math.floor((new Date().getTime() - item.payment_date)/(60*1000));
           var diffhours = diffminute/60;
           var diffday = diffhours/24;
           if(diffday>=1)
           {
             item["redate"] = parseInt(diffday)+"天前";
           }
           else if(diffhours>=1)
           {
             item["redate"] = parseInt(diffday)+"小时前";
           }
           else{
             item["redate"] = parseInt((diffminute<=0?"1":diffminute))+"分钟前";
           }
           if(item.registered_name.length>5){
             item.registered_name = item.registered_name.substring(0,5)+"..."
           }
        })
      })   

      // console.log("排序后的list",self.list)
    },
    routeto(pagename)
    {
       this.$router.push({path:"/"+pagename});
    },
    prorouteto(params)
    {
      console.log("11");
      this.$router.push({path:"/apply",query:{projectItem:params}}); 
    },
    
    cjrouteto(page){
      const person = JSON.parse(window.sessionStorage.getItem('person'))
      this.$router.push({
        path: "/"+page,
        query: {
          headimg: person.headpic,
          name: person.nickname,
        },
      });
    },
    wxAuthorization() {
      this.$axios
        .get(
          `/fapi/public/main/oauth?redirect_uri=${encodeURIComponent(
            inde_url //部署后需调整
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
      const that = this;
      const code = window.sessionStorage.getItem('code');
      console.log('code',code);
      this.$axios
        .get(`/fapi/public/main/invoke?code=${code}`, {})
        .then((res) => {
          console.log("psd",res)
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
            that.$utils.wxgetsign(that, wx);
            if(res.data.newUser)
            {
              that.navtxt = true;
            }else{
              that.showtxt=true;
            }
            //this.$cookies.set("person", person); //存入cookise
            fn && fn(true);
          }
        });
    },
  },
  mounted() {
    /* 获取用户信息,通过存入用户信息判断 */
    const that = this;
    this.$axios.post("/api/sys/yl/user/userInfo","",{
      headers: {
        "token":  window.sessionStorage.getItem('token')
      }
    }).then( res =>{
      if(res.data.code==-1)
      {

        let code = that.$utils.getUrlKey("code");
        if(!!code)
        {
          that.persondata(code, (boolean) => {
            console.log("psdrs",boolean);    
            if (boolean) {
                this.getData();
            }else{
              that.wxAuthorization();
            }
          });
        }else{
          that.wxAuthorization();
        }
      }else{
        const person = JSON.parse(window.sessionStorage.getItem('person'))
        that.headimg = person.headpic;
        that.name = person.nickname;
        that.$utils.wxgetsign(that, wx);
        this.getData();
      }
    })
  },

};
</script>
<style lang="less">
#index{
  background-color:#EAEAEA;
  .banner {
    height: 180px;
    width: 100%;
    position: relative;


    .banner-swiper {
      width: 100%;
      height: 100%;
    }
    .banner-block {
      width: 100%;
      height: 100%;
    }

    .banner-block-img {
      width: 100%;
      height: 100%;
    }

    .swiper-pagination-bullet {
      width: 6px;
      height: 3px;
      margin: 1px 2px;
      border-radius: 2px;
    }

    .swiper-pagination-bullet-active {
      width: 10px;
      background-color: #fff;
    }
  }

  .nav{
    width:100%;
    box-sizing: border-box;
    padding:0 10px;
    height:80px;
    background-color: #fff;

    .navitem{
      width:25%;
      height:100%;
      float:left;
      overflow:hidden;
      
      .navbox{
        width:100%;
        overflow: hidden;
        margin:10px auto 0;

        img{
          display:block;
          width:40px;
          height:40px;
          margin:0 auto;
        }
        span{
          display:block;
          text-align:center;
          width:100%;
          height:25px;
          font-size:12px;
          line-height:25px;
          font-weight: bold;
          color:#333;
        }
      } 
    }
  };

  .actswiper{
    box-sizing: border-box;
    overflow: hidden;
    padding:5px 15px 10px;
    background: #fff;
    width:100%;
    position: relative;
    margin-top:15px;

    .titlebox{
      display:block;
      width:100%;
    }
    .swbox{
      margin-top:5px;
    }
    .swbox,.act-block,.act-block-img{
      width:100%;
      height:100%;
    }
    .swiper-pagination2{
      position: absolute;
      bottom:10px;
      z-index: 10;
      text-align: center;
    }
    .swiper-pagination-bullet-active{
      background:#fff;
    }
  }

  .record{
    overflow: hidden;
    width:100%;
    box-sizing: border-box;
    padding:10px 15px;
    background-color:#fff;
    margin-top:15px;

    .tl{
      width:100%;
      height:40px;
      overflow:hidden;
      border-radius:5px;
      background-color:#0AC28A;
      box-sizing: border-box;
      padding:0 15px;


      .tlicon1{
        display:block;
        float:left;
        height:100%;
        background-position:left center;
        background-size:auto 10px;
        background-repeat: no-repeat;
        padding-left:15px;
        font-size: 10px;
        line-height:40px;
        color:#fff;
      }
      .tlicon2{
        display:block;
        float:left;
        height:100%;
        background-position:left center;
        background-size:auto 10px;
        background-repeat: no-repeat;
        padding-left:13px;
        font-size: 10px;
        line-height:40px;
        color:#fff;
        margin-left:10px;
      }
      .tlicon1{background-image:url(../img/index/jkicon.png)}
      .tlicon2{background-image:url(../img/index/ryicon2.png)}
      .tl_value{
        display: block;
        height:100%;
        float: left;
        font-size: 14px;
        line-height:40px;
        color:#fff;
      }
    }


    .rowbox{
      height:60px;
      width:100%;
      overflow:hidden;
      position: relative;
      margin-top:5px;

      .rimg{display: block;height:100%;float: left;}
      .relist{
        width:calc(100% - 83px);
        height:100%;
        overflow:auto;
        float: left;
        padding:0px;
        margin:0px;

        .reitem{
          width: 100%;
          height:25px;
          overflow: hidden;
          box-sizing: border-box;
          padding-left:15px;

          i{display: block;float: left;width:5px;height:5px;border-radius:100%;background-color:#333;margin-top:10px;}
          .reinfo{display: block;float:left;height:100%;font-size:10px;color:#333;line-height:25px;margin-left:15px;}
          .redate{display: block;float:left;height:100%;font-size:10px;color:#999;line-height:25px;margin-left:5px;}
        }
      }
    }
  }
  .newactbox{
    box-sizing: border-box;
    margin-top:15px;
    padding:5px 10px;
    overflow:hidden;
    background-color:#fff;


    .titlebox{
      display:block;
      width:100%;
    }

    .infobox{
      width:140px;
      height:20px;
      background-color:#0FBE88FF;
      padding:0 10px;
      margin:5px auto 0px;

      .sp1{display: block;float:left;height:100%;font-size:10px;line-height:20px;color:#fff;padding-left:14px;background:url(../img/index/newacticon.png) left center no-repeat;background-size:11px 8px;}
      .sp2{display: block;float:left;height:100%;font-size:12px;line-height:20px;color:#fff;}
    }

    .newactswiper{
      box-sizing: border-box;
      overflow: hidden;
      padding:10px 15px;
      width:100%;
      height:145px;
      position: relative;


      .newswbox,.newact-block,.newact-block-img{
        display:block;
        width:100%;
        height:100%;
      }
      .swiper-pagination3{
        position: absolute;
        bottom:10px;
        z-index: 10;
        text-align: center;
      }
      .swiper-pagination-bullet-active{
        background:#fff;
      }
    }
  }
  .phbox{
    box-sizing: border-box;
    margin-top:15px;
    background-color:#fff;
    width:100%;
    overflow: hidden;
    padding:5px 10px;


    .titlebox{
      display:block;
      width:100%;
    }

    .rowline{
      width:100%;
      overflow: hidden;
      position: relative;
      
      .infobox{
        width:140px;
        height:20px;
        background-color:#0FBE88FF;
        padding:0 10px;
        margin:5px auto 0px;

        i{display: block;float:left;width:11px;height:8px;margin-top:6px;background:url(../img/index/ph.png) center center no-repeat;background-size:100% 100%;}
        .sp1{display: block;float:left;height:100%;font-size:10px;line-height:20px;color:#fff;padding-left:14px;background:url(../img/index/ph.png) left center no-repeat;background-size:11px 8px;}
        .sp2{display: block;float:left;height:100%;font-size:12px;line-height:20px;color:#fff;}
      }

      .btn-more{
        position: absolute;
        right: 8px;
        bottom:0px;
        font-size:10px;
        color:#333333FF;
      } 
    }


    .phlist{
      width:100%;
      overflow: hidden;
      margin-top:5px;

      .phitembox{
        margin-top:5px;
        width:100%;
        height:35px;
      }
      .phitem.fst{
        background-color:rgba(253, 164, 34, 0.08);
        .r2{
          .rzinfo{color:#FD8122 !important}
        }
        
        .weui-progress__inner-bar{background-color:#FDA422;}
        
      }
      .phitem{
        width:100%;
        height:35px;
        box-sizing: border-box;
        overflow: hidden;
        border-radius:3px;
        background-color:rgba(40, 206, 132, 0.08);
        padding:0 3px;

        .phnum{
          display: block;
          height:100%;
          width:25px;
          float: left;
          box-sizing: border-box;
          padding:5px 0px;
          
          img{
            display: block;
            height:100%;
          }

          .numbox{
            width:17px;
            height:17px;
            border-radius:100%;
            border:solid 1px #28CE84FF;
            font-size: 11px;
            color:#28CE84;
            line-height:17px;
            font-weight: bold;
            text-align: center;
          }
        }



        .phinfobox{
          width:calc(100% - 25px);
          box-sizing: border-box;
          height:100%;
          overflow: hidden;
          padding:4px 3px;

          .r1{
            width:100%;
            height:15px;

            .actname{
              display: block;
              float: left;
              font-size:10px;
              line-height:15px;
              color:#333;
            }

            .acttype{
              width: 25px;
              height: 11px;
              font-size: 8px;
              float: left;
              text-align: center;
              font-weight: 400;
              line-height: 11px;
              color: #FFFFFF;
              border-radius:2px;      
              background: #0B9B6F;
              margin-top: 2px;
              margin-left:5px;
            }

            .wcl{
              display: block;
              float: right;
              width:60px;
              font-size:10px;
              line-height:15px;
              color:#333;
            }
          }
          .r2{
            width:100%;
            height:20px;

            .weui-progress{float: left;margin-top:2px;width:calc(100% - 70px)}
            .rzinfo{
              display: block;
              float:right;
              width: 60px;
              height: 11px;
              font-size: 8px;
              font-weight: 400;
              line-height: 11px;
              color: #28CE84;
              opacity: 1;
            }
            .weui-progress__bar {
              height: 6px;
              background-color: #e1e1e1;
              border-radius: 8px;
            }
            .weui-progress__inner-bar {
              border-radius: 8px;
            }
          }
        }
      }
    }
  }

  .floor{
    width:100%;
    position: fixed;
    height:55px;
    background-color:#fff;
    bottom:0px;
    box-sizing: border-box;
    padding-top:10px;
    z-index: 10;

    .flnav{
      width:25%;
      height:100%;
      overflow: hidden;
      float:left;

      .navlink{
        min-width:40px;
        overflow: hidden;
        margin:10px auto 0px;

      }
      
      .navicon{
        display: block;
        height:20px;
        width:100%;
        background-position:center center;
        background-repeat: no-repeat;
        background-size:auto 100%;
      }

      .navname{
        height: 14px;
        font-size: 10px;
        line-height: 14px;
        color: #333333;
        opacity: 1;
        text-align: center;
        padding-top:7px;
      }
    }
  }
}


</style>
