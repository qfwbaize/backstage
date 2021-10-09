<template>
	<view class="content">
    <view class="teamname">
      <text>联系电话</text>
      <input type="number"  placeholder="请输入联系电话" :disabled="true" v-model="practice.phone" />
    </view>

    <view class="teamname">
       <text>联系地址</text>
       <input type="text"  placeholder="请输入联系地址" :disabled="true" v-model="practice.openingAddress" />
    </view>

      <view class="pl20 h32 lh32 mb18 fs14" style="background-color: #F3F3F3; color: rgba(160, 157, 157, 96);font-family: Arial;">发票信息</view>

    <view class="teamname">
      <text>开票名称</text>
      <input type="text"  placeholder="请输入开票名称" :disabled="true" v-model="practice.invoiceTitle" />
    </view>

    <view class="teamname">
      <text>税号</text>
      <input type="text"  placeholder="请输入税号" :disabled="true" v-model="practice.invoiceNumber" />
    </view>

    <view class="teamname">
      <text>开户行</text>
      <input type="text"  placeholder="请输入开户行" :disabled="true" v-model="practice.openingBank" />
    </view>

    <view class="teamname">
      <text>开户行账号</text>
      <input type="text"  placeholder="请输入开户行账号" :disabled="true" v-model="practice.openingBankNumber" />
    </view>

    <view class="teamname">
      <text>开票地址</text>
      <input type="text"  placeholder="请输入开票地址" :disabled="true" v-model="practice.openingAddress" />
    </view>

    <view class="teamname">
      <text>联系电话</text>
      <input type="number"  placeholder="请输入联系电话" :disabled="true" v-model="practice.phone" />
    </view>

    <view class="teamname">
      <text>常用邮箱</text>
      <input type="number"  placeholder="请输入常用邮箱" :disabled="true" v-model="practice.email" />
    </view>

    <view class="btn" @click="copy">点击复制开票信息</view>


    <BottomButtonSmall :text="'编辑'" :url="'confirm'" @btn_tap="save"></BottomButtonSmall>

    </view>
</template>

<script>
  import WXAJAX from "@/utils/request";
  import BottomButtonSmall from '@/components/bottom_button_small'
	export default {
    components: { 
      BottomButtonSmall,
    },
		data() {
			return {
        text1:'贾雪伟',
        text2:'23',
        practice:'',
			}
		},
    onShow(){
     this.queryinvoice()
    },
		methods: {
      //复制到剪切板
      copy(){
        let val = '开票名称：'+this.practice.invoiceTitle+'税号：'+practice.invoiceNumber+'开户行：'+this.practice.openingBank+'开户行账号：'+this.practice.openingBankNumber+'开票地址：'+this.practice.openingAddress
        uni.setClipboardData({
            data:val,
            success() {
                console.log('success');
            }
        });
      },
      // 查寻机构发票
      queryinvoice(){
        WXAJAX.POST({
          companyId: wx.getStorageSync('COMPANYID'),
        }, '', '/invoice/query','','',1).then(res => {
          this.practice=res
        })
      },
      save(){
          if(this.practice == ''){
            let type =0;
            uni.navigateTo({
             url:'../editContactMe/editContactMe?type='+type
            })
          }
          if(this.practice != ''){
            let type =1;
            uni.navigateTo({
             url:'../editContactMe/editContactMe?type='+type
            })
          }
      },

		}
	}
</script>

<style scoped>
.content{
  width: 100vw;
  height: 100vh;
  background-color: #FFFFFF;
  padding-top: 40rpx;
}
.teamname{
  display: flex;
  line-height: 60rpx;
  margin-bottom: 50rpx;
  color: rgba(16, 16, 16, 100);
  font-size: 28rpx;
  font-family: PingFangSC-regular;
  padding-left: 40rpx;
}
.teamname text{
  width: 140rpx;
}
.teamname input{
  margin-left: 44rpx;
  width: 400rpx;
  height: 60rpx;
  border-radius: 12rpx;
  color: rgba(136, 136, 136, 100);
  font-size: 28rpx;
  text-align: left;
  font-family: Microsoft Yahei;
  border: 2rpx solid rgba(187, 187, 187, 100);
  padding-left: 20rpx;
  border: none;
  background-color: #f5f5f5;
}
.btn{
  width: 400rpx;
  height: 60rpx;
  border-radius: 12rpx;
  background-color: rgba(3, 211, 197, 100);
  color: rgba(255, 255, 255, 100);
  font-size: 28rpx;
  text-align: center;
  line-height: 60rpx;
  font-family: Microsoft Yahei;
  margin-left: 175rpx;
  margin-top: 50rpx;
  margin-bottom: 150rpx;
}
</style>
