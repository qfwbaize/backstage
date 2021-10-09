<template>
  <view class="content">

    <view class="mainlist">

      <view class="taskinfo">
        <view class="squares"></view>
        <view class="taskinfo_title">{{missionDetail.title}}</view>
        <view class="taskinfo_money">金额：{{missionDetail.money}}元</view>
        <view class="taskinfo_status">
          <state :status='missionDetail.status'></state>
        </view>
      </view>

      <view class="detailtext">
        <view class="squares" style=" margin-right: 40rpx; background-color: rgba(26, 208, 156, 100);"></view>
        <view class="">任务内容</view>
      </view>

      <view class="taskinfo_text">{{missionDetail.content}}</view>

      <view class="detailtext">
        <view class="squares" style=" margin-right: 40rpx; background-color: rgba(26, 208, 156, 100);"></view>
        <view class="">完成标准</view>
      </view>

      <view class="taskinfo_text">{{missionDetail.explain}}</view>

      <view class="taskcom">
        <view class="squares" style=" margin-right: 40rpx; background-color: rgba(7, 140, 254, 100);"></view>
        <view>发布人</view>
      </view>
      <view class="taskinfo_bottom_company">
        <image
          :src=missionDetail.logo
          mode=""></image>
          <view>
            <view style="display: flex;justify-content: space-between;">
              <view class="taskinfo_bottom_companyname">{{missionDetail.name}}</view>
            </view>
            <view class="taskinfo_bottom_companyname">{{missionDetail.company_name}}</view>
          </view>

      </view>


      <view class="detailtext">
        <view class="squares" style=" margin-right: 40rpx; background-color: rgba(237, 173, 2, 100);"></view>
        <view class="">转发内容附件</view>
      </view>

      <view class="detailVideo">
        <view class="videotext" style="">{{enclosure.title}}</view>
        <view v-show="enclosure.type == 3 || enclosure.type == 1 || enclosure.type == 7 || enclosure.type == 2"
          class="detailVideo_img" v-for="(demo,demoIndex) in enclosure.photoUrl" :key="demoIndex">
          <image :src=demo mode=""></image>
        </view>

        <video class="videocon" v-show="enclosure.type == 6" :src="enclosure.url" controls></video>
        <view class="videoBtn" v-show="enclosure.type != 7" @click="goDetail(enclosure)">查看详情</view>
      </view>


      <view class="detailtext">
        <view class="squares" style=" margin-right: 40rpx; background-color: rgba(26, 208, 156, 100);"></view>
        <view class="">任务期限</view>
      </view>
      <view class="minList_center_left">
        <view style="color: #f5f5f5;margin-right: 15rpx;">
          <Circle></Circle>
        </view>
        <view>
          <view class="minList_center_right_people">{{missionDetail.start_time}}</view>
          <view class="minList_center_right_people" style="margin-top: 32rpx;">{{missionDetail.end_time}}</view>
        </view>
      </view>
      <!-- <view class="opentime">发布于2021年6月5日</view> -->

      <view class="detailtext" v-if="type != 1">
        <view class="squares" style=" margin-right: 40rpx; background-color: rgba(26, 208, 156, 100);"></view>
        <view style="width: 280rpx;">指定人（{{peopleList.length}}人）</view>
        <view class="many">显示全部</view>
      </view>

      <view class="contract" v-if="type != 1">
        <view class="contract_top" v-for="(peopleItem,peopleIndex) in peopleList" :key="peopleIndex">
          <image :src=peopleItem.logo mode=""></image>
          <view class="contract_top_text">{{peopleItem.name}}</view>
          <view class="contract_status" style="margin-right: 0;">
            <state :status='peopleItem.status'></state>
          </view>
          <view class="contract_statusDetail" style="margin-right: 0;" @click="toProgressDetail(peopleItem.card_id,peopleItem.id,peopleItem.task_id)">查看详情</view>
        </view>
      </view>

      <view class="finish" v-show="missionDetail.status == 4">
        <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/missionDui.png" mode=""></image>
      </view>

      <view class="btn" v-show="missionDetail.status !== 4" @click="toFinish">完成任务</view>

      <view class="task_button" v-if="missionDetail.status == 4">
        <view class="establish_new">共打款{{missionDetail.dk_money}}</view>
        <view class="establish_new" style="color: #FFFFFF;background-color:#00BBAE;" @click="toEvidence">查看证据</view>
      </view>



      <view class="detailtext" v-if="type == 1">
        <view class="squares" style=" margin-right: 40rpx; background-color: rgba(26, 208, 156, 100);"></view>
        <view style="width: 280rpx;">任务进度</view>
        <view class="many" style="margin-left:200rpx;">显示全部</view>
      </view>

     <view class="contract" v-if="type == 1" v-for="(item,index) in evidenceInfo" :key="index">
        <view class="contract_speed" style="margin:20rpx 0;">
          <view class="" v-for="(s,k) in item.imgUrl" :key="k">
            <image :src=s mode=""></image>
          </view>
          <!-- <view class="contract_speed_num">+21</view> -->
        </view>
        <div>
        	<div class="title c38">进度描述:</div>
          <div style="width:560rpx;margin-top: 20rpx;margin-bottom: 20rpx;color:rgba(143, 143, 143, 100);">{{item.explain}}</div>
        </div>
      </view>

    </view>
  </view>
</template>

<script>
  import http from "../../../utils/http"
  import WXAJAX from '../../../utils/request.js';
  import circle from "@/components/circle";
  import state from "@/components/state";
  export default {
    components: {
      circle,
      state
    },
    data() {
      return {
        id:'',
        missionDetail:'',
        enclosure:'',
        peopleList:[],
        evidenceInfo:[],//任务进度列表
        type:''
      }
    },
    onLoad(options) {
      this.id = options.id
      this.type = options.type
      this.getMissionDetail(this.id)
      this.getMissionPeople(this.id)
    },
    methods: {
      //点击完成任务
      toFinish(){
        var data = {
          id:this.missionDetail.id,
          status:4
        }
        http({url:'/apis/companytask/task_update',method:'PUT',data:data}).then(res=>{
          if(res.data.code = 200){
            uni.showToast({
              title:'任务已完成',
              icon:'none'
            })
          }
        })
      },
      //获取任务进度
      getEvidenceInfo(id){
        var data = {
          id:id,
          page:1,
          limit:10
        }
        http({url:'/apis/companytask/evidence',method:'GET',data:data}).then(res=>{
          if(res.data.code = 200){
            this.evidenceInfo = res.data.data
            this.evidenceInfo.forEach(item=>{
              item.imgUrl = []
              item.imgUrl = item.evidence.split(',')
            })
            // console.log(res,333333333)
          }
        })
      },
      //查看证据
      toEvidence(){
        uni.navigateTo({
          url:'../missionEvidence/missionEvidence?task_id='+this.missionDetail.id
        })
      },
      //跳转到员工任务进度详情
      toProgressDetail(e,id,taskid){
        uni.navigateTo({
          url:'../progressDetail/progressDetail?cardId='+e+'&id='+id+'&taskId='+taskid+'&type='+this.missionDetail.type
        })
      },
      //获取任务指定人的列表
      getMissionPeople(id){
        var data = {
          task_id:id
        }
        http({url:'/apis/companytask/task_people',method:'GET',data:data}).then(res=>{
          if(res.data.code = 200){
            this.peopleList = res.data.data
            // console.log(this.peopleList,22222222222)
          }
        })
      },
      //获取任务详情
      getMissionDetail(id){
        var data = {
          id:id
        }
        http({url:'/apis/companytask/read',method:'GET',data:data}).then(res=>{
          if(res.data.code = 200){
            this.missionDetail = res.data.data
            this.getEvidenceInfo(this.missionDetail.id)
            this.getEnclosure(this.missionDetail.pro_id)
            // console.log(this.missionDetail,8888888888)
          }
        })
      },
      //获取文章详情页
      getEnclosure(dynamicId) {
      	let params = {
      		dynamicId: dynamicId,
      	}
      	WXAJAX.POST(params, '', '/dynamic/getDynamicDetail', '', '', 1).then(res => {
      		this.enclosure = res
      		if (this.enclosure.type !== 4) {
      			this.enclosure.photoUrl = []
      			this.enclosure.photoUrl = this.enclosure.photos.split(',')
      		}
      	})
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
    }
  }
</script>

<style scoped>
  .minList_center_left {
    width: 182rpx;
    height: 110rpx;
    display: flex;
    margin-left: 42rpx;
    margin-top: 15rpx;
  }

  .minList_center_right_people {
    color: rgba(143, 143, 143, 100);
    font-size: 26rpx;
    text-align: left;
    font-family: PingFangSC-regular;
  }


  .content {
    width: 670rpx;
    min-height: 100vh;
    background-color: #FFFFFF;
    padding: 40rpx;
    position: relative;
    padding-bottom: 84rpx;
  }

  .mainlist {
    width: 100%;
    height: 100%;
    position:relative;
    margin-bottom: 84rpx;
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
  }

  .taskinfo_status {
    width: 125rpx;
    height: 42rpx;

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
    width: 600rpx;
    color: rgba(143, 143, 143, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-top: 20rpx;
    margin-left: 60rpx;
  }

  .taskinfo_bottom_company {
    height: 80rpx;
    display: flex;
    margin-top: 10rpx;
  }

  .taskinfo_bottom_company image {
    width: 80rpx;
    height: 80rpx;
    margin-left: 60rpx;
    border-radius: 50%;
  }

  .taskinfo_bottom_companyname {
    width: 400rpx;
    height: 36rpx;
    color: rgba(143, 143, 143, 100);
    font-size: 24rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-left: 12rpx;
  }

  .detailtext {
    height: 46rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 32rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-top: 32rpx;
    display: flex;
    font-weight: bold;
  }


  .detailVideo {
    width: 496rpx;
    /* height: 206rpx; */
    line-height: 40px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0px 4rpx 12rpx 0px rgba(0, 0, 0, 0.4);
    /* padding: 20rpx; */
    margin-top: 16rpx;
    margin-left: 60rpx;
    overflow: hidden;
  }

  .videotext {
    width: 400rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: PingFangSC-bold;
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

  .detailVideo_img image {
    width: 100%;
    height: 100%;
  }

  .videocon {
    width: 424rpx;
    height: 234rpx;
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


  .taskcom {
    display: flex;
    height: 46rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 32rpx;
    text-align: left;
    font-family: PingFangSC-bold;
    font-weight: bold;
    margin-top: 32rpx;
  }

  .squares {
    width: 22rpx;
    height: 22rpx;
    background-color: rgba(26, 208, 156, 100);
    border-radius: 50%;
    margin-top: 12rpx;
  }
  .contact{
    width:96rpx;
    height:42rpx;
    line-height:42rpx;
    border-radius: 12rpx;
    background-color: rgba(0, 187, 174, 100);
    color: rgba(255, 255, 255, 100);
    font-size:24rpx;
    text-align: center;
    font-family: Arial;
  }
  .opentime{
    height: 36rpx;
    color: rgba(181, 181, 181, 100);
    font-size: 24rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-top: 20rpx;
    margin-bottom: 30rpx;
    margin-left: 42rpx;
  }
  .many{
    color: #00BBAE;
    font-weight: normal;
    font-size: 28rpx;
    line-height: 46rpx;
    margin-left: 200rpx;
  }
  .contract{
    width: 600rpx;
    margin-left: 62rpx;
  }
  .contract_top{
    display: flex;
    height: 62rpx;
    line-height: 62rpx;
    margin: 30rpx 0;
    font-size: 28rpx;

  }
  .contract_top image{
    width: 62rpx;
    height: 62rpx;
    border-radius: 50%;
    margin-right: 20rpx;
  }
  .contract_top_text{
    width: 280rpx;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }

  .contract_status{
    width: 96rpx;
    height: 42rpx;
    line-height: 42rpx;
    border-radius: 12rpx;
    background-color: rgba(196, 241, 238, 100);
    color: rgba(0, 187, 174, 100);
    font-size: 24rpx;
    text-align: center;
    font-family: Arial;
    margin-top: 10rpx;
    margin-left: 20rpx;
    margin-right: 72rpx;
  }
  .contract_statusDetail{
    height: 42rpx;
    line-height: 42rpx;
    color: rgba(0, 187, 174, 100);
    font-size: 24rpx;
    text-align: center;
    font-family: Arial;
    margin-top: 10rpx;
    margin-left: 20rpx;
    margin-right: 72rpx;
  }
  .contract_speed{
    display: flex;
    flex-wrap:wrap;
    position: relative;
  }
  .contract_speed image{
    width:140rpx;
    height: 140rpx;
    margin-right:10rpx;
    margin-bottom:20rpx;
  }
  .contract_speed_num{
    position: absolute;
    right: 10rpx;
    bottom: 20rpx;
    width: 48rpx;
    height: 48rpx;
    line-height: 48rpx;
    background-color: rgba(0, 0, 0, 0.68);
    color:#FFFFFF;
    font-size: 28rpx;
    text-align: center;
    font-family: Arial;
  }

  .finish{
    position: absolute;
    top:0;
    right:0;
    width:300rpx;
    height:300rpx;
  }
  .finish image{
    width:300rpx;
    height:300rpx;
  }
  .task_button {
    position: fixed;
    bottom: 0;
    width: 750rpx;
    height: 84rpx;
    display: flex;
    justify-content: space-between;
    margin-left: -40rpx;
  }
  .establish_new{
    flex: 1;
    height: 84rpx;
    line-height:84rpx;
    text-align: center;
    background-color:#FFFFFF;
    color: rgba(0, 187, 174, 100);
    font-size: 28rpx;
    border: 2rpx solid rgba(0, 187, 174, 100);

  }
  .btn{
    position: fixed;
    bottom: 0;
    width: 750rpx;
    height: 84rpx;
    line-height:84rpx;
    text-align: center;
    background-color: rgba(0, 187, 174, 100);
    color: rgba(255, 255, 255, 100);
    font-size: 28rpx;
    margin-left: -40rpx;
  }
</style>
