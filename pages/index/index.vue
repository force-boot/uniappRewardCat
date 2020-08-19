<template>
	<view>
		<!-- 自定义导航 -->
		<u-navbar :is-back="false" :background="background">
			<image src="http://www.xuanshangcat.com/assets/img/Preloader.png" class="ml-3 w-6 h-6" mode="aspectFill"></image>
			<view class="flex align-center justify-center bg-bai ml-3" style="border-radius: 30rpx; width: 550rpx;height: 60rpx;"
			 @click="clickSearch">
				<u-icon name="search" size="28" color="#9299a0" class="mr-2"></u-icon>
				<text class="text-gray text-center" style="margin-right: 170rpx;font-size: 22rpx;">请输入关键字，任务编号搜索</text>
			</view>
			<view class="flex align-center justify-end" style="margin-left: 14rpx;" @click="clickNotice">
				<u-icon name="bell" size="50" color="#3b3c3f"></u-icon>
			</view>
		</u-navbar>
		<!-- tabs -->
		<m-tabs :list="tabs" :current="current" :activeStyle="tabStyle.active" :fontSize="28" class="m-tabs-fixed" @change="tabsChange"></m-tabs>
		<!-- 轮播图 -->
		<view style="padding:95rpx 30rpx 15rpx 30rpx;">
			<u-swiper :list="swiper" :active-color="'#f8c750'" mode="dot" indicator-pos="bottomRight" :border-radius="18" height="180"
			 @click="clickImage"></u-swiper>
		</view>
		<view class="flex align-center" style="justify-content: space-between;" >
			<view class="flex flex-1" style="padding: 0rpx 0 25rpx 70rpx;" @click="clickNew">
				<image src="../../static/image/2.png" style="width: 90rpx;height: 90rpx;" mode="aspectFill"></image>
				<text style="font-weight: bold;margin-top: 30rpx;margin-left: 20rpx;">推广奖励</text>
			</view>
			<u-line color="#F4F4F5" length="80rpx" direction="col" />
			<view class="flex flex-1" style="padding: 0rpx 0 25rpx 70rpx;" @click="clickRank">
				<image src="../../static/image/2.png" style="width: 90rpx;height: 90rpx;" mode="aspectFill"></image>
				<text style="font-weight: bold;margin-top: 30rpx;margin-left: 20rpx;">排行争霸</text>
			</view>
		</view>
		<u-gap height="18" bg-color="#f3f4f5"></u-gap>
		<!-- 推荐 -->
		<view class="flex pt-3 px-2" style="justify-content: space-between;">
			<view class="flex align-center" style="margin-top: -6rpx;">
				<view>
					<image src="../../static/image/hot.png" mode="aspectFill" style="width: 35rpx;height: 35rpx;"></image>
				</view>
				<view style="font-size: 32rpx;font-weight: bold;" class="pl-1 pb-1">推荐</view>
			</view>
			<view @click="clickHotMore" class="text-gray" style="font-size: 25rpx;">
				查看更多
				<u-icon name="arrow-right" color="#bec6cd"></u-icon>
			</view>
		</view>
		<scroll-view scroll-x="true" style="height: 265rpx;" show-scrollbar="true">
			<m-index-hot :list="hotList"></m-index-hot>
		</scroll-view>
		<u-gap height="18" bg-color="#f3f4f5"></u-gap>
		<!-- 主内容 -->
		<view class="flex pt-1 px-2 pb-2" style="justify-content: space-between;">
			<view class="flex align-center" style="margin-top: -6rpx;">
				<view style="font-size: 32rpx;font-weight: bold;" class="pl-1">{{ getTabName }}</view>
			</view>
			<view class="flex align-center" style="margin-top: -10rpx;">
				<u-tabs :list="sortTabs" active-color="#f8c750" gutter="20" :current="sortCurrent" bar-width="60" bar-height="4"
				 @change="sortChange" :bold="false" :bar-style="tabStyle.bar" :active-item-style="tabStyle.active" inactive-color="gray"
				 :font-size="27"></u-tabs>
			</view>
		</view>
		<!-- 会员领取通知 -->
		<m-notice :isShow="isVipNotice" @clickNotice="clickVipNotice" style="margin-top: -26rpx;margin-bottom: -10rpx;"></m-notice>
		<!-- 任务列表 -->
		<template v-if="noData">
			<u-empty mode="data" class="animated fadeIn faster"></u-empty>
		</template>
		<template v-else>
			<view class="pt-1">
				<m-index-list :list="taskList"></m-index-list>
			</view>
		</template>
		<u-loadmore :status="loadStatus" v-show="taskList.length > 2" marginTop="20" margin-bottom="40" />
	</view>
</template>

<script>
	import mNotice from '@/components/m-notice/m-notice.vue';
	import mIndexList from '@/components/m-index-list/m-index-list.vue';
	import mIndexHot from '@/components/m-index-hot/m-index-hot.vue';
	import mTabs from '@/components/m-tabs/m-tabs.vue';
	export default {
		components: {
			mNotice,
			mIndexHot,
			mIndexList,
			mTabs
		},
		data() {
			return {
				// 推荐列表
				hotList: [],
				// 任务列表
				taskList: [],
				// 自定义导航背景
				background: {
					backgroundColor: '#f8c750'
				},
				// 轮播图
				swiper: [{
						image: 'https://x.dscmall.cn/storage/data/gallery_album/original_img/7txm6kuxlEDKXetGsx0gZCVYIi8VJrxurSRCahDr.jpeg',
						url: 'http://baidu.com'
					},
					{
						image: 'https://x.dscmall.cn/storage/data/gallery_album/original_img/RsvgpE2UrCSvkUx7ChIw9aWlYmQzhXVQYGSCWN99.jpeg',
						url: 'http://baidu.com'
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
				// tabs
				tabs: this.$C.indexClassTab,
				// 排序tabs
				sortTabs: [{
						name: '默认排序'
					},
					{
						name: '最新发布'
					},
					{
						name: '佣金最高'
					}
				],
				// 默认选中
				current: 0,
				// 排序选中
				sortCurrent: 0,
				// 当前页码
				page: 1,
				// 每页数量
				pageSize: 10,
				// 加载状态
				loadStatus: 'loadmore',
				// 无列表数据
				noData: false,
				// 是否显示领取会员通知
				isVipNotice: false,
				// 距离顶部的距离
				scrollTop: 0,
			};
		},
		// 监听页面显示
		onShow() {
			uni.startPullDownRefresh();
		},
		onPageScroll(res) {
			this.scrollTop = res.scrollTop;
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			this.page = 1;
			this.taskList = [];
			this.hotList = [];
			this.onLoadAllList();
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
		computed: {
			getTabName() {
				return this.tabs[this.current].name;
			}
		},
		methods: {
			// tab修改事件
			tabsChange(index) {
				this.current = this.tabs[index].id;
				uni.pageScrollTo({
					scrollTop: this.scrollTop,
					duration: 300
				});
				this.changeTabAndSortLoad();
			},
			// 排序tab修改事件
			sortChange(index) {
				this.sortCurrent = index;
				this.changeTabAndSortLoad();
			},
			// 排序或者tab改变 加载数据
			changeTabAndSortLoad() {
				this.page = 1;
				this.noData = false;
				this.taskList = [];
				this.getTaskList(this.pageSize, this.page);
			},
			// 点击搜索框
			clickSearch() {
				uni.navigateTo({
					url: '../search/search'
				});
			},
			// 点击推荐 更多
			clickHotMore() {
				uni.switchTab({
					url: '../hot/hot'
				});
			},
			// 点击消息
			clickNotice() {
				return this.navigateTo({
					url:'../notice/notice'
				})
			},

			clickVipNotice() {
				console.log('点击会员领取');
			},

			// 点击轮播
			clickImage(index) {
				console.log(this.swiper[index].url);
			},

			// 点击新人奖励
			clickNew() {
				return uni.switchTab({
					url:'../inv/inv'
				})
			},

			// 点击排行争霸
			clickRank() {
				return uni.navigateTo({
					url: '../rank/rank'
				});
			},
			onLoadAllList() {
				this.noData = false;
				// 获取推荐
				this.getHotList(this.pageSize, this.page);
				// 获取列表
				this.getTaskList(this.pageSize, this.page, true);
			},
			getTaskList(pageSize = 10, page = 1, stopRef = false) {
				let data = {
					sortMode: this.sortCurrent,
					taskType: this.current == 0 ? '' : this.current,
					taskRecommended: 0,
					loginUserId: this.$store.state.user.userId,
					pageSize: pageSize,
					pageNo: page
				};
				this.$u.get('task/acceptableList', data).then(res => {
					if (stopRef) setTimeout(res => {
						uni.stopPullDownRefresh();
					}, 800);
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
			},
			getHotList(pageSize = 10, page = 1) {
				let data = {
					sortMode: 0,
					taskType: '',
					taskRecommended: 1,
					loginUserId: this.$store.state.user.userId,
					pageSize: pageSize,
					pageNo: page
				};
				this.$u.get('task/acceptableList', data).then(res => {
					if (!res.data) return false;
					this.hotList = res.data;
				});
			}
		}
	};
</script>

<style>
	.m-tabs-fixed {
		position: fixed;
		width: 100%;
		height: 80rpx;
		z-index: 10;
	}
</style>
