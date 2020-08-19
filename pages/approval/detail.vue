<template>
	<view class="animated fadeIn">
		<approval-detail ref="detail" :taskInfo="taskInfo" :steps="steps" :showType="1" :orderId="orderId"></approval-detail>
		<view style="height: 100rpx;"></view>
		<view class="animated fadeIn" style="position: fixed;left:0; bottom:0;width:100%;">
			<view class="flex align-center justify-center" style="background-color: #f5edcd;height: 80rpx;">
				<template v-if="getTime(taskInfo.confirmDeadline) < 1 || status == 2">
					该订单已结束
				</template>
				<template v-else>
					请在<view>
						<u-count-down bg-color="#f5edcd" :timestamp="getTime(taskInfo.confirmDeadline)" color="#ff6e07" separator-color="#ff6e07"
						 font-size="27" :show-days="false"></u-count-down>
					</view>之前审核完毕
				</template>
			</view>
			<template v-if="getTime(taskInfo.confirmDeadline) > 1 && status != 2">
				<view class="flex align-center justify-center">
					<view style="height: 90rpx; width: 50%;" class="flex align-center justify-center bg-bai" @click="confirmDialog()">驳回审核</view>
					<view style="height: 90rpx;width: 50%;" class="bg-main flex align-center justify-center" @click="openModal(true,'审核通过',2)">审核通过</view>
				</view>
			</template>
			<u-modal v-model="showModal" :content="modalContent" :show-cancel-button="true" @confirm="taskOk(isAction)" @cancel="openModal(false)"></u-modal>
		</view>
		<uni-popup ref="dialogInput" type="dialog">
			<uni-popup-dialog mode="input" title="输入审核备注内容" placeholder="可输入失败原因等,可留空" @confirm="taskOk"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
	import approvalDetail from '@/components/approval-detail/approval-detail.vue';
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
	export default {
		components: {
			approvalDetail,
			uniPopupDialog,
			uniNoticeBar
		},
		onLoad(e) {
			this.orderId = e.id;
			this.status = e.status;
			this.loadData();
		},
		data() {
			return {
				taskInfo: {},
				steps: [],
				showModal: false,
				modalContent: '',
				status: '',
				isAction: '',
				orderId: 0
			}
		},
		methods: {
			getTime(time) {
				return Math.round(time / 1000) - Math.round(new Date() / 1000);
			},
			confirmDialog() {
				this.$refs.dialogInput.open()
			},
			openModal(show = true, status = '驳回', act) {
				this.isAction = act;
				this.showModal = show;
				if (show) this.modalContent = '你确定要' + status + '吗?';
				return;
			},
			loadData() {
				this.$u
					.get('order/detail', {
						orderId: this.orderId
					})
					.then(res => {
						this.taskInfo = res.data.order;
						let data = res.data.stepVouchers;
						for (let i = 0; i <= data.length - 1; i++) {
							if (data[i].stepMode == 2) {
								this.steps.push(data[i]);
							}
						}
					});
			},
			taskOk(type, val = '审核通过') {
				if (type != 2) type = -1;
				this.$u.post('order/confirm', {
					orderId: this.orderId,
					orderStatus: type,
					confirmRemark: val
				}).then(res => {
					this.$U.outputMsg(res.message);
					return setTimeout(() => {
						uni.navigateBack({
							delta: 1
						});
					}, 600);
				});
			},
		}
	}
</script>

<style>

</style>
