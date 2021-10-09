<template>
  <div>
    <!-- 头部两个盒子 -->
    <view class="content" style="display: flex;flex-direction: column; padding-left: 40rpx;padding-top: 20rpx;">
      <!-- 发布机构介绍 -->
      <view class="write">
        <view class="" style="margin-left: 40rpx;">
          <view class="" style="font-size: 68rpx;color: #FFFFFF;margin-top: 18px;margin-bottom: 20rpx;">编辑机构介绍</view>
          <view class="" style="font-size: 24rpx;color: #FFFFFF;">ORGANIZATION  INTRODUCTION</view>
        </view>
        <image class="toppicture" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/original.png"
          mode=""></image>
      </view>
      <!-- 管理团队介绍 -->
      <view class="document">
        <view class="" style="margin-left: 28rpx;">
          <view class="" style="font-size: 68rpx;color: #FFFFFF;margin-top: 18px;margin-bottom:20rpx;">编辑团队介绍</view>
          <view class="" style="font-size: 24rpx;color: #FFFFFF;">TEAM INTRODUCTION</view>
        </view>
        <image class="toppicture" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/transpond.png"
          mode=""></image>
      </view>
    </view>
  </div>
</template>

<script>
  export default {
    data(){
      return{

      }
    },
    methods: {


    }
  }
</script>

<style scoped>
  .content{
    width: 100vw;
    height: 100vh;
    background-color: #FFFFFF;
  }
  .box {
    background-color: #FFFFFF;
    padding-left: 40rpx;
    padding-right: 40rpx;
    padding-top: 44rpx;
    height: 100%;
  }

  .write {
    width: 668rpx;
    height: 252rpx;
    background-color: #04D7D0;
    border-radius: 28rpx;
    display: flex;
    justify-content: space-between;
    margin-bottom: 38rpx;
  }

  .document {
    width: 668rpx;
    height: 252rpx;
    background-color: #1AD09C;
    border-radius: 28rpx;
    display: flex;
    justify-content: space-between;
  }

  .toppicture {
    width: 184rpx;
    height: 184rpx;
    margin-top: 34rpx;
    margin-right: 34rpx;
  }
</style>
