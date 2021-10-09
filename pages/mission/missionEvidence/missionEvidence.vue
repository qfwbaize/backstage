<template>
	<view class="contnet">
		<view class="list" v-for="(item,index) in AllInfo" :key="index">
      <view class="listTime">{{item.create_time}}</view>
      <view class="listevery">
        <view class="contract_top">
          <image :src=item.logo mode=""></image>
          <view>{{item.name}}</view>
        </view>
        <view class="listText">打款金额</view>
        <view style="font-size:72rpx;font-weight:bold;text-align: center;">{{item.money}}¥</view>
        <view class="listText" style="text-align: left;color:#000000;">打款凭证图片</view>
        <view class="listImg">
          <view class="listImgmain" v-for="(s,k) in item.imgUrl" :key="k">
            <image :src=s mode=""></image>
          </view>
        </view>
      </view>
		</view>

	</view>
</template>

<script>
  import http from "../../../utils/http"
	export default {
		data() {
			return {
        AllInfo:[]
			}
		},
    onLoad(options) {
      this.getAll(options.task_id)
    },
		methods: {
      //所有的打款凭证
      getAll(id){
        var data = {
          task_id:id,
        }
        http({url:'/apis/companytask/company_reward',method:'GET',data:data}).then(res=>{
          if(res.data.code = 200){
            this.AllInfo = res.data.data
            this.AllInfo.forEach(item=>{
              item.imgUrl = []
              item.imgUrl = item.contract.split(',')
            })
          }
        })
      }
		}
	}
</script>

<style scoped>
.contnet{
  width:670rpx;
  min-height: 100vh;
  background-color: rgba(244, 244, 244, 100);
  padding: 40rpx;
}
.list{
  margin-bottom: 40rpx;
}
.listTime{
  width: 670rpx;
  height: 40rpx;
  line-height: 40rpx;
  color: rgba(16, 16, 16, 100);
  font-size: 28rpx;
  text-align: center;
  font-family: PingFangSC-regular;
}
.listevery{
  width:610rpx;
  background-color: #FFFFFF;
  border-radius:12rpx;
  margin-top:20rpx;
  padding: 30rpx;
}
  .contract_top{
    display: flex;
    height: 62rpx;
    line-height: 62rpx;
    font-size: 28rpx;

  }
  .contract_top image{
    width: 62rpx;
    height: 62rpx;
    border-radius: 50%;
    margin-right: 20rpx;
  }
  .listText{
    width: 610rpx;
    height: 40rpx;
    color: rgba(136, 137, 136, 100);
    font-size: 28rpx;
    text-align: center;
    font-family: PingFangSC-regular;
    margin-top: 24rpx;
    margin-bottom: 10rpx;
  }
  .listImg{
    width: 610rpx;
    display: flex;
    flex-wrap: wrap;
  }
  .listImgmain{
    width:180rpx;
    height: 180rpx;
    margin-right: 23rpx;
    margin-bottom: 20rpx;
  }
  .listImgmain image{
    width:100%;
    height: 100%;
  }

</style>
