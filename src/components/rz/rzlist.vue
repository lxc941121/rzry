<template>
  <div>
    <div id="rzlist" style="overflow:hidden">
      <!-- 搜索框 -->
      <div style="position: relative;top: 0vh">
        <Search></Search>
      </div>
    </div>
    <div class="temp">
<!--      <el-tabs v-model="activeName">-->
<!--        <el-tab-pane label="综合排序" name="first"></el-tab-pane>-->
<!--        <el-tab-pane label="距离排序" name="second"></el-tab-pane>-->
<!--      </el-tabs>-->
      <button-tab class="tab" v-model="showTab">
        <button-tab-item selected @on-item-click="indexShow(0)">
          <span>距离排序</span>
        </button-tab-item>
        <button-tab-item @on-item-click="indexShow(1)">
          <span>价格排序</span>
        </button-tab-item>
      </button-tab>
    </div>
    <div style="clear:both"></div>
    <div>
      <!-- 区域数据列表 -->
      <treeList ref="treelist"></treeList>
    </div>
  </div>

</template>

<script>
import Search from "./rzlist/search.vue";
import qyList from "./rzlist/qyList.vue";
import treeList from "./rzlist/treeList.vue";
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
      activeName: 'first',
      list:[
        {name:"综合排序"},
        {name:"距离排序"},
      ]
    };
  },
  methods: {
    indexShow(value) {
      if (this.showTab == 0) {
        this.qyShow = true;
        this.treeShow = false;
      } else {
        this.qyShow = false;
        this.treeShow = true;
      }
      if(value==0)
      {
        this.$refs.treelist.getDataOrderByDist();
      }
      else
      {
        this.$refs.treelist.getData();
      }
      //console.log(this.$refs.treelist.list)
    },
    qyfatherjump() {
      this.$router.push("/parkDetails"); //跳转公园详情
    },
    treefatherjump(item) {
      console.log(item);
      this.$router.push({path:"/apply",query:{projectItem:item}}); //跳转树详情
    },
  },
  mounted() {
    const that = this;

  }
};
</script>
<style lang="less" scoped>
@import "../../assets/config/common.css";
.temp{
  width: 88%;
  margin:0 auto;
  padding:15px 0px;
}
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
    position: absolute;
    top: 0vh;
  }
}
</style>
