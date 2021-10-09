<template>
  <div class="out shadow_gray mb10">
    <div class="top_card fs12  shadow_gray posre" v-if="type == 'plus'">
      <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/card-case-card-bg2.png" class="w116 h105 bg-img" alt="">
      <div class="zIndex100 pl34 pt25 cblue fs12 flex-sb-c"><span class="before_line_3">{{card_msg.intervieweeCompanyName || '公司名称'}}</span>
      <span @click.stop="moreTap"
              class="w60 textc disinblock"
              style="z-index:1000;"
        >
                  <!-- <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/edit_card.png" alt=""
                       class="w16 h16 pl3 pr3"
                  > -->
        </span>
      </div>

      <div class="top_msg zIndex100 disflex pt15" style="justify-content: space-between;"  @click="page_turn('visitrecord',card_msg.visitingId,card_msg.intervieweeCardId,card_msg.intervieweeName,card_msg.intervieweePhone,card_msg.intervieweeCompanyName,card_msg.intervieweePosition)">
        <img :src="card_msg.intervieweeLogo || card1_logo" mode="aspectFill" alt="" class="w60 h60 bradius5">
        <div class="pl10 info-content pt10">
          <p class="fbold c38 fs18 over_1" style="width: 200rpx;">{{card_msg.intervieweeName || '姓名'}}</p>
          <p class="fs14 ca8 pt10 pb25 " style="margin-left: 20rpx;">{{card_msg.intervieweePhone || '联系方式'}}</p>
        </div>
        <div>
          <p style="margin-top: 31rpx;font-size: 28rpx;font-weight: bold;margin-left: 152rpx;">共{{card_msg.visitingNum}}条</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    import GetPhoneNumber from "@/components/getPhoneNumber"; //
    import handleLogin from '@/utils/handleLogin';
    import WXAJAX from '@/utils/request'
    import { mapMutations } from 'vuex';
  export default {
    name: "VisitItem",
    props:['card_msg','type','hasCard','isdel','index', 'isLogin','dynamicId'],
    data(){
      return{
        card1_logo:'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/card1_user.png',
        phone: wx.getStorageSync('phone') || ''
      }
    },
    mounted() {

    },
    components: {GetPhoneNumber},
    onShow() {
      console.log('dynamicId1',this.dynamicId)
      console.log('card_msg1',this.card_msg)
    },
    methods:{
      ...mapMutations(['setPhone']),
      // card_msg.intervieweeCardId,card_msg.intervieweeName,card_msg.intervieweePhone,card_msg.intervieweeCompanyName,card_msg.intervieweePosition
      page_turn(url,visitingId,intervieweeCardId,intervieweeName,intervieweePhone,intervieweeCompanyName,intervieweePosition){
        // console.log("card_msg",this.card_msg)
        wx.navigateTo({ url: '../' + url + '/main?visitingId=' + visitingId
         + '&intervieweeCardId=' + intervieweeCardId
         + '&intervieweeName=' + intervieweeName
         + '&intervieweePhone=' + intervieweePhone
         + '&intervieweeCompanyName=' + intervieweeCompanyName
         + '&intervieweePosition=' + intervieweePosition
         })
        //分享
      },
      moreTap(){
        this.$emit('moreTap' , this.card_msg.recordId, this.card_msg.cardId, this.isdel);
      },
      stopClick(){
          console.log("do nothing")
      },
      //需要登录引导的回调
      loginGuide(){
          // this.isShowLoginGuide = true;
      },
      makePhone(){//拨打电话
        if (this.isLogin) {
          if(this.card_msg.tel){
            wx.makePhoneCall({
              phoneNumber: this.card_msg.tel,
            })
          }else{
            wx.showToast({
              title: '还没有添加电话呢！',
              duration: 2000,
              icon: 'none'
            });
          }
        }else {
          this.$emit("needLogin", false);
        }
      },
        getPhoneNumber (e) {
          if (this.phone) return;

          if (!e.target.encryptedData) {
              return;
          }

          WXAJAX.POST({
              phoneData: e.target.encryptedData,
              phoneIv: e.target.iv,
          }, '', '/home/getWxPhone')
              .then(res => {
                if(res != "weixin_failt"){
                  wx.setStorageSync('phone', res);
                  this.setPhone(res);
                  this.phone = res;
                  this.makePhone();
                }
              }).catch(err => {
                  console.log("获取手机号出错：", err)
          });
      },

    }
  }
</script>

<style scoped>
  .out{
    line-height: 1;
    /* box-shadow: 0 0 10upx #383838; */
    border-radius: 20upx;

  }
  button{
    border-radius: 0;
  }
  .info-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
  }
  .phone {
    height: 100%;
    width: 100%;
    background: white;
  }
  .operate-bottom {
    width: 100%;
    height: 88upx;
    overflow: hidden;
    background: white;
    border-bottom-right-radius: 20upx;
    border-bottom-left-radius: 20upx;
  }
  .share-button {
    width: 100%;
  }
  .separator {
    display: inline-block;
    width: 2upx;
    height: 32upx;
    background: #F5F5F6;
  }
  .bg-img {
    position: absolute;
    right: 0;
    top: 0;
  }
  .zIndex100 {
    position: relative;
    z-index: 100;
  }
</style>
