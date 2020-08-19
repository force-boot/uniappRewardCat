<template>
	<view>
		<view class="flex align-center justify-between p-3">
			<view class="flex flex-column">
				<view style="font-size: 30rpx;font-weight: bold;max-width: 450rpx;" class="nowrap">{{ taskInfo.taskName }}</view>
				<view class="flex align-center mt-1">
					<view class="text-jin" style="font-size: 23rpx;">请务必在{{taskInfo.confirmDuration}}小时内审核完成，否则将被视为自动完成</view>
				</view>
			</view>
			<view style="position: absolute;right: 170rpx;">
				<u-line color="#dadada" length="80rpx" direction="col" />
			</view>
			<view class="flex flex-column">
				<view style="color: #6e788c;" class="mb-1 flex align-center">
					<u-icon name="integral-fill" size="28"></u-icon>
					<view class="ml-1">-{{ taskInfo.rewardPrice / 100}}</view>
				</view>
				<view style="color: #ff843c;" class="flex align-center">
					<u-icon name="integral-fill" size="28"></u-icon>
					<view class="ml-1">-{{ taskInfo.superRewardPrice / 100}}</view>
				</view>
			</view>
		</view>
		<view class="flex align-center justify-between mb-3 ml-3 mr-2">
			<view style="font-size: 28rpx;">本次结算：<text class="text-jin" style="font-size: 28rpx;">-{{ taskInfo.rewardFee / 100}}</text></view>
			<view class="text-gray" style="font-size: 27rpx;">提交时间：{{$u.timeFormat(Math.round(taskInfo.commitTime/1000), 'yyyy-mm-dd hh:MM:ss')}}</view>
		</view>
		<view class="px-3">
			<u-line color="#dadada" length="700rpx" />
		</view>

		<view class="px-3 pt-1 pb-2">
			<view class="flex align-center justify-start pt-2">
				<u-avatar :src="taskInfo.orderAvatarImage" mode="circle" :size="90"></u-avatar>
				<view>
					<view class="flex flex-column ml-2 mb-1">
						<view class="font-weight-bold ml-1 flex align-center">
							<view style="font-size: 30rpx;max-width: 330rpx;" class="nowrap">{{ taskInfo.orderUsername }}</view>
							<text>（ID:{{ taskInfo.userId }}）</text>
						</view>
						<view class="flex align-center" style="margin-top: 15rpx;">
							<view style="border-radius: 20rpx;height: 35rpx;width: 100rpx;" class="border-bai flex align-center justify-center mr-1"
							 :class="taskInfo.orderHasNameAuth ? 'my-icon-bgcolor-cheng' : 'my-icon-bgcolor-hui'">
								<view class="text-bai" style="margin-left: 5rpx;font-size: 20rpx;">{{ taskInfo.hasNameAuth ? '已实名' : '未实名' }}</view>
							</view>
							<view style="border-radius: 20rpx;height: 35rpx;width: 100rpx;" class="border-bai flex align-center justify-center mr-1 my-icon-bgcolor-hc"
							 v-show="taskInfo.orderUserDeposit > 0">
								<view class="text-bai" style="margin-left: 5rpx;font-size: 20rpx;">保证金</view>
							</view>
							<view style="border-radius: 20rpx;height: 35rpx;width: 125rpx;" class="border-bai flex align-center justify-center"
							 :class="taskInfo.orderSuperTrader == 1 ? 'my-icon-bgcolor-hon' : 'my-icon-bgcolor-hui'">
								<view style="margin-bottom: 8rpx;">
									<u-icon name="integral" color="#FFFFFF" size="17"></u-icon>
								</view>
								<text class="text-bai" style="margin-left: 5rpx;font-size: 20rpx;">超级商人</text>
							</view>
						</view>
					</view>
				</view>
				<view class="flex justify-end flex-1 mb-1" @click="clickChat(taskInfo.userId)">
					<view class="flex align-center flex-column">
						<u-icon name="chat" color="#9299a0" size="48"></u-icon>
						<view class="text-gray" style="font-size: 25rpx;">联系接单人</view>
					</view>
				</view>
			</view>
		</view>
		<u-gap height="19" bg-color="#f5f4f4"></u-gap>
		<view class="p-3">
			<view class="mb-2">审核步骤</view>
			<block v-for="(item, index) in steps" :key="index">
				<view class="my-3">
					<view class="flex align-center justify-between">
						<view>
							<view class="flex align-center">
								<view class="flex align-center">
									<text style="border-radius: 100%;width: 35rpx;height: 35rpx;" class="bg-main mr-1 flex align-center justify-center">{{index+1}}</text>
									<view class="font-weight-bold">
										提交截图{{ $U.numberToHz(index+1) }}</view>
								</view>
							</view>
							<view class="my-2" style="margin-left: -11rpx;" v-if="item.voucherImage.length > 0">
								<view class="mx-1 flex align-center">
									<view class="mr-3">
										<image :src="item.voucherImage" mode="aspectFill" style="width: 200rpx;height: 200rpx;" @click.stop="previewImage(item.voucherImage)"></image>
									</view>
								</view>
							</view>
						</view>

						<view>
							<view class="flex align-center ml-5">
								<view class="flex align-center">
									<view class="font-weight-bold">
										示例图</view>
								</view>
							</view>
							<view class="my-2" style="margin-left: -11rpx;" v-if="item.stepImage.length > 0">
								<view class="mx-1 flex align-center">
									<view class="mr-3">
										<image :src="item.stepImage" mode="aspectFill" style="width: 200rpx;height: 200rpx;" @click.stop="previewImage(item.stepImage)"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>

		<u-gap height="19" bg-color="#f5f4f4"></u-gap>
		<template v-if="taskInfo.extraData">
			<view class="pt-1 px-3 pb-4">
				<view class="mt-2">
					<view class="flex align-center">
						<view style="font-size: 30rpx;">提交数据</view>
						<text class="text-gray ml-2" style="font-size: 27rpx;">任务完成后需要提交的信息</text>
					</view>
					<view class="mt-3">
						<view style="background-color: #EEEEEE;height: 70rpx;border-radius: 15rpx;" class="flex align-center">
							<text class="text-gray ml-1" style="font-size: 27rpx;">{{ taskInfo.extraData}}</text>
						</view>
					</view>
				</view>
			</view>
			<u-gap height="19" bg-color="#f5f4f4"></u-gap>
		</template>
	</view>
</template>

<script>
	import h5Copy from '../../js_sdk/junyi-h5-copy/junyi-h5-copy/junyi-h5-copy.js';
	import mTags from '@/components/m-tags/m-tags.vue';
	export default {
		components: {
			mTags
		},
		props: {
			taskInfo: {
				type: Object
			},
			steps: {
				type: Array
			}
		},
		data() {
			return {

			};
		},
		methods: {
			previewImage(imgUrl) {
				uni.previewImage({
					urls: [imgUrl],
				})
			},
			clickChat(userId) {
				uni.navigateTo({
					url: '../../pages/talk/index?chatId='+userId
				});
			},
		}
	}
</script>

<style>

</style>
