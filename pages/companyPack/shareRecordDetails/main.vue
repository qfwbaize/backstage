<template>
  <scroll-view class="share-record-details bgfff"
               scroll-y="true"
               enable-back-to-top="true"
               scroll-anchoring="true"
               scroll-with-animation>
    <shareDetailsTop :info="list"/>
    <div class="line"></div>
    <div class="list"
         v-if="list">
      <shareUserItem v-for="(info, index) of list.commentModelList"
                     :key="index"
                     :info="info"/>

    </div>
  </scroll-view>
</template>
<script>
  import shareDetailsTop from "./components/shareDetailsTop";
  import shareUserItem from "./components/shareUserItem";
  import tools from '../../../utils/index.js';
  import WXAJAX from "@/utils/request";
  import {mapState} from "vuex";

  export default {
    components: {
      shareDetailsTop,
      shareUserItem
    },
    data() {
      return {
        id: "", //文章id,
        list: {
          shareNum: 0,
          seeNum: 0,
          winCustomers: 0,
          createTime: '',
          title: ''
        }
      };
    },
    computed: {
      ...mapState({
        shareRecordsInfo: state => state.shareRecordsInfo
      })
    },
    mounted() {
      this.queryInfo();
    },
    methods: {
      async queryInfo() {
        try {
          let data = await WXAJAX.POST(
            {ignore: true, dynamicId: this.id},
            "",
            "/customerEssay/queryDynamicVisitors"
          );
          if (data) {
            console.log(data.createTime)
            data.commentModelList.forEach(com =>{
              com.sumTimes = com.sumTimes == 0 ? "1秒" : this.formatSeconds(com.sumTimes);
            })

            this.list = data;

          }
          this.isLoading = false;
          wx.hideLoading();
        } catch (error) {
          this.isLoading = false;
          wx.hideLoading();
          this.list = [];
          console.log(".............", error);
        }
      },
      /**
       * 格式化秒
       * @param int  value 总秒数
       * @return string result 格式化后的字符串
       */
      formatSeconds(value) {
        var theTime = parseInt(value);// 需要转换的时间秒
        var theTime1 = 0;// 分
        var theTime2 = 0;// 小时
        var theTime3 = 0;// 天
        if (theTime > 60) {
          theTime1 = parseInt(theTime / 60);
          theTime = parseInt(theTime % 60);
          if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
            if (theTime2 > 24) {
              //大于24小时
              theTime3 = parseInt(theTime2 / 24);
              theTime2 = parseInt(theTime2 % 24);
            }
          }
        }
        var result = '';
        if (theTime > 0) {
          result = "" + parseInt(theTime) + "秒";
        }
        if (theTime1 > 0) {
          result = "" + parseInt(theTime1) + "分" + result;
        }
        if (theTime2 > 0) {
          result = "" + parseInt(theTime2) + "小时" + result;
        }
        if (theTime3 > 0) {
          result = "" + parseInt(theTime3) + "天" + result;
        }
        return result;
      }
    },
    onLoad(params) {
      this.id = params.id;
    }
  };
</script>
<style scoped>
  .share-record-details {
    height: 100%;
  }

  .line {
    width: 100%;
    height: 20 upx;
    background: #FFFFFF;
  }
</style>
