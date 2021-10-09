<template>
	<div>
		<view class="">
			选择联系人
		</view>
		<view v-for="(item,index) in list " :key="index">
			<div class="mt10 w90p h70  m0auto disflex jsaround bgfff" style="border-radius: 20rpx;" >
				<div class="w50 h45" style="margin-top: 25rpx;">
					<image class="w100p h100p" :src="item.logo" mode=""></image>
				</div>
				<div class="w50p ">
					<div class="fs14 mt10">{{item.name}}</div>
					<div class="fs14 mt10">{{item.companyName}}</div>
				</div>
				<div class="fs14 lh60 " @click="listeners(item.companyId,item.cardId)">
					投稿给TA
				</div>
			</div>
		</view>
	</div>
</template>
<script>
	import WXAJAX from "@/utils/request";
	export default {
		data() {
			return {
				name: "",
				list: '',
				dynamicId:''
			}
		},
		onLoad(option) {
			console.log(option, "奥术大师所多");
			this.dynamicId = option.dynamicId
		},
		onShow() {
			this.getlist()
		},
		methods: {

			getlist() {
				let v = this
				let url = "/ipa/selectIpaList"
				let data = {
					name: this.searchkey,
					pageNum: v.page
				}
				WXAJAX.POST(data, "", url, "1").then((res) => {
					// console.log(res.list,"联系人列表");
					this.list = res.list
					console.log(this.list, "联系人列表");

				})
			},
				// 复制/修改公司动态/文章
				// schedulingsApi/dynamic/copyDynamicInfo
				// 参数：{"dynamicId": "文章id", "companyId": "公司ID", "createUserId": "名片ID"}
			listeners(companyId,createUserId){
				let url = "/dynamic/copyDynamicInfo"
				let data = {
					dynamicId:this.dynamicId,
					companyId:companyId,
					createUserId:createUserId,
					isLibrary:1,
					// 外部投稿 接口新增参数 sign =  2
					sign:2
					
				}
				WXAJAX.POST(data,"",url,"","",1).then((res)=>{
					console.log(res,"啊实打实");
					wx.showToast({
					  title: '外部投稿成功',
					  icon: 'success',
					  duration: 2000
					})
					
				}).catch((err)=>{
					console.log(err);
				})
			}
		}
	}
</script>

<style scoped>
	.b1s {
		border: 1px solid #000000;
	}

	.w90p {
		width: 90%;

	}
	
</style>
