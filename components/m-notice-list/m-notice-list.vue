<template>
	<view class="animated fadeIn">
		<view class="flex align-center p-2" style="border-bottom: #F5F5F5 1rpx solid">
			<u-avatar :src="data.img" mode="circle" :size="95"></u-avatar>
			<view class="flex flex-column ml-2">
				<view class="flex justify-between">
					<view class="font-weight-bold mb-1 flex align-center justify-start" style="font-size: 32rpx;">{{data.username}}</view>
					<view class="text-gray" style="position: absolute;right: 20rpx;">{{data.date}}</view>
				</view>
				<view class="text-gray nowrap" style="max-width: 500rpx;">
					{{data.content}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: [Object, Array]
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style>

</style>
