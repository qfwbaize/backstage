<template>
	<view class="app" v-if="wdnm">
		<view v-if="qualification">
		<view class="tinfo">
			<text>基本信息</text>
		</view>
		<view class="jbinfo">
			<view class="jbcontent">
				<view class="top">
					<image v-if="companyLogo"
						:src="companyLogo"
						mode="">
					</image>
					<image v-if="!companyLogo"
						src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/photo/20210618/9beeabd8eef94bda13ffb016f1321c1f.jpg"
						mode="">
					</image>
					<text class="jbtext">{{companyName}}</text>
				</view>
				<view class="button">
					<view>
						<text>成立日期</text>
						<text class="mt13">{{establishedDate}}</text>
					</view>
					<view>
						<text>注册资本</text>
						<text class="mt13">{{registeredAssets}}万人民币</text>
					</view>
					<view>
						<text>法定代表人</text>
						<text class="mt13">{{legalRepresentative}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="tinfo">
			<text>登记信息</text>
		</view>
		<view class="rginfo">
			<view class="rgcontent">
				<view class="left h43">
					统一社会信用代码
				</view>
				<view class="right lh43">
					{{identityCard}}
				</view>
			</view>
			<view class="rgcontent">
				<view class="left">
					登记机关
				</view>
				<view class="right">
					{{registrationAuthority}}
				</view>
			</view>
			<view class="rgcontent">
				<view class="left">
					核准日期
				</view>
				<view class="right">
					{{approvalDate}}
				</view>
			</view>
			<view class="rgcontent">
				<view class="left">
					企业类型
				</view>
				<view class="right">
					{{enterpriseType}}
				</view>
			</view>
			<view class="rgcontent">
				<view class="left">
					营业期限
				</view>
				<view class="right">
					{{businessTermStart}} 至 {{businessTermEnd}}
				</view>
			</view>
			<view class="rgcontent">
				<view class="left">
					注册地址
				</view>
				<view class="right">
					{{registeredAddress}}
				</view>
			</view>
			<view class="rgcontent">
				<view class="left">
					经营范围
				</view>
				<view class="right">
					{{businessScope}}
				</view>
			</view>
		</view>
		<view class="tinfo">
			<text>荣誉展示</text>
		</view>
		<view class="iminfo">
			<view class="imcontent1">
				<view class="img" v-for="(item,index) in listCompanyHonor" :key="index">
					<image :src="item.honorUrl"></image>
				</view>

			</view>
		</view>
		<view class="tinfo" v-if="qualificationPhoto">
			<text>营业执照</text>
		</view>
		<view class="iminfo">
			<view class="imcontent">
				<view class="img">
					<image :src="qualificationPhoto"></image>
				</view>
			</view>
		</view>
			
		</view>
		<div class="disflex fs18 textc lh49 fix_bottom" v-if="qualification">
			<span class="w100p bg_line_blue cfff" @click.stop="page_turn()">编辑荣誉资质</span>
		</div>
		<div class="disflex fs18 textc lh49 fix_bottom" v-if="!qualification">
			<span class="w100p bg_line_blue cfff" @click.stop="page_turn()">添加荣誉资质</span>
		</div>
	</view>
</template>

<script>
	import util from '@/utils/index'
	import WXAJAX from "@/utils/request";
	export default {
		data() {
			return {
				establishedDate: '', //成立时间
				approvalDate: '', //核准时间
				businessTermStart: '', //营业期限
				businessTermEnd: '', //结束营业期限
				listCompanyHonor: [], //上传图片
				registeredAssets: '', //注册资本 
				legalRepresentative: '', //法定代表人
				identityCard: '', //统一社会信用代码(身份证)
				registrationAuthority: '', //登记机关
				enterpriseType: '', //企业类型
				registeredAddress: '', //注册地址
				businessScope: '', //经营范围
				qualificationCertNo: '', //资质证件号码
				companyName: '', //公司名称
				qualificationPhoto: '', //营业执照
				wdnm: true,
				companyLogo:'',//公司logo
				qualification:false,
			}
		},
		onLoad() {},
		onShow() {

			this.gethonorinfo()

		},
		methods: {
			page_turn() {
				wx.navigateTo({
					url: './edithonor'
				})
			},
			gethonorinfo() {
				let data = {
					companyId: wx.getStorageSync("COMPANYID"),
				}
				WXAJAX.POST(data, '', '/companyQualification/query', '', '', 1).then(data => {
						console.log('yyds', data)
						this.wdnm = false
						this.$nextTick(function() {
							this.wdnm = true
							if (data) {
								this.companyLogo = data.companyLogo
								this.qualification = data.qualification
								
								this.establishedDate = data.establishedDate
								this.approvalDate = data.approvalDate
								this.businessTermStart = data.businessTermStart
								this.businessTermEnd = data.businessTermEnd
								this.listCompanyHonor = data.listCompanyHonor
								this.registeredAssets = data.registeredAssets
								this.legalRepresentative = data.legalRepresentative
								this.identityCard = data.identityCard
								this.registrationAuthority = data.registrationAuthority
								this.enterpriseType = data.enterpriseType
								this.registeredAddress = data.registeredAddress
								this.businessScope = data.businessScope
								this.qualificationCertNo = data.qualificationCertNo
								this.companyName = data.companyName
								this.qualificationPhoto = data.qualificationPhoto
							}
						})
					})
					.catch(err => {

					});
			},
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

	.jbcontent .top image {
		width: 122rpx;
		height: 112rpx;
	}

	.jbtext {
		line-height: 112rpx;
		margin-left: 24rpx;
	}

	.jbcontent .button {
		margin-top: 40rpx;
		display: flex;
		justify-content: space-between;
	}

	.jbcontent .button text {
		width: 220rpx;
		color: #A09D9D;
		display: inline-block;
		text-align: center;
	}

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
		margin-left: 42rpx;
		color: #101010;
	}

	/* 荣誉图 */
	.iminfo {
		background-color: #fff;
		width: 100%;
	}

	.imcontent {
		margin: 0 40rpx 0 40rpx;
		padding: 26rpx 0 130rpx 0;
	}
	.imcontent1 {
		margin: 0 40rpx 0 40rpx;
		padding: 26rpx 0 26rpx 0;
	}
	.imcontent1 .img {
		width: 672rpx;
		height: 404rpx;
		margin-top: 40rpx;
	}
	
	.imcontent1 .img image {
		width: 100%;
		height: 100%;
	
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
</style>
