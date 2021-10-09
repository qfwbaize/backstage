<template>
  <view class="content">
    <view class="teamname">
      <text>联系电话</text>
      <input v-model="phone" type="number" placeholder="请输入联系电话"  />
    </view>

    <view class="teamname">
      <text>联系地址</text>
      <input type="text" placeholder="请输入联系地址" v-model="contactaddress" />
    </view>

    <view class="pl20 h32 lh32 mb18 fs14"
      style="background-color: #F3F3F3; color: rgba(160, 157, 157, 96);font-family: Arial;">发票信息</view>

    <view class="teamname">
      <text>开票名称</text>
      <input type="text" placeholder="请输入开票名称" v-model="invoicename" />
    </view>

    <view class="teamname">
      <text>税号</text>
      <input type="text" placeholder="请输入税号" v-model="dutyparagraph" />
    </view>

    <view class="teamname">
      <text>开户行</text>
      <input type="text" placeholder="请输入开户行" v-model="deposit" />
    </view>

    <view class="teamname">
      <text>开户行账号</text>
      <input type="text" placeholder="请输入开户行账号" v-model="numberdeposit" />
    </view>

    <view class="teamname">
      <text>开票地址</text>
      <input type="text" placeholder="请输入开票地址" v-model="address" />
    </view>

    <view class="teamname">
      <text>联系电话</text>
      <input type="number" placeholder="请输入联系电话" v-model="phones" />
    </view>

    <view class="teamname">
      <text>邮箱</text>
      <input placeholder="请输入常用邮箱" v-model="mailbox" />
    </view>

    <BottomButtonSmall :text="'保存'" :url="'confirm'" @btn_tap="save"></BottomButtonSmall>
  </view>
</template>

<script>
  import WXAJAX from "@/utils/request";
  import BottomButtonSmall from '@/components/bottom_button_small'
  export default {
    components: {
      BottomButtonSmall,
    },
    data() {
      return {
        phone:'', //电话
        contactaddress: '', //联系地址
        invoicename: '', //开票名称
        dutyparagraph: '', //税号
        deposit: '', //开户行
        numberdeposit: '', //开户行账号
        address: '', //开票地址
        phones: '', //联系电话
        mailbox: '', //常用邮箱
      }
    },
    onLoad(e) {
      if(e.type == 1){
        this.queryinvoice()
      }
    },
    // onShow(){
    //  this.queryinvoice()
    // },
    methods: {
      // 查寻机构发票
      queryinvoice(){
        WXAJAX.POST({
          companyId: wx.getStorageSync('COMPANYID'),
        }, '', '/invoice/query','','',1).then(res => {
          // this.practice=res
          this.phone=res.phone
          this.contactaddress=res.openingAddress
          this.invoicename=res.invoiceTitle
          this.dutyparagraph=res.invoiceNumber
          this.deposit=res.openingBank
          this.numberdeposit=res.openingBankNumber
          this.address=res.openingAddress
          this.phones=res.phone
          this.mailbox=res.email
        })
      },
      save() {
        var iphone = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        var mailboxs = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if (!iphone.test(this.phone) || !iphone.test(this.phones)) {
          uni.showToast({
            title: '手机号不正确',
            icon:'none'
          })
          return;
        }
        if (!mailboxs.test(this.mailbox)) {
          uni.showToast({
            title: '请输入正确的邮箱',
            icon:'none',
          })
          return;
        }
        WXAJAX.POST({
          invoiceNumber: this.dutyparagraph,
          invoiceTitle: this.invoicename,
          openingBank: this.deposit,
          openingBankNumber: this.numberdeposit,
          openingAddress: this.address,
          phone: this.phones,
          email: this.mailbox,
        }, '', '/invoice/add', '', '', 1).then(res => {
          uni.showToast({
            title: '保存成功'
          })
        })
      },
    }
  }
</script>

<style scoped>
  .content {
    width: 100vw;
    height: 100vh;
    background-color: #FFFFFF;
    padding-top: 40rpx;
  }

  .teamname {
    display: flex;
    line-height: 60rpx;
    margin-bottom: 50rpx;
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    font-family: PingFangSC-regular;
    padding-left: 40rpx;
  }

  .teamname text {
    width: 140rpx;
  }

  .teamname input {
    margin-left: 44rpx;
    width: 400rpx;
    height: 60rpx;
    border-radius: 12rpx;
    color: rgba(136, 136, 136, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: Microsoft Yahei;
    border: 2rpx solid rgba(187, 187, 187, 100);
    padding-left: 20rpx;
  }
</style>
