<template>
	<view class="app">
		<view class="tinfo">
			<text>基本信息</text>
		</view>
		<view class="jbinfo">
			<view class="jbcontent">
				<view class="top">
					<view>
						<view style="margin-bottom: 20rpx;">
							上传营业执照
						</view>
						<view class="noimg" v-if="!imageflag" @click="uploadpic('self', 1,'logo')">
							<view class="noimgtext">+</view>
						</view>
						<image @click="uploadpic('self', 1,'logo')" v-if="imageflag" :src="logo" mode="">
						</image>
					</view>
				</view>

				<view class="button">
					<!-- <view class="bucontent">
						<view class="borsld lh29">公司名字</view>
						<view class="h30 co888" style="margin-left: -4rpx;">
							<input v-model="companyname"  class="rightborsld h30 lh43 pl10"
							style="min-width: 374rpx;max-width: 374rpx;" placeholder="输入公司名字" type="text" />
						</view>
					</view> -->
					<view class="bucontent">
						<view class="borsld lh29">成立日期</view>
						<view class="uni-list-cell-db rightborsld w200 h30 lh30" style="margin-left: -4rpx;">
							<picker mode="date" :value="date" :start="startDate" :end="endDate"
								@change="bindDateChange($event,'成立日期')">
								<view class="uni-input ml11 co888">{{date}}</view>
							</picker>
						</view>
					</view>
					<view class="bucontent">
						<view class="borsld lh29">注册资本</view>
						<view class="h30" style="margin-left: -4rpx;">
							<view class="disflex co888">
								<input v-model="registeredAssets" placeholder-style="color: #888;" class="rightborsld w150 h30 lh30 pl10"
									type="number" />
								<text class="lh30 ml15">万人民币</text>
							</view>
						</view>
					</view>
					<view class="bucontent">
						<view class="borsld lh29">法定代表人</view>
						<view class="h30 co888" style="margin-left: -4rpx;">
							<input v-model="legalRepresentative" placeholder-style="color: #888;" class="rightborsld w100 h30 lh30 pl10" type="text" />
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tinfo">
			<text>登记信息</text>
		</view>
		<view class="rginfo">
			<view class="rgcontent">
				<view class="left">
					统一社会信用代码
				</view>
				<view class="right lh43">
					<view class="h30 co888">
						<input v-model="identityCard" class="rightborsld h30 lh43 pl10"
							style="min-width: 374rpx;max-width: 374rpx;" placeholder-style="color: #888;" placeholder="输入社会信用码" type="text" />
					</view>
				</view>
			</view>
			<view class="rgcontent">
				<view class="left">
					登记机关
				</view>
				<view class="right lh43">
					<view class="h30 co888">
						<input v-model="registrationAuthority" class="rightborsld h30 lh43 pl10"
							style="min-width: 374rpx;max-width: 374rpx;" placeholder="输入登记机构" type="text" />
					</view>
				</view>
			</view>
			<view class="rgcontent">
				<view class="left ">
					核准日期
				</view>
				<view class="right">
					<view class="uni-list-cell-db rightborsld h30 lh30" style="min-width: 394rpx;max-width: 394rpx;">
						<picker mode="date" :value="appdate" :start="startDate" :end="endDate"
							@change="bindDateChange($event,'核准日期')">
							<view class="uni-input ml11 co888">{{appdate}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="rgcontent">
				<view class="left ">
					企业类型
				</view>
				<view class="right lh43">
					<view class="h30 co888">
						<input v-model="enterpriseType" class="rightborsld h30 lh43 pl10"
							style="min-width: 374rpx;max-width: 374rpx;" placeholder-style="color: #888;" placeholder="输入企业类型" type="text" />
					</view>
				</view>
			</view>
			<view class="rgcontent">
				<view class="left ">
					营业期限
				</view>
				<view class="right disflex">
					<view class="uni-list-cell-db rightborsld h30 lh30" style="min-width: 200rpx;max-width: 200rpx;">
						<picker mode="date" :value="condate" :start="startDate" :end="endDate"
							@change="bindDateChange($event,'从日期')">
							<view class="uni-input co888 textc">{{condate}}</view>
						</picker>
					</view>
					<view class="h30 lh30 ml10 mr10">
						至
					</view>
					<view class="uni-list-cell-db rightborsld h30 lh30" style="min-width: 200rpx;max-width: 200rpx;">
						<picker mode="date" :value="daodate" :start="startDate" :end="endDate"
							@change="bindDateChange($event,'到日期')">
							<view class="uni-input co888 textc">{{daodate}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="rgcontent">
				<view class="left ">
					注册地址
				</view>
				<view class="right lh33">
					<view class="h30 co888">
						<input v-model="registeredAddress" class="rightborsld h30 lh43 pl10"
						placeholder-style="color: #888;" style="min-width: 374rpx;max-width: 374rpx;" placeholder="输入注册地址" type="text" />
					</view>
				</view>
			</view>
			<view class="rgcontent">
				<view class="left">
					经营范围
				</view>
				<view class="right">
					<view class="co888">
						<textarea v-model="businessScope" class="rightborsld h174 pl10"
							style="min-width: 374rpx;max-width: 374rpx;" placeholder-style="color: #888;" placeholder="输入经营范围" type="text" />
					</view>
				</view>
			</view>
		</view>
		<view class="tinfo">
			<text>荣誉展示</text>
		</view>
		<view class="iminfo">
			<view class="imcontent" v-if="visitingLbsUrl" v-for="(item,index) in visitingLbsUrl" :key="index">
				<view class="img"  @click="uploadpic('self', 3,'wdnm',index)" style="position: relative;" v-if="item.isDel == 0">
					<image :src="item.honorUrl"></image>
					<view @click.stop="delImg(index)"
						style="width: 48rpx;height: 48rpx;position: absolute;right: 0;top: 0;">
						<image :src="lajiton" style="height: 48rpx;width: 48rpx;"></image>
					</view>
				</view>

			</view>
			<view class="imcontent" v-if="num < 3">
				<view class="img" @click="uploadpic('self', 3,'honorlist')">
					<view class="w100p h100p bge8" style="border: 1rpx transparent solid;">
						<view class="textc" style="margin:130rpx auto;">
							<image :src="tup" style="height: 48rpx;width: 48rpx;"></image>
							<view style="color:#A09D9D">点击上传图片</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<div class="disflex fs18 textc lh49 fix_bottom">
			<span class="w100p bg_line_blue cfff" @click.stop="addhonor()">保存</span>
		</div>
	</view>
</template>

<script>
	import util from '@/utils/index'
	import WXAJAX from "@/utils/request";
	export default {
		data() {
			return {
				date: '选择日期' || currentDate, //选择日期
				imageflag: false,
				appdate: '选择日期' || approvalDate, //核准日期
				condate: '选择日期' || fromdate, //从什么时间开始
				daodate: '长期' || reachdate, //从什么时间结束
				honorimg: false,
				logo: '', //头像
				visitingLbsUrl: [], //上传图片
				registeredAssets: '', //注册资本
				legalRepresentative: '', //法定代表人
				identityCard: '', //统一社会信用代码(身份证)
				registrationAuthority: '', //登记机关
				enterpriseType: '', //企业类型
				registeredAddress: '', //注册地址
				businessScope: '', //经营范围
				qualificationCertNo: '', //资质证件号码
				companyname: '', //公司名称
				lajiton: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/binbox.png',
				tup: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/picupload.png',
				flag: true,
				num: 0,
				qualification:false,
			}
		},
		onShow() {
			if (this.flag) {
				this.gethonorinfo()
				this.flag = false
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			//上传图片
			addhonor() {
				// if(!this.companyname){
				// 	  wx.showToast({
				// 	    title: '请输入公司名称',
				// 	    duration: 1500,
				// 	    icon: 'none'
				// 	  });
				// 	  return
				// }
				console.log('dataaaaa', this.date)
				if (this.date == '选择日期') {
					wx.showToast({
						title: '请选择成立日期',
						duration: 1500,
						icon: 'none'
					});
					return
				}
				let data = {
					listCompanyHonor: this.visitingLbsUrl, //荣誉资质
					businessTermEnd: this.daodate, //营业期限到
					businessTermStart: this.condate, //营业期限从
					approvalDate: this.appdate, //核准日期
					establishedDate: this.date, //成立日期
					registeredAssets: this.registeredAssets, //注册资本
					legalRepresentative: this.legalRepresentative, //法定代表人
					identityCard: this.identityCard, //统一社会信用代码(身份证)
					registrationAuthority: this.registrationAuthority, //登记机关
					enterpriseType: this.enterpriseType, //企业类型
					registeredAddress: this.registeredAddress, //注册地址
					businessScope: this.businessScope, //经营范围
					qualificationCertNo: this.qualificationCertNo, //资质证件号码
					qualificationPhoto: this.logo, //头像
					tuplag: false,
				}

				console.log('这是data数据', data)
				WXAJAX.POST(data, '', '/companyQualification/add', '', '', 1).then(data => {
						let pages = getCurrentPages(); //获取所有页面栈实例列表
						let nowPage = pages[pages.length - 1]; //当前页页面实例
						let prevPage = pages[pages.length - 2]; //上一页页面实例
						uni.navigateBack({ //uni.navigateTo跳转的返回，默认1为返回上一级
							delta: 1
						});

					})
					.catch(err => {

					});

			},
			gethonorinfo() {
				let data = {
					companyId: wx.getStorageSync("COMPANYID"),
				}
				WXAJAX.POST(data, '', '/companyQualification/query', '', '', 1).then(data => {
						console.log('yyds', data)
						if (data) {
							// if( this.tuplag == true){
							this.visitingLbsUrl = data.listCompanyHonor || []
							this.num = data.listCompanyHonor.length
							// }
							this.qualification = data.qualification
							if(this.qualification == true){
								wx.setNavigationBarTitle({
									title: "编辑荣誉资料"

								})
							}
							if(this.qualification == false){
								wx.setNavigationBarTitle({
									title: "添加荣誉资料"

								})
							}
							this.daodate = data.businessTermStart //营业期限到
							this.condate = data.businessTermEnd //营业期限从
							this.appdate = data.approvalDate //核准日期
							this.date = data.establishedDate //成立日期
							this.registeredAssets = data.registeredAssets //注册资本
							this.legalRepresentative = data.legalRepresentative //法定代表人
							this.identityCard = data.identityCard //统一社会信用代码(身份证)
							this.registrationAuthority = data.registrationAuthority //登记机关
							this.enterpriseType = data.enterpriseType //企业类型
							this.registeredAddress = data.registeredAddress //注册地址
							this.businessScope = data.businessScope //经营范围
							this.qualificationCertNo = data.qualificationCertNo //资质证件号码
							this.logo = data.qualificationPhoto //头像
							if (data.qualificationPhoto) {
								this.imageflag = true
							}
						}
					})
					.catch(err => {

					});
			},
			async uploadpic(str, count, name,xb) {
				// if (name == 'logo') {
				// if (str == 'self' && this.logo.length >= count) {
				//   wx.showToast({
				//     title: '最多选择张！',
				//     duration: 1500,
				//     icon: 'none'
				//   });
				//   return
				// }
				// }


				let path = await util.chooseImage('file', count);
				if (Object.prototype.toString.call(path) !== '[object Array]') return;
				this.uploadImgFun(path, 0, str, name,xb)
			},
			// 递归上传
			async uploadImgFun(arr, index = 0, str, name,xb) {
				await this.uploadImg(arr[index], str, name,xb)
				if (index < arr.length - 1) {
					this.uploadImgFun(arr, index + 1, str)
				}
			},
			uploadImg(path, str, name,xb) {

				let v = this;
				wx.showLoading({
					mask: true
				});
				return WXAJAX.UploadImage(path).then((data) => {
					wx.hideLoading();
					data = JSON.parse(data);
					if (data.code == '200') {
						for (let i = 0; i < v.visitingLbsUrl.length; i++) {
							if (v.visitingLbsUrl[i].honorUrl == WXAJAX.imgBackUrl + data.data) {
								wx.showToast({
									title: '图片重复',
									icon: 'none'
								});
								return
							}
						}
						if(name == 'wdnm'){
							this.$set(this.visitingLbsUrl[xb], 'honorUrl', WXAJAX.imgBackUrl + data.data)
						}
						if (name == 'logo') {
							if (str == 'self') {
								this.logo = WXAJAX.imgBackUrl + data.data
								this.imageflag = true
							}
						}
						if (name == "honorlist") {
							if (str == 'self') {
								v.visitingLbsUrl.push({
									"honorUrl": WXAJAX.imgBackUrl + data.data,
									"isDel": 0
								});
								console.log('图片list', v.visitingLbsUrl)
								this.num += 1
							}
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
				// this.visitingLbsUrl.splice(index, 1);
				this.$set(this.visitingLbsUrl[index], 'isDel', 1)
				this.num -= 1
				wx.hideLoading();
			},
			bindDateChange(e, name) {
				console.log(e, name)
				if (name == '成立日期') {
					this.currentDate = this.getDate({
						format: true
					})
					this.date = e.target.value
				}
				if (name == '核准日期') {
					this.approvalDate = this.getDate({
						format: true
					})
					this.appdate = e.target.value
				}
				if (name == '从日期') {
					this.fromdate = this.getDate({
						format: true
					})
					this.condate = e.target.value
				}
				if (name == '到日期') {
					this.reachdate = this.getDate({
						format: true
					})
					this.daodate = e.target.value
				}

			},
			//得到日期
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style scoped>
	.app {
		width: 100%;
		background-color: #F3F3F3;
	}

	.app .tinfo {
		margin: 0 40rpx 0 40rpx;
		height: 64rpx;
		color: #A09D9D;
	}

	.tinfo text {
		line-height: 64rpx;
		font-size: 28rpx;
	}

	/* 基本信息 */
	.jbinfo {
		background-color: #fff;
		width: 100%;
	}

	.jbcontent {
		margin: 0 40rpx 0 40rpx;
		padding: 26rpx 0 26rpx 0;
	}

	.jbcontent .top {
		display: flex;
	}

	.noimg {
		min-width: 162rpx;
		max-width: 162rpx;
		height: 142rpx;
		border: 1px #bbb solid;
		border-radius: 16rpx;
	}

	.noimgtext {
		text-align: center;
		line-height: 132rpx;
		color: #A09D9D;
		font-size: 48rpx;
	}

	.jbcontent .top image {
		min-width: 162rpx;
		max-width: 162rpx;
		height: 142rpx;
	}

	.jbtext {
		line-height: 112rpx;
		margin-left: 24rpx;
	}

	.jbtext input {
		margin-top: 36rpx;
	}

	.jbcontent .button {
		margin-top: 40rpx;
	}

	.bucontent {
		width: 100%;
		display: flex;
	}

	.borsld {
		width: 180rpx;
		color: #A09D9D;
		text-align: left;
	}

	.rightborsld {
		border: 1px #888 solid;
		border-radius: 16rpx;
	}

	.bucontent:nth-child(n+1) {
		margin-top: 40rpx;
	}

	/* .jbcontent .button text {
		width: 220rpx;
		color: #A09D9D;
		display: inline-block;
		text-align: center;
	} */

	/* 登记信息 */
	.rginfo {
		background-color: #fff;
		width: 100%;
	}

	.rgcontent {
		margin: 0 40rpx 0 40rpx;
		padding: 26rpx 0 26rpx 0;
		display: flex;
	}

	.rgcontent .left {
		min-width: 112rpx;
		max-width: 112rpx;
		color: rgba(160, 157, 157, 96);
		font-size: 28rpx;
	}

	.rgcontent .right {
		margin-left: 68rpx;
		color: #101010;
	}

	/* 荣誉图 */
	.iminfo {
		background-color: #fff;
		width: 100%;
	}

	.imcontent {
		margin: 0 40rpx 0 40rpx;
		padding: 26rpx 0 26rpx 0;
	}

	.imcontent:last-child {
		margin: 0 40rpx 0 40rpx;
		padding: 26rpx 0 130rpx 0;
	}

	.imcontent .img {
		width: 672rpx;
		height: 404rpx;
		margin-top: 40rpx;
	}

	.imcontent .img image {
		width: 100%;
		height: 100%;

	}

	.co888 {
		color: #888;
	}
</style>
