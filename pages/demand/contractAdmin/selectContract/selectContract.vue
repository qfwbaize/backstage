<template>
  <view>
    <!-- 导航栏 -->
    <div class="w90p  h30 m0auto disflex jsaround" style="background-color: #FFFFFF;">
      <div :class="tabType == 0 ? 'wrap':'arr'" @click="tab_type_tap(0)">机构合同</div>
      <div :class="tabType == 1 ? 'wrap':'arr'" @click="tab_type_tap(1)">采推合同模板</div>
    </div>

    <view class="main" v-show="tabType == 0">
      <view class="mainList">
        <view class="selectquare" ></view>
        <view>
          <view class="mainText" style="font-weight: bold;">劳务分包合同.doc</view>
          <view class="mainText" style="font-size: 24rpx;margin-top: 48rpx;">2021/6/6 13:20由[管理员][刁柏森]</view>
        </view>
        <view class="mainImg">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/messionword .png" mode=""></image>
        </view>
      </view>

    </view>

    <view class="main" v-show="tabType == 1">
      <view class="mainList">
        <view class="selectquare"></view>
        <view>
          <view class="mainText" style="font-weight: bold;">劳务分包合同.doc</view>
          <view class="mainText" style="font-size: 24rpx;margin-top: 48rpx;">2021/6/6 13:20由[管理员][刁柏森]</view>
        </view>
        <view class="mainImg">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/messionpdf .png" mode=""></image>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        tabType: 0,
        imgWord:'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/messionword .png',
        imgWdf:'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/messionpdf .png'
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

  .main {
    width: 670rpx;
    min-height: 100vh;
    padding: 40rpx;
    background-color: #f5f5f5;
  }

  .mainList {
    width: 590rpx;
    height: 140rpx;
    background-color: #FFFFFF;
    margin-bottom: 40rpx;
    padding: 20rpx 40rpx;
    display: flex;
    justify-content: space-between;
  }

  .mainText {
    font-size: 28rpx;
    text-align: left;
    font-family: PingFangSC-medium;
  }

  .mainImg {
    width: 80rpx;
    height: 80rpx;
    margin-top: 15rpx;
  }

  .mainImg image {
    width: 100%;
    height: 100%;
  }
  .selectquare{
    width: 44rpx;
    height: 44rpx;
    border-radius: 50%;
    border: 1px solid #d4d4d9;
    margin-top: 46rpx;
  }
  .active{
    width: 44rpx;
    height: 44rpx;
    border-radius: 50%;
    margin-top: 46rpx;
    background: #51CDCB;
  }
</style>
