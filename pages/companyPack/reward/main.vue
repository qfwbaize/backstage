<template>
  <div class="borderbox bgfff h100p posre" :style="{paddingTop:navHeight}">
    <div class="borderbox fix_top bgblue" :style="{height:navHeight,paddingTop:navTop,paddingBottom:'10px'}">
      <div class="disflex align-cen h100p jscen">
        <img @click="goBack()" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/mine/back.png" alt="" class="w18 h18 posab" style="left:40rpx;">
        <div class="fs15 cfff ">{{pageTitle}}</div>
      </div>
    </div>
    <div class="bgfff pl16 pr17 lh49 fs16 c38 mb11 info-form fs14">
      <div>
        <div class="lh24 fs14">
          规则说明：转发者设置题目、设置奖金并转发给读者，读者答题结束后根据答题正确率与阅读时常获得奖金。
        </div>
        <div class="disflex jsbet align-cen">
          <label for="preciseRewardAmount" class="marks pr15">奖励金额</label>
          <input type="number" v-model="preciseRewardAmount" placeholder="金额" class="input">
        </div>
        <div class="disflex jsbet align-cen">
          <label for="lowestReadTime" class=" marks pr15">最低阅读时间（秒）</label>
          <input type="number" v-model="lowestReadTime" placeholder="时间" class="input">
        </div>

        <div class="disflex jsbet align-cen" v-if="ifproblem==true">
          <label for="answerFlag" class=" pr15">是否答题</label>
          <switch id="answerFlag" style="zoom: 0.8;" :checked="checked" @change="answerflag" />
        </div>
        <div v-if="answerFlag == 1">
          <div class="disflex jsbet align-cen">
            <label for="lowestAnswerScore" class=" marks pr15">最低答题得分</label>
            <input type="number" v-model="lowestAnswerScore" placeholder="分数" class="input">
          </div>
        </div>
        <div v-if="answerFlag == 1" @click="subjectAdmin()" class="disflex jscen align-cen fs14 subject">
          <span>点击设置题目</span>
        </div>
      </div>
    </div>
    <BottomButtonSmall :text="'完成设置并转发'" @btn_tap="toShare" />

    <SHARETO v-if="share==true"
			:pageTitle ="pageTitle"
           :dynamicId="dynamicId"
           :videoId="videoId"
           :fileId="fileId"
           :companyId="companyId"
           :ifaccurate=true
					 
           saveType='2'
           @changePhone='changePhone'
           @save="save"
           @closeShare="closeShare"
           ></SHARETO>

  </div>
</template>

<script>
  import SHARETO from '@/components/shareTo' //
  import BottomButtonSmall from "@/components/bottom_button_small";
  import WXAJAX from "@/utils/request";
  import util from '@/utils/index';
  import {
    mapGetters,
    mapActions
  } from "vuex";
  export default {
    name: '',
    components: {
      BottomButtonSmall,SHARETO
    },
    data() {
      return {
        share: false,
        tabType: 1,
        navHeight: '',
        navBarUserHeight: '',
        scrollContentHeight: 0,
        navTop: '',
        pageTitle: '精准转发',
        checked: false,
        ifproblem: true,
        preciseAwardTotalAmount: '',
        lowestReadTime: '',
        preciseRewardAmount: '',
        lowestpreciseRewardAmount: '',
        highestpreciseRewardAmount: '',
        answerFlag: '',
        lowestAnswerScore: '',
        dynamicId: '',
        companyId: '',
        type: 1,
        title: '',
        photos: '',
        videoId:'',
        fileId:'',
        precisePhone:'',
      }
    },

    onLoad(option) {
      console.log("option", option);
      if (option.type) this.type = option.type;
      let that = this;
      if(option.fileId&&option.fileId!='null'){
        this.fileId=option.fileId
      }
      if(option.videoId&&option.videoId!='null'){
        this.videoId=option.videoId
      }
      if (option.dynamicId) {
        this.dynamicId = option.dynamicId;
        WXAJAX.POST({
          dynamicId: this.dynamicId,
          companyId: '',
          cardId: ''
        }, '', '/dynamic/dynamicDetail', '', '', 1).then((data) => {
          that.title = data.title;
          that.photos = data.photos;
        })
      }

      this.calculateNavBarHeight()
    },

    onShow() {},
    onHide() {},
    async mounted() {
      let a = await util.systemIfo();
      let navHeight = getApp().globalData.navHeight;
      this.scrollContentHeight = a.windowHeight;
    },
    async onShareAppMessage(e) {
      this.precisePhone=e.target.dataset.precisephone?e.target.dataset.precisephone:'';
      console.log(this.precisePhone)
      var re = /^1\d{10}$/;
     let str = this.precisePhone;
     if(!re.test(str)&&this.precisePhone){
         wx.showToast({
           title: '手机号不合法！',
           icon: 'none',
           duration: 2000,
           mask: false
         })
         return
      }

      wx.showLoading();
      let shareId = '';

      var that = this

      var preciseData=await WXAJAX.POST({//精准转发设置
          dynamicId: this.dynamicId,
          preciseAwardTotalAmount: this.preciseRewardAmount || 0,
          lowestReadTime: this.lowestReadTime || 0,
          preciseRewardAmount: this.preciseRewardAmount || 0,
          answerFlag: this.answerFlag || 0,
          lowestAnswerScore: this.lowestAnswerScore || 0,
          precisePhone:this.precisePhone,
      }, '', '/dynamic/addDynamicSettingPreciseReward','','',1);
      console.log(preciseData);
      // 由于微信分享无法获取到被分享人的cardID，所以只能传precise_dynamicId，当被分享人打开页面并授权后再执行添加分享记录和精准转发记录的接口
      var sharedata =await WXAJAX.POST({//添加分享记录
          dynamicId: preciseData.dynamicId,
          shareSource:1,
      }, '', '/share/record/add','','',1)

      let path = '/pages/companyPack/find/dynamicDetail/main?dynamicId=' + preciseData.dynamicId + '&companyId=' + wx.getStorageSync('COMPANYID') + '&cardId=' + wx.getStorageSync('cardId') + '&goType=1' + '&precise_dynamicId=' + preciseData.dynamicId + '&type=2' + '&shareId=' + sharedata.shareId;
      if(this.fileId){
        path = '/pages/companyPack/library/details?dynamicId=' + preciseData.dynamicId + '&companyId=' + wx.getStorageSync('COMPANYID') + '&cardId=' + wx.getStorageSync('cardId') + '&goType=1' + '&precise_dynamicId=' + preciseData.dynamicId + '&type=2' + '&shareId=' + sharedata.shareId;
      }
      if(this.videoId){
        path = '/pages/companyPack/videodetails/videodetails?dynamicId=' + preciseData.dynamicId + '&companyId=' + wx.getStorageSync('COMPANYID') + '&cardId=' + wx.getStorageSync('cardId') + '&goType=1' + '&precise_dynamicId=' + preciseData.dynamicId + '&type=2' + '&shareId=' + sharedata.shareId + '&videoId=' + this.videoId;
      }
        console.log("path",path);
      wx.hideLoading();
      return {
        imageUrl: this.photos,
        title: this.title,
        path:path,
        success(e) {
          that.share = false;
        },
        fail(e) {
          console.log('失败-- ', e);
        }
      }

    },
    computed: {

    },
    methods: {
      ...mapActions(['setArticle']),

      changePhone(e){
        this.precisePhone=e;
      },
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

            this.navHeight = navHeight + 10 + "px";
            this.navTop = statusBarHeight + "px";
            wx.setStorageSync('navTop', this.navTop)
            this.navBarUserHeight = navBarUserHeight + "px";
          },
          fail(err) {
            //console.log(err);
          }
        });
      },
      goBack() { // 返回上一页
        wx.navigateBack()
      },
      async page_tap(url, query) {
        var that = this
        if (url == 'choosefriends') {
          if (this.preciseRewardAmount <= 0) {
            wx.showToast({
              title: "奖励金额必须大于0！",
              icon: "none",
              duration: 2000
            });
            return;
          }
          let data = {
            id: this.id,
            cid: this.cid,
            preciseAwardTotalAmount: this.preciseRewardAmount || 0,
            lowestReadTime: this.lowestReadTime || 0,
            preciseRewardAmount: this.preciseRewardAmount || 0, //单人奖励金额
            answerFlag: this.answerFlag || 0,
            lowestAnswerScore: this.lowestAnswerScore || 0,
          };
          wx.setStorageSync("setArticle",data)
          that.setArticle(data)
          query = query || "";
          wx.navigateTo({
            url: "../" + url + "/main" + query
          });
        }

      },
      toShare() {
        if (this.preciseRewardAmount <= 0) {
          wx.showToast({
            title: "奖励金额必须大于0！",
            icon: "none",
            duration: 2000
          });
          return;
        }
        this.share = true;
      },
      settingPreciseReward() {
        if (this.preciseRewardAmount <= 0) {
          wx.showToast({
            title: "单人奖励金额必须大于0！",
            icon: "none",
            duration: 2000
          });
          return;
        }
        WXAJAX.POST({ //精准转发设置
            dynamicId: this.dynamicId,
            preciseAwardTotalAmount: this.preciseAwardTotalAmount || 0, //总金额
            lowestReadTime: this.lowestReadTime || 0,
            preciseRewardAmount: his.preciseRewardAmount || 0, //单人奖励金额
            answerFlag: this.answerFlag || 0,
            lowestAnswerScore: this.lowestAnswerScore || 0,
            precisePhone:this.precisePhone,
          }, '', '/dynamic/addDynamicSettingPreciseReward', '', '', 1)
          .then(res => {
            WXAJAX.POST({
                dynamicId: this.dynamicId,
                toUserId: wx.getStorageSync('cardId'),
                shareSource: 0,
              }, '', '/share/record/add', '', '', 1)
              .then((data) => {
                WXAJAX.POST({ //获得精准转发奖励
                    dynamicId: this.dynamicId,
                    userId: wx.getStorageSync('cardId'),
                    shareId: data.shareId,
                    answerScore: 0,
                  }, '', '/precise/record/add', '', '', 1)
                  .then(res => {});
              });
          });
      },
      closeShare() {
        this.share = false;
      },
      async save(url, query) {
        // if(this.preciseAwardTotalAmount<=0){
        //   wx.showToast({
        //     title: "奖金池总金额必须大于0！",
        //     icon: "none",
        //     duration: 2000
        //   });
        //   return ;
        // }
        if (this.preciseRewardAmount <= 0) {
          wx.showToast({
            title: "单人奖励金额必须大于0！",
            icon: "none",
            duration: 2000
          });
          return;
        }
        // if(parseInt(this.preciseRewardAmount)>parseInt(this.preciseAwardTotalAmount)){
        //   wx.showToast({
        //     title: "奖金池总金额必须大于单人奖励金额！",
        //     icon: "none",
        //     duration: 2000
        //   });
        //   return ;
        // }
        let data = {
          id: this.id,
          cid: this.cid,
          preciseAwardTotalAmount: this.preciseRewardAmount || 0, //总金额
          // preciseAwardTotalAmount: this.preciseAwardTotalAmount||0,//总金额
          lowestReadTime: this.lowestReadTime || 0,
          preciseRewardAmount: this.preciseRewardAmount || 0, //单人奖励金额
          answerFlag: this.answerFlag || 0,
          lowestAnswerScore: this.lowestAnswerScore || 0,
        };
        // wx.setStorageSync("setArticle",data)
        console.log("setArticle",data);
        this.setArticle(data)
        wx.navigateTo({ url:  url + query });
        // wx.navigateTo({ url: "../" + url + "/main" + query });
        // wx.navigateTo({
        //   url: '../choosefriends/main?saveType=2&id=' + this.id + '&cid=' + this.cid
        // })
      },
      subjectAdmin(){
        uni.showToast({
            title: '该功能暂未开放！',
            icon: 'none'
        })
      },
      answerflag(e) {
        if (e.detail.value) {
          this.answerFlag = 1;
        } else {
          this.answerFlag = 0;
        }
      },
    }
  }
</script>

<style>
  .items div {
    height: 80rpx;
    margin-top: 40rpx;
    padding-left: 40rpx;
    line-height: 80rpx;
  }

  .active {
    background-color: #fff;
    font-size: bold;
  }

  .articleTitle {
    align-self: flex-start;
    width: 300rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    margin-right: -15rpx;
  }

  .Mask {
    position: absolute;
    top: 0rpx;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.38;
  }

  .shareDiv {
    position: absolute;
    bottom: 0rpx;
    width: 100%;
    height: 345rpx;
    background-color: white;
    border-top-left-radius: 40rpx;
    border-top-right-radius: 40rpx;
    z-index: 999;
  }
  .shareTo {
    margin-top: 77rpx;
  }
  .shareTo img {
    width: 60rpx;
    height: 60rpx;
    padding: 20rpx 25rpx;
    border-radius: 20rpx;
    margin-bottom: 5rpx;
  }

  .shareToTitle {
    margin-top: 40rpx;
    margin-left: 44rpx;
    font-size: 36rpx
  }

  .share-btn {
    position: absolute;
    bottom: 24rpx;
    opacity: 0;
  }

  .input {
    border: rgb(26, 208, 195) 1rpx solid;
    width: 200rpx;
    line-height: 50px;
    height: 50rpx;
    padding-left: 10rpx;
    border-radius: 10rpx;
  }

  .subject {
    border: solid;
    width: 670rpx;
    height: 424rpx;
    border-width: 1rpx;
    border-style: solid;
    border-radius: 12rpx;
    padding: 0rpx;
    text-align: center;
    position: relative;
  }
</style>
