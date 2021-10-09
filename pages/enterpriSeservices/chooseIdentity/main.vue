<template>
  <div class="chooseIdentity">
    <IdentityItem
      outStyle="padding-top:0"
      imgUrl="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/photo/20190528/20190528155343.png"
      desc="我是成员，想要加入已有机构"
      btnText="我是成员"
      @choose="chooseIdentity(1)"
    />
    <div class="cut-line">
      <p class="line"></p>
      <p class="txt">或者</p>
      <p class="line"></p>
    </div>
    <IdentityItem
      outStyle="padding-bottom:0"
      imgUrl="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/photo/20190528/20190528155350.png"
      desc="我是管理者，想要创建自己的机构"
      btnText="我是管理者"
      @choose="chooseIdentity(2)"
    />
  </div>
</template>

<script>
  import IdentityItem from '@/components/IdentityItem'

  export default {
    name: "chooseIdentity",
    components:{
      IdentityItem,
    },
    data(){
      return {

      }
    },
      onShow() {
          if (!wx.getStorageSync('token')) {
              this.toLogin();
          }
      },
    methods:{
      chooseIdentity(type){
          if (!wx.getStorageSync('token')) {
              this.toLogin();
              return;
          }
        let url = type == 1 ? '/pages/companyPack/searchChooseItem/main?type=company' : '/pages/companyPack/editEnterprise/main?type=chooseAdd';
        wx.navigateTo({
          url
        });
      },
        toLogin(){
            let url = '/pages/wxLogin/main?unLoginRedirectUrl=/pages/enterpriSeservices/chooseIdentity/main';
            wx.navigateTo({url});
        }
    },
  }
</script>

<style>
  page{
    background: white;
  }

  .chooseIdentity{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* height: 580px; */
    margin: auto;
    padding: 0 30upx;
  }

  .cut-line{
    width:100%;
    position: relative;
    text-align: center;
    color: #787878;
    font-size: 24upx;
    display: flex;
    align-items: center;
  }

  .cut-line .txt{
    margin: 0 10rpx;
  }

  .cut-line .line{
    flex:1;
    height:5rpx;
    background: #E8E8E8;
  }
</style>
