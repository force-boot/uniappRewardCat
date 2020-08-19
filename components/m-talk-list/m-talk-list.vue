<template>
	<view class="animated fadeIn m-talk-list">
		<block v-for="(item, index) in list" :key="index">
			<view class="li flex justify-start">
				<u-avatar size="120" mode="circle" v-if="item.type==='left'"></u-avatar>
				<view class="right">
					<view class="title flex">
						<text class="time" v-if="item.type==='right'">{{item.time}}</text>
						<text class="font-s-3 name hidden-text-line-1">{{item.name}}</text>
						<text class="time" v-if="item.type==='left'">{{item.time}}</text>
					</view>
					<view :class="['textarea', item.type==='left'?'textarea_right_border':'textarea_left_border'] ">{{item.content}}</view>
				</view>
				<u-avatar size="120" mode="circle" v-if="item.type==='right'"></u-avatar>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: [Array,Object]
			}
		},
		data() {
			return {
				type: 'left'
			}
		},
		methods: {
		}
	};
</script>

<style lang="scss">
	.m-talk-list {
		width: 100%;
		.li {
			padding: 0 20rpx;
			margin-bottom: 40rpx;
			.right {
				margin-left: 10rpx;
				padding-right: 20rpx;
				.title {
					align-items: flex-end;
					.name {
						width: 400rpx;
					}
					.time {
						color: rgb(100,100,100);
						font-size: 28rpx;
						padding: 0 10rpx;
					}
				}
				.textarea {
					background-color: rgb(243,249,253);
					padding: 10rpx;
					margin: 20rpx 0;
					font-size: 24rpx;
					color: rgb(143,146,147);
				}
				.textarea_right_border {
					border-top-right-radius: 30rpx;
					border-bottom-left-radius: 30rpx;
					border-bottom-right-radius: 30rpx;
				}
				.textarea_left_border {
					border-top-left-radius: 30rpx;
					border-bottom-left-radius: 30rpx;
					border-bottom-right-radius: 30rpx;
				}
			} 
		}
	}
</style>
