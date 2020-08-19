<template>
	<view class="user__detail">
		<view class="flex justify-start top align-center">
			<u-avatar size="120" mode="circle"></u-avatar>
			<view class="right">
				<view class="flex">
					<text class="font-weight-bold name hidden-text-line-1">{{info.name}}</text>
					<view class="hadRealName">已实名</view>
				</view>
				<view class="flex" style="margin-top: 20rpx;">
					<view class="shoper flex justify-center align-center">
						<image src="../../static/image/zhuanshi.png" class="shoper_img"></image>
						<text>超级商人</text>
					</view>
					<view class="cat flex justify-center align-center">
						<image src="../../static/image/mao.png" class="car_img"></image>
						<text>喵达人</text>
					</view>
				</view>
			</view>
		</view>
		<view class="flex details">
			<view class="flex li justify-center align-center">
				<text class="font-s-4">49</text>
				<text class="title">发布任务</text>
			</view>
			<view class="flex li justify-center align-center">
				<text class="font-s-4">4</text>
				<text class="title">接单任务</text>
			</view>
		</view>
		<view class="content">
			<view class="title">发布任务</view>
			<view class="li flex justify-start align-center" v-for="(item,index) in taskList" :key="index">
				<u-avatar size="100" mode="circle"></u-avatar>
				<view class="flex justify-between right" style="flex: 1;">
					<view class="flex justify-between" >
						<text class="font-s-3 title hidden-text-line-1">{{item.title}}</text>
						<view>
							<text class="font-s-3">{{item.tip}}</text>
							<text class="font-s-3" style="color: rgb(239,87,40);margin-left: 40rpx;">+{{item.money}}</text>
						</view>
					</view>
					<view class="flex li_center">
						<view class="font-s-2 text">下载注册</view>
						<view class="font-s-2 text">掌上生活</view>
					</view>
					<view class="flex align-center" style="font-size: 35rpx;">
						<view style="font-size: 20rpx;margin-right: 25rpx;" class="text-gray">
							<view class="flex align-center justify-between">
								<u-icon name="rmb" size="20" color="#9299a0" style="margin-right: 4rpx;"></u-icon>
								<view>{{item.finishedNum}}人已赚</view>
							</view>
						</view>
						<view style="font-size: 20rpx;" class="text-gray">
							<view class="flex align-center justify-between">
								<u-icon name="account" size="20" color="#9299a0" class="mr-1"></u-icon>
								<view class="nowrap">剩余{{ item.taskNum - item.finishedNum }}人</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="loadStatus" marginTop="20" margin-bottom="40" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					name: '一念之间 变成大佛啊啊啊'
				},
				// 当前页码
				page: 1,
				// 每页数量
				pageSize: 10,
				// 加载状态
				loadStatus: 'loadmore',
				// 无列表数据
				noData: false,
				taskList: []
			}
		},
		// 监听页面显示
		onLoad() {
			this.page = 1;
			this.taskList = [
				{title: '注册实名不绑卡-极速审', tip: '君', money: 6.18, finishedNum: 20, taskNum: 29},
				{title: '注册实名不绑卡-极速审', tip: '君', money: 6.18, finishedNum: 20, taskNum: 29},
				{title: '注册实名不绑卡-极速审', tip: '君', money: 6.18, finishedNum: 20, taskNum: 29},
				{title: '注册实名不绑卡-极速审', tip: '君', money: 6.18, finishedNum: 20, taskNum: 29},
				{title: '注册实名不绑卡-极速审', tip: '君', money: 6.18, finishedNum: 20, taskNum: 29}
			];
			uni.startPullDownRefresh();
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 500);
			uni.setNavigationBarTitle({
			    title: 'ID:U1234678'
			});
		},
		onPageScroll(res) {
			this.scrollTop = res.scrollTop;
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.page = 1;
			// this.taskList = [];
			setTimeout(() => {
				this.onLoadAllList();
				uni.stopPullDownRefresh();
			}, 500);
		},
		// 监听滑动到底部事件
		onReachBottom() {
			if (this.loadStatus != 'loadmore') return false;
			// 页码加+1
			this.page++;
			// 修改加载状态
			this.loadStatus = 'loading';
			this.getTaskList(this.pageSize, this.page);
			setTimeout(() => {
				this.loadStatus = 'loadmore';
			}, 1000);
		},
		methods: {
			getTaskList(pageSize = 10, page = 1, stopRef = false) {
				// let data = {
				// 	sortMode: this.sortCurrent,
				// 	taskType: this.current == 0 ? '' : this.current,
				// 	taskRecommended: 0,
				// 	loginUserId: 3,
				// 	pageSize: pageSize,
				// 	pageNo: page
				// };
				// this.$u.get('task/acceptableList', data).then(res => {
				// 	if (stopRef) {
				// 		setTimeout(() => {
				// 			uni.stopPullDownRefresh();
				// 		}, 500);
				// 	}
				// 	if (!res.data) {
				// 		this.loadStatus = 'nomore';
				// 		if (this.page == 1) {
				// 			this.noData = true;
				// 			this.taskList = [];
				// 		}
				// 		return false;
				// 	}
				// 	if (res.data.length < this.pageSize) this.loadStatus = 'nomore';
				// 	this.taskList = Object.assign(res.data, this.taskList);
				// 	this.loadStatus = 'loadmore';
				// });
			},
			onLoadAllList() {
				this.noData = false;
				// 获取列表
				this.getTaskList(this.pageSize, this.page, true);
			},
		}
	}
</script>

<style lang="scss">
	.user__detail {
		padding: 20rpx 0;
		.top {
			padding: 0 20rpx;
			.right {
				margin-left: 10rpx;
			}
			.name {
				width: 300rpx;
				font-size: 34rpx;
			}
			.hadRealName {
				width: 100rpx;
				height: 40rpx;
				line-height: 40rpx;
				background-color: rgb(253,157,7);
				border-radius: 20rpx;
				color: #fff;
				font-size: 20rpx;
				text-align: center;
				margin-left: 20rpx;
			}
			.shoper {
				width: 160rpx;
				height: 40rpx;
				line-height: 40rpx;
				background-color: rgb(250,81,9);
				border-radius: 20rpx;
				color: #fff;
				font-size: 18rpx;
				text-align: center;
				margin-right: 20rpx;
				.shoper_img {
					width: 25rpx;
					height: 25rpx;
					margin-right: 10rpx;
				}
			}
			.cat {
				width: 140rpx;
				height: 40rpx;
				line-height: 40rpx;
				background-color: rgb(254,161,8);
				border-radius: 20rpx;
				color: #fff;
				font-size: 18rpx;
				text-align: center;
				.car_img {
					width: 25rpx;
					height: 25rpx;
					margin-right: 10rpx;
				}
			}
		}
		.details {
			justify-content: space-between;
			padding: 0 40rpx;
			border-top: 2rpx solid rgb(242,242,242);
			margin-top: 30rpx;
			.li {
				flex-direction: column;
				padding: 20rpx 0;
				.title {
					font-size: 28rpx;
					color: rgb(163,163,163);
				}
			}
		}
		.content {
			margin-top: 20rpx;
			border-top: 20rpx solid rgb(236,236,236);
			padding: 20rpx;
			.title {
				font-size: 40rpx;
			}
			.li {
				width: 100%;
				margin-top: 20rpx;
				padding-bottom: 20rpx;
				border-bottom: 2rpx solid rgb(236,236,236);
				.right {
					flex-direction: column;
					margin-left: 20rpx;
				}
				.li_center {
					.text {
						background-color: rgb(246,246,246);
						color: rgb(167,167,148);
						padding: 5rpx 8rpx;
						border-radius: 10rpx;
						margin: 5rpx 10rpx 5rpx 0;
					}
				}
				.title {
					width: 400rpx;
					font-size: 32rpx;
				}
			}
		}
	}
</style>
