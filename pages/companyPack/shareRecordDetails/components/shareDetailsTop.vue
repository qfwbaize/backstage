<template>
    <div class="share-details-top">
      <div :style="{height: statusBarHeight + 'px'}"></div>
      <div class="share-details-title posre"
           :style="{height: navHeight+'px'}">
           <image class="icon-back" @click="goBack()" :src="imgUrl" mode=""></image>
           <p class="navgation-title fs18 cfff fbold">{{title}}</p>
           <!-- 占位置 -->
           <p></p>
      </div>
      <div class="middle" :style="{'background-image':'url('+cardImgUrl+')'}">
        <div class="card">
          <img
            :src="info.photos"
            alt=""
            mode="aspectFill"
            class="dynamic-photos"
          />
          <div class="information posre">
            <p class="fs14 fbold c38 .lh22 information-title">
              {{ info.title }}
            </p>
            <p class="fs12 ca8 lh18 time">
              {{ info.createTime }}
            </p>
          </div>
        </div>
        <div class="comment">
          <div class="c38 fs12">
            <image class="w10 h10 mr4" :src="iconEye" mode=""></image>
            浏览次数
            <span class="cblue fs12">{{info.seeNum || 0}}</span>
          </div>
          <div class="c38 fs12">
            <image class="w10 h10 mr4" :src="iconShare" mode=""></image>
            分享次数
            <span class="cblue fs12">{{info.shareNum || 0}}</span>
          </div>
          <div class="c38 fs12">
            <image class="w10 h10 mr4" :src="iconUser" mode=""></image>
            获客人数
            <span class="cblue fs12">{{ info.winCustomers || 0}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="middle flex-base h90 pl15 pr15">

      <p class="fs16 c38 title fbold lh25">

      </p>
    </div>
    <div class="bottom h40 pl15 pr15">
      <p class="orgin fs12 ca8">
        来源: <span class="pl6">{{ info.dynamic.originAuthor }}</span>
      </p>
      <p class="orgin fs12 ca8">
        最近分享时间 <span class="pl6">{{ info.time }}</span>
      </p>
    </div>
    <div class="details h44">
      <div class="textc">
        <span class="fs12 c38">获客人数</span>
        <span class="fs12 cblue fbold pl3">{{ info.userCount }}</span>
      </div>
      <div class="textc">
        <span class="fs12 c38">浏览次数</span>
        <span class="fs12 cblue fbold pl3">{{ info.viewCount }}</span>
      </div>
      <div class="textc">
        <span class="fs12 c38 ">分享次数</span>
        <span class="fs12 cblue fbold pl3">{{ info.shardCount }}</span>
      </div>
    </div><div class="middle flex-base h90 pl15 pr15">
    <img
      :src="info.dynamic.photos"
      alt=""
      mode="aspectFill"
      class="w60 h60 bradius5 mr15"
    />
    <p class="fs16 c38 title fbold lh25">
      {{ info.dynamic.title }}
    </p>
  </div>
  <div class="bottom h40 pl15 pr15">
    <p class="orgin fs12 ca8">
      来源: <span class="pl6">{{ info.dynamic.originAuthor }}</span>
    </p>
    <p class="orgin fs12 ca8">
      最近分享时间 <span class="pl6">{{ info.time }}</span>
    </p>
  </div>
  <div class="details h44">
    <div class="textc">
      <span class="fs12 c38">获客人数</span>
      <span class="fs12 cblue fbold pl3">{{ info.userCount }}</span>
    </div>
    <div class="textc">
      <span class="fs12 c38">浏览次数</span>
      <span class="fs12 cblue fbold pl3">{{ info.viewCount }}</span>
    </div>
    <div class="textc">
      <span class="fs12 c38 ">分享次数</span>
      <span class="fs12 cblue fbold pl3">{{ info.shardCount }}</span>
    </div>
  </div> -->
</template>
<script>
import WXAJAX from '../../../../utils/request.js'
import tools from '../../../../utils/index.js'
export default {
  props: {
    info: {
      type: Object
    }
  },
  data(){
    return {
      //设置头部需要的参数
      title:'访客详情',
      navHeight: 0,
      statusBarHeight: 0,
      imgUrl:WXAJAX.imgBackUrl + '/marketing/icon_back.png',
      cardImgUrl:WXAJAX.imgBackUrl + '/product-index/share-card.png',
      iconEye:WXAJAX.imgBackUrl + '/product-index/icon_eye_gray.png',
      iconShare:WXAJAX.imgBackUrl + '/product-index/icon_share_gray.png',
      iconUser:WXAJAX.imgBackUrl + '/product-index/icon_add_user_gray.png',
    }
  },
  created() {
    this.calculateNavBarHeight()

  },
  mounted() {
    console.log(this.info)
  },
  methods:{
    //计算高度
    calculateNavBarHeight () {
      let menuButtonBounding = getApp().globalData.menuButtonBounding;
      wx.getSystemInfo({
        success: res => {
          let statusBarHeight = res.statusBarHeight; //胶囊按钮与顶部的距离
          console.log(statusBarHeight)
          let navHeight =
            statusBarHeight +
            (menuButtonBounding.top - statusBarHeight) * 2 +
            menuButtonBounding.height; //导航高度

          getApp().globalData.navHeight = navHeight;
          this.statusBarHeight = statusBarHeight
          this.navHeight = navHeight - statusBarHeight;
        },
        fail (err) {
          console.log(err);
        }
      });
    },
    goBack(){
      wx.navigateBack({
        delete:1
      })
    }
  }
};
</script>
<style scoped>
.share-details-top{
    background: linear-gradient(to bottom, #51cdcc, #ffffff);
 }
.share-details-title{
    display: flex;
    align-items: center;
    padding:0 100upx 0 20upx;
}
.navgation-title{
  width: 100%;
  display: flex;
  justify-content:space-around;

  font-size:36px;
}
.icon-back{
  width: 45upx;
  height: 36upx;
  margin-top: 2upx;

}
.middle{
   height: 348upx;
   width: 100%;
   box-sizing: border-box;
   padding:20upx 30upx 20upx 30upx;
   background-size: 100%;
}
.information-title{
  width: 476upx;
  height: 80upx;
  overflow: hidden;
  word-break: break-all;
  display: -webkit-box; /**对象作为伸缩盒子模型展示**/
  -webkit-box-orient: vertical; /**设置或检索伸缩盒子对象的子元素的排列方式**/
  -webkit-line-clamp: 2; /**显示的行数**/
  overflow: hidden; /**隐藏超出的内容**/
}
/* .middle {
  display: flex;
  align-items: flex-start;
  height: 120upx;
  align-items: flex-start;
} */
.card{
  padding: 40upx 25upx 0 25upx;
  display: flex;
}
.dynamic-photos{
  width: 120upx;
  height: 120upx;
  border-radius: 10upx;
  margin-right: 30upx;
}
.time{
  position: absolute;
  bottom: 0;
  left: 0;
}
.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.comment{
  margin-top: 90upx;
  display: flex;
  justify-content: space-between;
  padding:0 45upx 0 30upx;
}
/* .details {
  border-top: 1upx solid #f8f8f8;
  display: flex;
  justify-content: space-around;
  align-items: center;
} */
</style>
