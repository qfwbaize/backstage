<template>
  <div>
    <!--访问排行-->
    <div class="bgfff pt26 pl15 pr16 pb19">
      <div class="disflex jsbet pb15">
        <TitleSlot title="访问排行"
               subtitle="DATE">
        </TitleSlot>
        <span class="be8 lh25 pl9 pr10 bradius3 fs12 c80">
            <picker class='time-picker disinblock pr10'
                    mode="date"
                    fields="month"
                    :value="personalDataEndTime"
                    :end="personalDataEndTime"
                    @change="datePickerChange"
            >
                {{chooseMonth}}
            </picker>
            <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/down.png" alt="" class="w10 h10"/>
        </span>
        <span class="be8 lh25 pl9 pr10 bradius3 fs12 c80" @click="exportlist">
            导出
            <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/down.png" alt="" class="w10 h10"/>
        </span>
      </div>
    </div>
    <scroll-view style="height: 500px"
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
              <div class="flex-base">
                 <span class="fs12 ca8">分享次数{{ info.dynamicShareNum }}</span>
              </div>
            </div>
          </div>
    </scroll-view>
  </div>
</template>

<script>
  import TitleSlot from "@/components/TiTleSlot";
  import WXAJAX from '../utils/request'
  import util from '../utils/index'
  export default {
    name: "personalOverview",
    components: {TitleSlot},
    data() {
      return {
        chooseMonth: '2019-02',//本月业绩选择的时间
        personalDataEndTime: '',
        personalData: {},
        page:1,
        shareData:'',
      }
    },
    watch: {

    },
    mounted() {
      var timestamp = Date.parse(new Date());
      var date = new Date(timestamp);
      //获取年份  
      var Y =date.getFullYear();
      //获取月份  
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);

      this.chooseMonth=Y+'-'+M;

      let temp = new Date(Y,M,0);
      let mm = temp.getDate(); //这里mm就是天数啦

      this.startTime=this.chooseMonth + '-01'
      this.endTime=this.chooseMonth + '-'+mm

      this.getdata();
    },
    onShow(){

    },
    methods: {
      getdata(){
        let params={
            pageNum:this.page,
            pageSize:10,
            companyId:wx.getStorageSync('COMPANYID'),
            dynamicStartTime:this.startTime,
            dynamicEndTime:this.endTime
          }
        console.log(params)
        WXAJAX.POST(
          params,
          "",
          "/dynamic/queryListMyDynamicDetailed",'','',1
        ).then(
        data => {
          if(this.page === 1){
              this.shareData = data.list || [];
          }else{
              this.shareData = [...this.shareData, ...data.list] || [];
          }
          console.log("list",this.shareData)
        },
        error => {
          console.log("error", error);
        }
      );
      },
      toDetail(did){
        wx.navigateTo({
          url:`../../article/articleDetail/index?id=`+did
          });
      },
      //下拉刷新
      scrolltoupper() {
        console.log("测试下拉刷新");
        this.page = 1;
        this.getdata(this.status,1,this.page);
      },
      //上拉加载更多
      scrolltolower() {
        console.log("测试上拉加载更多");
        this.page = this.page+1;
        this.getdata(this.status,1,this.page);
      },
      datePickerChange(e) {//本月业绩选择时间
        let _time = e.target.value.split('-');
        let temp = new Date(_time[0],_time[1],0);
        _time = _time[0] + '-' + _time[1];
        this.chooseMonth = _time;
        let mm = temp.getDate(); //这里mm就是天数啦

        this.startTime=this.chooseMonth + '-01'
        this.endTime=this.chooseMonth + '-'+mm

        this.getdata();
      },
      exportlist(){//导出PDF文档
        wx.showLoading();
        // wx.hideLoading();
      // if(this.status==2){
      console.log({
          srcPath:'http://test1.mingyicloud.com/card/ranking.html?token='+wx.getStorageSync('token')+'&companyId='+wx.getStorageSync('COMPANYID')+'&startTime='+this.startTime+'&endTime='+this.endTime,
          destPath:'1.pdf',
        })
        // wx.hideLoading();
        // return ;
        WXAJAX.POST({
          srcPath:'http://test1.mingyicloud.com/card/ranking.html?token='+wx.getStorageSync('token')+'&companyId='+wx.getStorageSync('COMPANYID')+'&startTime='+this.startTime+'&endTime='+this.endTime,
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
    }
  }
</script>

<style>
  .w70{
    flex: 0 0 140upx;
  }
  .line-out{
    flex-grow: 1;
    padding-top: 8upx;
    position: relative;
  }
  .deal-info >div:last-child{
    margin-right: 0 !important;
  }
  canvas {
    background: #fff;
  }
  .acitveRecord .follow_log.active .right{
    color:#BCBBBC
  }
  .acitveRecord .follow_log{
    padding-left: 40px;
    padding-right: 92upx;
  }

  .line-out::before{
    content: '';
    position: absolute;
    left: 0;
    top: 8upx;
    right: 36upx;
    background: #e8e8e8;
    border-radius: 50upx;
    height: 16upx;
  }

  .line-out b{
    position: relative;
    z-index: 2;
  }

  .ec-canvas {
    width: 100%;
    height: 100%;
    flex: 1;
  }
  .turnover_btn{
    margin:0 auto;
    margin-top: 70upx;
    width:580upx;
    height:88upx;
    background:linear-gradient(90deg,rgba(117,218,216,1),rgba(81,205,203,1));
    border-radius:10upx;
    text-align: center;
    line-height: 88upx;
    color: #FFFFFF;
  }
  .trapezoid{
    position: relative;
  }
  .trapezoid span{
    position: absolute;
    left: 0;
    right: 0;
    margin:auto;
    top: -56upx;
    z-index: 99;
}

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
