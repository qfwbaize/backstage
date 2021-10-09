<template>
	<div class="disflex h100p flex-column">
		<div class="disflex bgfff jsbet pl15 pr15 align-cen h49 fs16 c38">
			<p class="fbold">短视频名称</p>
			<input type="text" class="textr" :disabled="hiddenBtn" :placeholder="detallData.title || '请输入视频标题'"
				:value="videoTitle" @input="titleInput">
		</div>
		<div class="disflex bgfff jsbet pl15 pr15 align-cen h49 fs16 c38">
			<!-- <div class="disflex bgfff jsbet pl15 pr15 align-cen h49 fs16 c38" @click="addAddress"> -->
			<p class="fbold">添加位置</p>
			<input type="text" class="textr" :disabled="hiddenBtn" :placeholder="detallData.address || '请输入位置'"
				:value="address" @input="video_address">
			<span class="cblue" @click="resetAddr">重新定位</span>
			<!-- <p>{{address}}</p> -->
		</div>
		<div class="disflex bgfff jsbet mb align-cen h70 pl21 pr25 mt10" v-if='!hiddenData'>
			<div class="disflex jscen align-cen flex-column">
				<div class="disflex jscen align-cen bblue bradius3 box">
					<img :src="eyeIcon" class="w10 h10 mr3">
					<p class="fs10 cblue">已查看</p>
				</div>
				<p class="fs14 lh1 fbold mt10">{{detallData.playVolume || 0}}</p>
			</div>
			<div class="disflex jscen align-cen flex-column">
				<div class="disflex jscen align-cen borange bradius3 box">
					<img :src="clientIcon" class="w10 h10 mr3">
					<p class="fs10 corange">获客人数</p>
				</div>
				<p class="fs14 lh1 fbold mt10">{{detallData.guestsNum || 0}}</p>
			</div>
			<div class="disflex jscen align-cen flex-column">
				<div class="disflex jscen align-cen byellow bradius3 box">
					<img :src="likeIcon" class="w10 h10 mr3">
					<p class="fs10 cyellow">点赞</p>
				</div>
				<p class="fs14 lh1 fbold mt10">{{detallData.likesNum || 0}}</p>
			</div>
			<div class="disflex jscen align-cen flex-column">
				<div class="disflex jscen align-cen bgreen bradius3 box">
					<img :src="forwardIcon" class="w10 h10 mr3">
					<p class="fs10 cgreen">转发</p>
				</div>
				<p class="fs14 lh1 fbold mt10">{{detallData.forwardNum || 0}}</p>
			</div>
		</div>
		<div class="flex1 overauto pb15">
			<div class="bgfff mt10 mb10 pt17 pb17 pl15">
				<p class="fs16 c38 fbold mb10">视频封面</p>
				<p class="fs14 ca8 mb15">建议上传16:9，750x422px以上的jpg图片</p>
				<div v-if="detallData.coverImg" class="w100 h100" @click="uploadpic(1)">
					<img :src="detallData.coverImg" mode="aspectFill" class="w100 h100 bradius10 mr7 mb7" alt="">
				</div>
				<div v-else class="bgfff bdash_a8 w100 h100 add_img mr7 mb7" @click="uploadpic(1)">
				</div>
			</div>

			<div class="bgfff pt17 pb17 pl15">
				<p class="fs16 c38 fbold mb10">视频内容</p>
				<p class="fs14 ca8 mb15">只能上传MP4文件，视频时间不超过60秒，且不超过10M</p>
				<div v-if="detallData.url" class="w100 h100" @click="showChooseType">
					<video :src="detallData.url" @loadedmetadata="loadedmetadata"
						class="w100 h100 bradius10 mr7 mb7"></video>
				</div>
				<div v-else class="bgfff bdash_a8 w100 h100 add_img mr7 mb7" @click="showChooseType">
				</div>
				<!-- <div
          v-if="detallData.url"
          class="w100 h100"
          @click="upvideo">
          <video :src="detallData.url" class="w100 h100 bradius10 mr7 mb7"></video>
        </div>
        <div
          v-else
          class="bgfff bdash_a8 w100 h100 add_img mr7 mb7" @click="upvideo">
        </div> -->
			</div>
			<div class="square">
				<checkbox-group @change="checkboxChange">
					<label>
						<checkbox value="1" color="#FFCC33" style="transform:scale(0.7);margin-top: 20rpx;" />发布到发现广场
					</label>
				</checkbox-group>
			</div>
		</div>
		<div class="video_btn bgfff" v-if='!hiddenBtn'>
			<div class="w50p fs18 ca8 disflex flex-column align-cen jscen" @cancel="cancel">
				取消
				<!-- 保存到机构文库 -->
			</div>

			<div v-if="isBoss" class="w50p disflex jscen align-cen bg_line_blue fs18 cfff" @click="addShortVideo()">
				发布
			</div>
      <div v-if="!isBoss && type == 'add'" class="w50p disflex jscen align-cen bg_line_blue fs18 cfff" @click="addShortVideo()">
      	发布
      </div>
			<div v-if="!isBoss && type == 'jgadd'" class="w50p disflex jscen align-cen bg_line_blue fs18 cfff" @click="addShortVideo()">
				提交审核
			</div>
      <div v-if="!isBoss && type == 'wkadd'" class="w50p disflex jscen align-cen bg_line_blue fs18 cfff" @click="addShortVideo()">
      	提交审核
      </div>
		</div>
		<div v-if="chooseTypeShow">
			<SelectorOne :title="'选择添加方式'" :status="chooseTypeShow" :allClass="uploadVideoTypes"
				:choose_id="uploadVideoType" @closeModal="chooseTypeShow=false" @choose_tap="choose">
			</SelectorOne>
		</div>
		<div v-show="dialog_show">
			<DialogBox :dialog_title="dialog_title" @btn_tap="dialog_tap" :dialog_ph="dialog_ph" :default="dialog_value"
				:left="'取消'" :right="'保存'"></DialogBox>
		</div>
	</div>
</template>

<script>
	import SelectorOne from '@/components/selectorOne'
	import DialogBox from '@/components/dialogBox'
	import WXAJAX from "@/utils/request";
	import util from '@/utils/index';
	import amapFile from "@/libs/amap-wx.js";
	export default {
		components: {
			DialogBox,
			SelectorOne
		},
		data() {
			return {

				clientIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmAdd/ic_client2.png',
				eyeIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmAdd/ic_eye2.png',
				forwardIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmAdd/ic_forward2.png',
				likeIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmAdd/ic_like2.png',
				vidoeCover: '',
				isBoss: wx.getStorageSync('isBoss'),
				dialog_show: false,
				dialog_title: '标题',
				dialog_ph: '请输入视频链接',
				chooseTypeShow: false,
				uploadVideoType: 0,
				uploadVideoTypes: [{
						name: '添加链接',
						id: 1
					},
					{
						name: '本地视频',
						id: 2
					}
				],
				video: '',
				address: '',
				videoTitle: '',
				type: '',
				hiddenBtn: false,
				hiddenData: false,
				videoId: '',
				detallData: {
					coverImg: '',
					url: '',
					videoId: ''
				},
				videoWidth: '', //视频宽度
				videoHigh: '', //视频高度
				number: 0,
				customFolderId: 0,
				isDiscover: '',
				isLibrary: 0
			};
		},
		onLoad(option) {
			console.log(option);
			// this.number = option.type
			this.type = option.type
			this.customFolderId = option.customFolderId
			if (option.type == "add") {
				this.isLibrary = 0
			}
      if (option.type == "jgadd") {
      	this.isLibrary = 0
      }
      if (option.type == "wkadd") {
      	this.isLibrary = 1
      }
		},
		onShow() {
			let add = wx.getStorageSync('video_address') || ''
			if (add) {
				this.address = add
			}
		},
		mounted() {
			this.type = this.$root.$mp.query.type
			this.videoId = this.$root.$mp.query.videoId
			if (this.type == 'add' || this.type == "jgadd" || this.type == "wkadd") {
				this.hiddenData = true
				wx.setNavigationBarTitle({
					title: '新增视频'
				});

				this.Mc = wx.createMapContext("map");
				this.myAmapFun = new amapFile.AMapWX({
					key: "e11026819b6d300fda6a2c680fbd2fef"
				});
				this.getlocation();

			} else if (this.type == 'edit') {
				this.hiddenData = true
				wx.setNavigationBarTitle({
					title: '编辑视频'
				});
				this.gitVideoDetall()
			} else if (this.type == 'check') {
				this.hiddenBtn = true
				wx.setNavigationBarTitle({
					title: '查看详情'
				});
				this.gitVideoDetall()
			}
		},
		methods: {
			// 选择的按钮
			checkboxChange: function(e) {
				console.log(e.detail.value)
				if (e.detail.value == '1') {
					this.isDiscover = 1
				}
				if (e.detail.value == '') {
					this.isDiscover = 0
				}
				console.log(this.isDiscover)
			},
			//获取视频宽高
			loadedmetadata(res) {
				console.log('获取视频宽高', res)
				this.videoWidth = res.detail.width
				this.videoHigh = res.detail.height
			},
			async uploadpic(count) {
				if (this.hiddenBtn) {
					return
				}
				let path = await util.chooseImage('file', count);
				if (Object.prototype.toString.call(path) !== '[object Array]') return;
				this.uploadImgFun(path, 0)
			},
			// 递归上传
			async uploadImgFun(arr, index = 0) {
				await this.uploadImg(arr[index])
				if (index < arr.length - 1) {
					this.uploadImgFun(arr, index + 1)
				}
			},
			showChooseType() {
				this.chooseTypeShow = true;
			},
			dialog_tap(str, dialog_value) {
				if (str == 'save') {
					this.detallData.url = dialog_value
				}
				this.dialog_show = false;
			},
			choose(id, name) {
				this.chooseTypeShow = false;
				if (id == 1) {
					this.dialog_show = true;
				}
				if (id == 2) {
					util.chooseVideo().then(res => {
						wx.showLoading({
							title: '上传中',
							mask: true
						});
						WXAJAX.UploadImage(res.tempFilePath)
							.then(data => {
								wx.hideLoading();
								data = JSON.parse(data);
								if (data.code == 200) {
									let url = WXAJAX.imgBackUrl + data.data;
									this.detallData.url = url;
								} else {
									wx.showToast({
										title: '上传失败，文件过大',
										icon: 'none'
									})
								}
							})
						// .catch((err) => {
						//     wx.hideLoading();
						//     wx.showToast({
						//         title: '服务器繁忙',
						//         duration: 2000,
						//         icon: 'none'
						//     })
						// })
					}).catch(err => {
						wx.showToast({
							title: err,
							duration: 2000,
							icon: 'none'
						})
					})
				}
			},
			uploadImg(path) {
				let v = this;
				wx.showLoading({
					mask: true
				});
				return WXAJAX.UploadImage(path).then((data) => {
					wx.hideLoading();
					data = JSON.parse(data);
					if (data.code == '200') {
						console.log(data)
						v.detallData.coverImg = WXAJAX.imgBackUrl + data.data
					} else {
						wx.showToast({
							title: '网络异常',
							duration: 2000,
							icon: 'none'
						})
					}
				}).catch((err) => {
					wx.hideLoading();
					console.log('err -- ', err);
				})

			},
			upvideo() {
				if (this.hiddenBtn) {
					return
				}
				let v = this
				util.chooseVideo().then(res => {
					uni.showLoading({
						title: '上传中',
						mask: true
					});
					WXAJAX.UploadImage(res.tempFilePath)
						.then(data => {
							wx.hideLoading();
							data = JSON.parse(data);

							if (data.code == 200) {
								v.detallData.url = 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/' + data
									.data
							} else {
								wx.showToast({
									title: '文件大小超出限制，最大10M',
									icon: 'none',
									duration: 2000
								})
							}
						})
						.catch((err) => {
							wx.hideLoading();
							wx.showToast({
								title: '服务器繁忙',
								duration: 2000,
								icon: 'none'
							})
						})
				}).catch(err => {
					wx.showToast({
						title: err,
						duration: 2000,
						icon: 'none'
					})
				})
			},
			addAddress() {
				if (this.hiddenBtn) {
					return
				}
				wx.navigateTo({
					url: `../../companyPack/companyAddr/main?videoAdd=${true}`
				})
			},
			resetAddr() {
				var than = this;

				this.Mc = wx.createMapContext("map");
				this.myAmapFun = new amapFile.AMapWX({
					key: "e11026819b6d300fda6a2c680fbd2fef"
				});
				this.getlocation();

			},
			titleInput(e) {
				this.videoTitle = e.target.value
			},
			video_address(e) {
				this.address = e.target.value
			},

			addShortVideo() {

				let isOrgShow = 0
				console.log("videoHigh", this.videoHigh,
					"videoWidth", this.videoWidth, )
				let v = this
				let url = ''
				if (v.type == 'edit') {
					url = '/shortVideo/update'
				}
        if (v.type == 'wkadd') {
        	url = '/shortVideo/add'
        	isOrgShow = 1
        }
				if (v.type == 'jgadd') {
					url = '/shortVideo/add'
					isOrgShow = 1
				} else {
					url = '/shortVideo/add'
				}
				wx.showLoading()
				if (v.address == '' || v.videoTitle == '' || v.detallData.url == '' || v.detallData.coverImg == '') {
					wx.showToast({
						title: '视频信息不完整,请完善', 
						icon: 'none'
					})
					return
				}
				let data = {
					customFolderId: this.customFolderId,
					// type: this.type,
					address: v.address,
					// companyId: wx.getStorageSync('SELFCOMPANYID'),
					title: v.videoTitle,
					url: v.detallData.url,
					userId: wx.getStorageSync('userId'),
					coverImg: v.detallData.coverImg,
					state: 1,
					videoId: v.detallData.videoId,
					videoHigh: this.videoHigh,
					videoWidth: this.videoWidth,
					isOrgShow: isOrgShow,
					isDiscover: this.isDiscover,
					isLibrary: this.isLibrary
				}
				// console.log(data,"卢卡斯");
				// return
				WXAJAX.POST(data, '', url)
					.then((data, code) => {
						wx.hideLoading();
						wx.showToast({
							title: '成功',
							duration: 2000,
							icon: "none"
						});
						uni.navigateBack({
							success: () => {
								let page = getCurrentPages().pop();
								if (page) {
									page.onLoad(page.options); //执行上个页面的方法
								};
							}
						})
					})
					.catch(err => {
						wx.hideLoading();
						wx.showToast({
							title: err.message,
							duration: 2000,
							icon: "none"
						});
					});
			},
			gitVideoDetall() {
				WXAJAX.POST({
						companyId: wx.getStorageSync('COMPANYID'),
						videoId: this.videoId
					}, '', '/shortVideo/queryById')
					.then((data, code) => {
						wx.hideLoading();
						this.detallData = data
						this.address = this.detallData.address
						this.videoTitle = this.detallData.title
					})
					.catch(err => {
						wx.hideLoading();
						wx.showToast({
							title: err.message,
							duration: 2000,
							icon: "none"
						});
					});
			},
			getlocation() {
				//获取经纬度
				let author = ''
				wx.showLoading({
					title: "定位中...",
					mask: true
				});
				var v = this;
				wx.getLocation({
					type: "wgs84",
					success: function(res) {
						let latitude = res.latitude;
						let longitude = res.longitude;
						wx.chooseLocation({
							latitude,
							longitude,
							success: function(res) {
								console.log("address", res.address)
								v.address = res.address
							}
						})
						wx.hideLoading();
					},
					fail: function(err) {
						if (author == false) {
							v.isShowAuthorize = true;
							return false
						}
						wx.hideLoading({
							success() {
								wx.showToast({
									title: "定位失败",
									icon: "none",
									duration: 2000
								});
							}
						});
					},
					complete: function() {
						wx.hideLoading();
					}
				});
			},
			cancel() {
				wx.navigateBack({})
				// uni.reLaunch({
				// 	url:"/pages/companyPack/library/main",
				// })
			}
		},
		destroyed() {
			wx.removeStorageSync('video_address')
		},
	};
</script>

<style scoped>
	.video_btn {
		display: flex;
		height: 98upx;
		width: 100%;
	}

	.box {
		padding: 5upx 9upx 6upx 9upx;
	}

	.square {
		margin-top: 20rpx;
		width: 100%;
		background-color: #FFFFFF;
		padding-left: 22rpx;
		padding-bottom: 20rpx;
	}
</style>
