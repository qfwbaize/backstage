<template>
  <div class="textc outer">
    <img mode="widthFix"
         width="340rpx"
         src="https://myy-one-stand.oss-cn-beijing.aliyuncs.com/product-index/20190418164236.png"
         alt="">
    <p class="desc">
      <slot>{{desc ||"暂无产品"}}</slot>
    </p>
  </div>
</template>

<script>
export default {
  name: "noData",
  props: ['desc']
}
</script>

<style scoped>
.outer {
  padding: 60upx 0;
}
img {
  margin-top: 220rpx;
  width: 340upx;
  height: 340upx;

  }
.desc {
  font-size: 28upx;
  color: #a8a8a8;
}
</style>
