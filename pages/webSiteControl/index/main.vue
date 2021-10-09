<template>
	<div>

		<!--编辑轮播图-->
		<!--<EditBanner></EditBanner>-->
		<div class="w100p h211">

			<div class="edit_banner bgfff trans2" :class="changeing ? 'fade' : '' " v-if="imgUrls.length > 0">
				<swiper class="swiper-inner" indicator-dots indicator-active-color="#ffffff"
					indicator-color="rgba(255, 255, 255, 0.4)" :current="cur" @change="swiperChange" circular>
					<block v-for="(item,index) in imgUrls" :key="key">
						<swiper-item>
							<img class="banner-img" :src="item.slideshowUrl" mode="aspectFill" />
							<div class="tags">
								<span class="w30 h30 del disflex align-cen jscen mb10" @click="editbanner('del',index)">
									<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/del.png"
										alt="" mode="aspectFill" class="w17 h17" />
								</span>
								<span class="posre w30 h30 add disblock" @click="uploadpic(index)"></span>
							</div>
						</swiper-item>
					</block>
				</swiper>
				<!--重置小圆点的样式  -->
				<!--<view class="dots">
          <block v-for="(item,index) in imgUrls" :index="index" :key="key">
            <view class="dot" :class="{'active':  index == cur}"></view>
          </block>
        </view>-->
				<!--重置小圆点的样式 end -->
			</div>

			<div v-else class="w100p h100p bgf5f6 textc pt30" @click="uploadpic(-1)">
				<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/VR.png" alt=""
					class="w100 h100 mb5" />
				<p class="fs14 ca8">点击添加图片</p>
			</div>

			<canvas style="width: 500px;height: 500px;position: fixed;bottom: -4000px;z-index: -100"
				canvas-id="Canvas"></canvas>

		</div>


		<div class="disflex jsaround fs12 c78 pt20 textc mb10 pb10 bgfff  w345  h140  wrap m0auto">

			<!-- <div class="textc w60 h60  " @click="page_tap('companyIntro' ,  '?type=companyIntroduce')"> -->
      <div class="textc w60 h60  " @click="tointroduce()">
				<view
					style="width:37px;height:37px;border-radius:100rpx;box-sizing:border-box;background: #E5C37D ;position: relative;margin:0 auto;">
					<image style="position: absolute;left:52%;top:52%;transform: translate(-50%,-50%); width:60rpx;"
						mode="widthFix"
						src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riFill-building.png">
					</image>
				</view>
				<p class="pt7 fs12">机构介绍</p>
			</div>

			<!-- <div class="w60 h60  ml20" @click="page_tap('companyIntro' , '?type=goodsIntroduce')"> -->
			<div class="w60 h60  ml20" @click="toTeam">
				<view
					style="width:37px;height:37px;border-radius:100rpx;box-sizing:border-box;background: #00BE01;position: relative;margin:0 auto;">
					<image style="position: absolute;left:55%;top:50%;transform: translate(-50%,-50%); width:60rpx;"
						mode="widthFix"
						src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/st-product.png"></image>
				</view>
				<p class="pt7 fs12">团队介绍</p>
			</div>

			<div class="w60 h60  ml20" @click="honor">
				<view
					style="width:37px;height:37px;border-radius:100rpx;box-sizing:border-box;background: #F59102;position: relative;margin:0 auto;">
					<image style="position: absolute;left:52%;top:56%;transform: translate(-50%,-50%); width:60rpx;"
						mode="widthFix"
						src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/cup.png"></image>
				</view>
				<p class="pt7 fs12">机构荣誉</p>
			</div>

			<div class="w60 h60  ml20" @click="toCompanyVideoList">
				<view
					style="width:37px;height:37px;border-radius:100rpx;box-sizing:border-box;background:#4EA8FF ;position: relative;margin:0 auto;">
					<image style="position: absolute;left:54.5%;top:53%;transform: translate(-50%,-50%); width:60rpx;"
						mode="widthFix"
						src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/ze-video.png"></image>
				</view>
				<p class="pt7 fs12">机构视频</p>
			</div>

			<div class="w60 h60 " @click="page_sgare">
				<view
					style="width:37px;height:37px;border-radius:100rpx;box-sizing:border-box;background: #4EA8FF 10000%;position: relative;margin:0 auto;">
					<image style="position: absolute;left:51%;top:50%;transform: translate(-50%,-50%); width:60rpx;"
						mode="widthFix"
						src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/st-book .png"></image>

				</view>
				<p class="pt7 fs12">{{page_sgaress}}</p>
			</div>

			<div class="w60 h60  ml20" @click="tofigure()">
				<view
					style="width:37px;height:37px;border-radius:100rpx;box-sizing:border-box;background: #03D3C5 ;position: relative;margin:0 auto;">
					<image style="position: absolute;left:51%;top:50%;transform: translate(-50%,-50%); width:60rpx;"
						mode="widthFix"
						src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/wenzhang.svg"></image>
				</view>
				<p class="pt7 fs12">形象展示</p>
			</div>
			<div class="w60 h60  ml20" @click="page_tap('demand/recruitment')">
				<!-- companyPack/joinUs -->
				<view
					style="width:37px;height:37px;border-radius:100rpx;box-sizing:border-box;background: #0191FD ;position: relative;margin:0 auto;">
					<image style="position: absolute;left:53%;top:50%;transform: translate(-50%,-50%); width:60rpx;"
						mode="widthFix"
						src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/md-peop.png"></image>
				</view>
				<p class="pt7 fs12">招商招聘</p>
			</div>

			<div class="w60 h60  ml20" @click="toContactMe">
				<view
					style="width:37px;height:37px;border-radius:100rpx;box-sizing:border-box;background: #1AD09C ;position: relative;margin:0 auto;">
					<image style="position: absolute;left:50%;top:55%;transform: translate(-50%,-50%); width:60rpx;"
						mode="widthFix"
						src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/md-perm_phone.png">
					</image>
				</view>
				<p class="pt7 fs12">联系我们</p>
			</div>
		</div>
		<div class="bgfff pl16 pr15 fs16 ca8 lh49">
			<!-- <div class="disflex jsbet" @click="toFrom_tap()">
        <span class="c38 fbold fs16">用户反馈</span>
        <div>
          <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/right.png" alt=""
               class="w10 h10" />
        </div>
      </div> -->
			<!-- <div class="disflex jsbet" @click="add('tel')">
				<span class="c38 fbold fs16">联系电话</span>
				<div>
					<span class="mr11">{{tel || '暂无'}}</span>
					<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/right.png" alt=""
						class="w10 h10" />
				</div>
			</div> -->
			<!-- <div class="disflex jsbet" @click="page_tap('chooseAddr')"> -->
			<!--companyAddr-->
			<!-- <span class="c38 fbold fs16">机构地址</span>
				<div class="disflex flex1 row-reverse align-cen">
					<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/right.png" alt=""
						class="w10 h10" />
					<p class="w200 over_1 textr mr11">{{address}}</p>
				</div>
			</div> -->
		</div>

		<!--添加视频-->
		<div v-show="dialog_show">
			<DialogBox :dialog_title="dialog_title" @btn_tap="dialog_tap" :dialog_ph="dialog_ph" :default="dialog_value"
				:left="'取消'" :right="'保存'"></DialogBox>

		</div>
	</div>
</template>

<script>
	import util from '@/utils/index'
	import DialogBox from '@/components/dialogBox' // 对话框
	import WXAJAX from '@/utils/request'
	import StaticResources from '@/components/StaticResources';


	export default {
		name: '',
		components: {
			DialogBox,
			StaticResources
		},
		data() {
			return {
				page_sgaress: '新闻资讯',
				// article: '精品文章',
				address: '',
				info: {},
				indicator: false, //是否显示指示点
				interval: 5000, //自动切换时间间隔
				duration: 400, //滑动动画时长
				autoplay: true, //是否自动切换
				circular: true, //是否采用衔接滑动
				cur: 0, //当前所在滑块的index

				imgUrls: [],
				changeing: false, //是否在选择切换图片

				dialog_type: 'wxLogin',
				dialog_show: false,
				dialog_title: '',
				dialog_ph: '',
				dialog_value: '',
				tel: '',
				video_link: '',
				websiteId: 0, //官网id
				num: 0,
				showPageStatus: '1', // 0 为打开图片层，1为正常
				companyId: 0,

				sgare: 3, //精品文章跳转
				sgare1: 1,
				type: 7,




			}
		},
		mounted() {
			wx.setNavigationBarTitle({
				title: "官网管理"
			});

		},
		async onPullDownRefresh() {
			await this.getWebMsg();

			wx.stopPullDownRefresh();
		},
		onShow(option) {
			if (this.showPageStatus === "1") {
				this.getWebMsg();
			}
		},
		onUnload() {

			//还原数据
			this.imgUrls = [];
			this.changeing = false;
			this.showPageStatus = "1"
			wx.setStorageSync('webSiteAddr', '');
			wx.setStorageSync('editOperator', '');
		},
		methods: {
			// 机构荣誉
			honor() {
				// wx.navigateTo({
				// 	url: '../../companyIntro/main?id=' + this.type
				// })
				wx.navigateTo({
					url: '/pages/demand/honor/honor?id=' + this.type
				})
			},
			todyamicManage() {
				wx.navigateTo({
					url: '../../companyPack/dynamicIssue/main'
				})
			},
      //团队介绍
      toTeam(){
        wx.navigateTo({
        	url: '../../demand/teamInt/teamInt'
        })
      },
      //联系我们
      toContactMe(){
        wx.navigateTo({
        	url: '../../demand/contactMe/contactMe'
        })
      },
			// 精品文章
			// page_article() {
			// 	wx.navigateTo({
			// 		url: '../sgare/sgare?id=' + this.sgare + '&labelContent=' + this.article
			// 	})
			// },
      // 形象展示
      tofigure(){
        wx.navigateTo({
        	url: '../../companyPack/imagedisplay/imagedisplay'
        	})
      },
			// 新闻资讯
			page_sgare() {
				// wx.navigateTo({
				// 	url: '../sgare/sgare?id=' + this.sgare1 + '&labelContent=' + this.page_sgaress
				// 	// url:'../sgare/sgare'
				// })
        uni.showToast({
            title: '正在开发中',
            duration: 2000,
            icon:'none'
        });
			},


			//官网信息请求
			getWebMsg() {
				return WXAJAX.POST({
					ignore: true
				}, '', '/company/selectWebsiteInfo').then((data) => {

					if (data) {
						this.info = data;
						this.websiteId = data.websiteId;
						wx.setStorageSync('websiteId', this.websiteId);
						this.tel = data.phone;
						this.video_link = data.videoUrl;
						this.address = data.address;
						this.num = data.num || 0;
						this.companyId = data.companyId;
						this.getbannerList();
					}

				}).catch((err) => {
					console.log("数据请求失败")
				})
			},
			getbannerList() {
				let parmas = {
					companyId: this.companyId,
					slideshowType: 1,
					isDel: 0,
				}
				WXAJAX.POST(parmas, '', '/org/slideshow/queryList', '', '', 1).then((data) => {
					wx.hideLoading();
					if (data) {
						this.imgUrls = data;
					}else{
            this.imgUrls = [];
          }

				}).catch((err) => {
					wx.hideLoading();
					console.log("数据请求失败")
				});
			},
			editbanner(type, url) {
        var that=this
				let parmas = {};
				if (type == 'add') {
					parmas.slideshowUrl = url;
					parmas.websiteId = this.websiteId;
					parmas.slideshowType = 1;
					return WXAJAX.POST(parmas, '', '/org/slideshow/add', '', '', 1).then((data) => {
						wx.hideLoading();
						if (data) {
							that.imgUrls.push(data);
							wx.showToast({
								title: '成功！',
								icon: 'success'
							});
						}

					}).catch((err) => {
						wx.hideLoading();
						console.log("数据请求失败")
					});
				} else if (type == 'del') {
					parmas.slideshowId = this.imgUrls[url].slideshowId;
					parmas.isDel = 1;
					return WXAJAX.POST(parmas, '', '/org/slideshow/del', '', '', 1).then((data) => {
						wx.hideLoading();
						if (data) {
							this.getbannerList();
							wx.showToast({
								title: '成功！',
								icon: 'success'
							});
						}

					}).catch((err) => {
						wx.hideLoading();
						console.log("数据请求失败")
					});
				}
			},
			add(type) {
				if (type == 'videos') { //添加视频的弹框
					this.dialog_type = type;
					this.dialog_title = '机构视频';
					this.dialog_ph = '请输入视频链接';
					this.dialog_show = true;
					this.dialog_value = this.video_link;
				} else {
					this.dialog_type = type;
					this.dialog_title = '电话号码';
					this.dialog_ph = '请输入手机号';
					this.dialog_show = true;
					this.dialog_value = this.tel;
				}
			},
			page_tap(url, query) {
				query = query || '';

				if (query.includes('companyIntroduce')) {
					wx.setStorageSync('editOperator', this.info.companyIntroduce)
				}

				if (query.includes('goodsIntroduce')) {
					wx.setStorageSync('editOperator', this.info.goodsIntroduce)
				}

				wx.navigateTo({
					url: '../../' + url + '/main' + query
				})

			},
      tointroduce(){
        uni.showToast({
            title: '正在开发中',
            duration: 2000,
            icon:'none'
        });
      },
			toFrom_tap() {
				wx.navigateTo({
					url: '../userList/main'
				})
			},
			swiperChange(e) {
				this.cur = e.target.current //获取当前轮播图片的下标, 可以给当前指示点加样式
			},
			async uploadpic(str) {
				if (this.imgUrls.length >= 5) {
					wx.showToast({
						title: '最多选择五张！',
						duration: 1500,
						icon: 'none'
					});
					return
				}
				this.showPageStatus = "0"
				let path = await util.chooseImage('file', 5 - this.imgUrls.length);
				if (Object.prototype.toString.call(path) !== '[object Array]') return;
				this.changeing = true;

				this.uploadImgFun(path, 0, str);
			},
			// 递归上传
			async uploadImgFun(arr, index = 0, str) {
				await this.uploadImg(arr[index], str)
				if (index < arr.length - 1) {
					this.uploadImgFun(arr, index + 1, str)
				}
			},
			uploadImg(path, str) {
				let v = this;
				wx.showLoading();
				return WXAJAX.UploadImage(path).then(async (data) => {
					wx.hideLoading();
					data = JSON.parse(data);

					if (data.code == '200') {
						// this.imgUrls.push(WXAJAX.imgBackUrl + data.data + '.primary.png');
						this.editbanner('add', WXAJAX.imgBackUrl + data.data)
						// await this.saveWebMsg('photos' , this.imgUrls.join(','))
						this.cur = this.imgUrls.length - 1<0?1:this.imgUrls.length - 1;
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

			async delBanner(index) { //删除banner图片
				if (this.cur !== 0) this.cur -= 1
				this.changeing = true;
				let img = this.imgUrls.filter((item, position) => position !== index);
				await this.saveWebMsg('photos', img.join(','));
				this.changeing = false;
				this.getWebMsg();
			},
			dialog_tap(str, value) {
				if (str == 'save') {
					if (this.dialog_type == 'videos') {
						if (!value) {
							wx.showToast({
								title: '请输入有效的视频链接！',
								icon: 'none'
							});
							return
						}
						this.video_link = value;
						this.saveWebMsg('videoUrl', value);

					} else {
						if (!util.checkPhone(value)) {
							wx.showToast({
								title: '请输入正确的电话号码！',
								icon: 'none'
							});
							return
						}
						this.tel = value;
						this.saveWebMsg('phone', value);
					}
				}

				this.dialog_show = false;
			},
			saveWebMsg(str, strValue) {
				console.log(strValue,str,"却石沉大海了")
				wx.showLoading();
				let parmas = {};
				parmas[str] = strValue;
				parmas.websiteId = this.websiteId;
				return WXAJAX.POST(parmas, '', '/company/addWebsiteInfo').then((data) => {

					wx.hideLoading();
					if (data) {
						wx.showToast({
							title: '成功！',
							icon: 'success'
						});
					}

				}).catch((err) => {
					wx.hideLoading();
					console.log("数据请求失败")
				});

			},
			toCompanyVideoList() {

				wx.navigateTo({
					url: '../../companyPack/companyVideos/main'
				})
			}
		}
	}
</script>

<style>



</style>
