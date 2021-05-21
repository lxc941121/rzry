<template>
  <div v-transfer-dom>
    <confirm
      v-model="identityShow"
      theme="ios"
      :show-cancel-button="false"
      :show-confirm-button="false"
      :hide-on-blur="true"
      class="baseClass"
    >
      <div>
        <span class="lab">请选择以什么身份上传记录</span>
        <div class="chose">
          <el-radio v-model="chark" label="1">业主单位</el-radio>
          <el-radio v-model="chark" label="2">认种人</el-radio>
        </div>
        <el-button type="warning"  class="buttonClass" @click="sure">确定</el-button>
      </div>
    </confirm>
  </div>
</template>

<script>
  import {TransferDom, XButton, XTable, XInput,Confirm} from 'vux'
  import bus from "../../assets/config/eventBus";
    export default {
      name: "choiceIdentity",
      data(){
        return {
          identityShow:false,
          chark:"1",
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
        sure(){
          //this.$parent.identity = this.chark;
          this.$router.push('/yhjl?project_num='+this.$parent.project_num+"&identity="+this.chark);
          //this.identityShow = false;

        }
      },
      mounted() {
        const that = this;
      }
    }
</script>

<style scoped>
.lab{
  position: absolute;
  top: 2vh;
  left: 2vh;
  font-weight: bold;
}
  .chose{
    padding-bottom: 3vh;
    padding-top: 2vh;
  }
</style>
