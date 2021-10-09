<template>
  <div>
    <view class="w99p bgf5f6 ">
      <view class="disflex callinglist bgfff" @click="toWebsite(item)" v-for="(item,index) in companylists"
        :key='index' style="">
        <view class="left">
          <image :src="item.companyLogo" mode=""></image>
        </view>
        <view class="right">
          <text class="fs14">{{item.companyName}}</text>
          <p class="ccyc" style="width: 400rpx;color: #767676;font-size: 24rpx;">{{item.companyNotice || item.industryLabel || ''}}</p>
        </view>
      </view>
    </view>
    <div v-if="videoflg" class="textc lh42 fs12 ca8 bgf5f6">- 到底了，看看其他的吧 -</div>
  </div>
</template>

<script>
  import util from '@/utils/index'
  import WXAJAX from "@/utils/request";
  export default {
    data() {
      return {
        referencepages: 1,
        companylists: '',
        reference_lastPage:'',
        pages:1,
        videoflg:false,
      }
    },
    onShow() {
      this.getenterprise()
    },
    async onPullDownRefresh() {
        // 下拉刷新
        this.pages = 1
        this.getenterprise();
    },
    onReachBottom() {
          // this.pages += 1
         if (this.pages < this.reference_lastPage) {
           this.pages += 1
          this.getenterprise();
         } else {
           this.videoflg = true
         }

    },
    methods: {
      getenterprise() {
        let v = this
        WXAJAX.POST({
          // companyName: '',
          pageNum: v.pages,
          pageSize: 10,
        }, '', '/personal/querPageCompanyAllInfo', "", "", 2).then((data) => {
          if (data.list) {
            if(v.pages == 1){
              v.companylists = data.list
            }else{
              v.companylists = [...v.companylists, ...data.list];
            }
            v.reference_lastPage = data.lastPage

          }
        }).catch((err) => {

        })
        // v.listid = 0
      },
      toWebsite(item) {
        // let url = '../companyPack/find/WebSite/main?companyId=' + item.companyId;
        // wx.navigateTo({
        // 	url: url
        // })
        let companyId = item.companyId
        let cardId = item.cardId
        util.toMiniProgram(`/pages/index/main?companyId=${companyId}&cardId=${cardId}&goType=1`);
      },
    }
  }
</script>

<style>
  .callinglist {
    /* width: 100%; */
    margin-left: 40rpx;
    margin-top: 44rpx;
    margin-bottom: 40rpx;
    margin-right: 40rpx;
    box-shadow:0px 4rpx 12rpx 0px rgba(0, 0, 0, 0.28);
    border-radius: 12rpx;
  }

  .callinglist .left image {
    width: 108rpx;
    height: 108rpx;
    border-radius: 24rpx;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    margin-left: 20rpx;
  }

  .callinglist .right {
    padding: 0 10rpx 10rpx 10rpx;
    margin-left: 10rpx;
    margin-top: 30rpx;
  }
  .ccyc {
    margin-top: 20rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
</style>
