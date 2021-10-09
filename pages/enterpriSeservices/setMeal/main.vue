<template>
  <div class="bgfff h100p disflex posre flex-column">
    <div class="tips disflex" @click="aaa">
      <img :src="noticeIcon" class="w15 h15 mr11">
      <p  v-if="type == 1">机构名片<span class="fbold lh1">{{endTime}}</span>到期</p>
      <p  v-if="type == 2">当前名片已使用<span class="fbold lh1">{{peopleNum}}/{{data.currentNum}}</span>人</p>
      <p  v-if="type == 3">当前视频已上传<span class="fbold lh1">{{usedSize}}/{{data.videoSize}}</span>个</p>
    </div>
    <setMealDetall 
      class="setMealDetall" 
      id="content"
      @setmeal_tap="setmeal_tap"
      :setmeal="setmeal" v-if="setmeal">
    </setMealDetall>
    <div class="h100p" v-else>
      <NoData>暂无活动</NoData>
    </div> 
    
    <div class="bottom">
      <p class="fs16">实付：<span class="cdeeporange">￥{{(totalPrice || 0).toFixed(2)}}</span></p>
      <div class="topay" @click="topay">确定支付</div>
    </div>
    
    <div class="posfix fix_top mark" @click="topay_tap" v-if="isShowTips">
      <div class="w290 h180 bgfff disflex flex-column bradius5 jsbet">
        <div class="disflex flex-column align-cen pt25 pb35">
          <p class="fs18 c38 fbold mb20">提示</p>
          <p class="fs14 c78">支付成功</p>
          <p class="fs14 c78">套餐将在三分钟内到账，请耐心等待</p>
        </div>
        <div
        class="flex1 disflex bra_bottom_5 align-cen jscen bgblue fs18 cfff" @click="toOrderList_tap">
          确认
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WXAJAX from "@/utils/request";
import setMealDetall  from "@/components/setMealDetall";
import NoData from '@/components/noData'
import utils from "@/utils/index"


export default {
  data() {
    return {
      noticeIcon:WXAJAX.imgBackUrl +'yimai_photos/crmRevision/icon_notice.png',
      setmeal:'',
      totalPrice:0,
      isShowTips:false,
      orderId:'',
      type:'',
      endTime:'',
      peopleNum:'',
      usedSize:'',
      createTime:'',
      data:'',
    };
  },
  components:{setMealDetall,NoData}, 
  mounted(){
    this.type = this.$root.$mp.query.type
    if(this.type == 1){
      wx.setNavigationBarTitle({
        title: '提升名片使用时长'
      });
    }else if(this.type == 2){
      wx.setNavigationBarTitle({
        title: '提升名片使用人数'
      });
    }else if(this.type == 3){
      wx.setNavigationBarTitle({
        title: '购买短视频上传次数'
      });
    }
    this.getActivity()
    this.getActivityNum()
  },
  onPageScroll(e){
    console.log(e)
  },
  methods: {
    getActivity(){
      let v = this
      wx.showLoading
      WXAJAX.POST({
        activityType:this.type,
        status:1,
        pageSize:999
      },'','/activity/queryPageActivity')
      .then((data, code) => {
         if(data){
            v.setmeal = data.pageInfo.list
            v.totalPrice = v.setmeal[0].price
            v.setmeal.forEach(item => {
              item.startTime = v.getDateConversion(item.startTime)
              item.endTime = v.getDateConversion(item.endTime)
              let start = new Date(item.startTime)
              let end = new Date(item.endTime)
              item.startTime = v.formatDate(start)
              item.endTime = v.formatDate(end)
            });
          }
        })
      .catch(err => { 
        wx.hideLoading();
      });
    },
    setmeal_tap(price,orderId){
      this.totalPrice = price
      this.orderId = orderId
      console.log(this.orderId)
    },
    topay_tap(){
      this.isShowTips = false
    },
    toOrderList_tap(){
      this.isShowTips = false
      let type = 'currentType'
      let url = '../../my/orderLists/main?type=' + type;
      wx.navigateTo({ url: url });
    },
    topay(){
      let than = this
      let data = {
        payUserId:wx.getStorageSync('userId') || '',
        companyId:wx.getStorageSync('COMPANYID') || '',
        activityId: than.orderId || than.setmeal[0].activityId
      }
      wx.showLoading({
        title:'加载中...',
        mask:true
      })
       WXAJAX.POST(data,'','/activity/commitOrder')
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
              than.isShowTips = true
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
    getActivityNum(){
      let v = this
      wx.showLoading()
      WXAJAX.POST({
        companyId:wx.getStorageSync('COMPANYID'),
      },'','/activity/queryCompanyService')
      .then((data, code) => {
          wx.hideLoading();
          v.data = data
          data.endTime = v.getDateConversion(data.endTime)
          data.createTime = v.getDateConversion(data.createTime)
          let endTime = new Date(data.endTime)
          let createTime = new Date(data.createTime)
          console.log(endTime)
          v.createTime = v.formatDate(createTime)
          v.endTime = v.formatDate(endTime)
          v.peopleNum = data.currentNum  - data.availableNum
          v.usedSize = data.usedSize
        })
      .catch(err => { 
        wx.hideLoading();
        wx.showToast({
          title: err.message,
          duration: 2000,
          icon: "none"
        });
      });
    },
    formatDate(now) {
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var date = now.getDate();
      return year + "年" + month + "月" + date + "日" 
    },
    getDateConversion(data){
      let phoneSystem = ''
      wx.getSystemInfo({
        success:function(res){
          phoneSystem = res.system
        }
      });
      if(phoneSystem.indexOf("iOS") != -1){
        data = data.replace(/-/g, '/').replace(/T/g, ' ').slice(0,19);
      }
      console.log(data)
      return Date.parse(data)
    }
  },
  
};
</script>

<style scoped>
.tips{
  background: #EDFAFA;
  align-items: center;
  padding:24upx 30upx;
  color: #52CDCC;
  font-size: 28upx;
}
.setMealDetall{
  flex: 1;
  overflow: auto;
}
.bottom{
  height: 98upx;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding:0 30upx;
}
.topay{
  width: 220upx;
  text-align: center;
  line-height: 80upx;
  background: linear-gradient(90deg, #76DAD9, #51CDCC);
  height: 80upx;
  color: #fff;
  font-size: 32upx;
  font-weight: bold;
  border-radius:40upx;
  margin-left: 50upx;
}
.mark{
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>