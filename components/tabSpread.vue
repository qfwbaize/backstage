<template>
  <scroll-view :class="tabClass"
               :style="tabStyle"
               scroll-with-animation
               scroll-x>
    <div class="tab">
      <div class="tab-item"
           :class="[index === tabCur ?  index == 0 ? 'text-blue-notselected' : selectClass : '']"
           v-for="(item,index) in tabList"
		   :style="{'color': (tabCur !=0? '#000':'#fff')}"
           :key="index"
           :id="index"
           @tap="tabSelect(index,$event)">
        <img v-if="index == 1"
        <span>{{item.name}}</span>
      </div>
    </div>
  </scroll-view>
</template>
<script>
export default {
  name: "tabVideo",

  data() {
    return {
     
    };
  },
  props: {
    // tabList: {
    //     type: Array,
    //     default() {
    //         return [

    //         ];
    //     }
    // },
	tabList:{
		type:Array,
		default() {
		  return "";
		}
	},
    tabCur: {
      type: Number,
      default() {
        return 0;
      }
    },
    tabClass: {
      type: String,
      default() {
        return "";
      }
    },
    tabStyle: {
      type: String,
      default() {
        return "";
      }
    },
    textFlex: {
      type: Boolean,
      default() {
        return false;
      }
    },
    selectClass: {
      type: String,
      default() {
        return "text-blue";
      }
    },
    tabHeight: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  created() {
     console.log('tabStyletabStyletabStyletabStyle',this.tabStyle)
  },
  methods: {
    tabSelect(index, e) {
      if (this.currentTab === index) return false;
      this.$emit("update:tabCur", index);
      this.$emit("change", index);
    },
    rtnIndex(){
      console.log("返回主页1"); 
      wx.switchTab({
        url: '../index/main'
      })
    }
  },
  computed: {}
};
</script>
<style scoped>
div,
scroll-view,
swiper {
  box-sizing: border-box;
}
.tab {
  display: flex;
  align-items: center;
}
.tab-item {
  display: inline-block;
  margin-left: 10upx;
  padding: 0 20upx;
}

.livecss {
  width: 50upx;
  height: 36upx;
  margin-right: 10px;
}
.livecss1 {
  margin-left: 6px;
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.livecssSmail {
  width: 40upx;
  height: 26upx;
  margin-right: 10px;
}

.tab.fixed {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1024;
  box-shadow: 0 1upx 6upx rgba(0, 0, 0, 0.1);
}

.flex {
  display: flex;
}

.flex-sub {
  flex: 1;
}
.text-blue {
  /* width:90px;
  height:34px;
  font-size:20px;
  font-family:PingFang SC;
  font-weight:bold;
  color:rgba(255,255,255,1);
  line-height:48px;
  text-shadow:0px 1px 4px rgba(56,56,56,0.3); */
  font-size: 38upx;
}

.text-blue-notselected {
  font-size: 36rpx;
}
</style>
