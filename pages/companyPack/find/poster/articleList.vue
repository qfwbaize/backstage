<template>
	<view class="">
		<div class="pl15 pr15" style="margin-top: 30rpx;" id="tab7" v-if="article_lists.length">
			<div v-if="article_lists.length" class="shadow_gray">
				<div class="shadow_gray " style="position: relative;">
					<template>
						<Dyname @zan="zan" :article_lists="article_lists" @addCommentA="addCommentA()"
							@toShare="toShare()" :companyId="COMPANYID" :index1="k1"></Dyname>
					</template>

				</div>
			</div>
			<div v-if="articleflag" class="textc lh42 fs12 ca8 bgf5f6">- 到底了，看看其他的吧 -</div>
			<div class="fix_bottomCD disflex borderbox align-cen pl15 h49 bgfff edit_input trans2"
				v-if="input_show==true">
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
			<SHARE v-if="share==true" :dynamicId="dynamicId" :companyId="companyId" saveType='1' type='1'
				@closeShare="closeShare"></SHARE>
		</div>
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
				article_lists: '',
				page: 1, //当前页数
				input_show: false, //评论弹窗
				replayComment: {}, // 回复信息对象
				add_comments_index: 0,
				comment_focus: false,
				comments: '',
				articleflg: false,
				
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
		},
		onPullDownRefresh() {
			this.page = 1
			this.article_lists = []
			this.articleList()
		},
		onReachBottom() {
			this.page += 1
			this.articleList()
		},
		onPageScroll(e) {
			if (this.input_show == true) {
				this.input_show = false
			}
		},
		computed: {
			...mapGetters(["currentCompany", "subscriptionNew"]),
		},
		methods: {
			closeShare() {
				this.share = false;
				this.dynamicId = '';
				this.companyId = '';
				this.title = '';
				this.photos = '';
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
						data.list.forEach(function(i, k) {
							i.photos = i.photos ? i.photos.split(",") : [];
							// i.createTime = util.getdate(i.createTime, "dateTime");
							// i.createTime = v.getDateConversion(i.createTime)
							// i.createTime = util.getFormatTime(i.createTime, true)
							i.doThumbsName = i.doThumbsName ? i.doThumbsName.split(",") : [];
						});
						console.log(v.page)
						if (v.page == 1) {
							v.article_lists = data.list
						} else {
							v.article_lists = [...v.article_lists, ...data.list];
						}

						console.log('article_lists', v.article_lists)
						this.init()
					} else {}
				}).catch(err => {
					this.articleflg = true
				});
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
				setTimeout(function() {
					v.$set(v.article_lists[index1], "operate_show", false);
					v.comment_focus = true;
				}, 200);
			},
			toShare(did, companyId, title, photos,item) {
				this.dynamicId = did;
				this.companyId = companyId;
				this.title = title;
				this.photos = photos[0];
				this.share = true;
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
				console.log('', dynamic_lists)
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
					"/personal/doComment", "", "", 2
				).then(res => {
					console.log('输入完成', res)
					let comments = this.article_lists[this.add_comments_index];
					comments.commentModelList = comments.commentModelList ?
						comments.commentModelList : [];
					if (
						comments.commentModelList.length < 10 ||
						comments.commentNum > comments.commentModelList.length
					) {
						this.article_lists[this.add_comments_index].commentModelList.push({
							text: this.comments,
							replyName: this.replayComment.userName || "",
							userName: wx.getStorageSync("USERNAME")
						});
						this.article_lists[this.add_comments_index].commentNum = this.article_lists[this
							.add_comments_index].commentModelList.length
						console.log('评论次数', this.article_lists[this.add_comments_index].commentNum)
						this.$set(
							this,
							"article_lists",
							JSON.parse(JSON.stringify(this.article_lists))
						);
					}
					this.input_show = false;
					this.comments = "";
				});
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
</style>
