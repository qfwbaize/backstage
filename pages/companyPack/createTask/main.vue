<template>
	<div class="create-task">
		<div class="content-wrap">
			<div class="task-content">
				<div class="title c38">
					<span class="bgblue"></span>
					任务标题
				</div>
				<div class="content ">
					<textarea :placeholder="taskName || '请输入任务名称如：5月获客任务'" @blur="toTaskName"
						style="height:100%;width: 100%;" />
				</div>
			</div>

			<div class="target">
				<div class="title c38">
					<span class="bggreen"></span>
					任务成员
				</div>
				<ul>
					<li>
						<div class="target-left c78">
							接收人
						</div>
						<div class="target-right">
							<div class="c39" v-if="staffid == null || ''" @click="toSelectstaff()">点击选择成员</div>
							<div class="c39" v-else @click="toSelectstaff()">已选择<span
									class="cblue">{{staffid.length }}</span>人</div>
							<image class="w16 h16 mt2 ml7" :src="downImg"></image>
						</div>
					</li>
				</ul>
			</div>
			<div class="task-content" style="margin-top: 20rpx;">
				<div class="title c38">
					<span class="bgblue"></span>
					任务内容
				</div>
				<div class="content ">
					<textarea :placeholder="taskContent || '请输入任务内容'" @blur="toTaskContent"
						style="height:100%;width: 100%;" />
				</div>
			</div>
			<!-- <div class="target">
        <div class="title c38">
          <span class="bggreen"></span>
          任务内容
        </div>
        <ul>
          <li>
            <textarea :placeholder="taskContent || '请输入任务内容'" @blur="toTaskContent" style="height:100%;width: 100%;"/>
          </li>
        </ul>
      </div> -->
			<div class="target">
				<div class="title c38">
					<span class="bgblue"></span>
					相关资料
				</div>
				<div class="content ">
					<div class="choice-article c39" v-if="title != '' " @click="toArticle()">{{title}}</div>
					<div class="bgfff bdash_a8 w40 h40 add_img mr7 mb7" @click="toArticle()"></div>
				</div>
			</div>
			<div class="time">
				<div class="title c38">
					<span class="bgyellow"></span>
					任务奖励
				</div>
				<div class="content-bottom">
					<div class="content-bottom-left c78">
						完成任务奖励金额
					</div>
					<div class="content-bottom-right c38">
						<input class="numinput" type="number" maxlength="4" @blur="toRewardAmount"
							:placeholder="rewardAmount || '0'" /> <span class="w16 h16 mt2 ml7">元</span>
					</div>
				</div>
			</div>
			<div class="time">
				<div class="title c38">
					<span class="bgyellow"></span>
					任务时间
				</div>
				<div class="content-bottom">
					<div class="content-bottom-left c78">
						周期设置
					</div>
					<div class="content-bottom-right c38">
						单次任务
						<image class="w16 h16 mt2 ml7" :src="downImg"></image>
					</div>
				</div>
				<div class="content-bottom">
					<div class="content-bottom-left c78">
						开始时间
					</div>
					<div class="content-bottom-right c38">
						<datatimea :placeholder="startTime || '请选择开始时间'" @change="startEvent" :start="begin">
						</datatimea>
						<image class="w16 h16 mt2 ml7" :src="downImg"></image>
					</div>
				</div>
				<div class="content-bottom">
					<div class="content-bottom-left c78">
						结束时间
					</div>
					<div class="content-bottom-right c38">
						<datatimea :placeholder="endTime || '请选择结束时间' " @change="endEvent" :start="begin"></datatimea>
						<image class="w16 h16 mt2 ml7" :src="downImg"></image>
					</div>
				</div>
			</div>

		</div>
		<div class="confirm-btn" @click="preservation">
			{{msg}}
		</div>
	</div>
</template>

<script>
	import WXAJAX from '../../../utils/request.js';
	import datatimea from '../../../components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
	import {
		mapStates,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				downImg: WXAJAX.imgBackUrl + '/product-index/icon_right-s.png',
				//type 用来分辩到底是创建还是修改任务
				type: '',
				companyId: '',
				staffid: '',
				selectInfo: '',
				startData: '',
				begin: '2020-5-21 14:39',
				startTime: '',
				endTime: '',
				taskName: '',
				shareNum: '',
				visitNum: '',
				editInfo: '',
				editInfoTitle: '',
				userId: wx.getStorageSync('userId'),
				title: '',
				dynamicId: '',
				taskContent: '',
				periodSet: 0,
				rewardAmount: 0,
				videoId: '',
				msg:'保存'
			}
		},
		onLoad(option) {
			console.log(option);
			if (option.title == "发布任务") {
				wx.setNavigationBarTitle({
					title:"发布任务"
				})
				this.msg = option.title
			}
			this.companyId = wx.getStorageSync('COMPANYID')
			this.type = 1
			this.taskCustomerId = wx.getStorageSync('COMPANYID')
		},
		watch: {
			//判断是否为编辑任务，1为创建，2为编辑
			type(newVal, oldVal) {
				if (newVal == 1) {

				} else {
					this.isLoading = true;
					this.getQueryMyTaskDetail()
				}
			},
			selectInfo(newVal, old) {
				if (newVal !== '') {
					this.dynamicId = this.selectInfo[0].dynamicId
					this.title = this.selectInfo[0].title
				}
			}
		},
		onShow() {
			this.staffid = this.$store.state.staffId
			this.selectInfo = this.$store.state.selectRecordsInfo
		},
		mounted() {
			//this.startTime = this.getStartDate()
		},
		methods: {

			getStartDate() {
				var thisDay = new Date();
				var year = thisDay.getFullYear();
				var month = thisDay.getMonth() + 1;
				var day = thisDay.getDate();
				var hh = thisDay.getHours();
				var mm = thisDay.getMinutes();
				var timer = year + "-";
				timer += month + "-";
				timer += day + ' '
				if (hh < 10)
					timer += "0";
				timer += hh + ":";
				if (mm < 10)
					timer += '0';
				timer += mm
				return timer
			},
			timestampToTime(timestamp) {
				var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
				var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
				var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
				return Y + M + D + h + m;
			},
			//去选取文章页面
			toArticle() {
				//代表选择一个
				var type = this.type
				wx.navigateTo({
					url: `../selectArticle/main?type=${type}`
				})
			},
			//去选取接收人页面
			toSelectstaff() {
				var id = this.$store.state.companyId
				wx.navigateTo({
					url: `../selectstaff/main?id=${id}`
				})
			},

			toTaskName(e) {
				console.log(e.detail.value)
				this.taskName = e.detail.value
			},
			toTaskContent(e) {
				console.log(e.detail.value)
				this.taskContent = e.detail.value
			},
			toShareNum(e) {

				var reg = /^\+?[1-9]\d{0,3}(\.\d*)?$/
				if (!reg.test(e.detail.value)) {
					wx.showToast({
						title: '请输入正确的数字',
						icon: 'none',
						duration: 2000
					})
					return false
				}
				this.shareNum = e.detail.value
			},
			toVisitNum(e) {
				var reg = /^\+?[1-9]\d{0,3}(\.\d*)?$/
				if (!reg.test(e.detail.value)) {
					wx.showToast({
						title: '请输入正确的数字',
						icon: 'none',
						duration: 2000
					})
					return false
				}
				this.visitNum = e.detail.value
			},
			toRewardAmount(e) {
				var reg = /^\+?[1-9]\d{0,3}(\.\d*)?$/
				if (!reg.test(e.detail.value)) {
					wx.showToast({
						title: '请输入正确的数字',
						icon: 'none',
						duration: 2000
					})
					return false
				}
				this.rewardAmount = e.detail.value
			},

			async getQueryMyTaskDetail() {
				this.isLoading = true;
				try {
					let data = await WXAJAX.POST({
							taskCustomerId: this.taskCustomerId,
							userId: this.userId,
							type: 2,
						},
						"",
						"/customerEssay/queryTaskCustomer"
					);
					if (data) {
						this.startTime = this.timestampToTime(data.startTime)
						this.endTime = this.timestampToTime(data.endTime)
						this.staffid = data.taskUsers
						this.title = data.title,
							this.companyId = data.companyId,
							this.dynamicId = data.dynamicId,
							this.shareNum = data.shareNum,
							this.visitNum = data.visitNum,
							this.taskName = data.visitNum
					}
					this.isLoading = false;
					wx.hideLoading();
				} catch (error) {
					this.isLoading = false;
					wx.hideLoading();
					// console.log(".............", error);
				}
			},
			startEvent(data) {
				console.log(data)
				this.startTime = data.fmt1 + ' 00:00:00'
				// this.startTime = data.fmt1 +' '+ data.hh + ':' + data.mm +':' + data.ss
			},
			endEvent(data) {
				console.log(data)
				this.endTime = data.fmt1 + ' 23:59:59'
				// this.endTime = data.fmt1 +' '+ data.hh + ':' + data.mm +':' + data.ss
			},
			preservation() {
				// if(this.staffid == '' || this.title == '' || this.shareNum == '' || this.visitNum == '' || this.taskName == '' || this.startTime == '' || this.endTime == ''){
				if (this.staffid == '' || this.title == '' || this.taskName == '' || this.startTime == '' || this
					.endTime == '' || this.rewardAmount == '') {
					wx.showToast({
						title: '请将信息选填完整',
						icon: 'none',
						duration: 2000
					})
					return false
				}
				if (this.taskContent == '') {
					wx.showToast({
						title: '请填写任务内容',
						icon: 'none',
						duration: 2000
					})
					return false
				}
				let that = this
				if (this.staffid.length > 1) {

					let rewardAmount = this.rewardAmount * this.staffid.length;

					wx.showModal({
						title: '提示',
						content: '您选择了多个接收人，将花费' + rewardAmount + '元',
						success: function(res) {
							if (res.confirm) {
								that.getAddTaskCustomer(that.dynamicId)
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
				} else {
					that.getAddTaskCustomer(that.dynamicId)
				}


			},
			async getAddTaskCustomer(dynamicId) {
				wx.showLoading({
					mask: true
				})
				this.isLoading = true;
				try {
					let data = await WXAJAX.POST({
							companyId: wx.getStorageSync('COMPANYID'),
							dynamicId: dynamicId,
							endTime: this.endTime,
							shareNum: this.shareNum,
							startTime: this.startTime,
							taskName: this.taskName,
							taskUsers: this.staffid,
							visitNum: this.visitNum,
							userId: wx.getStorageSync('cardId'),

							taskContent: this.taskContent,
							periodSet: this.periodSet,
							rewardAmount: this.rewardAmount,
							// 公司logo和公司名称
							choose_company:uni.getStorageSync('choose_company'),
							choose_company_logo:uni.getStorageSync('choose_company_logo')
							// videoId:this.videoId,
						},
						"",
						"/customerEssay/addTaskCustomer"
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
				} catch (error) {
					this.isLoading = false;
					wx.hideLoading();
					// console.log(".............", error);
				}
			}
		},
		destroyed() {
			this.$store.state.staffId = []
			this.$store.state.selectRecordsInfo = []

		},
		components: {
			datatimea
		}

	}
</script>

<style scoped>
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
		height: 140upx;
		/* height: 72upx; */
		line-height: 44upx;
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
		width: 150upx;
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
