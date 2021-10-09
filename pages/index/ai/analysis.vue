<template>
  <div class="bgfff content">
    <ClientAddModal :status="editTab"
                    :tabs="tabs"
                    :choose_tabs_id="choose_tabs_id"
                    @modal_tab_tap="modal_tab_tap"
                    @modal_btn_tap="modal_btn_tap"
                    @closeModal="editTab = false"
    ></ClientAddModal>
    <div class="visit-rank bgfff">
        <span class="be8 lh25 pl9 pr10 bradius3 c80" style="margin-left: 300rpx; font-size: 30rpx;">
            <picker class='time-picker disinblock pr10'
                    mode="date"
                    fields="month"
                    :value="personalDataEndTime"
                    :end="personalDataEndTime"
                    @change="datePickerChange"
            >
                {{chooseMonth}}
            </picker>
            <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/down.png" alt=""
                              class="w10 h10"/>
        </span>
        <span class="be8 lh25 pl9 pr10 bradius3 c80" @click="filtrate" v-if="screen==true"  style="font-size: 30rpx;margin-left: 20rpx;">
              {{staffName}}
              <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/down.png" alt=""
                                class="w10 h10"/>
        </span>
        <!-- <span class="be8 lh25 pl9 pr10 bradius3 c80" @click="exportlist"  style="font-size: 30rpx;margin-left: 20rpx;">
              导出
              <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/down.png" alt=""
                                class="w10 h10"/>
        </span> -->
       <!-- <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/right.png" alt class="w10 h10 bottom-arrow" /> -->
      </TitleSlot>
    </div>

    <div class="pl16 pr16">
      <div class="today-info disflex jsaround pt30">
        <VerticalData class="flex-shrink"
                      title="转发文章数量" url="enterpriSeservices/articlesList"
                      :subtitle="dynamicNum1||0" />
        <VerticalData class="flex-shrink" url="companyPack/myshare"
                      title="转发文章次数"
                      :subtitle="shareNum1||0" />
        <VerticalData class="flex-shrink"
                      title="受访数量"
                      :subtitle="intervieweeNum1||0" />
      </div>
      <div class="today-info disflex jsaround pt30">
        <VerticalData class="flex-shrink"
                      title="拜访次数"
                      :subtitle="visitingNum1||0" />
        <VerticalData class="flex-shrink"
                      title="跟进客户数量"
                      :subtitle="customerNum1||0" />
        <VerticalData class="flex-shrink"
                      title="跟进次数"
                      :subtitle="followNum1||0" />
      </div>
      <div class="today-info disflex jsaround pt30">
        <VerticalData class="flex-shrink"
                      title="视频数量"
                      :subtitle="videoNum1||0" />
        <VerticalData class="flex-shrink"
                      title="视频转发次数"
                      :subtitle="shareVideoNum1||0" />
      </div>
      <div class="today-info disflex jsaround pt30">
        <VerticalData class="flex-shrink"
                      title="个人客户"
                      :subtitle="personageCustomerNum1||0" />
        <VerticalData class="flex-shrink"
                      title="单位客户"
                      :subtitle="orgCustomerNum1||0" />
      </div>
    </div>
  </div>
</template>
<script>
import WXAJAX from "../../../utils/request";

import Title from '@/components/TiTleSlot'
import VerticalData from '@/pages/index/components/VerticalData';
import {authSubscribeMessage} from '../../../utils/auth.js'
import {mapGetters} from "vuex";
import ClientAddModal from './clientAddModal' // 订单项

export default {
  props: {
    info: {
      type: Object,
      default: () => ({
        shareCount: 0,
        shareUserCount: 0,
        shareNewUserCount: 0,
      })
    }
  },
  components: {
    ClientAddModal,
    Title,
    VerticalData,
  },
  data () {
    return {
      chooseMonth: '2021-03',//本月业绩选择的时间
      choose_tabs_id:0,
      startTime:'2021-03-01 00:00:00',
      endTime:'2021-03-31 23:59:59',
      tabs:[],
      staffName:'全部',
      followCardId:0,
      pageNum:1,
      screen:wx.getStorageSync("isBoss"),
      editTab:false ,
      personal:0,
      company:0,

      dynamicNum1 :0,
      customerNum1 :0,
      followNum1 :0,
      intervieweeNum1 :0,
      shareNum1 :0,
      visitingNum1 :0,
      videoNum1:0,
      shareVideoNum1:0,
      orgCustomerNum1:0,
      personageCustomerNum1:0,

      dynamicNum2 :0,
      customerNum2 :0,
      followNum2 :0,
      intervieweeNum2 :0,
      shareNum2 :0,
      visitingNum2 :0,
      videoNum2:0,
      shareVideoNum2:0,
      };
  },


  mounted(){


    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);

    this.chooseMonth=Y+'-'+M;

    let temp = new Date(Y,M,0);
    console.log("temp",temp)
    let mm = temp.getDate(); //这里mm就是天数啦

    this.startTime=this.chooseMonth + '-01 00:00:00'
    this.endTime=this.chooseMonth + '-'+mm+' 23:59:59'

    this.getstaff();
    this.getdata();
  },
  methods: {
    btn_tap(url){
      wx.navigateTo({
        url: '/pages/'+url+'/main'
      });
    },
    getdata(){
      let that=this

      let params={};
      if(wx.getStorageSync("isBoss")){
        params={
          cardId:that.choose_tabs_id?that.choose_tabs_id:'',
          // cardType:0,
          startTime:that.startTime,
          endTime:that.endTime,
        };

      }else{
        params={
          // cardType:1,
          startTime:that.startTime,
          endTime:that.endTime,
        };
      }
      let url='/statistics/queryStatisticsList';
      if(wx.getStorageSync("isBoss")){
        url='/statistics/queryCompanyStatisticsList';
      }
      console.log(params);
      WXAJAX.POST(params, "", url,'','',1,"1").then(
        data => {
          if (data) {

            that.dynamicNum1 =0
            that.customerNum1 =0
            that.followNum1 =0
            that.intervieweeNum1 =0
            that.shareNum1 =0
            that.visitingNum1 =0
            that.shareVideoNum1 =0
            that.videoNum1 =0
            that.orgCustomerNum1=0
            that.personageCustomerNum1=0

            for(var i=0;i<data.length;i++){
              that.dynamicNum1 =data[i].dynamicNum + that.dynamicNum1
              that.customerNum1 =data[i].followCustomerNum + that.customerNum1
              that.followNum1 =data[i].followNum + that.followNum1
              that.intervieweeNum1 =data[i].intervieweeNum + that.intervieweeNum1
              that.shareNum1 =data[i].shareNum + that.shareNum1
              that.visitingNum1 =data[i].visitingNum + that.visitingNum1

              that.shareVideoNum1 =data[i].shareVideoNum + that.shareVideoNum1
              that.videoNum1 =data[i].videoNum + that.videoNum1

              that.orgCustomerNum1=data[i].orgCustomerNum + that.orgCustomerNum1
              that.personageCustomerNum1=data[i].personageCustomerNum + that.personageCustomerNum1
            }
            // that.dynamicNum1 =data[0].dynamicNum
            // that.customerNum1 =data[0].customerNum
            // that.followNum1 =data[0].followNum
            // that.intervieweeNum1 =data[0].intervieweeNum
            // that.shareNum1 =data[0].shareNum
            // that.visitingNum1 =data[0].visitingNum

            // that.shareVideoNum1 =data[0].shareVideoNum
            // that.videoNum1 =data[0].videoNum

            // that.dynamicNum2 =data[1].dynamicNum
            // that.customerNum2 =data[1].customerNum
            // that.followNum2 =data[1].followNum
            // that.intervieweeNum2 =data[1].intervieweeNum
            // that.shareNum2 =data[1].shareNum
            // that.visitingNum2 =data[1].visitingNum

            // that.shareVideoNum2 =data[1].shareVideoNum
            // that.videoNum2 =data[1].videoNum

            console.log(data)
          }
        },
        error => {
          console.log("error", error);
        }
      );
    },
    getstaff () {
      let that=this
      WXAJAX.POST({ ignore: true }, "", "/businessCard/getCompanyStaffList","","","","1").then(
        data => {
          if (data) {
            that.tabs[0] ={cardId: 0,name:'全部'};
            for(var i=0;i<data.list.length;i++){
              that.tabs.push(data.list[i])
            }
          }
          console.log('测试数据',that.tabs);
        },
        error => {
          console.log("error", error);
        }
      );
    },
    datePickerChange(e) {//本月业绩选择时间
      let _time = e.target.value.split('-');
      console.log(_time)
      let temp = new Date(_time[0],_time[1],0);
      _time = _time[0] + '-' + _time[1];
      this.chooseMonth = _time;
      wx.showLoading();

      let mm = temp.getDate(); //这里mm就是天数啦
      this.startTime=_time + '-01 00:00:00'
      this.endTime=this.chooseMonth + '-'+mm+' 23:59:59'

      this.getdata();

      setTimeout(function () {
        wx.hideLoading();
      }, 1000)
    },
    modal_tab_tap( id ,index2){//点击标签弹框 tab
      let item = this.tabs[index2];
      this.choose_tabs_id=item.cardId;
      this.followCardId=item.cardId;
      this.staffName=item.name;
      this.getdata();
      console.log('数据',item);

    },
    exportlist(){
      let that=this

      let params={};
      if(wx.getStorageSync("isBoss")){
        params={
          cardId:that.choose_tabs_id?that.choose_tabs_id:'',
          startTime:that.startTime,
          endTime:that.endTime,
        };

      }else{
        params={
          startTime:that.startTime,
          endTime:that.endTime,
        };
      }
      let url="/statistics/exportStatisticsExport"
      if(wx.getStorageSync("isBoss")){
        url='/statistics/exportCompanyStatisticsListExport';
      }


      WXAJAX.POST(params, '', url,'','',1,"1").then(data => {
        wx.downloadFile({
          url: data, //仅为示例，并非真实的资源
          success (res) {
            console.log(res);
            const filePath = res.filePath || res.tempFilePath
            wx.showToast({
            title: '导出成功',
            icon: 'success',
            duration: 1000
            })
            wx.openDocument({
              filePath,
              fileType: 'xlsx',
              success: function (res) {
                console.log('打开文档成功')
              }
            })
          }
        })
      });
    },
    filtrate() {
      this.editTab = !this.editTab;
    },
    select (index) {
      this.$emit('selectDate', index);
    }
  }
}
</script>
<style scoped>
.content{
  width: 100vw;
  height: 100vh;
}
.today-guid {
  height: 354upx;
  border-radius: 20upx 20upx 0 0;
  padding: 40upx 0 38upx 0;
  overflow: hidden;
}
.today-guid .today {
  padding-top: 80upx;
}
.flex-shrink {
  flex-shrink: 0;
  -webkit-box-shadow: 6rpx 0 20rpx 0rpx rgba(81,205,203,.2);  box-shadow: 6rpx 0 20rpx 0rpx rgba(81,205,203,.2);  border-radius: 10rpx;
}
</style>
