<template>
	<div class="article-box">
		<div class="disflex jsbet " @click="toEssayType">
			<label for="industry" class="fbold marks pr15" style="line-height: 86rpx;margin-left: 29rpx;">所属分类</label>
			<div class="disflex align-cen">
				<input type="text" id="industry" class="pha8 textr h49 pr12" placeholder="请选择分类" v-model="choose"
					readonly disabled>
				<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/right.png" alt=""
					class="w10 h10 " />
			</div>
		</div>
		<Inputs placeholder="请粘贴微信公众号文章链接" :value="inputValue" @change="change"></Inputs>
		<button class="public-article-btn" @click="release">获取文章</button>
		<div class="public-article-imgs">
			<div class="imgs-title">如何获取公众号文章链接</div>
			<div class="imgs-desc">
				1.打开准备转发的公众号文章，点击屏幕右上角[...]
			</div>
			<div class="text-center">
				<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/img_share.png"
					style="width:400upx;height: 400upx;margin-top: 20upx;" />
			</div>
			<div class="imgs-desc">2.在弹出的菜单选择[ 复制链接 ]</div>
			<div class="text-center">
				<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/img_share2.png"
					style="width:400upx;height: 400upx;margin-top: 20upx;" />
			</div>
			<div class="imgs-desc">
				3.打开【采推CRM】小程序，即可自动识别文章编辑推广
			</div>
		</div>
	</div>
</template>

<script>
	import Inputs from "@/components/Inputs";
	import {
		mapGetters,
		mapActions
	} from "vuex";

	import WXAJAX from "@/utils/request";
	export default {
		components: {
			Inputs
		},
		data() {
			return {
				inputValue: "",
				choose:''

			};
		},
		mounted() {
			let than = this

			wx.getClipboardData({
				success(res) {
					console.log(res);
					if (res.data == '') {

					} else {
						wx.showToast({
							title: '已粘贴复制内容'
						})
						than.inputValue = res.data
					}

				}
			})
		},
		onShow() {
			let _a = wx.getStorageSync('choose_essayType') || '';
			this.choose = _a.name;
			this.choose_id = _a.id;

		},
		methods: {
			toEssayType() {
				uni.navigateTo({
					url: `../../companyPack/essayType/main`
				})
			},
			...mapActions(["setArticle"]),
			change(value) {
				this.inputValue = value;
			},
			// release(){
			// 	let url = "/customerEssay/reprintArticle"
			// 	let data = {
			// 		url:this.inputValue
			// 	}
			// 	WXAJAX.POST(data,'',url,'','').then((res)=>{
			// 		console.log(res,"阿三顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶");
			// 	})
			// },
			// 发布文章
			async release() {
				let v = this
				if (!this.inputValue) return;
				wx.showLoading();
				//上传文章链接到后台,解析出文章标题
				if (this.choose) {
					try {
						let res = await WXAJAX.POST({
								url: this.inputValue,
							},
							"",
							"/customerEssay/reprintArticle"
						);
						wx.hideLoading();
						let title = res.title;
						// const result = await this.getData(this.inputValue)
						let data = {
							details: res.body,
							title,
              essayTypeId:this.choose_id
						};
						this.setArticle(data);
						//上传
						uni.navigateTo({
							url: `./articleImg?saveType=${3}&title=` + title
						});
					} catch (error) {
						wx.hideLoading();
					}

				}else{
					wx.showToast({
					  title: '请选择分类',
					  icon: 'none',
					  duration: 2000
					})
				}

			},
			getData(url) {
				return new Promise((resolve, reject) => {
					uni.request({
						url,
						success: res => {
							resolve(res.data);

						},
						fail: err => {
							reject(err);
						}
					});
				});
			}
		}
	};
</script>

<style>
	page {
		background: white;
	}

	.article-box {
		display: flex;
		height: 100%;
		flex-direction: column;
	}

	.public-article-btn {
		width: 580upx;
		height: 88upx;
		background: #51cdcb;
		border-radius: 10upx;
		color: #ffffff;
		font-size: 36upx;
		margin-top: 20upx;
	}

	.public-article-imgs {
		flex: 1;
		overflow: auto;
		margin-left: 30upx;
		margin-right: 30upx;
		margin-top: 40upx;
		border: 1upx solid #e8e8e8;
		border-radius: 10upx;
		padding: 40upx;
	}

	.imgs-title {
		font-size: 28upx;
		text-align: center;
		font-weight: bold;
		color: #383838;
	}

	.imgs-desc {
		font-size: 24upx;
		color: #383838;
		margin-top: 30upx;
	}

	.text-center {
		text-align: center;
	}
</style>
