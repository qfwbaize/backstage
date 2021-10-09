<template>
  <view class="content">
    <!-- 选项卡 -->
    <view class="send">
      <view :class="activeIndex == 0 ? 'mineSend':'mineGet'" @click="activeIndex = 0">我发的</view>
      <view :class="activeIndex == 1 ? 'mineSend':'mineGet'" @click="activeIndex = 1">我收到的</view>
    </view>
    <view class="lists">
      <!-- 我发的 -->
      <view class="" v-show="activeIndex == 0">
        <view class="forward" v-for="(item,index) in meShareUserinfo" :key="index" @click="toArticleDetail(item)">
          <view class="forward_title">文章题目：{{item.title}}</view>
          <view class="forward_time">发布时间：{{item.time}}</view>
          <view class="forward_user">
            <view class="forward_img">
              <image :src=item.toUserLogo mode=""></image>
            </view>
            <view class="forward_username">{{item.toUserName}}</view>
            <view :class="item.rewardStatus == 3 ? 'read' : 'noRead' ">{{item.rewardStatus == 3? '已阅读':'未阅读'}}</view>
          </view>
        </view>
        <!-- 暂无信息 -->
        <view class="noMsg" v-if="meShareUserinfo.length == 0">
          <view class="noYet">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png" mode="">
            </image>
            <view class="">暂无信息</view>
          </view>
        </view>

      </view>


      <!-- 我收到的 -->
      <view class="" v-show="activeIndex == 1">
        <view class="forward" v-for="(item,index) in shareMeUserinfo" :key="index" @click="toArticleDetail(item)">
          <view class="forward_title">文章题目：{{item.title}}</view>
          <view class="forward_time">发布时间：{{item.time}}</view>
          <view class="forward_user">
            <view class="forward_img">
              <image :src=item.fromUserLogo mode=""></image>
            </view>
            <view class="forward_username">{{item.fromUserName}}</view>
            <view :class="item.rewardStatus == 3 ? 'read' : 'noRead' ">{{item.rewardStatus == 3? '已阅读':'未阅读'}}</view>
          </view>
        </view>
        <!-- 暂无信息 -->
        <view class="noMsg" v-if="shareMeUserinfo.length == 0 ">
          <view class="noYet">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png" mode="">
            </image>
            <view class="">暂无信息</view>
          </view>
        </view>

      </view>

    </view>
  </view>
</template>

<script>
  import WXAJAX from "@/utils/request";
  export default {
    data() {
      return {
        type: 0,
        activeIndex: 0,
        pageNum: 1,
        pageSize: 10,
        meShareUserinfo: [], //分享我发的
        shareMeUserinfo: [], //分享发给我的
        open: false
      }
    },
    onShow() {
      this.meShare()
      this.shareMe()
    },
    onPullDownRefresh() {
      this.pageNum = 1
      this.meShare()
      this.shareMe()
    },
    onReachBottom() {
      if (this.open == false) {
        uni.showLoading()
        this.pageNum += 1
        this.meShare()
        this.shareMe()
        uni.hideLoading()
      }

    },
    methods: {
      changeType(index) {
        this.type = index
      },
      //头部选项卡
      change(index) {
        this.activeIndex = index
      },
      toArticleDetail(item) {
        // if (this.navIndex == 1) { //精准转发
        //   let url = '../../companyPack/find/dynamicDetail/main?dynamicId=' + item.dynamicId + '&insideShareId=' + item
        //     .shareId + '&preciseId=' + item.preciseId;
        //   if (this.activeIndex == 1) { //收到的
        //     url = url + '&type=2';
        //   } else { //我发的
        //     url = url + '&type=1';
        //   }
        //   wx.navigateTo({
        //     url: url
        //   })
        // }

        // if (this.navIndex == 2) { //推效转发
        //   let url = '../../companyPack/find/dynamicDetail/main?dynamicId=' + item.dynamicId + '&insideShareId=' + item
        //     .shareId + '&pushEffectId=' + item.pushEffectId
        //   if (this.activeIndex == 1) { //收到的
        //     url = url + '&type=2';
        //   } else { //我发的
        //     url = url + '&type=1';
        //   }
        //   wx.navigateTo({
        //     url: url
        //   })
        // }
        // if (this.navIndex == 0 || this.navIndex == 3) { //转发记录
        if (item.type == 1 || item.type == 3) {
          let url = '../../companyPack/find/dynamicDetail/main?dynamicId=' + item.dynamicId + '&insideShareId=' + item.shareId;

          if (this.activeIndex == 1) { //收到的
            url = url + '&type=2';
          } else { //我发的
            url = url + '&type=1';
          }
          wx.navigateTo({
            url: url
          })
        }
        if(item.type == 4){
          let url = '../../companyPack/library/details?dynamicId=' + item.dynamicId + '&insideShareId=' +
          	item.shareId + '&ifshare=1'

            if (this.activeIndex == 1) { //收到的
              url = url + '&type=2';
            } else { //我发的
              url = url + '&type=1';
            }
            wx.navigateTo({
              url: url
            })
        }

        if (item.type == 6) {
          let id = item.shortVideoId || item.VideoId
          let companyId = item.companyId || item.companyId
          wx.navigateTo({
            url: `../../companyPack/videodetails/videodetails?videoId=${id}&companyId=${companyId}`
          });
        }

      },
      //分享我发的
      meShare() {
        var data = {
          pageNum: this.pageNum,
        }
        WXAJAX.POST(data, '', '/share/record/list/mySharedDynamic', '', '', 1).then(res => {
          if (this.pageNum == 1) {
            this.meShareUserinfo = res.list
          } else {
            this.meShareUserinfo = [...this.meShareUserinfo, ...res.list]
          }
          for (var i = 0; i < this.meShareUserinfo.length; i++) {
            this.meShareUserinfo[i]['time'] = this.meShareUserinfo[i].createTimeStr.split(' ')[0]
          }
          if (res.list.length < this.pageSize) {
            this.open = true
          } else {
            this.open = false
          }
        })
      },
      //分享给我发的
      shareMe() {
        var data = {
          pageNum: this.pageNum,
        }
        WXAJAX.POST(data, '', '/share/record/list/sharedMyDynamic', '', '', 1).then(res => {
          if (this.pageNum == 1) {
            this.shareMeUserinfo = res.list
          } else {
            this.shareMeUserinfo = [...this.shareMeUserinfo, ...res.list]
          }
          for (var i = 0; i < this.shareMeUserinfo.length; i++) {
            this.shareMeUserinfo[i]['time'] = this.shareMeUserinfo[i].createTimeStr.split(' ')[0]
          }
          if (res.list.length < this.pageSize) {
            this.open = true
          } else {
            this.open = false
          }
        })
      },
    }
  }
</script>

<style scoped>
  .content {
    width: 750rpx;
    /* height: 100%; */
    background-color: #FFFFFF;
    padding: 40rpx 0rpx;
  }

  .noRead {
    width: 96rpx;
    height: 42rpx;
    line-height: 42rpx;
    border-radius: 12rpx;
    background-color: rgba(255, 228, 207, 100);
    color: orange;
    font-size: 24rpx;
    text-align: center;
    font-family: Arial;
    border: 2rpx solid rgba(255, 255, 255, 100);
    margin-left: 24rpx;
    margin-top: 11rpx;
  }

  .read {
    width: 96rpx;
    height: 42rpx;
    line-height: 42rpx;
    border-radius: 12rpx;
    background-color: rgba(196, 241, 238, 100);
    color: rgba(1, 196, 161, 100);
    font-size: 24rpx;
    text-align: center;
    font-family: Arial;
    border: 2rpx solid rgba(255, 255, 255, 100);
    margin-left: 24rpx;
    margin-top: 11rpx;
  }

  .nav {
    width: 642rpx;
    height: 66rpx;
    background-color: #07D1C2;
    display: flex;
    justify-content: space-between;
    padding: 0 54rpx;
    padding-top: 34rpx;
    color: #FDFDFD;
  }

  .nav .nav_name {
    font-size: 28rpx;
    height: 38rpx;
    padding-bottom: 8rpx;
  }

  .active {
    border-bottom: 2px solid #FDFDFD;
  }

  .forward {
    width: 618rpx;
    /* height: 210rpx; */
    padding: 26rpx 24rpx;
    line-height: 40rpx;
    border-radius: 12rpx;
    box-shadow: 0px 4rpx 12rpx 0px rgba(167, 225, 221, 100);
    border: 2rpx solid rgba(255, 255, 255, 100);
    margin-bottom: 48rpx;
  }

  .forward .forward_title {
    width: 100%;
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .forward .forward_time {
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-top: 24rpx;
  }

  .forward .forward_user {
    display: flex;
    margin-top: 22rpx;
    line-height: 64rpx;
  }

  .forward .forward_user .forward_img {
    width: 64rpx;
    height: 64rpx;
    margin-right: 18rpx;
    overflow: hidden;
  }

  .forward .forward_user .forward_img image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .forward .forward_user .forward_username {
    color: rgba(141, 141, 141, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-right: 14rpx;
  }

  .forward .forward_user .forward_state {
    width: 96rpx;
    height: 42rpx;
    line-height: 42rpx;
    border-radius: 12rpx;
    background-color: rgba(196, 241, 238, 100);
    color: rgba(1, 196, 161, 100);
    text-align: center;
    margin-top: 13rpx;
    font-size: 24rpx;
    margin-bottom: 20rpx;
  }

  .forward .forward_user .active {
    width: 96rpx;
    height: 42rpx;
    line-height: 42rpx;
    border-radius: 12rpx;
    background-color: rgba(255, 228, 207, 100);
    color: orange;
    text-align: center;
    margin-top: 13rpx;
    font-size: 24rpx;
    margin-bottom: 20rpx;
  }

  .forward .forward_read {
    width: 154rpx;
    height: 54rpx;
    line-height: 54rpx;
    border-radius: 12rpx;
    background-color: rgba(26, 208, 195, 100);
    color: #FFFFFF;
    font-size: 24rpx;
    text-align: center;
    font-family: Arial;
    border: 2rpx solid rgba(255, 255, 255, 100);
    margin-left: 236rpx;
    margin-top: 16rpx;
    margin-bottom: 16rpx;
  }

  .send {
    width: 100%;
    display: flex;
    padding-left: 40rpx;
  }

  .send .mineSend {
    width: 148rpx;
    height: 64rpx;
    background-color: #1ad0c3;
    font-size: 24rpx;
    text-align: center;
    line-height: 64rpx;
    color: #FFFFFF;
    margin-right: 38rpx;
    border-radius: 12rpx;
  }

  .send .mineGet {
    width: 148rpx;
    height: 64rpx;
    background-color: #EEEFEF;
    font-size: 24rpx;
    text-align: center;
    line-height: 64rpx;
    color: #8D8D8D;
    margin-right: 38rpx;
    border-radius: 12rpx;
  }

  .lists {
    margin-top: 34rpx;
    width: 100%;
    padding-left: 40rpx;
    padding-bottom: 40rpx;
    background-color: #FFFFFF;
  }

  .noMsg {
    width: 710rpx;
    height: 80vh;
    overflow: hidden;
  }

  .noYet {
    width: 300rpx;
    height: 350rpx;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-left: 205rpx;
    margin-top: 300rpx;
    color: rgba(141, 141, 141, 100);
  }

  .noMsg image {
    width: 300rpx;
    height: 300rpx;
    display: block;
  }
</style>
