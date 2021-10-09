<template>
  <div class="task-details">
    <div class="share-details-top">
      <div :style="{height: statusBarHeight + 'px'}"></div>
      <div class="share-details-title posre"
           :style="{height: navHeight+'px'}">
           <div class="goBack" @click="goBack()">
             <image class="icon-back" :src="imgUrl" mode=""></image>
           </div>
           <p class="navgation-title fbold fs18 cfff">{{title}}</p>

           <p></p>
      </div>
      <div class="middle" v-show="taskdetail != ''">

        <div class="share-records-bottoma" style="border-radius: 20rpx 20rpx 0rpx 0rpx;" v-if="taskdetail.taskState == 2">
          ——— 已打款 ———
        </div>
        <div class="share-records-bottoma" style="border-radius: 20rpx 20rpx 0rpx 0rpx;" v-else-if="taskdetail.taskState > 2">
          ——— 已结束 ———
        </div>
        <div class="share-records-bottoma" v-else style="border-radius: 20rpx 20rpx 0rpx 0rpx;">
          ——— 进行中 ———
        </div>
        <!-- <div class="share-records-bottoma" v-if="taskdetail.state == 0" style="border-radius: 20rpx 20rpx 0rpx 0rpx;">
          ——— 进行中 ———
        </div>
        <div class="share-records-bottoma" style="border-radius: 20rpx 20rpx 0rpx 0rpx;" v-else>
          ——— {{taskdetail.state}} ———
        </div> -->
        <div class="middle-title" style="border-radius: 0rpx 0rpx 0rpx 0rpx;">
           {{taskdetail.taskName}}<span style="font-size: 26rpx; color: #a8a8a8;margin-left: 30rpx; ">金额：{{taskdetail.rewardAmount}}元</span>
        </div>
        <div class="middle-centent" style="background-color: white;">
          <div class="time">
            <div class="time-left">
              <div class="time-axis">
                <div class="dots-box">
                  <div class="dots">
                    <span class="bblue4"></span>
                    <p>至</p>
                    <span class="byellow4"></span>
                  </div>
                  <div class="time-line"></div>
                </div>
              </div>
              <div class="data">
                <p>{{taskdetail.startTime}}</p>
                <p>{{taskdetail.endTime}}</p>
              </div>
            </div>
          </div>
          <div class="title">
            <div class="title-top mb10">
              <span></span>
              <p class="fs14 c38 fbold ml7">关联信息</p>
            </div>
            <p class="fs14 ml15 received-title fbold c38" @click="toArticle(taskdetail.dynamicId)">{{taskdetail.title}}</p>
          </div>
          <div class="title">
            <div class="title-top mb10">
              <span></span>
              <p class="fs14 c38 fbold ml7">任务内容</p>
            </div>
            <p class="fs14 ml15 received-title fbold c38">{{taskdetail.taskContent}}</p>
          </div>
          <div class="target">
            <div class="target-title">
              <span></span>
              <p class="c38 fs14 ml7">任务进度</p>
              <!-- <p class="c38 fs14" style="margin-left: 400rpx;" @click="more">更多</p> -->
            </div>
            <!-- <div class="target-number"> -->
            <div>
              <div v-if="ifshow==true" class="bgfff pl16 pr17 lh49 fs14 c38 mb11 info-form" style="padding-bottom: 20rpx">
                <div class="disflex jsbet align-cen">
                  <label for="progressDesc" style="font-size: 28rpx;">内容</label>
                  <textarea name=""
                            id="progressDesc"
                            v-model="progressDesc"
                            class="bgf5f6 pl16 pr16 pt15 pb15 be8 bradius5 pha8 h50 borderbox" style="width: 80%; background-color: white;margin-top:20rpx;">
                  </textarea>
                </div>
                <div class="disflex jsbet align-cen">
                  <label for="progressScale" style="font-size: 28rpx;">进度</label>
                  <input type="number"
                         id="progressScale"
                         class="pha8 textr"

                         style="border: 1rpx solid #e8e8e8; width: 73%;margin-left: 9%; margin-top: 20rpx; margin-bottom: 20rpx; "
                         v-model="progressScale">%
                </div>
                <button style="width: 62%;font-size: 28rpx;background-color: #51cdcb;color: white;" data-url="../allOrder/allOrder" @click='confirmAcceptance'>添加</button>
              </div>
              <div class="number-box bblue" style="margin-top: 10rpx;justify-content: space-between;" v-for="progressinfo in progresslist"
              :key="progressinfo.id">
                <p class="cblue fs12">{{progressinfo.progressDesc}}</p>
                <span style="font-weight: bolder;">{{progressinfo.progressScale}}%</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div class="task-finish" style="height: auto;" v-if="taskdetail.taskState==2">
      <p class="fs16 c38 fbold">打款凭证<span class="cblue ml6 fs14 fnormal"></span></p>
      <div class="disflex wrap">
        <div class="bgfff bdash_a8 w100 h100 mr7 mb7 posre"
             v-for="(v,k) in self_photos"
             :key="k">
          <img :src="v"
               alt=""
               class="w100p h100p"
               mode="aspectFill">
        </div>
      </div>

    </div>
    <div class="task-finish" v-else-if="taskdetail.taskState==3">
      <p class="fs16 c38 fbold">打款凭证<span class="cblue ml6 fs14 fnormal"></span></p>
      <div class="disflex wrap">
        <div class="bgfff bdash_a8 w100 h100 mr7 mb7 posre"
             v-for="(v,k) in self_photos"
             :key="k">
          <img :src="v"
               alt=""
               class="w100p h100p"
               mode="aspectFill">
        </div>
      </div>

    </div>
    <!-- <div class="task-finish" style="height: auto;padding: 30rpx 30rpx 8rpx 30rpx;">
      <p class="fs20 c38 fbold">任务内容<span class="cblue ml6 fs14 fnormal">CONTENT</span></p>
    </div>
    <div class="task-tabber">
      {{taskdetail.taskContent}}
    </div> -->
   <!-- <div class="task-finish" v-show="taskdetail != ''">
      <p class="fs20 c38 fbold">我的完成情况<span class="cblue ml6 fs14 fnormal">FINISH</span></p>
      <div class="personnel">
        <image class="w50 h50" :src="taskdetail.myTask[0].avatarUrl"></image>
        <p class="c38 fs14 mt10 mb10">{{taskdetail.myTask[0].nickeName}}</p>
        <p class="ca8 fs12">{{taskdetail.myTask[0].position}}</p>
      </div>
      <div class="circle-box">
        <circleProgerssb :number="visitnumber" :percent="taskdetail.listTaskProgress[0].progressScale"></circleProgerssb>
      </div>
    </div> -->


      <div class="end-task" @click="collection" v-if="taskdetail.taskState==2">确认已收款</div>
      <!-- <div class="end-task" @click="share_tag()" v-else>去分享</div> -->

  </div>
</template>
<script>
import WXAJAX from '../../../utils/request.js'
// import circleProgerss from '../../../components/circleProgerss'
// import circleProgerssa from '../../../components/circleProgerssA'
import circleProgerssb from '../../../components/circleProgerssB'
import tools from "@/utils/index"
export default {
  components:{
    // circleProgerss,
    // circleProgerssa,
    circleProgerssb
  },
  data(){
    return {
      //设置头部需要的参数
      title:'任务详情',
      navHeight: 0,
      progresslist:'',
      statusBarHeight: 0,
      imgUrl:WXAJAX.imgBackUrl + '/marketing/icon_back.png',
      cardImgUrl:WXAJAX.imgBackUrl + '/marketing/img_bg_task1.png',
      addImg:WXAJAX.imgBackUrl+'/marketing/icon_add_user%402x.png',
      shareImg:WXAJAX.imgBackUrl+'/marketing/icon_share_s%402x.png',
      tabber:[
        {
          name:'未查看',
          tag:'notViewed',
          isSelect:true
        },
        {
          name:'未完成',
          tag:'incomplete',
          isSelect:false
        },
        {
          name:'已完成',
          tag:'completed',
          isSelect:false
        }
      ],
      self_photos:[],
      isShow:'notViewed',
      taskStaffId:0,
      taskState:0,
      progress:100,
      jindu:100,
      userName:wx.getStorageSync('userName'),
      taskCustomerId:wx.getStorageSync('taskCustomerId'),
      userId:wx.getStorageSync('userId'),
      userId:wx.getStorageSync('userId'),
      taskdetail:'',
      shareNumPercentage:'',
      visitNumPercentage:'',
      progressDesc:'',
      progressScale:'',
      ifshow:true,
      page:1,
      sharenumber:{
        shareNums:'',
        shareNum:'',
      },
      visitnumber:{
        visitNums:'',
        visitNum:''
      }
    }
  },
  watch:{
    taskdetail(newVal,old){
      this.timer(newVal)
      newVal.endTimes  = tools.getdate(newVal.endTime,'data')
      newVal.startTimes  = tools.getdate(newVal.startTime,'data')
      console.log(newVal.endTimes)
      if(newVal.state == 1){
        newVal.state = '未开始'
      }else if(newVal.state == 2){
        newVal.state = '已结束'
      }else if(newVal.state == 3){
        newVal.state = '已结束'
      }
       //需要用到endTime 所以新存一个时间
       var data = new Date().getTime()
       this.sharenumber.shareNums = parseInt(newVal.shareNum)
       this.sharenumber.shareNum = parseInt(newVal.myTask[0].shareNum),
       this.visitnumber.visitNums = parseInt(newVal.visitNum),
       this.visitnumber.visitNum = parseInt(newVal.myTask[0].visitNums)

       this.shareNumPercentage = Math.ceil(this.sharenumber.shareNum/this.sharenumber.shareNums)
       console.log(this.shareNumPercentage)
        if(this.shareNumPercentage == Infinity){
          this.shareNumPercentage = 0
        }
        this.visitNumPercentage = Math.ceil(this.visitnumber.visitNum/this.visitnumber.visitNums)
         if(this.visitNumPercentage == Infinity){
           this.visitNumPercentage = 0
         }
    }
  },
  created() {
    this.calculateNavBarHeight()

    this.taskCustomerId = wx.getStorageSync('taskCustomerId');

    //console.log(this.taskCustomerId)
  },
  // mounted() {

  //   this.getQueryMyTaskDetail()
  // },
  onShow() {
    this.getQueryMyTaskDetail()
    this.getlist(this.page)
  },
  methods:{
    //计算高度
    calculateNavBarHeight () {
      let menuButtonBounding = getApp().globalData.menuButtonBounding;
      wx.getSystemInfo({
        success: res => {
          let statusBarHeight = res.statusBarHeight; //胶囊按钮与顶部的距离
          console.log(statusBarHeight)
          let navHeight =
            statusBarHeight +
            (menuButtonBounding.top - statusBarHeight) * 2 +
            menuButtonBounding.height; //导航高度
          getApp().globalData.navHeight = navHeight;
          this.statusBarHeight = statusBarHeight
          this.navHeight = navHeight - statusBarHeight;
        },
        fail (err) {
          console.log(err);
        }
      });
    },
    toArticle(dynamicId){
      wx.navigateTo({
        url:'../../article/articleDetail/index?id=' + dynamicId
      })
    },
    more(){
      wx.navigateTo({
        url:'../progress/main?taskCustomerId=' +this.taskCustomerId +'&taskStaffId=' +this.taskStaffId + '&taskState=' +this.taskState
      })
    },
    getQueryMyTaskDetail(){
      wx.showLoading();
      let that=this
      WXAJAX.POST({
        type:1,
        taskCustomerId:this.taskCustomerId,
        userId:wx.getStorageSync('cardId'),
      },'','/customerEssay/queryMyTaskDetail').then((data) =>{
        if(data){
          that.taskStaffId=data.taskStaffId
          that.taskState=data.taskState
          if(data.taskState!=0){
            that.ifshow=false
          }

          // that.progresslist=data.listTaskProgress
          // that.visitNumPercentage = data.listTaskProgress[data.listTaskProgress.length].progressScale;
          data.time={
               day:'00',
               hour:'00',
               minute:'00',
               second:'00'
             }
          this.taskdetail = data
          if(data.receiptVoucher){
            this.self_photos = data.receiptVoucher.split(",");
          }

          this.getUpdateMyTaskState(this.taskdetail.userId)
        }
      })
    },
    getlist(page){
      let params='';
      if(this.taskStaffId){
        params={
          pageSize:10,
          pageNum:page,
          taskId:this.taskCustomerId,
          taskStaffId:this.taskStaffId,
          userId:wx.getStorageSync('cardId'),
        }
      }else{
        params={
          pageSize:10,
          pageNum:page,
          taskId:this.taskCustomerId,
        }
      }
      console.log("params",params);
      WXAJAX.POST(params, '', '/customerEssay/queryListTaskProgress').then(data => {
        if(this.page === 1){
            this.progresslist = data.list || [];
        }else{
            this.progresslist = [...this.progresslist, ...data.list] || [];
        }
      });
    },
    confirmAcceptance(){
      this.isShowConfirm=false;
      if(this.progressScale>100){
        wx.showToast({
          title:'进度不能超过100%',
          icon:'none',
          duration: 2000
        })
        return false;
      }
      let pas={
        taskId:this.taskCustomerId,
        taskStaffId:this.taskStaffId,
        userId:wx.getStorageSync('cardId'),
        progressScale:this.progressScale,
        progressDesc:this.progressDesc,
      }
      console.log('pas',pas)
      WXAJAX.POST(pas, '', '/customerEssay/insertTaskProgress').then(data => {
        this.getlist(this.page)
      });
      this.progressDesc=''
      this.progressScale=''


    },
    collection(){
      WXAJAX.POST({
        taskState:3,
        taskCustomerId:this.taskCustomerId,
      },'','/customerEssay/updateTaskStateById')
      WXAJAX.POST({
        taskState:4,
        taskCustomerId:this.taskCustomerId,
      },'','/customerEssay/updateTaskStateById')
      wx.navigateBack({
        delete:1
      })
    },
    getUpdateMyTaskState(userId){
      WXAJAX.POST({
        taskCustomerId:this.taskCustomerId,
        state:'',
        userId:userId
      },'','/customerEssay/updateMyTaskState').then((data) =>{
        wx.hideLoading();

      })
    },
    goBack(){
      wx.navigateBack({
        delete:1
      })
    },
    //倒计时
    timer(list){
      let than = this
      this.temp = setInterval(()=>{
          var end = list.endTime
          end = this.getDateConversion(end)
          var date = new Date()
          var now = date.getTime()
          var leftTime = end - now //时间差
          var d, h, m, s
          var date = new Date()
          var now = date.getTime()
          var end = end    //this.treasu_data 在data中定义的,后台拿到的结束时间戳
          var leftTime = end - now //时间差
          var d, h, m, s
          if (leftTime >= 0) {
          d = Math.floor(leftTime / 1000 / 60 / 60 / 24)
          h = Math.floor(leftTime/1000/60/60%24)
          m = Math.floor((leftTime / 1000 / 60) % 60)
          s = Math.floor((leftTime / 1000) % 60)
          if (d < 10) {
            d = '0' + d
          }
          if (s < 10) {
            s = '0' + s
          }
          if (m < 10) {
            m = '0' + m
          }
          if(h < 10) {
          h =  '0' + h
           }
          } else {
            // console.log('已截止')
          }
          list.time={
            day:d,
            hour:h,
            minute:m,
            second:s
          }
      },1000)
    },
    share_tag(){
      var did = this.taskdetail.dynamicId
      var cid = wx.getStorageSync('COMPANYID')
      wx.navigateTo({
      url:`../../companyPack/shareNow/main?id=${did}&cid=${cid}`
      })
    },
    //解决ios时间格式兼容问题
    getDateConversion(data){
        let phoneSystem = ''
        wx.getSystemInfo({
          success:function(res){
            phoneSystem = res.system
          }
        });
        if(phoneSystem.indexOf("iOS") != -1){
          data = data.replace(/-/g, '/');
        }
        return Date.parse(data)
      }
  },
  destroyed() {
    wx.removeStorageSync('taskCustomerId');
    clearInterval(this.temp)
  }
};
</script>
<style scoped>
.task-details{
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  overflow: hidden;
}
.share-details-top{
    background: linear-gradient(to bottom, #51cdcc, #ffffff);
 }
.share-details-title{
    display: flex;
    align-items: center;
    justify-content:space-between;
    padding-left: 20upx;
    padding-right: 100upx;
}
.navgation-title{
  display: flex;
  font-size:36px;
}
.title{
  padding:20upx 30upx 20upx 40upx;
}
.title span{
  display: block;
  box-sizing: border-box;
  width: 16upx;
  height: 16upx;
  border-radius: 50%;
  background-color: #;
  border: 4upx solid #2BCF88;
  border-radius:50%;
}
.received-title{
  height: 75upx;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.title-top{
  display: flex;
  align-items: center;
}
.icon-back{
  width: 45upx;
  height: 36upx;
  margin-top: 2upx;
}
.goBack{
  width: 60upx;
  height: 100%;
  display: flex;
  align-items: center;
}
.middle{
   /* height: 735upx; */
   height: auto;
   width: 100%;
   box-sizing: border-box;
   padding:20upx 30upx 0upx 30upx;
   background-size: 100%;
   background-repeat:no-repeat;
   background-position:bottom;
}
.information-title{
  width: 476upx;
  word-break: break-all;
  display: -webkit-box; /**对象作为伸缩盒子模型展示**/
  -webkit-box-orient: vertical; /**设置或检索伸缩盒子对象的子元素的排列方式**/
  -webkit-line-clamp: 2; /**显示的行数**/
  overflow: hidden; /**隐藏超出的内容**/
}
.middle-title{
  height: 88upx;
  border-radius:20upx 20upx 0upx 0upx;
  padding:0 30upx;
  background-color: #FFFFFF;
  border-bottom:1upx solid #F5F5F6;
  display: flex;
  align-items: center;
  font-size: 32upx;
  font-weight:bold;
  color: #383838;
}
/* .middle {
  display: flex;
  align-items: flex-start;
  height: 120upx;
  align-items: flex-start;
} */
.time{
    padding:30upx 30upx 30upx 34upx;
    display: flex;
    justify-content: space-between;
    min-height: 100upx;
  }
  .time-left{
    display: flex;
  }
  .dots-box{
    width: 32upx;
    height: 94upx;
    position: relative;
    margin-top: 12upx;
  }
  .dots{
    position: absolute;
    top: 0;
    z-index: 99;
    width: 32upx;
    display: flex;
    justify-content: space-between;
    text-align: center;
    flex-direction: column;
    height: 94upx;

  }
  .dots p{
     display: block;
     width: 30upx;
     height: 30upx;
     text-align: center;
     line-height: 30upx;
     border-radius: 50%;
     border:1upx solid #E8E8E8;
     color: #A8A8A8;
     font-size: 20upx;
     background-color: #FFFFFF;
  }
  .dots span{
    display: block;
    box-sizing: border-box;
    width: 16upx;
    height: 16upx;
    border-radius: 50%;
    margin:0 auto;
    background-color: #FFFFFF;
  }
  .time-line{
    width: 2upx;
    height: 90upx;
    background: #E9E9E9;
    margin: auto;
  }
  .data{
    display: flex;
    height: 115upx;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 9upx;
    font-size: 28upx;
    color: #A8A8A8;
  }
  .time-right{
    display: flex;
    height: 115upx;
    flex-direction: column;
    justify-content: space-between;
  }
  .check{
    display: flex;
    width: 170upx;
    justify-content: space-between;
    align-items: center;
  }
  .check-box{
    width: 105upx;
    height: 36upx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 6upx;
  }
  .share-records-bottom{
    background-color: #FFFFFF;
    border-radius:0 0 20upx 20upx;
    height: 88upx;
    display: flex;
    justify-content: space-between;
    padding:0 30upx;
    align-items: center;
  }
  .time-data{
    display: flex;
  }
  .share-records-bottom span{
    display: block;
    height: 40upx;
    width: 50upx;
    font-size: 28upx;
    font-weight: bold;
    background-color: #383838;
    border-radius: 10upx;
    margin:0 9upx;
    color: #FFFFFF;
    text-align: center;
    line-height: 40upx;
  }
  .share-records-bottoma{
    background-color: #FFFFFF;
    border-radius:0 0 20upx 20upx;
    height: 88upx;
    display: flex;
    justify-content: center;
    padding:0 30upx;
    align-items: center;
    color: #383838;
    font-size: 28upx;
  }
  .target{
    /* height: 135upx; */
    padding:0upx 30upx 40upx 40upx;
  }
  .target-title{
    display: flex;
    align-items: center;
    margin-bottom: 19upx;
  }
  .target-title span{
    display: block;
    box-sizing: border-box;
    width: 16upx;
    height: 16upx;
    border-radius: 50%;
    background-color: #FFFFFF;
    border:4upx solid #2BCF88;
  }
  .target-number{
    display: flex;
    justify-content: space-between;
  }
  .number-box{
    height: 50upx;
    padding:9upx 19upx 8upx 20upx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-radius: 6upx;
  }
  .target ul{
    display: flex;
    justify-content: space-around;
  }
  .target ul li{
    text-align: center;
  }
  .target-box{
    height: 30upx;
    display: flex;
    padding:0 10upx;
    align-items: center;
    border-radius: 6upx;
    margin-bottom: 20upx;
  }
  .task-finish{
    /* display: flex; */
    height: 537upx;
    flex-direction: column;
    padding:30upx 30upx 98upx 40upx;
  }
  .task-tabber{
    display: flex;

    padding:0 30upx;
    flex-direction: column;
  }
  .task-tabber ul{
    display: flex;
    justify-content: space-around;
    height: 88upx;
  }
  .task-tabber ul li{
    height: 100%;
    line-height: 88upx;
    position: relative;
    color: #383838;
    font-size: 28upx;
  }
  .task-tabber ul li span{
    display: block;
    height: 3upx;
    width: 100%;
    position: absolute;
    bottom: 0;
    background: #51CDCB;
  }
  .list-state{
    flex: 1;
    overflow: auto;
  }
  .list{
    height: 179upx;
    box-sizing: border-box;
    border-bottom:1upx solid #F5F5F6;
    padding:40upx 30upx 40upx 32upx;
    display: flex;
  }
  .end-task{
    height:88upx;
    border-radius: 10upx;
    position: fixed;
    bottom: 0;
    width: 690upx;
    text-align: center;
    line-height: 88upx;
    font-size: 36upx;
    margin:0 30upx;
    color: #FFFFFF;
    background:linear-gradient(90deg,#41DDA1,#2BCF88)
  }
  .information{
    height: 88upx;
    display: flex;
    justify-content: space-between;
    flex: 1;
  }
  .information-left{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .information-right{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .personnel{
    width: 100%;
    box-sizing: border-box;
    padding: 50upx 0 30upx 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
  }
  .personnel image{
    border-radius: 50%;
    margin:0 auto;
  }
  .circle-box{
    display: flex;
    justify-content: space-around;
  }
</style>
