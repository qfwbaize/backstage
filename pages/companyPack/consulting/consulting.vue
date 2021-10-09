<template>
  <div style="background-color: #FFFFFF;">
    <!-- 每日精选 -->
    <view>
      <view class="" style="margin-left: 40rpx;font-size: 28rpx;font-weight:bold">每日精选</view>
      <view class="screen">
        <scroll-view scroll-x="true" style=" white-space: nowrap;height: 88rpx;width: 90%;margin-left: 40rpx;">
          <view class="jxscreenList" style="width: 100%;">
            <view v-for="(item,index) in wzlabel" :key="index" :class="jxtabType == index ? 'jxactive' : 'jxindustry'"
              @click.stop="jxtap(index)">
              {{item.labelTitle}}
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="w99p bgf5f6" style="margin-left: 40rpx;margin-right: 40rpx;margin-top: 20rpx;">
      <view class=" "
        style="background-color:#fff;z-index:99;box-shadow:0px 2px 6px 0px rgba(0, 0, 0, 0.28);width:100%;
        border-radius:12rpx;margin-bottom:26rpx;"
        v-for="(item,index) in subject" :key="index">
       <view class=""  @click="toDetail(item)">
         <img :lazy-load="true" mode="aspectFill" :src="item.photos" class="bradius4"
           style="height: 384rpx;width:100%;">
          <view class="">
            <text class="fs14 c38 over_2"
              style="width:90%;margin-left: 20rpx;">{{item.type==3?'(转载) ':''}}{{item.title||'标题'}}</text>
            <p class="fs12 ca7 mt15" style="margin-left: 20rpx;padding-bottom: 20rpx;" >{{item.companyName}}</p>
          </view>
        </view>
      </view>
      <view class=" "
        style="background-color:#fff;z-index:99;box-shadow:0px 2px 6px 0px rgba(0, 0, 0, 0.28);width:100%;
        border-radius:12rpx;margin-bottom:26rpx;"
        v-for="(item , index ) in tinterest" :key="index">
        <view class="disflex"  @click="toDetail(item)">
          <view class="w250" style="margin: 20rpx;display: flex;flex-direction: column;justify-content: space-between;">
            <view class="disflex">
              <text class="fs14 c38 over_2"
                style="max-width: 380rpx;">{{item.type==3?'(转载) ':''}}{{item.title||'标题'}}</text>
              <view class="w22">
                <!-- 是否有推销奖励 -->
                <image class="w20 h20" v-if="item.settingInfo.pushEffectFlag == 1" :src="tuixiaozhuanfa"></image>
                <!-- 是否有悬赏奖励 -->
                <image class="w20 h20" v-if="item.settingInfo.offerRewardFlag == 1" :src="pay_selectIcon"></image>
                <!-- 是否有分享奖励 -->
                <image class="w20 h20" v-if="item.settingInfo.shareRewardFlag == 1" :src="pay_selectIcon"></image>
                <!-- 是否有阅读奖励 -->
                <image class="w20 h20" v-if="item.settingInfo.readRewardFlag == 1" :src="yuedujiangli">
                </image>
                <!-- <image class="w20 h20" :src="tuixiaozhuanfa"></image>
    						<image class="w20 h20" :src="yuedujiangli"></image> -->
              </view>
            </view>
<!--            <p class="fs12 ca7 mt15" v-if="item.settingInfo.pushEffectFlag == 1">本文为推销奖励文章</p>
            <p class="fs12 ca7 mt15" v-if="item.settingInfo.offerRewardFlag == 1">本文为悬赏奖励文章</p>
            <p class="fs12 ca7 mt15" v-if="item.settingInfo.offerRewardFlag == 1">本文为分享奖励文章</p>
            <p class="fs12 ca7 mt15" v-if="item.settingInfo.offerRewardFlag == 1">本文为阅读奖励文章</p> -->
            <p class="fs12 ca7 mt15" >{{item.companyName}}</p>
          </view>
          <img :lazy-load="true" mode="aspectFill" :src="item.photos[0]" class="w65 h65 bradius4 mr8"
            style="margin: 20rpx;">
        </view>
      </view>

    </view>
  </div>
</template>

<script>
  import WXAJAX from '@/utils/request';

  import util from '@/utils/index';
  export default {
    data() {
      return {
        wzlabel: '',
        jxtabType: 0, //精选文章的
        page: 1, //精选文章分页
        labeltitel: '猜你喜欢',
        tinterest: '', //文章
        subject:'',  //上面的大图
      }
    },
    onShow() {
      this.wenzhanglabe()
      this.getinterest(0)
    },
    methods: {
      jxtap(type) {
        this.labeltitel = this.wzlabel[type].labelTitle
        this.jxtabType = type
        this.getinterest()
      },
      wenzhanglabe() {
        let data = {
          labelType: 3,
        }
        WXAJAX.POST(data, '', '/sys/label/queryList', '', '', 1, "1").then(data => {
          if (data) {
            this.wzlabel = data
            console.log('文章标签', this.wzlabel)
          }
        })
      },
      getinterest(label) {
        let v = this
        WXAJAX.POST({
            pageNum: this.page,
            pageSize: 4,
            // isPublic:1,
            // isShow: 1,
            // isDrafts: 0,
            // verify: 1,
            type: 3, //-1全部
            labelContent: this.labeltitel,
          },
          "",
          "/dynamic/listDynamic", "", "", 1, "1"
        ).then((data, code) => {
          console.log('精选文章文章文章', data)
          if (data.list) {
            data.list.forEach(function(i, k) {
              i.photos = i.photos ? i.photos.split(",") : [];
              // i.createTime = util.getdate(i.createTime, "dateTime");
              // i.createTime = v.getDateConversion(i.createTime)
              // i.createTime = util.getFormatTime(i.createTime, true)
              i.doThumbsName = i.doThumbsName ? i.doThumbsName.split(",") : [];
            });
            v.tinterest = data.list.slice(1);
            v.tinterest_lastPage = data.lastPage
            v.subject = data.list.slice(0,1)
            console.log(v.subject,"dewfewifuewqfeufhei9fe")
          }
        }).catch(err => {});
      },
      toDetail(item) { //查看文章详情
        const companyId = item.companyId;
        const cardId = item.createUserId
        const dynamicId = item.dynamicId
        let url = '/pages/companyPack/find/dynamicDetail/main?dynamicId=' + dynamicId + '&companyId=' + companyId +
          '&cardId=' + cardId;
        wx.navigateTo({
          url: url
        })
      },
    }
  }
</script>

<style>
  .screen {
    width: calc(100% -1rpx);
    border: 0px transparent solid;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
  }

  .jxscreenList {
    width: 60%;
    margin: 20rpx 20rpx 20rpx 0rpx;
    display: flex;
  }

  .jxactive {
    color: #FFF;
    background-color: #51cdcb;
    transition: all .2s;
    padding: 8rpx 18rpx 8rpx 18rpx;
    border-radius: 15rpx;
    margin-right: 20rpx;
    font-size: 24rpx;
  }

  .jxindustry {
    background-color: #EAEAEA;
    padding: 8rpx 18rpx 8rpx 18rpx;
    border-radius: 15rpx;
    color: #807E7E;
    margin-right: 20rpx;
    font-size: 24rpx;
  }
</style>
