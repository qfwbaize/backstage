<template>
  <div class="information bbe8 mb20">
    <div class="disflex mb20">
      <span class="w6 h18 bgblue mr13"></span> 
      <p class="fs18 fbold lh1">{{title}}</p>
    </div>
    <div class="disflex flex-column mb20">
      <input class="bradius5 bgf5f6 h39 mb10 pl15 pr15 fs16 ca7" 
             v-for="(item,index) in datas" 
             :key="index" 
             :disabled="true"
             :value="item.answer"
             type="text">
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
    
  }
}
</script>

<style scoped>

</style>
