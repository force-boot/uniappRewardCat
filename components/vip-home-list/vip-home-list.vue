<template>
	<view>
		<view class="flex align-center justify-between pt-3 pb-4" style="border-bottom: #e5e5e5 1rpx solid;">
			<view style="border-radius: 100%;width: 80rpx;height: 80rpx;" class="bg-main flex align-center justify-center">
				<u-icon :name="icon" size="45"></u-icon>
			</view>
			<view class="flex flex-column flex-1 ml-2">
				<view>{{title}}</view>
				<view class="text-gray mt-1" style="font-size: 26rpx;">{{desc}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String
			},
			desc:{
				type:String
			},
			icon:{
				type:String
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
