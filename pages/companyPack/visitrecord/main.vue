<template>
	<!-- <div class="share-records-content"> -->
	<div class="item ">
		<scroll-view :style="{height: scrollContentHeight+'px'}" class="dynamic-content" :scroll-y="true"
			:enable-back-to-top="true" :scroll-anchoring="true" @scrolltoupper='scrolltoupper'
			@scrolltolower="scrolltolower">
			<div class="item-box bgfff" v-for="info in shareData" :key="info.visitingInfoId"
				@click="detail(info.visitingInfoId)">
				<div class="middle flex-base pl15 pr15" v-if="info.visitingPurpose">
					<div class="content pl15" style="padding-left: 0rpx;">
						<p class="fs14 c38 title over_1">
							拜访目的：{{ info.visitingPurpose }}
						</p>
					</div>
				</div>
				<div class="flex-base bottom h44 pl15 pr15">
					<div class="flex-base">
						<span class="fs12 ca8">拜访内容：{{ info.visitingContent }}</span>
					</div>
				</div>
				<div class="flex-base bottom h44 pl15 pr15">
					<div class="flex-base">
						<span class="fs12 ca8">时间:{{ info.visitingTimeStr }}</span>
					</div>
				</div>
			</div>
		</scroll-view>
		<div class="isboss-btn" @click="createRecord">新增拜访</div>
		<!-- <div class="textc disflex w60 h60 bradius50p bgblue disinblock goToUserCenter" @click="exportlist">
          <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/user_add.png" alt="" class="w30 h30 mt15">
        </div> -->
	</div>

	<!-- </div> -->

</template>
<script>
	import {
		mapMutations
	} from "vuex";
	import util from '@/utils/index';
	import WXAJAX from "@/utils/request";
	export default {
		data() {
			return {
				time: "",
				screen: wx.getStorageSync("isBoss"),
				status: 2,
				maskShow: false,
				contact: '',
				list: [],
				visitingId: '',
				shareData: '',
				page: 1,
				choose_tabs_id: '',
				scrollContentHeight: 0,
				customerList: [],
			};
		},
		watch: {},
		mounted() {
			var info = this.info
		},
		onReachBottom() {

		},
		async mounted() {
			let a = await util.systemIfo();
			let navHeight = getApp().globalData.navHeight;
			this.scrollContentHeight = a.windowHeight;
		},
		onShow() {
			this.page = 1
		},
		onLoad(option) {
			console.log("option", option)
			this.visitingId = option.visitingId;
			this.customerList = [option.intervieweeCardId, option.intervieweeName, option.intervieweePhone, option
				.intervieweeCompanyName, option.intervieweePosition
			];
			this.choose_tabs_id = option.choose_tabs_id;

			this.page = 1;
			this.getlist(this.page);
		},
		methods: {
			createRecord() {

				wx.setStorageSync("customerList", this.customerList)
				// console.log(this.customerList)
				// this.customerList = [id,name,phone,companyName,position]
				wx.navigateTo({
					url: "../addVisit/main?"
				});
			},
			getlist(page) {

				let url = '/visitingInfo/queryList';
				let params = {
					pageSize: 10,
					pageNum: page,
					visitingId: this.visitingId,
					visitingType: 1,
					intervieweeName: '',
					intervieweePhone: '',
					intervieweeCardId: '',
				};

				if (this.screen) {
					url = '/visitingInfo/queryListCompany'

					params = {
						cardId: this.choose_tabs_id ? this.choose_tabs_id : '',
						pageSize: 10,
						pageNum: page,
						visitingId: this.visitingId,
						visitingType: 1,
						intervieweeName: '',
						intervieweePhone: '',
						intervieweeCardId: '',
					}
				}
				console.log('params', params);
				WXAJAX.POST(params, '', url, '', '', 1).then(data => {
					if (this.page === 1) {
						this.shareData = data.list || [];
					} else {
						this.shareData = [...this.shareData, ...data.list] || [];
					}
					this.list = data.list;
					console.log(this.shareData, 77777777)
				});
			},
			detail(visitingInfoId) {
				wx.navigateTo({
					url: '../visitdetail/main?visitingInfoId=' + visitingInfoId
				})
			},
			exportlist() { //导出PDF文档
				wx.showLoading();
				// wx.hideLoading();
				let cardId = this.choose_tabs_id ? this.choose_tabs_id : '';
				console.log({
					srcPath: 'http://test1.mingyicloud.com/card/record2.html?visitingId=' + this.visitingId +
						'&token=' + wx.getStorageSync('token') +
						'&screen=' + this.screen +
						'&cardId=' + cardId +
						'&visitingType=1',
					destPath: '1.pdf',
				})
				WXAJAX.POST({
					srcPath: 'http://test1.mingyicloud.com/card/record2.html?visitingId=' + this.visitingId +
						'&token=' + wx.getStorageSync('token') +
						'&screen=' + this.screen +
						'&cardId=' + cardId +
						'&visitingType=1',
					destPath: '1.pdf',
				}, '', '/htmlToPdf/htmlToPdf', '', '', 1).then(data => {
					wx.downloadFile({
						url: data, //仅为示例，并非真实的资源
						success(res) {
							wx.hideLoading();
							console.log(res);
							const filePath = res.filePath || res.tempFilePath
							wx.showToast({
								title: '导出成功',
								icon: 'success',
								duration: 1000
							})
							wx.openDocument({
								filePath,
								fileType: 'pdf',
								success: function(res) {
									console.log('打开文档成功')
								}
							})
						}
					})
				});
			},
			// exportlist(){//导出execl文档
			//   let page=this.page
			//   let url='/visitingInfo/exportMyVisitingInfoListExport'
			//   // if(this.status==2){
			//   //   url="/userAccount/exportMyAccountDetailsListExport"

			//   WXAJAX.POST({
			//     pageSize:10,
			//     pageNum:page,
			//     visitingId:this.visitingId,
			//     visitingType:1,
			//     intervieweeName:'',
			//     intervieweePhone:'',
			//     intervieweeCardId:'',
			//   }, '', url,'','',1).then(data => {
			//     wx.downloadFile({
			//       url: data, //仅为示例，并非真实的资源
			//       success (res) {
			//         console.log(res);
			//         const filePath = res.filePath || res.tempFilePath
			//         wx.showToast({
			//         title: '导出成功',
			//         icon: 'success',
			//         duration: 1000
			//         })
			//         wx.openDocument({
			//           filePath,
			//           fileType: 'xlsx',
			//           success: function (res) {
			//             console.log('打开文档成功')
			//           }
			//         })
			//       }
			//     })
			//   });
			// },
			//下拉刷新
			scrolltoupper() {
				this.page = 1;
				this.getlist(this.page);
			},
			//上拉加载更多
			scrolltolower() {
				this.page++;
				this.getlist(this.page);
			},
		}
	};
</script>
<style scoped>
	.goToUserCenter {
		position: fixed;
		right: 20upx;
		bottom: 102upx;
		z-index: 99;
		box-sizing: border-box;
		text-align: center;
	}

	.share-records {
		display: flex;
		flex-direction: column;
		position: relative;
		width: 100%;
		height: 92rpx;
	}

	.share-records-top {
		width: 100%;
		height: 88upx;
		display: flex;
		position: fixed;
		top: 0;
		justify-content: space-around;
		font-size: 32upx;
		color: #787878;
		background: #FFFFFF;
		align-items: center;
	}

	.select {
		box-sizing: border-box;
		padding-top: 27upx;
		display: block;
		height: 88upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.select-line {
		display: block;
		width: 100%;
		height: 4upx;
		background-color: #51CDCB;
		position: absolute;
		bottom: 0;
	}

	.share-records-content {
		flex: 1;
		padding: 35upx 30upx 0 30upx;
	}

	.dropdown {
		width: 200upx;
		height: 60upx;
		background-color: #F5F5F6;
		border-radius: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28upx;
		color: #A8A8A8;
		font-size: 28upx;
		float: right;
	}

	.dropdown image {
		width: 20upx;
		height: 20upx;
		margin-left: 8upx;
	}

	.list {
		margin-top: 80upx;
	}

	.item {
		/* width: 690upx; */
	}

	.item-box {
		border-radius: 20upx;
		/* float: left; */
		margin-bottom: 20upx;
	}

	.flex-base {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.middle {
		align-items: flex-start;
		height: 60upx;
		align-items: center;
	}

	.title {
		width: 400rpx;
		height: 75upx;
		font-weight: 600;

	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		height: 36upx;
	}

	.bottom {
		border-top: 1upx solid #f8f8f8;
	}

	.btn-box {
		display: flex;
		align-items: center;
	}

	.skip-btn {
		height: 48upx;
		display: flex;
		align-items: center;
		border-radius: 6upx;
		font-size: 26upx;
		margin-right: 20upx;
		box-sizing: border-box;
		text-align: center;
		padding: 0 20upx 0 20upx;
	}

	.delete {
		border: 1upx solid #E8E8E8;
	}

	.visitor {
		border: 1upx solid #51CDCB;
	}

	.isboss-btn {
		height: 88upx;
		width: 100%;
		position: fixed;
		bottom: 0;
		border-top-right-radius: 10upx;
		border-top-left-radius: 10upx;
		z-index: 999;
		text-align: center;
		line-height: 88upx;
		font-size: 36upx;
		color: #FFFFFF;
		background: linear-gradient(90deg, #41DDA1, #2BCF88)
	}
</style>
