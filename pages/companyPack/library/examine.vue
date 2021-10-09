<template>
	<div v-if="list">
		<div style="min-height: 900rpx; background-color: white; " class=" w100p h100p">
			<view style="width: 96%;margin-left: 2%;" v-if="list.type == 3 || list.type == 1">
				<div class="fs14 textc mt20 fbold">{{list.title}}</div>
				<image :src="list.photos" mode=""></image>
				<rich-text :nodes="list.details"></rich-text>
			</view>

			<view class="" v-if="list.type == 6">
				<div class=" textc mt10"> {{list.title}} </div>
				<view class=" mt10" style=" width: 750rpx;">
					<video class="" style="width: 100%;" class="" :src="list.url" controls></video>
				</view>
			</view>
		</div>
		<view class="" @click="talk">
			联系他
		</view>

		<view class=" fs14 w200 ml20 mt10">
			<div>投稿时间:<span class="fs12">{{list.createTimeStr}}</span></div>
			<div>投稿来源：<span class="fs12">{{msg}}</span></div>
			<div>投稿人：
				<span class="fs12">{{contributeCardName}}</span>
			</div>
			<div>所属机构：<span class="fs12 ">{{contributeCompanyName}}</span></div>
		</view>
		<view class="h100">
		</view>

		<view class="disflex " style="position: fixed; bottom: 0rpx; width: 100%;">
			<div class="h50 lh50 textc cfff" style="width: 50%; background-color: #228B22;"
				@click="examine(1,isLibrarys,list.isOrgShow)">审核通过
			</div>
			<div class="h50 lh50 textc cfff" style="width: 50%; background-color: #DD524D;"
				@click="examine(2,isLibrary,list.isOrgShow)">审核不通过
			</div>
		</view>
		<view v-if="shareDiv == true" class="" style="position: fixed;bottom: 100rpx;">
			<div class="shareDiv" @click="toshareDiv"></div>
			<div class="warn" style="border: 1px solid #000000;">
				<div>请填写未通过原因</div>
				<div><input class="" style="border: 1px solid #000000;" type="text" value="" v-model="text" @blur="" />
				</div>
				<div @click="shure" class="lh40 textc m0auto mt10"
					style="width: 200rpx; height: 100rpx; background-color: #007AFF; color: #FFFFFF;">确定</div>
			</div>
		</view>
	</div>
</template>

<script>
	import WXAJAX from '../../../utils/request';
	import {
		authSubscribeComment,
		authSubscribeMessage
	} from '@/utils/auth.js';
	export default {
		data() {
			return {
				text: '',
				shareDiv: false,
				dynamicId: '',
				list: '',
				msg: '内部投稿',
				contributeCardName: '',
				contributeCompanyName: '',
				isLibrary: 0,
				isLibrarys: 1,
				cardId: ""
			};
		},
		onLoad(option) {
			this.dynamicId = option.dynamicId
		},
		onShow() {
			this.getInits()

		},
		methods: {
			talk() {
				// console.log(this.cardId);
				// console.log(this.dynamicId);
				let url = "/businessCard/cardDetails"
				let data = {
					cardId: this.list.contributeCardId,
				}
				WXAJAX.POST(data, "", url, "", "", 2).then((res) => {
					console.log(res,"11111111111");
					this.row_tap(res.userId, res.cardId, res.logo, res.name, res.wxCode, res.phone, res
						.companyId,this.dynamicId)
				})

			},
			row_tap(id, cardid, logo, name, wxCode, phone, companyId,dynamicId) {
				// console.log(id ,cardid,name,wxCode,phone,companyId,"跳转到聊天获取的信息");
				uni.navigateTo({
					url: '../../IM/main?userId=' + id + '&logo=' + logo + '&type=2&cardId=' + cardid + '&name=' +
						name +
						'&wxCode=' + wxCode + '&phone=' + phone + '&companyId=' + companyId + '&itemId=' +
						dynamicId
				})
			},
			// 刷新
			getBack() {
				uni.navigateBack({
					success: () => {
						let page = getCurrentPages().pop();
						if (page) {
							page.onLoad(page.options); //执行上个页面的方法
						};
					}
				})
			},
			shure() {
				console.log(this.text, "卢本伟牛逼");
				this.shareDiv = false
			},
			toshareDiv() {
				this.shareDiv = false
			},
			getInits() {

				return WXAJAX.POST({
					dynamicId: this.dynamicId,
					isAddReadNum: 0,

				}, '', '/dynamic/getDynamicDetail', '', '', 1).then((res) => {
					console.log(res);
					this.list = res
					// console.log(this.list,"11111111111111");
					this.cardId = this.list.cardId
					if (res.contributeCompanyId && res.contributeCardName !== res.name) {
						this.msg = "外部投稿"
						this.contributeCardName = res.contributeCardName
						this.contributeCompanyName = res.contributeCompanyName

					} else {
						this.msg = "内部投稿"
						this.contributeCardName = res.name
						this.contributeCompanyName = res.companyName
					}
				})
			},
			// https://api.mingyicloud.com/schedulingsApi/dynamic/updateShowByDynamicId
			examine(i, v, isOrgShow) {
				let list = this.list
				if (list.type == 1 || list.type == 3) {
					let url = "/dynamic/updateShowByDynamicId"
					let data = {
						dynamicId: this.dynamicId,
						isShow: i,
						// isLibrary: v,
						isOrgShow: isOrgShow
					}
					WXAJAX.POST(data, "", url, "", "", 1).then((res) => {
						if (res.isShow == 1) {
							uni.showToast({
								title: '审核通过',
								icon: "none"
							})
							this.getBack()
						} else if (res.isShow == 2) {
							uni.showToast({
								title: "审核未通过",
								icon: "none"
							})
							this.getBack()
							this.shareDiv = true
						}
					})
				} else if (list.type == 6) {
					let url = "/shortVideo/update"
					let data = {
						videoId: this.list.shortVideoId,
						isShow: i,
						isOrgShow: 1
					}
					WXAJAX.POST(data, "", url, "", "").then((res) => {
						if (res.isShow == 1) {
							uni.showToast({
								title: '视频审核通过',
								icon: "none"
							})
							this.getBack()
						} else if (res.isShow == 2) {
							uni.showToast({
								title: "视频审核未通过",
								icon: "none"
							})
							this.getBack()
							this.shareDiv = true
						}

					})
				}
			}
		}
	};
</script>

<style scoped>
	.shareDiv {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.warn {
		width: 100%;
		height: 400rpx;
		overflow: hidden;
		position: fixed;
		right: 0;
		bottom: 0;
		margin: auto;
		border-radius: 8px;
		background-color: #fff;
	}
</style>
