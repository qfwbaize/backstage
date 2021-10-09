<template>
    <div>
        <div class="mt10 bgfff pl16 pt15 pb15 fs16 pr16">
            <p class="fs12 ca8">详细地址</p>
            <div class="disflex jsbet pt15 align-cen">
                <input type="text" class="w100p phe8 flex1 over_1 fbold" placeholder="地址" v-model="full_address">
                <span class="cblue" @click="resetAddr">{{full_address ? '重新定位' : '点击选择地址'}}</span>
            </div>
            <input type="text" class="pt15 w100p phe8 fs16" placeholder="详细地址（楼层／门牌号" v-model="district">
        </div>
        <BottomButtonSmall :text="'保存'" :url="'save'" @btn_tap="saveWebMsg"></BottomButtonSmall>
        <div v-if="isShowAuthorize">
          <AuthorizeBox @close="isShowAuthorize = false"></AuthorizeBox>
        </div>
    </div>
</template>

<script>
    import BottomButtonSmall from '@/components/bottom_button_small' //
    import amapFile from '@/libs/amap-wx.js'
    import WXAJAX from '@/utils/request'
    import AuthorizeBox from '@/components/AuthorizeBox';

    export default {
        name: '',
        components: {BottomButtonSmall,AuthorizeBox},
        data() {
            return {
                name : '' ,
                tel : '' ,
                type:0,
                full_address : '' ,
                district : '' ,
                bottom: {
                    left: {
                        text: '删除', url: 'del'
                    },
                    right: {
                        text: '保存', url: 'save'
                    }
                },
                locat: {
                    lat: '',
                    lng: '',
                },
                myAmapFun: '',
                Mc: '',
                websiteId:0,
                isShowAuthorize:false
            }
        },
        onShow(){
            let _company_address = wx.getStorageSync('company_address') || '' ;
            _company_address && (this.full_address = _company_address.street + _company_address.build) ;
        },
        onUnload(){
            wx.setStorageSync('company_address' , '');
        },
        onLoad(option) {
          if(option.type){
            this.type=option.type
          }
            wx.setNavigationBarTitle({
                title: '选择地址'
            });

            this.websiteId = wx.getStorageSync('websiteId') || 0 ;

            this.Mc = wx.createMapContext('map');
            this.myAmapFun = new amapFile.AMapWX({key: 'e11026819b6d300fda6a2c680fbd2fef'}) ;
            this.resetAddr();
        },
        methods: {
            // resetAddr(){
            //   var than = this;
            //   wx.getSetting({
            //     success(res) {
            //       console.log();
            //       console.log(res);
            //       let userLocation = res.authSetting["scope.userLocation"];
            //       if (userLocation == false) {
            //         than.isShowAuthorize = true;
            //         return false;
            //       }
            //       wx.navigateTo({ url: "../companyAddr/main" });
            //     }
            //   });
            // },
            resetAddr() {//获取经纬度
                wx.showLoading({
                    title: '定位中...',
                    mask: true
                });
                var v = this;
                uni.getLocation({
                    type: 'wgs84',
                    success: function (res) {
                        let latitude = res.latitude;
                        let longitude = res.longitude;
                        v.locat.lat = res.latitude;
                        v.locat.lng = res.longitude;
                        wx.chooseLocation({
                            latitude,
                            longitude,
                            success: function (res) {
                                v.full_address = res.address

                            }
                        })
                        wx.hideLoading();
                    },
                    fail: function (err) {
                        v.isShowAuthorize=true;
                        wx.hideLoading();

                    },
                    complete: function () {
                        wx.hideLoading();
                    }
                })
            },

            saveWebMsg( str , strValue ){
                if(!this.full_address){
                    uni.showToast({
                        title:'请先确定地址！',
                        icon:'none'
                    })
                    return
                }
                wx.showLoading();
                if(this.type){
                  wx.setStorageSync('VisitAddr' , this.full_address + this.district);
                  wx.setStorageSync('full_address' , this.full_address);
                  wx.setStorageSync('district' , this.district);
                  setTimeout(function () {
                      wx.navigateBack() ;
                  },500);
                }else{
                  WXAJAX.POST({
                      address : this.full_address + this.district,
                      websiteId : this.websiteId ,
                      latitude: this.locat.lat,
                      longitude: this.locat.lng
                  }, '', '/company/addWebsiteInfo').then((data) => {

                      wx.hideLoading();

                      wx.setStorageSync('webSiteAddr' , this.full_address);
                      wx.showToast({
                          title: '成功',
                          icon: 'success',
                      });
                      setTimeout(function () {
                          wx.navigateBack() ;
                      },500);
                  }).catch((err) => {
                      wx.hideLoading();
                      console.log("数据请求失败")
                  });
                }
            }

        }
    }
</script>

<style>

</style>
