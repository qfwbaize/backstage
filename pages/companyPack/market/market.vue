<template>
	<div class="box">
		<view class="">
			<!-- 管理部门 -->
			<view class="department">
				<view class="">共({{nembur}})人</view>
				<view class="" style="color: #007AFF;" v-if="isboss" @click="todepart()">管理部门</view>
			</view>
			<!-- 列表详情 -->
			<view class="" style="margin-top: 26rpx;">
				<view class="particulars" @click="toeditorial(item.cardId)" v-for="(item,index) in staffdetails"
					:key="index">
					<image :src=item.logo mode=""></image>
					<view class="employee">{{item.name}}</view>
				</view>
			</view>
			<view class="sectionlist" v-show="issection">
				<view class="" style="display: flex;">
					<!-- <view class="addlist" @click="toaddmenebers()">添加成员</view> -->
					<view class="addlist" @click="nomenclature()">修改当前部门名称</view>
					<view class="addlist" @click="management()">更多管理</view>
				</view>
			</view>
		</view>
		<!-- 更多管理的弹出框 -->
		<view class="" v-show="ismanage">
			<view class="" style="position: fixed;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.5);"
				@click="nomanage()"></view>
			<view class="warn">
				<view class=""
					style="background-color: #FFFFFF;padding-top: 32rpx;padding-left: 34rpx;padding-bottom: 34rpx;">
					<view class="" style="font-size: 30rpx;color: #101010;" @click="tobatchmove()">批量移动成员</view>
					<!-- <view class="" style="font-size: 30rpx;color: #101010;">设置管理员</view> -->
					<view class="" style="font-size: 30rpx;color: #101010;margin-top: 40rpx;margin-bottom: 40rpx;"
						@click="tomentaut()">设置部门权限</view>
					<view class="" style="font-size: 30rpx;color: #101010;margin-top: 40rpx;" @click=" deleteclature()">删除当前部门</view>
				</view>
			</view>
		</view>
		<!-- 修改部门名称 -->
		<view class="" v-show="ispopup">
			<view class="" style="position: fixed;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.5);"
				@click="nosection()"></view>
			<view class="warn">
				<view class="" style="background-color: #FFFFFF;">
					<view class="tianlist">修改部门名称</view>
					<view class="">
						<input class="inputt" type="text" value="" placeholder="请输入部门名称" v-model="newly" />
					</view>
					<view class=""
						style="display: flex;flex-direction: row-reverse;margin-top: 96rpx;padding-bottom: 24rpx;">
						<view class="" style="margin-right: 72rpx;color: #0266BC;" @click="determine()">确定</view>
						<view class="" style="margin-right: 72rpx;" @click="remove()">取消</view>
					</view>
				</view>
			</view>
		</view>
	</div>
</template>

<script>
	import WXAJAX from "@/utils/request"
	export default {
		data() {
			return {
				particlist: '',
				issection: false,
				ismanage: false, //控制更多管理的显隐
				ispopup: false, //控制弹出框的显隐
				newly: '', //部门名称
				partmenid: '', //部门id
				staffdetails: '',
				department: '',
				nembur: 0,
        isboss:''
			}
		},
		onLoad(e) {
			this.partmenid = e.departmentId
      
		},
		onShow() {
			this.getstaff()
       this.isboss = uni.getStorageSync('isBoss')
		},
		methods: {
			// 查询部门详情
			getstaff() {
				WXAJAX.POST({
					departmentId: this.partmenid,
				}, '', '/department/query', '', '', 1).then((res) => {
					this.particlist = res
					this.getcomypor()
					uni.setNavigationBarTitle({
						title: this.particlist.department
					});
				})
			},
			// 查询公司人员
			getcomypor() {
				WXAJAX.POST({
					ignore: true,
					department: this.particlist.department,
				}, '', '/businessCard/getCompanyStaffList', '', '', ).then((res) => {
					this.staffdetails = res.list
					this.nembur = res.totalNumber
				})
			},
			// 修改部门名称
			nomenclature() {
				this.ispopup = !this.ispopup
			},
			// 点击确定的按钮
			determine() {
				this.ispopup = !this.ispopup
				WXAJAX.POST({
					department: this.newly,
					departmentId: this.partmenid,
					departmentDesc: '',
					isDel: 0,
				}, '', '/department/update', '', '', 1).then((res) => {
					uni.showToast({
						title: '修改成功',
						duration: 2000
					});
					this.getstaff()
				})
			},
			// 点击取消的按钮
			remove() {
				this.ispopup = !this.ispopup
			},
			// 删除当前部门
			deleteclature() {
				let v = this
				if (v.nembur != 0) {
					uni.showToast({
						title: '请先将部门人员批量移动出去',
						icon: 'none',
						duration: 2000
					});
				} else {
					uni.showModal({
						title: '删除部门',
						content: '确定是否要删除该部门',
						success: function(res) {
							if (res.confirm) {
								WXAJAX.POST({
									department: v.particlist.department,
									departmentId: v.particlist.departmentId,
									isDel: 1,
								}, '', '/department/update', '', '', 1).then((res) => {
									uni.showToast({
										title: '删除成功',
										duration: 2000
									});
									uni.navigateBack({
										success: () => {
											let page = getCurrentPages().pop(); //跳转页面成功之后
											if (!page) {
												return;
											} else {
												page.onLoad(page
												.options); // page自带options对象.
											}
										}
									})
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			// 跳到编辑成员
			toeditorial(cardId) {
				let add = cardId
				uni.navigateTo({
					url: "../../companyPack/editorialmembers/editorialmembers?add=" + add
				});
			},
			//更多管理
			todepart() {
				this.issection = !this.issection
			},
			// 更多管理的弹出框
			management() {
				this.ismanage = !this.ismanage
			},
			// 跳转到批量移动成员
			tobatchmove() {
				let end = ''
				uni.navigateTo({
					url: "../../companyPack/batchmove/batchmove?end=" + this.particlist.department
				});
			},
			// 更多管理的遮罩
			nomanage() {
				this.ismanage = !this.ismanage
			},
			// 添加成员设置
			toaddmenebers() {
				uni.navigateTo({
					url: "../../companyPack/addmembers/addmembers"
				});
			},
			// 调转部门设置权限
			tomentaut() {
				uni.navigateTo({
					url: "../../companyPack/mentauthority/mentauthority"
				});
			},
		}
	}
</script>

<style scoped>
	.box {
		/* width: 100%; */
		/* height: 100%; */
		padding-left: 40rpx;
		padding-top: 40rpx;
		padding-right: 42rpx;
	}

	.department {
		display: flex;
		justify-content: space-between;
	}

	.particulars {
		width: 674rpx;
		height: 142rpx;
		background-color: #FFFFFF;
		display: flex;
		border-radius: 12rpx;
		margin-bottom: 30rpx;
	}

	.particulars image {
		width: 110rpx;
		height: 110rpx;
		margin-top: 16rpx;
		margin-left: 30rpx;
		border-radius: 12rpx;
	}

	.employee {
		margin-top: 16rpx;
		font-size: 28rpx;
		color: #101010;
		margin-left: 26rpx;
	}

	.sectionlist {
		width: 100%;
		height: 76rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.addlist {
		flex: 1;
		text-align: center;
		line-height: 76rpx;
		color: #0266BC;
		font-size: 28rpx;
	}

	.warn {
		width: 680rpx;
		overflow: hidden;
		position: fixed;
		right: 5%;
		top: 30%;
		left: 5%;
		margin: auto;
		border-radius: 8px;
		background: rgba(0, 0, 0, -0.5);
	}

	.inputt {
		width: 592rpx;
		height: 60rpx;
		border: 2rpx solid #BBBBBB;
		margin-left: 34rpx;
		margin-top: 48rpx;
	}

	.tianlist {
		color: #101010;
		font-size: 30rpx;
		padding-top: 32rpx;
		margin-left: 34rpx;
		font-family: PingFangSC-regular;
	}
</style>
