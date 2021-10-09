<template>
	<div class="share-now">
    <div class="share-now-wrap">
      <div class="sample-article">
        <div class="article-title">
          <span></span>
          <p>文章样例</p>
        </div>
        <div class="article-img">
          <img class="w315 h260" :src="articleImg">
        </div>
      </div>
      <div class="commodity-list">
        <div class="recommend-title">
          <div class="title">
            <span class="bggreen"></span>
            <p>商品推荐({{goodsInof.length}}/3)</p>
          </div>
          <div class="add-commidit" @click="addCommidit">
            <img class="w16 h16 mr4" :src="addImg" alt="">
            <p class="fs14 cblue" >{{goodsInof ? '修改' : '添加'}}</p>
          </div>
        </div>
        <div v-if="goodsInof == 0">
          <p class="fs14 c38 lh27 mt10 pl15">还没有添加推荐商品</p>
          <p class="fs14 ca8 lh27 pl15">推荐商品添加后将会在文章底部展示</p>
        </div>
        <div  v-else>
          <div class="h90 bbf5f6 pt15 pl15 pr15 commodity"
          v-for="(item,index) in goodsInof"
          :key="item.dynamicId"
          >
            <img class="w60 h60" :src="item.goodsPhoto">
            <div class="commodity-title">
              <p>{{item.goodsName}}</p>
              <div class="delete">
                <span class="fs12 corange">￥{{item.price}}</span>
                <img class="w15 h15" :src="deleteImg" @click="gdelete(index)" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="commodity-list">
        <div class="recommend-title">
          <div class="title">
            <span class="bgyellow"></span>
            <p>热文推荐({{articleInfo.length}}/3)</p>
          </div>
          <div class="add-commidit">
            <img class="w16 h16 mr4" :src="addImg" alt="">
            <p class="fs14 cblue" @click="addArticle">{{articleInfo ? '修改' : '添加'}}</p>
          </div>
        </div>
        <div v-if="articleInfo.length == 0">
          <p class="fs14 c38 lh27 mt10 pl15">还没有添加推荐热文</p>
          <p class="fs14 ca8 lh27 pl15">推荐热文添加后将会在文章底部展示</p>
        </div>
        <div  v-else>
          <div class="h90 bbf5f6 pt15 pl15 pr15 commodity"
           v-for="(item,index) in articleInfo"
           :key="item.goodsId"
           >
            <img class="w60 h60" :src="item.photos">
            <div class="commodity-title">
              <p>{{item.title}}</p>
              <div class="delete">
                <span class="fs12 ca8">{{item.createTime}}</span>
                <img class="w15 h15" :src="deleteImg" @click="adelete(index)">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="share-btn" @click="confirm">立即分享</div>
    <!-- <div style="margin-top: 10rpx;" class="share-btn" @click="confirm2">站内分享</div> -->
    <!-- <div class="mask" @click="mask_tag" v-if="maskShow">
      <div class="mask-box" @click.stop="mask_tag_stop">
        <div class="mask-box-top">
           <image class="" :src="styleImg"></image>
           <p class="mb10">进入客服会话，</p>
           <p>回复“1”即可获取并分享文章</p>
        </div>
        <div class="mask-box-bottom">
           <div class="mask-cancel ca8" @click="mask_cancel">取消</div>
           <button open-type="contact" @contact="contact_tag" class="mask-confirm bgblue cfff">立即进入</button>
        </div>
      </div>
    </div> -->
    <forwardBox v-if="maskShow"
                :maskShow="maskShow"
                @mask_tag_stop="mask_tag_stop"
                @mask_tag="mask_tag"
                @mask_cancel="mask_cancel"
                @contact_tag="contact_tag">
    </forwardBox>
  </div>
</template>

<script>
  import WXAJAX from '../../../utils/request';
  import forwardBox from '@/components/forwardBox'
  import {
    mapState,
    mapMutations
   } from "vuex";

	export default {
    components: { forwardBox },
		data() {
			return {
        articleImg: WXAJAX.imgBackUrl +'/product-index/img_article.png',
        addImg:WXAJAX.imgBackUrl +'/product-index/icon_add.png',
        deleteImg: WXAJAX.imgBackUrl  + '/product-index/20190425173426.png',
        styleImg: WXAJAX.imgBackUrl  + '/marketing/img_IM%402x.png',
        articleState:{
          articleLength:'0',
          articleIsShow:false,
          articleWord:'添加'
        },
        goodsState:{
          goodsLength:'0',
          goodsIsShow:false,
          goodsWord:'添加'
        },
        articleInfo:'',
        goodsInof:'',
        userId:wx.getStorageSync('userId'),
        maskShow:false,
        contact:''
			}
    },

    onLoad(option) {
      this.dynamicId = option.id
      this.companyId = option.cid
      this.getCompanyDynamic()
      //this.getCompanyDynamics()
    },
    watch:{
      contact(newVal,oldVal){
        if(this.contact === 1){
          wx.navigateBack({
            delta:1
          })
        }
      }
    },
    //获取回传回来的参数
    onShow() {
      console.log(this.$store.state.selectGoodsInfo.length)
      console.log(this.$store.state.selectRecordsInfo)
      if(this.$store.state.selectGoodsInfo.length){
        this.goodsInof = this.$store.state.selectGoodsInfo
      }else{

      }
      if(this.$store.state.selectRecordsInfo.length){
        this.articleInfo = this.$store.state.selectRecordsInfo
      }


    },
		methods:{
      ...mapMutations(["setCompanyId"]),
      adelete(i){
        this.articleInfo.splice(i,1)
      },
      gdelete(i){
         this.goodsInof.splice(i,1)
      },
      //去添加商品页面
      addCommidit(){
        var cid = this.companyId
        this.setCompanyId(cid)
        wx.navigateTo({
          url:`../selectCommidit/main?cid=${cid}`
        })
      },
      async getCompanyDynamic(){
        let than = this
        try{

          let data = await WXAJAX.POST({
            dynamicId:than.dynamicId,
            companyId:than.companyId,
            userId:than.userId},
            '',
            '/customerEssay/queryCompanyDynamicById');
            console.log(data)
            if(data.companyGoodsResponses){

              data.companyGoodsResponses.forEach(v => {
                v.price = (v.price/100).toFixed(2)
              });
              than.goodsInof = data.companyGoodsResponses || ''
              than.articleInfo = data.dynamicDetailResponses || ''
            }
        } catch(error){
            than.isLoading = false;
            wx.hideLoading();
            console.log(".............", error);
        }
      },
      //去添加热文页面
      addArticle(){
        //代表要选择三个
        var type = 2
        var cid = this.companyId
        this.setCompanyId(cid)
        wx.navigateTo({
          url:`../selectArticle/main?type=${type}`
        })
      },
      async getAddShareRecordData(dynamics,goods){
        try {
          let data = await WXAJAX.POST(
            {dynamicId:this.dynamicId,
            dynamics:dynamics,
            goods:goods,
            type:1,
            companyId:this.companyId,
            userId:this.userId
            },
            "",
            "/customerEssay/addShareRecordData"
          );
            this.maskShow = true
              wx.showToast({
                title:"分享成功！",
                duration:1000
              })

          wx.hideLoading();
        } catch (error) {
          this.isLoading = false;
          wx.hideLoading();
          console.log(".............", error);
        }
      },
      // async queryCompanyDynamicById(dynamics,goods){
      //   try {
      //     let data = await WXAJAX.POST(
      //       {
      //       dynamicId:this.dynamicId,
      //       companyId:this.companyId,
      //       },
      //       "",
      //       "/customerEssay/queryCompanyDynamicById"
      //     )
      //     console.log(data)
      //   } catch (error) {
      //     this.isLoading = false;
      //     wx.hideLoading();
      //     console.log(".............", error);
      //   }
      // },
      //分享按钮
      confirm(){
        let dynamics = [];
        let goods = []
        if(this.articleInfo){
          dynamics = this.articleInfo.map(v=>v.dynamicId)
        }
        if(this.goodsInof){
          goods = this.goodsInof.map(v=>v.goodsId)
        }
        this.getAddShareRecordData(dynamics,goods)
      },
      confirm2(){
        // this.$store.state.selectRecordsInfo.companyId
        wx.navigateTo({
          url:`../choosefriends/main?companyId=`+this.$store.state.selectRecordsInfo.companyId
        })
      },
      mask_tag(){
        this.maskShow = false
      },
      mask_tag_stop(){
      },
      mask_cancel(){
        this.maskShow = false
      },
      contact_tag(res){
        this.contact = 1
        console.log(this.contact)
      }
		},
    destroyed() {
      this.$store.state.selectRecordsInfo = []
      this.$store.state.selectGoodsInfo = []
    }
	}
</script>

<style scoped>
.share-now{
  height: 100%;
  display: flex;
  background-color: #F8F8F8;
  flex-direction: column;
  position: relative;
  }
.sample-article{
  background: #FFFFFF;
  border-radius: 20upx;
  box-sizing: border-box;
}
.article-title{
  display: flex;
  align-items: center;
  padding: 0 30upx 0upx 30upx;
  border-bottom:1upx solid #F8F8F8;
}

.article-title p{
  display: block;
  height: 88upx;

  font-size: 32upx;
  font-weight: bold;
  line-height: 88upx;
}
.article-title span{
  width: 20upx;
  height: 20upx;
  border-radius: 50%;
  background: #51CDCB;
  margin-right: 17upx;
}
.article-img{
  padding:30upx;
}
.share-now-wrap{
  flex: 1;
  overflow:auto;
  -webkit-overflow-scrolling:touch;
  padding:20upx 30upx 30upx 30upx;
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
.commodity-list{
  margin-top: 20upx;
  border-radius: 20upx;
  background-color: #FFFFFF;
}
.recommend-title{
  height: 88upx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom:1upx solid #F8F8F8;
  padding:0 20upx 0 30upx;
}
.title{
  display: flex;
  align-items: center;
}
.title span{
  width: 20upx;
  height: 20upx;
  border-radius: 50%;
  margin-right: 17upx;
}
.title p{
  font-size: 32upx;
  font-weight: bold;
  line-height: 88upx;
}
.add-commidit{
  height: 48upx;
  width: 130upx;
  border:1upx solid #51CDCB;
  border-radius: 25upx;
  justify-content: center;
  display: flex;
  align-items: center;
}
.commodity{
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: relative;
}
.commodity-title{
  width: 490upx;
  font-size: 28upx;
  line-height: 44upx;
  height: 80upx;
  font-weight: 600;
  word-break: break-all;
  display: -webkit-box; /**对象作为伸缩盒子模型展示**/
  -webkit-box-orient: vertical; /**设置或检索伸缩盒子对象的子元素的排列方式**/
  -webkit-line-clamp: 2; /**显示的行数**/
  overflow: hidden; /**隐藏超出的内容**/
}
.delete{
  position: absolute;
  width: 490upx;
  bottom: 20upx;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
</style>
