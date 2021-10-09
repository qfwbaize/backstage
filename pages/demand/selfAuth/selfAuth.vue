<template>
  <view class="content">
    <view class="" v-if="Authentication == 200">
      <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/renzhengwancheng.png" mode=""></image>
    </view>

    <view v-else>
      <view class="title">真实姓名</view>
      <view class="inp"><input type="text" v-model="idName" /></view>

      <view class="title">身份证号码</view>
      <view class="inp"><input type="text" v-model="idCard" @blur="toRewardAmount" /></view>

      <view class="title">上传身份证照片</view>
      <view class="mainImg" @click="uploadpic('self')">
        <image v-if="self_photos == 0"
          src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/shengfenzheng.png" mode=""></image>
        <image :src=self_photos mode=""></image>
      </view>
      <view class="text">身份证正面</view>
      <view class="mainImg" @click="uploadpic('selfs')">
        <image v-if="selfs_photos == 0"
          src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/shenfenzhengbeimian.png" mode=""></image>
        <image v-else :src=selfs_photos mode=""></image>
      </view>
      <view class="text" style="margin-bottom: 100rpx;">身份证背面</view>

      <view class="btn" @click="submit">提交审核</view>
    </view>

  </view>
</template>

<script>
  import http from "../../../utils/http"
  import WXAJAX from '../../../utils/request.js';
  import util from "@/utils/index";
  export default {
    data() {
      return {
        self_photos: [],
        selfs_photos: [],
        idCard: '',
        idName: '',
        Authentication:''
      }
    },
    onShow() {
      this.Authentication = uni.getStorageSync('Authentication')
    },
    methods: {
      //提交审核
      submit() {
        var data = {
          cert_positive:this.self_photos,
          cert_side:this.selfs_photos,
          cate_num:this.idCard,
          name:this.idName,
          agree:1
        }
        http({url:'/apis/authentication/add',data:data}).then(res=>{
          if(res.data.code = 200){
            uni.showToast({
              title:'提交成功！',
              icon:'none',
              duration:2000,
              success() {
                uni.navigateBack({
                  delta:1
                })
              }
            })
          }
        })

      },
      //检测身份证号
      toRewardAmount(e) {
        var reg =
          /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
        if (!reg.test(e.detail.value)) {
          wx.showToast({
            title: '请输入正确的身份证号',
            icon: 'none',
            duration: 2000
          })
          return false
        }
        this.idCard = e.detail.value
      },
      //上传图片
      async uploadpic(str, count) {
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
        wx.showLoading({
          mask: true
        });
        return WXAJAX.UploadImage(path)
          .then(data => {

            wx.hideLoading();
            data = JSON.parse(data);
            if (data.code == "200") {
              if (str == "self") {
                this.self_photos = WXAJAX.imgBackUrl + data.data;
              } else {
                this.selfs_photos = WXAJAX.imgBackUrl + data.data;
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

    }
  }
</script>

<style>
  .content {
    width: 670rpx;
    min-height: 100vh;
    padding: 40rpx;
    background-color: #ffffff;
  }

  .title {
    width: 112rrpx;
    height: 38rrpx;
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: PingFangSC-regular;
    margin-top: 30rpx;
  }

  .inp {
    width: 670rpx;
    height: 80rpx;
    border-radius: 12rpx;
    background-color: rgba(244, 244, 244, 100);
  }

  .inp input {
    width: 630rpx;
    height: 80rpx;
    padding-left: 40rpx;
    margin-top: 20rpx;
  }

  .mainImg {
    width: 670rpx;
    height: 380rpx;
    margin-top: 30rpx;
  }

  .mainImg image {
    width: 100%;
    height: 100%;
  }

  .text {
    width: 670rpx;
    text-align: center;
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    font-family: PingFangSC-regular;
    margin-top: 30rpx;
  }

  .btn {
    width: 750rpx;
    height: 76rpx;
    line-height: 76rpx;
    background-color: rgba(0, 187, 174, 100);
    color: rgba(255, 255, 255, 100);
    font-size: 28rpx;
    text-align: center;
    font-family: Arial;
    position: fixed;
    bottom: 0;
    margin-left: -40rpx;
  }
</style>
