<template>
  <div class="ariticle-detail" style="height: 100vh;overflow-y: auto;" >
    <p class="pt15 fbold fs18 c38 pl15 pr27 bgfff">{{title}}</p>
    <div class="px15 dec">
      <div class="left-dec">
        <span>
          {{companyName}}
        </span>
        <span style="margin-left: 20upx;">
          {{time}}
        </span>
      </div>
      <view class="right-dec" @click="addTypeShow = true">
        操作
      </view>
    </div>

    <div id="bodytop" class="centent">
      <div class="bgfff pt20 pl15 pr15 pb10" v-if="webViewSrc == ''">
        <img :src="v"
             alt=""
             v-for="(v,k) in photos"
             mode="widthFix"
             :key="k"
             class="w100p">
      </div>
        <rich-text :nodes='details'></rich-text>
    </div>
		
		<!-- @choose_top 删除事件 -->
    <SelectorOne v-if="addTypeShow"
                 :status="addTypeShow"
                 :allClass="addTypes"
                 @closeModal="addTypeShow = !addTypeShow"
                 @choose_tap="choose_tap"> 
    </SelectorOne>
	
    <!-- <div class="bgfff pt20 pl15 pr15 pb10 main-box" v-else>
        <button class="more-btn"
                @click="goPage">
          点击查看更
        </button>
    </div>
    -->
    <!-- 分享弹窗 -->
    <!--     <cover-view class="w100p h100p prod_choose_class borderbox disflex column-reverse"
      :class="isShowShare ? 'show' : '' "
      @click.stop="isShowShare = false">
      <cover-view class="bgfff inner textc lh44">
        <cover-view class="share-box">
           <button style="margin-right: 136.5upx;margin-left: 0;background: #fff;" open-type="share">
            <cover-image class="share-img" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/weixin_share.png"></cover-image>
            <cover-view class="share-title">微信好友</cover-view>
           </button>
           <cover-view style="margin-left: 136.5upx;">
            <cover-image class="share-img" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/weixin_share2.png"></cover-image>
            <cover-view class="share-title">名片海报</cover-view>
           </cover-view>
        </cover-view>
        <cover-view class="share-ornament"></cover-view>
        <cover-view class="fs16 c38 lh44"  @click.stop="isShowShare = false">
            取消
        </cover-view>
      </cover-view>
    </cover-view> -->

    <!-- <div id="navbottom" class="share-btn" @click="confirm">立即分享</div> -->
    <!-- <button class="share-btn"  open-type="share">立即分享</button> -->
    <button class="share-btn" @click="toShare()">立即分享</button>

    <SHARE v-if="share==true"
           :dynamicId="dynamicId"
           :companyId="companyId"
           saveType='1'
           type='1'
           @closeShare="closeShare"
           ></SHARE>
    <div class="mask" v-if="maskShow" @click="mask_tag">
      <div class="mask-box" @click.stop="mask_tag_stop">
        <div class="mask-box-top">
           <image class="" :src="styleImg"></image>
           <p class="mb10">进入客服会话，</p>
           <p>回复“1”即可获取并分享文章</p>
        </div>
        <div class="mask-box-bottom">
           <div class="mask-cancel ca8" @click="mask_cancel">取消</div>
           <!-- <button class="mask-confirm bgblue cfff">立即进入</div> -->
           <button open-type="contact" @contact="contact_tag" class="mask-confirm bgblue cfff">立即进入</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SHARE from '@/components/share' //分享
import WXAJAX from '../../../utils/request';
import BottomButtonSmall from '../../../components/bottom_button_small'; 
import SelectorOne from "../../..//components/selectorOne";
import util from '../../..//utils/index';

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
const isUrl = path => reg.test(path);

export default {
  components: { BottomButtonSmall, SelectorOne, SHARE },
  data() {
    return {
      webViewSrc: '',
      dynamicId: 98,

      addTypeShow: false,
      addTypes: [

        { name: "修改", id: "edit" },
        { name: "删除", id: "delete" },
        // { name: "导出分享记录", id: "exportShare" },
        // { name: "导出阅读记录", id: "exportRead" }

        // { name: "取消", id: "cancel" }
      ],
      styleImg: WXAJAX.imgBackUrl  + '/marketing/img_IM%402x.png',
      title: '',
      companyName: '',
      time: '',
      details: '',
      photos: [],

      isShowShare: true,
      maskShow:false,
      userId:wx.getStorageSync('userId'),
      companyId:wx.getStorageSync('COMPANYID'),
      contact:'',
      readstarttime:'',//阅读开始时间
      readendtime:'',//阅读结束时间
      bodyheight:'',//文章的高度
      bodytop:'',//文章的上边界坐标
      scrollTop:'',//当前滑动距离顶部尺寸
      ksqyheight:'',//文章高度
      navbottomheight:'',//文章底部菜单
      share:false,
    }
  },
  watch:{
    contact(newVal,old){
      if(this.contact == 1){
        wx.redirectTo({
          url:'../companyPack/shareRecord/main'
        })
      }
    }
  },
  async onShareAppMessage() {
    var params={
      dynamicId:this.dynamicId,
      shareSource:2,
    }
    var sharedata = await WXAJAX.POST(params , '', '/share/record/add','','',1);
    return {
      title: this.title,
      path: '/pages/article/dynamicDetail/main?dynamicId='+this.dynamicId+'&shareId='+sharedata.shareId+'&fromUserId='+sharedata.fromUserId,
      imageUrl:this.photos[0],
      success: () => {
        uni.showToast({
          title: '分享成功',
          icon: 'none'
        })
      }
    }

  },
  async onLoad() {
    let that = this
    // wx.downloadFile({
    //       url: 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/one-stand/other/20210422/82b56a4b3b0ab9b3634b290d5f98a44a.pdf' ,
    //       success: function (res) {
    //         console.log('文件阅读地址',res)
    //         var Path = res.tempFilePath              //返回的文件临时地址，用于后面打开本地预览所用
    //         wx.openDocument({
    //           filePath: Path,
    //           success: function (res) {
    //             console.log('打开成功');
    //           }
    //         })
    //       },
    //       fail: function (res) {
    //         console.log(res);
    //       }
    //     })
    this.dynamicId = this.$root.$mp.query.id
    const result = await this.getInits()
    console.log(result)

    if (isUrl(result.details)) {
      this.webViewSrc = result.details
    } else {

      let content = result.details;
      this.details = this.formatRichText(content)
    }
    this.title = result.title || ''
    this.companyName = result.originAuthor
    this.time = this.getDateConversion(result.createTime)
    this.time = util.getdate(result.createTime, 'dateTime')
    this.photos = result.photos.split(',')

    let timer1 = setTimeout(function(){
          console.log(23)
          clearTimeout(timer1)
          uni.getSystemInfo({
              success: function (res) {
                  console.log('可使用窗口高度',res.windowHeight);
                  that.ksqyheight = res.windowHeight
              }
          });
          const query = uni.createSelectorQuery().in(that);
                  query.select('#bodytop').boundingClientRect(rect => {
                    console.log('rect',rect)
                    let hei =rect.height// 节点的高度
                    let top =rect.top// 节点的上边界距离顶部距离
                    that.bodyheight = hei
                    that.bodytop = top
                    console.log('bodyheight',that.bodyheight)
                  }).exec();

                  query.select('#navbottom').boundingClientRect(rect => {
                    console.log('rect',rect)
                    let hei =rect.height// 节点的上边界距离顶部距离
                    that.navbottomheight = hei
                    console.log('navbottomheight',that.navbottomheight)
                  }).exec();
                }, 200);
  },
  onShow(){
    this.readstarttime  = new Date()
  },
  onUnload: function() {
     console.log(2)
     this.readtime()//退出页面发送阅读时间
   },
   onHide(){
     this.readtime()//退出页面发送阅读时间
   },
  methods: {
    toShare(){
      this.share=true;
    },
    closeShare(){
      this.share=false;
    },
    readtime(){//退出页面发送阅读时间
    let that = this
    console.log('屏幕高度',that.ksqyheight)
    console.log('底部导航栏',that.navbottomheight)
    console.log('底部导航栏',that.bodytop)
    //屏幕高度-底部导航栏+当前浏览顶部-文章顶部导航栏/文章总高度
    // console.log('文章高度',(that.ksqyheight-that.navbottomheight+that.scrollTop-that.bodytop)/that.bodyheight*100)
      function baifenbi(){
        let num =  (that.ksqyheight-that.navbottomheight+that.scrollTop-that.bodytop)/that.bodyheight*100;
        if(num>=100){
          return 100
        }else if(num<=0){
          return 0
        }else{
          return parseInt(num)
          }
      }
      console.log('当前文章阅读百分比',baifenbi())
      {//发送阅读时间
        that.readendtime  = new Date()
        let {dynamicId,score,readType} = that
        let readTime = that.readendtime - that.readstarttime

        // WXAJAX.POST({
        //   readRatio:baifenbi(),
        //         dynamicId,
        //         answerScore:score,//
        //         readTime,
        //         readType:1,//0_直接阅读 1_站内分享阅读；2_站外分享阅读"
        //       }, '', '/reader/bill/add','','',1).then((data) => {
        //         wx.hideLoading();
        //       }).catch((err) => {
        //         console.log(err);
        //         wx.hideLoading();
        //       });

      }
      {//
        console.log('距离顶部的距离1',)

      }

      // let s = time / 1000
      // let m = time / 1000 / 60
      // let d = time / 1000 / 60 / 60
      // let cnm = time / 1000 / 60 / 60 / 24
      // console.log('时间戳时间差',time)
      // console.log('天',parseInt(cnm))
      // console.log('时',parseInt(d))
      // console.log('分',parseInt(m))
      // console.log('秒',parseInt(s))
      // clearInterval(this.timer);
    },
    getInits() {
      // return WXAJAX.POST({
      //   dynamicId: this.dynamicId,
      // }, '', '/company/getDynamicDetail')
      return WXAJAX.POST({
        dynamicId: this.dynamicId,
        isAddReadNum:0,
      }, '', '/dynamic/getDynamicDetail','','',1)
    },
    //  删除
    choose_tap(id) {
      if (id === 'cancel') {
        this.addTypeShow = false;
        return;
      }else if(id === 'edit'){
        this.addTypeShow = false;
        wx.navigateTo({
			
          url:'../editArticle/main?dynamicId=' + this.dynamicId
        })
      }else if(id === 'exportShare'){
        this.addTypeShow = false;
        let that=this

        let params={};
        params={
          companyId:wx.getStorageSync('companyId'),
          dynamicId:this.dynamicId,
        };
        let url="/share/queryMyDynamicShareRecordListExport"
          WXAJAX.POST(params, '', url,'','',1).then(data => {
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
                  fileType: 'xlsx',
                  success: function (res) {
                    console.log('打开文档成功')
                  }
                })
              }
            })
        })
      }else if(id === 'exportRead'){
        wx.showLoading();
          // wx.hideLoading();
        // if(this.status==2){
        console.log({
            srcPath:'http://test1.mingyicloud.com/card/readList.html?token='+wx.getStorageSync('token')+'&companyId='+wx.getStorageSync('COMPANYID')+'&dynamicId='+this.dynamicId,
            destPath:'1.pdf',
          })
          // wx.hideLoading();
          // return ;
          WXAJAX.POST({
            srcPath:'http://test1.mingyicloud.com/card/readList.html?token='+wx.getStorageSync('token')+'&companyId='+wx.getStorageSync('COMPANYID')+'&dynamicId='+this.dynamicId,
            destPath:'1.pdf',
          }, '', '/htmlToPdf/htmlToPdf','','',1).then(data => {
            wx.downloadFile({
              url: data, //仅为示例，并非真实的资源
              success (res) {
                wx.hideLoading();
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
      }else{
        wx.showLoading();

        WXAJAX.POST({
          dynamicId: this.dynamicId,
        }, '', '/company/delDynamicInfo').then((data) => {
          wx.hideLoading();
          wx.showToast({
            title: '删除成功！',
            icon: 'success'
          });
		  // 600毫秒之后返回上一页面
          setTimeout(function () {
            wx.navigateBack();
          }, 600);
        }).catch((err) => {
          console.log(err);
          wx.hideLoading();
        });
      }

    },
    getAddShareRecordData(){
      WXAJAX.POST({
        companyId:this.companyId,
        dynamicId: this.dynamicId,
        userId:this.userId,
        type:1
      }, '', '/customerEssay/addShareRecordData')
      .then((data) => {
        wx.hideLoading();

      }).catch((err) => {
        console.log(err);
        wx.hideLoading();
      });
    },
    mask_tag(){
      this.maskShow = false
    },
    mask_cancel(){
      this.maskShow = false
    },
    confirm(){
       this.maskShow = true
       this.getAddShareRecordData()
    },
    formatRichText(html){
      let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
          match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
          match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
          match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
          return match;
      });
      newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
          match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
          return match;
      });
      newContent = newContent.replace(/<br[^>]*\/>/gi, '');
      newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
      return newContent;
    },
    goPage() {
      uni.navigateTo({
        url: `./webView?url=${this.webViewSrc}`
      })
    },
    contact_tag(){
      this.contact = 1
    },
    //解决ios时间格式兼容问题
    getDateConversion (time) {
       console.log(time)
      // 页面解析过程中,先解析得到DOM,但尚未获取数据,所以dom中的formate解析的值为undefined.
      // 需要在解析的开始时,进行判断:数据接口获取的time时间格式为字符串,所以time的类型作为条件来判断
      if (typeof time !== 'string') {
        return ' ' // 如果不符合条件,则返回空
      }
      let time1 = new Date(time.replace(/-/g, '/').replace('T', ' ')).toISOString() // 转为国际标准化时间
      let time2 = time1.split('T')[0]
      let time3 = time2.replace('-', '/')
      let time4 = time3.replace('-', '/')
      return time4
    }
  }
}
</script>
<style scoped>
page {
  width: 100%;
  background: #fff !important;
}
.ariticle-detail{
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 750upx;
}
.dec {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30upx;
  padding-bottom: 40upx;
  border-bottom: 1upx solid #e8e8e8;
}
.left-dec {
  font-size: 24upx;
  color: #a8a8a8;
}
.main-box {
  background-image: url('https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/detail_img.png');
  background-size:cover;
  background-position: center center;
  height: 100vh;
}
.right-dec {
  font-size: 24upx;
  color: rgba(86, 108, 132, 1);
  z-index: 1000;
}
.prod_choose_class {
  position: fixed;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  bottom: -100%;
  transition: 0.2s;
}
.more-btn {
  margin-top: 80upx;
  width: 240upx;
  border: 1upx solid rgba(81, 203, 205, 1);
  border-radius: 10upx;
  color: rgba(81, 203, 205, 1);
  font-size: 28upx;
}
.prod_choose_class.show {
  bottom: 0;
}

.prod_choose_class .inner {
  border-radius: 10upx 10upx 0 0;
}
.share-box {
  display: flex;
  justify-content: center;
  margin-top: 20upx;
  margin-bottom: 30upx;
}
.share-img {
  width: 100upx;
  height: 100upx;
}
.share-title {
  font-size: 24upx;
  color: #a8a8a8;
  /* line-height:14upx; */
}
.centent{
  flex: 1;
  overflow: auto;
  width: 100%;
}
.centent image{

}
.centent img{
  max-width: 690upx;
}
.share-btn{
  width: 100%;
  height: 98upx;
  background: linear-gradient(to right, #76dad9, #51cdcc);
  color: #FFFFFF;
  font-size: 36upx;
  text-align: center;
  line-height: 98upx;
}
.mask{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.mask-box{
  width: 580upx;
  background: #FFFFFF;
  border-radius: 10upx;
}
.mask-box-top{
  box-sizing: border-box;
  width: 100%;
  height: 465upx;
  padding: 50upx 50upx 0 50upx;
  text-align: center;
  color:#787878;
}
.mask-box-top image{
  height: 258upx;
  width: 480upx;
  margin-bottom: 27upx;
}
.mask-box-bottom{
  display: flex;
}
.mask-cancel{
  width: 50%;
  height: 100%;
  font-size: 36upx;
  text-align: center;
  line-height: 88upx;
  border-bottom-left-radius: 10upx;
  border-top:1upx solid #D6D6D7;
}
.mask-confirm{
  width: 50%;
  height: 100%;
  font-size: 36upx;
  text-align: center;
  border-bottom-right-radius: 10upx;
}
.end-task{
    height:88upx;
    border-radius: 10upx;
    text-align: center;
    line-height: 88upx;
    font-size: 36upx;
    color: #FFFFFF;
    background:linear-gradient(90deg,#41DDA1,#2BCF88)
  }
rich-text{
  width: 750upx;
  overflow: hidden;
}

</style>
