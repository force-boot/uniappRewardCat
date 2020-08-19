<template>
	<view>
		<!-- 自定义导航 -->
		<u-navbar :is-back="true" :background="background" title="">
			<view class="font-weight-bold" style="position:absolute;left: 330rpx;">排行榜</view>
			<view style="position: absolute;right: 30rpx;" class="flex justify-between align-center" @click="getLastRank">
				<text class="mr-3">{{month}}</text>
				<u-icon name="question-circle" color="#6d6666" size="46"></u-icon>
			</view>
		</u-navbar>
		<view style="position: absolute;top: 450rpx;left: 250rpx;" v-if="!list" class="animated fadeIn">
			<u-empty mode="data" text="暂无排行数据"></u-empty>
		</view>

		<!-- tabs -->
		<view class="flex align-center justify-center m-tabs-fixed">
			<m-tabs :list="tabs" :current="current" :activeStyle="tabStyle.active" @change="tabsChange" :fontSize="30" :gutter="130"></m-tabs>
		</view>

		<block v-for="(item,index) in list" :key="index">
			<view v-show="current == 0" class="animated fadeIn">
				<view class="p-3 flex align-center justify-between">
					<view class="flex align-center">
						<template v-if="index == 0 || index ==1 || index ==2">
							<image src="../../static/image/rank_1.png" mode="aspectFill" style="width: 50rpx;height: 50rpx;"></image>
						</template>
						<template v-else>
							<view class="font-s-4 text-gray">{{index}}</view>
						</template>
						<u-avatar :src="item.avatarImage" mode="circle" class="ml-2"></u-avatar>
						<view class="flex flex-column ml-2">
							<view class="font-s-3 mb-1">{{item.username}}</view>
							<view class="font-s-2">
								完成任务
								<text class="text-jin">{{finishedNum}}</text>
								个
							</view>
						</view>
					</view>
					<view class="text-jin flex align-center font-weight-bold">奖 {{reward[index]}}</view>
				</view>
			</view>
			<view v-show="current == 1" class="animated fadeIn">
				<view class="p-3 flex align-center justify-between">
					<view class="flex align-center">
						<template v-if="index == 0 || index ==1 || index ==2">
							<image src="../../static/image/rank_1.png" mode="aspectFill" style="width: 50rpx;height: 50rpx;"></image>
						</template>
						<template v-else>
							<view class="font-s-4 text-gray font-weight-bold">{{index}}</view>
						</template>
						<u-avatar :src="item.avatarImage" mode="circle" class="ml-2"></u-avatar>
						<view class="flex flex-column ml-2">
							<view class="font-s-3 mb-1">{{item.username}}</view>
							<view class="font-s-2">
								已提现金额
								<text class="text-jin">{{item.commissionFee}}</text>
								元
							</view>
						</view>
					</view>
					<view class="text-jin flex align-center font-weight-bold">奖 {{reward2[index]}}</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import mTabs from '@/components/m-tabs/m-tabs.vue';
	export default {
		components: {
			mTabs
		},
		data() {
			return {
				// 背景
				background: {
					backgroundColor: '#f8c750'
				},
				month: '上月',
				// tabs
				tabs: [{
						id: 0,
						name: '接单榜'
					},
					{
						id: 1,
						name: '推广榜'
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
				list: [],
				reward:[],
				reward2:[],
				// 默认选择tabs
				current: 0
			};
		},
		onLoad() {
			this.loadList(this.current);
		},
		methods: {
			getMonth(lastDay = false) {
				let now = new Date();
				let year = now.getFullYear(); //得到年份
				let month = now.getMonth() + 1; //得到月份
				if (lastDay) month--;
				return year + '-' + month;
			},
			getLastRank() {
				this.month = this.month == '上月' ? '本月' : '上月';
				this.loadList(this.current, this.getMonth(this.month == '本月' ? true : false));
			},
			// tab修改事件
			tabsChange(index) {
				this.current = index;
				this.loadList(index, this.getMonth());
			},
			// 加载列表
			loadList(type = 0, month) {
				let url = 'system/orderRankingList';
				if (type == 1) url = 'system/commissionRankingList';
				this.$u.get('system/commissionRankingReward').then(res=>{
					this.reward2 = res.data;
				});
				this.$u.get('system/orderRankingReward').then(res=>{
					this.reward = res.data;
				});
				this.$u.get(url, {
					pageNo: 1,
					pageSize: 10,
					month: month
				}).then(res => {
					this.list = res.data;
				})
			}
		}
	};
</script>

<style scoped lang="scss"></style>
