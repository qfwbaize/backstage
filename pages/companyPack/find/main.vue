<template>
	<div>
		<!-- <view class="borderbox fix_top bgblue" style="z-index: 9999;">
			<div :style="{height: statusBarHeight + 'rpx'}" ></div>
				<div class="disflex align-cen h100p pl20"  style="border: 1rpx red;" :style="CustomBar">
					<div class="fs15 c38  mr23" :class="tabType == 1 ? 'active' : 'title'" @click="tab_type_tap(1)">推荐</div>
					<div class="fs15 c38  mr23" :class="tabType == 2 ? 'active' : 'title'" @click="tab_type_tap(2)">人脉</div>
					<div class="fs15 c38  mr23" :class="tabType == 3 ? 'active' : 'title'" @click="tab_type_tap(3)">产品</div>
					<div class="fs16 c38 posre" :class="tabType == 4 ? 'active' : 'title'" @click="tab_type_tap(4)">供求
					</div>
				</div>
		</view>
	<view :style="{height: statusBarHeight + 'rpx'}" /> -->
		<!-- <view :style="CustomBar" /> -->
		<template v-if="tabType == 1">
			<recommend @zan="zan" @table_tap="table_tap" @addCommentA="addCommentA" @inputConfirm="inputConfirm"
				ref="tabType1"></recommend>
		</template>
		<template v-if="tabType == 2">
			<contacts :mptabType="mptabType" @doSearch="doSearch" :screen="screen" :popularity="popularity"
				@busCardlabelTitle="busCardlabelTitle" :busCardlabelList="busCardlabelList" @doThumbs="doThumbs">
			</contacts>
		</template>
		<template v-if="tabType == 3">
			<product @doSearch="doSearchcp" @ProdslabelTitle="getProdslabelTitle" :prod_lists="prod_lists"
				:prodslabelList="prodslabelList">
			</product>
		</template>
		<template v-if="tabType == 4">
			<demand ref="tabType4" @previewImage="previewImage" @doSearch="doSearchgq" @pageUserlabelTitle="pageUserlabelTitle"
				:xuqiulabelList="xuqiulabelList" :demand_lists="demand_lists"> </demand>
		</template>
	</div>
</template>

<script>
	import {
		authSubscribeMessage,
		authSubscribeOrder
	} from '@/utils/auth.js'
	import util from '@/utils/index'
	import recommend from "@/components/recommend"
	import demand from "@/components/demand"
	import contacts from "./components/Contacts.vue"
	import product from "@/components/product.vue"
	import WXAJAX from "@/utils/request";
	import {
		obj2style
	} from "./index";
	import {
		mapActions,
		mapGetters
	} from "vuex";
	import HandleLogin from "@/utils/handleLogin";
	export default {
		name: '',
		components: {
			recommend,
			contacts,
			demand,
			product
		},
		data() {
			return {
				statusBarHeight: "",
				pages: 1,
				navHeight: '',
				navBarUserHeight: '',
				navTop: '',
				tabType: 1,
				searchkey: '',
				isLoading: true, //防止用户短时间多次请求
				queryType: 1, //请求type
				popularity: '', //人脉列表
				tabType1: '',
				cardId: wx.getStorageSync("cardId"),
				smartMainId: WXAJAX.smartMainId, //主体小程序公司id
				settingId: '',
				queryType: 1,
				demand_lists: [], //需求
				isLogin: HandleLogin.returnIsLogin(),
				goosPages: 1, // 产品中心page
				prod_lists: '',
				busCardlabelList: '', //名片列表的标签
				busCardlabel: '', //选择的标签名
				prodslabelList: '', //产品列表的标签
				prodslabelname: '', //选择的产品标签名
				xuqiulabelList: '', //需求列表标签
				xuqiulabelname: '', //选择的需求标签名
				demand_total: '', //需求总条数
				screen: false,
				mptabType: -1, //名片当前下标
				labelContent0: '', //职位
				labelContent1: '', //行业
				demand_key: '',
				goodsName: '',
			}
		},
		onHide() {
			if (this.tabType == 2) {
				this.popularity = []
				this.getBusinessCard()
			}
		},
		/** tab点击 */
		onTabItemTap(item) {
			//订阅授权 信息相关
		},
		onLoad(option) {
			if (option.tabType) {
				this.tabType = option.tabType
			}
			if (option.tabType == 1) {
				wx.setNavigationBarTitle({
					title: "推荐"

				})
			}
			if (option.tabType == 2) {
				wx.setNavigationBarTitle({
					title: "人脉"

				})
			}
			if (option.tabType == 3) {
				wx.setNavigationBarTitle({
					title: "产品"

				})
			}
			if (option.tabType == 4) {
				wx.setNavigationBarTitle({
					title: "供求广场"

				})
			}
			this.calculateNavBarHeight()
			this.tabType1 = this.selectComponent("#tabType1")
		},
		onPullDownRefresh() {
			this.pages = 1;

			if (this.tabType == 1) {
				// allList
				console.log(this.tabType1)
				if (this.tabType1 == 1) { //全部
					this.$refs.tabType1.pages = this.pages
					this.$refs.tabType1.alllists = []
					this.$refs.tabType1.allList()
				}
				if (this.tabType1 == 2) { //文章
					this.$refs.tabType1.pages = this.pages
					this.$refs.tabType1.video_lists = []
					this.$refs.tabType1.videolist()
				}
				if (this.tabType1 == 3) { //文章
					this.$refs.tabType1.pages = this.pages
					this.$refs.tabType1.dynamic_lists = []
					this.$refs.tabType1.article()
				}
				if (this.tabType1 == 4) { //动态
					this.$refs.tabType1.pages = this.pages
					this.$refs.tabType1.dynamic_lists1 = []
					this.$refs.tabType1.dynamic()
				}
			}
			if (this.tabType == 2) {
				this.popularity = []
				this.getBusinessCard(this.pages)
			}
			if (this.tabType == 3) {
				this.prod_lists = []
				this.goosPages = 1
				this.getProds('', '', this.goosPages)
			}

			if (this.tabType == 4) {
				this.demand_lists = []
				this.getPageUser()
			}
			wx.stopPullDownRefresh()
		},
		onReachBottom() {
			if (this.tabType == 1) {
				if (this.tabType1 == 1) { //全部
					this.$refs.tabType1.pages += 1
					this.$refs.tabType1.allList()
				}
				if (this.tabType1 == 2) { //文章
					this.$refs.tabType1.pages += 1
					this.$refs.tabType1.videolist()
				}
				if (this.tabType1 == 3) { //文章
					this.$refs.tabType1.pages += 1
					this.$refs.tabType1.article()
				}
				if (this.tabType1 == 4) { //动态
					this.$refs.tabType1.pages += 1
					this.$refs.tabType1.dynamic()
				}
			}
			if (this.tabType == 2) {
				this.pages += 1
				this.getBusinessCard(this.pages)
			}
			if (this.tabType == 3) {
				this.goosPages += 1
				this.getProds('', '', this.goosPages)
			}
			if (this.tabType == 4) {
				if (this.demand_lists.length == this.demand_total) {
					wx.showToast({
						title: '已经没有数据了',
						icon: 'none'
					})
					return;
				}
				this.pages += 1
				this.getPageUser()
			}
		},
		onPageScroll() {
			if (this.tabType == 1) {
				if (this.tabType1 == 1) {
					this.$refs.tabType1.input_show = false
				}
				if (this.tabType1 == 2) {
					this.$refs.tabType1.input_show = false
				}
				if (this.tabType1 == 3) {
					this.$refs.tabType1.input_show = false
				}
				if (this.tabType1 == 4) {
					this.$refs.tabType1.input_show = false
				}
			}
		},
		onShow() {
			// this.getBusinessCardlabel() //名片标签
			this.getBusinessCardscreen()
			// this.getBusinessCard() //获取名片列表
			this.getPageUser() //需求列表
			this.PageUserlabel() //需求的标签
			this.getProds() //获取产品列表
			this.getProdslabel() //获取产品标签

			this.table_tap() //推荐的二级标签
		},
		computed: {
			...mapGetters(["currentCompany", "subscriptionNew"]),
			CustomBar() {
				let style = {};
				// #ifdef MP-WEIXIN
				const systemInfo = uni.getSystemInfoSync();
				console.log('胶囊', systemInfo)
				let CustomBar = ''
				if (systemInfo.platform != "devtools") {
					CustomBar =
						systemInfo.platform === "android" ?
						systemInfo.statusBarHeight + 30 :
						systemInfo.statusBarHeight + 20;
				}
				if (systemInfo.platform === "devtools") {
					CustomBar = systemInfo.statusBarHeight + 45;
				}
				style["height"] = CustomBar + "px";
				style["line-height"] = (CustomBar + 30) + "px";
				// #endif
				// #ifdef H5
				style["top"] = 0 + "px";
				// #endif
				console.log('style', style)
				return obj2style(style);
			},
		},
		methods: {
			previewImage(e, urls) { //点击图片全屏预览
			let url = JSON.parse(urls)
				var current = e.target.dataset.src
				wx.previewImage({
					// urls: [urls + '.primary.png'],
					current: current,
					urls: url
				})
			},
			calculateNavBarHeight() {
				let menuButtonBounding = wx.getMenuButtonBoundingClientRect();
				wx.getSystemInfo({
					success: res => {
						let statusBarHeight = res.statusBarHeight; //胶囊按钮与顶部的距离
						console.log('statusBarHeight', statusBarHeight)
						let navHeight =
							statusBarHeight +
							(menuButtonBounding.top - statusBarHeight) * 2 +
							menuButtonBounding.height; //导航高度

						getApp().globalData.navHeight = navHeight;
						this.statusBarHeight = statusBarHeight;
						this.navHeight = (navHeight - statusBarHeight) * 2;
						console.log(this.navHeight)
					},
					fail(err) {
						//console.log(err);
					}
				});
			},
			//子组件传的值
			table_tap(type) {
				this.tabType1 = type || 1
			},

			doSearch(searchkey) {
				this.searchkey = searchkey
				this.pages = 1
				this.popularity = []; // 先清空列表,显示加载进度
				this.getBusinessCard()
			},
			doSearchgq(searchkey) {
				console.log('今生已不再寻觅', searchkey)
				this.demand_key = searchkey
				this.pages = 1
				this.demand_lists = [] // 先清空列表
				this.getPageUser()
			},
			doSearchcp(searchkey) {
				this.goodsName = searchkey
				this.goosPages = 1
				this.getProds()
			},
			//名片列表
			getBusinessCard(type) {
				let v = this
				let b = ''
				let a = []
				if (this.busCardlabelList) {
					this.busCardlabelList.forEach(item => {
						if (item.flg == true) {
							a.push(item.labelContent)
							b = a.toString()
							if (a.length <= 1) {
								b = a
							} else {
								b = b.replace(/,/g, "|")
							}
						}
					})
				}
				// if (this.labelContent0 && this.labelContent1) {
				// 	let a = [this.labelContent0, this.labelContent1]
				// 	b = a.toString()
				// 	b = b.replace(",", "|")
				// } else {
				// 	b = this.labelContent0 || this.labelContent1
				// }
				wx.showLoading({
					title: '加载中...',
					mask: true
				})
				let data = {
					// companyId: uni.getStorageSync('SELFCOMPANYID') || ''market / queryMarketAdvancedForm
					companyId: 1,
					queryType: v.queryType,
					pageNum: v.pages,
					industryLabel: b.toString(),
					name: this.searchkey
					// position: this.labelContent0,
					// labelContent1,
				}
				WXAJAX.POST(data, '', '/market/searchBusinessCard', '', '', 2).then(data => {
						uni.hideLoading()
						if (data.pageInfo.list) {
							v.popularity = [...v.popularity, ...data.pageInfo.list]
							// v.pages++
						}
					})
					.catch(err => {

					});
			},
			// schedulingsApi/sys/label/queryList
			//获取名片标签
			getBusinessCardscreen() {
				let data = {
					useSite: '人脉列表',
				}
				WXAJAX.POST(data, '', '/screen/label/queryList', '', '', 1).then(res => {
					if (res) {
						this.screen = true
						this.busCardlabelList = res
						this.mptabType = -2
						this.busCardlabelList.forEach(item => {
							this.$set(item, 'flg', true)
							// this.labelContent0 = this.labelContent0.push(item.labelContent)
						})
						this.getBusinessCard()
					} else {
						this.getBusinessCard()
					}
				})
			},
			//标签查询名片
			busCardlabelTitle(type, item, labelTitle) {
				// busCardlabelList
				if (this.busCardlabelList) {
					if (type != -1) {
						this.$set(this.busCardlabelList[type], 'flg', !this.busCardlabelList[type].flg)
					} else {
						this.busCardlabelList.forEach(item => {
							this.$set(item, 'flg', false)
						})
					}
					for (let i = 0; i < this.busCardlabelList.length; i++) {
						this.mptabType = -1
						if (this.busCardlabelList[i].flg == true) {
							this.labelContent1 = this.busCardlabelList[i].labelContent
							this.mptabType = -2
							this.$set(this, 'mptabType', -2)
							break
						}
					}
				}
				this.popularity = []
				this.getBusinessCard()
			},
			//点赞
			zan(index, isThumbs, dynamicId, item) {
				console.log('点赞', index, isThumbs, dynamicId, item)
				let v = this;
				if (this.tabType == 1) {
					if (this.tabType1 == 1) {
						var dynamic_lists = v.$refs.tabType1.alllists[index]
					}
					if (this.tabType1 == 2) {
						var dynamic_lists = v.$refs.tabType1.video_lists[index]
					}
					if (this.tabType1 == 3) {
						var dynamic_lists = v.$refs.tabType1.dynamic_lists[index]
					}
					if (this.tabType1 == 4) {
						var dynamic_lists = v.$refs.tabType4.dynamic_lists1[index]
					}
				}
				if (this.tabType == 4) {
					var dynamic_lists = v.$refs.tabType.video_lists[index]
				}
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
			//评论
			addCommentA(index, replayComment) {
				let v = this;
				if (this.tabType1 == 1) {
					var dynamic_lists = v.$refs.tabType1.alllists[index]
				}
				if (this.tabType1 == 2) {
					var dynamic_lists = v.$refs.tabType1.video_lists[index]
				}
				if (this.tabType1 == 3) {
					var dynamic_lists = v.$refs.tabType1.dynamic_lists[index]
				}
				if (this.tabType1 == 4) {
					var dynamic_lists = v.$refs.tabType1.dynamic_lists1[index]
				}
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

				v.$refs.tabType1.input_show = true;
				v.$refs.tabType1.replayComment = replayComment;
				// this.comment_focus = true ;
				v.$refs.tabType1.add_comments_index = index;
				setTimeout(function() {
					v.$set(dynamic_lists, "operate_show", false);
					v.$refs.tabType1.comment_focus = true;
				}, 200);
			},
			inputConfirm(item) {
				let v = this;
				if (this.tabType1 == 1) {
					var dynamic_lists = v.$refs.tabType1.alllists[v.$refs.tabType1.add_comments_index]
				}
				if (this.tabType1 == 2) {
					var dynamic_lists = v.$refs.tabType1.video_lists[v.$refs.tabType1.add_comments_index]
				}
				if (this.tabType1 == 3) {
					var dynamic_lists = v.$refs.tabType1.dynamic_lists[v.$refs.tabType1.add_comments_index]
				}
				if (this.tabType1 == 4) {
					var dynamic_lists = v.$refs.tabType1.dynamic_lists1[v.$refs.tabType1.add_comments_index]
				}
				console.log('评论？', dynamic_lists)
				//输入完成
				v.$refs.tabType1.comment_focus = false;
				authSubscribeMessage(this.subscriptionNew);
				console.log('commentId', v.$refs.tabType1.replayComment)
				WXAJAX.POST({
						dynamicId: dynamic_lists.dynamicId,
						parentId: v.$refs.tabType1.replayComment.commentId || 0,
						cardId: this.cardId || this.CARDID || 0,
						text: v.$refs.tabType1.comments
					},
					"",
					"/personal/doComment", "", "", 2
				).then(res => {
					console.log('?????', res)
					let comments = dynamic_lists;
					comments.commentModelList = comments.commentModelList ?
						comments.commentModelList : [];
					if (
						comments.commentModelList.length < 10 ||
						comments.commentNum > comments.commentModelList.length
					) {
						dynamic_lists.commentModelList.push({
							text: v.$refs.tabType1.comments,
							replyName: v.$refs.tabType1.replayComment.userName || "",
							userName: wx.getStorageSync("USERNAME")
						});
						dynamic_lists.commentNum += 1
						// this.$set(
						// 	v.$refs.tabType1,
						// 	"dynami",
						// 	JSON.parse(JSON.stringify(dynamic_lists))
						// );
					}
					v.$refs.tabType1.input_show = false;
					v.$refs.tabType1.comments = "";
				});
			},
			getPageUser() {
				// demand_key 搜索value
				// wx.showLoading({
				// 	title: '加载中...',
				// 	mask: true
				// })
				let v = this
				let data = {
					// companyId: wx.getStorageSync('SELFCOMPANYID') || ''
					// companyId: this.smartMainId,
					settingId: v.settingId || '',
					pageNum: v.pages,
					queryType: this.queryType || '',
					labelContent: this.xuqiulabelname,

				}
				WXAJAX.POST(data, '', '/demandSquare/queryPageUserDemand', "", "", 2).then(data => {
						// uni.hideLoading()
						if (data.pageInfo.list) {
							v.demand_total = data.pageInfo.total
							v.demand_lists = [...v.demand_lists, ...data.pageInfo.list]

						} else {
							wx.hideLoading()
						}
					})
					.catch(err => {

						wx.hideLoading()
						wx.showToast({
							title: err,
							icon: 'none'
						})
					});
			},
			//获取需求标签
			PageUserlabel() {
				let data = {
					labelType: 7,
				}
				WXAJAX.POST(data, '', '/sys/label/queryList', '', '', 1).then(data => {
					console.log('需求标签列表', data)
					if (data) {
						this.xuqiulabelList = data
					}
				})
			},
			//标签查询产品
			pageUserlabelTitle(data) {
				this.xuqiulabelname = data
				console.log('标签查询需求', data)
				this.demand_lists = []
				this.getPageUser()
			},
			//名片点赞
			doThumbs(index) {
				console.log(index)
				authSubscribeMessage(this.subscriptionNew);
				util.isLogin({
					isLogin: this.isLogin,
					success: res => {
						wx.showLoading();
						WXAJAX.POST({
								cardId: this.popularity[index].cardId
							},
							"",
							"/businessCard/doThumbs", "", "", 2
						).then(data => {
							this.popularity[index].isThumbs = data;
							wx.hideLoading();
							//this.$set(this.card_msg, "thumbsNum", ++this.card_msg.thumbsNum);
							//出现负数 bug 因此只能增加点赞数量 不能取消
							// if (!this.popularity[index].isThumbs) {
							if (this.popularity[index].isThumbs == 0) {
								this.popularity[index].isThumbs = 0
								this.popularity[index].thumbsNum = --this.popularity[index].thumbsNum
							} else {
								this.popularity[index].isThumbs = 1
								this.popularity[index].thumbsNum = ++this.popularity[index].thumbsNum
							}
							// } else {
							// 	this.$set(this.popularity[index], "thumbsNum", this.popularity[index].thumbsNum +=1);
							// }
						});
					}
				});
			},
			//产品中心
			getProds(type, id, goosPages) {

				//获取产品中心产品
				//type  判断用户是否点击分类
				//id    分类id
				//goosPages  分页
				if (this.tabType == 1) {
					this.prod_lists = []
				}
				let v = this;
				if (!v.isLoading) {
					wx.hideLoading();
					return;
				}
				wx.showLoading({
					title: '加载中...',
					mask: true
				})
				v.isLoading = true;
				WXAJAX.POST({
							goodstypeId: id,
							pageNum: this.goosPages,
							labelContent: this.prodslabelname,
							goodsName: this.goodsName,

						},
						"",
						"/goods/getGoodsList/demand", "", "", 2
					)
					.then(data => {
						wx.hideLoading();
						if (data) {
							if (goosPages == 1) {
								v.prod_lists = []
							}
							data.forEach(function(i, k) {
								if (i.goodPhoto) {
									i.prodLogo = i.goodPhoto.split(",")[0];
								} else {
									i.prodLogo = "";
								}
								if (i.price) {
									i.price /= 100;
									i.price = i.price.toFixed(2);
								} else {
									i.price = "";
								}
								if (i.isKill) {
									i.killPrice = i.killPrice / 100;
									i.killPrice = i.killPrice.toFixed(2);
									i.originPrice = i.price;
								}
							});
							if (this.goosPages == 1) {
								v.prod_lists = data
							} else {
								v.prod_lists = [...v.prod_lists, ...data];
							}
						}
					})
					.catch(err => {
						console.log(err);
						v.prod_lists = [];
						wx.hideLoading();
						if (err.code == 204) {
							v.nodata = true;
						}
						setTimeout(function() {
							v.isLoading = false;
						}, 500);
					});
			},
			//获取产品标签
			getProdslabel() {
				let data = {
					labelType: 6,
				}
				WXAJAX.POST(data, '', '/sys/label/queryList', '', '', 1).then(data => {
					if (data) {
						this.prodslabelList = data
					}
				})
			},
			//标签查询产品
			getProdslabelTitle(data) {
				this.prodslabelname = data
				this.prod_lists = []
				this.goosPages = 1
				this.getProds()
			},

		}
	}
</script>
<style>
	.app {
		background-color: #F8F8F8;
	}

	.bgcolor {
		background-color: #FFFFFF;
	}
</style>
<style scoped>
	.title {
		font-size: 36upx;
		color: #ffffff;
		opacity: 0.4;
		transition: all .2s;
	}

	.active {
		font-size: 40upx;
		color: #ffffff;
		transition: all .2s;
		font-weight: bold;
		border-bottom: #fff 6rpx solid;
		line-height: 50rpx;
	}

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
</style>
