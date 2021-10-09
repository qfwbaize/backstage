<template>
  <div class="create-task">
    <div class="content-wrap">
      <div class="target">
        <div class="title c38">
          <span class="bggreen"></span>
          VR上传
          <p @click="toSelectpeople()" class="c78" style="margin-left: 300rpx;font-size: 28rpx;"></p>
        </div>
        <ul>
          <li>
            <div class="target-left c78 pr16 marks">
              VR标题
            </div>
            <div class="target-right">
			  <input class="c39" type="number"  v-model="name"  placeholder="请输入VR标题">
            </div>
          </li>
          <li>
            <div class="target-left c78">
              VR链接地址
            </div>
            <div class="target-right">
              <input class="c39" type="number"  v-model="phone"  placeholder="请输入VR地址">
            </div>
          </li>
        </ul>
      </div>
      <div class="target">
        <div class="title c38">
          <span class="bgblue"></span>
          上传VR封面
        </div>
        <div class="content" style="margin-bottom: 120rpx;">
          <div class="disflex wrap">
            <div class="bgfff bdash_a8 w100 h100 mr7 mb7 posre"
                 v-for="(v,k) in visitingLbsUrl"
                 :key="k">
              <img :src="v"
                   alt=""
                   class="w100p h100p"
                   mode="aspectFill">
              <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/del.png"
                   alt=""
                   class="w20 h20 posab right2 top2"
                   @click="delImg(k)">
            </div>
            <div
                 class="bgfff bdash_a8 w100 h100 add_img mr7 mb7"
                 @click="uploadpic('self', 1)">
            </div>
           </div>
        </div>
      </div>
    </div>
    <div class="disflex fs18 textc lh49 fix_bottom">
        <span class="w100p bg_line_blue cfff" @click.stop="page_turn()">提交</span>
        <!-- <span class="w50p bg_line_blue cfff" @click.stop="page_turn(right.url)">{{right.text}}</span> -->
    </div>
  </div>
</template>

<script>
  import BottomButtonTwo from '@/components/bottom_button_two'
  import WXAJAX from '../../../utils/request.js';
  import datatimea from '../../../components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
  import {mapStates,mapMutations} from 'vuex'
  import util from '../../../utils/index'
  import amapFile from '@/libs/amap-wx.js'
  export default {
    data(){
      return{
        isShowConfirm:false,//控制余额充值模块显隐
        downImg:WXAJAX.imgBackUrl + '/product-index/icon_right-s.png',
        //type 用来分辩到底是创建还是修改任务
        type:'',
        myAmapFun: '',
        visitingId:0,
        visitingType:1,
        visitingTime:'',
        visitingPurpose:'',
        visitingContent:'',
        visitingResult:'',
        visitingLbsUrl:'',
        visitingAddr:'',
        visitingAddrInfo:'',
        visitingPlan:'',
        templateTitle:'',//模板标题
        name:'',
        phone:'',
        customerInfo:'',

        intervieweeCompany:'',//公司
        intervieweePosition:'',//职位
        visitingProduct:'',//产品名称

        staffid:'',
        selectInfo:'',
        begin:'2020-5-21 14:39',
        userId:wx.getStorageSync('userId'),
        address:'',
        visitingLbsUrl: [],//个人图片
        customerInfo:[],
        bottom: {
          left: {
            text: '另存为模板', url: 'template'
          },
          right: {
            text: '保存', url: 'save'
          }
        },
      }
    },
    components:{
      datatimea,
      BottomButtonTwo
    },
    onLoad() {

      this.companyId = wx.getStorageSync('COMPANYID')
      this.type = 1
      this.taskCustomerId = wx.getStorageSync('COMPANYID')
    },
    watch:{
      //判断是否为编辑任务，1为创建，2为编辑
      type(newVal,oldVal){
        if(newVal == 1){

        }else{
          this.isLoading = true;
        }
      },
    },
    onShow() {
      this.myAmapFun = new amapFile.AMapWX({key: 'e11026819b6d300fda6a2c680fbd2fef'})

      let nowDate = new Date()

      let date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate()
      }
      console.log("date",date);
      if(date.month<10){
        date.month = '0'+date.month
      }
      if(date.date<10){
        date.date = '0'+date.date
      }
      this.visitingTime = date.year + '-' + date.month + '-' + date.date;
      // if(wx.getStorageSync('VisitAddr')){
      //   this.visitingAddr=wx.getStorageSync('VisitAddr');
      //   this.visitingAddrInfo=wx.getStorageSync('district');

      //   wx.setStorageSync('VisitAddr','');
      //   wx.setStorageSync('full_address','');
      //   wx.setStorageSync('district','');
      // }


      this.staffid = this.$store.state.staffId
      if(wx.getStorageSync('customerList')){//获取客户信息
        this.customerInfo = wx.getStorageSync('customerList');
        this.name = this.customerInfo[1]
        this.phone = this.customerInfo[2]
        this.intervieweeCompany = this.customerInfo[3]
        this.intervieweePosition = this.customerInfo[4]
        wx.setStorageSync('customerList','');
      }

      if(wx.getStorageSync('visitingInfoTemplateId')){
        this.getVisitingInfoTemplate();
      }
    },
    mounted(){

    },
    methods:{
      getVisitingInfoTemplate(){//获取模板信息并渲染
        let v=this

        WXAJAX.POST({
          visitingInfoTemplateId: wx.getStorageSync('visitingInfoTemplateId')
        }, '', '/visitingInfoTemplate/query','','','1').then((data) => {
          v.visitingContent=data.visitingContent
          v.visitingPlan=data.visitingPlan
          v.visitingPurpose=data.visitingPurpose
          v.visitingResult=data.visitingResult
          v.visitingProduct=data.visitingProduct
        }).catch((err) => {

        })

        wx.removeStorageSync('visitingInfoTemplateId')
      },
     
      getLocal(latitude, longitude) {

          let v = this;

          v.myAmapFun.getRegeo({
              location: '' + v.locat.lng + ',' + v.locat.lat + '', // location的格式为'经度,纬度'
              success: function (data) {
                  let _address = data[0].regeocodeData.addressComponent,
                      _neighborhood = _address.neighborhood,
                      _street = _address.streetNumber;

                  v.adcode = _address.adcode;
                  if(_address.city.length){
                    v.locat.city = _address.city;
                  }else{
                    v.locat.city = _address.province;
                  }
                  if (_neighborhood && _neighborhood.name.length > 0) {
                      v.visitingAddr = v.locat.city+_address.district+_neighborhood.name;
                  } else {
                      v.visitingAddr = v.locat.city+_address.district+_street.street + _street.number;
                  }

              },
              fail: function (info) {
                  v.visitingAddr = '重新定位';
                  console.log(info)
              }
          })

      },

      getStartDate() {
         var thisDay= new Date();
           var year = thisDay.getFullYear();
           var month = thisDay.getMonth() + 1;
           var day = thisDay.getDate();
           var hh = thisDay.getHours();
           var mm = thisDay.getMinutes();
           var timer = year + "-";
           timer += month + "-";
           timer += day + ' '
           if(hh < 10)
           timer += "0";
           timer += hh + ":";
            if (mm < 10)
            timer += '0';
            timer += mm
           return timer
      },
      timestampToTime(timestamp){
            var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
           var Y = date.getFullYear() + '-';
           var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
           var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
           var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
           var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes());
            return Y+M+D+h+m;
          },


      toSelectpeople(){
        var id = this.$store.state.companyId
        wx.navigateTo({
          url:`../selectpeople/main?id=${id}`
        })
      },
      toSelectTemplete(){//跳转选择模板页面
        wx.navigateTo({
          url:`../selectTemplete/main`
        })
      },
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
                  wx.chooseLocation({
                      latitude,
                      longitude,
                      success: function (res) {
                          v.visitingAddr = res.address
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
      async uploadpic (str, count) {
        let a = this.card_msg;
        if (str == 'self' && this.visitingLbsUrl.length >= 1) {
          wx.showToast({
            title: '最多选择一张！',
            duration: 1500,
            icon: 'none'
          });
          return
        }
        let path = await util.chooseImage('file', count);

        if (Object.prototype.toString.call(path) !== '[object Array]') return;
        this.uploadImgFun(path, 0, str)
      },
      // 递归上传
      async uploadImgFun (arr, index = 0, str) {
        await this.uploadImg(arr[index], str)
        if (index < arr.length - 1) {
          this.uploadImgFun(arr, index + 1, str)
        }
      },
      uploadImg (path, str) {
        let v = this;
        wx.showLoading({ mask: true });
        return WXAJAX.UploadImage(path).then((data) => {
          wx.hideLoading();
          data = JSON.parse(data);
          if (data.code == '200') {
            if (str == 'user') {
              v.$set(v.card_msg, 'picchecked', WXAJAX.imgBackUrl + data.data);
            } else if (str == 'self') {
              v.visitingLbsUrl.push(WXAJAX.imgBackUrl + data.data);
            }
          } else {
            wx.showToast({
              title: '网络异常',
              duration: 2000,
              icon: 'none'
            })
          }
        }).catch((err) => {
          wx.hideLoading();
          console.log('err -- ', err);
        })

      },
      delImg (index) {//删除图片
        wx.showLoading();
        this.visitingLbsUrl.splice(index, 1);
        wx.hideLoading();
      },
      page_tap(url) {
        wx.navigateTo({url: '../../' + url + '/main?type=1' })
        //type=1分辨地理位置不需要更新接口
      },
      toVisitingContent(e){
        this.visitingContent = e.detail.value
      },
      toVisitingResult(e){
        this.visitingResult = e.detail.value
      },
      toVisitingPlan(e){
        this.visitingPlan = e.detail.value
      },
     startEvent(data){
        console.log(data)
        this.visitingTime = data.fmt1
      },
      addcustomer(){ //添加拜访客户
        this.isLoading = true;
        let that=this
        let intervieweeCardId=0;
        if(this.staffid){
          intervieweeCardId=this.staffid[0];
        }else{
          intervieweeCardId=0;
        }
        let params={
              intervieweeCardId:intervieweeCardId,
              intervieweeName:this.name,
              intervieweePhone:this.phone,
              intervieweeCompany:this.intervieweeCompany,
              intervieweePosition:this.intervieweePosition,
            }
        console.log('params',params)
        WXAJAX.POST(
            params,
            "",
            "/visiting/add",'','',1
          ).then((data) => {
            that.visitingId=data.visitingId;
            that.getAddTaskCustomer();
          });

          this.isLoading = false;
          wx.hideLoading();
      },
      page_turn(method){
        if(method=='template'){
          this.isShowConfirm=true;
        }else{
          this.preservation();
        }
      },
	  //保存
      savetemplate(){
          
      },
      async getAddTaskCustomer(){

        wx.showLoading({
          mask:true
        })
        this.isLoading = true;
        let params={
              visitingId:this.visitingId,
              visitingType:1,
              visitingTime:this.visitingTime,
              visitingPurpose:this.visitingPurpose,
              visitingContent:this.visitingContent,
              visitingResult:this.visitingResult,
              visitingLbsUrl:this.visitingLbsUrl.toString(),
              visitingAddr:this.visitingAddr,
              visitingAddrInfo:this.visitingAddrInfo,
              visitingPlan:this.visitingPlan,
              intervieweeCompany:this.intervieweeCompany,
              visitingProduct:this.visitingProduct,
              intervieweePosition:this.intervieweePosition,
            }
            console.log(params);
        try {
          let data = await WXAJAX.POST(
            params,
            "",
            "/visitingInfo/add",'','',1
          );

          wx.showToast({
            title:'已成功！',
            duration:2000
          })
          this.isLoading = false;
          setTimeout(function(){
            wx.navigateBack({
              delta:1
            })
          },1000)
        } catch (error) {
          this.isLoading = false;
          wx.hideLoading();
          // console.log(".............", error);
        }
      }
    },
    destroyed(){
      this.$store.state.staffId = []
      this.$store.state.selectRecordsInfo = []

    }

  }
</script>

<style scoped>
  textarea{
    height: 160rpx;
  }
 .create-task{
   height: 100%;
   box-sizing: border-box;
   display: flex;
   flex-direction: column;
 }
 .content-wrap{
   padding:20upx 30upx 0 20upx;
   flex: 1;
   overflow: auto;
 }
 .task-content{
   background: #FFFFFF;
   border-radius: 20upx;
 }
 .title{
   font-size: 32upx;
   color: #383838;
   display: flex;
   align-items: center;
   padding:0upx 30upx 0 30upx;
   height: 88upx;
   font-weight:bold;
   border-bottom: 1upx solid #F8F8F8;
 }
 .title span{
   width: 20upx;
   height: 20upx;
   margin-right: 17upx;
   border-radius: 50%;
 }
 .content{
   padding:30upx 30upx 0 30upx;
   min-height: 140upx;
   font-size: 30rpx;
   /* height: 72upx; */
   line-height: 30rpx;
   overflow: hidden;
   border-bottom:1upx solid #F8F8F8;
 }
 .content-bottom{
   height: 88upx;
   display: flex;
   padding:0upx 30upx 0 30upx;
   justify-content: space-between;
   align-items: center;
   font-size: 28upx;
 }
 .content-bottom-right{
   display: flex;
 }
 .target{
   background: #FFFFFF;
   border-radius: 20upx;
   margin-top: 20upx;
 }
 .target ul{
   padding:0  30upx;
   display: flex;
   flex-direction: column;
 }
 .target ul li{
   height: 88upx;
   font-size: 28upx;
   display: flex;
   justify-content: space-between;
   align-items: center;
 }
 .target ul li input{
   height: 100%;
   width: 200upx;
   margin-right: 5upx;
 }
 .target-right{
   display: flex;
 }
 .time{
   background: #FFFFFF;
   border-radius: 20upx;
   margin-top: 20upx;
 }
 .choice-article{
   width: 240upx;
   overflow: hidden;
   text-overflow:ellipsis;
   white-space:nowrap;
   text-align:right
 }
 .confirm-btn{
   height: 98upx;
   line-height: 98upx;
   text-align: center;
   color: #FFFFFF;
   font-size: 36upx;
   background:linear-gradient(90deg,rgba(118,218,217,1),rgba(81,205,204,1));
 }
 .numinput{
   padding-right: 32upx;
   text-align: right;
 }
</style>

<style   scoped>
   /* 余额充值部分 */
  .toast-box {
      width: 100%;
      height: 100%;
      opacity: 1;
      position: fixed;
      top: 0px;
      left: 0px;
  }

  .toastbg {
      opacity: 0.2;
      background-color: black;
      position: absolute;
      width: 100%;
      min-height: 100vh;
  }

  .showToast {
      position: absolute;
      opacity: 1;
      width: 70%;
      margin-left: 15%;
      margin-top: 40%;
  }

  .toast-title {
      padding-left: 5%;
      background-color: #787878;
      color: white;
      padding-top: 2vh;
      padding-bottom: 2vh;
      border-top-right-radius: 16rpx;
      border-top-left-radius: 16rpx;
  }

  .toast-main {
      padding-top: 2vh;
      padding-bottom: 2vh;
      background-color: white;
      text-align: center;
  }

  .toast-input {
      margin-left: 5%;
      margin-right: 5%;
      border: 1px solid #ddd;
      padding-left: 2vh;
      padding-right: 2vh;
      padding-top: 1vh;
      padding-bottom: 1vh;
  }

  .toast-button {
      display: flex;
  }
  .button1 {
      width: 50%;
  }
  .button2 {
      width: 50%;
  }
  .button1 button {
      width: 100%;
      background-color: white;
      color: red;
      border-radius: 0rpx;
      border-bottom-left-radius: 16rpx;
  }
  .button2 button {
      width: 100%;
      background-color: white;
      color: black;
      border-radius: 0rpx;
      border-bottom-right-radius: 16rpx;
  }
</style>
