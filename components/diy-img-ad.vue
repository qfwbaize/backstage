<template>
	<view>
		<view class="single-graph" v-if="value">
			<!-- <view v-if="value[0].adv_show_type == 1" @click="redirectTo(value[0].href)" class="box-img">
				<image :src="value[0].src" mode="widthFix"></image>
			</view>	 -->
			<swiper  class="swiper" autoplay="true" indicator-dots="false" circular="true" indicator-active-color="#ffffff" >
				<swiper-item class="swiper-item" v-for="(item, index) in value" :key="index" v-if="item.url" @click="redirectTo(item.src,item.id)">
					<image :src="item.url" mode="widthFix"></image>
				</swiper-item>
			</swiper>

		</view>
	</view>
</template>

<script>
export default {
	name: 'diy-img-ad',
	props: {
		value: {
			type: Array
		}
	},
	data() {
		return {};
	},
	created() {},
	methods: {
		redirectTo(link,id) {
			this.$emit('redirectTo', link,id);
		}
	}
};
</script>

<style>
.single-graph {
	width: 100%;
	line-height: 0;
	display: flex;
	justify-content: center;
	flex-direction: column;
	background:#fff;

}
.box-img{
	padding: 35rpx;
}
.single-graph image {
	width: 100%;
	height: 350rpx;
	border-radius: 18rpx;
}
.swiper{
	height: 350rpx;
	padding:40rpx;
  padding-bottom: 0;
  padding-top: 16rpx;
}
.swiper-item{
	display: flex;
	justify-content: center;
	flex-direction: column;
}
</style>
