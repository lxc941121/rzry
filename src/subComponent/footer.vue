<template>
  <div class="floor">
    <div class="floor_index">
      <div class="foot_icon"><img src="@/style/img/index/foot_index.png" alt=""></div>
      <div class="foot_txt">首页</div>
    </div>
    <div class="flnav" v-for="(item,index) in navlist" :key="index" @click="cjrouteto(item.page)">
      <div class="navicon" :style="{backgroundImage: 'url(' + item.backgroundimage + ')'}"></div>
      <div class="navname">{{item.name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navlist: [
        {
          page: "index",
          name: "种养需求申报",
          backgroundimage: require("@/style/img/index/foot1.png"),
        },
        {
          page: "myRzry",
          name: "古树名木监护",
          backgroundimage: require("@/style/img/index/foot2.png"),
        },
        {
          page: "",
          name: "",
          backgroundimage: require("@/style/img/index/index_bg.png"),
        },
        {
          page: "myRzry",
          name: "养护记录上传",
          backgroundimage: require("@/style/img/index/foot3.png"),
        },
        // {
        //   page: "index",
        //   name: "绿植商城",
        //   backgroundimage: require("@/style/img/index/shop.png"),
        // },
        {
          page: "/cj",
          name: "个人中心",
          backgroundimage: require("@/style/img/index/foot4.png"),
        },
      ],
    };
  },
  methods: {
    cjrouteto(page) {
      const person = JSON.parse(window.sessionStorage.getItem("person"));
      this.$router.push({
        path: "/" + page,
        // query: {
        //   headimg: person.headpic,
        //   name: person.nickname,
        // },
      });
    },
  },
};
</script>