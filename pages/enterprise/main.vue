<template>
  <div
   class=" h100p enterprise_background "
   :class="isinvite ? 'bgfff' : '' "
   :style="'background-position: 0 ' + navHeight + 'px'">
    <div class="bgblue textc posre"
         :style="{height: navHeight+'px'}">
    </div>
    <!--邀请-->
    <!-- <div class="fs18 textc bgfff pt25 pb11" v-if="isinvite">
      Hi！<span class="cblue">{{ inviteName }} </span>邀请你加入以下机构
    </div> -->

    <!--top-->
    <!-- :style="{ height: menu_id == 1 ? '0' : '' }" -->
    <div
      class="enterprise_top overhidden trans2"

    >
      <div class="pl15 pr15">
        <div class="pt15  pb11  fs12 ca8 bradius10">
          <!-- <div class="disflex jsbet pr15 pl15">
            <image
              :src="companyTop.companyLogo"
              mode="aspectFill"
              class="w50 h50 bradius5 mr11"
            >
            </image>
            <div class="flex1">
              <p class="c38 fs18 fbold">
                {{ companyTop.companyName || "暂无机构" }}
              </p>
              <p class="fs14 pt7">{{ companyTop.industryName }}</p>
            </div>
          </div> -->
          <div class="disflex jsbet pr15 pl15">

            <div class="top_company_title">
              <p class="cfff fs18 fbold mb20" @click="showNotice">
                {{ companyTop.companyName || "暂无机构" }}
              </p>
              <image
                :src="companyTop.companyLogo"
                mode="aspectFill"
                class="w60 h60 bradius5"
                @click="showNotice"
              >
              </image>
              <p class="fs12 cfff pt10 mb20">{{ companyTop.industryName }}</p>
            </div>
          </div>

          <div class="disflex jsbet lh45 align-cen pt7">
            <div class="disflex top_subtitle align-cen" @click="showNotice">
              <img
                src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/notice.png"
                alt=""
                class="w16 h16 mr8"
              />
              <!--<span>名医云，以壹为始，立壹之上</span>-->
              <!-- :style="{ width: isBoss ? '256px' : '580upx' }" -->
              <div
                class="marquee_container"
                :style="'--marqueeWidth--:' + '-' + companyTop.companyNotice.length + 'em'"

              >
                <div class="marquee_text">
                  {{ companyTop.companyNotice || "" }}
                </div>
              </div>
               <div class="ca8 fs14 ml6">
                  >
               </div>
            </div>

            <!-- <span
              @click="page_tap('editEnterprise', '?type=edit')"
              v-if="isBoss"
              style="display: flex"
            >
              <img
                src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/edit.png"
                class="w20 h20"
                alt=""
              />
            </span> -->
          </div>

          <!-- <div class="disflex jsbet pl30 pr30 fs10 ca8 pt10 textc">
            <div @click="page_tap('companyPack/appointmentManage')">
              <img
                src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-www/img/icon-appointment.png"
                alt=""
                class="w24 h24"
              />
              <p>预约</p>
            </div>
            <div @click="page_tap('companyPack/productControl')">
              <img
                src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/prod_gray.png"
                alt=""
                class="w24 h24"
              />
              <p>商城</p>
            </div>
            <div @click="page_tap('companyPack/dyamicManage')">
              <img
                src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/browser_gray.png"
                alt=""
                class="w24 h24"
              />
              <p>动态</p>
            </div>
            <div @click="page_tap('webSiteControl')">
              <img
                src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/computer_gray.png"
                alt=""
                class="w24 h24"
              />
              <p>官网</p>
            </div>
          </div> -->
        </div>
      </div>

      <div
        class="disflex jsaround fs12  ca8 textc"
        v-if="!isinvite"
      >
        <!-- <div @click="page_tap('companyPack/member')">
          <img
            src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/members.png"
            alt=""
            class="w30 h30"
          />
          <p class="pt7">机构成员</p>
        </div>
        <div @click="page_tap('orderLists')">
          <img
            src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/order_yellow.png"
            alt=""
            class="w30 h30"
          />
          <p class="pt7">订单管理</p>
        </div>
        <div @click="page_tap('companyPack/financialStatistics')">
          <img
            src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/money.png"
            alt=""
            class="w30 h30"
          />
          <p class="pt7">财务统计</p>
        </div> -->
      </div>
    </div>

    <div v-if="hasenterprise" class="mt10 posre">
      <!--menu-->
      <!--top-->
      <div
        class="jsaround w100p fs14 c38 lh44 bradiustr10 bgfff enterprise_menu posticky"
        :class="menu_id == 1 ? 'top zindex9' : ''"
      >

      <div class="enterprise_center_icon">
        <span></span>
      </div>
      <div class="enterprise_tabbar">
            <div v-for="(item,index) in tabbar"
                 :key='index'
                 @click="page_tap(item.url)"
                 class="enterprise_tabbar_list">
              <img :src="item.icon">
              <p>{{item.title}}</p>
            </div>
        </div>
      </div>

      <div
        class=" disflex jsaround w100p fs14 c38 lh44 bradiustr10 bgfff enterprise_menu"
        :class="menu_id == 1 ? 'top zindex9' : ''"
      >

        <span
          :class="menu_id == 0 ? 'bbblue_2 cblue fbold' : ''"
          @click="menu_tap(0)"
          >个人数据</span
        >
        <span
          v-if="isBoss"
          :class="menu_id == 2 ? 'bbblue_2 cblue fbold' : ''"
          @click="menu_tap(2)"
          >机构数据</span
        >
      </div>
      <div v-show="menu_id == 0 || menu_id == 2">
        <PersonalOverview
          :isChange="isChange"
          ref="personalOverview"
          :menu_id="menu_id"
          :type="'enterprise'"
          @dataKanBan_tap="dataKanBan_tap"
        ></PersonalOverview>
      </div>

      <div v-show="menu_id == 2">
        <VisitRanking></VisitRanking>
      </div>

      <div v-show="menu_id == 1">
        <SalesRanking :menu_id="menu_id"></SalesRanking>
      </div>

      <!-- <div v-if="menu_id == 2">

       </div>-->

      <!--bottom-->
      <div class="textc lh42 fs12 ca8 bgf5f6">- 到底了，看看其他的吧 -</div>
    </div>

    <div v-if="!hasenterprise && !isinvite" class="pl43 pr43 pt25">
      <span
        class="disinblock bradius5 bg_line_blue textc cfff w290 fs18 lh44 mt55"
        @click="page_tap('companyPack/editEnterprise', '?type=add')"
      >
        您还没有机构，请先创建机构
      </span>
    </div>

    <!-- <div v-if="isinvite && !hasenterprise" class="pl43 pr43 pt25">
      <span
        class="disinblock bradius5 bg_line_blue textc cfff w290 fs18 lh44 mb15"
        >立即加入该机构</span
      >
      <span class="disinblock bradius5 bblue textc cblue w290 fs18 lh44"
        >我的机构</span
      >
    </div> -->

    <div v-if="isShowNotice" @click="isShowNotice = false">
      <Notice title="公告" :notice="companyTop.companyNotice"></Notice>
    </div>
    <div style="position: fixed;bottom: 0"></div>
  </div>
</template>

<script>
import PersonalOverview from "@/components/personalOverview"; // 个人总览
import VisitRanking from "@/components/visitRanking"; // 单位时间内创建的文章访问排行榜

import SalesRanking from "@/components/salesRanking"; // 销售排行
import Notice from "@/components/Notice";
import StaticResources from "@/components/StaticResources";
import WXAJAX from "../../utils/request";
import utils from "@/utils";
import {mapActions, mapGetters} from "vuex";
import {authSubscribeOrder,authSubscribeMessage} from '../../utils/auth.js'

export default {
  name: "",
  computed: {
    ...mapGetters(["subscriptionNew"])
  },
  components: { PersonalOverview,VisitRanking, SalesRanking, StaticResources, Notice },
  data() {
    return {
      resdata: [], //定义一个数组，用来动态传递图表数据
      menu_id: 0, //0--个人总览 ， 1-- 销售排行 ， 2-- AI分析
      hasenterprise: false, //是否有机构
      topHeight: "auto",
      isinvite: false, //是否为机构邀请
      inviteName: "XXX", //谁邀请的
      companyTop: {
        companyName: "",
        companyNotice: ""
      },
      isBoss: true, //是否为管理者
      isChange: false,
      isShowNotice: false,
      navHeight: 0,
      scrollContentHeight: 0,
      tabbar:[
        {
          title:'预约',
          icon:WXAJAX.imgBackUrl+'yimai_photos/crmRevision/enterprise_center_cion1.png',
          url:'companyPack/appointmentManage',
          dec:false
        },
        {
          title:'商城',
          icon:WXAJAX.imgBackUrl+'yimai_photos/crmRevision/enterprise_center_cion2.png',
          url:'companyPack/productControl',
          dec:false
        },
        {
          title:'媒体',
          icon:WXAJAX.imgBackUrl+'yimai_photos/crmAdd/2@2x.png',
          url:'buyVideo/index',
          dec:false
        },
        {
          title:'动态',
          icon:WXAJAX.imgBackUrl+'yimai_photos/crmRevision/enterprise_center_cion3.png',
          url:'companyPack/dyamicManage',
          dec:false
        },
        {
          title:'官网',
          icon:WXAJAX.imgBackUrl+'yimai_photos/crmRevision/enterprise_center_cion4.png',
          url:'webSiteControl/index',
          dec:false
        },
        {
          title:'组织架构',
          icon:WXAJAX.imgBackUrl+'yimai_photos/crmRevision/enterprise_center_cion5.png',
          url:'companyPack/member',
          dec:true
        },
        {
          title:'订单管理',
          icon:WXAJAX.imgBackUrl+'yimai_photos/crmRevision/enterprise_center_cion6.png',
          url:'my/orderLists',
          dec:true
        },
        {
          title:'机构服务',
          icon:WXAJAX.imgBackUrl+'yimai_photos/crmAdd/6@2x.png',
          url:'enterpriSeservices/seservices',
          dec:false
        },
        {
          title:'财务统计',
          icon:WXAJAX.imgBackUrl+'yimai_photos/crmRevision/enterprise_center_cion7.png',
          url:'companyPack/financialStatistics',
          dec:true
        },
        {
          title:'数据看板',
          icon:WXAJAX.imgBackUrl+'yimai_photos/crmRevision/enterprise_center_cion8.png',
          url:'companyPack/dataKanBan',
          dec:true
        },
      ]
    };
  },
  /*   onShareAppMessage(e){
           return {
               // title : '转发',
               path :'/pages/companyInvite/main',
               success(e){
                   console.log(e);
                   wx.showShareMenu({
                       withShareTicket : true
                   })
               },
               fail(e){
                   console.log('失败-- ',e);
               }
           }
       },*/
   /** tab点击 */
   onTabItemTap(item) {
    //订阅授权 信息相关
    authSubscribeOrder(this.subscriptionNew);
   },
  onLoad(){
    this.calculateNavBarHeight()
  },
  onShow() {

    this.isBoss = wx.getStorageSync("isBoss") || false;

    if (this.isinvite) {
      //邀请详情
      // wx.hideTabBar({});
      this.getInvites();
    } else {
      this.getCompanyMsg();
    }
  },
  async onPullDownRefresh() {
    // to doing..
    // 下拉刷新
    wx.showNavigationBarLoading();
    if (this.isinvite) {
      //邀请详情
      // wx.hideTabBar({});
      this.getInvites();
    } else {
      this.getCompanyMsg();
      this.isChange = !this.isChange;
    }
    /*        this.nodata = false ;
              this.member_lists = [] ;
              this.page = 1 ;
              this.isLoading = false ;
              this.searchkey = '' ;
              this.focusTag = false ;*/
    wx.stopPullDownRefresh();
    setTimeout(function() {
      wx.hideNavigationBarLoading();
    }, 300);
  },
  mounted() {
    wx.setNavigationBarTitle({
      title: "机构"
    });
    let v = this;
    v.isBoss = wx.getStorageSync("isBoss") || false;
    v.$nextTick(function() {
      v.getTopHeight();
    });
  },
  methods: {
    ...mapActions(["setCurrentCompany"]),
    authSubscribeOrder(){
      authSubscribeOrder(this.subscriptionNew);
    },
    calculateNavBarHeight () {
      let menuButtonBounding = getApp().globalData.menuButtonBounding;
      wx.getSystemInfo({
        success: res => {
          let statusBarHeight = res.statusBarHeight; //胶囊按钮与顶部的距离
          let navHeight = statusBarHeight + (menuButtonBounding.top - statusBarHeight) * 2 + menuButtonBounding.height; //导航高度

          getApp().globalData.navHeight = navHeight;
          this.navHeight = navHeight;

          // this.mainHeight = res.windowHeight;
          this.scrollContentHeight = res.windowHeight - navHeight - 38;
        },
        fail (err) {
          console.log(err);
        }
      });
    },
    getCompanyMsg() {
      //获取机构信息
      wx.showLoading();
      let v = this;

      WXAJAX.POST({ ignore: true }, "", "/company/getCompany")
        .then((data, code) => {
          wx.hideLoading();
          if (data) {
            v.companyTop = data;
            v.hasenterprise = true;
            wx.setStorageSync("COMPANYID", data.companyId);
            wx.setStorageSync("USERNAME", data.name);
            this.setCurrentCompany(data);
          } else if (code == 209) {
          } else {
            this.companyTop = {};
            v.hasenterprise = false;
          }
        })
        .catch(err => {
          v.companyTop = {};
          console.log(err);
          wx.hideLoading();
          wx.showToast({
            title: err.message,
            duration: 2000,
            icon: "none"
          });
          v.hasenterprise = false;
        });
    },
    getInvites() {
      wx.showLoading();
      let v = this;
      WXAJAX.POST(
        {
          companyId: 1
        },
        "",
        "/company/invitation"
      )
        .then(data => {
          wx.hideLoading();
          if (data) {
            this.companyTop = data;
          }
        })
        .catch(err => {
          console.log(err);
          wx.hideLoading();
        });
    },
    page_tap: utils.throttle(function(url, query) {

      // if(url=='buyVideo/index'&&!wx.getStorageSync("isBoss")){
      //   wx.showToast({
      //     title: "只有管理者才能编辑",
      //     duration: 2000,
      //     icon: "none"
      //   });
      //   return;
      // }
      authSubscribeOrder(this.subscriptionNew);
      if (
        [
          "companyPack/productControl",
          "companyPack/dynamicControl",
          "webSiteControl",
          "companyPack/appointmentManage"
        ].includes(url) &&
        !wx.getStorageSync("isBoss")
      ) {
        wx.showToast({
          title: "只有管理者才能编辑",
          duration: 2000,
          icon: "none"
        });
        return;
      }

      if (url != "companyPack/editEnterprise" && !this.hasenterprise) {
        return;
      }
      query = query || "";
      wx.navigateTo({ url: "../" + url + "/main" + query });
    }),
    menu_tap(id) {
      //点击menu
      console.log(id);
      this.menu_id = id;
    },
    getTopHeight() {
      //获取top的高度
      let v = this;
      wx.createSelectorQuery()
        .select(".enterprise_top")
        .boundingClientRect(function(rect) {
          v.topHeight = rect.height + "px";
        })
        .exec();
    },
    showNotice(){
      if(this.isBoss === false){
        this.isShowNotice = true
      }else{
        this.page_tap('companyPack/editEnterprise', '?type=edit')
      }
    },
    dataKanBan_tap(){
      wx.navigateTo({
        url:'../companyPack/dataKanBan/main'
      })
    }

  }
};
</script>

<style>
.enterprise_menu {
  transition: 0.2s;
}

.enterprise_menu.top {
  position: fixed;
  top: 0;
}
.enterprise_background{
  background-image:url('https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/enterprise_top.png');
  background-size:100% 500upx;
  background-repeat: no-repeat;
}
.enterprise_top.hide {
  height: 0;
}
.top_subtitle{
  background: #ffffff;
  height: 80upx;
  border-radius:40px;
  padding:0 44upx;
}
.top_company_title{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
@keyframes around {
  from {
    margin-left: 100%;
  }
  to {
    /* var接受传入的变量 */
    margin-left: var(--marqueeWidth--);
  }
}

.marquee_container {
  /*background-color: #fe4655;*/
  height: 50upx;
  line-height: 50upx;
  position: relative;
  width: 520upx;
  margin-top: 0;
  overflow: hidden;
}
.marquee_container:hover {
  /* 不起作用 */
  animation-play-state: paused;
}
.marquee_text {
  color: #a8a8a8;
  font-size: 24upx;
  display: inline-block;
  white-space: nowrap;
  animation-name: around;
  animation-duration: 10s; /*过渡时间*/
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.enterprise_tabbar{
  padding:0upx 30upx 0 30upx;
  height: 370upx;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.enterprise_tabbar_list{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
}
.enterprise_tabbar_list img{
  width: 100upx;
  height: 100upx;
}
.enterprise_center_icon{
  width: 100%;
  height: 40upx;
  box-sizing: border-box;
  padding-top: 32upx;
}
.enterprise_center_icon span{
  display: block;
  width:100upx;
  height:8upx;
  background:rgba(245,245,246,1);
  border-radius:4upx;
  margin:0 auto;
}
.enterprise_tabbar_list p{
  line-height: 1;
}
</style>
