<template>
	<view>
		<view class="item">
			<view class="top">
				<view class="name">{{ list.name }}</view>
				<view class="phone">{{ list.phone }}</view>
				<view class="tag">
					<text>{{ list.typeText }}</text>
				</view>
			</view>
			<view class="bottom">
				{{list.typeText == '支付宝' ? '收款账号：'+list.number : list.bankText+'：'+list.number}}
				<u-icon name="edit-pen" :size="40" color="#999999" @click="$U.outputMsg('这里可以选择删除或编辑')"></u-icon>
			</view>
		</view>
		<view class="addSite" @tap="toAdd">
			<view class="add">
				<u-icon name="plus" color="#ffffff" class="icon" :size="30"></u-icon>新建收款方式
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			list:{
				type:[Array,Object]
			}
		},
		methods:{
			toAdd() {
				return this.$emit('add');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		padding: 40rpx 20rpx;

		.top {
			display: flex;
			font-weight: bold;
			font-size: 34rpx;

			.phone {
				margin-left: 40rpx;
			}

			.tag {
				display: flex;
				font-weight: normal;
				align-items: center;

				text {
					display: block;
					width: 80rpx;
					height: 34rpx;
					line-height: 34rpx;
					color: #ffffff;
					font-size: 20rpx;
					border-radius: 6rpx;
					text-align: center;
					margin-left: 30rpx;
					background-color: #f8c750;
				}

				.red {
					background-color: red
				}
			}
		}

		.bottom {
			display: flex;
			margin-top: 20rpx;
			font-size: 28rpx;
			justify-content: space-between;
			color: #999999;
		}
	}

	.addSite {
		display: flex;
		justify-content: space-around;
		width: 600rpx;
		line-height: 100rpx;
		position: absolute;
		bottom: 30rpx;
		left: 80rpx;
		background-color: #f8c750;
		border-radius: 60rpx;
		font-size: 30rpx;

		.add {
			display: flex;
			align-items: center;
			color: #ffffff;

			.icon {
				margin-right: 10rpx;
			}
		}
	}
</style>

