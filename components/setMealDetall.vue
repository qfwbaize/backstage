<template>
  <div class="disflex h100p  flex-column pl15 pr15 mt15">

      <div
      class="mb15 posre"
      v-for="(item,index) in setmeal" :key="index"
      @click="setmeal_tap(index,item.price,item.activityId)"
      >
        <div class="disflex setmeal_list pl15 pr15 align-cen jsbet fs14 c78"
             :class="current == index ? 'active' :  '' ">
          <div>{{item.name}}</div>
          <div class="disflex align-cen jsbet">
            <p v-if="item.activityType == 1" class="c38">名片使用时长</p>
            <p v-if="item.activityType == 2" class="c38">机构使用总人数</p>
            <p v-if="item.activityType == 3" class="c38">短视频上传个数</p>
            <div class="fs16 fbold cfff total_duration  bradius5">
              {{item.duration}}
              <span class="fs16" v-if="item.activityType == 1">年</span>
              <span class="fs16" v-if="item.activityType == 2">位</span>
              <span class="fs16" v-if="item.activityType == 3">个</span>    
            </div>
            
          </div>
        </div>
        <div 
        :class="current == index ? 'active_content' :  '' "
        class="content">
          <div class="disflex jsbet align-cen top fs18 fbold">
            <p>{{item.title}}</p>
            <p class="cdeeporange">￥{{item.price.toFixed(2)}}</p>
          </div>
          <div class="bottom">
            <p class="fs16 fbold mb10">活动时间</p>
            <p class="fs14 cblue mb5 fbold">{{item.startTime}}-{{item.endTime}}</p>
            <p class="fs14 ca8 lh20">此活动为服务付费活动，支付成功后，不能退款。如有疑问，请点击"咨询"进行询问。</p>                
          </div>
        </div>
      </div>
      <div class="h45 disflex jscen align-cen" v-if="setmeal" @click="callPhoneNum(setmeal[0].phoneNum)">
        <img :src="callIcon" class="w16 h16" >
        <p class="fs16 cblue ml8">咨询</p>
      </div>
  </div>
</template>

<script>
import WXAJAX from "@/utils/request";
export default {
  props:['setmeal'],
  data() {
    return {
      current:0,
      callIcon:WXAJAX.imgBackUrl + 'yimai_photos/crmAdd/ic_call.png',
    };
  },
  onShow() {
    
    //this.getInvite();
  },
  mounted(){
  
  },
  methods: {
    setmeal_tap(index,price,id){
      this.current = index
      this.$emit('setmeal_tap',price,id)
    },
    callPhoneNum(num){
      uni.makePhoneCall({
        phoneNumber:num
      })
    }
    
  },
};
</script>

<style scoped>
.tips{
  background: #EDFAFA;
  align-items: center;
  padding:24upx 30upx;
  color: #52CDCC;
  font-size: 28upx;
}
.setmeal_list{
  transition: all 0.4s;
  box-sizing: border-box;
  padding:0 30upx 0 35upx;
  height: 112upx;
  box-shadow: 0upx 4upx 16upx 0upx rgba(56, 56, 56, 0.1);
  border-radius: 10upx;
  border:4upx solid #ffffff;
}

.content{
  transition: all 0.4s;
  width: 100%;
  height: 0upx;
  border-radius: 10upx;
  overflow: hidden;
}
.total_duration{
  padding:5upx 15upx 5upx 15upx;
  border-radius: 10upx;
  margin-left:17upx;
  background: #51CDCB;
}
.content .top{
  height: 93upx;
  box-sizing: border-box;
  padding:0 12upx;
}
.bottom{
  padding:35upx 60upx 35upx 30upx;
  background: #EDFAFA;
}
.active{
  transition: all 0.4s;
  border:4upx solid #52CDCC;
}
.active .total_duration{
  background: #FFA133;
}
.active_content{
  transition: all 0.4s;
  height: 330upx;
}
</style>