<template>
  <div class="box">
    <view class="">
      <view class="friends">
        <view class="invitation" style="background-color: #36B31D ;">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/antFill-wechat@1x.png"
            mode=""></image>
        </view>
        <button class="choice" open-type="share">微信邀请同事添加</button>
        <view class="choice"></view>
      </view>
      <view class="friends">
        <view class="invitation" style="background-color: #0266BC;">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/fas fa-address-book.png"
            mode=""></image>
        </view>
        <view class="choice" @click="tobusiness()">从名片夹中选择</view>
      </view>
    </view>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
	onShow() {
		console.log(wx.getLaunchOptionsSync("scene"),"启动小程序的场景值");
	},
    methods: {
      onShareAppMessage: (res) => {
        if (res.from === 'button') {
          console.log("来自页面内转发按钮");
          console.log(res.target);
        } else {
          console.log("来自右上角转发菜单")
        }
        return {
          title: '欢迎成为我的同事',
          path: '/pages/companyPack/addmembers/addmembers',
          imageUrl: "",
          success: (res) => {
            console.log(res,"转发成功");
          },
          fail: (res) => {
            console.log("转发失败", res);
          },
          }
        },
        // 跳转到站内名片夹页面
        tobusiness(){
          uni.navigateTo({
          	url: "../../companyPack/business/business"
          });
        },
      }
    }
</script>

<style scoped>
  .box {
    /* width: 100%; */
    /* height: 100%; */
    padding-left: 40rpx;
    padding-top: 40rpx;
    padding-right: 42rpx;
  }

  .friends {
    width: 100%;
    height: 152rpx;
    border-radius: 12rpx;
    background-color: #FFFFFF;
    display: flex;
    margin-bottom: 22rpx;
    align-items: center;
  }

  .invitation {
    width: 114rpx;
    height: 114rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12rpx;
    /* margin-top: 20rpx; */
    margin-left: 32rpx;
  }

  .invitation image {
    width: 48rpx;
    height: 48rpx;
  }

  .choice {
    font-size: 30rpx;
    color: #101010;
    /* margin-top: 24rpx; */
    margin-left: 26rpx;
    background-color: #FFFFFF;
    padding-left: 0;
    padding-right: 0;
  }
</style>
