<template>
  <div id="parkDetails">
    <!-- 图片 -->
    <div class="imgDiv">
      <img v-for="list in IMGlist" :key="list.id" :src="list.src" @click="previewImage" />
      <div v-transfer-dom>
        <previewer :list="IMGlist" ref="previewer"></previewer>
      </div>
      <!-- 标题 -->
      <h3>白鹿洲公园</h3>
    </div>
    <!-- 右上角按钮 -->
    <div class="rightDiv">
      <div @click="()=>$router.push('/ph')">
        <img :src="require('../../img/qph.png')" alt />
        <p>排行榜</p>
      </div>
      <div @click="()=>$router.push('/detailsRecord')">
        <img :src="require('../../img/jl.png')" alt />
        <p style="background-color:#12a77b">养护记录</p>
      </div>
    </div>
    <!-- 简介 -->
    <Flexbox>
      <Flexbox-item>
        <p
          class="textDetails"
        >白鹿洲公园位于温州市区南塘河畔，锦绣路与飞霞南路的交汇处东南角，北靠锦绣路，西连飞霞南路，东临南塘河，通过两座优雅的桥梁与南塘风貌区相连。白鹿洲公园作为温州市市政府的重点项目，与南塘街组成了温州人的会客厅，深受市民的喜爱。内部河道蜿蜒交错，并且有固定班次的水上巴士经停于此。</p>
      </Flexbox-item>
    </Flexbox>

    <!-- 标题 -->
    <div class="title">
      <img :src="require('../../img/xqx.png')" style="left: 10px;" />
      <h3>认养列表</h3>
      <img :src="require('../../img/xqx.png')" class="imgborder" />
    </div>
    <!-- 列表 -->
    <detailsList></detailsList>
  </div>
</template>

<script>
import detailsList from "./detailsList.vue";
import { Flexbox, FlexboxItem, Previewer, TransferDom } from "vux";
export default {
  directives: {
    TransferDom,
  },
  components: {
    Flexbox,
    FlexboxItem,
    Previewer,
    detailsList,
  },
  data() {
    return {
      IMGlist: [
        {
          id: 1,
          src: require("../../img/blz.jpg"),
        },
      ],
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
    fatherjump() {
      this.$router.push("/treeDetails"); //跳转认养下单界面
    },
  },
};
</script>
<style lang="less" scoped>
#parkDetails {
  .rightDiv {
    width: 115px;
    position: absolute;
    right: 5px;
    top: 5px;
    div {
      width: 55px;
      display: inline-block;
    }
    p {
      width: 50px;
      text-align: center;
      font-size: 10px;
      background-color: #f98824;
      margin: 0;
      color: #fff;
      padding: 0px 3px;
      border-radius: 8px;
    }
    img {
      width: 30px;
      margin: auto;
      display: block;
    }
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
      color: #fff;
      padding: 5px 15px;
      font-size: 14px;
      background-color: #fda422;
      border-radius: 0 16px 16px 0;
    }
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
  .textDetails {
    padding-left: 10px;
    padding-right: 10px;
  }
  .card-demo-flex {
    display: flex;
  }
  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
  .card-demo-flex span {
    color: #f74c31;
  }
}
</style>