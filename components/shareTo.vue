<template>
	<div>
		<div class="Mask" @click="closeShare()"></div>
		<div class="shareDiv">
			<div class="shareTo">
				<div class="shareToTitle">分享到</div>
				<div class="disflex jsbet align-cen fs13" style="width: 92%;margin-left: 4%;margin-top: 20rpx;">
					<div v-show="ifaccurate" class="disflex fd jscen align-cen">
						<img style="background-color: #2FCE39;"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/antFill-wechat@1x.png"
							alt="">
						<div>微信好友</div>
						<button class="share-btn" @click="isShowConfirm=!isShowConfirm">微信好友</button>
					</div>
					<div v-show="!ifaccurate" class="disflex fd jscen align-cen">
						<img style="background-color: #2FCE39;"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/antFill-wechat@1x.png"
							alt="">
						<div>微信好友</div>
						<button class="share-btn" open-type="share">微信好友</button>
					</div>
					<!-- <div class="disflex fd jscen align-cen">
            <img style="background-color: #2FCE39;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/antFill-wechat.png" alt="">
            <div>微信朋友圈</div>
          </div> -->
					<div class="disflex fd jscen align-cen"
						@click="page_tap('/pages/companyPack/choosefriends/main','?type=2&saveType='+ saveType +'&id='+dynamicId+'&cid='+companyId)">
						<img style="background-color: #1AD09C;"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/fas fa-address-book.png"
							alt="">
						<div>站内名片夹</div>
					</div>
					<div
						@click="page_tap('/pages/companyPack/choosefriends/main','?type=1&saveType='+ saveType +'&id='+dynamicId+'&cid='+companyId)">
						<img style="background-color: #2B9BED;"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/fa-users@1x.png"
							alt="">
						<div>机构同事</div>
					</div>
					<div @click="toDynamic" class="disflex fd jscen align-cen">
						<img style="background-color: #6AC0FF;"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/md-slow_motion_video@1x.png"
							alt="">
						<div>发现</div>
					</div>

				</div>
			</div>
		</div>

		<!-- 余额充值 -->
		<view class='toast-box' v-if="isShowConfirm">
			<!-- <view class='toastbg'></view> -->
			<view class='showToast'>
				<view class='toast-title'>
					<text>输入接收人的手机号码</text>
				</view>
				<view class='toast-main'>
					<view class='toast-input'>
						<input type='number' placeholder="请输入手机号" max="11" v-model="precisePhone">
					</view>
				</view>
				<view class='toast-button'>
					<view class='button1'>
						<button @click='balanceisshow'>取消</button>
					</view>
					<view class='button2'>
						<button :data-precisePhone="precisePhone" open-type="share">立即分享</button>
					</view>
				</view>
			</view>
		</view>
	</div>
</template>

<script>
	import WXAJAX from '@/utils/request'
	export default {
		name: "SHARE",
		props: ['dynamicId', 'companyId', 'saveType', 'type', 'videoId', 'fileId', 'ifaccurate', 'pageTitle'],
		data() {
			return {
				isShowConfirm: false,
				precisePhone: ''
			}
		},
		mounted() {

		},


		onShow() {},
		methods: {
			accurate() {

			},
			changePhone() {
				this.$emit('changePhone', this.precisePhone)
			},
			closeShare(e) {
				this.$emit('closeShare', e)
			},
			page_tap(url, query) {
				query = query || "";
				// if(this.saveType == 1){
				this.$emit('save', url, query);

				// }else{
				//   this.$emit('save');
				//   wx.navigateTo({ url:  url + query });
				// }

			},
			balanceisshow() { //切换显示隐藏
				let that = this
				that.isShowConfirm = !that.isShowConfirm
			},
			toDynamic() {
				console.log(this.pageTitle);
				if (this.pageTitle) {
					uni.showToast({
						title: '精准转发不可转发到发现广场',
						icon: "none"
					})
				} else {
					var isDiscover = 1
					let that = this;
					if (this.videoId) {
						//视频
						this.viedofind(isDiscover)
						// this.updateviedo(isDiscover)
					} else {
						WXAJAX.POST({
							dynamicId: this.dynamicId,
						}, '', '/dynamic/copyDynamicInfo', '', '', 1).then((data) => {
							if (data) {
								console.log('文章的', data, this.dynamicId)
								//文章动态
								this.updatefind(isDiscover)
								// crmApi/shortVideo/copy
							} else {
								wx.showToast({
									title: "传参错误",
									icon: "none",
									duration: 1000,
								});
							}
							// that.dynamicId=data.dynamicId;
							// that.title=data.title;
							// data.photos = data.photos ? data.photos.split(',') : [];
							// that.photos=data.photos[0];
						})
					}
				}

			},
			//更新文章的
			updatefind(isDiscover) {
				WXAJAX.POST({
					dynamicId: this.dynamicId,
					isDiscover: isDiscover || 1
				}, '', '/dynamic/updateShowByDynamicId', '', '', 1).then((data) => {
					this.$emit('closeShare')
				})
			},
			// 复制视频
			viedofind(isDiscover) {
				WXAJAX.POST({
					videoId: this.videoId,
				}, '', '/shortVideo/copy').then((data) => {
					if (data) {
						console.log('接口', isDiscover, data)
						this.updateviedo(data, isDiscover)
					}
				})
			},
			updateviedo(data, isDiscover) {
				WXAJAX.POST({
					videoId: data,
					isDiscover: isDiscover || 1
				}, '', '/shortVideo/updateData').then((data) => {
					// wx.showToast({
					// 	title: "审核中",
					// 	icon: "none",
					// 	duration: 1000,
					// });
					this.$emit('closeShare')
				})
			},
			moreTap() {
				this.$emit('moreTap', this.card_msg.recordId, this.card_msg.cardId, this.isdel);
			}
		}
	}
</script>

<style>
	.Mask {
		position: fixed;
		top: 0rpx;
		width: 100%;
		height: 100%;
		background-color: black;
		opacity: 0.38;
	}

	.shareDiv {
		position: fixed;
		bottom: 0rpx;
		width: 100%;
		height: 320rpx;
		background-color: white;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		z-index: 999;
	}

	.shareTo {
		/* margin-top: 77rpx; */
	}

	.shareTo img {
		width: 60rpx;
		height: 63rpx;
		padding: 20rpx 25rpx;
		border-radius: 20rpx;
		margin-bottom: 15rpx;
	}

	.shareToTitle {
		margin-top: 40rpx;
		margin-left: 44rpx;
		font-size: 36rpx
	}

	.share-btn {
		height: 500rpx;
		position: absolute;
		bottom: 24rpx;
		opacity: 0;
	}

	.input {
		border: rgb(26, 208, 195) 1rpx solid;
		width: 200rpx;
		line-height: 50px;
		height: 50rpx;
		padding-left: 10rpx;
		border-radius: 10rpx;
	}

	.subject {
		border: solid;
		width: 670rpx;
		height: 424rpx;
		border-width: 1rpx;
		border-style: solid;
		border-radius: 12rpx;
		padding: 0rpx;
		text-align: center;
		position: relative;
	}


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
		margin-top: 65%;
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
