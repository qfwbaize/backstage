<template>
	<div class="h100p bgfff">
		<div class="pl15 pr15 bgfff disflex wrap">

			<div class="fs12 c38 pt15" v-for="(type1,index1) in profession" :key="index1">
				<div class="disflex wrap">
					<span class="be8 pl15 pr16 mb15 lh30 mr8 bradius5" :class="choose_id == type1.id ? 'bge8' : '' "
						@click="btn_tap(type1)">{{type1.name}}</span>
				</div>
			</div>

		</div>
		<div class="fs18 textc lh49 fix_bottom bg_line_blue cfff" @click="essayTypeControl">
			分类管理
		</div>
	</div>
</template>

<script>
	import WXAJAX from '@/utils/request'

	export default {
		name: '',
		components: {},
		data() {
			return {
				choose: '',
				choose_id: 0,
				profession: '',
			}
		},
		mounted() {

			let _a = wx.getStorageSync('choose_essayType') || '';
			this.choose = _a.name;
			this.choose_id = _a.id;
			//获取文章分类
			// this.inits();

		},
		onShow() {
			let _a = wx.getStorageSync('choose_essayType') || '';
			this.choose = _a.name;
			this.choose_id = _a.id;
			//获取文章分类
			this.inits();
		},
		methods: {
			inits() {
				wx.showLoading();

				let params = {
					companyId: wx.getStorageSync('COMPANYID'),
					pageNum: 1,
					pageSize: 100
				}
				console.log(params)
				WXAJAX.POST(params, '', '/essayType/queryPage', '', '', 1).then((data) => {
					console.log(data);
					wx.hideLoading();
					this.profession = data.list;

				}).catch((err) => {
					console.log(err);
					wx.hideLoading();
				});
			},
			btn_tap(item) {
				this.choose = item.name;
				wx.navigateBack();
				wx.setStorageSync('choose_essayType', item);
			},
			essayTypeControl() {
				wx.navigateTo({
					url: `../essayTypeControl/main`
				})
			}
		}
	}
</script>

<style>

</style>
