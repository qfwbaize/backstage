<template>
	<div class="overhidden borderbox posab w100p ">
		<!-- 搜索 -->
		<view class="fix_topp">
			<view class="navsearch borderbox">
				<div class="bgfff pl15 pb10 pr15 disflex ">
					<div class="bgF4Ff bradius15 flex1 textc lh34 disflex align-cen pl25 search trans2 pr25 mt10">
						<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/search.png"
							style="flex: 0 0 32upx" alt="" class="w16 h16" />
						<input type="text" v-model="searchkey" placeholder="搜索姓名" placeholder-style="color:#1EC4B9"
							class="ca4 fs14 lh42 h42 textl pl10 trans2 w100p" :focus="isfocus" @input="inputWord"
							@blur="isfocus=false">
					</div>
				</div>
				<view class="navright" @click="toRelease">
					<view class="add"><image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/renmaifabu.png" mode=""></image></view>
					<view class="text">发布</view>
				</view>
			</view>

			<view class="screen">
				<view class="screenList">
					<view :class="tabType == 1 ? 'active' : 'industry'" @click="tab_type_tap(1)">
						全部
					</view>
					<view :class="tabType == 2 ? 'active' : 'industry'" @click="tab_type_tap(2)">
						视频
					</view>
					<view :class="tabType == 3 ? 'active' : 'industry'" @click="tab_type_tap(3)">
						文章
					</view>
					<view :class="tabType == 4 ? 'active' : 'industry'" @click="tab_type_tap(4)">
						动态
					</view>
				</view>
			</view>
		</view>
		<view class="" style="height: 230rpx;" />
		<view v-if="tabType == 1" class="rmdcontent  bgcolor">
			<view class="contentlist" v-for="(item,index) in alllists" :key="index">
				<view class="contentTile">
					<view class="contentTileleft">
						<image :src="item.logo" mode="">
						</image>
					</view>
					<view class="contentTileright">
						<text>{{item.name}}<text class="fs12 ca8"
								style="display: inline;margin-left: 10rpx;">{{item.createTimeStr}}</text></text>
						<text class="yc" style="width: 510rpx;">{{item.companyName}}</text>
					</view>
				</view>
				<view v-if="item.type == 0">
					<view class="pt10 pb10 pl10 pr15 disflex jsbet align-cen wenzhang" @click="toDetail(item)"
						style="margin-top: 20rpx;margin-bottom: 20rpx;background-color: #fff;">
						<view class="w250">
							<view class="disflex">
								<text class="fs14 c38 over_2">{{item.type==3?'(转载) ':''}}{{item.title||'标题'}}</text>
								<!-- <view class="w22">
									<image class="w20 h20" :src="pay_selectIcon"></image>
								</view> -->
							</view>
							<p class="fs12 ca7 mt15">本文为普通转发文章</p>
						</view>
						<img :lazy-load="true" mode="aspectFill" :src="item.photos[0]" alt=""
							class="w65 h65 bradius4 mr8">
					</view>
				</view>
				<view v-if="item.type == 1 || item.type == 3">
					<view class="pt10 pb10 pl10 pr15 disflex jsbet align-cen wenzhang" @click="toDetail(item)"
						style="margin-top: 20rpx;margin-bottom: 20rpx;background-color: #fff;">
						<view class="w250">
							<view class="disflex">
								<text class="fs14 c38 over_2">{{item.type==3?'(转载) ':''}}{{item.title||'标题'}}</text>
								<!-- <view class="w22">
									<image class="w20 h20" :src="pay_selectIcon"></image>
								</view> -->
							</view>
							<p class="fs12 ca7 mt15">本文为普通转发文章</p>
						</view>
						<img :lazy-load="true" mode="aspectFill" :src="item.photos[0]" alt=""
							class="w65 h65 bradius4 mr8">
					</view>
				</view>
				<view v-if="item.type == 2">
					<view class="contentinfo" @click.stop="addComment(item)">

						<!-- 四张图的 -->
						<view class="chart1" style="margin-top: 20rpx;margin-bottom: 20rpx;"
							v-if="item.photos && item.photos.length <=1">
							<image :src="v" v-for="(v,b) in item.photos" :key="b" @click.stop="previewImage(v)"></image>
						</view>
						<view class="chart" style="margin-top: 20rpx;margin-bottom: 20rpx;"
							v-if="item.photos && item.photos.length >= 2">
							<!-- <view class="chart"> -->
							<view class="image">
								<image :src="v" v-for="(v,b) in item.photos" :key="b" mode=""
									@click.stop="previewImage(v)">
								</image>

							</view>
						</view>
					</view>
				</view>
				<view v-if="item.type == 6">
					<view class="contentinfoTitle">
						{{item.title}}
					</view>
					<view class="video">
						<video :src="item.url" :controls="true" :autoplay="false"></video>
					</view>
				</view>
				<view class="contentinfo">
					<view class="operation">
						<div class="disflex jscen align-cen" @click.stop="zan1(index,item)"
							:class="item.type != 2 ? 'w33p': 'w50p'">
							<img class="w20 h20 mr8" :src="item.isThumbs == 1 ?  like_selectIcon :  likeIcon">
							<p :class="item.isThumbs == 1 ?  'cblue' :  'c78'" class="fs12">{{item.likeNum}}</p>
						</div>
						<div class="disflex jscen align-cen" @click.stop="addCommentA(index, comment_item)"
							:class="item.type != 2 ? 'w33p': 'w50p'">
							<img class="w20 h20 mr8" :src="commentIcon">
							<p class="fs12 c78">{{item.commentNum}}</p>
						</div>
						<button v-if="item.type != 2" class='bgfff fs12 cdeepblue p0 w33p disflex jscen align-cen'
							:data-dynamicId="item.dynamicId" open-type="share" hover-class="other-button-hover">
							<img class="w20 h20 mr8" :src="shareIcon">
							<span>{{item.shareNum}}</span>
						</button>
					</view>
				</view>
			</view>

		</view>
		<view v-if="tabType == 2" class="rmdcontent  bgcolor">
			<view class="contentlist" v-for="(item,index) in video_lists" :key="index">
				<view class="contentTile">
					<view class="contentTileleft">
						<image :src="item.logo" mode="">
						</image>
					</view>
					<view class="contentTileright">
						<text>{{item.name}}<text class="fs12 ca8"
								style="display: inline;margin-left: 10rpx;">{{item.createTimeStr}}</text></text>
						<text class="yc" style="width: 510rpx;">{{item.companyName}}</text>
					</view>
				</view>
				<view class="contentinfo">
					<view class="contentinfoTitle">
						{{item.title}}
					</view>
					<view class="video">
						<video :src="item.url" :id="'myVideo' + index" :data-index="index" :controls="true"
							:bindtap="videoPlay" :autoplay="false" @play="playVideo"></video>
					</view>
					<!-- 四张图的 -->
					<!-- 	<view class="chart1">
						<image src="https://img1.baidu.com/it/u=2496571732,442429806&fm=26&fmt=auto&gp=0.jpg"
							mode=""></image>
					</view> -->
					<!-- <view class="chart">
						<view class="image">
							<image src="https://img1.baidu.com/it/u=2496571732,442429806&fm=26&fmt=auto&gp=0.jpg"
								mode=""></image>
							<image src="https://img1.baidu.com/it/u=2496571732,442429806&fm=26&fmt=auto&gp=0.jpg"
								mode=""></image>
							<image src="https://img1.baidu.com/it/u=2496571732,442429806&fm=26&fmt=auto&gp=0.jpg"
								mode=""></image>
							<image src="https://img1.baidu.com/it/u=2496571732,442429806&fm=26&fmt=auto&gp=0.jpg"
								mode=""></image>
						</view>
					</view> -->
					<view class="operation">
						<div class="disflex jscen align-cen" @click.stop="zan1(index,item)"
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
							:data-dynamicId="item.dynamicId" open-type="share" hover-class="other-button-hover">
							<img class="w20 h20 mr8" :src="shareIcon">
							<span>{{item.shareNum}}</span>
						</button>
						<!-- <text class="iconfont icon-dianzan" @click.stop="zan1(index,item)"><text style="font-size: 28rpx;">{{item.likeNum}}</text></text>
						<text class="iconfont icon-dianzan" @click.stop="addComment('','','add')"><text style="font-size: 28rpx;">{{item.commentNum}}</text></text>
						<text class="iconfont icon-dianzan"><text style="font-size: 28rpx;">{{item.shareNum}}</text></text> -->
					</view>
				</view>
			</view>
				<div v-if="videoflg" class="textc lh42 fs12 ca8 bgf5f6">- 到底了，看看其他的吧 -</div>
		</view>
		<!-- 文章 -->
		<view v-if="tabType == 3">
			<view class="rmdcontent  bgcolor" v-for="(item,index) in dynamic_lists" :key="index">
				<view class="contentlist">
					<view class="contentTile">
						<view class="contentTileleft">
							<image :src="item.logo" mode="">
							</image>
						</view>
						<view class="contentTileright">
							<text>{{item.name}}<text class="fs12 ca8"
									style="display: inline;margin-left: 10rpx;">{{item.createTimeStr}}</text></text>
							<text class="yc" style="width: 510rpx;">{{item.companyName}}</text>
						</view>
					</view>
					<view class="contentinfo">
						<!-- <view class="contentinfoTitle">
						成都分公司成立啦
					</view> -->
						<!-- 	<view class="video">
						<video :src="videourl" :controls="true" :autoplay="false"></video>
					</view> -->
						<!-- 四张图的 -->
						<!-- 	<view class="chart1">
						<image src="https://img1.baidu.com/it/u=2496571732,442429806&fm=26&fmt=auto&gp=0.jpg"
							mode=""></image>
					</view> -->
						<!-- <div class="bgf5f6 pt10 pb10 pl10 pr15 disflex jsbet align-cen"
							style="margin-top: 20rpx;margin-bottom: 20rpx;" @click="toDetail(item)">
							<img :lazy-load="true" mode="aspectFill" :src="item.photos[0]" alt="" class="w50 h50 mr8">
							<p class="fs14 c38 w290 over_1">{{item.type==3?'(转载) ':''}}{{item.title||'标题'}}</p>
						</div> -->
						<view class="pt10 pb10 pl10 pr15 disflex jsbet align-cen wenzhang" @click="toDetail(item)"
							style="margin-top: 20rpx;margin-bottom: 20rpx;background-color: #fff;">
							<view class="w250">
								<view class="disflex">
									<text class="fs14 c38 over_2">{{item.type==3?'(转载) ':''}}{{item.title||'标题'}}</text>
									<!-- <view class="w22">
										<image class="w20 h20" :src="pay_selectIcon"></image>
									</view> -->
								</view>
								<p class="fs12 ca7 mt15">本文为普通转发文章</p>
							</view>
							<img :lazy-load="true" mode="aspectFill" :src="item.photos[0]" alt=""
								class="w65 h65 bradius4 mr8">
						</view>
						<view class="operation">
							<div class="disflex jscen align-cen" @click.stop="zan1(index,item)"
								:class="item.type != 2 ? 'w33p': 'w50p'">
								<img class="w20 h20 mr8" :src="item.isThumbs == 1 ?  like_selectIcon :  likeIcon">
								<p :class="item.isThumbs == 1 ?  'cblue' :  'c78'" class="fs12">{{item.likeNum}}</p>
							</div>
							<div class="disflex jscen align-cen" @click.stop="addCommentA(index, comment_item)"
								:class="item.type != 2 ? 'w33p': 'w50p'">
								<img class="w20 h20 mr8" :src="commentIcon">
								<p class="fs12 c78">{{item.commentNum}}</p>
							</div>
							<button v-if="item.type != 2" class='bgfff fs12 cdeepblue p0 w33p disflex jscen align-cen'
								:data-dynamicId="item.dynamicId" open-type="share" hover-class="other-button-hover">
								<img class="w20 h20 mr8" :src="shareIcon">
								<span>{{item.shareNum}}</span>
							</button>
							<!-- <text class="iconfont icon-dianzan" @click.stop="zan1(index,item)"><text style="font-size: 28rpx;">{{item.likeNum}}</text></text>
							<text class="iconfont icon-dianzan" @click.stop="addComment('','','add')"><text style="font-size: 28rpx;">{{item.commentNum}}</text></text>
							<text class="iconfont icon-dianzan"><text style="font-size: 28rpx;">{{item.shareNum}}</text></text> -->
						</view>
					</view>
				</view>
			</view>
			<div v-if="articleflag" class="textc lh42 fs12 ca8 bgf5f6">- 到底了，看看其他的吧 -</div>
		</view>

		<!-- 动态 -->
		<view v-if="tabType == 4">
			<view class="rmdcontent  bgcolor" v-for="(item,index) in dynamic_lists1" :key="index">
				<view class="contentlist">
					<view class="contentTile">
						<view class="contentTileleft">
							<image :src="item.logo">
							</image>
						</view>
						<view class="contentTileright">
							<text>{{item.name}}<text class="fs12 ca8"
									style="display: inline;margin-left: 10rpx;">{{item.createTimeStr}}</text></text>
							<text class="yc" style="width: 510rpx;">{{item.companyName}}</text>
						</view>
					</view>
					<view class="contentinfo" @click.stop="addComment(item)">
						<view class="contentinfoTitle">
							{{item.title}}
						</view>
						<!-- 	<view class="video">
						<video :src="videourl" :controls="true" :autoplay="false"></video>
					</view> -->
						<!-- 四张图的 -->
						<view class="chart1" style="margin-top: 20rpx;margin-bottom: 20rpx;"
							v-if="item.photos && item.photos.length <=1">
							<image :src="v" v-for="(v,b) in item.photos" :key="b" @click.stop="previewImage(v)"></image>
						</view>
						<view class="chart" style="margin-top: 20rpx;margin-bottom: 20rpx;"
							v-if="item.photos && item.photos.length >= 2">
							<!-- <view class="chart"> -->
							<view class="image">
								<image :src="v" v-for="(v,b) in item.photos" :key="b" mode=""
									@click.stop="previewImage(v)">
								</image>

							</view>
						</view>


						<view class="operation">
							<div class="disflex jscen align-cen" @click.stop="zan1(index,item)"
								:class="item.type != 2 ? 'w33p': 'w50p'">
								<img class="w20 h20 mr8" :src="item.isThumbs == 1 ?  like_selectIcon :  likeIcon">
								<p :class="item.isThumbs == 1 ?  'cblue' :  'c78'" class="fs12">{{item.likeNum}}</p>
							</div>
							<div class="disflex jscen align-cen" @click.stop="addCommentA(index, comment_item)"
								:class="item.type != 2 ? 'w33p': 'w50p'">
								<img class="w20 h20 mr8" :src="commentIcon">
								<p class="fs12 c78">{{item.commentNum}}</p>
							</div>
							<!-- v-if="item.type != 2" -->
							<button class='bgfff fs12 cdeepblue p0 w33p disflex jscen align-cen'
								:data-dynamicId="item.dynamicId" open-type="share" hover-class="other-button-hover">
								<img class="w20 h20 mr8" :src="shareIcon">
								<span>{{item.shareNum}}</span>
							</button>
							<!-- <text class="iconfont icon-dianzan" @click.stop="zan1(index,item)"><text style="font-size: 28rpx;">{{item.likeNum}}</text></text>
							<text class="iconfont icon-dianzan" @click.stop="addComment('','','add')"><text style="font-size: 28rpx;">{{item.commentNum}}</text></text>
							<text class="iconfont icon-dianzan"><text style="font-size: 28rpx;">{{item.shareNum}}</text></text> -->
						</view>
					</view>
				</view>
				<!-- <div class="flex1 bgfff" v-if="!dynamic_item">
			<nodata :title="'暂无需求信息，快去发布你的需求吧'"></nodata>
		</div> -->
				<!-- <div  class="textc lh42 fs12 ca8 bgf5f6">- 到底了，看看其他的吧 -</div> -->
			</view>
		</view>
		<div class="fix_bottomCD disflex borderbox align-cen pl15 h49 bgfff edit_input trans2" v-if="input_show==true">
			<!--:class="input_show ? '' : 'hide' "-->
			<div class="bgfff  disflex w100p jsbet pr11 borderbox align-cen">
				<input fixed="true"
					class=" borderbox h40 lh40 pr11 bgf5f6 bradius5 flex1 mr11 comment_input c38 fs18 pl15"
					:focus="comment_focus" :placeholder="
		        replayComment.commentId
		          ? '回复 ' + replayComment.userName + '：'
		          : '评论'
		      " cursor-spacing="4" @confirm="inputConfirm()" :style="{ height: text_height + 'px' }" v-model="comments" />
				<!--        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/smile.png" alt="" class="w25 h25" @click="smile_tap">-->
				<span class="bgblue cfff w50 textc lh30 fs16 bradius5 disblock ml10"
					@click.stop="inputConfirm">发送</span>
			</div>
		</div>
		<div v-if="chooseTypeShow">
			<SelectorOne :title="'选择发布内容'" :status="chooseTypeShow" :allClass="uploadVideoTypes"
				:choose_id="uploadVideoType" @closeModal="chooseTypeShow=false" @choose_tap="choose">
			</SelectorOne>
		</div>
	</div>
</template>

<script>
	import WXAJAX from '@/utils/request'
	import util from '@/utils'
	import HandleLogin from "@/utils/handleLogin";
	import {
		authSubscribeComment,
		authSubscribeMessage
	} from '@/utils/auth.js';
	import {
		mapGetters,
		mapState
	} from 'vuex';
	import SelectorOne from '@/components/selectorOne'
	export default {
		components: {
			SelectorOne
		},
		...mapGetters(["currentCompany"]),
		name: "RichEditor",
		props: {
			// 显示的toolbar按钮
			toolbars: {
				type: Array,
				default () {
					return []
				},
			},

		},
		data() {
			return {
				tabType: 1,
				searchkey: '',
				commentIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_comment.png',
				videourl: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/video/20210319/32396be6e523cfee76e0684389072055.mp4',
				likeIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_like.png',
				like_selectIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_like_select.png',
				shareIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_share.png',
				pay_selectIcon: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/icon/pay.png',
				dynamic_lists1: '', //动态
				dynamic_lists: '', //文章
				pages: 1,
				articleflag: false,
				videoflg: false,
				isLogin: HandleLogin.returnIsLogin() || false, //是否已经登录
				input_show: false,
				replayComment: {}, // 回复信息对象
				add_comments_index: 0,
				comment_focus: false,
				dynamic_lists: [],
				comments: '',
				video_lists: '',
				videoInde: '', //当前视频
				videoContextList: [],
				alllists: '',
				chooseTypeShow: false,
				uploadVideoType: 0,
				uploadVideoTypes: [{
						name: '发布视频',
						id: 1
					},
					{
						name: '发布文章',
						id: 2
					},
					{
						name: '发布动态',
						id: 3
					},
				],
			}
		},

		mounted() {
			this.videolist()
			this.dynamic()
			this.article()
			this.allList()

		},

		methods: {
			showChooseType() {
				this.chooseTypeShow = true;
			},
			//跳转到发布页面
			toRelease() {
				if (this.tabType == 1) {
					this.chooseTypeShow = true;
				}
				if (this.tabType == 2) {
					let type = 'add'
					wx.navigateTo({
						url: '/pages/buyVideo/editVideo/main?type=' + type
					});
				}

				if (this.tabType == 3) {
					uni.navigateTo({
						url: '/pages/article/editArticle/main'
					})
				}
				if (this.tabType == 4) {
					uni.navigateTo({
						url: '/pages/companyPack/dynamicIssue/main?type=dynamic'
					})
				}
			},
			choose(id, name) {
				this.chooseTypeShow = false;
				if (id == 1) {
					let type = 'add'
					wx.navigateTo({
						url: '/pages/buyVideo/editVideo/main?type=' + type
					});
				}
				if (id == 2) {
					uni.navigateTo({
						url: '/pages/article/editArticle/main'
					})
				}
				if (id == 3) {
					uni.navigateTo({
						url: '/pages/companyPack/dynamicIssue/main?type=dynamic'
					})
				}

			},
			init() {
				for (var i = 0; i < this.video_lists.length; i++) {
					const video = uni.createVideoContext("myVideo" + i, this);
					this.videoContextList.push(video);
				}
			},
			pauseCallback(res) {},
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
			previewImage(urls) { //点击图片全屏预览
				wx.previewImage({
					urls: [urls + '.primary.png']
				})
			},
			//点赞
			zan1(index, item, dynamic_lists) {
				this.$emit('zan', index, item.isThumbs, item.dynamicId, item);
			},
			tab_type_tap(type) {
				this.input_show = false
				this.tabType = type
				this.$emit('table_tap', type)
			},
			toDetail(item) { //查看文章详情
				const companyId = item.companyId;
				const cardId = item.cardId
				const dynamicId = item.dynamicId
				let url = '/pages/companyPack/find/dynamicDetail/main?dynamicId=' + dynamicId + '&companyId=' + companyId +
					'&cardId=' + cardId;
				wx.navigateTo({
					url: url
				})
			},
			videoindex(index) {
				this.videoInde = index
				if (this.videoInde != index) {
					this.videoContextList[index].pause();
				}

			},
			inputWord() {
				this.searchTimer && clearTimeout(this.searchTimer);
				this.searchTimer = setTimeout(() => {
					this.alllists = []
					this.allList();
				}, 300);
			},
			//全部
			allList() {
				let v = this
				//全部
				WXAJAX.POST({
						pageNum: v.pages,
						pageSize: 5,
						// isPublic:1,
						isShow: 1,
						isDrafts: 0,
						// verify: 1,
						type: -1,
						searchKey: this.searchkey,
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
						v.alllists = [...v.alllists, ...data.list];
						console.log('alllists', v.alllists)
					} else {}
				}).catch(err => {
					this.videoflg = true
				});
			},
			//视频
			videolist() {
				let v = this
				//视频
				WXAJAX.POST({
						pageNum: v.pages,
						pageSize: 8,
						// isPublic:1,
						isShow: 1,
						isDrafts: 0,
						// verify: 1,
						type: 6,
						searchKey: this.searchkey,
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
						console.log('视频数据列表', data)
						v.video_lists = [...v.dynamic_lists, ...data.list];
						console.log('video_lists', v.video_lists)
						this.init()
					} else {}
				}).catch(err => {
					this.videoflg = true
				});
			},
			//文章
			article() {
				let v = this
				//文章
				WXAJAX.POST({
						pageNum: v.pages,
						pageSize: 8,
						// isPublic:1,
						isShow: 1,
						isDrafts: 0,
						// verify: 1,
						type: 1, //-1全部
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
						console.log('文章动态数据', data)
						v.dynamic_lists = [...v.dynamic_lists, ...data.list];
						console.log('dynamic_lists', v.dynamic_lists)
					} else {}
				}).catch(err => {
					this.articleflag = true
				});
			},
			//动态
			dynamic() {
				let v = this
				//动态
				WXAJAX.POST({
						pageNum: v.pages,
						pageSize: 5,
						// isPublic:1,
						isShow: 1,
						isDrafts: 0,
						// verify: 1,
						type: 2,
						searchKey: this.searchkey,
						labelContent: '',
						// cardId: this.currentCompany.cardId || v.CARDID || 0
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
							// i.doThumbsName = i.doThumbsName ? i.doThumbsName.split(",") : [];
						});

						console.log('动态数据', data)
						v.dynamic_lists1 = [...v.dynamic_lists1, ...data.list];
						console.log('dynamic_lists1', v.dynamic_lists1)
					}
				})
			},
			//评论
			addCommentA(index, replayComment = {}) {
				this.$emit('addCommentA', index, replayComment);

			},
			inputConfirm() {
				this.$emit('inputConfirm');
				//输入完成
				// this.comment_focus = false;
				// authSubscribeMessage(this.subscriptionNew);

				// WXAJAX.POST({
				// 		dynamicId: this.dynamic_lists[this.add_comments_index].dynamicId,
				// 		parentId: this.replayComment.commentId || 0,
				// 		cardId: this.currentCompany.cardId || this.CARDID || 0,
				// 		text: this.comments
				// 	},
				// 	"",
				// 	"/personal/doComment"
				// ).then(res => {
				// 	let comments = this.dynamic_lists[this.add_comments_index];
				// 	comments.commentModelList = comments.commentModelList ?
				// 		comments.commentModelList : [];
				// 	if (
				// 		comments.commentModelList.length < 10 ||
				// 		comments.commentNum > comments.commentModelList.length
				// 	) {
				// 		this.dynamic_lists[this.add_comments_index].commentModelList.push({
				// 			text: this.comments,
				// 			replyName: this.replayComment.userName || "",
				// 			userName: wx.getStorageSync("USERNAME")
				// 		});
				// 		this.dynamic_lists[this.add_comments_index].commentNum = this.dynamic_lists[this
				// 			.add_comments_index].commentModelList.length
				// 		this.$set(
				// 			this,
				// 			"dynamic_lists",
				// 			JSON.parse(JSON.stringify(this.dynamic_lists))
				// 		);
				// 	}
				// 	this.input_show = false;
				// 	this.comments = "";
				// });

			},
			addComment(item) {
				let url = '/pages/companyPack/commentDetail/main?dynamicId=' + item.dynamicId + '&companyId=' + item
					.companyId +
					'&cardId=' + item.userId;
				wx.navigateTo({
					url: url
				})
			},
		}
	}
</script>
<style scoped>
	.searchText {
		cursor: auto;
		display: inline-block;
		height: 68upx;
		max-width: 100%;
		padding-left: 20upx;
		text-align: left;
		line-height: 68upx;
		font-size: 28upx;
		color: #A8A8A8;

	}

	.rmdcontent {
		width: 100%;
		margin-top: 30rpx;
		margin-bottom: 30rpx;
	}

	.yc {
		width: 80%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.contentlist {
		padding: 20rpx;
		height: 100%;
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
		margin: 6rpx auto;
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

	.screen {
		width: 100%;
		border: 1px transparent solid;
		background-color: #fff;
	}

	.screenList {
		width: 70%;
		margin: 20rpx;
		justify-content: space-between;
		display: flex;
	}

	.industry {
		background-color: #EAEAEA;
		padding: 15rpx 28rpx 15rpx 28rpx;
		border-radius: 15rpx;
		color: #807E7E;
	}


	.active {
		color: #FFF;
		background-color: #51cdcb;
		transition: all .2s;
		padding: 15rpx 28rpx 15rpx 28rpx;
		border-radius: 15rpx;
	}

	.screenbtn {
		padding: 15rpx 24rpx 15rpx 24rpx;
		box-shadow: rgb(254, 216, 186) 0rpx 4rpx;
		color: rgb(255, 172, 105);
		background-color: rgb(255, 250, 244);
		border-radius: 22rpx;
		font-weight: normal;
		font-style: normal;
	}

	.edit_input.hide {
		opacity: 0;
	}

	.navsearch {
		display: flex;
		justify-content: space-between;
		width: 100%;
		background-color: #FFFFFF;
	}

	.navsearch .navright {
		display: flex;
		width: 166rpx;
		height: 72rpx;
		border-radius: 26rpx;
		background-color: #03D3C5;
		text-align: center;
		box-shadow: 0px 2rpx 6rpx 0rpx #03D3C5;
		border: 2rpx solid #03D3C5;
		margin-right: 42rpx;
		margin-top: 22rpx;
		text-align: center;
		line-height: 72rpx;
	}

	.navsearch .navright .add {
		width: 32rpx;
		height: 32rpx;
		overflow: hidden;
		margin-top: 20rpx;
		margin-left: 14rpx;
	}
  .navsearch .navright .add image{
    width: 100%;
    height: 100%;
    display: block;
  }

	.navsearch .navright .text {
		color: #fff;
		font-size: 28rpx;
		text-align: left;
		margin-left: 20rpx;
		font-family: PingFangSC-regular;
	}

	.wenzhang {
		box-shadow: rgb(167, 225, 221) 0px 2px 6px 0px;
		border-radius: 6px;
	}
</style>
