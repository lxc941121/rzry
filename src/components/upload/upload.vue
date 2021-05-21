<style>
    .el-upload-list--picture-card .el-upload-list__item{
      width:17vh;
      height:17vh;
    }
    .el-message-box{width:80% !important;}
</style>
<template>
  <div id="applyInput">
    <!-- 图片 -->
    <div class="imgDiv">
      <img :src="require('../img/rs1.jpg')"/>
    </div>
    <!-- 标题 -->
    <div class="title" style="margin-top: 15px;">
      <img :src="require('../img/xqx.png')" style="left: 10px;"/>
      <h3>养护记录</h3>
      <img :src="require('../img/xqx.png')" class="imgborder"/>
    </div>
    <!-- 表单 -->
    <el-form class="form" ref="form" label-width="105px">
      <el-form-item label="项目所属年度">
        <el-select v-model="year" placeholder="请选择所属年度">
           <el-option label="2021" value="2021"></el-option>
          <el-option label="2020" value="2020"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input :style="{width: '90%'}" v-model="projectinfo.project_name" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="养护类型">
        <el-select v-model="type" placeholder="请选择类型">
          <el-option label="养护" value="2"></el-option>
          <el-option label="种植" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业主单位名称" v-if="identity==1">
        <el-input  :style="{width: '90%'}" v-model="projectinfo.proprietor" :disabled="true"></el-input>
      </el-form-item>
       <el-form-item label="认养人微信昵称" v-if="identity==2">
        <el-input  :style="{width: '90%'}" v-model="username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="养护描述">
        <el-input type="textarea" v-model="describe"  placeholder="请描述本次养护具体内容，如：胶水、施肥、剪枝、培土、种植、固定等"></el-input>
      </el-form-item>
      <el-form-item label="养护图片">
        <el-upload
          action="/api/sys/attachment/uploadImg"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          name="file"
          :on-success="handleAvatarSuccess"
          :on-remove="handleRemove"
          :headers="headers"
          :before-upload="checkcount"
          accept="image/*" 
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>

      </el-form-item>
      <div class="applyInput">
        <!-- 说明 -->
        <div class="smDiv">
          <p>
            <x-icon type="ios-information-outline" size="20" style="vertical-align: bottom;"></x-icon>
            注：只能上传jpg/png文件，且不超过500kb(上传照片最多只能上传5张)
          </p>
        </div>
      </div>
      <el-form-item>
        <el-button type="warning" @click="onSubmit">立即保存并添加</el-button>
      </el-form-item>
      <el-form-item >
        <el-button :style="{top:'2vh'}" @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import CountDown from "../rzry/item/CountDown";

  export default {
    name: "upload",
    components: {},
    data() {
      return {
        year:"",
        finish:false,
        describe:"",
        projectinfo:{},
        identity:"",
        project_num:"",
        userid:"",
        username:"",
        proprietor:"",
        piclist:[],
        dialogVisible:false,
        dialogImageUrl: '',
        type:"",
        test:{
          "JsParams": "JsParams(appId=wx10e914f13eeac627, timeStamp=1606201145, nonceStr=65de13ad5d1741538713e574c8d71970, packageStr=prepay_id=wx241459038592459bc143535b88c8e50000, signType=MD5, paySign=1828E20BBF0D439CC8CBAFA099255C1D)"
        },
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    computed: {
        headers() {
            return {
                "token": window.sessionStorage.getItem('token'),
            }
        }
    },
    methods: {
      getUserInfo() {
      this.$axios.post("/api/sys/yl/user/userInfo","",{
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then( res =>{
        if (res.data.msg && res.data.msg.indexOf("未登录")!=-1){
          window.location.href="/#/map";
        }else{
            this.userid = res.data.data.id;
            this.username = res.data.data.nickname;
        }
      })    
    },

    getprojectinfo(){
      const that = this;
      that.$axios.post("/api/sys/yl/project/info?id="+that.project_num,"", {
        headers: {
          "token":  window.sessionStorage.getItem('token')
        }
      }).then(function (res) {
        that.projectinfo = res.data.formItem;
      })
    },
    onSubmit() {
      const that = this;
      var params = {};
      params.project_num=that.project_num;
      params.maintence_flg=Number(that.type);
      params.content=that.describe;
      params.maintence_person=that.userid;
      params.year=that.year;
      params.creatortype = that.identity;

      that.piclist.forEach((item,index)=>{
        params["picture_"+(index+1)] = item;
      })

      that.$axios.post("/api/sys/yl/maintain/update",params,{
        headers: {
          "token":  window.sessionStorage.getItem('token')
          }
      }).then(function (res) {
        if (res.data.code==100) {
            that.$alert('上传成功！！','提示', {
            confirmButtonText: '确定',
            callback: action => {
              that.$router.push({ path: '/detailsRecord', query: { project_num: that.project_num,orderid:that.$route.query.orderid} });
            }
          });
        }else{
          that.$alert('上传失败！！('+res.data.msg+")",'提示', {
            confirmButtonText: '确定',
          });
        }
      })
    },
    handleRemove(file) {
      // var index = this.imglist.indexOf(file.response.data[0]);
      // this.imglist.splice(index, 1);
      var picinfo = JSON.parse(file.response.data);
      var index = this.piclist.indexOf(picinfo.id);
      if(index>=0&&index<=this.piclist.length-1)
      {
        this.piclist.splice(index,1)
      }
      console.log(this.piclist);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res) {
      if(res.code==100)
      {
        var picinfo = res.data;//JSON.parse(res.data);     
        this.piclist = this.piclist.concat(picinfo.id);
      }
      
    },
    checkcount(){
      if(this.piclist.length>=5)
      {
        this.$message.error("上传图片数量不能超过5张！！！");
        return false;
      }
    },
    open(msg) {
      this.$alert(msg,'无法上传', {
        confirmButtonText: '确定',
        callback: action => {
          window.location.href="/#/map";
        }
      });
    }
      
  },
  mounted() {
      const that = this;
      that.identity=this.$route.query.identity;
      that.project_num = this.$route.query.project_num;


      if(!that.identity){that.open('您不是认养人或者业主单位无法上传养护记录！！')}
      if(that.identity!=1&&that.identity!=2){that.open('未选择身份无法上传养护记录！！')}
      that.$axios.post("/api/sys/yl/userrole/getUserRoleMobile", {}, {
        headers: {
          "token":  window.sessionStorage.getItem('token')
          }
        }).then(function (res) {
        if (res.data.msg.indexOf("成功")!=-1){
          if (res.data.code == 100){
            if(that.identity==2&&res.data.datas.orderCount<=0){
              that.open("您不是认种或认养人无法上传养护记录！！")
              // orderCount: 6
              // roleCount: 1
            }
            if(that.identity==1&&res.data.datas.roleCount<=0)
            {
              that.open("您不是业主无法上传养护记录！！")      
            }
            that.getUserInfo();
            that.getprojectinfo();
          }
        }
      });

    }
  }
</script>

<style lang="less" scoped scoped>
  @import "../../assets/config/common.css";

  #applyInput /deep/ .vux-x-icon {
    fill: #fda422;
  }

  #applyInput {

    .smDiv {
      background-color: #feedd1;
      padding: 1px 10px;
      border-radius: 8px;
      color: #fda422;
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
        background-color: #fda422;
        width: 70px;
        margin: 0;
        height: 30px;
        text-align: center;
        line-height: 30px;
        float: left;
      }

      .money {
        position: absolute;
        bottom: 0;
        color: #fff;
        width: 100%;
        height: 30px;
        background-color: #28ce84;
        text-align: right;

        p {
          margin: 0;
          line-height: 30px;
          padding-right: 10px;
        }

        .time {
          display: inline;
          line-height: 30px;
        }
      }
    }

    .textDetails {
      padding-left: 10px;
      padding-right: 10px;
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

    .tableDiv {
      margin-left: 15px;
      margin-right: 15px;
      font-size: 14px;

      th {
        width: 50%;
        text-align: right;
        color: #289b7a;
      }

      td {
        width: 50%;
        text-align: left;
        color: #dfaa59;
      }
    }

    .heji {
      margin-left: 15px;
      width: 160px;
      color: #fda422;
      padding: 9px 10px;
      font-weight: bold;
      margin-top: 10px;
      float: left;
      font-size: 16px;
    }

    .applyInput {
      // border: 1px solid #76b198;
      margin-left: 15px;
      margin-right: 15px;
      border-radius: 6px;
      padding: 10px 10px;
      margin-bottom: 15px;

      table {
        color: #16a57b;

        th {
          width: 25%;
          text-align: right;
        }

        td {
          width: 75%;
        }
      }
    }

    .nextBtn {
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #fff;
      border-top: 1px solid #ddd;
      z-index: 10;

      .btn {
        width: 80px;
        float: right;
        margin-right: 10px;
        margin-bottom: 10px;
        margin-top: 10px;
        border-radius: 25px;
      }
    }

    .item {
      border: 1px solid #ececec;
      padding: 0px 15px;
    }

    .item-selected {
      border: 2px solid #09ab7c;
    }
  }

  .form{
    padding-left: 2vh;
    padding-top: 2vh;
  }

  * /deep/ .el-upload--picture-card{
    width: 14vh;
    height: 14vh;
    line-height: 14vh;
  }

  /**!deep/ .el-input{*/
  /*  width: 80%;*/
  /*}*/

  */deep/ .el-textarea__inner{
    width: 90%;
    height: 10vh;
  }
  */deep/  .el-form-item__label{
    color: #28CE84;
  }

  */deep/ .el-button{
    position: absolute;
    width: 100%;
    left: -7vh;
    top: -2vh;
  }
  .personLable{
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    height: 40px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  */deep/ .el-form-item__content{
     margin-left: 0px;
  }
</style>
