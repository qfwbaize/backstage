<template>
	<div class="create-task">
		<div class="content-wrap">
			<div class="task-content">
				<div class="title c38">
					<span class="bgblue" style="background-color: #FFFFFF;display: flex;">
						<image
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riLine-asterisk@3x.png"
							mode=""></image>
					</span>
					任务标题
				</div>
				<div class="content ">
					<textarea v-model="taskName" maxlength="20" placeholder="请输入任务名称" @blur="toTaskName"
						style="height:100%;width: 100%;" />
				</div>
			</div>

			<div class="target" v-show="taskType == 0">
				<div class="title c38">
					<span class="bggreen"></span>
					选择接收任务机构
				</div>
				<ul>
					<li>
						<div class="target-left c78">
							机构名称
						</div>
						<div class="target-right">
							<div class="c39" v-if="staffid == null || ''" @click="toSelectstaff()">点击选择机构</div>
							<div class="c39" v-else @click="toSelectstaff()">已选择<span
									class="cblue">{{staffid.length }}</span>人</div>
							<image class="w16 h16 mt2 ml7" :src="downImg"></image>
						</div>
					</li>
				</ul>
			</div>
			<div class="target" v-show="taskType==1">
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
					<span class="bgblue" style="background-color: #FFFFFF;display: flex;">
						<image
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riLine-asterisk@3x.png"
							mode=""></image>
					</span>
					任务内容
				</div>
				<div class="content ">
					<textarea v-model="taskContent" placeholder="请输入任务内容" @blur="toTaskContent"
						style="height:100%;width: 100%;" />
				</div>
			</div>

			<div class="target">
				<div class="title c38">
					<span class="bgblue" style="background-color: #FFFFFF;display: flex;">
						<image
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riLine-asterisk@3x.png"
							mode=""></image>
					</span>
					上传图片
				</div>
				<div class="disflex wrap pt20 pb20 w290 pl20">
					<div class="bgfff w80 h80 mr7 mb7 posre" v-for="(v,k) in self_photos" :key="k">
						<img mode="aspectFill" :src="v" alt="" class="w100p h100p">
						<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/del.png" alt=""
							class="w20 h20 posab right2 top2" @click="delImg(k)">
					</div>
					<div v-if="self_photos.length < 9" class="bgfff bdash_a8 w80 h80 add_img bradius5 mr7"
						@click="uploadpic('self', 9)"></div>
				</div>
			</div>

			<div class="target" >
				<div class="title c38">
					<span class="bgblue" style="background-color: #FFFFFF;display: flex;">
						<image
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riLine-asterisk@3x.png"
							mode=""></image>
					</span>
					相关资料
				</div>
				<div class="content" style="height: 250rpx;">
					<div class="choice-article c39" v-if="title != '' " @click="toArticle()">{{title}}</div>
					<div class="bgfff bdash_a8 w80 h80 add_img mr7 mb7" v-if="title == '' " @click="toArticle()"></div>
				</div>
			</div>

			<div class="time">
				<div class="title c38">
					<span class="bgblue" style="background-color: #FFFFFF;display: flex;">
						<image
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riLine-asterisk@3x.png"
							mode=""></image>
					</span>
					任务报酬
				</div>
				<div class="content-bottom">
					<div class="content-bottom-left c78">
						任务报酬金额
					</div>
					<div class="content-bottom-right c38">
						<input class="numinput" type="number" maxlength="4" v-model="rewardAmount"
							@blur="toRewardAmount" placeholder="0" /> <span class="w16 h16 mt2 ml7">元</span>
					</div>
				</div>
				<!-- <div class="content-bottom">
          <div class="content-bottom-left c78">
            手续费
          </div>
          <div class="content-bottom-right c38">
            100%
          </div>
        </div> -->
				<!-- <div class="content-bottom">
          <div class="content-bottom-left c78">
            总金额
          </div>
          <div class="content-bottom-right c38">
            500
          </div>
        </div> -->
			</div>
			<div class="time">
				<div class="title c38">
					<span class="bgblue" style="background-color: #FFFFFF;display: flex;">
						<image
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riLine-asterisk@3x.png"
							mode=""></image>
					</span>
					任务时间
				</div>
				<!-- <div class="content-bottom">
          <div class="content-bottom-left c78">
            周期设置
          </div>
          <div class="content-bottom-right c38">
            单次任务
            <image class="w16 h16 mt2 ml7" :src="downImg"></image>
          </div>
        </div> -->
				<div class="content-bottom">
					<div class="content-bottom-left c78">
						任务结束时间
					</div>
					<div class="content-bottom-right c38">
						<datatimea v-model="startTime" placeholder="请选择竞标结束时间" @change="startEvent" :start="begin">
						</datatimea>
						<image class="w16 h16 mt2 ml7" :src="downImg"></image>
					</div>
				</div>

			</div>

			<div class="time" style="padding-bottom: 50rpx;">
				<div class="title c38">
					<span class="bgblue"></span>
					完成标准
				</div>
				<textarea style="margin-left: 30rpx; padding: 20rpx;" value="" v-model="finishStandard"
					placeholder="请输入完成标准" />
			</div>

			<div class="time" style="padding-bottom: 50rpx;">
				<div class="title c38">
					<span class="bgblue"></span>
					备注
				</div>
				<textarea style="margin-left: 30rpx; padding: 20rpx;" value="" v-model="taskRemark"
					placeholder="请输入备注" />
			</div>


			<!-- <view class="" style="height: 140rpx; background-color: #FFFFFF;">
			</view> -->


		</div>
    <div class="confirm-btn" @click="preservation">
    	发 布
    </div>

	</div>
</template>

<script>
	import WXAJAX from '../../../utils/request.js';
	import util from "@/utils/index";
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
				rewardAmount: '',
				videoId: '',
				self_photos: [],
				finishStandard: '',
				taskRemark: '',
				taskType: '',
			}
		},
		onLoad(options) {

			if (options.taskType) {
				this.taskType = options.taskType;
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
			//删除图片
			delImg(index) {
				wx.showLoading();
				this.self_photos.splice(index, 1);
				wx.hideLoading();
			},
			//上传图片
			async uploadpic(str, count) {
				this.showPageStatus = "0";
				let path = await util.chooseImage("file", count);
				if (!(path instanceof Array)) return;
				this.uploadImgFun(path, 0, str);
			},
			async uploadImgFun(arr, index = 0, str) {

				await this.uploadImg(arr[index], str);
				if (index < arr.length - 1) {
					this.uploadImgFun(arr, index + 1, str);
				}
			},
			uploadImg(path, str) {
				if (str == "self" && this.self_photos.length >= 9) {
					wx.showToast({
						title: "最多选择9张！",
						duration: 1500,
						icon: "none"
					});
					return;
				}
				wx.showLoading({
					mask: true
				});
				return WXAJAX.UploadImage(path)
					.then(data => {

						wx.hideLoading();
						data = JSON.parse(data);
						if (data.code == "200") {
							if (str == "self") {
								this.self_photos.push(`${WXAJAX.imgBackUrl}${data.data}`);
								this.$emit('img_tap', this.self_photos, this.number)
							}
						} else {
							wx.showToast({
								title: "网络异常",
								duration: 2000,
								icon: "none"
							});
						}
					})
					.catch(err => {
						wx.hideLoading();
					});
			},
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
					url: `../../companyPack/selectArticle/main?type=${type}`
				})
			},
			//去选取接收人页面
			toSelectstaff() {
				var id = uni.getStorageSync('COMPANYID')
				// var id = this.$store.state.companyId
				var taskType = this.taskType;
				wx.navigateTo({
					url: `../../companyPack/selectstaff/main?id=${id}&taskType=${taskType}`
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
			// toShareNum(e){

			//   var reg = /^\+?[1-9]\d{0,3}(\.\d*)?$/
			//   if(!reg.test(e.detail.value)){
			//     wx.showToast({
			//       title:'请输入正确的数字',
			//       icon:'none',
			//       duration: 2000
			//     })
			//     return false
			//   }
			//   this.shareNum = e.detail.value
			// },
			// toVisitNum(e){
			//   var reg = /^\+?[1-9]\d{0,3}(\.\d*)?$/
			//   if(!reg.test(e.detail.value)){
			//     wx.showToast({
			//       title:'请输入正确的数字',
			//       icon:'none',
			//       duration: 2000
			//     })
			//     return false
			//   }
			//   this.visitNum = e.detail.value
			// },
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
				// this.isLoading = true;
				// try {
				//   let data = await WXAJAX.POST(
				//     {taskCustomerId:this.taskCustomerId,userId:this.userId,type:2,},
				//     "",
				//     "/customerEssay/queryTaskCustomer"
				//   );
				//   if (data) {
				//     this.startTime = this.timestampToTime(data.startTime)
				//     this.endTime = this.timestampToTime(data.endTime)
				//     this.staffid  = data.taskUsers
				//     this.title = data.title,
				//     this.companyId = data.companyId,
				//     this.dynamicId = data.dynamicId,
				//     this.shareNum = data.shareNum,
				//     this.visitNum = data.visitNum,
				//     this.taskName = data.visitNum
				//   }
				//   this.isLoading = false;
				//   wx.hideLoading();
				// } catch (error) {
				//   this.isLoading = false;
				//   wx.hideLoading();
				//   // console.log(".............", error);
				// }
			},
			startEvent(data) {
				console.log(data, "空间和客户")
				this.startTime = data.fmt1 + ' 00:00:00'
				// this.startTime = data.fmt1 +' '+ data.hh + ':' + data.mm +':' + data.ss
			},
			endEvent(data) {
				console.log(data)
				this.endeTime = data.fmt1 + ' 23:59:59'
				// this.endTime = data.fmt1 +' '+ data.hh + ':' + data.mm +':' + data.ss
			},
			preservation() {
				if (this.dynamicId == '' || this.taskContent == '' || this.taskName == '' || this.startTime ==
					'' || this
					.rewardAmount == '') {
					wx.showToast({
						title: '请将信息选填完整',
						icon: 'none',
						duration: 2000
					})
					return false
				}

				this.getAddTaskCustomer(this.dynamicId)
				// let that=this
				// if(this.staffid.length>1){

				//   let rewardAmount = this.rewardAmount * this.staffid.length;

				//   wx.showModal({
				//     title: '提示',
				//     content: '您选择了多个接收人，将花费'+rewardAmount+'元',
				//     success: function(res) {
				//       if (res.confirm) {
				//           that.getAddTaskCustomer(that.dynamicId)
				//       } else if (res.cancel) {
				//       console.log('用户点击取消')
				//       }
				//     }
				//   })
				// }else{
				//   that.getAddTaskCustomer(that.dynamicId)
				// }


			},
			async getAddTaskCustomer(dynamicId) {
				wx.showLoading({
					mask: true
				})
				this.isLoading = true;
				let attachmentUrl = ''
				attachmentUrl = this.self_photos.toString()
				WXAJAX.POST({
						companyId: uni.getStorageSync('COMPANYID'),
						dynamicId: dynamicId,
						endTime: this.endTime,
						shareNum: this.shareNum,
						startTime: this.startTime,
						taskName: this.taskName,
						taskUsers: this.staffid,
						visitNum: this.visitNum,
						userId: uni.getStorageSync('cardId'),
						taskContent: this.taskContent,
						periodSet: this.periodSet,
						rewardAmount: this.rewardAmount,
						attachmentUrl: attachmentUrl,
						finishStandard: this.finishStandard,
						taskRemark: this.taskRemark,
						issue: 1,
						taskState: this.taskType == 2 ? 1 : 2,
						taskType: this.taskType,

					},
					'',
					'/customerEssay/addTaskCustomer',
					'',
					''
				).then(res => {
					wx.showToast({
						title: '发布成功！',
					})
					this.isLoading = false;
					setTimeout(function() {
						uni.navigateBack({
							success:()=>{
								let page = getCurrentPages().pop();
								if(page){
									page.onLoad(page.options)
								}
							}
						})
					},600)
				}).catch(err => {
					this.isLoading = false;
					uni.hideLoading();
				})



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
		/* box-sizing: border-box; */
		/* display: flex; */
		/* flex-direction: column; */
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
		/* overflow: hidden; */
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
		/* width: 240upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap; */
		/* text-align:right */
	}

	.confirm-btn {
		width: 100%;
		height: 98upx;
		line-height: 98upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 36upx;
		background-color: rgba(26, 208, 156, 100);
    margin-top: 20rpx;

	}

	.numinput {
		padding-right: 32upx;
		text-align: right;
	}

	.money {
		display: flex;
		justify-content: space-between;
	}

	.time textarea {
		width: 600rpx;
		background-color: #FFFFFF;
		border-radius: 12rpx;
	}

	.bgblue image {
		width: 100%;
		height: 100%;
	}
</style>
