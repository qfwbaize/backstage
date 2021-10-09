<template>
  <div style="background-color: #FFFFFF;">
    <view class="uni-list">
      <checkbox-group @change="checkboxChange">
        <label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in member_lists" :key="index"
          style="display: flex;border-top: 2rpx solid #959595;">
          <view style="margin-top: 56rpx;margin-left: 16rpx;">
            <checkbox :value="item.customerId" :checked="item.checked"/>
          </view>
          <view class="branch">
            <view class="tment">
              <image :src="item.logo || 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/card1_user.png'"  mode=""></image>
            </view>
            <view>{{item.name}}</view>
          </view>
        </label>
      </checkbox-group>
    </view>
    <div v-if="ishownotyet"
      style="width: 100%;height: 400rpx;display: flex;flex-direction: column;align-items: center;">
      <image style="width: 200rpx;height: 200rpx;"
        src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png" mode=""></image>
      <div style="font-size: 30rpx;text-align: center;">暂无客户</div>
    </div>
    <view class="romone" >
      <view class="romonelist" style="background-color: #FFFFFF;color: #676767 ;" @click="tosharing()">移交至共享</view>
      <view class="romonelist"  style="background-color: #19D09B;color: #FFFFFF ;" @click="colleagues()">移交至同事</view>
    </view>
  </div>
</template>

<script>
  import WXAJAX from "@/utils/request"
  export default {
    data() {
      return {
        isBoss: '',
        removeSaffInfo: [],
        page: 1,
        member_lists: '',
        romelist:'',
        // pageSize:10,
      }
    },
    onLoad(e) {
      console.log(e)
      this.removeSaffInfo = e
    },
    onShow() {
      this.isBoss = wx.getStorageSync('isBoss') || false;
      this.inits()
    },
    // onReachBottom(){

    // },
    async onPullDownRefresh(){
      this.page = 1
      this.inits()
    },
    methods: {
      inits() {
        let v = this,
          params = {};
        params.customerState = 1;
        params.userId = v.removeSaffInfo.userId || '';
        params.cardId = v.removeSaffInfo.cardId || '';
        params.pageNum = v.page;
        params.pageSize = 10;
        params.type = 1;
        WXAJAX.POST(params, '', '/customer/getCustomer', '', '').then((res) => {
          if(res){
            v.member_lists = res
            this.ishownotyet = false

          }
          if(!res){
             v.member_lists = ''
             this.ishownotyet = true
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      checkboxChange: function(e) {
        var items = this.member_lists,
          values = e.detail.value;
        for (var i = 0, lenI = items.length; i < lenI; ++i) {
          const item = items[i]
          if (values.includes(item.value)) {
            this.$set(item, 'checked', true)
          } else {
            this.$set(item, 'checked', false)
          }
        }
        this.romelist=e.detail.value
        console.log(e.detail.value)
      },
      colleagues(){
        if(this.romelist == ''){
          uni.showToast({
              title: '您还没选择您要移交的客户',
              duration: 1000,
              icon:'none'
          });
          return
        }
        if(this.romelist != ''){
          let dll = ''
          uni.navigateTo({
          	url: "../../companyPack/batchmove/batchmove?dll="+this.romelist + "&type=" + 1
          });
        }
      },
      // 移交至共享
      tosharing(){
        if(this.romelist == ''){
          uni.showToast({
              title: '您还没选择您要移交的客户',
              duration: 1000,
              icon:'none'
          });
          return
        }
        if(this.romelist != ''){
          WXAJAX.POST({
           customerIds:this.romelist.join(',') ,
           customerState:2,
           ascriptionId:"",
          }, '', '/userTask/moveCustomer', '', '', ).then((res) => {
            console.log(res)
            uni.showToast({
                title: '移交完成',
                duration: 1000,
                icon:'none'
            });
            uni.navigateBack({
                delta: 1
            });
          })
        }
      },
    }
  }
</script>

<style>
  .tment {
    width: 114rpx;
    height: 114rpx;
    border-radius: 12rpx;
    /* background-color: #0266BC; */
    display: flex;
    align-items: center;
    justify-content: center;
    /* margin-top: 20rpx; */
    margin-left: 32rpx;
    margin-right: 34rpx;
  }

  .tment image {
    width:114rpx;
    height: 114rpx;
  }

  .branch {
    width: 100%;
    height: 152rpx;
    background-color: #FFFFFF;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
  }

  .determine {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100rpx;
    background-color: #00D7D0;
    color: #FFFFFF;
    text-align: center;
    line-height: 100rpx;
  }
  .romone{
    display: flex;
    width: 100%;
    height: 100rpx;
    position: fixed;
    bottom: 0;
    right: 0;
  }
  .romonelist{
    flex: 1;
    line-height: 100rpx;
    text-align: center;
    font-size: 32rpx;
  }
</style>
