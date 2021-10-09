<template>

	<div class="overhidden posab w100p ">
		<!--搜索-->
		<view class="fix_topp">
			<view class="navsearch borderbox">
				<div class="bgfff pl15 pb10 pr15 disflex ">
					<div class="bgF4Ff bradius15 flex1 textc lh34 disflex align-cen pl25 search trans2 pr25 mt10">
						<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/search.png"
							style="flex: 0 0 32upx" alt="" class="w16 h16" />
						<input type="text" v-model="searchkey" placeholder="搜索信息" placeholder-style="color:#1EC4B9"
							class="ca4 fs14 lh42 h42 textl pl10 trans2 w100p" @input="search_value" :focus="isfocus"
							@blur="isfocus=false">
					</div>
				</div>
				<view class="navright" @click="toDemand">
					<view class="add">
						<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/fabugongqiu.png"
							mode=""></image>
					</view>
					<view class="text">发布供求</view>
				</view>
			</view>
			<view class="screen">
				<view class="screenList">
					<view :class="tabType == -1 ? 'active' : 'industry'" @click="tab_type_tap(-1)">
						全部
					</view>
					<view v-for="(item,index) in xuqiulabelList" :key="index"
						:class="tabType == index ? 'active' : 'industry'" @click="tab_type_tap(index,item)">
						{{item.labelTitle}}
					</view>
					<!-- <view :class="tabType == 3 ? 'active' : 'industry'" @click="tab_type_tap(3)">
						新能源
					</view> -->
					<!-- <view :class="tabType == 4 ? 'active' : 'industry'" @click="tab_type_tap(4)">
						新能源
					</view> -->
					<!-- <view class="screenbtn">
						<text class="iconfont icon-selectall"></text>筛选
					</view> -->
				</view>
			</view>
		</view>
		<view class="" style="height: 250rpx;" />




		<view v-for="(item,index) in demand_lists" :key="index">
			<div class="bgfff pt20 pl15 pr16 bbf5f6 mb5" @click="demand_detall(item.squareId,item.companyId)">
				<div class="disflex mb15 jsbet align-cen">
					<div class="disflex">
						<img :src="item.logo || 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/card1_logo.png'"
							alt="" mode="aspectFill" class="w50 h50 bradius5 mr8">
						<div class="disflex flex-column jsaround">
							<span class="fbold c38 w195 fs16 over_1 ">{{item.name}}</span>
							<span class="ca8 fs12">{{getFormatTime(item.createdTimestamp)}}</span>
						</div>
					</div>
					<div class="bblue disborder align-cen w80 h25 disflex jscen fs14 cblue bradius15"
						@click.stop="phone_tap(item.phone)">
						联系TA
					</div>
				</div>

				<div class="flex1">
					<div @click="addComment(item.dynamicId)">
						<p class="fs16 c38">{{item.description}}</p>
						<div class="disflex pt15 picture-list">
							<div class="w93 h93" v-for="(v,k) in JSON.parse(item.images)" :key="k">
								<!-- <div class="w93 h93"> -->
								<img @tap.stop="fdimg($event,item.images)" :data-src="v" :src="v" mode="aspectFill" :lazy-load="true">

							</div>
						</div>
					</div>
					<div class="disflex h39 mt15 btf5f6">
						<button @click.stop="" class='bgfff fs12 cdeepblue p0 w33p disflex jscen align-cen'
							:data-dynamicId="item.dynamicId" open-type="share" hover-class="other-button-hover">
							<img class="w20 h20 mr8" :src="shareIcon">
							<span>{{item.shareNum}}</span>
						</button>
						<div class="disflex jscen align-cen w33p" @click.stop="addCommentA(item)">
							<img class="w20 h20 mr8" :src="commentIcon">
							<p class="fs12 c78">{{item.commentNum}}</p>
						</div>
						<div class="disflex jscen align-cen w33p"
							@click.stop="zan(index , item.likeNum, item.squareId,item)">
							<img class="w20 h20 mr8" :src="item.isBind ?  like_selectIcon :  likeIcon">
							<p :class="item.isThumbs == 1 ?  'cblue' :  'c78'" class="fs12">{{item.likeNum}}</p>
						</div>
					</div>
				</div>
			</div>
		</view>

		<!-- <div class="flex1 bgfff" v-if="!dynamic_item">
			<nodata :title="'暂无需求信息，快去发布你的需求吧'"></nodata>
		</div> -->

		<!-- <div class="release_btn disflex jscen align-cen" @click="release_tap">
			<img :src="sendIcon" class="w30 h30">
		</div> -->
	</div>
</template>

<script>
	import WXAJAX from '@/utils/request'
	import utils from '@/utils/index.js'
	import nodata from "@/components/noDataA";
	export default {
		components: {
			nodata
		},
		name: "RichEditor",
		props: {
			// 显示的toolbar按钮
			demand_lists: {
				type: Array,
				default () {
					return []
				},
			},
			xuqiulabelList: {
				type: Array,
				default () {
					return []
				},
			}
		},
		data() {
			return {
				tabType: -1,
				searchkey: '',
				videourl: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/video/20210319/32396be6e523cfee76e0684389072055.mp4',
				createTime: utils.getFormatTime(this.demand_lists.createdTimestamp),
				commentIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_comment.png',
				likeIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_like.png',
				like_selectIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_like_select.png',
				shareIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_share.png',
				sendIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmAdd/ic_send%402x.png',

			}
		},
		mounted() {},
		methods: {
			// 输入监听
			search_value() {
				// this.goodname = e.detail.value // 已使用v-model,无需再次赋值
				// 节流,避免输入过快多次请求
				this.searchTimer && clearTimeout(this.searchTimer);
				this.searchTimer = setTimeout(() => {
					this.doSearch(this.searchkey);
				}, 300);
			},
			// 搜索
			doSearch(searchkey) {
				this.$emit('doSearch', searchkey)
			},
			toDemand() {
				uni.navigateTo({
					url: '/pages/demand/deman/demand'
				})
			},
			photos() {
				this.photos = JSON.parse(this.demand_lists.images)
			},
			phone_tap(phone) {
				wx.makePhoneCall({
					phoneNumber: phone
				});
			},
			tab_type_tap(type, item) {
				this.tabType = type
				if (item == undefined) {
					item = {
						labelTitle: ''
					}
				}
				let labelTitle = item.labelTitle
				this.$emit('pageUserlabelTitle', labelTitle)
			},
			//发布信息的详情页
			demand_detall(squareId, companyId) {
				wx.navigateTo({
					url: `/pages/companyPack/find/detall/main?companyId=${companyId}&squareId=${squareId}`
				})
			},
			//发布需求
			release_tap() {
				uni.navigateTo({
					url: '/pages/companyPack/find/release/main'
				})
			},
			fdimg(e, urls) {
				this.$emit('previewImage', e, urls)
			},

			zan(index, likeNum, squareId, item) {
				let dynamic_lists = this.demand_lists[index]
				let v = this;
				wx.showLoading();
				WXAJAX.POST({
							//tyoe: 2为点赞 1为评论
							type: 2,
							squareId: squareId,
							commentUserId: wx.getStorageSync("userId")
						},
						"",
						"/demandSquare/likeSquareComment", "", "", 2
					)
					.then(data => {
						console.log('dataaa', data)
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
			addCommentA(dynamic_item) {
				console.log(dynamic_item)
				wx.navigateTo({
					url: `/pages/companyPack/find/detall/main?companyId=${dynamic_item.companyId}&squareId=${dynamic_item.squareId}`
				})
			},
			getFormatTime(timeStamp, accurate) {
				var dateTime = new Date(timeStamp);
				var no1new = dateTime.valueOf();
				var year = dateTime.getFullYear();
				var month = dateTime.getMonth() + 1;
				var day = dateTime.getDate();
				var hour = dateTime.getHours();
				var minute = dateTime.getMinutes();
				var second = dateTime.getSeconds();
				var now = new Date();
				var now_new = now.valueOf();
				var milliseconds = 0;
				var timeSpanStr;
				if (hour < 10) {
					hour = "0" + hour
				}
				if (minute < 10) {
					minute = "0" + minute
				}

				milliseconds = now_new - no1new;

				if (milliseconds <= 1000 * 60 * 1) {
					timeSpanStr = '刚刚';
				} else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
					timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
				} else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
					timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
				} else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
					timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
				} else if (accurate == true) {
					timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
				} else if (milliseconds > 1000 * 60 * 60 * 24 * 15 && year == now.getFullYear()) {
					timeSpanStr = year + '-' + month + '-' + day
				} else {
					timeSpanStr = year + '-' + month + '-' + day
				}
				return timeSpanStr;
			}
		}
	}
</script>

<style>

</style>
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
		padding-top: 20rpx;
	}

	.screen {
		width: 100%;
		border: 1px transparent solid;
		background-color: #fff;
	}

	.screenList {
		width: 80%;
		margin: 20rpx;
		/* justify-content: space-between; */
		display: flex;
	}

	.industry {
		background-color: #EAEAEA;
		padding: 15rpx 18rpx 15rpx 18rpx;
		border-radius: 15rpx;
		margin-right: 20rpx;
		color: #807E7E;
	}

	.active {
		color: #FFF;
		background-color: #51cdcb;
		transition: all .2s;
		padding: 15rpx 18rpx 15rpx 18rpx;
		border-radius: 15rpx;
		margin-right: 20rpx;
	}

	.screenbtn {
		padding: 15rpx 18rpx 15rpx 18rpx;
		box-shadow: rgb(254, 216, 186) 0rpx 4rpx;
		color: rgb(255, 172, 105);
		background-color: rgb(255, 250, 244);
		border-radius: 22rpx;
		font-weight: normal;
		font-style: normal;
	}

	.picture-list {
		flex-wrap: wrap;
	}

	.picture-list div {
		overflow: hidden;
		margin-right: 6upx;
		margin-top: 6upx;
	}

	.picture-list img {
		width: 100%;
		height: 100%;
	}

	.picture-list div:nth-child(3n) {
		margin-right: 0;
	}

	.picture-list div:nth-child(1),
	.picture-list div:nth-child(2),
	.picture-list div:nth-child(3) {
		margin-top: 0;
	}

	.dynamic_operate {
		width: 376upx;
		top: 0;
		bottom: 0;
		right: 104upx;
		margin: auto;
		transition: 0.2s;
		overflow: hidden;
		height: 80upx;
	}

	.dynamic_operate>div {
		border-radius: 10upx;
		line-height: 80upx;
		height: 80upx;
		box-sizing: border-box;
	}

	.dynamic_operate.w0 {
		width: 0;
		padding: 0;
		overflow: hidden;
	}

	.triangle_border_right {
		position: absolute;
		display: block;
		width: 0;
		height: 0;
		border-width: 20upx 0 20upx 20upx;
		border-style: solid;
		border-color: transparent transparent transparent #383838;
		/*透明 透明 透明 黄*/
		top: 50%;
		transform: translateY(-50%);
		right: 4upx;
		transition: 0.2s;
	}

	.w0 .triangle_border_right {
		border: 0;
	}

	.dynamic_likes {
		word-break: break-all;
	}

	.dynamic_likes .like_name::after {
		content: "，";
	}

	.dynamic_likes .like_name:last-child::after {
		content: "";
	}

	.release_btn {
		border-radius: 50%;
		width: 120upx;
		height: 120upx;
		position: fixed;
		bottom: 10%;
		right: 30upx;
		background: #51CDCB;
	}

	.input-hide {
		height: 0;
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

	.navsearch .navright .add image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.navsearch .navright .text {
		color: #fff;
		font-size: 24rpx;
		text-align: left;
		margin-left: 10rpx;
		font-family: PingFangSC-regular;
	}
</style>
