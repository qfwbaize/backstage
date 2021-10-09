<template>
  <div class="pb50 posre h100p">
    <p class="pt15 fbold fs18 c38 pl15 pr27 bgfff ">{{title}}</p>
    <div class="px15 dec">
      <div class="left-dec">
        <span>
          {{companyName}}
        </span>
        <span style="margin-left: 20upx;">
          {{time}}
        </span>
      </div>
      <span class="right-dec"
            @click="collect">{{isCollect ? '已收藏' : '收藏'}}</span>
    </div>

    <div id="bodytop" class="bgfff pt20 pb10" >
      <img :src="v"
           alt=""
           v-for="(v,k) in photos"
           mode="widthFix"
           :key="k"
           class="w100p">
      <div class="content">
        <rich-text :nodes='details'></rich-text>
      </div>
    </div>
    <div class="bottom pb50 borderbox bgfff flex1">
      <div class="disflex bbf5f6 c78">
        <div class="w50p h44 disflex posre jscen align-cen fs14"
             :class="currentTab == 3 ? 'active': ''"
             @click="tab_tap(3)" v-if="topic==true">
          <span class="mr10 fs14">回答问题</span>
          <!-- {{dynamic.thumbsModelsList.length || 0}} -->
          <span class="line"></span>
        </div>
        <div class="w50p h44 disflex posre jscen align-cen fs14"
             :class="currentTab == 1 ? 'active': ''"
             @click="tab_tap(1)">
          <span class="mr10 fs14">评论</span>
          {{dynamic.commentModelList.length || 0}}
          <span class="line"></span>
        </div>
        <div class="w50p h44 disflex posre jscen align-cen fs14"
             :class="currentTab == 2 ? 'active': ''"
             @click="tab_tap(2)">
          <span class="mr10 fs14">赞</span>
          {{dynamic.likeNum || 0}}
          <span class="line"></span>
        </div>

      </div>
      <div class="content">
        <div  v-if="currentTab == 1">
          <div class="disflex flex-column">
            <div class="h70 disflex bbf5f6 jscen align-cen">
              <span class="comment_btn" @click.stop="addComment('','','add')">
                立即评论
              </span>
            </div>
            <p class="textc ca8 fs12" v-if="!dynamic.commentModelList">快来发表你的评论吧</p>
              <div class="comment-list bbf5f6 pt20 pb20 bgfff disflex"
                   v-for="(v,k) in dynamic.commentModelList"
                   :key="k">
                   <img class="w50 h50 bradius5 mr10" mode="aspectFill" :src="v.logo || 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/user_default_avatar_square.png'">
                   <div class="comment w100p pt5 borderbox" @click.stop="addComment(k,v)">
                      <div class="disflex jsbet mb10 align-cen">
                        <p class="cdeepblue fs14">{{v.userName}}</p>
                        <p class="ca8 fs12">{{v.createTime}}</p>
                      </div>
                      <div class="fs14 lh27 fs16">
                        <span v-if="v.replyName">回复</span>
                        <span class="cdeepblue" v-if="v.replyName">{{v.replyName}}:</span>
                        <span>{{v.text}}</span>
                      </div>
                   </div>
              </div>
          </div>
        </div>
        <div v-else-if="currentTab == 2">
          <div
              class="disflex pl15 pt10 bbf5f6  pb10 borderbox bgfff"
              v-for="(item,index) in dynamic.thumbsModelsList"
              :key="index">
            <img class="w50 h50 bradius5 mr10" mode="aspectFill" :src="item.logo || 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/user_default_avatar_square.png'">
            <div class="disflex jscen align-cen">{{item.userName}}</div>
        </div>
        </div>
        <div v-else>
          <div class="pl15 pt10 bbf5f6  pb10 borderbox bgfff">
            <div class="target"  v-for="(item,index) in problemList" :key="index">
              <div class="title c38" style="width: 90%;">
                <p>{{index+1}} 、</p>
                {{item.questionTitle}}
              </div>
              <ul>
                <!-- list -->
                <radio-group @change="radioChange($event,item)" style="font-size: 25rpx;" >
                  <li>
                    <label class="target-left c78">
                      <radio :value="'A'" color="#51CDCB" style="transform:scale(0.7);" />{{item.answerA}}
                    </label>
                  </li>
                  <li>
                    <label class="target-left c78">
                      <radio :value="'B'" color="#51CDCB" style="transform:scale(0.7);" />{{item.answerB}}
                    </label>
                  </li>
                  <li>
                    <label class="target-left c78">
                      <radio :value="'C'" color="#51CDCB" style="transform:scale(0.7);" />{{item.answerC}}
                    </label>
                  </li>
                  <li>
                    <label class="target-left c78">
                      <radio :value="'D'" color="#51CDCB" style="transform:scale(0.7);" />{{item.answerD}}
                    </label>
                  </li>
                </radio-group>

              </ul>
            </div>
            <div v-if="submittext == '提交答案'" @click="submit" style="color: #fff;background-color: #337ab7; border-color: #2e6da4; display: inline-block; padding: 6rpx 12rpx; margin-bottom: 0; font-weight: 400; line-height: 1.42857143; text-align: center; white-space: nowrap; text-decoration: none; vertical-align: middle; -ms-touch-action: manipulation; touch-action: manipulation; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-image: none; border: 1rpx solid transparent; border-radius: 4rpx;width: 144rpx;font-size: 36rpx; margin-left: 250rpx; margin-bottom: 60rpx; margin-top: 30rpx; ">提交答案</div>
                        <div v-else style="color: #fff;background-color: #696969; border-color: #2e6da4; display: inline-block; padding: 6rpx 12rpx; margin-bottom: 0; font-weight: 400; line-height: 1.42857143; text-align: center; white-space: nowrap; text-decoration: none; vertical-align: middle; -ms-touch-action: manipulation; touch-action: manipulation; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-image: none; border: 1rpx solid transparent; border-radius: 4rpx;width: 144rpx;font-size: 36rpx;margin-left: 250rpx; margin-bottom: 60rpx; margin-top: 30rpx; "> 已提交 </div>

          </div>
        </div>
      </div>
    </div>
    <div class="btns disflex bgfff">
      <div id="navbottom" class="disflex w155">
        <div class="disflex fs12 ca7 align-cen jscen flex-column w33p" @click="zan">
          <img :src="dynamic.isThumbs ? like_selectIcon  : likeIcon" class="w20 h20">
          {{dynamic.isThumbs ? '已点赞' : '点赞'}}
        </div>
        <div  class="disflex fs12 ca7 align-cen jscen flex-column w33p" @click="call_tap">
          <img :src="callIcon" class="w20 h20">
          通话
        </div>
        <div class='bgfff ca7 fs12 lh1 cdeepblue p0 w33p disflex flex-column jscen align-cen' @click="showShare">
          <img class="w20 h20 mb2" :src="shareIcon">
          <span class="ca7 lh1">转发</span>
        </div>
      </div>
      <div class="disflex jscen fs18 cfff align-cen flex1 consulting"  @click="talk">
        <img :src="ommentIcon" class="w24 h24 mr7">
        立即咨询
      </div>
      <!--评论输入框-->
    <div class="fix_bottomB disflex borderbox align-cen pl15 h49 bgfff edit_input trans2"
          v-if="input_show==true" @click.stop="">
      <!--:class="input_show ? '' : 'hide' "-->
      <div class="bgfff  disflex w100p jsbet pr11 borderbox align-cen">
        <input fixed="true"
               class=" borderbox h40 lh40 pr11 bgf5f6 bradius5 flex1 mr11 comment_input c38 fs18 pl15"
               :focus="comment_focus"
               :placeholder="
            replayComment.commentId
              ? '回复 ' + replayComment.userName + '：'
              : '评论'
          "
               cursor-spacing="4"
               @focus="inputgetFocus(this, $event)"
               @confirm="inputConfirm"
               :style="{ height: text_height + 'px' }"
               v-model="comments" />
        <!--        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/smile.png" alt="" class="w25 h25" @click="smile_tap">-->
        <span class="bgblue cfff w50 textc lh30 fs16 bradius5 disblock ml10"
              @click.stop="inputConfirm">发送</span>
        </div>
      </div>
    </div>



    <div v-if="isShowMore"
         style="position: relative;left: 0;right: 0;">
      <image mode="widthFix"
             class="w100p"
             style="max-height: 80vh;"
             src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/detail_img.png" />
      <div class="more-btn">
        <button @click="goPage">
          点击查看更多
        </button>
      </div>
    </div>
    <!-- 分享弹窗 -->
    <cover-view class="w100p h100p prod_choose_class borderbox disflex column-reverse"
                :class="{show : isShowShare} "
                @click.stop="isShowShare = false">
      <cover-view class="bgfff inner textc lh44">
        <cover-view class="share-box">
          <button style="margin-right: 0upx;margin-left: 0;background: #fff;"
                  open-type="share">
            <cover-image class="share-img"
                         src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/weixin_share.png"></cover-image>
            <cover-view class="share-title">微信好友</cover-view>
          </button>
          <cover-view style="margin-left: 136.5upx;"
                      @click="onShareEvent">
            <cover-image class="share-img mb8"
                         src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/weixin_share2.png"></cover-image>
            <cover-view class="share-title">名片海报</cover-view>
          </cover-view>
          <cover-view style="margin-left: 136.5upx;"
                      @click="onShareInSide">
            <cover-image class="share-img mb8"
                         src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/weixin_share.png"></cover-image>
            <cover-view class="share-title">站内分享</cover-view>
          </cover-view>
        </cover-view>
        <cover-view class="share-ornament"></cover-view>
        <cover-view class="fs16 c38 lh44"
                    @click.stop="isShowShare = false">
          取消
        </cover-view>
      </cover-view>
    </cover-view>
    <!--全屏预览-->
    <div class="mask disflex align-cen jscen"
         v-if="isPreviewImg">
      <div class="disinblock ">
        <div class="disflex flex-end ">
          <img @click="isPreviewImg = false"
               src="/static/close.png"
               style="height: 48rpx; width: 48rpx" />
        </div>
        <img class="img-size bradius5"
             :src="maskImg" />
        <span @click="saveImg"
              class="bg_line_blue cfff textc fs18 fbold bradius5 lh44 mb15"
              style="width: 465rpx;display: block;margin: 0 auto">保存图片</span>
      </div>
    </div>
    <div v-show="dialog_show">
    	<ChangePhoneNumber :dialog_title="'手机号验证'" :type="'hint3'" :phone="precisePhone"
    		@btn_tap="save_phone_number" @cancel_tap="close_change_number"></ChangePhoneNumber>
    </div>
    <!-- <BottomButtonSmall :text="'去分享'"
                       @btn_tap="showShare" /> -->
    <!-- <LoginIntercept @loginSuccess="loginInterceptSuccess" /> -->
  </div>
</template>

<script>
import WXAJAX from '@/utils/request';
import BottomButtonSmall from '@/components/bottom_button_small';
import LoginIntercept from "@/components/LoginIntercept";

import util from '@/utils/index';
import { mapGetters, mapState } from 'vuex';
import { addShareRecord,editShareRecord,preciseWxShare } from '@/utils/behavior';
import ChangePhoneNumber from '@/components/ChangePhoneNumber'

import HandleLogin from '@/utils/handleLogin';
import {authSubscribeComment,authSubscribeMessage} from '@/utils/auth.js';

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
const isUrl = path => reg.test(path);

export default {
  components: { BottomButtonSmall, LoginIntercept, ChangePhoneNumber },
  computed: {
    ...mapGetters(["currentCompany"]),
    ...mapState({
      isLogin: state => {
        return state.isLoginStatus;
      }
    })
  },
  watch: {
    isLogin: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.isShowMore = false;
        }
      }
    }
  },
  data() {
    return {
      dialog_show:false,
      precisePhone:'',
      webViewSrc: '',
      dynamicId: 98,
      addTypeShow: false,
      addTypes: [
        { name: "删除", id: "delete" },
        { name: "取消", id: "cancel" }
      ],

      title: '',
      companyName: '',

      ifscore1:false,//阅读
      ifscore4:false,//推销
      ifscore3:false,//精准

      score:0,
      // score1:0,//阅读分数
      // score4:0,//推销分数
      // score3:0,//精准分数


      lowestAnswerScore1:0,//阅读得奖最低分数
      lowestAnswerScore4:0,//推销得奖最低分数
      lowestAnswerScore3:0,//精准得奖最低分数


      time1:false,//阅读
      time4:false,//推销
      time3:false,//精准
      time: '',
      details: '',
      photos: [],
      problemList:[],
      answerList:[],//提交的答案
      answerListIds:[],//提交的答案id
      answerIds:[],
      isShowShare: false,
      isCollect: false,
      isPreviewImg: false,
      maskImg: '',
      openStatus: false,
      isShowMore: false, //是否展示点击查看更多的页面
      cardId: '',
      COMPANYID:'',
      dynamic:[],
      currentTab:1,
      messageImg: WXAJAX.imgBackUrl + "yimai_photos/crmRevision/icon_message.png",
      input_show: false,
      replayComment: {}, // 回复信息对象
      add_comments_index:0,
      comments:'',
      likeIcon:WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_like.png',
      like_selectIcon:WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_like_select.png',
      shareIcon:WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_news_share.png',
      callIcon:WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_details_call.png',
      ommentIcon:WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/icon_message.png',
      isLike:false,
      timer :'',
      topic:false,
      submitresult:false,
      readstarttime:'',//阅读开始时间
      readendtime:'',//阅读结束时间
      readType:'',//文章来源类型
      bodyheight:'',//文章的高度
      bodytop:'',//文章的上边界坐标
      scrollTop:'',//当前滑动距离顶部尺寸
      ksqyheight:'',//文章高度
      navbottomheight:'',//文章底部菜单

      submitresult:false,
      submittext:'提交答案',
      type:0,

    }
  },
  // onShareAppMessage() {
  //   return {
  //     title: this.title,
  //     path:  `pages/dynamicDetail/main?dynamicId=${this.dynamicId}`,
  //     success: () => {
  //       uni.showToast({
  //         title: '分享成功',
  //         icon: 'none'
  //       })
  //     }
  //   }
  // },
  async onShareAppMessage(e) {
    let uuid = this.cardId + '' + new Date().getTime();
    //原有的分享记录注释
    addShareRecord(this.COMPANYID, 4, this.dynamicId, uuid).then(res => {
      console.log('添加一条记录', this.dynamicId, 'uuid', uuid, this.photos[0],
        this.title);
    }, err => { });
    wx.showLoading();
    let shareId='';
    var params={
      dynamicId:this.dynamicId,
      shareSource:2,
    }
    var sharedata = await WXAJAX.POST(params , '', '/share/record/add','','',1);
    let path = '/pages/companyPack/find/dynamicDetail/main?dynamicId=' + this.dynamicId + '&companyId=' + wx.getStorageSync('COMPANYID') + '&cardId=' + wx.getStorageSync('cardId') + '&goType=1&shareId=' + sharedata.shareId;
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
		console.log(options);
		this.isCollect = options.title
    this.dynamicId = options.dynamicId
    this.shareId = options.insideShareId//站内分享
    this.type = options.type

    if(!options.precise_dynamicId&&options.shareId){//普通微信好友/朋友圈分享
      editShareRecord(options.shareId);
      this.shareId = options.shareId//站内分享
    }

    if(options.precise_dynamicId){//精准抓发微信好友/朋友圈
      this.preciseId=await preciseWxShare(this.dynamicId,options.precise_dynamicId,wx.getStorageSync('cardId'),options.shareId);
    }
    if(options.preciseId){//站内精准转发
      this.preciseId = options.preciseId
    }


    let cardId = '';
    let COMPANYID='';
    let preciseId='';
    let companyName='';
    WXAJAX.POST({ignore: true}, '', '/businessCard/getCompanyUserInfo').then((data) => {
		console.log(data,"奥术大师多");
      if (data) {
        cardId = data.cardId;
        COMPANYID = data.COMPANYID;
        preciseId = data.preciseId || '';
        companyName = data.companyName || '';


      }
    });
    this.companyName=companyName;
    this.COMPANYID = COMPANYID
    this.cardId = cardId;
    await this.getInits(cardId)
    //判断是否已经收藏
    await this.checkCollect();
  },
  onShow(){
    this.readstarttime  = new Date()
  },
  onHide(){
    this.readtime()//退出页面发送阅读时间
  },
  onPageScroll: function (e) {
    this.input_show = false;
  },
 onUnload: function() {
    console.log(2)
    this.readtime()//退出页面发送阅读时间
  },
  methods: {
    readtime(){//退出页面发送阅读时间
    let that = this
    console.log(111)
    console.log('屏幕高度',that.ksqyheight)
    console.log('底部导航栏',that.navbottomheight)
    //屏幕高度-底部导航栏+当前浏览顶部-文章顶部导航栏/文章总高度
    // console.log('文章高度',(that.ksqyheight-that.navbottomheight+that.scrollTop-that.bodytop)/that.bodyheight*100)
      function baifenbi(){
        let num =  (that.ksqyheight-that.navbottomheight+that.scrollTop-that.bodytop)/that.bodyheight*100;
        if(num>=100){
          return 100
        }else if(num<=0){
          return 0
        }else{
          return parseInt(num)
          }
      }
      console.log('当前文章阅读百分比',baifenbi())
      {//发送阅读时间
        that.readendtime  = new Date()
        let {dynamicId,score,readType} = that
        let readTime = that.readendtime - that.readstarttime

        WXAJAX.POST({
          readRatio:baifenbi(),
                dynamicId,
                answerScore:score,//
                readTime,
                readType:1,//0_直接阅读 1_站内分享阅读；2_站外分享阅读"
              }, '', '/reader/bill/add','','',1).then((data) => {
                wx.hideLoading();
              }).catch((err) => {
                console.log(err);
                wx.hideLoading();
              });

        // WXAJAX.POST({
        //   readRatio:baifenbi(),
        //   dynamicId,
        //   answerScore:score,//
        //   readTime,
        //   readType//0_直接阅读 1_站内分享阅读；2_站外分享阅读"
        // }, '', '/reader/bill/add',1).then((data) => {
        //   wx.hideLoading();
        // }).catch((err) => {
        //   console.log(err);
        //   wx.hideLoading();
        // });
      }
      {//
        console.log('距离顶部的距离1',)

      }

      // let s = time / 1000
      // let m = time / 1000 / 60
      // let d = time / 1000 / 60 / 60
      // let cnm = time / 1000 / 60 / 60 / 24
      // console.log('时间戳时间差',time)
      // console.log('天',parseInt(cnm))
      // console.log('时',parseInt(d))
      // console.log('分',parseInt(m))
      // console.log('秒',parseInt(s))
      // clearInterval(this.timer);
    },
    //登录成功
    async loginInterceptSuccess() {
      if (this.webViewSrc) {
        this.isShowMore = true;
      } else {
        this.goPage();
      }
    },
    showShare() {
      this.isShowShare = true;
    },
    collect() {
      wx.showLoading();
      let _url = '',
        _request = {};
      if (this.isCollect) {//取消收藏
        _url = '/personal/delCollection';

      } else {//添加收藏
        _url = '/personal/addCollection';
      }
      _request = {
        itemType: 2,
        itemId: this.dynamicId,
      };

      WXAJAX.changeCollect3(_request, _url).then((data) => {

        if (data) {
          this.isCollect = !this.isCollect;
        }
        wx.hideLoading();

      }).catch((err) => {
        wx.hideLoading();
      });

    },
    radioChange(answer,info){
      // console.log("answer",answer.detail.value)
      // console.log("info",info)
      var index = this.answerIds.indexOf(info.detailId);
      var answerCorrectInfo={
        questionId:info.detailId,
        answer:answer.detail.value,
        score:info.correctScore,
      }
      var answerErrorInfo={
        questionId:info.detailId,
        answer:answer.detail.value,
        score:info.errorScore,
      }
      if(this.answerListIds.indexOf(info.detailId)>-1){
        this.delData(info.detailId);
      }else{
        this.answerListIds.push(info.detailId);
      }

      if(info.correctAnswer.indexOf(answer.detail.value) > -1){//答案正确
        if (index ==-1) {
          this.answerIds.push(info.detailId)
          this.score=this.score + info.correctScore
        }

        this.answerList.push(answerCorrectInfo)

      }else{//答案错误
        if (index > -1) {
          this.answerIds.splice(index, 1);
          this.score=this.score - info.correctScore;
        }
        this.answerList.push(answerErrorInfo)
      }
    },
    delData(detailId){
      var data=this.answerList;
      for(var i=0;i<data.length;i++){
        if(detailId==data[i].questionId){
          data.splice(i,1)
        }
      }
      this.answerList=data;
    },
    submit(){
      let params={
        ifscore3:this.ifscore3,
        score:this.score,
        ifscore1:this.ifscore1,
        ifscore4:this.ifscore4,
        time1:this.time1,
        time3:this.time3,
        time4:this.time4,

        lowestAnswerScore1:this.lowestAnswerScore1,//阅读得奖最低分数
        lowestAnswerScore4:this.lowestAnswerScore4,//推销得奖最低分数
        lowestAnswerScore3:this.lowestAnswerScore3,//精准得奖最低分数
      }
      console.log("分数",params)

      if(this.ifscore3 && this.score>=this.lowestAnswerScore3  && this.time3){ //精准
        if(this.precisePhone){
          this.dialog_show=true
        }else{
         this.updatePrecise();
        }
		this.submitresult=true;
      }

      if(this.ifscore1 && this.score>=this.lowestAnswerScore1 && this.time1){ //阅读
      let params={
          dynamicId:this.dynamicId,
          shareId:this.shareId,
          answerScore:this.score,
          readFlag: 1,
        };
        console.log("阅读params",params);
        WXAJAX.POST(params, '', '/reader/record/add','','',1);
        this.submitresult=true;
      }
      if(this.ifscore4 && this.score>=this.lowestAnswerScore4 && this.time4){ //推销
      let params={
          dynamicId: this.dynamicId,
          shareId:this.shareId,
          readFlag: 1,
          answerScore:this.score
        };
        console.log("推销params",params);
        WXAJAX.POST(params, '', '/pushEffect/record/add','','',1);
        this.submitresult=true;
      }

        wx.showToast({
          title: "提交成功~",
          duration: 1000,
          icon: "none"
        });
        this.submittext="已提交"


        for(var i=0;i<this.answerList.length;i++){
          WXAJAX.POST(this.answerList[i], '', '/answer/add','','',1);
        }
    },
    async getInits(cardId) {
      let v = this;
      let that = this;
      try {
        await WXAJAX.POST({
          companyId: v.COMPANYID,
          dynamicId: v.dynamicId,
          cardId: wx.getStorageSync('CARDID') || cardId,
        }, '', '/dynamic/getDynamicDetail','','',1).then((data) => {

          if (data) {
            v.cardId=data.cardId
            v.COMPANYID=data.companyId

            console.log("测试是否接收到精准转发数据",v.preciseId,v.type);
            //奖励
            v.reward(data);

            WXAJAX.POST({
              // rewardAnswerType: 0,
              dynamicId: v.dynamicId,
              questionTitle:'',
              pageSize:100,
              pageNum:1,
            }, '', '/question/queryListInitialQuestion','','',1).then((res) => {
              v.problemList=res.list
            });

            if (isUrl(data.details)) {
				console.log(data.details)
              v.webViewSrc = data.details
            } else {
              v.details = v.formatRichText(data.details )
            }
            v.time = util.getdate(data.createTime, 'dateTime')
            v.dynamic = data
            // v.dynamic.photos = v.dynamic.photos ? v.dynamic.photos.split(",") : [];
            v.dynamic.createTime = util.getdate(v.dynamic.createTime, "dateTime");
            v.dynamic.createTime = v.getDateConversion(v.dynamic.createTime)
            v.dynamic.createTime = util.getFormatTime(v.dynamic.createTime,true)
            if(v.dynamic.commentModelList){
              let list = v.dynamic.commentModelList
              list.forEach((item,k) => {
                item.createTime = util.getdate(item.createTime, "dateTime")
                item.createTime = v.getDateConversion(item.createTime)
                v.dynamic.commentModelList[k].createTime = util.getFormatTime(item.createTime, true)
              });
            }else{
              v.dynamic.commentModelList = []
            }

            v.title = data.title || ''
            // this.companyName = data.companyName


            v.photos = data.photos.split(',')
            let timer1 = setTimeout(function(){
                  clearTimeout(timer1)
                  uni.getSystemInfo({
                      success: function (res) {
                          console.log('可使用窗口高度',res.windowHeight);
                          that.ksqyheight = res.windowHeight
                      }
                  });
                  const query = uni.createSelectorQuery().in(that);
                          query.select('#bodytop').boundingClientRect(rect => {
                            console.log('rect',rect)
                            let hei =rect.height// 节点的高度
                            let top =rect.top// 节点的上边界距离顶部距离
                            that.bodyheight = hei
                            that.bodytop = top
                            console.log('bodyheight',that.bodyheight)
                          }).exec();

                          query.select('#navbottom').boundingClientRect(rect => {
                            console.log('rect',rect)
                            let hei =rect.height// 节点的上边界距离顶部距离
                            that.navbottomheight = hei
                            console.log('navbottomheight',that.navbottomheight)
                          }).exec();
                        }, 200);
          }
        }).catch(err => {
          console.log("err",err);
          if(err.code!=200){
            wx.showToast({
              title: '文章已被移除！',
              icon: 'none',
              duration: 2000
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
              v.isLoading = false;
            }, 2000);
          }
        });

      } catch (error) {
        console.log('err---------or', error);
      }

      // this.getproblem();

    },
    reward(data){ //奖励处理
      let v=this;
      let readAward=false;//是否提示有阅读奖励
      let answerAward=false;//是否提示有答题奖励

      if(data.settingInfo.pushEffectFlag){//推销


        if(data.pushEffectReward.answerFlag==1){//是否需要答题
          v.currentTab=3
          v.topic=true
          v.ifscore4=true
          v.lowestAnswerScore4=data.pushEffectReward.lowestAnswerScore
          v.timer=setTimeout(function () {//最少阅读时间
              if(v.shareId&&v.type!=1){
                v.time4=true;
                }
          }, data.pushEffectReward.lowestReadTime*1000)
        }else{
          v.timer=setTimeout(function () {//最少阅读时间
              if(v.shareId&&v.type!=1){//推销奖励
                WXAJAX.POST({
                  dynamicId: v.dynamicId,
                  shareId:v.shareId,
                  readFlag: 1,
                }, '', '/pushEffect/record/add','','',1);
              }
          }, data.pushEffectReward.lowestReadTime*1000)
        }
      }
      // if(data.share||data.readReward){//分享//阅读
      //   WXAJAX.POST({//阅读+分享奖励
      //     dynamicId:this.dynamicId,
      //     shareId:this.shareId,
      //   }, '', '/reader/record/add','','',1);

      //   if(data.share.answerFlag==1){//是否需要答题
      //     v.topic=true
      //   }
      // }

      if(data.settingInfo.readRewardFlag){//阅读
        if(data.readReward.answerFlag==1){//是否需要答题
          v.currentTab=3
          v.topic=true
          v.ifscore1=true
          v.lowestAnswerScore1=data.readReward.lowestAnswerScore

          // if(v.type!=1){//设置了答题，并且是别人发给我的，不是自己发给别人的
            readAward=true
            answerAward=true

            v.timer=setTimeout(function () {//延时
                 v.time1=true;
            }, data.readReward.lowestReadTime*1000)
          // }
        }else{
          if(v.type!=1){
            readAward=true
            v.timer=setTimeout(function () {//延时
               WXAJAX.POST({//阅读奖励
                 dynamicId:v.dynamicId,
                 shareId:v.shareId,
                 readFlag: 1,
               }, '', '/reader/record/add','','',1);
            }, data.readReward.lowestReadTime*1000)
          }
        }
      }

      if(data.settingInfo.preciseRewardFlag){//精准
        if(data.preciseReward.precisePhone){
          v.precisePhone=data.preciseReward.precisePhone;
        }
        if(data.preciseReward.answerFlag==1){//是否需要答题
          if(v.preciseId&&v.type!=1){//精准奖励
            readAward=true
            answerAward=true
            this.timer=setTimeout(function () {//延时
               v.time3=true
            }, data.preciseReward.lowestReadTime*1000)
          }
        }else{
          if(v.preciseId&&v.type!=1){//精准奖励

          readAward=true
            this.timer=setTimeout(function () {//延时
              if(v.precisePhone){
                v.dialog_show=true
              }else{
               v.updatePrecise();
              }

            }, data.preciseReward.lowestReadTime*1000)
          }
        }
      }

      if(v.topic){
        console.log("readAward",readAward)
        console.log("answerAward",answerAward)
        if(readAward&&answerAward){
          wx.showToast({
            title: "阅读并回答问题可以得奖励呦~",
            duration: 1000,
            icon: "none"
          });
        }else if(readAward){
          wx.showToast({
            title: "阅读可以得奖励呦~",
            duration: 1000,
            icon: "none"
          });
        }else if(answerAward){
          wx.showToast({
            title: "答题可以得奖励呦~",
            duration: 1000,
            icon: "none"
          });
        }

      }
    },
    getproblem(){

    },
    async toLogin(i) {
      if (i > 3) return;
      try {
        await HandleLogin.postLoginPromiseByTourists();
      } catch (error) {
        await this.toLogin(++i);
      }
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
    tab_tap(type){
      if(type == 1){
        this.currentTab = 1
      }else if(type == 2){
        this.currentTab = 2
      }else{
        this.currentTab = 3
      }
    },
    talk() {
      let selfCardId = uni.getStorageSync('cardId') || ''
      if(selfCardId == this.dynamic.cardId){
        return uni.showToast({
          title:'这篇文章是您发布的哦~',
          icon:'none'
        })
      }
      authSubscribeMessage(this.subscriptionNew);
      wx.navigateTo({
        url:
          "../../IM/main?userId=" +
          this.dynamic.userId +
          "&logo=" +
          this.dynamic.companyLogo +
          "&type=2&cardId=" +
          this.dynamic.cardId +
          "&name=" +
          this.dynamic.companyName +
          "&companyId=" +
          this.dynamic.companyId +
          "&wxCode=" +
          (this.dynamic.personalWx || "") +
          "&phone=" +
          this.dynamic.phone || this.dynamic.recruitPhone || this.dynamic.companyPhone ||  ''
      });
    },
    call_tap(){
      if(this.dynamic.companyPhone || this.dynamic.recruitPhone){
        wx.makePhoneCall({
            phoneNumber: this.dynamic.companyPhone || this.dynamic.recruitPhone //仅为示例
        });
      }else{
        wx.showToast({
          title:'暂无号码',
          icon:'none'
        })
      }
    },
    addComment(index1, replayComment,type) {
      authSubscribeMessage(this.subscriptionNew);
      //添加评论
      let isLogin = HandleLogin.returnIsLogin();
      if (!isLogin) {
        uni.showToast({
          title: "请先登录,才可以评论喔",
          icon: "none"
        });
        return;
      }
      if(type == 'add'){
        this.replayComment = ''
        this.input_show = true;
        let v = this;
      }else{
        if (
          (replayComment.userName && !replayComment.commentId) ||
          (replayComment.commentId &&
            replayComment.userId == wx.getStorageSync("userId"))
        ) {
          // return;
        }else{
          this.replayComment = replayComment;
          this.add_comments_index = index1;
        }
      }


      this.input_show = true;
      let v = this;
      // setTimeout(function () {
      //   v.$set(v.dynamic[index1], "operate_show", false);
      //   v.comment_focus = true;
      // }, 200);
    },
    inputgetFocus(that, e) {
      let v = this;
    },
    inputConfirm() {
      //输入完成
      this.emoji_show = false;
      this.comment_focus = false;
      authSubscribeMessage(this.subscriptionNew);
      WXAJAX.POST(
        {
          dynamicId: this.dynamic.dynamicId,
          parentId: this.replayComment.commentId || 0,
          cardId: this.cardId || this.CARDID || 0,
          text: this.comments
        },
        "",
        "/personal/doComment",'','',2
      ).then(res => {
        var date = new Date()
        date = util.getdate(date, "dateTime")
        date = this.getDateConversion(date)
        date = util.getFormatTime(date, true)
        this.dynamic.commentModelList.push({
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
    previewImage(urls) {
        wx.previewImage({urls: [urls + '.primary.png']})
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
    zan() {
      //点赞
      let isLogin = HandleLogin.returnIsLogin();
      if (!isLogin) {
        uni.showToast({
          title: "请先登录,才可以点赞喔",
          icon: "none"
        });
        return;
      }

      let v = this;
      wx.showLoading();
      WXAJAX.POST(
        {
          dynamicId: v.dynamic.dynamicId,
          cardId: wx.getStorageSync("CARDID")
        },
        "",
        "/personal/doDynamicThumbs",'','',2
      )
        .then(data => {
          wx.hideLoading();
          if (data) {
            v.dynamic.isThumbs  =  !v.dynamic.isThumbs
            v.isLike = true
            v.getInits(v.cardId)
          }else{
            v.dynamic.isThumbs = 0
            v.isLike = false
            v.getInits(v.cardId)
          }

        })
        .catch(err => {
          console.log(err);
          wx.hideLoading();
        });
    },
    //处理富文本样式问题
    formatRichText(html){
      let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
          match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
          match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
          match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
          return match;
      });
      newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
          match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
          return match;
      });
      newContent = newContent.replace(/<br[^>]*\/>/gi, '');
      newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
      return newContent;
    },
    // 分享给朋友
    async onShareEvent() {
      wx.showLoading({ title: '生成海报中', mask: true });
      await WXAJAX.POST({ companyId: this.COMPANYID, shareType: 4, itemId: this.dynamicId }, '', '/shareRecord/addShareRecord','','',2).then(data => {
        WXAJAX.POST({ itemId: this.dynamicId, shardRecordId: data }, '', '/personal/getDynamicPoster','','',2).then(result => {
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
    onShareInSide(){//站内分享
      wx.navigateTo({
       url:'../companyPack/choosefriends/main?id='+this.dynamicId+'&cid='+this.COMPANYID
      })
    },
    checkCollect() {
    //   WXAJAX.checkCollect({
    //     itemType: 2,
    //     itemId: this.dynamicId,
    //   }).then((data) => {
    //     this.isCollect = data.status;
    //   }).catch((err) => {

    //   })
    },
    goPage() {
      uni.navigateTo({
        url: `./webView?url=${this.webViewSrc}`
      })
    },
    //  删除
    choose_tap(id) {
      if (id === 'cancel') {
        this.addTypeShow = false;
        return;
      }
      wx.showLoading();

      WXAJAX.POST({
        dynamicId: this.dynamicId,
      }, '', '/company/delDynamicInfo','','',2).then((data) => {

        wx.hideLoading();
        wx.showToast({
          title: '成功！',
          icon: 'success'
        });
        setTimeout(function () {
          wx.navigateBack();
        }, 600);
      }).catch((err) => {
        console.log(err);
        wx.hideLoading();
      });
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
<style>
page {
  background: #fff !important;
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
  background: rgba(0, 0, 0, 0.5);
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
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.img-size {
  width: 600upx;
  height: 600upx;
  margin-top: 30upx;
  margin-bottom: 60upx;
}
.content{
  box-sizing: border-box;
  padding:0 0 118upx 0;
}
.content rich-text{
  width: 750upx;
  overflow: hidden;
}
</style>
<style scoped>
.top{
  padding: 30upx;
  box-sizing: border-box;
}
.title{
  width: 688upx;
  font-size: 32upx;
  font-weight: 500;
  color: #383838;
  line-height: 48upx;
}
.line{
  transition: all 0.2s;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 32upx;
  height: 8upx;
  background: #ffffff;
}
.active{
  color: #383838;
  font-weight: bold;
}
.active .line{
  transition: all 0.2s;
  background: #51CDCB !important;
}
.content{
  padding: 0 30upx;
}
.comment_btn{
  display: block;
  padding:17upx 34upx;
  border: 1px solid #51CDCB;
  border-radius: 30px;
  color: #51CDCB;
  font-size: 28upx;
}
.btns{
  height: 98upx;
  position: fixed;
  bottom: 0;
  width: 100vw;
  z-index: 99;
}
.bottom{
  min-height: 500rpx;
}
.consulting{
  background: linear-gradient(-90deg, #51CBCD, #76DAD9);
}
.edit_input.hide {
  opacity: 0;
}
.comment_input{

}

.title{
   font-size: 32upx;
   color: #383838;
   display: flex;
   align-items: center;
   padding:0upx 30upx 0 30upx;
   height: 88upx;
   font-weight:bold;
   border-bottom: 1upx solid #F8F8F8;
 }
 .title span{
   width: 20upx;
   height: 20upx;
   margin-right: 17upx;
   border-radius: 50%;
 }
 .content{
   padding:30upx 30upx 0 30upx;
   min-height: 140upx;
   font-size: 30rpx;
   /* height: 72upx; */
   line-height: 30rpx;
   overflow: hidden;
   border-bottom:1upx solid #F8F8F8;
 }
 .content-bottom{
   height: 88upx;
   display: flex;
   padding:0upx 30upx 0 30upx;
   justify-content: space-between;
   align-items: center;
   font-size: 28upx;
 }
 .content-bottom-right{
   display: flex;
 }
 .target{
   background: #FFFFFF;
   border-radius: 20upx;
   margin-top: 20upx;
 }
 .target ul{
   padding:0  30upx;
   display: flex;
   flex-direction: column;
 }
 .target ul li{
   height: 88upx;
   font-size: 28upx;
   display: flex;
   justify-content: space-between;
   align-items: center;
 }
 .target ul li input{
   height: 100%;
   width: 200upx;
   margin-right: 5upx;
 }
 .target-right{
   display: flex;
 }
</style>
