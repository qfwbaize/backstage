<template>
  <div class="pb40">
    <div class="disflex align-cen bgfff">
      <picker class="w100p" :range="array" :value="index" @change="bindDateChange">
        <div class="disflex w100p borderbox jsbet align-cen pt10 pl18 pb10 pr15 h49">
          <div class="">
            选择分类
          </div>
          <div class="disflex align-cen">
            <p class="fs16 ca7 mr10">{{ array[index]}}</p>
            <img :src="rightIcon" class="w10 h10 mt4">
          </div>
        </div>
      </picker>
    </div>

    <div v-if="type == 'dynamic'">
      <div class="textarea_box pl13 pt13 pr17 pb15 fs14 ca8 bgfff mb10">
        <textarea name="" rows="2" maxlength="200" v-model="text" class="h50 w100p" placeholder="请输入动态内容">
                </textarea>
        <div class="textr">{{text.length}}/200</div>
      </div>

      <!--上传图片-->
      <div class="bgfff pt17 pb17 pl15" v-show="selectType == '图片'">
        <div class="jsbet">
          <p class="fs16 c38 fbold mb10">添加图片</p>
          <p class="fs16 ca8 mb15">最多可添加9张图片</p>
        </div>

        <div class="disflex wrap ">
          <div class="w100 h100 mr7 mb10 posre " v-for="(v,k) in dynamic_imgs" :key="k">
            <img :src="v" alt="" class="w100 h100 mr7 mb10" mode="aspectFill">
            <span @click="del(k)">
              <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/del.png" alt=""
                class="w20 h20 posab right0 top0" />
            </span>
          </div>
          <div class="bgfff bdash_a8 w100 h100 add_img mr7 mb10" @click="uploadpic('dynamic')"></div>
        </div>
      </div>

      <!-- 上传视频 -->
      <div class="bgfff pt17 pb17 pl15" v-show="selectType == '视频'">
        <p class="fs16 c38 fbold mb10">视频内容</p>
        <p class="fs14 ca8 mb15">只能上传MP4文件，视频时间不超过60秒，且不超过10M</p>
        <div v-if="detallData.url" class="w100 h100" @click="showChooseType">
          <video :src="detallData.url" @loadedmetadata="loadedmetadata" class="w100 h100 bradius10 mr7 mb7"></video>
        </div>

        <div v-else class="bgfff bdash_a8 w100 h100 add_img mr7 mb7" @click="showChooseType">
        </div>
      </div>
      <!-- 发布到个人视频和发现广场 -->
      <div>
        <div class="square">
          <checkbox-group @change="checkboxChange">
            <label> <checkbox value="1" color="#FFCC33" style="transform:scale(0.7);margin-top: 20rpx;" />发布到发现广场</label>
          </checkbox-group>
        </div>
      </div>
    </div>

    <!-- <div v-else>
      <div class="w100p h375 textc mb10 bgfff borderbox" @click="uploadpic('article')">
        <div v-if="!article_img" class="pt123">
          <img src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/VR.png" alt=""
               class="w100 h100" />
          <p class="fs14  ca8">点击添加文章封面</p>
        </div>
        <img :src="article_img" alt="" v-else class="w100p h100p" mode="aspectFill">
      </div>

      <div class="textarea_box pl13 pt13 pr17 pb15 fs14 ca8 bgfff mb10">
                <textarea name="" id="" rows="2"
                          maxlength="200"
                          v-model="text"
                          class="h50 w100p"
                          placeholder="请输入文章标题">
                </textarea>
        <div class="textr">{{text.length}}/200</div>
      </div>

      <div class="bgfff textc pb25">
        <p class="fs14 ca8 pt16 pb40">文章详情</p>


        <span class="disinblock bblue cblue fs14 lh30 bradius5  pl11 pr11"
              @click="page_turn('../companyIntro' , '?type=article')">
                    添加内容
                </span>

        <div v-html="editOperator"></div>

      </div>
    </div> -->

    <BottomButtonSmall :text="'发布'" :url="'confirm'" @btn_tap="btn_tap"></BottomButtonSmall>
    <canvas style="width: 500px;height: 500px;position: fixed;bottom: -4000px;z-index: -100"
      canvas-id="Canvas"></canvas>

    <div v-if="chooseTypeShow">
      <SelectorOne :title="'选择添加方式'" :status="chooseTypeShow" :allClass="uploadVideoTypes" :choose_id="uploadVideoType"
        @closeModal="chooseTypeShow=false" @choose_tap="choose">
      </SelectorOne>
    </div>
    <div v-show="dialog_show">
      <DialogBox :dialog_title="dialog_title" @btn_tap="dialog_tap" :dialog_ph="dialog_ph" :default="dialog_value"
        :left="'取消'" :right="'保存'"></DialogBox>
    </div>

  </div>
</template>

<script>
  import SelectorOne from '@/components/selectorOne'
  import DialogBox from '@/components/dialogBox'
  import BottomButtonSmall from '@/components/bottom_button_small' // 订单项
  import StaticResources from '@/components/StaticResources';
  import util from '@/utils'
  import WXAJAX from '@/utils/request'

  export default {
    name: '',
    components: {
      BottomButtonSmall,
      StaticResources,
      DialogBox,
      SelectorOne
    },
    data() {
      return {
        array: ['图片', '视频'],
        index: 0,
        selectType: '图片',
        text_length: 0,
        counter: '200',
        text: '',
        type: '',
        dynamic_imgs: [],
        article_img: '',
        editOperator: '',
        isOrgShow: 0, //0个人，1动态
        dialog_show: false,
        dialog_title: '标题',
        dialog_ph: '请输入视频链接',
        chooseTypeShow: false,
        uploadVideoType: 0,
        uploadVideoTypes: [{
            name: '添加链接',
            id: 1
          },
          {
            name: '本地视频',
            id: 2
          }
        ],
        video: '',
        videoTitle: '',
        types: '',
        hiddenBtn: false,
        hiddenData: false,
        videoId: '',
        detallData: {
          coverImg: '',
          url: '',
          videoId: ''
        },
        videoWidth: '', //视频宽度
        videoHigh: '', //视频高度
        isDiscover:'',
      }
    },
    watch: {
      'text': function(newVal, oldVal) {
        if (newVal.length > 200) {
          this.text = this.intro.slice(0, 200)
        }
      }
    },
    onLoad(e) {
      console.log(e)
    },
    onShow() {
      this.editOperator = wx.getStorageSync('editOperator') || '';

    },
    onUnload() {
      wx.setStorageSync('editOperator', '');
    },
    mounted() {
      this.type = this.$root.$mp.query.type;
      this.isOrgShow = this.$root.$mp.query.isOrgShow;
      console.log(this.isOrgShow)
      let title = '发布文章';
      if (this.type == 'dynamic') {
        title = '发布动态';
      }
      wx.setNavigationBarTitle({
        title: title
      });

    },
    methods: {
      checkboxChange: function (e) {
         console.log(e.detail.value)
         if(e.detail.value == '1'){
           this.isDiscover = 1
         }
         if(e.detail.value == ''){
            this.isDiscover = 0
         }
         console.log(this.isDiscover)
       },
      bindDateChange(e) {
        this.index = e.target.value
        this.selectType = this.array[this.index]
      },
      dialog_tap(str, dialog_value) {
        if (str == 'save') {
          this.detallData.url = dialog_value
        }
        this.dialog_show = false;
      },
      choose(id, name) {
        this.chooseTypeShow = false;
        if (id == 1) {
          this.dialog_show = true;
        }
        if (id == 2) {
          util.chooseVideo().then(res => {
            wx.showLoading({
              title: '上传中',
              mask: true
            });
            WXAJAX.UploadImage(res.tempFilePath)
              .then(data => {
                wx.hideLoading();
                data = JSON.parse(data);
                if (data.code == 200) {
                  let url = WXAJAX.imgBackUrl + data.data;
                  this.detallData.url = url;
                } else {
                  wx.showToast({
                    title: '上传失败，文件过大',
                    icon: 'none'
                  })
                }
              })

          }).catch(err => {
            wx.showToast({
              title: err,
              duration: 2000,
              icon: 'none'
            })
          })
        }
      },
      showChooseType() {
        this.chooseTypeShow = true;
      },
      //获取视频宽高
      loadedmetadata(res) {
        console.log('获取视频宽高', res)
        this.videoWidth = res.detail.width
        this.videoHigh = res.detail.height
      },
      btn_tap(method) {

        let _url = '/company/addDynamicInfo',
          params = {};

        params.type = this.type == 'dynamic' ? 2 : 1;
        params.title = this.text.trim();
        if (this.isOrgShow) {
          params.isOrgShow = this.isOrgShow;
          params.isshow = 0;
        }

        if (this.type == 'dynamic') { //发布动态
          if (!this.text.trim()) {
            wx.showToast({
              title: '请输入动态内容！',
              duration: 1500,
              icon: 'none'
            });
            return
          }
          params.photos = this.dynamic_imgs.join(',');
          params.details = this.editOperator;
          params.isDrafts = 0;
          params.url = this.detallData.url
          params.isDiscover=this.isDiscover
        }
        WXAJAX.POST(params, '', '/dynamic/addDynamicInfo', '', '', 1).then((data) => {
          wx.showToast({
            title: '成功！',
          });
          this.text = '';
          this.dynamic_imgs = [];
          this.article_img = '';
          setTimeout(function() {
            // wx.navigateBack();
            uni.navigateBack({
              success: () => {
                let page = getCurrentPages().pop();
                if (page) {
                   page.onLoad(page.options);//执行上个页面的方法
                };
              }
            })
          }, 500)
        }).catch((err) => {
          console.log(err)
          wx.showToast({
            title: err.message,
            duration: 2000,
            icon: 'none'
          });
        });

      },
      reset_text(_obj) {
        this.text = _obj.value.substring(0, 200);
        this.text_length = this.text.length;
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
        if (Object.prototype.toString.call(path) !== '[object Array]') return;
        this.uploadImgFun(path, 0, str);
      },
      // 递归上传
      async uploadImgFun(arr, index = 0, str) {
        wx.showLoading({
          title: '上传中',
          mask: true
        })
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
      del(index) { //删除图片
        this.dynamic_imgs.splice(index, 1);
      },
      page_turn(url, query) {
        query = query || '';
        wx.navigateTo({
          url: '../' + url + '/main' + query
        });
      }
    }
  }
</script>

<style>
  .pl16_prod>div {
    padding-left: 40upx;
  }

  .square {
    margin-top: 20rpx;
    width: 100%;
    background-color: #FFFFFF;
    padding-left: 22rpx;
    padding-bottom: 20rpx;
  }
</style>
