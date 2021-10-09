<template>
  <div class="bgfff pl15 pt15 pr15 card2">
    <div class="posre h214 overhidden card-list">
      <img :src="card_msg.logo || card2_logo" alt=""
           :class="card_msg.logo ? 'w225' : 'w100p' "
           @click="previewImage(card_msg.logo || card2_logo)"
           mode="aspectFill"
           style="box-sizing:border-box;padding-top:1rpx;padding-bottom:2rpx;"
           class="posab right0 top0 card2_user h100p">

      <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crmRevision/img_lefttext.png" alt="" class="posab left0 top0 card_bg">
      <div class="posab h100p w200 top0 left0 zindex-99 card-information">
        <div class="mb15">
          <p class="fs20 lh1 mb10 c38 fbold pb3">{{card_msg.name || '姓名'}}</p>
          <p class="fs12 lh1 c38">{{card_msg.position || '职位'}}</p>
        </div>

        <div class="ca8 mb25 nowrap">
          <div class="disflex align-cen  mb10">
            <img :src="iconEmail" class="w12 h12 mr5">
            <p class="fs12" @click="makePhone(card_msg.phone)">{{card_msg.phone || '电话'}}</p>
          </div>
          <div class="disflex align-cen">
            <img :src="iconPhone" class="w12 h12 mr5">
            <p class="fs12">{{card_msg.email || '邮箱'}}</p>
          </div>

        </div>
        <span class="pr14 fs14" style="width: 300rpx;display: block;overflow: hidden;text-overflow: ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;">{{card_msg.companyName || '公司名称'}}</span>
      </div> 
      <div class="card2_inner nowrap">
      </div>
    </div>
  </div>
</template>

<script>
  import util from "@/utils/index.js";
  import WXAJAX from '@/utils/request'
  export default {

    name: "card_3",
    props:['card_msg', 'isPrev'],
    data(){
      return{
        card2_logo : 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/card2_user.png',
        iconEmail: WXAJAX.imgBackUrl +'yimai_photos/crmRevision/ic_email.png',
        iconPhone: WXAJAX.imgBackUrl +'yimai_photos/crmRevision/ic_phone.png',
      }
    },
    methods:{
      previewImage(url){
        if(!this.isPrev) return;

        let urls = [url];

        wx.previewImage({
          current: urls[0],
          urls: urls
          // urls必须是数组 不然会报错
        })
      },
      makePhone(tel){//拨打电话
        if(tel){
          util.MakePhone(tel);
        }
      },
    }
  }
</script>

<style>
  .card2 .card_bg {
    width: 400upx;
    height: 100%;
  }

  .card2 .card2_inner {
    position: absolute;
    left: 324upx;
    top: 104upx;
  }

  .card_line_2 {
    position: relative;
  }

  .card_line_2::before,.card_line_2::after {
    position: absolute;
    width: 6upx;
    height: 16upx;
    background: #fff;
    top: 0;
    bottom: 0;
    margin: auto;
    content: '';
  }

  .card_line_2::before {
    right: 0;
  }

  .card_line_2::after {
    right: 10upx;
  }

  .card_company {
    position: absolute;
    right: 34upx;
    bottom: 30upx;
  }
</style>
<style  scoped>
.card-information{
  padding:80upx 0 0 30upx;
}
.card-list{
 border-radius:20px;
 box-shadow: 0 0 50rpx rgba(56, 56, 56, 0.05);
}
</style>
