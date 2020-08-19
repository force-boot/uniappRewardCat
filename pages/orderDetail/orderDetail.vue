<template>
	<view>
		<task-detail ref="detail" :taskInfo="taskInfo" :steps="steps" :showType="1" :orderId="orderId"></task-detail>
		<view style="height: 100rpx;"></view>
		<view class="animated fadeIn" style="position: fixed;left:0; bottom:0;width:100%;">
			<view class="flex align-center justify-center" style="background-color: #f5edcd;height: 80rpx;">
				请在<view>
					<u-count-down bg-color="#f5edcd" :timestamp="getTime(taskInfo.commitDeadline)" color="#ff6e07" separator-color="#ff6e07"
					 font-size="27" :show-days="false"></u-count-down>
				</view>之前提交
			</view>
			<view class="flex align-center justify-center">
				<view style="height: 90rpx; width: 50%;" class="flex align-center justify-center bg-bai" @click="openModal()">取消任务</view>
				<view style="height: 90rpx;width: 50%;" class="bg-main flex align-center justify-center" @click="commitTask()">提交任务</view>
			</view>
			<u-modal v-model="showModal" :content="modalContent" :show-cancel-button="true" @confirm="cancelTask(orderId)"
			 @cancel="openModal(false)"></u-modal>
		</view>
	</view>
</template>

<script>
	import taskDetail from '@/components/task-detail/task-detail.vue';
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
	export default {
		components: {
			taskDetail,
			uniNoticeBar
		},
		onLoad(e) {
			this.orderId = e.id;
			this.loadData();
		},
		data() {
			return {
				taskInfo: {},
				steps: [],
				showModal: false,
				modalContent: '',
				orderId: 0
			}
		},
		methods: {
			getTime(time) {
				return Math.round(time / 1000) - Math.round(new Date() / 1000);
			},
			openModal(show = true) {
				this.showModal = show;
				this.modalContent = '你确定不通过该任务吗?';
			},
			loadData() {
				this.$u
					.get('order/detail', {
						orderId: this.orderId
					})
					.then(res => {
						this.taskInfo = res.data.order;
						this.steps = res.data.stepVouchers;
					});
			},
			commitTask() {
				let data = this.$refs.detail.commitTask;
				if (data.vouchers.length < 1) return this.$U.outputMsg('收集截图步骤图片不能为空');
				if (this.taskInfo.extraData && !data.extraData) return this.$U.outputMsg('请输入提交数据');
				this.$u.post('order/commit', data).then(res => {
					if (res.data) {
						this.$U.outputMsg('提交任务成功，请耐心等待审核');
						return setTimeout(()=>{
							uni.navigateBack({
								delta: 1
							});
						},600);
					} else {
						return this.$U.outputMsg(res.message);
					}
				});
			},
			cancelTask(id) {
				this.$u.get('order/cancel', {
					orderId: id
				}).then(res => {
					if (res.data) {
						this.$U.outputMsg('取消任务成功');
						return uni.navigateBack({
							delta: 1
						});
					}
					return this.$U.outputMsg(res.message);
				});
			},
		}
	}
</script>

<style>

</style>
