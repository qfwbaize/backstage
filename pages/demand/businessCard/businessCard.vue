<template>
	<view class="content">
	   <txl @ev="evFunc" :datas="datas" color="red" :index="true" name="employeeName"></txl>
     <view class="noMsg" v-if="friendList.length == 0">
       <view class="noYet">
         <image src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png" mode="">
         </image>
         <view class="">暂无信息</view>
       </view>
     </view>
	</view>
</template>

<script>
  import txl from '@/components/yt-txl/index.vue'
  import WXAJAX from "@/utils/request";
  import MsgBox from '@/components/msgBox'
  let datas = []
	export default {
    components:{txl,MsgBox},
		data() {
			return {
				 datas:datas,
         friendList:[]
			}
		},
    onShow(){
      this.getMailList()
    },
		methods: {
			evFunc(data){
        uni.navigateTo({
          url: '../../IM/main?userId=' + data.userId + '&logo=' + data.logo + '&type=2&cardId=' + data.cardId + '&name=' + data.name +
            '&wxCode=' + data.wxCode + '&phone=' + data.phone + '&companyId=' + data.companyId
        })
			},
      getMailList(){
        WXAJAX.POST({
          name:'',
          pageNum:1
        },'','/ipa/selectIpaList','','').then((res)=>{
          this.friendList = res.list
          console.log(res,11111)
          res.list.forEach((item)=>{
            datas.push(item)
            item.employeeName = item.name
            item.departmentName = item.companyName
            item.employeeId = item.cardId
            item.companyId = item.companyId
            // item.companyName = item.companyName
            item.postName = item.position
            item.url = item.logo
          })
          datas = []
        })
      }
		}
	}
</script>

<style scoped>
.noMsg {
    width: 750rpx;
    height: 80vh;
    overflow: hidden;
  }

  .noYet {
    width: 300rpx;
    height: 350rpx;
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-left: 215rpx;
    margin-top: 300rpx;
    color: rgba(141, 141, 141, 100);
  }

  .noMsg image {
    width: 300rpx;
    height: 300rpx;
    display: block;
  }
</style>
