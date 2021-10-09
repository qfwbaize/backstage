<template>
  <div class="share-records">
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
      <div class="dropdown"
      @click="filter_btn"
      >
        <p>{{defaultFilter}}</p>
        <image :src="dropdownImg"></image>
      </div>
    </div>
    <view style="height: 50rpx;margin-top: 88rpx;" v-if="status==1">
      <list2 style="height: 50rpx;" type='1' @changeData='changeData' @changeId='changeId'></list2>
    </view>
    <div :class="[status == 1 ? 'share-records-content' : 'share-records-content2']">

      <item class="list"
      :info="list"
      :status="status"
      :libraryData="libraryData"
      @shareArticle="shareArticle"
      :shareData="shareData"
      @deleteArticle="deleteArticle"/>
    </div>
    <SelectorOne
      :title="'选择筛选条件'"
      :status="filterTypesShow"
      :allClass="filterTypes"
      @closeModal="filterTypesShow = !filterTypesShow"
      @choose_tap="choosetap"
    ></SelectorOne>
    <!-- <div class="textc disflex w60 h60 bradius50p bgblue disinblock goToUserCenter" @click="exportlist" v-if="status==1">
      <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/user_add.png" alt="" class="w30 h30 mt15">
    </div> -->
  </div>
</template>
<script>
import list2 from '@/pages/companyPack/visitlist2/main.vue';
import item from "./components/shareRecordItem";
import WXAJAX from "@/utils/request";
import SelectorOne from "@/components/selectorOne";

export default {
  components: {
    item,
    SelectorOne,
    list2
  },
  data() {
    return {
      chooseMonth:'',
      //获取选择的信息
      startTime:'',
      endTime:'',
      choose_tabs_id:"",

      page: 1,
      isLoading: false, //数据加载中
      list: [],
      //控制tab切换
      option:{
        Shared:{
          isSelect:true,
          name:'已分享文章',
          type:'2',
          style:'color:#51CDCB'
        },
        library:{
          isSelect:false,
          name:'机构文库',
          type:'1',
          style:'color:#51CDCB'
        }
      },
      filterTypes: [
        { name: "最新发布", id: "newest" },
        { name: "获客最多", id: "most" }
      ],
      filterCriteria:'最新发布',
      filterTypesShow:false,
      dropdownImg:WXAJAX.imgBackUrl+'/product-index/down-s.png',
      //控制item组件样式的参数
      status:2,
      shareData:'',
      libraryData:'',
      companyId:wx.getStorageSync('COMPANYID'),
      page:1,
      queryType:1,
      defaultFilter:'最新发布',
      articleInfo:[]
    };
  },
  async onShareAppMessage(e) {//分享文章。添加分享记录
    var info=e.target.dataset.info;
    var params={
      dynamicId:info.dynamicId,
      shareSource:2,
    }
    var sharedata = await WXAJAX.POST(params , '', '/share/record/add','','',1);
    console.log("url",'/pages/dynamicDetail/main?dynamicId='+info.dynamicId+'&goType=1&shareId='+sharedata.shareId+'&fromUserId='+sharedata.fromUserId);
    return {
      title: info.title,
      path: '/pages/dynamicDetail/main?dynamicId='+info.dynamicId+'&goType=1&shareId='+sharedata.shareId+'&fromUserId='+sharedata.fromUserId,
      imageUrl:info.photos,
      success: (res) => {
        uni.showToast({
          title: '分享成功',
          icon: 'none'
        })
      }
    }

  },
  watch:{
    status(newVal,old){
      if(newVal == 2){
          this.getqueryDynamicData(2,1);
      }else if(newVal == 1){
          this.getqueryDynamicData(1,1);
      }
    },
    chooseMonth(val) {
        let mm = val.split('-');    //把2020-11变成需要传输的样子：2020和11
        this.getDaysInMonth(mm[0],mm[1])
    },
  },
  mounted() {
  },
  created() {
    console.log(this)
    this.addDate()
  },
  async onPullDownRefresh() {
      this.page = 1;
      this.libraryData = '';
      this.shareData = ''
      await this.getqueryDynamicData(this.status,this.queryType,this.page);
      wx.stopPullDownRefresh();
    },
    async onReachBottom() {
      if (this.isLoading) {
        return;
      }

      await this.getqueryDynamicData(this.status,this.queryType,this.page);
   },

  methods: {
    getShareAdd(dynamicId){
      var params={
        dynamicId:dynamicId,
      }
      return new Promise(resolve => {
        WXAJAX.POST(params , '', '/share/record/add','','',1).then((res) => {
          resolve(res)
        })
      })
    },
    shareArticle(e){
      console.log("测试",e);
      this.articleInfo=e;
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
      this.startTime=this.chooseMonth + '-01'
      this.endTime=this.chooseMonth + '-'+date.date
    },
    getDaysInMonth(year,month){
        let temp = new Date(year,month,0);
        let mm = temp.getDate(); //这里mm就是天数啦
        this.mm = mm
        this.startTime=this.chooseMonth + '-01'
        this.endTime=this.chooseMonth + '-'+this.mm
        this.shareData = ''
        this.libraryData = ''
        this.getqueryDynamicData(this.status,1,1);
    },
    //获取时间
    changeData(e){
      this.chooseMonth = e
    },
    changeId(e){
      this.choose_tabs_id = e
      this.shareData = ''
      this.libraryData = ''
      this.getqueryDynamicData(this.status,1,1);
    },
    //
    async getqueryDynamicData(type,queryType,page) {
      // if (this.isLoading) return;
      this.isLoading = true;
      wx.showLoading({});

      let url="/customerEssay/queryDynamicData";
      if(wx.getStorageSync('isBoss')){
        url="/customerEssay/bossQueryDynamicData";
      }
      try {
        let data = await WXAJAX.POST(
          { type:type,queryType:queryType,pageNum:page,createUserId:this.status==2?'':this.choose_tabs_id},
          "",
          url
        );
        // let data = await WXAJAX.POST(
        //   { type:type,queryType:queryType,pageNum:page,startTime:this.status==2?'':this.startTime,endTime:this.status==2?'':this.endTime,createUserId:this.status==2?'':this.choose_tabs_id},
        //   "",
        //   url
        // );
        if (data) {
          console.log(data,11111111)
            if(this.page === 1){
              if(this.status == 1){
                this.libraryData = data.list || [];
              }else if(this.status == 2){
                this.shareData = data.list || [];
              }
            }else{
              if(this.status == 1){
                this.libraryData = [...this.libraryData, ...data.list] || [];
              }else if(this.status == 2){
                this.shareData = [...this.shareData, ...data.list] || [];
              }
            }
            this.page++;
        }else{
          this.shareData = ''
          this.libraryData = ''
          this.page = 1;
        }
        this.isLoading = false;
        wx.hideLoading();
      } catch (error) {
        this.isLoading = true;
        wx.hideLoading();
      }
    },
    getDeleteByDynamicid(id){
      console.log(id)
      wx.showLoading({
          title: '加载中',
          mask:true
      });
      WXAJAX.POSTA(
        { dynamicId:id,companyId:this.companyId},
        "",
        "/customerEssay/deleteByDynamicId"
      ).then((data)=>{
        console.log(data)
        if(data.code == 200){
          this.page = 1
          this.getqueryDynamicData(this.status,this.queryType,this.page)
          setTimeout(function(){
           wx.showToast({
             title:'已成功！',
             duration:2000
           })
          },1000)
        }
      })
    },
    //唤出筛选条件
    filter_btn(){
      this.filterTypesShow = true
    },
    //点击筛选条件后执行的事件
    choosetap(id,name){
      this.defaultFilter = name
      this.page = 1

      //置空数组
      this.libraryData = []
      this.shareData = []
      if(id == 'newest'){
        this.queryType = 1
        this.filterTypesShow = false
        console.log(this.filterTypesShow )
        this.getqueryDynamicData(this.status,this.queryType);

      }else if(id == 'most'){
        this.filterTypesShow = false
        this.queryType = 2
        this.getqueryDynamicData(this.status,this.queryType);

      }
    },
    //点击切换
    select(i){
      this.defaultFilter = '最新发布'
      this.page = 1
      for(var j in this.option){
        this.option[j].isSelect = false
        this.option[i].isSelect = true
        if(this.option[i].type==this.status){
          return ;
        }
        this.status = this.option[i].type
      }
      console.log("测试点击两次",this.status)
      this.shareData = '';
      this.libraryData = ''
    },
    //删除文章按钮
    deleteArticle(id){
      this.getDeleteByDynamicid(id)
    },
    exportlist(){//导出PDF文档
    wx.showLoading();
    // wx.hideLoading();
    // if(this.status==2){
      console.log({
        srcPath:'http://test1.mingyicloud.com/card/share2.html?token='+wx.getStorageSync('token')+'&status='+this.status+'&startTime='+this.startTime+'&endTime='+this.endTime+'&createUserId='+this.choose_tabs_id,
        destPath:'1.pdf',
      })

      // return ;
      WXAJAX.POST({
        srcPath:'http://test1.mingyicloud.com/card/share2.html?token='+wx.getStorageSync('token')+'&status='+this.status+'&startTime='+this.startTime+'&endTime='+this.endTime+'&createUserId='+this.choose_tabs_id,
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
  onLoad(options) {
    console.log("options",options);
    if(options.nav_ids==2){
      this.select('library')
    }
  },
  onShow() {
     this.page = 1
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
    height: 100%;
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
    padding: 40upx 30upx 0 30upx;
  }
  .share-records-content2{
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
</style>
