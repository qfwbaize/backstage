<template>
  <div class="h100p">
    <!--展示列表 -->
    <!-- <view class=" w345 h118 wrap m0auto mt15  disflex jsbet" style="box-shadow: 0px 2px 6px 0px rgba(167, 225, 221, 100);">
      <div class='ml15'>
        <div class="fs14 mt15 w170 lh15 spot">11111</div>
        <div class="fs14 mt15">11111</div>
        <div class='fs12 time ' style="margin-top: 50rpx;">1111</div>
      </div>
      <div class="w77 h118 ">
       <div class="w77 h75  b10" style="padding-top: 24rpx;padding-right: 44rpx;">
          <image class="w77 h75" src="" mode="">
          </image>
        </div>
        <div class="w24 h24 arr" @click="getactive()">
          <image class="w24 h24 "
            src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/riFill-more-fill Copy@3x.png"
            mode=""></image>
        </div>
      </div>

    </view>
    <view class="frame" v-show="ishowopen">
        <view class="editdelete" @click="toeditdecom()">编辑</view>
        <view class="editdelete">删除</view>
    </view> -->
    		<RichEditor :toolbars="toolbars" ref="rich" v-if="isShowEditor" :initContent="richText" />
		<div class="minh45"></div>
		<BottomButtonSmall :text="'保存'" :url="'confirm'" @btn_tap="save"></BottomButtonSmall>
    <!-- <view class="addcomintr" @click="toaddcom()">添加机构介绍</view> -->
  </div>
</template>

<script>
  import BottomButtonSmall from '@/components/bottom_button_small' //
  import Edit_operator from '@/components/edit_operator' //
  import StaticResources from '@/components/StaticResources';
  import RichEditor from '@/components/RichEditor';
  import util from '../../utils/index'
  import WXAJAX from '@/utils/request'


  export default {
    name: '',
    components: {
      BottomButtonSmall,
      Edit_operator,
      StaticResources,
      RichEditor
    },
    data() {
      return {
        type: '',
        title: {
          'prod': '产品介绍',
          'companyIntroduce': '机构介绍',
          'goodsIntroduce': '产品介绍',
          'article': '文章详情'
        },
        websiteId: 0,
        imgBackUrl: WXAJAX.imgBackUrl,
        toolbars: ['bold', 'italic', 'underline', 'alignLeft',
          'alignCenter', 'alignRight', 'alignJustify',
          "fontSize", "checklist", "orderedList",
          "bulletList", "outdent", "indent", "insertDivider", "insertImage", "undo", "redo", "clear"
        ],
        richText: '',
        isShowEditor: false,
        ishowopen:false,
      }
    },
    onLoad(e) {
      console.log(e);
      if (e.id == 7) {
        wx.setNavigationBarTitle({
          title: '机构荣誉'
        })
      }
    },
    mounted() {
      this.richText = wx.getStorageSync('editOperator');
      this.type = this.$root.$mp.query.type || '';
      this.websiteId = wx.getStorageSync('websiteId') || 0;
      wx.setNavigationBarTitle({
        title: this.title[this.type]
      });

      this.$nextTick(() => {
        this.isShowEditor = true;
      })
    },
    onUnload() {
      this.isShowEditor = false;
    },
    methods: {
      async save() {
        let result = await this.$refs.rich.getContents();
        result = result.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block" ');

        if (this.type == 'prod' || this.type == 'article') {
          wx.setStorageSync('editOperator', result);
          wx.showLoading();
          setTimeout(function() {
            wx.hideLoading();
            wx.navigateBack();
          }, 600);
        } else {
          wx.showLoading();
          let params = {};
          params[this.type] = result;
          params.websiteId = this.websiteId;
          WXAJAX.POST(params, '', '/company/addWebsiteInfo').then((data) => {

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
            console.log(err)
            wx.showToast({
              title: err.message,
              duration: 2000,
              icon: 'none'
            });
          });
        }
      },
      getactive(){
       this.ishowopen=!this.ishowopen
      },
      // 页面跳转
      toaddcom(){
        uni.navigateTo({
        	url: '../companyPack/editorialzation/editorialzation'
        })
      },
      toeditdecom(){
        uni.navigateTo({
        	url: '../companyPack/editorialzation/editorialzation'
        })
      },
    }
  }
</script>

<style>
  .top {
  	position: absolute;
  	top: 0rpx;
  }

  .vam {
  	/* vertical-align:text-top; */
  	vertical-align: middle;
  }

  .ml-120 {
  	margin-left: -120rpx;
  }

  .arr {
  	margin-left: 75rpx;
  }

  .w144 {
  	width: 288rpx;
  }

  .w77 {
  	width: 154rpx;
  }

  .h75 {
  	height: 150rpx;
  }

  .time {
  	color: rgba(139, 139, 139, 100)
  }
  .wrap {
  	box-shadow: 0px 2px 6px 0px rgba(167, 225, 221, 100);
  	border: 1px solid rgba(255, 255, 255, 100);
  }

  .mt36 {
  	margin-top: 72rpx;
  }

  .mr45 {
  	margin-right: 45rpx;
  }

  #id {
  	border-radius: 28rpx;
  }

  .br14 {
  	border-radius: 28rpx;
  }

  .w237 {
  	width: 474rpx;
  }

  .box {
  	box-shadow: 0px 4rpx 12rpx 0px rgba(196, 241, 238, 100);
  }
  .spot{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .frame{
    /* width: 100%; */
    /* height: 100rpx; */
    margin-top: 20rpx;
    display: flex;
    flex-direction: column;
    margin-left: 20rpx;
    margin-right: 20rpx;
  }
  .editdelete{
   background-color:#FFFFFF;
   border: 2rpx solid #00D7D0;
   font-size: 40rpx;
   text-align: center;
   border-radius: 12rpx;
   margin-bottom: 20rpx;
  }
  .addcomintr{
    width: 100%;
    height: 80rpx;
    background-color: #00D7D0;
    color: #FFFFFF;
    font-size: 36rpx;
    text-align: center;
    line-height: 80rpx;
    position: fixed;
    bottom: 0;
  }
</style>
