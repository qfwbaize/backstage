<template>
  <div class="visit">
    <div class="vistor-item"
         @click="clickVistor">
      <!-- <div class="img" :style="{background:`url(${info.logo}) no-repeat center`}"></div> -->
      <img class="img"
           :src="info.logo||'https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/user/user_default_avatar_square.png'"
           alt />
      <div class="desc">
        <div>
          <span class="name">{{info.nickName}}</span>
          <span class="new-user"
                v-if="info.num===1">新客</span>
        </div>
        <p class="content">
          正在
          <span class="c38">查看</span>
          你的
          <span class="c38">{{typeName}}</span>
          第{{info.num}}次，{{desc}}
        </p>
      </div>
      <div class="right">
        <p class="time">{{info.createTime|formatterHourTime}}</p>
        <img class="wechat"
             @click.stop="toIM"
             src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/ai-track/message@2x.png"
             alt />
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    info: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  filters: {
    formatterHourTime (value) {
      function zeroize( num ) {
          return (String(num).length == 1 ? '0' : '') + num;
      }
      value = value/1000
      var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
      var timestampDiff = curTimestamp - value; // 参数时间戳与当前时间戳相差秒数
      var curDate = new Date( curTimestamp * 1000 ); // 当前时间日期对象
      var tmDate = new Date( value * 1000 );  // 参数时间戳转换成的日期对象

      var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
      var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();

      if ( timestampDiff < 60 ) { // 一分钟以内
          return "刚刚";
      } else if( timestampDiff < 3600 ) { // 一小时前之内
          return Math.floor( timestampDiff / 60 ) + "分钟前";
      } else if ( curDate.getFullYear() == Y && curDate.getMonth()+1 == m && curDate.getDate() == d ) {
          return '今天' + zeroize(H) + ':' + zeroize(i);
      } else {
          var newDate = new Date( (curTimestamp - 86400) * 1000 ); // 参数中的时间戳加一天转换成的日期对象
          if ( newDate.getFullYear() == Y && newDate.getMonth()+1 == m && newDate.getDate() == d ) {
              return '昨天' + zeroize(H) + ':' + zeroize(i);
          } else if ( curDate.getFullYear() == Y ) {
              return  zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
          } else {
              return  Y + '年' + zeroize(m) + '月' + zeroize(d) + '日 ' + zeroize(H) + ':' + zeroize(i);
          }
      }
      // //今天
      // let tody = new Date().getTime() - new Date(value).getTime() < 86400000;
      // console.log(new Date().getTime() - new Date(value).getTime())

      // //昨天
      // let yestday = new Date().getTime() - new Date(value).getTime() < 86400000 * 2;

      // let time = new Date(value);
      // //年月日转换
      // var date = new Date(value ); // 增加8小时
      // let dateTime = date.toJSON().substr(0, 19).replace('T', ' ');

      // //格式化时间
      // let str = (time.getHours().toString().padStart(2, "0") + ":" + time.getMinutes().toString().padStart(2, "0"));

      // console.log(tody ? "今日 : "+str : yestday ? "昨日 : "+ str : dateTime)
      // return tody ? "今日 : "+str : yestday ? "昨日 : "+ str : dateTime;
    },
  },
  watch:{
    info(newVal,old){
      switch (newVal.seeType) {
        case 1:
          this.typeName = "名片";
          if (newVal.num < 4) {
            this.desc = "现在沟通，效率更高哦";
          } else {
            this.desc = "成交有望";
          }
          break;
        case 2:
          this.typeName = newVal.targetName || "产品";
          if (newVal.num < 4) {
            this.desc = "尽快把握商机";
          } else {
            this.desc = "可标注为重点客户";
          }
          break;
        case 3:
          this.typeName = "官网";
          if (newVal.num < 4) {
            this.desc = "有望合作";
          } else {
            this.desc = "可标注为重点客户";
          }
          break;
        case 4:
          this.typeName = "动态";
          if (newVal.num < 4) {
            this.desc = "合作意向很强烈";
          } else {
            this.desc = "成单在望";
          }
          break;

        case 6:
          this.typeName = "视频";
          if (newVal.num < 4) {
            this.desc = "合作意向很强烈";
          } else {
            this.desc = "成单在望";
          }
          break;
        default:
          break;
      }
    }
  },
  mounted () {
    switch (this.info.seeType) {
      case 1:
        this.typeName = "名片";
        if (this.info.num < 4) {
          this.desc = "现在沟通，效率更高哦";
        } else {
          this.desc = "成交有望";
        }
        break;
      case 2:
        this.typeName = this.info.targetName || "产品";
        if (this.info.num < 4) {
          this.desc = "尽快把握商机";
        } else {
          this.desc = "可标注为重点客户";
        }
        break;
      case 3:
        this.typeName = "官网";
        if (this.info.num < 4) {
          this.desc = "有望合作";
        } else {
          this.desc = "可标注为重点客户";
        }
        break;
      case 4:
        this.typeName = "动态";
        if (this.info.num < 4) {
          this.desc = "合作意向很强烈";
        } else {
          this.desc = "成单在望";
        }
        break;

      case 6:
        this.typeName = "视频";
        if (this.info.num < 4) {
          this.desc = "合作意向很强烈";
        } else {
          this.desc = "成单在望";
        }
        break;
      default:
        break;
    }
  },
  data () {
    return {
      typeName: "",
      desc: "",
      head:
        "https://static.xiongmaozhanggui.com/cdn/wechat/images/share_icon_newcomer.png"
    };
  },
  methods: {
    ...mapActions(['setCurrentClient']),
    clickVistor () {
      this.setCurrentClient(this.info);
      this.$emit("clickVistor", this.info);
    },
    //是否是当天
    isToday(str) {
      return new Date().getTime() - new Date(str).getTime() < 86400000;
    },
    toIM () {
      const { cardId,seeCardId, logo, userId, name, phone, personalWx,companyId } = this.info;
      if(!seeCardId){
        uni.showToast({
          // 弹出框的标题
          title: '对方是游客身份，无法聊天！',
          // 弹出框的图标，不想设置图标时请给none
          icon: 'none'
        })
        return ;
      }
      wx.navigateTo({
        url:
          "../IM/main?userId=" +
          userId +
          "&logo=" +
          logo +
          "&type=2&cardId=" +
          seeCardId +
          "&name=" +
          name +
          "&companyId=" +
          companyId +
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
.visit {
  /* padding: 0 30upx; */
  margin-top: 40upx;
}
.vistor-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  /* border-bottom: 1upx solid #F5F5F6; */
}
.vistor-item .img {
  width: 100upx;
  height: 100upx;
  border-radius: 10upx;
  flex-shrink: 0;
  margin-left: 32upx;
}
.vistor-item .desc {
  margin-left: 22upx;
  width: 446upx;
}
.vistor-item .desc .name {
  font-size: 36upx;
  color: #383838;
}
.vistor-item .desc .new-user {
  display: inline-block;
  background-color: #51cdcb;
  border-radius: 6upx;
  color: #fff;
  font-size: 24upx;
  padding: 2upx 10upx;
  margin-left: 14upx;
}
.vistor-item .desc .content {
  font-size: 28upx;
  color: #bcbbbc;
  margin-top: 13upx;
}
.vistor-item .right {
  text-align: right;
  flex-shrink: 0;
  margin-right: 32upx;
}
.vistor-item .right .time {
  font-size: 24upx;
  color: #a8a8a8;
  margin-top: 14upx;
}
.vistor-item .right .wechat {
  width: 32upx;
  height: 32upx;
  margin-top: 30upx;
}
.line {
  width: 100%;
  height: 1upx;
  background-color: #f5f5f6;
  margin-top: 40upx;
}
</style>
