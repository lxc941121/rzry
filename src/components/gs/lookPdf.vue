<template>
  <div class="pdf">
    <div style="text-align: center;">
      <x-button class="btn" mini :gradients="['#fda422', '#fda422']" @click.native="prePage">上一页</x-button>
      <x-button class="btn" mini :gradients="['#fda422', '#fda422']" @click.native="nextPage">下一页</x-button>
      <div style="marginTop: 10px;">{{ pageNum }} / {{ pageTotalNum }}</div>
    </div>
    <pdf
      :page="pageNum"
      :src="url"
      @progress="loadedRatio = $event"
      @num-pages="pageTotalNum=$event"
    ></pdf>
  </div>
</template>

<script>
import { XButton } from "vux";
import pdf from "vue-pdf";
export default {
  name: "Pdf",
  components: {
    pdf,
    XButton,
  },
  data() {
    return {
      url: "./static/nodejs.pdf",
      pageNum: 1,
      pageTotalNum: 1, //# 总页数
      loadedRatio: 0, //# 当前页面的加载进度，范围是0-1 ，等于1的时候代表当前页已经完全加载完成了
    };
  },
  methods: {
    // 上一页
    prePage() {
      let page = this.pageNum;
      page = page > 1 ? page - 1 : this.pageTotalNum;
      this.pageNum = page;
    },

    // 下一页
    nextPage() {
      let page = this.pageNum;
      page = page < this.pageTotalNum ? page + 1 : 1;
      this.pageNum = page;
    },
  },
};
</script>

<style lang="less" scoped>
.pdf {
  /*   -webkit-box-sizing: border-box;
  box-sizing: border-box;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  overflow-x: hidden;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  font-size: 0.28rem; */
}
</style>