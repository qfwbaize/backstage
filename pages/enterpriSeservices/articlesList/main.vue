<template>
  <div class="item ">
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
          </div>
        </div>
        <div class="flex-base bottom h44 pl15 pr15">
          <div class="flex-base">
             <span class="fs12 ca8">{{ info.createTimeStr }}</span>
          </div>
          <div class=" h25 cblue fs12 btn-box">
            <div class="skip-btn share cfff bgblue" @click="shareNow(info.dynamicId,info.companyId)">立即分享</div>
            <div class="skip-btn share cfff bgblue" @click="shareNow2(info.dynamicId,info.companyId)">站内分享</div>
            <div class="skip-btn share cfff bgblue" @click="shareNow3(info.dynamicId,info.companyId)">精准转发</div>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
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
  watch:{
    contact(newVal,oldVal){
      if(this.contact === 1){
        wx.navigateBack({
          delta:1
        })
      }
    }
  },
  mounted() {
    var info = this.info
  },
  async mounted() {
    let a = await util.systemIfo();
    let navHeight = getApp().globalData.navHeight;
    this.scrollContentHeight = a.windowHeight;
  },
  components:{},
  methods: {
    ...mapMutations(["setShareRecordsInfo","setCompanyId","setInitialization"]),
    //点击切换
    select(i){
      this.page = 1
      for(var j in this.option){
        this.option[j].isSelect = false
        this.option[i].isSelect = true
        this.status = this.option[i].type
      }
      this.shareData = '';
      this.getqueryDynamicData(this.page)
    },
    async getqueryDynamicData(page) {
      this.isLoading = true;
      wx.showLoading({});
      try {
        let data = '';

        data = await WXAJAX.POST(
          { pageNum:page,pageSize:10},
          "",
          "/share/record/list/mySharedDynamic",'','',1
        );

        if (data) {
            if(this.page === 1){
                this.shareData = data.list || [];
            }else{
                this.shareData = [...this.shareData, ...data.list] || [];
            }
            this.page++;
            this.list = data.list;
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
      let url = '../../article/dynamicDetail/main?dynamicId=' + dynamicId +'&shareId=' + shareId + '&type=' + type;
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
      this.getqueryDynamicData(this.page);
    },
    //上拉加载更多
    scrolltolower() {
      console.log("测试上拉加载更多");
      this.page = this.page+1;
      this.getqueryDynamicData(this.page);
    },

  },
  onLoad() {
     this.page = 1
     console.log('onLoad结果');
     this.getqueryDynamicData(this.page);

  }
};
</script>
<style scoped>
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
