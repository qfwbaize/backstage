<template>
  <div class="fix_top h100p dialog_box">
    <div class="dialog_con bgfff bradius5" >
      <p class="textc fs18 c38 pt25 pb25 ">{{dialog_title}}</p>

      <div class="fs14 c78 pl35 pr31 pb36">
        <!-- <input type="number" maxlength="11" class="pha8 bradius5 mb10 borderbox" :placeholder="dialog_ph" v-model="phone"> -->
        <div class="disflex bgf5f6 align-cen bradius5 overhidden pr10">
          <input type="number" maxlength="6" class="flex1 pha8 " :placeholder="dialog_ph_2" v-model="verification_code">
          <span class="cblue" v-if="!countDown" @click="getWxTwoCode">获取验证码</span>
          <span class="c333" v-else>重新获取{{' '+ countDown}}s</span>
        </div>
      </div>

      <div class="disflex fs18 textc lh44 btf5f6 dialog_bottom">
        <span class="w50p ca8 bgfff" @click="cancel_tap('cancel')">取消</span>
        <span class="w50p bg_line_blue cfff" @click="btn_tap('save')">确定</span>
      </div>
    </div>

  </div>
</template>

<script>
import utils from '../utils/index'
import WXAJAX from '../utils/request'
  export default {
    name: '',
    props:['dialog_title','phone'],
    components: {},
    data() {
      return{
        verification_code:'', //验证码
        countDown:'',  //倒计时
        timer:'' //计时器
      }
    },
    methods: {
      btn_tap(){
        wx.showLoading({
          mask:true,
          title:'加载中...'
        })
        if(!utils.checkPhone(this.phone)){
          return wx.showToast({title:'请输入正确的电话号码',icon:'none'})
        }
        if(!this.verification_code || this.verification_code.length < 6){
          return wx.showToast({title:'验证码不完整！',icon:'none'})
        }
        WXAJAX.POST({phone: this.phone,smsCode:this.verification_code,type:2},'','/businessCard/checkSmsCode')
        .then((data) => {
          wx.hideLoading()
          this.$emit('btn_tap',this.phone,this.verification_code);
        }).catch((err) => {

        });
      },
      cancel_tap(){
        this.$emit('cancel_tap');
      },
      getWxTwoCode(){
        let than = this
        if(!utils.checkPhone(this.phone)){
          return wx.showToast({title:'请输入正确的电话号码',icon:'none'})
        }
        wx.showLoading({
          mask:true,
          title:'发送中...'
        })
        WXAJAX.POST({phone: this.phone,type:2},'','/home/sendSms')
        .then((data) => {
          wx.hideLoading()
          than.countDown = 60;

          than.timer = setInterval(() => {
            than.countDown--;
            if (than.countDown === 0) {
              clearInterval(than.timer);
            }
          }, 1 * 1000);
        }).catch((err) => {

        });
      }
    }
  }
</script>

<style>
  .dialog_box {
    background: rgba(0, 0, 0, .5);
    z-index: 100;
  }

  .dialog_con {
    width: 580upx;
    position: absolute;
    left: 0;
    right: 0;
    top: 30%;
    margin: auto;
    overflow: hidden;
  }

  .dialog_con input{
    width: 100%;
    line-height: 78upx;
    height: 78upx;
    background: #f5f5f6;
    font-size: 28upx;
    color: #A8A8A8;
    padding-left: 22upx;
  }
  .dialog_con input:last-child{
    margin-bottom: 60upx;
  }

  .dialog_bottom{
    border-radius: 0 0 10upx 10upx;
  }
  .fix_top {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 99;
  }
  .h100p {
      height: 100%;
  }
  .borderbox {
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
  }
  .mb10 {
      margin-bottom: 20rpx;
  }
  .bradius5 {
      border-radius: 10rpx;
  }
  .overhidden {
      overflow: hidden;
  }
  .align-cen {
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
  }
  .disflex {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
  }
  .pr10 {
      padding-right: 20rpx;
  }
  .bradius5 {
      border-radius: 10rpx;
  }
  .bgf5f6 {
      background: #f5f5f6;
  }
  .textc {
      text-align: center;
  }
  .lh44 {
      line-height: 88rpx;
  }
  .fs18 {
      font-size: 36rpx;
  }
  .btf5f6 {
      border-top: 1rpx solid #f5f5f6;
  }
  .w50p {
      width: 50%;
  }
  .bgfff {
      background: #fff;
  }
  .ca8 {
      color: #a8a8a8;
  }
  .bg_line_blue {
      background: -webkit-gradient(linear,left top,right top,from(#76dad9),to(#51cdcc));
      background: -o-linear-gradient(left,#76dad9,#51cdcc);
      background: linear-gradient(90deg,#76dad9,#51cdcc);
  }
</style>
