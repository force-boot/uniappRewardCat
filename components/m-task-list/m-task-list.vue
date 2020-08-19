<template>
	<view class="animated fadeIn m-task-list">
		<block v-for="(item, index) in list" :key="index">
			<view class="head flex justify-start align-center">
				<u-avatar size="120" mode="circle"></u-avatar>
				<view class="center">
					<text class="name hidden-text-line-1">{{item.name}}</text>
					<view style="color: rgb(239,87,40);margin-top: 10rpx;font-size: 34rpx;">+6.18</view>
				</view>
				<view class="btns">
					<view class="btn font-s-3" @click="btnClick(index)">{{item.btn}}</view>
				</view>
			</view>
			<view class="flex align-center head__bottom">
				<view class="flex align-center" >
					<view style="color: rgb(166,166,166);">{{item.message}}</view>
				</view>
				<view class="font-s-3" style="color: rgb(239,87,40);">{{item.tip}}</view>
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
		methods: {
			btnClick(index) {
				this.$emit('click', index)
			}
		}
	};
</script>

<style lang="scss">
	.m-task-list {
		.head {
			padding: 20rpx;
			justify-content: space-between;
			.header_img {
				width: 150rpx;
				height: 150rpx;
				border-radius: 100%;
			}
			.center {
				margin: 0 20rpx;
				.name {
					width: 350rpx;
					font-size: 32rpx;
				}
			}
			.btns {
				.btn {
					background-color: #f8c750;
					width: 170rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					border-radius: 30rpx;
					margin-bottom: 10rpx;
				}
			}
		}
		.head__bottom {
			margin-top: 20rpx;
			padding: 20rpx 20rpx;
			border-top: 2rpx solid rgb(242,242,242);
			justify-content: space-between;
			border-bottom: 20rpx solid rgb(236,236,236);
		}
	}
</style>
