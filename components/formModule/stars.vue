<template>
  <div class="starChoice bbe8 mb20">
    <div class="disflex mb20">
      <span class="w6 h18 bgblue mr13"></span> 
      <p class="fs18 fbold lh1">{{title}}</p>
    </div>
    <div class="disflex flex-column">
      <div class="disflex mb15 pl18 jsbet" v-for="(item,index) in datas" :key="index">
          <span class="fs16 ca7">{{item.title}}</span>
          <div class="disflex ">
            <span class="starImg"  
                v-for="(v,k) in star" 
                :key="k"
                :class="item.answer >= k ? 'selectStar' : ''" 
                @click="star_tap(k,item)"></span>
          </div>
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
      starIcon:WXAJAX.imgBackUrl + '/yimai_photos/crmAdd/icon_star@2x.png',
      unStartIcon:WXAJAX.imgBackUrl + '/yimai_photos/crmAdd/icon_star_unselected@2x.png',
      starArr:this.datas,
      star:[0,1,2,3,4],
    }
  },
  methods:{
    star_tap(k,item){
      item.choice = k
    },
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
