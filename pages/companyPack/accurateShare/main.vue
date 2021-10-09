<template>
  <div class="pb50">

    <div class="bgfff pl16 pr17 lh49 fs16 c38 mb11 info-form">

      <div>
        <div class="disflex jsbet align-cen" style='display: none;'>
          <label for="preciseAwardTotalAmount"
                 class="fbold marks pr15">奖金池总金额</label>
          <input type="number"
                 id="preciseAwardTotalAmount"
                 class="pha8 textr h49"
                 v-model="preciseAwardTotalAmount"
                 placeholder="金额">
        </div>
        <div class="disflex jsbet align-cen">
          <label for="preciseRewardAmount"
                 class="fbold marks pr15">奖励金额</label>
          <input type="number"
                 id="preciseRewardAmount"
                 class="pha8 textr h49"
                 v-model="preciseRewardAmount"
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

        <div class="disflex jsbet align-cen" v-if="ifproblem==true">
          <label for="answerFlag"
                 class="fbold pr15">是否答题</label>
          <switch id="answerFlag" style="zoom: 0.8;" :checked="checked" @change="answerflag"/>
        </div>
        <div v-if="answerFlag == 1">
          <div class="disflex jsbet align-cen">
            <label for="lowestAnswerScore"
                   class="fbold marks pr15">最低答题得分</label>
            <input type="number"
                   id="lowestAnswerScore"
                   class="pha8 textr h49"
                   v-model="lowestAnswerScore"
                   placeholder="金额">
          </div>
        </div>
      </div>
      </div>
    <BottomButtonSmall :text="'下一步'" @btn_tap="save" />
  </div>
</template>

<script>
import BottomButtonSmall from "@/components/bottom_button_small";
import WXAJAX from "@/utils/request";
import util from "@/utils/index";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { BottomButtonSmall },
  data() {
    return {
      checked: false,
      ifproblem:true,
      preciseAwardTotalAmount: '',
      lowestReadTime: '',
      preciseRewardAmount: '',
      lowestpreciseRewardAmount: '',
      highestpreciseRewardAmount: '',
      answerFlag: '',
      lowestAnswerScore: '',
    };
  },
  computed: {
    ...mapGetters(['article'])
  },
  onLoad(option) {
    this.id=option.id;
    this.cid=option.cid;

    let that=this
    WXAJAX.POST({
        dynamicId: this.id,
        questionTitle: '',
    }, '', '/question/queryListInitialQuestion','','',1)
    .then(res => {
      if(!res){
        that.ifproblem=false;
      }
    }).catch(err => {
       that.ifproblem=false;
            console.log("出错：", err)
    });
  },

  methods: {
    ...mapActions(['setArticle']),
    // 发布
    async save() {
      // if(this.preciseAwardTotalAmount<=0){
      //   wx.showToast({
      //     title: "奖金池总金额必须大于0！",
      //     icon: "none",
      //     duration: 2000
      //   });
      //   return ;
      // }
      if(this.preciseRewardAmount<=0){
        wx.showToast({
          title: "单人奖励金额必须大于0！",
          icon: "none",
          duration: 2000
        });
        return ;
      }
      // if(parseInt(this.preciseRewardAmount)>parseInt(this.preciseAwardTotalAmount)){
      //   wx.showToast({
      //     title: "奖金池总金额必须大于单人奖励金额！",
      //     icon: "none",
      //     duration: 2000
      //   });
      //   return ;
      // }
      let data = {
            id:this.id,
            cid:this.cid,
            preciseAwardTotalAmount: this.preciseRewardAmount||0,//总金额
            // preciseAwardTotalAmount: this.preciseAwardTotalAmount||0,//总金额
            lowestReadTime: this.lowestReadTime||0,
            preciseRewardAmount: this.preciseRewardAmount||0,//单人奖励金额
            answerFlag: this.answerFlag||0,
            lowestAnswerScore: this.lowestAnswerScore||0,
      };
      this.setArticle(data)
      wx.navigateTo({
        url: '../choosefriends/main?saveType=2&id=' + this.id + '&cid=' + this.cid
      })
    },
    answerflag(e){
      if (e.detail.value){
        this.answerFlag=1;
      }else{
        this.answerFlag=0;
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
