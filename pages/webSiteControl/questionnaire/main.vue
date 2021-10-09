<template>
  <div class=" disflex flex-column overhidden align-cen " :style="{paddingTop:navHeight}">
    <div :style="{height:navHeight}" class="w100p bgblue fix_top">
      <div :style="{height:navTop}"></div>
      <div :style="{height:navBarUserHeight,width:'100%'}" class="borderbox disflex align-cen jsbet pl20 pr20">
        <div class="back" @click="goBack"> </div>
        <p class="fs18 cfff fbold">用户反馈</p>
        <p class="w20"></p>
      </div>
    </div>
    <div class="title">
      <p class="fs32 cfff fbold mb10">{{datas.title || '高级表单标题'}}</p>
      <p class="fs14 cfff lh22">{{datas.content || '您可以通过以下内容对我的名片进行您的反馈和提出您的需求'}}</p>
    </div>
    <div class="formContent shadow_grayA">
      <div class="decorate"></div>
      <div v-for="(item,index) in datas.detailRequests" :key="index">
        <!-- 单选项 -->
        <single v-if="item.formType == 'SINGLE'"
                :datas="item.childrenDetails"
                :title='item.title'></single>
        <!-- 复选项 -->
        <multiple v-else-if="item.formType == 'MULTIPLE'"
                  :datas="item.childrenDetails"
                  :title='item.title'></multiple>
        <!-- 下拉选项 -->
        <dropDown v-else-if="item.formType == 'DROP_DOWN'"
                  :datas="item.childrenDetails"
                  :title='item.title'
                  @list_tap="list_tap"></dropDown>
        <!-- 文本框 -->
        <textareas v-else-if="item.formType == 'TEXTAREA'"
                   :datas="item.childrenDetails"
                   :title='item.title'></textareas>
        <!-- 评分 -->
        <stars  v-else-if="item.formType == 'SCOURE'"
                :datas="item.childrenDetails" :title='item.title'></stars>
        <!-- 图片上传 -->
        <image v-else-if="item.formType == 'IMAGE'"
               :datas="item.childrenDetails"
               :title='item.title'></image>
        <!-- 地址定位 -->
        <GPS v-else-if="item.formType == 'GPS'"
             :datas="item.childrenDetails"
             :title='item.title'
             :address="address"></GPS>
        <!-- 个人信息 -->
        <userinfo v-else-if="item.formType == 'USERINFO'"
                  :datas="item.childrenDetails"
                  :title='item.title'></userinfo>
        <!-- 提交日期 -->
        <datepicker v-else-if="item.formType == 'DATEPICKER'"
                    :datas="item.childrenDetails"
                    :title='item.title'></datepicker>
      </div>
    </div>
  </div>
</template>

<script>
import WXAJAX from "@/utils/request";
import util from "@/utils/index";
import { mapState, mapGetters } from "vuex";
//import formModule from  "@/components/formModule"
import single from "@/components/formModule/single";
import multiple from "@/components/formModule/multiple";
import dropDown from "@/components/formModule/drop_down";
import textareas from "@/components/formModule/textarea";
import stars from "@/components/formModule/stars";
import image from "@/components/formModule/image";
import GPS from "@/components/formModule/GPS";
import userinfo from "@/components/formModule/userinfo";
import datepicker from "@/components/formModule/datepicker"


export default {
  data() {
    return {
      navBarUserHeight:'',
      navHeight:'',
      navTop:'',
      datas:[],//表单数据
      answer:''//反馈数据
    };
  },
  onLoad(option){
    console.log(option)
    let formId = option.formId
    let uid = option.userId
    this.calculateNavBarHeight();
    this.getFrom(formId,uid);
    // this.getQueryUserFeedback(formId)
  },
  mounted() {

  },
  components: {single,multiple,dropDown,textareas,stars,image,GPS,userinfo,datepicker},
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
    //获取高级表单data
    //获取用户反馈data
    getFrom(formId,uid){
      wx.showLoading() ;
      let  parameter = {
        commitUserId: uid,
        companyId:wx.getStorageSync('COMPANYID'),
        formId:formId
      }
      WXAJAX.POST(
        parameter,'','/advancedForm/queryUserFeedback'
      )
      .then(data => {
        if(data){
          wx.hideLoading();
          data.advancedForm.detailRequests.forEach(v => {
            for(var i in v.childrenDetails){
              v.childrenDetails[i].content = ''
              if(v.formType == 'MULTIPLE'){
                v.childrenDetails[i].checked = false

              }else if(v.formType == 'SCOURE'){
                v.childrenDetails[i].choice = -1
              }
            }
          });
          data.feedback.forEach(v=>{
            if(v.formDetailType !== 'GPS' && v.formDetailType !== 'DROP_DOWN'){
              v.answer = JSON.parse(v.answer);
            }
          })
          this.datas = data.advancedForm
          this.answer = data.feedback
          this.datas.detailRequests.forEach((v,k)=>{
            let data = this.answer[k].answer
            for(var i in v.childrenDetails){
              if(v.childrenDetails[i].formType == 'GPS'){
                v.childrenDetails[i].answer = this.answer[k].answer
              }else if(v.childrenDetails[i].formType == 'DROP_DOWN'){

                v.childrenDetails[i].answer = this.answer[k].answer
              }else{
                v.childrenDetails[i].answer = this.answer[k].answer[i].answer
              }
            }
          })
        }
      })
      .catch((err) => {
        wx.hideLoading();
        console.log(err)
        wx.showToast({
          title:err,
          icon:'none'
        })
      })
    },
    goBack(){
      wx.navigateBack({
        delta:1
      })
    }
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
  border-radius: 40px 40px 0px 0px;
  left: 0;
  right: 0;
  margin:0 auto;
}
</style>
