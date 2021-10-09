<template>
  <div class="imgChoice bbe8 mb20">
    <div class="disflex mb20">
      <span class="w6 h18 bgblue mr13"></span> 
      <p class="fs18 fbold lh1">{{title}}</p>
    </div>
    <div class="disflex jsbet mb20 align-cen" >
      <p class="fs16 ca7">{{datas[0].answer || '点击获取地理位置'}}</p>
      <img :src="rightIcon" class="w10 h10">
    </div>
  </div>
</template>

<script>
import WXAJAX from "@/utils/request";
import util from "@/utils/index";

export default {
  props:['datas','title','address'],
  data(){
    return{
      
    }
  },
  created() {
    
  },
  methods:{
    
  }
}
</script>

<style scoped>

</style>
