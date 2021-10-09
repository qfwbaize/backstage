<template>
   <div class="singleChoice bbe8 mb20">
    <div class="disflex mb20">
      <span class="w6 h18 bgblue mr13"></span> 
      <p class="fs18 fbold lh1">{{title}}</p>.
      <span class='ca8 fs18 fb500'>（单选项）</span>
    </div>
    <div class="disflex mb15 ml19" v-for="(item,index) in datas" :key="index">
      <div class="w20 h20 bradius10 b2e8 disflex jscen align-cen mr8 " 
            style="transition: all .4s" 
            :class="item.answer ? 'active' : ''">
        <span class="disblock w10 h10 bradius5" style="transition: all .4s"></span>
      </div>
      <p class="fs16 w250" :class="index == singleCurrent ? 'c38' : 'c78' ">{{item.title}}</p>
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
  mounted(){
    // console.log(this.answer)
    // this.datas.forEach((v,k) => {
    //   v.answer = this.answer.answer[k]
    //   this.$set(v.answer,k,this.answer.answer[k])
    // });
    // console.log(this.datas)
  },
  methods:{

  },
  computed:{
    
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
