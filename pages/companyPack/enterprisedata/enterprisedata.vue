<template>
  <div
    style="width:100vw;padding-left: 20px;padding-right: 20px;background-color: #FFFFFF;paddingTop:navHeight;overflow:hidden,"
    class="box borderbox bgfff  posre">
    <div class="borderbox fix_top titlenav" :style="{height:navHeight,paddingTop:'40px',paddingBottom:'12px'}">
      <div class="disflex align-cen h100p pl20" style="padding-bottom: 5px;">
        <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/mine/back.png" mode=""
          @click="goBack()" class="w18 h18 posab" style="left:40rpx;"></image>
        <div class="fs15 c38 " style="margin-left: 25px;" :class="createof == false ? 'active':'title'"
          @click="changeout()">内容数据</div>
<!--        <div class="" style="margin-left: 20px;" :class="popularize == false ? 'active':'title'" @click="changecut()">
          员工推效</div> -->
      </div>
    </div>
    <!-- 内容数据 -->
    <view class="create_of" :hidden="createof">
      <view class="create">
        <view class="listtop">
          <view class="produce">内容创作</view>
          <!-- <view class="particulars">详细</view> -->
        </view>
        <view class="minute">
          <view class="classify">
            <view class="description">
              <view class="">文章</view>
              <view style="color: #23D2C6;">{{list.artileCount}}篇</view>
            </view>
            <view class="reading">
              <view class="">阅读量:</view>
              <view class="" style="color: #23D2C6;">{{list.artileReadCount}}次</view>
            </view>
          </view>
          <view class="classify">
            <view class="description">
              <view class="">动态</view>
              <view style="color: #23D2C6;">{{list.dynamicCount}}条</view>
            </view>
            <view class="reading">
              <view class="">阅读量:</view>
              <view class="" style="color: #23D2C6;">{{list.dynamicReadCount}}次</view>
            </view>
          </view>
          <view class="classify">
            <view class="description">
              <view class="">视频</view>
              <view style="color: #23D2C6;">{{list.videoCount}}条</view>
            </view>
            <view class="reading">
              <view class="">阅读量:</view>
              <view class="" style="color: #23D2C6;">{{list.videoForwardCount}}次</view>
            </view>
          </view>
        </view>
      </view>
      <view class="contribute" style="position: relative;">
        <view class="listtop">
          <view class="produce">投稿数据</view>
          <view class="sequence" @click="sepuencelsit()">{{senioritylist}}
          <view class="dot-bottom"> > </view>
            <view class="" v-show="changer"
            style="width:242rpx;background-color: #FFFFFF;border:1px solid #01C4A1;z-index:999;position: absolute;">
              <view class="" 
              v-for="(item,index) in among" :key="index" @click="toseniority(item)" >{{item.name}}</view>
            </view>
          </view>
        </view>
        <view class="seniority" style="z-index: 99;">
          <view class=" league" v-for="(item,index) in contributelist" :key="index">
            <image :src="item.logo" mode="" style="width: 86rpx;height: 86rpx;border-radius: 50%;"></image>
            <view class="seniority_user">
              <view class="">{{item.name}}</view>
              <view class="" style="display: flex;flex-direction: row; justify-content:space-between;">
                <!-- 添加v-mode -->
                <progress :percent="item.pencil"  stroke-width="19" border-radius="18rpx" class="progress_list"
                  backgroundColor="#F5F5F5" />
                <view class="" style="font-size: 24rpx;margin-left: 20rpx;color: #A7E1DD;">{{item.dynamicCount}}次投稿
                </view>
              </view>
            </view>
          </view>
          <view class="magnitude">
            <view class="">0</view>
            <view class="">25</view>
            <view class="">50</view>
            <view class="">75</view>
            <view class="">100</view>
          </view>
        </view>
      </view>
      <!-- <view style="width: 100%;">
        <TodayOverview class="daytay" title="内容访问数据" />
        <ShowDataTab :timeDataList="timeDataList" :sceneDataList="sceneDataList" :total="total" @selectData="selectData"
          @changeBusinessType="changeBusinessType" />
      </view> -->
   </view>
    <!-- 员工推效 -->
<!--    <view class="create_of" :hidden="popularize">
      <view class="create"> -->
        <!-- 系统使用 -->
<!--        <view class="listtop">
          <view class="produce">系统使用</view> -->
          <!-- <view class="particulars">详情</view> -->
<!--       </view>
        <view class="minute">
          <view class="classify">
            <view class="description">员工总数</view>
            <view class="reading">20人</view>
          </view>
          <view class="classify">
            <view class="description">员工总数</view>
            <view class="reading">20人</view>
          </view>
          <view class="classify">
            <view class="description">员工总数</view>
            <view class="reading">20人</view>
          </view>
        </view>
      </view>
      <view class="" style="margin-top: 37px;"> -->
        <!-- 线上推广 -->
<!--        <view class="">
          <view class="online">线上推广</view>
          <view class="" style="display: flex;justify-content:space-between;margin-bottom: 42px;">
            <view class="repeat">本月员工转发内容总数量</view>
            <view class="" style="display: flex;flex-direction: row;">
              <view class="" style="font-size: 14px;height: 20px;">242</view>
              <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/line.png" mode=""
                style="width:34rpx;height:34rpx;margin-left:12rpx;"></image>
            </view>
          </view>
        </view>
        <view class="" style="display: flex;justify-content:space-around; margin-bottom: 34px;">
          <view class="">
            <view class="" style="margin-bottom:11px;">文章</view>
            <view class="" style="text-align: center;">90</view>
          </view>
          <view class="">
            <view class="" style="margin-bottom:11px;">视频</view>
            <view class="" style="text-align: center;">35</view>
          </view>
          <view class="">
            <view class="" style="margin-bottom:11px;">海报</view>
            <view class="" style="text-align: center;">10</view>
          </view>
          <view class="">
            <view class="" style="margin-bottom:11px;">名片</view>
            <view class="" style="text-align: center;">107</view>
          </view>
        </view>
        <view class="">
          <view class="" style="display: flex;justify-content: flex-start;">
            <image src="../../../static/tabs/user-active.png" style="width: 47px;height: 47px;margin-right: 13px;"
              mode=""></image>
            <view class="">
              <view class="">张小虎</view>
              <progress percent="25" stroke-width="19" border-radius="18rpx" class="progress_list" />
            </view>
            <view class="" style="margin-left: 35px;margin-top:18px;font-size: 12px;color:#A7E1DD;">25次转发</view>
          </view>
        </view>
        <view class="magnitude">
          <view class="">0</view>
          <view class="">5</view>
          <view class="">10</view>
          <view class="">15</view>
          <view class="">20</view>
        </view>
      </view>
      <view class="" style="margin-top: 37px;">
        <view class="">
          <view class="online">线下推广</view>
          <view class="" style="display: flex;justify-content:space-between;margin-bottom: 42px;">
            <view class="repeat">本月员工拜访打卡总数量</view>
            <view class="" style="display: flex;flex-direction: row;">
              <view class="" style="font-size: 14px;height: 20px;">242</view>
              <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/line.png" mode=""
                style="width:34rpx;height:34rpx;margin-left:12rpx;"></image>
            </view>
          </view>
        </view>
        <view class="">
          <view class="" style="display: flex;justify-content: flex-start;">
            <image src="../../../static/tabs/user-active.png" style="width: 47px;height: 47px;margin-right: 13px;"
              mode=""></image>
            <view class="">
              <view class="">张小虎</view>
              <progress percent="" stroke-width="19" border-radius="18rpx" class="progress_list" />
            </view>
            <view class="" style="margin-left: 35px;margin-top:18px;font-size: 12px;color: #A7E1DD;">25次转发</view>
          </view>
        </view>
        <view class="magnitude">
          <view class="">0</view>
          <view class="">5</view>
          <view class="">10</view>
          <view class="">15</view>
          <view class="">20</view>
        </view>
      </view>
    </view> -->
  </div>

</template>

<script>
  import WXAJAX from "@/utils/request";
  import util from '@/utils/index';
  import TodayOverview from "../../index/ai/TodayOverview.vue";
  import ShowDataTab from "../../index/ai/ShowDataTab";
  export default {
    data() {
      return {
        createof: false,
        popularize: true,
        changer: false,
        companyId: '',
        contributelist: '',
        pencil: '',
        list: '',
        allcount:'',
        senioritylist:'投稿文章次数排名',
        typelist:1,
        among: [
          {
            name:'投稿文章次数排名',
            type:1
          } ,
          {
            name:'投稿动态次数排名',
            type:2
            },
          {
            name:'投稿视频次数排名',
            type:6
            }],
      }
    },
    components: {
      TodayOverview,
      ShowDataTab,
    },
    onLoad() {

    },
    onShow() {
      this.getcontribute();
      this.getcreation();
    },
    methods: {
      // 返回上一页
      goBack() {
        wx.navigateBack()
      },
      // 点击获取下拉列表
      sepuencelsit() {
        this.changer = !this.changer;
      },
      // 切换列表
      changeout() {
        this.createof = false;
        this.popularize = true;
      },
      changecut() {
        this.createof = true;
        this.popularize = false;
      },
      getcontribute() {
        WXAJAX.POST({
          companyId: uni.getStorageSync('COMPANYID'),
          pageNam: 1,
          type: this.typelist
        }, '', '/dynamic/listCompanyStaffDynamicCount', '', '', '1').then((data) => {

          data.pageInfo.list.forEach(function (i, k) {
          //    // i.pencil = ((i.dynamicCount / 1) * 100).toFixed(0); //去计算进度条的百分比
             i.pencil = ((i.dynamicCount / data.dynamicAllCount) * 100) ;
          });
          console.log(data.pageInfo.list,'12321314314343')
          this.contributelist = data.pageInfo.list;
          this.allcount = dtat.dynamicAllCount
        }).catch((err) => {})
      },
      getcreation() {
        WXAJAX.POST({
          companyId: uni.getStorageSync('COMPANYID'),
        }, '', '/dynamic/queryCompanyDynamicCount', '', '', '1').then((res) => {
          this.list = res
        }).catch((err) => {})
      },
      toseniority(item){
       this.senioritylist = item.name
       this.typelist = item.type
       this.getcontribute()
      },
    }
  }
</script>

<style scoped>
  .titlenav {
    background-color: #23D2C6;
  }

  .create {
    width: 100%;
    padding-top: 230rpx;
  }

  .listtop {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .produce {
    width: 200rpx;
    height: 56rpx;
    font-size: 40rpx;
    color: #333333;
  }

  .particulars {
    width: 60rpx;
    height: 56rpx;
    font-size: 28rpx;
    line-height: 56rpx;
    font-family: PingFangSC-regular;
  }

  .minute {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .classify {
    width: 200rpx;
    height: 194rpx;
    border: 1px solid #FFFFFF;
    box-shadow: 0px 2px 6px 0px rgba(167, 225, 221, 100);
    margin-right: 8rpx;
    margin-left: 8rpx;
    margin-top: 20rpx;
    border-radius: 12rpx;
  }

  .description {
    width: 135rpx;
    height: 38rpx;
    font-size: 28rpx;
    display: flex;
    flex-direction: row;
    margin-left: 44rpx;
    margin-top: 20rpx;
  }

  .reading {
    width: 100%;
    height: 30rpx;
    font-size: 24rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* margin-left: 80rpx; */
    margin-top: 60rpx;
  }

  .contribute {
    width: 100%;
    margin-top: 66rpx;
    background-color: #FFFFFF;
    margin-bottom: 20rpx;
  }

  .seniority {
    width: 100%;
    margin-top: 92rpx;
  }

  .league {
    width: 100%;
    height: 86rpx;
    display: flex;
    flex-direction: row;
    margin-bottom: 20rpx;
  }

  .seniority_user {
    width: 550rpx;
    display: flex;
    flex-direction: column;
    margin-left: 26rpx;
  }

  .progress_list {
    width: 380rpx;
  }

  .magnitude {
    width: 55%;
    height: 45rpx;
    border-top: 2rpx solid #A7E1DD;
    display: flex;
    justify-content: space-between;
    margin-left: 113px;
  }

  .sequence {
    width: 250rpx;
    height: 60rpx;
    border-radius: 14rpx;
    box-shadow: 0px 2px 6px 0px rgba(167, 225, 221, 100);
    border: 2rpx solid #FFFFFF;
    font-size: 24rpx;
    line-height: 60rpx;
    text-align: center;
    color: #01C4A1;
  }

  .dot-bottom {
    width: 30rpx;
    height: 30rpx;
    font-size: 24rpx;
    float: right;
    margin-top: 15rpx;
    transform: rotate(90deg);
  }

  .title {
    font-size: 36upx;
    color: #ffffff;
    opacity: 0.4;
    transition: all .2s;
  }

  .active {
    font-size: 40upx;
    color: #ffffff;
    transition: all .2s;
    font-weight: bold;
    border-bottom: #fff 6rpx solid;
  }

  .online {
    width: 196rpx;
    height: 54rpx;
    font-size: 40rpx;
    color: #333333;
  }

  .repeat {
    width: 320rpx;
    height: 38rpx;

  }
</style>
