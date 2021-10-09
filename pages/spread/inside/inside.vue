<template>
	<view>
		<div class="w90p  h30 m0auto disflex jsaround" style="background-color: #FFFFFF;">
			<div :class="tabType == 1 ? 'wrap':'arr'" @click="tab_type_tap(1)">我发布的</div>
			<div :class="tabType == 2 ? 'wrap':'arr'" @click="tab_type_tap(2)">我承接的</div>
			<!-- <div :class="tabType == 3 ? 'wrap':'arr'" @click="tab_type_tap(3)">开放任务</div> -->
		</div>
		<div v-if="tabType==1" class="task" style="padding-bottom: 84rpx;">
			<view class="mainlist" @click="toTaskDetail(item.taskCustomerId)" v-for="(item,index) in tasklist"
				:key="index">
				<view class="taskinfo">
					<view class="taskinfo_title">{{item.taskName}}</view>
					<view class="taskinfo_money">金额：{{item.rewardAmount}}元</view>
					<!-- <view class="taskinfo_status">进行中</view> -->
					<view class="taskinfo_status" v-show="item.taskState == 0">待发布</view>
					<view class="taskinfo_status" v-show="item.taskState == 1">发布中</view>
					<view class="taskinfo_status" v-show="item.taskState == -1">已过期</view>
					<view class="taskinfo_status" v-show="item.taskState == 2">进行中</view>
					<view class="taskinfo_status" v-show="item.taskState == 3">已结束</view>
					<view class="taskinfo_status" v-show="item.taskState == 5">申请验收中</view>
				</view>
				<view class="taskinfo_text">任务内容：{{item.taskContent}}</view>
				<view class="taskinfo_times">任务结束时间：{{item.startTime}}</view>
				<view class="taskinfo_bottom">
					<view class="taskinfo_bottom_company">
						<image :src="item.taskCreateCompanyLogo" mode=""></image>
						<view class="taskinfo_bottom_companyname">{{item.taskCreateCompanyName}}</view>
					</view>
				</view>
				<view class="opnetime">发布于{{item.releaseTime}}</view>
			</view>

		</div>
		<div v-if="tabType==2" class="task" style="padding-bottom: 84rpx;">
			<view class="mainlists" @click="toBiddingTask(item.taskCustomerId)" v-for="(item,index) in biddingList"
				:key="index">
				<view class="taskinfo">
					<view class="taskinfo_title">{{item.taskName}}</view>
					<view class="taskinfo_moneys">{{item.rewardAmount}}元</view>
				</view>
				<view class="taskinfo_times">任务结束时间：{{item.finishTime}}</view>
				<view class="task_information mt20 fs14 ">
					<div>任务内容：{{item.taskContent}}</div>
					<!-- <div style="margin-left: 100rpx; margin-top: 20rpx;">{{item.taskContent}}</div> -->
				</view>
				<view class="task_ings" v-show="item.taskState == 0">————待发布————</view>
				<view class="task_ings" v-show="item.taskState == 1">————发布中————</view>
				<view class="task_ings" v-show="item.taskState == -1">————已过期————</view>
				<view class="task_ings" v-show="item.taskState == 2">————进行中————</view>
				<view class="task_ings" v-show="item.taskState == 3">————已结束————</view>
				<view class="task_ings" v-show="item.taskState == 5">————申请验收中————</view>
			</view>

		</div>
		<div v-if="tabType==3" class="task" style="padding-bottom: 84rpx;">
			<!-- <div style="font-size: 30rpx;text-align: center;">正在开发中</div> -->
			<view class="mainlist" @click="toTaskDetail">
				<view class="taskinfo">
					<view class="taskinfo_title">平台视频转发任务</view>
					<view class="taskinfo_money">金额：100元</view>
				</view>
				<view class="taskinfo_bottom">
					<view class="taskinfo_time">
						<view class="taskinfo_time_text"><text class="square"></text>2021-06-07</view>
						<view class="taskinfo_time_text"><text class="square"></text></view>
						<view class="taskinfo_time_text"><text class="square"
								style="border: 1px solid orange"></text>2021-06-07</view>
					</view>
				</view>

				<view class="task_ings">
					————进行中————
				</view>

			</view>
		</div>
		<view class="task_button" @click="task_button">
			发布内部任务
		</view>
	</view>
</template>

<script>
	import WXAJAX from '../../../utils/request.js'
	export default {
		data() {
			return {
				tabType: 1,
				title: '发布任务',
				taskPageNum: 1,
				tasklist: '',
				biddingList: [],
			}
		},
		onLoad() {
			this.gettasklist()
			this.getBidding()
		},

		methods: {
			//跳转到任务详情页
			toTaskDetail(taskCustomerId) {
				uni.navigateTo({
					url: '/pages/demand/taskDetail/taskDetail?taskCustomerId=' + taskCustomerId + "&taskType=1"

				})
			},
			tab_type_tap(i) {
				this.tabType = i
			},
			getBidding() {
				var cardId = uni.getStorageSync('cardId')
				let url = "/customerEssay/queryMyTask"
				let data = {
					type: 1,
					queryType: 1,
					taskType: 1,
					cardId: cardId,
					pageNum: this.pageNum
				}
				WXAJAX.POST(data, '', url).then((res) => {
					if (this.pageNum == 1) {
						this.biddingList = res.list
					} else {
						this.biddingList = [...this.biddingList, ...res.list]
					}
					if (this.biddingList.length < this.pageSize) {
						this.addOpen = true
					} else {
						this.addOpen = false
					}
					for (var i = 0; i < this.biddingList.length; i++) {
						this.biddingList[i].finishTime = this.biddingList[i].startTime
					}
				})
			},
			//跳转到我竞标的页面
			toBiddingTask(taskCustomerId) {
				wx.navigateTo({
					url: '../../demand/taskDeil/taskDeil?taskCustomerId=' + taskCustomerId
				})
			},
			task_button() {
				uni.navigateTo({
					url: '../../demand/newTask/newTask?taskType=1'
				})
			},
			// 获取任务列表
			gettasklist() {
				let url = "/customerEssay/queryMyTask"
				let data = {
					type: 2,
					taskType: 1,
					queryType: 1,
					pageNum: this.taskPageNum
				}
				WXAJAX.POST(data, '', url, "", "").then((res) => {
					console.log(res, "获取任务列表");
					this.tasklist = res.list
					var year = ''
					var month = ''
					var day = ''
					for (var i = 0; i < this.tasklist.length; i++) {
						year = this.tasklist[i].createdTime.split(' ')[0].split('-')[0]
						month = this.tasklist[i].createdTime.split(' ')[0].split('-')[1]
						day = this.tasklist[i].createdTime.split(' ')[0].split('-')[2]
						this.tasklist[i].releaseTime = year + '年' + month + '月' + day + '日'
					}
				})

			}

		}
	}
</script>

<style>
	.opnetime {
		position: absolute;
		bottom: -40rpx;
		height: 36rpx;
		color: rgba(181, 181, 181, 100);
		font-size: 24rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.taskinfo {
		width: 100%;
		display: flex;
		justify-content: space-between;
		line-height: 46rpx;
	}

	.taskinfo_bottom {
		width: 642rpx;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
    /* margin-top:50rpx; */
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

	.taskinfo_bottom_companyname {
		width: 312rpx;
		height: 36rpx;
		color: rgba(143, 143, 143, 100);
		font-size: 24rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-left: 12rpx;
	}

	.taskinfo_bottom_company {
		width: 450rpx;
		height: 48rpx;
		line-height: 48rpx;
		display: flex;
		margin-top: 20rpx;
	}

	.taskinfo_bottom_company image {
		width: 48rpx;
		height: 48rpx;
	}

	.task_rule {
		width: 628rpx;
		height: 134rpx;
		color: rgba(143, 143, 143, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-left: 32rpx;
		margin-top: 20rpx;
	}

	.mainlist {
		background-color: #FFFFFF;
		margin-top: 30rpx;
		border-radius: 20rpx;
	}

	.taskinfo_time_text {
		height: 33rpx;
		line-height: 33rpx;
		color: rgba(143, 143, 143, 100);
		font-size: 20rpx;
	}

	.taskinfo_money {
		/* width: 146rpx; */
		height: 38rpx;
		color: rgba(143, 143, 143, 100);
		font-size: 26rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.square {
		width: 12rpx;
		height: 12rpx;
		margin-right: 15rpx;
		border: 1px solid #c4f1ee;
		border-radius: 50%;
		display: inline-block;
	}

	.task_button {
		position: fixed;
		bottom: 0rpx;
		width: 750rpx;
		height: 84rpx;
		line-height: 20px;
		background-color: rgba(26, 208, 156, 100);
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		line-height: 84rpx;
		text-align: center;
		font-family: Arial;
		color: #FFFFFF;
	}

	.task {
		margin: 0 auto;
		margin-top: 30rpx;
		border-radius: 20rpx;

	}

	.arr {
		width: 140rpx;
		height: 100%;
		border: 1px #0066CC;
		color: rgba(143, 143, 143, 100);
		font-size: 28rpx;
		text-align: center;
		line-height: 60rpx;
		font-family: PingFangSC-regular;

	}

	.wrap {
		width: 140rpx;
		height: 100%;
		color: rgba(26, 208, 156, 100);
		font-size: 32rpx;
		text-align: center;
		line-height: 60rpx;
		font-family: PingFangSC-bold;
		border-bottom: 2px solid rgba(0, 215, 208, 100);

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

	.taskinfo_moneys {
		height: 38rpx;
		color: rgba(143, 143, 143, 100);
		font-size: 26rpx;
		text-align: left;
		font-family: PingFangSC-regular;


	}

	.task_ings {
		font-size: 28rpx;
		margin-left: 140rpx;
		margin-top: 40rpx;
	}

	.taskinfo_time {
		width: 146rpx;
		height: 100rpx;
	}

	.mainlist {
		width: 642rpx;
		height: 320rpx;
		line-height: 40px;
		border-radius: 12px;
		/* text-align: center; */
		background-color: #FFFFFF;
		padding: 14rpx;
		position: relative;
		margin-bottom: 104rpx;
		margin-left: 40rpx;
	}

	.mainlists {
		margin-top: 20rpx;
		width: 642rpx;
		/* height: 550rpx; */
		line-height: 40px;
		border-radius: 12px;
		/* text-align: center; */
		background-color: #FFFFFF;
		padding: 14rpx;
		position: relative;
		margin-bottom: 40rpx;
		margin-left: 40rpx;
	}


	.taskinfo_times {
		font-size: 28rpx;
		width: 642rpx;
		color: rgba(143, 143, 143, 100);
	}
</style>
