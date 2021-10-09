<template>
  <div class="disflex flex-column pl15 pr15 pt15">
    <div class="disflex jsbet bgfff bradius5 pl15 pr15 pt15 pb15 mb10"
         v-for="(item,index) in userData" :key="index"
         @click="list_tap(item.formId,item.commitUserId)">
      <div class="disflex">
        <img :src="item.logo" class="w50 h50 bradius5">
        <div class="disflex flex-column jsaround ml15">
          <p class="fs16 fbold c38">{{item.name}}</p>
          <p class="fs12 c38">{{item.phone}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WXAJAX from "@/utils/request";
import util from "@/utils/index";


export default {  
  data() {
    return {
      userData:[ ],
      pageNum:1,
      total:''
    };
  },
  onLoad(){
    this.getQueryPageFeedback(this.pageNum)
  },
  mounted() {
    
  },
  onPullDownRefresh(){
    console.log(111)
  },
  onReachBottom(){
    this.getQueryPageFeedback(this.pageNum)
  },
  components:{},
  methods: {
    list_tap(id,userId){
      wx.navigateTo({
        url:`../questionnaire/main?formId=${id}&userId=${userId}`
      })
    },
    getQueryPageFeedback(pageNum){
      wx.showLoading()
      if(pageNum != 1 && pageNum >= this.total){
        return uni.showToast({
                  title:'已经到底了~'
                })
      }
      let data = {
        commitUserId:uni.getStorageSync('userId'),
        companyId:uni.getStorageSync('COMPANYID'),
        pageNum:pageNum
      }
      WXAJAX.POST(data,'','/advancedForm/queryPageFeedback')
      .then(data=>{
        if(data){
          wx.hideLoading();
          this.userData = [...this.userData, ...data.pageInfo.list]
          this.total = data.pageInfo
        }
        this.pageNum ++ 
        
      })
      .catch((err) => {
        wx.hideLoading();
        console.log(err)
        uni.showToast({
          title:err,
          icon:'none'
        })
      })    
    }
  },
  
};
</script>

<style scoped>

</style>