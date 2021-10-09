<template>
  <div>

    <div class="bgfff lh49 fs16 c38 pl16 pr17">
      <div class="disflex jsbet">
        <span class="fbold pr10">职位名称 </span>
        <div class="disflex align-cen">
          <input type="text" placeholder="职位名称" class="fs16 lh49 h49 pr15 pha8 textr "
                 v-model="post">
          <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/right.png" alt="" class="w10 h10" />
        </div>
      </div>
    </div>
    <div class="bgfff lh49 fs16 c38 pl16 pr17">
      <div class="disflex jsbet">
      <!-- <div class="disflex jsbet" @click="chooseCity('../companyPack/searchChooseItem','city')"> -->
        <span class="fbold pr10">招聘城市 </span>
        <div class="disflex align-cen">
          <view>
            <picker mode="region" @change="bindRegionChange" :value="region">
                <view class="picker">
                  {{region[0]}}，{{region[1]}}，{{region[2]}}
                </view>
              </picker>
          </view>
          <!-- <input type="text" class="fs16 lh49 h49 pr15 pha8 textr " disabled v-model="address">
          <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/right.png" alt="" class="w10 h10" /> -->
        </div>
      </div>
    </div>
    <div class="bgfff lh49 fs16 c38 pl16 pr17">
      <div class="disflex jsbet" @click="experience_show = !experience_show">
        <span class="fbold pr10">工作经验 </span>
        <div class="disflex align-cen">
          <input type="text" class="fs16 lh49 h49 pr15 pha8 textr " disabled v-model="exper">
          <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/right.png" alt="" class="w10 h10" v-show="!experience_show" />
          <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/down.png" alt="" class="w10 h10"  v-show="experience_show"/>
        </div>
      </div>

      <!--选择工作经验-->
      <div class="overhidden bgfff fs12 c38 lh26 disflex wrap trans2" :class="experience_show ? 'h76' : 'h0' ">
                <span v-for="(v,k) in experienceArray" :key="k"
                      class=" w60 bradius5 textc mr7 mb10 "
                      @click="experience_tap(v)"
                      :class="experience_id == v.id ? 'cfff bblue bgblue' : 'be8' ">{{v.title}}</span>
      </div>

    </div>
    <div class="bgfff lh49 fs16 c38 pl16 pr17">
      <div class="disflex jsbet" @click="educat_show = !educat_show">
        <span class="fbold pr10">学历要求 </span>
        <div class="disflex align-cen">
          <input type="text" class="fs16 lh49 h49 pr15 pha8 textr " disabled v-model="educat">
          <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/right.png" alt="" class="w10 h10" v-show="!educat_show"/>

          <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/down.png" alt="" class="w10 h10" v-show="educat_show"/>
        </div>
      </div>

      <!--选择学历-->
      <div class="overhidden bgfff fs12 c38 lh26 disflex wrap trans2" :class="educat_show ? 'h76' : 'h0' ">
                <span v-for="(v,k) in educatArray" :key="k"
                      class=" w60 bradius5 textc mr7 mb10 "
                      @click="educat_tap(v)"
                      :class="educat_id == v.id ? 'cfff bblue bgblue' : 'be8' ">{{v.title}}</span>
      </div>
    </div>
    <div class="bgfff lh49 fs16 c38 pl16 pr17">
      <div class="disflex jsbet" @click="showPicker">
        <span class="fbold pr10">薪资 </span>
        <div class="disflex align-cen">
          <!--<input type="text" class="fs16 lh49 h49 pr15 pha8 textr " disabled v-model="salary">-->
          <picker mode="multiSelector"
                  @change="bindMultiPickerChange"
                  @columnchange="bindMultiPickerColumnChange"
                  :value="multiIndex"
                  :range="multiArray">
            <div class="picker pr15">
              {{multiArray[0][multiIndex[0]]}}k-{{multiArray[1][multiIndex[1]]}}k
            </div>
          </picker>
          <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/right.png" alt="" class="w10 h10" />
        </div>
      </div>
    </div>


    <div class="bgfff fs16 c38 pl16 pr17 mt10 lh25">
      <p class="lh49">具体要求</p>
      <textarea class="pha8" maxlength="-1"
                style="width: 100%;min-height: 200upx"
                :auto-height="true"
                v-if="isFocus"
                :focus="isFocus"
                @blur="isFocus=false"
                placeholder="请输入具体要求"
                v-model="remark">
      </textarea>
      <text class="textarea lh25"
           style="width: 100%; min-height: 200upx"
           v-else
           @click="isFocus=true"
           :class="{hasContent: !remark }">{{remark || '请输入具体要求'}}</text>
    </div>

    <BottomButtonSmall :text="'保存'" :url="'save'" @btn_tap="btn_tap" v-if="!isFocus"></BottomButtonSmall>
    <div class="h60"></div>
    <div v-if="isShowAuthorize">
      <AuthorizeBox @close="isShowAuthorize = false"></AuthorizeBox>
    </div>
  </div>
</template>

<script>
  import AuthorizeBox from '@/components/AuthorizeBox';
  import BottomButtonSmall from '@/components/bottom_button_small' // 订单项
  import StaticResources from '@/components/StaticResources';
  import amapFile from '../../../libs/amap-wx.js'
  import mpvuePicker from "mpvue-picker";
  import WXAJAX from '../../../utils/request'

  export default {
    name: '',
    components: {BottomButtonSmall, StaticResources,AuthorizeBox},
    data() {
      return {
        region: ['北京市', '北京', '朝阳区'],
        post: '',
        address: '北京市,北京,朝阳区',
        exper: '全部',
        educat: '全部',
        salary: '',
        remark: '',
        myAmapFun: '',
        Mc: '',
        locat: {
          city: '成都',
          addr: '',
          lat: '',
          lng: '',
        },
        /*薪资*/
        maxSalary: 30,
        minsalary: 3,
        multiArray:[['3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'],
          ['4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']],
        objectMultiArray:['3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','30'],
        multiIndex: [0, 0],
        /*经验*/
        experienceArray:[
          {title:'全部',id:7},{title:'应届生',id:1},{title:'1年以内',id:2},
          {title:'1-3年',id:3},{title:'3-5年',id:4},{title:'5-10年',id:5},
          {title:'10年以上',id:6}
        ],
        experience_id:7,
        experience_show:false,
        /*学历*/
        educatArray:[
          {title:'全部',id:1},{title:'初中及以下',id:2},{title:'中专/中技',id:3},
          {title:'高中',id:4},{title:'大专',id:5},{title:'本科',id:6},
          {title:'硕士',id:7},{title:'博士',id:8}
        ],
        educat_id:1,
        educat_show:false,
        editType : 'add' ,
        editId:0,
        isFocus: false,
        isShowAuthorize:false, // 重新拉取授权组件
        author:''
      }
    },
    onShow() {
      let _city = wx.getStorageSync('company_city');
      var than = this
      wx.getSetting({
        success(e){
          console.log( e.authSetting)
          than.author = e.authSetting['scope.userLocation']
          than.judge(than.author)
          }
        })
      if (_city) {
        this.address = _city;
        this.chooseLocal();
      }
    },
    onUnload(){
      this.text = '' ;
      this.post = '' ;
      this.remark = '';
    },
    mounted() {
      wx.setNavigationBarTitle({
        title: "机构招聘"
      });
      this.editType = this.$root.$mp.query.type || 'add' ;
      this.editId = this.$root.$mp.query.id || 0 ;
      this.myAmapFun = new amapFile.AMapWX({key: 'e11026819b6d300fda6a2c680fbd2fef'});
    },
    methods: {
      showPicker(){

      },
      bindRegionChange(e) {
          this.region=e.detail.value
          this.address=e.detail.value[0]+','+e.detail.value[1]+','+e.detail.value[2]
      },
      btn_tap(method) {
        console.log("address",this.address);
        if(!this.post.trim()){
          wx.showToast({
            title: '请输入职位名称！',
            icon: 'none',
          });
          return ;
        }
        if(!this.address.trim()){
          wx.showToast({
            title: '请选择城市！',
            icon: 'none',
          });
          return ;
        }

        let v = this ,
          max = this.multiArray[1][this.multiIndex[1]] ,
          min = this.multiArray[0][this.multiIndex[0]] ;
        max = max*1000*100 ;
        min = min*1000*100 ;
        wx.showLoading();
        WXAJAX.POST({
          position : this.post.trim(),
          recruitAddress : this.address ,
          experience : this.experience_id ,
          education : this.educat_id,
          maxSalary : max,
          minSalary : min,
          requirement : this.remark.trim(),
          accuracy : this.locat.lng,
          dimension : this.locat.lat ,
        }, '', '/company/addCompanyRecruit').then((data) => {

          wx.hideLoading();
          wx.showToast({
            title: '成功！',
            icon: 'success',
          });
          setTimeout(function () {
            wx.navigateBack()
          },500)

        }).catch((err) => {
          console.log(err);
          wx.hideLoading();
          wx.showToast({
            title: err.message,
            duration: 2000,
            icon: 'none'
          });
        });

      },
      judge(author){
        if(author == true){
          this.isShowAuthorize = false
          this.getlocation();
        }else{
          this.getlocation();
        }
      },
      chooseCity(url,type){//选择城市
        if(!this.author){
          this.isShowAuthorize = true
          return
        }else{
          wx.navigateTo({url: '../'+url+'/main?type='+type})
        }
      },
      getlocation() {//获取经纬度
        wx.showLoading({
          title: '定位中...',
          mask: true
        });
        var v = this;
        uni.getLocation({
          type: 'wgs84',
          success: function (res) {
            v.locat.lat = res.latitude;
            v.locat.lng = res.longitude;
            if(!wx.getStorageSync("company_city")){
              let city = wx.getStorageSync("company_city");
              if(city && city.location){
                let location = city.location.split(',');
                v.locat.lng = location[0];
                v.locat.lat = location[1] ;
              }else{
                v.getLocal();
              }
            }
            //v.chooseLocal();
            wx.hideLoading();
          },
          fail: function (err) {
            wx.hideLoading();
            if(!v.author){
              v.isShowAuthorize = true
            }
          },
          complete: function () {
            wx.hideLoading();
          }
        })
      },
      getLocal(latitude, longitude) {
        let v = this;
        v.myAmapFun.getRegeo({
          location: '' + v.locat.lng + ',' + v.locat.lat + '', // location的格式为'经度,纬度'
          success: function (data) {
            if(data[0].regeocodeData.addressComponent.city.length){
              v.address = data[0].regeocodeData.addressComponent.province +','+ data[0].regeocodeData.addressComponent.city +','+ data[0].regeocodeData.addressComponent.district;
            }else{
              v.address = data[0].regeocodeData.addressComponent.province +','+ data[0].regeocodeData.addressComponent.district;
            }
            console.log("v.address",v.address);
          },
          fail: function (info) {
            v.address = '重新定位';
            console.log(info)
          }
        })

      },
      chooseLocal(){
        this.myAmapFun.getInputtips({
          keywords: this.address,
          location: '',
          success: function(data){
            if(data && data.tips && data.tips.length >= 2){
              let i = data.tips[1];
              if(!i.location){
                i.location = i.location.split(',');
                this.locat.lng = i.location[0];
                this.locat.lat = i.location[1] ;
                console.log(i);
              }
            }
          }
        })
      },
      page_turn(url) {
        wx.navigateTo({url: '../' + url + '/main'})
      },
      bindMultiPickerChange(e) {
        this.$set(this.multiIndex , 0 , e.target.value[0]);
        this.$set(this.multiIndex , 1 , e.target.value[1]);
      },
      bindMultiPickerColumnChange(e) {

        switch (e.target.column) {
          case 0:
            let list = this.objectMultiArray ,
              _index = e.target.value;

            list = list.slice([_index + 1 ]) ;
            this.$set(this.multiIndex , 0 , _index) ;
            this.$set(this.multiArray , 1 , list);
            break;
          case 1:
          // console.log(e.target.value);
        }
      },
      experience_tap(obj){//选择经验
        this.experience_id = obj.id ;
        this.exper = obj.title;
      },
      educat_tap(obj){//选择经验
        this.educat_id = obj.id ;
        this.educat = obj.title;
      }
    }
  }
</script>

<style>
  .textarea{
    cursor:auto;
    width:600upx;
    display:block;
    position:relative;
  }
  .hasContent{
    color: #888;
  }
</style>
