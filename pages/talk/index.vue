<template>
	<view class="talk">
		<view class="tip flex font-s-3">沟通过程中请文明用语，谨防诈骗，拒绝私下交易</view>
		<template>
			<view class="pt-1" style="margin-top: 90rpx;background-color: rgb(236,236,236);">
				<m-talk-list :list="talkList"></m-talk-list>
			</view>
		</template>
		<m-chat></m-chat>
	</view>
</template>

<script>
	import mTalkList from '@/components/m-talk-list/m-talk-list.vue';
	import mChat from '@/components/m-chat/m-chat.vue';
	
	export default {
		components: {
			mTalkList,
			mChat
		},
		data() {
			return {
				talkList: [
					{name: '擎天柱（Opcdjbb cbd充电宝）', content: '差点就看你差点就看你看见你吃的呢柯尼卡差点你健康等你看见的奶茶kjndcnknckjk差点就看你差点就看你看见你吃的呢柯尼卡差点你健康等你看见的奶茶kjndcnknckjk差点就看你差点就看你看见你吃的呢柯尼卡差点你健康等你看见的奶茶kjndcnknckjk',time: '19:00:00', type: 'left'},
					{name: '擎天柱（Opcdjbb cbd充电宝）', content: '差点就看你差点就看你看见你吃的呢柯尼卡差点你健康等你看见的奶茶kjndcnknckjk差点就看你差点就看你看见你吃的呢柯尼卡差点你健康等你看见的奶茶kjndcnknckjk差点就看你差点就看你看见你吃的呢柯尼卡差点你健康等你看见的奶茶kjndcnknckjk',time: '19:00:00', type: 'right'},
					{name: '擎天柱（Opcdjbb cbd充电宝）', content: '差点就看你差点就看你看见你吃的呢柯尼卡差点你健康等你看见的奶茶kjndcnknckjk差点就看你差点就看你看见你吃的呢柯尼卡差点你健康等你看见的奶茶kjndcnknckjk差点就看你差点就看你看见你吃的呢柯尼卡差点你健康等你看见的奶茶kjndcnknckjk',time: '19:00:00', type: 'left'},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.talk {
		background-color: rgb(236,236,236);
		min-height: 100vh;
		.tip {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			background-color: rgb(255,249,216);
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			padding: 0 20rpx;
			z-index: 99;
			color: rgb(239,87,40);
		}
	}
</style>
