<template>
	<div>
		<view class="">
			<view class=" order-item disflex jsbet  bgfff mt10  overhidden" :style="'right:'+item.right+'px'"
				:data-index="index" @touchstart="drawStart" @touchmove="drawMove" @touchend="drawEnd"
				v-for="(item,index) in list " :key="index">
				<div class="disflex  jsaround">
					<div class="mt10 ml10">
						<image style="width: 100rpx; height: 100rpx; border-radius: 50%; " :src="item.cardLogo" mode="">
						</image>
					</div>
					<div class="fs14 ml20 " style="line-height: 140rpx;">管理级别：{{item.msg}}</div>
					<div class="fs14 ml20 " style="line-height: 140rpx;">{{item.cardName}}</div>
				</div>
				<!-- 删除 -->
				<div class="fs14 ml20" style="color: #FF0000; line-height: 140rpx; margin-right: 20rpx;"
					@click="del(item.groupMemberId,item.cardId,item.manageLevel)">删除该成员</div>
			</view>
		</view>
		<view class="h100">
			
		</view>
		<view class="disflex w100p " style="position: fixed;bottom: 0rpx;">
			<view class=" fs14 w33p h50 lh50 textc" style="background-color: #00D7D0 ; color: #FFFFFF;"
				@click="togroupMember">
				添加群成员
			</view>
			<view class=" fs14 w33p h50 lh50 textc" style="background-color: #1AD09C  ; color: #FFFFFF;"
				@click="editgroup">
				修改群信息
			</view>
			<view v-if="GroupcardId == cardId" class=" fs14 w33p h50 lh50 textc"
				style="background-color: #4E9FED  ; color: #FFFFFF;" @click="delgroup">
				解散该群
			</view>
			<view v-else class=" fs14 w33p h50 lh50 textc" style="background-color: #4E9FED  ; color: #FFFFFF;"
				@click="Mydel(GroupMycardId,cardId,0)">
				退出该群
			</view>
		</view>

	</div>
</template>

<script>
	import WXAJAX from '../../../utils/request'
	export default {
		data() {
			return {
				id: '',
				list: [],
				msg: '',
				identifier: "",
				startX: '',
				delBtnWidth: 100,
				cardId: '',
				GroupcardId: '',
				GroupMycardId: ""

			}
		},
		onLoad(option) {
			console.log(option);
			this.id = option.id

			uni.setNavigationBarTitle({
				title: "群员列表"
			})
			this.GroupcardId = uni.getStorageSync("GroupcardId")
			this.cardId = uni.getStorageSync("cardId")
		},
		onShow() {
			this.groupMember()

		},

		methods: {
			//开始触摸滑动
			drawStart(e) {
				// console.log("开始触发");
				var touch = e.touches[0];
				this.startX = touch.clientX;
			},
			//触摸滑动
			drawMove(e) {
				// console.log("滑动");
				for (var index in this.list) {
					this.$set(this.list[index], 'right', 0);
				}
				var touch = e.touches[0];
				var item = this.list[e.currentTarget.dataset.index];
				var disX = this.startX - touch.clientX;
				if (disX >= 20) {
					if (disX > this.delBtnWidth) {
						disX = this.delBtnWidth;
					}
					this.$set(this.list[e.currentTarget.dataset.index], 'right', disX);
				} else {
					this.$set(this.list[e.currentTarget.dataset.index], 'right', 0);
				}
			},
			//触摸滑动结束
			drawEnd(e) {
				// console.log("滑动结束");
				var item = this.list[e.currentTarget.dataset.index];
				if (item.right >= this.delBtnWidth / 2) {
					this.$set(this.list[e.currentTarget.dataset.index], 'right', this.delBtnWidth);
				} else {
					this.$set(this.list[e.currentTarget.dataset.index], 'right', 0);
				}
			},
			del(groupMemberId, cardId, manageLevel) {
				console.log(groupMemberId, cardId, manageLevel, );
				let card = uni.getStorageSync("cardId")
				let GroupcardId = uni.getStorageSync("GroupcardId")
				if (GroupcardId == card) {
					let url = "/groupMember/update"
					let data = {
						groupMemberId: groupMemberId,
						isDel: 1,
						chatGroupId: this.id,
						cardId: cardId
					}
					WXAJAX.POST(data, "", url, "", "", 1).then((res) => {
						console.log(res, "删除");
						if (res) {
							this.groupMember()
						}
					})
				} else {
					uni.showToast({
						title: "抱歉您没有管理群员的权限，请联系群主给予管理权限",
						icon: "none"
					})
				}
			},
			Mydel(groupMemberId, cardId, manageLevel) {
				console.log(groupMemberId, cardId, manageLevel, );
				let card = uni.getStorageSync("cardId")
				let GroupcardId = uni.getStorageSync("GroupcardId")
				 let v = this
				uni.showModal({
					title: '提示',
					content: '是否确定退出该群',
					success: function(res) {
						if (res.confirm) {
							let url = "/groupMember/update"
							let data = {
								groupMemberId: groupMemberId,
								isDel: 1,
								chatGroupId: v.id,
								cardId: cardId
							}
							WXAJAX.POST(data, "", url, "", "", 1).then((res) => {
								console.log(res, "删除");
								if (res) {
									uni.navigateBack({
										delta: 2,
										success: () => {
											let page = getCurrentPages().pop();
											if (page) {
												page.onLoad(page.options); //执行上个页面的方法
											};
										}
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			},
			// 解散群
			delgroup() {
				let v = this
				uni.showModal({
					title: '提示',
					content: '危险！您确定要解散改群吗？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							let url = "/chatGroup/update"
							let data = {
								chatGroupId: v.id,
								isDel: 1
							}
							WXAJAX.POST(data, "", url, "", "", 1).then((res) => {
								console.log(res, "解散群");
								if (res) {
									uni.navigateBack({
										delta: 2,
										success: () => {
											let page = getCurrentPages().pop();
											if (page) {
												page.onLoad(page.options); //执行上个页面的方法
											};
										}
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			editgroup() {
				uni.navigateTo({
					url: './establish?&id=' + this.id
				})
			},
			// 添加群成员
			togroupMember() {
				uni.navigateTo({
					url: './update?&chatGroupId=' + this.id
				})
			},
			// 查询群成员
			groupMember() {
				let url = "/groupMember/queryPage"
				let data = {
					chatGroupId: this.id,
					isDel: 0
				}
				WXAJAX.POST(data, "", url, "", "", 1).then((res) => {
					this.list = res.list
					this.list.forEach((item, i) => {
						if (this.list[i].manageLevel == 3) {
							this.list[i].msg = "群主"
							uni.setStorageSync("GroupcardId", this.list[i].cardId)
						} else if (this.list[i].manageLevel == 2) {
							this.list[i].msg = "管理员"
						} else if (this.list[i].manageLevel == 1) {
							this.list[i].msg = "管理员助理"
						} else {
							this.list[i].msg = "成员"
							if (this.list[i].cardId == this.cardId) {
								this.GroupMycardId = this.list[i].groupMemberId
								console.log(this.GroupMycardId, "你他娘的真是个天才");
							}
						}
					})
					console.log(this.list, "群成员");
				})
			}
		}
	}
</script>

<style scoped>
	.remove {
		width: 80px;
		height: calc(100% - 20rpx);
		background-color: red;
		color: white;
		position: absolute;
		top: 0;
		right: -120rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		margin-top: 20rpx;
		border-radius: 10rpx;
	}

	.order-item {
		width: 920rpx;
		display: flex;
		position: relative;
	}
</style>
