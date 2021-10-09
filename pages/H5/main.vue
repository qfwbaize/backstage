<template>
  <view
       style="margin-top:50px">
      <view>返回返回返回返回返回返回H5</view>
      <view>返回返回返回返回返回返回H5</view>
      <view>返回返回返回返回返回返回H5</view>
      <view @click="rtn2H5()">返回H5</view>

  </view>

</template>



<script>
import WXAJAX from "../../utils/request";
export default {
  data() {
    return {
      opFlg : 0,//操作标记，
      tempTmr : '',
      tempResult : '我的结果真是最好的！'
    }
  },

  onLoad(option) {
    this.tempTmr=option.tempTmr;
    console.log("a",option.a);
    console.log("b",option.b);
    console.log("tempTmr",this.tempTmr);
    wx.setNavigationBarTitle({ title: option.title});
  },

  onUnload() {
    console.log('onUnload：=====');
    if(this.opFlg==0){//未操作直接关闭

      WXAJAX.POST(
        {
          key: this.tempTmr,
          value: "FXM未操作直接关闭FXM"
        },
        "",
        "/unencryptedApi/redis/setTempValue",4
      ).then(res => {
          // let selfCard = null;
          // let defaultCard = null;
          // state : 1 -- 默认 ， 2 -- 浏览记录 ， 3 -- 自己的
          if(res){
            this.opFlg++;
            console.log('操作Redis成功：',res.data);
          }
        }).catch(err => {
          console.log('错误',err);
          uni.showToast({
              title: "操作失败，请关闭重试！",
              infoType: 0,
          })
        });

    }
  },
  methods: {
    rtn2H5() {
      //set redis,then
      this.opFlg += 1;
      wx.setStorageSync("abc","789000");
      WXAJAX.POST(
        {
          key: this.tempTmr,
          value:this.tempResult,
          time:20
        },
        "",
        "/unencryptedApi/redis/setTempValue",4
      ).then(res => {
          // let selfCard = null;
          // let defaultCard = null;
          // state : 1 -- 默认 ， 2 -- 浏览记录 ， 3 -- 自己的
          if(res){

            console.log('操作Redis成功AAA：',res.data);
          }
        }).catch(err => {
          console.log('错误',err);
          uni.showToast({
              title: "操作失败，请关闭重试！",
              infoType: 0,
          })
        });
      uni.navigateBack({ delta: 1 });
    }

  }
}
</script>
<style>
</style>
