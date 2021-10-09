<template>
	<div class="box bgfff">
		<view class="">
			<view class="frequency fix_top">
				<video :autoplay="true" style="width: 100%;height: 100%;" :src="tabulation.url" controls></video>
			</view>
			<!-- 标题 -->
			<view class="" style="height:390rpx;" />
			<!-- {{tabulation.sourceVideoId ?'(转载于':''}} -->
			<view class="headline"><text
					v-if="tabulation.sourceVideoId"><text v-if="tabulation.headVideoAuthor">(转载于:{{tabulation.headVideoAuthor  || ''}})</text></text>{{tabulation.title}}
			</view>
			<!-- 基本信息 -->
			<view class="mation">
				<view class="subscriber">
					<image style="" :src="tabulation.cardLogo" mode=""></image>
					<view class="">
						<view class="" style="font-size: 28rpx;color: #101010;margin-top: 10rpx;">
							{{tabulation.userName}}
						</view>
						<view class="" style="font-size: 24rpx;color: #8F8F8F;margin-top: 10rpx;">{{tabulation.companyName}}</view>
					</view>
				</view>
				<view class="" v-if="tabulation.cardId != cardId">
					<view class="solicitude" v-if="tabulation.attentionUser == false" @click="followbtn(tabulation,1)">+
						关注
					</view>
					<view class="solicitude" v-if="tabulation.attentionUser == true" @click="followbtn(tabulation,0)">
						已关注
					</view>
				</view>

			</view>
			<!-- 文章 -->
			<view class="mainbody">{{companyNotice}}</view>
			<!-- 定位 -->
			<view class="orientation">
				<image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/location.png" mode="">
				</image>
				<view class="" style="font-size: 24rpx; color:#B5B5B5 ;">{{tabulation.address}}</view>
			</view>
			<!-- 时间 -->
			<view class="release">{{tabulation.uploadTime}}</view>
			<!-- 四连 -->
			<view class="successions">
				<!-- 点赞 -->
				<view class="" style="display: flex;">
					<view class="comment" @click.stop="zan1(tabulation)">
						<img class="w20 h20 mr8" :src="tabulation.like == true ?  like_selectIcon :  likeIcon">
						<view :class="tabulation.like == true  ?  'cblue' :  'c78'">{{tabulation.likesNum}}</view>
					</view>

					<view class="comment" style="margin-left: 20rpx;" @click="getdiscuss()">
						<image
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/ic_news_comment.png"
							mode=""></image>
						<view class="">{{tabulation.commentNum}}</view>
					</view>
					<view v-if="currentTab == 3" class="comment" style="width: 70rpx;" @click.stop="edittext()">
						<img class="w20 h20 mr8" :src="istext == false ?  answer_selectIcon :  answerIcon">
					</view>
				</view>
				<!-- 收藏 -->
				<view class="" style="display: flex;">
					<view @click="collect(tabulation)"
						style="background-color:#F5F5F5; border-radius: 50rpx;width: 100rpx;height: 60rpx;display: flex;justify-content: center;">
						<image v-show="tabulation.collection == true"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/ze-star@3x.png"
							mode=""></image>
						<image v-show="tabulation.collection == false"
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/ze-star-o@3x.png"
							mode=""></image>
					</view>
					<view class="comment" style="margin-left: 20rpx;" @click="forward(tabulation)">
						<image
							src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/forward.png"
							mode="">
						</image>
						<view class="fs14">转发</view>
					</view>
				</view>
			</view>

			<div class="pl15 pt10 bbf5f6  pb10 borderbox bgfff" v-if="istext == false && currentTab == 3">
				<div class="target" v-for="(item,index) in problemList" :key="index">
					<div class="title c38" style="width: 90%;">
						<p>{{index+1}}、</p>{{item.questionTitle}}
					</div>
					<ul>
						<!-- list -->
						<radio-group @change="radioChange($event,item)" style="font-size: 25rpx;">
							<li>
								<label class="target-left c78">
									<radio :value="'A'" color="#51CDCB" style="transform:scale(0.7);" />
									{{item.answerA}}
								</label>
							</li>
							<li>
								<label class="target-left c78">
									<radio :value="'B'" color="#51CDCB" style="transform:scale(0.7);" />
									{{item.answerB}}
								</label>
							</li>
							<li>
								<label class="target-left c78">
									<radio :value="'C'" color="#51CDCB" style="transform:scale(0.7);" />
									{{item.answerC}}
								</label>
							</li>
							<li>
								<label class="target-left c78">
									<radio :value="'D'" color="#51CDCB" style="transform:scale(0.7);" />
									{{item.answerD}}
								</label>
							</li>
						</radio-group>

					</ul>
				</div>
				<div v-if="submittext == '提交答案'" @click="submit"
					style="color: #fff;background-color: #337ab7; border-color: #2e6da4; display: inline-block; padding: 6rpx 12rpx; margin-bottom: 0; font-weight: 400; line-height: 1.42857143; text-align: center; white-space: nowrap; text-decoration: none; vertical-align: middle; -ms-touch-action: manipulation; touch-action: manipulation; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-image: none; border: 1rpx solid transparent; border-radius: 4rpx;width: 144rpx;font-size: 36rpx; margin-left: 250rpx; margin-bottom: 60rpx; margin-top: 30rpx; ">
					提交答案</div>
				<div v-else
					style="color: #fff;background-color: #696969; border-color: #2e6da4; display: inline-block; padding: 6rpx 12rpx; margin-bottom: 0; font-weight: 400; line-height: 1.42857143; text-align: center; white-space: nowrap; text-decoration: none; vertical-align: middle; -ms-touch-action: manipulation; touch-action: manipulation; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-image: none; border: 1rpx solid transparent; border-radius: 4rpx;width: 144rpx;font-size: 36rpx;margin-left: 250rpx; margin-bottom: 60rpx; margin-top: 30rpx; ">
					已提交 </div>

			</div>
			<!-- 评论详情 -->
			<view class="" style="margin-top: 40rpx;position: relative;">
				<view style="margin-left: 40rpx;font-size:40rpx;">
					评论列表({{dynamic.commentModelList.length||0}})
				</view>
				<view class="" v-for="(v,k) in dynamic.commentModelList" :key="k" v-if="istext"
					style="display: flex;justify-content: space-between;margin-left: 40rpx;margin-right: 40rpx;margin-top: 40rpx;">
					<view class="" style="display: flex;">
						<image class="w50 h50 mr10" style="border-radius: 20rpx;"
							:src="v.logo || 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/user_default_avatar_square.png'"
							mode=""></image>
						<view class="">
							<view class="" style="font-size: 28rpx;margin-top: 12rpx;">{{v.userName}}</view>
							<view class="" style="font-size: 24rpx;margin-top: 10rpx;">{{v.text}}</view>
						</view>
					</view>
					<view class="" style="font-size: 28rpx;margin-top: 30rpx;color: #B8B8B8;">{{v.createTime}}</view>
				</view>
				<view class="" style="width: 100%;height: 100rpx;"></view>
				<!-- 写评论 -->
				<view class="" style="height: 80rpx;" />
				<div class="fix_bottomCD disflex borderbox align-cen pl15 h49 bgfff edit_input trans2" v-if="isinput">
					<!--:class="input_show ? '' : 'hide' "-->
					<div class="bgfff  disflex w100p jsbet pr11 borderbox align-cen">
						<input fixed="true" :focus="comment_focus" :placeholder="
		        replayComment.commentId
		          ? '回复 ' + replayComment.userName + '：': '评论'"
							class=" borderbox h40 lh40 pr11 bgf5f6 bradius5 flex1 mr11 comment_input c38 fs18 pl15"
							@confirm="inputConfirm()" :style="{ height: text_height + 'px' }" v-model="comments" />
						<!--        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/smile.png" alt="" class="w25 h25" @click="smile_tap">-->
						<span class="bgblue cfff w50 textc lh30 fs16 bradius5 disblock ml10"
							@click.stop="inputConfirm">发送</span>
					</div>
				</div>
			</view>
			<SHARE v-if="share==true" :dynamicId="dynamicId" :videoId="videoId" :companyId="companyId" saveType='1'
				@closeShare="closeShare">
			</SHARE>
		</view>
    <div v-show="dialog_show">
    	<ChangePhoneNumber :dialog_title="'手机号验证'" :type="'hint3'" :phone="precisePhone"
    		@btn_tap="save_phone_number" @cancel_tap="close_change_number"></ChangePhoneNumber>
    </div>
	</div>
</template>

<script>
	import util from '@/utils/index'
	import WXAJAX from '@/utils/request'
	import HandleLogin from '@/utils/handleLogin';
	import SHARE from '@/components/share'; //转发
  import ChangePhoneNumber from '@/components/ChangePhoneNumber'
	import {
		addShareRecord,
		editShareRecord,
    preciseWxShare,
	} from '@/utils/behavior';
	import {
		authSubscribeComment,
		authSubscribeMessage
	} from '@/utils/auth.js';
	export default {
		components: {
			SHARE,
      ChangePhoneNumber
		},
		data() {
			return {
        dialog_show:false,
        precisePhone:'',
				videoId: '',
				tabulation: '', //视频详情
				card: '',
				corporation: '', //公司名
				pictt: '',
				isinput: false,
				dynamicId: '',
				time: '',
				cardId: 0,
				dynamic: '',
				title: '',
				photos: '',
				isLike: false,
				comments: '',
				replayComment: {}, // 回复信息对象
				add_comments_index: 0,
				share: false,
				companyId: '',
				likeIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_like.png',
				like_selectIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_like_select.png',
				answer_selectIcon: WXAJAX.imgBackUrl + 'yimai_photos/crm/answer1.png',
				answerIcon: WXAJAX.imgBackUrl + 'yimai_photos/crm/answer.png',
				isfixTab: false,
				companyNotice: '',
				istext: true,
				problemList: [],
				currentTab: 0,
				timer: '',
				submittext: '提交答案',

				topic: false,
				submitresult: false,
				readstarttime: '', //阅读开始时间
				readendtime: '', //阅读结束时间
				readType: '', //文章来源类型
				bodyheight: '', //文章的高度
				bodytop: '', //文章的上边界坐标
				scrollTop: '', //当前滑动距离顶部尺寸
				ksqyheight: '', //文章高度
				navbottomheight: '', //文章底部菜单

				submitresult: false,
				answerList: [], //提交的答案
				answerListIds: [], //提交的答案id
				answerIds: [],

				ifscore1: false, //阅读
				ifscore4: false, //推销
				ifscore3: false, //精准

				score: 0,
				lowestAnswerScore1: 0, //阅读得奖最低分数
				lowestAnswerScore4: 0, //推销得奖最低分数
				lowestAnswerScore3: 0, //精准得奖最低分数
				viedocardId: 0,
        shareId:'',
			}
		},
    async onShareAppMessage(e) {
      let shareId='';
      var params={
        dynamicId:this.dynamicId,
        shareSource:2,
      }
      var sharedata = await WXAJAX.POST(params , '', '/share/record/add','','',1);
      let path = '/pages/companyPack/videodetails/videodetails?dynamicId=' + this.dynamicId + '&companyId=' + wx.getStorageSync('COMPANYID') + '&cardId=' + wx.getStorageSync('cardId') + '&goType=1&shareId=' + sharedata.shareId +'&videoId=' +this.videoId;
      console.log("path",path)
      return {
        imageUrl: this.photos[0],
        title: this.title,
        path,
        success(e) {
          wx.showShareMenu({
            withShareTicket: true
          })
        },
        fail(e) {
          console.log('失败-- ', e);
        }
      }

    },
		async onLoad(options) {
			this.videoId = options.videoId

			console.log("options", options);
			this.dynamicId = options.dynamicId
			this.companyId = options.companyId
			this.cardId = options.cardId
			this.shareId = options.insideShareId //站内分享
			this.type = options.type

      if(!options.precise_dynamicId&&options.shareId){//普通微信好友/朋友圈分享
        editShareRecord(options.shareId);
        this.shareId = options.shareId//站内分享
      }

      if(options.precise_dynamicId){//精准抓发微信好友/朋友圈
        this.preciseId=await preciseWxShare(this.dynamicId,options.precise_dynamicId,wx.getStorageSync('cardId'),options.shareId);
      }

			if (options.preciseId) {
				this.preciseId = options.preciseId
			}
			if (options.pushEffectId) {
				this.pushEffectId = options.pushEffectId
			}

			if (options.shareId) { //站外分享
				editShareRecord(options.shareId);
			}
      let isLogin = wx.getStorageSync("isLogin");
      this.getparticulars()
      this.readstarttime = new Date()
		},
		onShow() {

		},
		onHide() {
			this.readtime() //退出页面发送阅读时间
		},
		onUnload: function() {
			this.readtime() //退出页面发送阅读时间
		},
		onPageScroll(e) {
			e.scrollTop > 0 ? this.isfixTab = true : this.isfixTab = false;
			this.isinput = false

		},
		methods: {
			radioChange(answer, info) {
				console.log("answer", answer.detail.value)
				console.log("info", info)
				var index = this.answerIds.indexOf(info.detailId);
				var that = this
				var answerCorrectInfo = {
					questionId: info.detailId,
					answer: answer.detail.value,
					score: info.correctScore,
				}
				var answerErrorInfo = {
					questionId: info.detailId,
					answer: answer.detail.value,
					score: info.errorScore,
				}
				if (that.answerListIds.indexOf(info.detailId) > -1) {
					that.delData(info.detailId);
				} else {
					that.answerListIds.push(info.detailId);
				}

				if (info.correctAnswer.indexOf(answer.detail.value) > -1) { //答案正确
					if (index == -1) {
						that.answerIds.push(info.detailId)
						that.score = that.score + info.correctScore
					}

					that.answerList.push(answerCorrectInfo)

				} else { //答案错误
					if (index > -1) {
						that.answerIds.splice(index, 1);
						that.score = that.score - info.correctScore;
					}
					that.answerList.push(answerErrorInfo)
				}
			},
			delData(detailId) {
				var data = this.answerList;
				for (var i = 0; i < data.length; i++) {
					if (detailId == data[i].questionId) {
						data.splice(i, 1)
					}
				}
				this.answerList = data;
			},
			submit() {
				let params = {
					ifscore3: this.ifscore3,
					score: this.score,
					ifscore1: this.ifscore1,
					ifscore4: this.ifscore4,
					time1: this.time1,
					time3: this.time3,
					time4: this.time4,

					lowestAnswerScore1: this.lowestAnswerScore1, //阅读得奖最低分数
					lowestAnswerScore4: this.lowestAnswerScore4, //推销得奖最低分数
					lowestAnswerScore3: this.lowestAnswerScore3, //精准得奖最低分数
				}
				console.log("分数", params)
				if (this.ifscore3 && this.score >= this.lowestAnswerScore3 && this.time3) { //精准
					if(this.precisePhone){
					  this.dialog_show=true
					}else{
					 this.updatePrecise();
					}
					this.submitresult=true;
				}

				if (this.ifscore1 && this.score >= this.lowestAnswerScore1 && this.time1) { //阅读
					let params = {
						dynamicId: this.dynamicId,
						shareId: this.shareId,
						answerScore: this.score,
						readFlag: 1,
					};
					console.log("阅读params", params);
					WXAJAX.POST(params, '', '/reader/record/add', '', '', 1);
					this.submitresult = true;
				}
				if (this.ifscore4 && this.score >= this.lowestAnswerScore4 && this.time4) { //推销
					let params = {
						dynamicId: this.dynamicId,
						shareId: this.shareId,
						readFlag: 1,
						answerScore: this.score
					};
					console.log("推销params", params);
					WXAJAX.POST(params, '', '/pushEffect/record/add', '', '', 1);
					this.submitresult = true;
				}

				wx.showToast({
					title: "提交成功~",
					duration: 1000,
					icon: "none"
				});
				this.submittext = "已提交"


				for (var i = 0; i < this.answerList.length; i++) {
					WXAJAX.POST(this.answerList[i], '', '/answer/add', '', '', 1);
				}
			},


			readtime() { //退出页面发送阅读时间
				let that = this
				console.log('屏幕高度', that.ksqyheight)
				console.log('底部导航栏', that.navbottomheight)
				//屏幕高度-底部导航栏+当前浏览顶部-文章顶部导航栏/文章总高度
				// console.log('文章高度',(that.ksqyheight-that.navbottomheight+that.scrollTop-that.bodytop)/that.bodyheight*100)
				function baifenbi() {
					let num = (that.ksqyheight - that.navbottomheight + that.scrollTop - that.bodytop) / that.bodyheight *
						100;
					if (num >= 100) {
						return 100
					} else if (num <= 0) {
						return 0
					} else {
						return parseInt(num)
					}

				}
        { //发送阅读时间
					that.readendtime = new Date()

					let {
						dynamicId,
						score,
						readType
					} = that
					let readTime = that.readendtime - that.readstarttime
          // baifenbi()
					WXAJAX.POST({
						readRatio: baifenbi(),
						dynamicId,
						answerScore: score, //
						readTime,
						readType: 1, //0_直接阅读 1_站内分享阅读；2_站外分享阅读"
					}, '', '/reader/bill/add', '', '', 1).then((data) => {
						wx.hideLoading();
					}).catch((err) => {
						console.log(err);
						wx.hideLoading();
					});
				} {
					console.log('距离顶部的距离1', )
				}
			},
			getInits() {
				let v = this;
				WXAJAX.POST({
					companyId: v.companyId,
					dynamicId: v.dynamicId,
					cardId: v.cardId,
					// }, '', '/personal/getDynamicInfoDetail','','',2);
				}, '', '/dynamic/getDynamicDetail', '', '', 1).then((data) => {
					if (data) {
						v.reward(data)
						WXAJAX.POST({
							// rewardAnswerType: 0,
							dynamicId: v.dynamicId,
							questionTitle: '',
							pageSize: 100,
							pageNum: 1,
						}, '', '/question/queryListInitialQuestion', '', '', 1).then(res => {
							// console.log('你们进来观看就行',res)
							v.problemList = res.list
						});
					}
				})

			},
			reward(data) {
				let v = this;
				let readAward = false; //是否提示有阅读奖励
				let answerAward = false; //是否提示有答题奖励

				if (data.settingInfo.pushEffectFlag) { //推销
					if (data.pushEffectReward.answerFlag == 1) { //是否需要答题
						v.currentTab = 3
						v.topic = true
						v.ifscore4 = true
						v.lowestAnswerScore4 = data.pushEffectReward.lowestAnswerScore
						v.timer = setTimeout(function() { //最少阅读时间
							if (v.shareId && v.type != 1) {
								v.time4 = true;
							}
						}, data.pushEffectReward.lowestReadTime * 1000)
					} else {
						v.timer = setTimeout(function() { //最少阅读时间
							if (v.shareId && v.type != 1) { //推销奖励
								WXAJAX.POST({
									dynamicId: v.dynamicId,
									shareId: v.shareId,
									readFlag: 1,
								}, '', '/pushEffect/record/add', '', '', 1);
							}
						}, data.pushEffectReward.lowestReadTime * 1000)
					}
				}

				if (data.settingInfo.readRewardFlag) { //阅读
					if (data.readReward.answerFlag == 1) { //是否需要答题
						v.currentTab = 3
						v.topic = true
						v.ifscore1 = true
						v.lowestAnswerScore1 = data.readReward.lowestAnswerScore

						// if(v.type!=1){//设置了答题，并且是别人发给我的，不是自己发给别人的
						readAward = true
						answerAward = true

						v.timer = setTimeout(function() { //延时
							v.time1 = true;
						}, data.readReward.lowestReadTime * 1000)
						// }
					} else {
						if (v.type != 1) {
							readAward = true
							v.timer = setTimeout(function() { //延时
								WXAJAX.POST({ //阅读奖励
									dynamicId: v.dynamicId,
									shareId: v.shareId,
									readFlag: 1,
								}, '', '/reader/record/add', '', '', 1);
							}, data.readReward.lowestReadTime * 1000)
						}
					}
				}

				if (data.settingInfo.preciseRewardFlag) { //精准
          if(data.preciseReward.precisePhone){
            v.precisePhone=data.preciseReward.precisePhone;
          }
					if (data.preciseReward.answerFlag == 1) { //是否需要答题
						v.currentTab = 3
						v.topic = true
						v.ifscore3 = true
						v.lowestAnswerScore3 = data.preciseReward.lowestAnswerScore
						if (v.preciseId && v.type != 1) { //精准奖励
							readAward = true
							answerAward = true
							this.timer = setTimeout(function() { //延时
								v.time3 = true
							}, data.preciseReward.lowestReadTime * 1000)
						}
					} else {
						if (v.preciseId && v.type != 1) { //精准奖励
							readAward = true
							this.timer = setTimeout(function() { //延时
								if(v.precisePhone){
								  v.dialog_show=true
								}else{
								 v.updatePrecise();
								}
							}, data.preciseReward.lowestReadTime * 1000)
						}
					}
				}

				if (v.topic) {
					console.log("readAward", readAward)
					console.log("answerAward", answerAward)
					if (readAward && answerAward) {
						wx.showToast({
							title: "阅读并回答问题可以得奖励呦~",
							duration: 1000,
							icon: "none"
						});
					} else if (readAward) {
						wx.showToast({
							title: "阅读可以得奖励呦~",
							duration: 1000,
							icon: "none"
						});
					} else if (answerAward) {
						wx.showToast({
							title: "答题可以得奖励呦~",
							duration: 1000,
							icon: "none"
						});
					}

				}
			},
			edittext() {
				this.istext = false
			},
			followbtn(item, isDel) {
				let isLogin = wx.getStorageSync("isLogin");
				if (isLogin == false) {
					wx.showToast({
						title: "请先登录",
						icon: "none",
						duration: 1000,
					});
					return
				}
				wx.showLoading({
					mask: true
				});
				WXAJAX.POST({
						isDel: isDel,
						cardId: item.userId,
						// attentionId: null,
					},
					"",
					"/newAttention/add", "", "", 1
				).then(data => {
					wx.hideLoading();
					if (item.attentionUser == false) {
						console.log(data)
						if (this.tabulation.userId == item.userId) {
							this.tabulation.attentionUser = true;
						}
						wx.showToast({
							title: "关注成功",
							duration: 1000,
							mask: true
						});
					} else {
						if (this.tabulation.userId == item.userId) {
							this.tabulation.attentionUser = false;
						}
						wx.showToast({
							title: "取消关注",
							icon: "none",
							duration: 1000,
							mask: true
						});
					}
				});
			},
			// 调取视频详情
			getparticulars() {
				WXAJAX.POST({
					companyId:this.companyId,
					videoId: this.videoId,
					// cardId:wx.getStorageSync('cardId'),
				}, '', '/shortVideo/queryById').then(res => {
          this.dynamicId = res.dynamicId
					this.tabulation = res
					// this.dynamicId = res.dynamicId
					this.cardId = res.cardId
					this.getprofile()
					this.getoneself()
					this.getInits()
				})
			},
			// 公司简介
			getprofile() {
				WXAJAX.POST({
					companyId: this.companyId,
					cardId: this.viedocardId,
				}, '', '/personal/getWebsiteInfo/V2', '', '', 2).then(res => {
					this.companyNotice = res.companyNotice
				})
			},
			// 评论的弹出框
			getdiscuss() {
				this.isinput = !this.isinput
				this.istext = true
			},
			// 得到评论
			getoneself() {
				WXAJAX.POST({
					dynamicId: this.dynamicId,
				}, '', '/dynamic/getDynamicDetail', '', '', 1).then(res => {
					this.dynamic = res
					this.time = util.getdate(res.createTime, 'dateTime')
					this.dynamic.createTime = util.getdate(this.dynamic.createTime, "dateTime");
					this.dynamic.createTime = this.getDateConversion(this.dynamic.createTime)
					this.dynamic.createTime = util.getFormatTime(this.dynamic.createTime, true)
					if (this.dynamic.commentModelList) {
						let list = this.dynamic.commentModelList
						list.forEach((item, k) => {
							item.createTime = util.getdate(item.createTime, "dateTime")
							item.createTime = this.getDateConversion(item.createTime)
							this.dynamic.commentModelList[k].createTime = util.getFormatTime(item
								.createTime, true)
						});
					} else {
						this.dynamic.commentModelList = []
					}
					this.title = res.title || ''
					this.photos = res.photos.split(',')
				})
			},
			getDateConversion(data) {
				let phoneSystem = "";
				wx.getSystemInfo({
					success: function(res) {
						phoneSystem = res.system;
					}
				});
				if (phoneSystem.indexOf("iOS") != -1) {
					data = data.replace(/-/g, "/");
				}
				return Date.parse(data);
			},
			zan1(item) {
				// this.goodname = e.detail.value // 已使用v-model,无需再次赋值
				// 节流,避免输入过快多次请求
				this.searchTimer && clearTimeout(this.searchTimer);
				this.searchTimer = setTimeout(() => {
					this.zan(item);
				}, 300);
			},
			//点赞
			zan(item) {
				let v = this;
				var dynamic_lists = v.tabulation
				authSubscribeMessage(this.subscriptionNew);
				let isLogin = HandleLogin.returnIsLogin();
				if (!isLogin) {
					uni.showToast({
						title: "请先登录,才可以点赞喔",
						icon: "none"
					});
					return;
				}
				let likes = "";
				if (item.like == false) {
					likes = true;
				} else if (item.like == true) {
					likes = false;
				}
				wx.showLoading();
				WXAJAX.POST({
							like: likes,
							userId: wx.getStorageSync("userId"),
							videoId: item.videoId
						},
						"",
						"/shortVideo/addAttentionUser", "", "", 2
					)
					.then(data => {
						wx.hideLoading();
						if (item.like == false) {
							item.like = true;
							item.likesNum += 1;
							wx.showToast({
								title: "点赞成功",
								duration: 1000,
								mask: true
							});
						} else {
							item.like = false;
							item.likesNum -= 1;
							wx.showToast({
								title: "取消点赞",
								icon: "none",
								duration: 1000,
								mask: true
							});
						}
					})
					.catch(err => {
						console.log(err);
						wx.hideLoading();
					});
			},
			// 写评论
			inputConfirm() {
				let v = this
			  //输入完成
			  authSubscribeMessage(this.subscriptionNew);
			  WXAJAX.POST(
			    {
			     dynamicId: v.dynamicId,
			     parentId: this.replayComment.commentId || 0,
			     cardId: wx.getStorageSync("cardId"),
			     text: this.comments
			    },
			    "",
			    "/personal/doComment",'','',2
			  ).then(res => {
			    var date = new Date()
			    date = util.getdate(date, "dateTime")
			    date = this.getDateConversion(date)
			    date = util.getFormatTime(date, true)
			    v.dynamic.commentModelList.push({
			      text: this.comments,
			      replyName: this.replayComment.userName || "",
			      logo: wx.getStorageSync("avatarUrl"),
			      createTime: date,
			      userName: wx.getStorageSync("USERNAME")
			    });
			    this.input_show = false;
			    this.comments = "";
			  });
			},
			// 收藏
			collect(item) {
				console.log(this.tabulation.collection)
				let isLogin = HandleLogin.returnIsLogin();
				if (!isLogin) {
					uni.showToast({
						title: "请先登录,才可以点赞喔",
						icon: "none"
					});
					return;
				}
				wx.showLoading();
				let _url = '',
					_request = {};
				if (item.collection == true) { //取消收藏
					_url = '/personal/delCollection';

				}
				if (item.collection == false) { //添加收藏
					_url = '/personal/addCollection';
				}
				_request = {
					itemType: 4,
					itemId: this.videoId,
				};

				WXAJAX.changeCollect3(_request, _url).then((data) => {
					console.log('二月我扎十四个', data)
					if (data) {
						if (this.tabulation.collection == false) {
							this.$set(this.tabulation, 'collection', true)
						} else {
							this.$set(this.tabulation, 'collection', false)
						}
					}
					wx.hideLoading();
				}).catch((err) => {
					wx.hideLoading();
				});
				// this.getparticulars()
			},
			// 打开转发功能
			forward(tabulation) {
				this.share = !this.share
			},
			closeShare() {
				this.share = false;
			},
      save_phone_number(phone, code) {
      	this.dialog_show = false
      	this.updatePrecise();
      },
      //关闭修改电话弹窗
      close_change_number() {
      	this.dialog_show = false
      },
      updatePrecise(){//修改精准转发的获奖状态
        let params={
          preciseId: this.preciseId,
          readFlag: 1,
          answerScore:this.score
        };
        WXAJAX.POST(params, '', '/precise/record/update','','',1);
        this.submitresult=true;
      }
		}
	}
</script>

<style scoped>
	.box {
		/* height: 100%; */
		background-color: #FFFFFF;
	}

	.frequency {
		width: 100%;
		height: 390rpx;
		/* padding-top: 20rpx; */
	}

	.headline {
		margin-left: 44rpx;
		/* margin-top: 390rpx; */
		color: #101010;
		padding-top: 20rpx;
		font-size: 36rpx;
	}

	.mation {
		margin-left: 44rpx;
		margin-top: 64rpx;
		margin-right: 44rpx;
		display: flex;
		justify-content: space-between;

	}

	.subscriber {
		display: flex;

	}

	.subscriber image {
		width: 108rpx;
		height: 108rpx;
		border-radius: 50%;
		margin-right: 14rpx;
	}

	.solicitude {
		width: 128rpx;
		height: 60rpx;
		font-size: 28rpx;
		background-color: #caf4e8;
		color: rgba(26, 208, 156, 100);
		text-align: center;
		line-height: 58rpx;
		border-radius: 54rpx;
		margin-top: 10rpx;
	}

	.mainbody {
		margin-left: 44rpx;
		margin-right: 38rpx;
		margin-top: 30rpx;
		font-size: 24rpx;
		color: #8F8F8F;
	}

	.orientation {
		margin-left: 42rpx;
		margin-top: 40rpx;
		display: flex;
	}

	.orientation image {
		width: 38rpx;
		height: 38rpx;
	}

	.release {
		font-size: 24rpx;
		color: #B5B5B5;
		margin-left: 42rpx;
		margin-top: 16rpx;
	}

	.successions {
		margin-left: 40rpx;
		margin-right: 40rpx;
		display: flex;
		justify-content: space-between;
		margin-top: 24rpx;
		padding-bottom: 20rpx;
	}

	.successions image {
		width: 44rpx;
		height: 44rpx;
		margin-top: 8rpx;
		margin-left: 15rpx;
		margin-right: 10rpx;
	}

	.comment {
		width: 140rpx;
		height: 60rpx;
		background-color: #F5F5F5;
		border-radius: 50rpx;
		display: flex;
		line-height: 60rpx;
	}

	.review {
		width: 100%;
		height: 85rpx;
		background-color: #F5F5F5;
		position: absolute;
		bottom: 0;
	}

	.inpuu {
		background-color: #FFFFFF;
		width: 600rpx;
		/* height: 76rpx; */
		margin-left: 40rpx;
		margin-top: 16rpx;
		font-size: 36rpx;
	}

	.fixedNavbar {
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		width: 100%;
	}
</style>
