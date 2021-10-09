<template>
  <!-- <div class="share-records-content"> -->
    <div class="item ">
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
        </div>
      </div>
      <scroll-view :style="{height: scrollContentHeight+'px'}"
                   class="dynamic-content"
                   :scroll-y="true"
                   :enable-back-to-top="true"
                   :scroll-anchoring="true"
                   @scrolltoupper='scrolltoupper'
                   @scrolltolower="scrolltolower">
          <div class="item-box bgfff"
          v-for="info in shareData"
          :key="info.id">
            <div class="middle flex-base pl15 pr15">
              <div class="content pl15">
                <p class="fs14 c38 title">
                  {{ info.dynamicTitle }}
                </p>
                <div class="flex-base">
                    <p class="fs12 c38">
                      金额：
                      <span class="fbold cblue pl6">{{'&nbsp;' + info.rewardAmount+'&nbsp;' }}</span>{{'&nbsp;'}}·{{'&nbsp;'}}
                    </p>
                    <!-- <p class="fs12 c38">
                       获奖者
                      <span class="fbold cblue pl6">{{'&nbsp;' + info.rewardUserName+'&nbsp;' }}</span>
                    </p> -->
                   <p class="fs12 c38">
                     时间：
                      <span class="fbold cblue pl6">{{'&nbsp;' + info.createTimeStr+'&nbsp;' }}</span>
                   </p>
                </div>
              </div>
            </div>
           <!-- <div class="flex-base bottom h44 pl15 pr15">
              <div class="flex-base">
                 <span class="fs12 ca8">获奖时间:{{ info.createTimeStr }}</span>
              </div>
            </div> -->
            <div class="flex-base bottom h44 pl15 pr15">
              <div class="flex-base">
                 <span class="fs12 ca8">{{ info.rewardExplain }}</span>
              </div>
            </div>
          </div>
        </scroll-view>
        <!-- <div class="textc disflex w60 h60 bradius50p bgblue disinblock goToUserCenter" @click="exportlist">
          <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/user_add.png" alt="" class="w30 h30 mt15">
        </div> -->
    </div>

  <!-- </div> -->

</template>
<script>
import { mapMutations } from "vuex";
import util from '@/utils/index';
import WXAJAX from "@/utils/request";
export default {
  data() {
    return {
      time: "",
      //控制tab切换
      option:{
        Shared:{
          isSelect:true,
          name:'收入',
          type:'2',
          style:'color:#51CDCB'
        },
        library:{
          isSelect:false,
          name:'支出',
          type:'1',
          style:'color:#51CDCB'
        }
      },
      status:2,
      maskShow:false,
      contact:'',
      list:[],
      shareData:'',
      page:1,
      scrollContentHeight:0,
    };
  },
  watch:{
  },
  mounted() {
    var info = this.info
  },
  onReachBottom(){

  },
  async mounted() {
    let a = await util.systemIfo();
    let navHeight = getApp().globalData.navHeight;
    this.scrollContentHeight = a.windowHeight;
  },
  onShow() {
    this.page = 1
  },
  onLoad(){
    this.page = 1;
    this.getlist(this.page);
  },
  methods: {
    //点击切换
    select(i){
      this.page = 1
      for(var j in this.option){
        this.option[j].isSelect = false
        this.option[i].isSelect = true
        this.status = this.option[i].type
      }
      this.shareData = '';
      this.getlist(this.page)
    },
    getlist(page){

      let url = "/userAccount/own/list";
      let params={};
      if(this.status==2){
        params={
          pageSize:10,
          pageNum:page,
          fundType:0,
        }
      }else{
        params={
          pageSize:10,
          pageNum:page,
          fundType:1,
        }
      }

      WXAJAX.POST(params, '', url,'','',1).then(data => {
        if(this.page === 1){
            this.shareData = data.list || [];
        }else{
            this.shareData = [...this.shareData, ...data.list] || [];
        }
        this.list = data.list;
      });
    },
    exportlist(){
      let page=this.page
      let url="/userAccount/exportMyAccountDetailsListExport"
      let params={};
      if(this.status==2){
        params={
          pageSize:10,
          pageNum:page,
          fundType:0,
        }
      }else{
        params={
          pageSize:10,
          pageNum:page,
          fundType:1,
        }
      }
      console.log("params",params);
      WXAJAX.POST(params, '', url,'','',1).then(data => {
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
    //下拉刷新
    scrolltoupper() {
      console.log("测试下拉刷新");
      this.page = 1;
      this.getlist(this.page);
    },
    //上拉加载更多
    scrolltolower() {
      console.log("测试上拉加载更多");
      this.page++;
      this.getlist(this.page);
    },
  }
};
</script>
<style scoped>
  .goToUserCenter{
    position: fixed;
    right: 20upx;
    bottom: 102upx;
    z-index: 99;
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
    padding: 35upx 30upx 0 30upx;
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
  padding: 0 20upx 0 20upx;
}
.delete{
  border:1upx solid #E8E8E8;
}
.visitor{
  border:1upx solid #51CDCB;
}
</style>
