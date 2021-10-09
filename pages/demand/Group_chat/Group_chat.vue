<template>
	<view class="content">
		<view class="w100p h50" style="background-color: #FFFFFF;">
			<div class="fs14 lh50 pl15 pr15">我的群</div>
			<div @click="establish" style="position: fixed;right: 0rpx;top: 0rpx;" class="disflex">
				<span class="fs14 lh45" >创建群聊</span>
				<div class="reack mr20 " >+</div>
			</div>
		</view>

		<view class=" b1s m0auto disflex" v-for="(item,index)  in MyChatGroup" :key="index">
			<view class=" " style="margin-left: 20rpx; margin-top: 4rpx;">
				<image class="" style="width: 100rpx; height: 100rpx; border-radius: 10rpx;" :src="item.groupLogo"
					mode=""></image>
			</view>
			<view class="" style="margin-left: 20rpx;margin-top: 4rpx;" @click="toIm(item)">
				<span class="fs18" style="color:#383838">{{item.groupName}}</span>
				<div class="fs12 mt5 cb8 over_1" style="width: 400rpx;">{{item.groupDescribe}}</div>
			</view>
		</view>
	</view>
</template>

<script>
	import WXAJAX from "../../../utils/request";
	export default {
		data() {
			return {
				active: false,
				MyChatGroup: ''
			}
		},
		onShow() {
			this.getMyChatGroup()
		},
		methods: {
			//点击跳转聊天框页面
			toIm(GroupItem) {
				
				uni.navigateTo({
					url: './main?&chatGroupId=' + GroupItem.chatGroupId + '&groupName=' + GroupItem.groupName
				})
			},
			//获取群列表信息
			getMyChatGroup() {
				let url = "/chatGroup/queryPageMyChatGroup"
				let data = {
					groupName: '',
					cardId: uni.getStorageSync('cardId'),
					isDel:0
				}
				WXAJAX.POST(data, "", url, "", "", 1).then((res) => {
					this.MyChatGroup = res.list
				})

			},
			//点击加号控制显示隐藏
			institutions() {
				this.active = !this.active
			},
			//点击跳转到穿件群聊页面
			establish() {
				uni.navigateTo({
					url: './establish'
				})
			},
		}
	}
</script>

<style>
	.content {
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
	}

	.b1s {
		width: 690rpx;
		height: 108rpx;
		padding: 30rpx;
		background-color: #FFFFFF;
		border-bottom: 1px solid #f5f5f6;
	}

	.reack {
		font-size: 60rpx;
		font-weight: bold;
		text-align: center;
	}
</style>
