<template>
	<div class="content">
		<view class="disflex ml20" style="width: 670rpx;">
			<div>群聊名称：</div>
			<div class="groupInput">
				<input class="h20" type="text" value="" v-model="msg" placeholder="请输入群聊名称" />
			</div>
		</view>
		<view class="mt20 ml20" style="width: 670rpx;">
			<div>群描述:</div>
			<div class="mt10 groupDescript">
				<textarea placeholder="请输入群描述" v-model="mag"></textarea>
			</div>
		</view>

		<div class="target ml20" style="width: 670rpx;">
			<div class="">
				<span class="bgblue" style="background-color: #FFFFFF;display: flex;">
					<image
						src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riLine-asterisk@3x.png"
						mode=""></image>
				</span>
				上传群头像：
			</div>
			<div class="disflex wrap pt20 pb20">
				<div class="bgfff w80 h80 mr7 mb7 posre" v-for="(item,k) in self_photos" :key="k">
					<img mode="aspectFill" :src="item" alt="" class="w100p h100p">
					<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/del.png" alt=""
						class="w20 h20 posab right2 top2" @click="delImg(k)">
				</div>
				<div v-if="self_photos.length < 9" class="bgfff bdash_a8 w80 h80 add_img bradius5 mr7"
					@click="uploadpic('self', 9)"></div>
			</div>
		</div>
		<view @click="addGroup" class=" h50 lh50 textc w100p" v-if="edit == 0"
			style="position: fixed; bottom: 0rpx; background-color: #51cdcb; color: #FFFFFF;">
			确定创建
		</view>
		<view @click="editupdate()" class=" h50 lh50 textc w100p" v-else
			style="position: fixed; bottom: 0rpx; background-color: #51cdcb; color: #FFFFFF;">
			确定修改
		</view>


	</div>
</template>

<script>
	import WXAJAX from "../../../utils/request";
	import util from "@/utils/index";
	export default {
		data() {
			return {
				msg: '',
				mag: '',
				logo: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/photo/20210731/2c29a637f332bd240e50249323128048.jpg.primary.png',
				self_photos: [],
				aspectFill: '',
				edit: 0
			}
		},
		onLoad(options) {
			if(options.id){
				this.edit = options.id
				uni.setNavigationBarTitle({
					title:"修改群聊"
				})
			}
			
		},
		onShow() {
			this.getMyChatGroup()
		},
		methods: {
			
				
			getMyChatGroup(){
				let url = "/chatGroup/query"
				let data = {
					chatGroupId:this.edit,
					cardId:uni.getStorageSync("cardId")
				}
				WXAJAX.POST(data,"",url,"","",1).then((res)=>{
					console.log(res,"OKi监护人法律");
					this.msg = res.groupName
					this.mag = res.groupDescribe
					this.self_photos[0] = res.groupLogo
				}).catch((err)=>{
					console.log(err);
				})
			},
			editupdate() {
				let url = "/chatGroup/update"
				let data = {
					chatGroupId: this.edit,
					groupName: this.msg,
					groupDescribe: this.mag,
					groupLogo:this.self_photos[0]
				}

				WXAJAX.POST(data, "", url, "", "", 1).then((res) => {
					console.log(res, "修改成功");
					if (res) {
						uni.navigateBack({
							delta:3,
							success: () => {
								let page = getCurrentPages().pop();
								if (page) {
									page.onLoad(page.options); //执行上个页面的方法
								};
							}
						})
					}
				})
			},

			//创建群聊
			addGroup() {
				let url = "/chatGroup/add"
				let data = {
					groupName: this.msg,
					groupDescribe: this.mag,
					groupLogo: this.self_photos[0]
				}
				WXAJAX.POST(data, "", url, "", "", 1).then((res) => {

					if (res) {
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
			},
			//删除图片
			delImg(index) {
				wx.showLoading();
				this.self_photos.splice(index, 1);
				wx.hideLoading();
			},
			//上传图片
			async uploadpic(str, count) {
				this.showPageStatus = "0";
				let path = await util.chooseImage("file", count);
				if (!(path instanceof Array)) return;
				this.uploadImgFun(path, 0, str);
			},
			async uploadImgFun(arr, index = 0, str) {
				await this.uploadImg(arr[index], str);
				if (index < arr.length - 1) {
					this.uploadImgFun(arr, index + 1, str);
				}
			},
			uploadImg(path, str) {
				if (str == "self" && this.self_photos.length >= 1) {
					wx.showToast({
						title: "只能选择一张！",
						duration: 1500,
						icon: "none"
					});
					return;
				}
				wx.showLoading({
					mask: true
				});
				return WXAJAX.UploadImage(path)
					.then(data => {

						wx.hideLoading();
						data = JSON.parse(data);
						if (data.code == "200") {
							if (str == "self") {
								this.self_photos.push(`${WXAJAX.imgBackUrl}${data.data}`);
								this.$emit('img_tap', this.self_photos, this.number)

							}
						} else {
							wx.showToast({
								title: "网络异常",
								duration: 2000,
								icon: "none"
							});
						}
					})
					.catch(err => {
						wx.hideLoading();
					});
			},
		}

	}
</script>

<style scoped>
	.content {
		width: 100vw;
		height: 100vh;
		background-color: #FFFFFF;
		padding-top: 40rpx;
		overflow: hidden;
	}

	.imgDiv {
		width: 100rpx;
		height: 100rpx;
	}

	.target {
		background: #FFFFFF;
		/* border-radius: 20upx; */
		margin-top: 40upx;
	}

	.bgblue image {
		width: 100%;
		height: 100%;
	}

	.groupInput input {
		background-color: #f5f5f6;
		padding-left: 20rpx;
		border-radius: 8rpx;
	}

	.groupDescript {
		width: 610rpx;
		background-color: #f5f5f6;
		padding: 30rpx;
		border-radius: 8rpx;
	}
</style>
