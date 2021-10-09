<template>
	<view class="content">

    <view class="contractList">
      <view class="contractTitle">签约文件</view>
    </view>
    <view class="contractFile">
      <view class="contractFileLeft">
        <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/contractWord.png" mode=""></image>
        <text style="margin: 0 10rpx;">明医云市场推广合同.docx</text>
      </view>
      <view class="contractFileRight">
        <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/contractEye.png" mode=""></image>
      </view>
    </view>

    <view class="contractList">
      <view class="contractTitle">合同名称</view>
      <view class="contractSize">市场推广合同</view>
    </view>

    <view class="contractList">
      <view class="contractTitle">发起主体</view>
      <view class="contractSize">采推文化传播（北京）有限公司</view>
    </view>

    <view class="contractList">
      <view class="contractTitle">签署截止日期</view>
      <view class="contractSize">2021－7－01  23:59</view>
    </view>

    <view class="contractList">
      <view class="contractTitle">签约流程</view>
    </view>
    <view class="contractMain">
      <view class="contractMainLeft">
        <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/contractJian.jpg" mode=""></image>
      </view>
      <view class="contractMainRight">
        <view class="contractTitle"style="margin-bottom: 10rpx;" >发起方</view>

        <view class="contractCompany">
          <view class="contractCompanyImage">
            <view class="contractTitle">采推文化传播（北京）有限公司</view>
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/antFill-safety-certificate 2 Copy@3x.png" mode=""></image>
          </view>
          <view class="contractCompanyImg">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/contractWord.png" mode=""></image>
          </view>
        </view>

        <view class="contractTitle"style="margin-bottom: 10rpx;margin-top: 130rpx;" >接收方</view>

        <view class="contractCompany">
          <view class="contractCompanyImage">
            <view class="contractTitle">李晨潮</view>
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/contractGou.png" mode=""></image>
          </view>
          <view class="contractCompanyImg">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/contractWord.png" mode=""></image>
          </view>
        </view>

        <view class="contractCompanyImage">
          <view class="contractTitle">照远科技（北京）有限公司</view>
          <image style="margin-top: 0;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/antFill-safety-certificate 2 Copy@3x.png" mode=""></image>
        </view>

      </view>

    </view>

    <view class="contractList">
      <view class="contractTitle">签约状态</view>
      <view class="contractSize" style="color: red;">未完成</view>
    </view>

    <div class="confirm-btn" @click="finish">完成</div>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
      finish(){

      }
		}
	}
</script>

<style scoped>
.content{
  width: 100vw;
}
.contractList{
  width: 670rpx;
  height: 84rpx;
  line-height: 84px;
  margin-top: 20rpx;
  background-color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  padding: 0 40rpx;
}
.contractTitle{
  color: rgba(16, 16, 16, 100);
  font-size:28rpx;
  font-family: PingFangSC-bold;
  /* font-weight: bold; */
}
.contractFile{
  width: 670rpx;
  height: 96rpx;
  background-color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  padding: 0 40rpx;
}
.contractFile image{
  width: 48rpx;
  height: 48rpx;
}
.contractFileLeft{
  display: flex;
  line-height: 48rpx;
}
.contractFile text{
  color: rgba(0, 0, 0, 1);
  font-size: 28rpx;
  font-family: PingFangSC-regular;
}
.contractFileRight{
  display: flex;
  line-height: 48rpx;
}
.confirm-btn {
	width: 100%;
	height: 98upx;
	line-height: 98upx;
	text-align: center;
	color: #FFFFFF;
	font-size: 36upx;
  background-color: rgba(26, 208, 156, 100);
  margin-top: 100rpx;
}
.contractSize{
  font-size: 28rpx;
}
.contractMain{
  width: 670rpx;
  padding: 0 40rpx;
  background-color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  padding-bottom: 40rpx;
}
.contractMainLeft{
  width: 40rpx;
}
.contractMainLeft image{
  width: 40rpx;
  height: 300rpx;
}
.contractMainRight{
  width: 590rpx;
}
.contractCompany{
  width: 100%;
  height: 64rpx;
  line-height: 64rpx;
  display: flex;
  justify-content: space-between;
}
.contractCompanyImage{
  display: flex;
}
.contractCompanyImage image{
  width: 36rpx;
  height: 36rpx;
  margin-left: 15rpx;
  margin-top: 14rpx;
}
.contractCompanyImg{
  width: 64rpx;
  height: 64rpx;
  border-radius: 50%;
}
.contractCompanyImg image{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>
