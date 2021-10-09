<template>
  <div class="information mb20">
    <div class="disflex mb20">
      <span class="w6 h18 bgblue mr13"></span>
      <p class="fs18 fbold lh1">{{title}}</p>
    </div>
    <div>
      <div class="disflex jsbet align-cen bbe8 pt10 pl18 pb10">
        <p class="fs16 ca7" :class="datas[0].answer ? 'c38' : 'ca7'">{{datas[0].answer  || '请选择时间'}}</p>
        <img :src="rightIcon" class="w10 h10">
      </div>
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
      
    }
  },
  methods:{
    
  },
  
}
</script>

<style scoped>

</style>
