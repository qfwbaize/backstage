<template>
	<div>
		<!--top-->
		<div class="disflex jsbet bgfff lh30 pl16 pr15 pt5 pb5">
			<div class="bgf5f6 bradius17 disflex pl15 flex1">
				<span></span>
				<input type="text" v-model="key" @focus="onFocus" @change="changedFn" class="pha8 fs14 lh34 h34 w100p"
					:placeholder="ph">
			</div>
			<span class="fs16 cblue lh34 pl15" @click="searchItem">搜索</span>
		</div>
		<scroll-view :style="{height: scrollContentHeight+'px'}" class="bgfff lh44 fs14 c38" :scroll-y="true"
			:enable-back-to-top="true" :scroll-anchoring="true" @scrolltolower="scrolltolower">
			<!-- <div v-for="(item , index) in lists" :key="item.visitingInfoTemplateId" class="pl25"> -->
			<div v-for="(item , index) in lists" :key="index" class="pl25">
				<div class="disflex jsbet" @click="choose_item(item)">
					<span class="fs12">{{item.templateTitle || item.visitingContent }}</span>
					<div class="h16" style="position: absolute;right: 75rpx;" @click.stop="edit(item)">编辑</div>
					<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/del.png" alt=""
						class="w16 h16" @click.stop="del(item)" style="margin-top: 26rpx;margin-right: 23rpx;" />
				</div>
			</div>
		</scroll-view>
	</div>
</template>

<script>
	import amapFile from '../../../libs/amap-wx.js'
	import util from '@/utils/index'
	import WXAJAX from '../../../utils/request'
	import Citys from '../../../libs/choose-city'

	export default {
		name: '',
		components: {},
		data() {
			return {
				showCreateCopmany: true,
				choose: {
					title: '',
					addr: '',
					lat: '',
					lng: '',
				},
				myAmapFun: '',
				Mc: '',
				page: 1,
				lists: [],
				ph: '',
				activeitem: '当前定位',
				reset: '重新定位',
				type: '',
				key: '',
				scrollContentHeight: 0, //中间滚动区域的高度
			}
		},
		async mounted() {
			let a = await util.systemIfo();
			let navHeight = getApp().globalData.navHeight;
			this.scrollContentHeight = a.windowHeight-15.7;
			// this.scrollContentHeight='100';
		},
		onShow() {
			this.init();
		},

		async onPullDownRefresh() {
			this.init();

			setTimeout(() => {
				wx.stopPullDownRefresh();
			}, 1.5 * 1000)
		},
		watch: {
			'key': function(newVal, oldVal) {
				if (newVal) {
					this.showCreateCopmany = false;
					this.searchItem(newVal);
				} else {
					this.lists = [];
					this.showCreateCopmany = true;
				}
			}
		},
		computed: {},
		methods: {
			scrolltolower() {
				this.page = this.page + 1;
				this.init();
			},
			onFocus() {
				// if (this.type == 'company') {
				//   this.showCreateCopmany = false;
				//   this.searchItem();
				// }
			},
			init() { //获取lists列表
				let v = this,
					url = '/visitingInfoTemplate/queryList';
				let params = {
					pageNum: v.page,
					pageSize:14,
					visitingType: 1,
				}
				WXAJAX.POST(params, '', url, '', '', '1').then((data) => {
					if (v.page == 1) {
						v.lists = data.list;
					} else {
            if(data.list){
              v.lists = v.lists.concat(data.list);
            }
						
					}
					console.log("v.lists", v.page, v.lists);

				}).catch((err) => {

				})
				console.log('lists', this.lists);
			},
			searchItem() { //搜索
				let v = this
				WXAJAX.POST({
					templateTitle: v.key,
					pageNum: v.page,
					visitingType: 1,
				}, '', '/visitingInfoTemplate/queryList', '', '', '1').then((data) => {
					this.lists = data.list ? data.list : [];
				}).catch((err) => {})
			},
			over() {
				wx.setStorageSync("choose_company", this.key);
				wx.navigateBack()
			},
			choose_item(item) { //选择
				wx.setStorageSync("visitingInfoTemplateId", item.visitingInfoTemplateId);
				wx.navigateBack()
				return;
			},
			edit(item) {
				wx.navigateTo({
					url: `../editTemplete/main?visitingInfoTemplateId=` + item.visitingInfoTemplateId
				})

			},
			del(item) {
				let v = this
				WXAJAX.POST({
					visitingInfoTemplateId: item.visitingInfoTemplateId,
				}, '', '/visitingInfoTemplate/del', '', '', '1').then((data) => {
					v.init()
				}).catch((err) => {

				})
				// 删除后重新调取接口刷新页面数据
				this.init()
			}
		}
	}
</script>

<style>
	page {
		background: #fff;
	}

	.create-company {
		height: calc(100vh - 150upx);
	}

	.create-company>div>.create-company-btn {
		background: linear-gradient(90deg, rgba(118, 218, 217, 1), rgba(81, 205, 204, 1));
		transform: translateX(-50%);
	}
</style>
