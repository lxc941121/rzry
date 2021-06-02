<template>
  <div id="newphDiv">
    <div class="fstbox">
      <div class="fstDiv">
        <div class="first">
          <img src="@/components/img/index/tx.png" class="userhead">
        </div>
        <div class="second"></div>
        <div class="third"></div>
      </div>

    </div>
    <!-- 内容 -->
    <div class="centent">
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
    </div>
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
    load() {
      this.loading = true;
    },
    getphlist() {
      const that = this;
      that.$axios
        .post(
          "/api/sys/yl/ranking/peranking",
          {
            nowPage: self.pageNum,
            pageSize: 20,
            key: "",
          },
          {
            headers: {
              token: window.sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          that.phlist = res.data.pagebean.datas;
          that.rank =
            res.data.myranking.ranked < 10
              ? "0" + res.data.myranking.ranked
              : res.data.myranking.ranked;
          that.count =
            res.data.myranking.count < 10
              ? "0" + res.data.myranking.count
              : res.data.myranking.count;
        });
    },
  },
  mounted() {
    this.getphlist();
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

#phDiv /deep/ .vux-button-group > a {
  color: #04be02;
}
#phDiv /deep/ .vux-button-group > a.vux-button-group-current {
  color: #fff;
}
#phDiv {
  .bgDiv {
    width: 100%;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
    }
  }
  .myinfo {
    padding: 10px 15px;
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;

    .myph {
      float: left;
      height: 25px;
      width: 100px;
      position: relative;
      background: url(../img/phimg.png) top left no-repeat;
      background-size: 100% 100%;
      font-size: 12px;
      color: #fff;
      font-weight: bold;
      line-height: 28px;
      box-sizing: border-box;
      text-align: left;
      padding-left: 30px;
    }
    .mycount {
      float: right;
      height: 25px;
      width: 165px;
      position: relative;
      background: url(../img/rzcount.png) top left no-repeat;
      background-size: 100% 100%;
      font-size: 12px;
      color: #fff;
      font-weight: bold;
      line-height: 28px;
      box-sizing: border-box;
      text-align: left;
      padding-left: 18px;
    }
  }
  .centent {
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 15px;
    .phList {
      margin-top: 10px;
      li {
        width: 100%;
        height: 55px;
        margin-bottom: 15px;
        p {
          float: left;
          display: inline-block;
          margin: auto;
          height: 100%;
        }
        .img {
          width: 18%;
          background-color: #09ab7c;
          border-radius: 4px 0px 0px 4px;
          span {
            display: block;
            color: #fff;
            font-size: 24px;
            font-weight: bold;
            width: 100%;
            text-align: center;
            line-height: 50px;
          }
          img {
            width: 65%;
            padding: 11px 9px;
          }
        }
        .person {
          width: 55%;
          border: 1px solid #28ce84;
          border-left: none;
          border-right: none;
          box-sizing: border-box;
          -moz-box-sizing: border-box;
          position: relative;
          img {
            width: 35px;
            padding: 9px 5px;
            border-radius: 50%;
          }
          span {
            position: absolute;
            bottom: 18px;
            font-size: 12px;
            width: 90px;
            display: block;
            left: 50px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font {
              color: #337c6b;
              font-size: 12px;
            }
          }
        }
        .num {
          width: 30%;
          height: 0px;
          margin-left: -11%;
          position: absolute;
          border-bottom: 60px solid #28ce84;
          border-left: 22px solid transparent;
          line-height: 60px;
          font-size: 12px;
          color: #fff;
          font-weight: bold;
          span {
            font-size: 16px;
            color: #e7fe2a;
          }
        }
      }
    }
  }
}
</style>
