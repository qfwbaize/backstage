<template>
    <div class="statements pb60 ">
        <div class="bgfff pl15 pr15 pt9 pb5">
            <div class="c38 fs16 fbold lh32 mb20">选择展示行业</div>
            <div class="disflex lh38 wrap mb25 bbf5f6" v-if="selectIndustry">
              <div class="pl15 pr15 pt10 pb10 lh1 bgblue be8 mb20 mr10 bradius3 fs12 cfff posre" 
                   v-for="(item,index) in selectIndustry" 
                   :key="index">
                   {{item.industryName}}
                  <div class="industry_circular" @click="delete_class(index)">
                    <span class="industry_line"></span>
                  </div>
               </div>
            </div>
            
            <div class="disflex  lh38 wrap">
              <div class="pl15 pr15 pt10 pb10 mr10 fs12 lh1 be8 mb20 bradius3" 
                   v-for="(item,index) in profession" 
                   @click="addindustry(item)"
                   :key="index">
                  {{item.industryName}}
              </div>
            </div>
        </div>
        <div class="fs18 textc lh49 fix_bottom bg_line_blue cfff" @click="btn_tap(url)">
            保存
        </div>
    </div>
</template>
<script>
import WXAJAX from '@/utils/request';
export default {
    data(){
        return{
            profession:[],
            btnstate:false,
            selectIndustry:[]
        }
    },
    mounted() {
      this.inits()
      this.getIndustry()
    },
    methods:{
      getIndustry(){
        WXAJAX.POST({ 
          companyId:''
        }, '', '/market/queryMarketIndustry').then((data) => {
          wx.hideLoading();
          if(data){
            this.selectIndustry = data
          }else{
            this.selectIndustry = []
          }
           
        }).catch((err) => {
          console.log(err);
          wx.hideLoading();
        });
      },
      inits(){
        wx.showLoading();

        WXAJAX.GET({ }, '', '/industry/getList').then((data) => {

          wx.hideLoading();
          data.forEach(v => {
            v.isSelect = false
          });
          this.profession = data ;
          
        }).catch((err) => {
          console.log(err);
          wx.hideLoading();
        });
      },
      addindustry(item){
        this.selectIndustry.push(item)
        let obj = {};
        this.selectIndustry = this.selectIndustry.reduce(function(item, next) {
          obj[next.industryId] ? '' : obj[next.industryId] = true && item.push(next);
          return item;
        }, []);
      },
      delete_class(index){
        this.selectIndustry.splice(index, 1)
      },
      btn_tap(){
        let data = {
          categorys:[],
          companyId:''
        } 
        for(var i in this.selectIndustry){
          data.categorys.push({industryId:this.selectIndustry[i].industryId})
        }
        wx.showLoading({
          title:'加载中...',
          mask:true
        });
        WXAJAX.POST(data, '', '/market/updateMarketIndustry').then((data) => {
          
          setTimeout(()=>{
            wx.hideLoading();
            wx.navigateBack({
              delta:1
            })
          },500)
        }).catch((err) => {
          console.log(err);
          wx.hideLoading();
        });
      }
    }
}
</script>
<style scoped>
.industry_circular{
  width: 40upx;
  height: 40upx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #333333;
  border-radius: 50%;
  position: absolute;
  right: -14upx;
  top: -20upx;
}
.industry_line{
  height: 2upx;
  width: 20upx;
  background: #ffffff;
}
</style>
