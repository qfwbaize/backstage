<template>
  <div class="item ">
    <scroll-view :style="{height: scrollContentHeight+'px'}" class="dynamic-content" :scroll-y="true"
      :enable-back-to-top="true" :scroll-anchoring="true" @scrolltoupper='scrolltoupper' @scrolltolower="scrolltolower">
      <div class="item-box bgfff" v-for="(item,index) in detailedlist" :key="index">
        <div class="middle flex-base pl15 pr15">
          <div class="content pl15">
            <p class="fs14 c38 title">
              提现用户：{{item.cardName}}
            </p>
            <span style="font-size: 24rpx;">提现金额：{{item.amount}}</span>
          </div>
        </div>
        <div class="flex-base bottom h44 pl15 pr15">
          <div class="flex-base">
            <span class="fs12 ca8">{{item.approvalTimeStr}}</span>
          </div>
          <div class=" h25 cblue fs12 btn-box">
            <div class="skip-btn share cfff bgblue" v-if="item.approvalStatus == 0">等待打款</div>
            <div class="skip-btn share cfff bgblue" v-if="item.approvalStatus == 1">打款成功</div>
            <div class="skip-btn share cfff bgblue" v-if="item.approvalStatus == 2">提现失败</div>
            <div class="skip-btn share cfff " style="background-color:#FF6347;" @click="oncancel(item.recordId)">取消提现</div>
          </div>
        </div>
      </div>
      <div v-if="ishownotyet"
        style="width: 100%;height: 400rpx;display: flex;flex-direction: column;align-items: center;">
        <image style="width: 200rpx;height: 200rpx;"
          src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png" mode=""></image>
        <div style="font-size: 30rpx;text-align: center;">暂无提现记录</div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
  import WXAJAX from '../../../utils/request';
  export default {
    data() {
      return {
        companyId: wx.getStorageSync('SELFCOMPANYID'),
        userId: wx.getStorageSync('userId'),
        cardId: wx.getStorageSync('SELFCARDID'),
        phone: wx.getStorageSync('phone'),
        nickeName: wx.getStorageSync('userName'),
        detailedlist: '',
        ishownotyet:false,
      }
    },
    onShow() {
      this.withdrawaldetails()
    },
    methods: {
      // 提现详情的接口
      withdrawaldetails() {
        WXAJAX.POST({
          // companyId:this.companyId,
          userId: this.userId,
          // cardId:this.cardId,
          // phone:this.phone,
          // name:this.nickeName,
          // approvalStatus:1,
          deleted: 0,
        }, '', '/withdrawals/queryPage', '', '', 1).then(res => {
          if (!res.list) {
          	this.ishownotyet = true
          	this.detailedlist = ''
          }
          if (res.list) {
          	this.detailedlist = res.list
          	this.ishownotyet = false
          }
          // this.detailedlist = res.list
        })
      },
      //下拉刷新
      scrolltoupper() {
        console.log("测试下拉刷新");
        // this.page = 1;
        // this.getlist(this.page);
      },
      //上拉加载更多
      scrolltolower() {
        console.log("测试上拉加载更多");
        // this.page = this.page+1;
        // this.getlist(this.page);
      },
      // 取消提现按钮
      oncancel(content) {
        WXAJAX.POST({
          recordId: content,
        }, '', '/withdrawals/del', '', '', 1).then(res => {
          this.withdrawaldetails()
          uni.showToast({
            title: '已取消',
            duration: 1000,
            icon:'none'
          });
        })
      },
    }
  }
</script>

<style scoped>
  .goToUserCenter {
    position: fixed;
    right: 20upx;
    bottom: 102upx;
    z-index: 200;
    box-sizing: border-box;
    text-align: center;
  }

  .share-records {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 92rpx;
  }

  .share-records-top {
    width: 100%;
    height: 88upx;
    display: flex;
    position: fixed;
    top: 0;
    justify-content: space-around;
    font-size: 32upx;
    color: #787878;
    background: #FFFFFF;
    align-items: center;
  }

  .select {
    box-sizing: border-box;
    padding-top: 27upx;
    display: block;
    height: 88upx;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .select-line {
    display: block;
    width: 100%;
    height: 4upx;
    background-color: #51CDCB;
    position: absolute;
    bottom: 0;
  }

  .share-records-content {
    flex: 1;
    padding: 118upx 30upx 0 30upx;
  }

  .dropdown {
    width: 200upx;
    height: 60upx;
    background-color: #F5F5F6;
    border-radius: 30upx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28upx;
    color: #A8A8A8;
    font-size: 28upx;
    float: right;
  }

  .dropdown image {
    width: 20upx;
    height: 20upx;
    margin-left: 8upx;
  }

  .list {
    margin-top: 80upx;
  }

  .item {
    /* width: 690upx; */
  }

  .item-box {
    border-radius: 20upx;
    /* float: left; */
    margin-bottom: 20upx;
  }

  .flex-base {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .middle {
    align-items: flex-start;
    height: 170upx;
    align-items: center;
  }

  .title {
    width: 490upx;
    height: 75upx;
    font-weight: 600;
    word-break: break-all;
    display: -webkit-box;
    /**对象作为伸缩盒子模型展示**/
    -webkit-box-orient: vertical;
    /**设置或检索伸缩盒子对象的子元素的排列方式**/
    -webkit-line-clamp: 2;
    /**显示的行数**/
    overflow: hidden;
    /**隐藏超出的内容**/
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 120upx;
  }

  .bottom {
    border-top: 1upx solid #f8f8f8;
  }

  .btn-box {
    display: flex;
    align-items: center;
  }

  .skip-btn {
    height: 48upx;
    display: flex;
    align-items: center;
    border-radius: 6upx;
    font-size: 26upx;
    margin-right: 20upx;
    box-sizing: border-box;
    text-align: center;
    padding: 0 10upx 0 10upx;
  }

  .delete {
    border: 1upx solid #E8E8E8;
  }

  .visitor {
    border: 1upx solid #51CDCB;
  }
</style>
