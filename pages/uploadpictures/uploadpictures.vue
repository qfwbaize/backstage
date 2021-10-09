<template>
  <div>
    	<view style="margin-top:50px">
          <view class="">
            <div class="bgfff pt17 pb17 pl15">
              <div class="jsbet">
                <p class="fs16 c38 fbold mb10">添加图片</p>
                <p class="fs16 ca8 mb15">最多可添加9张图片</p>
              </div>
              <div class="disflex wrap ">
                <div class="w100 h100 mr7 mb10 posre " v-for="(v,k) in dynamic_imgs" :key="k">
                  <img :src="v" alt="" class="w100 h100 mr7 mb10" mode="aspectFill">
                  <span @click="del(k)">
                    <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/del.png" alt=""
                                      class="w20 h20 posab right0 top0"/>
                  </span>
                </div>
                <div class="bgfff bdash_a8 w100 h100 add_img mr7 mb10" @click="uploadpic('dynamic')"></div>
              </div>
            </div>
          </view>
    	    <view @click="rtn2H5()">返回</view>
    	    <view @click="domino1()" style="display: none;">执行DominoAgent</view>
    	</view>
  </div>
</template>

<script>
  import util from '@/utils'
  import WXAJAX from "../../utils/request";
	export default {
		data() {
			return {
				opFlg : 0,//操作标记，
				tempTmr : '',
				tempResult : '我的结果真是最好的！',
				para:'',
        dynamic_imgs: [], //上传图片的列表
        loc:'',
			}
		},
    onLoad(option) {
      this.tempTmr=option.tempTmr;
      this.para=option.para;
      this.loc=option.loc;
      console.log("a",option.a);
      console.log("b",option.b);
      console.log("tempTmr",this.tempTmr);
      console.log("para",this.para );

      console.log("loc1:",this.loc );


      	this.loc=this.loc.replace(/FFXXMM/g,"&");
      	this.loc=this.loc.replace(/FFXxMM/g,"=");
      	this.loc=this.loc.replace(/FFxXMM/g,"#");
      	for(var i=0;i<100;i++){
      		this.loc=this.loc.replace("FFxxMM","/");
      		this.loc=this.loc.replace("FFXXmM","?");
      	}
      console.log("loc2:",this.loc );
      wx.setNavigationBarTitle({ title: option.title});
      this.uploadpic('dynamic');
    },
    onUnload() {
      console.log('onUnload1：=====',this.para);
      console.log('onUnload2：=====',this.dynamic_imgs.join(','));
      //////
      //fxm:关闭小程序页面回H5之前，
      //将H5页面传过来的para作为key，
      //将小程序页面要传给H5页面的数据作为value，进行缓存,
      //在H5的小程序页面中，在其onShow()中进行处理，使用location Hash传递给H5
      wx.setStorageSync('H5_loc', this.loc);
      wx.setStorageSync('H5_key', this.para);
      wx.setStorageSync('H5_value', this.dynamic_imgs.join(','));

      if(this.opFlg==0){//未操作直接关闭

        WXAJAX.POST(
          {
            key: this.tempTmr,
            value: "FXM未操作直接关闭FXM"
          },
          "",
          "/redis/setTempValue",'','',3
        ).then(res => {
            // let selfCard = null;
            // let defaultCard = null;
            // state : 1 -- 默认 ， 2 -- 浏览记录 ， 3 -- 自己的
            if(res){
              this.opFlg++;
              console.log('操作Redis成功：',res.data);
            }
          }).catch(err => {
            console.log('错误',err);
            uni.showToast({
                title: "操作失败，请关闭重试！",
                infoType: 0,
            })
          });

      }
    },
		methods: {
			rtn2H5() {
        console.log(11111)
			  //set redis,then
			  this.opFlg += 1;
			  WXAJAX.POST(
			    {
			      key: this.tempTmr,
			      value:this.dynamic_imgs.join(','),
			    },
			    "",
			    "/redis/setTempValue",'','',3
			  ).then(res => {
			      // let selfCard = null;
			      // let defaultCard = null;
			      // state : 1 -- 默认 ， 2 -- 浏览记录 ， 3 -- 自己的
			      if(res){

			        console.log('操作Redis成功AAA：',res.data);
			      }
			    }).catch(err => {
			      console.log('错误',err);
			      uni.showToast({
			          title: "操作失败，请关闭重试！",
			          infoType: 0,
			      })
			    });
			  uni.navigateBack({ delta: 1 });
			},
			domino1() {
			  WXAJAX.POST(
			    {
            para:'999'
          },
			    "",
			    "/app/myy/ADR.nsf/newMedicalCase?openagent&userId=8669977大家666",'','',4
			  ).then(res => {
			      if(res){
			        console.log('操作Redis成功AAAd：',res.data);
			      }
			    }).catch(err => {
			      console.log('错误',err);
			      uni.showToast({
			          title: "操作失败，请关闭重试！",
			          infoType: 0,
			      })
			    });
			  uni.navigateBack({ delta: 1 });
			},
      async uploadpic(str) {
        if (str == 'dynamic' && this.dynamic_imgs.length >= 9) {
          wx.showToast({
            title: '最多选择九张！',
            duration: 1500,
            icon: 'none'
          });
          return
        }
        let path = await util.chooseImage('file', str === 'dynamic' ? 9 - this.dynamic_imgs.length : 1);
        if(Object.prototype.toString.call(path) !== '[object Array]') return;
        this.uploadImgFun(path, 0, str);
      },
      // 递归上传
      async uploadImgFun(arr, index = 0, str) {
        wx.showLoading({title: '上传中', mask: true})
        await this.uploadImg(arr[index], str)
        if (index < arr.length - 1) {
          this.uploadImgFun(arr, index + 1, str)
        }
      },
      uploadImg(path, str) {
        let v = this;
        wx.showLoading();

        return WXAJAX.UploadImage(path).then((data) => {
          wx.hideLoading();
          data = JSON.parse(data);
          if (data.code == '200') {
            if (str == 'dynamic') {
              this.dynamic_imgs.push(WXAJAX.imgBackUrl + data.data);
            } else {
              this.article_img = WXAJAX.imgBackUrl + data.data;
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
      del(index) {//删除图片
        this.dynamic_imgs.splice(index, 1);
      },
		}
	}
</script>

<style>

</style>
