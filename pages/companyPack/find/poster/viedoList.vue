<template>
	<div>
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
			<video :src="item.url" style="width: 650rpx;" :id="'myVideo' + index" :data-index="index" :controls="true" :autoplay="false"
				@play="playVideo" :enable-play-gesture="true" :show-center-play-btn='true' :show-fullscreen-btn="true"
				:show-play-btn="true"></video>
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
					@click.stop="toShare(item.dynamicId,item.companyId,item.title,item.photos,item)"
					hover-class="other-button-hover">
					<img class="w20 h20 mr8" :src="shareIcon">
					<span>{{item.shareNum}}</span>
				</button>
				<div class="disflex jscen align-cen" @click.stop="addCommentB(index, item)"
					:class="item.type != 2 ? 'w33p': 'w50p'">
					<img class="w20 h20 mr8" :src="commentIcon">
					<p class="fs12 c78">{{item.commentNum}}</p>
				</div>
				<div class="disflex jscen align-cen" :class="item.type != 2 ? 'w33p': 'w50p'">
					<image class="w20 h20 mr8"
						src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/readtime.png"
						mode=""></image>
					<p class="fs12 c78">{{item.readNum}}</p>
				</div>
				<div class="disflex jscen align-cen" @click.stop="zan1(index , item.isThumbs,item.dynamicId)"
					:class="item.type != 2 ? 'w33p': 'w50p'">
					<img class="w20 h20 mr8" :src="item.isThumbs == 1 ?  like_selectIcon :  likeIcon">
					<p :class="item.isThumbs == 1 ?  'cblue' :  'c78'" class="fs12">{{item.likeNum}}</p>
				</div>
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
	</div>

</template>

<script>
	import SHARE from '@/components/share' //
	import util from '@/utils/index'
	import WXAJAX from '@/utils/request'
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
			SHARE
		},
		data() {
			return {
				dynamicId: 0,
				companyId:1,
				commentIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_comment.png',
				likeIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_like.png',
				like_selectIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_like_select.png',
				shareIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_share.png',
				video_lists: '', //视频列表
				videoContextList: [],
				videopages: 1,
				input_showB: false, //评论弹窗
				replayComment: {}, // 回复信息对象
				add_comments_index: 0,
				comment_focus: false,
				share: false,
			}
		},
		onShow() {
			this.videolist()
		},
		onPullDownRefresh() {
		this.videopages = 1
				this.video_lists = []
				this.videolist()
		},
		onReachBottom() {
			this.videopages += 1
			this.videolist()
		},
		onPageScroll(e) {
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
			},
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
			},
			inputConfirmB() {
				let that = this
				console.log('add_comments_index', this.add_comments_index)
				let dynamic_lists = that.video_lists[that.add_comments_index]
				console.log('', dynamic_lists)
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
					"/personal/doComment", "", "", 2
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
			closeShare() {
				this.share = false;
				this.dynamicId = '';
				this.companyId = '';
				this.title = '';
				this.photos = '';
			},
			toShare(did, companyId, title, photos, item) {
				this.videoId = item.videoId || item.shortVideoId || 0
				this.dynamicId = did;
				this.companyId = companyId;
				this.title = title;
				this.photos = photos[0];
				this.share = true;
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

		}
	}
</script>

<style scoped>
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

	.contentinfoTitle {
		padding: 10rpx 0 10rpx 0;
	}
</style>
