<template>
	<div style="background-color: #FFFFFF;">
		<view class="" style="margin-left: 30rpx;font-weight: bold;font-size: 28rpx;padding-top: 40rpx;">
			草稿({{length}})</view>
		<view v-for="(item,index) in articles" :key="index" class="w345 h118 disflex  m0auto b1s mt20 jsaround"
			style="justify-content: space-between;">
			<div class="w215 h118 "
				style="display: flex;flex-direction: column;justify-content: space-between;margin-left: 30rpx;">
				<div class="fs14 mt15" style="width: 430rpx;overflow: hidden;
        text-overflow: ellipsis;display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2;">{{item.title}}
				</div>
				<div class='fs12 '>{{item.name}}</div>
				<div class="fs12 " style="color: #8B8B8B ;margin-bottom: 20rpx;">{{item.createTimeStr}}</div>
			</div>
			<div class="w75  h118 " style="margin-right:30rpx;">
				<image class="w75 h76 mt10" style="" :src="item.photos" mode=""></image>
				<image @click="popup(index)" class="w24 h24  dra"
					src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riFill-more-fill Copy@3x.png"
					mode="">
				</image>
			</div>
		</view>
		<!-- 弹窗 -->
		<div v-if="active == true">
			<div class="Mask" @click="Maskes"></div>
			<div class="draftDiv">
				<div class="w345 h90  disflex m0auto jsaround mt20 ">
					<div class=" w250 h90">
						<div class="fs14">{{draft.title}}</div>
						<div class="fs12 mt20">{{draft.name}}</div>
					</div>
					<div class="w75 h90">
						<image class="w75 h75" :src="draft.photos" mode=""></image>
					</div>
				</div>
				<div class=" w345 h60 disflex jsbet mt20 m0auto">
					<div class="w155 h60 b1s fs14 textc lh60" @click="edit(draft.dynamicId)">
						<image class="w24 h24"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/antFill-edit.svg"
							mode=""></image>
						继续编辑
					</div>
					<div class="w155 h60 b1s fs14 textc lh60" @click="draftdel(draft.dynamicId)">
						<image class="w24 h24"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/haFill-26-trash-can.svg"
							mode="">
						</image>
						删除文章
					</div>
				</div>
				<div class=" disflex jsaround mt20 w345 h60 b1s fs14 m0auto">
					<div class="lh60">
						<image class="w24 h24"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/antFill-edit.svg"
							mode=""></image>
						是否上架
					</div>
					<div class="mt10">
						<view class="uni-padding-wrap uni-common-mt">
							<view>
								<!-- <switch checked @change="switch1Change" /> -->
								<switch @change="switch2Change(draft.dynamicId,draft.isOrgShow)" :checked="draft.checked" />
							</view>
						</view>
					</div>
				</div>

        <div class=" disflex jsaround mt20 w345 h60 b1s fs14 m0auto" @click="getinstitutions(draft)">
        	<div class="lh60">
        		<image class="w24 h24"
        			src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riFill-mail-send-fill.svg" mode=""></image>
        		投稿到其他机构文库
        	</div>
        	<div class="mt10">
        		<view class="uni-padding-wrap uni-common-mt">
        			<view>
        			</view>
        		</view>
        	</div>
        </div>

        <!-- <view class="grounding" style="margin-bottom: 5px;" @click="getinstitutions(conlist)">
        	<image class="contribute" v-show="treatmentStatu.checked == false "
        		src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riFill-mail-send-fill.svg"
        		mode=""></image>

        	<image class="contribute" v-show="treatmentStatu.checked == true"
        		src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/contribute.png"
        		mode=""></image>
        	<view class="" style="color: #101010;font-size: 14px;">投稿到其他机构文库</view>
        </view> -->
			</div>
		</div>
		<div v-if="videoflg" class="textc lh42 fs12 ca8 bgf5f6" style="width: 100%;margin-top: 20rpx;">- 到底了，看看其他的吧 -
		</div>
	</div>
</template>

<script>
	import WXAJAX from "@/utils/request";
	export default {
		data() {
			return {
				isShow: false,
				isDrafts: 1,
				pageNum: 1,
				articles: [],
				draft: [],
				active: false,
				dynamicId: 0,
				treatmentStatu: {
					checked: false
				},
				length: 0,
				lastPage: '',
				videoflg: false,
        list_index:'',
			}
		},
		onLoad() {
			wx.setNavigationBarTitle({
				title: "草稿箱"
			});
			this.getlist()


		},
		async onPullDownRefresh() {
			// 下拉刷新
			this.pageNum = 1
			this.getlist();
		},
		onReachBottom() {
			if (this.pageNum < this.lastPage) {
				this.pageNum += 1
				this.getlist();
			} else {
				this.videoflg = true
			}
		},
		methods: {
			edit(id) {
				// 	pages/article/editArticle/main
				this.dynamicId = id
				wx.navigateTo({
					url: '../../article/editArticle/main?dynamicId=' + this.dynamicId
				})
			},
			// 是否上架
			switch2Change(id,isOrgShow) {
				// console.log(id,item);
				this.dynamicId = id
				this.treatmentStatu.checked = !this.treatmentStatu.checked
				// console.log(this.treatmentStatu.checked, 'qweqedqwdcasda');

				if (this.treatmentStatu.checked == true) {
					WXAJAX.POST({
						dynamicId: this.dynamicId,
						isDrafts: 0,
						isOrgShow: isOrgShow,
					}, '', '/dynamic/editDynamicInfo', '', '', 1).then(res => {
						uni.showToast({
							title: '文章已上架',
							duration: 2000,
							icon: 'none',
						});
            this.articles.splice(this.list_index,1)
            this.active=false
					})
				}
				if (this.treatmentStatu.checked == false) {
					WXAJAX.POST({
						dynamicId: this.dynamicId,
						isDrafts: 1,
						isOrgShow: 0,
						isLibrary: isOrgShow
					}, '', '/dynamic/editDynamicInfo', '', '', 1).then(res => {
						uni.showToast({
							title: '文章已下架',
							duration: 2000,
							icon: 'none',
						});
					})

				}
				// this.getlist()

			},
			// 删除事件
			draftdel(id) {
				this.dynamicId = id
				let v = this
				uni.showModal({
					title: '提示',
					content: '确定删除该文章',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							WXAJAX.POST({
								dynamicId: v.dynamicId,
							}, '', '/company/delDynamicInfo').then((data) => {
								wx.showToast({
									title: '删除成功！',
									icon: 'success'
								});
								v.active = false
								v.getlist()
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
      getinstitutions(com) {
      	let dynamicId = com.dynamicId
      	let companyId = com.companyId
      	let saveType = 1
      	let type = com.type
      	wx.navigateTo({
      		url: '../dyamicManage/institutions?&saveType=1&type=' + type + "&companyId=" + companyId + "&dynamicId=" + dynamicId
      	})
      },
			Maskes() {
				this.active = false
			},
			popup(index) {
        this.list_index=index
				this.draft = this.articles[index]
				this.active = true
			},
			// 获取数据
			getlist() {
				WXAJAX.POST({
					isDrafts: this.isDrafts,
					pageNum: this.pageNum,
					type: 1
				}, '', '/dynamic/listMyDynamic', '', '', 1).then(res => {
					// console.log(res.list.length ,'213123123123123123123');
					// this.articles = res.list
					this.length = res.list.length
					this.lastPage = res.lastPage
					this.essay = res.total
					this.onlinot = res.list.isDrafts
					if (this.pageNum == 1) {
						this.articles = res.list
					} else {
						this.articles = [...this.articles, ...res.list];
					}
				})
			}
		}
	}
</script>

<style>
	.dra {
		margin-top: 10rpx;
		margin-left: 80rpx;

	}

	.w75 {
		width: 150rpx;
	}

	.h75 {
		height: 150rpx;
	}

	.b1s {
		box-shadow: 0px 2px 6px 0px rgba(167, 225, 221, 100);
		border: 1px solid rgba(255, 255, 255, 100);
		border-radius: 6px;
	}

	.Mask {
		position: fixed;
		top: 0rpx;
		width: 100%;
		height: 60%;
		background-color: black;
		opacity: 0.38;
		z-index: 999;
	}

	.draftDiv {
		position: fixed;
		bottom: 0rpx;
		z-index: 9999;
		width: 100%;
		height: 702rpx;
		background-color: white;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
	}
</style>
