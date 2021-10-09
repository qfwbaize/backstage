<template>
  <div class="box">
    <view class="">
      <view class="" v-for="(item,index) in editorslist" :key="index">
        <view class="titlelist" style="padding-top: 44rpx;">{{item.visualizeTitle}}</view>
        <view class="" v-for="(v,k) in item.piclist" :key="k">
          <image class="titleimage" :src="v" mode=""></image>
        </view>
        <view class="subhead">{{item.visualizeDescription}}</view>
      </view>
    </view>
    <view @click="todisplayeditors()" class="editors">编辑形象展示</view>
  </div>
</template>

<script>
  import WXAJAX from "@/utils/request";
  import util from "@/utils/index";
	export default {
		data() {
			return {
      editorslist:'',
      piclist:'',
			}
		},
    onShow() {
     this.geteditors()
    },
		methods: {
      //跳转到编辑形象展示页面
      todisplayeditors() {
        if(this.editorslist == ''){
          let add =0;
          wx.navigateTo({
          	url: '../../companyPack/displayeditors/displayeditors?add='+add
          })
        }
      	if(this.editorslist != ''){
          let add =1;
          wx.navigateTo({
          	url: '../../companyPack/displayeditors/displayeditors?add='+add
          })
        }
      },
      geteditors(){
        WXAJAX.POST({
        		companyId:wx.getStorageSync('COMPANYID')
        	}, '', '/visualize/queryList', '', '', 1)
        	.then((res) => {
            console.log(res)
            if(res){
             res.forEach(function(i, k) {
             	i.piclist = i.visualizeUrl ? i.visualizeUrl.split(",") : [];
              console.log(i.piclist)
             });
             // res.forEach(function(i, k) {
             //   i.photos = JSON.parse(i.photos);
             // });
            }
            this.editorslist=res
            // this.piclist=res
            console.log(this.editorslist)
        	})
      },
		}
	}
</script>

<style scoped>
  .box{
    background-color: #FFFFFF;
    padding-left: 40rpx;
    padding-right: 40rpx;
  }
  .titlelist{
    font-size:32rpx;
    color: #101010;
    margin-bottom: 6rpx;
  }
  .titleimage{
    width: 672rpx;
    height: 452rpx;
    border-radius: 12rpx;
    margin-bottom: 40rpx;
  }
  .subhead{
    font-size: 28rpx;
    color: #8f8f8f;
    padding-bottom: 110rpx;
  }
  .editors{
    width: 100%;
    height: 90rpx;
    background-color: #00D7D0;
    position: fixed;
    bottom: 0;
    right: 0;
    color: #FFFFFF;
    font-size: 28rpx;
    text-align: center;
    line-height: 90rpx;
  }
</style>
