<template>
	<view class="m-chat">
		<view class="flex justify-end box">
			<image src="../../static/image/jia.png" style="width: 60rpx;height: 60rpx;" @click="showMore=!showMore"></image>
			<textarea placeholder="请出入..." auto-height="true" class="textarea"></textarea>
			<view class="send">发送</view>
		</view>
		<template v-if="showMore">
			<view class="more flex">
				<view class="li justify-center align-center flex" @click="handleLaunchImage">
					<view class="img flex justify-center align-center">
						<image src="../../static/image/tupian.png" style="width: 50rpx;height: 50rpx;"></image>
					</view>
					<text class="tip">相册</text>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showMore: true
			}
		},
		methods:{
			// 选择图片
			handleLaunchImage() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					success: (res) => {
						
					},
					fail: (e) => {
						
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.m-chat {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		padding: 20rpx;
		.box {
			align-items: flex-end;
		}
		.textarea {
			font-size: 32rpx;
			margin: 0 10rpx;
			line-height: 60rpx;
			width: 500rpx;
		}
		.send {
			background-color: #f8c750;
			width: 130rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			border-radius: 30rpx;
		}
		.more {
			flex-wrap: wrap;
			border-top: 2rpx solid rgb(236,236,236);
			margin-top: 20rpx;
			padding: 40rpx 0;
			.li {
				flex-direction: column;
				.img {
					width: 100rpx;
					height: 100rpx;
					border-radius: 20rpx;
					background-color: rgb(236,236,236);
				}
				.tip {
					font-size: 24rpx;
					margin-top: 10rpx;
				}
			}
		}
	}
</style>
