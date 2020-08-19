<template>
	<view>
		<!-- 列表 -->
		<template v-if="noData">
			<u-empty mode="list" class="animated fadeIn faster"></u-empty>
		</template>
		<template v-else>
			<view class="flex align-center justify-between flex-wrap" style="padding: 35rpx;">
				<block v-for="(item,index) in list" :key="index">
					<view style="border-radius: 18rpx;width: 330rpx;height: 230rpx;" class="animated fadeIn fast bg-bai mb-2 box-shadow border-hui"
					 @click="openDetail(item.taskId)">
						<view class="flex align-center my-2 ml-2">
							<u-avatar :src="item.avatarImage" mode="circle"></u-avatar>
							<view class="flex flex-column ml-1">
								<view class="nowrap" style="max-width: 200rpx;">{{item.taskName}}</view>
								<view class="text-jin font-weight-bold font-s-3 mt-1">+{{item.rewardPrice / 100}}</view>
							</view>
						</view>
						<view class="flex align-center justify-start ml-2">
							<view class="mr-2">
								<m-tags :text="getTaskTypeName(item.taskType)" size="23"></m-tags>
							</view>
							<view>
								<m-tags :text="item.projectName" size="23"></m-tags>
							</view>
						</view>
						<view class="flex align-center mt-1" style="font-size: 35rpx;margin-left: 25rpx;">
							<view style="font-size: 23rpx;margin-right: 25rpx;" class="text-gray">
								<view class="flex align-center justify-between">
									<u-icon name="rmb" size="20" color="#9299a0" style="margin-right: 4rpx;"></u-icon>
									<view>{{item.finishedNum}}人已赚</view>
								</view>
							</view>
							<view style="font-size: 23rpx;" class="text-gray">
								<view class="flex align-center justify-between">
									<u-icon name="account" size="20" color="#9299a0" class="mr-1"></u-icon>
									<view class="nowrap" style="max-width: 120rpx;">剩余{{item.taskNum - item.finishedNum}}人</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</template>
		<u-loadmore :status="loadStatus" v-show="(list.length > pageSize || !noData)" marginTop="20" margin-bottom="40"
		 bg-color="#F5F5F5" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				// 当前页码
				page: 1,
				// 每页数量
				pageSize: 8,
				// 加载状态
				loadStatus: 'loadmore',
				// 无列表数据
				noData: false,
			}
		},
		onLoad() {
			uni.startPullDownRefresh();
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.list = [];
			this.page = 1;
			this.noData = false;
			this.getHotList(this.pageSize, this.page, true);
		},
		// 监听滑动到底部事件
		onReachBottom() {
			if (this.loadStatus != 'loadmore') return false;
			// 页码加+1
			this.page++;
			// 修改加载状态
			this.loadStatus = 'loading';
			this.getHotList(this.pageSize, this.page);
		},
		methods: {
			openDetail(taskId) {
				uni.navigateTo({
					url: '../../pages/taskDetail/taskDetail?id=' + taskId
				});
			},
			getHotList(pageSize = 10, page = 1, stopRef) {
				let data = {
					sortMode: 0,
					taskType: '',
					taskRecommended: 1,
					loginUserId: this.$store.state.user.userId,
					pageSize: pageSize,
					pageNo: page
				};
				this.$u.get('task/acceptableList', data).then(res => {
					if (stopRef) {
						setTimeout(() => {
							uni.stopPullDownRefresh();
						}, 800);
					}
					if (!res.data) {
						this.loadStatus = 'nomore';
						if (this.page == 1) {
							this.noData = true;
							this.list = [];
						}
						return false;
					}
					this.loadStatus = 'loadmore';
					if (res.data.length < this.pageSize) this.loadStatus = 'nomore';
					for (let i = 0; i <= res.data.length -1;i++){
						this.list.push(res.data[i]);
					}
				});
			},
			getTaskTypeName(index) {
				return this.$U.getTaskTypeName(index);
			}
		}
	}
</script>

<style>
	page {
		background-color: #F5F5F5;
	}
</style>
