<template>
	<div>
		<div class="create-task">
			<div class="content-wrap">
				<div class="task-content" style="margin-top: 20rpx;">
					<div class="title c38">
						<span class="bg38"></span>
						模板标题
					</div>
					<div class="content">
						<textarea maxlength="-1" :placeholder="templateTitle || '请输入模板标题'" @input="totemplateTitle"
							:value="templateTitle" style="width: 100%;" />
					</div>
				</div>
				<div class="task-content" style="margin-top: 20rpx;">
					<div class="title c38">
						<span class="bg38"></span>
						产品
					</div>
					<div class="content">
						<textarea maxlength="-1" :placeholder="visitingProduct || '请输入产品'" :value="visitingProduct"
							@input="tovisitingProduct($event)" style="width: 100%;" />
					</div>
				</div>
				<div class="task-content" style="margin-top: 20rpx;">
					<div class="title c38">
						<span class="bg38"></span>
						拜访内容
					</div>
					<div class="content">
						<textarea maxlength="-1" :placeholder="visitingContent || '请输入拜访内容'" :value="visitingContent"
							@input="toVisitingContent" style="width: 100%;" />
					</div>
				</div>
				<div class="task-content" style="margin-top: 20rpx;">
					<div class="title c38">
						<span class="bgeee"></span>
						拜访目的
					</div>
					<div class="content ">
						<textarea maxlength="-1" :placeholder="visitingPurpose || '请输入拜访目的'" @input="toVisitingPurpose"
							style="width: 100%;" />
					</div>
				</div>

				<div class="task-content" style="margin-top: 20rpx;">
					<div class="title c38">
						<span class="bg55"></span>
						拜访结果
					</div>
					<div class="content">
						<textarea maxlength="-1" :placeholder="visitingResult || '请输入拜访结果'" :value="visitingResult"
							@input="toVisitingResult" style="width: 100%;" />
					</div>
				</div>


				<div class="task-content" style="margin-top: 20rpx;">
					<div class="title c38">
						<span class="bga8"></span>
						跟进计划
					</div>
					<div class="content ">
						<textarea maxlength="-1" :placeholder="visitingPlan || '请输入跟进计划'" :value="visitingPlan"
							@input="toVisitingPlan" style="width: 100%;" />
					</div>
				</div>

				<div class="task-content" style="margin-top: 20rpx;">
					<div class="title c38">
						<span class="bg55"></span>
						是否共享
					</div>
					<div class="contents">
						<view class="uni-padding-wrap uni-common-mt  wrap ">
							<view>
								<switch @change="switch2Change" :checked="treatmentStatu" />
							</view>
						</view>
					</div>
				</div>

			</div>
		</div>

		<BottomButtonTwo :left="bottom.left" :right="bottom.right" @page_turn="page_turn"></BottomButtonTwo>
	</div>
</template>

<script>
	import BottomButtonTwo from '@/components/bottom_button_two'
	import WXAJAX from '../../../utils/request.js';
	import datatimea from '../../../components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
	import {
		mapStates,
		mapMutations
	} from 'vuex'
	import util from '../../../utils/index'
	import amapFile from '@/libs/amap-wx.js'
	export default {
		data() {
			return {
				treatmentStatu: false,
				companyId: '',
				isShowConfirm: false, //控制余额充值模块显隐
				downImg: WXAJAX.imgBackUrl + '/product-index/icon_right-s.png',
				//type 用来分辩到底是创建还是修改任务
				type: '',
				myAmapFun: '',
				locat: {
					city: '成都',
					addr: '',
					lat: '',
					lng: '',
				},
				visitingId: 0,
				visitingType: 1,
				visitingTime: '',
				visitingPurpose: '',
				visitingContent: '',
				visitingResult: '',
				visitingLbsUrl: '',
				visitingAddr: '',
				visitingAddrInfo: '',
				visitingPlan: '',
				templateTitle: '', //模板标题
				name: '',
				phone: '',
				customerInfo: '',
				visitingInfoTemplateId: '',

				intervieweeCompany: '', //公司
				intervieweePosition: '', //职位
				visitingProduct: '', //产品名称

				staffid: '',
				selectInfo: '',
				begin: '2020-5-21 14:39',
				userId: wx.getStorageSync('userId'),
				address: '',
				visitingLbsUrl: [], //个人图片
				customerInfo: [],
				bottom: {
					left: {
						text: '取消',
						url: 'cancel'
					},
					right: {
						text: '保存',
						url: 'save'
					}
				},
			}
		},
		components: {
			datatimea,
			BottomButtonTwo
		},
		onLoad(option) {
			this.visitingInfoTemplateId = option.visitingInfoTemplateId;
			this.init();
		},
		watch: {

		},
		mounted() {

		},
		methods: {
			switch2Change(e) {
				console.log(e);

				console.log(e.target.value, '权威的人告诉他的环境的股份的时代');

				if (e.target.value == true) {
					// companyId = 1
					this.companyId = 1
				}
				if (e.target.value == false) {
					this.companyId = 0
				}
			},
			init() {
				let v = this

				WXAJAX.POST({
					visitingInfoTemplateId: v.visitingInfoTemplateId
				}, '', '/visitingInfoTemplate/query', '', '', '1').then((data) => {
					console.log(data, 'asdfgdbgfdscax');
					v.templateTitle = data.templateTitle
					v.visitingContent = data.visitingContent ? data.visitingContent : ''
					v.visitingPlan = data.visitingPlan ? data.visitingPlan : ''
					v.visitingPurpose = data.visitingPurpose ? data.visitingPurpose : ''
					v.visitingResult = data.visitingResult ? data.visitingResult : ''
					v.visitingProduct = data.visitingProduct ? data.visitingProduct : ''
					v.companyId = data.companyId
				}).catch((err) => {

				})
			},
			page_turn(method) {
				if (method == 'cancel') {
					wx.navigateBack()
				} else {
					this.editTemplete();
				}
			},
			editTemplete() {
				if (this.templateTitle == '') {
					wx.showToast({
						title: '请输入标题',
						icon: 'none'
					})
					return;
				}
				// wx.showLoading({
				//   mask:true
				// })
				// this.isLoading = true;
				let params = {
					companyId: this.companyId, //companyId 0==个人 1 == 共享
					visitingInfoTemplateId: this.visitingInfoTemplateId,
					templateTitle: this.templateTitle,
					visitingType: 1,
					visitingProduct: this.visitingProduct,
					visitingPurpose: this.visitingPurpose,
					visitingContent: this.visitingContent,
					visitingResult: this.visitingResult,
					visitingPlan: this.visitingPlan,
				}

				WXAJAX.POST(
					params,
					"",
					"/visitingInfoTemplate/update", '', '', 1
				);

				wx.showToast({
					title: '已成功！',
					duration: 2000
				})
				this.isLoading = false;
				setTimeout(function() {
					wx.navigateBack({
						delta: 1
					})
				}, 1000)

			},
			toVisitingPurpose(e) {
				this.visitingPurpose = e.detail.value
			},
			toname(e) {
				this.name = e.detail.value
			},
			tointervieweeCompany(e) {
				this.intervieweeCompany = e.detail.value
			},
			tointervieweePosition(e) {
				this.intervieweePosition = e.detail.value
			},
			tovisitingProduct(e) {
				console.log(e);
				this.visitingProduct = e.detail.value
			},
			tophone(e) {
				this.phone = e.detail.value
			},
			totemplateTitle(e) {
				this.templateTitle = e.detail.value
			},
			toVisitingContent(e) {
				this.visitingContent = e.detail.value
			},
			toVisitingResult(e) {
				this.visitingResult = e.detail.value
			},
			toVisitingPlan(e) {
				this.visitingPlan = e.detail.value
			},

		}

	}
</script>

<style scoped>
	textarea {
		height: 160rpx;
	}

	.wrap {
		
		margin-top: -24rpx;
	}

	.create-task {
		height: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.content-wrap {
		padding: 20upx 30upx 0 20upx;
		flex: 1;
		overflow: auto;
	}

	.task-content {
		background: #FFFFFF;
		border-radius: 20upx;
	}

	.title {
		font-size: 32upx;
		color: #383838;
		display: flex;
		align-items: center;
		padding: 0upx 30upx 0 30upx;
		height: 88upx;
		font-weight: bold;
		border-bottom: 1upx solid #F8F8F8;
	}

	.title span {
		width: 20upx;
		height: 20upx;
		margin-right: 17upx;
		border-radius: 50%;
	}

	.content {
		padding: 30upx 30upx 0 30upx;
		min-height: 140upx;
		font-size: 30rpx;
		/* height: 72upx; */
		line-height: 30rpx;
		overflow: hidden;
		border-bottom: 1upx solid #F8F8F8;
	}

	.contents {
		padding: 30upx 30upx 0 30upx;
		height: 160rpx;
		font-size: 30rpx;
		/* height: 72upx; */
		line-height: 30rpx;
		overflow: hidden;
		border-bottom: 1upx solid #F8F8F8;
	}

	.content-bottom {
		height: 88upx;
		display: flex;
		padding: 0upx 30upx 0 30upx;
		justify-content: space-between;
		align-items: center;
		font-size: 28upx;
	}

	.content-bottom-right {
		display: flex;
	}

	.target {
		background: #FFFFFF;
		border-radius: 20upx;
		margin-top: 20upx;
	}

	.target ul {
		padding: 0 30upx;
		display: flex;
		flex-direction: column;
	}

	.target ul li {
		height: 88upx;
		font-size: 28upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.target ul li input {
		height: 100%;
		width: 200upx;
		margin-right: 5upx;
	}

	.target-right {
		display: flex;
	}

	.time {
		background: #FFFFFF;
		border-radius: 20upx;
		margin-top: 20upx;
	}

	.choice-article {
		width: 240upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: right
	}

	.confirm-btn {
		height: 98upx;
		line-height: 98upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 36upx;
		background: linear-gradient(90deg, rgba(118, 218, 217, 1), rgba(81, 205, 204, 1));
	}

	.numinput {
		padding-right: 32upx;
		text-align: right;
	}
</style>

<style scoped>
	/* 余额充值部分 */
	.toast-box {
		width: 100%;
		height: 100%;
		opacity: 1;
		position: fixed;
		top: 0px;
		left: 0px;
	}

	.toastbg {
		opacity: 0.2;
		background-color: black;
		position: absolute;
		width: 100%;
		min-height: 100vh;
	}

	.showToast {
		position: absolute;
		opacity: 1;
		width: 70%;
		margin-left: 15%;
		margin-top: 40%;
	}

	.toast-title {
		padding-left: 5%;
		background-color: #787878;
		color: white;
		padding-top: 2vh;
		padding-bottom: 2vh;
		border-top-right-radius: 16rpx;
		border-top-left-radius: 16rpx;
	}

	.toast-main {
		padding-top: 2vh;
		padding-bottom: 2vh;
		background-color: white;
		text-align: center;
	}

	.toast-input {
		margin-left: 5%;
		margin-right: 5%;
		border: 1px solid #ddd;
		padding-left: 2vh;
		padding-right: 2vh;
		padding-top: 1vh;
		padding-bottom: 1vh;
	}

	.toast-button {
		display: flex;
	}

	.button1 {
		width: 50%;
	}

	.button2 {
		width: 50%;
	}

	.button1 button {
		width: 100%;
		background-color: white;
		color: red;
		border-radius: 0rpx;
		border-bottom-left-radius: 16rpx;
	}

	.button2 button {
		width: 100%;
		background-color: white;
		color: black;
		border-radius: 0rpx;
		border-bottom-right-radius: 16rpx;
	}
</style>
