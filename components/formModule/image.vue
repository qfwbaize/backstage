<template>
  <div class="imgChoice bbe8 mb20">
      <div class="disflex mb20">
        <span class="w6 h18 bgblue mr13"></span> 
        <p class="fs18 fbold lh1">{{title}}</p>
      </div>
      <p class="fs14 ca7 mb20">建议上传不超过4MB的jpg/png图片</p>
      <div class="disflex wrap mb20">
        <div class="bgfff w80 h80 mr7 mb7 posre"
             v-for="(v,k) in datas[0].answer"
             :key="k">
          <img mode="aspectFill"
               :src="v"
               alt=""
               class="w100p h100p">
          
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
    
  }
}
</script>

<style scoped>
.starImg{
  transition: all .4s;
  display: block;
  width: 36upx;
  height: 36upx;
  background: url('https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmAdd/icon_star_unselected@2x.png');
  background-size: cover;
  margin-right: 30upx;
}
.selectStar{
  transition: all .4s;
  background: url('https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmAdd/icon_star@2x.png');
  background-size: cover;
}
</style>
