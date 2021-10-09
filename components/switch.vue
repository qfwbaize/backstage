<template>
  <div class="toggle-button">
    <span class="weui-switch" :class="{'weui-switch-on' : checked}" :value="value" @click="toggle">
      <i class="weui-switch-text" :class="{'checked' : checked}">{{checked ? onText : offText}}</i>
    </span>
  </div>
</template>

<script>
import WXAJAX from '@/utils/request'
import utils from '@/utils/index'
import {
  mapGetters
} from 'vuex';
export default {
    name: 'switch',
    props: {
        onText: {
            type: String,
            default: ''
        },
        offText: {
            type: String,
            default: ''
        },
        propsChecked: {
            type: Boolean,
            default: false
        },
        shareType: {
            type: Number,
            default: 1
        }
    },
    data () {
        return {
            checked: true
        };
    },
    methods: {
        toggle () {
            this.checked = !this.checked;
            this.$emit('switchchange',this.checked,this.shareType);
        }
    },
    mounted () {
        this.checked = this.propsChecked;
    }
};
</script>

<style scoped>
.weui-switch {
  display: block;
  position: relative;
  width: 100rpx;
  height: 40rpx;
  border: 1rpx solid #DFDFDF;
  outline: 0;
  border-radius: 20rpx;
  box-sizing: border-box;
  background-color: #D3D3D3;
  transition: background-color 0.1s, border 0.1s;
  cursor: pointer;
}
.weui-switch:before {
  content: "";
  position: absolute;
  top: 2rpx;
  left: 0;
  width: 30rpx;
  height: 30rpx;
  border-radius: 15px;
  background-color: #FDFDFD;
  transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
}
.weui-switch:after {
  content: "";
  position: absolute;
  top: 2rpx;
  left: 0;
  width: 30rpx;
  height: 30rpx;
  border-radius: 15rpx;
  background-color: #FFFFFF;
  transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
}
.weui-switch-text {
  position: absolute;
  color: #ffffff;
  font-size: 24rpx;
  top: 50%;
  right: 12%;
  transform: translateY(-50%);

}
.checked {
    left: 10%;
  }
.weui-switch-on {
  border-color:#00e266;
  background-color: #00e266;
}
.weui-switch-on:before {
  border-color: #00e266;
  background-color: #00e266;
}
.weui-switch-on:after {
  transform: translateX(65rpx);
}
</style>
