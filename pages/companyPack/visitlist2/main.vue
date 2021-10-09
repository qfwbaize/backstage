<template>
  <div class="card-main w100p bgf5f6 bgfff">
     <ClientAddModal :status="editTab"
                     :tabs="tabs"
                     :choose_tabs_id="choose_tabs_id"
                     @modal_tab_tap="modal_tab_tap"
                     @modal_btn_tap="modal_btn_tap"
                     @closeModal="editTab = false"
     ></ClientAddModal>
     <div class="visit-rank bgfff">
         <span v-if="type!=1" class="be8 lh25 pl9 pr10 bradius3 c80" style="margin-left: 400rpx; font-size: 30rpx;">
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
         <span v-else style="margin-left: 400rpx;"></span>
         <span class="be8 lh25 pl9 pr10 bradius3 c80" @click="filtrate" v-if="screen==true"  style="font-size: 30rpx;margin-left: 20rpx;">
               {{staffName}}
               <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/down.png" alt=""
                                 class="w10 h10"/>
         </span>
        <!-- <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/right.png" alt class="w10 h10 bottom-arrow" /> -->
       </TitleSlot>
     </div>
  </div>

</template>

<script>

import VisitItem from '@/components/visititem'
// import SelectorOne from '@/components/selectorOne'
import WXAJAX from '../../../utils/request'
import util from '../../../utils/index'
import { mapGetters, mapActions } from "vuex";
import ClientAddModal from './clientAddModal' // 订单项
export default {
  name: '',
  props: ['type'],
  // components: { MeCard, BusinessCard, SelectorOne, GetPhoneNumber, getPhoneNumberCard, AppNotice },
  components: { VisitItem,ClientAddModal},
  computed: {
    ...mapGetters(["article"])
  },
  data() {
    return {
      chooseMonth: '',//本月业绩选择的时间
      choose_tabs_id:'',
      startTime:'2021-03-01',
      endTime:'2021-03-31',
      tabs:[],
      staffName:'全部',
      editTab:false ,
      screen:wx.getStorageSync("isBoss"),
      searchkey: '',
      last_searchkey: '',
      isfocus: false,
      mine_card: {},
      lists: [],
      dynamicId:0,
      hasCard: wx.getStorageSync('hasCard') || false,//是否已经有名片
      addInfo: false,//显示添加的按钮
      card_msg: {
        picchecked: '',
        username: '',
        tel: '',
        wx: '',
        company_wx: '',
        email: '',
        post: '',
        company: '',
        company_logo: ''
      },
      phoneMsg: {
        phoneData: '',
        iv: '',
      },
      //名片操作
      operateID: 0,
      operateShow: false,
      operateTypes: [
        { name: '置顶', id: 'top' },
        // {name:'删除' , id:'del'},
      ],
      cardId: 0,//删除时使用
      isfresh: false,
      page: 1,
      isLoading: false,//是否在加载
      nodata: false,//是否已经没有数据
      isShowLogin: false,
      isShowNotice: true, // 是否显示公告
      noticeList: [],  // 公告列表
      avatarUrl: '',//用户的头像地址,
      isShowLoginGuide: false, //是否显示登录引导页,
      scrollContentHeight: 0, //中间滚动区域的高度
      mainHeight: 0, //整体高度
      total:0,//总页数
    }
  },
  onReachBottom() {
    // let v = this ;
    // v.getAllCard();

  },
  onShareAppMessage(e) {
    console.log(e.target.dataset)

    let cardId = e.target.dataset.cardid;
    let companyId = e.target.dataset.companyid;
    let companyName = e.target.dataset.companyname;
    let imgurl = e.target.dataset.logo || 'https://thirdwx.qlogo.cn/mmopen/vi_32/VTFUkCPPwZdpB21d9dtLXCdRra3OyEboJvo0KGcczrnGTX7uKhsyTOwCywAx3F2xicrGb8wYq8H9VpYLR0W5e8A/132'
    // let shareId = await addShareRecord(companyId, 1, cardId);
    let uuid = cardId + '' + new Date().getTime();
    addShareRecord(companyId, 1, cardId, uuid).then(res => { }, err => { });
    let { sharespeech = '', position, name } = e.target.dataset;
    sharespeech = sharespeech.replace('#name#', name).replace('#company#', companyName);

  },
  onUnload() {
    this.isShowLogin = false;
    this.isShowNotice = true;
    this.noticeList = [];
  },
  async onPullDownRefresh() {
      console.log("下拉刷新onPullDownRefresh")
      // to doing..
      // 停止下拉刷新
      wx.showNavigationBarLoading();
      this.page = 1;
      this.card_msg = {};
      this.searchkey = '';
      this.lists = [];
      this.nodata = false;
      this.isLoading = false;
      this.getAllCard();
      wx.stopPullDownRefresh();
      setTimeout(function () {
        wx.hideNavigationBarLoading();
      }, 300)
    },
    created(option) {

      // console.log("数据",this.article);

      this.getstaff();
    },
    mounted() {
      this.searchkey = '';
      this.isfresh = true;
      this.card_msg = {};
      this.page = 1;
      this.hasCard = wx.getStorageSync('hasCard') || false;
      this.avatarUrl = wx.getStorageSync('avatarUrl');

      var timestamp = Date.parse(new Date());
      var date = new Date(timestamp);


      this.startTime=this.chooseMonth + '-01'
      this.endTime=this.chooseMonth + '-31'

      this.getAllCard();

    },

    beforeDestroy() {
      this.addInfo = false;
    },
  onShow() {
    console.log("type",type);
  },

  onHide() {
    this.addInfo = false;
  },
  async mounted() {
    this.addDate()
   let a = new Promise(resolve => {
      wx.getSystemInfo({
        success: res => {
          let windowHeight = res.windowHeight;
          resolve({
            windowHeight
          });
        }
      });
    });
    // let a = await util.systemIfo();
    let navHeight = getApp().globalData.navHeight;
    this.mainHeight = a.windowHeight;
    console.log('navHeight',navHeight)
    console.log('windowHeight',a.windowHeight)
    this.scrollContentHeight = a.windowHeight - navHeight;
  },
  methods: {
    addDate () {
      let nowDate = new Date()
      let date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate()
      }
      if(date.month<10){
        date.month = '0'+date.month
      }
      if(date.date<10){
        date.date = '0'+date.date
      }
      this.chooseMonth = date.year + '-' + date.month
    },
    getstaff () {
      let that=this
      WXAJAX.POST({ ignore: true }, "", "/businessCard/getCompanyStaffList").then(
        data => {
          if (data) {
            that.tabs[0] ={cardId: '',name:'全部'};
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
      _time = _time[0] + '-' + _time[1];
      this.chooseMonth = _time;
      wx.showLoading();
      this.startTime=_time + '-01'
      this.endTime=_time + '-31'

      this.page=1;
      this.getAllCard();
      this.$emit('changeData',this.chooseMonth)
      setTimeout(function () {
        wx.hideLoading();
      }, 1000)
    },
    modal_tab_tap( id ,index2){//点击标签弹框 tab
      let item = this.tabs[index2];
      this.choose_tabs_id=item.cardId;
      this.followCardId=item.cardId;
      this.staffName=item.name;
      this.$emit('changeId',this.choose_tabs_id)
      this.page=1;
      this.getAllCard();
      console.log('数据',item);

    },
    //点击名片的拨打电话,回调需要登录
    needLogin() {
      this.isLogin = false;
      this.isShowLoginGuide = true;
    },
    //隐藏登录引导
    cancelLoginGuide() {
      this.isShowLoginGuide = false;
    },
    //下拉刷新
    scrolltoupper() {
      this.page = 1;
      this.searchkey = '';
      // this.card_msg = {} ;
      // this.lists = [] ;
      this.nodata = false;
      this.isLoading = false;
      this.getAllCard();
    },
    //上拉加载更多
    scrolltolower() {
      this.getAllCard();
    },
    createRecord(){
      wx.navigateTo({ url: "../addVisit/main" });
    },
    shareApp(companyId, cardId, companyName, name, logo) {
      return
      this.onShareAppMessage(companyId, cardId, companyName, name, logo)
    },
    search_focus() {
      this.isfocus = true;
    },
    search_confirm() {
      if (this.searchkey === this.last_searchkey) {
        return;
      }
      wx.showLoading();
      this.page = 1;
      this.card_msg = {};
      this.lists = [];
      this.nodata = false;
      this.isLoading = false;
      this.getAllCard();
    },
    getAllCard() {
      let v = this;
      let that = this;
      if (v.isLoading) {
        return
      }

      let url='/visiting/queryList'
      let params={
        intervieweeName: '',
        intervieweePhone:'',
        intervieweeCardId:'',
        pageNum: v.page,
        startTime:that.startTime,
        endTime:that.endTime,
      }
      if(this.screen){
        url='/visiting/queryListCompany'

        params={
          cardId:v.choose_tabs_id?v.choose_tabs_id:'',
          intervieweeName: '',
          intervieweePhone:'',
          intervieweeCardId:'',
          pageNum: v.page,
          startTime:that.startTime,
          endTime:that.endTime,
        }
      }

      v.isLoading = true;
      console.log("params",params)
      console.log("page",v.page)
      WXAJAX.POST(params, '', url,'','','1').then((data) => {
        this.last_searchkey = this.searchkey;
        // state : 1 -- 默认 ， 2 -- 浏览记录 ， 3 -- 自己的
        if (data && data.list) {
          let datas = [];
          this.total = data.total;
          data.list.forEach(function (i, k) {
            const cardData = {
              intervieweeCompanyName:i.intervieweeCompanyName || '',
              intervieweeLogo: i.intervieweeLogo || '',
              intervieweeName: i.intervieweeName || '',
              intervieweePhone: i.intervieweePhone || '',
              visitingId: i.visitingId || '',
              visitingNum: i.visitingNum || '0',
              intervieweeCardId: i.intervieweeCardId || ''
            };
            if (i.state === 3) {//默认名片
              v.card_msg = cardData;
            } else {
              cardData.createTime = util.getdate(i.createTime, 'dateTime');
              datas.push(cardData);
            }
          });

          if (v.page === 1) {
            this.lists = datas;
          } else {
            this.lists.push(...datas);
          }

          v.page++;

          if (!v.hasCard) {
            v.addInfo = true;
          }
        }else{
          this.lists =[];
        }
        setTimeout(function () {
          v.nodata = true;
          v.isLoading = false;
        }, 500);

        wx.hideLoading();
      }).catch((err) => {
        wx.hideLoading();
      });


    },
    exportlist(){//导出PDF文档
    let choose_tabs_id=this.choose_tabs_id?this.choose_tabs_id:''
      console.log({
        srcPath:'http://test1.mingyicloud.com/card/recordList.html?visitingId=&token='+wx.getStorageSync('token')+'&visitingType=1'+'&startTime='+this.startTime+'&endTime='+this.endTime+'&screen='+this.screen+'&cardId='+choose_tabs_id,
        destPath:'1.pdf',
      })
      WXAJAX.POST({
        srcPath:'http://test1.mingyicloud.com/card/recordList.html?visitingId=&token='+wx.getStorageSync('token')+'&visitingType=1'+'&startTime='+this.startTime+'&endTime='+this.endTime+'&screen='+this.screen+'&cardId='+choose_tabs_id,
        destPath:'1.pdf',
      }, '', '/htmlToPdf/htmlToPdf','','',1).then(data => {
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
              fileType: 'pdf',
              success: function (res) {
                console.log('打开文档成功')
              }
            })
          }
        })
      });
    },
    // exportlist(){//导出execl文档
    //   let page=this.page
    //   let url='/visitingInfo/exportMyVisitingInfoListExport'

    //   WXAJAX.POST({
    //     pageSize:10,
    //     pageNum:page,
    //     visitingId:'',
    //     visitingType:1,
    //     intervieweeName:'',
    //     intervieweePhone:'',
    //     intervieweeCardId:'',
    //   }, '', url,'','',1).then(data => {
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
    moreTap(recordId, cardId, isdel) {//更多操作
      this.operateID = recordId;
      this.cardId = cardId;
      if (isdel) {
        this.operateTypes = [
          { name: '置顶', id: 'top' },
          {name:'删除' , id:'del'},
        ];
      } else {
        this.operateTypes = [
          { name: '置顶', id: 'top' },
          {name:'删除' , id:'del'},
        ];
      }
      this.operateShow = true;
    },
    filtrate() {
      this.editTab = !this.editTab;
    }
  }
}
</script>

<style>
  .goToUserCenter{
    position: fixed;
    right: 20upx;
    bottom: 102upx;
    z-index: 200;
    box-sizing: border-box;
    text-align: center;
  }
.card-main {
  width: 100%;
  height: 100%;
}
.searchText {
  cursor: auto;
  display: inline-block;
  height: 68upx;
  max-width: 100%;
  padding-left: 20upx;
  text-align: left;
  line-height: 68upx;
  font-size: 28upx;
  color: #a8a8a8;
}
.search {
  justify-content: center;
}

.search.focus {
  justify-content: flex-start;
}

.search.focus input {
  width: auto;
}
page {
  width: 100%;
  height: 100%;
}
.add_card {
  position: fixed;
  right: 0;
  bottom: 90upx;
  z-index: 99;
  padding-right: 30upx;
  padding-left: 30upx;
  box-sizing: border-box;
  text-align: right;
}

.create-btn {
  transition: all 0.8s ease-in-out;
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 30upx;
  border-radius: 1998upx;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: white;
  position: relative;
}
.create-btn .create {
  flex-grow: 1;
  text-align: right;
}

.width-max {
  width: 100%;
}

.create-btn img {
  flex: 0 0 60upx;
}
.my-card-case {
  height: 36upx;
}
.card-case-num-img {
  /* display: inline-block; */
  width: 32upx;
  height: 32upx;
  /* border: 1upx dashed #444 */
}
.separator {
  display: inline-block;
  width: 8upx;
  height: 32upx;
  background: #51cdcb;
}
 .isboss-btn{
    height:88upx;
    width: 100%;
    position: fixed;
    bottom: 0;
    border-top-right-radius: 10upx;
    border-top-left-radius: 10upx;
    z-index: 999;
    text-align: center;
    line-height: 88upx;
    font-size: 36upx;
    color: #FFFFFF;
    background:linear-gradient(90deg,#41DDA1,#2BCF88)
  }
</style>
