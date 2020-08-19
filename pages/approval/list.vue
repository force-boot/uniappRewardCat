<template>
	<view class="animated fadeIn">
		<view class="flex align-center justify-center m-tabs-fixed">
			<m-tabs :list="tabs" :current="current" :activeStyle="tabStyle.active" @change="tabsChange" :fontSize="28" :gutter="50"></m-tabs>
		</view>

		<view class="animated fadeIn" style="margin: 100rpx;" v-show="noData">
			<u-empty mode="data" :text="'没有' + tabs[current].name + '的任务'"></u-empty>
			<view class="border-bai bg-main" style="border-radius: 50rpx;margin-top: 20rpx;" @click="clickBack">
				<view style="height: 85rpx;" class="flex align-center justify-center font-weight-bold">返回上一页</view>
			</view>
		</view>
		<block v-for="(item,index) in taskList" :key="index">
			<view class="pt-4 px-3 pb-2">
				<view class="flex align-center justify-between pb-2" style="border-bottom: #F1F1F1 1rpx solid;">
					<view class="flex align-center">
						<u-avatar :src="item.orderAvatarImage" :size="115"></u-avatar>
					</view>
					<view class="flex flex-1 flex-column ml-2">
						<view class="flex align-center justify-between">
							<view class="nowrap mb-1" style="max-width: 350rpx;">任务名称：{{item.taskName}}</view>
							<view class="flex align-center">
								<view class="flex align-center justify-center border-bai" style="border-radius: 15rpx;width: 140rpx;height: 50rpx;background-color: #3B4144;">
									<template v-if="current == 0">
										<text style="font-size: 24rpx;" class="text-bai">{{isType(item.orderStatus)}}</text>
									</template>
									<template v-else>
										<text style="font-size: 24rpx;" class="text-bai">{{tabs[current].name}}</text>
									</template>
								</view>
							</view>
						</view>
						<view class="flex align-center">
							<view class="nowrap" style="max-width: 260rpx;">{{item.orderUsername}}</view>
							<view class="">
								(ID:{{item.userId}})
							</view>
						</view>
						<view class="mt-1">提交时间：{{$u.timeFormat($U.getTime(item.commitTime), 'yyyy-mm-dd hh:MM:ss')}}</view>
					</view>
				</view>
				<view class="flex align-center justify-between mt-2">
					<template v-if="lockBtn(item.orderStatus)">
						<view @click="clickKey(item.orderId,item.orderStatus)" style="border-radius: 13rpx;width: 140rpx;height: 50rpx;"
						 class="bg-success text-bai flex align-center justify-center">
							查看凭证
						</view>
					</template>
					<template v-else>
						<view @click="$U.outputMsg('该任务状态不支持查看')" style="border-radius: 13rpx;width: 140rpx;height: 50rpx;" class="bg-gray text-bai flex align-center justify-center">
							查看凭证
						</view>
					</template>
					<view @click="cliChat(item.userId)" style="border-radius: 13rpx;width: 160rpx;height: 50rpx;" class="bg-zi text-bai flex align-center justify-center">
						联系接单人
					</view>
				</view>
			</view>
			<u-gap height="19" bg-color="#f5f4f4"></u-gap>
		</block>
		<u-loadmore :status="loadStatus" v-show="taskList.length >= pageSize" marginTop="20" marginBottom="20" />
	</view>
</template>

<script>
	import mTabs from '@/components/m-tabs/m-tabs.vue';
	export default {
		components: {
			mTabs
		},
		onLoad(e) {
			this.current = e.current ? e.current : 0;
			this.taskId = e.tid;
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
			if (this.loadStatus != 'loadmore') return;
			// 页码加+1
			this.page++;
			// 修改加载状态
			this.loadStatus = 'loading';
			this.loadData();
		},
		data() {
			return {
				// tabs
				tabs: [{
						id: 9,
						name: '全部'
					},
					{
						id: 1,
						name: '待审核'
					},
					{
						id: 2,
						name: '已发放'
					},
					{
						id: -1,
						name: '未通过'
					}
				],
				statusArr: [{
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
						id: 3,
						name: '任务超时'
					},
					{
						id: 4,
						name: '任务超时'
					},
					{
						id: 5,
						name: '任务取消'
					},
					{
						id: 6,
						name: '任务删除'
					},
					{
						id: -1,
						name: '审核不通过'
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
				taskId: '',
				taskList: [],
				// 默认选择tabs
				current: 0,
				// 当前页码
				page: 1,
				// 每页数量
				pageSize: 5,
				// 加载状态
				loadStatus: 'loadmore',
				// 无列表数据
				noData: false
			}
		},
		methods: {
			// tab修改事件
			tabsChange(index) {
				this.current = index;
				this.page = 1;
				this.taskList = [];
				this.loadData();
			},
			clickBack() {
				uni.navigateBack({
					delta: 1
				});
			},
			isType(num) {
				let data = this.statusArr;
				for (let i = 0; i <= data.length - 1; i++) {
					if (data[i].id == num) {
						return data[i].name;
					}
				}
			},
			lockBtn(status) {
				if (status == 3 || status == 5 || status == 6 || status == 0) {
					return false;
				} else {
					return true;
				}
			},
			clickKey(orderId, status) {
				return this.navigateTo({
					url: '../approval/detail?id=' + orderId + '&status=' + status
				});
			},
			cliChat(userId) {

			},
			loadData() {
				let data = {
					pageNo: this.page,
					pageSize: this.pageSize,
					taskId: this.taskId
				}
				if (this.current != 0) data = Object.assign({
					orderStatus: this.tabs[this.current].id
				}, data);
				this.noData = false;
				this.$u
					.get('order/listByTask', data)
					.then(res => {
						if (!res.data) {
							this.loadStatus = 'nomore';
							if (this.page == 1) {
								this.noData = true;
								this.taskList = [];
							}
							return false;
						}
						this.loadStatus = 'loadmore';
						if (res.data.length < this.pageSize) this.loadStatus = 'nomore';
						for (let i = 0; i <= res.data.length - 1; i++) {
							this.taskList.push(res.data[i]);
						}
					});
					setTimeout(() => {
						uni.stopPullDownRefresh()
					}, 800);
			}
		}
	}
</script>

<style>

</style>
