<template>
	<!-- pages/demand/taskDetail/taskDetail -->
	<view class="content">
		<!-- 详情 -->
		<view class="mainlist">

			<view class="taskinfo">
				<view class="squares"></view>
				<view class="taskinfo_title">{{tasklist.taskName}}</view>
				<view class="taskinfo_money">金额：{{tasklist.rewardAmount}}元</view>
				<view class="taskinfo_status">进行中</view>
			</view>

			<view class="detailtext">
				<view class="squares" style=" margin-right: 40rpx; background-color: rgba(26, 208, 156, 100);"></view>
				<view class="">任务规则</view>
			</view>

			<view class="taskinfo_text">{{tasklist.taskContent}}。</view>

			<view class="taskcom">
				<view class="squares" style=" margin-right: 40rpx; background-color: rgba(7, 140, 254, 100);"></view>
				<view class="">发布机构</view>
			</view>
			<view class="taskinfo_bottom_company">
				<image :src="tasklist.companyLogo" mode=""></image>
				<view class="taskinfo_bottom_companyname">{{tasklist.companyName}}</view>
			</view>

			<view class="detailtext">
				<view class="squares" style=" margin-right: 40rpx; background-color: rgba(237, 173, 2, 100);"></view>
				<view class="">转发内容</view>
			</view>

			<view class="detailVideo" v-for="(item,index) in tasklist.attimgurl" :key="index">
				<image class="w100p h100p" :src="item" mode=""></image>
				<!-- <view class="videoBtn">查看详情</view> -->
			</view>

			<view class="detailtext">
				<view class="squares" style=" margin-right: 40rpx; background-color: rgba(26, 208, 156, 100);"></view>
				<view class="">竞标截止日期</view>
			</view>
			<view class="taskinfo_time">
				<view class="taskinfo_time_text">{{taskEndTime}}</view>
			</view>
			<view class="opnetime">发布于{{tasklist.createTimeStr}}</view>

			<view class="card" v-if="contractStatus == 0">
				<h5 class="fs14">接单情况:目前{{Personnel.length}}人接单</h5>
				<div class=" mt10 cards" v-for='(item,index) in Personnel' :key="index">
					<div class="disflex  jsaround">
						<div class="mt5" @click="taskcard(item.cardId)">
							<image class="w30 h30" style="border-radius: 50%;" :src="item.cardLogo" mode=""></image>
						</div>
						<div class="fs14 mt5" @click="tup(item)">{{item.cardName}}</div>
						
						<!-- @click="getcontract(item.cardId,index)" -->

						<div v-show="item.tenderStatus==2"></div>
						<div v-show="item.tenderStatus==0" class="taskinfo_status mt5 "
						
							
							@click="tup(item,item.taskTenderId)"
							>签署合同</div>
						<div class="fs14 bgc h24 lh24 " @click="gochat(item.cardId)">聊一聊</div>
						<div v-show="item.tenderStatus==1&&tasklist.taskState==1" class="taskinfo_status mt5 ">已上传合同
						</div>
						<div v-show="item.tenderStatus==1&&tasklist.taskState==2" class="taskinfo_status mt5 ">进行中</div>
					</div>
					<view class="" v-if="item.flag">
						<div class="fs14 mt10" v-if="Personnel.length>0">合同照片</div>
						<div class="disflex" v-if="Personnel.length>0">
							<div class="disflex wrap mt5 ml5">
								<div class="w70 h70 mr7 mb10 posre " v-for="(v,k) in dynamic_imgs" :key="k">
									<img :src="v" alt="" class="w70 h70 mr7 mb10" mode="aspectFill">
									<span @click="del(k)">
										<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/del.png"
											alt="" class="w20 h20 posab right0 top0" />
									</span>
								</div>
								<div class="bgfff bdash_a8 w70 h70 add_img mr7 mb10" @click="uploadpic('dynamic')">
								</div>
							</div>
						</div>
					</view>
				</div>



			</view>

			<view class="card" v-if="contractStatus ==1 ">
				<div class=" mt10 cards">
					<div class="disflex  jsaround">
						<div class="mt5">
							<image class="w30 h30" style="border-radius: 50%;"
								:src="tasklist.taskTenderResponse.cardLogo" mode=""></image>
						</div>
						<div class="fs14 mt5">{{tasklist.taskTenderResponse.cardName}}</div>
						<div v-show="item.tenderStatus==1&&tasklist.taskState==2" class="taskinfo_status mt5 ">进行中</div>
					</div>
				</div>
				<h5 class="fs14">任务完成情况</h5>
				<div class=" mt10 cards" v-for='(item,index) in taskProgress' :key="index">
					<div class="disflex  jsaround">
						<div class="mt5">
							<image class="w30 h30" style="border-radius: 50%;" :src="item.userLogo" mode=""></image>
						</div>
						<div class="fs14 mt5">{{item.userName}}</div>
						<div class="fs14 mt5 ">任务完成进度{{item.progressScale}}%</div>
					</div>
					<div class="disflex mt10">
						<div class="disflex wrap mt5 ml5">
							<div class="w70 h70 mr7 mb10 posre " v-for="(v,k) in item.urlList" :key="k">
								<img :src="v" alt="" class="w70 h70 mr7 mb10" mode="aspectFill">
							</div>
						</div>
					</div>
				</div>
				<div class="fs14">上传打款图片</div>
				<div class="disflex mt10">
					<div class="disflex wrap mt5 ml5">
						<div class="w70 h70 mr7 mb10 posre " v-for="(v,k) in money_imgs" :key="k">
							<img :src="v" alt="" class="w70 h70 mr7 mb10" mode="aspectFill">
							<span @click="del2(k)">
								<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/del.png"
									alt="" class="w20 h20 posab right0 top0" />
							</span>
						</div>
						<div class="bgfff bdash_a8 w70 h70 add_img mr7 mb10" @click="uploadpic('money_imgs')"></div>
					</div>
				</div>
				<view class="w90p h30 disflex jsaround ">
					<div @click="toMoney" class=" h24 lh24 fs12 mt5 bgc bradius4">上传打款凭证</div>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import WXAJAX from '../../../utils/request.js';
	import util from '@/utils/index';
	export default {
		data() {
			return {
				idx: 0,
				tasklist: '',
				taskCustomerId: '',
				tenderDescribe: '',
				isBoss: false,
				Personnel: [{
					flag: false
				}],
				dynamic_imgs: [],
				cardId: '',
				id: 0,
				taskEndTime: '',
				contractUrl: '', //已经上传的任务合同图片
				taskTenderId: '', //任务竞标组件id
				contractStatus: "", //合同状态
				progress: [],
				progressimg: [], //分割上传的图片
				biddingList: [],
				money_imgs: [],
				taskProgress: [],
				userId: ''
			}
		},
		onLoad(option) {
			console.log(option, "任务id");
			this.id = option.taskCustomerId
			this.gettasklist()
			this.gettaskcontract()
			this.getcustomerEssay()
		},
		methods: {
			tup(item,id) {
				let idx = id
				this.$set(item, 'flag', !item.flag)
				
				// <!-- @click="getcontract(item.cardId,index)" -->
				
				this.getcontract(item.cardId,idx)
			},
			toMoney() { //确认打款
				var that = this;
				// if(that.taskState==1){
				if (that.money_imgs.length == 0) {
					wx.showToast({
						title: '请上传打款凭证！',
						icon: 'none',
						duration: 2000
					})
					return false
				}
				var money_imgs = that.money_imgs.join(",");
				var params = {
					// state:2,
					// taskState: 3,
					taskCustomerId: that.taskCustomerId,
					receiptVoucher: money_imgs,
				}
				console.log(params);
				WXAJAX.POST(params, '', '/customerEssay/updateTaskStateById')
				wx.showToast({
					title: '成功上传打款凭证！',
					icon: 'none',
					duration: 2000
				})
				// 修改任务竞标状态
				// let _url = "/task/tender/update"
				// let date = {
				// 	taskTenderId: this.Personnel[idx].taskTenderId,
				// 	taskId: this.id,
				// 	tenderStatus: 1
				// }

				// WXAJAX.POST(date, "", _url, "", "", 1).then((res) => {
				// 	console.log(res, "");
				// })
			},
			getcustomerEssay() {
				let url = "/customerEssay/queryListTaskProgress"
				let data = {
					taskId: this.id,
				}
				WXAJAX.POST(data, "", url, "", "").then((res) => {
					// taskProgress
					if (res.list) {
						for (var i = 0; i < res.list.length; i++) {
							res.list[i].urlList = res.list[i].progressUrl.split(",");
						}
						this.taskProgress = res.list;
					}
					console.log("this.taskProgress", this.taskProgress);
				})

			},
			// 查询任务合同
			gettaskcontract() {
				let url = "/task/contract/queryPage"
				let data = {
					taskId: this.id
				}
				WXAJAX.POST(data, "", url, "", "", 1).then((res) => {
					console.log(res.list, "查询任务合同");
					for (let i = 0; i < res.list.length; i++) {
						if (res.list[i].contractStatus == 1) {
							console.log("合同确认");
							this.contractStatus = 1
						} else {
							this.contractStatus = 0
							console.log("合同未确认");
						}
					}
				})
			},
			// 添加任务合同信息同时修改任务竞标状态
			getcontract(id, idx) {
				// console.log(id,  idx ,"dasdadasdsdadsdadsadadasdasd");
				if (this.dynamic_imgs.length == 0) {
					wx.showToast({
						title: '请上传合同图片！',
						icon: 'none',
						duration: 2000
					})
					return;
				}
				let endTime = this.tasklist.endTime
				this.cardId = id
				// 添加任务合同信息
				console.log(this.cardId, "sadsdad");
				let url = "/task/contract/add"
				let data = {
					cardId: this.cardId,
					taskId: this.taskCustomerId,
					contractStatus: 0,
					contractUrl: this.dynamic_imgs.join(','),
					taskEndTime: endTime
				}
				WXAJAX.POST(data, '', url, '', '', 1).then((res) => {
					wx.showToast({
						title: '签署合同成功！',
						icon: 'none',
						duration: 2000
					})
				})
				// 修改任务竞标状态
				let _url = "/task/tender/update"
				let date = {
					taskTenderId: idx,
					taskId: this.id,
					tenderStatus: 1
				}

				WXAJAX.POST(date, "", _url, "", "", 1).then((res) => {
					console.log(res, "修改任务竞标状态");
				})
			},
			// 删除照片
			del(index) {
				this.dynamic_imgs.splice(index, 1);
			},
			del2(index) {
				this.money_imgs.splice(index, 1);
			},

			// 上传图片
			async uploadpic(str) {
				if (str == 'dynamic' && this.dynamic_imgs.length >= 9) {
					wx.showToast({
						title: '最多选择九张！',
						duration: 1500,
						icon: 'none'
					});
					return
				}
				let path = await util.chooseImage('file', str === 'dynamic' ? 9 - this.dynamic_imgs.length : 1);
				if (Object.prototype.toString.call(path) !== '[object Array]') return;
				this.uploadImgFun(path, 0, str);
			},
			// 递归上传
			async uploadImgFun(arr, index = 0, str) {
				wx.showLoading({
					title: '上传中',
					mask: true
				})
				await this.uploadImg(arr[index], str)
				if (index < arr.length - 1) {
					this.uploadImgFun(arr, index + 1, str)
				}
			},
			// 上传的图片加到dynamic_imgs中
			uploadImg(path, str) {
				let v = this;
				wx.showLoading();
				return WXAJAX.UploadImage(path).then((data) => {
					wx.hideLoading();
					data = JSON.parse(data);
					if (data.code == '200') {
						if (str == 'dynamic') {
							this.dynamic_imgs.push(WXAJAX.imgBackUrl + data.data);
							console.log("this.dynamic_imgs", this.dynamic_imgs);
						} else {
							this.money_imgs.push(WXAJAX.imgBackUrl + data.data);
						}
					} else {
						wx.showToast({
							title: '网络异常',
							duration: 2000,
							icon: 'none'
						})
					}
				}).catch((err) => {
					wx.hideLoading();
					console.log('err -- ', err);
				})
			},
			// 聊一聊跳转到聊天页
			gochat(i) {
				this.userId = i
				this.getcardDetails()

			},
			// 跳到聊天页面
			taskcard(i) {
				this.userId = i
				this.getcardDetails()
			},
			// 获取id信息
			getcardDetails() {
				let url = "/businessCard/cardDetails"
				let data = {
					cardId: this.userId,
				}
				WXAJAX.POST(data, "", url, "", "", 2).then((res) => {
					// console.log(res, "获取id的基本信息");
					this.row_tap(res.userId, res.cardId, res.logo, res.name, res.wxCode, res.phone, res
						.companyId)
				})
			},
			row_tap(id, cardid, logo, name, wxCode, phone, companyId) {
				uni.navigateTo({
					url: '../../IM/main?userId=' + id + '&logo=' + logo + '&type=2&cardId=' + cardid + '&name=' +
						name +
						'&wxCode=' + wxCode + '&phone=' + phone + '&companyId=' + companyId
				})
			},
			// 查询任务详细信息
			async gettasklist() {
				let url = "/customerEssay/queryTaskCustomer"
				let data = {
					taskCustomerId: this.id
				}
				await WXAJAX.POST(data, "", url, "", "").then((res) => {
					console.log(res, "查询任务详细信息");
					this.tasklist = res
					this.taskCustomerId = this.tasklist.id
					let taskEndTime = this.tasklist.startTimeStr.split(' ')
					this.taskEndTime = taskEndTime[0]
					this.tasklist.attimgurl = []
					this.tasklist.attimgurl = this.tasklist.attachmentUrl.split(',')
					if (res.receiptVoucher) {
						this.money_imgs = res.receiptVoucher.split(',')
					}
					if (res.taskContract) {
						this.dynamic_imgs.push(res.taskContract.contractUrl.split(','))
					}
					// console.log(this.tasklist.attimgurl,"发布时上传任务附件");
				})
				this.getPersonnel()
			},
			getPersonnel() {
				let url = "/task/tender/queryPage"
				let data = {
					taskId: this.taskCustomerId
				}
				WXAJAX.POST(data, '', url, '', '', 1).then((res) => {
					console.log("分页查询任务竞标人员");
					
					res.list.forEach(item => {
						this.$set(item, 'flag', false)
					})
					this.Personnel = res.list
					console.log('asdasdasda', this.Personnel)
					
					// console.log(this.Personnel[0].taskTenderId,"分页查询任务竞标人员");

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
			}
		}
	}
</script>

<style scoped>
	.bgc {
		background-color: rgba(3, 211, 197, 100);
		color: rgba(255, 255, 255, 100);
		border-radius: 12rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}

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
	}

	.mainlist {
		width: 100%;
		height: 100%;
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
		margin-left: 60rpx;
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

	.detailVideo {
		width: 424rpx;
		height: 206rpx;
		line-height: 40px;
		border-radius: 12px;
		text-align: center;
		box-shadow: 0px 4rpx 12rpx 0px rgba(0, 0, 0, 0.4);
		padding: 20rpx;
		margin-top: 16rpx;
		margin-left: 60rpx;
	}

	.videotext {
		height: 40px;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-bold;
	}

	.detailVideo video {
		width: 424rpx;
		height: 234rpx;
		border-radius: 12rpx;
		margin-top: 14rpx;
		margin-bottom: 14rpx;
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
</style>
