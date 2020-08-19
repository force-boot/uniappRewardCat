<template>
	<view>
		<view class="border-bai border-redius">
			<view :style="'font-size:' + size + 'rpx;margin:' + margin + 'rpx;'" class="text-gray">{{ text }}</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		text: {
			type: String
		},
		size: {
			type: [String, Number],
			default: '17'
		},
		margin: {
			type: String,
			default: '7'
		}
	},
	methods: {}
};
</script>

<style>
.border-redius {
	background: #f9f9f9;
	border-radius: 10rpx;
}
</style>
