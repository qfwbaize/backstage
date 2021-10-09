<template>
  <div class="posre h100p">

    <div class="bg_line_blue pl16 pr15 cfff disflex jsbet h99 borderbox pt30">
      <div>
        <p class="fs18 fbold">{{textInfo[orderState].title}}</p>
        <p class="fs12 pt7">{{textInfo[orderState].subtext}}</p>
      </div>
      <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/orderDetail.png" alt="" class="w57 h79"/>
    </div>
    <div class="mb10 order_detail_addr">
      <div class="bgfff pl9 pr18 disflex pt20">
        <!--<div class="bg_line_blue bradius50p w30 h30 textc lh30 mr11 cfff">a</div>-->
        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/addr_blue_bg.png" alt="" class="w30 h30 mr11 mt4">
        <div class="disflex jsbet flex1">
            <div class="addr_detail">
                <p class="fs16 c38 fbold">
                    <span>{{cart_lists.name}}</span>
                    <span style="margin-left: 20rpx">{{cart_lists.phoneNum}}</span>
                </p>
                <!-- over_1 -->
                <p class="fs13 c38  pt10 pb21">{{cart_lists.companyName}}</p>
            </div>
            
          </div>
      </div>
    </div>
    <!--商品-->
    
    <serviceOrderRow :orderData="cart_lists" :orderIndex="k"
                     :index1="k"></serviceOrderRow>
    <div class="disflex jsbet bbf5f6 pl16 pr17 c38 lh44 bgfff">
      <span class="fs16">商品金额</span>
      <span class="fs14 fbold">￥{{(cart_lists.orderMoney ? cart_lists.orderMoney : 0).toFixed(2)}}</span>
    </div>
    <div class="disflex jsbet pl16 pr17 c38 lh44 bgfff" v-if="orderState != 1">
      <span class="fs16">实付款</span>
      <span class="fs16 corange fbold">￥{{ (cart_lists.orderMoney ? cart_lists.orderMoney : 0 ).toFixed(2)}}</span>
    </div>
    <!--订单信息-->
    <div class="bgfff lh44 fs16 c38 mb60 mt10">
      <p class="before_line fs18 pl21 fbold">订单信息</p>
      <div class="disflex jsbet pl15 pr16">
        <span>订单编号</span>
        <span class="ca8">{{cart_lists.orderNum}}</span>
      </div>
      <div class="disflex jsbet pl15 pr16">
        <span>下单时间</span>
        <span class="ca8">{{cart_lists.orderTime}}</span>
      </div>
      <div class="disflex jsbet pl15 pr16">
        <span>支付方式</span>
        <span class="ca8">{{cart_lists.payType == 1 ? '线上支付' : '其他支付'}}</span>
      </div>
    </div>


    <!--操作-->
    <div class="disflex row-reverse lh30 bgfff fs14 fix_bottom">

      <div class="textr lh30 pt10 pb10 fs14 bgfff" v-if="cart_lists.orderState == 0">
        <span class="disinblock textc be8 ca8 bradius20 w90 mr10" @click="postRevoke(cart_lists.orderId)">撤销订单</span>
        <span class="disinblock bgblue textc cfff bradius20 w90 mr10" @click="toSeservicespay(cart_lists.orderId)">立即支付</span>
      </div>

      <div class="textr lh30 pt10 pb10 fs14 bgfff" v-if="cart_lists.orderState == 1">
        <span class="disinblock bgblue textc cfff bradius20 w90 h32 mr10" @click="callPhoneNum(cart_lists.phoneNum)">联系商家</span>
        <span class="disinblock bgblue textc cfff bradius20 w90 mr10" @click="toAddOrder">再来一单</span>
      </div>

      


    </div>
  </div>
</template>

<script>
  import serviceOrderRow from '@/components/serviceOrderRow' // 订单项
  import DialogBox from '@/components/dialogBox' // 对话框
  import StaticResources from '@/components/StaticResources';
  import WXAJAX from '@/utils/request'
  import util from '@/utils/index'


  export default {
    name: '',
    components: {serviceOrderRow,DialogBox,StaticResources},
    data() {
      return{
        dialog_show:false,
        refund_reason:'',//退款原因
        cart_lists: [
          {
            orderPrice:0 ,
            payPrice : 0 ,
          }
        ],
        count_money:[],
        total_money:'8576' ,
        default_addr:{},
        orderIds : 0 ,//订单id
        orderState : 0 ,//订单状态
        isChooseAddr : false ,//是否可以选择地址
        order_type: 1,
        textInfo:{
          1 :{
            title : '等待付款' ,
            subtext : '请在30′00内进行支付，超时后订单将自动取消'
          } ,
          2: {
            title:'已完成',
            subtext:'期待亲下次光临'
          },
        },
        createTime:''
      }
    },
    onShow(){
      this.orderState = this.$root.$mp.query.orderState
    },
    mounted() {
      wx.setNavigationBarTitle({
        title: "订单详情"
      });
      let v = this;

      v.orderIds = this.$root.$mp.query.orderIds || 0 ;
      //获取订单详情
      v.inits() ;

    },
    methods: {
      toIM(orderInfo){
        const {userId, logo, name, personalWx, phone} = orderInfo;

        wx.navigateTo({url: '../IM/main?userId='+userId+'&logo='+logo+'&type=2'+'&name='+name+'&wxCode='+personalWx +'&phone='+phone})
      },
      postRevoke(orderId){
        wx.showModal({
        title: '提示',
        content: '是否撤销订单',
        success: function (res) {
            if (res.confirm) {
                wx.showLoading()
                WXAJAX.POST({
                  orderId:orderId
                },'','/activity/deleteActivityOrderById')
                .then((data, code) => {
                  wx.navigateBack()
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
            }
          }
        });
      },
      toSeservicespay(orderId){
        let data = {
          orderId: orderId
        }
        wx.showLoading({
          title:'加载中...',
          mask:true
        })
        WXAJAX.POST(data,'','/activity/toPayOrder')
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
                wx.showToast({
                  title: '支付成功',
                  icon: 'success',
                  mask:true
                });
                setTimeout(() => {
                  wx.navigateBack()
                }, 800);
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
          // wx.showToast({
          //   title: '系统繁忙',
          //   duration: 2000,
          //   icon: "none"
          // });
        });
      },
      inits(){
        let v = this ;
        wx.showLoading() ;
        WXAJAX.POST({
          orderId    : v.orderIds,
        }, '', '/activity/queryActivityOrderById').then((data) => {

          if(data){
            v.cart_lists = data
          }
          wx.hideLoading();
        }).catch((err) => {
          wx.hideLoading();
          v.cart_lists = [] ;
          console.log(err)
        })
      },
      changeOrder(type , orderId , status){//订单操作
        let _url = '' ,
          params = {} ;
        switch (type) {
          case 'cancel' ://撤销订单
            _url = '/orders/backRefundState';
            params = {
              ordersId : orderId
            };
            break;
          case 'payNow'://立即支付
            wx.navigateTo({url:'../orderConfirm/main?orderId='+orderId});
            return;
          case 'cancelRefund' :
            _url = '/orders/updateOrderState';
            params = {
              ordersId : orderId ,
              orderState : status ,
            };
            break;
          case 'oneMoreOrder' ://再来一单
            _url = '/orders/anotherOrder';
            params = {
              ordersIds : orderId
            };
            break;
        }

        wx.showLoading() ;

        let  v = this ;

        WXAJAX.POST( params, '', _url).then((data) => {

          console.log(data);
          wx.hideLoading();

          if(data){
            wx.showToast({
              title:'操作成功！',
              icon:'success',
              duration:1000,
            });

            setTimeout(function () {

              if(type == 'cancel' || type == 'oneMoreOrder'){
                wx.navigateBack();
              }else {

                v.inits();

              }

            },800)

          }


        }).catch((err) => {
          wx.hideLoading();
          console.log(err)
        })


      },
      toAddOrder(){
        wx.navigateTo({ url: `../setMeal/main?type=${3}`});
      },
      callPhoneNum(num){
        uni.makePhoneCall({
          phoneNumber:num
        })
      },
    }
  }
</script>

<style>
  .before_line{
    position: relative;
  }
  .before_line::before{
    content: '';;
    position: absolute;
    width: 8upx;
    height: 40upx;
    background: #34CBC1;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .order_detail_addr>div{
    padding-left: 32upx;
  }
</style>
