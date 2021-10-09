<template>
 <view class="">
    <!-- 页面主体 -->
    <view class="main" @click="toTaskDetail">
      <!-- 每一个信息列表 -->
      <view class="mainlist">
        <view class="taskinfo">
          <view class="taskinfo_title">明医云视频转发任务</view>
          <view class="taskinfo_money">金额：100元</view>
          <view class="taskinfo_status">进行中</view>
        </view>
        <view class="taskinfo_text">任务规则：每次转发视频可获得1元奖励，总奖金池为100元。奖励发完为止。</view>
        <view class="taskinfo_bottom">
          <view class="taskinfo_bottom_company">
            <image src="../../../static/tabs/find-active.png" mode=""></image>
            <view class="taskinfo_bottom_companyname">北京明医云科技股份有限公司</view>
          </view>
          <view class="taskinfo_time">
            <view class="taskinfo_time_text"><text class="square"></text>2021-06-07</view>
            <view class="taskinfo_time_text"><text class="square" style="border: 1px solid #F0F0F0;"></text></view>
            <view class="taskinfo_time_text"><text class="square" style="border: 1px solid orange"></text>2021-06-07</view>
          </view>
        </view>
        <view class="opnetime">发布于2021年6月5日<text class="del">删除</text></view>
      </view>

      <view class="mainlist">
        <view class="taskinfo">
          <view class="taskinfo_title">明医云视频转发任务</view>
          <view class="taskinfo_money">金额：100元</view>
          <view class="taskinfo_statuss">进行中</view>
        </view>
        <view class="taskinfo_text">任务规则：每次转发视频可获得1元奖励，总奖金池为100元。奖励发完为止。</view>
        <view class="taskinfo_bottom">
          <view class="taskinfo_bottom_company">
            <image src="../../../static/tabs/find-active.png" mode=""></image>
            <view class="taskinfo_bottom_companyname">北京明医云科技股份有限公司</view>
          </view>
          <view class="taskinfo_time">
            <view class="taskinfo_time_text"><text class="square"></text>2021-06-07</view>
            <view class="taskinfo_time_text"><text class="square" style="border: 1px solid #F0F0F0;"></text></view>
            <view class="taskinfo_time_text"><text class="square" style="border: 1px solid orange"></text>2021-06-07</view>
          </view>
        </view>
        <view class="opnetime">发布于2021年6月5日<text class="del">删除</text></view>
      </view>


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
      //跳转到详情页面
      toTaskDetail(){
        uni.navigateTo({
          url:'../taskDetail/taskDetail'
        })
      },
		}
	}
</script>

<style scoped>
.main{
  width: 670rpx;
  margin-top: 40rpx;
  margin-left: 40rpx;
}
.mainlist{
  width: 642rpx;
  height: 320rpx;
  line-height: 40px;
  border-radius: 12px;
  /* text-align: center; */
  background-color: #FFFFFF;
  padding: 14rpx;
  position: relative;
  margin-bottom: 104rpx;
}
.taskinfo{
  width: 100%;
  display: flex;
  justify-content: space-between;
  line-height: 46rpx;
}
.taskinfo_title{
  width: 288rpx;
  height: 46rpx;
  color: rgba(16, 16, 16, 100);
  font-size: 32rpx;
  text-align: left;
  font-family: PingFangSC-bold;
  font-weight: bold;
}
.taskinfo_money{
  /* width: 146rpx; */
  height: 38rpx;
  color: rgba(143, 143, 143, 100);
  font-size: 26rpx;
  text-align: left;
  font-family: PingFangSC-regular;
}
.taskinfo_status{
  width: 96rpx;
  height: 42rpx;
  margin-top: 2rpx;
  line-height: 42rpx;
  border-radius: 12rpx;
  background-color: rgba(196, 241, 238, 100);
  color: rgba(1, 196, 161, 100);
  font-size: 24rpx;
  text-align: center;
  font-family: Microsoft Yahei;
}
.taskinfo_statuss{
  width: 96rpx;
  height: 42rpx;
  margin-top: 2rpx;
  line-height: 42rpx;
  border-radius: 12rpx;
  background-color: rgba(239, 239, 239, 100);
  color: rgba(143, 143, 143, 100);
  font-size: 24rpx;
  text-align: center;
  font-family: Microsoft Yahei;
}
.taskinfo_text{
  width: 642rpx;
  height: 134rpx;
  color: rgba(143, 143, 143, 100);
  font-size: 28rpx;
  text-align: left;
  font-family: PingFangSC-regular;
  margin-top: 20rpx;
}
.taskinfo_bottom{
  width: 642rpx;
  height: 100rpx;
  display: flex;
  justify-content: space-between;
}
.taskinfo_bottom_company{
  width: 450rpx;
  height: 48rpx;
  line-height: 48rpx;
  display: flex;
  margin-top: 50rpx;
}
.taskinfo_bottom_company image{
  width: 48rpx;
  height: 48rpx;
}
.taskinfo_bottom_companyname{
  width: 312rpx;
  height: 36rpx;
  color: rgba(143, 143, 143, 100);
  font-size: 24rpx;
  text-align: left;
  font-family: PingFangSC-regular;
  margin-left: 12rpx;
}
.taskinfo_time{
  width: 146rpx;
  height: 100rpx;
}
.taskinfo_time_text{
  height: 33rpx;
  line-height: 33rpx;
  color: rgba(143, 143, 143, 100);
  font-size: 20rpx;
}
.square{
  width: 10rpx;
  height: 10rpx;
  margin-right: 15rpx;
  border: 1px solid #c4f1ee;
  border-radius: 50%;
  display: inline-block;
}
.opnetime{
  position: absolute;
  bottom: -40rpx;
  height: 36rpx;
  color: rgba(181, 181, 181, 100);
  font-size: 24rpx;
  text-align: left;
  font-family: PingFangSC-regular;
}
.del{
  color: rgba(2, 102, 188, 100);
  font-size: 24rpx;
  margin-left: 54rpx;
}
</style>
