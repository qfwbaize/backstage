<template>
  <div class="checkChoice bbe8 mb20">
    <div class="disflex mb20">
      <span class="w6 h18 bgblue mr13"></span> 
      <p class="fs18 fbold lh1">{{title}}</p>
      <span class='ca8 fs18 fb500'>（多选项）</span>
    </div>
    <div class="disflex mb15 ml19" 
          v-for="(item,index) in datas" 
          :key="index" @click="checkChoice(item,index)">
      <div class="w20 h20 bradius3 b2e8 disflex jscen align-cen mr8 " 
            style="transition: all .4s" 
            :class="item.answer ? 'active' : ''">
        <span class="disblock w10 h10 bradius2" style="transition: all .4s"></span>
      </div>
      <p class="fs16 w250" :class="item.answer ? 'c38' : 'c78' ">{{item.title}}</p>
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
      items:[],
      singleCurrent:0,
    }
  },
  computed:{
    
  },
  created(){
    this.items = this.datas
  },
  methods:{
    checkChoice(item,index){
      item.checked = !item.checked
      console.log(item)
    }
  }
}
</script>

<style scoped>
.active{
  transition: all .4s;
  border:2upx solid #51CDCB;
}
.active span{
  transition: all .4s;
  background: #51CDCB;
}
</style>
