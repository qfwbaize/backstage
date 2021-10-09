<template>
  <view>
    <view
      style="background-image: linear-gradient(to right, #FFA340 ,#FBC94A);height:280rpx;border-radius:10rpx;color:#fff;padding-top:40rpx;padding-left:40rpx;padding-right:40rpx;width:600rpx;margin:0 auto;">
      <view style="margin-bottom: 10rpx;">总金额</view>
      <view style="font-size: 72rpx;letter-spacing: 10rpx;font-weight: bold;margin-bottom:;">{{accountAmount || 0.00}}
      </view>
      <view style="display:flex;justify-content: space-between;padding-botom:40rpx;box-sizing: border-box;">
        <view style="width: 100%;display: flex;justify-content: space-between;flex-direction: column;">
          <view style="width: 100%;">
            冻结金额
          </view>
          <view style="width: 100%;">
            {{freezeAmount || 0.00}} ￥
          </view>
        </view>

        <view
          style="width: 100%;box-sizing: border-box;border-left:1rpx solid  #fff;padding-left:40rpx;display: flex;justify-content: space-between;flex-direction: column;">
          <view style="width: 100%;">
            可用余额
          </view>
          <view style="width: 100%;">
            {{usableAmount || 0.00}} ￥
          </view>
        </view>
      </view>
    </view>

    <div class="bgfff disflex jsbet pl25 pr25 pt20 mt10 mb10 textc">
      <div @click="cashout">
        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/cardcase.png" alt=""
          class="w30 h30" />
        <p class="fs12 c78 pt10 pb20">申请提现</p>
      </div>

      <div @click="toAward">
        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/cardcase.png" alt=""
          class="w30 h30" />
        <p class="fs12 c78 pt10 pb20">账户明细</p>
      </div>
      <div @click="balance">
        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/cardcase.png" alt=""
          class="w30 h30" />
        <p class="fs12 c78 pt10 pb20">余额充值</p>
      </div>
      <div @click="toBalanceOrder">
        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/cardcase.png" alt=""
          class="w30 h30" />
        <p class="fs12 c78 pt10 pb20">充值订单</p>
      </div>
      <div @click="toCashoutOrder">
        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/cardcase.png" alt=""
          class="w30 h30" />
        <p class="fs12 c78 pt10 pb20">提现记录</p>
      </div>
    </div>
    <!-- 余额充值 -->
    <view class='toast-box' v-if="isShowConfirm">
      <view class='toastbg'></view>
      <view class='showToast'>
        <view class='toast-title'>
          <text>输入充值金额</text>
        </view>
        <view class='toast-main'>
          <view class='toast-input'>
            <input type='digit' v-model="money">
          </view>
        </view>
        <view class='toast-button'>
          <view class='button1'>
            <button @click='balanceisshow'>取消</button>
          </view>
          <view class='button2'>
            <button :disabled="balancedisab" data-url="../allOrder/allOrder" @click='confirmAcceptance'>确定</button>
          </view>
        </view>
      </view>
    </view>
    <!-- 申请提现 -->
    <view class='toast-box' v-if="isShowwithdraw">
      <view class='toastbg'></view>
      <view class='showToast'>
        <view class='toast-title'>
          <text>输入提现金额</text>
        </view>
        <view class='toast-main'>
          <view class='toast-input'>
            <input type='digit' v-model="amount">
          </view>
        </view>
        <view class='toast-button'>
          <view class='button1'>
            <button @click='cashoutup'>取消</button>
          </view>
          <view class='button2'>
            <button :disabled="balancedisab" @click='withdrawal'>确定</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import util from '../../../utils/index'
  import WXAJAX from '../../../utils/request';
  export default {
    data() {
      return {
        isShowwithdraw: false, //体现按钮的显隐
        isShowConfirm: false, //控制余额充值模块显隐
        balancedisab: false, //充值按钮是否禁用
        accountAmount: 0,
        freezeAmount: 0,
        usableAmount: 0,
        money: '',
        amount: '',
        username: wx.getStorageSync('userName'),
        cardWelcomeSpeech: wx.getStorageSync('cardWelcomeSpeech'),
      }
    },
    onLoad() {
      console.log('onload')
    },
    onShow() {
      wx.setNavigationBarTitle({
        title: "我的钱包"
      });
      this.getMoney();

    },
    methods: {
      getMoney() {
        let that = this
        WXAJAX.POST({
          ignore: true
        }, '', '/account/myAccount', '', '', 1).then((data) => {
          that.accountAmount = data.accountAmount;
          that.freezeAmount = data.freezeAmount;
          that.usableAmount = data.usableAmount;
        });
      },
      toAward() { //
        wx.navigateTo({
          url: "../award/main"
        });
      },
      balanceisshow() { //余额充值切换显示隐藏
        let that = this
        that.isShowConfirm = !that.isShowConfirm
      },
      balance() { //余额充值显示
        let that = this
        that.isShowConfirm = true
      },
      // 提现金额的显示
      cashout() {
        let that = this
        that.isShowwithdraw = true
      },
      // 取消按钮的提现金额
      cashoutup() {
        let that = this
        that.isShowwithdraw = !that.isShowwithdraw
         this.amount = ''
      },
      toBalanceOrder() {
        wx.navigateTo({
          url: "../balanceOrder/main"
        });
      },
      // 去提现记录页面
      toCashoutOrder() {
        wx.navigateTo({
          url: "../cashoutOrder/cashoutOrder"
        });
      },
      confirmAcceptance() { //余额充值  充值接口
        if (this.money <= 0) {
          wx.showToast({
            title: '请输入充值金额！',
            icon: 'none'
          });
          return;
        }
        this.topay();
        // let that = this
        // that.balancedisab = true
        // WXAJAX.POST({
        //   accountAmount: this.money,
        //   usableAmount: this.money,
        // }, '', '/account/updateAccountByAccountId','','',1).then((data, code) => {
        //   WXAJAX.POST({
        //     ignore: true
        //   }, '', '/account/myAccount', '', '', 1).then((data) => {
        //     this.isShowConfirm=false;
        //     that.balancedisab = false
        //     that.money='';
        //     that.accountAmount=data.accountAmount;
        //     that.freezeAmount=data.freezeAmount;
        //     that.usableAmount=data.usableAmount;
        //   }).catch(e=>{
        //     that.balancedisab = false
        //   });
        // });


      },
      topay() {
        let than = this
        let data = {
          orderMoney: than.money,
          payMoney: than.money,
          orderState: 0,
        }
        wx.showLoading({
          title: '加载中...',
          mask: true
        })
        WXAJAX.POST(data, '', '/account/commitAccountOrder', '', '', 1)
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
                than.isShowConfirm = false;
                than.balancedisab = false
                than.money = '';
                than.getMoney();
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
      withdrawal() {
        WXAJAX.POST({
          amount: this.amount,
          cardName: this.cardWelcomeSpeech.user,
        }, '', '/withdrawals/add', '', '', 1).then(res => {
          console.log(1111)
          this.getMoney();
        }).catch(err => {
          console.log(1111, '失败')
        });
        this.isShowwithdraw = !this.isShowwithdraw
        this.amount = ''
      },
    }
  }
</script>

<style scoped>
  /* 余额充值部分 */
  .toast-box {
    width: 100%;
    height: 100%;
    opacity: 1;
    position: fixed;
    top: 0px;
    left: 0px;
  }

  .toastbg {
    opacity: 0.2;
    background-color: black;
    position: absolute;
    width: 100%;
    min-height: 100vh;
  }

  .showToast {
    position: absolute;
    opacity: 1;
    width: 70%;
    margin-left: 15%;
    margin-top: 40%;
  }

  .toast-title {
    padding-left: 5%;
    background-color: #787878;
    color: white;
    padding-top: 2vh;
    padding-bottom: 2vh;
    border-top-right-radius: 16rpx;
    border-top-left-radius: 16rpx;
  }

  .toast-main {
    padding-top: 2vh;
    padding-bottom: 2vh;
    background-color: white;
    text-align: center;
  }

  .toast-input {
    margin-left: 5%;
    margin-right: 5%;
    border: 1px solid #ddd;
    padding-left: 2vh;
    padding-right: 2vh;
    padding-top: 1vh;
    padding-bottom: 1vh;
  }

  .toast-button {
    display: flex;
  }

  .button1 {
    width: 50%;
  }

  .button2 {
    width: 50%;
  }

  .button1 button {
    width: 100%;
    background-color: white;
    color: red;
    border-radius: 0rpx;
    border-bottom-left-radius: 16rpx;
  }

  .button2 button {
    width: 100%;
    background-color: white;
    color: black;
    border-radius: 0rpx;
    border-bottom-right-radius: 16rpx;
  }
</style>
