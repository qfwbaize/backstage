<template>
  <view class="content">
    <view class="fileBtn" @click="uploadFils">点击上传文件</view>
    <view class="fileTitle">文件名称：{{ fileTitle }} </view>
    <view class="fileTitle">文件描述：</view>
    <textarea value="" v-model="fileDescribe" placeholder="请输入文件描述" />
    <view class="button" @click="getFile">上传</view>
  </view>
</template>

<script>
  import WXAJAX from "@/utils/request";
  export default {
    data() {
      return {
        fileTitle:'',
        fileDescribe: '',
        imgBackUrl:'',
        customFolderId:''
      }
    },
    methods: {
      uploadFils() {
        let that = this
        wx.chooseMessageFile({
          count: 1,
          type: this.custom,
          success(res) {
            let filepath = res.tempFiles[0].path
            that.fileTitle = res.tempFiles[0].name
            that.uploadFileS(filepath)
          }
        })
      },
      // 上传到
      uploadFileS(path) {
        wx.showLoading({
          mask: true
        });
        return WXAJAX.UploadImage(path).then((data) => {
          wx.hideLoading();
          data = JSON.parse(data);
          if (data.code == '200') {
            this.imgBackUrl = data.data
            
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
      async getFile() {
      	let url = '/dynamic/addDynamicInfo';
      	let imgBackUrls = (WXAJAX.imgBackUrl + this.imgBackUrl)
      	let data = {
      		companyId: wx.getStorageSync("COMPANYID"),
      		type:4,
      		photos: imgBackUrls,
      		title: this.fileTitle,
      		isDrafts: 0,
      		isOrgShow: 1,
          details:this.fileDescribe
      		// customFolderId: this.customFolderId
      	}
      	await WXAJAX.POST(data, '', url, '', '', 1).then((res) => {
      		console.log(res, '发布自定义文件');
          wx.showToast({
            title: '上传成功',
          })
          // setTimeout(res=>{
          //   uni.navigateBack()
          // },3000)

      	})

      }

    }
  }
</script>

<style>
  .content {
    width: 750rpx;
    height: 100vh;
    background-color: #FFFFFF;
    overflow: hidden;
  }

  .fileBtn {
    width: 200rpx;
    height: 50rpx;
    margin-top: 40rpx;
    margin-left: 40rpx;
    padding: 0 20rpx;
    background-color: #efefef;
    text-align: center;
    line-height: 50rpx;
    border-radius: 5rpx;
    font-size: 28rpx;
  }

  .fileTitle {
    margin-top: 40rpx;
    margin-left: 40rpx;
    font-size: 28rpx;
  }

  textarea {
    width: 630rpx;
    margin-top: 40rpx;
    margin-left: 40rpx;
    background-color: #efefef;
    border-radius: 10rpx;
    padding: 20rpx;
  }
  .button{
    width: 200rpx;
    height: 50rpx;;
    line-height:50rpx;
    text-align: center;
    color: #FFFFFF;
    font-size: 28rpx;
    background-color: rgba(26, 208, 156, 100);
    margin-top: 40rpx;
    margin-left: 275rpx;
    border-radius: 10rpx;
  }
</style>
