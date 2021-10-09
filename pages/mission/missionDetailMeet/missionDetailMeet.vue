<template>
  <view class="content">
    <!-- 详情 -->
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
          :src=missionDetail.logo mode=""></image>
          <view>
            <view style="display: flex;justify-content: space-between;">
              <view class="taskinfo_bottom_companyname">{{missionDetail.name}}</view>
              <view class="contact" @click="row_tap(missionDetail.user_id, missionDetail.card_id, missionDetail.logo, missionDetail.name, wxCode, phone, missionDetail.company_id)">联系他</view>
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

      <view class="detailtext" v-if="missionDetail.type == 4">
        <view class="squares" style=" margin-right: 40rpx; background-color: rgba(26, 208, 156, 100);"></view>
        <view>任务合同</view>
      </view>

      <view class="contract" v-if="missionDetail.type == 4">
        <view class="contract_bottom" >
          <view v-for="(item,index) in missionDetail.imgUrl" :key="index">
            <image :src=item mode=""></image>
          </view>
        </view>
      </view>

      <view class="maincover" v-show="show == true" @click="off">
      	<view class="covertask_pos">
      		<view class="covertask_one" @click="toNewTask">发布计次任务</view>
      		<view class="covertask_two" @click.stop="toTimeTask">发布计时任务</view>
      	</view>
      </view>

      <view class="task_button" v-if="status == 0&&missionDetail.type !== 4">
        <view class="establish_new" @click="refuse">拒绝</view>
        <view class="establish_new" @click="receiveMission" style="color: #FFFFFF;background-color:#00BBAE;">接受</view>
      </view>

      <view class="task_btn" v-else  @click="sonMission">创建子任务</view>
      
      <view class="task_btn" v-if="missionDetail.type == 4"  @click="sonMission">创建子任务</view>

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
        show: false, //默认隐藏

      }
    },
    onLoad(options) {
      this.id = options.id
      this.getMissionDetail(this.id)
    },
    onShow() {

    },
    methods: {
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
          url:'../newChildMission/newChildMission?pid='+this.id+'&title='+this.missionDetail.title+'&status='+this.missionDetail.status+"&pattern=1"
        })
      },
      //点击任意关闭
      off() {
      	this.show = false
      },
      //创建子任务
      sonMission(){
        this.show = true

      },
      //拒绝任务
      refuse(){
        var data = {
          id:this.missionDetail.id,
        }
        http({url:'DELETE',method:'DELETE',data:data}).then(res=>{
          if(res.data.code = 200){
            uni.navigateBack({
              delta:1
            })
          }
        })
      },
      //接受任务
      receiveMission(){
        var data = {
          id:this.missionDetail.id,
          status:1
        }
        http({url:'/apis/companytask/task_update',method:'PUT',data:data}).then(res=>{
          if(res.data.code = 200){
            uni.showToast({
              title:'接受成功',
              icon:'none'
            })
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
            this.missionDetail.imgUrl = []
            this.missionDetail.imgUrl = this.missionDetail.contract.split(',')
            this.getEnclosure(this.missionDetail.pro_id)
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
      //联系他
      row_tap(id, cardid, logo, name, wxCode, phone, companyId) {
      	uni.navigateTo({
      		url: '../../IM/main?userId=' + id + '&logo=' + logo + '&type=2&cardId=' + cardid + '&name=' +
      			name +
      			'&wxCode=' + wxCode + '&phone=' + phone + '&companyId=' + companyId
      	})
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
    padding-bottom: 0rpx;
    position: relative;
  }

  .mainlist {
    width: 100%;
    height: 100%;
    padding-bottom:84rpx;
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

  .contract{
    width: 600rpx;
    margin-left: 62rpx;
    margin-top:40rpx;
  }

  .contract_bottom{
    display: flex;
    flex-wrap:wrap;
  }
  .contract_bottom image{
    width:190rpx;
    height:260rpx;
    margin-right:10rpx;
    margin-bottom:20rpx;
  }
 .task_btn {
    position: fixed;
    bottom: 0;
    width: 750rpx;
    height: 84rpx;
    line-height: 84rpx;
    background-color:#00BBAE;
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    line-height: 84rpx;
    text-align: center;
    font-family: Arial;
    color: #FFFFFF;
    margin-left: -40rpx;
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
  .establish{
    width: 750rpx;
    height: 84rpx;
    margin-left: -40rpx;
    margin-top: 200rpx;
    display: flex;
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
 .establish_new{
    flex: 1;
    height: 84rpx;
    line-height:84rpx;
    background-color: rgba(255, 255, 255, 100);
    color:red;
    font-size: 28rpx;
    text-align: center;
    font-family: Arial;
    border: 2rpx solid rgba(0, 187, 174, 100);
  }

</style>
