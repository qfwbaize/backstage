<template>
  <div class="item ">
    <div class="visit-rank bgfff">
        <span class="be8 lh25 pl9 pr10 bradius3 c80" style="margin-left: 400rpx; font-size: 30rpx;">
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
       <!-- <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/right.png" alt class="w10 h10 bottom-arrow" /> -->
      </TitleSlot>
    </div>
<!--    <div class="share-records">
      <div class="share-records-top">
        <div class="title"
        v-for="(item,index) in option"
        :key="index"
        @click="select(index)">
          <div class="select" :style="item.isSelect == true ? item.style : ''">
          {{item.name}}
            <div class="select-line"
                 v-if="item.isSelect == true"></div>
          </div>
        </div>
      </div>
    </div> -->
    <scroll-view :style="{height: scrollContentHeight+'px'}"
                 class="dynamic-content"
                 :scroll-y="true"
                 :enable-back-to-top="true"
                 :scroll-anchoring="true"
                 @scrolltoupper='scrolltoupper'
                 @scrolltolower="scrolltolower">
      <div class="item-box bgfff" v-for="info in shareData" :key="info.dynamicId">
        <div @click="toDetail(info.dynamicId,info.shareId)" class="middle flex-base pl15 pr15">
          <img :src="info.photos"
               alt=""
               mode="aspectFill"
               class="w60 h60 bradius5 " />
          <div class="content pl15">
            <p class="fs14 c38 title">
              {{ info.title }}
            </p>
            <span style="font-size: 24rpx;font-size:10px;width:490rpx;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-box-orient: vertical; -webkit-line-clamp: 2;">{{ info.shareInfo }}</span>
          </div>
        </div>
        <div class="flex-base bottom h44 pl15 pr15">
          <div class="flex-base">
             <span class="fs12 ca8">{{ info.createTimeStr }}</span>
          </div>
          <div class=" h25 cblue fs12 btn-box">
            <button class="skip-btn share cfff bgblue" open-type="share" :data-info="info" style="background-color: #51cdcb; color: white;">立即分享</button>
            <!-- <div class="skip-btn share cfff bgblue" @click="shareNow(info.dynamicId,info.companyId)">立即分享</div> -->
            <div class="skip-btn share cfff bgblue" @click="shareNow2(info.dynamicId,info.companyId)">站内分享</div>
            <div class="skip-btn share cfff bgblue" @click="shareNow3(info.dynamicId,info.companyId)">精准转发</div>
          </div>
        </div>
      </div>
    </scroll-view>
    <!-- <div class="textc disflex w60 h60 bradius50p bgblue disinblock goToUserCenter" @click="exportlist">
      <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/user_add.png" alt="" class="w30 h30 mt15">
    </div> -->
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import forwardBox from '@/components/forwardBox';
import util from '@/utils/index';
import WXAJAX from "@/utils/request";
export default {
  props: {
    info: {
      type: Object | Array
    },
    libraryData:{
      type: Object | Array
    },
    shareData:{
      type: Object | Array
    }
  },
  data() {
    return {
      time: "",
      maskShow:false,
      //控制tab切换
      option:{
        Shared:{
          isSelect:true,
          name:'我的分享',
          type:'2',
          style:'color:#51CDCB'
        },
        // library:{
        //   isSelect:false,
        //   name:'分享给我',
        //   type:'1',
        //   style:'color:#51CDCB'
        // }
      },
      status:2,
      contact:'',
      page: 1,
      isLoading: false, //数据加载中
      list: [],
      filterCriteria:'最新发布',
      filterTypesShow:false,
      dropdownImg:WXAJAX.imgBackUrl+'/product-index/down-s.png',
      //控制item组件样式的参数
      shareData:'',
      libraryData:'',
      companyId:wx.getStorageSync('COMPANYID'),
      queryType:1,
      scrollContentHeight:0,
      defaultFilter:'最新发布',
      startTime:'2021-03-01 00:00:00',
      endTime:'2021-03-31 23:59:59',
      chooseMonth: '',//本月业绩选择的时间
    };
  },
  async onShareAppMessage(e) {//分享文章。添加分享记录
    var info=e.target.dataset.info;
    var params={
      dynamicId:info.dynamicId,
      shareSource:2,
    }
    var sharedata = await WXAJAX.POST(params , '', '/share/record/add','','',1);
    return {
      title: info.title,
      path: '/pages/companyPack/find/dynamicDetail/main?dynamicId='+info.dynamicId+'&goType=1&shareId='+sharedata.shareId+'&fromUserId='+sharedata.fromUserId,
      imageUrl:info.photos,
      success: () => {
        uni.showToast({
          title: '分享成功',
          icon: 'none'
        })
      }
    }

  },
  watch:{
    contact(newVal,oldVal){
      if(this.contact === 1){
        wx.navigateBack({
          delta:1
        })
      }
    }
  },
  onShow() {
    this.searchkey = '';
    this.isfresh = true;
    this.card_msg = {};
    this.page = 1;
    this.hasCard = wx.getStorageSync('hasCard') || false;
    this.avatarUrl = wx.getStorageSync('avatarUrl');



    this.getAllCard();

  },
  onHide() {
    // this.addInfo = false;
    this.addDate()
  },
  mounted() {
    var info = this.info
  },
  async mounted() {
    let a = await util.systemIfo();
    let navHeight = getApp().globalData.navHeight;
    this.scrollContentHeight = a.windowHeight;
  },
  components:{forwardBox},
  methods: {
    ...mapMutations(["setShareRecordsInfo","setCompanyId","setInitialization"]),
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
    datePickerChange(e) {//本月业绩选择时间
      // _time = _time[0] + '-' + _time[1];
      // this.chooseMonth = _time;
      // wx.showLoading();
      // this.startTime=this.chooseMonth + '-01'
      // this.endTime=this.chooseMonth + '-'+mm
      // this.startTime=_time + '-01 00:00:00'
      // this.endTime=_time + '-31 23:59:59'
      // this.page=1;
      // // this.getAllCard();
      // console.log('123123',this.page)
      // this.getqueryDynamicData(this.status,1,this.page)

      // setTimeout(function () {
      //   wx.hideLoading();
      // }, 1000)

      let _time = e.target.value.split('-');
      console.log(_time)
      let temp = new Date(_time[0],_time[1],0);
      console.log("temp",temp)
      _time = _time[0] + '-' + _time[1];
      this.chooseMonth = _time;
      wx.showLoading();
      let mm = temp.getDate(); //这里mm就是天数啦
      console.log('mm',mm)
      this.startTime=this.chooseMonth + '-01'
      this.endTime=this.chooseMonth + '-'+mm
      this.page=1;
      this.getqueryDynamicData(this.status,1,this.page)
      setTimeout(function () {
        wx.hideLoading();
      }, 1000)

    },
    //点击切换
    // select(i){
    //   this.page = 1
    //   for(var j in this.option){
    //     this.option[j].isSelect = false
    //     this.option[i].isSelect = true
    //     this.status = this.option[i].type
    //   }
    //   this.shareData = '';
    //   this.getqueryDynamicData(this.status,1,this.page)
    // },
    async getqueryDynamicData(type,queryType,page) {
      let that = this

      console.log('page111',page)
      this.isLoading = true;
      wx.showLoading({});
      try {
        let data = '';
        if(this.status==2){
          data = await WXAJAX.POST(
            { pageNum:page,pageSize:10,shareStartTime:that.startTime,shareEndTime:that.endTime,},
            "",
            "/share/record/list/mySharedDynamic",'','',1
          );
        }else{
          data = await WXAJAX.POST(
            { pageNum:page,pageSize:10},
            // { pageNum:page,pageSize:10},
            "",
            "/share/record/list/sharedMyDynamic",'','',1
          );
        }
        console.log('ad',data)
        if (data) {
            for(var i=0;i<data.list.length;i++){
               data.list[i].shareInfo="分享给"+ data.list[i].toCompanyName + data.list[i].toUserName
            }
            if(this.page === 1){
                this.shareData = data.list || [];
                  console.log('this.shareData1',this.shareData)
            }else{
                this.shareData = [...this.shareData, ...data.list] || [];
                console.log('this.shareData2',this.shareData)
            }
            // this.page++;
            this.list = data.list;
        }else{
            if(this.page === 1){//如果接口没返回数据  当前页又是第一页的时候 直接数据置空
            console.log('this.shareData4',this.shareData)
              this.shareData = []
            }
        }
        this.isLoading = false;
        console.log('this.shareData3',this.shareData)
        wx.hideLoading();
      } catch (error) {
        this.isLoading = true;
        wx.hideLoading();
      }
    },
    toDetail(dynamicId,shareId) {//查看文章详情
      let type=1
      if(this.status!=2){
        type=2;
      }
      let url = '../../article/dynamicDetail/main?dynamicId=' + dynamicId +'&insideShareId=' + shareId + '&type=' + type;
      wx.navigateTo({ url: url })
    },
    //跳转访客
    lookDetails(info) {
      //重置每次跳转后page
      var id = info.dynamicId
      // if(info.seeNum == 0){
      //   wx.showToast({
      //     title:'该文章没有浏览记录，请稍后再来~',
      //     icon:'none'
      //   })
      //   return false
      // }
      this.setShareRecordsInfo({ ...this.info, time: this.time });
      wx.navigateTo({
        url: "../shareRecordDetails/main?id=" + id
      });
    },
    //删除文章按钮
    deleteArticle(id){
      let than = this
      wx.showModal({
        title:'提示',
        content:'删除后无法恢复',
        cancelColor:'#51CDCB',
        success(res){
          if(res.confirm){
            than.$emit('deleteArticle',id)
          }else if(res.cancel){
            console.log('用户点击了取消')
          }
        },
        f
      })
    },
    //跳转文章分享
    //did:文章id cid为公司id
    shareNow(did,cid,item,type){
      if(type == 'now'){
        console.log(item)
        // this.maskShow = true
        return
      }
      wx.navigateTo({
       url:`../shareNow/main?id=${did}&cid=${cid}`
      })
    },
    shareNow2(did,cid,item,type){
      if(type == 'now'){
        console.log(item)
        // this.maskShow = true
        return
      }
      wx.navigateTo({
       url:`../choosefriends/main?id=${did}&cid=${cid}&saveType=1`
      })
    },
    shareNow3(did,cid,item,type){
      wx.navigateTo({
       url:`../accurateShare/main?id=${did}&cid=${cid}&saveType=2`
      })
    },
    //创建任务
    toCreateTask(id){
      this.setCompanyId(id)
      //type1代表创建任务
      var type = 1
      wx.navigateTo({
        url:`../createTask/main?type=${type}`
      })
    },
    //编辑任务
    toEditTask(id,tid){
      //tid为任务id
      var type = 2
      //type2代表编辑任务
      this.setCompanyId(id)
      wx.navigateTo({
        url:`../createTask/main?type=${type}&tid=${tid}`
      })
    },
    mask_tag(){
      this.maskShow = false
    },
    mask_tag_stop(){
    },
    mask_cancel(){
      this.maskShow = false
    },
    contact_tag(res){
      this.contact = 1
      console.log(this.contact)
    },

    //下拉刷新
    scrolltoupper() {
      console.log("测试下拉刷新");
      this.page = 1;
      this.getqueryDynamicData(this.status,1,this.page);
    },
    //上拉加载更多
    scrolltolower() {
      console.log("测试上拉加载更多");

      this.page = this.page+1;
      console.log('xiala',this.page)
       this.getqueryDynamicData(this.status,1,this.page);
    },
    exportlist(){//导出PDF文档
      wx.showLoading();
      // wx.hideLoading();
    // if(this.status==2){
      console.log(wx.getStorageSync('COMPANYID'))
		console.log(456789,{
		 srcPath:'http://test1.mingyicloud.com/card/myshare.html?token='+wx.getStorageSync('token')+'&startTime='+this.startTime+'&endTime='+this.endTime+'&companyid='+wx.getStorageSync('COMPANYID'),
		  // srcPath:'http://test1.mingyicloud.com/card/recordList.html?visitingId=&token='+wx.getStorageSync('token')+'&visitingType=1'+'&startTime='+this.startTime+'&endTime='+this.endTime+'&screen='+this.screen+'&cardId='+choose_tabs_id,
		  destPath:'1.pdf',
		})
      WXAJAX.POST({
        srcPath:'http://test1.mingyicloud.com/card/myshare.html?token='+wx.getStorageSync('token')+'&startTime='+this.startTime+'&endTime='+this.endTime+'&companyid='+wx.getStorageSync('COMPANYID'),
        // srcPath:'http://test1.mingyicloud.com/card/share.html?token='+wx.getStorageSync('token')+'&status='+this.status,
        destPath:'1.pdf',
      }, '', '/htmlToPdf/htmlToPdf','','',1).then(data => {
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

  },
  onLoad() {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //获取年份  
    var Y =date.getFullYear();
    //获取月份  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);

    this.chooseMonth=Y+'-'+M;
    console.log("Y",Y)
    console.log("M",M)
    let temp = new Date(Y,M,0);
    console.log("temp",temp)
    let mm = temp.getDate(); //这里mm就是天数啦

    this.startTime=this.chooseMonth + '-01'
    this.endTime=this.chooseMonth + '-'+mm

    // this.getstaff();
    this.getqueryDynamicData(this.status,1,this.page)
  }
};
</script>
<style scoped>
  .goToUserCenter{
    position: fixed;
    right: 20upx;
    bottom: 102upx;
    z-index: 200;
    box-sizing: border-box;
    text-align: center;
  }
  .share-records{
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 92rpx;
  }
  .share-records-top{
    width: 100%;
    height: 88upx;
    display: flex;
    position: fixed;
    top: 0;
    justify-content:space-around;
    font-size: 32upx;
    color: #787878;
    background: #FFFFFF;
    align-items: center;
  }
  .select{
    box-sizing: border-box;
    padding-top: 27upx;
    display: block;
    height: 88upx;
    display: flex;
    flex-direction: column;
    align-items:center;
    position: relative;
  }
  .select-line{
    display: block;
    width: 100%;
    height: 4upx;
    background-color: #51CDCB;
    position: absolute;
    bottom: 0;
  }
  .share-records-content{
    flex: 1;
    padding: 118upx 30upx 0 30upx;
  }
  .dropdown{
    width: 200upx;
    height: 60upx;
    background-color: #F5F5F6;
    border-radius: 30upx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28upx;
    color: #A8A8A8;
    font-size: 28upx;
    float: right;
  }
  .dropdown image{
    width: 20upx;
    height: 20upx;
    margin-left: 8upx;
  }
  .list{
    margin-top: 80upx;
  }
.item {
  /* width: 690upx; */
}
.item-box{
  border-radius: 20upx;
  /* float: left; */
  margin-bottom: 20upx;
}
.flex-base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.middle {
  align-items: flex-start;
  height: 170upx;
  align-items: center;
}
.title {
     text-overflow: ellipsis;
     width: 490rpx;
     height: 74rpx;
     font-weight: 600;
     word-break: break-all;
     display: -webkit-box;
     -webkit-box-orient: vertical;
     -webkit-line-clamp: 2;
     overflow: hidden;

}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 140upx;
}
.bottom {
  border-top: 1upx solid #f8f8f8;
}
.btn-box{
  display: flex;
  align-items: center;
}
.skip-btn{
  height: 48upx;
  display: flex;
  align-items: center;
  border-radius: 6upx;
  font-size: 26upx;
  margin-right: 20upx;
  box-sizing: border-box;
  text-align: center;
  padding: 0 10upx 0 10upx;
}
.delete{
  border:1upx solid #E8E8E8;
}
.visitor{
  border:1upx solid #51CDCB;
}
</style>
