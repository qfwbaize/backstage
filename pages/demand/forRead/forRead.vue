<template>
	<view class="content">
		<!-- 阅读奖励 -->
		<view class="lists">
			<view class="list" v-for="(item,index) in meReadinfo" :key="index" @click="toArticleDetail(item)">
				<view class="title">
					<text>文章题目：{{item.title}}</text>
					<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/read.png" mode="">
					</image>
				</view>
				<view class="time">发布时间：{{item.time}}</view>
				<view class="user">
					<view class="to">文章作者：{{item.author}}</view>
					<view :class="item.rewardStatus == 3 ? 'state' : 'changebg' ">
						{{item.rewardStatus == 3 ?'已完成':'未完成'}}</view>
				</view>
				<view class="reward" style="margin-top: 0;">获得奖励：{{item.rewardAmount}}元</view>
			</view>
		</view>
		<!-- 暂无信息 -->
		<view class="noMsg" v-if="meReadinfo.length == 0">
			<view class="noYet">
				<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png" mode="">
				</image>
				<view class="">暂无信息</view>
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
				meReadinfo: [], //我阅读的
				open: false
			}
		},
		onShow() {
			this.meRead()
		},
		onPullDownRefresh() {
			this.pageNum = 1
			this.meRead()
		},
		onReachBottom() {
			if (this.open == false) {
				uni.showLoading()
				this.pageNum += 1
				this.meRead()
				uni.hideLoading()
			}

		},
		methods: {
			//阅读奖励详情
			toArticleDetail(item) {
        let url='';
				if (item.type == 1 || item.type == 3) {
					url = '../../companyPack/find/dynamicDetail/main?dynamicId=' + item.dynamicId;

				}
				if (item.type == 6) {
					url = '../../companyPack/videodetails/videodetails?dynamicId=' + item.dynamicId+ '&videoId=' + item.shortVideoId || item.VideoId;
				}

        wx.navigateTo({
        	url: url
        })
			},
			//我阅读的
			meRead() {
				var data = {
					pageNum: this.pageNum,
					// pageSize: this.pageSize
				}
				WXAJAX.POST(data, '', '/reader/record/list/readerDynamic', '', '', 1).then(res => {
					if (res !== undefined) {
						if (this.pageNum == 1) {
							this.meReadinfo = res.list
						} else {
							this.meReadinfo = [...this.meReadinfo, ...res.list]
						}
						for (var i = 0; i < this.meReadinfo.length; i++) {
							this.meReadinfo[i]['time'] = this.meReadinfo[i].createTimeStr.split(' ')[0]
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

	.noMsg {
		width: 750rpx;
		height: 80vh;
		overflow: hidden;
	}

	.noYet {
		width: 300rpx;
		height: 350rpx;
		display: flex;
		flex-direction: column;
		text-align: center;
		margin-left: 225rpx;
		margin-top: 300rpx;
		color: rgba(141, 141, 141, 100);
	}

	.noMsg image {
		width: 300rpx;
		height: 300rpx;
		display: block;
	}
</style>
