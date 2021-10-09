<template>
  <div class="textChoice bbe8 mb20">
    <div class="disflex mb20">
      <span class="w6 h18 bgblue mr13"></span> 
      <p class="fs18 fbold lh1">{{title}}</p>
    </div>
    <div class="pl20 pr20 posre">
      <textarea class="w100p pb28" 
                maxlength="500"
                :disabled="true" 
                @input="text_tap"
                :value="datas[0].answer || '请输入内容'"></textarea>
      <p class="c78 textLength">{{text.length}}/500</p>
    </div> 
  </div>
</template>

<script>
import WXAJAX from "@/utils/request";
import util from "@/utils/index";

export default {
  props:['datas','title'],
  data(){
    return{ 
      text:''
    }
  },
  methods:{
    text_tap(e){
      this.text = e.detail.value
    },
  }
}
</script>

<style scoped>
.textLength{
  position: absolute;
  right: 0;
  bottom: 20upx;
}
</style>
