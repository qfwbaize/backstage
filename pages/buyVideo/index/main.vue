<template>
	<div class="disflex h100p flex-column" style="background-color: #FFFFFF;">
		<div class="flex1 overauto pt10">
			<!-- <scroll-view :style="{height: scrollContentHeight+'px'}" class="dynamic-content" :scroll-y="true"
				:enable-back-to-top="true" :scroll-anchoring="true" @scrolltoupper='scrolltoupper'
				@scrolltolower="scrolltolower"> -->
			<view class="" style="padding-left: 40rpx;padding-right: 40rpx;">
				<!-- 顶部的两个盒子 -->
				<view class="" style="display: flex;justify-content: space-between;">
					<!-- 发布个人视频 -->
					<view class="write" @click="addVideolist()">
						<view class="" style="margin-left: 28rpx;">
							<view class="" style="font-size: 32rpx;color: #FFFFFF;margin-top: 30rpx;">发布个人视频</view>
							<view class="" style="font-size: 24rpx;color: #FFFFFF;">VIDEO</view>
						</view>
						<image class="toppicture"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/personal.png"
							mode=""></image>
					</view>
					<!-- 发布机构视频 -->
					<view class="document" @click="addvideocompany()">
						<view class="" style="margin-left: 28rpx;">
							<view class="" style="font-size: 32rpx;color: #FFFFFF;margin-top: 30rpx;">发布机构视频</view>
							<view class="" style="font-size: 24rpx;color: #FFFFFF;">TEAM VIDEO</view>
						</view>
						<image class="toppicture"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/personalvideo.png"
							mode="">
						</image>
					</view>
				</view>
				<!-- 主体 -->
				<view class="" style="width: 100%;">
            <view class="fs16 fbold mt10 mb10">视频管理</view>
					<view class="" style="display: flex;flex-direction: row;">
						<view :class="activeIndex == index ? 'probable' : 'noprobable'" v-for="(item,index) in navarr"
							:key="index" @click="toContent(index)">{{item}}</view>
					</view>
					<!-- 个人视频   -->
					<view class="" v-show="activeIndex == 0">
						<view class="" v-if="videolist">
							<view class="" style="margin-top: 40rpx;" v-for="(item,index) in videolist" :key="index">
								<!-- 基本信息 -->
								<view class="" style="display: flex;flex-direction: row">
									<image style="width: 100rpx;height: 100rpx;margin-right: 14rpx;border-radius: 50%;"
										:src="item.cardLogo" mode="">
									</image>
									<view class="" style="display: flex;flex-direction: column;">
										<view class="fs14" style="color: #101010;margin-top: 10rpx;">
											{{item.userName}}
										</view>
										<view class="" style="font-size: 24rpx;color: #101010;margin-top: 14rpx;">
											{{item.companyName||''}}
										</view>
									</view>
								</view>
								<view class="mt10 fs14" @click="toviedoinfo(item,index)" style="color:#101010;margin-left: 10rpx;margin-bottom: 8rpx;">
									{{item.title}}
								</view>
								<view class="trends">
									<video :id="'myvideo' + index" @play="playvideo" :poster="item.coverImg"
										:src="item.url" style="width: 672rpx;height:380rpx;" controls></video>
								</view>
								<view class="" style="display: flex;justify-content: space-between;margin-top: 14rpx;">
									<view class="" style="display: flex;">
										<image style="width: 34rpx;height: 34rpx;"
											src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/location.png"
											mode="">
										</image>
										<view class="place" style="color: #A09D9D;font-size: 24rpx;">
											{{item.address}}
										</view>
									</view>
									<view class="" style="display: flex;">
										<view class="" style="color: #A09D9D;font-size: 24rpx;margin-right: 15rpx;">
											{{item.uploadTime}}
										</view>
										<view class="actives"
											style="margin-right: 10rpx; margin-top: -26rpx;"
											@click.stop="pop(item)">
											...
										</view>
									</view>
								</view>
							</view>
							<view style="height: 100rpx;" />
							<div v-if="videoflg" class="textc lh42 fs12 ca8 bgfff">- 到底了，看看其他的吧 -</div>
						</view>
						<view class="noMsg" v-else>
							<view class="noYet">
								<image
									src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png"
									mode="">
								</image>
								<view class="">暂无信息</view>
							</view>
						</view>
						<view style="height: 50rpx;" />
					</view>

					<!-- 机构视频 -->
					<view class="" v-show="activeIndex == 1">
						<view class="" v-if="companylist">
							<view class="" style="margin-top: 40rpx;" v-for="(item,index) in companylist" :key="index">
								<!-- 基本信息 -->
								<view class="" style="display: flex;flex-direction: row">
									<image style="width: 100rpx;height: 100rpx;margin-right: 14rpx;border-radius: 50%;"
										:src="item.cardLogo" mode="">
									</image>
									<view class="" style="display: flex;flex-direction: column;">
										<view class="fs14" style="color: #101010;margin-top: 10rpx;">
											{{item.userName}}
										</view>
										<view class="" style="font-size: 24rpx;color: #101010;margin-top: 14rpx;">
											{{item.companyName||''}}
										</view>
									</view>

                  <view class="posab right15 fs14 fbold" style="color: #43D3B9;margin-top: 30rpx;" v-show="isboss == false">
                  	<view v-if="item.isShow == 0" >审核中</view>
                  	<view v-if="item.isShow == 1" >审核通过</view>
                  	<view v-if="item.isShow == 2" >审核未通过</view>
                  </view>

								</view>
								<view class="mt10 fs14" @click="toviedoinfo(item,index)" style="color:#101010;margin-left: 10rpx;margin-bottom: 8rpx;">
									{{item.title}}
								</view>
								<!-- <view class="trends" @click="toviedoinfo(item,index)">
										<video :src="item.url" style="width: 672rpx;height:380rpx;" controls></video>
									</view> -->
								<view class="trends">
									<video :src="item.url" style="width: 672rpx;height:380rpx;" controls></video>
								</view>
								<view class="" style="display: flex;justify-content: space-between;margin-top: 14rpx;">
									<view class="" style="display: flex;">
										<image style="width: 34rpx;height: 34rpx;"
											src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/location.png"
											mode="">
										</image>
										<view class="place" style="color: #A09D9D;font-size: 24rpx;">
											{{item.address}}
										</view>
									</view>
                  <view class="" style="display: flex;">
                  	<view class="" style="color: #A09D9D;font-size: 24rpx;margin-right: 15rpx;">
                  		{{item.uploadTime}}
                  	</view>
                  	<view class="actives"
                  		style="margin-right: 10rpx; margin-top: -26rpx;"
                  		@click.stop="pop(item)">
                  		...
                  	</view>
                    <!-- <view v-if="isboss == true || item.isShow == 1" class=""
                    	style="color: #43D3B9;font-size: 22rpx;margin-right: 10rpx;"
                    	@click.stop="deleteVideo(item)">删除
                    </view> -->
                  </view>
								</view>
							</view>
							<div v-if="companytotal" class="textc lh42 fs12 ca8 bgfff">- 到底了，看看其他的吧 -</div>
						</view>
						<view class="noMsg" v-else>
							<view class="noYet">
								<image
									src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png"
									mode="">
								</image>
								<view class="">暂无信息</view>
							</view>
						</view>
						<view style="height: 50rpx;" />
					</view>

					<!-- <view class="noMsg" v-show="companylist.length == companytotal ">
							<view class="noYet">
								<image
									src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png"
									mode="">
								</image>
								<view class="">暂无信息</view>
							</view>
						</view> -->
					<!-- 点赞人头像 -->
					<view class="userimg" v-if="item.openThumbs">
						<image src="../../../static/tabs/follow.png" mode=""></image>
					</view>
					<!-- 评论信息 -->
					<view class="userlist" v-show="item.openComment">
						<view class="user">
							<view class="user_left">
								<image src="../../../static/tabs/find-active.png" mode=""></image>
							</view>
							<view class="userright">
								<view class="userright_top">
									<view class="">万子仁</view>
									<view class="userright_time">2021年5月19日 23:42</view>
								</view>
								<view class="userright_bottom">对您的产品很感兴趣，方便聊聊？</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <div class="video bgfff mb10" v-for="(v,k) in video_data" :key="k">
          <div class="pt10 pr15 pl15">
            <video class="w100p bradius5" :src="v.url"></video>
          </div>
          <div class="disflex jsbet pl15 pr15 align-cen h49 fs16 c38 bbe8">
            <p class="fbold"></p>
            <p>{{v.uploadTime}}由{{v.userName}}上传</p>
          </div> -->
			<!-- <div class="disflex h49 align-cen jsbet pl15 pr15 bte8" >
          <div class="be8 p15 lh0" @click="deleteVideo(v)">
            <img :src="delIcon" class="w15 h15">
          </div>
          <div class="disflex">
            <div class="disflex align-cen jsbet pl15 pr15 be8 p15 lh0">
              <img :src="detailsIcon" class="w15 h15 mr10">
              <p class="lh1 fs16 ca8" @click="todetall(v.videoId,'check')">详情</p>
            </div>
            <div class="disflex align-cen jsbet pl15 pr15 be8 p15 ml10 lh1">
              <img :src="editIcon" class="w15 h15 mr10">
              <p class="lh1 fs16 ca8" @click="todetall(v.videoId,'edit')">编辑</p>
            </div>
            <div class="disflex align-cen jsbet pl15 pr15 be8 p15 ml10 lh0">
              <img :src="soldoutIcon" class="w15 h15 mr10">
              <p class="lh1 fs16 ca8" @click="undercarriage(v)">{{ v.state == 1 ? '下架' : '上架'}}</p>
            </div>
          </div>
        </div> -->

			<!-- </div> -->
			<!-- </scroll-view> -->
		</div>
		<!--   <div class="video_btn bgfff">
      <div class="w100p disflex jscen align-cen bg_line_blue fs18 cfff" @click="addVideo">
        上传新视频
      </div>
    </div> -->
		<view v-if="shareDiv == true" class="">
			<view class="shareDiv" @click="delpop">
			</view>
			<view class="warn" style="">
				<view class="mt15 ml10 w326 h50 disflex" style=";">
					<div @click="deleteVideo(active_index)"
						style="width: 324rpx; height: 100rpx; border-radius: 10rpx; box-shadow: 0px 2px 6px 0px rgba(200, 232, 226, 100);"
						class="textc lh50">
						<image class="imgv" style="width: 50rpx ; height: 48rpx;"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/haFill-26-trash-can.svg"
							mode=""></image>删除
					</div>
					<div @click="shares"
						style="width: 324rpx;margin-left: 50rpx; height: 100rpx; border-radius: 10rpx; box-shadow: 0px 2px 6px 0px rgba(200, 232, 226, 100);"
						class="textc lh50">
						<image class="imgv" style="width: 50rpx ; height: 48rpx;"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/fas fa-share.svg"
							mode=""></image>转发
					</div>
				</view>
				<!-- <view @click="tojg(active_index)" class="mt15 ml10 textc lh50 h50"
					style="width: 700rpx;box-shadow: 0px 2px 6px 0px rgba(200, 232, 226, 100);">
					<image class="imgv" style="width: 48rpx;height: 48rpx;"
						src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riFill-mail-send-fill.svg"
						mode=""></image>
					投稿到机构文库
				</view> -->
			</view>
			<SHARE v-if="share == true" :dynamicId="active_index.dynamicId" :videoId="active_index.videoId"
				:companyId="active_index.companyId" @closeShare="closeShare()" saveType='1'></SHARE>
		</view>
	</div>
</template>

<script>
	import WXAJAX from "@/utils/request";
	import util from '@/utils/index';
	import SHARE from '@/components/share'; //转发
	export default {
		components: {
			SHARE,
		},
		data() {
			return {

				share: false,
				active_index: '',
				shareDiv: false,
				num: 0,
				delIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_del.png',
				detailsIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_details.png',
				editIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_edit.png',
				playIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/img_play.png',
				soldoutIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_soldout.png',
				video_data: [],
				dialog_show: false,
				total: '',
				page: 1,
				scrollContentHeight: 0,
				isShowTips: false,
				navarr: ['个人视频', '机构视频'],
				activeIndex: 0,
				videolist: '', //个人视频列表
				companylist: '', //机构的视频列表
				corporation: wx.getStorageSync('cardWelcomeSpeech'),
				isOrgShow: 0,
				companypage: 1,
				videopage: 1,
				companytotal: false,
				videoflg: false,
				isboss: '',
			};
		},
		async mounted() {
			let a = await util.systemIfo();
			let navHeight = getApp().globalData.navHeight;
			this.scrollContentHeight = a.windowHeight;
		},
		onLoad() {

		},
		onShow() {
			this.isboss = uni.getStorageSync('isBoss')
			this.getvideo()
			// this.getActivity()
			this.getActivityNum()

		},
		onPullDownRefresh() {
			console.log("测试下拉刷新");
			if (this.isOrgShow == 0) {
				this.videopage = 1;
				this.videolist = []
				this.getvideo()
			}
			if (this.isOrgShow == 1) {
				this.companypage = 1;
				this.companylist = []
				this.getvideo()
			}
		},
		//上拉加载更多
		onReachBottom() {
			if (this.isOrgShow == 0) {
				this.videopage += 1;
				this.getvideo()
			}
			if (this.isOrgShow == 1) {
				this.companypage += 1;
				this.getvideo()
			}
			// this.getActivity();
		},
		methods: {
			closeShare() {
				this.share = false;
				this.dynamicId = '';
				this.companyId = '';
				this.title = '';
				this.photos = '';
			},
			tojg(item) {
				console.log(item);
				// https://api.mingyicloud.com/schedulingsApi/dynamic/copyDynamicInfo
				let url = "/shortVideo/add"
				let data = {
					address: item.address,
					"title": item.title,
					"url": item.url,
					"userId": item.userId,
					"coverImg": item.coverImg,
					state: 1,
					videoHigh: 710,
					videoWidth: 444,
					isOrgShow: 1,
					isDiscover: "",
					isLibrary: 1
				}
				WXAJAX.POST(data, "", url, "", "").then((res) => {
					console.log(res);
				})
			},
			shares() {
				this.share = true
			},
			delpop() {
				this.shareDiv = false
			},
			// 弹窗
			pop(e) {
				this.shareDiv = true
				this.active_index = e

			},

			playvideo(e) {
				console.log(e);
				var that = this;
				var id = e.currentTarget.id;
				for (var i = 0; i < that.videolist.length; i++) {
					if (id === 'myvideo' + i) {
						//console.log('播放视频不做处理');
					} else {
						//console.log('暂停其他正在播放的视频');
						var videoContext = wx.createVideoContext("myvideo" + i);
						videoContext.pause();
					}
				}
				// 	this.videoContextList[index].pause();
			},
			toviedoinfo(info, index) {
				var videoContext = wx.createVideoContext("myVideo" + index, this);
				videoContext.pause();
				let id = info.videoId
				let companyId = info.companyId
				wx.navigateTo({
					url: `../../companyPack/videodetails/videodetails?videoId=${id}&companyId=${companyId}`
				});
			},
			toviedolist(info, index) {
				var videoContext = wx.createVideoContext("myVideo" + index, this);
				videoContext.pause();
				let id = info.videoId
				let companyId = info.companyId
				if (this.isboss || info.isShow == 1) {
					wx.navigateTo({
						url: `../../companyPack/videodetails/videodetails?videoId=${id}&companyId=${companyId}`
					});
				}
			},
			promote_tap(type) {
				wx.navigateTo({
					url: `../../enterpriSeservices/setMeal/main?type=${type}`
				});
			},
			getActivity() {
				let v = this
				wx.showLoading()
				let url = '/shortVideo/queryPage';
				if (wx.getStorageSync('isBoss')) { //boss可以查看所有的数据，非boss只能查看自己的数据
					url = '/shortVideo/bossQueryPage';
				}
				WXAJAX.POST({
						companyId: wx.getStorageSync('COMPANYID') || '',
						pageNum: v.page,
						isDel: 0,
					}, '', url)
					.then((data, code) => {
						wx.hideLoading();

						if (data) {
							if (this.page == 1) {
								v.video_data = data.list || [];
							} else {
								v.video_data = [...v.video_data, ...data.list] || [];
							}
							v.page++;
						}
					})
					.catch(err => {
						wx.hideLoading();
					});
			},

			todetall(videoId, type) {
				wx.navigateTo({
					url: '../editVideo/main?videoId=' + videoId + '&type=' + type
				});
			},
			// 跳转到发布视频的页面
			addVideo() {
				if (this.num <= 0) {
					this.isShowTips = true
					return
				}
				let type = 'add'
				wx.navigateTo({
					url: '../editVideo/main?type=' + type
				});
			},
			undercarriage(item) {
				let state = ''
				let v = this
				if (item.state == 1) {
					state = 0
					wx.showModal({
						title: '提示',
						content: '是否要下架视频',
						success: function(res) {
							if (res.confirm) {
								v.releaseVido(item, state)
							}
						}
					})
				} else {
					state = 1
					v.releaseVido(item, state)
				}
			},
			// 视频删除
			deleteVideo(item) {
				let that = this
				wx.showModal({
					title: '提示',
					content: '是否要刪除视频',
					success: function(res) {
						if (res.confirm) {
							wx.showLoading()
							WXAJAX.POST({
									companyId: item.companyId,
									videoId: item.videoId
								}, '', '/shortVideo/deleteById')
								.then((data, code) => {
                  that.shareDiv=!that.shareDiv
									that.getvideo()
									wx.showToast({
										title: '删除成功',
										duration: 2000,
										icon: "none"
									});

								})
								.catch(err => {
									wx.hideLoading();
								});
						} else if (res.cancel) {

						}
					}
				})
			},
			getActivityNum() {
				let v = this
				wx.showLoading()
				WXAJAX.POST({
						companyId: wx.getStorageSync('COMPANYID'),
					}, '', '/activity/queryCompanyService')
					.then((data, code) => {
						wx.hideLoading();
						v.num = data.videoSize - data.usedSize
						if (v.num <= 0) {
							v.num = 0
						}
						v.total = data.videoSize
					})
					.catch(err => {
						wx.hideLoading();

					});
			},
			releaseVido(item, state) {
				let v = this
				wx.showLoading()
				WXAJAX.POST({
						companyId: item.companyId,
						address: item.address,
						title: item.title,
						url: item.url,
						userId: item.userId,
						videoId: item.videoId,
						state: state,

					}, '', '/shortVideo/update')
					.then((data, code) => {
						if (state == 1) {
							wx.showToast({
								title: '上架成功',
								duration: 2000,
								icon: "none"
							});
						}
						setTimeout(function() {
							// v.getActivity()
						}, 800)
					})
					.catch(err => {
						wx.hideLoading();
						// wx.showToast({
						//   title: '系统繁忙',
						//   duration: 2000,
						//   icon: "none"
						// });
					});
			},
			topay_tap() {
				this.isShowTips = false
			},
			toOrderList_tap() {
				this.isShowTips = false
			},
			toVideoList() {
				wx.navigateTo({
					url: `../../enterpriSeservices/setMeal/main?type=${3}`
				})
			},
			// 跳转个人视频发布
			addVideolist() {
				let type = 'add'
				wx.navigateTo({
					url: '../editVideo/main?type=' + type
				});
			},
			// 跳转机构视频的发布
			addvideocompany() {
				let type = 'jgadd'
				wx.navigateTo({
					url: '../editVideo/main?type=' + type
				});
			},
			//点击切换选项卡
			toContent(index) {
				this.activeIndex = index
				if (index == 0) {
					this.isOrgShow = 0;
					this.getvideo()
				} else if (index == 1) {
					this.isOrgShow = 1;
					this.getvideo()
				}
			},
			// 控制点赞的显隐
			praise(item) {
				item.openThumbs = !item.openThumbs,
					item.openComment = false
			},
			// 控制评论的显隐
			deliver(item) {
				item.openComment = !item.openComment,
					item.openThumbs = false
			},
			// 获取视频的详情
			getvideo() {
				let url = '/shortVideo/queryPage';
				if (wx.getStorageSync('isBoss')) { //boss可以查看所有的数据，非boss只能查看自己的数据
					url = '/shortVideo/bossQueryPage';
				}
				let companyId = wx.getStorageSync('SELFCOMPANYID') ? wx.getStorageSync('SELFCOMPANYID') : wx
					.getStorageSync('COMPANYID');
				let v = this
				if (this.isOrgShow == 0) {
					var data = {
						pageNum: this.videopage,
						pageSize: 5,
						companyId: companyId,
						cardId: wx.getStorageSync('cardId'),
						deleted: 0,
						isOrgShow: 0,
						// isLibrary: 1

					}
					WXAJAX.POST(data, '', url).then(res => {
						if (this.videopage == 1) {
							this.videoflg = false
							v.videolist = res.list;
						} else {
							v.videolist = [...v.videolist, ...res.list];
						}
						console.log(res, '个人视频');
					}).catch(err => {
						this.videoflg = true
					})
				} else {
					var data = {
						pageNum: this.companypage,
						pageSize: 5,
						companyId: companyId,
						isOrgShow: 1,
						// isShow: 1,
						// isLibrary: 1,
						deleted: 0,
					}
					WXAJAX.POST(data, '', url).then(res => {
						if (this.companypage == 1) {
							this.companytotal = false
							v.companylist = res.list;
						} else {
							v.companylist = [...v.companylist, ...res.list];
						}
						console.log('机构视频', v.companylist)
					}).catch(err => {
						this.companytotal = true
					})
				}
			},
		}
	};
</script>

<style scoped>
	.imgv {
		vertical-align: middle;
	}

	.shareDiv {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	.warn {
		width: 100%;
		height: 170rpx;
		overflow: hidden;
		position: fixed;
		right: 0;
		bottom: 0;
		margin: auto;
		border-radius: 8px;
		background-color: #fff;
	}

	.video_btn {
		display: flex;
		height: 98upx;
		width: 100%;
	}

	.topay {
		width: 220upx;
		text-align: center;
		line-height: 80upx;
		background: linear-gradient(90deg, #76DAD9, #51CDCC);
		height: 80upx;
		color: #fff;
		font-size: 32upx;
		font-weight: bold;
		border-radius: 40upx;
		margin-left: 50upx;
	}

	.mark {
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.write {
		width: 315rpx;
		height: 142rpx;
		background-color: #04D7D0;
		border-radius: 28rpx;
		position: relative;
	}

	.document {
		width: 315rpx;
		height: 142rpx;
		background-color: #1AD09C;
		border-radius: 28rpx;
		position: relative;
	}

	.toppicture {
		width: 138rpx;
		height: 138rpx;
		position: absolute;
		right: 0;
		bottom: -8rpx;
	}

	.probable {
		width: 116rpx;
		height: 52rpx;
		color: #FFFFFF;
		background-color: #03D3C5;
		font-size: 24rpx;
		border: 1px solid rgba(255, 255, 255, 100);
		border-radius: 15rpx;
		line-height: 52rpx;
		text-align: center;
		margin-right: 20rpx;
	}

	.noprobable {
		width: 116rpx;
		height: 52rpx;
		color: #8B8B8B;
		background-color: #DEDEDE;
		font-size: 24rpx;
		border: 1px solid rgba(255, 255, 255, 100);
		border-radius: 15rpx;
		line-height: 52rpx;
		text-align: center;
		margin-right: 20rpx;
	}

	.trends {
		display: flex;
		flex-direction: column;
	}

	.assist {
		width: 130rpx;
		height: 50rpx;
		display: flex;
		justify-content: space-between;
		background-color: #FFFFFF;
		margin-left: 0rpx;
		margin-right: 0rpx;
	}

	.quantity {
		display: block;
		width: 35rpx;
		height: 50rpx;
		line-height: 50rpx;
	}

	.place {
		color: #A09D9D;
		font-size: 22rpx;
		width: 280rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.noMsg {
		width: 100%;
		height: 70vh;
		overflow: hidden;
	}

	.noYet {
		width: 300rpx;
		height: 350rpx;
		display: flex;
		flex-direction: column;
		text-align: center;
		margin-left: 185rpx;
		margin-top: 300rpx;
		color: rgba(141, 141, 141, 100);
	}

	.noMsg image {
		width: 300rpx;
		height: 300rpx;
		display: block;
	}

	.actives {
		width: 60rpx;
		height: 60rpx;
		font-size: 50rpx;
		line-height: 48rpx;
		font-weight: bold;
	}
</style>
