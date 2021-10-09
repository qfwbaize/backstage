<template>
  <div style="background-color: #FFFFFF;padding-left: 30rpx;padding-right: 30rpx;">
    <view class="">
      <view class="" style="padding-top: 40rpx;">
        <input type="text" class="inputlist" value="" placeholder="设置标题" v-model="settitle" />

        <view class="">
          <div class="disflex wrap pt20 pb20 w290">
            <div class="bgfff w80 h80 mr7 mb7 posre" v-for="(v,k) in self_photos" :key="k">
              <img mode="aspectFill" :src="v" alt="" class="w100p h100p">
              <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/del.png" alt=""
                class="w20 h20 posab right2 top2" @click="delImg(k)">
            </div>
            <div class="bgfff bdash_a8 w80 h80 add_img bradius5 mr7" @click="uploadpic('self', 1,'第零个')"></div>
          </div>
        </view>

        <input type="text" class="inputlist" value="" placeholder="添加图片描述" v-model="description" />
        <view class="" style="display: flex;justify-content: flex-end;">
          <!-- <view class="buton" style="margin-right:40rpx;" @click="dismodify()">修改</view> -->
          <view class="buton" @click="dlemodify(editorsid)">删除</view>
        </view>
      </view>
    </view>
    <view class="">
      <view class="" style="padding-top: 40rpx;">
        <input type="text" class="inputlist" value="" placeholder="设置标题" v-model="settitleone" />
        <view class="">
          <div class="disflex wrap pt20 pb20 w290">
            <div class="bgfff w80 h80 mr7 mb7 posre" v-for="(v,k) in self_photos1" :key="k">
              <img mode="aspectFill" :src="v" alt="" class="w100p h100p">
              <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/del.png" alt=""
                class="w20 h20 posab right2 top2" @click="delImgone(k)">
            </div>
            <div class="bgfff bdash_a8 w80 h80 add_img bradius5 mr7" @click="uploadpic('self', 1,'第一个')"></div>
          </div>
        </view>
        <input type="text" class="inputlist" value="" placeholder="添加图片描述" v-model="descriptionone" />
        <view class="" style="display: flex;justify-content: flex-end;">
          <!-- <view class="buton" style="margin-right:40rpx;" @click="dismodify()">修改</view> -->
          <view class="buton" @click="dlemodify(editorsid1)">删除</view>
        </view>
      </view>
    </view>
    <view class="">
      <view class="" style="padding-top: 40rpx;padding-bottom: 150rpx;">
        <input type="text" class="inputlist" value="" placeholder="设置标题" v-model="settitletow" />
        <view class="">
          <div class="disflex wrap pt20 pb20 w290">
            <div class="bgfff w80 h80 mr7 mb7 posre" v-for="(v,k) in self_photos2" :key="k">
              <img mode="aspectFill" :src="v" alt="" class="w100p h100p">
              <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/del.png" alt=""
                class="w20 h20 posab right2 top2" @click="delImgtow(k)">
            </div>
            <div class="bgfff bdash_a8 w80 h80 add_img bradius5 mr7" @click="uploadpic('self', 1,'第二个')"></div>
          </div>
        </view>
        <input type="text" class="inputlist" value="" placeholder="添加图片描述" v-model="descriptiontow" />
        <view class="" style="display: flex;justify-content: flex-end;">
          <!-- <view class="buton" style="margin-right:40rpx;" @click="dismodify()">修改</view> -->
          <view class="buton" @click="dlemodify(editorsid2)">删除</view>
        </view>
      </view>
    </view>
    <BottomButtonSmall :text="'保存'" :url="'confirm'" @btn_tap="save"></BottomButtonSmall>
    <!-- <BottomButtonSmall v-show="type == '' " :text="'添加'" :url="'confirm'" @btn_tap="save"></BottomButtonSmall> -->
  </div>
</template>

<script>
  import WXAJAX from "@/utils/request";
  import util from "@/utils/index";
  import BottomButtonSmall from '@/components/bottom_button_small'
  export default {
    components: {
      BottomButtonSmall,
    },
    data() {
      return {
        self_photos: [],
        self_photos1: [],
        self_photos2: [],
        description: '',
        settitle: '',
        descriptionone: '',
        settitleone: '',
        descriptiontow: '',
        settitletow: '',
        editorsid: '',
        editorsid1: '',
        editorsid2: '',
        isdel: 0,
        isdel1: 0,
        isdel2: 0,
      }
    },
    onLoad(e) {
      if (e.add == 1) {
        this.geteditors()
      }
    },
    methods: {
      async uploadpic(str, count, tp) {
        this.showPageStatus = "0";
        let path = await util.chooseImage("file", count);
        if (!(path instanceof Array)) return;
        this.uploadImgFun(path, 0, str, tp);
      },
      async uploadImgFun(arr, index = 0, str, tp) {
        await this.uploadImg(arr[index], str, tp);
        if (index < arr.length - 1) {
          this.uploadImgFun(arr, index + 1, str);
        }
      },
      // str == "self" ||
      uploadImg(path, str, tp) {
        if (str == "self" && tp == '第零个' && this.self_photos.length >= 3) {
          wx.showToast({
            title: "最多选择3张！",
            duration: 1500,
            icon: "none"
          });
          return;
        }
        if (str == "self" && tp == '第一个' && this.self_photos1.length >= 3) {
          wx.showToast({
            title: "最多选择3张！",
            duration: 1500,
            icon: "none"
          });
          return;
        }
        if (str == "self" && tp == '第二个' && this.self_photos2.length >= 3) {
          wx.showToast({
            title: "最多选择3张！",
            duration: 1500,
            icon: "none"
          });
          return;
        }
        wx.showLoading({
          mask: true
        });
        return WXAJAX.UploadImage(path).then(data => {
            wx.hideLoading();
            data = JSON.parse(data);
            if (data.code == "200") {
              if (str == "self") {
                if (tp == '第零个') {
                  this.self_photos.push(`${WXAJAX.imgBackUrl}${data.data}`);
                  this.$emit('img_tap', this.self_photos, this.number)
                }
                if (tp == '第一个') {
                  this.self_photos1.push(`${WXAJAX.imgBackUrl}${data.data}`);
                  this.$emit('img_tap', this.self_photos1, this.number)
                }
                if (tp == '第二个') {
                  this.self_photos2.push(`${WXAJAX.imgBackUrl}${data.data}`);
                  this.$emit('img_tap', this.self_photos2, this.number)
                }
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
      //添加信息
      async save() {
        var url = this.self_photos.toString()
        var url1 = this.self_photos1.toString()
        var url2 = this.self_photos2.toString()
        wx.showLoading();
        WXAJAX.POST({
          listCompanyVisualize: [{
              visualizeId: this.editorsid,
              visualizeTitle: this.settitle,
              visualizeUrl: url,
              visualizeDescription: this.description,
              visualizeSort: 1,
              isDel: this.isdel,
            },
            {
              visualizeId: this.editorsid1,
              visualizeTitle: this.settitleone,
              visualizeUrl: url1,
              visualizeDescription: this.descriptionone,
              visualizeSort: 2,
              isDel: this.isdel1,
            },
            {
              visualizeId: this.editorsid2,
              visualizeTitle: this.settitletow,
              visualizeUrl: url2,
              visualizeDescription: this.descriptiontow,
              visualizeSort: 3,
              isDel: this.isdel2,
            },
          ]
        }, '', '/visualize/batchAdd', '', '', 1).then((data) => {
          wx.hideLoading();
          if (data) {
            wx.showToast({
              title: '成功！',
              icon: 'success'
            });
            setTimeout(function() {
              wx.navigateBack();
            }, 500)
          }

        }).catch((err) => {
          wx.hideLoading();
          wx.showToast({
            title: err.message,
            duration: 2000,
            icon: 'none'
          });
        });
      },
      // 修改形象展示
      dismodify() {
        console.log("修改")
      },
      // 删除形象展示
      dlemodify(delid) {
        if (delid = 1) {
          this.isdel = 1
        }
        if (delid = 2) {
          this.isdel1 = 1
        }
        if (delid = 3) {
          this.isdel2 = 1
        }
        this.save()
      },
      geteditors() {
        WXAJAX.POST({
            companyId: wx.getStorageSync('COMPANYID')
          }, '', '/visualize/queryList', '', '', 1)
          .then((res) => {
            this.description = res[0].visualizeDescription
            this.settitle = res[0].visualizeTitle
            this.descriptionone = res[1].visualizeDescription
            this.settitleone = res[1].visualizeTitle
            this.descriptiontow = res[2].visualizeDescription
            this.settitletow = res[2].visualizeTitle
            this.editorsid = res[0].visualizeId
            this.editorsid1 = res[1].visualizeId
            this.editorsid2 = res[2].visualizeId
            this.self_photos = res[0].visualizeUrl.split(",")
            this.self_photos1 = res[1].visualizeUrl.split(",")
            this.self_photos2 = res[2].visualizeUrl.split(",")
            // if (res) {
            //   res.forEach(function(i, k) {
            //     res[i].photoabc = i.visualizeUrl ? i.visualizeUrl.split(",") : [];
            //     console.log(i.photoabc)
            //     this.self_photos = i.photoabc[0]
            //     this.self_photos1 = i.photoabc[1]
            //     this.self_photos2 = i.photoabc[2]
            //   });
            // }
          })
      },
      // 删除图片
      delImg(index) {
        wx.showLoading();
        this.self_photos.splice(index, 1);
        wx.hideLoading();
      },
      delImgone(index) {
        wx.showLoading();
        this.self_photos1.splice(index, 1);
        wx.hideLoading();
      },
      delImgtow(index) {
        wx.showLoading();
        this.self_photos2.splice(index, 1);
        wx.hideLoading();
      },
    },
  }
</script>

<style scoped>
  .inputlist {
    height: 60rpx;
    border: 2rpx solid #BBBBBB;
  }

  .buton {
    margin-top: 10rpx;
    width: 100rpx;
    height: 50rpx;
    background-color: #00D7D0;
    color: #FFFFFF;
    text-align: center;
    line-height: 50rpx;
    border-radius: 12rpx;
  }
</style>
