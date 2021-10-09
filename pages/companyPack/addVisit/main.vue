<template>
	<div class="create-task">
		<div class="content-wrap">
			<div class="target">
				<div class="title c38">
					<span class="bggreen"></span>
					拜访对象
					<p @click="toSelectpeople()" class="c78" style="margin-left: 300rpx;font-size: 28rpx;">选择客户</p>
				</div>
				<ul>
					<li>
						<div class="target-left c78 pr16 marks">
							姓名
						</div>
						<div class="target-right">
							<input class="c39" type="text" :value="name" @input="toname" placeholder="请输入客户名称">
						</div>
					</li>
					<li>
						<div class="target-left c78">
							联系方式
						</div>
						<div class="target-right">
							<input class="c39" type="number" :value="phone" @input="tophone" placeholder="请输入客户电话">
						</div>
					</li>

					<li>
						<div class="target-left c78 pr16 marks">
							所属单位
						</div>
						<div class="target-right">
							<input class="c39" type="text" :value="intervieweeCompany" @input="tointervieweeCompany"
								placeholder="请输入所属单位">
						</div>
					</li>
					<li>
						<div class="target-left c78 pr16 marks">
							单位性质/等级
						</div>
						<div class="target-right">
							<input class="c39" type="text" :value="intervieweeCompanyNature"
								@input="tointervieweeCompanyNature" placeholder="请输入单位性质/等级">
						</div>
					</li>
					<li>
						<div class="target-left c78">
							所属部门
						</div>
						<div class="target-right">
							<input class="c39" type="text" :value="intervieweeDepartment"
								@input="tointervieweeDepartment" placeholder="请输入所属部门">
						</div>
					</li>
					<li>
						<div class="target-left c78">
							客户职位
						</div>
						<div class="target-right">
							<input class="c39" type="text" :value="intervieweePosition" @input="tointervieweePosition"
								placeholder="请输入客户职位">
						</div>
					</li>
					<li>
						<div class="target-left c78 pr16 marks">
							产品名称
						</div>
						<div class="target-right">
							<input class="c39" type="text" :value="visitingProduct" adjust-position="false"
								@input="tovisitingProduct" placeholder="请输入产品名称">
						</div>
					</li>
				</ul>
			</div>
			<div class="target">
				<div class="title c38">
					<span class="bgblue"></span>
					拜访地点
				</div>
				<ul>
					<li>
						<!-- <li @click="page_tap('chooseAddr')"> -->
						<div class="target-left c78">
							地理位置
						</div>
						<div class="target-right" style="margin-top: -17rpx;">
							<input type="text" value="visitingAddr" class="pt15 w100p phe8 flex1 over_1" readonly
								disabled placeholder="请选择位置" v-model="visitingAddr"
								style="width: 400rpx;margin-top: -5rpx;text-align: right;margin-right: 5rpx;">
						</div>
					</li>
				</ul>
			</div>
			<div class="time">
				<div class="title c38">
					<span class="bgyellow"></span>
					拜访日期
				</div>
				<div class="content-bottom">
					<div class="content-bottom-left c78">
						时间
					</div>
					<div class="content-bottom-right c38">
						<input type="text" value="visitingTime" class="pt15 w100p phe8 flex1 over_1" readonly disabled
							v-model="visitingTime"
							style="width: 400rpx;margin-top: -5rpx;text-align: right;margin-right: 5rpx;">
						<!-- <datatimea :placeholder="visitingTime || '请选择日期'" @change="startEvent" :start="begin"></datatimea>
            <image class="w16 h16 mt2 ml7" :src="downImg"></image> -->
					</div>
				</div>
			</div>
			<div class="task-content" style="margin-top: 20rpx;">
				<div class="title c38">
					<span class="bg38"></span>
					拜访内容
					<div style="color: red;">*</div>
					<p @click="toSelectTemplete()" class="c78" style="margin-left: 300rpx;font-size: 28rpx;">选择模板</p>
				</div>
				<div class="content">
					<textarea maxlength="-1" placeholder="请输入拜访内容" @input="toVisitingContent" :value="visitingContent"
						style="width: 100%;" />
				</div>
			</div>
			<div class="task-content" style="margin-top: 20rpx;">
				<div class="title c38">
					<span class="bgeee"></span>
					拜访目的
					<!-- <div style="color: red;">*</div> -->
				</div>
				<div class="content ">
					<textarea maxlength="-1" placeholder="请输入拜访目的" @input="toVisitingPurpose" :value="visitingPurpose"
						style="width: 100%;" />
				</div>
			</div>
			<div class="task-content" style="margin-top: 20rpx;">
				<div class="title c38">
					<span class="bg55"></span>
					拜访结果
				</div>
				<div class="content">
					<textarea maxlength="-1" placeholder="请输入拜访结果" @input="toVisitingResult" :value="visitingResult"
						style="width: 100%;" />
				</div>
			</div>
			<div class="task-content" style="margin-top: 20rpx;">
				<div class="title c38">
					<span class="bga8"></span>
					跟进计划
				</div>
				<div class="content ">
					<textarea maxlength="-1" placeholder="请输入跟进计划" @input="toVisitingPlan" :value="visitingPlan"
						style="width: 100%;" />
				</div>
			</div>
			<div class="target">
				<div class="title c38">
					<span class="bgblue"></span>
					上传图片
				</div>
				<div class="content" style="margin-bottom: 120rpx;">
					<div class="disflex wrap">
						<div class="bgfff bdash_a8 w100 h100 mr7 mb7 posre" v-for="(v,k) in visitingLbsUrl" :key="k">
							<img :src="v" alt="" class="w100p h100p" mode="aspectFill">
							<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/del.png"
								alt="" class="w20 h20 posab right2 top2" @click="delImg(k)">
						</div>
						<div class="bgfff bdash_a8 w100 h100 add_img mr7 mb7" @click="uploadpic('self', 3)">
						</div>
					</div>
				</div>
			</div>
		</div>
		<BottomButtonTwo :left="bottom.left" :right="bottom.right" @page_turn="page_turn"></BottomButtonTwo>
		<view class='toast-box' v-if="isShowConfirm" catchtouchmove="preventTouchMove" style="z-index: 99;">
			<view class='toastbg'></view>
			<view class='showToast'>
				<view class='toast-title'>
					<text>输入模板标题</text>
				</view>
				<view class='toast-main'>
					<view class='toast-input'>
						<input type='text' v-model="templateTitle" catchtouchmove="preventTouchMove">
					</view>
				</view>
				<view class='toast-button'>
					<view class='button1'>
						<button @click='balanceisshow'>取消</button>
					</view>
					<view class='button2'>
						<button @click='savetemplate'>确定</button>
					</view>
				</view>
			</view>
		</view>
	</div>
</template>

<script>
	import BottomButtonTwo from '@/components/bottom_button_two'
	import WXAJAX from '../../../utils/request.js';
	import datatimea from '../../../components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
	import {
		mapStates,
		mapMutations
	} from 'vuex'
	import util from '../../../utils/index'
	import amapFile from '@/libs/amap-wx.js'
	export default {
		data() {
			return {
				isShowConfirm: false, //控制余额充值模块显隐
				downImg: WXAJAX.imgBackUrl + '/product-index/icon_right-s.png',
				//type 用来分辩到底是创建还是修改任务
				type: '',
				myAmapFun: '',
				locat: {
					city: '成都',
					addr: '',
					lat: '',
					lng: '',
				},
				visitingId: 0,
				visitingType: 1,
				visitingTime: '',
				visitingPurpose: '',
				visitingContent: '',
				visitingResult: '',
				visitingLbsUrl: '',
				visitingAddr: '',
				visitingAddrInfo: '',
				visitingPlan: '',
				templateTitle: '', //模板标题
				name: '',
				phone: '',
				customerInfo: '',

				intervieweeCompany: '', //公司
				intervieweePosition: '', //职位
				visitingProduct: '', //产品名称
				intervieweeDepartment: '', //受访人所属部门
				intervieweeCompanyNature: '', //受访机构性质或等级

				staffid: '',
				selectInfo: '',
				begin: '2020-5-21 14:39',
				userId: wx.getStorageSync('userId'),
				address: '',
				visitingLbsUrl: [], //个人图片
				customerInfo: [],
				bottom: {
					left: {
						text: '另存为模板',
						url: 'template'
					},
					right: {
						text: '保存',
						url: 'save'
					}
				},
			}
		},
		components: {
			datatimea,
			BottomButtonTwo
		},
		onLoad() {

			this.companyId = wx.getStorageSync('COMPANYID')
			this.type = 1
			this.taskCustomerId = wx.getStorageSync('COMPANYID')
		},
		watch: {
			//判断是否为编辑任务，1为创建，2为编辑
			type(newVal, oldVal) {
				if (newVal == 1) {

				} else {
					this.isLoading = true;
					this.getQueryMyTaskDetail()
				}
			},
		},
		onShow() {
			this.myAmapFun = new amapFile.AMapWX({
				key: 'e11026819b6d300fda6a2c680fbd2fef'
			})
			this.getlocation();

			let nowDate = new Date()

			let date = {
				year: nowDate.getFullYear(),
				month: nowDate.getMonth() + 1,
				date: nowDate.getDate()
			}
			console.log("date", date);
			if (date.month < 10) {
				date.month = '0' + date.month
			}
			if (date.date < 10) {
				date.date = '0' + date.date
			}
			this.visitingTime = date.year + '-' + date.month + '-' + date.date;
			// if(wx.getStorageSync('VisitAddr')){
			//   this.visitingAddr=wx.getStorageSync('VisitAddr');
			//   this.visitingAddrInfo=wx.getStorageSync('district');

			//   wx.setStorageSync('VisitAddr','');
			//   wx.setStorageSync('full_address','');
			//   wx.setStorageSync('district','');
			// }


			this.staffid = this.$store.state.staffId
			if (wx.getStorageSync('customerList')) { //获取客户信息
				this.customerInfo = wx.getStorageSync('customerList');
				this.name = this.customerInfo[1]
				this.phone = this.customerInfo[2]
				this.intervieweeCompany = this.customerInfo[3]
				this.intervieweePosition = this.customerInfo[4]
				this.intervieweeCompanyNature = this.customerInfo[5]
				this.intervieweeDepartment = this.customerInfo[6]
				wx.setStorageSync('customerList', '');
			}

			if (wx.getStorageSync('visitingInfoTemplateId')) {
				this.getVisitingInfoTemplate();
			}
		},
		mounted() {

		},
		methods: {
			getVisitingInfoTemplate() { //获取模板信息并渲染
				let v = this

				WXAJAX.POST({
					visitingInfoTemplateId: wx.getStorageSync('visitingInfoTemplateId')
				}, '', '/visitingInfoTemplate/query', '', '', '1').then((data) => {
					v.visitingContent = data.visitingContent
					v.visitingPlan = data.visitingPlan
					v.visitingPurpose = data.visitingPurpose
					v.visitingResult = data.visitingResult
					v.visitingProduct = data.visitingProduct
					// v.intervieweeCompanyNature=data.intervieweeCompanyNature
					// v.intervieweeDepartment=data.intervieweeDepartment
				}).catch((err) => {

				})

				wx.removeStorageSync('visitingInfoTemplateId')
			},
			getlocation() { //获取经纬度
				wx.showLoading({
					title: '定位中...',
					mask: true
				});
				var v = this;
				uni.getLocation({
					type: 'gcj02',
					success: function(res) {
						v.locat.lat = res.latitude;
						v.locat.lng = res.longitude;

						v.getLocal();
						wx.hideLoading();
					},
					fail: function(err) {
						wx.hideLoading();
						wx.showToast({
							title: JSON.stringify(err),
							icon: 'none',
							duration: 2000
						})
					},
					complete: function() {
						wx.hideLoading();
					}
				})
			},
			getLocal(latitude, longitude) {

				let v = this;

				v.myAmapFun.getRegeo({
					location: '' + v.locat.lng + ',' + v.locat.lat + '', // location的格式为'经度,纬度'
					success: function(data) {
						let _address = data[0].regeocodeData.addressComponent,
							_neighborhood = _address.neighborhood,
							_street = _address.streetNumber;

						v.adcode = _address.adcode;
						if (_address.city.length) {
							v.locat.city = _address.city;
						} else {
							v.locat.city = _address.province;
						}
						if (_neighborhood && _neighborhood.name.length > 0) {
							v.visitingAddr = v.locat.city + _address.district + _neighborhood.name;
						} else {
							v.visitingAddr = v.locat.city + _address.district + _street.street + _street
							.number;
						}

					},
					fail: function(info) {
						v.visitingAddr = '重新定位';
						console.log(info)
					}
				})

			},

			getStartDate() {
				var thisDay = new Date();
				var year = thisDay.getFullYear();
				var month = thisDay.getMonth() + 1;
				var day = thisDay.getDate();
				var hh = thisDay.getHours();
				var mm = thisDay.getMinutes();
				var timer = year + "-";
				timer += month + "-";
				timer += day + ' '
				if (hh < 10)
					timer += "0";
				timer += hh + ":";
				if (mm < 10)
					timer += '0';
				timer += mm
				return timer
			},
			timestampToTime(timestamp) {
				var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
				var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
				var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
				return Y + M + D + h + m;
			},


			toSelectpeople() {
				var id = this.$store.state.companyId
				wx.navigateTo({
					url: `../selectpeople/main?id=${id}`
				})
			},
			toSelectTemplete() { //跳转选择模板页面
				wx.navigateTo({
					url: `../selectTemplete/main`
				})
			},
			resetAddr() { //获取经纬度
				wx.showLoading({
					title: '定位中...',
					mask: true
				});
				var v = this;
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						let latitude = res.latitude;
						let longitude = res.longitude;
						wx.chooseLocation({
							latitude,
							longitude,
							success: function(res) {
								v.visitingAddr = res.address
							}
						})
						wx.hideLoading();
					},
					fail: function(err) {
						v.isShowAuthorize = true;
						wx.hideLoading();

					},
					complete: function() {
						wx.hideLoading();
					}
				})
			},
			toVisitingPurpose(e) {
				this.visitingPurpose = e.detail.value
			},
			toname(e) {
				this.name = e.detail.value
			},
			tointervieweeCompany(e) {
				this.intervieweeCompany = e.detail.value
			},
			tointervieweeDepartment(e) {
				this.intervieweeDepartment = e.detail.value
			},

			tointervieweeCompanyNature(e) {
				this.intervieweeCompanyNature = e.detail.value
			},

			tointervieweePosition(e) {
				this.intervieweePosition = e.detail.value
			},
			tovisitingProduct(e) {
				this.visitingProduct = e.detail.value
			},
			// tovisitingProduct(e){
			//   this.visitingProduct = e.detail.value
			// },
			tophone(e) {
				this.phone = e.detail.value
			},
			async uploadpic(str, count) {
				let a = this.card_msg;
				if (str == 'self' && this.visitingLbsUrl.length >= 3) {
					wx.showToast({
						title: '最多选择三张！',
						duration: 1500,
						icon: 'none'
					});
					return
				}
				let path = await util.chooseImage('file', count);

				if (Object.prototype.toString.call(path) !== '[object Array]') return;
				this.uploadImgFun(path, 0, str)
			},
			// 递归上传
			async uploadImgFun(arr, index = 0, str) {
				await this.uploadImg(arr[index], str)
				if (index < arr.length - 1) {
					this.uploadImgFun(arr, index + 1, str)
				}
			},
			uploadImg(path, str) {
				let v = this;
				wx.showLoading({
					mask: true
				});
				return WXAJAX.UploadImage(path).then((data) => {
					wx.hideLoading();
					data = JSON.parse(data);
					if (data.code == '200') {
						if (str == 'user') {
							v.$set(v.card_msg, 'picchecked', WXAJAX.imgBackUrl + data.data);
						} else if (str == 'self') {
							v.visitingLbsUrl.push(WXAJAX.imgBackUrl + data.data);
						}
					} else {
						wx.showToast({
							title: '网络异常',
							duration: 2000,
							icon: 'none'
						})
					}
				}).catch((err) => {
					wx.hideLoading();
					console.log('err -- ', err);
				})

			},
			delImg(index) { //删除图片
				wx.showLoading();
				this.visitingLbsUrl.splice(index, 1);
				wx.hideLoading();
			},
			page_tap(url) {
				wx.navigateTo({
					url: '../../' + url + '/main?type=1'
				})
				//type=1分辨地理位置不需要更新接口
			},
			toVisitingContent(e) {
				this.visitingContent = e.detail.value
			},
			toVisitingResult(e) {
				this.visitingResult = e.detail.value
			},
			toVisitingPlan(e) {
				this.visitingPlan = e.detail.value
			},
			startEvent(data) {
				console.log(data)
				this.visitingTime = data.fmt1
			},
			addcustomer() { //添加拜访客户
				this.isLoading = true;
				let that = this
				let intervieweeCardId = 0;
				if (this.staffid) {
					intervieweeCardId = this.staffid[0];
				} else {
					intervieweeCardId = 0;
				}
				let params = {
					intervieweeCardId: intervieweeCardId,
					intervieweeName: this.name,
					intervieweePhone: this.phone,
					intervieweeCompany: this.intervieweeCompany,
					intervieweePosition: this.intervieweePosition,
				}
				console.log('params', params)
				WXAJAX.POST(
					params,
					"",
					"/visiting/add", '', '', 1
				).then((data) => {
					that.visitingId = data.visitingId;
					that.getAddTaskCustomer();
				});

				this.isLoading = false;
				wx.hideLoading();
			},
			page_turn(method) {
				if (method == 'template') {
					this.isShowConfirm = true;
				} else {
					this.preservation();
				}
			},
			balanceisshow() { //切换显示隐藏
				let that = this
				that.isShowConfirm = !that.isShowConfirm
			},
			savetemplate() {
				if (this.templateTitle == '') {
					wx.showToast({
						title: '请输入标题',
						icon: 'none'
					})
					return;
				}
				wx.showLoading({
					mask: true
				})
				this.isLoading = true;

				let params = {
					templateTitle: this.templateTitle,
					visitingType: 1,
					visitingProduct: this.visitingProduct,
					visitingPurpose: this.visitingPurpose,
					visitingContent: this.visitingContent,
					visitingResult: this.visitingResult,
					visitingPlan: this.visitingPlan,
				}
				console.log(params);
				WXAJAX.POST(
					params,
					"",
					"/visitingInfoTemplate/add", '', '', 1
				);

				wx.showToast({
					title: '已成功！',
					duration: 2000
				})
				this.isShowConfirm = !this.isShowConfirm
				this.isLoading = false;
			},
			preservation() { //保存
				var that = this;
				if (this.name == '') {
					wx.showToast({
						title: '请填写拜访人姓名！',
						icon: 'none',
						duration: 2000
					})
					return false
				}
				if (this.intervieweeCompany == '') {
					wx.showToast({
						title: '请填写拜访人所属单位！',
						icon: 'none',
						duration: 2000
					})
					return false
				}

				if (this.visitingAddr == '') {

					wx.showToast({
						title: '拜访地点不能为空！',
						icon: 'none',
						duration: 2000
					})
					wx.getSystemInfo({
						success(res) {
							if (!res.locationEnabled) {
								wx.showToast({
									title: '请开启手机定位！',
									icon: 'none',
									duration: 2000
								})
							} else {
								that.myAmapFun = new amapFile.AMapWX({
									key: 'e11026819b6d300fda6a2c680fbd2fef'
								})
								that.getlocation();
							}
							console.log("是否开启定位", res.locationEnabled)
							console.log("微信是否可以定位", res.locationAuthorized)
						}
					})
					return false
				}
				if (this.visitingTime == '') {
					wx.showToast({
						title: '拜访时间不能为空！',
						icon: 'none',
						duration: 2000
					})
					return false
				}
				if (this.visitingContent == '') {
					wx.showToast({
						title: '请填写拜访内容！',
						icon: 'none',
						duration: 2000
					})
					return false
				}
				if (this.visitingProduct == '') {
					wx.showToast({
						title: '请填写产品名称！',
						icon: 'none',
						duration: 2000
					})
					return false
				}
				// if(this.name == '' ||this.phone == '' ||this.visitingTime == '' || this.visitingPurpose == '' || this.visitingContent == ''|| this.visitingResult == ''|| this.visitingLbsUrl == ''|| this.visitingAddr == ''|| this.visitingAddrInfo == ''){
				//   wx.showToast({
				//     title:'请将信息选填完整',
				//     icon:'none',
				//     duration:2000
				//   })
				//   return false
				// }
				this.addcustomer();

			},
			async getAddTaskCustomer() {

				wx.showLoading({
					mask: true
				})
				this.isLoading = true;
				let params = {
					visitingId: this.visitingId,
					visitingType: 1,
					visitingTime: this.visitingTime,
					visitingPurpose: this.visitingPurpose,
					visitingContent: this.visitingContent,
					visitingResult: this.visitingResult,
					visitingLbsUrl: this.visitingLbsUrl.toString(),
					visitingAddr: this.visitingAddr,
					visitingAddrInfo: this.visitingAddrInfo,
					visitingPlan: this.visitingPlan,
					intervieweeCompany: this.intervieweeCompany,
					visitingProduct: this.visitingProduct,
					intervieweePosition: this.intervieweePosition,
					intervieweeDepartment: this.intervieweeDepartment,
					intervieweeCompanyNature: this.intervieweeCompanyNature,
				}
				console.log(params);
				try {
					let data = await WXAJAX.POST(
						params,
						"",
						"/visitingInfo/add", '', '', 1
					);

					wx.showToast({
						title: '已成功！',
						duration: 2000
					})
					this.isLoading = false;
					setTimeout(function() {
						wx.navigateBack({
							delta: 1
						})
					}, 1000)
				} catch (error) {
					this.isLoading = false;
					wx.hideLoading();
					// console.log(".............", error);
				}
			}
		},
		destroyed() {
			this.$store.state.staffId = []
			this.$store.state.selectRecordsInfo = []

		}

	}
</script>

<style scoped>
	textarea {
		height: 160rpx;
	}

	.create-task {
		height: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	}

	.content-wrap {
		padding: 20upx 30upx 0 20upx;
		flex: 1;
		overflow: auto;
	}

	.task-content {
		background: #FFFFFF;
		border-radius: 20upx;
	}

	.title {
		font-size: 32upx;
		color: #383838;
		display: flex;
		align-items: center;
		padding: 0upx 30upx 0 30upx;
		height: 88upx;
		font-weight: bold;
		border-bottom: 1upx solid #F8F8F8;
	}

	.title span {
		width: 20upx;
		height: 20upx;
		margin-right: 17upx;
		border-radius: 50%;
	}

	.content {
		padding: 30upx 30upx 0 30upx;
		min-height: 140upx;
		font-size: 30rpx;
		/* height: 72upx; */
		line-height: 30rpx;
		overflow: hidden;
		border-bottom: 1upx solid #F8F8F8;
	}

	.content-bottom {
		height: 88upx;
		display: flex;
		padding: 0upx 30upx 0 30upx;
		justify-content: space-between;
		align-items: center;
		font-size: 28upx;
	}

	.content-bottom-right {
		display: flex;
	}

	.target {
		background: #FFFFFF;
		border-radius: 20upx;
		margin-top: 20upx;
	}

	.target ul {
		padding: 0 30upx;
		display: flex;
		flex-direction: column;
	}

	.target ul li {
		height: 88upx;
		font-size: 28upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.target ul li input {
		height: 100%;
		width: 200upx;
		margin-right: 5upx;
	}

	.target-right {
		display: flex;
	}

	.time {
		background: #FFFFFF;
		border-radius: 20upx;
		margin-top: 20upx;
	}

	.choice-article {
		width: 240upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: right
	}

	.confirm-btn {
		height: 98upx;
		line-height: 98upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 36upx;
		background: linear-gradient(90deg, rgba(118, 218, 217, 1), rgba(81, 205, 204, 1));
	}

	.numinput {
		padding-right: 32upx;
		text-align: right;
	}
</style>

<style scoped>
	/* 余额充值部分 */
	.toast-box {
		width: 100%;
		height: 100%;
		opacity: 1;
		position: fixed;
		top: 0px;
		left: 0px;
	}

	.toastbg {
		opacity: 0.2;
		background-color: black;
		position: absolute;
		width: 100%;
		min-height: 100vh;
	}

	.showToast {
		position: absolute;
		opacity: 1;
		width: 70%;
		margin-left: 15%;
		margin-top: 40%;
	}

	.toast-title {
		padding-left: 5%;
		background-color: #787878;
		color: white;
		padding-top: 2vh;
		padding-bottom: 2vh;
		border-top-right-radius: 16rpx;
		border-top-left-radius: 16rpx;
	}

	.toast-main {
		padding-top: 2vh;
		padding-bottom: 2vh;
		background-color: white;
		text-align: center;
	}

	.toast-input {
		margin-left: 5%;
		margin-right: 5%;
		border: 1px solid #ddd;
		padding-left: 2vh;
		padding-right: 2vh;
		padding-top: 1vh;
		padding-bottom: 1vh;
	}

	.toast-button {
		display: flex;
	}

	.button1 {
		width: 50%;
	}

	.button2 {
		width: 50%;
	}

	.button1 button {
		width: 100%;
		background-color: white;
		color: red;
		border-radius: 0rpx;
		border-bottom-left-radius: 16rpx;
	}

	.button2 button {
		width: 100%;
		background-color: white;
		color: black;
		border-radius: 0rpx;
		border-bottom-right-radius: 16rpx;
	}
</style>
