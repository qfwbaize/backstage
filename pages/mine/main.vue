<template>
  <div class="index bgf5f6 h100p">
    <div>
      <div class="posab bgblue cardBackground"></div>
      <div v-if="card_msg.style == 0">
        <Card_1 :card_msg="card_msg"></Card_1>
      </div>

      <div v-if="card_msg.style == 1">
        <Card_2 :card_msg="card_msg" @uploadpic="uploadpic"></Card_2>
      </div>

      <div v-if="card_msg.style == 2">
        <Card_3 :card_msg="card_msg"></Card_3>
      </div>

      <div v-if="card_msg.style == 3">
        <Card_4 :card_msg="card_msg"></Card_4>
      </div>

      <!--2.0-->
      <Card_5 v-if="card_msg.style == 4" :card_msg="card_msg"></Card_5>
      <Card_6 v-if="card_msg.style == 5" :card_msg="card_msg"></Card_6>
      <Card_7 v-if="card_msg.style == 6" :card_msg="card_msg"></Card_7>
    </div>
    <view>
      <div class="card_menu fs12 ca8 bgfff borderbox pl10 ">
        <div class="clearfix pt5 pb5 disflex operation-box">
          <div class="shadow_gray h65 mr10 business_card" @click="createCode">
            <img :src="cardCodeImg" alt="" class="w65 h65">
          </div>
          <scroll-view scroll-x scroll-with-animation show-scrollbar="false">
            <div class="disflex scroll-list">
              <div class="shadow_gray textc pt15 pl15 pr15 h65 mr10"
                @click="toRoute('companyPack/showBill', '?cardId='+currentCompany.cardId)">
                <p class="pb7">
                  名片海报
                </p>
                <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/wx_timeline.png" alt=" "
                  class="w20 h20" />

              </div>
              <div class="shadow_gray textc pt15 pl15 pr15 h65 mr10" @click="tel">
                <p class="disflex align-cen">
                  <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/tel_2.png" alt=""
                    class="w16 h16" />
                  <span class="pl9">拨打电话</span>
                </p>
                <p class="c78 fbold pt7">{{card_msg.phone || '未填写'}}</p>
              </div>
              <div class="shadow_gray textc pt15 pl15 pr15 h65 mr10" @click="addWx">
                <p class="disflex align-cen">
                  <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/im_msg.png" alt=""
                    class="w16 h16" />
                  <span class="pl9">添加微信</span>
                </p>
                <p class="c78 fbold pt7">{{card_msg.personalWx || '未填写'}}</p>
              </div>
              <div class="shadow_gray textc pt15 pl15 pr15 h65 mr10" @click="openAddr(card_msg.address)">
                <p class="disflex align-cen">
                  <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190425164542.png" alt=""
                    class="w16 h16" />
                  <span class="pl9">公司地址</span>
                </p>
                <p class="c78 fbold pt7">{{card_msg.address || '未填写'}}</p>
              </div>
            </div>
          </scroll-view>
        </div>
        <div class="more-info">
          <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190514143457.png" alt=""
            class="left-img">
        </div>
      </div>

    </view>
    <div class="seen_peo disflex pl15 pr26 fs10 ca8 jsbet bgfff ">
      <view>
        <div class="disflex  notBoxshow">
          <!-- 浏览量 -->
          <div class='bfffb'>
            <div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA"
            style="box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(167, 225, 221, 100);">
              <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/mine/see.png"
                class="w25 h25">
            </div>
            <p class="fs12 fbold lh1">浏览量
              <text style="color:#2EFEF7;"> {{card_msg.browseNum ? card_msg.browseNum : 0}}</text>
            </p>
          </div>

          <div class='bfffb' @click="toPrinciples">
            <div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA"
            style="box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(167, 225, 221, 100);">
              <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/mine/content.png"
                class="w25 h25">
            </div>
            <p class="fs12 fbold lh1">内容</p>
          </div>

          <div class='bfffb'>
            <div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA"
            style="box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(167, 225, 221, 100);">
              <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/mine/zan.png"
                class="w25 h25">
            </div>
            <p class="fs12 fbold lh1">靠谱
              <text style="color:#2EFEF7;">{{card_msg.thumbsNum}}</text>
            </p>
          </div>

          <div class='bfffb' @click="toRoute('companyPack/editCard','?type=edit')">
            <div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA"
             style="box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(167, 225, 221, 100);">
              <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/mine/edit.png"
                class="w25 h25">
            </div>
            <p class="fs12 fbold lh1">编辑名片</p>
          </div>

          <button class='bfffb bgfff ' style="padding: 0;" open-type="share">
            <div class="disflex w44 mb12 h44 align-cen jscen bradius50p shadow_grayA"
             style="box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(167, 225, 221, 100);">
              <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/mine/share.png"
                class="w25 h25">
            </div>
            <p class="fs12 fbold lh1">转发名片</p>
          </button>


        </div>
      </view>


    </div>
    <view class="content_center">

      <view class="background">
        <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/vipcard.png" mode="">
        </image>
      </view>

      <div class="seen_peo disflex pl15 pr26 fs10 pb10 ca8 jsbet bgfff position">
        <div class="disflex noBox">
          <div class='cttop'>
            <view class="" style="display: flex;align-items:center;justify-content: space-between;margin-top: 14rpx;">
              <view class="" style="display: flex;align-items:center">
                <image class="imgct" :src="choose_company_logo" mode=""></image>
                <view class="" style="display: flex;margin-left: 20rpx;">
                  <view class="cttext">{{choose_company}}</view>
                 <!-- <image v-if="isCompanyAuth == 1" style="width: 40rpx;height: 40rpx;"
                    src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/antFill-safety-certificate 2 Copy@3x.png"
                    mode=""></image> -->
                </view>
              </view>
              <!-- <div class='qhjg' @click="toMyCard">
                切换机构/名片
              </div> -->
              <!-- <div v-if="(isCompanyAuth == 0)" class='qhjg'
                @click="page_H5('H5/webView?H5title=中国必胜1&url=https://wx.mingyicloud.com/app/myy/infomgmt.nsf/ctrlDataFXMopenformFxMaFxm3FxMidFxm3')">
                企业认证
              </div>
              <div v-if="isCompanyAuth == 1" class='qhjg'
                @click="page_H5('H5/webView?H5title=中国必胜1&url=https://wx.mingyicloud.com/app/myy/infomgmt.nsf/ctrlDataFXMopenformFxMaFxm3FxMidFxm3')">
                再次认证</div>
              <div v-if="isCompanyAuth == 2" class='qhjg'
                @click="page_H5('H5/webView?H5title=中国必胜1&url=https://wx.mingyicloud.com/app/myy/infomgmt.nsf/ctrlDataFXMopenformFxMaFxm3FxMidFxm3')">
                正在审核中</div> -->
            </view>
            <div class='ctbot'>
              <div class='div1' @click='editEnterprise'>
                <image class="img5"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/minemechanism.png" mode="">
                </image>
                <text>机构设置</text>
              </div>
              <div class='div1' @click='member'>
                <image class="img6"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/mineorganization.png" mode="">
                </image>
                <text>组织架构</text>
              </div>
              <div class='div1' @click="tomechanism">
                <image class="img7"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/minedata.png" mode=""></image>
                <text>机构数据</text>
              </div>
              <div class='div1' @click="toMyCard">
                <image class="img7"
                  src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/minechange.png" mode="">
                </image>
                <text>切换企业</text>
              </div>
            </div>
          </div>
        </div>
      </div>

    </view>

    <!-- <view class="forwardInfo">
        <view class="forwardInfo_title">转发记录</view>
        <view class="forwardInfolist">

          <view class="forwardInfolist_every" @click="toShare">
            <view class="forwardInfolist_every_img">
              <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/fas fa-share@3x.png" mode=""></image>
            </view>
            <view class="forwardInfolist_every_text">普通转发</view>
          </view>

          <view class="forwardInfolist_every" @click="toAccurate">
            <view class="forwardInfolist_every_img">
              <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/accurate.png" mode=""></image>
            </view>
            <view class="forwardInfolist_every_text">精准转发</view>
          </view>

          <view class="forwardInfolist_every" @click="toforPromote">
            <view class="forwardInfolist_every_img">
              <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/down.png" mode=""></image>
            </view>
            <view class="forwardInfolist_every_text">推效转发</view>
          </view>

          <view class="forwardInfolist_every" @click="toforShare">
            <view class="forwardInfolist_every_img">
              <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/image/money.png" mode=""></image>
            </view>
            <view class="forwardInfolist_every_text">分享奖励</view>
          </view>

          <view class="forwardInfolist_every" @click="toforRead">
            <view class="forwardInfolist_every_img">
              <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/read.png" mode=""></image>
            </view>
            <view class="forwardInfolist_every_text">阅读奖励</view>
          </view>

        </view>
      </view> -->


    <view class="function">
      <view class="functiontext">常用功能</view>
      <view class="functionlist">
        <view class="list_every" @click="cardList">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/cardfolder.png" mode="">
          </image>
          <text>名片夹</text>
        </view>
        <view class="list_every" @click="companyPackC">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/wallet.png" mode="">
          </image>
          <text>我的钱包</text>
        </view>
        <view class="list_every" @click="toCollect">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/collection.png" mode="">
          </image>
          <text>我的收藏</text>
        </view>
        <view class="list_every" @click="toVip">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/vip.png" mode="">
          </image>
          <text>我的会员</text>
        </view>
        <view class="list_every" @click="toVisit">
          <image
            src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riLine-map-pin-user-line@3x.png"
            mode=""></image>
          <text>实名认证</text>
        </view>
        <view class="list_every" @click="toArticleAward">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/text.png" mode="">
          </image>
          <text>文章明细</text>
        </view>
        <view class="list_every" @click="toRead">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/ze-phone-o@3x.png" mode="">
          </image>
          <text>联系采推</text>
        </view>
        <view class="list_every" @click="toMarketing">
          <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/task.png" mode="">
          </image>
          <text>任务管理</text>
        </view>
      </view>
      <!-- 联系我们的隐藏页面 -->
      <view class="" v-show="!open">
        <view class="shadow" @click="toShow"></view>
        <view class="submitphone">
          <view class="submitphone_text">您的手机号码</view>
          <input type="number" v-model="submit_phone" placeholder="请输入手机号码" />
          <view class="submitphone_text">留下您的手机号码，采推平台的客户经理将于24小时与您联系</view>
          <view class="submitphone_btn" @click.stop="toSubmit">提交</view>
        </view>
      </view>


    </view>

    <!--未创建名片提示-->
    <div v-show="nocard_show">
      <DialogBox :dialog_title="'提示'" @btn_tap="nocard_btn_tap" :dialog_ph="'您还没有名片哦，请先创建自己的名片再进入'" :type="'hint2'"
        :left="'取消'" :right="'创建名片'"></DialogBox>
    </div>
    <Tabbar :unreadMsg='unreadMsg' tabIndex=4></Tabbar>
    <view class="" style="width: 100%;height: 110rpx;"></view>
  </div>


</template>

<script>
  import websocket from '@/utils/websocket'
  import DialogBox from '@/components/dialogBox' // 对话框
  import StaticResources from '@/components/StaticResources';
  import AddWxCourse from '@/components/addWxCourse'
  import Card_1 from '@/components/card_1' //
  import Card_2 from '@/components/card_2' //
  import Card_3 from '@/components/card_3' //
  import Card_4 from '@/components/card_4' //
  import Card_5 from "@/components/card_5"; //
  import Card_6 from "@/components/card_6"; //
  import Card_7 from "@/components/card_7"; //
  import Tabbar from "@/components/Tabbar";
  import util from '../../utils/index'
  import WXAJAX from '../../utils/request';
  import {
    mapActions,
    mapGetters
  } from 'vuex';
  import {
    authSubscribeMessage,
    authSubscribeOrder,
    authArticleMessage
  } from '../../utils/auth.js'

  export default {
    data() {
      return {
        isCompanyAuth: '',
        navHeight: '',
        navBarUserHeight: '',
        scrollContentHeight: 0,
        navTop: '',
        isBoss: false,
        hasCard: true, //是否已经有自己的名片
        nocard_show: false,
        COMPANYID: 0,
        CARDID: 0,
        isShowConfirm: false,
        money: '',
        card_msg: {
          style: 0,
          cardId: ''
        },
        isThumbs: 0, //是否点赞
        isShowCourse: false,
        card_style: 0,
        cardCodeImg: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/img_card_code.png',
        saveIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/icon_save.png',
        weixinIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_weixin.png',
        likeIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_like.png',
        isLikeIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_select_like.png',
        editIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/ic_ edit.png',
        firstLoginIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/img_viewmore.png',
        companyId: '',
        cardId: '',
        accountAmount: 0,
        freezeAmount: 0,
        usableAmount: 0,

        // choose_company:wx.getStorageSync('choose_company'),
        // choose_company_logo:wx.getStorageSync('choose_company_logo'),
        choose_company: '',
        choose_company_logo: '',
        open: true,
        submit_phone: '',
        unreadMsg: uni.getStorageSync('unreadMsg')
      }
    },

    components: {
      DialogBox,
      AddWxCourse,
      StaticResources,
      Card_1,
      Card_2,
      Card_3,
      Card_4,
      Card_5,
      Card_6,
      Card_7,
      Tabbar
    },

    created() {
      this.COMPANYID = this.currentCompany.companyId;
      this.CARDID = this.currentCompany.cardId;
      // this.inits();
    },
    /** tab点击 */
    onTabItemTap(item) {
      //订阅授权 信息相关
      authSubscribeMessage(this.subscriptionNew);

    },
    onLoad(e) {
      if(e.types == 2){
        setTimeout(()=>{
          uni.navigateTo({
            url:'/pages/companyPack/visitlist/main?types=2'
          })
        },2000)
      }
      this.calculateNavBarHeight()
    },
    onShow() {
      websocket.sendSocketJSON('1090');
      uni.hideHomeButton()
      uni.setNavigationBarTitle({
        title: '个人中心'
      })
      this.isBoss = wx.getStorageSync("isBoss")
      this.money = '';
      if (!this.COMPANYID) {
        this.COMPANYID = this.currentCompany.companyId;
        this.CARDID = this.currentCompany.cardId;
      }
      this.inits();
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
      })

      //获取公司信息
      let that = this;
      WXAJAX.POST({
        ignore: true
      }, '', '/company/getCompany').then((data) => {
        // 设置机构认证
        // wx.setStorageSync('isCompanyAuth',data.isCompanyAuth)
        if (data.isCompanyAuth == 0) {
          this.isCompanyAuth = 0
        } else if (data.isCompanyAuth == 1) {
          this.isCompanyAuth = 1
        } else if (data.isCompanyAuth == 2) {
          this.isCompanyAuth = 2
        }
        // 默认设置机构认证
        // wx.setStorageSync('isCompanyAuth',1)
        that.choose_company = data.companyName
        that.choose_company_logo = data.companyLogo
      });

    },
    async mounted() {
      let a = await util.systemIfo();
      let navHeight = getApp().globalData.navHeight;
      this.scrollContentHeight = a.windowHeight;
    },
    async onPullDownRefresh() {
      // to doing..
      // 停止下拉刷新
      wx.showNavigationBarLoading();
      this.inits();
      wx.stopPullDownRefresh();
      setTimeout(function() {
        wx.hideNavigationBarLoading();
      }, 300)
    },
    onShareAppMessage() {
      const {
        cardId,
        companyName,
        name,
        position,
        shareSpeech
      } = this.currentCompany;
      let shareMessage = "";
      if (shareSpeech && typeof(shareSpeech) === "string") {
        shareMessage = shareSpeech.replace('#name#', name).replace('#company#', companyName);
      }
      return {
        title: shareMessage || `您好，我是${companyName}的${position || ''}${name}，敬请惠存!`,
        path: `/pages/shareCard/main?cardId=${cardId}`,
        success(e) {
          console.log(e)
        },
        fail(e) {
          console.log('失败-- ', e);
        }
      }
    },
    onShareTimeline() {
      //分享朋友圈
    },
    methods: {
      ...mapActions(['setCurrentCompany']),
      calculateNavBarHeight() {
        if (getApp().globalData.menuButtonBounding === 0) {
          getApp().globalData.menuButtonBounding = wx.getMenuButtonBoundingClientRect();
        }
        let menuButtonBounding = getApp().globalData.menuButtonBounding;
        wx.getSystemInfo({
          success: res => {
            let statusBarHeight = res.statusBarHeight; //胶囊按钮与顶部的距离
            let navHeight =
              statusBarHeight +
              (menuButtonBounding.top - statusBarHeight) * 2 +
              menuButtonBounding.height; //导航高度
            let navBarUserHeight = navHeight - statusBarHeight;

            this.navHeight = navHeight + 10 + "px";
            this.navTop = statusBarHeight + "px";
            wx.setStorageSync('navTop', this.navTop)
            this.navBarUserHeight = navBarUserHeight + "px";
          },
          fail(err) {
            //console.log(err);
          }
        });
      },
      //       toAward1() {
      //         wx.navigateTo({
      // //           url: "../../companyPack/burse/burse",
      //           url: "/pages/companyPack/burse/burse"
      //         });
      //       },
      toPrinciples() {
        uni.navigateTo({
          url: '/pages/companyPack/principles/main'
        })
      },
      companyPackC() {
        wx.navigateTo({
          url: "/pages/companyPack/burse/burse"
        });
      },
      cardList() {
        wx.navigateTo({
          url: "/pages/companyPack/maillist/main"
        });
      },
      member() {
        wx.navigateTo({
          url: "/pages/companyPack/organization/organization"
        });
      },
      tomechanism() {
        wx.navigateTo({
          url: "/pages/companyPack/enterprisedata/enterprisedata"
        })
      },
      editEnterprise() {
        wx.navigateTo({
          url: "/pages/companyPack/editEnterprise/main?type=edit"
        });
      },
      tonav(e) {
        let that = this
        console.log(e.currentTarget.dataset.url)
        wx.navigateTo({
          url: e.currentTarget.dataset.url
        });
        //           url: "../../companyPack/burse/burse",
        // wx.navigateTo({
        //           url: "/pages/companyPack/burse/burse"
        //         });
      },
      toCardCase() {
        let cardId = wx.getStorageSync("userId");
        authSubscribeMessage(this.subscriptionNew);
        util.toMiniProgram(`/pages/cardCase/main?goType=1`, '', this.cardId, this.companyId);
      },
      staffshare() {
        wx.navigateTo({
          url: "/pages/companyPack/staffshare/main"
        });
      },
      toMyCard() {

        wx.navigateTo({
          url: "/pages/companyPack/mycard/main"
        });
      },
      toFollowRecord() {
        wx.navigateTo({
          url: "/pages/followrecord/main"
        });
      },
      toFrequent() {
        authSubscribeMessage(this.subscriptionNew);
        if (!this.card_msg.cardId) {
          this.nocard_show = true;
        } else {
          wx.navigateTo({
            url: "/pages/frequentPack/frequent/main"
          });
        }
      },

      makePhone() {
        authSubscribeMessage(this.subscriptionNew);
        return WXAJAX.POST({
          ignore: true
        }, '', '/company/selectWebsiteInfo').then((data) => {
          if (data && data.phone) {
            //查询机构电话
            wx.makePhoneCall({
              phoneNumber: data.phone,
            })
          } else {
            wx.showToast({
              title: '请设置机构电话'
            })
          }
        }).catch((err) => {
          console.log("数据请求失败")
        })
      },
      myPrecise() {
        authSubscribeMessage(this.subscriptionNew);
        wx.navigateTo({
          url: "../companyPack/myPrecise/main"
        });
      },
      setValue() {
        // console.log(this.money);
      },
      cancel() {
        this.isShowConfirm = false
      },
      confirmAcceptance() {
        // this.topay();
        this.isShowConfirm = false;
        let that = this;
        WXAJAX.POST({
          accountAmount: this.money,
          usableAmount: this.money,
        }, '', '/account/updateAccountByAccountId', '', '', 1).then((data, code) => {
          WXAJAX.POST({
            ignore: true
          }, '', '/account/myAccount', '', '', 1).then((data) => {
            that.money = '';
            that.accountAmount = data.accountAmount;
            that.freezeAmount = data.freezeAmount;
            that.usableAmount = data.usableAmount;
          });
        });


      },
      toMyPushEffect() {
        wx.navigateTo({
          url: "../companyPack/mypusheffect/main"
        });
      },
      toPushEffect() {
        wx.navigateTo({
          url: "../companyPack/pusheffect/main"
        });
      },
      toAward() {
        wx.navigateTo({
          url: "../companyPack/award/main"
        });
      },
      toArticleAward() {
        wx.navigateTo({
          url: "../companyPack/articleAward/main"
        });
      },
      toCollect() {
        wx.navigateTo({
          url: "../companyPack/collect/main"
        });
      },
      myshare() {
        wx.navigateTo({
          url: "../companyPack/myshare/main"
        });
      },
      //跳转到实名认证
      toVisit(){
        uni.navigateTo({
          url:'../demand/selfAuth/selfAuth'
        })
      },
      //跳转普通转发页面
      toShare() {
        uni.navigateTo({
          url: '../demand/share/share'
        })
      },
      //跳转到精准转发页面
      toAccurate() {
        uni.navigateTo({
          url: '../demand/forAccurate/forAccurate'
        })
      },
      //跳转到推效转发页面
      toforPromote() {
        uni.navigateTo({
          url: '../demand/forPromote/forPromote'
        })
      },
      //跳转到分享奖励页面
      toforShare() {
        uni.navigateTo({
          url: '../demand/forShare/forShare'
        })
      },
      //跳转到阅读奖励页面
      toforRead() {
        uni.navigateTo({
          url: '../demand/forRead/forRead'
        })
      },
      //跳转到我的会员页面
      toVip() {
        uni.showToast({
          title: "正在开发中",
          icon: "none"
        })
      },
      //联系我们页面
      toRead() {
        // this.open = false
         uni.makePhoneCall({
         // 手机号
            phoneNumber: '15910900011',
        // 成功回调
        success: (res) => {
        console.log('调用成功!')
        },
        fail: (res) => {
        console.log('调用失败!')
        }
      });
      },
      toShow() {
        this.open = true
      },
      //提交电话号码
      toSubmit() {
        var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        if (!reg.test(this.submit_phone)) {
          uni.showToast({
            title: '请输入正确的手机号',
            icon: "none",
          })
          return;
        }
        console.log('提交')
      },
      makeWx() {
        let v = this;
        wx.setClipboardData({
          data: '17721872191',
          success: function(res) {
            wx.getClipboardData({
              success: function(res) {
                wx.showToast({
                  title: '复制成功'
                })
                v.isShowCourse = true;
              }
            })
          }
        })
      },
      inits() { //获取数据
        wx.showLoading();
        // wx.getStorageSync('userId');
        let params = {
          ignore: true,
          cardId: wx.getStorageSync('SELFCARDID'),
        };
        if (!wx.getStorageSync('SELFCARDID')) {
          params = {
            ignore: true,
          };
        }
        WXAJAX.POST(params, '', '/businessCard/getCompanyUserInfo').then((data) => {
          wx.hideLoading();
          if (data) {
            this.companyId = data.companyId
            this.cardId = data.cardId
            // wx.setStorageSync('COMPANYID', data.cardId);
            let cardWelcomeSpeech = {
              company: data.companyName,
              user: data.name,
              shareSpeech: data.shareSpeech ? data.shareSpeech : '',
              welcomeSpeech: data.welcomeSpeech ? data.welcomeSpeech : '',
              hint: data.hint ? data.hint : ''
            };
            wx.setStorageSync('cardWelcomeSpeech', cardWelcomeSpeech);
            wx.setStorageSync('cardId', data.cardId);
            this.card_msg = Object.assign({}, data, {
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
            });
            this.card_msg.perfectRateRank = data.perfectRateRank ? (data.perfectRateRank * 100)
              .toFixed(0) : 0;
            this.card_msg.browsePhoto = this.card_msg.browsePhoto ? this.card_msg.browsePhoto.split(
              ',') : [];
            this.setCurrentCompany(data);
            this.card_msg.browsePhoto.splice(2, 2)
            // 获取机构模块配置信息
            this.findCompanyModuleConfigs(data.companyId);
          } else {
            this.hasCard = false;
          }
        }).catch((err) => {
          this.card_msg = {};
          wx.hideLoading();
          this.hasCard = false;
          wx.showToast({
            title: err.message,
            duration: 2000,
            icon: 'none'
          });
        });
      },
      /**
       * 获取机构模块配置信息
       * @param companyId 机构id
       */
      findCompanyModuleConfigs(companyId) {
        WXAJAX.POST({
          companyId: companyId
        }, '', '/companyModuleConfig/findCompanyModuleConfigs').then((data) => {
          if (data) {
            let d = {};
            data.forEach(function(i, k) {
              d[i.moduleName] = i.close;
            });
            wx.setStorageSync('companyModuleConfig', d);
          }
        }).catch((err) => {});
      },
      createCode() {

        WXAJAX.POST({
          cardId: this.currentCompany.cardId,
        }, '', '/businessCard/getWxTwoCode').then((data) => {
          wx.navigateTo({
            url: '/pages/my/cardCode/main?code=' + data
          })
        }).catch((err) => {
          wx.hideLoading();
          if (err.code == 403) {
            this.nocard_show = true;
          } else {
            wx.showToast({
              title: err.message,
              duration: 2000,
              icon: 'none'
            });
          }
        });
      },
      // page_H5(url) {
      //   console.log(url)
      //   //url='H5/webView?H5title=申请认证&url=https://wx.mingyicloud.com/app/myy/infomgmt.nsf/testH5FXMopenformFxMaFxm3FxMidFxm3';
      //   url =
      //     'H5/webView?H5title=申请认证&url=https://wx.mingyicloud.com/app/myy/certmgmt.nsf/personcertFXMopenformFxMcompanyIdFxm' +
      //     this.currentCompany.companyId + 'FxMidFxm3';
      //   //url='H5/webView?H5title=申请认证&url=https://wx.mingyicloud.com/app/myy/infomgmt.nsf/upd_resourceInfoFXMopenformFxMaFxm3FxMidFxm3';

      //   //H5页面打开小程序页面，再返回时带结果：
      //   //url='H5/webView?H5title=申请认证&url=https://wx.mingyicloud.com/app/myy/infomgmt.nsf/ctrlDataFXMopenformFxMaFxm3FxMidFxm3';


      //   // this.$emit('sidebar_close')
      //   //authSubscribeOrder(this.subscriptionNew);
      //   wx.navigateTo({
      //     url: "/pages/" + url
      //   });
      // },


      toRoute(url, query) {
        if (!this.card_msg.cardId) {
          this.nocard_show = true;
        } else {
          if (url == 'cardCase') {
            util.toMiniProgram(`/pages/index/main?companyId=${companyId}&cardId=${cardId}&goType=1`);
          } else {
            wx.navigateTo({
              url: '../' + url + '/main' + (query ? query : '')
            })
          }
        }

      },
      tel() { //拨打电话
        util.MakePhone(this.card_msg.phone || '');
      },
      nocard_btn_tap(str) {
        if (str == 'save') {
          this.toCreatePage();
        }
        this.nocard_show = false;
      },
      addWx() { //添加微信
        authSubscribeMessage(this.subscriptionNew);
        let v = this;
        if (v.card_msg.personalWx) {
          wx.setClipboardData({
            data: this.card_msg.personalWx,
            success: function(res) {
              wx.getClipboardData({
                success: function(res) {
                  wx.showToast({
                    title: '复制成功'
                  })
                  v.isShowCourse = true;
                }
              })
            }
          })
        } else {
          wx.showToast({
            title: '还没有添加微信呢！',
            duration: 2000,
            icon: 'none'
          });
        }
      },
      doThumbs() { //点赞
        wx.showLoading();
        WXAJAX.POST({
          cardId: this.currentCompany.cardId,

        }, '', '/businessCard/doThumbs', '', '', 2).then((data) => {

          wx.hideLoading();
          if (this.isThumbs) {
            this.$set(this.card_msg, 'thumbsNum', --this.card_msg.thumbsNum);
          } else {
            this.$set(this.card_msg, 'thumbsNum', ++this.card_msg.thumbsNum);
          }
          this.isThumbs = !this.isThumbs;
        }).catch((err) => {
          wx.hideLoading();
        });
      },
      // 跳转到任务管理页面
      toMarketing() {
        wx.showToast({
          title: '正在开发中！',
          duration: 2000,
          icon: 'none'
        }); 
      },
      openAddr(address) {
        let than = this;
        let author = ''
        wx.showLoading({
          title: "定位中...",
          mask: true
        });
        if (address == "" || !address) {
          wx.showToast({
            title: "请先添加公司地址",
            icon: "none"
          });
          return false;
        }
        WXAJAX.POST({
              address: address
            },
            "",
            "/businessCard/getGps"
          ).then(data => {
            wx.hideLoading();
            let gps = JSON.parse(data).result.location
            let latitude = gps.lat
            let longitude = gps.lng
            wx.openLocation({
              latitude,
              longitude,
              name: address,
              scale: 18,
              success(data) {
                wx.hideLoading();
              },
              fail: function(res) {
                //进入授权页面重新开启定位授权
                wx.hideLoading();
                wx.getSetting({
                  success(e) {
                    author = e.authSetting['scope.userLocation']
                    if (author == false) {
                      than.isShowAuthorize = true;
                      return false
                    }
                  }
                })
              },
            });
          })
          .catch(err => {
            wx.hideLoading();
            uni.showToast({
              title: err,
              icon: 'none'
            })
          })
      },
    },
    computed: {
      ...mapGetters(["currentCompany", "subscriptionNew"])
    },

  }
</script>

<style>
  .notBoxshow {
    width: 692rpx;
    height: 176rpx;
    border-radius: 10rpx;
    padding-top: 22rpx;
  }

  .noBox {
    width: 692rpx;
    height: 230rpx;
    border-radius: 10rpx;
  }

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
    border-radius: 0px;
    border-bottom-left-radius: 16rpx;
  }

  .button2 button {
    width: 100%;
    background-color: white;
    color: black;
    border-radius: 0px;
    border-bottom-right-radius: 16rpx;
  }

  .degree-of-perfection .line-outer {
    position: relative;
    height: 8upx;
    width: 100%;
    background: rgb(245, 245, 245);
    border-radius: 198upx;
    overflow: hidden;
    margin-top: 40upx;
  }

  .degree-of-perfection .line-outer .line {
    height: 8upx;
    width: 0%;
    background: #51CDCB;
  }

  .more-info {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto 0;
    height: 40upx;
    width: 30upx;
    background: white;
    box-shadow: 0px 0px 20upx 0px rgba(56, 56, 56, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .more-info .left-img {
    width: 10upx;
    height: 20upx;
  }

  .operation-box {
    margin-left: 130rpx;
    margin-right: 40upx;
    padding-left: 10upx;
  }

  .business_card {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 0 50% 50% 0;
    display: flex;
    align-items: center;
    padding-top: 0;
    width: 140upx;
    box-sizing: border-box;
  }

  .business_card p {
    writing-mode: tb-rl;
  }

  .card_menu {
    position: relative;
  }

  .scroll-list {
    padding: 20upx 40upx 20upx 20upx;
  }

  .scroll-list>div {
    white-space: nowrap;
    box-sizing: border-box;
  }

  .self_introduce {
    height: 214upx;
    transition: .1s;
    overflow: hidden;
  }

  .self_introduce.higher {
    height: auto;
  }

  .output-audio {
    width: 167px;
    height: 40px;
    position: relative;
    margin-right: 22upx;
    padding-left: 40upx;
  }

  .audio::before {
    content: '';
    display: block;
    width: 20upx;
    height: 20upx;
    background: #F5F5F6;
    position: absolute;
    border: 1upx solid #E8E8E8;
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
    padding: 24upx 0 24upx 34upx;
    background: #F5F5F6;
    border: 1upx solid #E8E8E8;
    position: relative;
    height: 34upx;
    border-radius: 10upx;
  }

  .output-audio .audio .ico {
    width: 24upx;
    height: 34upx;
    float: left;
  }

  scroll-view {
    background: #fff;
  }

  .marketing {
    width: 688upx;
    height: 220upx;
    padding: 10upx 0 0upx 0;
    box-sizing: border-box;
    width: 100%;
    background: #FFFFFF;
    display: flex;
    justify-content: center;
  }

  .marketing image {
    width: 688upx;
    height: 220upx;
  }

  .browsing-history {
    width: 36upx;
  }

  .forward {
    padding: 0 185upx 0 185upx;
  }

  .bfff {
    width: 692rpx;
    height: 176rpx;
    box-shadow: #A7E1DD 0 0 15upx;
    border-radius: 10rpx;
    padding-top: 22rpx;
  }

  .bfff1 {
    width: 692rpx;
    height: 204rpx;
    box-shadow: #A7E1DD 0 0 15upx;
    border-radius: 10rpx;

  }

  .bfffb {
    flex: 1;
    position: relative;
    display: block;

    box-sizing: border-box;
    font-size: 18px;
    text-align: center;
    text-decoration: none;
    line-height: 2.55555556;
    border-radius: 5px;
    -webkit-tap-highlight-color: transparent;
    overflow: hidden;
    cursor: pointer;
    color: #000;

  }

  .mb12 {
    margin-left: 20rpx;
  }

  .cttop {
    width: 692rpx;
    /* height: 204rpx; */
    position: relative;
  }

  .imgct {
    /* 		position: absolute;
		top: 12rpx;
		left: 30rpx; */
    width: 82rpx;
    height: 82rpx;
    border-radius: 40rpx;
  }

  .cttext {
    max-width: 300rpx;
    /* position: absolute; */
    font-size: 28rpx;
    color: #101010;
    /* top: 38rpx;
		left: 142rpx; */
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }

  .qhjg {
    /* position: absolute; */
    /* right: 24rpx;
		top: 28rpx; */
    width: 184rpx;
    height: 64rpx;
    background: #00D7D0;
    border-radius: 12rpx;
    color: white;
    font-size: 26rpx;
    text-align: center;
    line-height: 64rpx;
  }

  .img5 {
    float: left;
    width: 34rpx;
    height: 34rpx;
    margin-left: 38rpx;
  }

  .img6 {
    float: left;
    width: 46rpx;
    height: 46rpx;
    margin-left: 38rpx;
  }

  .img7 {
    float: left;
    width: 40rpx;
    height: 40rpx;
    margin-left: 38rpx;
  }

  .img9 {
    float: left;
    width: 38rpx;
    height: 38rpx;
    margin-left: 36rpx;
    margin-top: 36rpx;
  }

  .img10 {
    float: left;
    width: 40rpx;
    height: 40rpx;
    margin-left: 36rpx;
    margin-top: 36rpx;
  }

  .img11 {
    float: left;
    width: 40rpx;
    height: 40rpx;
    margin-left: 36rpx;
    margin-top: 36rpx;
  }


  .ctbot {
    width: 692rpx;
    height: 116rpx;
    position: absolute;
    bottom: 30rpx;
    left: 0;
    top: 110rpx;
    display: flex;
    line-height: 44rpx;
    font-size: 24rpx;
    color: #000;
    text-align: center;
    border-top: 1px solid #E8E8E8;
    padding: 20rpx 0rpx 0rpx 0rpx;

  }

  .ctbot .div1 {
    /* flex: 1; */
    width: 174rpx;
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  .ctbot .div1 image {
    width: 48rpx;
    height: 48rpx;
    margin-left: 63rpx;
  }

  .div1 text {
    /* float: left; */
    /* margin-left:14rpx ; */
    margin-top: 16rpx;
    height: 32rpx;
    line-height: 32rpx;
    color: rgba(158, 159, 161, 100);
    font-size: 24rpx;
    font-family: PingFangSC-regular;
    padding-bottom: 20rpx;
  }

  .cardBackground {
    width: 100%;
    height: 350rpx;
    border-radius: 0 0 50px 50px;
  }

  .background {
    width: 696rpx;
    height: 154rpx;
    border-radius: 30rpx;
    margin-left: 28rpx;
    /* margin-top: 22rpx; */
    overflow: hidden;
  }

  .background image {
    width: 100%;
    height: 100%;
    border-radius: 30rpx;
  }

  .content_center {
    position: relative;
    height: 320rpx;
    margin-top: 22rpx;
    /* margin-bottom: 0rpx; */
  }

  .position {
    position: absolute;
    top: 68rpx;
    height: 230rpx;
  }

  .function {
    width: 696rpx;
    height: 312rpx;
    line-height: 40rpx;
    background-color: rgba(255, 255, 255, 100);
    border: 2rpx solid rgba(255, 255, 255, 100);
    margin-top: 20rpx;
    padding: 50rpx 27rpx;
  }

  .function .functiontext {
    width: 128rpx;
    height: 44rpx;
    color: rgba(55, 56, 58, 100);
    font-size: 32rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-left: 40rpx;
  }

  .functionlist {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
  }

  .list_every {
    width: 174rpx;
    height: 87rpx;
    padding-top: 38rpx;
  }

  .list_every:nth-child(4n) {
    margin-right: 0rpx;
  }

  .list_every image {
    width: 48rpx;
    height: 48rpx;
    display: block;
    margin-left: 63rpx;
  }

  .list_every text {
    margin-top: 16rpx;
    height: 32rpx;
    color: rgba(158, 159, 161, 100);
    font-size: 24rpx;
    text-align: center;
    font-family: PingFangSC-regular;
  }

  .forwardInfo {
    width: 650rpx;
    height: 206rpx;
    font-family: Arial;
    background-color: #FFFFFF;
    margin-bottom: 38rpx;
    margin-top: 40rpx;
    padding: 38rpx 50rpx 28rpx 50rpx;
  }

  .forward_title {
    height: 42rpx;
    color: rgba(0, 0, 0, 1);
    font-size: 32px;
    text-align: left;
    line-height: 42rpx;
    font-family: PingFangSC-regular;
  }

  .forwardInfolist {
    width: 650rpx;
    height: 136rpx;
    margin-top: 30rpx;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
  }

  .forwardInfolist_every {
    width: 100rpx;
    height: 136rpx;
    /* display: flex;
     flex-direction: column;
     text-align: center; */
  }

  .forwardInfolist_every_img {
    width: 90rpx;
    height: 90rpx;
    border-radius: 50%;
    box-shadow: 0px 4rpx 12rpx 0px rgba(167, 225, 221, 100);
    margin-left: 5rpx;
  }

  .forwardInfolist_every_img image {
    width: 48rpx;
    height: 48rpx;
    margin-top: 21rpx;
    margin-left: 21rpx;
  }

  .forwardInfolist_every_text {
    width: 100%;
    text-align: center;
    height: 36rpx;
    color: rgba(96, 96, 96, 96);
    font-size: 24rpx;
    font-family: PingFangSC-regular;
    margin-top: 12rpx;
  }

  .shadow {
    width: 750rpx;
    height: 2500px;
    background-color: rgba(0, 0, 0, 0.41);
    position: absolute;
    top: 0;
    left: 0;
  }

  .submitphone {
    width: 572rpx;
    height: 354rpx;
    border-radius: 12rpx;
    position: absolute;
    background-color: #FFFFFF;
    padding: 60rpx 60rpx 38rpx 60rpx;
    position: absolute;
    top: 1250rpx;
    left: 29rpx;
  }

  .submitphone_text {
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: PingFangSC-regular;
  }

  .submitphone input {
    background-color: rgba(243, 243, 243, 100);
    color: rgba(136, 136, 136, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: Microsoft Yahei;
    border-radius: 12rpx;
    width: 560rpx;
    height: 60rpx;
    padding-left: 12rpx;
    margin-top: 26rpx;
    margin-bottom: 32rpx;
  }

  .submitphone_btn {
    width: 184rpx;
    height: 52rpx;
    line-height: 52rpx;
    border-radius: 12rpx;
    background-color: rgba(0, 215, 208, 100);
    color: #FFFFFF;
    font-size: 28rpx;
    text-align: center;
    font-family: Arial;
    margin-top: 60rpx;
    margin-left: 194rpx;
  }
</style>
