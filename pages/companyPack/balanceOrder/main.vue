<template>
  <div class="item ">
       <!-- <div class="share-records">
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
      <div class="item-box bgfff" v-for="info in list" :key="info.orderId">
        <div class="middle flex-base pl15 pr15">
          <div class="content pl15">
            <p class="fs14 c38 title">
              订单编号：{{ info.orderNum }}
            </p>
            <span style="font-size: 24rpx;">充值金额：{{ info.payMoney }}</span>
          </div>
        </div>
        <div class="flex-base bottom h44 pl15 pr15">
          <div class="flex-base">
             <span class="fs12 ca8">{{ info.orderTime }}</span>
          </div>
          <div class=" h25 cblue fs12 btn-box">
            <div v-if="info.orderState" class="skip-btn share cfff bgblue">已付款</div>
            <div v-else class="skip-btn share cfff bgblue" @click="toPay(info.orderId)">待付款</div>
          </div>
        </div>
      </div>
    </scroll-view>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import forwardBox from '@/components/forwardBox';
import util from '@/utils/index';
import WXAJAX from "@/utils/request";
export default {
  data() {
    return {
      time: "",
      maskShow:false,
      status:1,
      contact:'',
      page: 1,
      isLoading: false, //数据加载中
      list: [],
      // option:{
      //   Shared:{
      //     isSelect:true,
      //     name:'待付款',
      //     type:'2',
      //     style:'color:#51CDCB'
      //   },
      //   library:{
      //     isSelect:false,
      //     name:'已付款',
      //     type:'1',
      //     style:'color:#51CDCB'
      //   }
      // },
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
  components:{forwardBox},
  methods: {
    ...mapMutations(["setShareRecordsInfo","setCompanyId","setInitialization"]),

    async getlist(page) {
      this.isLoading = true;
      wx.showLoading({});
      try {
        let data = '';
        data = await WXAJAX.POST(
          { pageNum:page,pageSize:10},
          "",
          "/account/queryPageAccountOrder",'','',1
        );
        // console.log(data);return ;
        if (data.list) {
            if(this.page === 1){
                this.list = data.list || [];
            }else{
                this.list = [...this.shareData, ...data.list] || [];
            }
        }
        this.isLoading = false;
        this.page++;
        wx.hideLoading();
      } catch (error) {
        this.isLoading = true;
        wx.hideLoading();
      }
    },
    toPay(orderId){
      let than = this
      let data = {
        orderId:orderId,
      }
      wx.showLoading({
        title:'加载中...',
        mask:true
      })
       WXAJAX.POST(data,'','/account/toPayOrder', '', '', 1)
      .then((data, code) => {
         console.log(data)
         wx.requestPayment({
            timeStamp: data.timeStamp,
            nonceStr: data.nonce_str,
            package: 'prepay_id=' + data.prepay_id,
            signType: 'MD5',
            paySign: data.paySign,
            success(res) {
              console.log(res);
              wx.hideLoading();
              than.getlist(this.page);
            },
            fail(err) {
              console.log(err);
              if (err.errMsg === 'requestPayment:fail cancel') {
                wx.showToast({
                  title: '支付已取消',
                  icon: 'none'
                });
              } else {
                wx.showToast({
                  title: '支付失败',
                  icon: 'none'
                });
              }
            }
          });
        })
      .catch(err => {
        console.log(err)
        wx.hideLoading();
        wx.showToast({
          title: err.message,
          duration: 2000,
          icon: "none"
        });
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
      this.page = this.page+1;
      this.getlist(this.page);
    },
  },
  onLoad() {
     this.page = 1
     console.log('onLoad结果');
     this.getlist(this.page);

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
