<template>
	<view>
		<div class="disflex w326 jsbet fs14 m0auto mt45">
			<div>文件夹名称</div>
			<input type="text" value="" class="w200 wrap" placeholder="单行输入" v-model="name" />
		</div>
		<div class="disflex w326 jsbet fs14 m0auto mt45">
			<div>允许查看的机构成员</div>
			<input type="text" value="" class="w170 wrap " placeholder="选择机构成员" v-model="names" />
		</div>
		<ul v-for="(v,index) in list" :key="index">
			<li class="uls disflex jsbet">
				<div class="disflex">
					<image class="w40 h40  bradius50p  mt10 " :src="v.logo" mode=""></image>
					<div class="fs14 ml10 ">{{v.name}}</div>
				</div>
				<div>
					<checkbox-group class="uni-list" @change="checkboxChange(index)">
						<label class="uni-list-cell uni-list-cell-pd">
							<view>
								<checkbox value="" :checked="v.checked"></checkbox>
							</view>
						</label>
					</checkbox-group>
				</div>
			</li>
		</ul>
		<button class="defaul" @click="getto">保存</button>
	</view>
</template>

<script>
	import WXAJAX from "@/utils/request";
	export default {

		data() {
			return {
				arr: '',
				listCardIds: [],
				id: 0, //文件的id
				name: '',
				names: [],
				list: [{
					name: '张三',
					checked: false,
					cardId: 1
				}, {
					name: "李四",
					checked: false,
					cardId: 2
				}],
				menulist: '',
				cardId: []
			}
		},
		onLoad() {
			this.getCompanyStaffList() //获取成员
		},
		onShow() {

		},
		methods: {
			checkboxChange(i) {
				console.log(i);
				let v = this
				this.list[i].checked = !this.list[i].checked
				for (let i = 0; i < this.list.length; i++) {
					if (this.list[i].checked == true) {
						v.cardId.push(v.list[i].cardId)
						v.names.push(v.list[i].name)
						v.names = [...new Set(v.names)]
					} else if (this.list[i].checked == false) {
						v.names.splice(i, 1)
					}
				}
			},
			// 获取机构成员
			async getCompanyStaffList() {
				let _url = "/businessCard/getCompanyStaffList"
				let data = {
					pageNum: 1,
					type: 1
				}
				await WXAJAX.POST(data, '', _url, '', '').then(res => {
					console.log(res, '查询到成员列表');
					this.list = res.list
					console.log(this.list, '列表');
				})
			},
			// 保存
			async getto() {

				if (this.name !== "") {
					this.cardId = [...new Set(this.cardId)]
					if (uni.getStorageSync("isBoss") == true) {
						let id = uni.getStorageSync("cardId")
						this.cardId.push(id)
						this.cardId = [...new Set(this.cardId)]
					}
					let _url = '/org/folder/add'
					let data = {
						folderName: this.name
					}
					await WXAJAX.POST(data, '', _url, "", "", 1).then(res => {
						console.log(res.customFolderId, '成功新建文件')
						this.id = res.customFolderId
						this.getbatchAdd()
						// console.log(this.id);
					}).catch((err) => {
						console.log(err, "err---");
					})
				} else {
					uni.showToast({
						title: '文件名字不能为空',
						icon:"none"
					})
				}

			},
			// 添加权限
			getbatchAdd() {
				let than = this
				let urls = "/org/folder/authority/batchAdd"
				let _data = {
					customFolderId: than.id,
					listCardIds: than.cardId
				}
				WXAJAX.POST(_data, '', urls, '', '', 1).then(res => {
					console.log(res, '添加机构自定义文件夹权限');
					uni.showToast({
						title: "新建文件成功",
						icon: "none",
					})
					setTimeout(function(){
						uni.reLaunch({
							url:'/pages/companyPack/library/main'
						})
					},500)
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
	}

	.uls {
		width: 80%;
		height: 120rpx;
		line-height: 120rpx;
		border-bottom: 1px solid rgba(232, 232, 232, 100);
		margin: 0 auto;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}

	.defaul {
		width: 400rpx;
		height: 84rpx;
		line-height: 84rpx;
		border-radius: 12rpx;
		background-color: rgba(3, 211, 197, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 28rpx;
		text-align: center;
		font-family: Arial;
		border: 1px solid rgba(255, 255, 255, 100);
		position: fixed;
		bottom: 30rpx;
		left: 50%;
		margin-left: -200rpx;
	}

	.w326 {
		width: 652rpx;
	}

	.wrap {
		border: 1px solid rgba(255, 255, 255, 100);
		box-shadow: 0px 2px 6px 0px rgba(196, 241, 238, 100);
		border-radius: 10px;

	}
</style>
