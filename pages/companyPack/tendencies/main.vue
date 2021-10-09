<template>
  <div class="box">
    <!-- 顶部的两个盒子 -->
    <view class="" style="display: flex;justify-content: space-between;">
      <!-- 写动态 -->
      <view class="write" @click="writenews()">
        <view class="" style="margin-left: 28rpx;">
          <view class="" style="font-size: 32rpx;color: #FFFFFF;margin-top: 30rpx;">发布个人动态</view>
          <view class="" style="font-size: 24rpx;color: #FFFFFF;">MOMENT</view>
        </view>
        <image class="toppicture" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/trends.png"
          mode=""></image>
      </view>
      <!-- 发布机构动态 -->
      <view class="document" @click="writelsit()">
        <view class="" style="margin-left: 28rpx;">
          <view class="" style="font-size: 32rpx;color: #FFFFFF;margin-top: 30rpx;">发布机构动态</view>
          <view class="" style="font-size: 24rpx;color: #FFFFFF;">TEAM MOMENT</view>
        </view>
        <image class="toppicture" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/probable.png"
          mode=""></image>
      </view>
    </view>
    <view class="">
      <view class="" style="font-size: 38rpx;color:#101010;margin-top: 60rpx;margin-bottom: 50rpx;">动态管理</view>
      <view class="" style="display: flex;flex-direction: row;">
        <view :class="activeIndex == index ? 'probable' : 'noprobable'" v-for="(item,index) in navarr" :key="index"
          @click="toContent(index)">{{item}}</view>
      </view>
      <!-- 个人动态 -->
      <view class="" style="margin-top: 50rpx;" v-show="activeIndex == 0" v-for="(item,index) in dynamics" :key="index">
        <!-- 主体 -->
        <view class="" >
          <!-- 基本信息 -->
          <view class="" style="display: flex;flex-direction: row">
            <image style="width: 100rpx;height: 100rpx;margin-right: 22rpx;border-radius: 50%;" :src=item.logo mode="">
            </image>
            <view class="" style="display: flex;flex-direction: column;">
              <view class="" style="font-size: 32rpx;color: #101010;margin-top: 10rpx;">{{item.name}}</view>
              <view class="" style="font-size: 24rpx;color: #C0C0C0;margin-top: 14rpx;">{{item.companyName}}</view>
            </view>
          </view>
          <!-- 标题 -->
          <view class=""
            style="margin-top: 24rpx;font-size: 28rpx;color: #101010;margin-left: 20rpx;" @click="addComment(item)">
            {{item.title}}
          </view>
          <!-- 动态 -->
          <view class="trends">
            <!-- 四张图的 -->
            <view class="" v-if="item.photos">
             <view class="chart1" style="margin-top: 20rpx;margin-bottom: 20rpx;"
               v-if="item.photos && item.photos.length <=2">
               <image :src="v" v-for="(v,b) in item.photos" :data-src="v" :key="b" @tap.stop="previewImage($event,item.photos)">
               </image>
             </view>
             <view class="chart" style="margin-top: 20rpx;margin-bottom: 20rpx;"
               v-if="item.photos && item.photos.length > 2">
                 <view class="chartlist">
                   <image :src="v" v-for="(v,b) in item.photos" :data-src="v" :key="b" mode=""
                     @tap.stop="previewImage($event,item.photos)">
                   </image>
                 </view>
             </view>
            </view>
            <view class="" v-if="item.url">
              <video :src="item.url" controls style="width: 670rpx;height: 376rpx;"></video>
            </view>
            <!-- <image :src=item.photos mode="" style="width: 164px;height: 113px;"></image> -->
            <!-- 日期 -->
            <view class="" style="display: flex;font-size: 26rpx;margin-left: 8rpx;margin-bottom: 20rpx;">
              <view class="" style="color: #999999;">{{item.createTimeStr}}</view>
              <view class="" style="color: #40D3B8;margin-left: 40rpx;" @click.stop="cutoff(item)">删除</view>
            </view>
            <!-- 三连 -->
            <view class="" style="display: flex;justify-content: space-between;margin-top: 10rpx;">
              <view class="" style="display: flex;align-items: center;" >
                <image style="width: 38rpx;height: 38rpx;"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/ic_news_like.png" mode="">
                </image>
                <!-- <image style="width: 48rpx;height: 48rpx;"v-if="!item.openThumbs"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/mb-like.png" mode="">
                </image> -->
                <view class="fs14" style="margin-left: 15rpx;line-height: 52rpx;">{{item.likeNum}}</view>
              </view>
              <view class="" style="display: flex;align-items: center;" >
                <image style="width: 38rpx;height: 38rpx;"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/ic_news_comment.png" mode="">
                </image>
                <!-- <image style="width: 48rpx;height: 48rpx;"  v-if="!item.openComment"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/mb-comment.png" mode="">
                </image> -->
                <view class="fs14" style="margin-left: 15rpx;line-height: 52rpx;">{{item.commentNum}}</view>
              </view>
              <button class="assist" hover-class="none" open-type="share">
                <image style="width: 38rpx;height: 38rpx;"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/ic_news_share.png" mode="">
                </image>
                <view class="quantity fs14">{{item.shareNum}}</view>
              </button>
            </view>
          </view>
          <!-- 点赞人头像 -->
          <!-- <view class="userimg" v-if="item.openThumbs">
            <image src="../../../static/tabs/follow.png" mode=""></image>
          </view> -->
          <!-- 评论信息 -->
          <!-- <view class="userlist" v-show="item.openComment">
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
          </view> -->
        </view>
        <view class="noMsg" v-if="this.dynamics == '' ">
          <view class="noYet">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png" mode="">
            </image>
            <view class="">暂无信息</view>
          </view>
        </view>
      </view>
      <!-- 机构动态 -->
      <view class="" style="margin-top: 50rpx;" v-show="activeIndex == 1" v-for="(item,index) in articles" :key="index">
        <!-- 主体 -->
        <view class="">
          <!-- 基本信息 -->
          <view class="" style="display: flex;flex-direction: row">
            <image style="width: 100rpx;height: 100rpx;margin-right: 22rpx;border-radius: 50%;" :src="item.logo"
              mode="">
            </image>
            <view class="" style="display: flex;flex-direction: column;">
              <view class="" style="font-size: 32rpx;color: #101010;margin-top: 10rpx;">{{item.name}}</view>
              <view class="" style="font-size: 24rpx;color: #C0C0C0;margin-top: 14rpx;">{{item.companyName}}</view>
            </view>
            <view class="posab right15 fs14 fbold" style="color: #43D3B9;margin-top: 30rpx;" v-show="isboss == false">
            	<view v-if="item.isShow == 0" >审核中</view>
            	<view v-if="item.isShow == 1" >审核通过</view>
            	<view v-if="item.isShow == 2" >审核未通过</view>
            </view>
            <view class="posab right15 fs14 fbold" style="color: #43D3B9;margin-top: 30rpx;" v-show="isboss">
            	<view v-if="item.isShow == 0" style="display:flex;flex-direction:row;justify-content:space-between;width: 150rpx;">
                <view @click="examine(item,1)">通过</view>
                <view @click="examine(item,2)">拒绝</view>
              </view>
            	<view v-if="item.isShow == 1" >审核通过</view>
            	<view v-if="item.isShow == 2" >审核未通过</view>
            </view>
          </view>
          <!-- 标题 -->
          <view class=""  @click="addComment(item)" style="margin-top: 24rpx;font-size: 28rpx;color: #101010;margin-left: 20rpx;">{{item.title}}
          </view>
          <!-- 动态 -->
          <view class="trends">
            <!-- 四张图的 -->
            <view class="" v-if="item.photos">
             <view class="chart1" style="margin-top: 20rpx;margin-bottom: 20rpx;"
               v-if="item.photos && item.photos.length <=2">
               <image :src="v" v-for="(v,b) in item.photos" :data-src="v" :key="b" @tap.stop="previewImage($event,item.photos)">
               </image>
             </view>
             <view class="chart" style="margin-top: 20rpx;margin-bottom: 20rpx;"
               v-if="item.photos && item.photos.length > 2">
                 <view class="chartlist">
                   <image :data-src="v" :src="v" v-for="(v,b) in item.photos" :key="b" mode=""
                     @tap.stop="previewImage($event,item.photos)">
                   </image>
                 </view>
             </view>
            </view>
            <!-- <image :src=item.photos mode="" style="width: 164px;height: 113px;"></image> -->
            <!-- 日期 -->
            <view class="" style="display: flex;font-size: 26rpx;margin-left: 8rpx;margin-bottom: 20rpx;">
              <view class="" style="color: #999999;">{{item.createTimeStr}}</view>
              <view class="" style="color: #40D3B8;margin-left: 40rpx;" @click.stop="cutoff(item)">删除</view>
            </view>
            <!-- 三连 -->
            <view class="" style="display: flex;justify-content: space-between;margin-top: 10rpx;">
              <view class="" style="display: flex;align-items: center;">
                <image style="width: 38rpx;height: 38rpx;"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/ic_news_like.png" mode="">
                </image>
                <!-- <image style="width: 48rpx;height: 48rpx;"  v-if="!item.openThumbs"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/mb-like.png" mode="">
                </image> -->
                <view class="fs14" style="margin-left: 15rpx;line-height: 52rpx;">{{item.likeNum}}</view>
              </view>
              <view class="" style="display: flex;align-items: center;" >
                <image style="width: 38rpx;height:38rpx;"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/ic_news_comment.png" mode="">
                </image>
                <!-- <image style="width: 48rpx;height: 48rpx;" v-if="!item.openComment"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/mb-comment.png" mode="">
                </image> -->
                <view class="fs14" style="margin-left: 15rpx;line-height: 52rpx;">{{item.commentNum}}</view>
              </view>
              <button class="assist" hover-class="none" open-type="share">
                <image style="width: 38rpx;height: 38rpx;"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/ic_news_share.png" mode="">
                </image>
                <view class="quantity fs14">{{item.shareNum}}</view>
              </button>
            </view>
          </view>
          <!-- 点赞人头像 -->
         <!-- <view class="userimg" v-if="item.openThumbs">
            <image src="../../../static/tabs/follow.png" mode=""></image>
          </view> -->
          <!-- 评论信息 -->
        <!--  <view class="userlist" v-show="item.openComment">
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
          </view> -->
        </view>
        <view class="noMsg" v-if="this.articles == ''">
          <view class="noYet">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png" mode="">
            </image>
            <view class="">暂无信息</view>
          </view>
        </view>

      </view>

    </view>
    <div v-if="videoflg" class="textc lh42 fs12 ca8 bgf5f6" style="width: 100%;margin-top: 20rpx;">- 到底了，看看其他的吧 -</div>
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
        photos: '',
        lastPage:'',
        videoflg:false,
        isboss: wx.getStorageSync('isBoss'),
      }
    },
    onLoad() {
      this.getContent()
    },
    async onPullDownRefresh() {
        // 下拉刷新
        this.pageNum = 1
        this.getContent();
    },
    onReachBottom() {
         if (this.pageNum < this.lastPage) {
           this.pageNum += 1
          this.getContent();
         } else {
           this.videoflg = true
         }
    },
    methods: {
      //点击切换选项卡
      toContent(index) {
        this.activeIndex = index
        if (index == 0) {
          this.pageNum = 1;
          this.lastPage = '';
          this.isOrgShow = 0;
          this.getContent()
        } else if (index == 1) {
          this.pageNum = 1;
          this.lastPage = '';
          this.isOrgShow = 1;
          this.getContent()
        }
      },
      examine(item,status){
        var v = this
        uni.showModal({
            title: '动态审核',
            content: status==1?'确认通过审核！':'确认拒绝通过！',
            success: function (res) {
                if (res.confirm) {

                  let url = "/dynamic/updateShowByDynamicId"
                  let data = {
                  	dynamicId: item.dynamicId,
                  	isShow: status,
                  }
                  WXAJAX.POST(data, "", url, "", "", 1).then((res) => {
                  	if (res.isShow == 1) {
                  		uni.showToast({
                  			title: '审核通过',
                  			icon: "none"
                  		})
                  	} else if (res.isShow == 2) {
                  		uni.showToast({
                  			title: "审核未通过",
                  			icon: "none"
                  		})
                  	}
                  })
                  v.getContent()
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });
      },
      //分类获取数据
      getContent() {
        if (this.isOrgShow == 0) {
          var data = {
            pageNum: this.pageNum,
            type: 2,
            isOrgShow: 0,
            isDrafts: 0,
          }
          let url='/dynamic/listMyDynamic'

          WXAJAX.POST(data, '',url, '', '', 1).then((data, code) => {
            console.log(data)
            // this.dynamics = data.list
            this.lastPage = data.lastPage
            if(this.pageNum == 1){
                this.dynamics = data.list
            }else{
                this.dynamics = [...this.dynamics ,...data.list];
            }
            if (data.list) {
              data.list.forEach(function(i, k) {
                i.photos = i.photos ? i.photos.split(",") : [];
              });
            }
          })
        }
        if (this.isOrgShow == 1) {
          var data = {
            pageNum: this.pageNum,
            type: 2,
            isOrgShow: 1,
            isDrafts: 0,
            isShows:[0,1]
          }
          let url='/dynamic/listMyDynamic'
          if(this.isboss){
            url = '/dynamic/listCompanyDynamic'
          }
          WXAJAX.POST(data, '', url, '', '', 1).then((data, code) => {
            // this.articles = data.list
            this.lastPage = data.lastPage
            if(this.pageNum == 1){
                this.articles = data.list
            }else{
                this.articles = [...this.articles ,...data.list];
            }
            if (data.list) {
              data.list.forEach(function(i, k) {
                i.photos = i.photos ? i.photos.split(",") : [];
              });
            }
          })
        }
      },
      // // 控制点赞的显隐
      // praise(item) {
      //   item.openThumbs = !item.openThumbs,
      //     item.openComment = false
      // },
      // // 控制评论的显隐
      // deliver(item) {
      //   item.openComment = !item.openComment,
      //     item.openThumbs = false
      // },
      // 点击删除事件
      cutoff(item) {
        var v = this
        uni.showModal({
            title: '删除动态',
            content: '是否要删除这个动态',
            success: function (res) {
                if (res.confirm) {
                    var data = {
                      dynamicId: item.dynamicId
                    }
                    WXAJAX.POST(data, '', '/dynamic/delDynamic', '', '', 1).then(res => {
                      v.getContent()
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消');
                }
            }
        });
      },
      previewImage(e, urls) { //点击图片全屏预览
        var current = e.target.dataset.src
        wx.previewImage({
          // urls: [urls + '.primary.png'],
          current: current,
          urls: urls
        })
      },
      // 发布个人动态
      writenews() {
        let add = '';
        wx.navigateTo({
          url: "/pages/companyPack/dynamicIssue/main?type=dynamic" + "&isOrgShow=" + 0
        });
      },
      //发布机构动态
      writelsit() {
        wx.navigateTo({
          url: "/pages/companyPack/dynamicIssue/main?type=dynamic" + "&isOrgShow=" + 1
        });
      },
      // 调转到详情页面
      addComment(item) {
      	let url = '/pages/companyPack/commentDetail/main?dynamicId=' + item.dynamicId + '&companyId=' + item
      		.companyId +
      		'&cardId=' + item.userId;
      	wx.navigateTo({
      		url: url
      	})
      },
    }
  }
</script>

<style scope>
  .box {
    background-color: #FFFFFF;
    padding-left: 40rpx;
    padding-right: 40rpx;
    padding-top: 44rpx;
    /* height: 100%; */
  }

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

  .userimg {
    display: flex;
    flex-wrap: wrap;
    width: 670rpx;
    margin-top: 40rpx;

  }

  .userimg image {
    width: 78rpx;
    height: 78rpx;
    border-radius: 50%;
    margin-right: 6rpx;
    margin-bottom: 4rpx;
  }

  .userlist {
    width: 670rpx;
    margin-top: 40rpx;
  }

  .user {
    display: flex;
  }

  .user_left {
    width: 78rpx;
    height: 78rpx;
    overflow: hidden;
  }

  .user_left image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .userright {
    margin-left: 14rpx;
  }

  .userright_top {
    height: 36rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 24rpx;
    text-align: left;
    font-family: PingFangSC-bold;
    display: flex;
  }

  .userright_time {
    height: 36rpx;
    color: rgba(141, 141, 141, 100);
    font-size: 24rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-left: 116rpx;
  }

  .userright_bottom {
    height: 36rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 24rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-top: 4rpx;
  }

  .write {
    width: 315rpx;
    height: 142rpx;
    background-color: #04D7D0;
    border-radius: 28rpx;
    position: relative;
  }

  .document {
    width: 315rpx;
    height: 142rpx;
    background-color: #1AD09C;
    border-radius: 28rpx;
    position: relative;
  }

  .toppicture {
    width: 138rpx;
    height: 138rpx;
    position: absolute;
    right: 0;
    bottom: -8rpx;
  }

  .assist {
    width: 135rpx;
    height: 50rpx;
    display: flex;
    justify-content: space-between;
    background-color: #FFFFFF;
    margin-left: 0rpx;
    margin-right: 0rpx;
    align-items: center;
  }

  .quantity {
    display: block;
    width: 35rpx;
    height: 50rpx;
    line-height: 50rpx;
  }

  /* 一张图的样式 */
  .chart1 {
    width: 100%;
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
  }

  .chart1 image {
    width: 300rpx;
    margin: 6rpx;
    height: 300rpx;
  }

  /* 四张图的样式 */
  .chart {
    width: 100%;
  }

  .chartlist {
    display: flex;
    flex: 1;
    flex-flow: wrap;
    justify-content: space-between;
  }

  .chartlist image {
    box-sizing: border-box;
    /* min-width: calc(50% - 12rpx) ;
    max-width: calc(50% - 12rpx) ; */
    width: 210rpx;
    height: 210rpx;
    margin: 6rpx;
  }
</style>
