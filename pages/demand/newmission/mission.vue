<template>
  <div class="create-task">
    <div class="content-wrap">

      <div class="time" style="padding-bottom: 40rpx;">
        <div class="title c38">
          <span class="bgblue" style="background-color: #FFFFFF;display: flex;">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riLine-asterisk@3x.png"
              mode=""></image>
          </span>
          开放范围
        </div>
        <div class="bgcPicker">
          <div class="">
             <picker @change="bindPickerChange" :value="index" :range="array">
                  <view class="uni-input" style="width:300rpx;">{{array[index]}}</view>
             </picker>
          </div>
          <div class="triangle"></div>
        </div>
      </div>

      <div class="target" v-show="index == 0" style="margin-bottom:20rpx;">
        <div class="title c38">
          <span class="bggreen"></span>
          指定到本机构内部成员
        </div>
        <ul>
          <li>
            <div class="c78">指定机构内部成员，无需接受任务</div>
          </li>
          <li>
            <div class="target-left c78"></div>
            <div class="target-right">
              <div class="c39" v-if="staffid == null || ''" @click="toSelectstaff()">选择成员</div>
              <div class="c39" v-else @click="toSelectstaff()">
                已选择<span class="cblue">{{staffid.length }}</span>人
              </div>
              <image class="w16 h16 mt2 ml7" :src="downImg"></image>
            </div>
          </li>
        </ul>
      </div>

      <div class="target" v-show="index == 1" style="margin-bottom:20rpx;">
        <div class="title c38">
          <span class="bggreen"></span>
          指定到其他机构
        </div>
        <ul>
          <li>
            <div class="c78">建立客户关系的机构即可承接任务</div>
          </li>
          <li>
            <div class="target-left c78">

            </div>
            <div class="target-right">
              <div class="c39" v-if="staffid == null || ''" @click="toSelectstaffs()">选择机构</div>
              <div class="c39" v-else @click="toSelectstaffs()">
                已选择<span class="cblue">{{staffid.length }}</span>人
              </div>
              <image class="w16 h16 mt2 ml7" :src="downImg"></image>
            </div>
          </li>
        </ul>
      </div>

      <div class="target" v-show="index == 2" style="margin-bottom:20rpx;">
        <div class="title c38">
          <span class="bggreen"></span>
          机构内部开放任务
        </div>
        <ul>
          <li>
            <div class="c78">机构内部任何人都可以承接的任务</div>
          </li>
        </ul>
      </div>

      <div class="target" v-show="index == 3" style="margin-bottom:20rpx;">
        <div class="title c38">
          <span class="bggreen"></span>
          发布到任务大厅
        </div>
        <ul>
          <li>
            <div class="c78">任何人都可以承接您发布的任务</div>
          </li>
        </ul>
        <div class="target" style="margin-bottom:20rpx;">
          <div class="title c38">相关合同</div>
          <div class="disflex wrap w290 pl20 pb20">
            <div class="bgfff w80 h80 mr7 mb7 posre" v-for="(v,k) in self_photos" :key="k">
              <img mode="aspectFill" :src="v" alt="" class="w100p h100p">
              <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/del.png" alt=""
                class="w20 h20 posab right2 top2" @click="delImg(k)">
            </div>
            <div v-if="self_photos.length < 9" class="bgfff bdash_a8 w80 h80 add_img bradius5 mr7"
              @click="uploadpic('self', 9)"></div>
          </div>
        </div>
        <div class="title c38">
          <span class="bggreen"></span>
          签约方式（单选）
        </div>
        <view class="contractMethod">
          <view class="contractMethodList">
            <view class="" >在线签约（乙方在线确认合同）</view>
            <view :class="contractIndex == 0?'activeselectcontract':'selectcontract'" @click="tab_type_tap(0)"></view>
          </view>
          <view class="contractMethodList">
            <view class="">线下签约（需拍照上传已签约合同）</view>
            <view :class="contractIndex == 1?'activeselectcontract':'selectcontract'"@click="tab_type_tap(1)"></view>
          </view>
        </view>
      </div>


      <div class="task-content">
        <div class="title c38">
          <span class="bgblue" style="background-color: #FFFFFF;display: flex;">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riLine-asterisk@3x.png"
              mode=""></image>
          </span>
          任务标题
        </div>
        <div class="content ">
          <textarea v-model="taskName" maxlength="20" placeholder="请输入任务名称" style="height:100%;width: 100%;" />
        </div>
      </div>



      <div class="task-content" style="margin-top: 20rpx;">
        <div class="title c38">
          <span class="bgblue" style="background-color: #FFFFFF;display: flex;">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riLine-asterisk@3x.png"
              mode=""></image>
          </span>
          任务内容
        </div>
        <div class="content ">
          <textarea v-model="taskContent" placeholder="请输入任务内容" style="height:100%;width: 100%;" />
        </div>
      </div>

      <div class="target">
        <div class="title c38">
          <span class="bgblue" style="background-color: #FFFFFF;display: flex;">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riLine-asterisk@3x.png"
              mode=""></image>
          </span>
          相关资料
        </div>
        <div class="content" style="height: 250rpx;">
          <div class="choice-article c39" v-if="title != '' " @click="toArticle()">{{title}}</div>
          <div class="bgfff bdash_a8 w80 h80 add_img mr7 mb7" v-if="title == '' " @click="toArticle()"></div>
        </div>
      </div>


      <div class="time">
        <div class="title c38">
          <span class="bgblue" style="background-color: #FFFFFF;display: flex;">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riLine-asterisk@3x.png"
              mode=""></image>
          </span>
          任务奖励
        </div>
        <div class="bgcPicker">
          <div class="">
             <picker @change="PickerChange" :value="arrIndex" :range="arr">
                  <view class="uni-input" style="width:300rpx;">{{arr[arrIndex]}}</view>
             </picker>
          </div>
          <div class="triangle"></div>
        </div>
        <div class="content-bottom" v-if="arrIndex == 0">
          <div class="content-bottom-right c38">
            <input class="numinput" type="number" maxlength="4" v-model="rewardAmount" @blur="toRewardAmount"
              placeholder="0" /> <span class="w16 h16 mt2 ml7">元</span>
          </div>
        </div>

        <div class="content-bottom" v-if="arrIndex == 1">
          <div class="content-bottom-right c38">
            <input class="numinput" type="number" maxlength="4" v-model="rewardAmount" @blur="toRewardAmount"
              placeholder="0" /> <span class="h16 mt2 ml7">元 / 次</span>
          </div>
        </div>

        <div class="content-bottom" v-if="arrIndex == 1">
          <div class="content-bottom-right c38" style="margin-right: 30rpx;">
            <input class="numinput" style="text-align:center;" type="number" v-model="num" @blur="toRewardAmount"
              placeholder="每人最多完成次数" /> <span class="h16 mt2 ml7">次</span>
          </div>
        </div>

      </div>

      <div class="time">
        <div class="title c38">
          <span class="bgblue" style="background-color: #FFFFFF;display: flex;">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riLine-asterisk@3x.png"
              mode=""></image>
          </span>
          任务时间
        </div>

        <div class="content-bottom">
          <div class="content-bottom-left c78">
            开始时间
          </div>
          <div class="content-bottom-right c38">
            <datatimea v-model="startTime" placeholder="请选择开始时间" @change="startEvent">
            </datatimea>
            <image class="w16 h16 mt2 ml7" :src="downImg"></image>
          </div>
        </div>

        <div class="content-bottom">
          <div class="content-bottom-left c78">
            结束时间
          </div>
          <div class="content-bottom-right c38">
            <datatimea v-model="endTime" placeholder="请选择结束时间" @change="endEvent">
            </datatimea>
            <image class="w16 h16 mt2 ml7" :src="downImg"></image>
          </div>
        </div>

      </div>

      <div class="time" >
        <div class="title c38">
          <span class="bgblue" style="background-color: #FFFFFF;display: flex;">
            <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riLine-asterisk@3x.png"
              mode=""></image>
          </span>
          选择定位
          <view class="posAddress">{{address}}</view>
          <view style="font-weight: normal;color:#51cdcb;" @click="resetAddr">重新定位</view>
        </div>
      </div>

      <div class="time" style="padding-bottom: 50rpx;">
        <div class="title c38">
          <span class="bgblue"></span>
          完成标准
        </div>
        <textarea style="margin-left: 30rpx; padding: 20rpx;" value="" v-model="finishStandard" placeholder="请输入完成标准" />
      </div>

    </div>


    <div class="confirm-btn" @click="preservation">确认发布</div>

  </div>
</template>

<script>
  import http from "../../../utils/http"
  import WXAJAX from '../../../utils/request.js';
  import util from "@/utils/index";
  import datatimea from '../../../components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
  import amapFile from "@/libs/amap-wx.js";
  import {
    mapStates,
    mapMutations
  } from 'vuex'
  export default {
    components: {
      datatimea
    },
    data() {
      return {
        array:['机构内部成员','指定到机构','机构开放任务','平台任务'],
        index:0,
        arr:['完成任务奖励金额','每次上传进度奖励金额'],
        arrIndex:0,
        contractIndex:3,
        downImg: WXAJAX.imgBackUrl + '/product-index/icon_right-s.png',
        companyId: '',
        staffid: '',
        selectInfo: '',
        startTime: '',
        endTime: '',
        taskName: '',
        userId: wx.getStorageSync('userId'),
        title: '',
        dynamicId: '',
        taskContent: '',
        rewardAmount: '',
        self_photos: [],
        finishStandard: '',
        address: '',
        num:'',
        pattern:''
      }
    },
    watch: {
      selectInfo(newVal, old) {
        if (newVal !== '') {
          this.dynamicId = this.selectInfo[0].dynamicId
          this.title = this.selectInfo[0].title
        }
      }
    },
    onLoad(option){
      this.pattern = option.pattern
    },
    onUnload() {
      this.destroyed()
    },
    onShow() {
      this.companyId = wx.getStorageSync('COMPANYID')
      this.staffid = this.$store.state.staffId
      this.selectInfo = this.$store.state.selectRecordsInfo
    },
    methods: {
      tab_type_tap(index){
        this.contractIndex = index
      },
      PickerChange(e){
        this.arrIndex = e.target.value
      },
      //下拉框
      bindPickerChange(e) {
        this.index = e.target.value
      },
      //删除图片
      delImg(index) {
        wx.showLoading();
        this.self_photos.splice(index, 1);
        wx.hideLoading();
      },
      //上传图片
      async uploadpic(str, count) {
        this.showPageStatus = "0";
        let path = await util.chooseImage("file", count);
        if (!(path instanceof Array)) return;
        this.uploadImgFun(path, 0, str);
      },
      async uploadImgFun(arr, index = 0, str) {

        await this.uploadImg(arr[index], str);
        if (index < arr.length - 1) {
          this.uploadImgFun(arr, index + 1, str);
        }
      },
      uploadImg(path, str) {
        if (str == "self" && this.self_photos.length >= 9) {
          wx.showToast({
            title: "最多选择9张！",
            duration: 1500,
            icon: "none"
          });
          return;
        }
        wx.showLoading({
          mask: true
        });
        return WXAJAX.UploadImage(path)
          .then(data => {

            wx.hideLoading();
            data = JSON.parse(data);
            if (data.code == "200") {
              if (str == "self") {
                this.self_photos.push(`${WXAJAX.imgBackUrl}${data.data}`);
                this.$emit('img_tap', this.self_photos, this.number)
              }
            } else {
              wx.showToast({
                title: "网络异常",
                duration: 2000,
                icon: "none"
              });
            }
          })
          .catch(err => {
            wx.hideLoading();
          });
      },
      //去选取文章页面
      toArticle() {
        wx.navigateTo({
          url: `../../companyPack/selectArticle/main?type=1`
        })
      },
      //去选取接收人页面
      toSelectstaff() {
        var id = uni.getStorageSync('COMPANYID')
        wx.navigateTo({
          url: `../../companyPack/selectstaff/main?id=${id}&taskType=1`
        })
      },
      //去选取接收机构页面
      toSelectstaffs() {
        var id = uni.getStorageSync('COMPANYID')
        wx.navigateTo({
          url: `../../companyPack/selectstaff/main?id=${id}&taskType=0`
        })
      },
      //检测数字格式
      toRewardAmount(e) {
        var reg = /^\+?[1-9]\d{0,3}(\.\d*)?$/
        if (!reg.test(e.detail.value)) {
          wx.showToast({
            title: '请输入正确的数字',
            icon: 'none',
            duration: 2000
          })
          return false
        }
        this.rewardAmount = e.detail.value
      },
      //开始时间
      startEvent(data) {
        console.log(data)
        this.startTime = data.fmt1 + ' 00:00:00'
      },
      //结束时间
      endEvent(data) {
        console.log(data)
        this.endeTime = data.fmt1 + ' 23:59:59'
      },
      //发布任务前判断信息是否填写完整
      preservation() {
        var reward = this.arrIndex == 0 ? '1' :'2'
        var type = ''
        var status = ''
        if(this.index == 0){
          type = 2
          status = 1
          var card_id = this.staffid
        }else if(this.index == 1){
          type = 1
          status = 0
          var company_task_id = this.staffid
        }else if(this.index == 2){
          type = 3
          status = 1
        }else if(this.index == 3){
          type = 4
          status = 0
          var contract = this.self_photos
        }
        var contract_id = 0
        if(this.contractIndex == 0){
          contract_id = 1
        }else if(this.contractIndex == 1){
          contract_id = 2
        }
        var data = {
          pid:0,
          type:type,
          pattern:this.pattern,
          title:this.taskName,
          company_task_id:company_task_id,
          content:this.taskContent,
          num:this.num || 0,
          pro_id:this.dynamicId,
          contract:contract || 0 ,
          money:this.rewardAmount,
          start_time:this.startTime,
          end_time:this.endeTime,
          card_id:card_id,
          reward:reward,
          explain:this.finishStandard,
          contract_id:contract_id,
          status:status
        }
        http({url:'/apis/companytask/add',data:data}).then(res=>{
          if(res.data.code == 200){
            uni.navigateBack({
              delta:1
            })
          }else{
            uni.showToast({
              title:res.msg,
              icon:'none'
            })
          }
        })
      },
      //清空vuex定义的数据
      destroyed() {
        this.$store.state.staffId = []
        this.$store.state.selectRecordsInfo = []
      },
      //调取地图组件
      resetAddr() {
        this.Mc = wx.createMapContext("map");
        this.myAmapFun = new amapFile.AMapWX({
          key: "e11026819b6d300fda6a2c680fbd2fef"
        });
        this.getlocation()
      },
      //获取位置
      getlocation() {
        wx.showLoading({
          title: "定位中...",
          mask: true
        });
        var v = this;
        wx.getLocation({
          type: "wgs84",
          success: function(res) {
            let latitude = res.latitude;
            let longitude = res.longitude;
            wx.chooseLocation({
              latitude,
              longitude,
              success: function(res) {
                console.log(res.address)
                v.address = res.address
              }
            })
            wx.hideLoading();
          },
          fail: function(err) {

            wx.hideLoading({
              success() {
                wx.showToast({
                  title: "定位失败",
                  icon: "none",
                  duration: 2000
                });
              }
            });
          },
          complete: function() {
            wx.hideLoading();
          }
        });
      },

    }
  }
</script>

<style scoped>
  .create-task {
    height: 100%;
  }

  .content-wrap {
    padding: 20upx 30upx 0 20upx;
    flex: 1;
    overflow: auto;
  }

  .task-content {
    background: #FFFFFF;
    border-radius: 20upx;
  }

  .title {
    font-size: 32upx;
    color: #383838;
    display: flex;
    align-items: center;
    padding: 0upx 30upx 0 30upx;
    height: 88upx;
    font-weight: bold;
    border-bottom: 1upx solid #F8F8F8;
  }

  .title span {
    width: 20upx;
    height: 20upx;
    margin-right: 17upx;
    border-radius: 50%;
  }

  .content {
    padding: 30upx 30upx 0 30upx;
    height: 140upx;
    line-height: 44upx;
    border-bottom: 1upx solid #F8F8F8;
  }

  .content-bottom {
    height: 88upx;
    display: flex;
    padding: 0upx 30upx 0 30upx;
    justify-content: space-between;
    align-items: center;
    font-size: 28upx;
  }

  .content-bottom-right {
    display: flex;
  }

  .target {
    background: #FFFFFF;
    border-radius: 20upx;
    margin-top: 20upx;
  }

  .target ul {
    padding: 0 30upx;
    display: flex;
    flex-direction: column;
  }

  .target ul li {
    height: 88upx;
    font-size: 28upx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .target ul li input {
    height: 100%;
    width: 150upx;
    margin-right: 5upx;
  }

  .target-right {
    display: flex;
  }

  .time {
    background: #FFFFFF;
    border-radius: 20upx;
    margin-top: 20upx;
  }


  .confirm-btn {
    width: 100%;
    height: 98upx;
    line-height: 98upx;
    text-align: center;
    color: #FFFFFF;
    font-size: 36upx;
    background-color: rgba(26, 208, 156, 100);
    margin-top: 20rpx;

  }

  .numinput {
    padding-right: 32upx;
    text-align: right;
    background-color: rgba(0, 0, 0, 0.03);
    margin-left:30rpx;
  }

  .money {
    display: flex;
    justify-content: space-between;
  }

  .time textarea {
    width: 600rpx;
    background-color: #FFFFFF;
    border-radius: 12rpx;
  }

  .bgblue image {
    width: 100%;
    height: 100%;
  }

  .posAddress {
    width: 280rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 20rpx;
    margin-right: 40rpx;
  }
  .bgcPicker{
    width: 360rpx;
    height: 60rpx;
    line-height: 60rpx;
    background-color: rgba(0, 0, 0, 0.03);
    color: rgba(25, 27, 30, 100);
    font-size: 28rpx;
    font-family: Microsoft Yahei;
    margin-left: 62rpx;
    padding: 0 20rpx;
    display: flex;
    justify-content: space-between;
  }
  .triangle{
    width: 0;
    height: 0;
    border-left: 8rpx solid transparent;
    border-right: 8rpx solid transparent;
    border-top: 16rpx solid #191b1e;
    margin-top: 26rpx;
  }
  .contractMethod{
    margin-left:62rpx;
  },
  .contractMethodList{
   display: flex;
   justify-content: space-between;
   padding-bottom: 30rpx;
  }
  .selectcontract{
    width: 40rpx;
    height: 40rpx;
    margin-right: 40rpx;
    border-radius: 50%;
    border: 1px solid #c7c7cd;
  }
  .activeselectcontract{
    width: 40rpx;
    height: 40rpx;
    margin-right: 40rpx;
    border-radius: 50%;
    background: #157afb;
  }

</style>
