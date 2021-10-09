<template>
  <view>
    <!-- 导航栏 -->
    <!-- <div class="w90p  h30 m0auto disflex jsaround" style="background-color: #FFFFFF;">
      <div :class="tabType == 0 ? 'wrap':'arr'" @click="tab_type_tap(0)">本机构发布的</div>
      <div :class="tabType == 1 ? 'wrap':'arr'" @click="tab_type_tap(1)">我承接的</div>
    </div> -->
    <!-- 任务通知 -->
    <!-- <view class="notices">
      <view class="noticesImg"><image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/messionmsg.png" mode=""></image></view>
      <view class="noticesText">
        <view class="">平台任务通知</view>
        <view class="" style="margin-top: 15rpx;">李晨潮想与您签署任务合同</view>
      </view>
      <view class="noticesNum">3</view>
    </view> -->
    <!-- 指定给我的 -->
    <!-- <view class="main" v-show="tabType == 0"> -->
    <view class="main">
      <view class="minList">
        <view class="minList_top">
          <view class="minList_title">公司logo设计</view>
          <view class="minList_reward">100元</view>
        </view>
        <view class="minList_center">
          <view class="minList_center_left">
            <view style="color: #f5f5f5;margin-right: 15rpx;">
              <Circle></Circle>
            </view>
            <view>
              <view class="minList_center_right_people">2021-6-5</view>
              <view class="minList_center_right_people" style="margin-top: 32rpx;">2021-6-5</view>
            </view>
          </view>
          <view class="minList_center_right">
            <view class="minList_center_right_people">发布人：[刁柏森] [管理员］</view>
            <view class="minList_center_right_people" style="margin-top: 32rpx;">所属机构：柏森营销顾问</view>
          </view>
        </view>
        <view class="minList_bottom">进行中</view>
      </view>
    </view>
    <!-- 我发布的指定任务 -->
   <!-- <view class="main" v-show="tabType == 1">
      <view class="minList">
        <view class="minList_top">
          <view class="minList_title">公司logo设计</view>
          <view class="minList_reward">100元</view>
        </view>
        <view class="minList_center">
          <view class="minList_center_left">
            <view style="color: #f5f5f5;margin-right: 15rpx;">
              <Circle></Circle>
            </view>
            <view>
              <view class="minList_center_right_people">2021-6-5</view>
              <view class="minList_center_right_people" style="margin-top: 32rpx;">2021-6-5</view>
            </view>
          </view>
          <view class="minList_center_right">
            <view class="minList_center_right_people">指定人：[张三] [设计师］</view>
            <view class="minList_center_right_people" style="margin-top: 32rpx;">所属机构：柏森营销顾问</view>
          </view>
        </view>
        <view class="minList_bottom">进行中</view>
      </view>
    </view> -->
    <view class="task_button">
      发布任务
    </view>
  </view>
</template>

<script>
  import circle from "@/components/circle";

  export default {
    components:{
      circle
    },
    data() {
      return {
        tabType: 0
      }
    },
    onLoad() {

    },

    methods: {
      tab_type_tap(i) {
        this.tabType = i
      },

    }
  }
</script>

<style>
  .arr {
    height: 100%;
    border: 1px #00BBAE;
    color: #000000;
    font-size: 28rpx;
    text-align: center;
    line-height: 60rpx;
    font-family: PingFangSC-regular;
  }

  .wrap {
    height: 100%;
    color: #00BBAE;
    font-size: 32rpx;
    text-align: center;
    line-height: 60rpx;
    font-family: PingFangSC-bold;
    border-bottom: 3px solid #00BBAE;
  }
 /* .notices{
    width: 610rpx;
    height: 96rpx;
    background-color: #FFFFFF;
    border-radius: 12rpx;
    margin-left: 40rpx;
    margin-top: 30rpx;
    display: flex;
    padding: 30rpx;
  }
  .noticesImg{
    width: 88rpx;
    height: 88rpx;
    border-radius: 16rpx;
    background-color: rgba(2, 102, 188, 100);
  }
  .noticesImg image{
    width: 36rpx;
    height: 36rpx;
    margin-top: 26rpx;
    margin-left: 26rpx;
  }
  .noticesText{
    color: rgba(16, 16, 16, 100);
    font-size: 26rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-left: 24rpx;
    margin-right: 50rpx;
    font-weight: 500;
  }
  .noticesNum{
    width: 64rpx;
    height: 64rpx;
    border-radius: 50%;
    background-color: red;
    text-align: center;
    line-height: 64rpx;
    color: #FFFFFF;
    margin-top: 12rpx;
  } */

  .main {
    width: 670rpx;
    min-height: 100vh;
    padding: 40rpx;
    background-color: #f5f5f5;
  }

  .minList {
    width: 630rpx;
    height: 332rpx;
    background-color: #FFFFFF;
    border-radius: 12rpx;
    margin-bottom: 40rpx;
    padding: 20rpx;
  }

  .minList_top {
    display: flex;
    justify-content: space-between;
  }

  .minList_title {
    color: rgba(16, 16, 16, 100);
    font-size: 32rpx;
    font-weight: bold;
  }

  .minList_reward {
    color: rgba(0, 187, 174, 100);
    font-size: 28rpx;
  }

  .minList_center {
    display: flex;
    justify-content: space-between;
    margin-top: 50rpx;
    margin-bottom: 50rpx;
  }

  .minList_center_left {
    width: 182rpx;
    height: 110rpx;
    display: flex;
  }

  .greencircle {
    width: 15rpx;
    height: 15rpx;
    border-radius: 50%;
    border: 1px solid #00BBAE;
    margin-top: 8rpx;
  }

  .orangecircle {
    width: 15rpx;
    height: 15rpx;
    border-radius: 50%;
    border: 1px solid orange;
  }

  .minList_center_right_people {
    color: rgba(143, 143, 143, 100);
    font-size: 26rpx;
    text-align: left;
    font-family: PingFangSC-regular;
  }

  .minList_bottom {
    width: 100%;
    height: 40rpx;
    line-height: 40rpx;
    color: rgba(25, 27, 30, 100);
    font-size: 28rpx;
    text-align: center;
    font-family: PingFangSC-regular;
  }

  .task_button {
    position: fixed;
    bottom: 0rpx;
    width: 750rpx;
    height: 84rpx;
    line-height: 84rpx;
    background-color: rgba(26, 208, 156, 100);
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    line-height: 84rpx;
    text-align: center;
    font-family: Arial;
    color: #FFFFFF;
  }
</style>
