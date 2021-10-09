<template>
  <div class="bgfff bradiustr10 orderrow"  @click="order_tap(orderData.orderId)">
    <div class="pl15 lh44 posre disflex jsbet pl20 pr21">
      <div class="disflex align-cen">
        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/company_name.png" alt="" class="w16 h16 mr7">
        <span class="fs14 pr7">{{orderData.companyName}}</span>
        <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/right.png" alt="" class="w10 h10">
      </div>
      <span v-if="!orderData.orderState" class="corange fs14">等待付款</span>
      <span v-if="orderData.orderState" class="cblue fs14">已完成</span>
    </div>

    <!--产品-->
    <div class="disflex posre pb21"
         :class="'pl15'">

      <div class="disflex w100p pr16">
        <img :src="timeIcon" v-if="orderData.activityType == 1" class="w70 h70 mr11 bradius5" mode="aspectFill">
        <img :src="cardsIcon" v-if="orderData.activityType == 2" class="w70 h70 mr11 bradius5" mode="aspectFill">
        <img :src="videosIcon" v-if="orderData.activityType == 3" class="w70 h70 mr11 bradius5" mode="aspectFill">
        <div class="flex1">
          <p class="over_1 fs14 c38 w200"  v-if="orderData.activityType == 1">名片使用时长</p>
          <p class="over_1 fs14 c38 w200"  v-if="orderData.activityType == 2">名片使用人数</p>
          <p class="over_1 fs14 c38 w200"  v-if="orderData.activityType == 3">短视频</p>
          <div class="mt8">
            <span class="pr8 lh20 fs12 ca8 mr8" v-if="orderData.activityType == 1">名片使用时间{{orderData.duration}}年;x1</span>
            <span class="pr8 lh20 fs12 ca8 mr8" v-if="orderData.activityType == 2">名片使用人数{{orderData.duration}}次x1</span>
            <span class="pr8 lh20 fs12 ca8 mr8" v-if="orderData.activityType == 3">短视频上传次数{{orderData.duration}}次x1</span>
            <div>
              <span class="pl7 lh20 fs14 c38 floatr">￥{{(orderData.orderMoney.toFixed(2))}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
  import WXAJAX from '@/utils/request'
  export default {
    name: '',
    props:['orderData'],
    components: {},
    data() {
      return{
        cardsIcon:WXAJAX.imgBackUrl +'yimai_photos/crmRevision/img_cards.png',
        timeIcon:WXAJAX.imgBackUrl +'yimai_photos/crmRevision/img_time.png',
        videosIcon:WXAJAX.imgBackUrl +'yimai_photos/crmRevision/img_videos.png',
      }
    },
    mounted() {
      console.log(this.orderData)
    },
    methods: {
      order_tap(orderIds){
        this.$emit('order_tap',orderIds);
      },
    }
  }
</script>

<style>
  .orderrow .nav {
    height: 220upx;
    width: 100%;
    white-space: nowrap;
    padding-top: 40upx;
    box-sizing: border-box;
  }

  .orderrow .nav-item {
    display: inline-block;
  }
</style>
















