<template>
  <div class="share-records-content">
    <div class="item ">
      <div v-if="ifshow==true" class="bgfff pl16 pr17 lh49 fs16 c38 mb11 info-form" style="padding-bottom: 20rpx">
        <div class="disflex jsbet align-cen">
          <label for="progressDesc"
                 class="fbold">内容</label>
          <textarea name=""
                    id="progressDesc"
                    v-model="progressDesc"
                    class="bgf5f6 pl16 pr16 pt15 pb15 be8 bradius5 fs16 pha8 h119 borderbox" style="width: 80%; background-color: white;margin-top:20rpx;"
                    placeholder="进度内容(120字以内)">
          </textarea>
        </div>
        <div class="disflex jsbet align-cen">
          <label for="progressScale"
                 class="fbold">进度</label>
          <input type="number"
                 id="progressScale"
                 class="pha8 textr h49"
                 placeholder="进度比例"
                 style="border: 1rpx solid #e8e8e8; width: 80%; margin-top: 20rpx; margin-bottom: 20rpx; "
                 v-model="progressScale">
        </div>
        <button style="width: 80%;background-color: #51cdcb;color: white;" data-url="../allOrder/allOrder" @click='confirmAcceptance'>确定</button>
      </div>
      <scroll-view :style="{height: scrollContentHeight+'px'}"
                   class="dynamic-content"
                   :scroll-y="true"
                   :enable-back-to-top="true"
                   :scroll-anchoring="true"
                   @scrolltoupper='scrolltoupper'
                   @scrolltolower="scrolltolower">
          <div class="item-box bgfff"
          v-for="info in list"
          :key="info.id">
            <div class="middle flex-base pl15 pr15">
              <div class="content pl15">
                <p class="fs14 c38 title">
                  {{info.progressDesc}}
                </p>
                <div class="flex-base">
                    <p class="fs12 c38">
                      时间：
                      <span class="fbold cblue pl6">{{info.createTimeStr}}</span>
                    </p>
                    <p class="fs12 c38" style='margin-left: 150rpx;'>
                       进度：
                      <span class="fbold cblue pl6">{{info.progressScale}}%</span>
                    </p>
                </div>
              </div>
            </div>
          </div>
        </scroll-view>
    </div>
      <!-- <div v-if="ifshow==true" class="textc disflex w60 h60 bradius50p bgblue disinblock goToUserCenter" @click="addProgress">
        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/user_add.png" alt="" class="w30 h30 mt15">
      </div> -->
      <!-- <block wx:if="{{isShowConfirm}}">
        <view class='toast-box'>
          <view class='toastbg'></view>
          <view class='showToast'>
              <view class='toast-title'>
                  <text>添加最新进度</text>
              </view>
              <view class='toast-main'>
                  <view class='toast-input'>
                    <textarea :placeholder="progressDesc || '进度内容'" @blur="toProgressDesc" style="width: 100%;" />
                  </view>
                  <view class='toast-input'>
                      <input type='number' :placeholder="progressScale || '进度内容'" @click='toProgressScale' v-model="progressScale"></input>%
                  </view>
              </view>
              <view class='toast-button'>
                  <view class='button1'>
                      <button @click='cancel'>取消</button>
                  </view>
                  <view class='button2'>
                      <button data-url="../allOrder/allOrder" @click='confirmAcceptance'>确定</button>
                  </view>
              </view>
          </view>
      </view>
      </block> -->
  </div>

</template>
<script>
import BottomButtonSmall from '@/components/bottom_button_small' //
import { mapMutations } from "vuex";
import util from '@/utils/index';
import WXAJAX from "@/utils/request";
export default {
  components: { BottomButtonSmall },
  data() {
    return {
      time: "",
      maskShow:false,
      ifshow:true,
      contact:'',
      list:'',
      page:1,
      scrollContentHeight:0,
      isShowConfirm:false,
      progressDesc:'',
      progressScale:'',
    };
  },
  watch:{
  },
  mounted() {
    var info = this.info
  },
  onReachBottom(){

  },
  async mounted() {
    let a = await util.systemIfo();
    let navHeight = getApp().globalData.navHeight;
    this.scrollContentHeight = a.windowHeight;
  },
  onShow() {
    this.page = 1
  },
  onLoad(option){
    this.taskCustomerId=option.taskCustomerId
    this.taskStaffId=option.taskStaffId
    if(!this.taskStaffId){
       this.ifshow=false;
    }
    if(option.taskState!=0){
      this.ifshow=false;
    }
    this.page = 1;
    this.getlist(this.page);
  },
  methods: {

    getlist(page){
      let params='';
      if(this.taskStaffId){
        params={
          pageSize:10,
          pageNum:page,
          taskId:this.taskCustomerId,
          taskStaffId:this.taskStaffId,
          userId:wx.getStorageSync('cardId'),
        }
      }else{
        params={
          pageSize:10,
          pageNum:page,
          taskId:this.taskCustomerId,
        }
      }
      console.log("params",params);
      WXAJAX.POST(params, '', '/customerEssay/queryListTaskProgress').then(data => {

        if(this.page === 1){
            this.list = data.list || [];
        }else{
            this.list = [...this.list, ...data.list] || [];
        }
      });
    },
    addProgress(){
      this.isShowConfirm=true;
    },
    cancel(){
      this.isShowConfirm=false
      console.log(this.money);
    },
    confirmAcceptance(){
      this.isShowConfirm=false;
      if(this.progressScale>100){
        wx.showToast({
          title:'进度不能超过100%',
          icon:'none',
          duration: 2000
        })
        return false;
      }
      let pas={
        taskId:this.taskCustomerId,
        taskStaffId:this.taskStaffId,
        userId:wx.getStorageSync('cardId'),
        progressScale:this.progressScale,
        progressDesc:this.progressDesc,
      }
      console.log('pas',pas)
      WXAJAX.POST(pas, '', '/customerEssay/insertTaskProgress').then(data => {
        this.getlist(this.page)
      });
      this.progressDesc=''
      this.progressScale=''


    },
    toProgressDesc(e){
      this.progressDesc = e.detail.value
    },
    toProgressScale(e){

      this.progressScale = e.detail.value
    },
    //下拉刷新
    scrolltoupper() {
      console.log("测试下拉刷新");
      this.page = 1;
      this.getlist(this.page);
    },
    //上拉加载更多
    scrolltolower() {
      console.log("测试上拉加载更多");
      this.page++
      this.getlist(this.page);
    },
  }
};
</script>
<style scoped>
  .toast-box {
      width: 100%;
      height: 100%;
      opacity: 1;
      position: fixed;
      top: 0px;
      left: 0px;
  }


  .toastbg {
      opacity: 0.2;
      background-color: black;
      position: absolute;
      width: 100%;
      min-height: 100vh;
  }

  .showToast {
      position: absolute;
      opacity: 1;
      width: 70%;
      margin-left: 15%;
      margin-top: 40%;
  }

  .toast-title {
      padding-left: 5%;
      background-color: #51cdcb;
      color: white;
      padding-top: 2vh;
      padding-bottom: 2vh;
      border-top-right-radius: 16rpx;
      border-top-left-radius: 16rpx;
  }

  .toast-main {
      padding-top: 2vh;
      padding-bottom: 2vh;
      background-color: white;
      /* text-align: center; */
  }

  .toast-input {
      margin-left: 5%;
      margin-right: 5%;
      border: 1px solid #ddd;
      padding-left: 2vh;
      padding-right: 2vh;
      padding-top: 1vh;
      padding-bottom: 1vh;
  }

  .toast-button {
      display: flex;
  }

  .button1 {
      width: 50%;
  }

  .button2 {
      width: 50%;
  }

  .button1 button {
      width: 100%;
      background-color: white;
      color: red;
      border-radius: 0px;
      border-bottom-left-radius: 16rpx;
  }

  .button2 button{
      width: 100%;
      background-color: white;
      color: black;
      border-radius: 0px;
      border-bottom-right-radius: 16rpx;
  }
  .goToUserCenter{
    position: fixed;
    right: 20upx;
    bottom: 102upx;
    z-index: 99;
    box-sizing: border-box;
    text-align: center;
  }
  .share-records{
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .share-records-top{
    width: 100%;
    height: 88upx;
    display: flex;
    position: fixed;
    top: 0;
    justify-content:space-around;
    font-size: 32upx;
    color: #787878;
    background: #FFFFFF;
    align-items: center;
  }
  .select{
    box-sizing: border-box;
    padding-top: 27upx;
    display: block;
    height: 88upx;
    display: flex;
    flex-direction: column;
    align-items:center;
    position: relative;
  }
  .select-line{
    display: block;
    width: 100%;
    height: 4upx;
    background-color: #51CDCB;
    position: absolute;
    bottom: 0;
  }
  .share-records-content{
    flex: 1;
    padding: 35upx 30upx 0 30upx;
  }
  .dropdown{
    width: 200upx;
    height: 60upx;
    background-color: #F5F5F6;
    border-radius: 30upx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28upx;
    color: #A8A8A8;
    font-size: 28upx;
    float: right;
  }
  .dropdown image{
    width: 20upx;
    height: 20upx;
    margin-left: 8upx;
  }
  .list{
    margin-top: 80upx;
  }
.item {
  /* width: 690upx; */
}
.item-box{
  border-radius: 20upx;
  /* float: left; */
  margin-bottom: 20upx;
}
.flex-base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.middle {
  align-items: flex-start;
  height: 170upx;
  align-items: center;
}
.title {
  width: 490upx;
  height: 75upx;
  font-weight: 600;
  word-break: break-all;
  display: -webkit-box; /**对象作为伸缩盒子模型展示**/
  -webkit-box-orient: vertical; /**设置或检索伸缩盒子对象的子元素的排列方式**/
  -webkit-line-clamp: 2; /**显示的行数**/
  overflow: hidden; /**隐藏超出的内容**/
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 120upx;
}
.bottom {
  border-top: 1upx solid #f8f8f8;
}
.btn-box{
  display: flex;
  align-items: center;
}
.skip-btn{
  height: 48upx;
  display: flex;
  align-items: center;
  border-radius: 6upx;
  font-size: 26upx;
  margin-right: 20upx;
  box-sizing: border-box;
  text-align: center;
  padding: 0 20upx 0 20upx;
}
.delete{
  border:1upx solid #E8E8E8;
}
.visitor{
  border:1upx solid #51CDCB;
}
</style>
