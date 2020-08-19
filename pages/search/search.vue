<template>
	<view>
		<!-- 自定义导航 -->
		<u-navbar :is-back="false" :background="background">
			<view class="flex align-center justify-between ml-2" @click="clickType()">
				<view style="font-size: 26rpx;">{{selectList[selectIndex].name}}</view>
				<u-icon :name="openPopup ? 'arrow-down' : 'arrow-up'" color="gray" size="20" class="ml-1"></u-icon>
			</view>
			<view class="flex align-center bg-bai ml-2" style="border-radius: 30rpx;">
				<u-icon name="search" size="28" color="#9299a0" class="mx-1"></u-icon>

				<input v-show="selectIndex == 0" type="text" @input="onSearchInput" v-model="searchCon" :placeholder="'请输入'+selectList[selectIndex].name"
				 confirm-type="search" style="font-size: 25rpx;color: #9299a0;height: 55rpx;" :style="selectIndex == 2 ? 'width: 465rpx;' : 'width: 440rpx;'" />

				<input v-show="selectIndex == 1||selectIndex == 2" type="number" @input="onSearchInput" v-model="searchCon"
				 :placeholder="'请输入'+selectList[selectIndex].name" confirm-type="search" style="font-size: 25rpx;color: #9299a0;height: 55rpx;"
				 :style="selectIndex == 2 ? 'width: 465rpx;' : 'width: 440rpx;'" />
			</view>
			<view class="flex align-center justify-end" style="font-size: 26rpx;position: absolute;right: 20rpx;" @click="clickClose">
				取消
			</view>
		</u-navbar>
		<!-- 弹出层 切换 -->
		<uni-popup ref="popup" type="top" :animation="true">
			<uni-status-bar></uni-status-bar>
			<view class="select-list">
				<view class="px-2">
					<view class="select-item" @click="changeType(0)">
						{{selectList[0].name}}
						<u-icon name="checkmark" color="#f8c750" size="30" v-show="selectIndex === 0 ? true : false"></u-icon>
					</view>
					<u-line></u-line>
					<view class="select-item" @click="changeType(1)">
						{{selectList[1].name}}
						<u-icon name="checkmark" color="#f8c750" size="30" v-show="selectIndex === 1 ? true : false"></u-icon>
					</view>
					<u-line></u-line>
					<view class="select-item" @click="changeType(2)">
						{{selectList[2].name}}
						<u-icon name="checkmark" color="#f8c750" size="30" v-show="selectIndex === 2 ? true : false"></u-icon>
					</view>
					<u-line></u-line>
				</view>
			</view>
		</uni-popup>
		<!-- default page -->
		<view style="margin-top: 200rpx;" v-show="noData" class="animated fadeIn faster">
			<u-empty mode="data" text="暂无任务"></u-empty>
		</view>
		<!-- task list -->
		<view class="pt-1" v-show="taskList.length > 0">
			<m-index-list :list="taskList"></m-index-list>
		</view>
		<u-loadmore :status="loadStatus" v-show="taskList.length < pageSize ? false : true" marginTop="20" margin-bottom="40" />
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue';
	export default {
		components: {
			uniPopup,
			uniStatusBar
		},
		data() {
			return {
				// 自定义导航背景
				background: {
					backgroundColor: '#f8c750',
				},
				// 搜索内容
				searchCon: '',
				// 搜索提示内容
				placeholder: '',
				// 选择列表
				selectList: [{
						'name': '项目名字',
						'index': 0
					},
					{
						'name': '任务编号',
						'index': 1
					},
					{
						'name': '商家ID',
						'index': 2
					}
				],
				// 任务列表
				taskList: [],
				// 是否打开popup
				openPopup: false,
				// 当前页码
				page: 1,
				pageSize:10,
				// 加载状态
				loadStatus: 'loadmore',
				// 无列表数据
				noData: true,
				// 默认选择
				selectIndex: 0,
				// 延时执行句柄
				timer: null,
			}
		},
		onLoad() {

		},
		// 监听滑动到底部事件
		onReachBottom() {
			if (this.loadStatus != 'loadmore') return false;
			// 页码加+1
			this.page++;
			// 修改加载状态
			this.loadStatus = 'loading';
			this.getTaskList(this.pageSize,this.page);
		},
		methods: {
			clickClose() {
				return uni.switchTab({
					url: '../index/index'
				});
			},
			changeType(index) {
				this.selectIndex = index;
				this.placeholder =
					this.clickType();
			    this.page = 1;
				this.searchCon = '';
				this.taskList = [];
				this.noData = true;
			},
			clickType() {
				this.openPopup = !this.openPopup;
				if (this.openPopup) {
					this.$refs.popup.open();
				} else {
					this.$refs.popup.close();
				}
			},
			onSearchInput(item) {
				if (this.timer) clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					if ((!this.searchCon || this.searchCon.length < 1) || item.detail.value.length < 1) {
						this.noData = true;
						this.taskList = [];
						return;
					}
					this.getTaskList();
					this.timer = null;
				}, 300);
			},
			getTaskList(pageSize = 10, page = 1) {
				this.noData = false;
				let data = {
					sortMode: 0,
					pageSize: pageSize,
					pageNo: page
				};
				let searchType;
				if (this.selectIndex == 0) {
					searchType = {
						projectName: this.searchCon
					};
				} else if (this.selectIndex == 1) {
					searchType = {
						taskId: this.searchCon
					}
				} else if (this.selectIndex == 2) {
					searchType = {
						taskUserId: this.searchCon
					}
				}
				data = this.$u.deepMerge(data, searchType);
				this.$u.get('task/acceptableList', data).then(res => {
					if (!res.data) {
						this.loadStatus = 'nomore';
						if (this.page == 1) {
							this.noData = true;
							this.taskList = [];
						}
						return;
					}
					this.loadStatus = 'loadmore';
					if (res.data.length < this.pageSize) this.loadStatus = 'nomore';
					for (let i = 0; i <= res.data.length -1;i++){
						this.taskList.push(res.data[i]);
					}
				});
			},
		}
	}
</script>

<style>
	/* #ifdef H5 */
	.select-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 25rpx;
		padding-top: 20rpx;
	}

	.select-list {
		background-color: #FFFFFF;
		padding-top: 90rpx;
	}

	/* #endif */
	/* #ifdef APP-PLUS */
	.select-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
		padding-top: 20rpx;
	}

	.select-list {
		background-color: #FFFFFF;
		padding-top: 80rpx;
	}

	/* #endif */
</style>
