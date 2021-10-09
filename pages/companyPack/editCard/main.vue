<template>
	<div class="pb50">

		<div class="edit_card_top trans2" :class="changeing ? 'fade' : '' ">

			<div v-show="card_style == 0">
				<Card_1 :card_msg="card_msg"></Card_1>
			</div>

			<div v-show="card_style == 1">
				<Card_2 :card_msg="card_msg" @uploadpic="uploadpic"></Card_2>
			</div>

			<div v-show="card_style == 2">
				<Card_3 :card_msg="card_msg"></Card_3>
			</div>

			<div v-show="card_style == 3">
				<Card_4 :card_msg="card_msg"></Card_4>
			</div>
			<!--2.0开始-->
			<div v-show="card_style == 4">
				<Card_5 :card_msg="card_msg"></Card_5>
			</div>
			<div v-show="card_style == 5">
				<Card_6 :card_msg="card_msg"></Card_6>
			</div>
			<div v-show="card_style == 6">
				<Card_7 :card_msg="card_msg"></Card_7>
			</div>
			<!--2.0结束-->

		</div>

		<!--名片样式-->
		<div class="bgfff pl16 pb10 mb10">
			<p class="fs16 c38 fbold pb12">名片样式</p>
			<div class="disflex">
				<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/img_card1.png"
					alt="" class="w50 h50 mr10 bradius5 borderbox" :class="card_style == 0 ? 'bblue' : 'bfff' "
					@click="card_style_change(0)">
				<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/img_card6.png"
					alt="" class="w50 h50 mr10 bradius5 borderbox" :class="card_style == 1 ? 'bblue' : 'bfff' "
					@click="card_style_change(1)">

				<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/img_card3.png"
					alt="" class="w50 h50 mr10 bradius5 borderbox" :class="card_style == 4 ? 'bblue' : 'bfff' "
					@click="card_style_change(4)">

				<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/img_card4.png"
					alt="" class="w50 h50 mr10 bradius5 borderbox" :class="card_style == 5 ? 'bblue' : 'bfff' "
					@click="card_style_change(5)">
				<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/img_card5.png"
					alt="" class="w50 h50 mr10 bradius5 borderbox" :class="card_style == 6 ? 'bblue' : 'bfff' "
					@click="card_style_change(6)">

				<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/img_card2.png"
					alt="" class="w50 h50 mr10 bradius5 borderbox" :class="card_style == 2 ? 'bblue' : 'bfff' "
					@click="card_style_change(2)">
				<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/img_card7.png"
					alt="" class="w50 h50 mr10 bradius5 borderbox" :class="card_style == 3 ? 'bblue' : 'bfff' "
					@click="card_style_change(3)">

			</div>
		</div>

		<div class="bgfff pl16 pr17 lh49 fs16 c38 mb11">
			<div class="disflex jsbet" v-if="modelSwtich">
				<span class="fbold pr10 marks">是否公开到人脉集市</span>
				<!-- <div class="disflex row-reverse align-cen" >
          <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/right.png" alt="" class="w10 h10" />
          <span class="pr15">{{share_scope.name}}</span>
        </div> -->
				<radio-group @change="radioChange($event)" class="disflex">
					<label class="uni-list-cell mr10 uni-list-cell-pd">
						<radio :value="true" color="#51CDCB" :checked="card_msg.isPublic == true" />是
					</label>
					<label class="uni-list-cell mr10 uni-list-cell-pd">
						<radio :value="false" color="#51CDCB" :checked="card_msg.isPublic == false" />否
					</label>
				</radio-group>
			</div>
			<div class="disflex jsbet " @click="chooseCompany">
				<label for="company" class="fbold marks pr15">机构</label>
				<div class="disflex align-cen">
					<input type="text" id="company" class="pha8 textr h49 pr15" placeholder="机构"
						v-model="card_msg.company" readonly disabled>
					<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/right.png" alt=""
						class="w10 h10">
				</div>
			</div>

			<div class="disflex jsbet align-cen" v-if="type != 'edit'">
				<label for="password" class="fbold marks pr15">密令</label>
				<input type="text" id="password" class="pha8 textr h49 w220" placeholder="联系该机构管理者获取密令"
					v-model="card_msg.password">
			</div>

			<div class="disflex jsbet align-cen">
				<label for="post" class="fbold">职位</label>
				<!-- <input type="text"
               id="post"
               class="pha8 textr h49"
               placeholder="职位"
               v-model="card_msg.post"> -->
				<view class="disflex jsbet align-cen">
					<picker @change="bindPickerChange" class="pha8 textr h49" :value="index" :range="array"
						range-key="labelTitle">
						<view class="picker">{{array[index].labelTitle}}<img
								src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/right.png"
								alt="" class="w10 h10"></view>

					</picker>
				</view>


			</div>
			
			<div class="disflex jsbet">
				<span class="fbold pr10 marks">名片类型</span>
				<radio-group @change="radioChange2($event)" class="disflex">
					<label class="uni-list-cell mr10 uni-list-cell-pd">
						<radio :value="1" color="#51CDCB" :checked="card_msg.cardType == 1" />个人名片
					</label>
					<label class="uni-list-cell mr10 uni-list-cell-pd">
						<radio :value="0" color="#51CDCB" :checked="card_msg.cardType == 0" />机构名片
					</label>
				</radio-group>
			</div>
		</div>

		<!--基本信息-->
		<div class="bgfff pl16 pr17 lh49 fs16 c38 mb11 info-form">
			<div class="disflex jsbet pt10 pb10">
				<span class="fbold">头像</span>
				<div class="disflex align-cen" @click="uploadpic('user', 1)">
					<img :src="card_msg.picchecked || userlogo " alt="" mode="aspectFill"
						class="w50 h50 bradius50p mr13">
					<!--   <form action="https://api.mingyicloud.com/file/uploadObjectOSS" method="post">
                 <input type="file" value="上传">
             </form>-->
					<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/right.png" alt=""
						class="w10 h10">
				</div>
			</div>

			<div class="disflex jsbet align-cen">
				<label for="username" class="fbold marks pr15">姓名</label>
				<input type="text" id="username" class="pha8 textr h49" placeholder="姓名" v-model="card_msg.username">
			</div>

			<div class="disflex jsbet align-cen">
				<label for="tel" class="fbold marks pr15">手机号</label>
				<input type="number" id="tel" class="pha8 textr h49" placeholder="手机号" v-model="card_msg.tel">
			</div>

			<div class="disflex jsbet align-cen">
				<label for="wx" class="fbold">微信号</label>
				<input type="text" id="wx" class="pha8 textr h49" placeholder="微信号" v-model="card_msg.wx">
			</div>

			<div class="disflex jsbet align-cen">
				<label for="company_wx" class="fbold">机构微信</label>
				<input type="text" id="company_wx" class="pha8 textr h49" placeholder="机构微信"
					v-model="card_msg.company_wx">
			</div>

			<div class="disflex jsbet align-cen">
				<label for="email" class="fbold">邮箱</label>
				<input type="text" id="email" class="pha8 textr h49" placeholder="邮箱" v-model="card_msg.email">
			</div>
		</div>

		<!--个人简介-->
		<div class="bgfff pl16 pr18 pb15 pt17 fs16 mb10">
			<p class="pb10 c38 fbold">个人简介</p>

			<div class="disflex pb15">
				<img :src="card_msg.picchecked || userlogo" mode="aspectFill" alt="" class="w40 h40 bradius5 mr15">

				<div class="disflex">
					<div class='output-audio'>

						<!-- 默认状态 -->
						<div class='audio 111' v-if="audioArr.bl == false" @click='audioPlay' :data-key="audioArr.src"
							:data-id="audioArr.id" :data-bl="audioArr.bl">
							<img class='ico' src='/static/images/play-voice.png' />
						</div>

						<!-- 当前正在播放状态 -->
						<div class='audio' v-if="audioArr.bl==true" @click='audioStop' :data-key="audioArr.src"
							:data-id="audioArr.id" :data-bl="audioArr.bl">
							<img class='ico' src='/static/images/play-voiceimg.gif' />
						</div>

					</div>

					<span class="fs12 ca8 disflex column-reverse">{{audioArr.time+'"'}}</span>

				</div>

				<button open-type="getUserInfo" lang="zh_CN"
					class="cfff bg_line_blue textc bradius5 lh40 pl10 pr10 fs16 border0" @getuserinfo="onGotUserInfo"
					@touchstart="record_begin" @touchend="record_end">
					长按录音
				</button>
			</div>

			<div>
				<textarea name="" v-model="intro" v-if="showTextarea" @blur="showTextarea=false" :focus="showTextarea"
					class="bgf5f6 pl16 pr16 pt15 pb15 be8 bradius5 fs16 pha8 h119 borderbox w100p"
					placeholder="文字简介(120字以内)">
            </textarea>
				<div class="textarea" @click="showTextarea=true" v-else>
					{{intro || "文字简介(120字以内)"}}
				</div>
			</div>
		</div>
		<!--视频展示-->
		<!-- <div v-if="self_video.length === 0"
         class="bgfff pl16 pr18 pb15 pt17 fs16 mb10">
      <view class="pb10 c38 fbold jsbet align-cen"
            style="display: flex">
        <text>视频展示</text>
      </view>
      <div class="disflex wrap">
        <div class="bgfff mr10 mb7 posre"
             v-for="(v,k) in self_video"
             :key="k">
          <video class="bradius10 w100 h100"
                 :src="v.videoUrl"
                 objectFit="cover"
                 controls></video>
        </div>
        <div class="bgfff bdash_a8 w100 h100 add_img mr7 mb7"
             @click="goPage"></div>
      </div>
    </div> -->
		<!-- <div v-else
         class="bgfff pl16 pr18 pb15 pt17 fs16 mb10"
         @click="goPage">
      <view class="pb10 c38 fbold jsbet align-cen"
            style="display: flex">
        <text>视频展示</text>
        <text style="color: #51BCBD">编辑</text>
      </view>
      <div class="disflex wrap">
        <div class="bgfff mr10 mb7 posre"
             @click.stop="stop"
             v-for="(v,k) in self_video"
             :key="k">
          <video class="bradius10 w100 h100"
                 :src="v.videoUrl"
                 objectFit="cover"
                 controls></video>
        </div>
      </div>
    </div> -->

		<div class="fs16 bgfff pl16 pb15 mb10">
			<p class="lh47 fbold pt17 pb10">图片展示</p>
			<div class="disflex wrap">
				<div class="bgfff bdash_a8 w100 h100 mr7 mb7 posre" v-for="(v,k) in self_photos" :key="k">
					<img :src="v" alt="" class="w100p h100p" mode="aspectFill">
					<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/del.png" alt=""
						class="w20 h20 posab right2 top2" @click="delImg(k)">
				</div>
				<div class="bgfff bdash_a8 w100 h100 add_img mr7 mb7" @click="uploadpic('self', 9)">
				</div>
				<!-- <div v-if="self_photos.length < 9"
             class="bgfff bdash_a8 w100 h100 add_img mr7 mb7"
             @click="uploadpic('self', 9)"></div> -->
			</div>
		</div>

		<div class="fs16 bgfff pl16 pb15 mb44">
			<p class="lh47 fbold pt17 pb10">热销产品 <span @click="editGoods" class="editGoods pr16">编辑</span></p>
			<div class="disflex wrap">
				<div class="btf5f6 bbf5f6">
					<div class="list h85 pt10 pb15 pl10 pr15" v-for="(data) in companyGoodsResponses" :key="data.price">
						<image class="w60 h60" :src="data.goodsPhoto"></image>
						<div class="list-right">
							<p>{{data.goodsName ? data.goodsName : ''}}</p>
							<div class="delete">
								<span class="fs12 corange">￥{{data.price ? data.price : ''}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>


		<BottomButtonSmall :text="'保存'" :url="'save'" @btn_tap="btn_tap"></BottomButtonSmall>
		<canvas style="width: 500px;height: 500px;position: fixed;bottom: -4000px;z-index: -100"
			canvas-id="Canvas"></canvas>
	</div>
</template>

<script>
	import util from '@/utils/index'
	import BottomButtonSmall from '@/components/bottom_button_small'
	import Card_1 from '@/components/card_1' 
	import Card_2 from '@/components/card_2' 
	import Card_3 from '@/components/card_3' 
	import Card_4 from '@/components/card_4' 
	import Card_5 from '@/components/card_5' 
	import Card_6 from '@/components/card_6' 
	import Card_7 from '@/components/card_7' 

	import WXAJAX from '@/utils/request'
	import {
		mapGetters
	} from "vuex";


	let myaudio = wx.createInnerAudioContext();
	const recorderManager = wx.getRecorderManager();
	const platform = wx.getSystemInfoSync().platform;
	const version = wx.getSystemInfoSync().SDKVersion;
	/*   if (util.compareVersion(version, '2.3.0') >= 0) {
	       wx.setInnerAudioOption({
	           obeyMuteSwitch: false
	       })
	   } else {
	       wx.showModal({
	           title: '提示',
	           content: '当前微信版本过低，静音模式下可能会导致播放音频失败。'
	       })
	   }*/

	export default {
		name: '',
		components: {
			BottomButtonSmall,
			Card_1,
			Card_2,
			Card_3,
			Card_4,
			Card_5,
			Card_6,
			Card_7
		},
		data() {
			return {
				//音频列表
				audioArr: {
					bl: false,
					time: 0,
					id: 0
				},
				begin_time: 0,
				end_time: 0,
				diff_time: 0,
				now_get_auth: false, //
				userlogo: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/user_gray_circle.png', //头像
				intro: '', // 120
				card_style: 0, //名片样式
				changeing: false,
				top_height: ['262px', '410px', '229px', '228px'],
				card_msg: {
					picchecked: '',
					username: '',
					tel: '',
					wx: '',
					company_wx: '',
					email: '',
					post: '',
					company: '',
					companyId: 0,
					company_logo: '',
					password: '',
				},
				self_photos: [], //个人图片
				self_video: [], // 个人视频
				type: 'add', //新增 / 编辑
				cardId: 0,
				showTextarea: false,
				isLoading: false,
				companyGoodsResponses: [],
				modelSwtich: false,
				cardType: 0,
				index: 0,
				array: [],
				zhiweitext:'',
				isPublic:true,
			}
		},
		watch: {
			intro: function(newVal, oldVal) {
				if (newVal.length > 120) {
					this.intro = this.intro.slice(0, 120)
				}
			}
		},
		onLoad() {
			//是否为编辑
			if (this.$root.$mp.query.type && this.$root.$mp.query.type == 'edit') { //编辑名片
				this.type = 'edit';
				this.getMyCard()
			} else {
				this.type = 'add';

				//还原数据
				this.card_msg = {
					picchecked: wx.getStorageSync('avatarUrl'),
					username: wx.getStorageSync('userName'),
					tel: wx.getStorageSync('phone'),
					wx: '',
					company_wx: '',
					email: '',
					post: '',
					company: '',
					companyId: 0,
					company_logo: '',
					selfCompany: {},
					password: '',
				};
			}
			this.getStorageCompanyInfo();
			this.getSelfCompany();
		},
		onShow() {
			if(wx.getStorageSync('zhiweitext')){
				let text = ''
				text = wx.getStorageSync('zhiweitext')
				this.zhiweitext = text.toString()
				wx.removeStorageSync('zhiweitext')
			}
			// if (this.type == 'edit') this.getMyCard();
			// if (this.type !== 'edit') {
			//   this.getStorageCompanyInfo();
			//   this.getSelfCompany();
			// }
			wx.setNavigationBarTitle({
				title: "编辑名片"
			});
			this.getzhiweilabel();
			this.now_get_auth = wx.getStorageSync('now_get_auth') || false;
			this.queryHotGoods();
			// this.queryVideoInfo();
			console.log(this.goodsInof = this.$store.state.selectGoodsInfo)
			this.getCompanyModelSwtich()
		},
		onUnload() { //页面卸载
			myaudio.stop();
		},
		computed: {
			...mapGetters(['currentCompany']),
		},
		methods: {
			//下拉选
			bindPickerChange(e) {
				this.index = e.detail.value;
				// this.dayNum = this.array[this.index].id;
			},
			//获取职位标签
			getzhiweilabel() {
				let data = {
					labelType: 9,
				}
				WXAJAX.POST(data, '', '/sys/label/queryList', '', '', 1).then(data => {
					if (data) {
						// this.zhiweilList = data
						this.array = data
					}
				})
			},
			// 视频展示
			goPage() {
				if (this.self_video.length !== 0) {
					wx.navigateTo({
						url: '../../buyVideo/videoExhibition/main'
					})
				} else {
					if (this.type === 'add') {
						wx.showToast({
							icon: 'none',
							title: '请保存名片后再添加视频噢',
							duration: 2000
						})
						return;
					}
					// 添加视频
					wx.navigateTo({
						url: '../buyVideo/editVideoExhibition/main?type=create'
					})
				}
			},
			getSelfCompany() {
				WXAJAX.POST({
					ignore: true
				}, '', '/company/getCompanyId').then((data, code) => {
					if (code != 209) {
						this.selfCompany = data || {};
						if (data) {
							this.$set(this.card_msg, 'company', data.companyName);
							this.$set(this.card_msg, 'companyId', data.companyId);
							this.$set(this.card_msg, 'company_logo', data.companyLogo);
						}
					}
				});
			},
			// 阻止事件冒泡
			stop(e) {
				e.stopPropagation()
			},
			getStorageCompanyInfo() {
				let company = wx.getStorageSync('choose_company') || '',
					company_id = wx.getStorageSync('choose_company_id') || '',
					company_logo = wx.getStorageSync('choose_company_logo') || '';
				this.$set(this.card_msg, 'company', company);
				this.$set(this.card_msg, 'companyId', company_id);
				this.$set(this.card_msg, 'company_logo', company_logo);
			},
			getMyCard() { //获取名片信息
				wx.showLoading();
				WXAJAX.POST({
					ignore: true
				}, '', '/businessCard/getUserCard').then((data) => {
					wx.hideLoading();
					if (data) {
						if (data.soundRecording) {
							this.audioArr = {
								bl: false,
								time: data.soundTime,
								id: 1,
								src: data.soundRecording
							}
						}
						this.card_msg = {
							companyId: data.companyId,
							picchecked: data.logo || '',
							username: data.name || '',
							tel: data.phone || '',
							wx: data.personalWx || '',
							company_wx: data.companyWx || '',
							email: data.email || '',
							post: data.position || '',
							company: data.companyName,
							company_logo: data.companyLogo,
							password: data.password || '',
							isPublic: data.isPublic || false,
							cardType: data.cardType || 0,
						};
						this.card_style = data.style || 0;
						this.self_video = data.videoList || [];
						this.cardId = data.cardId;
						if (data.photo === '暂无') {
							this.self_photos = [];
						} else if (data.photo) {
							this.self_photos = data.photo.split(',');
						}
						this.intro = data.briefIntroduction || '';
						wx.setStorageSync('choose_company', this.card_msg.company);
						wx.setStorageSync('choose_company_id', this.card_msg.companyId);
						wx.setStorageSync('choose_company_logo', this.card_msg.company_logo);

					} else {
						wx.showToast({
							title: '获取名片信息失败，请重试！',
							duration: 2000,
							icon: 'none'
						});
					}
				}).catch((err) => {
					wx.hideLoading();
				});

			},
			async queryVideoInfo() { //获取名片信息
				wx.showLoading();
				WXAJAX.POST({
					ignore: true
				}, '', '/businessCard/getUserCard').then((data) => {
					wx.hideLoading();
					if (data) {
						this.self_video = data.videoList || [];
					} else {
						wx.showToast({
							title: '获取名片信息失败，请重试！',
							duration: 2000,
							icon: 'none'
						});
					}
				}).catch((err) => {
					wx.hideLoading();
				});

			},
			audioPlay(e) { //音频播放

				myaudio = wx.createInnerAudioContext();
				myaudio.obeyMuteSwitch = false;
				if (!this.audioArr.id) {
					wx.showToast({
						title: '您还没有录音！',
						duration: 2000,
						icon: 'none'
					});
					return
				}

				var that = this,
					id = e.currentTarget.dataset.id,
					key = e.currentTarget.dataset.key,
					audioArr = that.audioArr,
					vidSrc = audioArr.src;

				myaudio.src = vidSrc;
				myaudio.autoplay = true;

				//切换显示状态
				/*  for (var i = 0; i < audioArr.length; i++) {
				      audioArr[i].bl = false;
				  }*/
				audioArr.bl = true;

				//开始监听
				myaudio.onPlay(() => {
					that.audioArr = audioArr;
				})

				//结束监听
				myaudio.onEnded(() => {
					audioArr.bl = false;
					that.audioArr = audioArr;
				})

			},
			audioStop(e) { // 音频停止
				var that = this,
					key = e.currentTarget.dataset.key,
					audioArr = that.audioArr;
				//切换显示状态
				/* for (var i = 0; i < audioArr.length; i++) {
				     audioArr[i].bl = false;
				 }*/
				audioArr.bl = false;

				myaudio.stop();
				//停止监听
				myaudio.onStop(() => {
					audioArr.bl = false;
					that.audioArr = audioArr;

				})
				//结束监听
				myaudio.onEnded(() => {
					audioArr.bl = false;
					that.audioArr = audioArr;
				})
			},

			onGotUserInfo(res) { //获取用户信息--授权
				var data = res.mp.detail;
				this.audioArr.bl = false;
				// this.showdiaglo = false ;

				if (data.encryptedData) {
					this.now_get_auth = true;
					wx.setStorageSync('now_get_auth', true);
				} else {
					wx.showToast({
						title: '您已取消授权！',
						duration: 2000,
						icon: 'none'
					})
				}
				data = null;
			},
			record_begin() { //手指按下
				var that = this;
				myaudio.stop();
				that.audioArr.bl = true;
				recorderManager.start({
					format: 'mp3' // 如果录制acc类型音频则改成aac
				});
				that.begin_time = +new Date();
				recorderManager.onError(function() {
					console.log('失败-----')
					// 录音失败的回调处理
				});
				recorderManager.onStop(function(res) {
					if (!that.now_get_auth) {
						that.now_get_auth = true;
						return
					}
					//上传录音
					WXAJAX.UploadImage(res.tempFilePath).then((data) => {
						wx.hideLoading();
						data = JSON.parse(data);
						if (data.code == '200') {
							wx.showToast({
								title: '恭喜!录音成功',
								icon: 'success',
								duration: 1000
							});
							that.end_time = +new Date();
							that.diff_time = that.end_time - that.begin_time;
							that.diff_time = Math.ceil(that.diff_time * 0.001);
							// that.audioArr = [];
							// 停止录音之后，把录取到的音频放在res.tempFilePath
							that.audioArr = {
								id: '1',
								src: WXAJAX.imgBackUrl + data.data,
								bl: false,
								time: that.diff_time
							}
						} else {
							wx.showToast({
								title: '录音失败，请重试！',
								icon: 'success',
								duration: 1000
							});
							that.audioArr = {
								id: '0',
								src: '',
								bl: false,
								time: 0
							}
						}
					}).catch((err) => {
						wx.hideLoading();
						that.audioArr = {
							id: '0',
							src: '',
							bl: false,
							time: 0
						};
						console.log('err -- ', err);
					});
				});
			},
			record_end() { //手指抬起
				recorderManager.stop();
				this.audioArr.bl = false;
			},
			async uploadpic(str, count) {
				let a = this.card_msg;
				if (str == 'self' && this.self_photos.length >= 9) {
					wx.showToast({
						title: '最多选择九张！',
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
							v.self_photos.push(WXAJAX.imgBackUrl + data.data);
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
			btn_tap() { //保存名片
				if (this.isLoading) return;
				let v = this,
					_url = '';
				myaudio.stop();
				if (!v.card_msg.username) {
					wx.showToast({
						title: '请输入姓名！',
						duration: 2000,
						icon: 'none'
					});
					return
				}
				if (!v.card_msg.tel || !util.checkPhone(v.card_msg.tel)) {
					wx.showToast({
						title: '请输入正确的电话！',
						duration: 2000,
						icon: 'none'
					});
					return
				}
				if (!v.card_msg.company && this.type == 'add') {
					wx.showToast({
						title: '请选择机构！',
						duration: 2000,
						icon: 'none'
					});
					return
				}

				if (!v.card_msg.password && this.type == 'add') {
					wx.showToast({
						title: '请输入密令！',
						duration: 2000,
						icon: 'none'
					});
					return
				}

				let photos = v.self_photos.join(',');
				let companyId = '';
				if (this.type == 'add') {
					_url = '/businessCard/createCard'
					companyId = v.card_msg.companyId;
				} else {
					_url = '/businessCard/updateCard'
				}

				this.isLoading = true;
				wx.showLoading();
				WXAJAX.POST({
					isPublic: v.isPublic,
					style: v.card_style,
					cardType: v.cardType,
					companyId: companyId,
					name: v.card_msg.username,
					phone: v.card_msg.tel,
					logo: v.card_msg.picchecked, //头像
					personalWx: v.card_msg.wx,
					companyWx: v.card_msg.company_wx,
					photo: photos, //个人照片集合（1.png,2.png,3.png）
					position: v.array[v.index].labelTitle, //
					soundRecording: v.audioArr.src || '', //个人录音
					soundTime: v.audioArr.time,
					email: v.card_msg.email || '',
					briefIntroduction: v.intro || '', //个人简介
					cardId: v.cardId,
					password: v.card_msg.password || '',
				}, '', _url).then((data) => {
					this.isLoading = false;
					wx.hideLoading();
					if (data) {
						console.log('isPublic', v.isPublic,
					'cardType', v.cardType)
						//保存成功 更新头像
						wx.setStorageSync('avatarUrl', v.card_msg.picchecked);
						wx.showToast({
							title: '保存成功',
							duration: 2000,
							icon: 'none'
						});

						if (wx.getStorageSync('isOtherAppInto')) {
							util.toMiniProgram(`/pages/cardCase/main?goType=1`).catch(err => {
								wx.reLaunch({
									url: '/pages/mine/main'
								});
							});

							wx.removeStorageSync('isOtherAppInto');
						} else {
							setTimeout(function() {
								wx.reLaunch({
									url: '/pages/mine/main'
								});
							}, 500)
						}

					}
				}).catch((err) => {
					this.isLoading = false;
					console.log(err);
					wx.hideLoading();
					wx.showToast({
						title: err.message,
						duration: 2000,
						icon: 'none'
					});
				})
			},
			card_style_change(type) { //切换名片样式
				wx.showLoading();
				this.changeing = true;
				this.card_style = type;
				setTimeout(() => {
					this.changeing = false;
					wx.hideLoading();
				}, 500)
			},
			chooseCompany() {
				const {
					type,
					invite
				} = this.$root.$mp.query;

				if (this.selfCompany.companyId) {
					wx.showToast({
						title: '如需更换机构，请先退出当前机构，再重新创建名片',
						duration: 2000,
						icon: 'none'
					});
					return;
				}

				if (type && type == 'edit' || invite == '1') {
					wx.showToast({
						title: '请先退出当前机构后，再重新创建名片',
						duration: 2000,
						icon: 'none'
					});
					return;
				}
				this.page_turn('companyPack/searchChooseItem', 'company');
			},
			page_turn(url, type) {
				wx.navigateTo({
					url: '../' + url + '/main?type=' + type
				})
			},
			async queryHotGoods() {
				if (this.currentCompany && this.currentCompany.cardId) {
					let data = await WXAJAX.POST({
							cardId: this.currentCompany.cardId
						},
						"",
						"/businessCard/getCardHotGoods"
					);
					if (data) {
						this.companyGoodsResponses = data;
						this.companyGoodsResponses.forEach(item => {
							var price = item.price / 100;
							item.price = price.toFixed(2);
						})
					}
				}
			},
			editGoods() {
				if (this.currentCompany.companyId) {
					var cid = this.currentCompany.companyId
					//editType 表示名片编辑商品，页面保存返回时需要保存热销商品
					wx.navigateTo({
						url: `../selectCommidit/main?cardId=${this.currentCompany.cardId}&cid=${cid}`
					})
				}
			},
			delImg(index) { //删除图片
				wx.showLoading();
				this.self_photos.splice(index, 1);
				wx.hideLoading();
			},
			radioChange(e) {
				this.isPublic = e.detail.value
				console.log(this.isPublic)
			},
			radioChange2(e) {
				this.cardType = e.detail.value
				console.log(this.isPublic)
			},
			//是否显示需求审核开关
			getCompanyModelSwtich() {
				var v = this
				WXAJAX.POST({
							companyId: WXAJAX.smartMainId
						},
						"",
						"/businessCard/queryCompanyModelSwtich"
					)
					.then(data => {
						if (data) {
							for (var i in data) {
								if (data[i].modelType == 1) {
									v.modelSwtich = data[i].switchState
								} else {
									v.modelSwtich = false
								}
							}
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
		}
	}
</script>

<style>
	.info-form>div>label {
		white-space: nowrap;
	}

	.textarea {
		width: 100%;
		box-sizing: border-box;
		padding: 30upx 32upx;
		min-height: 238upx;
		font-size: 32upx;
		border-radius: 10upx;
		border: 1upx solid #e8e8e8;
		background: #f5f5f6;
		cursor: auto;
		display: block;
		position: relative;
		color: #a8a8a8;
	}

	.output-audio {
		width: 167px;
		height: 40px;
		position: relative;
		margin-right: 22upx;
	}

	.audio::before {
		content: "";
		display: block;
		width: 20upx;
		height: 20upx;
		background: #f5f5f6;
		position: absolute;
		border: 1upx solid #e8e8e8;
		border-radius: 8upx;
		transform: rotate(45deg);
		border-right-width: 0;
		border-top-width: 0;
		top: 0px;
		bottom: 0;
		left: -12upx;
		margin: auto;
	}

	.output-audio .audio {
		padding: 20upx 0 24upx 34upx;
		background: #f5f5f6;
		border: 1upx solid #e8e8e8;
		position: relative;
		height: 34upx;
		border-radius: 10upx;
	}

	.output-audio .audio .ico {
		width: 24upx;
		height: 34upx;
		float: left;
	}

	@keyframes fade-in {
		0% {
			opacity: 0;
		}

		/*初始状态 透明度为0*/
		40% {
			opacity: 0;
		}

		/*过渡状态 透明度为0*/
		100% {
			opacity: 1;
		}

		/*结束状态 透明度为1*/
	}

	@-webkit-keyframes fade-in {

		/*针对webkit内核*/
		0% {
			opacity: 0;
		}

		40% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	.edit_card_top.fade {
		animation: fade-in;
		animation-duration: 0.5s;
		/*-webkit-animation:fade-in 1.5s;*/
	}

	.card2 .card_bg {
		width: 226px;
		height: 100%;
	}

	.card2 .card2_inner {
		position: absolute;
		left: 162px;
		top: 104upx;
	}

	.card_line_2 {
		position: relative;
	}

	.card_line_2::before,
	.card_line_2::after {
		position: absolute;
		width: 6upx;
		height: 16upx;
		background: #fff;
		top: 0;
		bottom: 0;
		margin: auto;
		content: "";
	}

	.card_line_2::before {
		right: 0;
	}

	.card_line_2::after {
		right: 10upx;
	}

	.card_company {
		position: absolute;
		right: 34upx;
		bottom: 30upx;
	}

	.card3 .cacrd3_left {
		position: absolute;
		left: 106upx;
		top: 96upx;
	}

	.card3 .card3_right {
		position: absolute;
		left: 207px;
		top: 98upx;
	}

	.editGoods {
		float: right;
	}

	.list {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		position: relative;
	}

	.list-right {
		width: 490upx;
		font-size: 28upx;
		line-height: 44upx;
		font-weight: 600;
		word-break: break-all;
		display: -webkit-box;
		/**对象作为伸缩盒子模型展示**/
		-webkit-box-orient: vertical;
		/**设置或检索伸缩盒子对象的子元素的排列方式**/
		-webkit-line-clamp: 2;
		/**显示的行数**/
		overflow: hidden;
		/**隐藏超出的内容**/
		margin-left: 10px;
	}

	.delete {
		position: absolute;
		width: 490upx;
		bottom: 20upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
