<template>
	<view class="main">
    <view class="msgList" v-for="(item,index) in msgList" :key="index">
      <view :class="item.is_read == 1 ?'msgList_tops' :'msgList_top' " @click="toNewsDetail(item.id)">{{item.content}}</view>
      <view class="msgList_time">{{item.create_time}} 来自［{{item.type_name}}］</view>
    </view>
    <view class="cover" v-if="msgList.length == 0">
      <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png" mode=""></image>
    </view>
	</view>
</template>

<script>
  import http from "../../../utils/http"
	export default {
		data() {
			return {
        page:1,
        msgList:[]
			}
		},
    onShow() {
      this.getMessage()
    },
    onReachBottom(){
      this.page += 1
      this.getMessage()
    },
    onPullDownRefresh() {
      this.page = 1
      this.getMessage()
    },
		methods: {
      //获取消息通知列表
      getMessage(){
        var data ={
          page:this.page
        }
        http({url:'/apis/messages/index',method:'GET',data:data}).then(res=>{
          if(res.data.code == 200){
            if (this.page == 1) {
            	this.msgList = res.data.data
            } else {
            	this.msgList = [...this.msgList,...res.data.data]
            }
            // console.log(this.msgList,999999999999)
          }
        })
      },
      //点击设置已读
      toNewsDetail(id){
        var data ={
          id:id
        }
        http({url:'/apis/messages/read',method:'GET',data:data}).then(res=>{
          if(res.data.code == 200){
            this.getMessage()
          }
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
.cover{
  width: 100%;
  height: 100%;
}
.cover image{
  width: 300rpx;
  height: 300rpx;
  margin-top:300rpx;
  margin-left:185rpx;
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
.msgList_tops{
  width: 630rpx;
  padding: 20rpx;
  background-color: #FFFFFF;
  color: rgba(143, 143, 143, 100);
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
