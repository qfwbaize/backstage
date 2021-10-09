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
				<view class="list" v-for="(item,index) in meAccurateUserinfo" :key="index"
					@click="toArticleDetail(item)">
					<!-- type 1 是文章 三是转载 6是视频 -->
					<view class="title">
						<text>
              <text v-show="item.type==1||item.type==3">文章</text>
              <text v-show="item.type==6">视频</text>
              <text v-show="item.type==4">文件</text>
            题目：{{item.title}}</text>
						<image
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/accurate.png"
							mode="">
						</image>
					</view>
					<view class="time">发布时间：{{item.time}}</view>
					<view class="user">
						<view class="to">发给谁：</view>
						<view class="userimg">
							<image :src=item.toUserLogo mode=""></image>
						</view>
						<view class="username">{{item.toUserName}}</view>
						<view :class="item.rewardStatus == 3 ? 'state' : 'changebg' ">
							{{item.rewardStatus == 3 ?'已完成':'未完成'}}
						</view>
					</view>
					<view class="answer">
						<view class="accuracy">最低答题分数：{{item.lowestAnswerScore}}</view>
						<view class="answer_time">最低阅读时间：{{item.lowestReadTime}}秒</view>
					</view>
					<view class="reward">设置奖励：{{item.preciseRewardAmount}}元</view>
				</view>
				<!-- 暂无信息 -->
				<view class="noMsg" v-if="meAccurateUserinfo.length == 0">
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
				<view class="received" v-for="(item,index) in accurateMeUserinfo" :key="index"
					@click="toArticleDetail(item)">
					<view class="userinfo">
						<view class="userinfo_img">
							<image :src=item.fromUserLogo mode=""></image>
						</view>
						<view class="userinfo_name">{{item.fromUserName}}</view>
					</view>
					<view class="userinfo_text">
						<text>
              <text v-show="item.type!=6">文章</text>
              <text v-show="item.type==6">视频</text>
            题目：{{item.title}}</text>
						<image
							src='https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/accurate.png'
							mode="">
						</image>
					</view>
					<view class="userinfo_text">发布时间：{{item.time}}</view>
					<view class="userinfo_text">题目数量：{{item.dynamicQuestionCount}}</view>
					<view class="userinfo_text">奖励：{{item.preciseRewardAmount}}元</view>
					<view class="userinfo_text">要求阅读时间：{{item.lowestReadTime}}秒</view>
					<view :class="item.rewardStatus == 3 ? 'active':'complete'">
						{{item.rewardStatus == 3 ? '已完成' :'未完成'}}
					</view>
					<view class="forward_read">点击阅读</view>
				</view>
				<!-- 暂无信息 -->
				<view class="noMsg" v-if="accurateMeUserinfo.length == 0 ">
					<view class="noYet">
						<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png"
							mode="">
						</image>
						<view class="">暂无信息</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import WXAJAX from "@/utils/request";
	export default {
		data() {
			return {
				pageNum: 1,
				pageSize: 10,
				activeIndex: 0,
				meAccurateUserinfo: [], //精准我发的
				accurateMeUserinfo: [], //精准发给我的
				open: false
			}
		},
		onShow() {
			this.meAccurate()
			this.accurateMe()
		},
		onPullDownRefresh() {
			this.pageNum = 1
			this.meAccurate()
			this.accurateMe()
		},
		onReachBottom() {
			if (this.open == false) {
				uni.showLoading()
				this.pageNum += 1
				this.meAccurate()
				this.accurateMe()
				uni.hideLoading()
			}

		},
		methods: {
			//头部选项卡
			change(index) {
				this.activeIndex = index
			},

			//精准详情
			toArticleDetail(item) {
        let url='';
				if(item.type == 1 || item.type == 3){
					url = '../../companyPack/find/dynamicDetail/main?dynamicId=' + item.dynamicId + '&insideShareId=' +
						item.shareId + '&preciseId=' + item.preciseId;
				}

        if(item.type == 4){
        	url = '../../companyPack/library/details?dynamicId=' + item.dynamicId + '&insideShareId=' +
        		item.shareId + '&preciseId=' + item.preciseId;
        }

				if(item.type == 6){

          url = '../../companyPack/videodetails/videodetails?dynamicId=' + item.dynamicId + '&insideShareId=' + item.shareId + '&preciseId=' + item.preciseId + '&companyId=' + item.companyId + '&videoId=' + item.shortVideoId || item.VideoId;
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
			//精准我发的
			meAccurate() {
				var data = {
					pageNum: this.pageNum,
					// pageSize: this.pageSize
				}
				WXAJAX.POST(data, '', '/precise/record/list/preciseDynamic', '', '', 1).then(res => {
					if (res !== undefined) {
						if (this.pageNum == 1) {
							this.meAccurateUserinfo = res.list
						} else {
							this.meAccurateUserinfo = [...this.meAccurateUserinfo, ...res.list]
						}
						for (var i = 0; i < this.meAccurateUserinfo.length; i++) {
							this.meAccurateUserinfo[i]['time'] = this.meAccurateUserinfo[i].createTimeStr.split(
								' ')[0]
						}
						if (res.list.length < this.pageSize) {
							this.open = true
						} else {
							this.open = false
						}
					}
				})
			},
			//精准我收到的
			accurateMe() {
				var data = {
					pageNum: this.pageNum,
					// pageSize:this.pageSize
				}
				WXAJAX.POST(data, '', '/precise/record/list/preciseMyDynamic', '', '', 1).then(res => {
					if (res !== undefined) {
						if (this.pageNum == 1) {
							this.accurateMeUserinfo = res.list
							console.log('勇敢牛牛不怕困难', this.accurateMeUserinfo)
						} else {
							this.accurateMeUserinfo = [...this.accurateMeUserinfo, ...res.list]
						}
						for (var i = 0; i < this.accurateMeUserinfo.length; i++) {
							this.accurateMeUserinfo[i]['time'] = this.accurateMeUserinfo[i].createTimeStr.split(
								' ')[0]
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
