<template>
  <div style="background-color: #fff;">

        <ClientAddModal :status="editTab"
                        :tabs="tabs"
                        :choose_tabs_id="choose_tabs_id"
                        @modal_tab_tap="modal_tab_tap"
                        @modal_btn_tap="modal_btn_tap"
                        @closeModal="editTab = false"
        ></ClientAddModal>

        <div class="visit-rank bgfff" style="margin-bottom: 20rpx;">
            <span class="be8 lh25 pl9 pr10 bradius3 c80" style="margin-left: 150rpx; font-size: 30rpx;">
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
            <span class="be8 lh25 pl9 pr10 bradius3 c80" style="font-size: 30rpx;margin-left: 20rpx;">
                  <picker class='time-picker disinblock pr10' :range="topRange" @change="topChange">
                      TOP:{{topNum}}
                  </picker>
                  <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/down.png" alt=""
                                    class="w10 h10"/>
            </span>
            <!-- <span class="be8 lh25 pl9 pr10 bradius3 c80" @click="exportlist"  style="font-size: 30rpx;margin-left: 20rpx;">
                  导出
                  <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/down.png" alt=""
                                    class="w10 h10"/>
            </span> -->
          </TitleSlot>
        </div>
        <div class="visit-rank bgfff">
          <TitleSlot title="跟进个人客户"
                     subtitle="CUSTOMER">
          </TitleSlot>
        </div>
        <div class="visit-rank bgfff" style="color:#787878;padding-bottom: 20rpx;font-size: 27rpx;">与{{customerNum1}}位个人客户沟通了{{followNum1}}次</div>
        <div class="tables" style="padding-bottom: 50rpx;margin-top: 40rpx;">
          <div class="title cblue tr fs12">
            <span class="fblod">客户名称</span>
            <span>所属公司</span>
            <span>职位</span>
            <span>沟通次数</span>
            <span>客户类型</span>
          </div>
          <scroll-view style="height: 300rpx;"
                       :scroll-y="true"
                       :enable-back-to-top="true"
                       :scroll-anchoring="true"
                       @scrolltolower="scrolltolower1">

                       <div class="tr fs12 ca8" v-for="(v , k) in list1" :key="k"  style="line-height:normal;">
                         <span style="overflow:hidden;">{{v.customerName}}</span>
                         <span style="overflow:hidden;">{{v.customerCompanyName}}</span>
                         <span style="overflow:hidden;">{{v.customerPosition==''?v.customerPosition:'无'}}</span>
                         <span style="overflow:hidden;">{{v.followNum}}</span>
                         <span style="overflow:hidden;">{{v.majorCustomer?'重点':'普通'}}</span>
                       </div>
          </scroll-view>
        </div>

        <div class="visit-rank bgfff">
          <TitleSlot title="跟进单位客户"
                     subtitle="CUSTOMER">
          </TitleSlot>
        </div>
        <div class="visit-rank bgfff" style="color:#787878;padding-bottom: 20rpx;font-size: 27rpx;">与{{customerNum2}}位单位客户沟通了{{followNum2}}次</div>

        <div class="tables" style="margin-top: 40rpx;padding-bottom: 200rpx;margin-bottom: 50rpx;">
          <div class="title cblue tr fs12">
            <span class="fblod">单位名称</span>
            <span>受访人</span>
            <span>职位</span>
            <span>沟通次数</span>
            <span>客户类型</span>
          </div>
          <scroll-view style="height: 300rpx;"
                       :scroll-y="true"
                       :enable-back-to-top="true"
                       :scroll-anchoring="true"
                       @scrolltoupper='scrolltoupper'
                       @scrolltolower="scrolltolower">

                       <div class="tr fs12 ca8" v-for="(v , k) in list2" :key="k" style="line-height:normal;">
                         <span style="overflow:hidden;">{{v.customerCompanyName}}</span>
                         <span style="overflow:hidden;">{{v.customerName}}</span>

                         <span style="overflow:hidden;">{{v.customerPosition==''?v.customerPosition:'无'}}</span>
                         <span style="overflow:hidden;">{{v.followNum}}</span>
                         <span style="overflow:hidden;">{{v.majorCustomer?'重点':'普通'}}</span>
                       </div>
          </scroll-view>

          <!-- <div class="tr fs12 ca8">
            <span>客户姓名</span>
            <span>{{sceneDataList.visitUserCount.cardCount||0}}</span>
            <span>{{sceneDataList.visitUserCount.appointmentCount||0}}</span>
            <span>{{sceneDataList.visitUserCount.shopCount||0}}</span>
            <span>{{sceneDataList.visitUserCount.dynamicCount||0}}</span>
          </div> -->
        </div>

  </div>
</template>
<script>
import WXAJAX from "../../../utils/request";
import TitleSlot from "@/components/TiTleSlot";
import VisitorItem from "../components/VisitorItem";
import NoData from '@/components/noData';
import ClientAddModal from './clientAddModal' // 订单项

export default {
  props: {
    visitorList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    TitleSlot,
    VisitorItem,
    NoData,
    ClientAddModal,
  },
  data () {
    return {
      topNum:5,
      topRange:[5,10,20,50,100],
      customerNum1:0,
      followNum1:0,
      customerNum2:0,
      followNum2:0,
      staffName:'全部',
      followCardId:0,
      chooseMonth: '2021-03',//本月业绩选择的时间
      index: 0,
      editTab:false ,
      choose_tabs_id:0,
      startTime:'2021-03-01',
      endTime:'2021-03-31',
      tabs:[],
      list1:[],
      list2:[],
      pageNum2:1,
      pageNum1:1,
      screen:wx.getStorageSync("isBoss"),
      array: [
        { title: "全部", id: '' },
        { title: "查看名片", id: 1 },
        { title: "重视产品", id: 2 },
        { title: "关注动态", id: 4 },
        { title: "关注机构", id: 3 },
        { title: "视频营销", id: 6 },
        // { title: "全部", id: 5 }
      ]
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

    this.startTime=this.chooseMonth + '-01'
    this.endTime=this.chooseMonth + '-'+mm

    this.getstaff();
    if(wx.getStorageSync("isBoss")){ //老板
      this.getdata1(this.pageNum1,0);
      this.getdata1(this.pageNum2,1);
    }else{//员工
      this.getdata2(this.pageNum1,0);
      this.getdata2(this.pageNum2,1);
    }

    console.log(this.visitorList)
  },
  methods: {
    getstaff () {
      let that=this
      WXAJAX.POST({ ignore: true }, "", "/businessCard/getCompanyStaffList","","","","1").then(
        data => {
          if (data) {
            that.tabs[0] ={cardId: 0,name:'全部'};
            for(var i=0;i<data.list.length;i++){
              that.tabs.push(data.list[i])
            }

            // that.tabs = ;
          }
          console.log('测试数据',that.tabs);
        },
        error => {
          console.log("error", error);
        }
      );
    },
    exportlist(){//导出PDF文档
    wx.showLoading();

     let that=this
     let isBoss=wx.getStorageSync("isBoss")?0:1;
     let followCardId=that.followCardId?that.followCardId:''
     // follow/customer
     console.log({
        srcPath:'http://test1.mingyicloud.com/card/follow/total.html?token='+wx.getStorageSync('token')+'&isBoss='+isBoss+'&followCardId='+followCardId+'&endTime='+this.endTime+'&startTime='+this.startTime+'&topNum='+this.topNum,
        timeOut:10,
        destPath:'1.pdf',
      })
      // wx.hideLoading();
      // return ;
      WXAJAX.POST({
        srcPath:'http://test1.mingyicloud.com/card/follow/total.html?token='+wx.getStorageSync('token')+'&isBoss='+isBoss+'&followCardId='+followCardId+'&endTime='+this.endTime+'&startTime='+this.startTime+'&topNum='+this.topNum,
        timeOut:10,
        destPath:'1.pdf',
      }, '', '/htmlToPdf/htmlToPdf','','',1,"").then(data => {
        wx.downloadFile({
          url: data, //仅为示例，并非真实的资源
          success (res) {
            wx.hideLoading();
            console.log(res);
            const filePath = res.filePath || res.tempFilePath
            wx.showToast({
            title: '导出成功',
            icon: 'success',
            duration: 1000
            })
            wx.openDocument({
              filePath,
              fileType: 'pdf',
              success: function (res) {
                console.log('打开文档成功')
              }
            })
          }
        })
      });
    },
    // exportlist(){//导出execl
    //   let that=this

    //   let params={};
    //   if(wx.getStorageSync("isBoss")){
    //     params={
    //       followCardId:that.followCardId?that.followCardId:'',
    //       cardType:0,
    //       startTime:that.startTime,
    //       endTime:that.endTime,
    //     };

    //   }else{
    //     params={
    //       cardType:1,
    //       startTime:that.startTime,
    //       endTime:that.endTime,
    //     };
    //   }
    //   let url="/followRecord/queryMyFollowStatisticsListExport"
    //   if(wx.getStorageSync("isBoss")){
    //     url='/followRecord/queryCompanyFollowStatisticsListExport';
    //   }


    //   WXAJAX.POST(params, '', url).then(data => {
    //     wx.downloadFile({
    //       url: data, //仅为示例，并非真实的资源
    //       success (res) {
    //         console.log(res);
    //         const filePath = res.filePath || res.tempFilePath
    //         wx.showToast({
    //         title: '导出成功',
    //         icon: 'success',
    //         duration: 1000
    //         })
    //         wx.openDocument({
    //           filePath,
    //           fileType: 'xlsx',
    //           success: function (res) {
    //             console.log('打开文档成功')
    //           }
    //         })
    //       }
    //     })
    //   });
    // },
    bindPickerChange (e) {
      this.index = e.detail.value;
      this.$emit("changeSeeType", this.array[this.index].id);
    },
    modal_tab_tap( id ,index2){//点击标签弹框 tab
      let item = this.tabs[index2];
      this.choose_tabs_id=item.cardId;
      this.followCardId=item.cardId;
      this.staffName=item.name;
      this.list1=[];
      this.list2=[];
      this.getdata1(this.pageNum1,0);
      this.getdata1(this.pageNum2,1);
      console.log('数据',item);

    },
    datePickerChange(e) {//本月业绩选择时间
      let _time = e.target.value.split('-');
      console.log(_time)
      let temp = new Date(_time[0],_time[1],0);
      _time = _time[0] + '-' + _time[1];
      this.chooseMonth = _time;
      wx.showLoading();

      let mm = temp.getDate(); //这里mm就是天数啦
      this.startTime=_time + '-01'
      this.endTime=this.chooseMonth + '-'+mm

      this.list1=[];
      this.list2=[];
      this.pageNum1=1
      this.pageNum2=1
      this.getdata1(this.pageNum1,0);
      this.getdata1(this.pageNum2,1);

      setTimeout(function () {
        wx.hideLoading();
      }, 1000)
    },
    getdata1(pageNum,type){
      let that=this
      let params={
        followCardId:that.followCardId?that.followCardId:'',
        ascriptionId:that.followCardId?that.followCardId:'',
        cardType:type,
        startTime:that.startTime,
        endTime:that.endTime,
        pageNum: pageNum ,
        start: that.topNum ,
      };
      console.log(params);
      // WXAJAX.POST(params, "", "/followRecord/queryListCompanyCustomerTopN",'','',1).then(
      WXAJAX.POST(params, "", "/followRecord/queryListCompanyStatisticsFollow","","","","1").then(
        data => {
          if (data) {
            // that.list=data.pageInfo.list
            if(type){
              that.customerNum1=data.allFollowStatistics[0].customerNum
              that.followNum1=data.allFollowStatistics[0].followNum
            }else{
              that.customerNum2=data.allFollowStatistics[0].customerNum
              that.followNum2=data.allFollowStatistics[0].followNum
            }
            console.log(data)
          }
        },
        error => {
          console.log("error", error);
        }
      );

      WXAJAX.POST(params, "", "/followRecord/queryListCompanyCustomerTopN",'','',1,"").then(
      // WXAJAX.POST(params, "", "/followRecord/queryListCompanyStatisticsFollow").then(
        data => {
          if (data) {
            if(that.pageNum === 1){
                if(type){
                  that.list1=data || [];
                }else{
                  that.list2=data || [];
                }

            }else{
              if(type){
                that.list1 = [...that.list1, ...data] || [];
              }else{
                that.list2 = [...that.list2, ...data] || [];
              }
            }
            console.log(data)
          }
        },
        error => {
          console.log("error", error);
        }
      );
    },
    getdata2(pageNum,type){
      let that=this
      let params={
        cardType:type,
        startTime:that.startTime,
        endTime:that.endTime,
        pageNum: pageNum ,
        start:that.topNum,
      };
      console.log(params);
      // WXAJAX.POST(params, "", "/followRecord/queryListMyCustomerTopN",'','',1).then(
      WXAJAX.POST(params, "", "/followRecord/queryListMyStatisticsFollow","","","","1").then(
        data => {
          if (data) {
            // that.list=data.pageInfo.list
            if(type){
              that.customerNum2=data.allFollowStatistics[0].customerNum
              that.followNum2=data.allFollowStatistics[0].followNum
            }else{
              that.customerNum1=data.allFollowStatistics[0].customerNum
              that.followNum1=data.allFollowStatistics[0].followNum
            }
            console.log(data)
          }
        },
        error => {
          console.log("error", error);
        }
      );

      WXAJAX.POST(params, "", "/followRecord/queryListMyCustomerTopN",'','',1,"1").then(
      // WXAJAX.POST(params, "", "/followRecord/queryListMyStatisticsFollow").then(
        data => {
          if (data) {

            if(that.pageNum === 1){
                if(type){
                  that.list1=data || [];
                }else{
                  that.list2=data || [];
                }

            }else{
              if(type){
                that.list1 = [...that.list1, ...data] || [];
              }else{
                that.list2 = [...that.list2, ...data] || [];
              }

            }
          }
        },
        error => {
          console.log("error", error);
        }
      );
    },
    filtrate() {
      this.editTab = !this.editTab;
    },
    topChange(e){

      this.topNum=this.topRange[e.detail.value];

      this.list1=[];
      this.list2=[];
      this.pageNum1=1
      this.pageNum2=1
      if(wx.getStorageSync("isBoss")){ //老板
        this.getdata1(this.pageNum1,0);
        this.getdata1(this.pageNum2,1);
      }else{//员工
        this.getdata2(this.pageNum1,0);
        this.getdata2(this.pageNum2,1);
      }
    },
    clickVistor (info) {
      this.$emit("clickVistor", info.cardId, info.userId);
    },
    //下拉刷新
    scrolltoupper() {
      console.log("测试下拉刷新");
      this.pageNum2 = 1;
      // this.getdata2(this.pageNum2);
    },
    //上拉加载更多
    scrolltolower() {
      console.log("测试上拉加载更多");

      this.pageNum2 = this.pageNum2+1;
      if(wx.getStorageSync("isBoss")){
        this.getdata1(this.pageNum2,1);
      }else{
        this.getdata2(this.pageNum2,1);
      }

      // this.getdata2(this.pageNum2,0);
    },
    scrolltolower1() {
      this.pageNum1 = this.pageNum1+1;
      if(wx.getStorageSync("isBoss")){
        this.getdata1(this.pageNum1,0);
        // this.getdata1(this.pageNum2,1);
      }else{
        this.getdata2(this.pageNum1,0);
        // this.getdata2(this.pageNum2,1);
      }

    }
  }
};
</script>
<style scoped>

  .client_modal{
      position: fixed;
      top: 168upx;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.5);
      z-index: 99;
      transition: .3s;
      overflow: hidden;
  }
  .client_modal.h0{
      height: 0;
      border-top: 0;
  }

 .tables {
   padding: 0 32upx;
 }
 .tables .tr {
   height: 78upx;
   line-height: 78upx;
   display: flex;
   justify-content: space-around;
   align-items: center;
 }
 .tables .tr:nth-of-type(2n) {
   background-color: #fff;
 }
 .tables .tr:nth-of-type(2n + 1) {
   background-color: #f5f5f6;
 }
 .tables .title {
   border-radius: 20upx 20upx 0 0;
   background-color: #edfafa !important;
 }
 .tables .tr span:nth-of-type(n + 1) {
   width: 16%;
   text-align: center;
 }
 .tables .tr span:nth-of-type(1) {
   font-weight: bold;
   color: #787878;
   width: 20%;
 }
 .tables .title span:nth-of-type(1) {
   font-weight: bold;
   color: #52cdcc;
 }
.show-data-tab {
  /* min-height: 632upx; */
  background: #fff;
  position: relative;
  padding-top: 40upx;
}

.swiper {
  height: 400upx;
  margin-top: 60upx;
}
/* 自定义轮播图的指示点 */
.dots {
  width: 100%;
  height: 10upx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60upx;
}
/*未选中时的小圆点样式 */
.dot {
  margin-right: 8rpx;
  width: 26upx;
  height: 10upx;
  border-radius: 6upx;
  background-color: #e8e8e8;
}
/*选中以后的小圆点样式  */
.active {
  background-color: #51cdcb;
}
.visit-rank {
  /* max-height: 904upx; */
  padding: 0 30upx;
}
.picker {
  border: 1px solid #e8e8e8;
  font-size: 24upx;
  width: 184upx;
  height: 48upx;
  line-height: 48upx;
  color: #808080;
  padding-left: 18upx;
  /* margin-right: 30upx; */
}
.bottom-arrow {
  position: absolute;
  right: 22upx;
  top: 40%;
  transform: rotate(90deg);
}

.searchText{
    cursor:auto;
    display:inline-block;
    height:68upx;
    max-width:100%;
    padding-left:20upx;
    text-align:left;
    line-height:68upx;
    font-size:28upx;
    color:#A8A8A8;

  }
  .client_type .active {
    color: #51CDCB;
    border-bottom: 4upx solid #51CDCB;
  }

  .client_type .active p{
    color: #51CDCB;
  }

  .client_type .active .name {
    font-weight: bold;
  }

  .search {
    justify-content: center;
    transition:.2s;
  }

  .search.focus {
    justify-content: flex-start;
  }

  .search.focus input {
    width: auto;
  }

  .user_add{
    bottom: 30upx;
    right: 30upx;
    width: 120upx;
    height: 120upx;
    background: #51CDCB;
    border-radius: 50%;

  }

  .choose_type .tab_modal{
    top: 212upx;
    overflow: hidden;
    flex-flow: inherit;
    display: block;
  }

  .choose_type .tab_modal>div{
    width: 100%;
    padding-bottom: 0;
  }

  .choose_type .tab_modal.hidden{
    height: 0;
  }

  .choose_type .tab_modal .fix_bottom{
    position: unset;
  }

</style>
<style scoped>
.filtrate_selec{
  display: flex;
  align-items: center;
  justify-content:space-between;
  width: 100upx;
  height: 34upx;
  border-radius: 68upx;
  color: #A8A8A8;
  font-size: 28upx;
  margin-left:21upx;
  padding: 20upx 30upx;
  background:rgba(245,245,246,1);
}
.filtrate{
  display: flex;
  align-items: center;
  justify-content:space-between;
  width: 100upx;
  height: 34upx;
  border-radius: 68upx;
  color: #51CDCB;
  font-size: 28upx;
  padding: 20upx 30upx;
  margin-left:21upx;
  background:#EDFAFA;
}
</style>
