<template>
  <view>
    <!-- 上传按钮部分 -->
    <view @tap="ChooseImage" style="width:500rpx;line-height:80rpx;text-align:center;margin:0 auto;box-sizing:border-box; border:4rpx dashed #51cdcb;position:fixed;bottom:160rpx;left:-250rpx;margin-left:50%;">上传图片</view>
    <view @tap="ChooseMessageFile" style="width:500rpx;line-height:80rpx;text-align:center;margin:0 auto;box-sizing:border-box; border:4rpx dashed #51cdcb;position:fixed;bottom:80rpx;left:-250rpx;margin-left:50%;">上传文件</view>
    <view class="showimg_box" style="padding:0 70rpx;">
      <!-- 图片列表部分 -->
      <!-- <view class="show_img"><image :src="pingjiaSrc" @tap="ChooseImage"></image></view> -->
       <view v-for="(item, index) in imgList" :key="index" class=" imgarr">
          <view class="icon-cuo" @tap="delect(index)">&#xe61a;</view>
          <image class="images" :src="item.attachmentUrl"  @click="lookImg(index)"></image>
        </view>
    </view>
    <!-- 文件列表部分 -->
     <view class="showfile_box" style="padding:0 70rpx;">
        <view v-for="(item, index) in fileList" :key="index">
          <!-- <view   style="border:1rpx solid red;height:100rpx;"> -->
              <view stle="height:100%;width:100rpx;border:1rpx solid red;box-sizing:border-box;background:#ccc;">
                <image  v-if="item.type == '.pdf'" src="/static/images/file_icon/PDF.svg" style="width:100rpx;height:100rpx;vertical-align:middle;" mode="aspectFill" @click="lookImg(index)"></image>
                <image  v-if="item.type == '.doc'||item.type == '.docx'" src="/static/images/file_icon/DOCX.svg" style="width:100rpx;height:100rpx;vertical-align:middle;" mode="aspectFill" @click="lookImg(index)"></image>

                <image  v-if="mp3type.indexOf(item.type)>=0" src="/static/images/file_icon/MP3.svg" style="width:100rpx;height:100rpx;vertical-align:middle;" mode="aspectFill" @click="lookImg(index)"></image>
              </view>
              <view style="padding-left:10rpx;flex:1;display:flex;justify-content: space-between;">
                <view>{{item.attachmentTitle}}</view>
              </view>
          <!-- </view> -->
        </view>



     </view>


  </view>

</template>

<script>
  // import WXAJAX from '/utils/request.js'
  import WXAJAX from '../../../utils/request.js'
export default{
        data(){
          return{
            mp3type:['.mp3','.ogg','.wma','.WAV'],
            imgMaxNum:undefined,//本页面最多上传多少张图片
            fileMaxNum:undefined,//本页面最多上传多少文件
            uploadUrl:'',
            imgList:[],
            fileList:[{attachmentUrl:'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/photo/20210418/b01069b4274ea186dcfb2b27d51d58fa.png',attachmentTitle:'a',type:'file'}],
            imgArr:[],
            pingjiaSrc:this.adminIp + "content/image/pingjia.png",
            tempFilePaths:''//当前循环到的文件中转
          }
        },
        watch:{
          imgArr(){
            console.error('this.imgArr',this.imgArr)
            uni.setStorageSync('fileList',this.imgArr)
          },
          // fileList(){
          //   console.log('watchfileList')
          //   uni.setStorageSync('fileList',[...this.imgList,...this.fileList])
          //   console.error('fileList',this.fileList)
          // },
        },
        onLoad(){
          this.uploadUrl  = WXAJAX.uploadUrl
          console.log('uploadUrl',this.uploadUrl)
        },
        methods:{
          ChooseMessageFile(){
            let that = this

            wx.chooseMessageFile({
              count: 10,
              // type: 'image',
              success (res) {
                console.log(111)
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFiles
                console.log('打开文件',res.tempFiles)

                console.log('本页面最多上传多少文件',that.fileMaxNum)
                if (that.fileList.length+tempFilePaths.length > that.fileMaxNum) {
                    uni.showToast({
                         title: '超过上传文件的最大数量',
                         icon: 'none'
                    })
                } else {

                for (var i = 0; i < tempFilePaths.length; i++) {
                  that.tempFilePaths = tempFilePaths[i]
                  if (that.fileList.length != 0) {
                     console.log('信息',res)
                     let typefn = ()=>{//根据小数点获取文件类型
                       if(tempFilePaths[i].path.lastIndexOf('.')>=0){
                        return  tempFilePaths[i].path.substring(tempFilePaths[i].path.lastIndexOf('.'),tempFilePaths[i].path.length)
                      }else{
                        return 'unknown'
                      }}
                      let namefn = ()=>{//根据小数点获取文件名字
                       if(tempFilePaths[i].path.lastIndexOf('.')>=0){
                         console.log(1)
                        return  tempFilePaths[i].name.substring(0,tempFilePaths[i].name.lastIndexOf('.'))
                      }else{
                        console.log(2)
                        return tempFilePaths[i].name
                      }}

                     that.fileList =  that.fileList.concat({attachmentUrl:tempFilePaths[i].path,type:typefn(),name:namefn()});
                   } else {
                     that.fileList = {attachmentUrl:tempFilePaths[i].path,type:typefn(),name:namefn()};
                   }
                   console.log('asd ',that.fileList)
                    // let timestamp = new Date().getTime();
                    // let enMsg = hex_md5('@' + hex_md5('@' + timestamp + '~') + '~');
                    uni.uploadFile({
                       url: that.uploadUrl,//上传的服务器地址
                       filePath: tempFilePaths[i].path,
                       method: 'POST',
                       name: "file",
                       header: {
                         'content-type': 'multipart/form-data'
                       },
                       // formData: {//额外参数
                       //  timestamp:timestamp,
                       //  enMsg:enMsg
                       //  },
                        success: function (res)  {
                          function typefn(){//根据小数点获取文件类型
                          console.log('that.tempFilePaths',that.tempFilePaths)
                            if(that.tempFilePaths.path.lastIndexOf('.')>=0){
                             return  that.tempFilePaths.path.substring(that.tempFilePaths.path.lastIndexOf('.'),that.tempFilePaths.path.length)
                           }else{
                             return 'unknown'
                           }}

                           function attachmentType(){//根据小数点获取文件类型
                           //0图片 1文档 2压缩包  3视频 4其他
                           console.log('that.tempFilePaths',that.tempFilePaths)
                             if(that.tempFilePaths.path.lastIndexOf('.')>=0){
                               let imgtype = ['heic','.png', '.jpg', '.jpeg', '.bmp', '.gif', '.webp', '.psd', '.svg', '.tiff']
                               let doctype = ['.doc', '.docx', '.xls', '.xlsx','.txt', '.rtf', '.ppt', '.pptx','.pdf','.dps','.dpt','.pot','.pps','.wps','.wpt','.dot','.docx','.dotx','.docm','.dotm']
                               let ziptype = ['.zip', '.rar', '.7z', '.xlsx','.txt', '.rtf', '.ppt', '.pptx','.pdf','.dps','.dpt','.pot','.pps','.wps','.wpt','.dot','.docx','.dotx','.docm','.dotm']
                               let videotype = ['.avi', '.mp4', '.awv']
                              if(imgtype.indexOf(that.tempFilePaths.path.substring(that.tempFilePaths.path.lastIndexOf('.'),that.tempFilePaths.path.length))>=0){
                                  return 0
                              }
                              if(doctype.indexOf(that.tempFilePaths.path.substring(that.tempFilePaths.path.lastIndexOf('.'),that.tempFilePaths.path.length))>=0){
                                  return 1
                              }
                              if(ziptype.indexOf(that.tempFilePaths.path.substring(that.tempFilePaths.path.lastIndexOf('.'),that.tempFilePaths.path.length))>=0){
                                  return 2
                              }
                              if(videotype.indexOf(that.tempFilePaths.path.substring(that.tempFilePaths.path.lastIndexOf('.'),that.tempFilePaths.path.length))>=0){
                                  return 3
                              }
                            }else{
                              return 4
                            }}

                           function namefn(){//根据小数点获取文件名字
                           console.log('that.tempFilePaths',that.tempFilePaths)
                            if(that.tempFilePaths.path.lastIndexOf('.')>=0){
                              console.log(1)
                             return  that.tempFilePaths.name.substring(0,that.tempFilePaths.name.lastIndexOf('.'))
                           }else{
                             console.log(2)
                             return tempFilePaths[i].name
                           }}
                          console.log('res',JSON.parse(res.data))
                          if(JSON.parse(res.data).code == 200 || JSON.parse(res.data).code == 209){
                            console.log( {attachmentUrl:JSON.parse(res.data).data,
                            attachmentTitle:namefn(),type:typefn()})

                            that.imgArr.push({//上传文件
                              attachmentTitle:namefn(),//附件标题
                              attachmentType:attachmentType(),//附件类型
                              attachmentSuffix:typefn(),//附件类型
                              attachmentUrl:JSON.parse(res.data).data,//附件后台地址
                              type:typefn(),//附件后缀 这个是本页面用的 跟后端没关系
                            }
                            )
                            // let img = WXAJAX.imgBackUrl+JSON.parse(res.data).data
                            //  that.imgArr +=img + ","
                            // console.log("上传文件",that.imgArr);
                          }else{
                            uni.showToast({
                              title: res.data.message || '系统繁忙',
                              duration: 2000,
                              icon: 'none'
                            });
                          }

                        },
                        fail:res=>{
                          wx.showToast({
                            title: '系统繁忙2',
                            duration: 2000,
                            icon: 'none'
                          });
                        }
                      });
                  }
                }
              }
            })
          },
           ChooseImage() {//上传图片
                var that = this;
                  uni.chooseImage({//从本地相册选择图片或使用相机拍照。
                     count: 9, //默认9
                     sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                     sourceType: ['album', 'camera'], //从相册选择和拍照
                      success: (res) => {
                        var tempFilePaths = res.tempFilePaths;
                          console.log('本页面最多上传多少张图片',that.imgMaxNum)
                        if (that.imgList.length+tempFilePaths.length > that.imgMaxNum) {
                            uni.showToast({
                                 title: '超过上传图片的最大数量',
                                 icon: 'none'
                            })
                        } else {

                        for (var i = 0; i < tempFilePaths.length; i++) {
                          that.tempFilePaths = tempFilePaths[i]
                          if (that.imgList.length != 0) {
                             console.log('照片信息',res)
                             that.imgList.push({attachmentUrl:tempFilePaths[i],type:'image',name:''})
                           } else {
                                that.imgList = [{attachmentUrl:tempFilePaths[i],type:'image',name:''}];
                           }
                           console.log('asd ',that.imgList)
                            // let timestamp = new Date().getTime();
                            // let enMsg = hex_md5('@' + hex_md5('@' + timestamp + '~') + '~');
                            uni.uploadFile({
                               url: that.uploadUrl,//上传的服务器地址
                               filePath: tempFilePaths[i],
                               method: 'POST',
                               name: "file",
                               header: {
                                 'content-type': 'multipart/form-data'
                               },
                               // formData: {//额外参数
                               //  timestamp:timestamp,
                               //  enMsg:enMsg
                               //  },
                                success: res => {
                                  console.log('res',JSON.parse(res.data))
                                  if(JSON.parse(res.data).code == 200 || JSON.parse(res.data).code == 209){
                                    that.imgArr.push({attachmentUrl:JSON.parse(res.data).data,
                                    attachmentTitle:'',type:'image',attachmentType:0})
                                    // let img = WXAJAX.imgBackUrl+JSON.parse(res.data).data
                                     // that.imgArr +=img + ","
                                    // console.log("上传图片",that.imgArr);
                                  }else{
                                    uni.showToast({
                                      title: res.data.message || '系统繁忙',
                                      duration: 2000,
                                      icon: 'none'
                                    });
                                  }

                                },
                                fail:res=>{
                                  wx.showToast({
                                    title: '系统繁忙2',
                                    duration: 2000,
                                    icon: 'none'
                                  });
                                }
                              });
                          }
                        }
                   }
               });
           },
        //查看图片
            lookImg: function(val) {
                const urls = this.imgList
                const current = val
                uni.previewImage({
                    urls,
                    current
                     })
                },
            delect(index){
                uni.showModal({
                    title: "提示",
                    content: "是否要删除该图片",
                    success: (res) => {
                        if (res.confirm) {
                        this.imgList.splice(index, 1)
                            }
                    }
                })
            },
        }
}
</script>

<style >
 image{
      width: 100%;
      height: 100%;
      border: 2rpx dashed #eee;
  }
  .showimg_box{
              display: flex;
              align-items: center;
              margin-top: 20rpx;
              /* justify-content: space-between; */
          }
  .showfile_box>view{
              display: flex;
              align-items: center;
              margin-top: 20rpx;
              justify-content: space-between;
          }
          .show_img{
              width: 140rpx;
              height: 140rpx;
              border: 2rpx dashed #eee;
              margin: 20rpx 0;

          }
          .images{
              width: 140rpx;
              height: 140rpx;
              z-index: 999;
          }

          .imgarr{
          display: flex;
          align-items: center;
          position: relative;
          margin: 0 10rpx;
          }
          .icon-cuo {
               font-family: 'iconfont';
              position: absolute;
              right: 0;
              top: 5rpx;
              background: linear-gradient(90deg,rgba(251,91,80,1) 0%,rgba(240,45,51,1) 100%);
              color: #FFFFFF;
              z-index: 10009;
              border-radius:50%;
          }
</style>
