<template>
  <div class="out shadow_gray mb10">

    <div class="top_card fs12  shadow_gray posre" v-if="type == 'plus'">
      <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/card-case-card-bg2.png" class="w116 h105 bg-img" alt="">
      <div class="zIndex100 pl34 pt25 cblue fs12 flex-sb-c"><span class="before_line_3">{{card_msg.company || '公司名称'}}</span>
      </div>
      <div class="top_msg zIndex100 disflex pt15" style="justify-content: space-between;">
        <!-- <label class="radio">
          <radio value="r1"/>
        </label> -->
        <img :src="card_msg.picchecked || card1_logo" mode="aspectFill" alt="" class="w60 h60 bradius5">
        <div class="pl10 info-content pt10">
          <p class="fbold c38 fs18">{{card_msg.username || '姓名'}}</p>
          <p class="fs14 ca8 pt10 pb25">{{card_msg.post || '职位'}}</p>
        </div>
        <div>
            <p v-if="shareStatus&&card_msg.gender==1" @click="page_turn('index')" style="margin-top: 31rpx;font-size: 34rpx;font-weight: bold;margin-left: 152rpx;">分享给他</p>
            <p v-else-if="shareStatus&&card_msg.gender==2" @click="page_turn('index')" style="margin-top: 31rpx;font-size: 34rpx;font-weight: bold;margin-left: 152rpx;">分享给她</p>
            <p v-else-if="shareStatus" @click="page_turn('index')" style="margin-top: 31rpx;font-size: 34rpx;font-weight: bold;margin-left: 152rpx;">分享给TA</p>

          <!-- <p v-if="shareStatus" @click="page_turn('index')" style="width: 150rpx;margin-top: 31rpx;font-size: 38rpx;font-weight: bold;margin-left: 152rpx;">分享给他</p> -->
          <p v-else style="width: 150rpx; margin-top: 31rpx;font-size: 38rpx;font-weight: bold;margin-left: 152rpx;">
            <checkbox @click="changeUrl(card_msg.cardId)" value="card_msg.cardId"/>
          </p>
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
    name: "BusinessCard",
    props:['card_msg','type','hasCard','isdel','shareStatus','index', 'isLogin','dynamicId'],
    watch:{
      'shareStatus'(newVal,oldVal){
        this.shareStatus=newVal;
            // console.log(newVal,oldVal);
      }
    },
    data(){
      return{
        listToUserIds:[],
        card1_logo:'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/card1_user.png',
        phone: wx.getStorageSync('phone') || ''
      }
    },
    mounted() {

    },
    components: {GetPhoneNumber},
    onShow() {
      console.log('shareStatus',this.shareStatus)
    },
    methods:{
      ...mapMutations(['setPhone']),
      changeUrl(e){
        this.$emit('changeUrl', e)
      },
      page_turn(url){
        console.log("card_msg",this.card_msg)
        //分享

        if(this.card_msg.savetype==2){//精准转发

          WXAJAX.POST({//精准转发设置
              dynamicId: this.dynamicId,
              preciseAwardTotalAmount: this.card_msg.shareData.preciseAwardTotalAmount,
              lowestReadTime: this.card_msg.shareData.lowestReadTime,
              preciseRewardAmount: this.card_msg.shareData.preciseRewardAmount,
              answerFlag: this.card_msg.shareData.answerFlag,
              lowestAnswerScore: this.card_msg.shareData.lowestAnswerScore,
          }, '', '/dynamic/addDynamicSettingPreciseReward','','',1)
          .then(res => {
              WXAJAX.POST({
                  dynamicId: res.dynamicId,
                  toUserId: this.card_msg.cardId,
                  shareSource:0,
              }, '', '/share/record/add','','',1)
              .then((data) => {
                WXAJAX.POST({//获得精准转发奖励
                    dynamicId: res.dynamicId,
                    userId: this.card_msg.cardId,
                    shareId:data.shareId,
                    answerScore:0,
                }, '', '/precise/record/add','','',1)
                .then(res => {
                  wx.showToast({
                       title: '分享成功',
                       icon: 'success',
                       duration: 2000//持续的时间
                     })
                });
              });
          });


        }else{
          WXAJAX.POST({
              dynamicId: this.dynamicId,
              listToUserId: [this.card_msg.cardId],
              shareSource:0,
          }, '', '/share/record/batch','','',1)
          .then(res => {
            wx.showToast({
                 title: '分享成功',
                 icon: 'success',
                 duration: 2000//持续的时间
               })
          });
        }

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
