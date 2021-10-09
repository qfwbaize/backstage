<template>
  <div class="pb50">
    <div class="img-box">
      <div class="img-icon" @click="selectImg">
        <img
          :src="imgUrl"
          style="width: 40upx;height: 40upx;margin-top: 60upx"
          v-if="imgUrl === 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/icon_add.png'"
        />
        <p class="img-title" v-if="imgUrl === 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/icon_add.png'">
          选择封面
        </p>
        <img
          :src="imgUrl"
          style="max-width: 205upx;max-height: 205upx;"
          v-else
        />
      </div>
    </div>
    <h4 class="img-h4">来源</h4>
    <Inputs
      placeholder="请输入文章来源"
      :value="inputValue"
      @change="change"
    ></Inputs>

    <!--基本信息-->
    <div class="bgfff pl16 pr17 lh49 fs16 c38 mb11 info-form" v-if="type=='add'">
      <!-- <div class="disflex jsbet align-cen">
        <label for="username"
               class="fbold marks pr15">是否复制</label>
        <switch style="zoom: 0.8;" :checked="checked"/>
      </div>
      <div class="disflex jsbet align-cen">
        <label for="username"
               class="fbold marks pr15">是否置顶</label>
        <switch style="zoom: 0.8;" :checked="checked"/>
      </div> -->

      <div>

        <label class="fbold pr15">奖励:</label>
        <radio-group @change="radioChange($event)" style="font-size: 25rpx;">
          <label class="uni-list-cell mr10 uni-list-cell-pd">
            <radio :value="0" checked="true" color="#51CDCB" />无
          </label>
          <label class="uni-list-cell mr10 uni-list-cell-pd">
            <radio :value="1" color="#51CDCB" />阅读奖励
          </label>
          <label class="uni-list-cell mr10 uni-list-cell-pd">
            <radio :value="2" color="#51CDCB" />分享奖励
          </label>
          <label class="uni-list-cell mr10 uni-list-cell-pd">
            <radio :value="3" color="#51CDCB" />推效奖励
          </label>
        </radio-group>
      </div>
      <div v-if="readRewardFlag == 1" style="border: 1rpx solid #A9A9A9;padding: 10rpx;box-shadow: -1rpx -1rpx 1rpx -1rpx #A9A9A9;">
        <div class="disflex jsbet align-cen">
          <label for="readAwardTotalAmount"
                 class="fbold marks pr15">阅读奖金池总金额</label>
          <input type="number"
                 id="readAwardTotalAmount"
                 class="pha8 textr h49"
                 v-model="readAwardTotalAmount"
                 placeholder="金额">
        </div>
        <div class="disflex jsbet align-cen">
          <label for="lowestReadTime"
                 class="fbold marks pr15">最低阅读时间（秒）</label>
          <input type="number"
                 id="lowestReadTime"
                 class="pha8 textr h49"
                 v-model="lowestReadTime"
                 placeholder="时间">
        </div>
        <div class="disflex jsbet align-cen">
          <label for="readRewardAmount"
                 class="fbold marks pr15">阅读奖励金额</label>
          <input type="number"
                 id="readRewardAmount"
                 class="pha8 textr h49"
                 v-model="readRewardAmount"
                 placeholder="金额">
        </div>
        <div class="disflex jsbet align-cen">
          <label for="rewardIntervalFlag"
                 class="fbold pr15">奖励区间</label>
          <switch id="rewardIntervalFlag" style="zoom: 0.8;" :checked="checked" @change="rewardintervalflag"/>
        </div>

        <div v-if="rewardIntervalFlag == 1">
          <div class="disflex jsbet align-cen">
            <label for="lowestReadRewardAmount"
                   class="fbold marks pr15">最低阅读奖励</label>
            <input type="number"
                   id="lowestReadRewardAmount"
                   class="pha8 textr h49"
                   v-model="lowestReadRewardAmount"
                   placeholder="金额">
          </div>
          <div class="disflex jsbet align-cen">
            <label for="highestReadRewardAmount"
                   class="fbold marks pr15">最高阅读奖励</label>
            <input type="number"
                   id="highestReadRewardAmount"
                   class="pha8 textr h49"
                   v-model="highestReadRewardAmount"
                   placeholder="金额">
          </div>
        </div>
        <!-- 暂时隐藏 -->
        <!-- <div class="disflex jsbet align-cen">
          <label for="answerFlag"
                 class="fbold pr15">是否答题</label>
          <switch id="answerFlag" style="zoom: 0.8;" :checked="checked" @change="answerflag"/>
        </div> -->
        <div v-if="answerFlag == 1">
          <div class="disflex jsbet align-cen">
            <label for="lowestAnswerScore"
                   class="fbold marks pr15">最低答题得分</label>
            <input type="number"
                   id="lowestAnswerScore"
                   class="pha8 textr h49"
                   v-model="lowestAnswerScore"
                   placeholder="分数">
          </div>
          <div class="disflex jsbet align-cen">
            <label for="answerRewardAmount"
                   class="fbold marks pr15">答题奖励金额</label>
            <input type="number"
                   id="answerRewardAmount"
                   class="pha8 textr h49"
                   v-model="answerRewardAmount"
                   placeholder="金额">
          </div>
        </div>
      </div>
      <div v-if="shareRewardFlag == 1" style="border: 1rpx solid #A9A9A9;padding: 10rpx;box-shadow: -1rpx -1rpx 1rpx -1rpx #A9A9A9;">
        <div class="disflex jsbet align-cen">
          <label for="sharePrizePool"
                 class="fbold marks pr15">分享奖金池总金额</label>
          <input type="number"
                 id="sharePrizePool"
                 class="pha8 textr h49"
                 v-model="sharePrizePool"
                 placeholder="金额">
        </div>
        <div class="disflex jsbet align-cen">
          <label for="singleShareReward"
                 class="fbold marks pr15">单人分享奖励</label>
          <input type="number"
                 id="singleShareReward"
                 class="pha8 textr h49"
                 v-model="singleShareReward"
                 placeholder="金额">
        </div>
      </div>
      <div v-if="pushEffectFlag == 1" style="border: 1rpx solid #A9A9A9;padding: 10rpx;box-shadow: -1rpx -1rpx 1rpx -1rpx #A9A9A9;">
        <div class="disflex jsbet align-cen">
          <label for="pushEffectAwardTotalAmount"
                 class="fbold marks pr15">推效奖金池总金额</label>
          <input type="number"
                 id="pushEffectAwardTotalAmount"
                 class="pha8 textr h49"
                 v-model="pushEffectAwardTotalAmount"
                 placeholder="金额">
        </div>

        <div class="disflex jsbet align-cen">
          <label for="push_lowestReadTime"
                 class="fbold marks pr15">最低阅读时间（秒）</label>
          <input type="number"
                 id="push_lowestReadTime"
                 class="pha8 textr h49"
                 v-model="push_lowestReadTime"
                 placeholder="时间">
        </div>

        <div class="disflex jsbet align-cen">
          <label for="pushEffectRewardAmount"
                 class="fbold marks pr15">推效奖励金额</label>
          <input type="number"
                 id="pushEffectRewardAmount"
                 class="pha8 textr h49"
                 v-model="pushEffectRewardAmount"
                 placeholder="金额">
        </div>

        <!-- 暂时隐藏 -->
        <!-- <div class="disflex jsbet align-cen">
          <label for="push_answerFlag"
                 class="fbold pr15">是否答题</label>
          <switch id="push_answerFlag" style="zoom: 0.8;" :checked="checked" @change="push_answerflag"/>
        </div> -->
        <div v-if="push_answerFlag == 1">
          <div class="disflex jsbet align-cen">
            <label for="push_lowestAnswerScore"
                   class="fbold marks pr15">最低答题得分</label>
            <input type="number"
                   id="push_lowestAnswerScore"
                   class="pha8 textr h49"
                   v-model="push_lowestAnswerScore"
                   placeholder="分数">
          </div>
        </div>
      </div>
    </div>
    <BottomButtonSmall :text="'发布'" @btn_tap="save" />
  </div>
</template>

<script>
import BottomButtonSmall from "@/components/bottom_button_small";
import Inputs from "./components/Inputs";
import WXAJAX from "@/utils/request";
import util from "@/utils/index";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { BottomButtonSmall, Inputs },
  data() {
    return {
      inputValue: "",
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

    };
  },
  computed: {
    ...mapGetters(["article"])
  },
  onLoad(option){
    if(option.dynamicId){
      this.dynamicId=option.dynamicId
      this.type='edit'
      this.getdata();

      wx.setNavigationBarTitle({
        title: "编辑文章"
      });
    }
  },
  onShow() {
    this.saveType = this.$root.$mp.query.saveType || 1;
  },

  methods: {
    //获取数据
    getdata(){
      var that=this
      WXAJAX.POST({
        dynamicId: this.dynamicId,
      }, '', '/dynamic/getDynamicDetail','','',1).then((data) => {
        if(data){
          that.imgUrl=data.photos
          that.inputValue=data.essayTypeName

          // 阅读
          that.readRewardFlag = data.settingInfo.readRewardFlag
          that.readAwardTotalAmount = data.readReward.readAwardTotalAmount
          that.lowestReadTime = data.readReward.lowestReadTime
          that.readRewardAmount = data.readReward.readRewardAmount
          that.rewardIntervalFlag = data.readReward.rewardIntervalFlag
          that.lowestReadRewardAmount = data.readReward.lowestReadRewardAmount
          that.highestReadRewardAmount = ''
          that.answerFlag = data.readReward.answerFlag
          that.lowestAnswerScore = data.readReward.lowestAnswerScore
          that.answerRewardAmount = data.readReward.answerRewardAmount

          //分享
          that.shareRewardFlag = data.settingInfo.shareRewardFlag
          that.sharePrizePool = data.share.sharePrizePool
          that.singleShareReward = data.share.singleShareReward

          //推效
          that.pushEffectFlag = data.settingInfo.pushEffectFlag
          that.pushEffectAwardTotalAmount = data.pushEffectReward.pushEffectAwardTotalAmount
          that.push_lowestReadTime = data.pushEffectReward.lowestReadTime
          that.pushEffectRewardAmount = data.pushEffectReward.pushEffectRewardAmount
          that.push_answerFlag = data.pushEffectReward.answerFlag
          that.push_lowestAnswerScore = data.pushEffectReward.lowestAnswerScore
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    // 发布
    async save() {
      if (this.imgUrl === 'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/icon_add.png') {
        uni.showToast({
          title: "请上传文章封面图片",
          icon: "none"
        });
        return;
      }

      if (this.inputValue === "") {
        uni.showToast({
          title: "请输入文章来源",
          icon: "none"
        });
        return;
      }


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

      // saveType: 1:文章 2:动态 3:转载
      // isDrafts: 保存到草稿箱则isDrafts设置为1，发布设置为0
      let data = {
        companyId: wx.getStorageSync("COMPANYID"),
        type: this.saveType,
        photos: this.imgUrl,
        details: this.article.details,
        title: this.article.title,
        essayTypeId: this.article.essayTypeId,
        isDrafts: 0,
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
      console.log("data",data);
      uni.showLoading();
      if (this.saveType == 1) {
        data.author = this.inputValue;
        data.title = this.article.title;
        data.originAuthor = this.inputValue;
      } else if (this.saveType == 3) {
        data.originAuthor = this.inputValue;
      }

      let url='/dynamic/addDynamicInfo';
      if(this.type=='edit'){
        url='/dynamic/editDynamicInfo';
        data.dynamicId=this.dynamicId;
      }
      console.log("data",data);
      // WXAJAX.POST(data, "", "/company/addDynamicInfo")
      WXAJAX.POST(data, "", url,'','',1)
        .then(data => {
          console.log(data)
          uni.hideLoading();
          uni.showToast({
            title: "保存成功！"
          });

          wx.setStorageSync('choose_essayType' , '');

          let id = data.dynamicId
          wx.navigateTo({
            url:`../articleDetail/index?id=${id}`
            });

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
      if (this.readRewardFlag==0){
        this.readRewardFlag=1;
        this.shareRewardFlag=0;
        this.pushEffectFlag=0;
        this.checked2=false;
        this.checked3=false;
        this.$set(this.items, 0, false)
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
        this.readRewardFlag=0;
        this.pushEffectFlag=0;
        this.checked1=false;
        this.checked3=false;
      }else{
        this.shareRewardFlag=0;
      }
    },
    pusheffectflag(e){
      if (this.pushEffectFlag==0){
        this.pushEffectFlag=1;
        this.shareRewardFlag=0;
        this.readRewardFlag=0;
        this.checked2=false;
        this.checked1=false;
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
    },
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
</style>
