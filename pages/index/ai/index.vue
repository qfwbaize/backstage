<template>
  <div class="ai">

    <!-- <view class="screen">
    <view class="screenList">
      <view :class="tabType == 1 ? 'active' : 'industry'" @click="tab_type_tap(1)">
      	雷达
      </view>
      <view :class="tabType == 2 ? 'active' : 'industry'" @click="tab_type_tap(2)">
      	行为分析
      </view>
    </view>
   </view> -->
   <view>


    <!-- <TodayOverview /> -->
    <ShowDataTab :timeDataList="timeDataList"
                 :sceneDataList="sceneDataList"
                 :total="total"
                 @selectData="selectData"
                 @changeBusinessType="changeBusinessType" />
    <!-- <New @clickVistor="clickVistor"
               @changeSeeType="changeSeeType"
               :visitorList="visitorList" /> -->

    <VisitRank @clickVistor="clickVistor"
               @changeSeeType="changeSeeType"
               :visitorList="visitorList" />
    </view>
     <view v-if="tabType == 2">
               <Behavior  class="behavior" />
     </view>
  </div>
</template>
<script>
import TodayOverview from "./TodayOverview";
import ShowDataTab from "./ShowDataTab";
import VisitRank from "./VisitRank";
import New from "./new";
import Behavior from "../behavior/index";
import Closing from "../closing/index";
import NoDataBottom from '@/components/NoDataBottom';
import WXAJAX from "@/utils/request";
import {authSubscribeMessage} from '../../../utils/auth.js'
import {mapGetters} from "vuex";

export default {
  components: { TodayOverview, ShowDataTab, VisitRank, New, Behavior,NoDataBottom},
  computed: {
    ...mapGetters(["subscriptionNew"])
  },
  async mounted () {
    this.getVisitRank(false, this.page);
    await this.getTimeStatistics();
    await this.getSceneStistics();
  },
  data () {
    return {
      tabType:1,
      isLoading: false, //是否在加载
      page: 1,
      visitorList: [], //访问排名的人
      aiTimeType: 0, //统计日期类型.0:今日;1:昨日;2:7天;3:30天
      businessType: 1, //业务类型1:名片;2:产品;3：官网;4:查看文章;5:预约
      closingDayType: 0, //统计日期类型.0:今日;1:昨日;2:7天;3:30天
      seeTypeId: "", //业务类型  '': 全部;1:名片;2:产品;3：官网;4:查看文章;5:预约; 6:视频营销
      timeDataList: [], //折线图数据
      sceneDataList: {
        visitUserCount: {},
        visitNewUserCount: {},
        visitCount: {},
      }, //场景值
      total: 0, //对应场景的总条数
      scrollTop: 0, //设置滚动条的位置
       scrollContentHeight: 0,
    };
  },
  methods: {
    /**
     *  根据不同的时间获取不同的场景值
     */
    async getTimeStatistics () {
      wx.hideLoading();
      try {
        wx.showLoading();
        let data = await WXAJAX.POST({          ignore: true, timeType: this.aiTimeType,
          businessType: this.businessType        },
          "",
          "/seeRecord/timeStatistics","","","","1"
        );
        if (data) {
          this.timeDataList = data.cell || [];
          this.total = data.total;
        } else {
          this.total = 0;
          this.timeDataList = [];
        }
      } catch (error) {
        this.total = 0;
        this.timeDataList = [];
        console.log("error", error);
      }
      wx.hideLoading();
    },
    //scrollview滚动到底部
    lower () {

      if (this.type1_id === 0 && this.$refs.ai) {
        this.getVisitRank(true);
      }
    },
    //scrollview滚动到顶部
    scrolltoupper(){
      this.getVisitRank(false,'',1);

    },
    tab_type_tap(type) {

    	this.tabType = type
    	// this.$emit('table_tap', type)
    },
    clickVistor (cardId, userId) {
      authSubscribeMessage(this.subscriptionNew);
      //选择AI客户
      wx.setStorageSync("AIUserId", userId);
      wx.navigateTo({ url: "../customerAnalysis/main?userId=" + userId });
    },
    //选择seeType类型
    changeSeeType (typeId) {
      authSubscribeMessage(this.subscriptionNew);
      this.seeTypeId = typeId;
      this.page = 1;
      wx.showLoading();
      this.visitorList = [];
      this.getVisitRank(false, this.page);
    },
    //切换日期
    selectData (index) {
      authSubscribeMessage(this.subscriptionNew);
      this.aiTimeType = index;
      this.page = 1;
      this.getTimeStatistics();
      this.getSceneStistics();
      this.getVisitRank(false, this.page);
    },
    async changeBusinessType (businessType) {
      this.businessType = businessType;
      await this.getTimeStatistics();
    },
    /**
     * 获取访问排行
     * isScrollLower： scrollview滚动到底部 true是 false 没有
     * 父组件在scrollview滚动到底部以后，page默认+1， 调用该方法加载更多数据，
     */
    getVisitRank (isScrollLower, page, type) {
      if (this.isLoading) return;
      this.isLoading = true;
      if (isScrollLower) {
        this.page++;
        page = this.page;
      }else if(type == 1){
        this.page = 1
      }
      WXAJAX.POST(
        {
          pageNum: page,
          pageSize: 10,
          seeType: this.seeTypeId,
          timeType: this.aiTimeType
        },
        "",
        "/seeRecord/getVisitRankingList",
        null,
        "/pages/index/main","","1"
      ).then(
        (data, code) => {
          wx.hideLoading();
          if (data ) {
            if (this.page === 1) {
              this.visitorList = data;
            } else {
              this.visitorList = this.visitorList.concat(data);
            }
          } else {
            // this.visitorList = [];
            this.isLoading = true;
          }
          this.isLoading = false;
        },
        err => {
          wx.hideLoading();
          this.page--;
          this.isLoading = false;
        }
      );
    },
    async getSceneStistics () {
      wx.hideLoading();
      try {
        wx.showLoading();
        let data = await WXAJAX.POST(
          {
            ignore: true,
            timeType: this.aiTimeType,
            // businessType: this.businessType
          },
          "",
          "/seeRecord/sceneStatistics","","","","1"
        );
        if (data) {
          this.sceneDataList = data;
        } else {
          this.sceneDataList = {
            visitUserCount: {},
            visitNewUserCount: {},
            visitCount: {},
          };
        }
      } catch (error) {
        console.log("error", error);
        this.sceneDataList = {
          visitUserCount: {},
          visitNewUserCount: {},
          visitCount: {},
        };
      }
      wx.hideLoading();
    }
  }
};
</script>
<style scoped>
  .industry {
  	background-color: #EAEAEA;
  	padding: 15rpx 28rpx 15rpx 28rpx;
  	border-radius: 15rpx;
  }

  .active {
  	color: #1Ec4b9;
  	background-color: rgb(196, 241, 238);
  	transition: all .2s;
  	padding: 15rpx 28rpx 15rpx 28rpx;
  	border-radius: 15rpx;
  }
.ai {
  transform: translateY(-20upx);
}
.screen {
		width: 100%;
		border: 1px transparent solid;
		background-color: #fff;
	}

	.screenList {
		width: 44%;
		margin: 20rpx;
		justify-content: space-between;
		display: flex;
	}
  .ai,
  .behavior,
  .closing {
    position: relative;
    /* margin-top: -20upx; */
    transform: translateY(-20upx);
  }
</style>
