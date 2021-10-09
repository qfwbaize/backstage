<template>
  <view>
    <!-- 导航栏 -->
    <div class="w90p  h30 m0auto disflex jsaround" style="background-color: #FFFFFF;">
      <div :class="tabType == 0 ? 'wrap':'arr'" @click="tab_type_tap(0)">本机构发的</div>
      <div :class="tabType == 1 ? 'wrap':'arr'" @click="tab_type_tap(1)">本机构承接的</div>
    </div>
    <!-- 任务通知 -->
    <view class="notices" @click="toNewsMission">
      <view class="noticesImg">
        <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/messionmsg.png" mode=""></image>
        <view class="noticesNum" v-if="msgList.length != 0">{{msgList.length}}</view>
      </view>
      <view class="noticesText">
        <view class="" v-show="msgList[0].type == 1">系统消息通知</view>
        <view class="" v-show="msgList[0].type == 2">机构消息通知</view>
        <view class="" v-show="msgList[0].type == 3">平台消息通知</view>
        <view style="margin-top: 15rpx;width: 450rpx;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{msgList[0].content}}</view>
        <view v-if="msgList.length == 0" style="margin-top: 15rpx;width: 450rpx;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">暂无消息</view>
      </view>
    </view>
    <!-- 我发布的指定任务 -->

    <view class="main" v-show="tabType == 0">
      <view class="minList" v-for="(item,index) in sendCompanyTaskList" :key="index" @click="toDetail(item)">
        <view class="minList_top">
          <view class="minList_title">{{ item.title }}</view>
          <view class="minList_status">{{ item.category }}</view>
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
        <view class="minList_children" v-show="item.children" @click.stop="toshow(item,index)">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/missionDown.png" mode=""></image>
          <view class="minList_textnum">相关子任务({{item.children.length}})</view>
        </view>
        <view class="" v-show="item.is_show == true">
          <view class="" v-for="(childItem,childIndex) in item.children" :key="childIndex" @click.stop="toChildDetail(childItem)">
            <view class="minList_top">
              <view class="minList_title">{{childItem.title}}</view>
              <view class="minList_reward">{{childItem.money}}元</view>
            </view>
            <view class="minList_center" style="margin-top: 20rpx;">
              <view class="minList_center_left">
                <view style="color: #f5f5f5;margin-right: 15rpx;">
                  <Circle></Circle>
                </view>
                <view>
                  <view class="minList_center_right_people">{{childItem.start_time}}</view>
                  <view class="minList_center_right_people" style="margin-top: 32rpx;">{{childItem.end_time}}</view>
                </view>
              </view>
              <view class="minList_center_right">
                <view class="minList_center_right_people">发布人：{{childItem.name}}</view>
                <view class="minList_center_right_people" style="margin-top: 32rpx;">所属机构：{{childItem.company_name}}</view>
              </view>
            </view>
          </view>
        </view>

      </view>
    </view>
     <!-- 指定给我的 -->
    <view class="main" v-show="tabType == 1">
      <view class="minList" v-for="(item,index) in AcceptCompanyTaskList" :key="index" @click.stop="getDetail(item)">
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
        <view class="minList_children" v-show="item.children" @click.stop="toShow(item,index)">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/missionDown.png" mode=""></image>
          <view class="minList_textnum">相关子任务({{item.children.length}})</view>
        </view>
        <view class="" v-show="item.is_show == true" >
          <view class="" v-for="(childItem,childIndex) in item.children" :key="childIndex" @click="toChildDetail(childItem)">
            <view class="minList_top">
              <view class="minList_title">{{childItem.title}}</view>
              <view class="minList_reward">{{childItem.money}}元</view>
            </view>
            <view class="minList_center" style="margin-top: 20rpx;">
              <view class="minList_center_left">
                <view style="color: #f5f5f5;margin-right: 15rpx;">
                  <Circle></Circle>
                </view>
                <view>
                  <view class="minList_center_right_people">{{childItem.start_time}}</view>
                  <view class="minList_center_right_people" style="margin-top: 32rpx;">{{childItem.end_time}}</view>
                </view>
              </view>
              <view class="minList_center_right">
                <view class="minList_center_right_people">发布人：{{childItem.name}}</view>
                <view class="minList_center_right_people" style="margin-top: 32rpx;">所属机构：{{childItem.company_name}}</view>
              </view>
            </view>
          </view>
        </view>

      </view>

    </view>

    <view class="maincover" v-show="show == true" @click="off">
    	<view class="covertask_pos">
    		<view class="covertask_one" @click="toNewTask">发布计次任务</view>
    		<view class="covertask_two" @click.stop="toTimeTask">发布计时任务</view>
    	</view>
    </view>

    <view class="task_button" @click="toNewmission">
      发布任务
    </view>
  </view>
</template>

<script>
  import http from "../../../utils/http"
  import circle from "@/components/circle";
  export default {
    components:{
      circle,
    },
    data() {
      return {
        tabType: 0,
        show: false, //默认隐藏
        page:1,
        sendCompanyTaskList:[],
        AcceptCompanyTaskList:[],
        msgList:[]
      }
    },
    onShow() {
        this.getSendCompanyTask()
        this.getAcceptCompanyTask()
        this.getMessage()
    },
    onReachBottom(){
        this.page+=1
        this.getSendCompanyTask()
        this.getAcceptCompanyTask()
    },
    onPullDownRefresh() {
      this.page = 1
      this.getSendCompanyTask()
      this.getAcceptCompanyTask()
    },
    methods: {
      //获取消息通知列表
      getMessage(){
        var data ={
          page:this.page
        }
        http({url:'/apis/messages/index',method:'GET',data:data}).then(res=>{
          if(res.data.code == 200){
            	this.msgList = res.data.data
            // console.log(this.msgList,999999999999)
          }
        })
      },
      //跳转到子任务详情
      toChildDetail(e){
        var companyId = uni.getStorageSync('SELFCOMPANYID')
        if(e.company_id == companyId){
          uni.navigateTo({
            url:'../missionDetailAappoint/missionDetailAappoint?id='+e.id
          })
        }else{
          uni.navigateTo({
            url:'../missionDetailAappoint/missionDetailAappoint?id='+e.id+'&type=1'
          })
        }

      },
      //机构发的任务子任务展示
      toshow(item,index){
        this.sendCompanyTaskList[index].is_show = !this.sendCompanyTaskList[index].is_show
      },
      //机构收到的任务子任务展示
      toShow(item,index){
        this.AcceptCompanyTaskList[index].is_show = !this.AcceptCompanyTaskList[index].is_show
      },
      //本机构承接的任务
      getDetail(e){
        uni.navigateTo({
          url:'../missionDetailMeet/missionDetailMeet?id='+e.id
        })
      },
      //本机构发的任务
      toDetail(e){
        if(e.type == 4){
          uni.navigateTo({
            url:'../missionDetail/missionDetail?id='+e.id
          })
        }else{
          uni.navigateTo({
            url:'../missionDetailAappoint/missionDetailAappoint?id='+e.id
          })
        }
      },
      //获取本机构接受的任务
      getAcceptCompanyTask(){
        var data ={
          page:this.page
        }
        http({url:'/apis/companytask/accept_index',method:'GET',data:data}).then(res=>{
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
          }
        })
      },
      //获取本机构发的任务
      getSendCompanyTask(){
        var data ={
          page:this.page
        }
        http({url:'/apis/companytask/release_index',method:'GET',data:data}).then(res=>{
          if(res.data.code == 200){
            if (this.page == 1) {
            	this.sendCompanyTaskList = res.data.data
            } else {
            	this.sendCompanyTaskList = [...this.sendCompanyTaskList,...res.data.data]
            }

            this.sendCompanyTaskList.forEach(item=>{
              if(item.type == 4){
                item.category = '平台任务'
              }else if(item.type == 3){
                item.category = '开放任务'
              }else{
                item.category = '指定任务'
              }
            })
          }else{
            uni.showToast({
              title:res.data.msg,
              icon:'none'
            })
          }
          // console.log(res,888888888111111)
        })
      },
      //头部导航栏
      tab_type_tap(i) {
        this.tabType = i
      },
      //跳转到发布任务页面
      toNewmission(){
        this.show = true
      },
      //发布计时任务
      toTimeTask(){
        uni.showToast({
          title:'正在开发中',
          icon:'none'
        })
      },
      //发布计次任务
      toNewTask(){
        uni.navigateTo({
          url:'../newmission/mission?pattern=1'
        })
      },
      //点击任意关闭
      off() {
      	this.show = false
      },
      //跳转到任务通知页面
      toNewsMission(){
        uni.navigateTo({
          url:'../newsMission/newsMission'
        })
      }

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
    background-color:#00bbae;
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    line-height: 84rpx;
    text-align: center;
    font-family: Arial;
    color: #FFFFFF;
  }
  .notices{
     width: 610rpx;
     height: 96rpx;
     background-color: #FFFFFF;
     border-radius: 12rpx;
     margin-left: 40rpx;
     margin-top: 30rpx;
     display: flex;
     padding: 30rpx;
   }
   .noticesImg{
     width: 88rpx;
     height: 88rpx;
     border-radius: 16rpx;
     background-color: rgba(2, 102, 188, 100);
     position: relative;
   }
   .noticesImg image{
     width: 36rpx;
     height: 36rpx;
     margin-top: 26rpx;
     margin-left: 26rpx;
   }
   .noticesText{
     width:450rpx;
     color: rgba(16, 16, 16, 100);
     font-size: 26rpx;
     text-align: left;
     font-family: PingFangSC-regular;
     margin-left: 24rpx;
     margin-right: 50rpx;
     font-weight: 500;
   }
   .noticesNum{
     position: absolute;
     width: 42rpx;
     height: 42rpx;
     border-radius: 50%;
     background-color: red;
     text-align: center;
     line-height: 42rpx;
     color: #FFFFFF;
     font-size:24rpx;
     top:-15rpx;
     right:-15rpx;
   }
   .maincover {
   	width: 750rpx;
   	height: 100vh;
   	background-color: rgba(0, 0, 0, 0.46);
   	position: fixed;
   	top: 0;
   	left: 0;
   }

   .covertask_pos {
   	width: 100%;
   	margin-top: 350rpx;
   }

   .covertask_one {
   	width: 670rpx;
   	height: 150rpx;
   	line-height: 150px;
   	border-radius: 12rpx;
   	text-align: center;
   	background-color: #FFFFFF;
   	margin-left: 40rpx;
   }

   .covertask_two {
   	width: 670rpx;
   	height: 150rpx;
   	line-height: 150rpx;
   	border-radius: 6px;
   	text-align: center;
   	background-color: #FFFFFF;
   	margin-top: 30rpx;
   	margin-left: 40rpx;
   }
   .minList_children{
     display:flex;
     line-height:48rpx;
     margin-left:200rpx;
     margin-top: 20rpx;
   }
   .minList_children image{
     width:48rpx;
     height:48rpx;
   }
   .minList_textnum{
     color: rgba(0, 187, 174, 100);
     font-size: 28rpx;
     font-family: PingFangSC-regular;
   }
</style>
