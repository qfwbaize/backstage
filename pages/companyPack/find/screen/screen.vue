<template>
	<view class="app">
		<view class="main">
			<view class="fbold">
				选择行业标签
			</view>
			<view class="screenList">
				<!-- <view :class="tabType == -1 ? 'active' : 'industry'" @click="tab_type_tap(-1,'全部')">
					全部
				</view> -->
				<view v-for="(item,index) in busCardlabelList" :key="index" :class="item.flag ? 'active' : 'industry'"
					@click="tab_type_tap(index,item)">
					{{item.labelTitle}}
				</view>
			</view>
			<view class="fbold mt20">
				选择职业标签
			</view>
			<view class="screenList">
				<!-- 	<view :class="tabTypeB == -1 ? 'active' : 'industry'" @click="tab_type_tapB(-1,'全部')">
					全部
				</view> -->
				<view v-for="(item,index) in zhiweilList" :key="index" :class="item.flag ? 'active' : 'industry'"
					@click="tab_type_tapB(index,item)">
					{{item.labelTitle}}
				</view>
			</view>
			<!-- <view class="btn" @click="baocun">
				<text>清空标签</text>
			</view> -->
			<view class="btn" @click="baocun">
				<text>保存设置</text>
			</view>
		</view>
	</view>
</template>

<script>
	import WXAJAX from "@/utils/request";
	import util from '@/utils/index'
	export default {
		components: {},
		data() {
			return {
				tabType: 0, //当前选择的下标
				tabTypeB: 0, //当前选择的下标
				busCardlabelList: '', //名片列表的标签
				zhiweilList: '',
				zhiweitext: '', //当前选择的职位
				busCardlabeltext: '', //选择的行业
				huancun: '',
			}
		},
		onShow() {
			this.getBusinessCardlabel()
			this.getzhiweilabel()
			// if(wx.getStorageSync('busCardlabelList')){
			// 	console.log('11111',wx.getStorageSync('busCardlabelList'))
			// }
		},
		methods: {
			//保存
			baocun() {
				if (this.busCardlabeltext.length == 0) {
					uni.showToast({
						title: "请选择行业标签",
						icon: "none"
					})
					return
				}
				if (this.zhiweitext.length == 0) {
					uni.showToast({
						title: "请选职业标签",
						icon: "none"
					})
					return
				}
				if (this.busCardlabeltext.length > 0 && this.zhiweitext.length > 0) {
					let data = {
						labelType: 10, //行业
						labelContents: this.busCardlabeltext,
						useSite: '人脉列表',
					}
					WXAJAX.POST(data, '', '/screen/label/add', '', '', 1).then(data => {})
				}
				if (this.zhiweitext.length > 0 && this.busCardlabeltext.length > 0) {
					let data = {
						labelType: 9, //职位
						labelContents: this.zhiweitext,
						useSite: '人脉列表',
					}
					WXAJAX.POST(data, '', '/screen/label/add', '', '', 1).then(data => {
						let pages = getCurrentPages(); //获取所有页面栈实例列表
						let nowPage = pages[pages.length - 1]; //当前页页面实例
						let prevPage = pages[pages.length - 2]; //上一页页面实例
						uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
							delta: 1
						});
					})
				}
			
			},
			//获取行业标签
			getBusinessCardlabel() {
				let data = {
					labelType: 10,
				}
				let aaa = [] //名字瞎鸡儿定义的
				WXAJAX.POST(data, '', '/sys/label/queryList', '', '', 1).then(data => {
					if (data) {
						if (wx.getStorageSync('busCardlabelList')) {
							this.huancun = wx.getStorageSync('busCardlabelList')
							this.busCardlabelList = data
							for (let i = 0; i < this.busCardlabelList.length; i++) {
								for (let j = 0; j < this.huancun.length; j++) {
									if (this.busCardlabelList[i].labelTitle == this.huancun[j].labelContent) {
										this.$set(this.busCardlabelList[i], 'flag', true)
										aaa.push(this.busCardlabelList[i].labelTitle)
										this.busCardlabeltext = aaa

									}
								}
							}
						} else {
							this.busCardlabelList = data
							this.busCardlabelList.forEach(item => {
								this.$set(item, 'flag', false)
							})
						}
					}
				})
			},
			//获取职位标签
			getzhiweilabel() {
				let data = {
					labelType: 9,
				}
				let aaa = []
				WXAJAX.POST(data, '', '/sys/label/queryList', '', '', 1).then(data => {
					if (data) {
						if (wx.getStorageSync('busCardlabelList')) {
							this.huancun = wx.getStorageSync('busCardlabelList')
							this.zhiweilList = data
							for (let i = 0; i < this.zhiweilList.length; i++) {
								for (let j = 0; j < this.huancun.length; j++) {
									if (this.zhiweilList[i].labelTitle == this.huancun[j].labelContent) {
										this.$set(this.zhiweilList[i], 'flag', true)
										aaa.push(this.zhiweilList[i].labelTitle)
										this.zhiweitext = aaa
									}
								}
							}
						} else {
							this.zhiweilList = data
							this.zhiweilList.forEach(item => {
								this.$set(item, 'flag', false)
							})
						}

					}
				})
			},
			tab_type_tap(type, item) {
				let aaa = []
				this.$set(this.busCardlabelList[type], 'flag', !this.busCardlabelList[type].flag)
				this.busCardlabelList.forEach(item => {
					if (item.flag == true) {
						aaa.push(item.labelTitle)
					}
				})
				// aaa = aaa.toString()
				// aaa = aaa.replace(/,/g,"|")
				// this.tabType = type
				this.busCardlabeltext = aaa
				console.log('撒旦萨', aaa)
				// if (!labelTitle) {
				// 	labelTitle = ''
				// }
			},
			tab_type_tapB(type, item) {
				let aaa = []
				this.$set(this.zhiweilList[type], 'flag', !this.zhiweilList[type].flag)
				this.zhiweilList.forEach(item => {
					if (item.flag == true) {
						aaa.push(item.labelTitle)
					}
				})
				// aaa = aaa.toString()
				// aaa = aaa.replace(/,/g,"|")
				// this.tabType = type
				this.zhiweitext = aaa
				console.log('撒旦萨达斯', aaa)
				// if (!labelTitle) {
				// 	labelTitle = ''
				// }
			},
		}
	}
</script>

<style>
	.app {
		background-color: #fff;
		/* height: 100vh; */
	}

	.main {
		padding-top: 40rpx;
		margin: 0 40rpx 0 40rpx;
	}

	.screenList {
		margin-top: 20rpx;
		/* justify-content: space-between; */
		display: flex;
		flex-wrap: wrap;
	}

	.industry {
		margin-top: 20rpx;
		background-color: #EAEAEA;
		padding: 15rpx 18rpx 15rpx 18rpx;
		border-radius: 15rpx;
		margin-right: 20rpx;
		color: #807E7E;
	}

	.active {
		margin-top: 20rpx;
		color: #FFF;
		background-color: #51cdcb;
		transition: all .2s;
		padding: 15rpx 18rpx 15rpx 18rpx;
		border-radius: 15rpx;
		margin-right: 20rpx;
	}

	.btn {
		margin-top: 200rpx;
		padding-bottom: 200rpx;
		text-align: center;
	}

	.btn text {
		padding: 10rpx 40rpx 10rpx 40rpx;
		border-radius: 18rpx;
		background-color: #51cdcb;
		color: #fff;
	}
</style>
