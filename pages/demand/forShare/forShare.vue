<template>
	<view class="content">
		<!-- 选项卡 -->
		<view class="send">
			<view :class="activeIndex == 0 ? 'mineSend':'mineGet'" @click="activeIndex = 0">我发的</view>
			<view :class="activeIndex == 1 ? 'mineSend':'mineGet'" @click="activeIndex = 1">我收到的</view>
		</view>
		<!-- 内容列表 -->
		<view class="lists">
			<!-- 我发的 -->
			<view class="" v-show="activeIndex == 0">
				<view class="promote" v-for="(item,index) in meShareUser" :key="index" @click="toArticleDetail(item)">
					<view class="promote_title">
						<text>文章题目：{{item.title}}</text>
						<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/money.png"
							mode="">
						</image>
						<view :class="item.isActivityExist ? 'conduct':'end'">{{item.isActivityExist ? '进行中':'已结束'}}
						</view>
					</view>
					<view class="user">
						<text>发给谁：</text>
						<image :src=item.toUserLogo mode="">
						</image>
						<view class="username">{{item.toUserName}}</view>
					</view>
					<view class="promote_text">
						<view class="">发布时间：{{item.time}}</view>
						<view class="">总奖金池：{{item.readRewardAmount}}元</view>
					</view>
					<view class="promote_text">
						<view class="">已转发：{{item.shareNum}}次</view>
						<view class="">获得奖励：{{item.rewardStatus== 3 ? item.singleShareReward : 0}}元</view>
					</view>
				</view>
				<!-- 暂无信息 -->
				<view class="noMsg" v-if="meShareUser.length == 0">
					<view class="noYet">
						<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png"
							mode="">
						</image>
						<view class="">暂无信息</view>
					</view>
				</view>

			</view>

			<!-- 我收到的 -->
			<view class="" v-show="activeIndex == 1">

				<view class="promote" v-for="(item,index) in shareMeUser" :key='index' @click="toArticleDetail(item)">
					<view class="promote_title">
						<text>文章题目：{{item.title}}</text>
						<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/money.png"
							mode="">
						</image>
						<view :class="item.isActivityExist ? 'conduct':'end'">{{item.isActivityExist ? '进行中':'已结束'}}
						</view>
					</view>
					<view class="user">
						<text>发给谁：</text>
						<image :src=item.fromUserLogo mode="">
						</image>
						<view class="username">{{item.fromUserName}}</view>
					</view>
					<view class="promote_text">
						<view class="">发布时间：{{item.time}}</view>
						<view class="">已转发：{{item.shareNum}}次</view>
					</view>
					<view class="promote_text">
						<view class="">获得奖励：{{item.rewardStatus== 3 ? item.singleShareReward : 0}}元</view>
					</view>

					<button @click.stop="toShare(item.dynamicId,item.companyId,item.title,item.photos,item)" class="fast" catchtap="btn">立即转发</button>
				</view>
				<!-- 暂无信息 -->
				<view class="noMsg" v-if="shareMeUser.length == 0 ">
					<view class="noYet">
						<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png"
							mode="">
						</image>
						<view class="">暂无信息</view>
					</view>
				</view>
			</view>

		</view>
    <SHARE v-if="share==true" :dynamicId="dynamicId" :videoId="videoId" :companyId="companyId" saveType='1' type='1'
    	@closeShare="closeShare"></SHARE>
	</view>
</template>

<script>
	import WXAJAX from "@/utils/request";
  import SHARE from '@/components/share' //
  import { addShareRecord,editShareRecord,preciseWxShare } from '@/utils/behavior';
	export default {
    components: {
    	SHARE
    },
		data() {
			return {
				pageNum: 1,
				pageSize: 10,
				activeIndex: 0,
				meShareUser: [], //分享我发的
				shareMeUser: [], //分享发给我的
				open: false,
        articleDetail:[],

        share:false,
        dynamicId:'',
        videoId:'',
        companyId:'',
        title:'',
        photos:'',
        isCompanyAuth: 1,
        type:'',
			}
		},
		onShow() {
			this.meShares()
			this.shareMes()
		},
		onPullDownRefresh() {
			this.pageNum = 1
			this.meShares()
			this.shareMes()
		},
		onReachBottom() {
			if (this.open == false) {
				uni.showLoading()
				this.pageNum += 1
				this.meShares()
				this.shareMes()
				uni.hideLoading()
			}

		},
	  async onShareAppMessage(e) {
	  	let shareId = '';
	  	var that = this
	  	let path = '';
	  	if (this.dynamicId) {
	  		wx.showLoading();
	  		var sharedata = await WXAJAX.POST({ //添加分享记录
	  			dynamicId: this.dynamicId,
	  			shareSource: 1,
	  		}, '', '/share/record/add', '', '', 1, "1")

        if(this.type==4){
          path = '/pages/companyPack/library/details?dynamicId=' + this.dynamicId + '&companyId=' + wx.getStorageSync(
            'COMPANYID') + '&cardId=' + wx.getStorageSync('cardId') + '&goType=1&shareId=' + sharedata.shareId;
        }else{
          path = '/pages/companyPack/find/dynamicDetail/main?dynamicId=' + this.dynamicId + '&companyId=' + wx
          	.getStorageSync('COMPANYID') + '&cardId=' + wx.getStorageSync('cardId') + '&goType=1' +
          	'&shareId=' + sharedata.shareId;
        }


	  		if (this.videoId) {
	  			path = '/pages/companyPack/videodetails/videodetails?dynamicId=' + this.dynamicId + '&companyId=' +
	  				wx.getStorageSync('COMPANYID') + '&cardId=' + wx.getStorageSync('cardId') + '&goType=1' +
	  				'&shareId=' + sharedata.shareId + '&videoId=' + this.videoId;
	  		}
	  		console.log("path", path);
	  		wx.hideLoading();

	  	}
	  	return {
	  		imageUrl: this.photos,
	  		title: this.title,
	  		path,
	  		success(e) {
	  			wx.showShareMenu({
	  				withShareTicket: true
	  			})
	  		},
	  		fail(e) {
	  			console.log('失败-- ', e);
	  		}
	  	}

	  	this.dynamicId = '';
	  	this.companyId = '';
	  	this.title = '';
	  	this.photos = '';
	  },
    methods: {
      closeShare() {
      	this.share = false;
      	this.dynamicId = '';
      	this.companyId = '';
      	this.title = '';
      	this.photos = '';
      },
      toShare(did, companyId, title, photos, item) {
      	// this.getAuthentication()
      	console.log("this.isCompanyAuth", this.isCompanyAuth);
      	if (this.isCompanyAuth != 1) {
      		return
      	}
      	this.videoId = item.videoId || item.shortVideoId
      	this.dynamicId = did;
      	this.companyId = companyId;
      	this.title = title;
        photos = photos ? photos.split(",") : [];
      	this.photos = photos[0];
        this.type=item.type;
      	this.share = true;
      },
      //获取认证信息
      // getAuthentication() {
      // 	var data = {
      // 		ignore: true
      // 	}
      // 	WXAJAX.POST(data, '', '/company/getCompany', '', '').then(res => {
      // 		this.isCompanyAuth = res.isCompanyAuth
      // 		if (res.isCompanyAuth != 1) {

      // 			uni.showModal({
      // 				title: '认证功能',
      // 				content: '浏览此页面需要先认证',
      // 				cancelText: '返回首页',
      // 				confirmText: '前往认证',
      // 				success: function(res) {
      // 					if (res.confirm) {
      // 						let url =
      // 							'H5/webView?H5title=申请认证&url=https://wx.mingyicloud.com/app/myy/certmgmt.nsf/personcertFXMopenformFxMcompanyIdFxm' +
      // 							wx.getStorageSync('COMPANYID') + 'FxMidFxm3';
      // 						wx.navigateTo({
      // 							url: "/pages/" + url
      // 						});
      // 					} else if (res.cancel) {
      // 						uni.navigateTo({
      // 							url: '/pages/find/index'
      // 						});
      // 					}
      // 				}
      // 			});
      // 		}
      // 	})
      // },
			//头部选项卡
			change(index) {
				this.activeIndex = index
			},
			//分享转发详情
			toArticleDetail(item) {
        let url='';
				if (item.type == 1 || item.type == 3) {
					url = '../../companyPack/find/dynamicDetail/main?dynamicId=' + item.dynamicId + '&insideShareId=' +
						item.shareId;

				}
				if (item.type == 6) {
          url = '../../companyPack/videodetails/videodetails?dynamicId=' + item.dynamicId + '&insideShareId=' +
          	item.shareId + '&companyId=' + item.companyId + '&videoId=' + item.shortVideoId || item.VideoId;
				}

        if(item.type == 4){
          url = '../../companyPack/library/details?dynamicId=' + item.dynamicId + '&insideShareId=' +
          	item.shareId + '&ifshare=1'
        }

        if (this.activeIndex == 1) { //收到的
        	url = url + '&type=2';
        } else { //我发的
        	url = url + '&type=1';
        }
        wx.navigateTo({
        	url: url
        })
			},
			//分享我发的
			meShares() {
				var data = {
					pageNum: this.pageNum,
					// pageSize: this.pageSize
				}
				WXAJAX.POST(data, '', '/share/record/list/mySharedDynamic', '', '', 1).then(res => {
					if (res !== undefined) {
						if (this.pageNum == 1) {
							this.meShareUser = res.list
						} else {
							this.meShareUser = [...this.meShareUser, ...res.list]
						}
						for (var i = 0; i < this.meShareUser.length; i++) {
							this.meShareUser[i]['time'] = this.meShareUser[i].createTimeStr.split(' ')[0]
						}
						if (res.list.length < this.pageSize) {
							this.open = true
						} else {
							this.open = false
						}
					}
				})
			},
			//分享给我发的
			shareMes() {
				var data = {
					pageNum: this.pageNum,
					// pageSize: this.pageSize
				}
				WXAJAX.POST(data, '', '/share/record/list/sharedMyDynamic', '', '', 1).then(res => {
					if (res !== undefined) {
						if (this.pageNum == 1) {
							this.shareMeUser = res.list
						} else {
							this.shareMeUser = [...this.shareMeUser, ...res.list]
						}
						for (var i = 0; i < this.shareMeUser.length; i++) {
							this.shareMeUser[i]['time'] = this.shareMeUser[i].createTimeStr.split(' ')[0]
						}
						if (res.list.length < this.pageSize) {
							this.open = true
						} else {
							this.open = false
						}
					}
				})
			},

		}
	}
</script>

<style scoped>
	.content {
		width: 750rpx;
		height: 100%;
		background-color: #FFFFFF;
		padding: 40rpx 0rpx;
	}

	.send {
		width: 100%;
		display: flex;
		margin-bottom: 32rpx;
		margin-left: 40rpx;
	}

	.send .mineSend {
		width: 148rpx;
		height: 64rpx;
		background-color: #1ad0c3;
		font-size: 24rpx;
		text-align: center;
		line-height: 64rpx;
		color: #FFFFFF;
		margin-right: 38rpx;
		border-radius: 12rpx;
	}

	.send .mineGet {
		width: 148rpx;
		height: 64rpx;
		background-color: #EEEFEF;
		font-size: 24rpx;
		text-align: center;
		line-height: 64rpx;
		color: #8D8D8D;
		margin-right: 38rpx;
		border-radius: 12rpx;
	}

	.lists {
		margin-left: 40rpx;
		background-color: #FFFFFF;
		padding-bottom: 40rpx;
	}

	.lists .list {
		width: 624rpx;
		/* height: 320rpx; */
		line-height: 40rpx;
		border-radius: 12rpx;
		text-align: center;
		box-shadow: 0px 4rpx 12rpx 0px rgba(167, 225, 221, 100);
		border: 2rpx solid rgba(255, 255, 255, 100);
		padding: 20rpx 24rpx;
		margin-bottom: 44rpx;
	}

	.lists .list .title {
		height: 38rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		display: flex;
	}

	.lists .list .title text {
		width: 480rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.lists .list .title image {
		width: 34rpx;
		height: 34rpx;
		margin-left: 8rpx;
		margin-top: 5rpx;
	}

	.lists .list .time {
		height: 38rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-top: 16rpx;
	}

	.lists .list .user {
		height: 64rpx;
		display: flex;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	.lists .list .user .to {
		line-height: 64rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-right: 24rpx;
	}

	.lists .list .user .userimg {
		width: 64rpx;
		height: 64rpx;
		overflow: hidden;
		margin-right: 18rpx;
	}

	.lists .list .user .userimg image {
		width: 100%;
		height: 100%;
		display: block;
		border-radius: 50%;
	}

	.lists .list .user .username {
		height: 38rpx;
		color: rgba(141, 141, 141, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-top: 13rpx;
		margin-right: 14rpx;
	}

	.lists .list .user .state {
		width: 96rpx;
		height: 42rpx;
		line-height: 34rpx;
		border-radius: 12rpx;
		background-color: rgba(196, 241, 238, 100);
		color: rgba(1, 196, 161, 100);
		font-size: 24rpx;
		text-align: center;
		box-shadow: 0px 4rpx 12rpx 0px rgba(196, 241, 238, 100);
		font-family: Arial;
		border: 2rpx solid rgba(255, 255, 255, 100);
		margin-top: 11rpx;
		text-align: center;
		line-height: 42rpx;
	}

	.lists .list .answer {
		display: flex;
		justify-content: space-between;
	}

	.lists .list .answer .accuracy {
		height: 38rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
	}

	.lists .list .answer .answer_time {
		height: 38rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		font-family: PingFangSC-regular;
	}

	.lists .list .reward {
		/* width: 220rpx; */
		height: 38rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28px;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-top: 28rpx;
	}

	.changebg {
		background-color: rgba(255, 228, 207, 100);
		color: orange;
		width: 96rpx;
		height: 42rpx;
		line-height: 34rpx;
		border-radius: 12rpx;
		font-size: 24rpx;
		text-align: center;
		box-shadow: 0px 4rpx 12rpx 0px rgba(196, 241, 238, 100);
		font-family: Arial;
		border: 2rpx solid rgba(255, 255, 255, 100);
		margin-top: 11rpx;
		text-align: center;
		line-height: 42rpx;
	}

	.lists .received {
		width: 624rpx;
		/* height: 460rpx; */
		line-height: 40rpx;
		border-radius: 12rpx;
		text-align: center;
		box-shadow: 0px 4rpx 12rpx 0px rgba(167, 225, 221, 100);
		border: 2rpx solid rgba(255, 255, 255, 100);
		padding: 20rpx 24rpx;
		margin-bottom: 44rpx;
	}

	.lists .received .userinfo {
		display: flex;
	}

	.lists .received .userinfo .userinfo_img {
		width: 100rpx;
		height: 100rpx;
		overflow: hidden;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	}

	.lists .received .userinfo .userinfo_img image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		display: block;
	}

	.lists .received .userinfo .userinfo_name {
		font-size: 28rpx;
		line-height: 100rpx;
	}

	.lists .received .userinfo_text {
		height: 38rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28px;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-bottom: 20rpx;
		display: flex;
	}

	.lists .received .userinfo_text text {
		width: 480rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.lists .received .userinfo_text image {
		width: 34rpx;
		height: 34rpx;
		margin-left: 8rpx;
		margin-top: 5rpx;
	}

	.lists .received .complete {
		background-color: rgba(255, 228, 207, 100);
		color: orange;
		width: 96rpx;
		height: 42rpx;
		line-height: 34rpx;
		border-radius: 12rpx;
		font-size: 24rpx;
		text-align: center;
		box-shadow: 0px 4rpx 12rpx 0px rgba(196, 241, 238, 100);
		font-family: Arial;
		border: 2rpx solid rgba(255, 255, 255, 100);
		text-align: center;
		line-height: 42rpx;
	}

	.lists .received .active {
		background-color: rgba(196, 241, 238, 100);
		color: #01C4A1;
		width: 96rpx;
		height: 42rpx;
		line-height: 34rpx;
		border-radius: 12rpx;
		font-size: 24rpx;
		text-align: center;
		box-shadow: 0px 4rpx 12rpx 0px rgba(196, 241, 238, 100);
		font-family: Arial;
		border: 2rpx solid rgba(255, 255, 255, 100);
		text-align: center;
		line-height: 42rpx;
	}

	.lists .received .forward_read {
		width: 154rpx;
		height: 54rpx;
		line-height: 54rpx;
		border-radius: 12rpx;
		background-color: rgba(26, 208, 195, 100);
		color: #FFFFFF;
		font-size: 24rpx;
		text-align: center;
		font-family: Arial;
		border: 2rpx solid rgba(255, 255, 255, 100);
		margin-left: 236rpx;
		margin-top: 16rpx;
		margin-bottom: 16rpx;
	}

	.promote {
		width: 622rpx;
		/* height: 336rpx; */
		border-radius: 12rpx;
		box-shadow: 0px 4rpx 12rpx 0px rgba(167, 225, 221, 100);
		border: 2rpx solid rgba(255, 255, 255, 100);
		padding: 20rpx 24rpx;
		margin-top: 34rpx;
	}

	.promote .promote_title {
		display: flex;
	}

	.promote .promote_title text {
		line-height: 46rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 480rpx;
	}

	.promote .promote_title image {
		width: 46rpx;
		height: 46rpx;
		margin: 0 8rpx;
	}

	.promote .promote_title .conduct {
		width: 96rpx;
		height: 42rpx;
		line-height: 42rpx;
		border-radius: 12rpx;
		background-color: rgba(255, 228, 207, 100);
		color: orange;
		font-size: 24rpx;
		text-align: center;
		box-shadow: 0px 4rpx 12rpx 0px rgba(255, 225, 202, 100);
		font-family: Arial;
		border: 2rpx solid rgba(255, 255, 255, 100);
	}

	.promote .promote_title .end {
		width: 96rpx;
		height: 42rpx;
		line-height: 42rpx;
		border-radius: 12rpx;
		background-color: rgba(215, 215, 215, 100);
		color: #7C7B7B;
		font-size: 24rpx;
		text-align: center;
		box-shadow: 0px 4rpx 12rpx 0px rgba(255, 225, 202, 100);
		font-family: Arial;
		border: 2rpx solid rgba(255, 255, 255, 100);
	}

	.promote .promote_title .end {
		width: 96rpx;
		height: 42rpx;
		line-height: 42rpx;
		border-radius: 12rpx;
		background-color: rgba(215, 215, 215, 100);
		color: #7C7B7B;
		font-size: 24rpx;
		text-align: center;
		box-shadow: 0px 4rpx 12rpx 0px rgba(215, 215, 215, 100);
		font-family: Arial;
		border: 2rpx solid rgba(255, 255, 255, 100);
	}

	.promote .promote_text {
		display: flex;
		justify-content: space-between;
		height: 38rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		line-height: 38rpx;
		font-family: PingFangSC-regular;
		margin-top: 26rpx;
	}

	.promote .bottom {
		height: 50rpx;
		width: 100%;
	}

	.promote .forward_read {
		width: 180rpx;
		height: 54rpx;
		line-height: 54rpx;
		border-radius: 12rpx;
		background-color: rgba(26, 208, 195, 100);
		color: #FFFFFF;
		font-size: 24rpx;
		text-align: center;
		font-family: Arial;
		border: 2rpx solid rgba(255, 255, 255, 100);
		margin-left: 220rpx;
		margin-top: 44rpx;
		margin-bottom: 18rpx;
	}

	.promote .user {
		display: flex;
		line-height: 64rpx;
	}

	.promote .user text {
		width: 112rpx;
		height: 38rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.promote .user image {
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		margin-left: 8rpx;
		margin-right: 18rpx;
	}

	.promote .user .username {
		color: rgba(141, 141, 141, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.promote .money {
		display: flex;
		line-height: 64rpx;
		justify-content: space-between;
		margin-top: 16rpx;
	}

	.promote .money .money_user {
		display: flex;
		color: rgba(141, 141, 141, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		line-height: 64rpx;
	}

	.promote .money .money_user image {
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
		margin-right: 18rpx;
	}

	.promote .money .money_num {
		color: rgba(16, 16, 16, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.promote .money .money_num text {
		color: #1AD0C3;
	}

	.promote .fast {
		width: 180rpx;
		height: 54Rpx;
		line-height: 54rpx;
		border-radius: 12rpx;
		background-color: rgba(26, 208, 195, 100);
		color: #FFFFFF;
		font-size: 24rpx;
		text-align: center;
		font-family: Arial;
		border: 2px solid rgba(255, 255, 255, 100);
		margin-top: 34rpx;
	}

	.noMsg {
		width: 710rpx;
		height: 80vh;
		overflow: hidden;
	}

	.noYet {
		width: 300rpx;
		height: 350rpx;
		display: flex;
		flex-direction: column;
		text-align: center;
		margin-left: 205rpx;
		margin-top: 300rpx;
		color: rgba(141, 141, 141, 100);
	}

	.noMsg image {
		width: 300rpx;
		height: 300rpx;
		display: block;
	}

	.lasttime {
		display: flex;
	}

	.readtext {
		height: 38rpx;
		color: rgba(158, 157, 157, 100);
		font-size: 24rpx;
		font-family: PingFangSC-regular;
		margin-top: 16rpx;
	}
</style>
