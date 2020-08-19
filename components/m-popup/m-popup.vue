<template>
	<view>
		<!-- 弹出层 切换 -->
		<uni-popup ref="popup" type="center" :animation="true">
			<view class="p-3 flex align-center justify-center">
				<view>新人帮助提示</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	export default {
		components: {
			uniPopup
		},
		data() {},
		methods: {
			close() {
				this.$refs.popup.close();
			},
			confirm(){
				this.$emit('confirm');
			}
		}
	}
</script>

<style>

</style>
