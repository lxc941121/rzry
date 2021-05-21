<template>
  <div id="myJZ">
    <!-- 首图 -->
    <div class="bgDiv">
      <img src="../img/jzbg.jpg" />
    </div>
    <!-- 列表 -->
    <ul class="jzlist">
      <li v-for="list in jzlist" :key="list.id">
        <div class="title">
          <h3>
            <i></i>
            <font v-if="list.state=='未完成'">尽责进度（进行中...）</font>
            <font v-if="list.state=='完成'">尽责进度（已完成）</font>
            <span>时间：{{list.time}}</span>
          </h3>
        </div>
        <div class="centent">
          <!-- 进度条 -->
          <div class="jd">
            <x-progress
              :percent="(list.money / 60) * 100 >100?100:(list.money / 60) * 100"
              :show-cancel="false"
              class="jdt"
            ></x-progress>
            <p
              style="display: contents;color:#13a57c"
            >{{(list.money / 60) * 100 >100?100:(list.money / 60) * 100+"%"}}</p>
            <!-- 状态 -->
            <p class="state" :style="list.state=='未完成'?'':'background-color:#28ce84'">{{list.state}}</p>
          </div>
          <!-- 金额 -->
          <div class="money">
            <p v-if="list.money<60">
              距离申请证书资格您还差
              <span>{{60-list.money}}</span>元
            </p>
            <p v-if="list.money>=60">尽责已达标，可申请证书</p>
            <p class="num">
              捐资金额：¥
              <span>{{list.money}}</span>
            </p>
            <x-button
              v-if="list.src==''&&list.money<60"
              :gradients="['#fda422', '#fda422']"
              class="btn"
              link="/zsjz"
            >去尽责</x-button>
            <x-button
              v-if="list.src==''&&list.money>=60"
              :gradients="['#fda422', '#fda422']"
              class="btn"
            >申请证书</x-button>
            <div v-if="list.src!=''">
              <x-button
                :gradients="['#28ce86', '#28ce86']"
                class="btn"
                @click.native="lookZs(list)"
              >查看证书</x-button>
              <div v-transfer-dom>
                <previewer :list="IMGlist" ref="previewer"></previewer>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { XProgress, XButton, Popover, Previewer, TransferDom } from "vux";
export default {
  directives: {
    TransferDom,
  },
  components: {
    XProgress,
    XButton,
    Popover,
    Previewer,
  },
  data() {
    return {
      //percent: (trim(this.lastNum) / trim(this.num)) * 100, //进度条
      IMGlist: [],
      jzlist: [
        {
          id: 1,
          state: "未完成",
          money: 30,
          time: "2020-08-22",
          src: "",
        },
        {
          id: 2,
          state: "完成",
          money: 120,
          time: "2019-08-22",
          src: "",
        },
        {
          id: 3,
          state: "完成",
          money: 60,
          time: "2018-08-22",
          src: "",
        },
        {
          id: 5,
          state: "完成",
          money: 60,
          time: "2017-08-22",
          src: require("../img/zs.jpg"),
        },
      ],
    };
  },
  methods: {
    lookZs(list) {
      let item = {
        src: list.src,
      };
      this.IMGlist.length = 0;
      this.IMGlist.push(item);
      this.$refs.previewer[0].show(0)
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../assets/config/common.css";
#myJZ /deep/ .weui-progress__bar {
  height: 10px;
  background-color: #e1e1e1;
  border-radius: 8px;
}
#myJZ /deep/ .weui-progress__inner-bar {
  border-radius: 8px;
}
#myJZ {
  .bgDiv {
    width: 100%;
    height: 130px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .jzlist {
    li {
      margin-top: 15px;
      margin-left: 15px;
      margin-right: 15px;
      .title {
        i {
          background-position: left;
          width: 35px;
          height: 35px;
          display: block;
          float: left;
          background-image: url("../img/xqx.png");
          background-repeat: no-repeat;
          background-size: 200px;
        }
        h3 {
          margin: 0;
          padding: 2px 0px;
          line-height: 33px;
          border-bottom: 1px solid #75b299;
          color: #2f987a;
          span {
            float: right;
            font-size: 12px;
            color: #000;
          }
        }
      }
      .centent {
        background-color: #f5f5f5;
        .jd {
          padding: 10px 10px;
          position: relative;
          .jdt {
            width: 70%;
            display: inline-block;
          }
          .state {
            position: absolute;
            top: 0;
            right: 0;
            background: #fda424;
            color: #fff;
            padding: 2px 10px;
            font-size: 12px;
            border-radius: 16px 0 0 16px;
          }
        }
        .money {
          padding-left: 10px;
          padding-right: 10px;
          padding-bottom: 1px;
          position: relative;
          p {
            font-size: 12px;
            margin: 5px 0;
            span {
              font-size: 14px;
              font-weight: bold;
            }
          }
          .num {
            font-size: 14px;
            color: #fda422;
            font-weight: bold;
            span {
              font-size: 16px;
            }
          }
          .btn {
            position: absolute;
            bottom: 5px;
            right: 5px;
            width: 70px;
            height: 26px;
            margin: 2px 2px;
            padding: 0;
            font-size: 14px;
            line-height: 26px;
            border-radius: 16px;
          }
        }
      }
    }
  }
}
</style>