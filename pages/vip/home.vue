<template>
	<view>
		<view class="bg-main" style="height: 200rpx;">
			<scroll-view scroll-x="true" style="height: 360rpx;" show-scrollbar="true" @scrolltoupper="change(1)"
			 @scrolltolower="change(2)">
				<view class="pt-3 px-3">
					<view class="flex" style="flex-wrap: nowrap;">
						<view class="flex flex-column mr-5 px-3" style="border-radius: 15rpx; min-width: 560rpx;height: 280rpx;background-color: #fff7f4;margin-left: 60rpx;">
							<view class="flex align-center justify-between pb-3 mt-4" style="border-bottom: #e5e5e5 1rpx solid;">
								<view>
									<u-avatar :src="userInfo.avatarImage" mode="circle"></u-avatar>
								</view>
								<view class="flex flex-1 flex-column">
									<view class="flex align-center justify-between mx-2">
										<view class="font-weight-bold" style="font-size: 33rpx;">{{userInfo.username}} </view>
										<view class="flex-1 ml-1">
											<view style="border-radius: 20rpx;height: 38rpx;width: 120rpx;" class="border-bai flex align-center justify-center"
											 :class="userInfo.superTrader == 1 ? 'my-icon-bgcolor-cheng' : 'my-icon-bgcolor-hui'">
												<view style="margin-bottom: 8rpx;">
													<u-icon name="integral" color="#FFFFFF" size="19"></u-icon>
												</view>
												<view class="text-bai" style="margin-left: 5rpx;font-size: 20rpx;">超级商人</view>
											</view>
										</view>
									</view>
									<view class="ml-2 mt-1">
										<text class="text-gray" style="font-size: 27rpx;">{{userInfo.superTrader == 1 ? '有效期：2020-8-09' : '未开通'}}</text>
									</view>
								</view>
							</view>
							<view>
								<view class="flex align-center justify-between mt-3">
									<view class="">
										畅享超级商人+喵达人特权
									</view>
									<view v-if="userInfo.superTrader != 1" class="flex-1 ml-1" @click="navigateTo({
									url:'./vip'
								})">
										<view class="flex align-center justify-center border-bai" style="border-radius: 26rpx;background-color: #ff6e07;width: 150rpx;height: 55rpx;">
											<text class="text-bai" style="font-size: 26rpx;">立即购买</text>
										</view>
									</view>
								</view>
							</view>
						</view>

						<view class="flex flex-column px-3 ml-3" style="border-radius: 15rpx;min-width: 560rpx;height: 280rpx;background-color: #fff7f4;">
							<view class="flex align-center justify-between pb-3 mt-4" style="border-bottom: #e5e5e5 1rpx solid;">
								<view>
									<u-avatar :src="userInfo.avatarImage" mode="circle"></u-avatar>
								</view>
								<view class="flex flex-1 flex-column">
									<view class="flex align-center justify-between mx-2">
										<view class="font-weight-bold" style="font-size: 33rpx;">{{userInfo.username}} </view>
										<view class="flex-1 ml-1">
											<view style="border-radius: 20rpx;height: 38rpx;width: 120rpx;" class="border-bai flex align-center justify-center"
											 :class="userInfo.superTalent == 1 ? 'my-icon-bgcolor-cheng' : 'my-icon-bgcolor-hui'">
												<view style="margin-bottom: 8rpx;">
													<u-icon name="heart" color="#FFFFFF" size="19"></u-icon>
												</view>
												<view class="text-bai" style="margin-left: 5rpx;font-size: 20rpx;">爱心达人</view>
											</view>
										</view>
									</view>
									<view class="ml-2 mt-1">
										<text class="text-gray" style="font-size: 27rpx;">{{userInfo.superTalent == 1 ? '有效期：2020-8-09' : '未开通'}}</text>
									</view>
								</view>
							</view>
							<view>
								<view class="flex align-center justify-between mt-3">
									<view class="">
										畅享提价特权
									</view>
									<view v-if="userInfo.superTrader != 1" class="flex-1 ml-1" @click="navigateTo({
									url:'./vip'
								})">
										<view class="flex align-center justify-center border-bai" style="border-radius: 26rpx;background-color: #ff6e07;width: 150rpx;height: 55rpx;">
											<text class="text-bai" style="font-size: 26rpx;">立即购买</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view style="padding-left: 80rpx;"></view>
					</view>
				</view>
			</scroll-view>
			<!-- 会员介绍 -->
			<view class="px-3 py-1">
				<block v-if="show == 1">
					<view class="font-weight-bold pb-2" style="font-size: 35rpx;">超级商人特权</view>
					<view class="flex flex-column">
						<vip-home-list title="任务随意发" desc="发布任务数量无限制" icon="order"></vip-home-list>
						<vip-home-list title="提现减免手续费" desc="比普通商户减免5%手续费" icon="calendar"></vip-home-list>
						<vip-home-list title="做任务佣价提价" desc="任务佣金至少比普通用户提高20%" icon="rmb"></vip-home-list>
						<vip-home-list title="任务上推荐费用减免" desc="比普通用户减免50%的推荐费用" icon="thumb-up"></vip-home-list>
					</view>
				</block>
				<block v-if="show == 2">
					<view class="font-weight-bold pb-2" style="font-size: 35rpx;">喵达人特权</view>
					<view class="flex flex-column">
						<vip-home-list title="做任务佣价提价" desc="任务佣金至少比普通用户提高20%" icon="rmb"></vip-home-list>
						<vip-home-list title="急速提现" desc="享有优先提现通道" icon="calendar"></vip-home-list>
						<vip-home-list title="尊享客服" desc="你的问题反馈后将有专人优先处理" icon="kefu-ermai"></vip-home-list>
					</view>
				</block>
			</view>
		</view>

	</view>
</template>

<script>
	import vipHomeList from '@/components/vip-home-list/vip-home-list.vue';
	export default {
		components: {
			vipHomeList
		},
		data() {
			return {
				userInfo: {},
				show: 1,
			}
		},
		onLoad(e) {
			if (e.info) return this.userInfo = JSON.parse(e.info);
			this.getUserInfo();
			console.log(this.userInfo);
		},
		methods: {
			// 获取用户信息
			getUserInfo() {
				this.$u
					.get(
						'user/getUser', {}, {
							Authorization: this.$store.state.user.accessToken
						}
					)
					.then(res => {
						this.userInfo = res.data;
					});
			},
			change(id) {
				this.show = id;
			},
		}
	}
</script>

<style>

</style>
