<template>
  <!-- <div class="borderbox bgfff posre" :style="{paddingTop:navHeight}">
		<div class="borderbox fix_top bgblue" style="background-color: #FFFFFF;"
			:style="{height:navHeight,paddingTop:navTop}">
			<div class="disflex align-cen h100p jscen" style="background-color: #FFFFFF;">
				<div class="fs13 c000">传 播</div>
			</div>
		</div> -->
  <div style="background-color: #FFFFFF;">
    <div class="navHead">
      <div :class="activeIndex == 0 ? 'selectactive':'active'" @click="activeIndex = 0">工作台</div>
      <div :class="activeIndex == 1 ? 'selectactive':'active'" @click="activeIndex = 1">任务</div>
    </div>
    <div v-show="activeIndex == 0">
      <div class="main">
        <div class="companyTitle">
          <div class="taskTitle">内容数据</div>
          <div class="addTask">
            <span class="fs13" style="color:#00BBAE;padding-top: 62rpx;" @click="toContentData">更多</span>
          </div>
        </div>
        <div class="earchts">
          <canvas style="width: 100%;height: 100%;" canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchend="touchEndLineA"></canvas>
        </div>

        <div class="companyTitle">
          <div class="taskTitle" style="">内容管理</div>
        </div>
        <div class=" fs12 c38 lh44 bgfff enterprise_menu " :style="{top:navHeight}">

          <scroll-view scroll-x="true" style="height: 220rpx;">
            <view class="enterprise_tabbar">
              <view class="enterprise_tabbar_list" v-for="(item,index) in tabbar" :key='index' @click="page_tap(item.url,item.params)">
                <view style="width: 100rpx;height: 100rpx;display: flex; justify-content: center; align-items: center;border-radius: 50rpx;margin-bottom: 20rpx;"
                  :style="'background-color:'+item.color+';box-shadow:'+item.color+' 0px 0px 10rpx;'">
                  <image :src="item.icon" mode=""></image>
                </view>
                <view class="wen">{{item.title}}</view>
              </view>

            </view>
          </scroll-view>
          <scroll-view scroll-x="true" style="height: 220rpx;">
            <view class="enterprise_tabbar">
              <view class="enterprise_tabbar_list" v-for="(item,index) in tabbar2" :key='index' @click="page_tap(item.url,item.params)">
                <view class="" style="width: 100rpx;height: 100rpx;display: flex; justify-content: center; align-items: center;border-radius: 50rpx;margin-bottom: 20rpx;"
                  :style="'background-color:'+item.color+';box-shadow:'+item.color+' 0px 0px 10rpx;'">
                  <image :src="item.icon" mode=""></image>
                </view>
                <view class="wen">{{item.title}}</view>
              </view>

            </view>
          </scroll-view>
          <!-- </div> -->
        </div>

        <div class="hotTitle jsbet">
          <div class="disflex">
            <div class="taskTitle">获客文章</div>
            <img style="margin-top: 30rpx;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/hot.png" class="w20 h20">
          </div>
          <!-- <div style="color: rgba(30, 196, 185, 1);">更多</div> -->

        </div>
        <!-- 分类标签-->
        <!-- <view class="w291  h70 ">
      		<div v-for="(info,index ) in datalist" :key="info.labelTitle">
      			<div :class="labelTitle == info.labelTitle ? 'act' : 'bgc'" @click="clicklabdel(info.labelTitle)">
      				{{info.labelTitle}}
      			</div>
      		</div>
      	</view> -->

        <view class="screen">
          <scroll-view scroll-x="true" style=" width:670rpx ; white-space: nowrap;height: 88rpx;margin-left: 30rpx;">
            <view class="jxscreenList" style="width: 100%;">
              <view v-for="(item,index) in datalist" :key="index" :class="labelTitle == item.labelTitle ? 'act' : 'bgc'"
                @click="clicklabdel(item.labelTitle)">
                {{item.labelTitle}}
              </view>
            </view>
          </scroll-view>
        </view>

        <div>
          <div class="mt20 disflex jsbet posre bgfff h100 " style="box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.19);border-radius: 12rpx;"
            v-for="(item,index) in articleList2" :key='index' @click="toDetail(item.dynamicId)">
            <div class="articleTitle fs14">
              <span style="font-size: 30rpx;font-weight: bold;">{{item.title}}</span>
              <div class="platform">{{item.companyName || ''}}</div>
              <div class="disflex mt8 ">
                <div class="skip-btn share cfff bgblue" @click.stop="getinstitution(item.dynamicId)">存入机构文库
                </div>
                <!-- <div class="skip-btn share cfff bgblue">立即转发</div> -->
              </div>
            </div>
            <div>
              <img :src="item.photos" alt="" class="articleImg" />
            </div>
          </div>
          <div v-if="isnotyet" style="width: 100%;height: 250rpx;display: flex;flex-direction: column;align-items: center;">
            <image style="width: 200rpx;height: 200rpx;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png"
              mode=""></image>
            <div style="font-size: 30rpx;text-align: center;">暂无数据</div>
          </div>
        </div>
        <!-- <div class="hotTitle jsbet">
      		<div class="disflex">
      			<img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/hot.png" alt=""
      				class="w20 h20">
      			<div class="taskTitle">热点新闻</div>
      		</div>
      		<div style="color: rgba(30, 196, 185, 1);">更多</div>
      	</div> -->
        <!-- <div>
      		<div class="mt10 disflex jsbet posre" v-for="(item,index) in articleList3" :key='index'
      			@click="toDetail(item.dynamicId)">
      			<div>
      				<img :src="item.photos" alt="" class="articleImg" />
      			</div>
      			<div class="articleTitle fs14">
      				<span>{{item.title}}</span> -->
        <!-- <div class="disflex mt8 posab bottom10  right0">
                <div class="skip-btn share cfff bgblue">存入机构文库</div>
                <div class="skip-btn share cfff bgblue">立即转发</div>
              </div> -->
        <!-- 	</div>
      		</div>
      	</div> -->
        <div class="hotTitle jsbet">
          <div class="disflex">
            <div class="taskTitle">引流视频</div>
            <img style="margin-top: 30rpx;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/hot.png" class="w20 h20">
          </div>
          <!-- <div style="color: rgba(30, 196, 185, 1);">更多</div> -->
        </div>
        <!-- 分类标签-->
        <!-- 	<view class="w291  h70 ">
      		<div v-for="(info,index ) in videolabel" :key="info.labelTitle">
      			<div :class="videotitle == info.labelTitle ? 'act' : 'bgc'" @click="clicklist(info.labelTitle)">
      				{{info.labelTitle}}
      			</div>
      		</div>
      	</view> -->
        <view class="screen">
          <scroll-view scroll-x="true" style=" width:670rpx ; white-space: nowrap;height: 88rpx;margin-left: 30rpx;">
            <view class="jxscreenList" style="width: 100%;">
              <view v-for="(info,index ) in videolabel" :key="info.labelTitle" :class="videotitle == info.labelTitle ? 'act' : 'bgc'"
                @click="clicklist(info.labelTitle)">
                {{info.labelTitle}}
              </view>
            </view>
          </scroll-view>
        </view>
        <div style="margin-top: 50rpx;">
          <div class="video bgfff mb10" v-for="(item,index) in videoList" @click="toviedoinfo(item)" :key='index'>
            <div class="fbold" style="margin-left: 30rpx;font-size: 28rpx;">{{item.title}}</div>
            <div class="pt10 pr15 pl15">
              <video @play="playVideo" :id="'myVideo' + index" class="w100p bradius5" :src="item.url"></video>
            </div>
            <div class="disflex jsbet pl15 pr15 align-cen h49 fs16 c38 bbe8">
              <p style="font-size: 26rpx;">{{item.headVideoAuthor || ''}}</p>
              <div class="disflex">
                <div class="skip-btn share cfff bgblue " @click.stop="getinstitution(item.dynamicId)">存入机构文库
                </div>
              </div>
              <!-- <div class="skip-btn share cfff bgblue">立即转发</div> -->
            </div>

          </div>
          <div v-if="ishownotyet" style="width: 100%;height: 400rpx;display: flex;flex-direction: column;align-items: center;">
            <image style="width: 200rpx;height: 200rpx;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png"
              mode=""></image>
            <div style="font-size: 30rpx;text-align: center;">暂无数据</div>
          </div>
        </div>

        <div>
        </div>
      </div>
    </div>
    <div v-show="activeIndex == 1">


      <div class="main" style="background-color: #f7f7f7;padding-bottom: 60rpx;">
       <!-- <view class="work">
          <view class="workNav">
            <view class="workevery" @click="toNewmission">
              <view class="workImg"><image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/messionplane .png" mode=""></image></view>
              <view class="workText">发布任务</view>
            </view>
            <view class="workevery" @click="tocontractAdmin">
              <view class="workImg"><image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/messionserver.png" mode=""></image></view>
              <view class="workText">合同管理</view>
            </view>
            <view class="workevery" @click="toNewsMission">
              <view class="workImg"><image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/messionmsg.png" mode=""></image></view>
              <view class="workText">任务通知</view>
            </view>
          </view>
        </view> -->
        <div style="margin-bottom: 60rpx;" v-show="boss == true">
          <div class="companyTitle" style="padding-top: 30rpx;">
            <div class="taskTitle" style="font-size: 32rpx;padding: 0; ">机构任务</div>
            <div class="addTask">
              <span class="fs13" style="color:#00BBAE;" @click="inside">查看</span>
            </div>
          </div>

          <div class="taskContent">
            <div class="taskevery" v-for="(insideitem,insideindex) in AcceptCompanyTaskList" :key="insideindex">
              <div class="disflex">
                <span style="font-size:28rpx;font-weight: bold;margin-top: 12rpx;">{{insideitem.title}}</span>
                <view class="taskStatus" v-show="insideitem.status == 0">待签约</view>
                <view class="taskStatus" v-show="insideitem.status == 1">进行中</view>
                <view class="taskStatus" v-show="insideitem.status == 2">验收中</view>
                <view class="taskStatus" v-show="insideitem.status == 3">已验收</view>
                <view class="taskStatus" v-show="insideitem.status == 4">已完成</view>
              </div>
              <div style="color:#a1a2a1;font-size: 24rpx;margin-top: 12rpx;">
                {{insideitem.start_time}} {{insideitem.name}}
              </div>
            </div>
            <div class="taskevery" v-if="AcceptCompanyTaskList.length == 0">
              <image style="width: 160rpx;height: 160rpx;margin-left: 225rpx;margin-top:82rpx;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png"
                mode=""></image>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 60rpx;">
          <div class="companyTitle">
            <div class="taskTitle" style="font-size: 32rpx;padding: 0; ">我的任务</div>
            <div class="addTask">
              <span class="fs13" style="color:#00BBAE;" @click="external">查看</span>
            </div>
          </div>

          <div class="taskContent">
            <div class="taskevery" v-for="(externalitem,externalindex) in AcceptCompanyTask" :key="externalindex">
              <div class="disflex">
                <span style="font-size:28rpx;font-weight: bold;margin-top: 12rpx;">{{externalitem.title}}</span>
                <view class="taskStatus" v-show="externalitem.status == 0">待签约</view>
                <view class="taskStatus" v-show="externalitem.status == 1">进行中</view>
                <view class="taskStatus" v-show="externalitem.status == 2">验收中</view>
                <view class="taskStatus" v-show="externalitem.status == 3">已验收</view>
                <view class="taskStatus" v-show="externalitem.status == 4">已完成</view>
              </div>
              <div style="color:#a1a2a1;font-size: 24rpx;margin-top: 12rpx;">
                {{externalitem.start_time}} {{externalitem.name}}
              </div>
            </div>
            <div class="taskevery" v-if="AcceptCompanyTask.length == 0">
              <image style="width: 160rpx;height: 160rpx;margin-left: 225rpx;margin-top:82rpx;" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png"
                mode=""></image>
            </div>
          </div>
        </div>


      </div>
    </div>

    <!-- <div else></div> -->
    <Tabbar :unreadMsg='unreadMsg' tabIndex=1></Tabbar>
    <view class="" style="width: 100%;height: 135rpx;background-color: #f7f7f7;"></view>

  </div>
</template>

<script>
  import http from "../../utils/http"
  import uCharts from '@/js_sdk/u-charts/u-charts.js';
  import {
    isJSON
  } from '@/common/checker.js';
  var _self;
  var canvaLineA = null;
  var lastMoveTime = null; //最后执行移动的时间戳

  import websocket from '@/utils/websocket'
  import Tabbar from "@/components/Tabbar";
  import TaskManage from '@/components/taskManage' // 任务列表
  import WXAJAX from "../../utils/request";
  import utils from "@/utils";
  import tabSpread from "@/components/tabSpread";
  import {
    mapActions,
    mapGetters
  } from "vuex";
  import {
    authSubscribeOrder,
    authSubscribeMessage,
    authArticleMessage,
    authArticleMessage2
  } from '../../utils/auth.js'
  export default {
    name: "",
    computed: {
      ...mapGetters(["subscriptionNew"])
    },
    components: {
      tabSpread,
      TaskManage,
      Tabbar
    },
    data() {
      return {
        pageNum: 1,
        biddingList: [],
        externalbiddingList: [],
        platformbiddingList: [],
        activeIndex: 0,
        unreadMsg: uni.getStorageSync('unreadMsg'),
        // isCompanyAuth:'',
        videolabel: [],
        videotitle: '好视频',
        labelTitle: '猜你喜欢',
        navHeight: 0,
        navTop: '',
        tabType: 1,
        editTab: true,
        tabs: [],
        isnotyet: false, //暂无数据
        ishownotyet: false, //暂无数据
        taskNum: 0,
        myTaskList: [],
        taskPageNum: 1,
        tabList: [{
            name: "机构",
            sty: "#7A7C85"
          },
          {
            name: "个人",
            sty: "#7A7C85"
          }
        ],
        tabbar: [{
            title: '动态',
            icon: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/dynamic.png',
            url: 'companyPack/tendencies',
            params: '?type=1',
            color: '#4ED7CE',
            dec: false
          },
          {
            title: '文章',
            icon: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/article.png',
            url: 'companyPack/dyamicManage',
            params: '?type=2',
            color: '#01C4A1',
            dec: false
          },
          {
            title: '视频',
            icon: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/video.png',
            url: 'buyVideo/index',
            params: '',
            color: '#3EADFF',
            dec: false
          },
          {
            title: '机构官网',
            icon: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/website.png',
            params: '',
            url: 'webSiteControl/index',
            color: '#00DCCD',
            dec: true
          },
          // {
          //   title: '拜访打卡',
          //   icon: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/visit.png',
          //   url: 'companyPack/visitlist',
          //   params: '',
          //   color: '#00C9FF',
          //   dec: false
          // },
        ],
        tabbar2: [{
            title: '常用语',
            icon: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/im.png',
            params: '',
            url: 'companyPack/commonWords',
            color: '#FFC79A',
            dec: false
          },
          {
            title: '素材库',
            icon: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/library.png',
            params: '',
            url: 'companyPack/library',
            color: '#72E46A',
            dec: true
          },
          {
            title: '产品',
            icon: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/product.png',
            // companyPack/institutional
            url: 'companyPack/productControl',
            params: '?type=3',
            color: '#809DF3',
            dec: true
          },
          {
            title: '服务',
            icon: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/riFill-service-fill@3x.png',
            url: 'companyPack/appointmentManage',
            params: '?type=3',
            color: '#EAB2F7',
            dec: true
          },
        ],
        boss: '',
        isShow: '',
        video: [],
        TabCur: 0,
        articleList: ['', ''],
        articleList2: [],
        articleList3: [],
        videoList: [],
        datalist: [{
          name: "热点",
          id: 0
        }, {
          name: "企服",
          id: 0
        }, {
          name: "娱乐",
          id: 0
        }, {
          name: "房产",
          id: 0
        }, ],


        cWidth: '',
        cHeight: '',
        pixelRatio: 1,
        textarea: '',
        Interactive: '', //交互显示的数据
        AcceptCompanyTaskList:[],//机构任务我接的
        AcceptCompanyTask:[],//我接任务

      };
    },
    /** tab点击 */
    onTabItemTap(item) {
      //订阅授权 信息相关
      authSubscribeOrder(this.subscriptionNew);
    },
    onLoad() {
      _self = this;
      this.cWidth = uni.upx2px(670);
      this.cHeight = uni.upx2px(368);
      this.getServerData();

      this.calculateNavBarHeight()
      wx.hideHomeButton();
      // this.getArticleList3();
      // this.getVideoList();
      //查询订阅消息
      this.getSubscription();
    },
    onShow() {
      websocket.sendSocketJSON('1090');
      this.gtevideolabel() //视频标签
      this.addlabel(); //文章标签
      // this.getAuthentication() //企业认证
      // console.log(this.isCompanyAuth,123434553252)
      this.gtelabel(); //文章标签详情
      this.clickvideo() //视频标签详情
      this.getMyTask();
      this.boss = uni.getStorageSync('isBoss')
      this.externalgetBidding()
      this.platformgetBidding()
    },
    async onPullDownRefresh() {
      // 下拉刷新

    },
    onShareAppMessage(e) {

    },
    onShareTimeline(e) {

    },

    mounted() {
      // wx.setNavigationBarTitle({
      // 	title: "机构"
      // });
      let v = this;
      v.isBoss = wx.getStorageSync("isBoss") || false;
    },
    methods: {
      ...mapActions(["setCurrentCompany", "setSubscriptionNew"]),
      //跳转到发布任务页面
      toNewmission(){
        uni.navigateTo({
          url:'../mission/newmission/mission'
        })
      },
      //跳转到合同管理页面
      tocontractAdmin(){
        uni.navigateTo({
          url:'../mission/contractAdmin/contractAdmin'
        })
      },
      //跳转到任务通知页面
      toNewsMission(){
        uni.navigateTo({
          url:'../mission/newsMission/newsMission'
        })
      },
      getServerData() {
        let LineA = {
          "categories": [
            "9.1",
            "9.2",
            "9.3",
            "9.4",
            "9.5",
            "9.6"
          ],
          "series": [{
              "name": "文章阅读量",
              "data": [
                35,
                8,
                25,
                37,
                4,
                20
              ]
            },
            {
              "name": "视频播放量",
              "data": [
                70,
                40,
                65,
                100,
                44,
                68
              ]
            }
          ]
        }
        //第二根线为虚线的设置
        // LineA.series[1].lineType='dash';
        // LineA.series[1].dashLength=10;
        _self.textarea = JSON.stringify(LineA);
        _self.showLineA("canvasLineA", LineA);

      },
      showLineA(canvasId, chartData) {
        console.log("chartData", chartData)
        canvaLineA = new uCharts({
          $this: _self,
          pixelRatio: _self.pixelRatio,
          categories: chartData.categories,
          series: chartData.series,
          width: _self.cWidth * _self.pixelRatio,
          height: _self.cHeight * _self.pixelRatio,
          canvasId: canvasId,

          type: 'line',
          colors: ['#5087EC', '#68BBC4', '#8543e0', '#90ed7d'],
          fontSize: 11,
          padding: [0, 0, 0, 0],
          legend: {
            show: true,
            margin: 12,
            position: 'top',
            fontSize: 11,
            borderWidth: 1,
          },
          dataLabel: true,
          dataPointShape: true,

          animation: true,
          xAxis: {
            type: 'grid',
            gridColor: '#CCCCCC',
            gridType: 'solid',
            disableGrid: true
          },
          yAxis: {
            gridType: 'dash',
            gridColor: '#CCCCCC',
            "dashLength": 2,
          },

          extra: {
            line: {
              type: 'straight',
              width: 1,
            }
          }
        });

      },
      touchEndLineA(e) {
        let currIndex = canvaLineA.getCurrentDataIndex(e);
        if (currIndex > -1 && currIndex < canvaLineA.opts.categories.length) {
          let riqi = canvaLineA.opts.categories[currIndex];
          let leibie = canvaLineA.opts.series[0].name;
          let shuju = canvaLineA.opts.series[0].data[currIndex];
          this.Interactive = leibie + ':' + riqi + '-' + shuju + '元';
        }
        canvaLineA.touchLegend(e);
        canvaLineA.showToolTip(e, {
          format: function(item, category) {
            return category + ' ' + item.name + ':' + item.data
          }
        });
      },

      //跳转到内容数据页面
      toContentData() {
        wx.navigateTo({
          url: '../demand/contentData/contentData'
        })
      },
      //获取指定任务任务
      platformgetBidding() {
        http({url:'/apis/companytask/accept_index',method:'GET'}).then(res=>{
          if(res.data.code == 200){
            this.AcceptCompanyTaskList = res.data.data.slice(0,3)
            this.AcceptCompanyTaskList.forEach(item=>{
              if(item.type == 4){
                item.category = '平台任务'
              }else if(item.type == 3){
                item.category = '开放任务'
              }else{
                item.category = '指定任务'
              }
            })
            // console.log(this.AcceptCompanyTaskList,9999999111111)
          }
        })
      },
      //获取我的任务
      externalgetBidding() {
        http({url:'/apis/mytask/received',method:'GET'}).then(res=>{
          if(res.data.code == 200){
            this.AcceptCompanyTask = res.data.data.slice(0,3)
            this.AcceptCompanyTask.forEach(item=>{
              if(item.type == 4){
                item.category = '平台任务'
              }else if(item.type == 3){
                item.category = '开放任务'
              }else{
                item.category = '指定任务'
              }
            })
            // console.log(this.AcceptCompanyTask,88888888111111)
          }
        })
      },

      //导航栏切换
      change(index) {
        this.activeIndex = index
      },
      //查询订阅消息
      getSubscription() {
        WXAJAX.POST({
          companyId: WXAJAX.smartMainId
        }, '', '/subscription/getComanySub', null, "/pages/index/main", '', '', '', "1").then(data => {
          //存放到store
          this.setSubscriptionNew(data);
        });
      },
      scroll: function(e) {
        console.log(e)
        this.old.scrollTop = e.detail.scrollTop
      },
      //获取认证信息
      // getAuthentication() {
      //   var data = {
      //     ignore: true
      //   }
      //   WXAJAX.POST(data, '', '/company/getCompany', '', '').then(res => {
      //     if (res.isCompanyAuth != 1) {
      //       uni.showModal({
      //         title: '认证功能',
      //         content: '浏览此页面需要先认证',
      //         cancelText: '返回首页',
      //         confirmText: '前往认证',
      //         success: function(res) {
      //           if (res.confirm) {
      //             let companyId = wx.getStorageSync('SELFCOMPANYID') ? wx
      //               .getStorageSync('SELFCOMPANYID') : wx.getStorageSync(
      //                 'COMPANYID');
      //             console.log('用户点击确定');
      //             let url =
      //               'H5/webView?H5title=申请认证&url=https://wx.mingyicloud.com/app/myy/certmgmt.nsf/personcertFXMopenformFxMcompanyIdFxm' +
      //               companyId + 'FxMidFxm3';
      //             wx.navigateTo({
      //               url: "/pages/" + url
      //             });
      //           } else if (res.cancel) {
      //             console.log('用户点击取消');
      //             uni.navigateTo({
      //               url: '/pages/find/index'
      //             });
      //           }
      //         }
      //       });
      //     }
      //   })
      // },
      //视频详情跳转
      toviedoinfo(info) {
        let id = info.shortVideoId
        wx.navigateTo({
          url: `../companyPack/videodetails/videodetails?videoId=${id}`
        });
      },
      // 跳转到机构任务
      inside() {
        uni.navigateTo({
          url: "../demand/appointMission/appointMission"
        })
      },
      // 跳转到我的任务
      external() {
        uni.navigateTo({
          url: '../demand/openMission/openMission'
        })
      },
      // 跳转到平台任务
      platform() {
        uni.navigateTo({
          url: './platform/platform'
        })
      },
      // 获取文章分类标签
      addlabel() {
        let url = "/sys/label/queryList"
        let data = {
          labelType: 3,
          pageSize: 1,
          pageNum: 1
        }
        WXAJAX.POST(data, '', url, '', '', 1).then((res) => {

          this.datalist = res
        })
      },
      // 获取文章标签详情信息
      gtelabel() {
        let v = this
        // console.log(this.labelTitle);
        // schedulingsApi/dynamic/listCompanyDynamic
        console.log(v.labelTitle);
        let url = "/dynamic/listDynamic"
        let data = {
          companyId: 1422,
          type: 1,
          labelContent: v.labelTitle,
          isDrafts: 0
        }
        WXAJAX.POST(data, '', url, '', '', 1).then((res) => {
          // console.log(res, 988989898989);
          if (!res) {
            this.isnotyet = true
            this.articleList2 = ''
          }
          if (res) {
            this.articleList2 = res.list
            this.isnotyet = false
          }
        })
      },
      //点击小标签改变class样式
      clicklabdel(labelTitle) {
        console.log(labelTitle);
        this.labelTitle = labelTitle
        this.gtelabel()
        console.log(this.labelTitle, '标签名');
      },
      //视频的小标签
      clicklist(labelTitle) {
        console.log(labelTitle, 324543656456);
        this.videotitle = labelTitle
        this.clickvideo()
        console.log(this.videotitle, '标签名');
      },
      // 查询视频标签
      gtevideolabel() {
        let url = "/sys/label/queryList"
        let data = {
          labelType: 4,
        }
        WXAJAX.POST(data, '', url, '', '', 1).then((res) => {
          this.videolabel = res
        })
      },
      // 获取视频标详情
      clickvideo() {
        // this.labelTitle = labelTitle
        let v = this
        let url = "/shortVideo/queryPage"
        let data = {
          labelContent: v.videotitle,
          // labelContent:'',
          companyId: 1,
          isShow: 1,
          isOrgShow: 1,
        }
        WXAJAX.POST(data, '', url, '', '', 2).then((res) => {
          // console.log(res, "视频详情");
          if (!res.list) {
            this.ishownotyet = true
            this.videoList = ''
          }
          if (res.list) {
            this.videoList = res.list
            this.ishownotyet = false
          }
        })
      },

      playVideo(e) {
        var that = this;
        var id = e.currentTarget.id;
        for (var i = 0; i < that.videoList.length; i++) {
          if (id === 'myVideo' + i) {
            //console.log('播放视频不做处理');
          } else {
            //console.log('暂停其他正在播放的视频');
            var videoContext = wx.createVideoContext("myVideo" + i, that);
            videoContext.pause();
          }
        }
        // 	this.videoContextList[index].pause();
      },
      ...mapActions(["setCurrentCompany"]),

      // getArticleList2() {
      // 	wx.showLoading();
      // 	WXAJAX.POST({
      // 			companyId: 1400,
      // 			pageNum: 2,
      // 			pageSize: 5,
      // 			type: 1,
      // 			createUserId: 1771
      // 		}, '', '/personal/getDynamicInfo', '', '', 2)
      // 		.then((data) => {
      // 			wx.hideLoading()
      // 			this.articleList2 = data
      // 		})
      // },
      // 热门新闻
      // getArticleList3() {
      //   wx.showLoading();
      //   WXAJAX.POST({
      //       companyId: 1400,
      //       pageNum: 3,
      //       pageSize: 5,
      //       type: 1,
      //       createUserId: 1771
      //     }, '', '/personal/getDynamicInfo', '', '', 2)
      //     .then((data) => {
      //       wx.hideLoading()
      //       this.articleList3 = data
      //     })
      // },
      // getVideoList(labelTitle) {
      // 	this.labelTitle = labelTitle
      // 	let v = this
      // 	let url = "/dynamic/listCompanyDynamic"
      // 	let data = {
      // 		labelContent: v.labelTitle,
      // 		type: 6,
      // 		COMPANYID: uni.getStorageSync('COMPANYID')
      // 	}
      // 	WXAJAX.POST(data, '', url, '', '', 1).then((res) => {
      // 		console.log(res, "视频详情");
      // 		this.videoList = res.list
      // 	})
      // },
      toDetail(dynamicId) {
        let url = '../companyPack/find/dynamicDetail/main?dynamicId=' + dynamicId
        wx.navigateTo({
          url: url
        })
      },
      //获取任务列表
      async getMyTask() {
        wx.showLoading();
        await WXAJAX.POST({
            type: 2,
            queryType: 1,
            pageNum: this.taskPageNum
          }, '', '/customerEssay/queryMyTask')
          .then((data) => {
            this.taskNum = data.total;
            wx.hideLoading()
            if (data.list) {
              data.list.forEach((item) => {
                if (item.taskState > 2) {
                  item.state = 1;
                } else {
                  item.state = 2;
                }
                // if(item.taskState==2){
                //   item.state=1;
                // }else if(item.taskState>2){
                //   item.state=2;
                // }else if(item.state == 1){
                //   item.state=3;
                // }else{
                //   item.state=4;
                // }
              })
              console.log("myTaskList", data.list);
              // return ;
              if (this.taskPageNum == 1) {
                this.myTaskList = data.list
              } else {
                this.myTaskList = [...this.myTaskList, ...data.list]
              }
              this.taskPageNum++;
            }

          })
      },
      toSharedData(id) {
        wx.setStorageSync('sharedDataId', id);
        wx.navigateTo({
          url: '../marketing/taskDetails/main'
        })
      },
      //任务管理的下拉刷新
      taskScrolltolower() {
        this.getMyTask();
      },
      page_tap: utils.throttle(function(url, query) {
        if (url == 'companyPack/institutional') {
          authArticleMessage2(this.subscriptionNew);
        } else {
          authArticleMessage(this.subscriptionNew);
        }

        console.log("url", url);
        // if(url=='buyVideo/index'&&!wx.getStorageSync("isBoss")){
        //   wx.showToast({
        //     title: "只有管理者才能编辑",
        //     duration: 2000,
        //     icon: "none"
        //   });
        //   return;
        // }
        if (
          [
            // "companyPack/tendencies",
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

        // if (url != "companyPack/editEnterprise" && !this.hasenterprise) {
        //   return;
        // }
        query = query || "";
        wx.navigateTo({
          url: "../" + url + "/main" + query
        });
      }),
      filtrate() {
        this.editTab = !this.editTab;
        // this.getMyTask();
      },
      tab_type_tap(type) {
        this.tabType = type
      },
      tabChange(index) {
        this.TabCur = index;
      },
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
            console.log(err);
          }
        });
      },
      // 存入机构文库的功能
      getinstitution(dynamicId) {
        if (this.boss) {
          this.isShow = 1
        }
        if (!this.boss) {
          this.isShow = 0
        }
        console.log(this.isShow)
        WXAJAX.POST({
            dynamicId: dynamicId,
            isOrgShow: 1,
            isDrafts: 0,
            isShow: this.isShow,
            isLibrary: 1,
          }, '', '/dynamic/copyDynamicInfo', '', '', 1)
          .then((data) => {
            console.log(data, "存入机构文库的功能");
            uni.showToast({
              title: '存入成功',
              duration: 1000,
              icon: "none"
            });
          })
      },
    }
  };
</script>

<style>
  .jxscreenList {
    width: 60%;
    /* margin: 20rpx 20rpx 20rpx 0rpx; */
    display: flex;
  }

  .screen {
    width: calc(100% -1rpx);
    border: 0px transparent solid;
    /* background-color: #fff; */
    display: flex;
    justify-content: space-between;
    margin-left: -20rpx;
  }

  .ml23 {
    margin-left: 46rpx;
  }

  .ml13 {
    margin-left: 26rpx;
  }

  .bgc {
    height: 48rpx;
    float: left;
    line-height: 48rpx;
    margin-right: 20rpx;
    margin-top: 20rpx;
    background-color: rgba(222, 222, 222, 100);
    color: rgba(139, 139, 139, 100);
    font-size: 24rpx;
    padding: 0rpx 18rpx 0rpx 18rpx;
    border-radius: 12rpx;
  }

  .act {
    height: 48rpx;
    float: left;
    line-height: 48rpx;
    margin-right: 20rpx;
    margin-top: 20rpx;
    background-color: #03D3C5;
    color: #FFFFFF;
    font-size: 24rpx;
    padding: 0rpx 18rpx 0rpx 18rpx;
    border-radius: 12rpx;
  }

  .b1s {
    border: 1px solid #000000;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }

  .enterprise_menu {
    transition: 0.2s;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.19);
    border-radius: 12rpx;
  }

  .enterprise_background {
    background-color: #fff;
  }

  .enterprise_menu.top {
    position: fixed;
    top: 0;
  }

  .main {
    /* width: 85%; */
    margin: 0 auto;
    /* margin-top: 20rpx; */
    padding: 30rpx 30rpx 0 30rpx;
    background-color: #F7F7F7;

  }

  .companyTitle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .hotTitle {
    display: flex;
    flex-direction: row;
    margin-top: 30upx;
    /* margin-bottom: 30upx; */
  }

  .title {
    font-size: 36upx;
    color: #ffffff;
    opacity: 0.4;
    transition: all .2s;
  }

  .taskTitle {
    font-size: 38rpx;
    color: #383838;
    font-weight: bold;
    padding: 30rpx 0;
  }

  .taskNum {
    color: white;
    width: 40rpx;
    height: 40rpx;
    background-color: red;
    border-radius: 40rpx;
    font-size: 24rpx;
  }

  .addTask {
    height: 50upx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .outer {
    margin-top: 50rpx;
    overflow: hidden;
    width: 110%;
    margin-left: -5%;
  }

  .inner {
    border-radius: 10rpx;
    height: 100rpx;
    margin: 0 20rpx 20rpx 20rpx;
    Box-shadow: 0rpx 2rpx 10rpx #51cdcb;
  }


  .enterprise_tabbar {
    /* height: 450upx; */
    display: flex;
    /* border: 1px solid #000000; */
    justify-content: space-between;
    /* flex-wrap: wrap; */
    padding-top: 40rpx;
    color: #9E9FA1;
  }

  .enterprise_tabbar_list {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* width: 250rpx; */
    margin-left: 30rpx;
    margin-right: 30rpx;
  }

  .enterprise_tabbar_list image {
    width: 65upx;
    height: 65upx;
  }

  .enterprise_center_icon {
    width: 100%;
    height: 40upx;
    box-sizing: border-box;
    padding-top: 32upx;
  }

  .enterprise_center_icon span {
    display: block;
    width: 100upx;
    height: 8upx;
    background: rgba(245, 245, 246, 1);
    border-radius: 4upx;
    margin: 0 auto;
  }

  .wen {
    line-height: 2;
    font-weight: bold;
    width: 110rpx;
    text-align: center;
  }

  .skip-btn {
    /* height: 54upx; */
    display: flex;
    align-items: center;
    border-radius: 12upx;
    font-size: 24upx;
    margin-right: 20upx;
    box-sizing: border-box;
    text-align: center;
    padding: 10upx 16upx 10upx 16upx;
  }

  .articleImg {
    width: 152rpx;
    height: 152rpx;
    border-radius: 12rpx;
    margin-right: 28rpx;
    margin-top: 24rpx;
  }

  .articleTitle {
    margin-top: 20rpx;
    margin-left: 34rpx;
    width: 470rpx;
    display: inline-block;
  }

  .articleTitle span {
    font-size: 28rpx;
    /* font-weight: bold; */
    font-family: PingFangSC-bold;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .donghua {
    transition: all 0.3s linear 0s
  }

  .platform {
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    font-size: 24rpx;
  }

  .navHead {
    width: 679rpx;
    height: 80rpx;
    padding: 0 40rpx;
    display: flex;
    line-height: 80rpx;
    background-color: #00D7D0;
    color: #FFFFFF;
  }

  .active {
    margin-right: 40rpx;
    font-weight: bold;
    height: 70rpx;
  }

  .selectactive {
    margin-right: 40rpx;
    font-weight: bold;
    height: 70rpx;
    border-bottom: 1px solid #FFFFFF;
  }

  .earchts {
    width: 674rpx;
    height: 368rpx;
    border-radius: 12rpx;
    background-color: white;
    padding-left: 20rpx;
    padding-bottom: 20rpx;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.19);
  }

  .taskContent {
    width: 630rpx;
    height: 324rpx;
    padding: 20rpx 30rpx;
    border-radius: 12rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 12rpx 0px rgba(0, 0, 0, 0.08);
    font-family: Arial;
    margin-top: 24rpx;
  }

  .taskevery {
    width: 100%;
    height: 105rpx;
  }

  .taskStatus {
    padding: 0 10rpx;
    height: 36rpx;
    line-height: 36rpx;
    border-radius: 6rpx;
    background-color: rgba(196, 241, 238, 100);
    color: rgba(1, 196, 161, 100);
    font-size: 24rpx;
    text-align: center;
    font-family: Microsoft Yahei;
    margin-left: 20rpx;
    margin-top: 12rpx;
  }
  .work{
    width:630rpx;
    border-radius: 12rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    box-shadow: 0px 2px 12px 0px rgba(16, 16, 16, 17);
    font-family: Arial;
    padding: 40rpx 30rpx;
  }
  .workNav{
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .workevery{
    width: 100rpx;
    height:140rpx;
  }
  .workImg{
    width: 84rpx;
    height: 84rpx;
    background-color: rgba(0, 187, 174, 100);
    box-shadow: 0px 2px 6px 0px rgba(0, 201, 255, 100);
    margin-bottom: 18rpx;
    margin-left: 8rpx;
    border-radius:50%;
  }
  .workImg image{
    width: 36rpx;
    height: 36rpx;
    margin-top: 24rpx;
    margin-left: 24rpx;
  }
  .workText{
    color: rgba(0, 0, 0, 1);
    font-size: 24rpx;
    text-align: center;
    font-family: PingFangSC-regular;
  }
</style>
