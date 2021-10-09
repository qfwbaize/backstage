<template>

	<view class="content">
		<!-- 详情 -->
		<view class="mainlist">

			<view class="taskinfo">
				<view class="squares"></view>
				<view class="taskinfo_title">{{meAcceptList.taskName}}</view>
				<view class="taskinfo_money">金额：{{meAcceptList.rewardAmount}}元</view>

				<view class="taskinfo_status" v-show="meAcceptList.taskState == 1">发布中</view>
				<view class="taskinfo_status" v-show="meAcceptList.taskState == -1">已过期</view>
				<view class="taskinfo_status" v-show="meAcceptList.taskState == 2">进行中</view>
				<view class="taskinfo_status" v-show="meAcceptList.taskState == 3">已结束</view>
				<view class="taskinfo_status" v-show="meAcceptList.taskState == 5">申请验收中</view>
			</view>

			<view class="detailtext">
				<view class="squares" style=" margin-right: 40rpx; background-color: rgba(26, 208, 156, 100);"></view>
				<view class="">任务内容：</view>
			</view>

			<view class="taskinfo_text">{{meAcceptList.taskContent}}</view>

			<view class="taskcom">
				<view class="squares" style=" margin-right: 40rpx; background-color: rgba(7, 140, 254, 100);"></view>
				<view class="">发布机构</view>
			</view>
			<view class="taskinfo_bottom_company">
				<image @click="preview(meAcceptList.companyLogo)" :src=meAcceptList.companyLogo mode=""></image>
				<view class="taskinfo_bottom_companyname">{{meAcceptList.companyName}}</view>
			</view>

			<view :class="meAcceptList.urlList.length == 0 ? 'detailtexts' : 'detailtext'">
				<view class="squares" style=" margin-right: 40rpx; background-color: rgba(237, 173, 2, 100);"></view>
				<view class="">任务图片</view>
			</view>

			<view class="detailVideo">
				<!-- <view class="videotext">明医云平台宣传</view> -->
				<view class="detailVideo_img" v-for="(item,index) in meAcceptList.urlList" :key="index">
					<image @click="preview(item)" :src=item mode=""></image>
				</view>

				<!-- <view class="videoBtn">查看详情</view> -->
			</view>

			<view class="detailtext">
				<view class="squares" style=" margin-right: 40rpx; background-color: rgba(237, 173, 2, 100);"></view>
				<view class="">转发内容附件</view>
			</view>

			<view class="detailVideo">
				<view class="videotext">{{enclosure.title}}</view>
				<view v-show="enclosure.type == 3 || enclosure.type == 1 || enclosure.type == 7 || enclosure.type == 2" class="detailVideo_img" v-for="(demo,demoIndex) in enclosure.photoUrl" :key="demoIndex">
					<image @click="preview(demo)" :src=demo mode=""></image>
				</view>

				<video class="videocon" v-show="enclosure.type == 6" :src="enclosure.url" controls></video>
				<view class="videoBtn" v-show="enclosure.type != 7" @click="goDetail(enclosure)">查看详情</view>
			</view>

			<!-- <view class="detailtext">
				<view class="squares" style=" margin-right: 40rpx; background-color: rgba(26, 208, 156, 100);"></view>
				<view class="">任务期限</view>
			</view> -->

			<!-- <view class="taskinfo_time">
				<view class="taskinfo_time_text"><text class="square"></text>{{tasklist.startTime}}</view>
				<view class="taskinfo_time_text"><text class="square" style="border: 1px solid #F0F0F0;"></text></view>
				<view class="taskinfo_time_text"><text class="square"
						style="border: 1px solid orange"></text>{{tasklist.endTime}}
				</view>
			</view> -->

			<view class="taskinfo_times">任务结束时间：{{meAcceptList.finishTime}}</view>

			<view class="opnetime">发布于{{meAcceptList.releaseTime}}</view>

			<view class="" v-if="meAcceptList.taskContract">
				<view v-show="meAcceptList.taskState == 1">
					<view>合同文件：</view>
					<view class="contractImg">
						<view class="contractImg_list" v-for="(urlItem,urlIndex) in meAcceptList.taskContract.urls"
							:key='urlIndex'>
							<image @click="preview(urlItem)" :src=urlItem mode=""></image>
						</view>
					</view>
					<view class="buttton" v-if="show == false" @click="acceptTask">接受合同</view>

				</view>
			</view>
			<view v-show="meAcceptList.taskContract||meAcceptList.taskType==1||meAcceptList.taskType==0">
				<!-- 添加进度信息列表 -->
				<view class="" style="padding: 10rpx 0 10rpx 0;"
					v-show="meAcceptList.taskState != 3&&meAcceptList.taskState != 1">任务完成情况</view>
				<view class="progressList" v-for="(item,index) in taskCompleteList" :key='index'>
					<view class="progressList_top">
						<view class="progressListImg">
							<image :src=userNameLogo mode=""></image>
						</view>
						<view>{{item.userName}}</view>
						<view style="margin-left: 188rpx;">任务完成度：{{item.progressScale}}%</view>
					</view>
					<view class="progressList_bottom">
						<view class="progressList_bottom_img" v-for="(s,k) in item.urlList" :key='k'>
							<image @click="preview(s)" :src=s mode=""></image>
						</view>
						<view class="spot">{{item.urlList.length}}</view>
					</view>
          <div class="time" style="padding-bottom: 50rpx;">
          	<div class="title c38">进度描述</div>
            <view style="width: 630rpx;padding: 20rpx; background-color: #F5F5F5;margin-top: 20rpx;">{{item.progressDesc}}</view>
          </div>
				</view>

				<view class="buttton" @click="toAddTaskSpeed"
					v-show="meAcceptList.taskState != 3&&meAcceptList.taskState != 1">添加任务完成记录</view>
					<!-- 如果跳到计次任务times == 1 -->
				<view class="buttton" @click="toCollect"
					v-show="meAcceptList.taskState != 3&&meAcceptList.taskState != 1">验收申请</view>

				<view class="" style="padding: 10rpx 0 10rpx 0;"
					v-show="receiptVoucher.length > 0 && meAcceptList.taskState != 3&&meAcceptList.taskState != 1">打款凭证
				</view>
				<view class="contractImg">
					<view class="contractImg_list" v-for="(a,b) in receiptVoucher" :key='b'>
						<image @click="preview(a)" :src=a mode=""></image>
					</view>
				</view>

        <div class="content-bottom" v-show="receiptVoucher.length > 0">
        	<div class="content-bottom-left c78">
        		收款金额
        	</div>
        	<div class="content-bottom-right c38" >
              <span class="h16 mt2 ml7" >{{addMoney}} 元</span>
        	</div>
        </div>

				<!-- <view class="buttton" @click="finish" v-show="meAcceptList.taskState != 3&&meAcceptList.taskState != 1">确认已打款</view> -->
				<view class="buttton" @click="finish"
					v-show="receiptVoucher.length > 0 && meAcceptList.taskState != 3&&meAcceptList.taskState != 1">确认已打款
				</view>
			</view>
		</view>
    <!-- <view class="sonTask">
      <view class="">发布内部任务</view>
      <view class="">发布外部任务</view>
      <view class="">发布平台任务</view>
    </view> -->
	</view>
</template>

<script>
	import WXAJAX from '../../../utils/request.js'
	import util from '@/utils/index';
	export default {
		data() {
			return {
				idx: 0,
				tasklist: '',
				taskCustomerId: '',
				tenderDescribe: '',
				isBoss: false,
				Personnel: '',
				logo: '',
				choose_company: '',
				type: 1,
				taskCustomerId: 0,
				userId: 0,
				meAcceptList: {},
				taskCompleteList: [],
				userNameLogo: '',
				show: false,
				receiptVoucher: [],
				companyId: '',
				dynamicId: '',
				enclosure: [],
				times:'',//计时任务的完成情况
        addMoney:''
			}
		},
		onLoad(option) {
			// this.gettasklist()
			this.taskCustomerId = option.taskCustomerId
		},
		onShow() {
			this.getMeTask()
			this.userNameLogo = uni.getStorageSync('avatarUrl')
		},
		methods: {
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
			//完成任务
			finish() {
				var data = {
					taskCustomerId: this.meAcceptList.taskCustomerId,
					taskState: 3,
				}
				WXAJAX.POST(data, '', '/customerEssay/updateTaskStateById', '', '').then(res => {
					uni.showToast({
						title: '任务完成',
						icon: 'none',
						duration: 3000
					})
				})
			},
			//查询添加进度记录列表
			getTaskComplete() {
				var data = {
					taskId: this.meAcceptList.taskCustomerId,
					taskStaffId: this.meAcceptList.taskStaffId,
					userId: uni.getStorageSync('cardId')
				}
				WXAJAX.POST(data, '', '/customerEssay/queryListTaskProgress', '', '').then(res => {
					this.taskCompleteList = res.list
					for (var i = 0; i < this.taskCompleteList.length; i++) {
						this.taskCompleteList[i].urlList = []
						this.taskCompleteList[i].urlList = this.taskCompleteList[i].progressUrl.split(',')
					}
					// console.log(this.taskCompleteList, 777777)
				})
			},
			//跳转到添加进度页面
			toAddTaskSpeed() {
				uni.navigateTo({
					url: '../taskRecord/taskRecord?taskId=' + this.meAcceptList.taskCustomerId +
						'&taskStaffId=' + this.meAcceptList.taskStaffId + "&times=" + this.times
				})
			},
			//修改合同状态
			acceptTask() {
				this.show = true
				var data = {
					taskContractId: this.meAcceptList.taskContract.taskContractId,
					taskId: this.meAcceptList.id,
					contractStatus: 1
				}
				WXAJAX.POST(data, '', '/task/contract/update', '', '', 1).then(res => {
					console.log(res)
					uni.showToast({
						title: '签订成功',
						icon: 'none',
						duration: 3000
					})
					this.getMeTask()
				})
			},
			//获取详情信息
			getMeTask() {
				WXAJAX.POST({
					taskCustomerId: this.taskCustomerId,
				}, '', '/customerEssay/queryTaskCustomer', '', '').then(res => {
					// this.companyId = res.companyId
					this.dynamicId = res.dynamicId
					this.getEnclosure(this.dynamicId)
					this.meAcceptList = res
          this.addMoney = this.meAcceptList.paymentAmount
					this.meAcceptList.finishTime = this.meAcceptList.startTimeStr.split(' ')[0]
					this.meAcceptList.createTime = this.meAcceptList.createdTime.split('T')[0]
					var year = ''
					var month = ''
					var day = ''
					year = this.meAcceptList.createTime.split(' ')[0].split('-')[0]
					month = this.meAcceptList.createTime.split(' ')[0].split('-')[1]
					day = this.meAcceptList.createTime.split(' ')[0].split('-')[2]
					this.meAcceptList.releaseTime = year + '年' + month + '月' + day + '日'
					this.meAcceptList.urlList = []
					this.meAcceptList.urlList = this.meAcceptList.attachmentUrl.split(',')


					if (this.meAcceptList.taskContract) {
						this.meAcceptList.taskContract.urls = []
						this.meAcceptList.taskContract.urls = this.meAcceptList.taskContract.contractUrl.split(',')
					}

					if (res.receiptVoucher) {
						this.receiptVoucher = res.receiptVoucher.split(',')
					}




					this.getTaskComplete()
				})
			},
			// 跳转到名片详情
			taskcard(i) {
				this.cardId = i
				uni.navigateTo({
					url: '/pages/companyPack/find/businessCardinfo/main?cardId=' + this.cardId
				})
			},
			// 查询任务
			async gettasklist() {
				let url = "/customerEssay/queryMyTask"
				let data = {
					type: 2,
					queryType: 1,
					pageNum: 1,
				}
				await WXAJAX.POST(data, "", url, "", "").then((res) => {

					this.tasklist = res.list[this.idx]

					this.taskCustomerId = this.tasklist.taskCustomerId
					// this.tenderDescribe = this.tasklist.taskContent
				})
				this.getPersonnel()
			},
			getPersonnel() {

				let url = "/task/tender/queryPage"
				let data = {
					taskId: this.taskCustomerId
				}
				WXAJAX.POST(data, '', url, '', '', 1).then((res) => {
					// console.log(res, "分页查询任务竞标人员");
					this.Personnel = res.list
				})
			},
			// 接任务
			async addtask() {
				let url = "/task/tender/add"
				let data = {
					taskId: this.taskCustomerId,
					tenderDescribe: this.tenderDescribe,
					is_del: 0,
					tenderStatus: 0
				}
				await WXAJAX.POST(data, '', url, '', '', 1).then((res) => {
					console.log(res, "");
				})
			},
			//申请验收
			toCollect() {
				var data = {
					taskCustomerId: this.meAcceptList.taskCustomerId,
					taskState: 5, //申请验收
				}
				WXAJAX.POST(data, '', '/customerEssay/updateTaskStateById', '', '').then(res => {
					uni.showToast({
						title: '已申请验收',
						icon: 'none',
						duration: 3000
					})
				})
			},
			//获取文章详情页
			getEnclosure(dynamicId) {
				let params = {
					dynamicId: dynamicId,
				}
				WXAJAX.POST(params, '', '/dynamic/getDynamicDetail', '', '', 1).then(res => {
					this.enclosure = res
					this.enclosure.photoUrl = []
					this.enclosure.photoUrl = this.enclosure.photos.split(',')
					// console.log(this.enclosure,99999999)
				})
			},
		}
	}
</script>

<style scoped>
	.reward {
		width: 160rpx;
		height: 50rpx;
		background-color: rgba(26, 208, 156, 100);
		border-radius: 12rpx;
		line-height: 50rpx;
		text-align: center;
		color: rgba(255, 255, 255, 100);
		font-size: 24rpx;
		margin-top: 20rpx;
		margin: 0 auto;
	}

	.card {
		width: 90%;
		margin: 0 auto;
	}

	.cards {
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
		height: 100%;
		/* background-color: #FFFFFF; */
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
		width: 96rpx;
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
		width: 642rpx;
		height: 134rpx;
		color: rgba(143, 143, 143, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-top: 20rpx;
		margin-left: 60rpx;
	}

	.taskinfo_bottom_company {
		width: 450rpx;
		height: 48rpx;
		line-height: 48rpx;
		display: flex;
		margin-top: 10rpx;
	}

	.taskinfo_bottom_company image {
		width: 48rpx;
		height: 48rpx;
		margin-left: 60rpx;
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
		/* margin-left: 60rpx; */
	}

	.taskinfo_time {
		width: 146rpx;
		height: 100rpx;
		margin-left: 60rpx;
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
		font-weight: bold;
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
		margin-left: 60rpx;
		overflow: hidden;
	}

	.videotext {
		height: 40px;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-bold;
		margin: 20rpx 0;
		margin-left: 36rpx;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
	}

  .videocon{
    width: 424rpx;
    height: 234rpx;
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
		margin-top: 156rpx;
	}

	.taskcom {
		display: flex;
		height: 46rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
		text-align: left;
		font-family: PingFangSC-bold;
		font-weight: bold;
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

	.taskinfo_times {
		font-size: 28rpx;
		width: 642rpx;
		color: rgba(143, 143, 143, 100);
		margin: 40rpx 0;
	}

	.buttton {
		width: 670rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		border-radius: 12rpx;
		color: #FFFFFF;
		background-color: #03D3C5;
		margin-bottom: 20rpx;
	}

	.contractImg {
		width: 670rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.contractImg_list {
		width: 325rpx;
		height: 234rpx;
		margin-bottom: 20rpx;
	}

	.contractImg_list image {
		width: 100%;
		height: 100%;
	}

	.progressList {
		width: 670rpx;
	}

	.progressList_top {
		width: 670rpx;
		height: 62rpx;
		line-height: 62rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28px;
		font-family: PingFangSC-regular;
		display: flex;
	}

	.progressListImg {
		width: 62rpx;
		height: 62rpx;
		margin-right: 20rpx;
	}

	.progressListImg image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.progressList_bottom {
		width: 670rpx;
		display: flex;
		/* justify-content: space-between; */
		flex-wrap: wrap;
		margin-top: 28rpx;
		position: relative;
	}

	.progressList_bottom_img {
		width: 150rpx;
		height: 150rpx;
		margin-bottom: 20rpx;
		margin-right: 20rpx;
	}

	.progressList_bottom_img:nth-child(4n) {
		margin-right: 0rpx;
	}

	.progressList_bottom_img image {
		width: 100%;
		height: 100%;
	}

	.spot {
		width: 48rpx;
		height: 48rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 48rpx;
		border-radius: 8rpx 0px 0px 0px;
		font-size: 20rpx;
		background-color: rgba(0, 0, 0, 0.41);
		position: absolute;
		right: 0;
		bottom: 0;
	}
  .content-bottom {
  	height: 88upx;
  	display: flex;
  	justify-content: space-between;
  	align-items: center;
  	font-size: 28upx;
  }

  .content-bottom-right {
  	display: flex;
  }
  .numinput {
  	padding-right: 32upx;
  	text-align: right;
  }
  .sonTask{
    position: fixed;
    top: 60%;
    right: 0;
    background-color:#1ad09c;
  }
</style>
