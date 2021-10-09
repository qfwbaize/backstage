<template>
  <div class="item ">
    <!-- <div class="flex-base h44 pl15 pr15">
      <div class="left flex-base"
           v-if="info.dynamic.type === 2">
        <img class="w16 h16 pr9"
             src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/ai-track/message@2x.png"
             alt="" />
        <span class="cblue fs12">分享动态</span>
      </div>
      <div class="left flex-base"
           v-else>
        <img class="w16 h16 pr9"
             src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/yimai_photos/crm/shard_dynamic_img.png"
             alt="" />
        <span class="fs12 cblue">分享文章</span>
      </div>
      <div class="right fs12 ca8">
        {{ time }}
      </div>
    </div> -->
    <!-- 中部 -->
    <!-- 已分享文章 -->
    <div v-if="status == 2">
    <div
    class="item-box bgfff"
    v-for="info in shareData"
    :key="info.dynamicId">
      <div class="middle flex-base pl15 pr15" @click="toDetail(info.dynamicId)">
        <img :src="info.photos"
             alt=""
             mode="aspectFill"
             class="w60 h60 bradius5 " />
        <div class="content pl15">
          <p class="fs14 c38 title">
            {{ info.title }}
          </p>
          <div class="flex-base">
              <p class="fs12 c38">
                分享
                <span class="fbold cblue pl6">{{'&nbsp;' + info.shareNum+'&nbsp;' }}</span>{{'&nbsp;'}}·{{'&nbsp;'}}
              </p>
              <p class="fs12 c38">
                 浏览
                <span class="fbold cblue pl6">{{'&nbsp;' + info.seeNum+'&nbsp;' }}</span>{{'&nbsp;'}}·{{'&nbsp;'}}
              </p>
              <p class="fs12 c38">
                获客
                <span class="fbold cblue pl6">{{'&nbsp;' + info.winCustomers+'&nbsp;' }}</span>
              </p>
          </div>
        </div>
      </div>
      <div class="flex-base bottom h44 pl15 pr15">
        <div class="flex-base">
           <span class="fs12 ca8">{{ info.createTime }}</span>
        </div>
        <div class=" h25 cblue fs12 btn-box">
          <div class="skip-btn delete ca8" @click="deleteArticle(info.dynamicId)">删除</div>
          <div class="skip-btn visitor cblue" @click="lookDetails(info)">访客</div>
          <!-- <div class="skip-btn share cfff bgblue" @click="shareNow(info.dynamicId,info.companyId,info,'now')">立即分享</div> -->
        </div>
      </div>
    </div>
    </div>
    <!-- 机构文库 -->
    <div v-else>
    <div
    class="item-box bgfff"
    v-for="info in libraryData"
    :key="info.dynamicId">
      <div class="middle flex-base pl15 pr15" @click="toDetail(info.dynamicId)">
        <img :src="info.photos"
             alt=""
             mode="aspectFill"
             class="w60 h60 bradius5 "/>
        <div class="content pl15">
          <p class="fs14 c38 title">
            {{ info.title }}
          </p>
          <p class="flex-base fs12 ca8" style="position: absolute;right: 70rpx;">
            <text v-if="info.isShow==0">审核中</text>
            <text v-else-if="info.isOrgShow==0" style="margin-left: 10rpx;">未展示到机构</text>
          </p>
          <!-- <p v-if="info.isShow==0" class="flex-base fs12 ca8" style="position: absolute;right: 70rpx;">审核中</p>
          <p v-if="info.isOrgShow==0" class="flex-base fs12 ca8" style="position: absolute;right: 70rpx;">未展示到机构</p> -->
          <div class="flex-base fs12 ca8">
              {{info.createTime}}
          </div>
        </div>
      </div>
      <div class="flex-base bottom h44 pl15 pr15" v-if="info.isShow!=0&&info.isOrgShow!=0">
        <div class="flex-base">
           <span class="fs12 ca8"></span>
        </div>
        <div class=" h25 cblue fs12 btn-box">
		      <div class="skip-btn visitor cblue" @click="toCreateTask(info.dynamicId,info.title)">发起任务</div>
          <button class="skip-btn share cfff bgblue" open-type="share" :data-info="info" style="background-color: #51cdcb; color: white;">立即分享</button>
          <div class="skip-btn share cfff bgblue" @click="shareNow2(info.dynamicId,info.companyId,info)">站内分享</div>
          <div class="skip-btn share cfff bgblue" @click="shareNow3(info.dynamicId,info.companyId,info)">精准转发</div>
        </div>
      </div>
    </div>
    </div>
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
import { mapMutations } from "vuex";
import forwardBox from '@/components/forwardBox'
export default {
  props: {
    status: {
      type: String | Number,
      default: "articles"
    },
    info: {
      type: Object | Array
    },
    libraryData:{
      type: Object | Array
    },
    shareData:{
      type: Object | Array
    }
  },
  data() {
    return {
      time: "",
      maskShow:false,
      contact:'',
      articleInfo:[],
    };
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
  mounted() {
    var info = this.info
  },


  components:{forwardBox},
  methods: {
    ...mapMutations(["setShareRecordsInfo","setCompanyId","setInitialization","setSelectRecordsInfo"]),
    //跳转访客
    lookDetails(info) {
      //重置每次跳转后page
      var id = info.dynamicId
      // if(info.seeNum == 0){
      //   wx.showToast({
      //     title:'该文章没有浏览记录，请稍后再来~',
      //     icon:'none'
      //   })
      //   return false
      // }
      this.setShareRecordsInfo({ ...this.info, time: this.time });
      wx.navigateTo({
        url: "../shareRecordDetails/main?id=" + id
      });
    },
    //删除文章按钮
    deleteArticle(id){
      let than = this
      wx.showModal({
        title:'提示',
        content:'删除后无法恢复',
        cancelColor:'#51CDCB',
        success(res){
          if(res.confirm){
            than.$emit('deleteArticle',id)
          }else if(res.cancel){
            console.log('用户点击了取消')
          }
        },
        f
      })
    },
    //跳转文章分享
    //did:文章id cid为公司id
    shareNow(info){
      this.$emit('shareArticle' , info)
      // if(type == 'now'){
      //   console.log(item)
      //   // this.maskShow = true
      //   return
      // }
      // wx.navigateTo({
      //  url:`../shareNow/main?id=${did}&cid=${cid}`
      // })
    },
    shareNow2(did,cid,item,type){
      if(type == 'now'){
        console.log(item)
        // this.maskShow = true
        return
      }
      wx.navigateTo({
       url:`../choosefriends/main?id=${did}&cid=${cid}&saveType=1`
      })
    },
    shareNow3(did,cid,item,type){
      wx.navigateTo({
       url:`../accurateShare/main?id=${did}&cid=${cid}&saveType=2`
      })
    },
    toDetail(did){
      wx.navigateTo({
        url:`../../article/articleDetail/index?id=`+did
        });
    },
    //创建任务
    toCreateTask(dynamicId,title){
      // setSelectRecordsInfo
      var params={
          "dynamicId":dynamicId,
          "title":title
      }
      var newparams=[];
      newparams.push(params)
      console.log("params",newparams);
      this.setSelectRecordsInfo(newparams);
      // this.setCompanyId(id)
      //type1代表创建任务
      var type = 1
      wx.navigateTo({
        url:`../createTask/main?type=${type}`
      })
    },
    //编辑任务
    toEditTask(id,tid){
      //tid为任务id
      var type = 2
      //type2代表编辑任务
      this.setCompanyId(id)
      wx.navigateTo({
        url:`../createTask/main?type=${type}&tid=${tid}`
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

  }
};
</script>
<style scoped>
.item {
  /* width: 690upx; */
}
.item-box{
  border-radius: 20upx;
  float: left;
  margin-bottom: 20upx;
}
.flex-base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.middle {
  align-items: flex-start;
  height: 170upx;
  align-items: center;
}
.title {
  width: 490upx;
  height: 75upx;
  font-weight: 600;
  word-break: break-all;
  display: -webkit-box; /**对象作为伸缩盒子模型展示**/
  -webkit-box-orient: vertical; /**设置或检索伸缩盒子对象的子元素的排列方式**/
  -webkit-line-clamp: 2; /**显示的行数**/
  overflow: hidden; /**隐藏超出的内容**/
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 120upx;
}
.bottom {
  border-top: 1upx solid #f8f8f8;
}
.btn-box{
  display: flex;
  align-items: center;
}
.skip-btn{
  height: 48upx;
  display: flex;
  align-items: center;
  border-radius: 6upx;
  font-size: 26upx;
  margin-right: 20upx;
  box-sizing: border-box;
  text-align: center;
  padding: 0 10upx 0 10upx;
}
.delete{
  border:1upx solid #E8E8E8;
}
.visitor{
  border:1upx solid #51CDCB;
}
</style>
