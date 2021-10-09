<template>
	<view class="main">
    <view class="msgList">
      <view class="msgList_top" @click="toNewsDetail">[李晨潮] 签署了您发布的 [采推视频转发任务] 的合同，请查看</view>
      <view class="msgList_time">2021/2/4  13:39 来自［柏森顾问机构］</view>
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
      //跳转到任务通知详情页面
      toNewsDetail(){
        uni.navigateTo({
          url:'./newsDetail/newsDetail'
        })
      }
		}
	}
</script>

<style scoped>
.main{
  width: 670rpx;
  min-height: 100vh;
  background: #F5F5F5;
  padding: 40rpx;
}
.msgList{
  margin-bottom: 40rpx;
}
.msgList_top{
  width: 630rpx;
  padding: 20rpx;
  background-color: #FFFFFF;
  color: rgba(16, 16, 16, 100);
  font-size: 28rpx;
  font-family: PingFangSC-regular;
}
.msgList_time{
  width: 650rpx;
  height: 36rpx;
  padding-left: 20rpx;
  color: rgba(25, 27, 30, 64);
  font-size: 26rpx;
  text-align: left;
  font-family: PingFangSC-regular;
  margin-top: 10rpx;
}
</style>
