<template>
  <view class="content">
    <view class="navlist">
      <view :class="activeIndex == index ? 'active' : 'nav'" @click="toAdmin(index)" v-for="(item,index) in nav"
        :key="index">{{ item }}</view>
    </view>
    <!-- 已发布 -->
    <view class="main" v-show="activeIndex == 0" v-for="(item,index) in adminInfo" :key="index">
      <!-- 头部信息 -->
      <view class="main_top">
        <view class="userimg">
          <image :src=item.companyLogo mode=""></image>
        </view>
        <view class="userinfo">
          <view class="username">{{ item.name }}</view>
          <view class="usercompany">{{ item.companyName}}</view>
        </view>
      </view>
      <!-- 中间信息 -->
      <view class="main_center">
        <view class="describe">
          {{item.description}}
        </view>
        <view class="imgList">
          <view class="" v-for="(imgItem,imgIndex) in item.imgs" :key='y'>
            <image @click="toLook(item)" :src=imgItem mode=""></image>
          </view>
        </view>
        <view class="label">{{ item.settingName }}</view>
        <view class="time">
          <text>{{ item.createdTime}}</text>
          <text class="del" @click="del(index)">删除</text>
        </view>
      </view>
      <!-- 底部信息 -->
      <view class="main_bottom">
        <view class="operation">
          <view class="icon">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/giveUp.png" mode="">
            </image>
          </view>
          <view class="number">{{ item.likeNum }}</view>
        </view>
        <view class="operation">
          <view class="icon">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/comment.png" mode="">
            </image>
          </view>
          <view class="number">{{ item.commentNum }}</view>
        </view>
        <view class="operation">
          <view class="icon">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/forward.png" mode="">
            </image>
          </view>
          <!-- <view class="number">20</view> -->
        </view>
      </view>

    </view>
    <!-- 审核中 -->
    <view class="main" v-show="activeIndex == 1" v-for="(item,index) in adminInfo" :key="index">
      <!-- 头部信息 -->
      <view class="main_top">
        <view class="userimg">
          <image :src=item.companyLogo mode=""></image>
        </view>
        <view class="userinfo">
          <view class="username">{{ item.name }}</view>
          <view class="usercompany">{{ item.companyName}}</view>
        </view>
      </view>
      <!-- 中间信息 -->
      <view class="main_center">
        <view class="describe">
          {{item.description}}
        </view>
        <view class="imgList">
          <view class="" v-for="(imgItem,imgIndex) in item.imgs" :key="imgIndex">
            <image @click="toLook(item)" :src=imgItem mode=""></image>
          </view>
        </view>
        <view class="label">{{ item.settingName}}</view>
        <view class="time">
          <text>{{item.createdTime}}</text>
          <text class="del" @click="del(index)">删除</text>
        </view>
      </view>
    </view>

    <!-- 审核未通过 -->
    <view class="main" v-show="activeIndex == 2" v-for="(item,index) in adminInfo" :key="index">
      <!-- 头部信息 -->
      <view class="main_top">
        <view class="userimg">
          <image :src=item.companyLogo mode=""></image>
        </view>
        <view class="userinfo">
          <view class="username">{{ item.name }}</view>
          <view class="usercompany">{{ item.companyName}}</view>
        </view>
      </view>
      <!-- 中间信息 -->
      <view class="main_center">
        <view class="describe">
          {{item.description}}
        </view>
        <view class="imgList">
          <view class="" v-for="(imgItem,imgIndex) in item.imgs" :key='y'>
            <image @click="toLook(item)" :src=imgItem mode=""></image>
          </view>
        </view>
        <view class="label">{{ item.settingName }}</view>
        <view class="time">
          <text>{{ item.createdTime}}</text>
          <text class="del" @click="del(index)">删除</text>
        </view>
      </view>
      <view class="desc">
        审核不通过：图片中没有出现产品信息。
      </view>
    </view>

    <!-- 暂无信息 -->
    <view class="noMsg" v-show="type === 0">
      <view class="noYet">
        <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png" mode=""></image>
        <view class="">暂无信息</view>
      </view>
    </view>

  </view>
</template>

<script>
  import WXAJAX from "@/utils/request";
  export default {
    data() {
      return {
        nav: ['已发布', '审核中', '审核未通过'],
        activeIndex: 0,
        companyId: null,
        createdUserId: null,
        auditing: 1,
        pageNum: 1,
        adminInfo: [],
        squareId: 0,
        type: 0,
        open:false,
        pageSize:10
      }
    },
    onShow() {
      this.companyId = uni.getStorageSync('COMPANYID');
      this.createdUserId = uni.getStorageSync('cardId');
      this.toAdminDem()
    },
    //下拉获取更多信息
    onPullDownRefresh() {
      this.pageNum = 1;
      setTimeout(function() {
        uni.stopPullDownRefresh();
      }, 2000);
      this.toAdminDem()
    },
    //上划显示更多信息
    onReachBottom(){
      if(!this.open){
        this.open = true
        this.pageNum +=1
        this.toAdminDem()
      }
      // var that = this
      // uni.showLoading({
      //   title:'加载中',
      //   success(){
      //     that.pageNum += 1
      //     that.toAdminDem()
      //   }
      // })

    },
    methods: {
      //预览图片
      toLook(item){
        console.log(item,11111)
        uni.previewImage({
          urls:item.imgs,
          loop:true
        })
      },
      // 选项卡效果
      toAdmin(index) {
        if (index == 0) {
          this.auditing = 1
           this.pageNum = 1
        } else if (index == 1) {
          this.auditing = 0
          this.pageNum = 1
        } else if (index == 2) {
          this.auditing = 2
          this.pageNum = 1
        }
        this.activeIndex = index
        this.toAdminDem()
      },
      //分类获取供求管理
      toAdminDem() {
        let data = {
          companyId: this.companyId,
          createdUserId: this.createdUserId,
          pageNum: this.pageNum,
          auditing: this.auditing,
        }
        WXAJAX.POST(data, '', '/demandSquare/queryPageDemandSquare', '', '').then(res => {
          this.type = res.pageInfo.size
          // if(res.pageInfo.list != undefined){
          //   if(this.pageNum == 1){
          //     this.adminInfo = res.pageInfo.list
          //   }else{
          //     this.adminInfo = [...this.adminInfo,...res.pageInfo.list]
          //   }
          //   for (var i = 0; i < this.adminInfo.length; i++) {
          //     this.adminInfo[i]['imgs'] = JSON.parse(this.adminInfo[i].images);
          //   }
          //   if(res.pageInfo.list.length < this.pageSize){
          //     this.open = true
          //   }else{
          //     this.open = false
          //   }
          // }
          if (res.pageInfo.list == undefined) {
            this.adminInfo = []
          } else {
            if(this.pageNum == 1){
                this.adminInfo = res.pageInfo.list
              }else{
                this.adminInfo = [...this.adminInfo,...res.pageInfo.list]
              }
            // this.adminInfo = res.pageInfo.list
            for (var i = 0; i < this.adminInfo.length; i++) {
              this.adminInfo[i]['imgs'] = JSON.parse(this.adminInfo[i].images);
            }
            if(res.pageInfo.list.length < this.pageSize){
              this.open = true
            }else{
              this.open = false
            }
          }
        })
      },
      //删除功能实现
      del(index) {
        this.squareId = this.adminInfo[index].squareId
        var data = {
          squareId: this.squareId
        }
        WXAJAX.POST(data, '', '/demandSquare/deleteDemandSquare', '', '').then(res => {
          uni.showToast({
            title: '删除成功',
            icon: 'none'
          })
          this.toAdminDem()
        })
      },


    }
  }
</script>

<style scoped>
  .content {
    /* width: 100vw; */
    /* height: 100%; */
    background-color: #ffffff;
    padding: 40rpx;
  }

  .navlist {
    width: 670rpx;
    display: flex;
  }

  .navlist .nav {
    width: 148rpx;
    height: 64rpx;
    line-height: 64rpx;
    border-radius: 12rpx;
    background-color: rgba(238, 239, 239, 100);
    color: rgba(141, 141, 141, 100);
    font-size: 24rpx;
    text-align: center;
    font-family: Arial;
    border: 2rpx solid rgba(255, 255, 255, 100);
    margin-right: 38rpx;
  }

  .navlist .active {
    width: 148rpx;
    height: 64rpx;
    line-height: 64rpx;
    border-radius: 12rpx;
    background-color: #1ad0c3;
    color: #FFFFFF;
    font-size: 24rpx;
    text-align: center;
    box-shadow: 0px 4rpx 12rpx 0px rgba(196, 241, 238, 100);
    font-family: Microsoft Yahei;
    border: 2rpx solid rgba(255, 255, 255, 100);
    margin-right: 38rpx;
  }

  .main {
    width: 670rpx;
    margin-top: 22rpx;
    margin-bottom: 22rpx;
  }

  .main .main_top {
    display: flex;
  }

  .main .main_top .userimg {
    width: 118rpx;
    height: 118rpx;
    margin-right: 30rpx;
  }

  .main .main_top .userimg image {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: block;
  }

  .main .main_top .userinfo {
    flex: 1;
  }

  .main .main_top .userinfo .username {
    height: 38rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-top: 8rpx;
  }

  .main .main_top .userinfo .usercompany {
    height: 38rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-top: 20rpx;
  }

  .main .describe {
    height: 38rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-top: 28rpx;
    margin-bottom: 18rpx;
  }

  .main .main_center .imgList {
    width: 670rpx;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .main .main_center .imgList image {
    width: 320rpx;
    height: 192rpx;
    margin-bottom: 26rpx;
  }

  .main .main_center .label {
    width: 104rpx;
    height: 64rpx;
    line-height: 64rpx;
    border-radius: 12rpx;
    background-color: rgba(196, 241, 238, 100);
    color: #1ad0c3;
    font-size: 24rpx;
    text-align: center;
    box-shadow: 0px 4rpx 12rpx 0px rgba(196, 241, 238, 100);
    font-family: Arial;
    border: 2rpx solid rgba(255, 255, 255, 100);
  }

  .main .main_center .time {
    height: 38rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-top: 20rpx;
  }

  .main .main_center .time text {
    margin-right: 10rpx;
  }

  .main .main_center .del {
    color: #1ad0c3 !important;
  }

  .main_bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 28rpx;
  }

  .main_bottom .operation {
    display: flex;
    line-height: 48rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: PingFangSC-regular;
  }

  .main_bottom .operation .icon {
    width: 48rpx;
    height: 48rpx;
    margin-right: 6rpx;
  }

  .main_bottom .operation .icon image {
    width: 100%;
    height: 100%;
    display: block;
  }

  .main .desc {
    width: 642rpx;
    height: 164rpx;
    padding: 14rpx 18rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    border: 2rpx solid rgba(187, 187, 187, 100);
    border-radius: 12rpx;
    margin-top: 41rpx;
  }

  .noMsg {
    width: 670rpx;
    height: 100vh;
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
</style>
