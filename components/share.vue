<template>
	<div class="newinp">
		<div class="Mask" @click="closeShare()"></div>
		<div class="shareDiv" style="transition: all 0.3s linear 0s;">
			<div class="shareTo">
				<div class="shareToTitle">分享到</div>
				<div class="disflex jsbet align-cen fs13" style="width: 92%;margin-left: 4%;margin-top: 20rpx;">
					<div class="disflex fd jscen align-cen">
						<img style="background-color: #2FCE39;"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/antFill-wechat@1x.png"
							alt="">
						<div>微信好友</div>
						<button class="share-btn" open-type="share">微信好友</button>
					</div>
					<!-- <div class="disflex fd jscen align-cen">
            <img style="background-color: #2FCE39;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/antFill-wechat.png"
              alt="">
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
					<div @click="tofind()" class="disflex fd jscen align-cen">
						<img style="background-color: #6AC0FF;"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/md-slow_motion_video@1x.png"
							alt="">
						<div>发现</div>
					</div>
				</div>
			</div>

			<div class="shareTo">
				<div class="shareToTitle">转发工具</div>
				<div class="disflex jsbet align-cen fs13" style="width: 92%;margin-left: 4%;margin-top: 20rpx;">
					<div @click="page_tap('/pages/companyPack/reward/main','?type=1&dynamicId='+dynamicId+'&videoId='+videoId+'&fileId='+fileId)"
						class="disflex fd jscen align-cen">
						<img style="background-color: #1AD09C;"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/fa-crosshairs@1x.png"
							alt="">
						<div>精准转发</div>
					</div>

					<div @click="page_tap('/pages/companyPack/settingReward/main','?type=1&dynamicId='+dynamicId+'&videoId='+videoId+'&fileId='+fileId)"
						class="disflex fd jscen align-cen">
						<img style="background-color: #01C4A1;"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/st-coin.png"
							alt="">
						<div>设置奖励</div>
					</div>
					<!-- <div class="disflex fd jscen align-cen">
            <img style="background-color: #00DED6;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/antFill-money-collect@1x.png"
              alt="">
            <div>推销转发</div>
          </div> -->
					<div @click="onShareEvent(dynamicId)">
						<img style="background-color: #007C66;"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/md-mms@1x.png"
							alt="">
						<div>海报转发</div>
					</div>
					<div @click="toDynamic" class="disflex fd jscen align-cen">
						<img style="background-color: #0071C4;"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/antOutline-paper-clip@1x.png"
							alt="">
						<div>复制链接</div>
					</div>
				</div>
			</div>
		</div>
		<div class="mask disflex align-cen jscen" v-if="isPreviewImg">
			<div class="disinblock ">
				<div class="disflex flex-end ">
					<img @click="isPreviewImg = false" src="/static/close.png" style="height: 48rpx; width: 48rpx" />
				</div>
				<img class="img-size bradius5" :src="maskImg" />
				<span @click="saveImg" class="bg_line_blue cfff textc fs18 fbold bradius5 lh44 mb15"
					style="width: 465rpx;display: block;margin: 0 auto">保存图片</span>
			</div>
		</div>
	</div>
</template>

<script>
	import WXAJAX from '@/utils/request'
	export default {
		name: "SHARE",
		props: ['dynamicId', 'companyId', 'saveType', 'type', 'videoId', 'fileId'],
		data() {
			return {
				isPreviewImg: false,
				maskImg: '',
			}
		},
		mounted() {

		},
		onShow() {},
		methods: {
			async onShareEvent() {
				wx.showLoading({
					title: '生成海报中',
					mask: true
				});
				await WXAJAX.POST({
					companyId: this.companyId,
					shareType: 4,
					itemId: this.dynamicId
				}, '', '/shareRecord/addShareRecord', '', '', 2).then(data => {
					WXAJAX.POST({
						itemId: this.dynamicId,
						shardRecordId: data
					}, '', '/personal/getDynamicPoster', '', '', 2).then(result => {
						this.maskImg = result
						this.isPreviewImg = true
						wx.hideLoading();
					}).catch(err => {
						uni.showToast({
							title: '生成分享图片失败',
							icon: 'none'
						})
						wx.hideLoading();
					})
				}).catch(err => {
					uni.showToast({
						title: '生成分享图片失败',
						icon: 'none'
					})
					wx.hideLoading();
				})
			},
			// 保存图片
			saveImg() {
				let path = this.maskImg;
				wx.getImageInfo({
					src: path,
					success: sres => {
						//console.log(sres.path);
						wx.saveImageToPhotosAlbum({
							filePath: sres.path,
							success: res => {
								wx.setNavigationBarColor({
									frontColor: "#000000",
									backgroundColor: "#ffffff",
									animation: {
										duration: 1
									}
								});
								this.isPreviewImg = false;
								wx.showToast({
									title: "保存成功",
									duration: 1000,
									icon: "success",
									mask: true
								});
							},
							fail: res => {
								wx.setNavigationBarColor({
									frontColor: "#000000",
									backgroundColor: "#ffffff",
									animation: {
										duration: 1
									}
								});
								this.isPreviewImg = false;
								wx.showToast({
									title: "保存失败",
									duration: 1000,
									icon: "none",
									mask: true
								});
							}
						});
					}
				})

			},

			closeShare(e) {
				this.$emit('closeShare', e)
			},
			page_tap(url, query) {
				query = query || "";
				this.$emit('closeShare')
				wx.navigateTo({
					url: url + query
				});
				// wx.navigateTo({ url: "../" + url + "/main" + query });
			},
			tofind() {
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
              uni.showToast({
                  title: '成功发布到发现广场，等待审核',
                  duration: 2000,
                  icon:"none"
              });
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
						this.updateviedo(data.videoId, isDiscover)
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
			toDynamic() {
				wx.showToast({
					title: "正在开发中！",
					duration: 1000,
					icon: "none",
					mask: true
				});
			},
			moreTap() {
				this.$emit('moreTap', this.card_msg.recordId, this.card_msg.cardId, this.isdel);
			},
			// 保存图片
			saveImg() {
				let path = this.maskImg;
				wx.getImageInfo({
					src: path,
					success: sres => {
						//console.log(sres.path);
						wx.saveImageToPhotosAlbum({
							filePath: sres.path,
							success: res => {
								wx.setNavigationBarColor({
									frontColor: "#000000",
									backgroundColor: "#ffffff",
									animation: {
										duration: 1
									}
								});
								this.isPreviewImg = false;
								wx.showToast({
									title: "保存成功",
									duration: 1000,
									icon: "success",
									mask: true
								});
							},
							fail: res => {
								wx.setNavigationBarColor({
									frontColor: "#000000",
									backgroundColor: "#ffffff",
									animation: {
										duration: 1
									}
								});
								this.isPreviewImg = false;
								wx.showToast({
									title: "保存失败",
									duration: 1000,
									icon: "none",
									mask: true
								});
							}
						});
					}
				})

			},
		}
	}
</script>

<style>
	.newinp {
		width: 100%;
		height: 100%;
	}

	.Mask {
		position: fixed;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 100%;
		background-color: black;
		opacity: 0.38;
		z-index: 999;
	}

	.shareDiv {
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		z-index: 9999;
		width: 100%;
		height: 550rpx;
		background-color: white;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
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

	.share {
		width: 146rpx;
		height: 54rpx;
		border-radius: 12rpx;
		margin: 0 auto;
		margin-top: 20rpx;
	}

	.review {
		color: rgb(1, 196, 161);
		box-shadow: rgb(196 241 238) 0px 2px 6px 0px;
		width: 96rpx;
		height: 42rpx;
		text-align: center;
		line-height: 42rpx;
		background-color: rgb(196, 241, 238);
		border-radius: 12rpx;
	}

	.review2 {
		width: 96rpx;
		height: 42rpx;
		text-align: center;
		line-height: 42rpx;
		border-radius: 12rpx;
	}

	.review3 {
		width: 50rpx;
		height: 42rpx;
		text-align: center;
		line-height: 42rpx;
		border-radius: 12rpx;
	}

	.share-btn {
		position: absolute;
		opacity: 0;
	}

	::-webkit-scrollbar {

		width: 0;

		height: 0;

		color: transparent;

	}


	/* 保存图片 */
	.share-box {
		display: flex;
		justify-content: center;
		margin-top: 20upx;
		margin-bottom: 30upx;
	}

	.share-img {
		width: 100upx;
		height: 100upx;
	}

	.share-title {
		font-size: 24upx;
		color: #a8a8a8;
		/* line-height:14upx; */
	}

	.share-ornament {
		background: #f5f5f6;
		height: 10upx;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 10000000;
	}

	.img-size {
		width: 600upx;
		height: 600upx;
		margin-top: 30upx;
		margin-bottom: 60upx;
	}

	.content {
		box-sizing: border-box;
		padding: 0 0 118upx 0;
	}

	.content rich-text {
		width: 750upx;
		overflow: hidden;
	}
</style>
