<template>
	<div>
		<view class=" ml10 mt20">
			<view class=" mt10 fs14  h20  " style="width: 750rpx;" @click="customer">
				<span class="">客户</span>
			</view>
			<view >
				<checkbox-group @change="checkboxChange($event)">
					<label class="uni-list-cell uni-list-cell-pd">
						<view class=" b1s m0auto disflex bgfff mt10"  v-for="(item,index) in customerlist" :key="index"
							@click="groupMember(item.cardId)"
							style="width: 90%; height: 140rpx; border-radius: 20rpx; ">
							<view class=" ml10" style="margin-top: 60rpx;">
								<checkbox :value="item.cardId" :checked="item.checked" />
							</view>
							<view class=" " style="margin-top: 40rpx; margin-left: 40rpx;">
								<image class="" style="width: 80rpx; height: 80rpx; border-radius: 50%;"
									:src="item.logo" mode=""></image>
							</view>
							<view class="" style="margin-left: 20rpx;margin-top: 50rpx;">
								<span>{{item.name}}</span>
							</view>
						</view>
					</label>
				</checkbox-group>
			</view>
			<view class="mt10 fs14" @click="colleague">
				同事
			</view>

			<view class="fs14 ">
				<checkbox-group @change="checkboxChange($event)">
					<label class="uni-list-cell uni-list-cell-pd">
						<view class=" bgfff mt10  m0auto disflex " v-for="(item,index) in colleaguelist" :key="index"
							style="width: 90%; height: 140rpx; border-radius: 20rpx;"
							@click="groupMember(item.cardId)">
							<view  class="ml10" style="margin-top: 60rpx;">
								<checkbox :value="item.cardId" :checked="item.checked" />
							</view>
							<view class=" " style="margin-top: 40rpx; margin-left: 40rpx;">
								<image class="" style="width: 80rpx; height: 80rpx; border-radius: 50%;"
									:src="item.logo" mode=""></image>
							</view>
							<view class="" style="margin-left: 20rpx;margin-top: 50rpx;">
								<span>{{item.name}}</span>
							</view>
						</view>
					</label>
				</checkbox-group>
			</view>
			<view class=" mt10 fs14" @click="friend">
				好友
			</view>
			<view class="fs14 ">
				<checkbox-group @change="checkboxChange($event)">
					<label class="uni-list-cell uni-list-cell-pd">
						<view  class=" bgfff mt10 b1s m0auto disflex " v-for="(item,index) in friendlist" :key="index"
							@click="groupMember(item.cardId)"
							style="width: 90%; height: 140rpx;border-radius: 20rpx; ">
							<view  class="ml10" style="margin-top: 60rpx;">
								<checkbox :value="item.cardId" :checked="item.checked" />
							</view>
							<view class=" " style="margin-top: 40rpx; margin-left: 40rpx;">
								<image class="" style="width: 80rpx; height: 80rpx;border-radius: 50%;" :src="item.logo"
									mode=""></image>
							</view>
							<view class="" style="margin-left: 20rpx;margin-top: 50rpx;">
								<span>{{item.name}}</span>
							</view>
						</view>
					</label>
				</checkbox-group>
			</view>
			<view class="h100">

			</view>
			<view @click="addgroupMember" class=" w100p h50 textc lh50 cfff "
				style="position: fixed;bottom: 0rpx; background-color: #00D7D0; left: 0rpx; ">
				确定添加该成员
			</view>
		</view>
	</div>
</template>

<script>
	import WXAJAX from '../../../utils/request'
	export default {
		data() {
			return {
				msg: '',

				customerlist: '',

				colleaguelist: "",

				friendlist: "",
				chatGroupId: "",
				cardId: ''
			}
		},
		onLoad(option) {
			this.chatGroupId = option.chatGroupId
		},
		onShow() {
			this.friend()
			this.customer()
			this.colleague()
		},

		methods: {
			// 选中的客户
			checkcustomlist(e) {
				console.log(e);
			},
			checkboxChange(e) {
				console.log(e.detail.value);
				this.cardId = e.detail.value
			},
			texmsg() {
				console.log(this.msg);
			},
			customer() {
				// this.customers = !this.customers
				let url = "/customer/getCustomer"
				let data = {
					customerState: 1,
					name: "",
					pageNum: 1,
					type: 1
				}
				WXAJAX.POST(data, "", url, "", "").then((res) => {
					console.log(res, "客户");
					this.customerlist = res
				}).catch((err) => {
					console.log(err, "---errr");
				})
			},
			colleague() {
				// this.colleague1 = !this.colleague1
				let url = "/businessCard/getCompanyStaffList"
				let data = {
					name: "",
					pageNum: 1,
					type: 1
				}
				WXAJAX.POST(data, "", url, "", "").then((res) => {
					console.log(res, "同事");
					this.colleaguelist = res.list
				}).catch((err) => {
					console.log(err, "---err");
				})

			},
			friend() {
				// this.friend1 = !this.friend1
				// /crmApi/ipa/selectIpaList
				let url = "/ipa/selectIpaList"
				let data = {
					name: "",
					pageNum: 1
				}
				WXAJAX.POST(data, "", url, "", "").then((res) => {
					console.log(res, "好友");
					this.friendlist = res.list

				}).catch((err) => {
					console.log(err, "---errr");
				})

			},

			groupMember(e) {
				// console.log(e, "去啊所谓的");
				// this.cardId = e
			},
			addgroupMember() {
				let url = "/groupMember/batchAdd"
				let data = {
					chatGroupId: this.chatGroupId,
					listCardIds: this.cardId,
					inviteCardId: wx.getStorageSync("cardId"),
					manageLevel:0,
					isDel:0
				}
				WXAJAX.POST(data, "", url, "", "", 1).then((res) => {
					console.log(res, "添加成员");
					if (res) {
						uni.showToast({
							title: "添加成功"
						})
						uni.navigateBack({
							success: () => {
								let page = getCurrentPages().pop();
								if (page) {
									page.onLoad(page.options); //执行上个页面的方法
								};
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
		
	.act{
		box-shadow: 2rpx 2rpx 2rpx 2rpx rgba(0, 215, 208, 30);
	}
		
	.bgc{
		border: 1px solid #F5F5F5;
	}

</style>
