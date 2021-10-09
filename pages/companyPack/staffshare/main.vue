<template>
  <div class="item ">
    <list2 @changeData='changeData' @changeId='changeId'></list2>
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
            <span style="font-size: 24rpx;">{{ info.shareInfo }}</span>
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
 import list2 from '@/pages/companyPack/visitlist2/main.vue';
import { mapMutations } from "vuex";
import forwardBox from '@/components/forwardBox';
import util from '@/utils/index';
import WXAJAX from "@/utils/request";
export default {
  data() {
    return {
      chooseMonth:'',
      //获取选择的信息
      startTime:'',
      endTime:'',
      choose_tabs_id:"",
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
        library:{
          isSelect:false,
          name:'分享给我',
          type:'1',
          style:'color:#51CDCB'
        }
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
  created(){
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
  components:{forwardBox,list2},
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
      this.chooseMonth = date.year + '-' + date.month
      this.startTime=this.chooseMonth + '-01 00:00:00'
      this.endTime=this.chooseMonth + '-'+date.date+' 23:59:59'
    },
    getDaysInMonth(year,month){
        let temp = new Date(year,month,0);
        let mm = temp.getDate(); //这里mm就是天数啦
        this.mm = mm
        this.startTime=this.chooseMonth + '-01 00:00:00'
        this.endTime=this.chooseMonth + '-'+this.mm+' 23:59:59'
        console.log(this.mm,33333333333)
        this.shareData = ''
        this.getqueryDynamicData(this.status,1,1);
    },
    ...mapMutations(["setShareRecordsInfo","setCompanyId","setInitialization"]),
    //获取时间
    changeData(e){
      this.chooseMonth = e
    },
    changeId(e){
      this.choose_tabs_id = e
      this.shareData = ''
      this.getqueryDynamicData(this.status,1,1);
    },
    //点击切换
    select(i){
      this.page = 1
      for(var j in this.option){
        this.option[j].isSelect = false
        this.option[i].isSelect = true
        this.status = this.option[i].type
      }
      this.shareData = '';
      this.getqueryDynamicData(this.status,1,this.page)
    },
    async getqueryDynamicData(type,queryType,page) {
      console.log(this.endTime,444444444444)
      this.isLoading = true;
      wx.showLoading({});
      try {
        let data = '';
        data = await WXAJAX.POST(
          { pageNum:page,pageSize:10,shareStartTime:this.startTime,shareEndTime:this.endTime,fromUserId:this.choose_tabs_id},
          "",
          "/share/record/list/companySharedDynamic",'','',1
        );
        if (data.list) {
            for(var i=0;i<data.list.length;i++){
                data.list[i].shareInfo="员工："+data.list[i].fromUserName+"分享给"+ data.list[i].toCompanyName + data.list[i].toUserName
            }
            if(this.page === 1){
                this.shareData = data.list || [];
            }else{
                this.shareData = [...this.shareData, ...data.list] || [];
            }
            this.page++;
        }else{
          this.shareData = ''
          this.page = 1;
        }
        this.isLoading = false;
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
      this.getqueryDynamicData(this.status,1,this.page);
    },
    exportlist(){//导出PDF文档
    wx.showLoading();
    // wx.hideLoading();
    // if(this.status==2){
      console.log({
        srcPath:'http://test1.mingyicloud.com/card/shareCompany.html?token='+wx.getStorageSync('token')+'&status='+this.status+'&shareStartTime='+this.startTime+'&shareEndTime='+this.endTime+'&fromUserId='+this.choose_tabs_id,
        destPath:'1.pdf',
      })
      // wx.hideLoading();
      // return ;
      WXAJAX.POST({
        srcPath:'http://test1.mingyicloud.com/card/shareCompany.html?token='+wx.getStorageSync('token')+'&status='+this.status+'&shareStartTime='+this.startTime+'&shareEndTime='+this.endTime+'&fromUserId='+this.choose_tabs_id,
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
     this.page = 1
     console.log('onLoad结果');

  },
  watch: {
  	 chooseMonth(val) {
  	     let mm = val.split('-');    //把2020-11变成需要传输的样子：2020和11
  	     this.getDaysInMonth(mm[0],mm[1])
  	 },
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
  width: 490upx;
  height: 75upx;
  font-weight: 600;
  word-break: break-all;
  display: -webkit-box; /**对象作为伸缩盒子模型展示**/
  -webkit-box-orient: vertical; /**设置或检索伸缩盒子对象的子元素的排列方式**/
  -webkit-line-clamp: 2; /**显示的行数**/
  overflow: hidden; /**隐藏超出的内容**/
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 120upx;
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
