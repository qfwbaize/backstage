<template>
  <div class="h100p toppage"
       :class="pageFixed ? 'fix' : '' "
       id="CONT">
    <!--顶部-->
    <div class="pl35 pt10 textc pr35 pb9 bgfff disflex jsbet fix_top borderbox fs12 c78">
      <div @click="addWx">
        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/im_msg.png"
             alt=""
             class="w30 h30">
        <p class="pt8">加微信</p>
      </div>
      <div @click="makePhone">
        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/tel_blue.png"
             alt=""
             class="w30 h30">
        <p class="pt8">打电话</p>
      </div>

      <label v-if="!myPhone">
        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/im_link.png"
             alt=""
             class="w30 h30">
        <p class="pt8">请联系我</p>
        <button open-type="getPhoneNumber"
                class="hide"
                @getphonenumber="getPhoneNumber"></button>
      </label>
      <div @click="contactMe"
           v-else>
        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/im_link.png"
             alt=""
             class="w30 h30">
        <p class="pt8">请联系我</p>
      </div>
      <div @click="toVisit">
        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/im_link.png"
             alt=""
             class="w30 h30">
        <p class="pt8">拜访记录</p>
      </div>
    </div>
    <!--IM内容-->
    <div class="pt123 chat-box"
         @click="chatBoxClickEvent"
         @touchmove="chatBoxClickEvent">
      <div class="im_by_time"
           v-if="msgCont"
           v-for="(msgitem,k) in msgCont.data"
           :key="k">
        <!--时间-->

        <p class="lh39 fs12 ca8 textc">{{indexs[k]}}</p>
        <div class="textc"
             v-if="msgitem.messageType == 4">
          <div :class="{'sys-message': msgitem.sendId == myid}">
            <text v-if="msgitem.sendId == myid">{{seedName}} 已收到你的联系方式</text>
            <div v-else
                 class="sys-messages">
              <view>{{seedName}} 已向你发送了联系方式</view>
              <view class="disflex">尽快与他联系<text @click="callPhone(msgitem.message)"
                    style="font-weight: bold;color: #51cbcd;margin-left: 10upx">{{msgitem.message}}</text></view>
            </div>
          </div>
        </div>
        <template v-else>
          <!--right-->
          <div class="im_right disflex pl22 pr15 im_item flex-end"
               v-if="msgitem.sendId== myid">
            <!--消息状态-->
            <div class="disflex column-reverse w33 fs12 ca8"
                 v-if="msgitem.type==0">未读</div>
            <div class="disflex column-reverse w33 fs12 ca8"
                 v-if="msgitem.type==1">已读</div>
            <!-- 文章 -->
            <div class="im_left_msg im_msg pl8 pr23 pb15 pt14 bgfff bradius5 w250 be8 posre disflex"
                 v-if="msgitem.messageType && msgitem.messageType === 6" @click="toDynamicDetail(msgitem.itemId)">
              <img :src="msgitem.message.photos" alt=""
                   mode="aspectFill"
                   class="w40 h40 bradius5 mr13">
              <div class="flex1">
                <p class="fs14 c38 w100 over_1 ">{{msgitem.message.title}}</p>
                <p class="w100 over_1">
                  <span class="fs12 w100 over_1" style="color:#808080;">来源:{{msgitem.message.originAuthor}}</span>
                </p>
              </div>
              <span class="triangle_border_right"></span>
            </div>
            <!--语音-->
            <div v-if="msgitem.contentType && msgitem.contentType === 3">
              <div class="disinblock">
                <div class='output-audio-right'>
                  <div class='disflex align-cen flex-end audio-right'
                       @click="audioPlay(msgitem.message, k)">
                    <text style="margin-right: 10upx;color: #94a5a5"
                          class="fs12">{{msgitem.duration ? `${msgitem.duration}"` : ''}}</text>
                    <img class='ico-right'
                         v-if="urls !== msgitem.message"
                         src='/static/images/play-voice.png' />
                    <img class='ico-right'
                         v-else
                         src='/static/images/play-voiceimg.gif' />
                  </div>
                </div>
              </div>
            </div>
            <!--图片-->
            <div v-else-if="msgitem.contentType === 2">
              <img mode="widthFix"
                   :src="msgitem.message"
                   @click="previewImg(msgitem.message)"
                   style="border-radius: 10rpx;max-width: 130rpx" />
            </div>
            <!--视频-->
            <div v-else-if="msgitem.contentType === 4">
              <video style="border-radius: 10rpx;max-height: 310rpx;max-width: 310rpx"
                     controls="false"
                     :src="msgitem.message"></video>
            </div>
            <!--文件-->
            <div v-else-if="msgitem.contentType === 5">
              <div class="im_left_msg im_msg pl8 pr23 pb15 pt14 bgfff bradius5 w250 be8 posre disflex">
                <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/if-folder-open@3x.png"
                     alt=""
                     mode="aspectFill"
                     class="w40 h40 bradius5 mr13">
                <div class="flex1">
                  <p class="fs14 c38 w100 over_1">{{msgitem.message.fileName}}</p>
                </div>
                <span class="triangle_border_right"></span>
              </div>
            </div>
            <!--信息-->
            <div v-else>
              <div class="im_right_msg im_msg pl15 pt10 pr18 pb10 bgblue bradius5 w250 be8 posre  "
                   v-if="msgitem.messageType==1">
                <p class="fs14 cfff im_text">{{msgitem.message}}</p>
                <span class="triangle_border_right1"></span>
              </div>
              <!-- 商品 -->
              <div class="im_left_msg im_msg pl8 pr23 pb15 pt14 bgfff bradius5 w250 be8 posre disflex"
                   @click="toGoodsDetail(msgitem)"
                   v-if="msgitem.messageType==3">
                <img :src="msgitem.message.url"
                     alt=""
                     mode="aspectFill"
                     class="w40 h40 bradius5 mr13">
                <div class="flex1">
                  <p class="fs14 c38 w100 over_1">{{msgitem.message.goodsName}}</p>
                  <p class="pt5">
                    <span class="corange fs16">￥{{priceObj[k]}}</span>
                  </p>
                </div>
                <span class="triangle_border_right"></span>
              </div>
              <!-- 供求 -->
              <div class="im_left_msg im_msg pl8 pr23 pb15 pt14 bgfff bradius5 w250 be8 posre disflex"
                   @click="toDemandDetail(msgitem.itemId)"
                   v-if="msgitem.messageType == 7">
                <img :src="msgitem.message.logo" alt=""
                     mode="aspectFill"
                     class="w40 h40 bradius5 mr13">
                <div class="flex1">
                  <p class="fs14 c38 over_1 w100">{{msgitem.message.description}}</p>
                  <p class="pt5 w100 over_1">
                    <span class="fs12 w100 over_1">{{msgitem.message.note}}</span>
                  </p>
                </div>
                <span class="triangle_border_right"></span>
              </div>
              <!-- 第一次聊天推送对方名片 -->
              <div class="im_right_msg  pl15 pt14 pr18 bgfff bradius5 w250 be8 posre"
                   v-if="msgitem.messageType==2">
                <p class="fs14 c38">你好，我是{{msgitem.message.companyName}}的{{msgitem.message.name}}，欢迎进入我的名片，有什么可以帮到你的吗？</p>
                <p class="fs12 ca8 pt10 pb9">您还可以点击查看</p>
                <div class="disflex jsbet fs12 c38 lh30 textc wrap">
                  <span class="be8 bgf5f6 borderbox w104 mb10 "
                        @click="page_turn('Products')">机构产品</span>
                  <span class="be8 bgf5f6 borderbox w104 mb10"
                        @click="page_turn('index')">我的名片</span>
                  <span class="be8 bgf5f6 borderbox w104 mb10 "
                        @click="page_turn('WebSite')">机构官网</span>
                  <span class="be8 bgf5f6 borderbox w104 mb10"
                        @click="page_turn('Dynamic')">机构动态</span>
                </div>
                <span class="triangle_border_right"></span>
              </div>
            </div>
            <!--头像-->
            <img :src="logo"
                 alt=""
                 mode="aspectFill"
                 class="im_right_img ml10 w40 h40 bradius5">
            <!-- 选中 -->
            <label v-show="msgitem.messageType!==2 && showBox == true">
              <checkbox-group @change="startTime">
                 <checkbox :value=msgitem.time style="transform:scale(0.7);margin-left: 2rpx;"/>
              </checkbox-group>
            </label>
          </div>

          <!--left-->
          <div class="im_left disflex pl15 pr22 im_item"
               v-if="msgitem.sendId==sendId">
            <!-- 选中 -->
            <label v-show="msgitem.messageType!==2 && showBox == true">
              <checkbox-group @change="startTime">
                <checkbox :value=msgitem.message style="transform:scale(0.7);margin-right: 2rpx;"/>
              </checkbox-group>

            </label>

            <!--头像-->
            <img :src="userlogo || 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/card1_user.png'"
                 mode="aspectFill"
                 alt=""
                 class="im_left_img mr10 w40 h40 bradius5">
            <!-- 文章 -->
            <div class="im_left_msg im_msg pl8 pr23 pb15 pt14 bgfff bradius5 w250 be8 posre disflex"
                 v-if="msgitem.messageType && msgitem.messageType === 6" @click="toDynamicDetail(msgitem.itemId)">
              <img :src="msgitem.message.photos" alt=""
                   mode="aspectFill"
                   class="w40 h40 bradius5 mr13">
              <div class="flex1">
                <p class="fs14 c38 w100 over_1 ">{{msgitem.message.title}}</p>
                <p class="w100 over_1">
                  <span class="fs12 w100 over_1" style="color:#808080;">来源:{{msgitem.message.originAuthor}}</span>
                </p>
              </div>
              <span class="triangle_border_left"></span>
            </div>

            <!--语音-->
            <div v-if="msgitem.contentType && msgitem.contentType === 3">
              <div class="disinblock">
                <div class='output-audio-left'>
                  <div class='disflex align-cen flex-end audio-left'
                       @click="audioPlay(msgitem.message, k)">
                    <text style="margin-right: 10upx;color: #94a5a5"
                          class="fs12">{{msgitem.duration ? `${msgitem.duration}"` : ''}}</text>
                    <img class='ico-left'
                         v-if="urls !== msgitem.message"
                         src='/static/images/play-voice.png' />
                    <img class='ico-left'
                         v-else
                         src='/static/images/play-voiceimg.gif' />
                  </div>
                </div>
              </div>
            </div>
            <!--图片-->
            <div v-else-if="msgitem.contentType && msgitem.contentType === 2">
              <img mode="widthFix"
                   :src="msgitem.message"
                   @click="previewImg(msgitem.message)"
                   style="border-radius: 10rpx;max-width: 130rpx" />
            </div>
            <!--视频-->
            <div v-else-if="msgitem.contentType && msgitem.contentType === 4">
              <video style="border-radius: 10rpx;max-height: 310rpx;max-width: 310rpx"
                     controls="false"
                     :src="msgitem.message"></video>
            </div>
            <!--文件-->
            <div v-else-if="msgitem.contentType && msgitem.contentType === 5">
                <div class="im_left_msg im_msg pl8 pr23 pb15 pt14 bgfff bradius5 w250 be8 posre disflex">
                  <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/if-folder-open@3x.png"
                       alt=""
                       mode="aspectFill"
                       class="w40 h40 bradius5 mr13">
                  <div class="flex1">
                    <p class="fs14 c38 w100 over_1">{{msgitem.message.fileName}}</p>
                  </div>
                  <span class="triangle_border_left"></span>
                </div>
            </div>
            <!--信息-->
            <div v-else>
              <div class="im_right_msg im_msg pl15 pt10 pr18 pb10 bgfff bradius5 w250 be8 posre word-break-all"
                   v-if="msgitem.messageType==1">
                <p class="fs14 c38 im_text">{{msgitem.message}}</p>
                <span class="triangle_border_left"></span>
              </div>
              <!-- 商品 -->
              <div class="im_left_msg im_msg pl8 pr23 pb15 pt14 bgfff bradius5 w250 be8 posre disflex"
                   @click="toGoodsDetail(msgitem)"
                   v-if="msgitem.messageType==3">
                <img :src="msgitem.message.url"
                     alt=""
                     mode="aspectFill"
                     class="w40 h40 bradius5 mr13">
                <div class="flex1">
                  <p class="fs14 c38 w100 over_1">{{msgitem.message.goodsName}}</p>
                  <p class="pt5">
                    <span class="corange fs16">￥{{priceObj[k]}}</span>
                  </p>
                </div>
                <span class="triangle_border_left"></span>
              </div>
              <!-- 供求 -->
              <div class="im_left_msg im_msg pl8 pr23 pb15 pt14 bgfff bradius5 w250 be8 posre disflex"
                   @click="toDemandDetail(msgitem.itemId)"
                   v-if="msgitem.messageType == 7">
                <img :src="msgitem.message.logo" alt=""
                     mode="aspectFill"
                     class="w40 h40 bradius5 mr13">
                <div class="flex1">
                  <p class="fs14 c38 over_1 w100">{{msgitem.message.description}}</p>
                  <p class="pt5 w100 over_1">
                    <span class="fs12 w100 over_1">{{msgitem.message.note}}</span>
                  </p>
                </div>
                <span class="triangle_border_left"></span>
              </div>
              <!-- 第一次聊天推送对方名片 -->
              <div class="im_right_msg  pl15 pt14 pr18 bgfff bradius5 w250 be8 posre"
                   v-if="msgitem.messageType==2">
                <p class="fs14 c38">你好，我是{{msgitem.message.companyName}}的{{msgitem.message.name}}，欢迎进入我的名片，有什么可以帮到你的吗？</p>
                <p class="fs12 ca8 pt10 pb9">您还可以点击查看</p>
                <div class="disflex jsbet fs12 c38 lh30 textc wrap">
                  <span class="be8 bgf5f6 borderbox w104 mb10 "
                        @click="page_turn('Products')">机构产品</span>
                  <span class="be8 bgf5f6 borderbox w104 mb10"
                        @click="page_turn('index')">我的名片</span>
                  <span class="be8 bgf5f6 borderbox w104 mb10 "
                        @click="page_turn('WebSite')">机构官网</span>
                  <span class="be8 bgf5f6 borderbox w104 mb10"
                        @click="page_turn('Dynamic')">机构动态</span>
                </div>
                <span class="triangle_border_left"></span>
              </div>
            </div>
            <!--信息状态-->
            <div class="disflex textr column-reverse w33 fs12 ca8"
                 v-if="msgitem.type==0">未读</div>
            <div class="disflex textr column-reverse w33 fs12 ca8"
                 v-if="msgitem.type==1">已读</div>
          </div>
        </template>
      </div>
    </div>
    <div :style="{paddingBottom: isPadding === '' ? '100rpx' : '130rpx'}"></div>
    <div class="btn" v-show="showBox == true" @click="toVisitData">发送</div>
    <div v-show="showBox == false">
      <EditInputer :isInput="isInput"
                   :isMore="isMore"
                   :isPadding="isPadding"
                   :phrases="phrases"
                   :text="text"
                   @clickPhrasesEvent="clickPhrasesEvent"
                   @closeMore="isMore = false"
                   @closePhrases="phrases = false"
                   @voiceIconEvent="isInput = false"
                   @moreIconEvent="moreIconEvent"
                   @keyboardEvent="isInput = true"
                   @touchStartEvent="touchStartEvent"
                   @touchEndEvent="touchEndEvent"
                   @clickPhotoEvent="clickPhotoEvent"
                   @clickShotEvent="clickShotEvent"
                   @clickVideoEvent="clickVideoEvent"
                   @clickFileEvent="clickFileEvent"
                   @inputBlurEvent="isMore = phrases = false"
                   v-on:comment="getcomment"
                   :titleLists="titleLists" />
    </div>


    <!--微信复制成功-->
    <div class="fix_top w100p h100p bggray_5 disflex align-cen jscen"
         v-show="pageFixed">
      <!--<img src="./../../../static/images/add_wx.png" alt="" class="w326 h533">-->
    </div>

    <div v-if="isShowCourse">
      <addWxCourse :isShow="isShowCourse"
                   @close="isShowCourse=false" />
    </div>
  </div>
</template>

<script>
import EditInputer from '@/components/editInputer'
import WXAJAX from '../../utils/request'
import WebSocket from '../../utils/websocket'
import AddWxCourse from '@/components/addWxCourse'
import store from '../../store/index';
import {toMiniProgram} from "@/utils";
import { mapGetters, mapActions } from 'vuex';
//  import {mapState,mapActions} from 'vuex'
import util from '../../utils/index'

// 录音
const recorderManager = wx.getRecorderManager()
// 播放音频
let myaudio = wx.createInnerAudioContext()
// 录音状态
let recorderStatus = false
// 录音持续时间
let recorderTime = null

export default {
  name: '',
  components: { EditInputer, AddWxCourse },
  data () {
    return {
      input_word: '',
      pageFixed: '',
      socket: null,
      messageCont: {},
      logo: '',
      myid: '',
      userlogo: '',
      sendId: '',
      times: [],
      indexs: {},
      params: {},
      priceObj: {},
      wxCode: '',
      phone: '',
      seedName: '',
      isShowCourse: false,
      appHeight: 0,
      chatHeight: 0,
      myPhone: '',
      isShow: false,
      titleLists: [
        { title: '你好，请问有智能名片的产品相关介绍文档吗？' },
        { title: '你好，请问智能名片都有什么套餐，价格是怎么样的？' },
        { title: '你好，请问有智能名片的产品相关介绍文档吗？' },
        { title: '你好，我想和贵机构合作，具体怎么操作呢？' },
      ],
      cardId:'',
      companyId:'',
      isInput: true,
      isMore: false,
      urls: '',
      isPadding: '',
      phrases: false,
      text: '按住 说话',
      showBox:false,
      arrayTime:[],
      starttime:'',
      finishtime:'',
    }
  },
  onReady () {
    this.logo = wx.getStorageSync('avatarUrl') || '';
    this.myid = wx.getStorageSync('userId') || '';
    const res = wx.getSystemInfoSync()
    if (res.model.indexOf('iPhone X') !== -1) this.isPadding = '40rpx'
    this.isShow = true;
    const { type, specId, userId, cardId, logo, wxCode, phone, name,itemId,goodsId,companyId,squareId } = this.$root.$mp.query;
    this.appHeight = wx.getSystemInfoSync().windowHeight;
    this.wxCode = wxCode || '';
    this.phone = phone || '';
    this.userlogo = logo || '';
    this.seedName = name || '';
    this.sendId = userId;
    this.myPhone = wx.getStorageSync('phone') || '';
    wx.setStorageSync('sendId', userId);
    wx.setStorageSync('sendCardId', cardId);
    if(itemId){
    		  this.getitemDetail(itemId)
    }
    if(goodsId){
      this.getGoodsDetail(goodsId)
    }
    if(squareId){
    		this.getDemandDetail(squareId)
    }
    Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
    this.splice(index, 1);
    }
    };
    // 获取聊天记录
    let param = {
      code: 105,
      type: type,
      specId,
      clientNum: 0,
      pageSize: 20,
      cardId: cardId,
      targetId: userId,
      targetCardId: cardId,
    }
    this.params = param;
    WebSocket.getChatRecord(param);

    wx.setNavigationBarTitle({
      title: this.$root.$mp.query.name
    });
    this.getCommonPhrases();
  },
  onUnload () {
    wx.setStorageSync('sendId', '');
    this.isShow = false;
    myaudio.stop()
  },
  onShow () {

    console.log(WXAJAX.jumpAppId)
  },
  async onPullDownRefresh () {
    this.params.clientNum = this.msgCont.data.length;
    WebSocket.getChatRecord(this.params);
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 3 * 1000)
  },
  methods: {
    ...mapActions(['add', 'change', 'setMsgList']),
    toVisitData(){
      this.arrayTime.remove('undefined');
      this.arrayTime.sort()
      // console.log(this.arrayTime,333333333)
      this.starttime = util.formatDate(Number(this.arrayTime[0]))
      if(this.arrayTime.length == 1){
        this.finishtime = util.formatDate(new Date())
      }else{
        this.finishtime = util.formatDate(Number(this.arrayTime.pop()))
      }
      // console.log(this.starttime,this.finishtime,22222222)
      var params = {
          startTime:this.starttime,
          endTime:this.finishtime,
          sendCardId:uni.getStorageSync('cardId'),
          targetCardId:this.$root.$mp.query.cardId,
          isFlock:0
      }
      WXAJAX.POST(params,'','/chattingRecords/queryList','','',1).then(res=>{
          console.log(res,111111111)
      })
    },
    startTime(e){
      if(e.detail.value[0]!== undefined){
        this.arrayTime.push(e.detail.value[0])
      }

    },
    toVisit(){
      this.showBox = !this.showBox
    },
    //跳转到供求详情页面
    toDemandDetail(itemId){
    		  uni.navigateTo({
    		  	url:'/pages/companyPack/find/detall/main?squareId=' + itemId
    		  })
    		},
    //查询供求详情
    getDemandDetail(squareId){
    		  var params = {
    			  squareId:squareId,
    			  cardId:wx.getStorageSync('cardId')
    		  }
    		  WXAJAX.POST(params,'','/demandSquare/queryDetailDemand','','',2).then(res=>{
    			  var msgObj = {
    			  	description:res.description,
    			  	logo:res.logo,
    			  	note:res.note
    			  }
    			  WebSocket.sendMessage({
    			    code: 103,
    			    message:msgObj,
    			    messageType:7,
    			    itemId:squareId,
    			    contentType:1,
    			    targetCardId: this.$root.$mp.query.cardId,
    			    targetId: this.$root.$mp.query.userId,
    			    targetCompanyId: this.$root.$mp.query.companyId,
    			  })
    				 WebSocket.getChatRecord(this.params)
    		  })
    },
    //跳转到商品详情
    toGoodsDetail(goodsInfo){
    		var goodid = goodsInfo.itemId
      uni.navigateTo({
        url:`/pages/companyPack/prodDetail/index?goodId=${goodid}`
      })
    },
    //查询商品详情
    getGoodsDetail(goodsId){
    		  var params = {
    			  goodsId:goodsId,
    			  cardId:wx.getStorageSync('cardId')
    		  }
    		  WXAJAX.POST(params,'','/goods/getGoodsInfoDemand','','',2).then(res=>{
    			  var goodsObj = {
    			  	goodsName:res.goodsName,
    			  	price:res.price,
    			  	url:res.coverImg
    			  }
    			  WebSocket.sendMessage({
    			    code: 103,
    			    message:goodsObj,
    			    messageType:3,
    			    itemId:goodsId,
    			    contentType:1,
    			    targetCardId: this.$root.$mp.query.cardId,
    			    targetId: this.$root.$mp.query.userId,
    			    targetCompanyId: this.$root.$mp.query.companyId,
    			  })
            WebSocket.getChatRecord(this.params)
    		  })
    },
    //跳转到文章详情
    toDynamicDetail(itemId){
    		  uni.navigateTo({
    		  	url:'/pages/companyPack/find/dynamicDetail/main?dynamicId=' + itemId
    		  })
    },
    //查询文章详情
    		getitemDetail(itemId){
    			var params = {
    				companyId: wx.getStorageSync('COMPANYID'),
    				dynamicId: itemId,
    				cardId: wx.getStorageSync('CARDID'),
    			}
    			WXAJAX.POST(params,'','/dynamic/getDynamicDetail','','',1).then(res=>{
    				var msgObj = {
    					title:res.title,
    					photos:res.photos,
    					originAuthor:res.originAuthor
    				}
    				WebSocket.sendMessage({
    				  code: 103,
    				  message:msgObj,
    				  messageType:6,
    				  itemId:itemId,
    				  contentType:1,
    				  targetCardId: this.$root.$mp.query.cardId,
    				  targetId: this.$root.$mp.query.userId,
    				  targetCompanyId: this.$root.$mp.query.companyId,
    				})
            WebSocket.getChatRecord(this.params)
    			})
    		},
    chatBoxClickEvent () {
      if (this.isMore || this.phrases) {
        this.isMore = false
        this.phrases = false
      }
    },
    getCommonPhrases () {
      //个人
        WXAJAX.POST({pageSize:99999,pageNum:1}, '', '/useful/own/queryList','','',1).then((data) => {
          if(data.list){
            this.list1 = data.list
      this.titleLists = this.list1.concat(this.list2,this.list3)
      this.titleLists =  this.titleLists.map(val=>{return {title: val.usefulContent}})
            this.num++
          }else{
             this.list1 = []
             this.num++
          }
        }).catch((err) => {
          console.log(err)
        }),
        //机构
        WXAJAX.POST({pageSize:99999,pageNum:1}, '', '/useful/org/ownQueryList','','',1).then((data) => {
          if(data.list){
            this.list2 = data.list
      this.titleLists = this.list2.concat(this.list1,this.list3)
      this.titleLists =  this.titleLists.map(val=>{return {title: val.usefulContent}})
            console.log(data,9999)
            this.num++
          }else{
             this.list2 = []
             this.num++
          }
        }).catch((err) => {
          console.log(err)
        }),
        //平台
        WXAJAX.POST({pageSize:99999,pageNum:1}, '', '/useful/platform/ownQueryList','','',1).then((data) => {
          if(data.list){
            this.list3 = data.list
      this.titleLists = this.list3.concat(this.list1,this.list2)
      this.titleLists =  this.titleLists.map(val=>{return {title: val.usefulContent}})
            this.num++
          }else{
             this.list3 = []
             this.num++
          }
        }).catch((err) => {
          console.log(err)
        })
      // WXAJAX.POST({
      //   type: 2,
      // }, '', '/businessCard/selectUserCommonList').then(res => {
      //   if (res) {
      //     this.titleLists = res ? res.map(val => { return { title: val.text } }) : [
      //       { title: '您好，您是在了解采推AI智能名片吗？' },
      //       { title: '您具体需求是什么呢？需要租用，定制，代理合作还是源码呢？' },
      //       { title: '您有什么不清楚的，我们随时沟通喔。' },
      //       { title: '您也可以咨询您的专人商务经理：陈经理（18081916514）' },
      //       { title: '您也可以直接咨询您的专人商务经理：付经理（17721872191）' },
      //       { title: '您可以点击左上方“加微信”，直接复制我的微信号到微信界面添加我为好友，给您发更多资料。' },
      //       { title: '祝您生活愉快！' },
      //     ];
      //   }
      // });
    },
    // 拨打电话
    callPhone (phone) {
      uni.makePhoneCall({
        phoneNumber: phone
      })
    },
    // 更多按钮
    moreIconEvent () {
      if (this.phrases) {
        this.phrases = false
      }
      this.isMore = !this.isMore
    },
    // 点击常用语
    clickPhrasesEvent () {
      this.phrases = !this.phrases
    },
    // 预览图片
    previewImg (urls) {
      wx.previewImage({ urls: [urls + '.primary.png'] })
    },
    // 点击相册
    clickPhotoEvent () {
      // this.isMore = !this.isMore
      wx.chooseImage({
        sourceType: ['album'],
        sizeType: ['original'],
        success: res => {
          this.uploadImgFun(res.tempFilePaths, 0, 2)
        }
      })
    },
    // 递归上传
    async uploadImgFun (arr, index = 0, type) {
      wx.showLoading({ title: '上传中', mask: true })
      await this.uploadFiles(arr[index], type)
      if (index < arr.length - 1) {
        this.uploadImgFun(arr, index + 1, type)
      }
    },
    // 点击拍摄
    clickShotEvent () {
      // this.isMore = !this.isMore
      wx.chooseImage({
        sourceType: ['camera'],
        count: 1,
        success: res => {
          this.uploadFiles(res.tempFilePaths[0], 2)
        }
      })
    },
    // 点击视频
    clickVideoEvent () {
      // this.isMore = !this.isMore
      util.chooseVideo().then(res => {
        this.uploadFiles(res.tempFilePath, 4)
      }).catch(err => {
        wx.showToast({
          title: err,
          duration: 2000,
          icon: 'none'
        })
      })
      /**wx.chooseVideo({
        maxDuration: 60,
        success: res => {
          this.uploadFiles(res.tempFilePath, 4)
        }
      })**/
    },
    //点击文件
    clickFileEvent(){
      let that = this
      wx.chooseMessageFile({
        count: 1,
        type: this.custom,
        success(res) {
          that.uploadFiles(res.tempFiles[0].path, 5,'',res.tempFiles[0].name)

        }
      })

    },
    // 播放音频{{{
    audioPlay (url, k) {
      if (this.urls !== url) {
        this.urls = url
        myaudio.src = url
        myaudio.play()
        myaudio.onEnded(() => {
          this.urls = ''
        })
        myaudio.onError(res => {
          this.urls = ''
          wx.showToast({
            title: '系统错误',
            duration: 2000,
            icon: 'none'
          })
        })
      } else {
        this.urls = ''
        myaudio.stop()
      }
    },
    // 触摸开始
    touchStartEvent () {
      this.text = '松开 结束'
      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.record']) {
            wx.authorize({
              scope: 'scope.record',
              success: res => {
                console.log(res)
              },
              fail: res => {
                wx.showToast({
                  title: '请先授权录音权限',
                  duration: 2000,
                  icon: 'none'
                })
              }
            })
          } else {
            recorderManager.start({ duration: 60000 })
            recorderManager.onError(err => {
              wx.showToast({
                title: '录音失败，请重试',
                duration: 2000,
                icon: 'none'
              })
            })
            recorderManager.onStart(() => {
              recorderStatus = true
              recorderTime = Date.now()
              wx.showToast({
                title: '录音开始',
                duration: 60000,
                icon: 'none'
              })
            })
          }
        }
      })
    },
    // 触摸结束
    touchEndEvent () {
      this.text = '按住 说话'
      setTimeout(() => {
        if (recorderStatus) {
          recorderStatus = false
          recorderManager.stop()
          recorderManager.onStop(res => {
            wx.hideToast()
            if (Date.now() - recorderTime < 1000) {
              wx.showToast({
                title: '录音时间太短',
                duration: 2000,
                icon: 'none'
              })
              return
            }
            this.uploadFiles(res.tempFilePath, 3, parseInt(res.duration / 1000))
          })
        }
      }, 500)
    },/*}}}*//*}}}*/
    // 上传语音、视频、图片、文件
    uploadFiles (filePath, contentType, duration,fileName) {
      if (contentType === 4) wx.showLoading({ title: '上传中', mask: true })
      if (contentType === 5){
        var data = {
          filePath:filePath,
          fileName:fileName
        }
      }else{
        var data = WXAJAX.imgBackUrl + res.data
      }
      return WXAJAX.UploadImage(filePath).then(res => {
        res = JSON.parse(res);
        wx.hideLoading()
        if (res.code == 200) {
          WebSocket.sendMessage({
            code: 103,
            // message: WXAJAX.imgBackUrl + res.data,
            message: data,
            messageType: 1,
            contentType,
            targetId: this.$root.$mp.query.userId,
            targetCardId: this.$root.$mp.query.cardId,
            targetCompanyId: this.$root.$mp.query.companyId,
            duration: duration
          })
        } else {
          wx.showToast({
            title: '文件大小超出限制，最大30M',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
      }).catch(err => console.log(err))
    },
    contactMe () {
      WebSocket.sendMessage({
        code: 103,
        message: this.myPhone,
        messageType: 4,
        targetCardId: this.$root.$mp.query.cardId,
        targetId: this.$root.$mp.query.userId,
        targetCompanyId: this.$root.$mp.query.companyId,
      })
    },
    getPhoneNumber (e) {
      let { encryptedData, iv } = e.target;
      if (!encryptedData || !iv) {
        wx.showToast({
          title: '手机号未授权，请绑定手机号后再次发送',
          icon: 'none',
          duration: 2000
        });
        return;
      }
      WXAJAX.POST({
        phoneData: e.target.encryptedData,
        phoneIv: e.target.iv,
      }, '', '/home/getWxPhone')
        .then(res => {
          wx.setStorageSync('phone', res);
          this.myPhone = res;
          this.contactMe();
        });
    },
    getTime () {
      let priceObj = {};

      if (this.msgCont.data) {
        let times = this.msgCont.data.map((res, idx) => {
          if (res.messageType == 3) priceObj[idx] = res.message.price / 100;
          return res.time
        });
        let asd = {};
        asd[0] = this.dateF(times[0]);
        for (let i = 1; i < times.length; i++) {
          let a = (times[i] - times[i - 1]) / 1000 / 60;
          if (a > 3) {
            asd[i] = this.dateF(times[i]);
          }
        }
        this.$set(this, 'indexs', asd);
        this.$set(this, 'priceObj', priceObj);
      }
    },
    dateF (data) {
      let year = new Date(data).getFullYear();
      let month = new Date(data).getMonth() + 1;
      let day = new Date(data).getDate();
      let h = (new Date(data).getHours() - 10) < 0 ? "0" + new Date(data).getHours() : new Date(data).getHours();
      let m = (new Date(data).getMinutes() - 10) < 0 ? "0" + new Date(data).getMinutes() : new Date(data).getMinutes();
      let s = (new Date(data).getSeconds() - 10) < 0 ? "0" + new Date(data).getSeconds() : new Date(data).getSeconds();
      let newDate = new Date();
      let year1 = newDate.getFullYear();
      let month1 = newDate.getMonth() + 1;
      let day1 = newDate.getDate();
      let result = '';
      if (year === year1 && month === month1 && day === day1) {
        result = h + ":" + m
      }
      else {
        result = month + "月" + day + ' ' + h + ":" + m;
      }
      return result
    },
    //            发送消息
    getcomment (data) {
      if (!data.trim()) return;

      let messageSend = {};
      messageSend.message = data;
      messageSend.messageType = 1;
      messageSend.sendId = wx.getStorageSync('userId');

      messageSend.sendCardId = wx.getStorageSync('CARDID');
      messageSend.type = 0;
      messageSend.time = (new Date()).getTime();
      messageSend.targetId = this.$root.$mp.query.userId;
      messageSend.targetCardId = this.$root.$mp.query.cardId;
      console.log("发送消息----", this.messageCont);
      //        this.$forceUpdate();
      let v = this;
      WebSocket.sendMessage({
        code: 103,
        message: data,
        messageType: 1,
        contentType:1,
        targetCardId: v.$root.$mp.query.cardId,
        targetId: v.$root.$mp.query.userId,
        targetCompanyId: v.$root.$mp.query.companyId,
      })
      // this.add(messageSend);
      this.change();
      //              console.log("监听连接打开--",res,that.message,that.$root.$mp.query.type);
      // this.connect();
    },
    addWx () {
      if (!this.wxCode.trim()) {
        wx.showToast({
          title: '未绑定微信号',
          icon: 'none',
          duration: 2000
        });
        return;
      }

      let v = this;
      wx.setClipboardData({
        data: this.wxCode,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              /* wx.showToast({
               title: '复制成功'
               })*/
              v.isShowCourse = true;
              v.pageFixed = true;
              setTimeout(function () {
                v.pageFixed = false;
              }, 2000)
            }
          })
        }
      })
    },
    makePhone () {
      const _phone = this.phone ? this.phone.trim() : "";
      if (_phone) {
        wx.makePhoneCall({
          phoneNumber: this.phone,
        })
      } else {
        wx.showToast({
          title: '未绑定手机号',
          icon: 'none',
          duration: 2000
        });
      }
    },
    page_turn (urls, id) {
      let cardId = this.cardId
      let companyId = this.companyId
      let url = 'pages/' + urls + '/main'
      toMiniProgram(url,'', cardId, companyId)

    },
  },
  watch: {
    msgCont: {
      handler () {
        this.cardId = this.msgCont.cardId
        this.companyId = this.msgCont.companyId
        this.getTime();
      },
      deep: true,
    },
    changePosition () {
      setTimeout(() => {
        if (this.isShow) {
          wx.pageScrollTo({ scrollTop: 999999999 })
        }
      }, 100)
    }
  },
  computed: {
    ...mapGetters(['msgCont', 'currentCompany', 'changePosition']),
  }
}
</script>

<style>
.bottom-chat {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100upx;
}
.sys-message {
  display: inline-block;
  text-align: center;
  height: 50upx;
  line-height: 50upx;
  font-size: 28upx;
  color: #a8a8a8;
  border-radius: 999px;
  background: #e8e8e8;
  padding: 0 40upx;
  margin-bottom: 30upx;
}
.sys-messages {
  display: inline-block;
  text-align: center;
  line-height: 38upx;
  font-size: 24upx;
  color: #a8a8a8;
  border-radius: 1998upx;
  background: #e8e8e8;
  padding: 20upx 60upx;
  margin-bottom: 30upx;
}
.fix.toppage {
  position: fixed;
  top: 0;
  width: 100%;
  overflow: hidden;
}
.w250 {
  max-width: 500upx;
  width: auto;
}
.output-audio-right {
  width: 167px;
  height: 40px;
  position: relative;
}

.audio-right::before {
  content: "";
  display: block;
  width: 24upx;
  height: 24upx;
  background: #51cdcb;
  position: absolute;
  border: 1upx solid #51cdcb;
  border-radius: 6upx;
  transform: rotate(225deg);
  border-right-width: 0;
  border-top-width: 0;
  top: 0px;
  bottom: 0;
  right: -10upx;
  margin: auto;
}

.output-audio-right .audio-right {
  padding: 24upx 34upx 24upx 0;
  background: #51cdcb;
  border: 1upx solid #e8e8e8;
  position: relative;
  height: 30upx;
  border-radius: 10upx;
}

.output-audio-right .audio-right .ico-right {
  width: 24upx;
  height: 34upx;
  float: right;
  transform: rotate(0.5turn);
}
.output-audio-left {
  width: 167px;
  height: 40px;
  position: relative;
}

.audio-left::before {
  content: "";
  display: block;
  width: 24upx;
  height: 24upx;
  background: #fff;
  position: absolute;
  border: 1upx solid #e8e8e8;
  border-radius: 6upx;
  transform: rotate(45deg);
  border-right-width: 0;
  border-top-width: 0;
  top: 0px;
  bottom: 0;
  left: -10upx;
  margin: auto;
}

.output-audio-left .audio-left {
  padding: 24upx 34upx 24upx 0;
  background: #fff;
  border: 1upx solid #e8e8e8;
  position: relative;
  height: 30upx;
  border-radius: 10upx;
}

.output-audio-left .audio-left .ico-left {
  width: 24upx;
  height: 34upx;
  float: left;
  margin-left: 22upx;
}
.triangle_border_right,
.triangle_border_left,
.triangle_border_right1 {
  position: absolute;
  top: 24upx;
  display: block;
  width: 24upx;
  height: 24upx;
  border-radius: 6upx;
  border: 1upx solid #e8e8e8;
  border-top: 0;
  border-left: 0;
  background: #fff;
  box-sizing: border-box;
}
.triangle_border_right1 {
  background: #51cdcb;
}
.triangle_border_right,
.triangle_border_right1 {
  right: -12upx;
  transform: rotate(-45deg);
}

.triangle_border_left {
  left: -12upx;
  transform: rotate(135deg);
}

.noread .im_msg {
  background: #51cdcb;
  color: #fff;
}

.noread .im_text {
  color: #fff;
}

.noread .triangle_border_left,
.noread .triangle_border_right,
.noread .triangle_border_right1 {
  background: #51cdcb;
  border: none;
}
.im_by_time .im_item {
  margin-bottom: 30upx;
}
  .contentItem{
	width: 60%;
	background-color:#FFFFFF;
	border-radius: 12rpx;
	padding: 40rpx 0;
	position: relative;
  }
  .btn{
    width: 100%;
    height: 98upx;
    line-height: 98upx;
    text-align: center;
    color: #FFFFFF;
    font-size: 36upx;
    background-color: rgba(26, 208, 156, 100);
    position: fixed;
    bottom: 0;
  }
</style>
