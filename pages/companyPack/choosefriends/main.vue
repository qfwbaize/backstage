<template>
	<div class="card-main w100p bgf5f6 bgfff" :style="{height: mainHeight+'px'}">

		<scroll-view :style="{height: scrollContentHeight+'px'}" class="dynamic-content" :scroll-y="true"
			:enable-back-to-top="true" :scroll-anchoring="true" @scrolltoupper='scrolltoupper'
			@scrolltolower="scrolltolower">
			<!--搜索-->
			<div class="bgfff pl15 pb10 pr15" v-if="isLogin">
				<div class="bgf5f6 bradius17 textc lh34 disflex align-cen pl25 search trans2 pr25"
					@click="search_focus">
					<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/search.png"
						style="flex: 0 0 16px" alt="" class="w16 h16">
					<span class="searchText over_1" v-if="!isfocus">{{searchkey || '搜索姓名/电话号码'}}</span>
					<input type="text" v-model="searchkey" placeholder="搜索姓名/电话号码"
						class="ca8 fs14 lh34 h34 textl pl10 w100p trans2" v-else :focus="isfocus" @blur="isfocus=false"
						@confirm="search_confirm">
				</div>
			</div>

			<div class="bgfff pt15 pl16 pr15">
				<div class="disflex jsbet pr16" v-if="saveType!=2">
					<span class="ca8" v-if="shareStatus" @click="updateShareStatus">批量选择</span>
					<span class="ca8" v-if="!shareStatus" @click="updateShareStatus">取消</span>
					<span class="c38" v-if="!shareStatus" @click="nowShare">立即分享</span>
				</div>
				<div v-if="lists.length>0">
					<div class="bradius10" v-for="(v,k) in lists" :key="k">
						<div class="bgfff bradius10">
							<BusinessCard :card_msg="v" :type="'plus'" :hasCard="false" :isdel="true"
								:shareStatus="shareStatus" :dynamicId="dynamicId" :index="k+1" :isLogin="isLogin"
								@needLogin="needLogin" @changeUrl="changeUrl" @moreTap="moreTap" @shareApp="shareApp">
							</BusinessCard>
						</div>
					</div>

				</div>

			</div>


		</scroll-view>

	</div>

</template>

<script>
	import BusinessCard from '@/components/BusinessCard'
	import WXAJAX from '../../../utils/request'
	import util from '../../../utils/index'
	import {
		mapGetters,
		mapActions
	} from "vuex";
	export default {
		name: '',
		components: {
			BusinessCard
		},
		computed: {
			...mapGetters(["article"])
		},
		data() {
			return {
				searchkey: '',
				last_searchkey: '',
				saveType: 2,
				isfocus: false,
				mine_card: {},
				lists: [],
				dynamicId: 0,
				shareStatus: true,
				hasCard: wx.getStorageSync('hasCard') || false, //是否已经有名片
				addInfo: false, //显示添加的按钮
				card_msg: {
					picchecked: '',
					username: '',
					tel: '',
					wx: '',
					company_wx: '',
					email: '',
					post: '',
					company: '',
					company_logo: ''
				},
				phoneMsg: {
					phoneData: '',
					iv: '',
				},

				cardId: 0, //删除时使用
				isfresh: false,
				page: 1,
				isLoading: false, //是否在加载
				nodata: false, //是否已经没有数据
				isShowLogin: false,
				listToUserIds: [],
				isShowNotice: true, // 是否显示公告
				noticeList: [], // 公告列表
				avatarUrl: '', //用户的头像地址,
				isShowLoginGuide: false, //是否显示登录引导页,
				scrollContentHeight: 0, //中间滚动区域的高度
				mainHeight: 0, //整体高度
				total: 0, //总页数
				type: 0,
				// article:[],
			}
		},
		onReachBottom() {
			// let v = this ;
			// v.getAllCard();

		},
		onUnload() {
			this.isShowLogin = false;
			this.isShowNotice = true;
			this.noticeList = [];
		},
		async onPullDownRefresh() {
			console.log("下拉刷新onPullDownRefresh")
			// to doing..
			// 停止下拉刷新
			wx.showNavigationBarLoading();
			this.page = 1;
			this.card_msg = {};
			this.searchkey = '';
			this.lists = [];
			this.nodata = false;
			this.isLoading = false;
			this.getAllCard();
			wx.stopPullDownRefresh();
			setTimeout(function() {
				wx.hideNavigationBarLoading();
			}, 300)
		},
		onLoad(option) {
			console.log("option", option);

			console.log("article", this.article);
			this.dynamicId = option.id;
			// this.dynamicId=this.article.id;
			// this.cid==this.article.cid;
			this.cid == option.cid;
			this.saveType = option.saveType;
			// console.log("数据",this.article);

			if (option.type) this.type = option.type;
			if (option.type == 2) {
				wx.setNavigationBarTitle({
					title: "站内名片夹"
				});
			}
			if (option.type == 1) {
				wx.setNavigationBarTitle({
					title: "机构同事"
				});
			}
		},
		onShow() {
			this.searchkey = '';
			this.isfresh = true;
			this.card_msg = {};
			this.page = 1;
			this.hasCard = wx.getStorageSync('hasCard') || false;
			this.avatarUrl = wx.getStorageSync('avatarUrl');

			this.getAllCard();
		},

		onHide() {
			this.addInfo = false;
		},
		async mounted() {
			let a = await util.systemIfo();
			let navHeight = getApp().globalData.navHeight;
			this.mainHeight = a.windowHeight;
			this.scrollContentHeight = a.windowHeight - navHeight;
		},
		methods: {
			updateShareStatus() {
				this.shareStatus = !this.shareStatus;
			},
			changeUrl(listToUserId) {

				var index = this.listToUserIds.indexOf(listToUserId);
				if (index > -1) {
					this.listToUserIds.splice(index, 1);
				} else {
					this.listToUserIds.push(listToUserId)
				}
				// listToUserIds
			},
			nowShare() {
				WXAJAX.POST({
						dynamicId: this.dynamicId,
						listToUserId: this.listToUserIds,
						shareSource: 0,
					}, '', '/share/record/batch', '', '', 1)
					.then(res => {
						this.listToUserIds = [];
						this.shareStatus = !this.shareStatus;
						wx.showToast({
							title: '分享成功',
							icon: 'success',
							duration: 2000 //持续的时间
						})
					});
			},
			//点击名片的拨打电话,回调需要登录
			needLogin() {
				this.isLogin = false;
				this.isShowLoginGuide = true;
			},
			//隐藏登录引导
			cancelLoginGuide() {
				this.isShowLoginGuide = false;
			},
			//下拉刷新
			scrolltoupper() {
				this.page = 1;
				this.searchkey = '';
				// this.card_msg = {} ;
				// this.lists = [] ;
				this.nodata = false;
				this.isLoading = false;
				this.getAllCard();
			},
			//上拉加载更多
			scrolltolower() {
				this.getAllCard();
			},
			//点击立即创建名片,因为没有登录,所以授权成功以后,会有登录成功的回调,回调成功以后,跳转到名片创建页面
			loginSuccess(url) {
				this.isLogin = true;
				this.hasCard = wx.getStorageSync('hasCard') || false;
				this.avatarUrl = wx.getStorageSync('avatarUrl') || '';

				if (url && url === 'insert') {
					wx.navigateTo({
						url: "../companyPack/editCard/main?type=add&goType=1"
					});
				} else {
					this.page = 1;
					this.getAllCard();
				}
				//头像登录成功的回调
			},
			getNotice() {
				WXAJAX.POST({}, '', '/notice/selectEffectiveList').then(res => {
					this.noticeList = res || [];
				});
			},
			shareApp(companyId, cardId, companyName, name, logo) {
				return
				this.onShareAppMessage(companyId, cardId, companyName, name, logo)
			},
			createCard() {
				this.toCreatePage();
			},
			search_focus() {
				this.isfocus = true;
			},
			search_confirm() {
				if (this.searchkey === this.last_searchkey) {
					return;
				}
				wx.showLoading();
				this.page = 1;
				this.card_msg = {};
				this.lists = [];
				this.nodata = false;
				this.isLoading = false;
				this.getAllCard();
			},
			page_turn(url) {
				this.addInfo = false;
				wx.navigateTo({
					url: '../' + url + '/main'
				})
			},
			toIndex(url, companyid, cardid) { //进入首页
				wx.setStorageSync('COMPANYID', companyid); /*id*/
				wx.setStorageSync('CARDID', cardid); /*id*/
				this.addInfo = false;
				wx.navigateTo({
					url: '../' + url + '/main?cardId=' + cardid + '&companyId=' + companyid
				});
			},
			// getPhoneNumber(e) {
			//   this.phoneMsg.phoneData = e.encryptedData;
			//   this.phoneMsg.iv = e.iv;
			// },
			getAllCard() {
				let v = this;
				if (v.isLoading) {
					return
				}
				v.isLoading = true;
				if (v.type == 2) {
					WXAJAX.POST({
						name: this.searchkey,
						pageNum: v.page,
					}, '', '/ipa/selectIpaList', '1').then((data) => {
						console.log(data);
						this.last_searchkey = this.searchkey;
						// state : 1 -- 默认 ， 2 -- 浏览记录 ， 3 -- 自己的
						if (data && data.list) {
							let datas = [];
							this.total = data.total;
							data.list.forEach(function(i, k) {
								const cardData = {
									picchecked: i.logo || '',
									username: i.name || '',
									tel: i.phone || '',
									wx: i.personalWx || '',
									company_wx: i.companyWx || '',
									email: i.email || '',
									post: i.position || '',
									company: i.companyName || '',
									company_logo: i.companyLogo || '',
									cardId: i.cardId || '',
									companyId: i.companyId || '',
									recordId: i.recordId || '',
									shareSpeech: i.shareSpeech || '',
									shareData: v.article,
									savetype: v.saveType,
									dynamicId: v.dynamicId,
									gender: i.gender || '',
								};
								if (i.state === 3) { //默认名片
									v.card_msg = cardData;
									wx.setStorageSync("SELFCARDID", cardData.cardId);
									wx.setStorageSync("SELFCOMPANYID", cardData.companyId);
									wx.setStorageSync("currentUserId", cardData.userId);
								} else {
									cardData.createTime = util.getdate(i.createTime, 'dateTime');
									datas.push(cardData);
								}
							});

							if (v.page === 1) {
								this.lists = datas;
								console.log(this.lists,"asdasd");
							} else {
								this.lists.push(...datas);
							}

							v.page++;

							if (!v.hasCard) {
								v.addInfo = true;
							}
						}
						setTimeout(function() {
							v.nodata = true;
							v.isLoading = false;
						}, 500);

						wx.hideLoading();
					}).catch((err) => {
						wx.hideLoading();
					});
				}
				if (v.type == 1) {
					WXAJAX.POST({
						name: this.searchkey,
						pageNum: v.page,
					}, '', '/businessCard/getCompanyStaffList').then((data) => {
						console.log(data);
						this.last_searchkey = this.searchkey;
						// state : 1 -- 默认 ， 2 -- 浏览记录 ， 3 -- 自己的
						if (data && data.list) {
							let datas = [];
							this.total = data.total;
							data.list.forEach(function(i, k) {
								const cardData = {
									picchecked: i.logo || '',
									username: i.name || '',
									tel: i.phone || '',
									wx: i.personalWx || '',
									company_wx: i.companyWx || '',
									email: i.email || '',
									post: i.position || '',
									company: i.companyName || '',
									company_logo: i.companyLogo || '',
									cardId: i.cardId || '',
									companyId: i.companyId || '',
									recordId: i.recordId || '',
									shareSpeech: i.shareSpeech || '',
									shareData: v.article,
									savetype: v.saveType,
									dynamicId: v.dynamicId,
									gender: i.gender || '',
								};
								if (i.state === 3) { //默认名片
									v.card_msg = cardData;
									wx.setStorageSync("SELFCARDID", cardData.cardId);
									wx.setStorageSync("SELFCOMPANYID", cardData.companyId);
									wx.setStorageSync("currentUserId", cardData.userId);
								} else {
									cardData.createTime = util.getdate(i.createTime, 'dateTime');
									datas.push(cardData);
								}
							});

							if (v.page === 1) {
								this.lists = datas;
							} else {
								this.lists.push(...datas);
							}

							v.page++;

							if (!v.hasCard) {
								v.addInfo = true;
							}
						}
						setTimeout(function() {
							v.nodata = true;
							v.isLoading = false;
						}, 500);

						wx.hideLoading();
					}).catch((err) => {
						wx.hideLoading();
					});
				}



			}
		}
	}
</script>

<style>
	.card-main {
		width: 100%;
		height: 100%;
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
		color: #a8a8a8;
	}

	.search {
		justify-content: center;
	}

	.search.focus {
		justify-content: flex-start;
	}

	.search.focus input {
		width: auto;
	}

	page {
		width: 100%;
		height: 100%;
	}

	.add_card {
		position: fixed;
		right: 0;
		bottom: 90upx;
		z-index: 99;
		padding-right: 30upx;
		padding-left: 30upx;
		box-sizing: border-box;
		text-align: right;
	}

	.create-btn {
		transition: all 0.8s ease-in-out;
		display: inline-flex;
		align-items: center;
		box-sizing: border-box;
		padding: 0 30upx;
		border-radius: 1998upx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		color: white;
		position: relative;
	}

	.create-btn .create {
		flex-grow: 1;
		text-align: right;
	}

	.width-max {
		width: 100%;
	}

	.create-btn img {
		flex: 0 0 60upx;
	}

	.my-card-case {
		height: 36upx;
	}

	.card-case-num-img {
		/* display: inline-block; */
		width: 32upx;
		height: 32upx;
		/* border: 1upx dashed #444 */
	}

	.separator {
		display: inline-block;
		width: 8upx;
		height: 32upx;
		background: #51cdcb;
	}
</style>
