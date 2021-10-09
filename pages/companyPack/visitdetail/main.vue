<template>
  <div class="create-task">
    <div class="content-wrap">
      <div class="target">
        <div class="title c38">
          <span class="bggreen"></span>
          拜访对象
        </div>
        <ul>
          <li>
            <div class="target-left c78">
              姓名
            </div>
            <div class="target-right">
              <input class="c39" disabled type="text" :placeholder="name || '请输入客户名称'">
              <!-- <image class="w16 h16 mt2 ml7" :src="downImg" @click="toSelectpeople()"></image> -->
            </div>
          </li>
          <li>
            <div class="target-left c78">
              联系方式
            </div>
            <div class="target-right">
              <input class="c39" disabled type="number" :placeholder="phone || '请输入客户电话'">
            </div>
          </li>

          <li>
            <div class="target-left c78">
              所属公司
            </div>
            <div class="target-right">
              <input class="c39" disabled type="text" :placeholder="intervieweeCompany || '无'">
            </div>
          </li>
          <li>
            <div class="target-left c78">
              公司职位
            </div>
            <div class="target-right">
              <input class="c39" disabled type="text" :placeholder="intervieweePosition || '无'">
            </div>
          </li>
          <li>
            <div class="target-left c78">
              产品名称
            </div>
            <div class="target-right">
              <input class="c39" disabled type="text" :placeholder="visitingProduct || '无'">
            </div>
          </li>
        </ul>
      </div>
      <div class="target">
        <div class="title c38">
          <span class="bgblue"></span>
          拜访地点
        </div>
        <ul>
          <li>
            <div class="target-left c78">
              地理位置
            </div>
            <div class="target-right" style="margin-top: -17rpx;">
              <input type="text" value="visitingAddr" class="pt15 w100p phe8 flex1 over_1" readonly disabled placeholder="请选择位置"
                     v-model="visitingAddr" style="width: 400rpx;margin-top: -5rpx;text-align: right;margin-right: 5rpx;">
            </div>
          </li>
        </ul>
      </div>
      <div class="time">
        <div class="title c38">
          <span class="bgyellow"></span>
          拜访日期
        </div>
        <div class="content-bottom">
          <div class="content-bottom-left c78">
            时间
          </div>
          <div class="content-bottom-right c38">
            <input type="text" value="visitingTimeStr" class="pt15 w100p phe8 flex1 over_1" readonly disabled placeholder="请选择日期"
                   v-model="visitingTimeStr" style="width: 400rpx;margin-top: -5rpx;text-align: right;margin-right: 5rpx;">
            <!-- <datatimea :placeholder="visitingTimeStr || '请选择日期'"></datatimea> -->
            <!-- <image class="w16 h16 mt2 ml7" :src="downImg"></image> -->
          </div>
        </div>
      </div>
      <div class="task-content" style="margin-top: 20rpx;">
        <div class="title c38">
          <span class="bgeee"></span>
          拜访目的
        </div>
        <div class="content ">
           <textarea disabled :placeholder="visitingPurpose || '请输入拜访目的'" @blur="toVisitingPurpose" style="width: 100%;"/>
        </div>
      </div>
      <div class="task-content" style="margin-top: 20rpx;">
        <div class="title c38">
          <span class="bg55"></span>
          拜访结果
        </div>
        <div class="content">
           <textarea disabled :placeholder="visitingResult || '请输入拜访结果'" @blur="toVisitingResult" style="width: 100%;"/>
        </div>
      </div>
      <div class="task-content" style="margin-top: 20rpx;">
        <div class="title c38">
          <span class="bg38"></span>
          拜访内容
        </div>
        <div class="content">
           <textarea disabled :placeholder="visitingContent || '请输入拜访内容'" @blur="toVisitingContent" style="width: 100%;"/>
        </div>
      </div>

      <div class="task-content" style="margin-top: 20rpx;">
        <div class="title c38">
          <span class="bga8"></span>
          跟进计划
        </div>
        <div class="content ">
           <textarea disabled :placeholder="visitingPlan || '请输入跟进计划'" @blur="toVisitingPlan" style="width: 100%;"/>
        </div>
      </div>
      <div class="target">
        <div class="title c38">
          <span class="bgblue"></span>
          上传图片
        </div>
        <div class="content ">
          <div class="disflex wrap">
            <div class="bgfff bdash_a8 w100 h100 mr7 mb7 posre"
                 v-for="(v,k) in visitingLbsUrl"
                 :key="k">
              <img :src="v"
                   alt=""
                   class="w100p h100p"
                   mode="aspectFill">
              <!-- <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/del.png"
                   alt=""
                   class="w20 h20 posab right2 top2"
                   @click="delImg(k)"> -->
            </div>
            <!-- <div
                 class="bgfff bdash_a8 w100 h100 add_img mr7 mb7"
                 @click="uploadpic('self', 9)">
            </div> -->
        </div>
      </div>
    </div>
    </div>
    <!-- <div class="textc disflex w60 h60 bradius50p bgblue disinblock goToUserCenter" @click="exportlist">
      <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/user_add.png" alt="" class="w30 h30 mt15">
    </div> -->

      <!-- <div class="confirm-btn" @click="preservation">
        保存
      </div> -->
  </div>
</template>

<script>
  import WXAJAX from '../../../utils/request.js';
  import datatimea from '../../../components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
  import {mapStates,mapMutations} from 'vuex'
  import util from '../../../utils/index'
  import amapFile from '@/libs/amap-wx.js'
  export default {
    data(){
      return{
        downImg:WXAJAX.imgBackUrl + '/product-index/icon_right-s.png',
        //type 用来分辩到底是创建还是修改任务
        type:'',

        visitingId:0,
        visitingType:1,
        visitingTime:'',
        visitingTimeStr:'',
        visitingPurpose:'',
        visitingContent:'',
        visitingResult:'',
        visitingLbsUrl:'',
        visitingAddr:'',
        visitingAddrInfo:'',
        visitingPlan:'',
        name:'',
        phone:'',
        customerInfo:'',

        intervieweeCompany:'',
        intervieweePosition:'',
        visitingProduct:'',

        visitingInfoId:0,

        staffid:'',
        selectInfo:'',
        begin:'2020-5-21 14:39',
        userId:wx.getStorageSync('userId'),
        address:'',
        visitingLbsUrl: [],//个人图片
        customerInfo:[],
      }
    },
    watch:{
    },
    onLoad(option) {
      this.visitingInfoId=option.visitingInfoId;
      this.getdetail();
    },
    mounted(){
    },
    methods:{
      getdetail(){
        let url='/visitingInfo/query';
        let params={
          visitingInfoId:this.visitingInfoId
        };
        console.log('params',params)
        WXAJAX.POST(params, '', url,'','',1).then(data => {
          console.log(data);
          if(data){
            this.visitingId=data.visitingId
            this.visitingType=1
            this.visitingTime=data.visitingTime
            this.visitingPurpose=data.visitingPurpose
            this.visitingContent=data.visitingContent
            this.visitingResult=data.visitingResult
            if(data.visitingLbsUrl!=undefined){
              this.visitingLbsUrl=data.visitingLbsUrl.split(',')
            }
            this.visitingAddr=data.visitingAddr
            this.visitingAddrInfo=data.visitingAddrInfo
            this.visitingPlan=data.visitingPlan
            this.name=data.intervieweeName
            this.phone=data.intervieweePhone
            this.visitingTimeStr=data.visitingTimeStr

            this.intervieweeCompany=data.intervieweeCompany
            this.intervieweePosition=data.intervieweePosition
            this.visitingProduct=data.visitingProduct
          }

        });
      },
      exportlist(){
        console.log({
          srcPath:'http://test1.mingyicloud.com/card/record.html?visitingInfoId='+this.visitingInfoId+'&token='+wx.getStorageSync('token'),
          destPath:'1.pdf',
        })
        WXAJAX.POST({
          srcPath:'http://test1.mingyicloud.com/card/record.html?visitingInfoId='+this.visitingInfoId+'&token='+wx.getStorageSync('token'),
          destPath:'1.pdf',
        }, '', '/htmlToPdf/htmlToPdf','','',1).then(data => {
          wx.downloadFile({
            url: data, //仅为示例，并非真实的资源
            success (res) {
              console.log(res);
              const filePath = res.filePath || res.tempFilePath
              wx.showToast({
              title: '导出成功',
              icon: 'success',
              duration: 1000
              })
              wx.openDocument({
                filePath,
                fileType: 'pdf',
                success: function (res) {
                  console.log('打开文档成功')
                }
              })
            }
          })
        });
      },
    },
    components:{
      datatimea
    }

  }
</script>

<style scoped>
  .goToUserCenter{
    position: fixed;
    right: 20upx;
    bottom: 102upx;
    z-index: 99;
    box-sizing: border-box;
    text-align: center;
  }
  .share-records{
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 92rpx;
  }
  .share-records-top{
    width: 100%;
    height: 88upx;
    display: flex;
    position: fixed;
    top: 0;
    justify-content:space-around;
    font-size: 32upx;
    color: #787878;
    background: #FFFFFF;
    align-items: center;
  }
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
