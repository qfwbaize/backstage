<template>
  <div style="background-color: #FFFFFF;padding-left: 20px;padding-right: 20px;padding-top: 22px;height: 100%;">
    <!-- 顶部的两个盒子 -->
    <view class="" style="display: flex;justify-content: space-between;">
      <!-- 写动态 -->
      <view class="" style="width: 165px;height: 71px;background-color:#04D7D0;border-radius:14px;position: relative;">
        <view class="" style="margin-left: 14px;">
          <view class="" style="font-size: 16px;color: #FFFFFF;margin-top: 15px;">发布个人动态</view>
          <view class="" style="font-size: 12px;color: #FFFFFF;">MOMENT</view>
        </view>
          <image style="width: 69px;height: 69px;position: absolute;right: 0;bottom: -4px;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/trends.png" mode=""></image>
      </view>
      <!-- 发布机构动态 -->
      <view class="" style="width: 165px;height: 71px;background-color:#1AD09C;border-radius:14px;position: relative; ">
        <view class="" style="margin-left: 14px;">
          <view class="" style="font-size: 16px;color: #FFFFFF;margin-top: 15px;">发布机构动态</view>
          <view class="" style="font-size: 12px;color: #FFFFFF;">TEAM MOMENT</view>
        </view>
        <image style="width: 69px;height: 69px;position: absolute;right: 0;bottom: -4px;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/probable.png" mode=""></image>
      </view>
    </view>
    <view class="">
      <view class="" style="font-size: 16px;color:#101010;margin-top: 29px;margin-bottom: 24px;">动态管理</view>
      <view class="" style="display: flex;flex-direction: row;">
        <!--       <view class="probable">个人动态</view>
        <view class="probable">机构动态</view> -->
        <view :class="activeIndex == index ? 'probable' : 'noprobable'" v-for="(item,index) in navarr" :key="index"
          @click="toContent(index)">{{item}}</view>
      </view>
      <!-- 个人动态 -->
      <view class="" style="margin-top: 25px;" v-show="activeIndex == 0"  v-for="(item,index) in dynamics" :key="index">
        <!-- 主体 -->
        <view class="">
          <!-- 基本信息 -->
          <view class="" style="display: flex;flex-direction: row">
            <image style="width: 59px;height: 59px;margin-right: 11px;border-radius: 50%;" :src=item.logo mode=""></image>
            <view class="" style="display: flex;flex-direction: column;">
              <view class="" style="font-size: 14px;color: #101010;margin-top: 10px;">{{item.name}}</view>
              <view class="" style="font-size: 12px;color: #101010;margin-top: 7px;">{{item.companyName}}</view>
            </view>
          </view>
          <!-- 标题 -->
          <view class="" style="margin-top: 16px;font-size: 14px;color: #101010;margin-left: 5px;">{{item.title}} </view>
          <!-- 动态 -->
          <view class="trends">
            <image :src=item.photos  mode="" style="width: 164px;height: 113px;"></image>
            <!-- 日期 -->
            <view class="" style="display: flex;font-size: 12px;margin-left: 4px;margin-top: 9px;">
              <view class="" style="color: #101010;">{{item.createTimeStr}}</view>
              <view class="" style="color: #40D3B8;margin-left: 3px;" @click="cutoff(item)">删除</view>
            </view>
            <!-- 三连 -->
            <view class="" style="display: flex;justify-content: space-between;margin-top: 5px;">
              <view class="" style="display: flex;"  @click="praise(item)">
                <image style="width: 24px;height: 24px;" v-if="!item.openThumbs"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/giveUp.png" mode="">
                </image>
                <image style="width: 24px;height: 24px;" v-if="item.openThumbs"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/mb-like.png" mode="">
                </image>
                <view class="">{{item.likeNum}}</view>
              </view>
              <view class="" style="display: flex;" @click="deliver(item)">
                <image style="width: 24px;height: 24px;" v-if="!item.openComment"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/comment.png" mode="">
                </image>
                <image style="width: 24px;height: 24px;" v-if="item.openComment"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/mb-comment.png" mode="">
                </image>
                <view class="">{{item.commentNum}}</view>
              </view>
              <view class="" style="display: flex;">
                <image style="width: 24px;height: 24px;"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/forward.png" mode="">
                </image>
                <view class="">{{item.shareNum}}</view>
              </view>
            </view>
          </view>
          <!-- 点赞人头像 -->
          <view class="userimg" v-if="item.openThumbs">
            <image src="../../../static/tabs/follow.png" mode=""></image>
          </view>
          <!-- 评论信息 -->
          <view class="userlist" v-show="item.openComment">
            <view class="user">
              <view class="user_left">
                <image src="../../../static/tabs/find-active.png" mode=""></image>
              </view>
              <view class="userright">
                <view class="userright_top">
                  <view class="">万子仁</view>
                  <view class="userright_time">2021年5月19日 23:42</view>
                </view>
                <view class="userright_bottom">对您的产品很感兴趣，方便聊聊？</view>
              </view>
            </view>
          </view>
        </view>
        <view class="noMsg" v-if="dynamics.length == 0 ">
          <view class="noYet">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png" mode="">
            </image>
            <view class="">暂无信息</view>
          </view>
        </view>
      </view>
      <!-- 机构动态 -->
      <view class="" style="margin-top: 25px;" v-show="activeIndex == 1"  v-for="(item,index) in articles" :key="index">
        <!-- 主体 -->
        <view class="">
          <!-- 基本信息 -->
          <view class="" style="display: flex;flex-direction: row">
            <image style="width: 59px;height: 59px;margin-right: 11px;border-radius: 50%;" :src=item.logo mode=""></image>
            <view class="" style="display: flex;flex-direction: column;">
              <view class="" style="font-size: 14px;color: #101010;margin-top: 10px;">{{item.name}}</view>
              <view class="" style="font-size: 12px;color: #101010;margin-top: 7px;">{{item.companyName}}</view>
            </view>
          </view>
          <!-- 标题 -->
          <view class="" style="margin-top: 16px;font-size: 14px;color: #101010;margin-left: 5px;">{{item.title}}</view>
          <!-- 动态 -->
          <view class="trends">
            <image :src=item.photos  mode="" style="width: 164px;height: 113px;"></image>
            <!-- 日期 -->
            <view class="" style="display: flex;font-size: 12px;margin-left: 4px;margin-top: 9px;">
              <view class="" style="color: #101010;">{{item.createTimeStr}}</view>
              <view class="" style="color: #40D3B8;margin-left: 3px;" @click="cutoff(item)">删除</view>
            </view>
            <!-- 三连 -->
            <view class="" style="display: flex;justify-content: space-between;margin-top: 5px;">
              <view class="" style="display: flex;" @click="praise(item)">
                <image style="width: 24px;height: 24px;" v-if="!item.openThumbs"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/giveUp.png" mode="">
                </image>
                <image style="width: 24px;height: 24px;" v-if="item.openThumbs"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/mb-like.png" mode="">
                </image>
                <view class="">{{item.likeNum}}</view>
              </view>
              <view class="" style="display: flex;" @click="deliver(item)">
                <image style="width: 24px;height: 24px;" v-if="!item.openComment"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/comment.png" mode="">
                </image>
                <image style="width: 24px;height: 24px;" v-if="item.openComment"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/mb-comment.png" mode="">
                </image>
                <view class="">{{item.commentNum}}</view>
              </view>
              <view class="" style="display: flex;">
                <image style="width: 24px;height: 24px;"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/forward.png" mode="">
                </image>
                <view class="">{{item.shareNum}}</view>
              </view>
            </view>
          </view>
          <!-- 点赞人头像 -->
          <view class="userimg" v-if="item.openThumbs">
            <image src="../../../static/tabs/follow.png" mode=""></image>
          </view>
          <!-- 评论信息 -->
          <view class="userlist" v-show="item.openComment">
            <view class="user">
              <view class="user_left">
                <image src="../../../static/tabs/find-active.png" mode=""></image>
              </view>
              <view class="userright">
                <view class="userright_top">
                  <view class="">万子仁</view>
                  <view class="userright_time">2021年5月19日 23:42</view>
                </view>
                <view class="userright_bottom">对您的产品很感兴趣，方便聊聊？</view>
              </view>
            </view>
          </view>
        </view>
        <view class="noMsg" v-if="articles.length == 0 ">
          <view class="noYet">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png" mode="">
            </image>
            <view class="">暂无信息</view>
          </view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
  import WXAJAX from "@/utils/request";
  export default {
    data() {
      return {
        activeIndex: 0,
        pageNum: 1,
        isOrgShow: 0,
        navarr: ['个人动态', '机构动态'],
        dynamics: [],
        articles: [],
      }
    },
    onLoad(){
      this.getContent()
    },
    methods: {
      //点击切换选项卡
      toContent(index) {
        this.activeIndex = index
        if (index == 0) {
          this.isOrgShow = 0;
          this.getContent()
        } else if (index == 1) {
          this.isOrgShow = 1;
          this.getContent()
        }
      },
      //分类获取数据
      getContent() {
        if (this.isOrgShow == 0) {
          var data = {
            pageNum: this.pageNum,
            type: 2,
            isOrgShow: 0
          }
          WXAJAX.POST(data, '', '/dynamic/listMyDynamic', '', '', 1).then(res => {
            this.dynamics = res.list
            // for (var i = 0; i < this.dynamics.length; i++) {
            //   this.dynamics[i]['img'] = this.dynamics[i].photos.split(',')
            // }
          })
        } else {
          var data = {
            pageNum: this.pageNum,
            type: 2,
            isOrgShow: 1
          }
          WXAJAX.POST(data, '', '/dynamic/listMyDynamic', '', '', 1).then(res => {
            if(res.list ==''){
             return
            }else{
              this.articles = res.list
              console.log(this.articles)
            }
          })
        }
      },
      // 控制点赞的显隐
      praise(item) {
        item.openThumbs = !item.openThumbs,
        item.openComment = false
      },
      // 控制评论的显隐
      deliver(item) {
        item.openComment = !item.openComment,
        item.openThumbs = false
      },
      // 点击删除事件
      cutoff(item) {
        var data = {
          dynamicId:item.dynamicId
        }
        WXAJAX.POST(data,'','/dynamic/delDynamic','','',1).then(res=>{
          this.getContent()
        })
      },
    }
  }
</script>

<style>
  .probable {
    width: 116rpx;
    height: 52rpx;
    color: #FFFFFF;
    background-color: #03D3C5;
    font-size: 24rpx;
    border: 1px solid rgba(255, 255, 255, 100);
    border-radius: 15rpx;
    line-height: 52rpx;
    text-align: center;
    margin-right: 20rpx;
  }

  .noprobable {
    width: 116rpx;
    height: 52rpx;
    color: #8B8B8B;
    background-color: #DEDEDE;
    font-size: 24rpx;
    border: 1px solid rgba(255, 255, 255, 100);
    border-radius: 15rpx;
    line-height: 52rpx;
    text-align: center;
    margin-right: 20rpx;
  }

  .trends {
    display: flex;
    flex-direction: column;
  }

  .noMsg {
    width: 100%;
    height: 70vh;
    overflow: hidden;
  }

  .noYet {
    width: 300rpx;
    height: 350rpx;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-left: 185rpx;
    margin-top: 300rpx;
    color: rgba(141, 141, 141, 100);
  }

  .noMsg image {
    width: 300rpx;
    height: 300rpx;
    display: block;
  }
  .userimg{
    display: flex;
    flex-wrap: wrap;
    width: 670rpx;
    margin-top: 40rpx;

  }
  .userimg image{
    width: 78rpx;
    height: 78rpx;
    border-radius: 50%;
    margin-right: 6rpx;
    margin-bottom: 4rpx;
  }
  .userlist{
    width: 670rpx;
    margin-top: 40rpx;
  }
  .user{
    display: flex;
  }
  .user_left{
    width: 78rpx;
    height: 78rpx;
    overflow: hidden;
  }
  .user_left image{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .userright{
    margin-left: 14rpx;
  }
  .userright_top{
    height: 36rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 24rpx;
    text-align: left;
    font-family: PingFangSC-bold;
    display:flex;
  }
  .userright_time{
    height: 36rpx;
    color: rgba(141, 141, 141, 100);
    font-size: 24rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-left: 116rpx;
  }
  .userright_bottom{
    height: 36rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 24rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-top: 4rpx;
  }
</style>
