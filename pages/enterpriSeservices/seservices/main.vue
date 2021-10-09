<template>
  <div class="bgfff h100p">
    <div class="posre">
      <img :src="cardIcon" class="w100p h127 overhidden">
      <div class="information">
        <div class="disflex mb18">
          <img :src="companyData.companyLogo" class="w50 h50 bradius50p mr10">
          <div>
            <p class="cfff fs16 fbold mb10">{{companyData.companyName}}</p>
            <p class="cfff fs12" v-if="createTime">机构于{{createTime}}创建</p>

          </div>
        </div>
        <div class="disflex jsbet align-cen" v-if="companyData.companyName">
          <p class="cfff fs12">使用到期日期:
            <span class="fbold"  v-if="createTime">{{endTime}}</span>
            <span class="fbold"  v-else>已到期</span>
          </p>
          <div class="w57 fbold h25 bgfff bradius12 fs16 cblue disflex jscen align-cen" @click="promote_tap(1)">
            续费
          </div>
        </div>
      </div>
    </div>
    <div class="disflex h101 checked">
      <div class="disflex flex-column align-cen" @click="page_tap(1)">
        <img :src="uploadIcon" class="w50 h50 mb7">
        <p class="fs14 c78">查看上传视频</p>
      </div>
      <span></span>
      <div class="disflex flex-column align-cen" @click="page_tap(2)">
        <img :src="userIcon" class="w50 h50 mb7">
        <p class="fs14 c78" >查看名片使用人</p>
      </div>
    </div>
    <div class="pl15 pr15">
      <subhead
        title="机构服务"
        dec="SERVICE"
        smallTitle="根据您的需求购买对应服务"
        ></subhead>
      <div>
        <div class="disflex jsbet promote_list mb10">
          <div class="disflex">
            <img :src="cardsIcon" class="w50 h50">
            <div class="ml10">
              <p class="fs16 c33 fbold pt2 mb10">名片使用时长</p>
              <p class="fs12 c78" v-if="endTime">名片将于<span class="cblue">{{endTime}}</span>到期</p>
              <p class="fs12 c78" v-else>已到期</p>
            </div>
          </div>
          <div class="promote_btn"  @click="promote_tap(1)">去提升</div>
        </div>
        <div class="disflex jsbet promote_list mb10">
          <div class="disflex">
            <img :src="timeIcon" class="w50 h50">
            <div class="ml10">
              <p class="fs16 c33 fbold pt2 mb10">名片使用人数</p>
              <p class="fs12 c78">名片已使用<span class="cblue">{{peopleNum || 0}}/{{data.currentNum || 0}}</span>人</p>
            </div>
          </div>
          <div class="promote_btn"  @click="promote_tap(2)">去提升</div>
        </div>
        <div class="disflex jsbet promote_list">
          <div class="disflex">
            <img :src="videosIcon" class="w50 h50">
            <div class="ml10">
              <p class="fs16 c33 fbold pt2 mb10">短视频上传个数</p>
              <p class="fs12 c78">视频已上传<span class="cblue">{{usedSize || 0}}/{{data.videoSize || 0}}</span>个</p>
            </div>
          </div>
          <div class="promote_btn" @click="promote_tap(3)">去提升</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WXAJAX from "@/utils/request";
import subhead from "@/components/subhead"
import utils from "@/utils/index";
import {mapMutations} from "vuex"

export default {
  data() {
    return {
      cardIcon:WXAJAX.imgBackUrl +'yimai_photos/crmRevision/img_bg_card.png',
      uploadIcon:WXAJAX.imgBackUrl +'yimai_photos/crmRevision/ic_upload.png',
      userIcon:WXAJAX.imgBackUrl +'yimai_photos/crmRevision/ic_user.png',
      cardsIcon:WXAJAX.imgBackUrl +'yimai_photos/crmRevision/img_cards.png',
      timeIcon:WXAJAX.imgBackUrl +'yimai_photos/crmRevision/img_time.png',
      videosIcon:WXAJAX.imgBackUrl +'yimai_photos/crmRevision/img_videos.png',
      data:'',
      endTime:'',
      peopleNum:'',
      usedSize:'',
      createTime:'',
      companyData:''
    };
  },
  components: { subhead },
  onShow(){
    this.getActivityNum()
    this.getCompanyAllInfo()
  },
  mounted(){

  },
  methods: {
    ...mapMutations(['setUsageStatus']),

    promote_tap(type){
      let data = {
        peopleNum:this.peopleNum,
        usedSize:this.usedSize,
        endTime:this.endTime,
        currentNum:this.data.currentNum,
        videoSize:this.data.videoSize,
        availableNum:this.data.availableNum,
      }
      this.setUsageStatus(data)
      wx.navigateTo({ url: `../setMeal/main?type=${type}`});
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
    getCompanyAllInfo(){
      let v = this
      wx.showLoading()
      WXAJAX.POST({
        companyId:wx.getStorageSync('COMPANYID')
      },'','/company/getCompany')
      .then((data, code) => {
          v.companyData = data
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
    page_tap(type){
      if(type == 1){
        wx.navigateTo({
          url:'../../buyVideo/index/main'
        })
      }else{
        wx.navigateTo({
          url:'../../companyPack/member/main'
        })
      }
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
.information{
  position: absolute;
  top: 0;
  width: 100%;
  padding:60upx 60upx 0 60upx;
  box-sizing: border-box;
}
.checked{
  margin-top: -4upx;
  box-shadow: 0px 0px 19px 0px rgba(55, 55, 55, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.checked span{
  width: 2upx;
  height: 148upx;
  background: #E7E7E7;
}
.promote_btn{
  width: 173upx;
  height: 72upx;
  font-size: 32upx;
  color: #ffffff;
  background: linear-gradient(90deg, #75DAD8, #51CDCB);
  box-shadow: 0upx 12upx 12upx 0upx rgba(81, 203, 205, 0.24);
  border-radius: 36upx;
  text-align: center;
  line-height: 72upx;
  font-weight: bold;
}
.promote_list{
  background: #FFFFFF;
  box-shadow: 0upx 4upx 15upx 0upx rgba(55, 55, 55, 0.1);
  border-radius: 10upx;
  align-items: center;
  padding: 36upx 30upx 36upx 30upx;
}
</style>
