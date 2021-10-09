<template>
	<view class="app">
		<view class="main" v-for="(item,index) in demand_lists" :key="index" 	@click="demand_detall(item.squareId,item.companyId)">
			<view class="content">
				<view class="titletext">
					{{item.note}}
				</view>
				<view class="contentimg">
					<!-- v-if="item.images.length == 1" -->
					<view class="img" v-if="JSON.parse(item.images).length <2">
						<image :src="v" @tap.stop="previewImage($event,item.images)"
						:data-src="v"	v-for="(v,k) in JSON.parse(item.images)" :key="k" mode=""></image>
					</view>
					<view class="img1" v-if="JSON.parse(item.images).length >= 2">
						<image :src="v" @tap.stop="previewImage($event,item.images)"
						:data-src="v"	v-for="(v,k) in JSON.parse(item.images)" :key="k" mode=""></image>
					</view>
				</view>
			</view>
			<view class="time">
				<view class="timetext">
					{{item.createdTime}} <text @click.stop="delDemandSquare(item.squareId)"
						style="color: #01C4A1;margin-left: 20rpx;">删除</text>
				</view>
			</view>
		</view>
		<view class="h60" />
		<div class="disflex fs18 textc lh49 fix_bottom">
			<span class="w100p bg_line_blue cfff" @click.stop="page_turn()">发布招商信息</span>
		</div>
	</view>
</template>

<script>
	import WXAJAX from "@/utils/request";
	import util from "@/utils/index";
	export default {
		data() {
			return {
				demand_lists: [], //列表
				panghu: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201712%2F03%2F20171203175932_QB28H.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626838641&t=1a2f05736b891ccbf01e1886cddafc44',
			}
		},
		onShow() {
			this.demand_lists = []
			this.getPageUser()
		},
		methods: {
			page_turn() {
				uni.navigateTo({
					url: '/pages/demand/writedemand/writedemand'
				})
			},
      // 供求详情页面跳转
      demand_detall(squareId, companyId) {
      	wx.navigateTo({
      		url: `/pages/companyPack/find/detall/main?companyId=${companyId}&squareId=${squareId}`
      	})
      },
			getPageUser() {
				wx.showLoading({
					title: '加载中...',
					mask: true
				})
				let v = this
				let data = {
					// companyId: wx.getStorageSync('SELFCOMPANYID') || ''
          settingId:'',
          labelContent:'',
					cardId: wx.getStorageSync('cardId')
				}
				WXAJAX.POST(data, '', '/demandSquare/queryPageMyDemandSquare', "", "", ).then(data => {
						uni.hideLoading()
						if (data.list) {
							console.log('小酒窝长睫毛是你最美的记号', data)
							v.demand_total = data.total
							v.demand_lists = [...v.demand_lists, ...data.list]

						} else {
							wx.hideLoading()
						}
					})
					.catch(err => {

						wx.hideLoading()
						wx.showToast({
							title: err,
							icon: 'none'
						})
					});
			},
			//删除
			delDemandSquare(squareId) {
				wx.showLoading({
					title: '加载中...',
					mask: true
				})
				let v = this
				let data = {
					// companyId: wx.getStorageSync('SELFCOMPANYID') || ''
					squareId: squareId
				}
				WXAJAX.POST(data, '', '/demandSquare/deleteDemandSquare').then(data => {
						uni.hideLoading()
						wx.showToast({
							title: '删除成功',
							icon: 'none'
						})
						v.demand_lists = []
						this.getPageUser()

					})
					.catch(err => {

						wx.hideLoading()
						wx.showToast({
							title: err,
							icon: 'none'
						})
					});
			},
			previewImage(e, img) {
				var tu = JSON.parse(img)
				var current = e.target.dataset.src
				wx.previewImage({
					// urls: [urls + '.primary.png'],
					current: current,
					urls: tu
				})
			},
		},
	}
</script>

<style>
	.app {
		/* height: 100vh; */
		background: #fff;
	}

	.main {
		margin: 0 40rpx 0 40rpx;
		padding-top: 40rpx;
	}

	.content {
		width: 100%;
	}

	.titletext {
		font-size: 28rpx;
	}

	.contentimg {
		margin-top: 18rpx;
		display: flex;
		display: -webkit-flex;

	}

	.contentimg .img {
		width: 668rpx;
		height: 410rpx;
	}

	.contentimg .img image {
		width: 100%;
		height: 100%;
	}

	.contentimg .img1 {
		width: 668rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.contentimg .img1 image {
		width: 320rpx;
		height: 192rpx;
	}

	.contentimg .img1 image:nth-child(n + 3) {
		margin-top: 20rpx;
	}

	.time {
		margin-top: 18rpx;
	}

	.timetext {
		font-size: 28rpx;
	}
</style>
