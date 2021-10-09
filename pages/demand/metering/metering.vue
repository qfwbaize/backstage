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
					<textarea v-model="taskName" placeholder="请输入任务名称" @blur="toTaskName"
						style="height:100%;width: 100%;" />
				</div>
			</div>
			<div v-if="time == 0 " class="h53 disflex jsaround bgfff mt10">
				<span class="mt10">任务奖励</span>
				<view class="w100 disflex mt15">
					<input class="w70 " style="border: 1px solid rgba(187, 187, 187, 100);border-radius: 10rpx;"
						type="number" @blur="getmsg" placeholder="输入金额" v-model="msg" maxlength="4" />/h
				</view>
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
					{{text}}
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
			<view class=" h53 bgfff disflex jsaround mt10 lh50" v-if="time == 0">
				<view class="fs14 ">
					上班打卡
				</view>
				<picker mode="time" :value="setTime" start="09:01" end="21:01" @change="bindTimeChange">
					<view class="uni-input fs14">{{setTime}}</view>
				</picker>
			</view>
			<view class=" h53 bgfff disflex jsaround mt10 lh50" v-if="time == 0">
				<view class="fs14 ">
					下班打卡
				</view>
				<picker mode="time" :value="endTime" start="09:01" end="21:01" @change="bindTimeChange2">
					<view class="uni-input fs14">{{endTime}}</view>
				</picker>
			</view>
			<div class="time" v-if="time == 1">
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
			</div>
			<div class="time">
				<div class="title c38">
					<span class="bgblue" style="background-color: #FFFFFF;display: flex;">
						<image
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riLine-asterisk@3x.png"
							mode=""></image>
					</span>
					{{tasktime}}
				</div>
				<div class="content-bottom" v-if="time == 0">
					<div class="content-bottom-left c78">
						开始时间
					</div>
					<div class="content-bottom-right c38">
						<datatimea :placeholder="endeTime || '请选择开始时间' " @change="endEvent" :start="begin"></datatimea>
						<image class="w16 h16 mt2 ml7" :src="downImg"></image>
					</div>
				</div>
				<div class="content-bottom">
					<div class="content-bottom-left c78">
						结束时间
					</div>
					<div class="content-bottom-right c38">
						<datatimea v-model="startTime" placeholder="请选择结束时间" @change="startEvent" :start="begin">
						</datatimea>
						<image class="w16 h16 mt2 ml7" :src="downImg"></image>
					</div>
				</div>
			</div>
			<view class=" mt10" v-if="time == 0" style="">
				<div style="margin-top: 20rpx; background-color: #FFFFFF; text-align: center;" @click="tomap">获取位置</div>
				<map id="map" markers="covers" style="width: 100% ; height: 440rpx; margin-top: 20rpx;"
					:latitude="latitude" :longitude="longitude">
				</map>
			</view>
			<view class="" style="height: 140rpx; background-color: #FFFFFF;">
			</view>
			<view>打卡范围</view>

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
				time: 0,
				msg: "",
				text: '相关资料（合同）',
				tasktime: '任务周期',
				latitude: 39.909,
				longitude: 116.39742,
				setTime: '1:00',
				endTime: '23:59',
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
		onShow() {},
		mounted() {},
		methods: {
			bindTimeChange(e) {

				this.setTime = e.detail.value
			},
			bindTimeChange2(e) {

				this.endTime = e.detail.value
			},
			tomap() {
				let v = this
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						v.latitude = res.latitude
						v.longitude = res.longitude
						console.log(v.latitude, v.longitude, "人家绿卡就是的离开");
					}
				});
			},
			getmsg(e) {
				this.msg = e.detail.value
				console.log(this.msg, "计时任务每小时");
			},

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
			getStartDate() {},
			timestampToTime(timestamp) {},
			//去选取文章页面
			toArticle() {},
			//去选取接收人页面
			toSelectstaff() {},

			toTaskName(e) {},
			toTaskContent(e) {},
			// toShareNum(e){},
			// toVisitNum(e){},
			toRewardAmount(e) {},

			async getQueryMyTaskDetail() {},
			startEvent(data) {},
			endEvent(data) {},
			preservation() {},
			async getAddTaskCustomer(dynamicId) {}
		},
		destroyed() {},
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
		position: fixed;
		bottom: 0rpx;

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
