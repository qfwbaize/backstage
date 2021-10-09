<template>
  <view>
    <!-- 导航栏 -->
    <div class="w90p  h30 m0auto disflex jsaround" style="background-color: #FFFFFF;">
      <div :class="tabType == 0 ? 'wrap':'arr'" @click="tab_type_tap(0)">机构内部开放任务</div>
      <div :class="tabType == 1 ? 'wrap':'arr'" @click="tab_type_tap(1)">我已承接</div>
    </div>
    <!-- 指定给我的 -->
    <view class="main" v-show="tabType == 0">
      <view class="minList" v-for="(item,index) in sendCompanyTaskList" :key="index" @click="toDetail(item)">
        <view class="minList_top">
          <view class="minList_title">{{ item.title }}</view>
          <view class="minList_reward">{{ item.money }}元</view>
        </view>
        <view class="minList_center">
          <view class="minList_center_left">
            <view style="color: #f5f5f5;margin-right: 15rpx;">
              <Circle></Circle>
            </view>
            <view>
              <view class="minList_center_right_people">{{ item.start_time }}</view>
              <view class="minList_center_right_people" style="margin-top: 32rpx;">{{ item.end_time}}</view>
            </view>
          </view>
          <view class="minList_center_right">
            <view class="minList_center_right_people">发布人：{{ item.name }}</view>
            <view class="minList_center_right_people" style="margin-top: 32rpx;">所属机构：{{ item.company_name }}</view>
          </view>
        </view>
        <view class="minList_bottom" v-show="item.status == 0">待签约</view>
        <view class="minList_bottom" v-show="item.status == 1">进行中</view>
        <view class="minList_bottom" v-show="item.status == 2">验收中</view>
        <view class="minList_bottom" v-show="item.status == 3">已验收</view>
        <view class="minList_bottom" v-show="item.status == 4">已完成</view>
      </view>
    </view>
    <!-- 我发布的指定任务 -->
   <view class="main" v-show="tabType == 1">
      <view class="minList" v-for="(item,index) in AcceptCompanyTaskList" :key="index" @click="getDetail(item)">
        <view class="minList_top">
          <view class="minList_title">{{item.title}}</view>
          <view class="minList_status">{{item.category}}</view>
          <view class="minList_reward">{{item.money}}元</view>
        </view>
        <view class="minList_center">
          <view class="minList_center_left">
            <view style="color: #f5f5f5;margin-right: 15rpx;">
              <Circle></Circle>
            </view>
            <view>
              <view class="minList_center_right_people">{{item.start_time}}</view>
              <view class="minList_center_right_people" style="margin-top: 32rpx;">{{item.end_time}}</view>
            </view>
          </view>
          <view class="minList_center_right">
            <view class="minList_center_right_people">发布人：{{item.name}}</view>
            <view class="minList_center_right_people" style="margin-top: 32rpx;">所属机构：{{item.company_name}}</view>
          </view>
        </view>
       <view class="minList_bottom" v-show="item.status == 0">待签约</view>
       <view class="minList_bottom" v-show="item.status == 1">进行中</view>
       <view class="minList_bottom" v-show="item.status == 2">验收中</view>
       <view class="minList_bottom" v-show="item.status == 3">已验收</view>
       <view class="minList_bottom" v-show="item.status == 4">已完成</view>
      </view>
    </view>

  </view>
</template>

<script>
  import circle from "@/components/circle";
  import http from "../../../utils/http"
  export default {
    components:{
      circle
    },
    data() {
      return {
        tabType: 0,
        page:1,
        sendCompanyTaskList:[],//开放任务列表
        AcceptCompanyTaskList:[]//接受的任务列表
      }
    },
    onShow() {
      this.getSendCompanyTask()
      this.getAcceptCompanyTask()
    },
    onReachBottom(){
      this.page += 1
      this.getSendCompanyTask()
      this.getAcceptCompanyTask()
    },
    onPullDownRefresh() {
      this.page = 1
      this.getSendCompanyTask()
      this.getAcceptCompanyTask()
    },
    methods: {
      //我接收的任务
      getDetail(e){
        uni.navigateTo({
            url:'../missionDetailMe/missionDetailMe?id='+e.id
        })
      },
      //开放任务详情页面
      toDetail(e){
        uni.navigateTo({
            url:'../missionDetailInside/missionDetailInside?id='+e.id
        })
      },
      //获取我接收的任务
      getAcceptCompanyTask(){
        var data ={
          page:this.page,
          limit:10
        }
        http({url:'/apis/mytask/received',method:'GET',data:data}).then(res=>{
          if(res.data.code == 200){
            if (this.page == 1) {
            	this.AcceptCompanyTaskList = res.data.data
            } else {
            	this.AcceptCompanyTaskList = [...this.AcceptCompanyTaskList,...res.data.data]
            }
            this.AcceptCompanyTaskList.forEach(item=>{
              if(item.type == 4){
                item.category = '平台任务'
              }else if(item.type == 3){
                item.category = '开放任务'
              }else{
                item.category = '指定任务'
              }
            })
            // console.log(this.AcceptCompanyTaskList,9999999111111)
          }else{
            uni.showToast({
              title:res.data.msg,
              icon:'none'
            })
          }
        })
      },
      //获取开放任务列表
      getSendCompanyTask(){
        var data ={
          page:this.page
        }
        http({url:'/apis/mytask/missed',method:'GET',data:data}).then(res=>{
          if(res.data.code == 200){
            if (this.page == 1) {
            	this.sendCompanyTaskList = res.data.data
            } else {
            	this.sendCompanyTaskList = [...this.sendCompanyTaskList,...res.data.data]
            }
            // console.log(this.sendCompanyTaskList,888888888111111)
          }
        })
      },
      //导航栏切换
      tab_type_tap(i) {
        this.tabType = i
      },

    }
  }
</script>

<style>
  .arr {
    height: 100%;
    border: 1px #00BBAE;
    color: #000000;
    font-size: 28rpx;
    text-align: center;
    line-height: 60rpx;
    font-family: PingFangSC-regular;
  }

  .wrap {
    height: 100%;
    color: #00BBAE;
    font-size: 32rpx;
    text-align: center;
    line-height: 60rpx;
    font-family: PingFangSC-bold;
    border-bottom: 3px solid #00BBAE;
  }

  .main {
    width: 670rpx;
    min-height: 100vh;
    padding: 40rpx;
    background-color: #f5f5f5;
  }

  .minList {
    width: 630rpx;
    height: 332rpx;
    background-color: #FFFFFF;
    border-radius: 12rpx;
    margin-bottom: 40rpx;
    padding: 20rpx;
  }

  .minList_top {
    display: flex;
    justify-content: space-between;
  }

  .minList_title {
    color: rgba(16, 16, 16, 100);
    font-size: 32rpx;
    font-weight: bold;
  }
  .minList_status{
    width: 128rpx;
    height: 48rpx;
    line-height: 48rpx;
    border-radius: 10rpx;
    background-color:#d9f5f3;
    color: rgba(0, 187, 174, 100);
    font-size: 26rpx;
    text-align: center;
    font-family: Arial;
  }

  .minList_reward {
    color: rgba(0, 187, 174, 100);
    font-size: 28rpx;
  }

  .minList_center {
    display: flex;
    justify-content: space-between;
    margin-top: 50rpx;
    margin-bottom: 50rpx;
  }

  .minList_center_left {
    width: 182rpx;
    height: 110rpx;
    display: flex;
  }

  .greencircle {
    width: 15rpx;
    height: 15rpx;
    border-radius: 50%;
    border: 1px solid #00BBAE;
    margin-top: 8rpx;
  }

  .orangecircle {
    width: 15rpx;
    height: 15rpx;
    border-radius: 50%;
    border: 1px solid orange;
  }

  .minList_center_right_people {
    color: rgba(143, 143, 143, 100);
    font-size: 26rpx;
    text-align: left;
    font-family: PingFangSC-regular;
  }

  .minList_bottom {
    width: 100%;
    height: 40rpx;
    line-height: 40rpx;
    color: rgba(25, 27, 30, 100);
    font-size: 28rpx;
    text-align: center;
    font-family: PingFangSC-regular;
  }

  .task_button {
    position: fixed;
    bottom: 0rpx;
    width: 750rpx;
    height: 84rpx;
    line-height: 84rpx;
    background-color: rgba(26, 208, 156, 100);
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    line-height: 84rpx;
    text-align: center;
    font-family: Arial;
    color: #FFFFFF;
  }
</style>
