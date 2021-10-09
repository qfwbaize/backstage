<template>
  <div style="position: relative;padding-top: 20rpx;">

    <view class="details">
      <div class="w50 h50  mt10 ml20">
        <image style="width: 100%; height: 100%;" :src="imgurl" mode=""></image>
      </div>
      <div class="fs14 mt10 ml20">{{list.title}}</div>
    </view>
    <view class="disflex fs14 ml27 mt27">
      <div>文件名称：</div>
      <div>{{list.title}}</div>
    </view>
    <view class="disflex fs14 ml27 mt27">
      <div>文件格式：</div>
      <div>{{fileimg}}</div>
    </view>

    <view class="disflex fs14 ml27 mt27">
      <div>创建者：</div>
      <div>{{list.name}}</div>
    </view>
    <view class="disflex fs14 ml27 mt27">
      <div>上传时间：</div>
      <div>{{filetime}}</div>
    </view>
    <view class="disflex fs14 ml27 mt27">
      <div>文件描述：</div>
      <div>{{fileDescribe}}</div>
    </view>
    <view class="disflex ml27" style="margin-top: 100rpx;">
      <div class="file" @click="lookFile">查看文件</div>
      <div class="file ml27" v-show="dynamicInfo.isShow!=0" @click="toShare">转发文件</div>
    </view>

    <!-- 审核 -->
    <view class="disflex " v-show="dynamicInfo.isShow==0" style="position: fixed; bottom: 0rpx; width: 100%;">
    	<div class="h50 lh50 textc cfff" style="width: 50%; background-color: #228B22;"
    		@click="examine(1,1,isOrgShow)">审核通过
    	</div>
    	<div class="h50 lh50 textc cfff" style="width: 50%; background-color: #DD524D;"
    		@click="examine(2,1,isOrgShow)">审核不通过
    	</div>
    </view>
    <view v-if="shareDiv == true" class="" style="position: fixed;bottom: 100rpx;">
    	<div class="shareDiv" @click="toshareDiv"></div>
    	<div class="warn" style="border: 1px solid #000000;">
    		<div>请填写未通过原因</div>
    		<div><input class="" style="border: 1px solid #000000;" type="text" value="" v-model="text" @blur="" />
    		</div>
    		<div @click="shure" class="lh40 textc m0auto mt10"
    			style="width: 200rpx; height: 100rpx; background-color: #007AFF; color: #FFFFFF;">确定</div>
    	</div>
    </view>


    <SHARE v-if="share==true" :dynamicId="dynamicId" :fileId="dynamicId" :companyId="companyId" saveType='1' type='1'
      @closeShare="closeShare"></SHARE>
    <div v-show="topic==true">

      <div class="pl30 pt10 pb10 borderbox ">
        <div>请回答问题：</div>
        <div class="target" v-for="(item,index) in problemList" :key="index">
          <div class="title c38" style="width: 90%;">
            <p>{{index+1}} 、</p>
            {{item.questionTitle}}
          </div>
          <ul>
            <!-- list -->
            <radio-group @change="radioChange($event,item)" style="font-size: 25rpx;">
              <li>
                <label class="target-left c78">
                  <radio :value="'A'" color="#51CDCB" style="transform:scale(0.7);" />{{item.answerA}}
                </label>
              </li>
              <li>
                <label class="target-left c78">
                  <radio :value="'B'" color="#51CDCB" style="transform:scale(0.7);" />{{item.answerB}}
                </label>
              </li>
              <li>
                <label class="target-left c78">
                  <radio :value="'C'" color="#51CDCB" style="transform:scale(0.7);" />{{item.answerC}}
                </label>
              </li>
              <li>
                <label class="target-left c78">
                  <radio :value="'D'" color="#51CDCB" style="transform:scale(0.7);" />{{item.answerD}}
                </label>
              </li>
            </radio-group>

          </ul>
        </div>
        <div v-if="submittext == '提交答案'" @click="submit"
          style="color: #fff;background-color: #337ab7; border-color: #2e6da4; display: inline-block; padding: 6rpx 12rpx; margin-bottom: 0; font-weight: 400; line-height: 1.42857143; text-align: center; white-space: nowrap; text-decoration: none; vertical-align: middle; -ms-touch-action: manipulation; touch-action: manipulation; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-image: none; border: 1rpx solid transparent; border-radius: 4rpx;width: 144rpx;font-size: 36rpx; margin-left: 250rpx; margin-bottom: 60rpx; margin-top: 30rpx; ">
          提交答案</div>
        <div v-else
          style="color: #fff;background-color: #696969; border-color: #2e6da4; display: inline-block; padding: 6rpx 12rpx; margin-bottom: 0; font-weight: 400; line-height: 1.42857143; text-align: center; white-space: nowrap; text-decoration: none; vertical-align: middle; -ms-touch-action: manipulation; touch-action: manipulation; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; background-image: none; border: 1rpx solid transparent; border-radius: 4rpx;width: 144rpx;font-size: 36rpx;margin-left: 250rpx; margin-bottom: 60rpx; margin-top: 30rpx; ">
          已提交 </div>

      </div>
    </div>
    <div v-show="dialog_show">
      <ChangePhoneNumber :dialog_title="'手机号验证'" :type="'hint3'" :phone="precisePhone" @btn_tap="save_phone_number"
        @cancel_tap="close_change_number"></ChangePhoneNumber>
    </div>
    <!-- 点击查看文件弹出文件链接 -->
    <view class="" v-show="!open">
      <view class="shadow" @click="toShow"></view>
      <view class="submitphone">
        <view class="submitphone_text">请复制链接到浏览器打开</view>
        <input type="number" v-model="fileUrl" />
        <view class="submitphone_btn" @click.stop="toCopy">点击复制</view>
      </view>
    </view>

  </div>
</template>

<script>
  import WXAJAX from "@/utils/request";
  import {
    addShareRecord,
    editShareRecord,
    preciseWxShare
  } from '@/utils/behavior';
  import ChangePhoneNumber from '@/components/ChangePhoneNumber'
  import SHARE from '@/components/share'
  export default {
    components: {
      SHARE,
      ChangePhoneNumber
    },
    data() {
      return {
        topic: false,
        dialog_show: false,
        precisePhone: '',
        list: '',
        title: '',
        imgurl: '',
        filetime: '',
        fileimg: '',
        dynamicId: '',
        filename: '',
        ifshare: 0,

        title: '',
        companyName: '',

        ifscore1: false, //阅读
        ifscore4: false, //推销
        ifscore3: false, //精准

        score: 0,
        // score1:0,//阅读分数
        // score4:0,//推销分数
        // score3:0,//精准分数


        lowestAnswerScore1: 0, //阅读得奖最低分数
        lowestAnswerScore4: 0, //推销得奖最低分数
        lowestAnswerScore3: 0, //精准得奖最低分数


        time1: false, //阅读
        time4: false, //推销
        time3: false, //精准
        time: '',
        details: '',
        photos: [],
        problemList: [],
        answerList: [], //提交的答案
        answerListIds: [], //提交的答案id
        answerIds: [],

        submitresult: false,
        submittext: '提交答案',
        type: 0,
        share: false,
        timer: '',
        cardId: '',
        open: true,
        fileUrl: '',
        fileDescribe:'',
        isOrgShow:'',
        dynamicInfo:[],
      }

    },
    async onShareAppMessage(e) {

      let shareId = '';
      var params = {
        dynamicId: this.dynamicId,
        shareSource: 2,
      }
      var sharedata = await WXAJAX.POST(params, '', '/share/record/add', '', '', 1);
      let path = '/pages/companyPack/library/details?dynamicId=' + this.dynamicId + '&companyId=' + wx.getStorageSync(
        'COMPANYID') + '&cardId=' + wx.getStorageSync('cardId') + '&goType=1&shareId=' + sharedata.shareId;
      console.log("path", path)
      return {
        imageUrl: this.photos[0],
        title: this.title,
        path,
        success(e) {
          wx.showShareMenu({
            withShareTicket: true
          })
        },
        fail(e) {
          console.log('失败-- ', e);
        }
      }

    },
    async onLoad(options) {
      // console.log(option, "文件闲情");
      this.dynamicId = options.dynamicId
      if (options.ifshare) {
        this.ifshare = options.ifshare;
      }

      this.companyId = options.companyId
      this.cardId = options.cardId
      this.shareId = options.insideShareId //站内分享
      this.type = options.type

      if (!options.precise_dynamicId && options.shareId) { //普通微信好友/朋友圈分享
        editShareRecord(options.shareId);
        this.shareId = options.shareId //站内分享
      }

      if (options.precise_dynamicId) { //精准抓发微信好友/朋友圈
        this.preciseId = await preciseWxShare(this.dynamicId, options.precise_dynamicId, wx.getStorageSync('cardId'),
          options.shareId);
      }
      if (options.preciseId) { //站内精准转发
        this.preciseId = options.preciseId
      }


      if (options.pushEffectId) {
        this.pushEffectId = options.pushEffectId
      }

      if (options.shareId) { //站外分享
        editShareRecord(options.shareId);
      }
      this.getDetail()
    },
    onReady() {


    },
    methods: {
      //点击复制文件链接
      toCopy() {
        uni.setClipboardData({
          data: this.fileUrl,
          success: () => { //复制成功的回调函数
            uni.showToast({
              title: '复制成功'
            })
          }
        });

      },
      examine(i, v, isOrgShow) {
      	let list = this.list
      		let url = "/dynamic/updateShowByDynamicId"
      		let data = {
      			dynamicId: this.dynamicId,
      			isShow: i,
      			isLibrary: v,
      			isOrgShow: isOrgShow
      		}
      		WXAJAX.POST(data, "", url, "", "", 1).then((res) => {
      			if (res.isShow == 1) {
      				uni.showToast({
      					title: '审核通过',
      					icon: "none"
      				})
      				this.getBack()
      			} else if (res.isShow == 2) {
      				uni.showToast({
      					title: "审核未通过",
      					icon: "none"
      				})
      				this.getBack()
      				this.shareDiv = true
      			}
      		})

      },
      //点击阴影位置关闭弹窗
      toShow() {
        this.open = true
      },
      //点击查看文件显示文件链接弹窗
      lookFile() {
        this.open = false
         // wx.downloadFile({
         //      url: this.fileUrl,      //要预览的PDF的地址
         //      success: function (res) {
         //        console.log(res);
         //        if (res.statusCode === 200) {   //成功
         //          var Path = res.tempFilePath   //返回的文件临时地址，用于后面打开本地预览所用
         //          wx.openDocument({
         //            filePath: Path,             //要打开的文件路径
         //            success: function (res) {
         //              console.log('打开PDF成功');
         //            }
         //          })
         //        }
         //      },
         //      fail: function (res) {
         //        console.log(res);               //失败
         //      }
         //  })
      },
      submit() {
        let params = {
          ifscore3: this.ifscore3,
          score: this.score,
          ifscore1: this.ifscore1,
          ifscore4: this.ifscore4,
          time1: this.time1,
          time3: this.time3,
          time4: this.time4,

          lowestAnswerScore1: this.lowestAnswerScore1, //阅读得奖最低分数
          lowestAnswerScore4: this.lowestAnswerScore4, //推销得奖最低分数
          lowestAnswerScore3: this.lowestAnswerScore3, //精准得奖最低分数
        }
        console.log("分数", params)
        if (this.ifscore3 && this.score >= this.lowestAnswerScore3 && this.time3) { //精准
          if (this.precisePhone) {
            this.dialog_show = true
          } else {
            this.updatePrecise();
          }
          this.submitresult = true;
        }

        if (this.ifscore1 && this.score >= this.lowestAnswerScore1 && this.time1) { //阅读
          let params = {
            dynamicId: this.dynamicId,
            shareId: this.shareId,
            answerScore: this.score,
            readFlag: 1,
          };
          console.log("阅读params", params);
          WXAJAX.POST(params, '', '/reader/record/add', '', '', 1);
          this.submitresult = true;
        }
        if (this.ifscore4 && this.score >= this.lowestAnswerScore4 && this.time4) { //推销
          let params = {
            dynamicId: this.dynamicId,
            shareId: this.shareId,
            readFlag: 1,
            answerScore: this.score
          };
          console.log("推销params", params);
          WXAJAX.POST(params, '', '/pushEffect/record/add', '', '', 1);
          this.submitresult = true;
        }

        wx.showToast({
          title: "提交成功~",
          duration: 1000,
          icon: "none"
        });
        this.submittext = "已提交"


        for (var i = 0; i < this.answerList.length; i++) {
          WXAJAX.POST(this.answerList[i], '', '/answer/add', '', '', 1);
        }
      },
      // 文章详情查询
      // schedulingsApi/dynamic/getDynamicDetail
      // 参数：{{"companyId":""公司id,"dynamicId":"文章id","cardId":""}}
      getDetail() {
        let v = this
        let url = "/dynamic/getDynamicDetail"
        let data = {
          dynamicId: this.dynamicId
        }
        WXAJAX.POST(data, "", url, "", "", 1).then((res) => {
          this.fileUrl = res.photos
          this.fileDescribe = res.details
          this.isOrgShow=res.isOrgShow
          this.dynamicInfo=res
          v.reward(res);

          WXAJAX.POST({
            // rewardAnswerType: 0,
            dynamicId: v.dynamicId,
            questionTitle: '',
            pageSize: 100,
            pageNum: 1,
          }, '', '/question/queryListInitialQuestion', '', '', 1).then((res) => {
            v.problemList = res.list

          });


          this.list = res
          this.fileimg = res.title.split(".")[1]
          this.filename = res.title.split(".")[0]
          this.filetime = res.createTimeStr.split(" ")[0]
          let type = res.title.split(".")[1]

          if (type == "xlsx") {
            v.imgurl = "https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/excel.png"
          } else if (type == "pdf") {
            this.imgurl = "https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/antFill-file.png"
          } else if (type == "docx") {
            this.imgurl = "https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/word.png"
          } else if (type == "zip") {
            this.imgurl =
              "https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/haFill-124-document-file-zip@3x.png"
          } else if (type == "txt") {
            this.imgurl =
              "https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/haFill-124-document-file-zip@3x.png"
          }
        })


      },
      // 分享按钮
      closeShare() {
        this.share = false;

      },
      toShare() {
        this.share = true;
      },
      radioChange(answer, info) {
        // console.log("answer",answer.detail.value)
        // console.log("info",info)
        var index = this.answerIds.indexOf(info.detailId);
        var answerCorrectInfo = {
          questionId: info.detailId,
          answer: answer.detail.value,
          score: info.correctScore,
        }
        var answerErrorInfo = {
          questionId: info.detailId,
          answer: answer.detail.value,
          score: info.errorScore,
        }
        if (this.answerListIds.indexOf(info.detailId) > -1) {
          this.delData(info.detailId);
        } else {
          this.answerListIds.push(info.detailId);
        }

        if (info.correctAnswer.indexOf(answer.detail.value) > -1) { //答案正确
          if (index == -1) {
            this.answerIds.push(info.detailId)
            this.score = this.score + info.correctScore
          }

          this.answerList.push(answerCorrectInfo)

        } else { //答案错误
          if (index > -1) {
            this.answerIds.splice(index, 1);
            this.score = this.score - info.correctScore;
          }
          this.answerList.push(answerErrorInfo)
        }
      },
      reward(data) { //奖励处理
        let v = this;
        let readAward = false; //是否提示有阅读奖励
        let answerAward = false; //是否提示有答题奖励

        if (data.settingInfo.pushEffectFlag) { //推销


          if (data.pushEffectReward.answerFlag == 1) { //是否需要答题
            v.topic = true
            v.ifscore4 = true
            v.lowestAnswerScore4 = data.pushEffectReward.lowestAnswerScore
            v.timer = setTimeout(function() { //最少阅读时间
              if (v.shareId && v.type != 1) {
                v.time4 = true;
              }
            }, data.pushEffectReward.lowestReadTime * 1000)
          } else {
            v.timer = setTimeout(function() { //最少阅读时间
              if (v.shareId && v.type != 1) { //推销奖励
                WXAJAX.POST({
                  dynamicId: v.dynamicId,
                  shareId: v.shareId,
                  readFlag: 1,
                }, '', '/pushEffect/record/add', '', '', 1);
              }
            }, data.pushEffectReward.lowestReadTime * 1000)
          }
        }

        if (data.settingInfo.readRewardFlag) { //阅读
          if (data.readReward.answerFlag == 1) { //是否需要答题
            v.topic = true
            v.ifscore1 = true
            v.lowestAnswerScore1 = data.readReward.lowestAnswerScore

            // if(v.type!=1){//设置了答题，并且是别人发给我的，不是自己发给别人的
            readAward = true
            answerAward = true

            v.timer = setTimeout(function() { //延时
              v.time1 = true;
            }, data.readReward.lowestReadTime * 1000)
            // }
          } else {
            if (v.type != 1) {
              readAward = true
              v.timer = setTimeout(function() { //延时
                WXAJAX.POST({ //阅读奖励
                  dynamicId: v.dynamicId,
                  shareId: v.shareId,
                  readFlag: 1,
                }, '', '/reader/record/add', '', '', 1);
              }, data.readReward.lowestReadTime * 1000)
            }
          }
        }

        if (data.settingInfo.preciseRewardFlag) { //精准
          if (data.preciseReward.precisePhone) {
            v.precisePhone = data.preciseReward.precisePhone;
          }
          if (data.preciseReward.answerFlag == 1) { //是否需要答题
            v.topic = true
            v.ifscore3 = true
            v.lowestAnswerScore3 = data.preciseReward.lowestAnswerScore
            if (v.preciseId && v.type != 1) { //精准奖励
              readAward = true
              answerAward = true
              this.timer = setTimeout(function() { //延时
                v.time3 = true
              }, data.preciseReward.lowestReadTime * 1000)
            }
          } else {
            if (v.preciseId && v.type != 1) { //精准奖励
              readAward = true
              this.timer = setTimeout(function() { //延时
                if (v.precisePhone) {
                  v.dialog_show = true
                } else {
                  v.updatePrecise();
                }
              }, data.preciseReward.lowestReadTime * 1000)
            }
          }
        }

        if (v.topic) {
          if (readAward && answerAward) {
            wx.showToast({
              title: "阅读并回答问题可以得奖励呦~",
              duration: 1000,
              icon: "none"
            });
          } else if (readAward) {
            wx.showToast({
              title: "阅读可以得奖励呦~",
              duration: 1000,
              icon: "none"
            });
          } else if (answerAward) {
            wx.showToast({
              title: "答题可以得奖励呦~",
              duration: 1000,
              icon: "none"
            });
          }

        }
      },
      save_phone_number(phone, code) {
        this.dialog_show = false
        this.updatePrecise();
      },
      //关闭修改电话弹窗
      close_change_number() {
        this.dialog_show = false
      },
      updatePrecise() { //修改精准转发的获奖状态
        let params = {
          preciseId: this.preciseId,
          readFlag: 1,
          answerScore: this.score
        };
        WXAJAX.POST(params, '', '/precise/record/update', '', '', 1);
        this.submitresult = true;
      }

    }
  }
</script>

<style scoped>
  .b1s {
    border: 1px solid #000000;
  }

  .details {
    width: 644rpx;
    height: 140rpx;
    line-height: 40rpx;
    border-radius: 12rpx;
    text-align: center;
    box-shadow: 0px 4rpx 12rpx 0px rgba(0, 0, 0, 0.4);
    margin: 0 auto;
    margin-top: 20rpx;
    display: flex;
  }

  .ml27 {
    margin-left: 54rpx;
  }

  .mt27 {
    margin-top: 54rpx;
  }

  .file {
    width: 276rpx;
    height: 66rpx;
    line-height: 66rpx;
    border-radius: 12rpx;
    background-color: rgba(25, 208, 155, 100);
    color: rgba(255, 255, 255, 100);
    font-size: 28rpx;
    text-align: center;
    font-family: Arial;
  }

  .shadow {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.41);
    position: absolute;
    top: 0;
    left: 0;
  }

  .submitphone {
    width: 572rpx;
    height: 250rpx;
    border-radius: 12rpx;
    position: absolute;
    background-color: #FFFFFF;
    padding: 60rpx 60rpx 38rpx 60rpx;
    position: absolute;
    top: 500rpx;
    left: 29rpx;
  }

  .submitphone_text {
    color: rgba(16, 16, 16, 100);
    font-size: 28rpx;
    text-align: center;
    font-family: PingFangSC-regular;
  }

  .submitphone input {
    background-color: rgba(243, 243, 243, 100);
    color: rgba(136, 136, 136, 100);
    font-size: 28rpx;
    text-align: left;
    font-family: Microsoft Yahei;
    border-radius: 12rpx;
    width: 560rpx;
    height: 60rpx;
    padding-left: 12rpx;
    margin-top: 26rpx;
    margin-bottom: 32rpx;
  }

  .submitphone_btn {
    width: 184rpx;
    height: 52rpx;
    line-height: 52rpx;
    border-radius: 12rpx;
    background-color: rgba(0, 215, 208, 100);
    color: #FFFFFF;
    font-size: 28rpx;
    text-align: center;
    font-family: Arial;
    margin-top: 60rpx;
    margin-left: 194rpx;
  }
</style>
