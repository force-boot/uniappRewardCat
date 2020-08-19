<template>
	<view>
		<task-detail :taskInfo="taskInfo" :steps="step"></task-detail>
		<view style="height: 95rpx;"></view>
		<view class="animated fadeIn" style="position: fixed;left:0; bottom:0;width:100%;">
			<view class="flex align-center justify-center bg-main" style="height: 90rpx;" @click="getTask(taskInfo.taskId)">领取任务</view>
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
			this.loadData(e.id);
		},
		data() {
			return {
				taskInfo: {},
				step: [],
			};
		},
		methods: {
			loadData(taskId) {
				this.$u
					.get('task/detail', {
						taskId: taskId
					})
					.then(res => {
						this.taskInfo = res.data.task;
						this.step = res.data.steps;
					});
			},
			getTask(id) {
				this.$u
					.get('order/create', {
						taskId: id
					})
					.then(res => {
						if (res.data) {
							this.$U.outputMsg('领取任务成功');
							setTimeout(res=>{
								return uni.navigateTo({
									url: '../myTaskList/myTaskList?item=9',
								});
							},500);
						} else {
							return this.$U.outputMsg(res.message);
						}
					});
			},
		}
	};
</script>

<style>

</style>
