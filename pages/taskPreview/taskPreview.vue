<template>
	<view>
		<task-detail :taskInfo="taskInfo" :steps="steps"></task-detail>
		<view class="p-3 animated fadeIn">
			<view class="flex align-center justify-center" style="height: 83rpx;border-radius: 18rpx;background-color: #f9e1a8;">领取任务</view>
		</view>
	</view>
</template>

<script>
	import taskDetail from '@/components/task-detail/task-detail.vue';
	export default {
		components: {
			taskDetail
		},
		onLoad(e) {
			let userInfo = this.$store.state.user;
			let zdyInfo = Object.assign({
				taskId: '000',
				finishedNum: 0,
			}, userInfo);
			this.taskInfo = Object.assign(JSON.parse(e.info), zdyInfo);
			this.steps = this.taskInfo.steps;
		},
		data() {
			return {
				taskInfo: {},
				steps: [],
			};
		},
		methods: {}
	};
</script>

<style>

</style>
