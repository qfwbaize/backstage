<template>
  <div class="w100p h100p bggray_5 fix_top ">
    <div class="mask" @click="mask_tag" v-if="maskShow">
      <div class="mask-box" @click.stop="mask_tag_stop">
          <div class="mask-box-top">
            <image class="" :src="styleImg"></image>
            <p class="mb10">进入客服会话，</p>
            <p>回复“1”即可获取并分享文章</p>
          </div>
          <div class="mask-box-bottom">
            <div class="mask-cancel ca8" @click="mask_cancel">取消</div>
            <!-- <button class="mask-confirm bgblue cfff">立即进入</div> -->
            <button open-type="contact" @contact="contact_tag" class="mask-confirm bgblue cfff">立即进入</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import WXAJAX from '@/utils/request';
export default {
  props:['maskShow'],
  data(){
    return{
      styleImg: WXAJAX.imgBackUrl  + '/marketing/img_IM%402x.png',
    }
  },
  methods:{
    mask_tag_stop(){
      this.$emit('mask_tag_stop')
    },
    mask_cancel(){
      this.$emit('mask_cancel')
    },
    contact_tag(){
      this.$emit('contact_tag')
    },
    mask_tag(){
      this.$emit('mask_tag')
    }
  }
}
</script>

<style scoped>
.mask{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.mask-box{
  width: 580upx;
  background: #FFFFFF;
  border-radius: 10upx;
}
.mask-box-top{
  box-sizing: border-box;
  width: 100%;
  height: 465upx;
  padding: 50upx 50upx 0 50upx;
  text-align: center;
  color:#787878;
}
.mask-box-top image{
  height: 258upx;
  width: 480upx;
  margin-bottom: 27upx;
}
.mask-box-bottom{
  display: flex;
}
.mask-cancel{
  width: 50%;
  height: 100%;
  font-size: 36upx;
  text-align: center;
  line-height: 88upx;
  border-bottom-left-radius: 10upx;
  border-top:1upx solid #D6D6D7;
}
.mask-confirm{
  width: 50%;
  height: 100%;
  font-size: 36upx;
  text-align: center;

  border-bottom-right-radius: 10upx;
}
</style>


































