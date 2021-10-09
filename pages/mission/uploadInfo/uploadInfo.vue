<template>
	<view class="content">
		<view class="listdetail" >
			<view class="detail_finish" style="margin-top: 20rpx;">上传证据图片</view>

			<div class="disflex wrap pt20 pb20 w290 pl20">
				<div class="bgfff w80 h80 mr7 mb7 posre" v-for="(v,k) in self_photos" :key="k">
					<img mode="aspectFill" :src="v" alt="" class="w100p h100p">
					<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/del.png" alt=""
						class="w20 h20 posab right2 top2" @click="delImg(k)">
				</div>
				<div v-if="self_photos.length < 9" class="bgfff bdash_a8 w80 h80 add_img bradius5 mr7"
					@click="uploadpic('self', 9)"></div>
			</div>

      <div class="time" style="padding-bottom: 50rpx;margin-left: 40rpx;">
      	<div class="title c38">进度描述</div>
      	<textarea style="width: 630rpx;padding: 20rpx; background-color: #F5F5F5;margin-top: 20rpx;" value="" v-model="recordText"
      		placeholder="请输入进度描述" />
      </div>

      <view class="confirm-btn" @click="save">提交</view>

		</view>

	</view>
</template>

<script>
  import http from "../../../utils/http"
	import WXAJAX from '../../../utils/request.js';
	import util from "@/utils/index";
	export default {
		data() {
			return {
				self_photos: [],
        recordText:'',
        id:''

			}
		},
		onLoad(options) {
      this.id = options.task_id

		},
		methods: {
      //上传证据
      save(){
        var data = {
          task_id:this.id,
          evidence:this.self_photos,
          explain:this.recordText
        }
        http({url:'/apis/myTask/evidence',method:'POST',data:data}).then(res=>{
          if(res.data.code = 200){
            uni.navigateBack({
              delta:1
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
				if (str == "self" && this.self_photos.length >= 9) {
					wx.showToast({
						title: "最多选择9张！",
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
	}

	.listdetail {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		padding: 40rpx 0;
	}

	.detail_title {
		width: 690rpx;
		height: 46px;
		color: rgba(16, 16, 16, 100);
		font-size: 32px;
		text-align: left;
		font-family: PingFangSC-bold;
		font-weight: bold;
		margin-left: 40rpx;
		margin-bottom: 20rpx;
	}

	.detail_text {
		width: 690rpx;
		height: 134rpx;
		color: rgba(143, 143, 143, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-left: 40rpx;
	}

	.detail_finish {
		width: 690rpx;
		height: 38rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-left: 40rpx;
	}

	.detail_input {
		width: 690rpx;
		height: 60rpx;
		line-height: 60rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		display: flex;
		margin-left: 40rpx;
		margin-top: 20rpx;
	}

	.detail_input text {
		width: 140rpx;
	}

	.detail_input input {
		width: 125rpx;
		height: 60rpx;
		border-radius: 12rpx;
		color: rgba(136, 136, 136, 100);
		font-size: 28rpx;
		font-family: Microsoft Yahei;
		border: 2rpx solid rgba(187, 187, 187, 100);
		margin-right: 26rpx;
		margin-left: 20rpx;
		padding-left: 15rpx;
	}

	.confirm-btn {
		width: 100%;
		height: 98upx;
		line-height: 98upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 36upx;
		background-color: rgba(26, 208, 156, 100);
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
	}
</style>
