<template>
	<div>
    <!--搜索-->
    <div class="bgfff pl15 pb10 pr15 disflex">
      <div class="bgf5f6 bradius17 flex1 textc lh34 disflex align-cen pl25 search trans2 pr25"
           @click="search_focus"
      >
        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/search.png" style="flex: 0 0 32upx" alt="" class="w16 h16"/>
        <span class="searchText over_1" v-if="!isfocus">{{searchkey || '搜索姓名'}}</span>
        <input type="text" v-model="searchkey" placeholder="搜索姓名"
               class="ca8 fs14 lh34 h34 textl pl10 trans2 w100p"
               v-else
               :focus="isfocus"
               @blur="isfocus=false"
               @confirm="search_confirm">


      </div>
      <div class="filtrate"  @click="filtrate" v-if="editTab || isFilter">
        筛选
        <span>
          <img style="width:30upx;height:30upx;margin-top:10upx" :src="filter_select" />
        </span>
      </div>
      <div class="filtrate_selec" @click="filtrate" v-else>
        筛选
      <span>
        <img style="width:30upx;height:30upx;margin-top:10upx" :src="filter"/>
      </span>
      </div>

    </div>
		<!--选择类型-->
		<div class="disflex jsbet pl25 pr20 pt10 fs16 c78 client_type textc bgfff mb10">
			<div class="flex1 disflex jscen" v-for="(v,k) in client_menu" :key="k" @click="changeMenu(v.id)">
				<div :class="client_type == v.id ? 'active' : '' ">
					<p class="name">{{v.title}}</p>
					<p class="pt5 pb7 fs13 ca8">{{v.num}}</p>
				</div>
			</div>

		</div>

		<!--列表-->
		<div style="margin-bottom: 200rpx;" v-if="msglists.length > 0">
			<div v-for="(msgitem,k) in msglists" :key="k" class="mb10">
				<MsgBox :msg="msgitem" @row_tap="row_tap" :istel="true" :isShowFollow="true" :issppend_record="true"
					:istags="true">
				</MsgBox>
			</div>
			<!--bottom-->
			<div class="textc lh42 fs12 ca8 bgf5f6" v-if="nodata">- 到底了，看看其他的吧 -</div>
		</div>
		<div v-else>
			<NoData>
				暂无客户
			</NoData>
		</div>

		<!-- 添加-->
		<div class="user_add posfix disflex jscen align-cen" @click="clientAdd">
			<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/add_user.png" alt=""
				class="w30 h30" />
		</div>
    <!--遮罩-->
    <div class="choose_type">
      <ClientAddModal :status="editTab"
                      :tabs="tabs"
                      @modal_tab_tap="modal_tab_tap"
                      @modal_btn_tap="modal_btn_tap"
                      @closeModal="editTab = false"
      ></ClientAddModal>
    </div>
	</div>
</template>

<script>
	import ClientAddModal from '@/components/clientAddModal' // 订单项
	import MsgBox from '@/components/msgBox' // 订单项
	import SelectorOne from '@/components/selectorOne' // 订单项
	import DialogBox from '@/components/dialogBox' // 对话框
	import StaticResources from '@/components/StaticResources';
	import WXAJAX from '@/utils/request'
	import NoData from '@/components/noData'
	import {
		authSubscribeMessage,
		authArticleMessage
	} from '@/utils/auth.js'
	import {
		mapGetters
	} from 'vuex'

	export default {
		name: '',
		components: {
			ClientAddModal,
			MsgBox,
			SelectorOne,
			NoData,
			DialogBox,
			StaticResources
		},
		data() {
			return {
				isfocus: false,
				searchkey: '',
				modal_show: false,
				client_type: 1, //1---独占 ， 3 -- 成单 ， 2 -- 共享
				client_menu: [{
						title: '独占客户',
						id: '1',
						num: '0'
					},
					{
						title: '成单客户',
						id: '3',
						num: '0'
					},
					{
						title: '共享客户',
						id: '2',
						num: '0'
					},
					{
						title: '总客户池',
						id: '4',
						num: '0'
					},
				],
				typeMapping: {
					1: 0,
					2: 2,
					3: 1,
					4: 3,
				},
				nocard_show: false,
				msglists: [],
				chooseClassShow: false,
				prodClass: [{
						name: '添加客户',
						id: 'clientAdd'
					},
					{
						name: '添加跟进记录',
						id: 'editLog'
					},
				],
				page: 1,
				isLoading: false, //是否在加载
				nodata: false, //是否已经没有数据
				tabs: [],
				editTab: false,
				choose_tab: [{}, {}, {}],
				isBoss: false,
				isFilterClient: false,
				filter_select: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_filter_selected.png',
				filter: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_filter.png',
				labelIds: [],
			}
		},
		mounted() {
			wx.setNavigationBarTitle({
				title: "客户"
			});


		},
		/** tab点击 */
		onTabItemTap(item) {
			console.log(this)
			//订阅授权 信息相关
			authArticleMessage(this.subscriptionNew);
			// authSubscribeMessage(this.subscriptionNew);
		},
		onShow() {

			this.client_menu = [{
					title: '独占客户',
					id: '1',
					num: '0'
				},
				{
					title: '成单客户',
					id: '3',
					num: '0'
				},
				{
					title: '共享客户',
					id: '2',
					num: '0'
				},

			];
			let isBoss = wx.getStorageSync('isBoss') || false;
			this.isBoss = isBoss;
			if (isBoss && this.client_menu.length <= 3) {
				this.client_menu.push({
					title: '总客户池',
					id: '4',
					num: '0'
				});
			}
			this.msglists = [];

			this.nodata = false;
			this.msglists = [];
			this.page = 1;
			this.isLoading = false;
			this.nocard_show = false;
			this.getTabs();
			this.getCount();
		},
		async onPullDownRefresh() {
			// to doing..
			// 下拉刷新
			wx.showNavigationBarLoading();
			this.nodata = false;
			this.msglists = [];
			this.page = 1;
			this.isLoading = false;
			this.getCount();
			this.getClients();
			wx.stopPullDownRefresh();
			setTimeout(function() {
				wx.hideNavigationBarLoading();
			}, 300)
		},
		onReachBottom() {
			let v = this;
			v.getClients();
		},
		computed: {
			isFilter() {
				let len = this.choose_tab.filter(val => {
					return val.id || val.id === 0;
				}).length;

				return this.isFilterClient || (!!len && this.isFilterClient);
			},
			...mapGetters(["subscriptionNew"])
		},
		methods: {
			clientAdd() {

				wx.navigateTo({
					url: '../../../../companyPack/clientAdd/main'
				});
			},
			closeModel() {
				this.$set(this, 'chooseClassShow', false);
			},
			nocard_btn_tap(str) {
				console.log(str);
				if (str == 'save') {
					this.toCreatePage();
				}
				this.nocard_show = false;
			},
			search_focus() {
				this.isfocus = true;
			},
			getClients(labels) { //获取客户列表
				let v = this;
				if (v.isLoading) {
					wx.hideLoading();
					return
				}
				v.isLoading = true;
				wx.showLoading();

				// labels = labels || '' ;
				let labelIds = [];
				labels = v.choose_tab.forEach(function(i, k) {
					if (i.id) {
						labelIds.push(i.id);
					}
				});
				this.labelIds = labelIds
				WXAJAX.POST({
					customerState: this.client_type,
					pageNum: this.page,
					lableIds: labelIds.length ? labelIds : '',
					name: v.searchkey,
					type: 1,
				}, '', '/customer/getCustomer', "", "", "", "1").then((data) => {

					wx.hideLoading();
					if (data) {
						v.msglists = [...this.msglists, ...data];
						v.page++;
						setTimeout(function() {
							v.isLoading = false;
						}, 500);

					} else {
						setTimeout(function() {
							v.nodata = true;
							v.isLoading = false;
						}, 500);
					}

				}).catch((err) => {
					console.log(err);
					wx.hideLoading();
					v.msglists = [];

					if (err.code == 403) {
						this.nocard_show = true;
					}

					setTimeout(function() {
						v.isLoading = false;
					}, 500);
				});
			},
			getCount() { //获取用户统计数据
				WXAJAX.POST({
					ignore: true
				}, '', '/customer/countCustomer', "", "", "", "1").then((data) => {
					let v = this;

					v.client_menu.map(val => {
						v.$set(val, 'num', 0);
					});

					if (data) {
						data.forEach(function(i, k) {
							// if (i.customerState == 4 && !v.isBoss) return;

							v.$set(v.client_menu[v.typeMapping[i.customerState]], 'num', i.num || 0);
						})
					}
          this.getTabs();
					this.getClients();
				}).catch((err) => {
					console.log(err);
					if (err.code == 403) {
						this.nocard_show = true;
					}
					this.client_menu.map(val => {
						this.$set(val, 'num', 0);
					});
				});
			},
			getTabs() { //获取标签数据
				wx.showLoading();
				let v = this;
				WXAJAX.POST('', '', '/companyCustomerLable/getTree', "", "", "", "1").then((data) => {
					wx.hideLoading();
					if (data) {
						let datas = [];
						data.forEach(function(i1, k1) {
							datas.push({
								title: i1.lableName,
								id: i1.lableId,
								choose_id: 0,
								choose_title: '',
								child: [],
							});
							i1.lableResponses && i1.lableResponses.forEach(function(i2, k2) {
								datas[k1].child.push({
									id: i2.lableId,
									title: i2.lableName,
									color: i2.lableColor,
									labelId: 0
								})
							})

						});
						v.tabs = datas;
					}
					// this.getCount();

				}).catch((err) => {
					console.log(err);
					this.getCount();
					wx.hideLoading();
				});
			},
			filtrate() {
				this.editTab = !this.editTab;
			},
			btn_tap(method) { //编辑标签组
				wx.navigateTo({
					url: '../' + method + '/main'
				});
			},
			row_tap(cardId, userId, customerState, ascriptionName) { //选择客户
				// if(customerState == 1 && this.client_type == 4){
				//   uni.showToast({
				//     title:'该客户已被员工：'+ascriptionName+'独占！',
				//     duration: 2000,
				//     icon:'none',
				//   })
				//   return
				// }
				authSubscribeMessage(this.subscriptionNew);
				wx.navigateTo({
					url: `../clientList/clientDetail/main?cardId=${cardId}&userId=${userId}`
				});

			},
			choose_tap(url, name) {
				authSubscribeMessage(this.subscriptionNew);
				// this.choose_class_id = id;
				this.chooseClassShow = false;
				if (name == 'close' && url == '-1') return;
				if (url == 'clientAdd') {
					wx.setStorageSync('isClearClientInfo', true);
				}
				if (url == 'editLog') {
					wx.navigateTo({
						url: '../clientList/' + url + '/main'
					});
				} else {
					wx.navigateTo({
						url: '../' + url + '/main'
					});
				}
			},
			changeMenu(id) {
				authSubscribeMessage(this.subscriptionNew);
				this.client_type = id;
				this.msglists = [];
				this.page = 1;
				this.nodata = false;
				this.isLoading = false;
				this.getClients();
			},
			modal_tab_tap(index1, id, index2) { //点击标签弹框 tab
				authSubscribeMessage(this.subscriptionNew);
				this.$set(this.tabs[index1], 'choose_id', id);
				let item = this.tabs[index1].child[index2];
				this.$set(this.choose_tab[index1], 'id', id);
			},
			modal_btn_tap(method) { //点击标签弹框按钮
				authSubscribeMessage(this.subscriptionNew);
				if (method == 'reset') { //重置

					let v = this;

					v.tabs.forEach(function(item, index) {
						v.$set(v.tabs[index], 'choose_id', '');
					})
					this.choose_tab = [{}, {}, {}];
				} else if (method == 'confirm') { //确定

					this.editTab = false;

					let v = this,
						labelIds = [];
					v.choose_tab.forEach(function(i, k) {
						if (i.id) {
							labelIds.push(i.id);
						}
					});
					this.searchkey = '';
					this.msglists = [];
					this.page = 1;
					this.nodata = false;
					this.isLoading = false;
					this.isFilterClient = !!labelIds.length;
					this.getClients(labelIds);
				}
			},
			search_confirm() {
				if (!this.searchkey.trim()) {
					wx.showToast({
						title: '请输入搜索名字！',
						icon: 'none'
					});
					return
				}
				this.msglists = [];
				this.page = 1;
				this.nodata = false;
				this.isLoading = false;
				this.getClients();
			},
			exportlist() { //导出PDF文档
				wx.showLoading();

				let lableIds2 = this.labelIds.length ? this.labelIds : '';
				console.log({
					srcPath: 'http://test1.mingyicloud.com/card/customer/list.html?token=' + wx.getStorageSync(
							'token') + '&customerState=' + this.client_type + '&type=1' + '&labelIds=' +
						lableIds2 + '&name=' + this.searchkey,
					destPath: '1.pdf',
				})
				// wx.hideLoading();
				// return ;
				WXAJAX.POST({
					srcPath: 'http://test1.mingyicloud.com/card/customer/list.html?token=' + wx.getStorageSync(
							'token') + '&customerState=' + this.client_type + '&type=1' + '&labelIds=' +
						lableIds2 + '&name=' + this.searchkey,
					destPath: '1.pdf',
				}, '', '/htmlToPdf/htmlToPdf', '', '', 1, "1").then(data => {
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
			}
		},
	}
</script>

<style scoped>
	.goToUserCenter {
		position: fixed;
		right: 37upx;
		bottom: 166upx;
		z-index: 200;
		box-sizing: border-box;
		text-align: center;
	}

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

	.client_type .active {
		color: #51CDCB;
		border-bottom: 4upx solid #51CDCB;
	}

	.client_type .active p {
		color: #51CDCB;
	}

	.client_type .active .name {
		font-weight: bold;
	}

	.search {
		justify-content: center;
		transition: .2s;
	}

	.search.focus {
		justify-content: flex-start;
	}

	.search.focus input {
		width: auto;
	}

	.user_add {
		bottom: 150upx;
		right: 30upx;
		width: 120upx;
		height: 120upx;
		background: #51CDCB;
		border-radius: 50%;

	}

	.choose_type .tab_modal {
		top: 212upx;
		overflow: hidden;
		flex-flow: inherit;
		display: block;
	}

	.choose_type .tab_modal>div {
		width: 100%;
		padding-bottom: 0;
	}

	.choose_type .tab_modal.hidden {
		height: 0;
	}

	.choose_type .tab_modal .fix_bottom {
		position: unset;
	}
	.filtrate_selec {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100upx;
		height: 34upx;
		border-radius: 68upx;
		color: #A8A8A8;
		font-size: 28upx;
		margin-left: 21upx;
		padding: 20upx 30upx;
		background: rgba(245, 245, 246, 1);
	}

	.filtrate {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100upx;
		height: 34upx;
		border-radius: 68upx;
		color: #51CDCB;
		font-size: 28upx;
		padding: 20upx 30upx;
		margin-left: 21upx;
		background: #EDFAFA;
	}
</style>
