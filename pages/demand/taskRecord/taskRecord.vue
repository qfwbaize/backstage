<template>
	<view class="content">
		<view class="" v-if="times == 1">
			<view class="ml15 mt30">
				<view class="disflex ">
					<div style="width: 28rpx; height: 28rpx; background-color: #00E266;border-radius: 50%;"></div>
					<h3 class="fs16 " style="font-weight: bold; margin-left: 20rpx;">平面设计师（日结）</h3>
				</view>
				<view class="ml20 mt20 over_2 "style="width: 520rpx;
				height: 100rpx;">
					任务规则：到公司完成每日规定任务
				</view>
			</view>
			<view class="ml15 mt55">
				<view class="disflex ">
					<div style="width: 28rpx; height: 28rpx; background-color: #007AFF;border-radius: 50%;"></div>
					<h3 class="fs16 " style="font-weight: bold; margin-left: 20rpx;">添加上班打卡信息</h3>
				</view>
				<view class="ml20 mt20 " @click="chooseLocation()" style="width: 520rpx;">
					当前位置：
					<span> {{address}}</span>
				</view>
				<view class="ml20 mt20" @click="gettime">
					当前时间:
					<span> &nbsp;{{sHours}}:{{sMinutes}}</span>
				</view>
				<view class="w100 h25 textc lh25 fs14 cfff m0auto mt20"
					style="background-color: #919191 ;border-radius: 12rpx;">
					打卡
				</view>
			</view>
			<view class="ml15 mt55">
				<view class="disflex ">
					<div style="width: 28rpx; height: 28rpx; background-color: #007AFF;border-radius: 50%;"></div>
					<h3 class="fs16 " style="font-weight: bold; margin-left: 20rpx;">添加下班打卡信息</h3>
				</view>
				<view class="ml20 mt20  " @click="getress" style="width: 520rpx; height: 100rpx;">
					当前位置:
					{{setress}}

				</view>
				<view class="ml20 mt20" @click="gettimes()">
					当前时间
					{{Hours}}:{{Minutes}}
				</view>
				<view class="w100 h25 textc lh25 fs14 cfff m0auto mt20"
					style="background-color: #1AD09C;border-radius: 12rpx;">
					打卡
				</view>
			</view>
			<view class="h50 lh50"
				style="width: 100%; position: fixed;bottom: 0rpx; background-color: #1AD09C; text-align: center; color: #FFFFFF;">
				提交
			</view>


		</view>
		<view class="listdetail" v-else>

			<!-- <view class="detail_title">明医云视频转发任务</view> -->

			<!-- <view class="detail_text">任务规则：每次转发视频可获得1元奖励，总奖金池为100元。</view> -->

			<view class="detail_finish">任务完成情况</view>

			<!-- <view class="detail_input"><text>已经转发</text><input type="number" placeholder="单行输入" />次</view> -->

			<view class="detail_input"><text>完成百分比</text><input type="number" v-model="progressScale"
					 />%</view>

			<view class="detail_finish" style="margin-top: 20rpx;">上传证据图片</view>

			<view class="confirm-btn" @click="save">提交</view>

			<div class="disflex wrap pt20 pb20 w290 pl20">
				<div class="bgfff w80 h80 mr7 mb7 posre" v-for="(v,k) in self_photos" :key="k">
					<img mode="aspectFill" :src="v" alt="" class="w100p h100p">
					<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/del.png" alt=""
						class="w20 h20 posab right2 top2" @click="delImg(k)">
				</div>
				<div v-if="self_photos.length < 9" class="bgfff bdash_a8 w80 h80 add_img bradius5 mr7"
					@click="uploadpic('self', 9)"></div>
			</div>

      <div class="time" style="padding-bottom: 50rpx;margin-left: 40rpx;">
      	<div class="title c38">进度描述</div>
      	<textarea style="width: 630rpx;padding: 20rpx; background-color: #F5F5F5;margin-top: 20rpx;" value="" v-model="recordText"
      		placeholder="请输入进度描述" />
      </div>

		</view>


	</view>
</template>

<script>
	import WXAJAX from '../../../utils/request.js';
	import util from "@/utils/index";
	export default {
		data() {
			return {
				self_photos: [],
				progressScale: '',
				taskId: '',
				taskStaffId: '',
				times: '',
				address: '获取当前上班位置', //当前位置
				sHours: "0", //时
				sMinutes: "00", //分
				setress: '获取当前下班位置', //下班当前位置
				Hours: "0", //时
				Minutes: "00", //分
        recordText:''

			}
		},
		onLoad(taskId) {
			console.log(taskId)
			// this.gettasklist()
			this.taskId = taskId.taskId
			this.taskStaffId = taskId.taskStaffId
			if (taskId.times) {
				this.times = taskId.times
			}

		},
		methods: {
			gettimes() {
				let getHours = new Date().getHours();
				let getMinutes = new Date().getMinutes();
				console.log(getHours, getMinutes, "十分");
				this.Hours = getHours
				this.Minutes = getMinutes
			},

			getress() {
				let v = this
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						v.setress = res.address
					}
				});

			},
			gettime() {
				let getHours = new Date().getHours();
				let getMinutes = new Date().getMinutes();
				console.log(getHours, getMinutes, "十分");
				this.sHours = getHours
				this.sMinutes = getMinutes

			},

			chooseLocation() {
				let v = this
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						v.address = res.address
					}
				});

			},
			save() {
				let url = this.self_photos.toString()
				var data = {
					taskId: this.taskId,
					progressScale: this.progressScale,
					progressUrl: url,
					taskStaffId: this.taskStaffId,
          progressDesc:this.recordText
				}
				WXAJAX.POST(data, '', '/customerEssay/insertTaskProgress', '', '').then(res => {
					console.log(res)
					if (res) {
						uni.navigateBack({
							delta: 1
						})
					}
				})
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
		}
	}
</script>

<style scoped>
	.content {
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
	}

	.listdetail {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		padding: 40rpx 0;
	}

	.detail_title {
		width: 690rpx;
		height: 46px;
		color: rgba(16, 16, 16, 100);
		font-size: 32px;
		text-align: left;
		font-family: PingFangSC-bold;
		font-weight: bold;
		margin-left: 40rpx;
		margin-bottom: 20rpx;
	}

	.detail_text {
		width: 690rpx;
		height: 134rpx;
		color: rgba(143, 143, 143, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-left: 40rpx;
	}

	.detail_finish {
		width: 690rpx;
		height: 38rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-left: 40rpx;
	}

	.detail_input {
		width: 690rpx;
		height: 60rpx;
		line-height: 60rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		display: flex;
		margin-left: 40rpx;
		margin-top: 20rpx;
	}

	.detail_input text {
		width: 140rpx;
	}

	.detail_input input {
		width: 125rpx;
		height: 60rpx;
		border-radius: 12rpx;
		color: rgba(136, 136, 136, 100);
		font-size: 28rpx;
		font-family: Microsoft Yahei;
		border: 2rpx solid rgba(187, 187, 187, 100);
		margin-right: 26rpx;
		margin-left: 20rpx;
		padding-left: 15rpx;
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
		bottom: 0;
		left: 0;
		z-index: 999;
	}
</style>
