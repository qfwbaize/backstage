<template>
  <div class="box">
    <view class="" style="margin-bottom: 20rpx;color: #BBBBBB;">
      <view class="" @click="cutbatch()" v-if="isbatch == false">批量邀请</view>
      <view class="" style="display: flex;justify-content: space-between;" v-if="isbatch == true">
        <view class="" @click="onpoint()">取消</view>
        <view class="">立即分享</view>
      </view>
    </view>
    <view class="" v-for="(item,index) in friendList" :key="index">
      <view class="folderlist">
        <view class="" style="display: flex;align-items: center;">
          <image :src=item.logo mode=""></image>
          <view class="">{{item.name}}</view>
        </view>
        <view class=""  v-if="isbatch == false" style="margin-right: 40rpx;font-size: 30rpx;color: #04D7D0 ;">邀请他</view>
        <checkbox style="margin-right: 40rpx;" v-if="isbatch == true" :value="item.value" :checked="item.checked" />
      </view>
    </view>
  </div>
</template>

<script>
  import WXAJAX from "@/utils/request";
  export default {
    data() {
      return {
        friendList: '',
        pageNum: 1,
        isbatch:false,
      }
    },
    onShow() {
      this.getMailList()
    },
    methods: {
      getMailList() {
        WXAJAX.POST({
          name: '',
          pageNum: this.pageNum,
        }, '', '/ipa/selectIpaList', '', '').then((res) => {
          this.friendList = res.list
        })
      },
      // 批量选择
      cutbatch(){
        this.isbatch = !this.isbatch
      },
      // 取消
      onpoint(){
         this.isbatch = !this.isbatch
      },
      // 立即分享
    }
  }
</script>

<style scoped>
  .box {
    /* width: 100%; */
    height: 100%;
    padding-top: 30rpx;
    padding-right: 40rpx;
    padding-left: 40rpx;
  }

  .folderlist {
    background-color: #FFFFFF;
    width: 100%;
    height: 150rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 12rpx;
    margin-bottom: 30rpx;
  }

  .folderlist image {
    width: 100rpx;
    height: 100rpx;
    margin-left: 30rpx;
    margin-right: 30rpx;
  }
</style>
