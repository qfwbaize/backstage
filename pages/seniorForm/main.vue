<template>
  <div class=" disflex flex-column overhidden align-cen " :style="{paddingTop:navHeight}">
    <div :style="{height:navHeight}" class="w100p bgblue fix_top">
      <div :style="{height:navTop}"></div>
      <div :style="{height:navBarUserHeight,width:'100%'}" class="borderbox disflex align-cen jsbet pl20 pr20">
        <div class="back"> </div>
        <p class="fs18 cfff fbold">用户反馈</p>
        <p class="w20"></p>
      </div>
    </div> 
    <div class="title">
      <p class="fs32 cfff fbold mb10">高级表单标题</p>
      <p class="fs14 cfff lh22">您可以通过以下内容对我的名片进行您的反馈和提出您的需求</p>
    </div>  
    <div class="formContent shadow_grayA">
      <div class="decorate"></div>
      <formModule ref="formModule">

      </formModule>
      <div class="bgblue h44 bradius5 fs18 cfff fbold disflex jscen align-cen">
        确认提交
      </div>
    </div> 
  </div>
</template>

<script>
import WXAJAX from "../../utils/request";
import util from "../../utils/index";
import { mapState, mapGetters } from "vuex";
import QQMapWX from "../../utils/map/qqmap-wx-jssdk.js";
import formModule from  "@/components/formModule"


export default {  
  data() {
    return {
      navBarUserHeight:'',
      navHeight:'',
      navTop:'',
    };
  },
  onShow(){
    this.$refs.formModule.addressSplicing()
  },
  mounted() {
    this.calculateNavBarHeight();
  },
  components:{formModule},
  methods: {
    calculateNavBarHeight() {
      if (getApp().globalData.menuButtonBounding === 0) {
        getApp().globalData.menuButtonBounding = wx.getMenuButtonBoundingClientRect();
      }
      let menuButtonBounding = getApp().globalData.menuButtonBounding;
      wx.getSystemInfo({
        success: res => {
          let statusBarHeight = res.statusBarHeight; //胶囊按钮与顶部的距离
          let navHeight =
            statusBarHeight +
            (menuButtonBounding.top - statusBarHeight) * 2 +
            menuButtonBounding.height; //导航高度
          let navBarUserHeight = navHeight - statusBarHeight;

          this.navHeight = navHeight + "px";
          this.navTop = statusBarHeight + "px";
          this.navBarUserHeight = navBarUserHeight + "px";
        },
        fail(err) {
          console.log(err);
        }
      });
    },
  },
  
};
</script>

<style scoped>
.top{
  width: 100%;
  height: 500upx;
  background: #51CDCB;
  
}
.back{
  height: 30rpx;
  width: 30rpx;
  border-width: 0 0 5rpx 5rpx;
  border-color: #fff;
  border-style: solid;
  transform: matrix(0.71, 0.71, -.71, 0.71, 0, 0);
}
.title{
  height: 420upx;
  width: 100%;
  padding-left: 40upx;
  padding-right: 40upx;
  box-sizing:border-box;
  background:url('https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmAdd/img_bg_cyan@2x.png');
  background-size:100% 100%;
  background-repeat: no-repeat;
}
.formContent{
  background: #ffffff;
  border-radius: 10upx;   
  margin-top: -174upx;
  width: 90%;
  min-height: 400upx;
  position: relative;
  padding: 80upx 40upx 20upx 40upx;
  margin-bottom: 20upx;
  box-sizing: border-box;

}
.decorate{
  position: absolute;
  top: -30upx;
  width: 630upx;
  height: 60upx;
  background: #FFFFFF;
  opacity: 0.6;
  border-radius: 20px 20px 0px 0px;
  left: 0;
  right: 0;
  margin:0 auto;
}
</style>
