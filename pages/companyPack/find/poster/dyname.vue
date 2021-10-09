<template>
	<div>
		<div class="bgfff pt20 pl30 pr30 " style="margin-bottom: 20px;border-radius: 20rpx;"
			v-for="(item, index) in article_lists" :key="index">
			<div class="disflex mb15">
				<img :src=" item.logo || 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/card1_logo.png'"
					alt="" mode="aspectFill" class="mr8" style="border-radius: 50%;width:33px;height: 33px;">
				<div class="disflex flex-column jsaround">
					<span class="fbold cblue_3 w215 fs12 over_1">{{item.name}}</span>
					<span class="ca8" style="font-size: 9px;">{{item.createTimeStr}}</span>
				</div>
			</div>

			<div class="flex1">
				<!-- <p class="disflex cdeepblue fs16 jsbet lh27"> -->
				<!-- <span class="fbold w250 over_1">{{item.companyName}}</span> -->
				<!--<span class="fs12">转发</span>-->
				<!-- <button v-if="item.type != 2"
	              class='bgfff fs12 cdeepblue p0'
	              :data-dynamicId="item.dynamicId"
	              open-type="share"
	              hover-class="other-button-hover"> -->
				<!--转发-->
				<!-- <span>转发</span>
	      </button>
	    </p> -->
				<!-- 
	    <div v-if="item.type == 2" @click.stop="addComment(item.dynamicId)">
	      <p class="fs16 c38">{{item.title}}</p>
	      <div class="disflex pt15 picture-list">
	        <div class="w93 h93"
	             v-for="(v,k) in item.photos"
	             :key="k">
	          <img :src="v"
	               mode="aspectFill"
	               :lazy-load="true"
	               @click.stop="previewImage(v)">
	        </div>
	      </div>
	    </div> -->

				<div class="bgf5f6 pl10 pr15 disflex  align-cen" style="background-color: white;justify-content: end;"
					v-if="item.type == 8" @click="toDetail(item.dynamicId,item.companyId, item.cardId )">
					<img :lazy-load="true" mode="aspectFill" :src="item.photos[0]" alt="" class="w50 h50 mr8"
						style="border-radius: 3px;">
					<div style="display: flex;flex-direction:column;">
						<p class="fs14 c38 w200 over_1">{{item.type==3?'(转载) ':''}}{{item.title||'标题'}}</p>
						<p class="fs12 w200"
							style="color:#808080;margin-top: 10rpx;overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
							<text v-if="item.originAuthor">来源:{{item.originAuthor}}</text>
						</p>
					</div>

				</div>

				<!-- <div class="disflex jsbet pt15 pb15 posre">

	      <span class="w34 h22 bradius5 textc point_two bgf5f6"
	            @click.stop="operate_tap(index1)"></span>
	      <div class="posab  dynamic_operate"
	           :class="item.operate_show ? '' : 'w0' ">
	        <div class="w178 bg38 pl25 pr28 disflex jsbet">
	          <div class=" disflex align-cen"
	               @click.stop="zan(index1 , item.isThumbs)">
	            <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/zan_fff.png"
	                 alt=""
	                 class="w20 h20">
	            <span class="fs14 cfff pl8">{{item.isThumbs == 1 ?'已赞':'赞'}}</span>
	          </div>
	          <div class="disflex align-cen"
	               @click.stop="addComment(index1)">
	            <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/talk.png"
	                 alt=""
	                 class="w20 h20">
	            <span class="fs14 cfff pl8">评论</span>
	          </div>

	        </div>
	        <span class="triangle_border_right"></span>
	      </div>
	    </div> -->
				<div class="disflex h39 ">
					<!-- <button v-if="item.type != 2"
	              class='bgfff fs12 cdeepblue p0 w33p disflex jscen align-cen'
	              :data-dynamicId="item.dynamicId"
	              open-type="share"
	              hover-class="other-button-hover">
	        <img class="w20 h20 mr8" :src="shareIcon">
	        <span>{{item.shareNum}}</span>
	      </button> -->
					<button v-if="item.type != 2" class='bgfff fs12 cdeepblue p0 w33p disflex jscen align-cen'
						:data-dynamicId="item.dynamicId"
						@click.stop="shareto(item.dynamicId,item.companyId,item.title,item.photos,item)"
						hover-class="other-button-hover">
						<img class="w20 h20 mr8" :src="shareIcon">
						<span>{{item.shareNum}}</span>
					</button>
					<div class="disflex jscen align-cen" @click.stop="addCommentA(index, item)"
						:class="item.type != 2 ? 'w33p': 'w50p'">
						<img class="w20 h20 mr8" :src="commentIcon">
						<p class="fs12 c78">{{item.commentNum}}</p>
					</div>
					<div class="disflex jscen align-cen" :class="item.type != 2 ? 'w33p': 'w50p'">
						<image class="w20 h20 mr8"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/readtime.png"
							mode=""></image>
						<p class="fs12 c78">{{item.readNum}}</p>
					</div>
					<!--  <div  v-if="item.type != 2" class="disflex jscen align-cen" :class="item.type != 2 ? 'w33p': 'w50p'">
	        <image class="w20 h20 mr8" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/kept.png" mode=""></image>
	        <p class="fs12 c78">{{item.collectionNum}}</p>
	      </div> -->
					<div class="disflex jscen align-cen" @click.stop="zan1(index , item.isThumbs,item.dynamicId)"
						:class="item.type != 2 ? 'w33p': 'w50p'">
						<img class="w20 h20 mr8" :src="item.isThumbs == 1 ?  like_selectIcon :  likeIcon">
						<p :class="item.isThumbs == 1 ?  'cblue' :  'c78'" class="fs12">{{item.likeNum}}</p>
					</div>
				</div>
			</div>

			<!-- 分享弹窗 -->
			<!-- zlz start -->
			<cover-view class="w100p h100p prod_choose_class borderbox disflex column-reverse"
				style="background-color: #000000; opacity:0.1;" :class="{show : isShowShare} "
				@click.stop="isShowShare = false">
			</cover-view>
			<cover-view class="w100p h100p prod_choose_class borderbox disflex column-reverse"
				:class="{show : isShowShare} " @click.stop="isShowShare = false">
				<cover-view class="bgfff inner textc lh44">
					<cover-view class="share-box">
						<button style="margin-right: 0upx;margin-left: 0;background: #fff;" open-type="share">
							<cover-image class="share-img"
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/weixin_share.png">
							</cover-image>
							<cover-view class="share-title">微信好友</cover-view>
						</button>
						<cover-view style="margin-left: 136.5upx;" @click="onShareEvent">
							<cover-image class="share-img mb8"
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/weixin_share2.png">
							</cover-image>
							<cover-view class="share-title">名片海报</cover-view>
						</cover-view>
						<cover-view style="margin-left: 136.5upx;" @click="onShareInSide">
							<cover-image class="share-img mb8"
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/weixin_share.png">
							</cover-image>
							<cover-view class="share-title">站内分享</cover-view>
						</cover-view>
					</cover-view>
					<cover-view class="share-ornament"></cover-view>
					<cover-view class="fs16 c38 lh44" @click.stop="isShowShare = false">
						取消
					</cover-view>
				</cover-view>
			</cover-view>
			<div class="mask disflex align-cen jscen" v-if="isPreviewImg">
				<div class="disinblock ">
					<div class="disflex flex-end ">
						<img @click="isPreviewImg = false" src="/static/close.png"
							style="height: 48rpx; width: 48rpx" />
					</div>
					<img class="img-size bradius5" :src="maskImg" />
					<span @click="saveImg" class="bg_line_blue cfff textc fs18 fbold bradius5 lh44 mb15"
						style="width: 465rpx;display: block;margin: 0 auto">保存图片</span>
				</div>
			</div>
			<!-- zlz end -->
		</div>
	</div>

</template>

<script>
	import WXAJAX from '@/utils/request'
	import {
		mapGetters
	} from 'vuex';
	export default {
		name: "dynamicItem",
		props: ['item', 'index1', 'companyId', 'article_lists', 'replayComment'],
		computed: {
			...mapGetters(['currentCompany']),
		},
		data() {
			return {
				dynamicId: '',
				isPreviewImg: false,
				maskImg: '',
				isShowShare: false,
				commentIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_comment.png',
				likeIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_like.png',
				like_selectIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_like_select.png',
				shareIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_share.png',
			}
		},
		methods: {

			// 分享给朋友
			async onShareEvent() {
				wx.showLoading({
					title: '生成海报中',
					mask: true
				});
				await WXAJAX.POST({
					companyId: this.companyId,
					shareType: 4,
					itemId: this.dynamicId
				}, '', '/shareRecord/addShareRecord').then(data => {
					WXAJAX.POST({
						itemId: this.dynamicId,
						shardRecordId: data
					}, '', '/personal/getDynamicPoster').then(result => {
						this.maskImg = result
						this.isPreviewImg = true
						wx.hideLoading();
					}).catch(err => {
						uni.showToast({
							title: '生成分享图片失败',
							icon: 'none'
						})
						wx.hideLoading();
					})
				}).catch(err => {
					uni.showToast({
						title: '生成分享图片失败',
						icon: 'none'
					})
					wx.hideLoading();
				})
			},
			onShareInSide() { //站内分享
				wx.navigateTo({
					url: '/pages/companyPack/choosefriends/main?id=' + this.dynamicId + '&cid=' + this.companyId
				})
			},
			shareto(did, companyId, title, photos,item) {
				// this.isShowShare=true;
				// this.dynamicId=id;
				this.$emit('toShare', did, companyId, title, photos,item);
			},
			dynamic_detail(id) {
				console.log(id)
				return
				this.$emit('dynamic_detail', id);
			},
			operate_tap(index1) {
				this.$emit('operate_tap', index1)
			},
			addComment(dynamicId) {
				console.log("dynamicId", dynamicId);
				const {
					companyId,
					cardId
				} = this.currentCompany;
				let url = '../commentDetail/main?dynamicId=' + this.dynamicId + '&companyId=' + companyId + '&cardId=' +
					cardId;
				wx.navigateTo({
					url: url
				})
			},
			addCommentA(index1, replayComment = {}) {
				this.$emit('addCommentA', index1, replayComment);
			},
			zan1(index1, isThumbs, dynamicId) { //点赞
				console.log('zan')
				this.$emit('zan', index1, isThumbs, dynamicId);
			},
			getMore() {
				wx.showLoading();
				WXAJAX.POST({
						pageSize: 10,
						pageNum: parseInt(this.item.commentModelList.length / 10) + 1,
						dynamicId: this.item.dynamicId,
					}, '', '/personal/selectComment')
					.then(res => {
						wx.hideLoading();
						this.$emit('getMoreComment', res, this.index1);
					});
			},
			// 保存图片
			saveImg() {
				let path = this.maskImg;
				wx.getImageInfo({
					src: path,
					success: sres => {
						//console.log(sres.path);
						wx.saveImageToPhotosAlbum({
							filePath: sres.path,
							success: res => {
								wx.setNavigationBarColor({
									frontColor: "#000000",
									backgroundColor: "#ffffff",
									animation: {
										duration: 1
									}
								});
								this.isPreviewImg = false;
								wx.showToast({
									title: "保存成功",
									duration: 1000,
									icon: "success",
									mask: true
								});
							},
							fail: res => {
								wx.setNavigationBarColor({
									frontColor: "#000000",
									backgroundColor: "#ffffff",
									animation: {
										duration: 1
									}
								});
								this.isPreviewImg = false;
								wx.showToast({
									title: "保存失败",
									duration: 1000,
									icon: "none",
									mask: true
								});
							}
						});
					}
				})

			},

			previewImage(src) {
				let source = this.checkImgNameIsNumber(src) ? src : (src + '.primary.png');
				let sourceArr = this.item.photos.map(val => this.checkImgNameIsNumber(val) ? val : (val + '.primary.png'));
				wx.previewImage({
					current: source,
					urls: sourceArr
					// urls必须是数组 不然会报错
				})
			},
			toDetail(id, companyId, cardId) { //查看文章详情
				let url = '../dynamicDetail/main?dynamicId=' + id + '&companyId=' + companyId + '&cardId=' + cardId;
				wx.navigateTo({
					url: url
				})
			},
			detail_tap(type) {
				console.log(type)
				if (type == 2) {
					this.addComment()
				} else if (type == 1 || 3) {
					this.toDetail()
				}
			}

		}
	}
</script>

<style scoped>
	.picture-list {
		flex-wrap: wrap;
	}

	.picture-list div {
		overflow: hidden;
		margin-right: 6upx;
		margin-top: 6upx;
	}

	.picture-list img {
		width: 100%;
		height: 100%;
	}

	.picture-list div:nth-child(3n) {
		margin-right: 0;
	}

	.picture-list div:nth-child(1),
	.picture-list div:nth-child(2),
	.picture-list div:nth-child(3) {
		margin-top: 0;
	}

	.dynamic_operate {
		width: 376upx;
		top: 0;
		bottom: 0;
		right: 104upx;
		margin: auto;
		transition: 0.2s;
		overflow: hidden;
		height: 80upx;
	}

	.dynamic_operate>div {
		border-radius: 10upx;
		line-height: 80upx;
		height: 80upx;
		box-sizing: border-box;
	}

	.dynamic_operate.w0 {
		width: 0;
		padding: 0;
		overflow: hidden;
	}

	.triangle_border_right {
		position: absolute;
		display: block;
		width: 0;
		height: 0;
		border-width: 20upx 0 20upx 20upx;
		border-style: solid;
		border-color: transparent transparent transparent #383838;
		/*透明 透明 透明 黄*/
		top: 50%;
		transform: translateY(-50%);
		right: 4upx;
		transition: 0.2s;
	}

	.w0 .triangle_border_right {
		border: 0;
	}

	.dynamic_likes {
		word-break: break-all;
	}

	.dynamic_likes .like_name::after {
		content: "，";
	}

	.dynamic_likes .like_name:last-child::after {
		content: "";
	}

	.dec {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 30upx;
		padding-bottom: 40upx;
		border-bottom: 1upx solid #e8e8e8;
	}

	.left-dec {
		font-size: 24upx;
		color: #a8a8a8;
	}

	.right-dec {
		font-size: 24upx;
		color: rgba(86, 108, 132, 1);
	}

	.prod_choose_class {
		position: fixed;
		left: 0;
		/* background: rgba(0, 0, 0, 0.5); */
		z-index: 100;
		bottom: -100%;
		/* transition: all 0.2s linear; */
	}

	.more-btn {
		position: absolute;
		top: 12vh;
		left: 0;
		right: 0;
		text-align: center;
	}

	.more-btn button {
		width: 250upx;
		border: 1upx solid rgba(81, 203, 205, 1);
		border-radius: 10upx;
		color: rgba(81, 203, 205, 1);
		font-size: 28upx;
	}

	.show {
		bottom: 0;
		z-index: 1000;
	}

	.prod_choose_class .inner {
		border-radius: 10upx 10upx 0 0;
	}

	.share-box {
		display: flex;
		justify-content: center;
		margin-top: 20upx;
		margin-bottom: 30upx;
	}

	.share-img {
		width: 100upx;
		height: 100upx;
	}

	.share-title {
		font-size: 24upx;
		color: #a8a8a8;
		/* line-height:14upx; */
	}

	.share-ornament {
		background: #f5f5f6;
		height: 10upx;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.1);
		z-index: 100;
	}

	.img-size {
		width: 600upx;
		height: 600upx;
		margin-top: 30upx;
		margin-bottom: 60upx;
	}

	.content {
		box-sizing: border-box;
		padding: 0 0 118upx 0;
	}

	.content rich-text {
		width: 750upx;
		overflow: hidden;
	}
</style>
