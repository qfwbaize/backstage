<template>
    <div >
      <div class="bgfff lh49 pl15 fs18 fbold mb10 btf5f6" @click="pages_tap('setBanner')">
        顶部广告
      </div>
      <div class="bgfff lh49 pl15 fs18 fbold" @click="pages_tap('contacts')">
        行业分类
      </div>
    </div>
</template>
<script>
import WXAJAX from '@/utils/request';
export default {
    data(){
        return{
            
        }
    },
    mounted() {
      
    },
    methods:{
      pages_tap(url){
        console.log(url)
        wx.navigateTo({
          url:'../'+ url +'/main'
        })
      }
    }
}
</script>
<style scoped>
page{
  background: #ffffff;
}
</style>
