<template>
  <div class="box">
    <view class="uni-list">
      <radio-group @change="radioChange">
        <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in departliat" :key="index"
          style="display: flex;border-top: 2rpx solid #959595;">
          <view style="margin-top: 56rpx;margin-left: 16rpx;">
            <radio :value="item.department" :checked="index === current" />
          </view>
          <view class="branch">
            <view class="tment">
              <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/member.png" mode="">
              </image>
            </view>
            <view>{{item.department}}</view>
          </view>
        </label>
      </radio-group>
    </view>
    <view class="" style="width: 100%;height: 100rpx;"></view>
    <view class="determine" @click="define()">确定</view>
  </div>
</template>

<script>
  import WXAJAX from "@/utils/request"
  export default {
    data() {
      return {
        current: '',
        bumenlist:'',  //部门名称
        listid:'',
        pageNum:1,
        departliat:'',
      }
    },
    onLoad(options) {
      if(options && options.list){
        this.listid=options.list.split(",")
      }
    },
    onShow() {
     this.getcturelist()
    },
    methods: {
      getcturelist(){
        WXAJAX.POST({
          pageNum:this.pageNum,
          companyId:uni.getStorageSync('COMPANYID'),
          isDel:0,
        }, '', '/department/queryPage', '', '',1).then((res) => {
            this.departliat=res.list
        })
      },
      // 单选选项
      radioChange: function(evt) {
        for (let i = 0; i < this.departliat.length; i++) {
          if (this.departliat[i].value === evt.detail.value) {
            this.current = i;
            break;
          }
        }
        this.bumenlist=evt.detail.value
      },
      define(){
        WXAJAX.POST({
          department:this.bumenlist,
          cardIds:this.listid,
        }, '', '/businessCard/updateCardDepartment', '', '',2).then((res) => {
          uni.navigateBack({
            success: () => {
              let page = getCurrentPages().pop();  //跳转页面成功之后
              if (!page) {
                return;
              } else {
                  page.onLoad(page.options);// page自带options对象.
              }
            }
          })
        })
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
    background-color: #0266BC;
    display: flex;
    align-items: center;
    justify-content: center;
    /* margin-top: 20rpx; */
    margin-left: 32rpx;
    margin-right: 34rpx;
  }

  .tment image {
    width: 66rpx;
    height: 66rpx;
  }

  .branch {
    width: 100%;
    height: 152rpx;
    background-color: #FFFFFF;
    border-radius: 12rpx;
    display: flex;
    align-items: center;
  }
  .determine{
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
