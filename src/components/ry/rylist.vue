<template>
  <div id="rzlist">
    <!-- <div class="bg"></div> -->
    <!-- 标签切换 -->
    <button-tab class="tab" v-model="showTab">
      <button-tab-item selected @on-item-click="indexShow()">
        <span>认养区域</span>
      </button-tab-item>
      <button-tab-item @on-item-click="indexShow()">
        <span>认养列表</span>
      </button-tab-item>
    </button-tab>
    <!-- 搜索框 -->
    <Search></Search>
    <!-- 区域数据列表 -->
    <qyList v-if="qyShow"></qyList>
    <treeList v-if="treeShow"></treeList>
  </div>
</template>

<script>
import Search from "./rylist/search.vue";
import qyList from "./rylist/qyList.vue";
import treeList from "./rylist/treeList.vue";
/* import { Search } from "vux"; */
import { ButtonTab, ButtonTabItem } from "vux";
export default {
  components: {
    Search,
    ButtonTab,
    ButtonTabItem,
    qyList,
    treeList,
  },
  data() {
    return {
      showTab: 0,
      qyShow: true,
      treeShow: false,
      list: [
        {
          id: 1,
          name: "白鹿洲公园",
          tree: "榕树",
          num: "2000",
          lastNum: "87",
        },
        {
          id: 2,
          name: "马鞍池公园",
          tree: "梧桐、榕树",
          num: "2000",
          lastNum: "87",
        },
        {
          id: 3,
          name: "杨府山公园",
          tree: "杨梅树",
          num: "2000",
          lastNum: "24",
        },
        {
          id: 4,
          name: "下吕浦公园",
          tree: "榕树",
          num: "2000",
          lastNum: "150",
        },
      ],
    };
  },
  methods: {
    indexShow() {
      if (this.showTab == 0) {
        this.qyShow = true;
        this.treeShow = false;
      } else {
        this.qyShow = false;
        this.treeShow = true;
      }
    },
    qyfatherjump() {
      this.$router.push("/ryparkDetails"); //跳转公园详情
    },
    treefatherjump() {
      this.$router.push("/treeDetails"); //跳转树详情
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../assets/config/common.css";
#rzlist /deep/ .vux-button-group > a {
  color: #04be02;
}
#rzlist /deep/ .vux-button-group > a.vux-button-group-current {
  color: #fff;
}
#rzlist {
  .bg {
    width: 100%;
    height: 45px;
    padding-top: 25px;
    background-image: url("../img/listbg.jpg");
    background-position: center;
    background-size: 100%;
    background-color: #666;
  }
  .tab {
    padding: 20px 15px;
  }
}
</style>