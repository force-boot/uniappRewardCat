<template>
	<view class="my__task">
		<!-- tabs -->
		<m-tabs :list="tabs" :current="current" :activeStyle="tabStyle.active" class="m-tabs-fixed" @change="tabsChange"></m-tabs>
		<view class="head flex justify-start align-center">
			<u-avatar size="120" mode="circle"></u-avatar>
			<view class="center">
				<text class="name hidden-text-line-1">一念之间 变成大佛啊啊啊</text>
				<view style="color: rgb(239,87,40);margin-top: 10rpx;font-size: 34rpx;">+6.18</view>
			</view>
			<view class="btns">
				<view class="btn font-s-3">提交任务</view>
				<view class="btn font-s-3">取消任务</view>
			</view>
		</view>
		<view class="flex align-center head__bottom">
			<view class="flex align-center" >
				<u-icon name="clock" size="30" color="#9299a0" class="mr-1"></u-icon>
				<view style="color: rgb(166,166,166);">请在<text style="color: rgb(239,87,40);">00:49:34</text>内完成提交</view>
			</view>
			<view class="font-s-3" style="color: rgb(239,87,40);">待提交</view>
		</view>
		<template v-if="!taskList.length">
			<u-empty mode="data" class="animated fadeIn faster"></u-empty>
		</template>
		<template v-else>
			<view class="pt-1">
				<m-task-list :list="taskList"></m-task-list>
			</view>
		</template>
		<u-loadmore v-show="taskList.length > 2" :status="loadStatus" marginTop="20" margin-bottom="40" />
	</view>
</template>

<script>
	import mTabs from '@/components/m-tabs/m-tabs.vue';
	import mTaskList from '@/components/m-task-list/m-task-list.vue';
	export default {
		components: {
			mTabs,
			mTaskList
		},
		data() {
			return {
				tabs: [{id:0,name:'待提交'}, {id:1,name:'审核中'}, {id:2,name:'已通过'}, {id:3,name:'未通过'}],
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
				current: 0,
				tabPage:[],
				// 当前页码
				page: 1,
				// 每页数量
				pageSize: 10,
				// 加载状态
				loadStatus: 'loadmore',
				// 无列表数据
				noData: false,
				// 距离顶部的距离
				scrollTop: 0,
				taskList: [],
				allTaskList: {
					0: [
						{name: '一念之间 变成大佛啊啊啊', btn: '再次领取', message: '审核通过时间：2020/09/09 12:12:12', tip: '待提交'},
						{name: '一念之间 变成大佛啊啊啊', btn: '再次领取', message: '审核通过时间：2020/09/09 12:12:12', tip: '待提交'},
						{name: '一念之间 变成大佛啊啊啊', btn: '再次领取', message: '审核通过时间：2020/09/09 12:12:12', tip: '待提交'},
						{name: '一念之间 变成大佛啊啊啊', btn: '再次领取', message: '审核通过时间：2020/09/09 12:12:12', tip: '待提交'},
					],
					1: [],
					2: [],
					3: []
				},
				scrollTopList: {0:0, 1:0,2:0,3:0}
			}
		},
		// 监听页面显示
		onLoad() {
			this.page = 1;
			this.taskList = this.allTaskList[0]|| [];
			// uni.startPullDownRefresh();
		},
		onPageScroll(res) {
			this.scrollTopList[this.current] = res.scrollTop;
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.page = 1;
			// this.taskList = [];
			setTimeout(() => {
				this.onLoadAllList();
				this.loadStatus = 'loadmore';
			}, 500);
		},
		// 监听滑动到底部事件
		onReachBottom() {
			if (this.loadStatus != 'loadmore') return false;
			// 页码加+1
			this.page++;
			// 修改加载状态
			// this.loadStatus = 'loading';
			this.getTaskList(this.pageSize, this.page);
		},
		methods: {
			getTaskList() {
				
			},
			onLoadAllList() {
				this.noData = false;
				// 获取列表
				this.getTaskList(this.pageSize, this.page, true);
			},
			// tab修改事件
			tabsChange(index) {
				this.current = this.tabs[index].id;
				this.taskList = this.allTaskList[index] || []
				console.log('this.scrollTopList[this.current]', this.scrollTopList[index])
				uni.pageScrollTo({
					scrollTop: this.scrollTopList[index],
					duration: 300,
				});
				// this.changeTabAndSortLoad();
			},
		}
	}
</script>

<style lang="scss">
	.my__task {
		.head {
			padding: 100rpx 20rpx 20rpx 20rpx;
			.header_img {
				width: 150rpx;
				height: 150rpx;
				border-radius: 100%;
			}
			.center {
				margin: 0 20rpx;
				.name {
					width: 350rpx;
					font-size: 32rpx;
				}
			}
			.btns {
				.btn {
					background-color: #f8c750;
					width: 170rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					border-radius: 30rpx;
					margin-bottom: 10rpx;
				}
			}
		}
		.head__bottom {
			padding: 30rpx 40rpx;
			border-top: 2rpx solid rgb(242,242,242);
			justify-content: space-between;
			border-bottom: 20rpx solid rgb(236,236,236);
		}
	}
</style>
