<template>
  <div class="box">
    <view class="">
      <!-- 顶部切换 -->
      <view class="" style="display: flex;width: 100%;flex-direction: row;">
        <view class="barlist" :class="{'active':isActive==1}" @click="chenked(1)">
          <image class="barimg" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/video.png" mode=""></image>
          <view class="" :class="{'activelist':isActive==1}">我的</view>
        </view>
        <view class="barlist" :class="{'active':isActive==2}" @click="chenked(2)">
          <image class="barimg" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/video.png" mode=""></image>
          <view class="" :class="{'activelist':isActive==2}">早安</view>
        </view>
        <view class="barlist" :class="{'active':isActive==3}" @click="chenked(3)">
          <image class="barimg" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/video.png" mode=""></image>
          <view class="" :class="{'activelist':isActive==3}">晚安</view>
        </view>
        <view class="barlist" :class="{'active':isActive==4}" @click="chenked(4)">
          <image class="barimg" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/video.png" mode=""></image>
          <view class="" :class="{'activelist':isActive==4}">新年</view>
        </view>
      </view>
      <!-- 主体部分 -->
      <view class="">
        <!-- 我的 -->
        <view class="" v-show="isActive==1">
          <view class="">
            <view class="">+</view>
            <view class="">上传图片格式png,jpeg,jpg。大小尽量不超过2M,最多上传20张。</view>
          </view>
        </view>
        <!-- 早安 -->
        <view class="" v-show="isActive==2">
          <view class="">
            <view class="">早安</view>
            <view class="">上传图片格式png,jpeg,jpg。大小尽量不超过2M,最多上传20张。</view>
          </view>
        </view>
        <!-- 晚安 -->
        <view class="" v-show="isActive==3">
          <view class="">
            <view class="">晚安</view>
            <view class="">上传图片格式png,jpeg,jpg。大小尽量不超过2M,最多上传20张。</view>
          </view>
        </view>
        <!-- 新年 -->
        <view class="" v-show="isActive==4">
          <view class="">
            <view class="">新年</view>
            <view class="">上传图片格式png,jpeg,jpg。大小尽量不超过2M,最多上传20张。</view>
          </view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isActive: 1
      }
    },
    methods: {
      chenked(type) {
        this.isActive = type
      },
    }
  }
</script>

<style>
  .box{
    width: 100%;
    background-color: #FFFFFF;
  }
  .barimg{
    width: 50rpx;
    height: 50rpx;
    background-color: #000000;
  }
  .barlist{
    /* width: 100rpx;
    height: 100rpx; */
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .active{
    background-color: #DEDEDE;
  }
  .activelist{
    background-color: #23D2C6;
    color: #FFFFFF;
    border-radius: 20rpx;
    margin-left: 10rpx;
    margin-right: 10rpx;
    margin-bottom: 6rpx;
    margin-top: 6rpx;
  }
</style>
