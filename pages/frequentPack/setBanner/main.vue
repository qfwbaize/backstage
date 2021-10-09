<template>
    <div class="pt15 pb15 disfelx bgfff h100p disflex flex-column">
      <div class="fs16 bgfff pl16 pb15 mb10 flex1">
        <div class="disflex wrap">
          <div class="bgfff w100 h100 mr7 mb7 posre"
              v-for="(v,k) in self_photos"
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
          <div v-if="self_photos.length < 6"
              class="bgfff bdash_a8 w100 h100 add_img mr7 mb7"
              @click="uploadpic('self', 6)"></div>
        </div>
        <p class="fs14 c38 lh20 mt15">上传图片最佳尺寸：750像素*422像素，格式 png，jpeg，jpg。大小不超过2m，最少上传一张，最多可上传6张</p>
      </div>
      <div class="fs18 textc lh49 fix_bottom bg_line_blue cfff" @click="btn_tap(url)">
        保存
      </div>
    </div>
</template>
<script>
import WXAJAX from '@/utils/request';
import util from '@/utils/index'
export default {
    data(){
        return{
          self_photos:[]
        }
    },
    mounted() {
      this.getBanner()
    },
    methods:{
     delImg(index) {
      //删除图片
      wx.showLoading();
      this.self_photos.splice(index, 1);
      wx.hideLoading();
      },
      async uploadpic(str, count) {
        // let a = this.card_msg;
        
        console.log(this.self_photos.length)
        this.showPageStatus = "0";
        let path = await util.chooseImage("file", count);
        if (!(path instanceof Array)) return;
        this.uploadImgFun(path, 0, str);
      },
      // 递归上传
      async uploadImgFun(arr, index = 0, str) {

        await this.uploadImg(arr[index], str);
        if (index < arr.length - 1) {
          this.uploadImgFun(arr, index + 1, str);
        }
      },
      uploadImg(path, str) {
        if (str == "self" && this.self_photos.length >= 6) {
          wx.showToast({
            title: "最多选择6张！",
            duration: 1500,
            icon: "none"
          });
        return;
      }
      wx.showLoading({ mask: true });
      return WXAJAX.UploadImage(path)
        .then(data => {
          wx.hideLoading();
          data = JSON.parse(data);
          if (data.code == "200") {
             if (str == "self") {
              this.self_photos.push(`${WXAJAX.imgBackUrl}${data.data}`);
              this.$emit('img_tap',this.self_photos,this.number)
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
          console.log("err -- ", err);
        });
      },
      btn_tap(){
        wx.showLoading();
          let markets = [{
            url:this.self_photos
          }]
        WXAJAX.POST({
          markets
        }, '', '/market/updateMarketAdvancedForm').then((data) => {

          wx.showToast({
            title:'保存成功！'
          });
          setTimeout(()=>{
            uni.navigateBack({
              delta:1
            })
          },1000)
        }).catch((err) => {
          console.log(err);
          wx.hideLoading();
        });
        
      },
      getBanner(){
        wx.showLoading();
        WXAJAX.POST({
          companyId:''
        }, '', '/market/queryMarketAdvancedForm').then((data) => {
          wx.hideLoading();
          this.self_photos = JSON.parse(data[0].url)
         
          
        }).catch((err) => {
          console.log(err);
          wx.hideLoading();
        });
      }
    }
}
</script>
<style scoped>

</style>
