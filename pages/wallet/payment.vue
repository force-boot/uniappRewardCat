<template>
	<view>
		<m-payment-list :list="list" @add="toAdd"></m-payment-list>
		<view class="animated fadeIn" style="position: absolute;top:150rpx;left: 255rpx;" v-if="noData">
			<u-empty mode="data" text="你还没有添加收款方式"></u-empty>
		</view>
	</view>
</template>

<script>
	import mPaymentList from '@/components/m-payment-list/m-payment-list.vue';
	export default {
		components: {
			mPaymentList
		},
		data() {
			return {
				list: [],
				noData: false
			};
		},
		onLoad() {
			this.getData();
		},
		methods: {
			getData() {
				let list = uni.getStorageSync('testAddPay');
				if (!list) return this.noData = true;
				list.phone = this.$U.hiddenPhone(list.phone);
				this.list = list;
			},
			toAdd() {
				uni.navigateTo({
					url: 'addPay'
				});
			}
		}
	};
</script>

<style lang="scss" scoped>

</style>
