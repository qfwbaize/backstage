<template>
    <div class="img-box">
      <div class="disflex jsbet w290 ml20">
        <div class="disflex fs14 mt15">
          <img class="w18 h18" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/md-cloud_upload@1x.png" alt="">
          阅读奖励
        </div>
        <div>
          <switch style="zoom: 0.8;" :checked="checked" @change="readrewardflag"/>
        </div>
      </div>
      <div v-if="readRewardFlag == 1" class="fs12" style="margin-left: 30rpx;margin-right: 30rpx">
        <div class="disflex jsbet align-cen">
          <label for="readAwardTotalAmount"
                 class="marks pr15">阅读奖金池总金额</label>
          <input type="number"
                 id="readAwardTotalAmount"
                 class="pha8 textr h49"
                 v-model="readAwardTotalAmount"
                 placeholder="金额">
        </div>
        <div class="disflex jsbet align-cen">
          <label for="lowestReadTime"
                 class="marks pr15">最低阅读时间（秒）</label>
          <input type="number"
                 id="lowestReadTime"
                 class="pha8 textr h49"
                 v-model="lowestReadTime"
                 placeholder="时间">
        </div>
        <div class="disflex jsbet align-cen">
          <label for="readRewardAmount"
                 class="marks pr15">阅读奖励金额</label>
          <input type="number"
                 id="readRewardAmount"
                 class="pha8 textr h49"
                 v-model="readRewardAmount"
                 placeholder="金额">
        </div>
        <div class="disflex jsbet align-cen">
          <label for="rewardIntervalFlag"
                 class="pr15">奖励区间</label>
          <switch id="rewardIntervalFlag" style="zoom: 0.8;" :checked="checked" @change="rewardintervalflag"/>
        </div>

        <div v-if="rewardIntervalFlag == 1">
          <div class="disflex jsbet align-cen">
            <label for="lowestReadRewardAmount"
                   class="marks pr15">最低阅读奖励</label>
            <input type="number"
                   id="lowestReadRewardAmount"
                   class="pha8 textr h49"
                   v-model="lowestReadRewardAmount"
                   placeholder="金额">
          </div>
          <div class="disflex jsbet align-cen">
            <label for="highestReadRewardAmount"
                   class="marks pr15">最高阅读奖励</label>
            <input type="number"
                   id="highestReadRewardAmount"
                   class="pha8 textr h49"
                   v-model="highestReadRewardAmount"
                   placeholder="金额">
          </div>
        </div>
        <!-- 暂时隐藏 -->
        <div class="disflex jsbet align-cen">
          <label for="answerFlag"
                 class="pr15">是否答题</label>
          <switch id="answerFlag" style="zoom: 0.8;" :checked="checked" @change="answerflag"/>
        </div>
        <div v-if="answerFlag == 1">
          <div class="disflex jsbet align-cen">
            <label for="lowestAnswerScore"
                   class="marks pr15">最低答题得分</label>
            <input type="number"
                   id="lowestAnswerScore"
                   class="pha8 textr h49"
                   v-model="lowestAnswerScore"
                   placeholder="分数">
          </div>
          <div class="disflex jsbet align-cen">
            <label for="answerRewardAmount"
                   class="marks pr15">答题奖励金额</label>
            <input type="number"
                   id="answerRewardAmount"
                   class="pha8 textr h49"
                   v-model="answerRewardAmount"
                   placeholder="金额">
          </div>
        </div>
      </div>

      <div class="disflex jsbet w290 ml20">
        <div class="disflex fs14 mt15">
          <img class="w18 h18" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/md-cloud_upload@1x.png" alt="">
          分享奖励
        </div>
        <div>
          <switch style="zoom: 0.8;" :checked="checked" @change="sharerewardflag"/>
        </div>
      </div>
      <div v-if="shareRewardFlag == 1" class="fs12" style="margin-left: 30rpx;margin-right: 30rpx;">
        <div class="disflex jsbet align-cen">
          <label for="sharePrizePool"
                 class="marks pr15">分享奖金池总金额</label>
          <input type="number"
                 id="sharePrizePool"
                 class="pha8 textr h49"
                 v-model="sharePrizePool"
                 placeholder="金额">
        </div>
        <div class="disflex jsbet align-cen">
          <label for="singleShareReward"
                 class="marks pr15">单人分享奖励</label>
          <input type="number"
                 id="singleShareReward"
                 class="pha8 textr h49"
                 v-model="singleShareReward"
                 placeholder="金额">
        </div>
      </div>

      <div class="disflex jsbet w290 ml20">
        <div class="disflex fs14 mt15">
          <img class="w18 h18" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/spread/md-cloud_upload@1x.png" alt="">
          推效奖励
        </div>
        <div>
          <switch style="zoom: 0.8;" :checked="checked" @change="pusheffectflag"/>
        </div>
      </div>
      <div v-if="pushEffectFlag == 1" class="fs12" style="margin-bottom: 200rpx;margin-left: 30rpx;margin-right: 30rpx;">
        <div class="disflex jsbet align-cen">
          <label for="pushEffectAwardTotalAmount"
                 class="marks pr15">推效奖金池总金额</label>
          <input type="number"
                 id="pushEffectAwardTotalAmount"
                 class="pha8 textr h49"
                 v-model="pushEffectAwardTotalAmount"
                 placeholder="金额">
        </div>

        <div class="disflex jsbet align-cen">
          <label for="push_lowestReadTime"
                 class="marks pr15">最低阅读时间（秒）</label>
          <input type="number"
                 id="push_lowestReadTime"
                 class="pha8 textr h49"
                 v-model="push_lowestReadTime"
                 placeholder="时间">
        </div>

        <div class="disflex jsbet align-cen">
          <label for="pushEffectRewardAmount"
                 class="marks pr15">推效奖励金额</label>
          <input type="number"
                 id="pushEffectRewardAmount"
                 class="pha8 textr h49"
                 v-model="pushEffectRewardAmount"
                 placeholder="金额">
        </div>

        <!-- 暂时隐藏 -->
        <div class="disflex jsbet align-cen">
          <label for="push_answerFlag"
                 class="fbold pr15">是否答题</label>
          <switch id="push_answerFlag" style="zoom: 0.8;" :checked="checked" @change="push_answerflag"/>
        </div>
        <div v-if="push_answerFlag == 1">
          <div class="disflex jsbet align-cen">
            <label for="push_lowestAnswerScore"
                   class="marks pr15">最低答题得分</label>
            <input type="number"
                   id="push_lowestAnswerScore"
                   class="pha8 textr h49"
                   v-model="push_lowestAnswerScore"
                   placeholder="分数">
          </div>
        </div>
      </div>
      <BottomButtonSmall :text="'完成设置并转发'" @btn_tap="toShare" />

      <SHARETO v-if="share"
             :dynamicId="dynamicId"
             :companyId="companyId"
             saveType='1'
             @closeShare="closeShare"
             @save="save"
             ></SHARETO>
  </div>
</template>

<script>
import SHARETO from '@/components/shareTo' //
import BottomButtonSmall from "@/components/bottom_button_small";
import mySwitch from "@/components/switch";
import WXAJAX from "@/utils/request";
import util from "@/utils/index";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { BottomButtonSmall, mySwitch, SHARETO },
  data() {
    return {
      inputValue: "",
      isBoss:wx.getStorageSync('isBoss'),
      imgUrl: "https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/icon_add.png",
      items: [
        false,
        false
      ],
      // 阅读
      readRewardFlag:'',
      readAwardTotalAmount:'',
      lowestReadTime:'',
      readRewardAmount:'',
      rewardIntervalFlag:'',
      lowestReadRewardAmount:'',
      highestReadRewardAmount:'',
      answerFlag:'',
      lowestAnswerScore:'',
      answerRewardAmount:'',

      //分享
      shareRewardFlag:'',
      sharePrizePool:'',
      singleShareReward:'',

      //推效
      pushEffectFlag:'',
      pushEffectAwardTotalAmount:'',
      push_lowestReadTime:'',
      pushEffectRewardAmount:'',
      push_answerFlag:'',
      push_lowestAnswerScore:'',

      type:'add',//类型：add新增、edit编辑
      dynamicId:0,//文章id
      companyId:wx.getStorageSync('COMPANYID'),

      share:false,
      shareType:'',
      checked:false,
      title:'',
      photos:'',
      videoId:'',
      fileId:'',

    };
  },
  computed: {
    ...mapGetters(["article"])
  },
  async onShareAppMessage(e) {

    wx.showLoading();
    let shareId = '';
    var that = this

    await this.edit();

    var sharedata =await WXAJAX.POST({//添加分享记录
        dynamicId: that.dynamicId,
        shareSource:1,
    }, '', '/share/record/add','','',1)
    let path = '/pages/companyPack/find/dynamicDetail/main?dynamicId=' + that.dynamicId + '&companyId=' + wx.getStorageSync('COMPANYID') + '&cardId=' + wx.getStorageSync('cardId') + '&goType=1' + '&shareId=' + sharedata.shareId;
    if(this.fileId){
      path = '/pages/companyPack/library/details?dynamicId=' + that.dynamicId + '&companyId=' + wx.getStorageSync('COMPANYID') + '&cardId=' + wx.getStorageSync('cardId') + '&goType=1' + '&shareId=' + sharedata.shareId;
    }
    if(this.videoId){
      path = '/pages/companyPack/videodetails/videodetails?dynamicId=' + that.dynamicId + '&companyId=' + wx.getStorageSync('COMPANYID') + '&cardId=' + wx.getStorageSync('cardId') + '&goType=1' + '&shareId=' + sharedata.shareId+ '&videoId=' + this.videoId;
    }
    console.log("path",path);
    wx.hideLoading();
    return {
      imageUrl: this.photos,
      title: this.title,
      path,
      success(e) {
        that.share = false;
        // wx.showShareMenu({
        //   withShareTicket: true
        // })
      },
      fail(e) {
        console.log('失败-- ', e);
      }
    }

  },
  onLoad(option){
    if(option.dynamicId){
      this.dynamicId=option.dynamicId
      this.type='edit'
      wx.setNavigationBarTitle({
        title: "编辑文章"
      });
    }
    if(option.fileId&&option.fileId!='null'){
      this.fileId=option.fileId
    }
    if(option.videoId&&option.videoId!='null'){
      this.videoId=option.videoId;
    }
  },
  onShow() {
    this.saveType = this.$root.$mp.query.saveType || 1;
  },

  methods: {
    toShare() {
      let that=this;

      if(this.videoId!=''){
        WXAJAX.POST({
        	videoId: this.videoId,
        }, '', '/shortVideo/copy').then((data) => {
        	if (data) {
            that.videoId=data.videoId;
            that.dynamicId=data.dynamicId;
            that.title=data.title;
            that.photos=data.coverImg;
        		// console.log('接口', data)
        	}
        })
      }else{
        WXAJAX.POST({
          dynamicId: this.dynamicId,
        }, '', '/dynamic/copyDynamicInfo','','',1).then((data) => {
          that.dynamicId=data.dynamicId;
          that.title=data.title;
          data.photos = data.photos ? data.photos.split(',') : [];
          that.photos=data.photos[0];
        })
      }

      this.share = true;

    },
    closeShare() {
      this.share = false;
    },
    switchchange(checked,shareType){

      this.shareType=shareType
      this.checked=checked

      if(this.shareType=='1'&&this.checked){
        this.readRewardFlag=1;
      }else if(this.shareType=='1'&&!this.checked){
        this.readRewardFlag=0;
      }

      if(this.shareType=='2'&&this.checked){
        this.shareRewardFlag=1;
      }else if(this.shareType=='2'&&!this.checked){
        this.shareRewardFlag=0;
      }
      if(this.shareType=='3'&&this.checked){
        this.pushEffectFlag=1;
      }else if(this.shareType=='3'&&!this.checked){
        this.pushEffectFlag=0;
      }
    },
    // 发布
    async save(jumpUrl,query) {
      this.share = false;
      await this.edit();
      wx.navigateTo({ url:  jumpUrl + query });
      // wx.navigateTo({ url: "../" + jumpUrl + "/main" + query });
      wx.setStorageSync('choose_essayType' , '');
    },
    async edit(){
      console.log("阅读",this.readRewardFlag,this.readAwardTotalAmount);
      if(this.readRewardFlag==1){
        if(this.readAwardTotalAmount<=0){
          wx.showToast({
            title: "阅读奖金池总金额必须大于0！",
            icon: "none",
            duration: 2000
          });
          return ;
        }
        if(this.readRewardAmount<=0){
          wx.showToast({
            title: "阅读奖励金额必须大于0！",
            icon: "none",
            duration: 2000
          });
          return ;
        }
        if(parseInt(this.readRewardAmount) > parseInt(this.readAwardTotalAmount)){
          wx.showToast({
            title: "阅读奖金池总金额必须大于阅读奖励金额！",
            icon: "none",
            duration: 2000
          });
          return ;
        }
      }
      if(this.shareRewardFlag==1){
        if(this.sharePrizePool<=0){
          wx.showToast({
            title: "分享奖金池总金额必须大于0！",
            icon: "none",
            duration: 2000
          });
          return ;
        }
        if(this.singleShareReward<=0){
          wx.showToast({
            title: "单人分享奖励金额必须大于0！",
            icon: "none",
            duration: 2000
          });
          return ;
        }
        if( parseInt(this.sharePrizePool) < parseInt(this.singleShareReward)){
          wx.showToast({
            title: "分享奖金池总金额必须大于单人分享奖励金额！",
            icon: "none",
            duration: 2000
          });
          return ;
        }
      }
      if(this.pushEffectFlag==1){
        if(this.pushEffectAwardTotalAmount<=0){
          wx.showToast({
            title: "推效奖金池总金额必须大于0！",
            icon: "none",
            duration: 2000
          });
          return ;
        }
        if(this.pushEffectRewardAmount<=0){
          wx.showToast({
            title: "推效奖励金额必须大于0！",
            icon: "none",
            duration: 2000
          });
          return ;
        }
        if( parseInt(this.pushEffectAwardTotalAmount) < parseInt(this.pushEffectRewardAmount)){
          wx.showToast({
            title: "推效奖金池总金额必须大于推效奖励金额！",
            icon: "none",
            duration: 2000
          });
          return ;
        }
      }
      let data = {
            title:this.title,
            isDrafts:0,
            settingInfo: {
                copyFlag: 0,
                topFlag: 0,
                rewardFlag: 0,
                chargeFlag: 0,
                readRewardFlag: this.readRewardFlag || 0,
                shareRewardFlag: this.shareRewardFlag || 0,
                offerRewardFlag: 0,
                pushEffectFlag: this.pushEffectFlag || 0,
            },
            offerReward: {
                offerRewardPrizePool: '',
                cascadeFlag: 0,
                lowestReaderNum: '',
                lowestReadTime: '',
                offerRewardAmount: '',
                answerFlag: 0,
                lowestAnswerNum: '',
                lowestAnswerScore: '',
                offerRewardAnswerAmount: '',
            },
            share: {
                sharePrizePool: this.sharePrizePool || 0,
                singleShareReward: this.singleShareReward || 0,
                readFlag: 0,
                lowestReadTime: 0,
                readRewardAmount: 0,
                answerFlag: 0,
                lowestAnswerScore: 0,
                answerRewardAmount: 0,
            },
            reward: {
                lowestRewardAmount: 0,
                highestRewardAmount: 0,
                rewardStartTime: 0,
                rewardEndTime: 0,
            },
            readReward: {
                readAwardTotalAmount: this.readAwardTotalAmount || 0,
                lowestReadTime: this.lowestReadTime || 0,
                readRewardAmount: this.readRewardAmount || 0,
                rewardIntervalFlag: this.rewardIntervalFlag || 0,
                lowestReadRewardAmount: this.lowestReadRewardAmount || 0,
                highestReadRewardAmount: this.highestReadRewardAmount || 0,
                answerFlag: this.answerFlag || 0,
                lowestAnswerScore: this.lowestAnswerScore || 0,
                answerRewardAmount: this.answerRewardAmount || 0,
            },
            pushEffectReward: {
                pushEffectAwardTotalAmount: this.pushEffectAwardTotalAmount || 0,
                lowestReadTime: this.push_lowestReadTime || 0,
                pushEffectRewardAmount: this.pushEffectRewardAmount || 0,
                answerFlag: this.push_answerFlag || 0,
                lowestAnswerScore: this.push_lowestAnswerScore || 0,
            },
            charge: {
                chargeAmount: '',
                chargeStartTime: '',
                chargeEndTime: '',
                dynamicRevealScale: '',
            }
      };

      uni.showLoading();
      let url='/dynamic/editDynamicInfo';
      data.dynamicId=this.dynamicId;
      console.log("data",data);
      await WXAJAX.POST(data, "", url,'','',1)
      .then(data => {
        uni.hideLoading();

      }).catch(err => {
        wx.showToast({
          title: err.message,
          duration: 2000,
          icon: "none"
        });
      });
    },
    toggle () {
        this.checked = !this.checked;
        this.$emit('change', this.checked);
    },
    change(value) {
      this.inputValue = value;
    },
    // 选择图片
    async selectImg() {
      let path = await util.chooseImage("file", 1);
      this.imgUrl = await this.uploadImg(path[0]);
    },
    uploadImg(path) {
      wx.showLoading({
        mask: true,
        title: "上传中"
      });
      return new Promise(resolve => {
        WXAJAX.UploadImage(path)
          .then(data => {
            wx.hideLoading();
            console.log(data);
            data = JSON.parse(data);
            if (data.code == "200") {
              resolve(WXAJAX.imgBackUrl + data.data + ".primary.png");
            } else {
              wx.showToast({
                title: "网络异常",
                duration: 2000,
                icon: "none"
              });
            }
          })
          .catch(() => {
            wx.hideLoading();
          })
          .then(url => url);
      });
    },
    radioChange(e){
        // console.log(e.detail.value)
      if(e.detail.value=='1'){
        this.readRewardFlag=1;
        this.shareRewardFlag=0;
        this.pushEffectFlag=0;
      }else if(e.detail.value=='2'){
        this.readRewardFlag=0;
        this.shareRewardFlag=1;
        this.pushEffectFlag=0;
      }else if(e.detail.value=='3'){
        this.readRewardFlag=0;
        this.shareRewardFlag=0;
        this.pushEffectFlag=1;
      }else{
        this.readRewardFlag=0;
        this.shareRewardFlag=0;
        this.pushEffectFlag=0;
      }
    },
    //阅读奖励
    readrewardflag(e) {
      if (e.detail.value){
        this.readRewardFlag=1;
      }else{
        this.readRewardFlag=0;
      }
    },
    //奖励区间
    rewardintervalflag(e){
      if (e.detail.value){
        this.rewardIntervalFlag=1;
      }else{
        this.rewardIntervalFlag=0;
      }
    },
    answerflag(e){
      if (e.detail.value){
        this.answerFlag=1;
      }else{
        this.answerFlag=0;
      }
    },
    sharerewardflag(e){
      if (this.shareRewardFlag==0){
        this.shareRewardFlag=1;
      }else{
        this.shareRewardFlag=0;
      }
    },
    pusheffectflag(e){
      if (this.pushEffectFlag==0){
        this.pushEffectFlag=1;
      }else{
        this.pushEffectFlag=0;
      }
    },
    readflag(e){
      if (e.detail.value){
        this.readFlag=1;
      }else{
        this.readFlag=0;
      }
    },
    share_answerflag(e){
      if (e.detail.value){
        this.share_answerFlag=1;
        wx.navigateTo({//分享答题设置
          url: "/pages/companyPack/topic/main?type=2"
        });
      }else{
        this.share_answerFlag=0;
      }
    },
    push_answerflag(e){
      if (e.detail.value){
        this.push_answerFlag=1;
      }else{
        this.push_answerFlag=0;
      }
    }
  }
};
</script>
<style>
.img-box {
  margin-top: 60upx;
  text-align: center;
}
.img-icon {
  width: 205upx;
  height: 205upx;
  border: 2upx dashed #e8e8e8;
  display: inline-block;
  border-radius: 10upx;
}
.img-title {
  font-size: 24upx;
  font-weight: 400;
  color: rgba(81, 205, 203, 1);
}
.img-h4 {
  font-size: 28upx;
  font-weight: 400;
  text-align: center;
  margin-top: 60upx;
  color: rgba(56, 56, 56, 1);
}
page {
  background: white;
}

.items div {
    height: 80rpx;
    margin-top: 40rpx;
    padding-left: 40rpx;
    line-height: 80rpx;
  }

  .active {
    background-color: #fff;
    font-size: bold;
  }

  .articleTitle {
    align-self: flex-start;
    width: 300rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    margin-right: -15rpx;
  }

  .Mask {
    position: absolute;
    top: 0rpx;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.38;
  }

  .shareDiv {
    position: absolute;
    bottom: 0rpx;
    width: 100%;
    height: 345rpx;
    background-color: white;
    border-top-left-radius: 40rpx;
    border-top-right-radius: 40rpx;
    z-index: 999;
  }
  .shareTo {
    margin-top: 77rpx;
  }
  .shareTo img {
    width: 60rpx;
    height: 60rpx;
    padding: 20rpx 25rpx;
    border-radius: 20rpx;
    margin-bottom: 5rpx;
  }

  .shareToTitle {
    margin-top: 40rpx;
    margin-left: 44rpx;
    font-size: 36rpx
  }

  .share-btn {
    position: absolute;
    bottom: 24rpx;
    opacity: 0;
  }

  .input {
    border: rgb(26, 208, 195) 1rpx solid;
    width: 200rpx;
    line-height: 50px;
    height: 50rpx;
    padding-left: 10rpx;
    border-radius: 10rpx;
  }

  .subject {
    border: solid;
    width: 670rpx;
    height: 424rpx;
    border-width: 1rpx;
    border-style: solid;
    border-radius: 12rpx;
    padding: 0rpx;
    text-align: center;
    position: relative;
  }

  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
</style>
