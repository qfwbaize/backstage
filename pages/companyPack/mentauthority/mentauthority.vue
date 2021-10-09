<template>
  <div class="box">
    <view class="power">
      <view class="" style="font-size: 28rpx;margin-right: 100rpx;">允许该部门成员访问其他部门成员信息</view>
      <switch :checked="switch1"  @change="switch1Change" style="zoom: 0.7;" />
    </view>
    <view class="power">
      <view class="" style="font-size: 28rpx;margin-right: 74rpx;">不允许其他部门成员查看该部门成员信息</view>
      <switch :checked="switch2" @change="switch2Change" style="zoom: 0.7;" />
    </view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        switch1:true,
        switch2:false,
      }
    },
    methods: {
      switch1Change: function(e) {
        console.log('switch1 发生 change 事件，携带值为', e.target.value)
      },
      switch2Change: function(e) {
        console.log('switch2 发生 change 事件，携带值为', e.target.value)
      },
    }
  }
</script>

<style scoped>
  .box{
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
  }
  .power{
    display: flex;
    padding-top: 72rpx;
    padding-left: 48rpx;
  }
</style>
