<template>
  <div class="share-records">
    <div class="share-records-top">
      <div class="title"
      v-for="(item,index) in option"
      :key="index"
      @click="select(index)">
        <div class="select" :style="item.isSelect == true ? item.style : ''">
        {{item.name}}
          <div class="select-line"
               v-if="item.isSelect == true"></div>
        </div>
      </div>
      <!-- <div class="dropdown"
      @click="filter_btn"
      >
        <p>筛选</p>
        <image class="w15 h15" :src="dropdownImg"></image>
      </div> -->
    </div>
    <div class="share-records-centent" v-if="status == 1" >
       <div class="list" v-for="item in sharedData" :key="item.taskCustomerId" @click="toSharedData(item.taskCustomerId)">
         <div class="list-top">
            <div class="title">
              <p>{{item.taskName}}</p>
              <!-- <image class="w24 h24" v-if="item.viewState == 0" :src="newImg" mode=""></image> -->
            </div>
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
                  <p>{{item.startTime}}</p>
                  <p>{{item.endTime}}</p>
                </div>
              </div>
              <!-- <div class="time-right">
                <div class='check'>
                  <p class="fs14 c38 mr6"><span class="cblue">{{item.seeViewed}}</span>/{{item.sumNum}}</p>
                  <div class="check-box bblue">
                    <image class="w10 h10" :src="seeImg"></image>
                    <p class="fs10 cblue fbold">已查看</p>
                  </div>
                </div>
                <div class='check'>
                  <p class="fs14 c38 mr6"><span class="cyellow">{{item.completed}}</span>/{{item.sumNum}}</p>
                  <div class="check-box byellow">
                    <image class="w10 h10" :src="finishImg" mode=""></image>
                    <p class="fs10 cyellow fbold">已完成</p>
                  </div>
                </div>
              </div> -->
            </div>
         </div>
         <image class="w345 h15" style="display:block" :src="lineImg"></image>
         <!-- <div class="share-records-bottom" v-if="item.state == 0"> -->
        <!-- <div class="share-records-bottoma" v-if="item.state == 0">
           ——— 进行中 ———
         </div>
         <div class="share-records-bottoma" v-else>
           ——— {{item.state}} ———
         </div> -->
         <div class="share-records-bottoma" style="border-radius: 20rpx 20rpx 0rpx 0rpx;" v-if="item.taskState == 2">
           ——— 已打款 ———
         </div>
         <div class="share-records-bottoma" style="border-radius: 20rpx 20rpx 0rpx 0rpx;" v-else-if="item.taskState > 2">
           ——— 已结束 ———
         </div>
         <div class="share-records-bottoma" style="border-radius: 20rpx 20rpx 0rpx 0rpx;" v-else-if="item.state == '未开始'">
           ——— 未开始 ———
         </div>
         <div class="share-records-bottoma" v-else style="border-radius: 20rpx 20rpx 0rpx 0rpx;">
           ——— 进行中 ———
         </div>
       </div>
    </div>
    <div class="share-records-centent" v-else>
       <div
        class="list" v-for="item in libraryData"
        :key="item.taskCustomerId"
        @click="toLibraryDetails(item.taskCustomerId)">
         <div class="list-top">
            <div class="title">
              <p>{{item.taskName}}</p>
              <p>{{item.rewardAmount}}元</p>
            </div>
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
                  <p>{{item.startTime}}</p>
                  <p>{{item.endTime}}</p>
                </div>
              </div>
            </div>
            <div class="article-title">
              <div class="article-title-top mb10">
                <span></span>
                <p class="fs14 c38 ml7 fbold">关联信息</p>
              </div>
              <p class="fs14 ml15 received-title c38 fbold">{{item.title}}</p>
            </div>
            <div class="target">
              <div class="target-title">
                <span></span>
                <p class="c38 fs14 ml7">任务内容</p>
              </div>
              <div class="target-number">
                <p class="cyellow fs15" style="overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">{{item.taskContent}}</p>
                <!-- <div class="number-box bblue">
                  <image class="w10 h10 mr6" :src="shareImg"></image>
                  <p class="cblue fs12">文章分享次数  <span class="fbold">{{item.shareNum}}</span></p>
                </div>
                <div class="number-box byellow">
                  <image class="w10 h10 mr6" :src="addImg"></image>
                  <p class="cyellow fs12">文章分享次数  <span class="fbold">{{item.visitNum}}</span></p>
                </div> -->
              </div>
            </div>
         </div>
         <image class="w345 h15" style="display:block" :src="lineImg"></image>
         <div class="share-records-bottoma" style="border-radius: 20rpx 20rpx 0rpx 0rpx;" v-if="item.taskState == 2">
           ——— 已打款 ———
         </div>
         <div class="share-records-bottoma" style="border-radius: 20rpx 20rpx 0rpx 0rpx;" v-else-if="item.taskState > 2">
           ——— 已结束 ———
         </div>
         <div class="share-records-bottoma" style="border-radius: 20rpx 20rpx 0rpx 0rpx;" v-else-if="item.state == '未开始'">
           ——— 未开始 ———
         </div>
         <div class="share-records-bottoma" v-else style="border-radius: 20rpx 20rpx 0rpx 0rpx;">
           ——— 进行中 ———
         </div>
         <!-- <div class="share-records-bottoma" v-if="item.state == 0">
           ——— 进行中 ———
         </div>
         <div class="share-records-bottoma" v-else>
           ——— {{item.state}} ———
         </div> -->
       </div>
    </div>
    <div class="mask" :class="showMask ? '' :'hidden'">
      <div class="screen">
        <div class="screen-top">
          <div class="task-status mb25">
            <p class="ca8 fs14">任务状态</p>
            <div class="state-tag-box">
              <div
              class="state-tag"
              v-for="item in state"
              :key="item.tag"
              :class="{'active': isState == item.tag}"
              @click="toState(item.tag,item.state)">
                 {{item.name}}
              </div>
            </div>
          </div>
          <div class="task-status mb25">
            <p class="ca8 fs14">查看状态</p>
            <div class="state-tag-box">
              <div
              class="state-tag"
              v-for="item in see"
              :key="item.tag"
              :class="{'active': isViewed == item.tag}"
              @click="toViewed(item.tag,item.viewState)">
                 {{item.name}}
              </div>
            </div>
          </div>
        </div>

        <div class="screen-bottom">
          <div class="reset ca8" @click="reset">重置</div>
          <div class="confirm bgblue" @click="confirm">确认</div>
        </div>
      </div>
      <div class="mask-hidden"  @click.stop="mask_tag">

      </div>
    </div>
    <div class="isboss" v-if="isboss"></div>
    <div class="isboss-btn" @click="creatTaskTag">创建任务</div>
    <!-- <div class="isboss-btn" @click="creatTaskTag" v-if="isboss">创建任务</div> -->
  </div>
</template>
<script>

import WXAJAX from "@/utils/request";
import tools from "@/utils/index"
export default {

  data() {
    return {
      lineImg:WXAJAX.imgBackUrl+'/marketing/img_line_s%402x.png',
      newImg:WXAJAX.imgBackUrl+'/marketing/icon_new%402x.png',
      seeImg:WXAJAX.imgBackUrl+'/marketing/icon_eye%402x.png',
      finishImg:WXAJAX.imgBackUrl+'/marketing/icon_finish%402x.png',
      addImg:WXAJAX.imgBackUrl+'/marketing/icon_add_user%402x.png',
      shareImg:WXAJAX.imgBackUrl+'/marketing/icon_share_s%402x.png',
      dropdownImg:WXAJAX.imgBackUrl+'/marketing/icon_filter%402x.png',
      page: 1,
      isLoading: false, //数据加载中
      isboss:wx.getStorageSync('isBoss'),
      list: [],
      editTab:false ,
      tabs:[],
      //计时器
      temp:'',
      //控制tab切换
      option:{
        Shared:{
          isSelect:true,
          name:'我发布的',
          type:'1',
          style:'color:#51CDCB'
        },
        library:{
          isSelect:false,
          name:'我收到的',
          type:'2',
          style:'color:#51CDCB'
        }
      },
      state:[
        {
          name:'全部',
          tag:'all',
          state:''
        },
        {
          name:'未开始',
          tag:'notstart',
          state:1
        },
        {
          name:'进行中',
          tag:'haveInHand',
          state:0
        },
        {
          name:'已结束',
          tag:'settled',
          state:2
        }
      ],
      see:[
        {
          name:'全部',
          tag:'all',
          viewState:''
        },
        {
          name:'未查看',
          tag:'notViewed',
          viewState:0
        },
        {
          name:'已查看',
          tag:'viewed',
          viewState:1
        }
      ],
      showMask:false,
      isState:'all',
      isViewed:'all',
      lisType:1,

      //控制item组件样式的参数
      type:1,
      status:1,
      sharedData:'',
      libraryData:'',
      //任务条件
      taskState:'',
      taskViewState:'',
      //控制分页
      pageNum:'',
      listType:2
    };
  },
  watch:{
    sharedData(newVal,old){
      // this.timer(newVal)
       //需要用到endTime 所以新存一个时间
       var data = new Date().getTime()
       for(var i in newVal){
         console.log(newVal[i].time == '')
         if(newVal[i].time == ''){
           newVal[i].state = 2
         }
         if(newVal[i].state == 1){
           newVal[i].state = '未开始'
         }else if(newVal[i].state == 2){
           newVal[i].state = '已结束'
         }else if(newVal[i].state == 3){
           newVal[i].state = '已结束'
         }

       }
    },
    libraryData(newVal,old){
         for(var i in newVal){
        if(newVal[i].time == ''){
          newVal[i].state = 2
        }
        if(newVal[i].state == 1){
          newVal[i].state = '未开始'
        }else if(newVal[i].state == 2){
           newVal[i].state = '已结束'
        }else if(newVal[i].state == 3){
           newVal[i].state = '已结束'
       }
      }
    },
    status(newVal,old){
      if(newVal == 1){
        this.listType = 2
      }else{
        this.listType = 1
      }
    }
  },
  onShow() {
    this.pageNum = 1;
    this.getMarketingList(this.listType);
  },
  async onPullDownRefresh() {
      this.pageNum = 1;
      this.libraryData = '';
      this.sharedData = ''
      clearInterval(this.temp)
      await this.getMarketingList(this.listType);
      wx.stopPullDownRefresh();
    },
   async onReachBottom() {
    //clearInterval(this.temp)
    if (this.isLoading){
      return;
    }
    await this.getMarketingList(this.listType,this.taskState,this.taskViewState);
   },
  methods: {
    //唤出筛选条件
    filter_btn(){
      this.showMask = !this.showMask
    },
    mask_tag(ev){
      this.showMask = false;
    },
    //点击筛选条件后执行的事件
    choose_tap(type){
      this.filterTypesShow = true
      if(type == 'newest'){
        console.log('最新')
      }else if(type == 'most'){
        console.log('最多')
      }
    },
    //任务完成状态
    toState(tag,stats){
      // this.isState = 'all'
      // this.isViewed = 'all'
      this.isState = tag
      this.taskState = stats
      console.log(this.taskState)
    },
    //任务查看状态
    toViewed(tag,viewed){
      // this.isState = 'all'
      // this.isViewed = 'all'
      this.isViewed = tag
      this.taskViewState = viewed
      console.log(this.taskViewState)
    },
    //重置按钮
    reset(){
      this.isState = 'all'
      this.isViewed = 'all'
    },
    //state,viewState这两个筛选条件是可选的
    async getMarketingList(type,state,viewState){
      wx.showLoading();
      WXAJAX.POSTA({
        type:type,
        queryType:1,
        state:state,
        viewState:viewState,
        pageNum:this.pageNum
      },'','/customerEssay/queryMyTask')
      .then((data) =>{
        wx.hideLoading()
        if(data.data.list){
         // console.log(data.data.list)
          data.data.list.forEach((item)=>{
            item.time={
               day:'00',
               hour:'00',
               minute:'00',
               second:'00'
             }
          })
          this.timer(data.data.list)
          if(this.pageNum == 1){
            if(type == 1){
              this.libraryData = data.data.list
            }else if(type == 2){
              this.sharedData = data.data.list
            }
          }else{
            if(type == 1){
              this.libraryData = [...this.libraryData, ...data.data.list]
            }else if(type == 2){
              this.sharedData =  [...this.sharedData, ...data.data.list]
            }
          }

          this.pageNum++;
        }else{
          this.noData = true
        }

      })
    },
    toLibraryDetails(id){
      clearInterval(this.temp)
      wx.setStorageSync('taskCustomerId', id);
      wx.navigateTo({
        url:'../tasksReceived/main'
      })
    },
    toSharedData(id){
      clearInterval(this.temp)
      wx.setStorageSync('sharedDataId', id);
      wx.navigateTo({
        url:'../taskDetails/main'
      })
    },
    confirm(){
      clearInterval(this.temp)
      var type = '',
          state = this.taskState,
          viewState = this.taskViewState
      //因为option的data数据与要的值不一样 所以判断赋值一下
      if(this.status == 1){
        this.listType = 2
      }else{
        this.listType = 1
      }
      this.getMarketingList(this.listType,state,viewState)
      this.showMask = false
    },
    //倒计时
    timer(list){
      let than = this
      this.temp = setInterval(()=>{
        for(var i in list){
          var end = list[i].endTime
          end = this.getDateConversion(end)
          //console.log(end)
          var date = new Date()
          var now = date.getTime()
          var leftTime = end - now //时间差
          if(leftTime == 0){
            list[i].state = 2
          }
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

          list[i].time={
            day:d,
            hour:h,
            minute:m,
            second:s
          }
          console.log(1)
        }
      },1000)
    },
    //点击切换
    select(i){
      this.isState = 'all'
      this.isViewed = 'all'
      this.taskState = ''
      this.taskViewState = ''
      this.pageNum = 1
      clearInterval(this.temp)
      for(var j in this.option){
        this.option[j].isSelect = false
        this.option[i].isSelect = true
        this.status = this.option[i].type
      }
      var type = ''
      if(this.status == 1){
        type = 2
      }else{
        type = 1
      }
      this.getMarketingList(type)

    },
    creatTaskTag(){

      uni.navigateTo({
        url: '../../companyPack/createTask/main'
      })
      // uni.redirectTo({
      //   url: '../../companyPack/createTask/main'
      // })
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
      clearInterval(this.temp)
  }
};
</script>
<style scoped>
  .share-records{
    display: flex;
    flex-direction: column;
    min-height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .share-records-top{
    height: 88upx;
    position: fixed;
    z-index: 9999;
    width: 100%;
    top: 0;
    display: flex;
    justify-content:space-around;
    font-size: 32upx;
    color: #787878;
    background: #FFFFFF;
    align-items: center;
  }
  .select{
    box-sizing: border-box;
    padding-top: 27upx;
    display: block;
    height: 88upx;
    display: flex;
    flex-direction: column;
    align-items:center;
    position: relative;
  }
  .select-line{
    display: block;
    width: 100%;
    height: 4upx;
    background-color: #51CDCB;
    position: absolute;
    bottom: 0;
  }
  .share-records-content{
    padding: 120upx 30upx 0 30upx;
  }
  .article-title{
    padding:20upx 30upx 20upx 40upx;
  }
  .article-title span{
    display: block;
    box-sizing: border-box;
    width: 16upx;
    height: 16upx;
    border-radius: 50%;
    background-color: #;
    border: 4upx solid #2BCF88;
    border-radius:50%;
  }
  .article-title-top{
    display: flex;
    align-items: center;
  }
  .received-title{
    height: 75upx;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .dropdown{
    width: 160upx;
    height: 60upx;
    background-color: #EDFAFA;
    border-radius: 30upx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28upx;
    color: #51CDCB;
    font-size: 28upx;
    float: right;
  }
  .dropdown image{
    width: 20upx;
    height: 20upx;
    margin-left: 8upx;
  }
  .mask{
    position: fixed;
    top: 88upx;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.5);
    z-index: 9999;
    transition: .2s;
  }
  .mask.hidden{
    display: none;
  }
  .mask-hidden{
    flex: 1;
  }
  .screen{

    width: 100%;

    background: #FFFFFF;

  }
  .screen-top{
    padding: 30upx 0 0 30upx;
  }
  .state-tag{
    padding:0 21upx;
    line-height: 60upx;
    height: 60upx;
    color: #787878;
    margin-right: 20upx;
    border-radius: 6upx;
  }
  .state-tag-box{
    padding-top: 20upx;
    display: flex;
  }
  .active{
    background: #51CDCB;
    color: #FFFFFF;
  }
  .screen-bottom{
    height: 88upx;
    display: flex;
  }
  .screen-bottom div{
    width: 50%;
    height: 100%;
    font-size: 36upx;

    text-align: center;
    line-height: 88upx;
  }
  .reset{
    border-top: 1upx solid #F5F5F6;
  }
  .confirm{
    color: #FFFFFF;
  }
  .share-records-centent{
    padding:120upx 30upx 0 30upx;
    flex: 1;
    overflow: auto;
  }
  .list{
    margin-bottom: 20upx;
  }
  .list-top{
    border-radius: 20upx 20upx 0 0;
    background: #FFFFFF;

  }
  .title{
    height: 88upx;
    padding:0 30upx;
    font-weight: 900;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:1upx solid #F8F8F8;
  }
  .time{
    padding:30upx 30upx 40upx 34upx;
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
    height: 135upx;
    padding:0upx 30upx 0 40upx;
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
    min-width: 265upx;
    height: 50upx;
    padding:9upx 19upx 8upx 20upx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-radius: 6upx;
  }
  .isboss{
    height: 88upx;
  }
  .isboss-btn{
    height:88upx;
    width: 100%;
    position: fixed;
    bottom: 0;
    border-top-right-radius: 10upx;
    border-top-left-radius: 10upx;
    z-index: 999;
    text-align: center;
    line-height: 88upx;
    font-size: 36upx;
    color: #FFFFFF;
    background:linear-gradient(90deg,#41DDA1,#2BCF88)
  }
</style>
