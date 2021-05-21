<template>
  <div>
    <div id="searchDiv">
      <div >
        <input placeholder="请输入要查询的项目" type="text" @keyup.enter="searchInit" v-model="page.key" />
        <x-icon class="btn" type="ios-search-strong" size="30" @click="searchInit"></x-icon>
      </div>

    </div>
    <div>
    </div>
  </div>

</template>

<script>
// import Search from "./components/search.vue";
import { Selector } from "vux";
import bus from "../../../assets/config/eventBus";
export default {
  components: { Selector },
  data() {
    return {
      defaultValue: "zh",
      list: [
        { key: "zh", value: "综合排序" },
        { key: "jl", value: "距离排序" },
        // { key: "rd", value: "热度排序" },
      ],
      page: {
        nowPage: 1,
        pageSize: 10,
        key: '',
      },
      activeName:"first",
    };
  },
  methods:{
    searchInit(){
      const that = this;
      bus.$emit("search", that.page.key);
      // that.$parent.$refs.treeList.getData();
    }

  }};
</script>

<style lang="less" scoped>
#searchDiv /deep/ .weui-cell:before {
  display: none;
}
#searchDiv {
  position: relative;
  margin-bottom: 15px;
  margin-left: 15px;
  margin-right: 15px;
  .sselect {
    width: 33%;
    border-radius: 18px;
    background-color: #eaeaea;
    border: 1px solid #ddd;
    font-size: 12px;
  }
  input {
    outline: none;
    -webkit-appearance: none; /*去除系统默认的样式*/
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* 点击高亮的颜色*/
    border: 1px solid #ddd;
    background-color: #eaeaea;
    width: 93%;
    margin: auto;
    display: block;
    border-radius: 18px;
    padding: 10px 10px;
    font-size: 14px;
    float: left;
    margin-right: 1%;
  }
  .btn {
    position: absolute;
    top: 5%;
    right: 2vh;
    z-index: 1;
  }
  .weui-cell_select{
    margin-left: 0px !important;
  }
}
</style>
