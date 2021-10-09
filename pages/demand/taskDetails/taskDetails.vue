<template>
  <view class="content">
    <!-- 详情 -->
    <view class="mainlist">

      <view class="taskinfo">
        <view class="taskinfo_title">{{taskDetailList.taskName}}</view>
        <view class="taskinfo_money">金额：{{taskDetailList.rewardAmount}}元</view>
        <!-- <view class="taskinfo_status">进行中</view> -->
        <view class="taskinfo_status" v-show="taskDetailList.taskState == 1">发布中</view>
        <view class="taskinfo_status" v-show="taskDetailList.taskState == -1">已过期</view>
        <view class="taskinfo_status" v-show="taskDetailList.taskState == 2">进行中</view>
        <view class="taskinfo_status" v-show="taskDetailList.taskState == 3">已结束</view>
        <view class="taskinfo_status" v-show="taskDetailList.taskState == 5">申请验收中</view>
      </view>

      <view class="taskinfo_text">任务内容：{{taskDetailList.taskContent}}</view>

      <view class="taskinfo_times">任务结束时间：{{taskDetailList.finishTime}}</view>

      <view class="taskinfo_bottom_company">
        <image @click="preview(companyLogo)" :src=companyLogo mode=""></image>
        <view class="taskinfo_bottom_companyname">{{companyName}}</view>
       <view class="taskinfo_contact" v-show="taskDetailList.tenderStatus === undefined" >未接单</view>
       <view class="taskinfo_contact" v-show="taskDetailList.tenderStatus === 0" >已接单</view>
       <view class="taskinfo_contact" v-show="taskDetailList.tenderStatus === 1" >已签合同</view>
        <view class="taskinfo_contact" @click="getcardDetails">联系TA</view>
      </view>

      <view class="opnetime">发布于{{taskDetailList.releaseTime}}</view>

      <!-- <view class="taskinfo_time">
				<view class="taskinfo_time_text"><text class="square"></text>2021-06-07</view>
				<view class="taskinfo_time_text"><text class="square" style="border: 1px solid #F0F0F0;"></text></view>
				<view class="taskinfo_time_text"><text class="square" style="border: 1px solid orange"></text>2021-06-07
				</view>
			</view> -->

      <view :class="taskDetailList.urlList.length == 0 ? 'detailtexts' :'detailtext' ">
        <view class="">任务图片</view>
      </view>

      <view class="detailVideo">
        <view class="detailVideo_img" v-for="(item,index) in taskDetailList.urlList" :key="index">
          <image @click="preview(item)" :src=item mode=""></image>
        </view>
      </view>
      <div v-if="dynamicId">
        <view class="detailtext">
          <view class="">转发内容附件</view>
        </view>

        <view class="detailVideo">
          <view class="videotext">{{enclosure.title}}</view>
          <view v-show="enclosure.type == 3 || enclosure.type == 1 || enclosure.type == 7 || enclosure.type == 2"  class="detailVideo_img" v-for="(demo,demoIndex) in enclosure.photoUrl" :key="demoIndex">
            <image @click="preview(demo)" :src=demo mode=""></image>
          </view>
          <video class="videocon" v-show="enclosure.type == 6" :src="enclosure.url" controls></video>
          <view class="videoBtn" v-show="enclosure.type != 7" @click="goDetail(enclosure)">查看详情</view>
        </view>
      </div>


      <!-- 	<view class="fs14 mt10">
				接单情况：目前（{{length}}）人接单
			</view>
			<view class="w90p h50  " v-if="active ==true" v-for="(item,index) in Personnel" :key="index">
				<view class="disflex jsaround b1s">
					<div>
						<image class="w30 h30" :src="item.cardLogo" mode=""></image>
					</div>1
					<div class="fs14">{{item.companyName}}</div>
					<div class="fs14">{{item.cardName}}</div>
				</view>

			</view> -->

      <view class="btn" v-if="taskDetailList.tenderStatus === undefined" @click="acceptTask">接任务</view>


    </view>
    <!-- 遮罩层 -->
    <view class="cover" v-show="show">
    	<view class="tips" :style="{'top':topHight}">
    		<view class="tips_text">接单成功，请在任务期限内完成任务，如有其他问题，请与任务发布者联系。</view>
    		<view class="tips_bottom">
    			<view style="color: rgba(143, 143, 143, 100);" @click="off">关闭</view>
    			<view style="color:#1ad09c"  @click="getcardDetails">与任务发布者联系</view>
    		</view>
    	</view>
    </view>

    <!-- <view class="confirm-btn" @click="save">添加任务完成记录</view> -->

    <!-- 签署协议 -->
    <view class="agreement" v-show="open == true">
      <view class="agreementimg">
        <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/yonghuxieyi.jpeg"
          mode=""></image>
      </view>
      <checkbox-group @change="checkboxChange">
        <view class="checkbox">
          <checkbox style="transform:scale(0.7);" value="0" :checked="false" />
          <view>我同意</view>
        </view>
        <view class="taskBtn" @click="getAuthentication">接受任务</view>
      </checkbox-group>

    </view>

  </view>
</template>

<script>
  import WXAJAX from '../../../utils/request.js'
  import util from '../../../utils/index.js'
  export default {
    data() {
      return {
        topHight: 0,
        show: false,
        taskCustomerId: 0,
        taskDetailList: {},
        companyLogo: '',
        companyName: '',
        userId: '',
        cardId: "",
        active: false,
        Personnel: '',
        length: 0,
        companyId: '',
        dynamicId: '',
        enclosure: [],
        open: false,
        close:''
      }
    },
    onLoad(taskCustomerId) {
      // console.log(taskCustomerId)
      this.taskCustomerId = taskCustomerId.taskCustomerId
      this.companyLogo = taskCustomerId.companyLogo
      this.companyName = taskCustomerId.companyName
      this.cardId = uni.getStorageSync("cardId")
    },
    onShow() {
      this.getTaskDetail()
      // setTimeout(() => {
      //   uni.showToast({
      //     title: '请联系他竞标任务！',
      //     icon: 'none',
      //     duration: 3000
      //   })
      // }, 500)
    },
    onReady() {
      if (this.userId == this.cardId) {
        this.active = true
        this.getPersonnel()

      } else {
        this.active = false
      }
    },
    methods: {
      //同意协议之后才能接任务
      checkboxChange(e){
        if(e.detail.value[0] == 0){
          this.close = true
        }
      },
      //点击图片预览
      preview(imageUrl) {
        console.log(imageUrl)
        util.photoPreview(imageUrl)
      },
      //点击跳转到详情页面
      goDetail(enclosure) {
        if (enclosure.type == 3) {
          uni.navigateTo({
            url: '../../companyPack/find/dynamicDetail/main?dynamicId=' + enclosure.dynamicId
          })
        } else if (enclosure.type == 4) {
          uni.navigateTo({
            url: '../../companyPack/library/details?dynamicId=' + enclosure.dynamicId
          })
        } else if (enclosure.type == 6) {
          uni.navigateTo({
            url: '../../companyPack/videodetails/videodetails?videoId=' + enclosure.shortVideoId + '&companyId=' +enclosure.companyId + '&cardId=' +enclosure.cardId
          })
        } else if(enclosure.type == 1){
          uni.navigateTo({
            url: '../../companyPack/find/dynamicDetail/main?dynamicId=' + enclosure.dynamicId
          })
        } else if(enclosure.type == 2){
          uni.navigateTo({
            url: '../../companyPack/commentDetail/main?dynamicId=' + enclosure.dynamicId + '&companyId=' +enclosure.companyId + '&cardId=' +enclosure.cardId
          })
        }
      },
      // 分页查询任务竞标人员
      getPersonnel() {
        let url = "/task/tender/queryPage"
        let data = {
          taskId: this.taskCustomerId
        }
        WXAJAX.POST(data, '', url, '', '', 1).then((res) => {
          // console.log(res, "分页查询任务竞标人员");
          this.Personnel = res.list
          this.length = res.total
          // console.log(this.Personnel, "人员名单");
        })
      },
      // 联系他
      taskcontact() {
        // console.log(this.userId, this.cardId, "发布者的id和本地登录的id");
        if (this.userId == this.cardId) {
          wx.showModal({
            title: '提示',
            content: '不能接取自己发布的任务',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        } else {
            this.accept()
            setTimeout(res=>{
              this.open = false
            },1000)
            // this.getcardDetails()
        }
      },
      acceptTask(){
        this.open = true
      },
      // 公司信息
      getAuthentication(e) {
        this.topHight = (((e.detail.y * 2) - 240) / 2) + 'rpx'
        if(this.close == true){
          var data = {
            ignore: true
          }
          WXAJAX.POST(data, '', '/company/getCompany', '', '').then(res => {
            this.isCompanyAuth = res.isCompanyAuth
            if (res.isCompanyAuth != 1) {
              uni.showModal({
                title: '认证功能',
                content: '浏览此页面需要先认证',
                cancelText: '返回首页',
                confirmText: '前往认证',
                success: function(res) {
                  if (res.confirm) {
                    let url =
                      'H5/webView?H5title=申请认证&url=https://wx.mingyicloud.com/app/myy/certmgmt.nsf/personcertFXMopenformFxMcompanyIdFxm' +
                      wx.getStorageSync('COMPANYID') + 'FxMidFxm3';
                    wx.navigateTo({
                      url: "/pages/" + url
                    });
                  } else if (res.cancel) {
                    uni.navigateTo({
                      url: '/pages/find/index'
                    });
                  }
                }
              });
            } else {
              this.taskcontact()

            }
          })


        }

      },
      getcardDetails() {
        let url = "/businessCard/cardDetails"
        let data = {
          cardId: this.userId,
        }
        WXAJAX.POST(data, "", url, "", "", 2).then((res) => {
          this.row_tap(res.userId, res.cardId, res.logo, res.name, res.wxCode, res.phone, res
            .companyId)
        })
      },
      // 跳转到聊天
      row_tap(id, cardid, logo, name, wxCode, phone, companyId) {
        // console.log(id ,cardid,name,wxCode,phone,companyId,"跳转到聊天获取的信息");
        uni.navigateTo({
          url: '../../IM/main?userId=' + id + '&logo=' + logo + '&type=2&cardId=' + cardid + '&name=' +
            name +
            '&wxCode=' + wxCode + '&phone=' + phone + '&companyId=' + companyId
        })
      },
      //获取任务详情
      getTaskDetail() {
        WXAJAX.POST({
          taskCustomerId: this.taskCustomerId
        }, '', '/customerEssay/queryTaskCustomer', '', '').then(res => {

          // this.companyId = res.companyId
          this.dynamicId = res.dynamicId
          this.getEnclosure(this.dynamicId)
          this.taskDetailList = res

          var year = ''
          var month = ''
          var day = ''
          this.taskDetailList.finishTime = util.formatDate(this.taskDetailList.startTime).split(' ')[0]
          year = this.taskDetailList.createTimeStr.split(' ')[0].split('-')[0]
          month = this.taskDetailList.createTimeStr.split(' ')[0].split('-')[1]
          day = this.taskDetailList.createTimeStr.split(' ')[0].split('-')[2]
          this.taskDetailList.releaseTime = year + '年' + month + '月' + day + '日'
          this.taskDetailList.urlList = []
          this.taskDetailList.urlList = this.taskDetailList.attachmentUrl.split(',')
          this.userId = this.taskDetailList.userId

        })

      },
      //接任务
      accept() {
        let url = "/task/tender/add"
        let data = {
          taskId: this.taskDetailList.taskCustomerId,
          tenderDescribe: '',
          is_del: 0,
          tenderStatus: 0
        }
        WXAJAX.POST(data, '', url, "", "", 1).then((res) => {

          if (res) {
            this.show = true
            console.log(res,this.show, "添加任务竞标信息");
            this.getTaskDetail()
          }
        })
      },
      //点击任意关闭提示
      off() {
        this.show = false
      },
      //跳转到任务详情
      save() {
        uni.navigateTo({
          url: '../taskRecord/taskRecord'
        })
      },
      //获取文章详情页面
      getEnclosure(dynamicId) {
        let params = {
          dynamicId: dynamicId,
        }
        WXAJAX.POST(params, '', '/dynamic/getDynamicDetail', '', '', 1).then(res => {
          this.enclosure = res
          this.enclosure.photoUrl = []
          this.enclosure.photoUrl = this.enclosure.photos.split(',')
        })
      },
    }
  }
</script>

<style scoped>
  .b1s {
    margin-top: 20rpx;
    box-shadow: 0px 2px 6px 0px rgba(167, 225, 221, 100);
    border-radius: 12rpx;
  }

  .content {
    width: 670rpx;
    /* height: 100vh; */
    background-color: #FFFFFF;
    padding: 40rpx;
    position: relative;
  }

  .mainlist {
    width: 100%;
    /* height: 100%; */
    background-color: #FFFFFF;
  }

  .taskinfo {
    width: 100%;
    display: flex;
    justify-content: space-between;
    line-height: 46rpx;
  }

  .taskinfo_title {
    width: 288rpx;
    height: 46rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 32rpx;
    text-align: left;
    font-family: PingFangSC-bold;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .taskinfo_money {
    /* width: 146rpx; */
    height: 38rpx;
    color: rgba(143, 143, 143, 100);
    font-size: 26rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-left: 30rpx;
  }

  .taskinfo_status {
    width: 96rpx;
    height: 42rpx;
    margin-top: 2rpx;
    line-height: 42rpx;
    border-radius: 12rpx;
    background-color: rgba(196, 241, 238, 100);
    color: rgba(1, 196, 161, 100);
    font-size: 24rpx;
    text-align: center;
    box-shadow: 0px 4rpx 12rpx 0px rgba(196, 241, 238, 100);
    font-family: Microsoft Yahei;
  }

  .taskinfo_text {
    width: 642rpx;
    height: 134rpx;
    color: rgba(143, 143, 143, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-top: 20rpx;
  }

  .taskinfo_bottom_company {
    /* width: 450rpx; */
    height: 48rpx;
    line-height: 48rpx;
    display: flex;
    margin-top: 10rpx;
  }

  .taskinfo_bottom_company image {
    width: 48rpx;
    height: 48rpx;
  }

  .taskinfo_bottom_companyname {
    width: 312rpx;
    height: 36rpx;
    color: rgba(143, 143, 143, 100);
    font-size: 24rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-left: 12rpx;
  }

  .opnetime {
    color: rgba(181, 181, 181, 100);
    font-size: 24rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-top: 20rpx;
    margin-bottom: 14rpx;
  }

  .taskinfo_time {
    width: 146rpx;
    height: 100rpx;
    margin-top: 20rpx;
  }

  .taskinfo_time_text {
    height: 33rpx;
    line-height: 33rpx;
    color: rgba(143, 143, 143, 100);
    font-size: 20rpx;
  }

  .square {
    width: 10rpx;
    height: 10rpx;
    margin-right: 15rpx;
    border: 1px solid #c4f1ee;
    border-radius: 50%;
    display: inline-block;
  }

  .detailtext {
    height: 46rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 32rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-top: 32rpx;
    display: flex;
  }

  .detailtexts {
    display: none;
  }

  .detailVideo {
    width: 496rpx;
    /* height: 374rpx; */
    line-height: 40px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0px 4rpx 12rpx 0px rgba(0, 0, 0, 0.4);
    /* padding: 20rpx; */
    margin-top: 16rpx;
    overflow: hidden;
  }
  .videocon{
    width: 424rpx;
    height: 234rpx;
  }
  .videotext {
    width: 400rpx;
    /* height: 40px; */
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: PingFangSC-bold;
    font-weight: bold;
    margin: 20rpx 0;
    margin-left: 36rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .detailVideo_img {
    width: 424rpx;
    height: 234rpx;
    border-radius: 12rpx;
    margin-top: 14rpx;
    margin-bottom: 14rpx;
    margin-left: 36rpx;
  }

  .detailVideo image {
    width: 100%;
    height: 100%;
  }

  .videoBtn {
    width: 160rpx;
    height: 50rpx;
    line-height: 50rpx;
    border-radius: 12rpx;
    background-color: rgba(26, 208, 156, 100);
    color: rgba(255, 255, 255, 100);
    font-size: 24rpx;
    text-align: center;
    font-family: Arial;
    margin-left: 148rpx;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
  }

  .btn {
    width: 312rpx;
    height: 58rpx;
    line-height: 58rpx;
    border-radius: 12rpx;
    background-color: rgba(26, 208, 156, 100);
    color: rgba(255, 255, 255, 100);
    font-size: 24rpx;
    text-align: center;
    font-family: Arial;
    margin-left: 179rpx;
    margin-top: 126rpx;
    margin-bottom: 100rpx;
  }

  .taskcom {
    display: flex;
    height: 46rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 32rpx;
    text-align: left;
    font-family: PingFangSC-bold;
  }

  .squares {
    width: 22rpx;
    height: 22rpx;
    background-color: rgba(26, 208, 156, 100);
    border-radius: 50%;
    margin-top: 12rpx;
  }

  .size {
    width: 100%;
    height: 10rpx;
    line-height: 40rpx;
    border-radius: 12rpx;
    background-color: rgba(239, 239, 239, 100);
    margin: 22rpx 0;
  }

  .taskinfo_contact {
    /* width: 96rpx; */
    height: 42rpx;
    line-height: 42rpx;
    border-radius: 12rpx;
    background-color: rgba(26, 208, 156, 100);
    color: rgba(255, 255, 255, 100);
    font-size: 24rpx;
    text-align: center;
    font-family: Arial;
    margin-left: 40rpx;
    padding: 0 10rpx;
  }

  .cover {
    position: absolute;
    width: 100vw;
    height: 100%;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.46);
    top: 0;
    left: 0;
  }

  .tips {
    position: absolute;
    width: 590rpx;
    height: 180rpx;
    border-radius: 12px;
    text-align: center;
    background-color: #FFFFFF;
    margin-left: 40rpx;
    padding: 40rpx 40rpx 20rpx 40rpx;
  }

  .tips_text {
    height: 86rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 28px;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-bottom: 50rpx;
  }

  .tips_bottom {
    display: flex;
  }

  .tips_bottom view {
    flex: 1;
    text-align: center;
    height: 46rpx;
    font-size: 28rpx;
    font-family: PingFangSC-regular;
  }

  .confirm-btn {
    width: 100%;
    height: 98upx;
    line-height: 98upx;
    text-align: center;
    color: #FFFFFF;
    font-size: 36upx;
    background-color: rgba(26, 208, 156, 100);
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .taskinfo_times {
    font-size: 28rpx;
    width: 642rpx;
    color: rgba(143, 143, 143, 100);
  }

  .agreement {
    width: 670rpx;
    height: 100%;
    background-color: #f5f5f6;
    position: absolute;
    top: 0;
    left: 0;
    padding: 40rpx 40rpx;
    overflow: hidden;
  }

  .agreementimg {
    width: 670rpx;
    height: 800rpx;
    overflow-y: auto;
  }

  .agreementimg image {
    width: 100%;
    height: 3100rpx;
    display: block;
  }

  .checkbox {
    height: 40rpx;
    margin-top: 40rpx;
    line-height: 40rpx;
    display: flex;
  }
  .taskBtn{
    width: 670rpx;
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin-top: 40rpx;
    color: #FFFFFF;
    background-color: #1ad09c;
    border-radius: 10rpx;
  }
</style>
