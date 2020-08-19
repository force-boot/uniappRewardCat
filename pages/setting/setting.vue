<template>
	<view>
		<uni-list>
			<uni-list-item>
				<template v-slot:left="">
					<view><text>清理缓存</text></view>
				</template>
				<template v-slot:right="">
					<text class="text-gray" style="font-size: 24rpx;">17.03M</text>
				</template>
			</uni-list-item>
			<uni-list-item>
				<template v-slot:left="">
					<view><text>版本更新</text></view>
				</template>
				<template v-slot:right="">
					<text class="text-gray" style="font-size: 24rpx;">v1.0.0</text>
				</template>
			</uni-list-item>
			<uni-list-item>
				<template v-slot:left="">
					<view><text>关于我们</text></view>
				</template>
			</uni-list-item>
			<uni-list-item>
				<template v-slot:left="">
					<view><text>意见反馈</text></view>
				</template>
			</uni-list-item>
			<uni-list-item>
				<template v-slot:left="">
					<view><text>消息通知</text></view>
				</template>
			</uni-list-item>
		</uni-list>
		<view class="p-2">
			<view @click="logout" class="border-bai bg-main" style="border-radius: 50rpx;margin-top: 35rpx;">
				<view style="height: 90rpx;" class="flex align-center justify-center font-weight-bold">注销登录</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		logout(){
			this.$store.commit('logout');
			this.$U.outputMsg('注销登陆成功');
			return setTimeout(()=>{
				uni.navigateTo({
					url: '../login/login'
				});
			},500);
		}
	}
};
</script>

<style></style>
