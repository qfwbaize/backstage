<template>
  <div class="box">
    <view class="" v-if="!ishow">
      <view class="uni-list">
        <checkbox-group @change="checkboxChange">
          <label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in staffdetails" :key="index"
            style="display: flex;border-top: 2rpx solid #959595;">
            <view style="margin-top: 56rpx;margin-left: 16rpx;">
              <checkbox :value="item.cardId" :checked="item.checked" />
            </view>
            <view class="branch">
              <view class="tment">
                <image :src=item.logo mode=""></image>
              </view>
              <view>{{item.name}}</view>
            </view>
          </label>
        </checkbox-group>
      </view>
      <view class="" style="width: 100%;height: 100rpx;"></view>
      <view class="determine" @click="togroup()">移动到</view>
    </view>
    <view class="" v-if="ishow">
      <view class="uni-list">
        <radio-group @change="radioChange">
          <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in staffdetails" :key="index"
            style="display: flex;border-top: 2rpx solid #959595;">
            <view style="margin-top: 56rpx;margin-left: 16rpx;">
              <radio v-if="type == 1" :value="item.cardId" :checked="index === current" />
              <radio v-if="type == 2" :value="item.accountId" :checked="index === current" />
            </view>
            <view class="branch">
              <view class="tment">
                <image :src=item.logo mode="">
                </image>
              </view>
              <view>{{item.name}}</view>
            </view>
          </label>
        </radio-group>
      </view>
      <view class="determine" @click="totransfer()">确认移交</view>
    </view>
  </div>
</template>

<script>
  import WXAJAX from "@/utils/request"
  export default {
    data() {
      return {
        staffdetails: '', //人员列表
        romelist: '',
        department: '', //部门名称
        ishow: false,
        customerIds: '',
        current: '',
        bumenlist: '',
        type:'',
        cardIds:''
      }
    },
    onLoad(e) {
      if (e.type == 1) {
        wx.setNavigationBarTitle({
          title: '选择同事'
        })
        this.ishow = true
        this.department = ''
        this.customerIds = e.dll
        this.type = e.type
      }
      if (e.type == undefined) {
        this.ishow = false
        if (e.end == 1) {
          this.department = '无'
        }
        if (e.end != 1) {
          this.department = e.end
        }
      }
      if(e.type == 2){
        wx.setNavigationBarTitle({
          title: '选择同事'
        })
        this.ishow = true
        this.type = e.type
        this.cardIds = e.cardId
      }
      console.log(e)

    },
    onShow() {
      this.getcomypor()
    },
    methods: {
      checkboxChange: function(e) {
        var items = this.staffdetails,
          values = e.detail.value;
        for (var i = 0, lenI = items.length; i < lenI; ++i) {
          const item = items[i]
          if (values.includes(item.value)) {
            this.$set(item, 'checked', true)
          } else {
            this.$set(item, 'checked', false)
          }
        }
        this.romelist = e.detail.value
        console.log(e.detail.value)
      },
      // 移动到分组
      togroup() {
        let list = ''
        uni.navigateTo({
          url: "../../companyPack/setdepartment/setdepartment?list=" + this.romelist
        });
      },
      // 查训无部门的员工
      getcomypor() {
        WXAJAX.POST({
          ignore: true,
          department: this.department,
        }, '', '/businessCard/getCompanyStaffList', '', '', ).then((res) => {
          console.log(res)
          this.staffdetails = res.list
        })
      },
      radioChange: function(evt) {
        for (let i = 0; i < this.staffdetails.length; i++) {
          if (this.staffdetails[i].value === evt.detail.value) {
            this.current = i;
            break;
          }
        }
        this.bumenlist = evt.detail.value
        console.log(evt.detail)
      },
      // 移交客户到同事
      totransfer() {
        if(this.type == 1){
           if(this.bumenlist == ''){
             uni.showToast({
                 title: '您还没选择您要移交的同事',
                 duration: 1000,
                 icon:'none'
             });
             return
           }
           
            // if(this.romelist != ''){
              let ascriptionId = this.bumenlist.toString()
              WXAJAX.POST({
                customerIds: this.customerIds,
                customerState: 1,
                ascriptionId: ascriptionId,
              }, '', '/userTask/moveCustomer', '', '', ).then((res) => {
                console.log(res)
                uni.showToast({
                  title: '移交完成',
                  duration: 1000,
                  icon: 'none'
                });
                uni.navigateBack({
                  delta: 1
                });
              })
            // }
        }
        // 移交名片
        if(this.type == 2){
          WXAJAX.POST({
            cardId:'',
            cardIds:[this.cardIds],
            accountId:this.bumenlist,
          }, '', '/cardAccount/insertCardAccountById', '', '',1 ).then((res) => {
            console.log(res)
            uni.showToast({
              title: '移交完成',
              duration: 1000,
              icon: 'none'
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

<style scoped>
  .box {
    /* width: 100%; */
    /* height: 100%; */
    /*    padding-left: 40rpx; */
    /* padding-top: 40rpx; */
    /* padding-right: 42rpx; */
    background-color: #FFFFFF;
  }

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
    width: 114rpx;
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
</style>
