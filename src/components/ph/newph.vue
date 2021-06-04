<template>
  <div id="newphDiv">
    <div class="fstbox">
      <div class="fstDiv">
        <div class="first">
          <img src="@/components/img/index/tx.png" class="userhead">
        </div>
        <div class="second">
          <img src="@/components/img/index/tx.png" class="userhead">
        </div>
        <div class="third">、
          <img src="@/components/img/index/tx.png" class="userhead">
        </div>
      </div>

    </div>

    <!-- 内容 -->
    <!-- <div class="centent">
      <ul class="phList">
        <li v-for="i in phlist" :key="i.nickname">
          <p class="img" v-if=" i.ranked == '1'" style="background-color: #f88824;">
            <img src="../img/1.png" />
          </p>
          <p class="img" v-if=" i.ranked == '2'" style="background-color: #fda422;">
            <img src="../img/2.png" />
          </p>
          <p class="img" v-if=" i.ranked == '3'" style="background-color: #efcf46;">
            <img src="../img/3.png" />
          </p>
          <p class="img" v-else-if="i.ranked != '1'&&i.ranked != '2'&&i.ranked != '3'">
            <span>{{i.ranked}}</span>
          </p>
          <p class="person">
            <img :src="i.headpic" />
            <span>
              <font>捐赠人:</font>
              {{i.nickname}}
            </span>
          </p>
          <p class="num">
            已认领
            <span>{{i.count}}</span>棵
          </p>
        </li>
        <p v-if="loading">加载中...</p>
      </ul>
    </div> -->
  </div>
</template>

<script>
import { Tab, TabItem, ButtonTab, ButtonTabItem, LoadMore } from "vux";
export default {
  components: {
    //Search,
    Tab,
    TabItem,
    ButtonTab,
    ButtonTabItem,
    LoadMore,
  },
  data() {
    return {
      phlist: [],
      loading: false,
      rank: "",
      count: 0,
    };
  },
  methods: {
    // load () {
    //   this.loading = true
    // },
    // getphlist(){
    //   const that = this;
    //   that.$axios.post("/api/sys/yl/ranking/peranking",{
    //     "nowPage": self.pageNum,
    //     "pageSize": 20,
    //     "key":""
    //   },{
    //     headers: {
    //       "token":  window.sessionStorage.getItem('token')
    //     }
    //   }).then( res =>{
    //     that.phlist = res.data.pagebean.datas
    //     that.rank = res.data.myranking.ranked<10?"0"+res.data.myranking.ranked:res.data.myranking.ranked;
    //     that.count = res.data.myranking.count<10?"0"+res.data.myranking.count:res.data.myranking.count;
    //   })
    // }
  },
  mounted() {
    //this.getphlist();
  },
};
</script>

<style lang="less">
@import "../../assets/config/common.css";
#newphDiv {
  min-height: 100%;
  background: url("../img/index/phbg.png") center center no-repeat;
  background-size: 100% 100%;

  .fstbox {
    box-sizing: border-box;
    overflow: hidden;
    width: 100%;
    padding: 10px;
    .fstDiv {
      position: relative;
      width: 100%;
      height: 180px;
      .first {
        position: absolute;
        width: 37%;
        background: url(../img/index/ph1.png) top center no-repeat;
        background-size: 100% auto;
        height: 180px;
        left: 50%;
        margin-left: -18.5%;
      }
      .second {
        position: absolute;
        width: 34%;
        background: url(../img/index/ph2.png) top center no-repeat;
        background-size: 100% auto;
        height: 180px;
        left: 0%;
      }
      .third {
        position: absolute;
        width: 34%;
        background: url(../img/index/ph3.png) top center no-repeat;
        background-size: 100% auto;
        height: 180px;
        right: 0%;
      }
      .userhead {
        width: 44%;
        margin: 30px auto 0px;
        display: block;
      }
    }
  }
}
</style>