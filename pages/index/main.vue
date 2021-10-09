<template>
  <div class="bgf5f6 radar">
    <div class="bgblue textc posre"
         :style="{height: navHeight+'px'}">
      <p class="navgation-title cfff fs18 h44 lh44 fbold" >跟 进</p>
    </div>
    <FormId>
      <div class="radar_menu posre pl36 pr37 fs16 c78 bgblue">
        <div class="menu-content fs16">
          <div class="cf5f5f6 meu-item"
               @click="type1_tap(0)">
            <p class="pb9">客户线索</p>
            <div class="textc h4"
                 :class="type1_id == 0 ? 'active' : '' ">
            </div>
          </div>
          <div class="cf5f5f6 meu-item"
               @click="type1_tap(1)">
            <p class="pb9">客户管理</p>
            <div class="textc h4"
                 :class="type1_id == 1 ? 'active' : '' ">
            </div>
          </div>
         <!-- <div class="cf5f5f6 meu-item"
               @click="type1_tap(2)">
            <p class="pb9">成交率</p>
            <div class="textc h4"
                 :class="type1_id == 2 ? 'active' : '' ">
            </div>
          </div> -->
          <div class="cf5f5f6 meu-item"
               @click="type1_tap(3)">
            <p class="pb9">客户数据</p>
            <div class="textc h4"
                 :class="type1_id == 3 ? 'active' : '' ">
            </div>
          </div>
          <!-- <div class="cf5f5f6 meu-item"
               @click="type1_tap(3)">
            <p class="pb9">跟进记录</p>
            <div class="textc h4"
                 :class="type1_id == 3 ? 'active' : '' ">
            </div>
          </div> -->
         <!-- <div class="cf5f5f6 meu-item"
               @click="type1_tap(4)">
            <p class="pb9">数据统计</p>
            <div class="textc h4"
                 :class="type1_id == 4 ? 'active' : '' ">
            </div>
          </div> -->
        </div>
      </div>
    </FormId>
    <scroll-view
    v-if="type1_id == 0 || type1_id == 2"
    scroll-y="true"
                 :style="{height: scrollContentHeight+'px'}"
                 @scrolltolower="lower"
                 @scrolltoupper="scrolltoupper"
                 enable-back-to-top="true"
                 scroll-with-animation="true"
                 lower-threshold="100"
                 scroll-anchoring="true"
                 class="bgfff"
                 :scroll-top="scrollTop">
      <!-- <div class="content"> -->
     <div class="h20 bgblue posre" v-if="type1_id == 0" style="padding-top:20rpx;">
       <div style="width:100%;height:100%;border-radius: 20rpx 20rpx 0 0;background-color:white;"></div>
     </div>

     <view class="client">
       <view class="clientTitle">
         <view style="font-size: 28rpx;font-weight: bold;">潜在客户</view>
         <view style="font-size: 28rpx;color:#00BBAE 100%;">更多</view>
       </view>
       <view class="clientlist">
          <view class="clienttop">
            <view class="clientImg"><image src="https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epg95F97552KkKL2b6ZcvMgrozkk4Q9EQJ0yOCF6FEN8cxOG3gWVib5jA9B52HicnzVB8gpFicmiaEgHQ/132" mode=""></image></view>
            <view class="clientmain">
              <view style="font-size:28rpx;">王宇涵</view>
              <view style="font-size: 24rpx;color:rgba(16, 16, 16, 53);margin-top: 14rpx;">07-14 10:18 来自采推</view>
            </view>
            <view class="clientbtn">存为客户</view>
          </view>
          <view style="margin:38rpx 0;font-size:28rpx;">TA观看了您分享的视频<text style="color:#00D7C8;">《康复新液临床应用》</text></view>
          <view class="clientBottom">
            <view class="clientBtn">查看名片</view>
            <view class="clientbtn" style="margin-left:106rpx;margin-top: 0;">微信联系</view>
          </view>
       </view>
       <view class="clientlist">
          <view class="clienttop">
            <view class="clientImg"><image src="https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epg95F97552KkKL2b6ZcvMgrozkk4Q9EQJ0yOCF6FEN8cxOG3gWVib5jA9B52HicnzVB8gpFicmiaEgHQ/132" mode=""></image></view>
            <view class="clientmain">
              <view style="font-size:28rpx;">王宇涵</view>
              <view style="font-size: 24rpx;color:rgba(16, 16, 16, 53);margin-top: 14rpx;">07-14 10:18 来自采推</view>
            </view>
            <view class="clientbtn">存为客户</view>
          </view>
          <view style="margin:38rpx 0;font-size:28rpx;">TA观看了您分享的视频<text style="color:#00D7C8;">《康复新液临床应用》</text></view>
          <view class="clientBottom">
            <view class="clientBtn">查看名片</view>
            <view class="clientbtn" style="margin-left:106rpx;margin-top: 0;">微信联系</view>
          </view>
       </view>
     </view>

      <AI v-if="type1_id == 0"
          ref="ai"
          class="ai" />
      <!-- <Behavior v-if="type1_id == 1"
                class="behavior" /> -->
      <Closing v-if="type1_id == 2"
               class="closing" />

      <NoDataBottom />
      <!-- v-if="lists.length && nodata" -->
      <!-- </div> -->
    </scroll-view>
    <div class="h20 bgblue posre" v-if="type1_id == 1" style="padding-top:20rpx;">
      <div style="width:100%;height:100%;border-radius: 20rpx 20rpx 0 0;background-color:white;"></div>
    </div>
    <scroll-view
    v-if="type1_id == 1"
    scroll-y="true"
               :style="{height: scrollContentHeight+'px'}"
               enable-back-to-top="true"
               scroll-with-animation="true"
               lower-threshold="100"
               scroll-anchoring="true"
               class="bgfff">

          <view class="work">
            <view class="workTitle">工作台</view>
            <view class="workNav">
              <view class="workevery">
                <view class="workImg"><image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/customercard.png" mode=""></image></view>
                <view class="workText">递名片</view>
              </view>
              <view class="workevery" @click="toVisit">
                <view class="workImg"><image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/customermarked.png" mode=""></image></view>
                <view class="workText">拜访打卡</view>
              </view>
              <view class="workevery">
                <view class="workImg"><image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/customerflag.png" mode=""></image></view>
                <view class="workText">发任务</view>
              </view>
              <view class="workevery">
                <view class="workImg"><image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/customerbolt.png" mode=""></image></view>
                <view class="workText">接任务</view>
              </view>
            </view>
          </view>

          <Customer v-if="type1_id == 1"
              ref="customer"
              class="ai" />
          <div style="width: 690rpx;height: 50rpx;"></div>

    </scroll-view>

    <div class="h20 bgblue posre" v-if="type1_id == 3" style="padding-top:20rpx;">
      <div style="width:100%;height:100%;border-radius: 20rpx 20rpx 0 0;background-color:white;"></div>
    </div>

   <scroll-view scroll-y="true" v-show="type1_id == 3" :style="{height: scrollContentHeight+'px'}">
      <view class="mainData">
        <div class="lineTitle">个人行为对比（月）</div>
        <div class="lineEarchts">
          <canvas style="width: 100%;height: 100%;" canvas-id="canvasLineA" id="canvasLineA" class="charts"  @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
        </div>

        <div class="lineTitle" style="margin: 30rpx 0 ;">内容分享次数与客户查看次数</div>
        <DaysSwitch @select="query" />
        <div class="columnEarchts">
          <canvas style="width: 100%;height: 100%;" canvas-id="canvasLineB" id="canvasLineB" class="charts"  @touchstart="touchLineB" @touchmove="moveLineB" @touchend="touchEndLineB"></canvas>
        </div>

        <div class="lineTitle" style="margin: 30rpx 0 ;">客户查看名片内容数据</div>
        <DaysSwitch @select="query" />
        <div class="circleEarchts">
          <canvas canvas-id="canvasRing" id="canvasRing" class="charts" :style="{'width':dWidth*pixelRatio+'px','height':dHeight*pixelRatio+'px', 'transform': 'scale('+(1/pixelRatio)+')','margin-left':-dWidth*(pixelRatio-1)/2+'px','margin-top':-dHeight*(pixelRatio-1)/2+'px'}" @touchstart="touchRing"></canvas>
        </div>

        <div class="lineTitle" style="margin: 30rpx 0 ;">客户转化</div>
        <div class="showEarchts">
          <canvas canvas-id="canvasArea" id="canvasArea" class="charts" :width="eWidth*pixelRatio" :height="eHeight*pixelRatio" :style="{'width':eWidth+'px','height':eHeight+'px'}" @touchstart="touchArea"></canvas>
        </div>



      </view>
    </scroll-view>

  <!-- <scroll-view
    v-if="type1_id == 3"
    scroll-y="true"
               :style="{height: scrollContentHeight+'px'}"
               enable-back-to-top="true"
               scroll-with-animation="true"
               lower-threshold="100"
               scroll-anchoring="true"
               class="bgfff">

          <FOLLOW v-if="type1_id == 3"
              ref="follow"
              class="ai" />

    </scroll-view> -->


    <div class="h20 bgblue posre" v-if="type1_id == 4" style="padding-top:20rpx;">
      <div style="width:100%;height:100%;border-radius: 20rpx 20rpx 0 0;background-color:white;"></div>
    </div
    <scroll-view
    v-if="type1_id == 4"
    scroll-y="true"
               :style="{height: scrollContentHeight+'px'}"
               enable-back-to-top="true"
               scroll-with-animation="true"
               lower-threshold="100"
               scroll-anchoring="true"
               class="bgfff">

          <ANALYSIS v-if="type1_id == 4"
              ref="analysis"
              class="ai" />

    </scroll-view>
    <Tabbar :unreadMsg='unreadMsg' tabIndex=2></Tabbar>
  <view class="" style="width: 100%;height: 200rpx;"></view>
  </div>
</template>

<script>
  import uCharts from '@/js_sdk/u-charts/u-charts.js';
  import  { isJSON } from '@/common/checker.js';
  var _self;
  var canvaLineA=null;
  var canvaLineB=null;
  var canvaRing=null;
  var canvaArea=null;
  var lastMoveTime=null;//最后执行移动的时间戳

import MsgBox from "@/components/msgBox"; // 订单项
import AddNoticeNum from "@/components/AddNoticeNum";
import WXAJAX from "../../utils/request";
import FormId from "@/components/formId";
import NoData from "@/components/noData";
import DialogBox from "@/components/dialogBox"; // 对话框
import AI from "./ai/index";
import FOLLOW from "./ai/new";
import ANALYSIS from "./ai/analysis";

import Behavior from "./behavior/index";
import Closing from "./closing/index";
import Customer from './customer/customer';
import NoDataBottom from '@/components/NoDataBottom';
import {authSubscribeMessage} from '../../utils/auth.js'
import { mapActions, mapGetters } from "vuex";
import {sendNoticeRead,sendSocketJSON} from "../../utils/websocket";
import Tabbar from "@/components/Tabbar";
import websocket from "../../utils/websocket";
import DaysSwitch from '@/pages/index/components/DaysSwitch';
export default {
  data () {
    return {
      notYetLogin: false, // 暂时不登录
      type1_id: 0,
      type2_id: "0",
      type3_id: "1",
      menu: [
        [
          { title: "时间追踪", id: 0 },
          {
            title: "行为追踪",
            id: 1,
            child: [
              { title: "看名片", id: 1 },
              { title: "看产品", id: 2 },
              { title: "看动态", id: 4 },
              { title: "看官网", id: 3 }
            ]
          }
        ],
        [
          { title: "查看名片", id: 1 },
          { title: "重视产品", id: 2 },
          { title: "关注动态", id: 4 },
          { title: "关注机构", id: 3 }
        ]
      ],
      lists: [],
      ai_lists: {}, //解决AI追踪时间排序
      type: 1,
      page: 1,
      isLoading: false, //是否在加载
      nodata: false, //是否已经没有数据
      seeType: {
        1: {
          title: "名片",
          1: "现在沟通，效率更高哦",
          4: "成交有望"
        },
        2: {
          title: "产品",
          1: "尽快把握商机",
          4: "可标注为重点客户"
        },
        3: {
          title: "官网",
          1: "有望合作",
          4: "可标注为重点客户"
        },
        4: {
          title: "动态",
          1: "合作意向很强烈",
          4: "成单在望"
        },

      },
      infoText: {},
      navHeight: 0,
      scrollContentHeight: 0,
      seeTypeId: '',//业务类型  '': 全部;1:名片;2:产品;3：官网;4:查看文章;5:预约
      scrollTop: 0, //设置滚动条的位置
      // isCompanyAuth:0,
      unreadMsg:uni.getStorageSync('unreadMsg'),

      cWidth:'',
      cHeight:'',
      pixelRatio:1,
      textarea:'',
      Interactive:'',//交互显示的数据

      bWidth:'',
      bHeight:'',
      pixelRatio:1,
      textareaB:'',
      InteractiveB:'',//交互显示的数据

      dWidth:'',
      dHeight:'',
      pixelRatio:1,
      textareaC:'',
      InteractiveC:'',//交互显示的数据

      eWidth:'',
      eHeight:'',
      pixelRatio:1,
      textareaD:'',
      InteractiveD:'',//交互显示的数据
    };
  },

  computed: {
    ...mapGetters(["currentCompany","subscriptionNew"])
  },
  components: {
    MsgBox,
    FormId,
    NoData,
    AddNoticeNum,
    DialogBox,
    AI,
    FOLLOW,
    ANALYSIS,
    Behavior,
    Closing,
    NoDataBottom,
    Customer,
    Tabbar,
    DaysSwitch
  },

  onLoad (options) {
    // console.log("跳转crm带参数",options);
    _self = this;
    // uni.getSystemInfo({
    //   success: function (res) {
    //     if(res.pixelRatio>1){
    //       //正常这里给2就行，如果pixelRatio=3性能会降低一点
    //       //_self.pixelRatio =res.pixelRatio;
    //       _self.pixelRatio =2;
    //     }
    //   }
    // });
    this.cWidth=uni.upx2px(690);
    this.cHeight=uni.upx2px(400);
    this.getServerData();
    this.bWidth=uni.upx2px(690);
    this.bHeight=uni.upx2px(600);
    this.getColumnData();
    this.dWidth=uni.upx2px(690);
    this.dHeight=uni.upx2px(530);
    this.getRingData();
    this.eWidth=uni.upx2px(690);
    this.eHeight=uni.upx2px(400);
    this.getAreaData();

    if(options.cardId){
      wx.setStorageSync('cardId',options.cardId)
      wx.setStorageSync('SELFCARDID',options.cardId)
      this.init();
    }
    this.lists = [];
    this.ai_lists = {};
    this.page = 1;
    this.isLoading = false;
    const query = this.$root.$mp.query;
    if (query && query.notYetLogin) {
      this.notYetLogin = query.notYetLogin;
    }
    this.calculateNavBarHeight();
    //查询订阅消息
    this.getSubscription();

    //切换名片更改缓存
  },
  /** tab点击 */
  onTabItemTap(item) {
   //订阅授权 信息相关
   authSubscribeMessage(this.subscriptionNew);
    //通知测试
    sendNoticeRead(1355,4)
    sendSocketJSON(1011,4)
  },
  onShow () {
    websocket.sendSocketJSON('1090');
    // this.getAuthentication() //企业认证

    try {
      wx.setNavigationBarTitle({
        title: "跟进"
      });
    } catch (e) {
      console.log(e)
      // this.$refs.noticeNum && this.$refs.noticeNum.getTotalNum();
    }
    this.$refs.noticeNum && this.$refs.noticeNum.getTotalNum();

    this.type1_id = 0
    this.type2_id = 0
    this.type3_id = 1
  },
  methods: {
    ...mapActions(["setCurrentCompany","setSubscriptionNew"]),
    toVisit(){
      uni.navigateTo({
        url:'/pages/companyPack/visitlist/main'
      })
    },
    getRingData(){
          let LineC={
                  "categories": [],
                  "series": [
                      {
                          "name": "文章阅读量",
                          "data": 35
                      },
                      {
                          "name": "视频播放量",
                          "data": 20
                      },
                      {
                          "name": "图片播放量",
                          "data": 5
                      },
                      {
                          "name": "内容播放量",
                          "data": 10
                      },
                      {
                          "name": "文章播放量",
                          "data": 30
                      }
                  ]
              }
    			_self.textarea = JSON.stringify(LineC);
    			_self.showRing("canvasRing",LineC);

    },
    showRing(canvasId,chartData){
    	canvaRing=new uCharts({
    		$this:_self,
    		canvasId: canvasId,
    		type: 'ring',
    		fontSize:11,
    		padding:[5,5,5,5],
        color:['#5087EC','#68BBC4','#17D2C5','#F2BD42','#EE752F'],
    		legend:{
    			show:true,
    			position:'right',
    			float:'center',
    			itemGap:10,
    			padding:5,
    			lineHeight:26,
    			margin:5,
    			//backgroundColor:'rgba(41,198,90,0.2)',
    			//borderColor :'rgba(41,198,90,0.5)',
    			borderWidth :1
    		},
    		background:'#FFFFFF',
    		pixelRatio:_self.pixelRatio,
    		series: chartData.series,
    		animation: false,
    		width: _self.dWidth*_self.pixelRatio,
    		height: _self.dHeight*_self.pixelRatio,
    		disablePieStroke: true,
    		dataLabel: true,
    		// subtitle: {
    		// 	name: '70%',
    		// 	color: '#7cb5ec',
    		// 	fontSize: 25*_self.pixelRatio,
    		// },
    		// title: {
    		// 	name: '收益率',
    		// 	color: '#666666',
    		// 	fontSize: 15*_self.pixelRatio,
    		// },
    		extra: {
          ring:{
            ringWidth: 20,
          },
    			pie: {
    			  offsetAngle: 0,
    			  ringWidth: 40*_self.pixelRatio,
    			  labelWidth:15
    			}
    		},
    	});

    },
   touchRing(e){
   	canvaRing.touchLegend(e, {
   		animation : false
   	});
   	canvaRing.showToolTip(e, {
   		format: function (item) {
   			return item.name + ':' + item.data
   		}
   	});
   },
   changeData(){
   	if(isJSON(_self.textarea)){
   		let newdata=JSON.parse(_self.textarea);
   		canvaRing.updateData({
   			series: newdata.series,
   			categories: newdata.categories
   		});
   	}else{
   		uni.showToast({
   			title:'数据格式错误',
   			image:'../../../static/images/alert-warning.png'
   		})
   	}
   },
    getAreaData(){
      let LineD={
              "categories": ["9.1","9.2","9.3","9.4","9.5","9.6"],
              "series": [
                  {
                      "name": "文章阅读量",
                      "data": [35,8,25,37,4,20]
                  },
                  {
                      "name": "视频播放量",
                      "data": [70,40,65,100,44,68]
                  }

              ]
          }
          _self.textareaD = JSON.stringify(LineD);
          _self.showArea("canvasArea",LineD);
    },
    showArea(canvasId,chartData){
    	canvaArea=new uCharts({
    		$this:_self,
    		canvasId: canvasId,
    		type: 'area',
        color:['#5087EC','#68BBC4'],
    		fontSize:11,
    		padding:[0,15,10,15],
    		legend:{
    			show:true,
    			position:'top',
    			float:'center',
    			itemGap:30,
    			padding:5,
    			lineHeight:18,
    			margin:0,
    		},
    		dataLabel:false,
    		dataPointShape:true,
    		background:'#FFFFFF',
    		pixelRatio:_self.pixelRatio,
    		categories: chartData.categories,
    		series: chartData.series,
    		animation: true,
    		xAxis: {
    			type:'grid',
    			gridColor:'#CCCCCC',
    			gridType:'dash',
    			dashLength:8,
    		},
    		yAxis: {
    			gridType:'dash',
    			gridColor:'#CCCCCC',
    			dashLength:8,
    			splitNumber:5,
    		},
    		width: _self.cWidth*_self.pixelRatio,
    		height: _self.cHeight*_self.pixelRatio,
    		extra: {
    			area:{
    				type: 'straight',
    				opacity:0.2,
    				addLine:true,
    				width:2,
    				gradient:false
    			}
    		}
    	});

    },
    touchArea(e) {
    	canvaArea.touchLegend(e);
    	canvaArea.showToolTip(e, {
    		format: function (item, category) {
    			return category + ' ' + item.name + ':' + item.data
    		}
    	});
    },
    changeData(){
    	if(isJSON(_self.textarea)){
    		let newdata=JSON.parse(_self.textarea);
    		canvaArea.updateData({
    			series: newdata.series,
    			categories: newdata.categories
    		});
    	}else{
    		uni.showToast({
    			title:'数据格式错误',
    			image:'../../../static/images/alert-warning.png'
    		})
    	}
    },
    getColumnData(){
      let LineB={
              "categories": ["9.1","9.2","9.3","9.4","9.5","9.6"],
              "series": [
                  {
                      "name": "文章阅读量",
                      "data": [35,8,25,37,4,20]
                  },
                  {
                      "name": "视频播放量",
                      "data": [70,40,65,100,44,68]
                  }
              ]
          }
          _self.textareaB = JSON.stringify(LineB);
          _self.showLineB("canvasLineB",LineB);
    },
    showLineB(canvasId,chartData){
    	canvaLineB=new uCharts({
    		$this:_self,
        pixelRatio:_self.pixelRatio,
        categories: chartData.categories,
        series: chartData.series,
        width: _self.bWidth*_self.pixelRatio,
        height: _self.bHeight*_self.pixelRatio,
    		canvasId: canvasId,

    		type: 'column',
        colors:['#2478F2', '#84B7F9', '#5F9CF8', '#90ed7d'],
    		fontSize:12,
    		padding:[0,0,0,0],
    		legend:{
    			show:true,
    			margin:3,
          position:'top',
          fontSize:11,
          borderWidth:1,
    		},
    		dataLabel:true,
    		dataPointShape:true,
    		background:'#FFFFFF',

    		animation: false,
    		xAxis: {
    			type:'grid',
    			gridColor:'#CCCCCC',
    			gridType:'solid',
    			disableGrid:true
    		},
    		yAxis: {
    			gridType:'dash',
    			gridColor:'#CCCCCC',
          "dashLength": 2,
    		},
    		extra: {
    			line:{
    				type: 'straight',
            width:1,
    			},
          tooltip: {
            showBox: true,
          }
    		}
    	});

    },
    touchLineB(e) {
    	lastMoveTime=Date.now();
    },
    moveLineB(e){
    	let currMoveTime = Date.now();
    	let duration = currMoveTime - lastMoveTime;
    	if (duration < Math.floor(1000 / 60)) return;//每秒60帧
    	lastMoveTime = currMoveTime;

    	let currIndex=canvaLineB.getCurrentDataIndex(e);
    	if(currIndex>-1&&currIndex<canvaLineB.opts.categories.length){
    		let riqi=canvaLineB.opts.categories[currIndex];
    		let leibie=canvaLineB.opts.series[0].name;
    		let shuju=canvaLineB.opts.series[0].data[currIndex];
    		this.Interactive=leibie+':'+riqi+'-'+shuju+'元';
    	}
    	canvaLineB.showToolTip(e, {
    		format: function (item, category) {
    			return category + ' ' + item.name + ':' + item.data
    		}
    	});
    },
    touchEndLineB(e){
    	let currIndex=canvaLineB.getCurrentDataIndex(e);
    	if(currIndex>-1&&currIndex<canvaLineB.opts.categories.length){
    		let riqi=canvaLineB.opts.categories[currIndex];
    		let leibie=canvaLineB.opts.series[0].name;
    		let shuju=canvaLineB.opts.series[0].data[currIndex];
    		this.Interactive=leibie+':'+riqi+'-'+shuju+'元';
    	}
    	canvaLineB.touchLegend(e);
    	canvaLineB.showToolTip(e, {
    		format: function (item, category) {
    			return category + ' ' + item.name + ':' + item.data
    		}
    	});
    },
    changeData(){
    	if(isJSON(_self.textarea)){
    		let newdata=JSON.parse(_self.textarea);
    		canvaLineB.updateData({
    			series: newdata.series,
    			categories: newdata.categories
    		});
    	}else{
    		uni.showToast({
    			title:'数据格式错误',
    			image:'../../../static/images/alert-warning.png'
    		})
    	}
    },
    getServerData(){

    						// let LineA={categories:[],series:[]};
    						// //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
    						// LineA.categories=res.data.data.LineA.categories;
    						// LineA.series=res.data.data.LineA.series;
                let LineA={
                        "categories": ["9.1","9.2","9.3","9.4","9.5","9.6"],
                        "series": [
                            {
                                "name": "文章阅读量",
                                "data": [35,8,25,37,4,20]
                            },
                            {
                                "name": "视频播放量",
                                "data": [70,40,65,100,44,68]
                            },
                            {
                                "name": "视频播放量",
                                "data": [45,33,17,90,64,88]
                            },
                            {
                                "name": "视频播放量",
                                "data": [10,50,75,88,87,99]
                            },
                            {
                                "name": "视频播放量",
                                "data": [23,44,55,66,77,88]
                            },
                        ]
                    }
    						//第二根线为虚线的设置
    						// LineA.series[1].lineType='dash';
    						// LineA.series[1].dashLength=10;
    						_self.textarea = JSON.stringify(LineA);
    						_self.showLineA("canvasLineA",LineA);

    			},
    			showLineA(canvasId,chartData){
            console.log("chartData",chartData)
    				canvaLineA=new uCharts({
    					$this:_self,
              pixelRatio:_self.pixelRatio,
              categories: chartData.categories,
              series: chartData.series,
              width: _self.cWidth*_self.pixelRatio,
              height: _self.cHeight*_self.pixelRatio,
    					canvasId: canvasId,

    					type: 'line',
              colors:['#EE752F', '#F2BD42', '#17D2C5', '#68BBC4','#5087EC'],
    					fontSize:12,
    					padding:[0,0,0,0],
    					legend:{
    						show:true,
    						margin:3,
                position:'top',
                fontSize:11,
                borderWidth:1,
    					},
    					dataLabel:true,
    					dataPointShape:true,
    					background:'#FFFFFF',

    					animation: false,
    					xAxis: {
    						type:'grid',
    						gridColor:'#CCCCCC',
    						gridType:'solid',
    						disableGrid:true
    					},
    					yAxis: {
    						gridType:'dash',
    						gridColor:'#CCCCCC',
                "dashLength": 2,
    					},
    					extra: {
    						line:{
    							type: 'straight',
                  width:1,
    						},
                tooltip: {
                  showBox: true,
                }
    					}
    				});

    			},
    			touchLineA(e) {
    				lastMoveTime=Date.now();
    			},
    			moveLineA(e){
    				let currMoveTime = Date.now();
    				let duration = currMoveTime - lastMoveTime;
    				if (duration < Math.floor(1000 / 60)) return;//每秒60帧
    				lastMoveTime = currMoveTime;

    				let currIndex=canvaLineA.getCurrentDataIndex(e);
    				if(currIndex>-1&&currIndex<canvaLineA.opts.categories.length){
    					let riqi=canvaLineA.opts.categories[currIndex];
    					let leibie=canvaLineA.opts.series[0].name;
    					let shuju=canvaLineA.opts.series[0].data[currIndex];
    					this.Interactive=leibie+':'+riqi+'-'+shuju+'元';
    				}
    				canvaLineA.showToolTip(e, {
    					format: function (item, category) {
    						return category + ' ' + item.name + ':' + item.data
    					}
    				});
    			},
    			touchEndLineA(e){
    				let currIndex=canvaLineA.getCurrentDataIndex(e);
    				if(currIndex>-1&&currIndex<canvaLineA.opts.categories.length){
    					let riqi=canvaLineA.opts.categories[currIndex];
    					let leibie=canvaLineA.opts.series[0].name;
    					let shuju=canvaLineA.opts.series[0].data[currIndex];
    					this.Interactive=leibie+':'+riqi+'-'+shuju+'元';
    				}
    				canvaLineA.touchLegend(e);
    				canvaLineA.showToolTip(e, {
    					format: function (item, category) {
    						return category + ' ' + item.name + ':' + item.data
    					}
    				});
    			},
    			changeData(){
    				if(isJSON(_self.textarea)){
    					let newdata=JSON.parse(_self.textarea);
    					canvaLineA.updateData({
    						series: newdata.series,
    						categories: newdata.categories
    					});
    				}else{
    					uni.showToast({
    						title:'数据格式错误',
    						image:'../../../static/images/alert-warning.png'
    					})
    				}
    			},
    //获取认证信息
    // getAuthentication(){
    //   var data ={
    //     ignore:true
    //   }
    //   WXAJAX.POST(data,'','/company/getCompany','','').then(res=>{
    //     if(res.isCompanyAuth != "1"){
    //         uni.showModal({
    //             title: '认证功能',
    //             content: '浏览此页面需要先认证',
    //             cancelText:'返回首页',
    //             confirmText:'前往认证',
    //             success: function (res) {
    //                 if (res.confirm) {
				// 		let companyId =  wx.getStorageSync('SELFCOMPANYID') ? wx.getStorageSync('SELFCOMPANYID') : wx.getStorageSync('COMPANYID');
    //                     let url='H5/webView?H5title=申请认证&url=https://wx.mingyicloud.com/app/myy/certmgmt.nsf/personcertFXMopenformFxMcompanyIdFxm'+companyId+'FxMidFxm3';
    //                      wx.navigateTo({ url: "/pages/" + url });
    //                 } else if (res.cancel) {
    //                     console.log('用户点击取消');
    //                     uni.navigateTo({
    //                         url: '/pages/find/index'
    //                     });
    //                 }
    //             }
    //         });
    //     }
    //   })
    // },
    //查询订阅消息
    getSubscription(){
      WXAJAX.POST({companyId :  WXAJAX.smartMainId},'','/subscription/getComanySub',null,"/pages/index/main",'','','', "1").then(data => {
        //存放到store
        this.setSubscriptionNew(data);
      });
    },
    init(){
      let params = {
        ignore: true,
        cardId: wx.getStorageSync('SELFCARDID'),
      };
      WXAJAX.POST(params, '', '/businessCard/cardDetails','','',2, "1").then((data) => {
        wx.setStorageSync('isBoss' , data.roleId != 0 ) ;
        // wx.setStorageSync('SELFCOMPANYID', data.companyId);/*id*/
        // wx.setStorageSync('SELFCARDID', data.cardId);/*id*/
        // wx.setStorageSync('userId', data.userId);/*id*/
        if(!data||data.isMyCard==1){
          wx.clearStorageSync();
        }
      })
      WXAJAX.POST(params, '', '/businessCard/getCompanyUserInfo','','','', "1").then((data) => {
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
        } else {
          this.hasCard = false;
        }
      }).catch((err) => {
      });
    },
    //scrollview滚动到底部
    lower () {

      if (this.type1_id === 0 && this.$refs.ai) {
        this.$refs['ai'].getVisitRank(true);
      }
    },
    //scrollview滚动到顶部
    scrolltoupper(){
      this.$refs['ai'].getVisitRank(false,'',1);

    },
    //计算高度
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

    getInits () {
      if (this.notYetLogin) {
        this.notYetLogin = false;
        return;
      }
      let v = this,
        params = {};

      if (v.isLoading) {
        wx.hideLoading();
        return;
      }
      v.isLoading = true;

      // entranceType : 入口类型（1:时间追踪，2：行为追踪，3：ai分析,4,成交率）
      // seeType :  查看类型 1:名片，2:产品，3：官网,4:查看动态
      if (this.type1_id == 0) {
        //智能追踪
        if (this.type2_id == 0) {
          params.entranceType = 1;
        } else if (this.type2_id == 1) {
          params.entranceType = 2;
          params.seeType = this.type3_id;
        }
      } else if (this.type1_id == 1) {
        //AI分析
        params.entranceType = 3;
        params.seeType = this.type2_id;
        setTimeout(function () {

          v.$refs['customer'].getCount();
        }, 200);

      } else if (this.type1_id == 2) {
        //成交率
        params.entranceType = 4;
        //params.seeType = 2;
      }else if (this.type1_id == 3) {
        //跟进记录
        params.entranceType = 5;
        //params.seeType = 2;
      }else if (this.type1_id == 4) {
        //数据统计
        params.entranceType = 6;
        //params.seeType = 2;
      }
      params.pageNum = v.page;
      console.log("params", params);
      wx.showLoading();
      WXAJAX.POST(
        params,
        "",
        "/seeRecord/getSeeRecordList",
        null,
        "","","1"
        // "/pages/index/main"
      )
        .then((data, code) => {
          wx.hideLoading();
          if (data) {
            let today = new Date(),
              year = today.getFullYear(),
              month = today.getMonth() + 1,
              day = today.getDate(),
              item = {},
              _datas = {},
              _length = v.lists.length,
              _lastFullTime = 0;

            if (v.type1_id == 0) {
              // 智能追踪， 分时间显示
              _length != 0 &&
                (_lastFullTime = v.lists[_length - 1][0].fullTime);
              let tmp = JSON.parse(JSON.stringify(v.ai_lists));
              data.forEach(function (i, k) {
                var time = new Date(i.createTime),
                  fullTime =
                    time.getFullYear() +
                    "" +
                    (time.getMonth() + 1) +
                    "" +
                    time.getDate(),
                  showTime = "",
                  info = "";
                if (time.getFullYear() < year) {
                  //今年之前
                  showTime =
                    time.getFullYear() +
                    "-" +
                    (time.getMonth() + 1) +
                    "-" +
                    time.getDate();
                } else {
                  //今年
                  if (time.getMonth() + 1 == month) {
                    if (time.getDate() == day) {
                      //今天
                      showTime = "今天";
                    } else if (time.getDate() + 1 == day) {
                      //昨天
                      showTime = "昨天";
                    } else {
                      showTime = time.getMonth() + 1 + "-" + time.getDate();
                    }
                  } else {
                    showTime = time.getMonth() + 1 + "-" + time.getDate();
                  }
                }

                if (i.ranking < 3) {
                  info = v.seeType[i.seeType][1];
                } else {
                  info = v.seeType[i.seeType][4];
                }

                item = Object.assign(i, {
                  fullTime: fullTime, //年月日
                  time: showTime, //页面显示时间
                  logo: i.logo,
                  see: v.seeType[i.seeType].title,
                  action: "查看",
                  num: i.num,
                  hour:
                    time
                      .getHours()
                      .toString()
                      .padStart(2, "0") +
                    ":" +
                    time
                      .getMinutes()
                      .toString()
                      .padStart(2, "0"),
                  info: info
                });

                if (tmp[showTime]) {
                  tmp[showTime].push(item);
                } else {
                  tmp[showTime] = [item];
                }
                //
                //   if(_lastFullTime == fullTime){
                //     v.lists[_length-1].push(item);
                //   }else{
                //     if (_datas[fullTime]) {
                //       _datas[fullTime].push(item);
                //     } else {
                //       _datas[fullTime] = [];
                //       _datas[fullTime].push(item);
                //     }
                //   }
              });
              v.ai_lists = tmp;

              v.lists = Object.keys(v.ai_lists);
              // console.log(_datas)

              // var newkey = Object.keys(_datas);
              // //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
              // var newObj = {};//创建一个新的对象，用于存放排好序的键值对
              // for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
              //   newObj[newkey[i]] = _datas[newkey[i]];//向新创建的对象中按照排好的顺序依次增加键值对
              // }

              // _datas = [];
              // for (var i in newObj) {
              //   _datas.push(newObj[i]);
              // }
              // _datas = _datas.reverse();
              // v.lists = [...v.lists, ..._datas];
            } else {
              _datas = [];
              data.forEach(function (i, k) {
                var time = new Date(i.createTime),
                  info = "";
                if (i.ranking < 3) {
                  info = v.seeType[i.seeType][1];
                } else {
                  info = v.seeType[i.seeType][4];
                }

                item = Object.assign(i, {
                  logo: i.logo,
                  see: v.seeType[i.seeType].title,
                  action: "查看",
                  num: i.num,
                  hour: time.getHours() + ":" + time.getMinutes(),
                  rate: i.rate ? (i.rate * 100).toFixed(2) + "%" : "",
                  info: info,
                  userId: i.userId,
                  entranceType: params.entranceType
                });
                // console.log(item)
                _datas.push(item);
              });
              v.lists = [...v.lists, ..._datas];
            }
            v.page++;
            setTimeout(function () {
              v.isLoading = false;
            }, 500);
          } else if (code == 209) {
          } else {
            v.nodata = true;
          }
          setTimeout(function () {
            v.isLoading = false;
          }, 500);
        })
        .catch(err => {
          console.log(err);
          wx.hideLoading();
          if (err.code == 403) {
          }
          setTimeout(function () {
            v.isLoading = false;
          }, 500);
        });
    },
    type1_tap (id) {
      authSubscribeMessage(this.subscriptionNew);
      //设置滚动条位置, 先设置1 再延迟设置为0 是因为mpvue检测到数据没有发生变化 是不会真正去改变值，导致scrollview滚动到顶部失效
      this.scrollTop = 1;
      setTimeout(() => {
        this.scrollTop = 0;
      }, 50);
      this.type1_id = id;
      if (this.menu[id]) {
        this.type2_id = this.menu[id][0].id;
      }
      if (id == 0) {
        this.type = 1;
      } else {
        this.type = 5;
      }
      this.nodata = false;
      this.lists = [];
      this.ai_lists = {};
      this.page = 1;
      this.isLoading = false;
      this.getInits();
    },
  }
};
</script>

<style scoped>
.radar {
  height: 100%;
  overflow: hidden;
}
.navgation-title {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
.radar_menu .menu-content {
  display: flex;
  justify-content: space-between;
  padding-top: 38upx;
}
.radar_menu .meu-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.radar_menu .active {
  background-color: #fff;
  width: 32upx;
  height: 8upx;
  flex-grow: 1;
  /* padding-bottom: 20upx;
  border-bottom: 4upx solid #fff; */
}
.notice-ws-num {
  position: absolute;
  bottom: -30upx;
  left: 30upx;
  z-index: 10;
}
.content {
  overflow: auto;
}
.ai,
.behavior,
.closing {
  position: relative;
  /* margin-top: -20upx; */
  transform: translateY(-20upx);
}
.work{
  width:630rpx;
  height:310rpx;
  margin: 30rpx;
  border-radius: 12rpx;
  color: rgba(16, 16, 16, 100);
  font-size: 28rpx;
  box-shadow: 0px 2px 12px 0px rgba(16, 16, 16, 17);
  font-family: Arial;
  padding: 20rpx 30rpx;
}
.workTitle{
  color: rgba(16, 16, 16, 100);
  font-size: 32rpx;
  text-align: left;
  font-family: PingFangSC-regular;
  font-weight: bold;
}
.workNav{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 40rpx;
}
.workevery{
  width: 100rpx;
  height:160rpx;
}
.workImg{
  width: 84rpx;
  height: 84rpx;
  background-color: rgba(0, 201, 255, 100);
  box-shadow: 0px 2px 6px 0px rgba(0, 201, 255, 100);
  margin-bottom: 18rpx;
  margin-left: 8rpx;
  border-radius:50%;
}
.workImg image{
  width: 54rpx;
  height: 54rpx;
  margin-top: 15rpx;
  margin-left: 15rpx;
}
.workText{
  color: rgba(0, 0, 0, 1);
  font-size: 24rpx;
  text-align: center;
  font-family: PingFangSC-regular;
}
.client{
  width: 690rpx;
  margin-left: 30rpx;
}
.clientTitle{
  display: flex;
  justify-content: space-between;
  margin-bottom: 20rpx;
}
.clientlist{
  width: 630rpx;
  height: 276rpx;
  padding: 30rpx;
  box-shadow: 2rpx 2rpx 2rpx 2rpx rgba(0, 0, 0, 0.4);
  margin-bottom: 56rpx;
}
.clienttop{
  display: flex;
}
.clientImg{
  width: 94rpx;
  height: 94rpx;
  border-radius: 50%;
}
.clientImg image{
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.clientmain{
  width: 250rpx;
  height: 94rpx;
  margin-left: 28rpx;
}
.clientbtn{
  width: 156rpx;
  height: 68rpx;
  line-height: 68rpx;
  border-radius: 6rpx;
  background-color: rgba(0, 215, 200, 100);
  color: #FFFFFF;
  font-size: 28rpx;
  text-align: center;
  font-family: Arial;
  margin-left: 94rpx;
  margin-top: 13rpx;
}
.clientBottom{
  display: flex;
}
.clientBtn{
  width: 156rpx;
  height: 68rpx;
  line-height: 68rpx;
  border-radius: 6rpx;
  background-color: rgba(255, 255, 255, 100);
  color: #00D7C8;
  font-size: 28rpx;
  text-align: center;
  font-family: Arial;
  border: 1px solid rgba(0, 215, 200, 100);
  margin-left: 200rpx;
}
.mainData{
  width: 690rpx;
  padding: 0 30rpx;
  background-color: #FFFFFF;
}
.lineTitle{
  color: rgba(16, 16, 16, 100);
  font-size: 28rpx;
  font-family: PingFangSC-semiBold;
  font-weight: bold;
}
.lineEarchts{
  width: 690rpx;
  height: 400rpx;
  margin: 30rpx 0;
}
.columnEarchts{
  width: 690rpx;
  height: 600rpx;
  margin: 30rpx 0;
}
.circleEarchts{
  width: 690rpx;
  height: 530rpx;
  margin: 30rpx 0;
}
.showEarchts{
  width: 690rpx;
  height: 600rpx;
  margin: 30rpx 0;
}
</style>
