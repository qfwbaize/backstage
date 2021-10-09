<template>
  <div>
   
    <div v-show="pandect_show">
      <div class="select-echarts bgfff">
        <span  
        v-for="(item,index) in echartsSwitch" 
        :key="index"
        :class="currentIndex == index ? 'isselect-echarts' :''"
        @click="selectEcharts(index)"
        >
          {{item.name}}
        </span> 
      </div> 
       
      <!--客户统计-->
      <div class="textc bgfff fs16 c38 fbold pt37 posre" style="position:relative;">
          <span 
            class="statisticsTitle"
            v-for="(item,index) in echartsSwitch"
            :key="index"
            :class="currentIndex == index ? 'show-Title' :''"
            >{{item.dec}}</span>
      </div>
      <!-- 选择时间 -->
      <div class="select-time bgfff">
      <span  
      v-for="(item,index) in statistical_time" 
      :key="index"
      :class="currentTime == index ? 'isselect-time' :''"
      @click="selectTime(index,item.id)"
      >
        {{item.name}}
      </span> 
      </div> 
       <div class="echarts-box">
        <!--新增客户数-->
        <div class="echarts-list" :class="currentIndex == 0 ? 'isShow-list' : ''">
          <div class="disflex jsbet pl40 pr40 pr15 fs14 ca8 lh26 bgfff textc">
          </div>
          <div class="w100p h200 borderbox bgfff disflex align-cen pl5">
            <mpvue-echarts class="ec-canvas" @onInit="handleNewClientInit" canvasId="new_client" ref="new_client"/>
          </div>  
        </div>  
        <!--咨询客户数-->
        <div class="echarts-list"  :class="currentIndex == 1 ? 'isShow-list' : ''">
          <div class="disflex jsbet pl40 pr40 pr15 fs14 ca8 lh26 bgfff textc">
          </div>
          <div class="w100p h200 borderbox bgfff disflex align-cen pl5">
            <mpvue-echarts class="ec-canvas" @onInit="handleConsultClientInit" canvasId="consult_client" ref="consult_client"/>
          </div>  
        </div>  
        
        <!--跟进客户数-->
        <div class="echarts-list"  :class="currentIndex == 2 ? 'isShow-list' : ''">
          <div class="disflex jsbet pl40 pr40 pr15 fs14 ca8 lh26 bgfff textc">
          </div>
          <div class="w100p h200 borderbox bgfff disflex align-cen pl5">
            <mpvue-echarts class="ec-canvas" @onInit="handleFollowClientInit" canvasId="follow_client" ref="follow_client"/>
          </div>
        </div>  
        
        <!--近15日客户活跃度-->
        <div class="echarts-list"  :class="currentIndex == 3 ? 'isShow-list' : ''">
          <div class="w100p h243 borderbox bgfff disflex align-cen pl5">
            <mpvue-echarts class="ec-canvas" @onInit="handleActiveClientInit" canvasId="active_client" ref="active_client"/>
          </div>
        </div>  
      </div>
      
      

    </div>

    <div :style="{height : active_show ? 'auto' : '0'}" class="trans2 overhidden">
      <!--客户兴趣-->
      <div>
        <div class="disflex bgfff jsbet pl15 pr15">
          <TitleSlot title="客户兴趣"
                subtitle="DATE">
          </TitleSlot>
          <span class="fs15 c38"></span>
          <span class="be8 lh25 pl9 pr10 bradius3 fs12 c80"
                @click="chooseTimeShow=!chooseTimeShow">
                        {{clientLikeTime}}
              <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/down.png" alt=""
                                class="w10 h10" />
                    </span>
        </div>
        <div class="w100p h200">
          <mpvue-echarts class="ec-canvas" @onInit="handleLikeInit" canvasId="like_client" ref="like_client"/>
        </div>
        <div class="bgfff btf7 pt19 pb19 w100p disflex jsbet pl15 pr15 fs12 ca8 borderbox">
          <div class="disflex align-cen">
            <span class="w10 h10 bgorange bradius50p mr6"></span>
            <span>对{{menu_id == 2 ? '成员' : '我'}}感兴趣</span>
          </div>
          <div class="disflex align-cen">
            <span class="w10 h10 bgyellow bradius50p mr6"></span>
            <span>喜欢产品</span>
          </div>
          <div class="disflex align-cen">
            <span class="w10 h10 bggreen bradius50p mr6"></span>
            <span>关注动态</span>
          </div>
          <div class="disflex align-cen">
            <span class="w10 h10 bgblue bradius50p mr6"></span>
            <span>看重机构</span>
          </div>
        </div>
      </div>

      <div class="bgfff">
        <div class="pl15 pr15">
          <TitleSlot 
            :title="interactionTitle "
            subtitle="DATE">
          </TitleSlot>
        </div>
        <p class="fs14 c38 fbold textc lh44"></p>
        <div class="pl17 pr24 fs12 ca8 pt15 pb16">
          <!-- 咨询产品 -->
          <div class="disflex jsbet">
            <div class="disflex align-cen w70">
              <span class="pr18">咨询产品</span>
            </div>
            <div class="line-out pr18">
              <b class="h8 bradius4 bgblue"
                 :style="{width:customerInteract[0]/customerInteractMax*100 + '%'}"></b>
            </div>
            <span>{{customerInteract[0]}}</span>
          </div>
          <!-- 保存名片 -->
          <div class="disflex jsbet pt14">
            <div class="disflex align-cen w70">
              <span class="pr18">拨打电话</span>
            </div>
            <div class="line-out pr18">
              <b class="h8 bradius4 bgblue"
                 :style="{width:customerInteract[1]/customerInteractMax*100 + '%'}"></b>
            </div>
            <span>{{customerInteract[1]}}</span>
          </div>
          <!-- 保存电话 -->
          <div class="disflex jsbet pt14">
            <div class="disflex align-cen w70">
              <span class="pr18">分享产品</span>
            </div>
            <div class="line-out pr18">
              <b class="h8 bradius4 bgblue"
                 :style="{width:customerInteract[2]/customerInteractMax*100 + '%'}"></b>
            </div>
            <span>{{customerInteract[2]}}</span>
          </div>
          <!-- 拨打电话 -->
          <div class="disflex jsbet pt14">
            <div class="disflex align-cen w70">
              <span class="pr18">转发动态</span>
            </div>
            <div class="line-out pr18">
              <b class="h8 bradius4 bgblue"
                 :style="{width:customerInteract[3]/customerInteractMax*100 + '%'}"></b>
            </div>
            <span>{{customerInteract[3]}}</span>
          </div>
          <!-- 机构点赞 -->
          <div class="disflex jsbet pt14">
            <div class="disflex align-cen w70">
              <span class="pr18">评论</span>
            </div>
            <div class="line-out pr18">
              <b class="h8 bradius4 bgblue"
                 :style="{width:customerInteract[4]/customerInteractMax*100 + '%'}"></b>
            </div>
            <span>{{customerInteract[4]}}</span>
          </div>

        </div>
        <!-- <div class="w100p h200 borderbox bgfff disflex align-cen pl5">
          <mpvue-echarts class="ec-canvas"
                     @onInit="handleCustomerinteraction"
                     canvasId="interaction_client"
                     ref="interaction_client" />
          </div>   -->
      </div>

      <div class="bgfff acitveRecord" v-if="type == 'memberAnalyze' && tab_id == 1">
        <p class="fs14 c38 fbold textc lh44">互动记录</p>
        <Log :logs="acitveRecord" :istop="1" :type="'2'"></Log>
      </div>

    </div>

    <!--跟进记录-->
    <div v-if="logs_show" class="bgfff pt20">
      <Log :isTopTitle="1" :logs="followLogs"></Log>
    </div>

    <!--客户统计时间选择-->
    <div v-if="chooseTimeShow0">
      <SelectorOne
        :title="'客户统计时间选择'"
        :status="chooseTimeShow0"
        :allClass="statistical_time"
        :choose_id="choose_statistical_time"
        @closeModal="chooseTimeShow=false"
        @choose_tap="chooseTime0"
      ></SelectorOne>
    </div>

    <!--客户兴趣时间选择-->
    <div v-if="chooseTimeShow">
      <SelectorOne
        :title="'选择添加内容'"
        :status="chooseTimeShow"
        :allClass="like_time"
        :choose_id="choose_like_time"
        @closeModal="chooseTimeShow=false"
        @choose_tap="chooseTime"
      ></SelectorOne>
    </div>

  </div>
</template>

<script>

  import echarts from 'echarts/dist/echarts.min'
  import TitleSlot from "@/components/TiTleSlot";
  import mpvueEcharts from '@/components/Echarts'
  import Log from '@/components/log' //
  import WXAJAX from '../utils/request'
  import util from '../utils/index'
  import StaticResources from '@/components/StaticResources';
  import SelectorOne from '@/components/selectorOne' // 订单项

  let echart_new = null,
    echart_consult = null,
    echart_follow = null,
    echart_seven = null,
    echart_activeCustomer = null,
    echart_seeType = null;

  export default {
    name: "personalOverview",
    components: {mpvueEcharts, Log, SelectorOne, StaticResources,TitleSlot},
    props: ['type', 'menu_id' ,'loadMore', 'isChange','customerInteract','customerInteractMax'],
    data() {
      return {
        echarts,
        chooseMonth: '2019-02',//本月业绩选择的时间
        personalDataEndTime: '',
        personalData: {},
        menus: [
          {title: '汇总', id: 0},
          {title: '昨日', id: 1},
          {title: '近7天', id: 7},
          {title: '近30天', id: 30},
        ],
        echartsSwitch:[
          {name:'新增',dec:'新增客户数'},
          {name:'咨询',dec:'咨询客户数'},
          {name:'跟进',dec:'跟进客户数'},
          {name:'活跃度',dec:'近15日客户活跃度'}
        ],
        currentIndex:0,
        currentTime:0,
        menu2_id: 0,
        interactionTitle:'客户与我的互动',
        choose_statistical_time: 7,
        choose_like_time: 7,
        statistical_time: [
          {name: '近七天', id: 7},
          {name: '近15天', id: 15},
          {name: '近30天', id: 30},
        ],
        like_time: [
          {name: '近七天', id: 7},
          {name: '近15天', id: 15},
          {name: '近30天', id: 30},
        ],
        // 客户统计时间选择
        chooseTimeShow0: false,
        clientStatisticalTime: '近七天',
        // 客户兴趣时间选择
        chooseTimeShow: false,
        clientLikeTime: '近七天',
        default_options: {
          baseSet: {
            backgroundColor: "rgba(255,255,255,0)",
            title: {
              show: false
            },
            legend: {
              show: false
            },
          },
          color: [
            "#3FB1E3",
            "#6BE6C1",
            "#FFCC01",
            "#6B769F"
          ],
          color2: [
            "#51CBCD",
            "#6BE6C1",
            "#FFCC01",
            "#6B769F"
          ],
          yAxis: {
            type: 'value',
            minInterval: '1',
            axisLabel: {
              formatter: function (val,idx) {
                let showNum = val;
                let unit = '';
                if (val>100000000) {
                  unit = '亿';
                  showNum = (val/100000000).toFixed(1);
                } else if (val > 10000){
                  unit = '万';
                  showNum = (val/10000).toFixed(1);
                }

                return showNum+unit;
              },
            },

            nameTextStyle: {
              color: '#B2B2B2'
            },
            axisLine: {
              lineStyle: {
                color: '#B2B2B2'
              }
            },
            splitLine: {
              show: false
            },
          },
          series: {
            itemStyle: {
              normal: {
                borderWidth: "1"
              }
            },
            lineStyle: {
              normal: {
                width: "2"
              },
            },
            symbolSize: "4",
            symbol: "emptyCircle",
            smooth: true
          }
        },
        dataSummary: {
          data: {},
          diff: {},
        },
        turnoverRate: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          width: [],
          rate: [],
          max: 0,
        },//成交率漏斗
        turnColor: {
          0: 'bgviolet',
          1: 'bglightblue',
          2: 'bglightgreen',
          3: 'bgpaleyellow',
        },
        UV: '',
        PV: '',
        logs_num: '',
        talks_num: '',
        interestType:['咨询产品','拨打电话','分享产品','转发动态','评论'],
        tabs: [//成员分析时的tab
          {title: '个人总览', id: 0},
          {title: '互动详情', id: 1},
          {title: '跟进记录', id: 2},
        ],
        tab_id: 0,
        pandect_show: false,//总览
        active_show: false,//互动详情
        logs_show: false,//跟进记录
        acitveRecord: [{time:[]}],//互动记录
        interactPage:1,//互动记录页数
        page: 1,
        isLoading: false,//是否在加载newCustomerNum
        nodata: false,//是否已经没有数据
        followLogs: [],
        followPage:1,//跟进记录页数
        cardId: 0,
        userId: 0,
        cardMsg: {},
        seeType: {
          1: {
            title: '名片',
            1: '现在沟通，效率更高哦',
            4: '成交有望'
          },
          2: {
            title: '产品',
            1: '尽快把握商机',
            4: '可标注为重点客户',
          },
          3: {
            title: '官网',
            1: '有望合作',
            4: '可标注为重点客户',
          },
          4: {
            title: '动态',
            1: '合作意向很强烈',
            4: '成单在望',
          }
        },

        customerInteract: [],//客户互动
        customerInteractMax: 0,
      }
    },
    watch: {
      'menu_id': function (newVal, oldVal) {
        if(newVal == 2){
          this.interactionTitle = '客户与机构互动'
        }
        if (this.type == 'enterprise') {//机构页面
          this.getPersonalData();
          this.getSevenData();
          this.getNewCustomerNum();//新增客户数
          this.chart_follow_client();//跟进客户数
          this.chart_like('1');
          this.getCustomerAnalysis();//客户与我、机构的互动
        }
      },
      'loadMore':function (newVal, oldVal) {
        console.log(newVal ) ;
        console.log(this.tab_id);
        if(this.tab_id == 1){//互动记录
          this.getSeeRecordList() ;
        }else if(this.tab_id == 2){//跟进记录
          this.getFollowLog();
        }
      },
      isChange: {
        handler(){
          this.inits();
        },
        deep: true,
      },
    },
    mounted() {
      echart_new = null;
      echart_consult = null;
      echart_follow = null;
      echart_seven = null;
      echart_activeCustomer = null;
      echart_seeType = null;

      this.userId = wx.getStorageSync('memberUserId') || 0;
      this.cardId = wx.getStorageSync('memberCardId') || 0;

      if (this.type == 'memberAnalyze') {
        this.pandect_show = true;
        this.active_show = false;
        this.logs_show = false;
      } else {
        this.pandect_show = true;
        this.active_show = true;
        this.logs_show = false;
      }

      let newDate = new Date(),
        endTime = newDate.getFullYear() + '-' + ('0' + (newDate.getMonth() + 1)).slice(-2);
      this.personalDataEndTime = endTime;
      this.chooseMonth = endTime;

    },
    onShow(){

    },
    methods: {
      getFollowLog() {//获取跟进记录
        let v = this;
        if (v.isLoading) {
          return
        }
        v.isLoading = true;

        // wx.showLoading();
        WXAJAX.POST({
          cardId: this.cardId,
          pageNum: this.followPage,
        }, '', '/followRecord/getFollowList').then((data) => {

          wx.hideLoading();
          if (data) {
            data.forEach(function (i, k) {
              i.followRemark = JSON.parse(i.followRemark);
              i.infoText = i.followRemark.data;
              i.time = util.getdate(i.createTime, 'monthTime');
              i.time = i.time.split(' ');
              // 1 -- 设置标签
              // 2 -- 修改客户共享范围
              // 3 -- 手动添加为客户
              // >= 4 -- 直接显示数据( 1 -- 电话 ， 2 -- 微信 ， 3 -- 手动添加 ， 4 -- 当面拜访 ， 5 -- 其他)
              if (i.followType) {
                switch (i.followType) {
                  case 1 :
                    i.mark = '电话拜访';
                    i.name = i.followName;
                    break;
                  case 2 :
                    i.mark = '微信拜访';
                    i.name = i.followName;
                    break;
                  case 3 :
                    i.mark = i.followName;
                    i.name = '';
                    break;
                  case 4 :
                    i.mark = '当面拜访';
                    i.name = i.followName;
                    break;
                  case 5 :
                    i.mark = i.followName;
                    break;
                }
                i.infoType = 3 + i.followType;
              } else {
                i.infoType = i.followRemark.type;
              }
            });
            v.followLogs = [...v.followLogs, ...data];
            v.followPage++;
          }
          setTimeout(function () {
            v.isLoading = false;
          }, 500);
        }).catch((err) => {
          console.log(err);
          wx.hideLoading();
          if (err.code == 204) {
            v.nodata = true;
          }
          setTimeout(function () {
            v.isLoading = false;
          }, 500);
        });
      },
      inits() {
        // wx.showLoading();
        this.getPersonalData();//个人数据统计/机构数据统计
        setTimeout(() => {
          this.getDataSummary(); //数据汇总
        }, 500);
        setTimeout(() => {
          this.getTurnoverRate();//成交率漏斗
        }, 1000);
        this.getCustomerAnalysis();//客户与我、机构的互动
        if (this.type == 'enterprise') {//机构页面

        } else {//成员分析
          // this.getSeeRecordList();//互动记录
        }
        setTimeout(function () {
          wx.hideLoading();
        }, 5000)
      },
      getSeeRecordList() {//互动记录
        let v = this;
        if (v.isLoading) {
          return
        }
        v.isLoading = true;
        WXAJAX.POST({
          entranceType: 1,
          pageNum: v.interactPage,
        }, '', '/seeRecord/getSeeRecordList').then((data) => {

          wx.hideLoading();
          if (data) {
            let item = {},
              _datas = [];
            v.interactPage == 1 && (v.acitveRecord = [] );

            data.forEach(function (i, k) {
              var time = '',
                info = '' ,
                showTime = '';

              // showTime = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate();
              info = v.seeType[i.seeType][1];

              time = util.getdate(i.createTime, 'monthTime');
              time = time.split(' ');

              item = {
                time: time,//页面显示时间
                logo: i.logo,
                see: v.seeType[i.seeType].title,
                action: '查看',
                name: i.nickName || '',
                num : i.num,
                info : info
              };
              _datas.push(item);
            });
            v.acitveRecord = [...v.acitveRecord , ..._datas];
            v.interactPage ++ ;
          }

          setTimeout(function () {
            v.isLoading = false;
          }, 500);

        }).catch((err) => {
          console.log(err);
          wx.hideLoading();
          if (err.code == 204) {
            v.nodata = true;
          }
          setTimeout(function () {
            v.isLoading = false;
          }, 500);
        });
      },
      getPersonalData() {//个人数据统计/机构数据统计
        let params = {};
        if (this.menu_id === 0) {//个人数据
          params.type = 1;
          params.cardId = this.cardId || '';
        } else if (this.menu_id == 2) {//机构数据
          params.type = 2;
        } else {
          params.userId = this.userId;
        }
        params.yearMonth = this.chooseMonth;

        WXAJAX.POST(params, '', '/dataCount/personalData').then((data) => {

          if (data) {
            data.monthMoney = data.monthMoney / 100;
            data.dealMoney = data.dealMoney / 100;
            data.rate = data.monthMoney ? (data.dealMoney / data.monthMoney* 100).toFixed(2) : 0;
            data.toDayNum = data.toDayNum ;
            data.toWeek = data.toWeek ;
            data.toMonth = data.toMonth ;
            this.personalData = data;
          }

        }).catch((err) => {
          console.log(err);
        });
      },
      getSevenData() {//近7日成交额
        this.chart_volume();
      },
      getNewCustomerNum() {//新增客户数
        setTimeout(() => {
          this.chart_new_client();
        }, 1000)
      },
      getDataSummary() {//数据汇总
        let params = {},
          v = this;
        if (this.menu_id === 0) {//个人数据
          params.type = 1;
          params.cardId = this.cardId || '';
        } else if (this.menu_id == 2) {//机构数据
          params.type = 2;
        } else {
          params.userId = v.userId;
        }
        if (this.menu2_id != 0 || params.userId) {
          params.days = this.menu2_id;
        }
        WXAJAX.POST(params, '', '/dataCount/dataSummary').then((data) => {
          let tmp = {};
          if (data) {
            tmp.data = data[0];
            if (data[1]) {
              tmp.diff = {
                customerNum: data[0].customerNum - data[1].customerNum,
                seeNum: data[0].seeNum - data[1].seeNum,
                followNum: data[0].followNum - data[1].followNum,
                consultNum:data[0].consultNum - data[1].consultNum,
                orderAmount: ( data[0].orderAmount - data[1].orderAmount) / 100,
                orderNum: data[0].orderNum - data[1].orderNum,
                forwardNum: data[0].forwardNum - data[1].forwardNum,
                saveNum: data[0].saveNum - data[1].saveNum,
                thumbNum: data[0].thumbNum - data[1].thumbNum,
              };
            }else{
              tmp.diff = {
                customerNum: 0,
                seeNum: 0,
                followNum: 0,
                consultNum:0,
                orderAmount: 0,
                orderNum: 0,
                forwardNum: 0,
                saveNum: 0,
                thumbNum: 0,
              };
            }
            v.dataSummary = tmp
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      getTurnoverRate() {//成交率漏斗
        let v = this;

        WXAJAX.POST({ignore: true}, '', '/dataCount/turnoverRate').then((data) => {
          if (data) {
            let max = 0;
            data.forEach(function (i, k) {
              max = max > i.num ? max : i.num;
              v.turnoverRate[i.state] = i.num || 12;
            });
            v.turnoverRate.max = max;
            for (let i in 4) {

            }
            v.turnoverRate.width = [
              ((v.turnoverRate[1] || 1) / max).toFixed(2) * 149 + 'px',
              ((v.turnoverRate[2] || 1) / max).toFixed(2) * 149 + 'px',
              ((v.turnoverRate[3] || 1) / max).toFixed(2) * 149 + 'px',
              ((v.turnoverRate[4] || 1) / max).toFixed(2) * 149 + 'px',
            ];
            v.turnoverRate.rate = [
              '≤50%',
              '≤80%',
              '≤99%',
              '≤100%',
            ];
          }
        }).catch((err) => {
          console.log(err);
        });
      },
      chart_volume() {//近七日成交额（元）
        let params = {},
          v = this;
        if (this.menu_id === 0) {//个人数据
          params.type = 1;
          params.cardId = this.cardId || '';
        } else if (this.menu_id == 2) {//机构数据
          params.type = 2;
        } else {//成员分析
          params.userId = v.userId;
        }

        WXAJAX.POST(params, '', '/dataCount/sevenData').then((data) => {

          if (data) {
            let series = [[], [], []],
              xAxisData = [],
              seriesItem = [];

            data.orderList.forEach(function (i, k) {//商城订单
              xAxisData.push(i.date.replace(/^.*?-/, ''));
              series[0].push(Math.floor(i.amount / 100));
            });

            data.dealList.forEach(function (i, k) {//个人成交订单
              series[1].push(Math.floor(i.amount / 100));
            });

            if (v.menu_id == 2) {
              data.companyList.forEach(function (i, k) {//商城订单
                series[2].push(Math.floor(i.amount / 100));
              })
            }

            //更新数据
            var option = echart_seven.getOption();
            option.xAxis[0].data = xAxisData;
            option.series[0].data = series[0];
            option.series[1].data = series[1];
            option.series[2] = {
              type: 'line',
              data: series[2],
              ...v.default_options.series
            };
            echart_seven.setOption(option);

          }
          v.inits();

        }).catch((err) => {
          console.log(err);
        });

      },
      chart_new_client() {//新增客户数

        let params = {},
          v = this;
        if (this.menu_id === 0) {//个人数据
          params.type = 1;
          params.cardId = this.cardId || '';
        } else if (this.menu_id == 2) {//机构数据
          params.type = 2;
        } else {
          params.userId = v.userId;
        }
        params.days = v.choose_statistical_time;
        console.log(params)
        WXAJAX.POST(params, '', '/dataCount/newCustomerNum').then((data) => {
          if (data) {
            let xAxisData = [],
              seriesData = [];
            data.forEach(function (i, k) {
              xAxisData.push(i.date.replace(/^.*?-/, ''));
              seriesData.push(Math.ceil(i.data / 100));
            });

            var option = echart_new.getOption();
            option.xAxis[0]['data'] = xAxisData;
            option.series[0] = {
              label: {
                nromal: {
                  show: true,
                  position: 'top'
                }
              },
              data: seriesData,
              type: 'line',
              areaStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#51CBCD' },
                    { offset: 1, color: '#fff' }
                  ])
                }
              },
            };
            
            // option.xAxis[0].data = xAxisData;
            // option.series[0].data = seriesData;
            // option.series[0].type =  'line',
            // option.series[0].itemStyle = {
            // normal: {
            //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //       { offset: 0, color: 'rgba(118,218,216, 0.3)' },
            //       { offset: 1, color: '#51CBCD' }
            //     ])
            //   }
            // },
            echart_new.setOption(option);
          }

        }).catch((err) => {
          console.log(err);
        });

      },
      chart_consult_client() {//咨询客户数
        let params = {},
          v = this;
        setTimeout(function () {

          if (v.menu_id === 0) {//个人数据
            params.type = 1;
            params.cardId = this.cardId || '';
          } else if (v.menu_id == 2) {//机构数据
            params.type = 2;
          } else {
            params.userId = v.userId;
          }
          params.days = v.choose_statistical_time;
          WXAJAX.POST(params, '', '/dataCount/followCustomerNum').then((data) => {
            if (data) {
              let xAxisData = [],
                seriesData = [];
              data.forEach(function (i, k) {
                xAxisData.push(i.date.replace(/^.*?-/, ''));
                seriesData.push(Math.ceil(i.data / 100));
              });

              //更新数据
              var option = echart_consult.getOption();
              option.xAxis[0]['data'] = xAxisData;
              option.series[0] = {
                label: {
                  nromal: {
                    show: true,
                    position: 'top'
                  }
                },
                data: seriesData,
                type: 'line',
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#51CBCD' },
                      { offset: 1, color: '#fff' }
                    ])
                  }
                },
              };
              
              echart_consult.setOption(option);

            }
          }).catch((err) => {
            console.log(err);
          });
        }, 1000)
      },
      chart_follow_client() {//跟进客户数

        let params = {},
          v = this;
        setTimeout(function () {

          if (v.menu_id === 0) {//个人数据
            params.type = 1;
            params.cardId = this.cardId || '';
          } else if (v.menu_id == 2) {//机构数据
            params.type = 2;
          } else {
            params.userId = v.userId;
          }
          params.days = v.choose_statistical_time;
          WXAJAX.POST(params, '', '/dataCount/consultationNum').then((data) => {
            if (data) {
              let xAxisData = [],
                seriesData = [];
              data.forEach(function (i, k) {
                xAxisData.push(i.date.replace(/^.*?-/, ''));
                seriesData.push(Math.ceil(i.data / 100));
              });

              //更新数据
              var option = echart_follow.getOption();
              option.xAxis[0]['data'] = xAxisData;
              option.series[0] = {
                label: {
                  nromal: {
                    show: true,
                    position: 'top'
                  }
                },
                data: seriesData,
                type: 'line',
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#51CBCD' },
                      { offset: 1, color: '#fff' }
                    ])
                  }
                },
              };
              echart_follow.setOption(option);
            }
          }).catch((err) => {
            console.log(err);
          });
        }, 2000)

      },
      chart_active_client() {//近15日客户活跃度
        let params = {},
          v = this;
        setTimeout(function () {

          if (v.menu_id === 0) {//个人数据
            params.type = 1;
            params.cardId = this.cardId || '';
          } else if (v.menu_id == 2) {//机构数据
            params.type = 2;
          } else {
            params.userId = v.userId;
          }

          WXAJAX.POST(params, '', '/dataCount/activeCustomerNum').then((data) => {
            if (data) {
              let xAxisData = [],
                seriesData = [];
              data.forEach(function (i, k) {
                xAxisData.push(i.date.replace(/^.*?-/, ''));
                seriesData.push(Math.ceil(i.data / 100));
              });

              //更新数据
              var option = echart_activeCustomer.getOption();
              option.xAxis[0]['data'] = xAxisData;
              option.series[0] = {
                label: {
                  nromal: {
                    show: true,
                    position: 'top'
                  }
                },
                data: seriesData,
                type: 'line',
                areaStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: '#51CBCD' },
                      { offset: 1, color: '#fff' }
                    ])
                  }
                },
              };
              echart_activeCustomer.setOption(option);
            }
          }).catch((err) => {
            console.log(err);
          });
        }, 3000)
      },
      chart_like(canvas, width, height) {

        let v = this,
          params = {},
          timer = 0;
        if (canvas) timer = 4000;

        if (v.menu_id === 0) {//个人数据
          params.type = 1;
        } else if (v.menu_id == 2) {//机构数据
          params.type = 2;
        } else {
          params.userId = v.userId;
        }

        setTimeout(function () {
          params.dayNum = v.choose_like_time;
          WXAJAX.POST(params, '', '/seeRecord/countCustomerAnalysis').then((data) => {
            if (data) {

              let _data = {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
              };
              data.forEach(function (i, k) {
                _data[i.seeType] = i.num;
              });

              //更新数据
              var option = echart_seeType.getOption();
              // option.xAxis[0].data = xAxisData;
              option.series[0].data = [
                {value: _data[1], name: '对' + v.menu_id == 2 ? '成员' : '我' + '感兴趣'},
                {value: _data[2], name: '喜欢产品'},
                {value: _data[4], name: '关注动态'},
                {value: _data[3], name: '看重机构'},
              ];
              echart_seeType.setOption(option);
            }

          }).catch((err) => {
            console.log(err);
          });
        }, timer);
      },

      handleVolumeInit({width, height}){
        let series = [[], [], []],
          xAxisData = [];
        let options = {
          "color": this.default_options.color,
          ...this.default_options.baseSet,
          "title": {
            "textStyle": {
              "color": "#383838",
              fontWeight: 'bold',
              fontSize: 18,
            },
            x:'center',
            "subtextStyle": {
              "color": "#a8a8a8"
            },
            text: '近七日成交额（元）',
            top: '5%'
          },
          grid:{
            left: '15%'
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            textStyle: {
              color: '#B2B2B2',
              // fontSize:'20upx',
            },
            nameTextStyle: {
              color: '#B2B2B2'
            },
            data: xAxisData,
            axisLine: {
              lineStyle: {
                color: '#A8A8A8'
              }
            }
          },
          yAxis: this.default_options.yAxis,
          series: [
            {
              // name: '最高气温',
              type: 'line',
              data: series[0],
              ...this.default_options.series,

            },
            {
              // name: '最低气温',
              type: 'line',
              data: series[1],
              ...this.default_options.series

            }
          ]
        };
        if (this.menu_id == 2) {
          options.series.push({
            type: 'line',
            data: series[2],
            ...this.default_options.series
          });
        }
        echart_seven = this.initChart(width, height, options, 'volume');
        this.chart_volume();
      },
      handleNewClientInit({width, height}){
        let xAxisData = [],
          seriesData = [];
        let options = {
          "color": this.default_options.color[0],
          ...this.default_options.baseSet,
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData,
            axisLine: {
              lineStyle: {
                color: '#B2B2B2'
              }
            }
          },
          grid:{
            left: '15%'
          },
          yAxis: this.default_options.yAxis,
          series: [
            {
              type: 'line',
              data: seriesData,
              ...this.default_options.series
            },
          ]
        };
        echart_new = this.initChart( width, height, options, 'new_client');
        this.chart_new_client();
      },
      handleConsultClientInit({width, height}){
        let xAxisData = [],
          seriesData = [];
        var options = {
          "color": this.default_options.color[1],
          ...this.default_options.baseSet,
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData,
            axisLine: {
              lineStyle: {
                color: '#B2B2B2'
              }
            }
          },
          grid:{
            left: '15%'
          },
          yAxis: this.default_options.yAxis,
          series: [
            {
              type: 'line',
              data: seriesData,
              ...this.default_options.series
            },
          ]
        };
        echart_consult = this.initChart(width, height, options, 'consult_client');

        this.chart_consult_client();
      },
      handleFollowClientInit({width, height}){
        let xAxisData = [],
          seriesData = [];
        var options = {
          "color": this.default_options.color[2],
          ...this.default_options.baseSet,
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData,
            axisLine: {
              lineStyle: {
                color: '#B2B2B2'
              }
            }
          },
          grid:{
            left: '15%'
          },
          yAxis: this.default_options.yAxis,
          series: [
            {
              type: 'line',
              data: seriesData,
              ...this.default_options.series
            },
          ]
        };
        echart_follow = this.initChart( width, height, options, 'follow_client');
        this.chart_follow_client();
      },
      handleActiveClientInit({width, height}){
        let xAxisData = [],
          seriesData = [];
        var options = {
          "color": this.default_options.color[3],
          ...this.default_options.baseSet,
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xAxisData,
            axisLine: {
              lineStyle: {
                color: '#B2B2B2'
              }
            }
          },
          grid:{
            left: '15%'
          },
          yAxis: this.default_options.yAxis,
          series: [
            {
              type: 'line',
              data: seriesData,
              ...this.default_options.series
            },
          ]
        };
        echart_activeCustomer = this.initChart(width, height, options, 'active_client');
        this.chart_active_client();
      },
      handleLikeInit({width, height}){
        var options = {
          "color": this.default_options.color2,
          ...this.default_options.baseSet,
          "textStyle": {},
          grid:{
            left: '15%'
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              hoverAnimation: false,
              center: ['50%', '60%'],
              data: [
                {value: 1, name: '对' + this.menu_id == 2 ? '成员' : '我' + '感兴趣'},
                {value: 2, name: '喜欢产品'},
                {value: 3, name: '关注动态'},
                {value: 4, name: '看重机构'},
              ],
            }
          ]
        };
        echart_seeType = this.initChart(width, height, options, 'like_client');
        this.chart_like();
      },
      // getCustomerAnalysis() {//客户与我 、 机构的互动
      //   let v = this,
      //     params = {ignore: true};

      //   if (v.menu_id === 0) {//个人数据
      //     params.type = 1;
      //   } else if (v.menu_id == 2) {//机构数据
      //     params.type = 2;
      //   }

      //   setTimeout(function () {
      //     WXAJAX.POST(params, '', '/seeRecord/customerAnalysis').then((data) => {
      //       if (data) {
      //         let max = 0,
      //           array = [];
      //         v.customerInteract[0] = data.imNum;
      //         v.customerInteract[1] = data.callsNum;
      //         v.customerInteract[2] = data.goodForwardNum;
      //         v.customerInteract[3] = data.dynamicNum;
      //         v.customerInteract[4] = data.commentNum;
      //         v.customerInteractMax = data.imNum + data.callsNum + data.goodForwardNum + data.dynamicNum + data.commentNum;
      //       }
      //     }).catch((err) => {
      //       console.log(err);
      //     });
      //   }, 4000)
      // },

      initChart(width, height, options, name) {
        let canvas = this.$refs[name].canvas;

        echarts.setCanvasCreator(() => canvas);
        let chart;
        chart = echarts.init(canvas, null, {
          width: width || 370,
          height: height || (name ==='active_client' ? 243 :200)
        });
        canvas.setChart(chart);
        chart.setOption(options);
        this.$refs[name].setChart(chart);
        return chart

      },

      summarize_tap(id) {//汇总点击
        this.menu2_id = id;
        // wx.showLoading();
        this.getDataSummary();
        setTimeout(function () {
          wx.hideLoading();
        }, 1000)
      },
      echart_time_tap(type, id) {//echart时间选择
        // wx.showLoading();
        switch (type) {
          case 'new_clients':
            // this.$set(this,'new_client_id',id);
            this.new_client_id = id;
            //更新数据
            var option = echart_new.getOption();
            option.series[0].data = [15, 1, 25, 13, 12, 13, 10];
            echart_new.setOption(option);
            break;
          case 'consult_clients':
            this.consult_client_id = id;
            break;
          case 'follow_clients':
            this.follow_client_id = id;
            break;
        }
        wx.hideLoading();
      },
      tab_change(id) {//切换tab
        this.tab_id = id;
        // wx.showLoading();
        switch (id) {
          case 0:
            this.pandect_show = true;
            this.active_show = false;
            this.logs_show = false;
            break;
          case 1:
            this.pandect_show = false;
            this.active_show = true;
            this.logs_show = false;
            if (this.acitveRecord[0].time.length == 0) {
              this.getSeeRecordList();
            }
            break;
          case 2:
            this.pandect_show = false;
            this.active_show = false;
            this.logs_show = true;
            if (this.followLogs.length == 0) {
              this.isLoading = false ;
              console.log(this.isLoading) ;
              this.getFollowLog();
            }
            break;
        }
        setTimeout(function () {
          wx.hideLoading();
        }, 300)
      },
      datePickerChange(e) {//本月业绩选择时间
        let _time = e.target.value.split('-');
        _time = _time[0] + '-' + _time[1];
        this.chooseMonth = _time;
        // wx.showLoading();
        this.getPersonalData();
        setTimeout(function () {
          wx.hideLoading();
        }, 1000)
      },
      chooseTime0(id, name) {
        console.log(id, name)
        this.chooseTimeShow0 = !this.chooseTimeShow0;
        if (id == -1) return;
        this.clientStatisticalTime = name;
        this.choose_statistical_time = id;
        this.chart_new_client();
        this.chart_consult_client();
        this.chart_follow_client();
        // wx.showLoading();
        // this.chart_like();
        // setTimeout(function () {
        //   wx.hideLoading();
        // }, 1000)
      },
      chooseTime(id, name) {
        this.chooseTimeShow = !this.chooseTimeShow;
        if (id == -1) return;
        this.clientLikeTime = name;
        this.choose_like_time = id;
        // wx.showLoading();
        this.chart_like();
        setTimeout(function () {
          wx.hideLoading();
        }, 1000)
      },
      selectEcharts(index){
        this.currentIndex = index
      },
      selectTime(index,id){
        this.currentTime = index
        this.choose_statistical_time = id;
        this.chart_new_client();
        this.chart_consult_client();
        this.chart_follow_client();
        this.chart_active_client()
      }
    }
  }
</script>

<style>
  .w70{
    flex: 0 0 140upx;
  }
  .line-out{
    flex-grow: 1;
    padding-top: 8upx;
    position: relative;
  }
  .deal-info >div:last-child{
    margin-right: 0 !important;
  }
  canvas {
    background: #fff;
  }
  .acitveRecord .follow_log.active .right{
    color:#BCBBBC
  }
  .acitveRecord .follow_log{
    padding-left: 40px;
    padding-right: 92upx;
  }

  .line-out::before{
    content: '';
    position: absolute;
    left: 0;
    top: 8upx;
    right: 36upx;
    background: #e8e8e8;
    border-radius: 50upx;
    height: 16upx;
  }

  .line-out b{
    position: relative;
    z-index: 2;
  }

  .ec-canvas {
    width: 100%;
    height: 100%;
    flex: 1;
  }
  .turnover_btn{
    margin:0 auto;
    margin-top: 70upx;
    width:580upx;
    height:88upx;
    background:linear-gradient(90deg,rgba(117,218,216,1),rgba(81,205,203,1));
    border-radius:10upx;
    text-align: center;
    line-height: 88upx;
    color: #FFFFFF;
  }
  .trapezoid{
    position: relative;
  }
  .trapezoid span{
    position: absolute;
    left: 0;
    right: 0;
    margin:auto;
    top: -56upx;
    z-index: 99;
}
</style>
<style scoped>
.select-echarts{
  display: flex;
  justify-content: space-between;
  color: #51CDCB;
  font-size: 28upx;
  padding:40upx 30upx 0 30upx;
}
.select-echarts span{
  transition:all 0.5s;
  display: block;
  padding: 12upx 40upx;
  border:1px solid rgba(81,205,203,0.5);
  border-radius:36upx;
}
.isselect-echarts{
  transition:all 0.5s;
  background: #51CDCB;
  color: #fff !important;
}
.echarts-box{
  position: relative;
  width: 100vw;
  height: 500upx;
  background: #fff;
}
.echarts-list{
  transition: all .5s;
  position: absolute;
  top: 0;
  width: 100%;
  display: none;
}
.isShow-list{
  transition: all .5s;
  display: block;
}
.statisticsTitle{
  transition: all .5s;
  position: absolute;
  top: 40upx;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  color: #383838;
  font-size: 40upx;
  opacity: 0;
}
.show-Title{
  transition: all .5s;
  opacity: 1;
}
.select-time{
  display: flex;
  justify-content: space-between;
  color: #A8A8A8;
  font-size: 24upx;
  padding:40upx 150upx 0 150upx;
}
.select-time span{
  transition:all 0.5s;
  display: block;
  padding: 12upx 33upx;
  border-radius:26upx;
}
.isselect-time{
  transition:all 0.5s;
  background:rgba(81,205,203,0.15);
  color: #51CDCB !important;
}
</style>
