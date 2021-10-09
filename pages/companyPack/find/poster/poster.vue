<template>
	 <view class="">
		<!-- <view class="w100p bgfff">
			<view @click="toDetail(item)" class="disflex wenzhang" :key="index"
				style="background-color: #fff;z-index:99;" v-for="(item , index ) in dynamic_lists">
				<view class="w250" style="margin: 20rpx;">
					<view class="disflex">
						<text class="fs14 c38 over_2">{{item.type==3?'(转载) ':''}}{{item.title||'标题'}}</text>
						
					</view>
					
				</view>
				<img :lazy-load="true" mode="aspectFill" :src="item.photos[0]" class="w65 h65 bradius4 mr8"
					style="margin: 20rpx;">
			</view>
		</view> -->
		<div class="pl15 pr15" id="tab7" v-if="article_lists.length">
			<view class="disflex w100p jsbet">
				<subhead title="精选文章" dec="ARTICLE"></subhead>
				<view class="title-boxx" @click="tocaticle">
					<span class="titlee">查看更多 ></span>
				</view>
			</view>
			<div v-if="article_lists.length" class="shadow_gray">
				<div class="shadow_gray " style="position: relative;">
					<template>
						<Dyname @zan="zan" :article_lists="article_lists" @addCommentA="addCommentA()"
							@toShare="toShare()" :companyId="COMPANYID" :index1="k1"></Dyname>
					</template>

				</div>
			</div>
		</div>
		<div class="pl15 pr15" id="tab7" v-if="video_lists.length">
			<view class="disflex w100p jsbet">
				<subhead title="精选视频" dec="VIDEOS"></subhead>
				<view class="title-boxx">
					<span class="titlee" @click="toviedo">查看更多 ></span>
				</view>
			</view>
			<div class="bgfff pt20 pl30 pr30 " style="margin-bottom: 20px;border-radius: 20rpx;"
				v-for="(item,index) in video_lists" :key="index" @click="toviedoinfo(item,index)">
				<div class="disflex mb15">
					<img :src=" item.logo || 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/card1_logo.png'"
						alt="" mode="aspectFill" class="mr8" style="border-radius: 50%;width:33px;height: 33px;">
					<div class="disflex flex-column jsaround">
						<span class="fbold cblue_3 w215 fs12 over_1">{{item.name}}</span>
						<span class="ca8" style="font-size: 9px;">{{item.createTimeStr}}</span>
					</div>
				</div>
				<view class="contentinfoTitle">
					{{item.title}}
				</view>
				<video :src="item.url" :id="'myVideo' + index" :data-index="index" :controls="true"
					:autoplay="false" @play="playVideo" :enable-play-gesture="true" :show-center-play-btn='true'
					:show-fullscreen-btn="true" :show-play-btn="true"></video>
					<div class="disflex h39 ">
					  <!-- <button v-if="item.type != 2"
					          class='bgfff fs12 cdeepblue p0 w33p disflex jscen align-cen'
					          :data-dynamicId="item.dynamicId"
					          open-type="share"
					          hover-class="other-button-hover">
					    <img class="w20 h20 mr8" :src="shareIcon">
					    <span>{{item.shareNum}}</span>
					  </button> -->
					 <button v-if="item.type != 2" class='bgfff fs12 cdeepblue p0 w33p disflex jscen align-cen'
					 	:data-dynamicId="item.dynamicId"
					 	@click="toShare(item.dynamicId,item.companyId,item.title,item.photos,item)"
					 	hover-class="other-button-hover">
					 	<img class="w20 h20 mr8" :src="shareIcon">
					 	<span>{{item.shareNum}}</span>
					 </button>
					  <div class="disflex jscen align-cen"
					       @click.stop="addCommentB(index, item)"
					       :class="item.type != 2 ? 'w33p': 'w50p'">
					    <img class="w20 h20 mr8" :src="commentIcon">
					    <p class="fs12 c78">{{item.commentNum}}</p>
					  </div>
					  <div class="disflex jscen align-cen" :class="item.type != 2 ? 'w33p': 'w50p'">
					    <image class="w20 h20 mr8" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/readtime.png" mode=""></image>
					    <p class="fs12 c78">{{item.readNum}}</p>
					  </div>
					  <div class="disflex jscen align-cen"
					       @click.stop="zan1(index , item.isThumbs,item.dynamicId)"
					       :class="item.type != 2 ? 'w33p': 'w50p'">
					    <img class="w20 h20 mr8" :src="item.isThumbs == 1 ?  like_selectIcon :  likeIcon">
					    <p
					      :class="item.isThumbs == 1 ?  'cblue' :  'c78'"
					      class="fs12">{{item.likeNum}}</p>
					  </div>
					</div>
			</div>
		</div>
		<div class="fix_bottomCD disflex borderbox align-cen pl15 h49 bgfff edit_input trans2" v-if="input_show==true">
			<!--:class="input_show ? '' : 'hide' "-->
			<div class="bgfff  disflex w100p jsbet pr11 borderbox align-cen">
				<input fixed="true"
					class=" borderbox h40 lh40 pr11 bgf5f6 bradius5 flex1 mr11 comment_input c38 fs18 pl15"
					:focus="comment_focus" :placeholder="
		        replayComment.commentId
		          ? '回复 ' + replayComment.userName + '：'
		          : '评论'
		      " cursor-spacing="4" @confirm="inputConfirm" :style="{ height: text_height + 'px' }" v-model="comments" />
				<!--        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/smile.png" alt="" class="w25 h25" @click="smile_tap">-->
				<span class="bgblue cfff w50 textc lh30 fs16 bradius5 disblock ml10"
					@click.stop="inputConfirm">发送</span>
			</div>
		</div>
		<div class="fix_bottomCD disflex borderbox align-cen pl15 h49 bgfff edit_input trans2" v-if="input_showB==true">
			<!--:class="input_show ? '' : 'hide' "-->
			<div class="bgfff  disflex w100p jsbet pr11 borderbox align-cen">
				<input fixed="true"
					class=" borderbox h40 lh40 pr11 bgf5f6 bradius5 flex1 mr11 comment_input c38 fs18 pl15"
					:focus="comment_focus" :placeholder="
		        replayComment.commentId
		          ? '回复 ' + replayComment.userName + '：'
		          : '评论'
		      " cursor-spacing="4" @confirm="inputConfirmB" :style="{ height: text_height + 'px' }" v-model="comments" />
				<!--        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/smile.png" alt="" class="w25 h25" @click="smile_tap">-->
				<span class="bgblue cfff w50 textc lh30 fs16 bradius5 disblock ml10"
					@click.stop="inputConfirmB">发送</span>
			</div>
		</div>
		<SHARE v-if="share==true" :dynamicId="dynamicId" :companyId="companyId" saveType='1' type='1'
			@closeShare="closeShare"></SHARE>
	</view>
</template>

<script>
	import SHARE from '@/components/share' //
	import util from '@/utils/index'
	import WXAJAX from "@/utils/request";
	import Dyname from "./dyname";
	import subhead from "@/components/subhead";
	import HandleLogin from "@/utils/handleLogin";
	import {
		authSubscribeMessage
	} from "@/utils/auth.js";
	import {
		mapActions,
		mapGetters
	} from "vuex";
	export default {
		name: '',
		components: {
			subhead,
			Dyname,
			SHARE
		},
		data() {
			return {
				commentIcon:WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_comment.png',
				likeIcon:WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_like.png',
				like_selectIcon:WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_like_select.png',
				shareIcon:WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_share.png',
				article_lists: '',
				page: 1, //当前页数
				shareDynamicId: '',
				shareDynamicPhotos: '',
				shareDynamicTitle: '',
				input_show: false, //评论弹窗
				input_showB: false, //评论弹窗
				replayComment: {}, // 回复信息对象
				add_comments_index: 0,
				comment_focus: false,
				comments: '',
				videopages: 1,
				video_lists: '', //视频列表
				videoContextList: [],
				
				share: false,
				dynamicId: 0,
				companyId: 0,
				photos: '',
				title: '',
			}
		},
		onLoad() {

		},
		onShow() {
			this.articleList()
			this.videolist()
		},
		onPageScroll(e) {
			if (this.input_show == true) {
				this.input_show = false
			}
			if (this.input_showB == true) {
				this.input_showB = false
			}
		},
		computed: {
			...mapGetters(["currentCompany", "subscriptionNew"]),
		},
		methods: {
			//视频详情跳转
			toviedoinfo(info,index) {
				var videoContext = wx.createVideoContext("myVideo" + index, this);
				videoContext.pause();
				let id = info.shortVideoId
				let dynamicId = info.dynamicId
				let companyId = info.companyId
				let cardId = info.cardId
				wx.navigateTo({
					url: `../../videodetails/videodetails?videoId=${id}&companyId=${companyId}&cardId=${cardId}`
				});
			},
			toShare(did, companyId, title, photos,item) {
				this.videoId = item.videoId||item.shortVideoId||0
				this.dynamicId = did;
				this.companyId = companyId;
				this.title = title;
				this.photos = photos[0];
				this.share = true;
			},
			closeShare() {
				this.share = false;
				this.dynamicId = '';
				this.companyId = '';
				this.title = '';
				this.photos = '';
			},
			tocaticle() {
				let url = './articleList';
				wx.navigateTo({
					url: url
				})
			},
			toviedo(){
				let url = './viedoList';
				wx.navigateTo({
					url: url
				})
			},
			articleList() {
				let v = this
				WXAJAX.POST({
						pageNum: this.page,
						pageSize: 3,
						// isPublic:1,
						// isShow: 1,
						// isDrafts: 0,
						// verify: 1,
						type: 8, //-1全部
						labelContent: "财税合规",
					},
					"",
					"/dynamic/listDynamic", "", "", 1
				).then((data, code) => {
					if (data.list) {
						console.log('文章列表', data)
						data.list.forEach(function(i, k) {
							i.photos = i.photos ? i.photos.split(",") : [];
							// i.createTime = util.getdate(i.createTime, "dateTime");
							// i.createTime = v.getDateConversion(i.createTime)
							// i.createTime = util.getFormatTime(i.createTime, true)
							i.doThumbsName = i.doThumbsName ? i.doThumbsName.split(",") : [];
						});
						v.article_lists = data.list;
						v.article_lastPage = data.lastPage
						console.log('article_lists', v.article_lists)
					}
				}).catch(err => {});
			},
			// 添加评论
			addCommentA(index1, replayComment) {
				console.log('评论a', index1)
				// article
				var article_lists = this.article_lists[index1]
				//添加评论
				let isLogin = HandleLogin.returnIsLogin();
				if (!isLogin) {
					uni.showToast({
						title: "请先登录,才可以评论喔",
						icon: "none"
					});
					return;
				}
				if (
					(replayComment.userName && !replayComment.commentId) ||
					(replayComment.commentId &&
						replayComment.userId == wx.getStorageSync("userId"))
				) {
					return;
				}
				this.input_show = true;
				this.replayComment = replayComment;
				// this.comment_focus = true ;
				this.add_comments_index = index1;
				let v = this;
				console.log('评论', v.article_lists[index1])
				setTimeout(function() {
					v.$set(v.article_lists[index1], "operate_show", false);
					v.comment_focus = true;
				}, 200);
			},
			shareTo(id, photos, title) {
				this.shareDynamicId = id;
				this.shareDynamicPhotos = photos;
				this.shareDynamicTitle = title;
			},
			zan(index1, isThumbs, dynamicId) { //点赞组件
				//点赞
				let isLogin = HandleLogin.returnIsLogin();
				if (!isLogin) {
					uni.showToast({
						title: "请先登录,才可以点赞喔",
						icon: "none"
					});
					return;
				}

				let v = this;
				wx.showLoading();
				WXAJAX.POST({
							dynamicId: dynamicId,
							cardId: wx.getStorageSync("CARDID")
						},
						"",
						"/personal/doDynamicThumbs", "", "", 2
					)
					.then(data => {
						console.log('点赞1111', v.article_lists)
						wx.hideLoading();
						if (data) {
							//点赞
							v.article_lists[index1].doThumbsName.push(data); //添加人名
							v.$set(v.article_lists[index1], "isThumbs", 1);
							v.$set(
								v.article_lists[index1],
								"doThumbsNum",
								v.article_lists[index1].likeNum += 1
							);
						} else {
							v.article_lists[index1].doThumbsName.pop();
							v.$set(v.article_lists[index1], "isThumbs", 0);
							v.$set(
								v.article_lists[index1],
								"doThumbsNum",
								v.article_lists[index1].likeNum -= 1
							);
						}
						let status = !v.article_lists[index1].operate_show;
						v.$set(v.article_lists[index1], "operate_show", status);

					})
					.catch(err => {
						console.log(err);
						wx.hideLoading();
					});
			}, //点赞组件
			inputConfirm() {
					let that = this
					console.log('add_comments_index', this.add_comments_index)
					let dynamic_lists = that.article_lists[that.add_comments_index]
					console.log('',dynamic_lists)
					//输入完成
					this.emoji_show = false;
					this.comment_focus = false;
					authSubscribeMessage(this.subscriptionNew);
					WXAJAX.POST({
							dynamicId: this.article_lists[this.add_comments_index].dynamicId,
							parentId: this.replayComment.commentId || 0,
							cardId: this.currentCompany.cardId || this.CARDID || 0,
							text: this.comments
						},
						"",
						"/personal/doComment","","",2
					).then(res => {
						let comments = this.article_lists[this.add_comments_index];
						console.log('想睡觉',comments)
						comments.commentModelList = comments.commentModelList ?
							comments.commentModelList : [];
							console.log(comments.commentModelList)
						if (
							comments.commentModelList.length < 10 ||
							comments.commentNum > comments.commentModelList.length
						) {
							this.article_lists[this.add_comments_index].commentModelList.push({
								text: this.comments,
								replyName: this.replayComment.userName || "",
								userName: wx.getStorageSync("USERNAME")
							});
							this.article_lists[this.add_comments_index].commentNum += 1
							 // this.article_lists[this
								// .add_comments_index].commentModelList.length
							// console.log('评论次数',this.article_lists[this.add_comments_index].commentNum)
							// this.$set(
							// 	this,
							// 	"article_lists",
							// 	JSON.parse(JSON.stringify(this.article_lists))
							// );
						}
						this.input_show = false;
						this.comments = "";
					});
			},
			//视频
			videolist() {
				let v = this
				WXAJAX.POST({
						pageNum: v.videopages,
						pageSize: 5,
						// isPublic:1,
						isShow: 1,
						isDrafts: 0,
						// verify: 1,
						type: 6,
					},
					"",
					"/dynamic/listDynamic", "", "", 1
				).then((data, code) => {
					if (data.list) {
						data.list.forEach(function(i, k) {
							i.photos = i.photos ? i.photos.split(",") : [];
							// i.createTime = util.getdate(i.createTime, "dateTime");
							// i.createTime = v.getDateConversion(i.createTime)
							// i.createTime = util.getFormatTime(i.createTime, true)
							i.doThumbsName = i.doThumbsName ? i.doThumbsName.split(",") : [];
						});
						console.log(v.videopages)
						if (v.videopages == 1) {
							v.video_lists = data.list
						} else {
							v.video_lists = [...v.video_lists, ...data.list];
						}

						console.log('video_lists', v.video_lists)
						this.init()
					} else {}
				})
			},
			init() {
				for (var i = 0; i < this.video_lists.length; i++) {
					const video = uni.createVideoContext("myVideo" + i, this);
					this.videoContextList.push(video);
				}
			},
			zan1(index1, isThumbs, dynamicId) { //点赞组件
				//点赞
				let isLogin = HandleLogin.returnIsLogin();
				if (!isLogin) {
					uni.showToast({
						title: "请先登录,才可以点赞喔",
						icon: "none"
					});
					return;
				}
			
				let v = this;
				wx.showLoading();
				WXAJAX.POST({
							dynamicId: dynamicId,
							cardId: wx.getStorageSync("CARDID")
						},
						"",
						"/personal/doDynamicThumbs", "", "", 2
					)
					.then(data => {
						console.log('点赞1111', v.video_lists)
						wx.hideLoading();
						if (data) {
							//点赞
							v.video_lists[index1].doThumbsName.push(data); //添加人名
							v.$set(v.video_lists[index1], "isThumbs", 1);
							v.$set(
								v.video_lists[index1],
								"doThumbsNum",
								v.video_lists[index1].likeNum += 1
							);
						} else {
							v.video_lists[index1].doThumbsName.pop();
							v.$set(v.video_lists[index1], "isThumbs", 0);
							v.$set(
								v.video_lists[index1],
								"doThumbsNum",
								v.video_lists[index1].likeNum -= 1
							);
						}
						let status = !v.video_lists[index1].operate_show;
						v.$set(v.video_lists[index1], "operate_show", status);
			
					})
					.catch(err => {
						console.log(err);
						wx.hideLoading();
					});
			}, //点赞组件
			// 添加评论
			addCommentB(index1, replayComment) {
				console.log('评论a', index1)
				// article
				var article_lists = this.video_lists[index1]
				//添加评论
				let isLogin = HandleLogin.returnIsLogin();
				if (!isLogin) {
					uni.showToast({
						title: "请先登录,才可以评论喔",
						icon: "none"
					});
					return;
				}
				if (
					(replayComment.userName && !replayComment.commentId) ||
					(replayComment.commentId &&
						replayComment.userId == wx.getStorageSync("userId"))
				) {
					return;
				}
				this.input_showB = true;
				this.replayComment = replayComment;
				// this.comment_focus = true ;
				this.add_comments_index = index1;
				let v = this;
				console.log('评论', v.article_lists[index1])
				setTimeout(function() {
					v.$set(v.article_lists[index1], "operate_show", false);
					v.comment_focus = true;
				}, 200);
			},
			inputConfirmB() {
					let that = this
					console.log('add_comments_index', this.add_comments_index)
					let dynamic_lists = that.video_lists[that.add_comments_index]
					console.log('',dynamic_lists)
					//输入完成
					this.emoji_show = false;
					this.comment_focus = false;
					authSubscribeMessage(this.subscriptionNew);
					WXAJAX.POST({
							dynamicId: this.video_lists[this.add_comments_index].dynamicId,
							parentId: this.replayComment.commentId || 0,
							cardId: this.currentCompany.cardId || this.CARDID || 0,
							text: this.comments
						},
						"",
						"/personal/doComment","","",2
					).then(res => {
						let comments = this.video_lists[this.add_comments_index];
						comments.commentModelList = comments.commentModelList ?
							comments.commentModelList : [];
							console.log(comments.commentModelList)
						if (
							comments.commentModelList.length < 10 ||
							comments.commentNum > comments.commentModelList.length
						) {
							this.video_lists[this.add_comments_index].commentModelList.push({
								text: this.comments,
								replyName: this.replayComment.userName || "",
								userName: wx.getStorageSync("USERNAME")
							});
							this.video_lists[this.add_comments_index].commentNum += 1
							 // this.article_lists[this
								// .add_comments_index].commentModelList.length
							// console.log('评论次数',this.article_lists[this.add_comments_index].commentNum)
							// this.$set(
							// 	this,
							// 	"article_lists",
							// 	JSON.parse(JSON.stringify(this.article_lists))
							// );
						}
						this.input_showB = false;
						this.comments = "";
					});
			},
			//视频暂停
			playVideo(e) {
				var that = this;
				var id = e.currentTarget.id;
				for (var i = 0; i < that.video_lists.length; i++) {
					if (id === 'myVideo' + i) {
						//console.log('播放视频不做处理');
					} else {
						//console.log('暂停其他正在播放的视频');
						var videoContext = wx.createVideoContext("myVideo" + i, that);
						videoContext.pause();
					}
				}
				// 	this.videoContextList[index].pause();
			},
		},

	}
</script>

<style>
	.wenzhang {
		width: 96%;
		margin: 20rpx auto;
		box-shadow: rgb(167, 225, 221) 2rpx 2rpx 6px 4rpx;
		border-radius: 6px;
	}

	.title-boxx {
		margin-top: 50upx;
		margin-bottom: 30upx;
	}

	.title-box .titlee {
		font-size: 30upx;
		color: #9E9FA1;
		font-weight: bold;
		margin-right: 8upx;
	}

	.video {
		/* width: 100%;
		height: 352rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx; */
	}

	.video video {
		/* width: 100%;
		height: 100%; */
	}
	.contentinfoTitle{
		padding: 10rpx 0 10rpx 0;
	}
</style>
