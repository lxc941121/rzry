import Vue from "vue";
import VueRouter from "vue-router";

/* import HelloWorld from '@/components/HelloWorld' */

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "城市数林公众服务平台",
      component: resolve => require(["@/components/index/index.vue"], resolve)
    },
    {
      path: "/map",
      name: "城市数林公众服务平台",
      component: resolve => require(["@/components/rzry/index.vue"], resolve)
    },
    {
      path: "/rzlist",
      name: "认种列表",
      component: resolve => require(["@/components/rz/rzlist.vue"], resolve)
    },
    {
      path: "/treeDetails",
      name: "认养详情",
      component: resolve =>
        require(["@/components/ry/treeDetails.vue"], resolve)
    },
    {
      path: "/rylist",
      name: "认养列表",
      component: resolve => require(["@/components/ry/rylist.vue"], resolve)
    },
    {
      path: "/zsjz",
      name: "植树尽责",
      component: resolve => require(["@/components/zsjz/zsjz.vue"], resolve)
    },
    {
      path: "/zsjzInput",
      name: "尽责信息",
      component: resolve =>
        require(["@/components/zsjz/zsjzInput.vue"], resolve)
    },
    {
      path: "/parkDetails",
      name: "认种公园详情",
      component: resolve =>
        require(["@/components/rz/parkDetails/parkDetails.vue"], resolve)
    },
    {
      path: "/ryparkDetails",
      name: "认养公园详情",
      component: resolve =>
        require(["@/components/ry/parkDetails/parkDetails.vue"], resolve)
    },
    {
      path: "/applyInput",
      name: "认种信息",
      component: resolve =>
        require(["@/components/rz/input/applyInput.vue"], resolve)
    },
    {
      path: "/apply",
      name: "认种申请信息",
      component: resolve =>
        require(["@/components/rz/input/apply.vue"], resolve)
    },
    {
      path: "/ryapplyInput",
      name: "认养信息",
      component: resolve =>
        require(["@/components/ry/input/applyInput.vue"], resolve)
    },
    {
      path: "/yhjl",
      name: "上传记录",
      component: resolve =>
      require(["@/components/upload/upload.vue"], resolve)
    },
    // {
    //   path: "/infoConfirm",
    //   name: "信息确认",
    //   component: resolve =>
    //     require(["@/components/rzry/infoConfirm.vue"], resolve)
    // },
    {
      path: "/ph",
      name: "排行排名",
      component: resolve => require(["@/components/ph/ph.vue"], resolve)
    },
    {
      path: "/newph",
      name: "排行排名",
      component: resolve => require(["@/components/ph/newph.vue"], resolve)
    },
    {
      path: "/gs",
      name: "资金公示",
      component: resolve => require(["@/components/gs/gs.vue"], resolve)
    },
    {
      path: "/lookPdf",
      name: "公示浏览",
      component: resolve => require(["@/components/gs/lookPdf.vue"], resolve)
    },
    {
      path: "/cj",
      name: "我的成就",
      component: resolve => require(["@/components/cj/cj.vue"], resolve)
    },
    {
      path: "/detailsRecord",
      name: "养护记录",
      component: resolve =>
        require(["@/components/rzry/detailsRecord.vue"], resolve)
    },
    {
      path: "/myJZ",
      name: "我的尽责",
      component: resolve => require(["@/components/personal/myJZ.vue"], resolve)
    },
    {
      path: "/grzx",
      name: "个人中心",
      component: resolve => require(["@/components/personal/grzx.vue"], resolve)
    },
    {
      path: "/myRzry",
      name: "我的认种认养",
      component: resolve =>
        require(["@/components/personal/myRzry.vue"], resolve)
    },
    {
      path: "/agreement",
      name: "认种认养条款",
      component: resolve =>
        require(["@/components/rzry/item/agreement.vue"], resolve)
    },
    {
      path: "/complete",
      name: "完成状态",
      component: resolve =>
        require(["@/components/rzry/complete/complete.vue"], resolve)
    },
    {
      path: "/share",
      name: "分享",
      component: resolve =>
        require(["@/components/share/share.vue"], resolve)
    }
  ],
  //mode: "history"
});
