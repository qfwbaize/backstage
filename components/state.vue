<template>
	<view>
		<view v-show="status == 0">待签约</view>
		<view v-show="status == 1">进行中</view>
		<view v-show="status == 2">验收中</view>
		<view v-show="status == 3">已验收</view>
		<view v-show="status == 4">已完成</view>
	</view>
</template>

<script>
	export default {
    props:['status'],
		data() {
			return {

			};
		}


	}
</script>

<style>

</style>
