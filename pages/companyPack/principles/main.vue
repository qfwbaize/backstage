<template>
	<div style="background-color: #FFFFFF; width: 100%;paddingTop:navHeight;" class="box borderbox bgfff  posre">
		<view class="contentlist bgfff" v-if="item.type == 1 || item.type == 6|| item.type == 2|| item.type == 3"
			v-for="(item,index) in arr_lists" :key="index">
			<view class="contentTile" style="position: relative;">
				<view class="contentTileleft">
					<image :src="item.logo" mode="">
					</image>
				</view>
				<view class="contentTileright">
					<text style="font-size:26rpx;margin-top: 10rpx;">{{item.name}}
				<!-- 	<text class="fs12 ca8"
							style="display: inline;margin-left: 10rpx;">{{item.createTimeStr}}</text> -->
							</text>
					<text class="yc" style="width: 400rpx;">{{item.companyName}}</text>
				</view>
				<view v-if="item.createUserId != cardId">
					<view style="" class="gzbtn" v-if="item.isAttention == false" @click="followbtn(item,1)">
						<view style="line-height: 60rpx;color:#1AD09C;">+关注</view>
					</view>
					<view style="" class="gzbtn" v-if="item.isAttention == true" @click="followbtn(item,0)">
						<view style="line-height: 60rpx;color:#1AD09C;">已关注</view>
					</view>
				</view>

			</view>
			<view class="contentinfo">
				<view class="">
					<!-- 动态 -->
					<view class="contentinfoTitle" v-if="item.type == 2" @click="addComment(item)">
						{{item.title}}
					</view>
					<!-- 视频 -->
					<view class="contentinfoTitle" v-if="item.type == 6" @click="toviedoinfo(item,index)">
						{{item.title}}
					</view>
					<!-- <view class="contentinfoTitle" v-else>
						{{item.title}}
					</view> -->
				</view>


				<view class="video" v-if="item.type == 6" @click="toviedoinfo(item,index)">
					<video :src="item.url" :id="'myVideo' + index" :data-index="index" :controls="true"
						:autoplay="false" @play="playVideo" :enable-play-gesture="true" :show-center-play-btn='true'
						:show-fullscreen-btn="true" :show-play-btn="true"></video>
				</view>

				<view class="pt10 pb10 pl10 pr12 disflex jsbet align-cen wenzhang"
					v-if="item.type == 1 || item.type == 3" @click="toDetail(item)"
					style="margin-top: 20rpx;margin-bottom: 20rpx;background-color: #fff;box-shadow:0px 2px 6px 0px rgba(0, 0, 0, 0.28);">
					<view class="w250">
						<view class="disflex">
							<text class="fs14 c38 over_2" style="max-width: 380rpx;">
              {{item.type==3?'(转载) ':''}}{{item.title||'标题'}}</text>
							<view class="w22">
								<!-- 是否有推销奖励 -->
								<image class="w20 h20" v-if="item.settingInfo.pushEffectFlag == 1"
									:src="tuixiaozhuanfa"></image>
								<!-- 是否有悬赏奖励 -->
								<image class="w20 h20" v-if="item.settingInfo.offerRewardFlag == 1"
									:src="pay_selectIcon"></image>
								<!-- 是否有分享奖励 -->
								<image class="w20 h20" v-if="item.settingInfo.shareRewardFlag == 1"
									:src="pay_selectIcon"></image>
								<!-- 是否有阅读奖励 -->
								<image class="w20 h20" v-if="item.settingInfo.readRewardFlag == 1" :src="yuedujiangli">
								</image>
								<!-- <image class="w20 h20" :src="tuixiaozhuanfa"></image>
							<image class="w20 h20" :src="yuedujiangli"></image> -->
							</view>
						</view>
						<p class="fs12 ca7 mt15">本文为普通转发文章</p>
					</view>
					<img :lazy-load="true" mode="aspectFill" :src="item.photos[0]" alt="" class="w65 h65 bradius4">
				</view>
					<view v-if="item.type == 2">
						<view class="chart1" style="margin-top: 20rpx;margin-bottom: 20rpx;"
							v-if="item.photos && item.photos.length <=1">
							<image :src="v" v-for="(v,b) in item.photos" :key="b"
							:data-src="v"	@tap.stop="previewImage($event,item.photos)">
							</image>
						</view>
						<view class="chart" style="margin-top: 20rpx;margin-bottom: 20rpx;"
							v-if="item.photos && item.photos.length >= 2 && item.photos.length <=4">
							<view class="chart">
								<view class="image">
									<image :src="v" v-for="(v,b) in item.photos" :key="b" mode=""
									:data-src="v"	@tap.stop="previewImage($event,item.photos)">
									</image>
								</view>
							</view>
						</view>
						<view class="chart4" style="margin-top: 20rpx;margin-bottom: 20rpx;"
							v-if="item.photos && item.photos.length >= 4">
							<view class="chart4">
								<view class="image">
									<image :src="v" v-for="(v,b) in item.photos" :key="b" mode=""
									:data-src="v"	@tap.stop="previewImage($event,item.photos)">
									</image>
								</view>
							</view>
						</view>
						<view class="video"  @click="addComment(item,index)" v-if="item.url">
							<video :poster="item.logo"  :src="item.url" :id="'myVideo' + index" :data-index="index" :controls="true"
								:autoplay="false" @play="playVideo" :enable-play-gesture="true"
								:show-center-play-btn='true' :show-fullscreen-btn="true" :show-play-btn="true"></video>
						</view>
					</view>
				<view class="" style="display: flex;margin-bottom: 20rpx;margin-left: 14rpx;">
					<view class="" style="font-size: 28rpx;margin-right: 15rpx;color: #8B8B8B;">
						{{item.createTimeStr}}
					</view>
					<view class="" style="color: #43D3B9;font-size: 28rpx;margin-right: 10rpx;"
						@click="cutoff(item)">删除</view>
				</view>
				<view class="operation">
					<div class="disflex jscen align-cen" @click.stop="zan1(index,item.isThumbs, item.dynamicId,item)"
						:class="item.type != 2 ? 'w33p': 'w50p'">
						<img class="w20 h20 mr8" :src="item.isThumbs == 1 ?  like_selectIcon :  likeIcon">
						<p :class="item.isThumbs == 1 ?  'cblue' :  'c78'" class="fs12">{{item.likeNum}}</p>
					</div>
					<div class="disflex jscen align-cen" @click.stop="addCommentA(index, comment_item)"
						:class="item.type != 2 ? 'w33p': 'w50p'">
						<img class="w20 h20 mr8" :src="commentIcon">
						<p class="fs12 c78">{{item.commentNum}}</p>
					</div>
					<!--  -->
					<button v-if="item.type != 2" class='bgfff fs12 cdeepblue p0 w33p disflex jscen align-cen'
						:data-dynamicId="item.dynamicId"
						@click="toShare(item.dynamicId,item.companyId,item.title,item.photos,item)"
						hover-class="other-button-hover">
						<img class="w20 h20 mr8" :src="shareIcon">
						<span>{{item.shareNum}}</span>
					</button>
				</view>
			</view>
		</view>
		<div v-if="videoflg" class="textc lh42 fs12 ca8 bgf5f6">- 到底了，看看其他的吧 -</div>
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
		<SHARE v-if="share==true" :dynamicId="dynamicId" :companyId="companyId" saveType='1' type='1'
			@closeShare="closeShare"></SHARE>
	</div>
</template>

<script>
	import WXAJAX from "@/utils/request";
	import util from '@/utils/index';
	import HandleLogin from "@/utils/handleLogin";
	import SHARE from '@/components/share' //
	import {
		authSubscribeComment,
		authSubscribeMessage
	} from '@/utils/auth.js';
	import {
		mapActions,
		mapGetters
	} from "vuex";
	export default {
		components:{
			SHARE,
		},
		data() {
			return {
				commentIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_comment.png',
				videourl: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/video/20210319/32396be6e523cfee76e0684389072055.mp4',
				likeIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_like.png',
				like_selectIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_like_select.png',
				shareIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_share.png',
				pay_selectIcon: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/icon/pay.png',
				yuedujiangli: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/yuedujiangli.png',
				tuixiaozhuanfa: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/tuixiaozhuanfa.png',
				activeIndex: 0,
				navarr: ['动态', '文章'],
				pageNum: 1,
				type: 2,
				dynamics: [],
				articles: [],
				videopages: 1,
				arr_lists: '',
				videoflg: false, //判断视频是否还有下一页
				input_show: false, //评论弹窗
				comment_focus: false,
				comments: '',
				cardId: wx.getStorageSync('cardId'),
				share: false,
				dynamicId: 0,
				companyId: 0,
				photos: '',
				title: '',
				jxtabType: 1, //精选文章的
				wzlabel: '',
				labeltitel: '',
				chooseTypeShow: false,
				followpage: 1, //关注列表当前页数
				followList: '', //关注列表
			}
		},
		onShow() {
			this.videolist()
		},
		onPageScroll(e) {
			if (this.input_show == true) {
				this.input_show = false
			}
		},
		onPullDownRefresh() {
			this.videopages = 1
			this.arr_lists = []
			this.videolist()
		},
		onReachBottom() {
			this.videopages += 1
			this.videolist()
		},

		methods: {
			//视频详情跳转
			toviedoinfo(info,index){
				var videoContext = wx.createVideoContext("myVideo" + index, this);
				videoContext.pause();
				let id = info.shortVideoId
        let companyId = info.companyId
        let cardId = info.cardId
				wx.navigateTo({
				url: `../../companyPack/videodetails/videodetails?videoId=${id}&companyId=${companyId}&cardId=${cardId}`
				});
			},
			//点赞
			zan1(index, isThumbs, dynamicId, item, text) {
				console.log('点赞', index, isThumbs, dynamicId, item, text)
				let v = this;
					var dynamic_lists = v.arr_lists[index]
				authSubscribeMessage(this.subscriptionNew);
				let isLogin = HandleLogin.returnIsLogin();
				if (!isLogin) {
					uni.showToast({
						title: "请先登录,才可以点赞喔",
						icon: "none"
					});
					return;
				}
				wx.showLoading();
				WXAJAX.POST({
							dynamicId: dynamicId,
							cardId: wx.getStorageSync("cardId")
						},
						"",
						"/personal/doDynamicThumbs", "", "", 2
					)
					.then(data => {
						wx.hideLoading();
						if (data) {
							//点赞
							// dynamic_lists.doThumbsName.push(data);
							// item[index].doThumbsName.push(data); //添加人名
							v.$set(dynamic_lists, "isThumbs", 1);
							v.$set(
								dynamic_lists,
								"doThumbsNum",
								dynamic_lists.likeNum += 1
							);
						} else {
							// dynamic_lists.doThumbsName.pop();
							v.$set(dynamic_lists, "isThumbs", 0);
							v.$set(
								dynamic_lists,
								"doThumbsNum",
								dynamic_lists.likeNum -= 1
							);
						}
						let status = !dynamic_lists.operate_show;
						v.$set(dynamic_lists, "operate_show", status);

					})
					.catch(err => {
						console.log(err);
						wx.hideLoading();
					});
			},
			//跳转动态详情
			addComment(item) {
				let url = '/pages/companyPack/commentDetail/main?dynamicId=' + item.dynamicId + '&companyId=' + item
					.companyId +
					'&cardId=' + item.userId;
				wx.navigateTo({
					url: url
				})
			},
      closeShare() {
      	this.share = false;
      },
			//评论
			addCommentA(index, replayComment = {}) {
				let v = this;
					var dynamic_lists = v.arr_lists[index]
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

				v.input_show = true;
				v.replayComment = replayComment;
				// this.comment_focus = true ;
				v.add_comments_index = index;
				setTimeout(function() {
					v.$set(dynamic_lists, "operate_show", false);
					v.comment_focus = true;
				}, 200);
			},
			toShare(did, companyId, title, photos,item) {
				this.videoId = item.videoId||item.shortVideoId
				this.dynamicId = did;
				this.companyId = companyId;
				this.title = title;
				this.photos = photos[0];
				this.share = true;
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
			previewImage(e, urls) { //点击图片全屏预览
				var current = e.target.dataset.src
				wx.previewImage({
					// urls: [urls + '.primary.png'],
					current: current,
					urls: urls
				})
			},
			//输入完成
			inputConfirm() {
				let v = this;
				var dynamic_lists = v.arr_lists
				this.comment_focus = false;
				authSubscribeMessage(this.subscriptionNew);
				WXAJAX.POST({
						dynamicId: dynamic_lists[v.add_comments_index].dynamicId,
						parentId: this.replayComment.commentId || 0,
						cardId: this.currentCompany.cardId || v.CARDID || 0,
						text: this.comments
					},
					"",
					"/personal/doComment", "", "", 2
				).then(res => {
					let comments = dynamic_lists[v.add_comments_index];
					comments.commentModelList = comments.commentModelList ?
						comments.commentModelList : [];
					if (
						comments.commentModelList.length < 10 ||
						comments.commentNum > comments.commentModelList.length
					) {
						dynamic_lists[v.add_comments_index].commentModelList.push({
							text: this.comments,
							replyName: this.replayComment.userName || "",
							userName: wx.getStorageSync("USERNAME")
						});
						dynamic_lists[v.add_comments_index].commentNum += 1
					}
					this.input_show = false;
					this.comments = "";
				});

			},
			toDetail(item) { //查看文章详情
				const companyId = item.companyId;
				const cardId = item.createUserId
				const dynamicId = item.dynamicId
				let url = '/pages/companyPack/find/dynamicDetail/main?dynamicId=' + dynamicId + '&companyId=' + companyId +
					'&cardId=' + cardId;
				wx.navigateTo({
					url: url
				})
			},
			//视频
			videolist() {
				let v = this
				WXAJAX.POST({
						pageNum: v.videopages,
						pageSize: 15,
						// isPublic:1,
						isShow: 1,
						isDrafts: 0,
						isDel: 0,
						createUserId:wx.getStorageSync('cardId')
						// isPublic:1,
						// verify: 1,
						// type: 6,
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
							v.arr_lists = data.list
						} else {
							v.arr_lists = [...v.arr_lists, ...data.list];
						}

						console.log('arr_lists', v.arr_lists)
						this.init()
					} else {}
				}).catch(err => {
					this.videoflg = true
				});
			},
			//点击切换选项卡
			toContent(index) {
				this.activeIndex = index
				if (index == 0) {
					this.type = 2;
					this.getContent()
				} else if (index == 1) {
					this.type = 1;
					this.getContent()
				}
			},
			//分类获取数据
			getContent() {
				if (this.type == 2) {
					var data = {
						pageNum: this.pageNum,
						type: 2
					}
					WXAJAX.POST(data, '', '/dynamic/listMyDynamic', '', '', 1).then(res => {
						this.dynamics = res.list
						for (var i = 0; i < this.dynamics.length; i++) {
							this.dynamics[i]['img'] = this.dynamics[i].photos.split(',')
						}
					})
				} else if (this.type == 1) {
					var data = {
						pageNum: this.pageNum,
						type: 1
					}
					WXAJAX.POST(data, '', '/dynamic/listMyDynamic', '', '', 1).then(res => {
						this.articles = res.list
					})
				}

			},
			// 返回上一页
			goBack() {
				wx.navigateBack()
			},
			// 控制评论的显隐
			deliver(item) {
				item.openComment = !item.openComment

			},
			// 控制点赞的显隐
			praise(item) {
				item.openThumbs = !item.openThumbs
			},
			// 点击删除事件
			cutoff(item) {
				var data = {
					dynamicId: item.dynamicId
				}
				WXAJAX.POST(data, '', '/dynamic/delDynamic', '', '', 1).then(res => {
					this.videolist()
				})
			}
		},
		computed: {
			...mapGetters(["currentCompany", "subscriptionNew"]),
		},
	}
</script>

<style>
	.app {
		background: #bgf5f6;
	}

	.content {
		padding: 20rpx;
	}

	.refreshimg {
		width: 40rpx;
		height: 40rpx;
	}

	.line {
		width: 96%;
		margin: 0 auto;
		border-bottom: 2rpx #F1F1F1 solid;
	}

	.callinglist {
		width: 95%;
		margin: 10rpx auto;
		padding-top: 20rpx;
	}

	.callinglist .left image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
	}

	.callinglist .right {
		padding: 0 10rpx 10rpx 10rpx;
		margin-left: 10rpx;
	}

	.wenzhang {
		width: 90%;
		margin: 10rpx auto;
		/* box-shadow: rgb(167, 225, 221) 2rpx 2rpx 6px 4rpx; */
		border-radius: 6px;
	}

	.poster {
		padding: 20rpx;
	}

	.poster image {
		width: 100%;
		height: 410rpx;

	}

	.screen {
		width: calc(100% -1rpx);
		border: 0px transparent solid;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
	}

	.screenList {
		width: 60%;
		margin: 20rpx;
		display: flex;
	}

	.jxscreenList {
		width: 60%;
		margin: 20rpx;
		display: flex;
	}

	.industry {
		background-color: #EAEAEA;
		padding: 15rpx 28rpx 15rpx 28rpx;
		border-radius: 15rpx;
		color: #807E7E;
		margin-right: 20rpx;
	}


	.active {
		color: #FFF;
		background-color: #51cdcb;
		transition: all .2s;
		padding: 15rpx 28rpx 15rpx 28rpx;
		border-radius: 15rpx;
		margin-right: 20rpx;
	}

	.jxindustry {
		background-color: #EAEAEA;
		padding: 5rpx 18rpx 5rpx 18rpx;
		border-radius: 15rpx;
		color: #807E7E;
		margin-right: 20rpx;
	}


	.jxactive {
		color: #FFF;
		background-color: #51cdcb;
		transition: all .2s;
		padding: 5rpx 18rpx 5rpx 18rpx;
		border-radius: 15rpx;
		margin-right: 20rpx;
	}

	.rmdcontent {
		width: calc(100% -1rpx);
	}

	.yc {
		width: 80%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
    color: #9E9D9D;
    font-size: 24rpx;
	}

	.contentlist {
		/* margin-top: 10rpx; */
		padding: 30rpx 20rpx 20rpx 20rpx;
	}

	.contentTile {
		display: flex;
	}

	.contentTileleft {
		min-width: 100rpx;
		max-width: 100rpx;
		height: 100rpx;
	}

	.contentTileleft image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.contentTileright {
		margin-left: 30rpx;
		/* margin-top: 30rpx; */
	}

	.contentTileright text {
		padding-bottom: 20rpx;
		display: block;
	}

	.contentinfo {
		width: 100%;
		height: 100%;

	}

	.contentinfoTitle {
		margin-top: 20rpx;

	}

	.video {
		width: 100%;
		height: 352rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}

	.video {
		width: 100%;
		height: 352rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}

	.video video {
		width: 100%;
		height: 100%;
	}

	/* 一张图的样式 */
	.chart1 {
		width: 100%;
	}

	.chart .image {
		display: flex;
		flex-flow: wrap;
	}

	.chart1 image {
		width: 100%;
		margin: 6rpx auto;
		height: 576rpx;
	}

	/* 四张图的样式 */
	.chart {
		width: 100%;
	}

	.chart .image {
		display: flex;
		flex-flow: wrap;
	}

	.chart .image image {
		box-sizing: border-box;
		min-width: calc(50% - 12rpx);
		max-width: calc(50% - 12rpx);
		height: 288rpx;
		margin: 6rpx;
	}

	.chart4 {
		width: 100%;
	}

	.chart4 .image {
		display: flex;
		flex-flow: wrap;
	}

	.chart4 .image image {
		box-sizing: border-box;
		min-width: calc(33% - 12rpx);
		max-width: calc(33% - 12rpx);
		height: 188rpx;
		margin: 6rpx;
	}

	.operation {
		padding-bottom: 20rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.operation text {
		font-size: 48rpx;
		padding-bottom: 20rpx;
	}

	.textbg {
		position: absolute;
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		background-color: #C2F4F1;
		font-weight: bold;
		text-align: center;
		margin-left: 10rpx;
		line-height: 38rpx;
	}

	.release {
		margin-top: 20rpx;
		margin-right: 30rpx;
		width: 140rpx;
	}

	.activee {
		color: #FFF;
		background-color: #51cdcb;
		transition: all .2s;
		padding: 15rpx 0rpx 15rpx 0rpx;
		border-radius: 15rpx;
	}

	.fixedNavbar {
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		width: 100%;
	}

	.ccyc {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.gzbtn {
		min-width: 120rpx;
		text-align: center;
		height: 60rpx;
		position: absolute;
		right: 30rpx;
		top: 40rpx;
		border-radius: 18rpx;
		background-color: #C2F4F1;
	}

	.shugun {
		width: 6rpx;
		height: 30rpx;
		background-color: #F1F1F1;
		line-height: 110rpx;
		margin-top: 65rpx;
	}
</style>
