<template>
  <view>

    <!-- 余额充值 -->
    <view class='toast-box'>
      <view class='toastbg'></view>
      <view class='showToast'>
        <view class='toast-title'>
          <text @click="clknum">认证费金额：(元)</text>
        </view>
        <view class='toast-main'>
          <view class='toast-input'>
            <input type='digit'  v-model="money"  disabled="true">
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
        money: '100',
        clkednum: 0,
        amount: '',
        username: wx.getStorageSync('userName'),
        cardWelcomeSpeech: wx.getStorageSync('cardWelcomeSpeech'),
        docid:'',
      }
    },
    onLoad(option) { 
      this.docid= option.docid;
      console.log(this.docid,111111111)
    },
    onShow() {
      wx.setNavigationBarTitle({
        title: "支付认证服务费"
      });
      this.getMoney();

    },
    methods: {
	  clknum(){
		  this.clkednum++;
		  if(this.clkednum>9){
			  this.money='0.01';
		  }
		  
	  },
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
          wx.navigateBack({
            delta: 3
          })
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
          authId: than.docid,
          orderState: 0,
        }
        wx.showLoading({
          title: '加载中...',
          mask: true
        })
        WXAJAX.POST(data, '', '/companyQualificationAuth/commitQualificationOrder', '', '', 1)
          .then((data, code) => {
            console.log(data)
            wx.requestPayment({
              timeStamp: data.timeStamp,
              nonceStr: data.nonce_str,
              package: 'prepay_id=' + data.prepay_id,
              signType: 'MD5',
              paySign: data.paySign,
              success(res) {
                wx.navigateBack({
                  delta: 3
                })
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
        }).catch(err => {
          console.log(1111, '失败')
        });
        this.isShowwithdraw = !this.isShowwithdraw
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
