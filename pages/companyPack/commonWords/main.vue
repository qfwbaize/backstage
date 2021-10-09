<template>
  <div class="box borderbox bgfff  posre" :style="{paddingTop:navHeight,}">
    <view class="navleft">
      <!-- 左边导航的切换 -->
      <view @click="changelist(index)" :class="index == menuIndex ?'navhover' : '' " class="navleftlist"
        v-for="(item,index) in menu" :key="index">
        <label for="">{{ item.name }}</label>
      </view>
    </view>
    <view class="navright">
      <view class="righttop">
        <view class="">
          <!-- 上面的标题切换 -->
          <scroll-view :scroll-x="true" @scroll="scroll" scroll-left="120" class="scroll-view_H">
          <view class="scroll-view-item_H" @click="getentire()" :class="arrIndex == 'a' ?'listhover' : ''">全部</view>
          <view class="scroll-view-item_H" @click="changelisttop(item.labelTitle,index)" :class="index == arrIndex ?'listhover' : ''" v-for="(item,index) in arr" :key="index">{{item.labelTitle}}</view>
          </scroll-view>
          <!-- 主体内容 -->
          <scroll-view :style="{height: scrollContentHeight+'px'}" class="dynamic-content" :scroll-y="true"
            :enable-back-to-top="true" :scroll-anchoring="true" @scrolltoupper='scrolltoupper'
            @scrolltolower="scrolltolower">
            <view class="banner" v-for="(item,index) in bannerlist" :key="index" v-if="menuIndex != 2 ? 'banner' : ''">
              <view class="bannertop">{{item.usefulContent}}</view>
              <view class="">
                <view class="bannerleft" @click="duplicate(item.usefulContent)">
                复制
                </view>
                <view class="bannerright" @click="editor(item.usefulContent)">
                编辑添加到我的常用语
                </view>
              </view>

            </view>
            <!-- 个人常用语的编辑 -->
            <view class="banner" v-for="(item,index) in bannerlist" :key="index" v-if="menuIndex == 2 ? 'banner' : ''">
              <view class="bannertop">{{item.usefulContent}}</view>
              <view class="" style="display: flex;justify-content:space-around;">
                <view class="" style="color: #1AD0C3;margin-top: 15px;" @click="duplicate(item.usefulContent)">
                  复制
                </view>
                <view class="" style="color: #1AD0C3;margin-top: 15px;" @click="getedit(item.ownUsefulId,item.usefulContent,item.usefulRank)">
                  编辑
                </view>
                <view class="" style="color: #1AD0C3;margin-top: 15px;" @click="ondel(item.ownUsefulId)">
                  删除
                </view>
              </view>
            </view>
          </scroll-view>

        </view>
      </view>
    </view>
    <!-- 弹出框 -->
    <view :hidden="userFeedbackHidden" class="popup_content">
      <textarea class="popup_title" v-model="listcon" value="listcon"  />
      <view class="popup_button" @click="submitback()">添加到我的常用语</view>
    </view>
    </view>
    </view>
    <view class="popup_overlay" :hidden="userFeedbackHidden" @click="hideDiv()"></view>
    <!-- 个人编辑的按钮 -->
    <view :hidden="userFeedupHidden" class="popup_content">
      <textarea class="popup_title" v-model="listcon" value="listcon"  />
      <view class="popup_button" @click="submitup()">编辑完成</view>
    </view>
    </view>
    </view>
    <view class="popup_overlay" :hidden="userFeedupHidden" @click="hideDiv()"></view>
  </div>
</template>

<script>
  import WXAJAX from "@/utils/request";
  import util from '@/utils/index';
  export default {
    data() {
      return {
        menu: [{
            name: "采推话术库",
            listid: 1
          },
          {
            name: "机构话术库",
            listid: 2
          },
          {
            name: "常用话术库",
            listid: 3
          }
        ],
        menuIndex: 0,
        arr: [],
        arrIndex: 'a',
        arrTxet: '',
        bannerlist: [],
        scrollContentHeight: 0,
        pageNum: 1,
        scrollTop: 0,
        old: {
          scrollTop: 0
        },
        userFeedbackHidden: true,
        userFeedupHidden:true,
        listcon: '',
        listcomm:'',
        articleList: '',
        whole:true,
        dellist:'',  //删除的用户识别id
        reorder:'',  //个人常用语排序
       }
    },
    onLoad() {
      this.getlist();
      this.getnavlsit()
    },
    async mounted() {
      let a = await util.systemIfo();
      let navHeight = getApp().globalData.navHeight;
      this.scrollContentHeight = a.windowHeight;
    },
    // 下拉刷新
    onPullDownRefresh() {
      this.pageNum = 1;
      wx.stopPullDownRefresh();
    },
    methods: {
      // 轮播图
      scroll: function(e) {
        this.old.scrollTop = e.detail.scrollTop
      },
       // 调取上面全部的接口
      getentire(){
        this.arrIndex='a'
        this.arrTxet=""
        this.getlist();

        // this.whole=!this.whole;
      },
      // 左边选项卡的切换
      changelist(index) {
        this.menuIndex = index;
        this.pageNum = 1;
        this.getlist();
        // this.getnavlsit()
      },
      //顶部的选项卡切换
      changelisttop(item, index) {
        this.arrIndex = index;
        // this.arrTxet = index;//后端传数据看要求传什么数据
        this.arrTxet = item;
        this.getnavlsit()
        this.getlist()
      },
      // 调取左边导航栏的接口
      getlist() {
        var that = this;
        var url = '';
        if (that.menuIndex == 0) {
          url = '/useful/platform/queryList'
        }
        if (that.menuIndex == 1) {
          url = '/useful/org/queryListUseful'
        }
        if (that.menuIndex == 2) {
          url = '/useful/own/queryList'
        }
        that.arrTxet=that.arrTxet?that.arrTxet:""
        WXAJAX.POST({
          ignore: true,
          pageNum: that.pageNum,
          labelContent: that.arrTxet,
        }, '', url, '', '', '1').then((res) => {
          console.log(res,'页面中res')
          if (res.list) {
            // 分页
            if (that.pageNum === 1) {
              that.bannerlist = res.list || [];
            } else {
              that.bannerlist = [...that.articleList, ...res.list] || [];
            }
            that.bannerlist = res.list;
            console.log(that.bannerlist,111111)
          } else {
            that.bannerlist = [];
            that.articleList = '';
            that.pageNum = 1;
          }
        }).catch((err) => {})
      },
      // 调取上面的小标题接口
      getnavlsit() {
        var t = this;
        WXAJAX.POST({
          ignore: true,
          labelType:5,
        }, '', '/sys/label/queryList', '', '', '1').then((res) => {
              t.arr = res
        })
      },
      //下拉刷新
      scrolltoupper() {
        console.log("测试下拉刷新");
        this.pageNum = 1;
        // this.getActivity();
      },
      //上拉加载更多
      scrolltolower() {
        console.log("测试上拉加载更多");
        // this.getActivity();
      },
      // 复制的按钮
      duplicate(conter) {
        uni.setClipboardData({
          data: conter,
          success: function() {}
        });
      },
      // 编辑到我的常用话术库
      editor(conlist) {
        this.userFeedbackHidden = false;
        this.listcon = conlist;
      },
      // 弹出框的隐藏
      hideDiv() {
        this.userFeedbackHidden = true;
        this.userFeedupHidden =true;
      },
      // 弹出框的隐藏
      submitback(listcon) {
        this.userFeedbackHidden = true;
        this.getadd(listcon)
        this.getlist()
      },
      // 调取添加个人
      getadd(listcon) {
        var v = this;
        WXAJAX.POST({
          ignore: true,
          usefulContent: v.listcon,
          infoType: 0,
        }, '', '/useful/own/add', '', '', '1').then((res) => {

        }).catch((err) => {})
      },
      // 点击删除
      ondel(delist){
       this.userFeedbackHidden = true;
       this.dellist = delist,
       this.deletelist()
       this.getlist()
      },
      // 删除个人常用语接口
      deletelist(dellist){
        WXAJAX.POST({
          ownUsefulId:this.dellist,
        }, '', '/useful/own/del', '', '', '1').then((res) => {
        }).catch((err) => {})
      },
      // 点编辑的时候
      getedit(delist,listcon,reorderid){
        this.userFeedupHidden = false;
        this.dellist = delist,
        this.listcon=listcon,
        this.reorder=reorderid
      },
      // 点击编辑完成之后
      submitup(delist,listcon,reorderid){
        this.userFeedupHidden = true;
        this.getonedit(delist,listcon,reorderid)

      },
      // 修改个人常用语的接口
       getonedit(delist,listcon,reorderid){
        WXAJAX.POST({
          ownUsefulId:this.dellist,
          usefulContent:this.listcon,
          usefulRank:this.reorder,
        }, '', '/useful/own/update', '', '', '1').then((res) => {
           this.getlist()
        }).catch((err) => {})
      },
      // 返回上一页
      goBack() {
        wx.navigateBack()
      },
    }
  }
</script>

<style scoped>
  .box {
    display: flex;
    background-color: #ffffff;
  }

  .navhover {
    background-color: #FFFFFF;
    color: #01C4A1 !important;
  }

  .listhover {
    background-color: #C4F1EE !important;
    color: #27C6BB !important;

  }

  .navleft {
    width: 180rpx;
    line-height: 40rpx;
    background-color: rgba(244, 244, 244, 100);
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 100);
  }

  .navright {
    width: 570rpx;
    display: flex;
    flex-direction: column;
  }

  .righttop {
    width: 570rpx;

    margin-bottom: 10rpx;
  }

  .scroll-view_H {
    white-space: nowrap;
    width: 100%;
  }

  .scroll-view-item_H {
    display: inline-block;
    line-height: 64rpx;
    text-align: center;
    font-size: 24rpx;
    left: 216rpx;
    top: 176rpx;
    border-radius: 12rpx;
    background-color: rgba(244, 244, 244, 100);
    color: #807E7E;
    font-size: 24rpx;
    font-family: Arial;
    border: 1px solid rgba(255, 255, 255, 100);
    margin-left: 25rpx;
    margin-top: 10rpx;
    padding-left: 20rpx;
    padding-right: 20rpx;
  }

  .navleftlist {
    width: 100%;
    height: 100rpx;
    color: rgba(0, 0, 0, 1);
    font-size: 28rpx;
    text-align: center;
    line-height: 100rpx;
    font-family: PingFangSC-regular;
    background-color: #F4F4F4 10000%;

  }

  .navtop {
    width: 570rpx;
    height: 65rpx;
    display: flex;
    flex-direction: row;
  }

  .navtopright {
    color: rgba(26, 208, 195, 100);
    font-size: 28rpx;
    width: 60rpx;
    height: 38rpx;
    margin-top: 25rpx;
    margin-left: 35rpx;
  }

  .banner {
    width: 524rpx;
    height: 250rpx;
    line-height: 40rpx;
    border-radius: 12rpx;
    text-align: center;
    box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(196, 241, 238, 100);
    border: 2rpx solid rgba(255, 255, 255, 100);
    flex-direction: column;
    margin-left: 18rpx;
    margin-bottom: 34rpx;
    margin-top: 10rpx;
    display: flex;

  }

  .bannertop {
    width: 470rpx;
    height: 130rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 24rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-left: 24rpx;
    margin-top: 20rpx;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .bannerleft {
    width: 60rpx;
    height: 38rpx;
    color: rgba(26, 208, 195, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    float: left;
    margin-left: 24rpx;
    margin-top: 32rpx;
  }

  .bannerright {
    width: 290rpx;
    height: 38rpx;
    color: rgba(26, 208, 195, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    float: right;
    margin-top: 32rpx;
  }

  .popup_overlay {
    position: fixed;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: black;
    z-index: 1001;
    -moz-opacity: 0.8;
    opacity: .45;
    filter: alpha(opacity=88);
  }

  .popup_content {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 660rpx;
    height: 320rpx;
    margin-left: -335rpx;
    margin-top: -500rpx;
    background-color: white;
    z-index: 1002;
    overflow: auto;
    border-radius: 25rpx;
  }

  .popup_title {
    display: block;
    width: 630rpx;
    height: 250rpx;
    border: 2rpx solid #F1F1F1;
    margin-left: 16rpx;
    margin-top: 5rpx;
    font-size: 24rpx;
  }

  .popup_button {
    width: 660rpx;
    height: 65rpx;
    text-align: center;
    line-height: 65rpx;
    font-size: 30rpx;
    color: #01C4A1;
    font-family: PingFangSC-regular;
  }
</style>
