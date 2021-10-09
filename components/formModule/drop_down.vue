<template>
  <div class="drop_down bbe8 mb20">
    <div class="disflex mb20">
      <span class="w6 h18 bgblue mr13"></span> 
      <p class="fs18 fbold lh1">{{title}}</p>
      .<span class='ca8 fs18 fb500'>（下拉选项）</span>
    </div>
    <div class="disflex jsbet align-cen pb15 posre">
      <p class="fs16  ml19 pl18 " :class="datas[0].answer ? 'c38' : 'ce8'">{{ datas[0].answer || '请选择内容'}}</p>
      <img :src="rightIcon" class="w10 h10">
      <!-- <div class="posab w100p bgfff downBox" :class="dropDown ? 'showDropDown' : ''">
        <div class="problemBox bgfff">
          <div class="fs16 c78 mb10" v-for="(item,index) in datas" :class="dropDown ? 'activeDropDown' : ''" :key="index" @click="list_tap(item)">
            {{item.title}}
          </div>
        </div>
      </div> -->
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
      rightIcon:WXAJAX.imgBackUrl + '/yimai_photos/user/right.png',
    }
  },
  methods:{
    
  }
}
</script>

<style scoped>
.downBox{
  transition: all .4s;
  position: absolute;
  overflow: hidden;
  height: 0upx;
  top: 40upx;
}

.showDropDown{
  transition: all .4s;
  height: 300upx;
  display: flex;
  flex-direction: column;
  z-index: 10;
}
.problemBox{
  padding: 38upx;
  box-sizing: border-box;
  flex: 1;
  overflow: auto;
}
</style>
