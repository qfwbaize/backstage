<template>
  <div class="posre">
    <!--menu-->
    <div class="bgfff pl8 posticky borderbox disflex align-cen" :style="{height:navHeight+ 'px',top:0,paddingTop:statusBarHeight+'px'}">
      <div class="w30 pr20 disblock borderbox disflex align-cen fs0">
        <img :src="leftIcon" class="w15 h15" @click="goBack">
      </div>
      <div class="fs18 fbold c38 disflex align-cen posre" @click.stop="orderSwitch">
        <p>{{currentType ? '服务订单' : '商品订单'}}</p>
        <img :src="downIcon" class="w8 h8 ml8 rotate180" :class="showSwitch ? 'move_rotate180' : ''">
        <div class="posab switch posre" :class="showSwitch ? 'active_switch' : ''">
            <img :src="bgImg" class="w113 h53">
            <div
            @click="select_switch"
            class="w113 h53 posab disflex align-cen zindex99 borderbox pl15"
            style="top:5px;left:0">
                <img :src="currentType ? orderIcon : orderbIcon" class="w15 h15">
                <p class="fs15 fnormal ml8 cfff">{{currentType ? '商品订单' : '服务订单'}}</p>
            </div>
        </div>
      </div>
    </div>
    <div v-if="!currentType">
      <div class="disflex zindex9 bgfff jsbet pl16 pr16 lh49 ca8 fs16 ordertype bgfff" :style="{top:navHeight + 'px'}">
        <span :class="order_type == 1 ? 'active' : '' " @click="order_type_tap(1)">待付款</span>
        <span :class="order_type == 2 ? 'active' : '' " @click="order_type_tap(2)">待发货</span>
        <span :class="order_type == 3 ? 'active' : '' " @click="order_type_tap(3)">待收货</span>
        <span :class="order_type == 4 ? 'active' : '' " @click="order_type_tap(4)">已完成</span>
        <span :class="order_type == 5 || order_type == 6 ? 'active' : '' " @click="order_type_tap(5)">退款/售后</span>
      </div>

    <!--订单-->
      <div class="pl15 pr15" v-if="cart_lists.length">
        <div class="mt11" v-for="(cart_item,k) in cart_lists" :key="k">
          <OrderItemRow :orderData="cart_item"
                        @order_tap="order_tap">
          </OrderItemRow>
          <div class="textr lh44 bgfff pr20">
            <span class="fs14 c333">共{{cart_item.ordersModelList[0].num}}件商品 实付款: </span>
            <span class="fs14 c333 pl10 fbold corange">¥{{((order_type == 1 ? cart_item.orderPrice : cart_item.payPrice)/100)}}</span>
          </div>


          <!--退款-->
          <div class="lh44 pl20 bgfff fs14 c38 disflex align-cen bradiusbl10" v-if="order_type == 6">
            <static-resources src="yimai_photos/crm/refund.png" alt="" className="w16 h16 mr7" />
            退款原因：{{cart_item.refundRemark}}
          </div>

          <div class="textr lh30 pt10 pb10 fs14 bgfff bradiusbl10" v-if="order_type == 1">
            <span class="disinblock textc be8 ca8 bradius20 w90 mr10" @click="showTips(cart_item)">撤销订单</span>
            <span class="disinblock bgblue textc cfff bradius20 w90 mr10" @click="toIM(cart_item)">联系客户</span>
          </div>

          <div class="textr lh30 pt10 pb10 fs14 bgfff bradiusbl10" v-if="order_type == 2">
            <span class="disinblock textc be8 ca8 bradius20 w90 mr10" @click="toIM(cart_item)">联系客户</span>
            <span class="disinblock bgblue textc cfff bradius20 w90 mr10" @click="confirmShipment(cart_item)">确认发货</span>
          </div>

          <div class="textr lh30 pt10 pb10 fs14 bgfff bradiusbl10" v-if="order_type == 3">
            <span class="disinblock bgblue textc cfff bradius20 w90 h32 mr10" @click="toIM(cart_item)">联系客户</span>
          </div>

          <div class="textr lh30 pt10 pb10 fs14 bgfff bradiusbl10" v-if="order_type == 4">
            <span class="disinblock textc ca8 bradius20 w90 be8 mr10" @click="toIM(cart_item)">联系客户</span>
          </div>

          <div class="textr lh30 pt10 pb10 fs14 bgfff bradiusbl10" v-if="order_type == 5">
            <span class="disinblock textc be8 ca8 bradius20 w90 mr10" @click="toIM(cart_item)">联系客户</span>
            <span class="disinblock textc ca8 bradius20 w90 be8 mr10" v-if="cart_item.refundState == 2" @click="refusalOfRefund(cart_item)">拒绝退款</span>
            <span class="disinblock bgblue textc cfff bradius20 w90 mr10" v-if="cart_item.refundState == 2" @click="confirmRefund(cart_item)">确认退款</span>
          </div>
        </div>
        <div class="textc lh42 fs12 ca8 bgf5f6" v-if="noMore">- 到底了，看看其他的吧 -</div>
      </div>
      <NoData v-else>暂无数据</NoData>

      <div class="textc disflex w60 h60 bradius50p bgblue disinblock goToUserCenter" @click="page_turn('mine')">
        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/user_add.png" alt="" class="w30 h30 mt15">
      </div>

      <div v-show="isShowCancelOrderBox">
        <DialogBox :dialog_title="'提示'" @btn_tap="cancelOrder" dialog_ph="确定要撤销该订单吗？"
                  :type="'hint2'"
                  :left="'取消'"
                  :right="'确定'"
        ></DialogBox>
      </div>
    </div>
    <div v-else>
      <div class="disflex zindex9 bgfff jsbet w100p lh49 ca8 fs16 ordertype bgfff" :style="{top:navHeight + 'px'}">
        <div class="w50p disflex jscen">
          <span :class="order_type_switch == 1 ? 'active' : '' " @click="order_type_tap_switch(1)">待付款</span>
        </div>
        <div class="w50p disflex jscen">
          <span :class="order_type_switch == 2 ? 'active' : '' " @click="order_type_tap_switch(2)">已完成</span>
        </div>
      </div>
      <div class="pl15 pr15" v-if="activityList || activityList.length ">
        <div class="mt11" v-for="(cart_item,k) in activityList" :key="k">


          <serviceOrderRow :orderData="cart_item"
                            @order_tap="order_tapA">
          </serviceOrderRow>

          <div class="textr lh44 bgfff pr20">
            <span class="fs14 c333" v-if="order_type_switch == 1">共1件商品 待付款: </span>
            <span class="fs14 c333" v-if="order_type_switch == 2">共1件商品 已付款: </span>
            <span class="fs14 c333 pl10 fbold corange">¥{{cart_item.orderMoney.toFixed(2)}}</span>
          </div>
          <div class="textr lh30 pt10 pb10 fs14 bgfff bradiusbl10" v-if="!cart_item.payMoney">
            <span class="disinblock textc be8 ca8 bradius20 w90 mr10" @click="deleteActivityOrderById(cart_item.orderId)">撤销订单</span>
            <span class="disinblock bgblue textc cfff bradius20 w90 mr10" @click="toSeservicespay(cart_item.orderId)">立即支付</span>
          </div>


          <div class="textr lh30 pt10 pb10 fs14 bgfff bradiusbl10" v-if="cart_item.payMoney">
            <span class="disinblock textc be8 ca8 bradius20 w90 mr10" @click="callPhoneNum(cart_item.phoneNum)">联系商家</span>
            <span class="disinblock textc be8 cfff bradius20 w90 mr10 bgblue" @click="toSeservices">再来一单</span>
          </div>
        </div>
        <div class="textc lh42 fs12 ca8 bgf5f6" v-if="noMore">- 到底了，看看其他的吧 -</div>
      </div>
      <NoData v-else>暂无数据</NoData>
    </div>
  </div>
</template>

<script>
  import OrderItem from '@/components/orderItem' // 订单项
  import OrderItemRow from '@/components/orderItemRow' // 订单项
  import serviceOrderRow from '@/components/serviceOrderRow'
  import NoData from '@/components/noData'
  import StaticResources from '@/components/StaticResources';
  import WXAJAX from '@/utils/request'
  import DialogBox from '@/components/dialogBox' // 对话框

  export default {
    name: '',
    components: {OrderItem , OrderItemRow, StaticResources, NoData, DialogBox,serviceOrderRow},
    data() {
      return{
        order_type :'1' ,
        cart_lists: [],
        page : 1,
        loading: false,
        noMore: false,
        isShowCancelOrderBox: false,
        currentOrder: {},
        tipsTitle: '',
        isPageLoading: false,
        statusBarHeight:0,
        navHeight:0,
        leftIcon:WXAJAX.imgBackUrl + '/yimai_photos/crmAdd/Icon_back.png',
        downIcon:WXAJAX.imgBackUrl + 'yimai_photos/crmAdd/ic_down_black.png',
        bgImg: WXAJAX.imgBackUrl + "yimai_photos/crmAdd/img_bg_message_2.png",
        orderIcon: WXAJAX.imgBackUrl + 'yimai_photos/crmAdd/ic_order_run.png',
        orderbIcon:WXAJAX.imgBackUrl +'yimai_photos/crmAdd/ic_order_run@2x.png',
        currentType:false,
        showSwitch:false,
        order_type_switch:'1',
        activityList:[],
        orderState:0,
        type:''
      }
    },
    mounted() {
      this.type = this.$root.$mp.query.type
      if(this.type == 'currentType'){
        this.currentType = true,
        this.order_type_switch=2
        this.orderState = 1
        this.getActivityOrder()
      }
      this.getActivityOrder()
      this.calculateNavBarHeight()
      wx.setNavigationBarTitle({
          title: "订单"
        });
      this.getOrder();

    },
    async onPullDownRefresh() {
      this.reset();
      await this.getOrder();
      wx.stopPullDownRefresh();
    },
    onReachBottom(){
      if(this.currentType){
        this.getActivityOrder();
      }else{
        this.getOrder();
      }
    },
    methods: {
      //计算高度
      calculateNavBarHeight () {
        let menuButtonBounding = getApp().globalData.menuButtonBounding;
        wx.getSystemInfo({
          success: res => {
            let statusBarHeight = res.statusBarHeight; //胶囊按钮与顶部的距离
            let navHeight = statusBarHeight + (menuButtonBounding.top - statusBarHeight) * 2 + menuButtonBounding.height; //导航高度

            getApp().globalData.navHeight = navHeight;
            this.navHeight = navHeight;
            this.statusBarHeight = statusBarHeight;
            console.log(this.statusBarHeight)
            // this.mainHeight = res.windowHeight
          },
          fail (err) {

          }
        });
      },
      showTips(orderInfo, type){
        this.tipsTitle = '确定要撤销该订单吗？';
        this.currentOrder = orderInfo;
        this.isShowCancelOrderBox = true;
      },
      cancelOrder(str){
        if (str == 'save') {
          this.postRevoke(this.currentOrder);
        }
        this.isShowCancelOrderBox = false;
      },
      toIM(orderInfo){
        console.log("当前的orderInfo", orderInfo)
        const {userId, logo, name, personalWx, phone} = orderInfo;
        let selfId = wx.getStorageSync('userId');

        if (userId == selfId) {
          wx.showToast({
            title: '不能和自己聊天~~',
            duration: 2000,
            icon: 'none'
          })
          return;
        }

        wx.navigateTo({url: '../../IM/main?userId='+userId+'&logo='+logo+'&type=2'+'&name='+name+'&wxCode='+personalWx +'&phone='+phone})
      },
      page_turn(url){
        wx.reLaunch({url:'../../'+url+'/main'});
      } ,
      order_tap(orderIds){
        wx.setStorageSync('orderState', this.order_type);

        wx.navigateTo({url: '/pages/my/orderDetail/main?orderIds=' + orderIds + '&orderState=' + this.order_type});
      },
      order_tapA(orderIds){
        console.log(orderIds)
        wx.navigateTo({url: '../../enterpriSeservices/activityDetall/main?orderIds=' + orderIds + '&orderState=' + this.order_type_switch});
      },
      reset() {
        this.page = 1;
        this.nodata = false;
        this.isPageLoading = false;
        this.cart_lists = [];
      },
      getOrder(){
        if (this.isPageLoading) return;
        this.isPageLoading = true;
        return WXAJAX.POST({
          //参数订单状态
          pageNum: this.page,
          orderState:this.order_type
        },'','/orders/selectOrdersInfo').then((data) => {
          this.isPageLoading = false;
          if(data){
            if(this.page == 1){
              this.cart_lists = [];
            }
            this.page++;
            this.cart_lists.push(...data);
          }else {
            this.noMore = true;
          }

        }).catch((err) =>{
          this.isPageLoading = false;
        })
      },
      getActivityOrder(){
        wx.showLoading({
          title:'加载中...',
          icon:"none",
          mask:true
        })
        return WXAJAX.POST({
          //参数订单状态
          payUserId:wx.getStorageSync('userId') || '',
          companyId:wx.getStorageSync('COMPANYID') || '',
          pageNum:this.page,
          orderState:this.orderState
        },'','/activity/queryActivityOrderPage').then((data) => {
          wx.hideLoading()
          if(data){
            if(this.page == 1){
              this.activityList = []
            }
            this.page++;
            this.activityList = [...this.activityList, ...data.pageInfo.list];
          }else {
            this.noMore = true;
          }

        }).catch((err) =>{
          this.isPageLoading = false;
        })
      },
      //(3)
      order_type_tap(type_id){
        //选择订单类型
        this.order_type = type_id;
        this.isPageLoading = false;
        this.page = 1;
        this.cart_lists=[];
        this.getOrder();
      },
      //(4)撤销订单
      postRevoke(cart_item){
        if(this.loading) return;

        this.loading=true;
        WXAJAX.POST({
          //参数订单状态
          orderState:5,
          ordersId :cart_item.ordersId,
        },'','/orders/updateOrderState').then((data) => {
          this.loading =false;
          console.log("撤销成功")
          wx.showToast({
            title: '操作成功',
            duration: 2000,
            icon: 'none'
          });
          this.reset();
          this.getOrder();
        }).catch((err) =>{
          console.log("撤销失败")
          this.loading =false;
          wx.showToast({
            title: err.message,
            duration: 2000,
            icon: 'none'
          });
        });
      },
      //(5)拒绝退款
      refusalOfRefund(cart_item){
        if(this.loading) return;
        this.loading = true;

        WXAJAX.POST({
          refundState:1,
          ordersId:cart_item.ordersId,
        },'','/orders/updateRefundState').then((data) => {
          this.loading = false;
          console.log("拒绝退款成功")
          wx.showToast({
            title: '操作成功',
            duration: 2000,
            icon: 'none'
          });
          this.reset();
          this.getOrder()

        }).catch((err) =>{
          this.loading = false;
          console.log("拒绝退款失败")
          wx.showToast({
            title: err.message,
            duration: 2000,
            icon: 'none'
          });
        });
        //重新请求
        // this.onceAgain()
      },
      //(6)确认退款
      confirmRefund(cart_item){
        if(this.loading) return;
        this.loading = true;
        WXAJAX.POST({
          refundState:3,
          ordersId :cart_item.ordersId,
        },'','/orders/updateRefundState').then((data) => {
          this.loading = false;
          wx.showToast({
            title: '操作成功',
            duration: 2000,
            icon: 'none'
          });
          this.reset();
          this.getOrder()
        }).catch((err) =>{
          this.loading = false;
          console.log("退款失败")
          wx.showToast({
            title: err.message,
            duration: 2000,
            icon: 'none'
          });
        })
        //重新请求
        // this.onceAgain()
      },
      // 确认发货
      confirmShipment(cart_item){
        if(this.loading) return;
        this.loading = true;
        console.log("当前的card_item", cart_item)
        WXAJAX.POST({
          //参数订单状态
          orderState:3,
          ordersId :cart_item.ordersId,
        },'','/orders/updateOrderState').then((data) => {
          console.log("发货成功")
          this.loading = false;
          wx.showToast({
            title: '操作成功',
            duration: 2000,
            icon: 'none'
          });
          // this.order_tap = 3
          this.order_type_tap(3)
          // this.reset();
          // this.getOrder()
        }).catch((err) =>{
          this.loading = false;
          console.log("发货失败")
          wx.showToast({
            title: err.message,
            duration: 2000,
            icon: 'none'
          });
        })
        // this.onceAgain()
      },
      //(7)
      onceAgain(){
        WXAJAX.POST({
          //参数订单状态
          orderState:5
        },'','/orders/selectOrdersInfo').then((data) => {
          this.cart_lists = data;
          console.log("成功")
        }).catch((err) =>{
          console.log("失败")
        });
      },
      orderSwitch(){
        this.showSwitch = !this.showSwitch
      },
      select_switch(){
        this.order_type = 1
        this.order_type_switch = 1
        this.currentType = !this.currentType
      },
      order_type_tap_switch(type){
        this.order_type_switch = type
        if(type == 1){
          this.orderState = 0
        }else if(type == 2){
          this.orderState = 1
        }
        this.page = 1
        this.getActivityOrder()
      },
      toSeservices(){
        wx.navigateTo({
          url:'../../enterpriSeservices/seservices/main'
        })
      },
      deleteActivityOrderById(orderId){
          let v = this
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
                    v.page = 1
                    v.getActivityOrder()
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
        let than = this
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
                  this.getActivityOrder()
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
          wx.showToast({
            title: '系统繁忙',
            duration: 2000,
            icon: "none"
          });
        });
      },
      callPhoneNum(num){
        uni.makePhoneCall({
          phoneNumber:num
        })
      },
      goBack(){
        wx.navigateBack()
      }
    }
  }
</script>

<style scoped>
  .ordertype{
    position: sticky;
  }
  .ordertype .active{
    color: #51CDCB;
    border-bottom: 6upx solid #51CDCB;
  }
  .goToUserCenter{
    position: fixed;
    right: 20upx;
    bottom: 102upx;
    z-index: 99;
    box-sizing: border-box;
    text-align: center;
  }
  .switch{
    transition: all .2s;
    top: 60upx;
    left: -25upx;
    height: 0;
    overflow: hidden;
  }
  .active_switch{
    transition: all .2s;
    height: 226upx;
  }
</style>
