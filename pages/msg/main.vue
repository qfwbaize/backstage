<template>
	<view class="content">
		<!-- 导航栏 -->
		<!-- <view class="nav">
      <view class="navlist" v-for="(item,index) in usercard.slice(0,3)" :key="index">
        <view class="navinfo" @click="toSelect(index)">
          <view class="display" :class="activeIndex == index ? 'active' : '' ">{{item.company}}</view>
          <view class="text" v-show="activeIndex != index">{{item.newNum}}</view>
        </view>
      </view>
      <view class="openimage" @click="toOpen">
        <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/mine/open.png" mode=""></image>
      </view>
    </view> -->
		<view class="navhead">
			<view class="headlist" v-for="(item,index) in usercard.slice(0,3)" :key="index">
				<view class="default" :class="activeIndex == index ?'headlist_every' :'headlist_everyone' "
					@click="toSelect(index,usercard[index].companyId,usercard[index].cardId,usercard[index].userId,usercard[index].roleId,usercard[index])">
					<view class="display">{{item.company}}</view>
					<view class="text" v-show="item.newNum != 0">{{item.newNum}}</view>
				</view>
			</view>
			<view class="openimage" @click="toOpen">
				<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/3points.png"
					mode=""></image>
			</view>
		</view>
		<!-- 显示其他的消息 -->
		<view class="open" v-show="isOpen == true">
			<view class="open_title">我其他名片下收到的消息</view>
			<view class="list"
				@click="toSelect(index,usercard[index].companyId,usercard[index].cardId,usercard[index].userId,usercard[index].roleId,usercard[index])"
				v-for="(item,index) in usercard" :key="index">
				<view class="list_img">
					<image :src=item.company_logo mode=""></image>
				</view>
				<view class="list_title">{{item.company}}</view>
				<view class="urllist">
					<!-- <image  :src=item.picchecked  mode=""></image> -->
					<image v-for="(v,k) in item.photos" :key="k" :src="v.logo" mode=""></image>
				</view>
				<view class="number">{{item.newNum}}</view>
			</view>

		</view>
		<view class="size" v-show="isOpen == false"></view>

		<view class="forwardInfo">
			<!-- <view class="forwardInfo_title">转发记录</view> -->
			<view class="forwardInfolist">
				<view class="forwardInfolist_every" @click="toShare">
					<view class="forwardInfolist_every_img">
						<image
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/fas fa-share@3x.png"
							mode=""></image>
					</view>
					<view class="forwardInfolist_every_text">普通转发</view>
				</view>

				<view class="forwardInfolist_every" @click="toAccurate">
					<view class="forwardInfolist_every_img">
						<image
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/accurate.png"
							mode=""></image>
					</view>
					<view class="forwardInfolist_every_text">精准转发</view>
				</view>

				<view class="forwardInfolist_every" @click="toforPromote">
					<view class="forwardInfolist_every_img">
						<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/down.png"
							mode=""></image>
					</view>
					<view class="forwardInfolist_every_text">推效转发</view>
				</view>
				<view class="forwardInfolist_every" @click="toforShare">
					<view class="forwardInfolist_every_img">
						<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/money.png"
							mode=""></image>
					</view>
					<view class="forwardInfolist_every_text">分享奖励</view>
				</view>

				<view class="forwardInfolist_every" @click="toforRead">
					<view class="forwardInfolist_every_img">
						<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/read.png"
							mode=""></image>
					</view>
					<view class="forwardInfolist_every_text">阅读奖励</view>
				</view>
			</view>
		</view>


		<view class="main">
			<!-- 名片夹 -->
			<view class="mainlist" style="margin-bottom: 12rpx;" @click="toBusCard">
				<view class="mainimg">
					<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/mine/logo1.png"
						mode="">
					</image>
					<!-- <view class="spot"></view> -->
				</view>
				<view class="min_title">
					<view class="">名片夹</view>
					<view class="msg" v-show="cardNum !== 0">{{cardNum}}</view>
				</view>
			</view>
			<!-- 通知 -->
			<view class="mainlist" style="margin-bottom: 12rpx;" @click="toMsg">
				<view class="mainimg" style="background-color: rgba(255, 216, 193, 100);">
					<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/ling.png" mode="">
					</image>

				</view>
				<view class="min_title">
					<view class="">通知</view>
					<view class="msg" v-show="noticeMsg !== 0">{{noticeMsg}}</view>
				</view>
			</view>
			<!-- 群聊 -->
			<view class="mainlist" style="margin-bottom: 12rpx;" @click="Group_chat()">
				<view class="mainimg" style="background-color: rgba(255, 216, 193, 100);">
					<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/ling.png" mode="">
					</image>
				</view>
				<view class="min_title">
					<view class="">群聊</view>
				</view>
			</view>

			<!-- 聊天列表 -->
			<view class="mainlist" v-for="(item,index) in imlists" :key="index">
				<MsgBox style="width: 100%;" :msg="item" :isImMsg="true"
					:istime="item.newestMessage && item.newestMessage.time"
					@row_tap="row_tap(item.userId||'',item.cardId||'',item.logo||'',item.name||'',item.wxCode||'', item.phone||'', item.companyId||'')">
				</MsgBox>
			</view>

		</view>
		<Tabbar :unreadMsg='unreadMsg' tabIndex=3></Tabbar>
		<view class="" style="width: 100%;height: 200rpx;"></view>
	</view>
</template>

<script>
	import store from '@/store/index'
	import {
		mapState
	} from "vuex";
	import MsgBox from '@/components/msgBox'
	import websocket from '@/utils/websocket'
	import WXAJAX from "@/utils/request";
	import Tabbar from "@/components/Tabbar";
	export default {
		name: '',
		components: {
			MsgBox,
			Tabbar
		},
		data() {
			return {
				activeIndex: uni.getStorageSync('Index'),
				isOpen: false,
				page: 1,
				tabType: 1,
				usercard: [],
				imlists: [],
				nowCardId: 0,
				cardNum: 0,
				unreadMsg: uni.getStorageSync('unreadMsg'),
				noticeMsg: uni.getStorageSync('noticeMsg')
			}
		},
		// watch: {
		//   'msg': {
		//     deep: false,
		//     immediate: true,
		//     handler(value) {
		//       console.log(value,88888888)
		//       this.unreadMsg = value.size
		//       this.noticeMsg = value.sysSize
		//     }
		//   },
		// },
		// computed: {
		//   ...mapState(['msg']),
		// },
		async onPullDownRefresh() {
			this.getList()
			if (this.tabType == 2) {
				return
			}
			websocket.sendSocketJSON("1080", this.page);
			setTimeout(() => {
				wx.stopPullDownRefresh();
			}, 2 * 1000)
		},
		onReachBottom() {
			if (this.tabType == 2) {
				return
			}
			this.page++;
			// this.updateImList(this.lists)
			websocket.sendSocketJSON("1080", this.page);
		},
		onLoad() {
			this.getList()
		},
		onShow() {
			uni.hideHomeButton()
			//登录了后查询聊天记录
			websocket.sendSocketJSON("1080", this.page);
			// if (!wx.getStorageSync("token")) {
			//   wx.setStorageSync("redirectPage", "/pages/msg/main");
			//   wx.reLaunch({ url: "/pages/cardCase/main" });
			//   return;
			// }
			websocket.sendSocketJSON('1090');
			this.getList()
			this.getAllCard()
			this.page = 1;
			// websocket.sendSocketJSON("1080", this.page);

		},
		computed: {
			msgList() {
				console.debug("store接收的消息+++", store.state.msglist);
				console.log("store接收的消息+++", store.state.msgList.msglist);
				return store.state.msgList.msglist;

			},
			//分页取聊天记录
			lists() {
				let lists = JSON.parse(JSON.stringify(this.msgList.mapList || []));
				this.updateImList(lists);
				return lists

			},
		},
		methods: {
			Group_chat() {
				uni.navigateTo({
					url: '../demand/Group_chat/Group_chat'
				})
			},
			//跳转通知页面
			toMsg() {
				uni.navigateTo({
					url: '../demand/notice/notice'
				})
			},
			//跳转名片夹页面
			toBusCard() {
				uni.navigateTo({
					url: '../demand/businessCard/businessCard'
				})
			},
			// 选项卡效果
			toSelect(index, companyId, cardId, userId, roleId, item) {
				this.activeIndex = index;
				uni.setStorageSync('Index', index)
				this.nowCardId = this.usercard[index].cardId
				this.updateImList(this.lists);
				this.getCardNum();
				this.isOpen = false;
				this.change(companyId, cardId, userId, roleId, item)
			},
			change(companyId, cardId, userId, roleId, item) {
				uni.setStorageSync('COMPANYID', companyId);
				uni.setStorageSync('isBoss', roleId != 0);
				uni.setStorageSync('SELFCOMPANYID', companyId);
				uni.setStorageSync('SELFCARDID', cardId);
				uni.setStorageSync('userId', userId);
				this.changeCard(cardId, companyId)
			},
			//切换名片
			changeCard(cardId, companyId) {
				uni.showLoading()
				let params = {
					ignore: true,
					cardId: wx.getStorageSync('SELFCARDID'),
				};
				if (!wx.getStorageSync('SELFCARDID')) {
					params = {
						ignore: true,
					};
				}
				WXAJAX.POST(params, '', '/businessCard/getCompanyUserInfo').then((data) => {
					uni.hideLoading()
					if (data) {
						let cardWelcomeSpeech = {
							company: data.companyName,
							user: data.name,
							shareSpeech: data.shareSpeech ? data.shareSpeech : '',
							welcomeSpeech: data.welcomeSpeech ? data.welcomeSpeech : '',
							hint: data.hint ? data.hint : ''
						};
						wx.setStorageSync('cardWelcomeSpeech', cardWelcomeSpeech);
						wx.setStorageSync('cardId', data.cardId);
					}
				})
			},
			//展开显示的效果
			toOpen() {
				if (this.isOpen == true) {
					this.isOpen = false
				} else {
					this.isOpen = true
				}
			},
			//获取名片数量
			async getCardNum() {
				WXAJAX.POST({
					ascriptionId: this.nowCardId
				}, '', '/ipa/selectIpaList').then((data) => {
					this.cardNum = data.total;
					// this.cardNum = data.list.length;
				})

			},
			updateImList(lists) { //更新列表
				for (var i = 0; i < lists.length; i++) {
					if (lists[i].cardId == this.nowCardId) {
						this.imlists = lists[i].getImListEntity.imList;
						// if(this.page == lists[i].getImListEntity.pageNum){
						//   this.imlists = lists[i].getImListEntity.imList;
						// }else{
						//   this.imlists = [...this.imlists,...lists[i].getImListEntity.imList];
						// }
					}
					for (var j = 0; j < this.usercard.length; j++) {
						if (lists[i].cardId == this.usercard[j].cardId) {
							// this.usercard[j]['newNum'] = lists[i].unreadMessageNum;
							var a = lists[i].getImListEntity.imList
							var num = 0
							for (var s = 0; s < a.length; s++) {
								num = num + a[s].unreadMessageNum
							}
							this.usercard[j]['newNum'] = num
							if (this.usercard[j]['newNum'] > 99) {
								this.usercard[j]['newNum'] = 99
							}
							this.usercard[j]['photos'] = lists[i].getImListEntity.imList
						}
					}

				}
				// this.usercard.forEach((item)=>{
				//   var getCardId = uni.getStorageSync('cardId')
				//   if(item.cardId == getCardId){
				//     this.unreadMsg = item.newNum
				//   }
				// })

			},
			getList() {
				if (this.tabType == 2) {
					return
				}
				websocket.sendSocketJSON("1080", this.page);
				setTimeout(() => {
					wx.stopPullDownRefresh();
				}, 2 * 1000)
			},
			//点击进去聊天界面
			row_tap(id, cardid, logo, name, wxCode, phone, companyId) {
				uni.navigateTo({
					url: '../IM/main?userId=' + id + '&logo=' + logo + '&type=2&cardId=' + cardid + '&name=' +
						name +
						'&wxCode=' + wxCode + '&phone=' + phone + '&companyId=' + companyId
				})
			},
			getAllCard() {
				let v = this;
				if (v.isLoading) {
					return
				}
				v.isLoading = true;
				WXAJAX.POST({
					name: this.searchkey,
					pageNum: v.page,
				}, '', '/businessCard/findMyCards', '', '', 2).then((data) => {
					this.last_searchkey = this.searchkey;
					if (data && data.list) {
						this.nowCardId = data.list[0].cardId;
						this.getCardNum();
						let datas = [];
						let mydatas = [];
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
								company: i.companyName,
								company_logo: i.companyLogo,
								cardId: i.cardId,
								companyId: i.companyId,
								recordId: i.recordId,
								shareSpeech: i.shareSpeech || '',
								userId: i.userId || '',
								roleId: i.roleId || '',
								auditState: i.auditState || '',
							};

							v.card_msg = cardData;
							mydatas.push(cardData);
							wx.setStorageSync("currentUserId", cardData.userId);
							// v.usercard.push(cardData)
							v.usercard = mydatas

						});

						if (v.page === 1) {
							this.mylists = mydatas;
						} else {
							this.mylists.push(...mydatas);
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


			},

			//跳转普通转发页面
			toShare() {
				uni.navigateTo({
					url: '../demand/share/share'
				})
			},
			//跳转到精准转发页面
			toAccurate() {
				uni.navigateTo({
					url: '../demand/forAccurate/forAccurate'
				})
			},
			//跳转到推效转发页面
			toforPromote() {
				uni.navigateTo({
					url: '../demand/forPromote/forPromote'
				})
			},
			//跳转到分享奖励页面
			toforShare() {
				uni.navigateTo({
					url: '../demand/forShare/forShare'
				})
			},
			//跳转到阅读奖励页面
			toforRead() {
				uni.navigateTo({
					url: '../demand/forRead/forRead'
				})
			},

		}
	}
</script>

<style scoped>
	.content {
		width: 100vw;
		/* height: 100vh; */
		/* background-color: #FFFFFF; */
	}

	.navhead {
		width: 690rpx;
		height: 80rpx;
		background-color: #FFFFFF;
		display: flex;
		font-size: 28rpx;
		padding: 0 30rpx;
		font-weight: 500;
		justify-content: space-between;
		line-height: 80rpx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		overflow: hidden;
	}

	.headlist {}

	.headlist_every {
		width: 186rpx;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 12rpx;
		background-color: rgba(3, 211, 197, 100);
		text-align: center;
		border: 2rpx solid rgba(255, 255, 255, 100);
		display: flex;
		color: #FFFFFF;
	}

	.headlist_everyone {
		width: 186rpx;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 12rpx;
		background-color: #FFFFFF;
		text-align: center;
		border: 2rpx solid rgba(255, 255, 255, 100);
		display: flex;
	}

	.default {
		display: flex;
		justify-content: center;
	}

	.display {
		width: 115rpx;
		margin: 0 10rpx;
		text-align: center;
	}

	.text {
		width: 30rpx;
		height: 30rpx;
		border-radius: 50%;
		background-color: red;
		text-align: center;
		line-height: 30rpx;
		font-family: Arial;
		font-size: 24rpx;
		margin-top: 20rpx;
		color: #FFFFFF;
		margin-right: 10rpx;
	}

	.openimage {
		width: 40rpx;
		height: 60rpx;
		margin-top: 10rpx;
	}

	.openimage image {
		width: 100%;
		height: 100%;
	}

	.content .nav {
		width: 690rpx;
		height: 80rpx;
		background-color: #1ad0c3;
		display: flex;
		font-size: 28rpx;
		padding: 0 30rpx;
		color: #FFFFFF;
		font-weight: 500;
		/* justify-content: space-between; */
		line-height: 68rpx;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		overflow: hidden;
	}

	/* .content .nav .navlist {
    display: flex;
    justify-content: space-between;
  } */

	.content .nav .navinfo {
		display: flex;
		width: 186rpx;
		height: 60rpx;
		margin: 0 10rpx;
		justify-content: center;
		overflow: hidden;
	}


	/* .content .nav .navinfo .active {
    border-bottom: 2px solid #FFFFFF;
  } */

	.content .nav .navinfo .text {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		background-color: red;
		text-align: center;
		line-height: 40rpx;
		font-size: 24rpx;
		margin-top: 15rpx;
		margin-left: 5rpx;
	}

	.content .nav .openimage {
		width: 40rpx;
		height: 60rpx;
		margin-top: 10rpx;
	}

	.content .nav .openimage image {
		width: 100%;
		height: 100%;
	}

	.content .open {
		width: 750rpx;
		margin-top: 80rpx;
		padding-top: 20rpx;
		overflow: hidden;
	}

	.content .open .open_title {

		margin-left: 20rpx;
		font-weight: 600;
		margin-bottom: 20rpx;
	}

	.content .open .list {
		width: 750rpx;
		height: 138rpx;
		box-shadow: 0px 4rpx 12rpx 0px rgba(167, 225, 221, 100);
		border-bottom: 2rpx solid rgba(255, 255, 255, 100);
		border-radius: 12rpx;
		background-color: rgba(255, 255, 255, 100);
		display: flex;
		line-height: 138rpx;
		margin-bottom: 10rpx;
	}

	.content .open .list .list_img {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		overflow: hidden;
		margin-left: 30rpx;
		margin-top: 20rpx;
	}

	.content .open .list .list_img image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.content .open .list .list_title {
		width: 250rpx;
		margin-left: 20rpx;
		font-size: 32rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.content .open .list .urllist {
		width: 230rpx;
		height: 95rpx;
		display: flex;
		flex-wrap: wrap;
		/* border-radius: 50%; */
		margin-top: 30rpx;
		margin-left: 20rpx;
		/* padding-left: 20rpx; */
		overflow: hidden;
	}

	.content .open .list .urllist image {
		display: inline-block;
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		margin-top: 16rpx;
		margin-left: -30rpx;
	}

	.content .open .list .urllist image:nth-child(1) {
		margin-left: 0rpx;
	}

	.content .open .list .number {
		color: red;
		font-size: 22rpx;
		font-weight: 600;
	}

	.content .size {
		margin-top: 80rpx;
		margin-bottom: 100rpx;
	}

	.content .main {
		width: 750rpx;
	}

	.content .main .mainlist {
		display: flex;
		width: 750rpx;
		background-color: #FFFFFF;
	}

	.content .main .mainlist .mainimg {
		width: 100rpx;
		height: 100rpx;
		margin-top: 20rpx;
		margin-left: 30rpx;
		margin-bottom: 20rpx;
		position: relative;
		background-color: rgba(212, 255, 252, 100);
		border: 1px solid rgba(255, 255, 255, 100);
		border-radius: 12rpx;
	}

	.content .main .mainlist .mainimg image {
		width: 48rpx;
		height: 48rpx;
		margin-top: 26rpx;
		margin-left: 26rpx;
	}

	.content .main .mainlist .mainimg .spot {
		width: 15rpx;
		height: 15rpx;
		position: absolute;
		top: -5rpx;
		right: -5rpx;
		border-radius: 50%;
		background-color: red;
	}

	.content .main .mainlist .min_title {
		margin-left: 20rpx;
		margin-top: 20rpx;
		display: flex;
	}

	.content .main .mainlist .min_title .msg {
		margin-left: 20rpx;
	}

	.forwardInfo {
		width: 650rpx;
		height: 206rpx;
		font-family: Arial;
		background-color: #FFFFFF;
		/* margin-bottom: 38rpx; */
		/* margin-top: 40rpx; */
		/* padding: 38rpx 50rpx 28rpx 50rpx; */
		padding: 20rpx 50rpx 0rpx 50rpx;
		margin-bottom: 20rpx;
	}

	.forward_title {
		height: 42rpx;
		color: rgba(0, 0, 0, 1);
		font-size: 32px;
		text-align: left;
		line-height: 42rpx;
		font-family: PingFangSC-regular;
	}

	.forwardInfolist {
		width: 650rpx;
		height: 136rpx;
		margin-top: 30rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
	}

	.forwardInfolist_every {
		width: 100rpx;
		height: 136rpx;
		/* display: flex;
     flex-direction: column;
     text-align: center; */
	}

	.forwardInfolist_every_img {
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		box-shadow: 0px 4rpx 12rpx 0px rgba(167, 225, 221, 100);
		margin-left: 5rpx;
	}

	.forwardInfolist_every_img image {
		width: 48rpx;
		height: 48rpx;
		margin-top: 21rpx;
		margin-left: 21rpx;
	}

	.forwardInfolist_every_text {
		width: 100%;
		text-align: center;
		height: 36rpx;
		color: rgba(96, 96, 96, 96);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
		margin-top: 12rpx;
	}
</style>
