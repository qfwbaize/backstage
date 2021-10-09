<template>
	<view class="content">
		<view class="demand" @click="toDemand">
      <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/mineDemand.png" mode=""></image>
    </view>
    <view class="demand" @click="toAdminDemand">
      <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/adminDemand.png" mode=""></image>
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
      //跳转到填写需求页面
      toDemand(){
        uni.navigateTo({
          url:'../writedemand/writedemand'
        })
      },
      //跳转到供求管理页面
      toAdminDemand(){
        uni.navigateTo({
          url:'../adminDemand/adminDemand'
        })
      }
		}
	}
</script>

<style scoped>
.content{
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  padding: 40rpx;
 }
 .demand{
  width: 670rpx;
  height: 268rpx;
  margin-bottom: 28rpx;
 }
 .demand image{
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 12rpx;
 }
</style>
