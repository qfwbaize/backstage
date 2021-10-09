<template>
  <div
   class=" h100p datakanban_background posre"
   :class="isinvite ? 'bgfff' : '' "
   :style="'background-position: 0 ' + navHeight + 'px'">
    <!-- <div class="bgblue textc posre kanban_statusbar"
         :style="'height:' + navHeight+'px;padding-top:'+statusBarHeight+'px'">
      <div class='datakanban_back' @click="toBack"></div>
      <div class="cfff fs18">数据看板</div>
      <p></p>
    </div> -->
     <statusbarTitle
     :navHeight="navHeight"
     :statusBarHeight="statusBarHeight"
     title="数据看板"
     @toBack="toBack">

    </statusbarTitle>

    <div class="overhidden trans2">
      <div class="datakanban_top">
        <p class="fs30 mb10 cfff fbold">{{username}}</p>
        <p class="fs14 cfff">今天的你也要努力哦</p>
      </div>
    </div>

    <div v-if="hasenterprise" class="mt10">
      <div
        class="jsaround w100p fs14 c38 lh44 bradiustr10 bgfff enterprise_menu"
      >
        <div class="datakanban_center_icon">
          <span></span>
        </div>
        <div class="disflex borderbox pr20 pl20 pt30 pb30">
          <div class="disflex mr23" @click="toDetall('customer')">
            <div>
              <div class="fs12 lh1 ca8 mb20 mr60">客户数量</div>
              <div class="fs20 lh1 fbold c38">客户统计</div>
            </div>
            <img
               class="w40 h40"
               :src="statisticsicon">
          </div>
          <div class="disflex" @click="toDetall('sale')">
            <div>
              <div class="fs12 lh1 ca8 mb20 mr60">谁是销冠</div>
              <div class="fs20 lh1 fbold c38">销售排行</div>
            </div>
            <img
               class="w40 h40"
               :src="rankingIcon">
          </div>
        </div>
      </div>
      <div v-show="menu_id == 0 || menu_id == 2">
       <!-- <kanBanData
          :isChange="isChange"
          ref="personalOverview"
          :menu_id="menu_id"
          :type="'datakanban'"
        ></kanBanData> -->
      </div>
      <!-- <div v-if="menu_id == 2">

       </div>-->

      <!--bottom-->
      <div class="textc lh42 fs12 ca8 bgfff">- 到底了，看看其他的吧 -</div>
    </div>
  </div>
</template>

<script>
// import kanBanData from "@/components/kanBanData"; // 个人总览
import SalesRanking from "@/components/salesRanking"; // 销售排行
import Notice from "@/components/Notice";
import StaticResources from "@/components/StaticResources";
import statusbarTitle from "@/components/statusbarTitle"
import WXAJAX from "../../../utils/request";
import utils from "@/utils";
import {mapActions, mapGetters} from "vuex";
import {authSubscribeOrder,authSubscribeMessage} from '../../../utils/auth.js'

export default {
  name: "",
  computed: {
    ...mapGetters(["subscriptionNew"])
  },
  // components: { kanBanData, SalesRanking, StaticResources, Notice , statusbarTitle},
  components: { SalesRanking, StaticResources, Notice , statusbarTitle},
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
      statusBarHeight:0,
      username:wx.getStorageSync('userName'),
      statisticsicon:WXAJAX.imgBackUrl + 'yimai_photos/crmRevision/statistics_icon.png',
      rankingIcon:WXAJAX.imgBackUrl +'yimai_photos/crmRevision/ranking_icon.png',
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
          title:'动态',
          icon:WXAJAX.imgBackUrl+'yimai_photos/crmRevision/enterprise_center_cion3.png',
          url:'companyPack/dyamicManage',
          dec:false
        },
        {
          title:'官网',
          icon:WXAJAX.imgBackUrl+'yimai_photos/crmRevision/enterprise_center_cion4.png',
          url:'webSiteControl',
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
          title:'财务统计',
          icon:WXAJAX.imgBackUrl+'yimai_photos/crmRevision/enterprise_center_cion7.png',
          url:'companyPack/financialStatistics',
          dec:true
        },
        {
          title:'数据看板',
          icon:WXAJAX.imgBackUrl+'yimai_photos/crmRevision/enterprise_center_cion8.png',
          url:'',
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
          this.statusBarHeight = statusBarHeight
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

      if (url != "editEnterprise" && !this.hasenterprise) {
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
        .select(".datakanban_top")
        .boundingClientRect(function(rect) {
          v.topHeight = rect.height + "px";
        })
        .exec();
    },
    //返回
    toBack(){
      wx.navigateBack({
          delta: 1
      })
    },
    toDetall(type){
      switch(type){
        case 'customer':
        wx.navigateTo({
          url:"../clientList/customerStatistics/main"
        })
        break;
        case 'sale':
          wx.navigateTo({
          url:"../salesRanking/main"
        })
        break;
      }
    }
  }
};
</script>

<style>
.datakanban_menu {
  transition: 0.2s;
}

.datakanban_menu.top {
  position: fixed;
  top: 0;

}
.kanban_statusbar{
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 60upx;
}
.datakanban_back{
  height: 25upx;
  width: 25upx;
  border-width: 0 0 3px 3px;
  border-color: #fff;
  border-style: solid;
  transform: matrix(0.71, 0.71, -.71, 0.71, 0, 0);
}
.datakanban_background{
  background-image:url('https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/enterprise_top.png');
  background-size:100% 500upx;
  background-repeat: no-repeat;
}
.datakanban_top{
  box-sizing: border-box;
  padding:0 40upx;
  height: 400upx;
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
  width: 460upx;
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
.datakanban_tabbar{
  padding:0upx 30upx 0 30upx;
  height: 370upx;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.datakanban_tabbar_list{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22%;
}
.datakanban_tabbar_list img{
  width: 100upx;
  height: 100upx;
}
.datakanban_center_icon{
  width: 100%;
  height: 40upx;
  box-sizing: border-box;
  padding-top: 32upx;
}
.datakanban_center_icon span{
  display: block;
  width:100upx;
  height:8upx;
  background:rgba(245,245,246,1);
  border-radius:4upx;
  margin:0 auto;
}
.datakanban_tabbar_list p{
  line-height: 1;
}
</style>
