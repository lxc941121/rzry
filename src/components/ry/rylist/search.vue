<template>
  <div id="searchDiv">
    <input placeholder="请输入想查询的区域或树木" type="text" />
    <x-icon class="btn" type="ios-search-strong" size="30"></x-icon>
    <selector class="sselect" :options="list" v-model="defaultValue"></selector>
  </div>
</template>

<script>
// import Search from "./components/search.vue";
import { Selector } from "vux";
export default {
  components: { Selector },
  data() {
    return {
      defaultValue: "zh",
      list: [
        { key: "zh", value: "综合排序" },
        { key: "jl", value: "距离排序" },
        { key: "rd", value: "热度排序" },
      ],
    };
  },
};
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
    width: 57%;
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
    top: 4px;
    right: 10%;
  }
}
</style>