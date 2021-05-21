<template>
  <div v-show="phoneShow" v-transfer-dom style="position:absolute;width:100%;top:0;height:100%">
    <confirm
      v-model="phoneShow"
      theme="ios"
      :show-cancel-button="false"
      :show-confirm-button="false"
      :hide-on-blur="true"
      class="baseClass"
      >
      <div>
        <div>
          <img class="title" src="../img/标题.png">
          <span class="titleText">绑定手机号</span>
          <img class="closeIcon" @click="closeShow" src="../img/关闭icon.png">
        </div>
        <div class="text">为了更好的服务您，请绑定手机号</div>
        <x-table :full-bordered="false" :content-bordered="false" :cell-bordered="false">
          <tbody>
          <tr>
            <td>
              <x-input
                type="text"
                placeholder="请输入手机号"
                :show-clear="false"
                :required="true"
                is-type="china-mobile"
                v-model="phonenumber"
              ></x-input>
            </td>
          </tr>
          <tr>
            <td>
              <x-input
                type="text"
                placeholder="请输入验证码"
                :show-clear="false"
                v-model="codenumber"
              ></x-input>
              <a class="sendCodeClass" @click="sendCode" :style="{color:state.sendingCode?'#999':''}">
                {{!state.sendingCode ? "发送验证码" : `重新获取验证码(${state.time}s)`}}
              </a>
            </td>
          </tr>
          </tbody>
        </x-table>
        <el-button type="warning"  class="buttonClass" @click="zhuCe">确认提交</el-button>
      </div>
    </confirm>
  </div>
</template>

<script>
  import {TransferDom, XButton, XTable, XInput,Confirm} from 'vux'
  import bus from "../../assets/config/eventBus";
  const _TIME_ = 60;
  export default {
    name:'phoneDialog',
    data(){
      return {
        phoneShow:false,
        state: {
          loading: false,
          sendingCode: false,
          time: _TIME_,
          timer: undefined,
        },
        telePhone:null,
        phonenumber:"",
        codenumber:""
      }
    },
    directives: {
      TransferDom,
    },
    components:{
      XButton,
      XTable,
      XInput,
      Confirm
    },
    methods:{
      zhuCe(){
        this.$axios.post("/api/sys/phonemsg/CheckCode?phone="+this.phonenumber+"&code="+this.codenumber,"",{
          headers: {
              "token":  window.sessionStorage.getItem('token')
            }
        }).then(res =>{
           if(res.data.code==100)
           {
              this.$vux.toast.show({
                text: '手机绑定成功！',
                onHide () {
                  window.location.reload();
                }
              })
             //that.$vux.toast.text("手机绑定成功！")
           }else{
             this.$vux.toast.show({
                type:"warn",
                text: res.data.msg,
              })
           }
        })
      },
      async sendCode() {
        // debugger
        if (!this.state.sendingCode){
          this.state.sendingCode = true;
          this.state.time = 60;
          console.log(this.phonenumber)
          this.$axios.post("/api/sys/phonemsg/sendCode?phone="+this.phonenumber,"",{
            headers: {
              "token":  window.sessionStorage.getItem('token')
            }
          }).then( res =>{
            // debugger
            console.log("调用结果：",res)
            this.state.timer = setInterval(()=>{
              this.state.time = this.state.time - 1;
              // this.show = true;
              if (this.state.time - 1 < 0) {
                clearInterval(this.state.timer);
                this.state.sendingCode = false;
                this.state.timer = undefined
              }
            },1000);
          })
        }
      },
      closeShow(){
        this.phoneShow = false;
      }
    },
    mounted() {
      const that = this;
      bus.$on('bangDingPhone',()=>{
        that.phoneShow=true;
      })
    }
  }
</script>

<style lang="less" scoped>
.baseClass{
  /*position: absolute;*/
  /*padding-top: 0.8vh;*/
  /*top: 30vh;*/
  /*bottom: 33vh;*/
  /*width: 85%;*/
  /*left: 10%;*/
  /*height: 100%;*/
  /*background-color: #fff;*/
  /*border-radius: 1.5vh;*/
  .title{
    padding: 2vh 5.3vh;
    width: 33vh;
    height: 2vh;
  }
  .closeIcon{
    width: 3vh;
    height: 3vh;
    position: absolute;
    top: 2%;
    right: 2%;
  }
  .buttonClass{
    position: absolute;
    left: 20%;
    width: 60%;
  }
  .text{
    text-align: center;
    color: #999;
    font-size: 1.7vh;
  }
  .inputClass{
    width: 90%;
    border: 0;
    outline: 0;
    border-bottom: 1px solid grey;
    font-size: 2.2vh;
    height: 4vh;
    margin-left: 2vh;
    margin-bottom: 2vh;
  }
  .phoneNum{
    color: #000000;
    height: 7vh;
    line-height: 7vh;
    padding-left: 1vh;
    padding-right: 1vh;
    font-weight: bolder;
  }
  .titleText{
    font-size: 2.1vh;
    position: absolute;
    top: 9%;
    font-weight: bolder;
    left: 38.5%;
  }
  .sendCodeClass{
    position: absolute;
    top: 20%;
    right: 10%;
    font-size: 2vh;
    color: #FDA422;
  }
}
* /deep/ .weui-input {
  width: 95%;
  height: 4vh;
}
* /deep/ .weui-dialog__bd{
  min-height: 31vh;
}
* /deep/ .weui-dialog{
  position: relative;
  top: 30vh;
}
/deep/ .weui-dialog__bd:first-child {
  padding: 1em 0px 1.7em;
}
</style>
