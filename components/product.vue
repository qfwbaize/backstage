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
							class="ca4 fs14 lh42 h42 textl pl10 trans2 w100p" @input="search_cp" :focus="isfocus" @blur="isfocus=false"
							>
					</div>
				</div>
				<view class="navright" @click="toProduct">
					<view class="add"><image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/fabuchanpin.png" mode=""></image></view>
					<view class="text">发布产品</view>
				</view>
			</view>

			<view class="screen">
				<view class="screenList">
					<view :class="tabType == -1 ? 'active' : 'industry'" @click="tab_type_tap(-1)">
						全部
					</view>
					<view  v-for="(item,index) in prodslabelList" :key="index" :class="tabType == index ? 'active' : 'industry'" @click="tab_type_tap(index,item)">
						{{item.labelTitle}}
					</view>
					<!-- <view :class="tabType == 3 ? 'active' : 'industry'" @click="tab_type_tap(3)">
						新能源
					</view> -->
					<!-- 	<view :class="tabType == 4 ? 'active' : 'industry'" @click="tab_type_tap(4)">
						新能源
					</view> -->
					<!-- <view class="screenbtn">
						<text class="iconfont icon-selectall"></text>筛选
					</view> -->
				</view>
			</view>
		</view>
		<view class="" style="height: 230rpx;" />
		<view class="category-goods-list">
			<view @click="toProdDetail(item)" class="item ns-border-color-gray marwidth"
				v-for="(item,index) in prod_lists" :key="index" style="border-radius: 12rpx;">
				<view class="control-thumbnail">
					<img :src="item.prodLogo" alt="" class="thumbnail" mode="aspectFill">
				</view>

				<view class="control-goods-name ns-font-size-base">
					<text class="ns-font-size-sm ns-bg-color">{{item.goodsName}}</text>
					<!-- <text>{{item.goodsName}}</text> -->
				</view>

				<view class="control-goods-price">
					<text class="ns-text-color price ns-font-size-lg">
						<!-- ￥100 -->
					</text>
				</view>
			</view>
		</view>
	</div>
</template>

<script>
	import WXAJAX from '@/utils/request'
	import util from '@/utils/index.js'

	export default {
		name: "RichEditor",
		props: {
			// 显示的toolbar按钮
			prod_lists: {
				type: Array,
				default () {
					return []
				},
			},
			prodslabelList: {
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
				commentIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_comment.png',
				likeIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_like.png',
				like_selectIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_like_select.png',
				shareIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_share.png',
				// createTime: utils.getFormatTime(this.dynamic_item.createdTimestamp),
				// photos: JSON.parse(this.dynamic_item.images)
			}
		},
		mounted() {},
		methods: {
			search_cp(){
				// this.goodname = e.detail.value // 已使用v-model,无需再次赋值
				// 节流,避免输入过快多次请求
				this.searchTimer && clearTimeout(this.searchTimer);
				this.searchTimer = setTimeout(() => {
					this.doSearch(this.searchkey);
				}, 300);
			},
			// 搜索
			doSearch(searchkey) {
				this.$emit('doSearch',searchkey)
			},
			toProduct() {
				uni.navigateTo({
					url: '/pages/companyPack/prodDetail/main'
				})
			},
			tab_type_tap(type,item) {
				this.tabType = type
				if(item == undefined){
					item = {
						labelTitle:''
					}
				}
				let labelTitle = item.labelTitle
				this.$emit('ProdslabelTitle',labelTitle)
			},
			toProdDetail: util.throttle(function(item) {
				let prod = this.prod_lists.filter(prod => {
					return prod.goodsId === item.goodsId;
				})[0];
				wx.setStorageSync("prod", prod);
				wx.navigateTo({
					url: "/pages/companyPack/prodDetail/index?goodId=" + item.goodsId + '&companyId=' + item.companyId +
						'&type=' + 'demand'
				});
			}, 1000),

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

	.category-goods-list {
		margin-top: 20rpx;
		width: 96%;
		margin: 20rpx auto;
		display: flex;
		flex-flow: wrap;
	}

	.item {
		padding: 20rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		box-sizing: border-box;
		background: #fff;
		width: calc(50% - 12rpx);
	}

	.item .control-goods-price {
		height: 60rpx;
		line-height: 60rpx;
	}

	.item .control-goods-price .price {
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
	}

	.item .control-goods-name {
		margin: 20rpx 0 0;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		text-align: center;
	}

	.item .control-goods-name .goods-tab {
		color: #fff;
		padding: 2rpx 6rpx;
		margin-right: 10rpx;
		border-radius: 4rpx;
	}

	.item .control-thumbnail {
		text-align: center;
	}

	.item .control-thumbnail image {
		width: 100%;
		max-height: 300rpx;
	}

	.item:nth-child(2n) {
		margin-right: 0;
	}

	.product-card {
		padding: 30upx;
		display: flex;
		background: white;
		border-radius: 20upx;
		margin-top: 22upx;
	}

	.product-card .thumbnail {
		flex: 0 0 216upx;
		width: 216upx;
		height: 220upx;
		border-radius: 10upx;
		margin-right: 30upx;
	}

	.synopsis {
		display: flex;
		flex-wrap: wrap;
		flex-grow: 1;
		align-content: space-between;
	}

	.synopsis .title {
		font-size: 28upx;
		color: rgba(56, 56, 56, 1);
		line-height: 56upx;
		word-break: break-all;
	}

	.synopsis .desc {
		font-size: 24upx;
		color: rgba(168, 168, 168, 1);
		line-height: 40upx;
	}

	.synopsis .footer {
		width: 100%;
	}

	.price-type {}

	.price-type .price {
		color: #FD634E;
		font-size: 24upx;
	}

	.price-type .price span {
		font-size: 36upx;
		font-weight: bold;
	}

	.price-type .tag {
		height: 40upx;
		border: 1upx solid rgba(232, 232, 232, 1);
		border-radius: 10upx;
		font-size: 20upx;
		color: rgba(168, 168, 168, 1);
		padding: 0 14upx;
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
		font-size: 24rpx;
		text-align: left;
		margin-left: 10rpx;
		font-family: PingFangSC-regular;
	}
</style>
