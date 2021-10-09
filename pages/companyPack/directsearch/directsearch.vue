<template>
  <div>
    <view class="" style="background-color: #FFFFFF;padding-left: 40rpx;padding-right: 40rpx;padding-top: 20rpx;">
      <!-- 搜索 -->
      <view class="" style="display: flex;">
        <view class="ferret">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/greensearch.png" mode="">
          </image>
          <input class="keyword" type="text" :value="syllable" />
        </view>
      </view>
      <!-- 搜索结果  文章-->
      <view class="">
        <view class="" style="display: flex;justify-content: space-between;margin-bottom:30rpx;">
          <view class="" style="font-size: 32rpx;font-weight: bold;">文章</view>
          <view class="" style="font-size: 28rpx;color: #19D09B;">更多</view>
        </view>
        <view class="essay" v-for="(item,index) in acticlelist " :key='index'>
          <view class="essay_list">
            <view class="" style="display: flex;flex-direction: column;justify-content: space-between;">
              <view class="essay_wen">{{item.title}}</view>
              <view class="">{{item.companyName}}</view>
            </view>
            <image :src="item.photos" mode=""></image>
          </view>
          <view class="" style="display: flex;">
            <view class="probable" v-for="(k,y) in item.labelContent" :key='y'>{{k}}</view>
          </view>
        </view>
      </view>
      <!-- 视频 -->
      <view class="">

      </view>
    </view>
  </div>
</template>

<script>
  import util from '@/utils/index'
  import WXAJAX from "@/utils/request";
  export default {
    data() {
      return {
        syllable: '', //搜索文字
        acticlelist: '', //文章的列表
      }
    },
    onLoad(e) {
      this.syllable = e.type
    },
    onShow() {
     this.article()
    },
    methods: {
      //文章
      article() {
        let v = this
        //文章
        WXAJAX.POST({
            pageNum: 1,
            pageSize: 2,
            isShow: 1,
            isDrafts: 0,
            type: 1, //-1全部
            labelContent: v.syllable,
          },
          "",
          "/dynamic/listDynamic", "", "", 1, "1"
        ).then((data, code) => {
          if (data.list) {
            v.acticlelist = data.list
            data.list.forEach(function(i, k) {
              i.photos = i.photos ? i.photos.split(",") : [];
              i.labelContent = i.labelContent ? i.labelContent.split(",") : [];
            });
          } else {}
        }).catch(err => {

        });
      },
    }
  }
</script>

<style scoped>
  .ferret {
    width: 574rpx;
    height: 70rpx;
    border-radius: 36rpx;
    border: 2rpx solid #000000;
    display: flex;
    align-items: center;
    margin-bottom: 40rpx;
  }

  .ferret image {
    width: 40rpx;
    height: 40rpx;
    margin-left: 20rpx;
  }

  .keyword {
    width: 100%;
    font-size: 28rpx;
    /* margin-left: 170rpx; */
    text-align: center;
  }
  .essay{
  width: 100%;

  }
  .essay_list{
     /* width: 100%; */
    padding: 26rpx;
    display: flex;
    justify-content: space-between;
    height: 150rpx;
    box-shadow: 0px 4rpx 12rpx 0px rgba(0, 0, 0, 0.4);
    border-radius: 12rpx;
  }
  .essay_list image{
    width: 140rpx;
    height: 140rpx;
  }
  .essay_wen{
    width: 450rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .probable{
    padding: 10rpx;
    background-color:#F0F0F0 ;
    color: #807E7E ;
    margin-right: 10rpx;
    margin-top: 20rpx;
    margin-bottom: 40rpx;
    border-radius: 12rpx;
    font-size: 24rpx;
  }
</style>
