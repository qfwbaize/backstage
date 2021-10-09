<template>
	<view>
		<div class="newinp">
			<div class="wrap" @click="close"></div>
			<div class="popup">
				<view class="btn disflex h70">
					<div class="img">
						<image class="imgs" :src="url" mode=""></image>
					</div>
					<h5>{{tit}}</h5>
					<span>{{time}}由{{name}}添加</span>
					<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/ze-arrow-down.svg"
						mode="" :index='index' class="image" @click="sendMsg(index)"></image>
				</view>

				<view class="btn h60">
					<div class="h56 w162 box-shadow fs14 disflex" @click="forward">
						<image class="imgsize"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/fas fa-share.svg"
							mode=""></image>
						<div class="lh56 ml7">转发文章</div>
					</div>

					<div class="h56 w162 box-shadow ml10 fs14 disflex " @click="deletel">
						<image class="imgsize"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/haFill-26-trash-can.svg"
							mode=""></image>
						<div class="lh56 ml7">删除文章</div>
					</div>
				</view>

				<view class="inp  box-shadow fs14 disflex" @click="edit">
					<image class="imgsize"
						src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/antFill-edit.svg"
						mode="">
					</image>
					<div class="lh56 ml7">编辑</div>

				</view>
				<view class="inp  box-shadow fs14 disflex" @click="jurisdiction">
					<image class="imgsize"
						src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riFill-body-scan-fill.svg"
						mode=""></image>
					<div class="lh56 ml7">权限管理</div>

				</view>
				<view class="inp  box-shadow fs14 disflex" @click="Collection">
					<image class="imgsize"
						src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/md-grade.svg" mode="">
					</image>
					<div calss="lh56 ml7">收藏</div>
				</view>
				<!-- <view class="inp  box-shadow fs14 disflex" @click="addarticle">
					<image class="imgsize"
						src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/md-grade.svg" mode="">
					</image>
					<div calss="lh56 ml7">添加到个人文章</div>
				</view>
				<view class="inp  box-shadow fs14 disflex" @click="addjg">
					<image class="imgsize"
						src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/md-grade.svg" mode="">
					</image>
					<div calss="lh56 ml7">添加到机构文章</div>
				</view> -->

			</div>


			<!-- 功能部分 -->

			<SHARE v-if="share==true" :dynamicId="dynamicId" :companyId="companyId" :saveType="saveType"
				@closeShare="closeShare" class="newshare">
			</SHARE>


		</div>
	</view>


</template>

<script>
	// import WXAJAX from '../../../utils/request';
	import WXAJAX from '../utils/request'
	import SHARE from '@/components/share' //转发
	export default {
		name: "popup",
		components: {
			SHARE
		},
		props: ['name', 'tit', 'time', 'url', 'dynamicId', 'companyId', 'saveType', 'type'],
		data() {
			return {
				share: false,
				index: 1,
				display: 0,
				act: false,
				isCollect: false,
				popup: false
			};
		},
		onLoad() {
			console.log(this.name, "那可怜的看了看");
		},
		methods: {
			addarticle() {
				let url = "/dynamic/copyDynamicInfo"
				let data = {
					dynamicId: this.dynamicId,
					companyId: this.companyId,
					isOrgShow: 0,
					isLibrary: 0,
					isDrafts:0,
					isShow:1
					// this.isOrgShow = 0,
					// this.isLibrary = 1,
				}
				WXAJAX.POST(data, "", url, "", "", 1).then((res) => {
					console.log(res)
					uni.showToast({
						title:'已经存入个人文章'
					})
				})
			},
			addjg(){
				let url = "/dynamic/copyDynamicInfo"
				let data = {
					dynamicId: this.dynamicId,
					companyId: this.companyId,
					isOrgShow: 1,
					isLibrary: 0,
					isDrafts:0,
					isShow:1
					// this.isOrgShow = 0,
					// this.isLibrary = 1,
				}
				WXAJAX.POST(data, "", url, "", "", 1).then((res) => {
					console.log(res)
					uni.showToast({
						title:"已经存入机构文章",
						icon:'none'
					})
				})

			},

			closeShare() {
				this.share = false;
			},
			// 权限管理
			jurisdiction() {
				uni.showToast({
					title: '正在开发中...',
					icon: 'none'
				})

			},
			// 收藏
			Collection() {
				// console.log(this.dynamicId);
				wx.showLoading();


				let url = '/personal/addCollection';

				let request = {
					itemType: 2,
					itemId: this.dynamicId,
				};
				WXAJAX.POST(request, '', url, '', '', 2).then((data) => {
					console.log(data, '收藏返回数据');
					// if (data) {
					// 	// this.isCollect = !this.isCollect;
					// }
					wx.hideLoading();
					wx.showToast({
						title: '收藏成功！',
						icon: 'success'
					});
					// 关闭当前页面跳到指定页面
					setTimeout(function() {
						wx.redirectTo({
							url: '/pages/companyPack/library/main'
						})
					}, 600);
				}).catch((err) => {
					wx.hideLoading();
				});
			},
			// 点击蒙版关闭弹窗
			sendMsg(index) {
				this.$emit('fuck', "0")
			},
			// 点击下拉图标关闭按钮
			close() {
				this.$emit('fuck', '0')
			},
			// 编辑页面
			edit() {
				wx.navigateTo({
					url: '/pages/article/editArticle/main?dynamicId=' + this.dynamicId + '&act=' + this.act
				})
			},
			//转发
			forward() {
				this.share = true
			},
			// 删除事件

			deletel() {

				if (uni.getStorageSync("isBoss") == false) {
					uni.showToast({
						title: "当前帐号非boos号不可删除",
						icon: 'none'
					})
				} else {
					let v = this
					uni.showModal({
						title: '提示',
						content: '确定删除该文章',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								WXAJAX.POST({
									dynamicId: v.dynamicId,
								}, '', '/company/delDynamicInfo').then((data) => {
									wx.showToast({
										title: '删除成功！',
										icon: 'success'
									});
									setTimeout(function() {
										uni.redirectTo({
											url: '/pages/companyPack/library/main'
										})
									}, 600)
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}



			}

		}
	}
</script>

<style>
	.newinp {
		width: 100%;
		height: 100%;
	}

	.popup {
		width: 756rpx;
		height: 80%;
		background-color: #FFFFFF;
		border-top: 1px solid #75DAD8;
		border-radius: 24rpx 24rpx 0px 0px;
		position: fixed;
		bottom: 0rpx;
	}

	.wrap {
		position: fixed;
		top: 0rpx;
		width: 100%;
		height: 20%;
		background-color: black;
		opacity: 0.38;
		z-index: 999;
	}

	.imgs {
		width: 100%;
		height: 100%;
	}

	.image {
		width: 48rpx;
		height: 48rpx;
		position: absolute;
		top: 0rpx;
		right: 0;
	}

	.icfon {
		position: absolute;
		right: 0rpx;

	}

	.imgsize {
		width: 48rpx;
		height: 48rpx;
		margin-top: 36rpx;
		margin-left: 60rpx;
		vertical-align: middle;
	}

	.lh56 {
		line-height: 112rpx;
	}

	.w162 {
		width: 324rpx;
	}

	.h56 {
		height: 112rpx;
	}

	.inp {
		width: 668rpx;
		height: 112rpx;
		margin: 0 auto;
		line-height: 120rpx;
		margin-top: 12rpx;
	}

	h5 {
		width: 270rpx;
		line-height: 32rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		position: absolute;
		top: 10rpx;
		left: 180rpx;
		text-align: left;
	}

	span {
		height: 36rpx;
		color: rgba(141, 141, 141, 100);
		font-size: 24rpx;
		text-align: left;
		position: absolute;
		top: 100rpx;
		left: 180rpx;
		margin-top: 20rpx;
	}

	.img {
		left: 20px;
		top: 508rpx;
		width: 116rpx;
		height: 112rpx;
		border-radius: 6px;
		/* border: 2rpx solid #0066CC; */
		position: absolute;
		top: 10rpx;
	}

	.btn {
		width: 668rpx;
		line-height: 40rpx;
		border-radius: 6px;
		margin: 0 auto;
		margin-top: 24rpx;
		position: relative;
		display: flex;
	}

	.box-shadow {
		box-shadow: 0px 2px 6px 0px rgba(200, 232, 226, 100);
	}
</style>
