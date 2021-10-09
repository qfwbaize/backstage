<template>
  <div class="share-user-item bgfff h90 pl15 pr15">
    <!-- <div class="share-item"
         @click="clickVistor">

      <img class="img"
           :src="
          info.avatarUrl ||
            'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/user_default_avatar_square.png'
        "
           alt />
      <div class="desc">
        <div>
          <span class="name"></span>
        </div>
        <p class="content">
          共浏览
          <span class="c38"></span>
          次

        </p>
      </div>
      <div class="right">
        <p class="time"></p>
        <img class="wechat"
             @click.stop="toIM"
             src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/ai-track/message@2x.png"
             alt />
      </div>
    </div>
    <div class="line"></div> -->
    <image class="portrait mr10" :src="info.headImgurl" ></image>
    <div class="desc h50">
        <div class="desc-top">
          <p class="name c38 fs16">{{ info.nickname}}</p>
          <p class='ca8 fs12'>{{ info.visitTime }}</p>
        </div>
        <div class="desc-bottom">
          <p>共浏览<span>{{ info.sumNum || 1 }}</span>次，总浏览时长<span>{{info.sumTimes}}</span></p>
          <image
              @click.stop="toIM"
              class="w16 h16" src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/ai-track/message@2x.png"></image>
        </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import WXAJAX from '../../../../utils/request'

export default {
  props: {
    info: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  filters: {
    formatterHourTime(value) {
      let time = new Date(value);
      return (
        time
          .getHours()
          .toString()
          .padStart(2, "0") +
        ":" +
        time
          .getMinutes()
          .toString()
          .padStart(2, "0")
      );
    }
  },
  methods: {
    ...mapActions(["setCurrentClient"]),
    clickVistor() {
      this.setCurrentClient(this.info);
      this.$emit("clickVistor", this.info);
    },
    toIM() {

      let nickeName = this.info.nickname
      let phone = ''
      let personalWx = ''
      let avatarUrl = this.info.headImgurl
      let userId = ''
      let cardId = ''
      console.log( this.info)
      wx.navigateTo({
        url:
          "../../IM/main?userId=" +
          userId +
          "&logo=" +
          avatarUrl +
          "&type=2&cardId=" +
          cardId +
          "&name=" +
          nickeName +
          "&wxCode=" +
          personalWx +
          "&phone=" +
          phone
      });
    }
  }
};
</script>
<style scoped>
.share-user-item {
  /* padding: 0 30upx; */
  /* margin-top: 40upx; */
  margin:0 60upx;
  display: flex;
  align-items: center;
  border-bottom:1upx solid #F5F5F6;
}
.portrait{
  width: 100upx;
  height: 100upx;
  border-radius: 10upx;
  flex-shrink: 0;
}
.desc{
  flex: 1;
}
.desc-top{
  display: flex;
  padding-top: 6upx;
  justify-content: space-between;
  text-align: center;
}
.name{
 display: block;
 text-align: left;
 width: 190upx;
 font-weight:500;
 overflow: hidden;
 text-overflow: ellipsis;
 white-space: nowrap;
}
.desc-bottom{
  display: flex;
  justify-content: space-between;
  margin-top: 24upx;
  color: #BCBBBC;
  font-size: 28upx;
}
.desc-bottom span{
  color: #383838;
}
</style>
