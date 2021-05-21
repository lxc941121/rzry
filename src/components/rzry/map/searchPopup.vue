<template>
  <div v-transfer-dom>
    <popup v-show="showSearch">

    </popup>
  </div>
</template>

<script>
  import {Popup, TransferDom, XButton, XInput, XTable} from "vux";

  export default {
    name: "searchPopup",
    data(){
      return {
        showSearch: true,
      }
    },
    directives: {
      TransferDom,
    },
    components:{
      Popup,
      XButton,
      XTable,
      XInput,
    },
    }
</script>

<style scoped>

</style>
