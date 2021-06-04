<template>
  <div id="index">
    <!-- headbar -->
    <div class="headbar">
      <div class="headicon">
        <img src="@/style/img/index/icon_head.png" alt="" class="icon_img">
        <div class="rank">排行:1000+</div>
      </div>
      <div class="head_scan">
        <img src="@/style/img/index/scan.png" alt="">
        <div class="scan_txt">扫一扫</div>
      </div>
      <div class="headsearch">
        <div class="head_one"><img src="@/style/img/index/search.png" alt=""></div>
        <div class="head_input"><input type="text" placeholder="在此处输入相关搜索词"></div>
        <div class="head_btn">搜索</div>
      </div>

    </div>

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
        <div class="navbox" @click="routeto('rzlist')">
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
      <div class="navitem">
        <div class="navbox">
          <img src="@/style/img/index/shop_icon.png">
          <span>商城</span>
        </div>
      </div>
    </div>
    <!-- 我的认种认养历史 -->
    <div class="gray_line"></div>
    <div class="index_history" @click="routeto('rzlist')">
      <div class="his_bar">我的认种认养历史</div>
      <div class="no_his"><img src="@/style/img/index/no_rz.png" alt="">
        <div class="rz_btn">立即领养</div>
      </div>
    </div>

    <!-- 虚拟养护 -->
    <div class="gray_line"></div>
    <div class="index_history" @click="handleGoA('watering')">
      <div class="his_bar his_bar2">虚拟养护</div>
      <div class="no_his"><img src="@/style/img/index/wlq.png" alt="">
        <div class="rz_btn rz_btn2">立即领取种子</div>
      </div>
      <div class="goget"><img src="@/style/img/index/barbg3.png" alt=""></div>
    </div>
    <!-- 认种认养 -->
    <div class="gray_line"></div>
    <div class="index_history">
      <div class="his_bar his_bar2">认种认养</div>
      <div class="no_his"><img src="@/style/img/index/pic1.png" alt="">
      </div>
    </div>

    <!-- <div class="actswiper">
      <img src="@/components/img/index/rzrytl.png" class="titlebox">
      <swiper :options="swiperOptions2" ref="mySwiper" class="swbox">
        <swiper-slide v-for="(item,index) in prolisti" :key="index">
          <div class="act-block" :data-value="item.id" @click="prorouteto(item.id)">
            <img src="@/components/img/index/activelist.png" class="act-block-img">
          </div>
        </swiper-slide>
        <div class="swiper-pagination2" slot="pagination"></div>
      </swiper>
    </div> -->

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
    <!-- 最新活动 -->
    <div class="newactbox">
      <div class="his_bar his_bar2">最新活动</div>
      <!-- <img src="@/components/img/index/titlebg.png" class="titlebox"> -->
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
      <!-- <img src="@/components/img/index/phicon2.png" class="titlebox"> -->
      <div class="his_bar his_bar2">项目排行</div>
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
    <div class="gray_line"></div>
    <div style="height:55px;"></div>
    <footer-bar />
    <!-- <div class="floor">
      <div class="flnav" v-for="(item,index) in navlist" :key="index" @click="cjrouteto(item.page)">
        <div class="navicon" :style="{backgroundImage: 'url(' + item.backgroundimage + ')'}"></div>
        <div class="navname">{{item.name}}</div>
      </div>
    </div> -->
  </div>
</template>
<script>
/* eslint-disable */
import wx from "weixin-js-sdk";
import bus from "../../assets/config/eventBus";
import { url, inde_url } from "../../assets/config/config";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import { XProgress } from "vux";
import footerBar from "@/subComponent/footer";

// var graphicLayer,map=null;
export default {
  name: "index",
  components: {
    swiper,
    swiperSlide,
    XProgress,
    footerBar,
  },

  data() {
    return {
      swiperOptions: {
        observer: true,
        observeParents: true,
        loop: false,
        autoplay: {
          disableOnInteraction: false,
          delay: 5000,
        },
        pagination: {
          el: ".swiper-pagination",
        },
      },

      swiperOptions2: {
        observer: true,
        observeParents: true,
        loop: false,
        autoplay: {
          disableOnInteraction: false,
          delay: 5000,
        },
        pagination: {
          el: ".swiper-pagination2",
        },
      },

      swiperOptions3: {
        observer: true,
        observeParents: true,
        loop: false,
        autoplay: {
          disableOnInteraction: false,
          delay: 5000,
        },
        pagination: {
          el: ".swiper-pagination3",
        },
      },
      prolist: [],
      prolisti: [],
      barrage: [],
    };
  },
  methods: {
    async getData() {
      const self = this;
      await self.$axios
        .post(
          "/api/sys/yl/project/list",
          {
            nowPage: self.pageNum,
            pageSize: 20,
            orderByStr: "tree_price",
            orderByType: 1,
          },
          {
            headers: {
              token: window.sessionStorage.getItem("token"),
            },
          }
        )
        .then(function (res) {
          // debugger
          if (res.data.code == -1) {
            window.location.href = "/#/index";
          } else {
            const length = res.data.datas.length;
            self.prolist = res.data.datas;
            self.prolist.forEach((element) => {
              if (!element["yrzs"]) {
                element["yrzs"] = 0;
              }
            });
            self.prolist = self.prolist.sort((value1, value2) => {
              return (
                parseInt((value2.yrzs / value2.project_scale) * 100) -
                parseInt((value1.yrzs / value1.project_scale) * 100)
              );
            });

            console.log(self.prolist);
            if (length > 0) {
              self.prolisti = self.prolist.filter(function (item) {
                return item.pubstate == 1;
              });
            }
          }
        });

      await this.$axios
        .post(
          "/api/sys/yl/order/GetOrderMsg",
          {
            nowPage: 1,
            pageSize: 10,
            total: 0,
          },
          {
            headers: {
              token: window.sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          this.barrage = res.data.datas;
          this.barrage = this.barrage.filter((item) => {
            return item.registered_name;
          });
          this.barrage.forEach((item) => {
            var diffminute = Math.floor(
              (new Date().getTime() - item.payment_date) / (60 * 1000)
            );
            var diffhours = diffminute / 60;
            var diffday = diffhours / 24;
            if (diffday >= 1) {
              item["redate"] = parseInt(diffday) + "天前";
            } else if (diffhours >= 1) {
              item["redate"] = parseInt(diffday) + "小时前";
            } else {
              item["redate"] =
                parseInt(diffminute <= 0 ? "1" : diffminute) + "分钟前";
            }
            if (item.registered_name.length > 5) {
              item.registered_name =
                item.registered_name.substring(0, 5) + "...";
            }
          });
        });

      // console.log("排序后的list",self.list)
    },
    routeto(pagename) {
      this.$router.push({ path: "/" + pagename });
    },
    prorouteto(params) {
      console.log("11");
      this.$router.push({ path: "/apply", query: { projectItem: params } });
    },

    cjrouteto(page) {
      const person = JSON.parse(window.sessionStorage.getItem("person"));
      this.$router.push({
        path: "/" + page,
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
          window.sessionStorage.setItem("res", res.data); //存入sessionStorage
          //this.$cookies.set("res", res.data); //存入cookise
          window.location.href = res.data;
        });
    },
    persondata(cookie, fn) {
      window.sessionStorage.setItem("code", this.$utils.getUrlKey("code"));
      // this.$cookies.set("code", this.$utils.getUrlKey("code"));
      // const code = this.$cookies.get("code");
      const that = this;
      const code = window.sessionStorage.getItem("code");
      console.log("code", code);
      this.$axios
        .get(`/fapi/public/main/invoke?code=${code}`, {})
        .then((res) => {
          console.log("psd", res);
          if (res.data.code != 100) {
            //JSON.parse(res.data.user_info).errcode
            fn && fn(false);
          } else {
            // console.log('res',res.data);
            window.sessionStorage.setItem("token", res.data.wxscToken);
            // this.$cookies.set('token',res.data.wxscToken);
            const person = JSON.parse(res.data.userInfo); //用户全部信息
            that.headimg = person.headpic;
            that.name = person.nickname;
            console.log(person);
            console.log(JSON.parse(res.data.userInfo));
            window.sessionStorage.setItem("person", res.data.userInfo);
            that.$utils.wxgetsign(that, wx);
            if (res.data.newUser) {
              that.navtxt = true;
            } else {
              that.showtxt = true;
            }
            //this.$cookies.set("person", person); //存入cookise
            fn && fn(true);
          }
        });
    },
    handleGoA(Obj) {
      this.$router.push({
        path: "/" + Obj,
      });
    },
  },
  mounted() {
    /* 获取用户信息,通过存入用户信息判断 */
    const that = this;
    this.$axios
      .post(
        "/api/sys/yl/user/userInfo",
        {},
        {
          headers: {
            // token: window.sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.code == -1) {
          let code = that.$utils.getUrlKey("code");
          if (!!code) {
            that.persondata(code, (boolean) => {
              console.log("psdrs", boolean);
              if (boolean) {
                this.getData();
              } else {
                that.wxAuthorization();
              }
            });
          } else {
            that.wxAuthorization();
          }
        } else {
          const person =
            JSON.parse(window.sessionStorage.getItem("person")) || res.data;
          that.headimg = person.headpic;
          that.name = person.nickname;
          that.$utils.wxgetsign(that, wx);
          this.getData();
        }
      });
  },
};
</script>
<style lang="less">
@import "../../style/index.less";
</style>
