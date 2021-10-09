<template>
  <div>
    <div class="bgfff lh44 fs16 c38 mb15 mt10">
      <p class="before_line fs18 pl21 fbold">备注信息</p>
      <div class="disflex jsbet pl15 pr16">
        <span>备注</span>
        <input id="remarks" type="text"
               class="pha8 textr h49 w220"
               placeholder="请填写备注"
                v-model="remarks"
               >
      </div>
    </div>

<BottomButtonSmall :text="'保存'"
                       :url="'save'"
                       @btn_tap="btn_tap"></BottomButtonSmall>
  </div>
</template>

<script>
  import WXAJAX from '@/utils/request'
  import util from '@/utils/index'
  import BottomButtonSmall from '@/components/bottom_button_small' //
  export default {
    remarks: '',
    components: {BottomButtonSmall},
    data() {
      return{
        isShowCancelOrderBox:false,
        cardId:'',
        userId:'',
        cId:''
      }
    },
    onLoad(option){
      this.cardId=option.cardId
      this.userId=option.userId
      this.cId=option.cId
      this.getinfo()
    },
    async onPullDownRefresh() {
    },
    methods: {
      getinfo(){
        // WXAJAX.POST(
        //   {
        //     cardId: this.cardId,
        //   },
        //   "",
        //   "/ipa/getIpaInfo",
        //   "1",
        // ).then(data => {
        //   console.log(data);
        //  })
      },
       btn_tap() {
         WXAJAX.POST(
           {
             cardId: this.cardId,
             ipaRemark: this.remarks,
             cId:this.companyId,
             userId:this.userId,
           },
           "",
           "/ipa/addIpa",
           "1",
         ).then(data => {
           wx.showToast({
                title: '添加成功',
                icon: 'success',
                duration: 2000//持续的时间
              })
          })
          wx.navigateBack({
            delta: 1
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

  .footer-btns{
    position: sticky;
    bottom: 0;
  }
</style>
