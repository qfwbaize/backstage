<template>
  <div>
    <!-- 头部两个盒子 -->
    <view class="" style="display: flex;flex-direction: column; padding-left: 40rpx;padding-top: 20rpx;">
      <!-- 产品管理 -->
      <view class="write" @click="gementproducts()">
        <view class="" style="margin-left: 40rpx;">
          <view class="" style="font-size: 56rpx;color: #FFFFFF;margin-top: 18px;margin-bottom: 20rpx;">管理招商信息</view>
          <!-- <view class="" style="font-size: 28rpx;color: #FFFFFF;">PRODUCTS MANAGEMENT</view> -->
        </view>
        <image class="toppicture" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/investment.png"
          mode=""></image>
      </view>
      <!-- 服务管理 -->
      <view class="document" @click="launchproducts()">
        <view class="" style="margin-left: 28rpx;">
          <view class="" style="font-size: 56rpx;color: #FFFFFF;margin-top: 18px;margin-bottom:20rpx;">管理招聘信息</view>
          <!-- <view class="" style="font-size: 28rpx;color: #FFFFFF;">SERVISE MANAGEMENT</view> -->
        </view>
        <image class="toppicture" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/recruit.png"
          mode=""></image>
      </view>
    </view>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      launchproducts(){
        wx.navigateTo({
          url: "/pages/companyPack/joinUs/main"
        });
      },
      gementproducts(){
        wx.navigateTo({
          url: "/pages/demand/merchant/main"
        });
      },
    }
  }
</script>

<style scope>
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
