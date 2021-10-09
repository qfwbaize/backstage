<template>
	<view>
		<!-- 精品文章展示 -->
		<view class="w345 h70 disflex m0auto">
			<div v-if="(id ==3)" v-for="(item,index) in list " :key="index" class=" w105 h70 ml8 br14 disflex"
				@click="get(index)" :style="{'background-color': item.bacolor}">

				<div class="w105 h70  fs16  cfff ml8 mt10">{{item.text}}
					<div class="fs10  w237 ">{{item.text1}}</div>
				</div>
				<div class=" ml-120">
					<image class="w57 h60" :src="item.url" mode=""></image>
				</div>
			</div>
			<!-- 新闻资讯显示的页面 -->
			<view v-if="(id== 1)" class="w345 h70 disflex m0auto  jsaround">
				<div class="w105 h70 ml8 br14" :style="{'background-color':list[0].bacolor}" @click="page_edi" style="width: 260rpx;">
					<div class="h70  fs16  cfff ml8 mt10" >{{list[0].text}}
						<div class="fs10  w237 ">{{list[0].text1}}</div>
					</div>
				</div>
				<div class="w105 h70 ml8 br14" :style="{'background-color':list[2].bacolor}" @click="page_edis" style="width: 260rpx;">
					<div class="w145 h70  fs16  cfff ml8 mt10 ">{{list[2].text}}
						<div class="fs10  w237 ">{{list[2].text1}}</div> 
					</div>
				</div>
			</view>



			<!-- 	机构荣誉显示的页面
			<view v-if="(id == 7)" class="w345 h70 disflex m0auto ">

				<div id="id" calss="w105 h70 fs16 cfff" :style="{'background-color':list[0].bacolor}"
					@click="page_edih">
					<div class="w105 h70  fs16  cfff ml8 mt10 ">{{list[0].text}}
						<div class="fs10  w237 ">{{list[0].text1}}</div>
					</div>
				</div>
			</view> -->

		</view>

		<div class="w345 disflex jsbet m0auto mt36 ">
			<span class='fs14 ml8'>
				已发布到官网文章(4)
			</span>
			<span class='fs14 mr45'>
				草稿(2)
			</span>
		</div>
		<!--展示列表 -->
		<view class=" w345 h118 wrap m0auto mt15  disflex jsbet" v-for="(info,index) in articles "
			:key="info.dynamicId">
			<div class='ml15'>
				<div class="fs14 mt15 w170 lh15 spot">{{info.title}}</div>
				<div class="fs14 mt15">{{info.name}}</div>
				<div class=' w144  h16 disflex  jsbet fs12 mt10  lh15'>
					<span class='lh12'>
						<image class="w16 h16 mr4  vam"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/ze-eye-o@3x.png"
							mode="">
						</image>
						16
					</span>
					<span class='lh12'>
						<image class="w16 h16 mr4  vam"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/ze-good-job-o@3x.png"
							mode="">
						</image>
						16
					</span>
					<span class='lh12'>
						<image class="w16 h16 mr4  vam"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/md-open_in_new@3x.png"
							mode="">
						</image>
						16
					</span>
				</div>
				<div class='fs12 time mt10'>{{info.createTimeStr}} </div>
			</div>
			<div class="w77 h118 ">
				<div class="w77 h75  b10">
					<image class="w77 h75" :src="info.photos" mode="">
					</image>
				</div>
				<!-- 点击出现弹窗事件 -->
				<div class="w24 h24  mt5 arr" @click="getactive(index)">
					<image class="w24 h24 "
						src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riFill-more-fill Copy@3x.png"
						mode=""></image>
				</div>
			</div>

		</view>

		<!-- <POPUP @fuck="getfuck" v-if="(isshow == 1)" @click="closeSh" :name="name" :url="url" :time="time" :tit='tit'
			:dynamicId='dynamicId' :companyId='companyId' :saveType='1' :type='type' class="top"></POPUP> -->
		<!-- <POPUP class="top" v-if="(isshow == 1)" :dynamicId="dynamicId"> </POPUP> -->


	</view>
</template>

<script>

	import POPUP from '@/components/popup'
	import WXAJAX from "@/utils/request";
	export default {
		components: {
			POPUP
		},
		data() {
			return {
				dynamicId: '', //数据的id
				url: '', //弹窗的图片url
				time: '', //弹窗的时间显示
				tit: '', //弹窗的标题
				type: 1,
				isshow: 0,
				articles: [],
				id: '',
				labelContent: '',
				list: [{
					text: '写原创文章',
					text1: 'WRITE AN ARTICLE',
					bacolor: 'rgba(0, 215, 208, 100);',
					url: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/antOutline-edit Copy@3x.png'
				}, {
					text: '机构文库',
					text1: 'LIBRARY',
					bacolor: 'rgba(26, 208, 156, 100);',
					url: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/md-find_replace@3x.png'
				}, {
					text: '转载文章',
					text1: 'WRITE AN ARTICLE',
					bacolor: 'rgba(78, 159, 237, 100);',
					url: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riLine-book-2-line@1x.png'
				}]
			}
		},
		onLoad(uid) {
			this.getachieve();
			console.log(uid);
			this.id = uid.id
			console.log(uid.labelContent, 'article');
			this.labelContent = uid.labelContent
			console.log(this.labelContent, 'LAB====');
			if (this.id == 1) {
				this.list[0].text = "写原创新闻"
				this.list[2].text = "转载新闻"
				wx.setNavigationBarTitle({
					title: '新闻资讯'
				})
			} else if (this.id == 3) {
				wx.setNavigationBarTitle({
					title: "精品文章"
				})
			}
			//  else if (this.id == 7) {
			// 	console.log('我是777从机构荣誉过来');
			// 	this.list[0].text = "编写荣誉"
			// 	wx.setNavigationBarTitle({
			// 		title: '机构荣誉'
			// 	})
			// }


		},
		methods: {
			// 点击出现弹窗
			getactive(index) {
				let v = this
				console.log(v.articles[index]);
				this.tit = v.articles[index].title
				this.name = v.articles[index].name
				this.time = v.articles[index].name
				this.url = v.articles[i]
				console.log(this.tit,this.name);
			},
			// 获取已发布的数据
			getachieve() {
				WXAJAX.POST({
					pageNum: this.pageNum,
					type: 1
				}, '', '/dynamic/listMyDynamic', '', '', 1).then(res => {
					this.articles = res.list
					console.log(this.articles, 11111)
					this.essay = res.total
					this.onlinot = res.list.isDrafts
					console.log(this.onlinot, 2222222333)
				})
			},
			get(index) {
				// index 0=写文章 1=机构文库选择  2=转载文章
				if (index == 0) {
					wx.navigateTo({
						url: '../../article/editArticle/main?labelContent=' + this.labelContent
					})
				} else if (index = 2) {
					wx.navigateTo({
						url: '../../article/editArticle/publicArticle'
					})
				}
			},
			// 写新闻
			page_edi() {
				wx.navigateTo({
					url: '../../article/editArticle/main?id=' + this.id + "&labelContent=" + this.labelContent
				})
			},
			// 写荣誉
			page_edih() {
				wx.navigateTo({
					url: '../../article/editArticle/main?id=' + this.id
				})
			},

			// 转载
			page_edis() {
				wx.navigateTo({
					url: '../../article/editArticle/publicArticle'
				})
			}

		}
	}
</script>

<style>
	.top {
		position: absolute;
		top: 0rpx;
	}

	.vam {
		/* vertical-align:text-top; */
		vertical-align: middle;
	}

	.ml-120 {
		margin-left: -120rpx;
	}

	.arr {
		margin-left: 100rpx;
	}

	.w144 {
		width: 288rpx;
	}

	.w77 {
		width: 154rpx;
	}

	.h75 {
		height: 150rpx;
	}

	.time {
		color: rgba(139, 139, 139, 100)
	}
	.wrap {
		box-shadow: 0px 2px 6px 0px rgba(167, 225, 221, 100);
		border: 1px solid rgba(255, 255, 255, 100);
	}

	.mt36 {
		margin-top: 72rpx;
	}

	.mr45 {
		margin-right: 45rpx;
	}

	#id {
		border-radius: 28rpx;
	}

	.br14 {
		border-radius: 28rpx;
	}

	.w237 {
		width: 474rpx;
	}

	.box {
		box-shadow: 0px 4rpx 12rpx 0px rgba(196, 241, 238, 100);
	}
  .spot{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
