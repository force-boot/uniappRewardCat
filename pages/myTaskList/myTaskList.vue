<template>
	<view>
		<!-- tabs -->
		<view class="flex align-center justify-center m-tabs-fixed">
			<m-tabs :list="tabs" :current="current" :activeStyle="tabStyle.active" @change="tabsChange" :fontSize="28" :gutter="30"></m-tabs>
		</view>
		<template v-if="noData">
			<view class="animated fadeIn" style="margin: 160rpx;">
				<u-empty mode="data" :text="'没有' + tabs[current].name + '的任务'"></u-empty>
				<view class="border-bai bg-main" style="border-radius: 50rpx;margin-top: 20rpx;" @click="clickGet">
					<view style="height: 85rpx;" class="flex align-center justify-center font-weight-bold">去逛逛</view>
				</view>
			</view>
		</template>
		<template v-else>
			<block v-for="(item,index) in taskList" :key="index">
				<view class="p-3">
					<view class="flex align-center justify-between">
						<view style="margin-top: 5rpx;">
							<u-avatar :src="item.avatarImage" :size="105"></u-avatar>
						</view>
						<view class="flex flex-column flex-1 ml-2">
							<view class="font-s-3 nowrap" style="max-width: 350rpx;">{{item.taskName}}</view>
							<view class="text-jin mt-1 font-weight-bold">+{{item.rewardFee/100}}</view>
						</view>
						<view class="flex flex-column" style="margin-bottom: 5rpx;">
							<template v-if="current == 0">
								<view @click="commitTask(item.orderId)" style="border-radius: 30rpx; width: 150rpx;height: 48rpx;" class="bg-main flex align-center justify-center mb-1">
									<view style="font-size: 26rpx;">提交任务</view>
								</view>
								<view @click="openModal(true,item.orderId)" style="border-radius: 30rpx; width: 150rpx;height: 48rpx;" class="bg-main flex align-center justify-center">
									<view style="font-size: 26rpx;">取消任务</view>
								</view>
							</template>
							<template v-if="current == 1">
								<view style="border-radius: 30rpx; width: 150rpx;height: 48rpx;" class="bg-main flex align-center justify-center mb-1">
									<view style="font-size: 26rpx;">联系商人</view>
								</view>
							</template>
							<template v-if="current == 2 || current == 3">
								<view style="border-radius: 30rpx; width: 150rpx;height: 48rpx;" class="bg-main flex align-center justify-center mb-1">
									<view style="font-size: 26rpx;">再次领取</view>
								</view>
							</template>
						</view>
					</view>
					<view class="mt-3" style="border-top: #F1F1F1 1rpx solid;">
						<view class="flex align-center justify-between mt-3">
							<view class="flex align-center">
								<u-icon name="clock" size="37" color="#9299a0" class="mr-1"></u-icon>
								<template v-if="current == 0">
									<view class="text-gray flex align-center">
										请在<view>
											<u-count-down :timestamp="getTime(item.commitDeadline)" color="#ff6e07" separator-color="#ff6e07" font-size="27"
											 :show-days="false"></u-count-down>
										</view>内完成提交
									</view>
								</template>
								<template v-if="current == 1">
									<view class="text-gray flex align-center">
										提交审核时间 2018-09-08 14:19
									</view>
								</template>
								<template v-if="current == 2">
									<view class="text-gray flex align-center">
										审核通过时间 2018-09-08 14:19
									</view>
								</template>
								<template v-if="current == 3">
									<view class="text-gray flex align-center">
										未通过原因： 超时未提交
									</view>
								</template>
							</view>
							<view :class="getColor()">{{tabs[current].name}}</view>
						</view>
					</view>
				</view>
				<u-gap height="19" bg-color="#f5f4f4"></u-gap>
			</block>
		</template>
		<u-modal v-model="showModal" :content="modalContent" :show-cancel-button="true"
		 @confirm="cancelTask(orderId)" @cancel="openModal(false)"></u-modal>
		<u-loadmore :status="loadStatus" v-show="taskList.length > 2" marginTop="20" margin-bottom="20" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// tabs
				tabs: [{
						id: 0,
						name: '待提交'
					},
					{
						id: 1,
						name: '审核中'
					},
					{
						id: 2,
						name: '已通过'
					},
					{
						id: -1,
						name: '未通过'
					},
					{
						id: 4,
						name: '复审举报'
					}
				],
				// tabs自定义样式
				tabStyle: {
					active: {
						color: '#333333',
						'font-weight': 'bold'
					},
					bar: {
						'margin-bottom': '7rpx'
					}
				},
				taskList: [],
				orderId:0,
				page: 1,
				pageSize: 10,
				showModal: false,
				modalContent: '',
				// 加载状态
				loadStatus: 'loadmore',
				// 无列表数据
				noData: false,
				// 默认选择tabs
				current: 0
			}
		},
		onLoad(e) {
			if (e.item != 9) this.tabsChange(e.item);
		},
		onShow() {
			setTimeout(() => {
				uni.startPullDownRefresh();
			}, 100);
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.page = 1;
			this.taskList = [];
			this.loadData();
		},
		// 监听滑动到底部事件
		onReachBottom() {
			if (this.loadStatus != 'loadmore') return false;
			// 页码加+1
			this.page++;
			// 修改加载状态
			this.loadStatus = 'loading';
			this.getTaskList(this.pageSize, this.page);
		},
		methods: {
			getColor() {
				if (this.current == 0) {
					return 'text-gray';
				} else if (this.current == 1) {
					return 'text-jin';
				} else if (this.current == 2) {
					return 'text-lv';
				} else if (this.current == 3) {
					return 'text-hon';
				}
			},
			openModal(show = true,id) {
				this.orderId = id;
				this.showModal = show;
				this.modalContent = '你确定要取消该任务吗?';
			},
			// tab修改事件
			tabsChange(index) {
				this.current = index;
				this.taskList = [];
				this.loadData();
			},
			clickGet() {
				return uni.switchTab({
					url: '../index/index'
				});
			},
			getTime(time) {
				return Math.round(time / 1000) - Math.round(new Date() / 1000);
			},
			// 加载数据
			loadData() {
				this.noData = false;
				this.$u.get('order/list', {
					orderStatus: this.tabs[this.current].id,
					pageNo: this.page,
					pageSize: this.pageSize
				}).then(res => {
					if (!res.data) {
						this.loadStatus = 'nomore';
						if (this.page == 1) {
							this.noData = true;
							this.taskList = [];
						}
						return false;
					}
					if (res.data.length < this.pageSize) this.loadStatus = 'nomore';
					for (let i = 0; i <= res.data.length -1;i++){
						this.taskList.push(res.data[i]);
					}
					this.loadStatus = 'loadmore';
				});
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 800);
			},
			commitTask(id) {
				return this.navigateTo({
					url: '../orderDetail/orderDetail?id=' + id
				});
			},
			cancelTask(id) {
				this.$u.get('order/cancel', {
					orderId: id
				}).then(res => {
					if (res.data) {
						this.$U.outputMsg('取消任务成功')
						return this.loadData();
					}
					return this.$U.outputMsg(res.message);
				});
			},
			delete() {
				this.$u.get('order/delete', {
					orderId: 1
				}).then(res => {

				});
			}
		}
	}
</script>

<style>

</style>
