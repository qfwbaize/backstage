<template>
	<view class="content">
		<!-- 搜索框 -->
		<view class="search">
			<view class="searchicon">
				<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/greensearch.png" mode="">
				</image>
			</view>
      <input confirm-type="search" v-model="searchVal" type="text" placeholder-style=" color: #1EC4B9;" placeholder="搜索任务关键词"	 />
		</view>
		<!-- 导航栏 -->
		<view class="nav">
			<view class="navleft">
				<view :class="activeIndex == 0 ? 'active' : 'selectActive' " @click="activeIndex = 0">计次任务</view>
				<view :class="activeIndex == 1 ? 'active' : 'selectActive' " @click="activeIndex = 1">计时任务</view>
			</view>
			<view class="navtext" @click="toMetask">我的任务</view>
		</view>
		<!-- 页面主体 -->
		<view class="main" v-show="activeIndex == 0">

      <view class="screen">
          <view class="active">附近</view>
          <view class="active">城市</view>
          <view class="active">机构城市</view>
      </view>
      
			<view class="mainlist" @click="toTaskDetail(item.taskCustomerId,item.companyLogo,item.companyName,item)"
				v-for="(item,index) in taskArr" :key='index'>
				<view class="taskinfo">
					<view class="taskinfo_title">{{item.taskName}}</view>
					<view class="taskinfo_money">金额：{{item.rewardAmount}}元</view>

					<view class="taskinfo_status" v-show="item.taskState == 1">发布中</view>
					<view class="taskinfo_status" v-show="item.taskState == -1">已过期</view>
					<view class="taskinfo_status" v-show="item.taskState == 2">进行中</view>
					<view class="taskinfo_status" v-show="item.taskState == 3">已结束</view>
				</view>
				<view class="taskinfo_text">任务内容：{{item.taskContent}}</view>
				<view class="taskinfo_times">任务结束时间：{{item.finishTime}}</view>
				<view class="taskinfo_bottom">
					<view class="taskinfo_bottom_company">
						<image :src=item.companyLogo mode=""></image>
						<view class="taskinfo_bottom_companyname">{{item.companyName}}</view>
					</view>
					
				</view>
				<view class="opnetime">发布于{{item.releaseTime}}</view>
			</view>
			<view class="noMsg" v-show="taskInfo.length == 0">
        <view class="noYet">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png" mode="">
          </image>
          <view class="">暂无信息</view>
        </view>
      </view>
		</view>

		<view class="main" v-show="activeIndex == 1">
      <view class="screen">
          <view class="active">附近</view>
          <view class="active">城市</view>
          <view class="active">机构城市</view>
      </view>
      
      暂无信息</view>
		<view class="maincover" v-show="show == true" @click="off">
			<view class="covertask_pos">
				<view class="covertask_one" @click="toNewTask">发布计次任务</view>
				<view class="covertask_two" @click.stop="toTimeTask">发布计时任务</view>
			</view>
		</view>

		<view class="confirm-btn" @click="save">发布平台任务</view>

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
				show: false, //默认隐藏
				screenHight: 0,
				taskInfo: [],
				cardid: '',
				addOpen: false,
        searchVal:'',
			}
		},
		onShow() {
			this.taskList()
			this.cardid = uni.getStorageSync('cardId')
		},
		onPullDownRefresh() {
			this.pageNum = 1
			this.taskList()
		},
		onReachBottom() {
			if (this.addOpen == false) {
				uni.showLoading()
				this.pageNum += 1
				this.taskList()
				uni.hideLoading()
			}
		},
    computed:{
      taskArr:function(){
        var taskArr = this.taskInfo,
        searchVal = this.searchVal
        if(!searchVal){
          return taskArr
        }
        searchVal = searchVal.trim().toLowerCase()
        taskArr = taskArr.filter(function(item){
          if(item.taskName.toLowerCase().indexOf(searchVal) !== -1){
            return item
          }
        })
        return taskArr
      }
    },
		methods: {
			//跳转到计时任务
			toTimeTask() {
				uni.navigateTo({
					url:'/pages/demand/metering/metering'
				})
			},
      startsearch(e) {
      	this.searchVal = e.detail.value ? e.detail.value : '';
      	this.taskList();
      },
			//获取任务大厅列表
			taskList() {
				var params = {
          pageNum:this.pageNum,
          isTaskSala:1
        }
        // if (this.searchVal) {
        //    params.searchKey = this.searchVal;
        // }
        // this.taskInfo = []
				WXAJAX.POST(params, '', '/customerEssay/queryAllTaskCustomer', '', '', ).then(res => {
					if (this.pageNum == 1) {
						this.taskInfo = res.list
					} else {
            if(res.list){
              this.taskInfo = [...this.taskInfo, ...res.list]
            }

					}
					if (this.taskInfo.length < this.pageSize) {
						this.addOpen = true
					} else {
						this.addOpen = false
					}

					var year = ''
					var month = ''
					var day = ''
					if (res.list) {
						for (var i = 0; i < this.taskInfo.length; i++) {
							this.taskInfo[i].finishTime = this.taskInfo[i].startTimeStr.split(' 00')[0]
							year = this.taskInfo[i].createTimeStr.split(' ')[0].split('-')[0]
							month = this.taskInfo[i].createTimeStr.split(' ')[0].split('-')[1]
							day = this.taskInfo[i].createTimeStr.split(' ')[0].split('-')[2]
							this.taskInfo[i].releaseTime = year + '年' + month + ' 月' + day + '日'
						}
					}

				})


			},
			//跳转到发布任务页面
			toNewTask() {
				uni.navigateTo({
					url: '../newTask/newTask?taskType=2'
				})
			},
			toMetask() {
				uni.navigateTo({
					url: '../../spread/platform/platform?title=我的任务'
				})
			},
			//详情页面
			toTaskDetail(taskCustomerId, companyLogo, companyName, item) {
				if (item.userId == this.cardid) {
					uni.navigateTo({
						url: '/pages/demand/taskDetail/taskDetail?taskCustomerId=' + taskCustomerId +
							'&companyLogo=' + companyLogo + '&companyName=' + companyName
					})
				} else {
					uni.navigateTo({
						url: '../taskDetails/taskDetails?taskCustomerId=' + taskCustomerId + '&companyLogo=' +
							companyLogo + '&companyName=' + companyName
					})
				}
			},
			//头部选项卡功能
			changeActive(index) {
				this.activeIndex = index
			},
			//点击任意关闭
			off() {
				this.show = false
			},
			//发布任务
			save(e) {
        // this.show = true
				this.getAuthentication()
				// this.screenHight = (((e.detail.y * 2) - 330) / 2) + 'rpx'

			},
			// 获取认证信息
			getAuthentication() {
				var data = {
					ignore: true
				}
				WXAJAX.POST(data, '', '/company/getCompany', '', '').then(res => {
					this.isCompanyAuth = res.isCompanyAuth
					console.log(res.isCompanyAuth, "那时觉得今年");
					if (res.isCompanyAuth != 1) {
						uni.showModal({
							title: '认证功能',
							content: '浏览此页面需要先认证',
							cancelText: '返回首页',
							confirmText: '前往认证',
							success: function(res) {
								if (res.confirm) {
									let url =
										'H5/webView?H5title=申请认证&url=https://wx.mingyicloud.com/app/myy/certmgmt.nsf/personcertFXMopenformFxMcompanyIdFxm' +
										wx.getStorageSync('COMPANYID') + 'FxMidFxm3';
									wx.navigateTo({
										url: "/pages/" + url
									});
								} else if (res.cancel) {
									uni.navigateTo({
										url: '/pages/find/index'
									});
								}
							}
						});
					} else {
						this.show = true
					}
				})
			},

		}
	}
</script>

<style scoped>
	.content {
		width: 750rpx;
		/* height: 100vh; */
		position: relative;
		/* overflow: hidden; */
	}

	.search {
		width: 670rpx;
		height: 72rpx;
		border-radius: 30rpx;
		background-color: rgba(244, 255, 255, 100);
		color: rgba(30, 196, 185, 100);
		font-size: 28rpx;
		text-align: center;
		box-shadow: 0px 4rpx 12rpx 0px rgba(196, 241, 238, 100);
		font-family: Microsoft Yahei;
		margin-top: 14rpx;
		margin-bottom: 40rpx;
		display: flex;
		margin-left: 40rpx;
	}

	.searchicon {
		width: 48rpx;
		height: 48rpx;
		margin-top: 11rpx;
		margin-left: 46rpx;
	}

	.searchicon image {
		width: 100%;
		height: 100%;
	}

	.search input {
		width: 500rpx;
		height: 72rpx;
	}

	.nav {
		width: 670rpx;
		height: 52rpx;
		display: flex;
		justify-content: space-between;
		line-height: 52rpx;
		margin-left: 40rpx;
	}

	.navleft {
		display: flex;
	}

	.active {
		width: 116rpx;
		height: 52rpx;
		line-height: 52rpx;
		border-radius: 12rpx;
		background-color: rgba(3, 211, 197, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 24rpx;
		text-align: center;
		box-shadow: 0px 4rpx 12rpx 0px rgba(196, 241, 238, 100);
		font-family: Arial;
		margin-right: 16rpx;
	}

	.selectActive {
		width: 116rpx;
		height: 52rpx;
		line-height: 52rpx;
		border-radius: 12rpx;
		background-color: rgba(222, 222, 222, 100);
		color: rgba(139, 139, 139, 100);
		font-size: 24rpx;
		text-align: center;
		font-family: Arial;
		margin-right: 16rpx;
	}

	.navtext {
		width: 112rpx;
		height: 38rpx;
		color: rgba(30, 196, 185, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.main {
		width: 670rpx;
		margin-top: 40rpx;
		margin-left: 40rpx;
		padding-bottom: 100rpx;
	}

	.mainlist {
		width: 642rpx;
		height: 320rpx;
		line-height: 40px;
		border-radius: 12px;
		/* text-align: center; */
		background-color: #FFFFFF;
		padding: 14rpx;
		position: relative;
		margin-bottom: 104rpx;
	}

	.taskinfo {
		width: 100%;
		display: flex;
		justify-content: space-between;
		line-height: 46rpx;
	}

	.taskinfo_title {
		width: 288rpx;
		height: 46rpx;
		color: rgba(16, 16, 16, 100);
		font-size: 32rpx;
		text-align: left;
		font-family: PingFangSC-bold;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.taskinfo_money {
		/* width: 146rpx; */
		height: 38rpx;
		color: rgba(143, 143, 143, 100);
		font-size: 26rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.taskinfo_status {
		width: 96rpx;
		height: 42rpx;
		margin-top: 2rpx;
		line-height: 42rpx;
		border-radius: 12rpx;
		background-color: rgba(196, 241, 238, 100);
		color: rgba(1, 196, 161, 100);
		font-size: 24rpx;
		text-align: center;
		box-shadow: 0px 4rpx 12rpx 0px rgba(196, 241, 238, 100);
		font-family: Microsoft Yahei;
	}

	.taskinfo_text {
		width: 642rpx;
		height: 134rpx;
		color: rgba(143, 143, 143, 100);
		font-size: 28rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-top: 20rpx;
	}

	.taskinfo_bottom {
		width: 642rpx;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
	}

	.taskinfo_bottom_company {
		width: 450rpx;
		height: 48rpx;
		line-height: 48rpx;
		display: flex;
		margin-top: 30rpx;
	}

	.taskinfo_bottom_company image {
		width: 48rpx;
		height: 48rpx;
	}

	.taskinfo_bottom_companyname {
		width: 312rpx;
		height: 36rpx;
		color: rgba(143, 143, 143, 100);
		font-size: 24rpx;
		text-align: left;
		font-family: PingFangSC-regular;
		margin-left: 12rpx;
	}

	.taskinfo_time {
		width: 146rpx;
		height: 100rpx;
	}

	.taskinfo_time_text {
		height: 33rpx;
		line-height: 33rpx;
		color: rgba(143, 143, 143, 100);
		font-size: 20rpx;
	}

	.square {
		width: 10rpx;
		height: 10rpx;
		margin-right: 15rpx;
		border: 1px solid #c4f1ee;
		border-radius: 50%;
		display: inline-block;
	}

	.opnetime {
		position: absolute;
		bottom: -40rpx;
		height: 36rpx;
		color: rgba(181, 181, 181, 100);
		font-size: 24rpx;
		text-align: left;
		font-family: PingFangSC-regular;
	}

	.maincover {
		width: 750rpx;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.46);
		position: fixed;
		top: 0;
		left: 0;
	}

	.covertask_pos {
		width: 100%;
		margin-top: 350rpx;
	}

	.covertask_one {
		width: 670rpx;
		height: 150rpx;
		line-height: 150px;
		border-radius: 12rpx;
		text-align: center;
		background-color: #FFFFFF;
		margin-left: 40rpx;
	}

	.covertask_two {
		width: 670rpx;
		height: 150rpx;
		line-height: 150rpx;
		border-radius: 6px;
		text-align: center;
		background-color: #FFFFFF;
		margin-top: 30rpx;
		margin-left: 40rpx;
	}

	.confirm-btn {
		width: 100%;
		height: 98upx;
		line-height: 98upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 36upx;
		background-color: rgba(26, 208, 156, 100);
		position: fixed;
		bottom: 0;
	}

	.taskinfo_times {
		font-size: 28rpx;
		width: 642rpx;
		color: rgba(143, 143, 143, 100);
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
  .screen{
    display: flex;
    margin-bottom: 20rpx;
  }
</style>
