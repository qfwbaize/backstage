<template>
	<view class="main">
    <view class="content">

      <view class="content_top">
        <view class="content_title">采推视频转发任务</view>
        <view class="content_money">金额：100元</view>
        <view class="content_status">待确认</view>
      </view>

      <view class="content_user">
        <view class="contentImg"><image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/photo/20210804/0f5a3d1efab5603e830cf5b1f330abe2.jpg" mode=""></image></view>
        <view>
          <view class="contentText" style="font-weight: 600;">李晨潮</view>
          <view class="contentText" style="margin-top: 36rpx;">照远科技（北京）有限公司</view>
        </view>
      </view>

      <view class="content_dec">ta已确认合同，等待与您的确认</view>

      <view class="contentImgs">
        <view class="contentList">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/photo/20210804/0f5a3d1efab5603e830cf5b1f330abe2.jpg" mode=""></image>
        </view>
        <view class="contentList">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/photo/20210804/0f5a3d1efab5603e830cf5b1f330abe2.jpg" mode=""></image>
        </view>
        <view class="contentList">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/photo/20210804/0f5a3d1efab5603e830cf5b1f330abe2.jpg" mode=""></image>
        </view>
        <view class="cover">+2</view>
      </view>

      <!-- <view class="returnBtn">退回并要求重新签署合同</view> -->

      <view class="confirmBtn">确认并开始任务</view>

    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
.main{
  width: 670rpx;
  min-height: 100vh;
  background: #FFFFFF;
  padding: 40rpx;
}
.content_top{
  display: flex;
  height: 46rpx;
  line-height: 46rpx;
}
.content_title{
  color: rgba(16, 16, 16, 100);
  font-size: 32rpx;
  text-align: left;
  font-family: PingFangSC-bold;
  font-weight: bold;
}
.content_money{
  color: rgba(0, 187, 174, 100);
  font-size: 28rpx;
  text-align: left;
  font-family: PingFangSC-semiBold;
  margin-left: 60rpx;
  font-weight: 500;
}
.content_status{
  width: 96rpx;
  height: 46rpx;
  line-height: 46rpx;
  border-radius: 12rpx;
  background-color: rgba(196, 241, 238, 100);
  color: rgba(1, 196, 161, 100);
  font-size: 24rpx;
  text-align: center;
  font-family: Arial;
  margin-left: 36rpx;
}
.content_user{
  display: flex;
  margin-top: 36rpx;
  margin-bottom: 60rpx;
}
.contentImg{
  width: 110rpx;
  height: 110rpx;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 36rpx;
}
.contentImg image{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.contentText{
  color: rgba(16, 16, 16, 100);
  font-size: 28rpx;
  text-align: left;
  font-family: PingFangSC-bold;
}
.content_dec{
  height: 38rpx;
  color: rgba(16, 16, 16, 100);
  font-size: 28rpx;
  text-align: left;
  font-family: PingFangSC-regular;
}
.contentImgs{
  width: 670rpx;
  display: flex;
  margin-top:38rpx;
  margin-bottom:172rpx;
  flex-wrap: wrap;
  position: relative;
}
.cover{
  width: 64rpx;
  height: 64rpx;
  line-height: 64rpx;
  background-color:#6c6d6f;
  color:#FFFFFF;
  font-size: 28rpx;
  text-align: center;
  font-family: Arial;
  position: absolute;
  right: 31rpx;
  bottom: 0rpx;
}
.contentList{
  width: 192rpx;
  height: 260rpx;
  margin-right:31rpx;
  margin-top: 10rpx;
}
.contentList image{
  width: 100%;
  height: 100%;
}
.returnBtn{
  width:374rpx;
  height: 64rpx;
  line-height: 64rpx;
  border-radius: 12rpx;
  background-color: rgba(255, 255, 255, 100);
  color:#00BBAE;
  font-size: 28rpx;
  text-align: center;
  font-family: Arial;
  border: 1px solid rgba(0, 187, 174, 100);
  margin-left: 148rpx;
}
.confirmBtn{
  width:374rpx;
  height: 64rpx;
  line-height: 64rpx;
  border-radius: 12rpx;
  background-color: rgba(0, 187, 174, 100);
  color:#FFFFFF;
  font-size: 28rpx;
  text-align: center;
  font-family: Arial;
  border: 1px solid rgba(0, 187, 174, 100);
  margin-left: 148rpx;
  margin-top: 46rpx;
}
</style>
