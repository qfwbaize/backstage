<template>
  <div class="vertical-data" @click="btn_tap(url)">
    <p class="top">{{title}}</p>
    <p class="bottom">{{subtitle||0}}</p>
  </div>
</template>
<script>
export default {
  props: ["title", "subtitle", "url"],
  methods: {
      btn_tap(url){
        console.log("数据统计点击事件");
          this.$emit('btn_tap',url);
      }
  }
};
</script>
<style scoped>
.vertical-data {
  display: inline-block;
  width: 208upx;
  height: 128upx;
  border: 1upx solid #f5f5f6;
  border-radius: 10upx;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
.vertical-data .top {
  margin-top: 30upx;
  line-height: 24upx;
  font-size: 24upx;
  color: #383838;
  text-align: center;
}
.vertical-data .bottom {
  font-size: 32upx;
  line-height: 32upx;
  font-weight: bold;
  color: #51cdcb;
  text-align: center;
  margin-top: 20upx;
}
</style>
