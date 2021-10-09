<template>
  <div style="background-color: #FFFFFF;height: 100%;">
    <view class="" style="background-color: #FFFFFF;padding-left: 40rpx;padding-right: 40rpx;padding-top: 20rpx;">
      <view class="" style="display: flex;">
        <view class="ferret">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/greensearch.png"  mode=""></image>
          <input class="keyword" type="text" placeholder='输入搜索关键词' @confirm="confirm($event)"
           confirm-type="search" :value="sealist"/>
        </view>
        <view class="" style="font-size: 28rpx;margin-top: 20rpx;margin-left: 36rpx;" @click="abolish()">取消</view>
      </view>
      <!-- 热门搜索 -->
      <view class="" style="margin-bottom: 30rpx;">
        <view class="" style="font-size: 28rpx;font-weight: bold;margin-bottom: 30rpx;">热门搜索</view>
        <view class="" style="margin-left: 16rpx;">
          <view class="" style="display: flex;align-items: center;">
            <view class="" style="font-size: 38rpx;color: #19D09B ;">1</view>
            <view class="" style="font-size: 24rpx;margin-left: 10rpx;">证据链不是写出来的，是干出来的！</view>
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/st-paper-plane@3x.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
          </view>
        </view>
      </view>
      <!-- 历史搜索 -->
      <view class="">
        <view class=""  style="font-size: 28rpx;font-weight: bold;margin-bottom: 30rpx;">历史搜索</view>
        <view class="" style="margin-left: 16rpx;display: flex;">
          <view class="" style="padding: 10rpx;background-color: #EFEFEF;font-size: 24rpx;color: #8B8B8B;border-radius: 12rpx;margin-right: 30rpx;">医药合规</view>
          <view class="" style="padding: 10rpx;background-color: #EFEFEF;font-size: 24rpx;color: #8B8B8B;border-radius: 12rpx;">财税课程</view>
        </view>
        <view class="" style="width: 100%;text-align: center;color: #C6C6C6;font-size: 24rpx;margin-top: 50rpx;">清空搜索历史</view>
      </view>
      <!-- 指定搜索 -->
      <view class="">
        <view class=""  style="font-size: 28rpx;font-weight: bold;margin-bottom: 30rpx;">指定搜索</view>
        <view class="" style="display: flex;flex-direction: row;margin-left: 30rpx;margin-right: 38rpx;justify-content: space-between;">
          <view class=""v-for="(item,index) in paglist" :key="index" @click="toallocate(item)"
           style="font-size: 28rpx;color: #19D09B;">{{item}}</view>
        </view>
        <view class="" style="display: flex;margin-left: 30rpx;margin-top: 60rpx;">
          <view class="" v-for="(item,index) in paglist_2" :key="index" @click="toallocate(item)"
           style="font-size: 28rpx;color: #19D09B;margin-right:58rpx ;">{{item}}</view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
  import util from '@/utils/index'
  import WXAJAX from "@/utils/request";
	export default {
		data() {
			return {
        paglist:['名片','动态','文章','视频','文件','聊天'],
        paglist_2:['产品','供求'],
        sealist:'',
			}
		},
		methods: {
      confirm(e){
        console.log(e)
        let type = e.detail.value
        uni.navigateTo({
          url: '/pages/companyPack/directsearch/directsearch?type=' + type
        });
      },
      // 去指定搜索
    toallocate(item){
      uni.navigateTo({
        url: '/pages/companyPack/appoint/appoint?item=' + item
      });
    },
    // 点击取消按钮
    abolish(){
      console.log(this.sealist,'deeeededefrffrfrfr')
      // this.sealist = ''
    },
		}
	}
</script>

<style scoped>
  .ferret{
    width: 574rpx;
    height: 70rpx;
    border-radius: 36rpx;
    border: 2rpx solid #000000;
    display: flex;
    align-items: center;
    margin-bottom: 40rpx;
  }
  .ferret image{
    width: 40rpx;
    height: 40rpx;
    margin-left: 20rpx;
  }
  .keyword{
    width: 100%;
    font-size: 28rpx;
    /* margin-left: 170rpx; */
    text-align: center;
  }
</style>
