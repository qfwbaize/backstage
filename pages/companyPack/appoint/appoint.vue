<template>
	<div style="height: 100%;background-color: #FFFFFF;padding-bottom: 30rpx;padding-left: 40rpx;padding-right: 40rpx;">
    <view class="ferret">
      <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/greensearch.png"  mode=""></image>
      <view class="" style="font-size:28rpx ;font-weight:bold;color:#19D09B;margin-left:10rpx;margin-right: 10rpx;">{{assign}}</view>
      <input  class="keyword" type="text" value="搜索关键词" />
    </view>
  </div>
</template>

<script>
  import util from '@/utils/index'
  import WXAJAX from "@/utils/request";
	export default {
		data() {
			return {
        assign:'',  //指定搜索
			}
		},
    onLoad(e) {
      console.log(e)
      this.assign = e.item
    },
    onShow() {

    },
		methods: {

		}
	}
</script>

<style scoped>
  .ferret{
    width:100%;
    height: 70rpx;
    border-radius: 36rpx;
    border: 2rpx solid #000000;
    display: flex;
    align-items: center;
  }
  .ferret image{
    width: 40rpx;
    height: 40rpx;
    margin-left: 20rpx;
  }
  .keyword{
    font-size: 28rpx;
    width: 70%;
    font-size: 28rpx;
    color: #c6c6c6;
    text-align: center;
  }
</style>
