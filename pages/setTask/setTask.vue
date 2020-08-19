<template>
	<view>
		<view class="p-2">
			<view class="flex align-center justify-start pt-2">
				<u-avatar :src="userInfo.avatarImage" mode="circle" :size="90"></u-avatar>
				<view>
					<view class="flex align-center ml-2 mb-1">
						<view class="font-weight-bold" style="font-size: 33rpx;">{{ userInfo.username }}</view>
						<view style="position: absolute;right: 30rpx;">
							<text style="font-size: 22rpx;" class="text-gray">ID:{{ userInfo.userId }}</text>
						</view>
					</view>
					<view class="flex justify-between align-center ml-2">
						<view style="border-radius: 20rpx;height: 35rpx;width: 120rpx;" class="border-bai flex align-center justify-center  mr-1"
						 :class="userInfo.hasNameAuth ? 'my-icon-bgcolor-cheng' : 'my-icon-bgcolor-hui'">
							<view style="margin-bottom: 8rpx;">
								<u-icon name="account" color="#FFFFFF" size="18"></u-icon>
							</view>
							<text class="text-bai" style="margin-left: 5rpx;font-size: 19rpx;">实名认证</text>
						</view>
						<view style="border-radius: 20rpx;height: 35rpx;width: 120rpx;" class="border-bai flex align-center justify-center"
						 :class="userInfo.superTrader == 1 ? 'my-icon-bgcolor-cheng' : 'my-icon-bgcolor-hui'">
							<view style="margin-bottom: 8rpx;">
								<u-icon name="integral" color="#FFFFFF" size="19"></u-icon>
							</view>
							<view class="text-bai" style="margin-left: 5rpx;font-size: 19rpx;">超级商人</view>
						</view>
						<view @click="navigateTo({
									url:'../vip/vip'
								})" style="position: absolute;right: 29rpx;" v-show="userInfo.superTrader != 1">
							<view class="text-jin" style="font-size: 24rpx;">开通超级商人</view>
						</view>
					</view>
				</view>
			</view>
			<view class="flex align-center justify-between mt-2">
				<view @click="navigateTo({
					url:'../tools/tools'
				})">
					刷新道具：{{userInfo.refreshNum}}个
					<text class="text-jin ml-3">购买</text>
				</view>
				<view @click="clickBzj()">
					保证金
					<u-icon name="arrow-right" color="#bec6cd"></u-icon>
				</view>
			</view>
		</view>
		<u-gap height="19" bg-color="#f5f4f4"></u-gap>
		<view class="flex align-center justify-between">
			<view class="flex flex-1 align-center ml-2">
				发布余额：
				<text class="font-s-4 text-jin">{{ userInfo.taskBalance == 0 ? '0.00' : userInfo.taskBalance / 100 }}</text>
			</view>
			<view class="flex flex-1 flex-wrap justify-end align-center">
				<view @click="navigateTo({
					url:'../bond/recharge'
				})" class="flex align-center justify-center border-bai mr-1 bg-main"
				 style="border-radius: 25rpx;width: 135rpx;height: 50rpx;margin-top: 15rpx;margin-bottom: 15rpx;">
					<text style="font-size: 24rpx;">充值</text>
				</view>
				<view @click="navigateTo({url:'../wallet/tx?userInfo='+JSON.stringify(userInfo)})" class="flex align-center justify-center border-bai mr-2 bg-main"
				 style="border-radius: 25rpx;width: 135rpx;height: 50rpx;margin-top: 15rpx;margin-bottom: 15rpx;">
					<text style="font-size: 24rpx;">提现</text>
				</view>
				<view @click="confirmDialog" class="flex align-center justify-center border-bai mb-2 mr-2 bg-main" style="border-radius: 25rpx;width: 280rpx;height: 55rpx;">
					<text style="font-size: 24rpx;">用户余额转为发布余额</text>
				</view>
			</view>
		</view>
		<uni-popup ref="dialogInput" type="dialog">
			<uni-popup-dialog mode="input" title="请输入要转换的金额" placeholder="请输入金额" @confirm="clickByMoney"></uni-popup-dialog>
		</uni-popup>
		<u-gap height="19" bg-color="#f5f4f4"></u-gap>
		<!-- tabs -->
		<view class="flex align-center justify-center m-tabs-fixed">
			<m-tabs :list="tabs" :current="current" :activeStyle="tabStyle.active" @change="tabsChange" :fontSize="28" :gutter="70"></m-tabs>
		</view>

		<view class="animated fadeIn" style="margin: 100rpx;" v-show="noData">
			<u-empty mode="data" :text="'没有' + tabs[current].name + '的任务'"></u-empty>
			<view class="border-bai bg-main" style="border-radius: 50rpx;margin-top: 20rpx;" @click="clickAdd">
				<view style="height: 85rpx;" class="flex align-center justify-center font-weight-bold">发布任务</view>
			</view>
		</view>

		<block v-for="(item,index) in taskList" :key="index">
			<view class="pt-4 px-3 pb-2">
				<view class="flex align-center justify-between pb-1" style="border-bottom: #F1F1F1 1rpx solid;">
					<view class="flex align-center">
						<u-avatar :src="item.avatarImage" :size="105"></u-avatar>
					</view>
					<view class="flex flex-column flex-1 ml-2">
						<view class="flex align-center justify-between">
							<view class="nowrap" style="max-width: 345rpx;margin-bottom: -7rpx;font-size: 31rpx;">{{item.taskName}}</view>
							<view class="flex align-center">
								<view class="flex align-center justify-center border-bai" style="border-radius: 15rpx;width: 140rpx;height: 50rpx;background-color: #3B4144;">
									<text style="font-size: 24rpx;" class="text-bai">{{tabs[current].name}}</text>
								</view>
							</view>
						</view>
						<view class="text-jin" style="font-size: 26rpx;margin-top: 7rpx;">单价：{{item.rewardPrice /100}}元
							<template v-if="current == 2">
								<text class="ml-2">总计支出：{{(item.taskNum * item.rewardPrice) /100}}元</text>
							</template>
						</view>
						<view class="flex align-center justify-between">

							<view class="text-jin" style="font-size: 26rpx;margin-top: 7rpx;">接单：{{item.finishedNum}}份

								<template v-if="current == 2">
									<text class="ml-2">已完成：{{item.finishedNum}}份</text>
								</template>

								<text class="text-jin ml-2">剩余：{{item.taskNum - item.finishedNum}}份</text>
							</view>

							<!-- 判断进行中的分享按钮 -->
							<template v-if="current == 1">
								<view class="border-bai bg-main flex align-center justify-center" style="border-radius: 13rpx;width: 140rpx;height: 50rpx;">
									<text style="font-size: 24rpx;">分享任务</text>
								</view>
							</template>

						</view>
					</view>
				</view>
				<!-- 判断类型 -->
				<template v-if="current==0">
					<view class="flex align-center justify-between mt-2">
						<view>
							审核失败原因：{{item.taskStatus == -1 ? '审核不通过' : '待审核'}}
						</view>
						<view>
							时间：{{$u.timeFormat(item.createTime, 'yyyy-mm-dd hh:MM:ss')}}
						</view>
					</view>
				</template>
				<template v-if="current == 1 || current == 2">
					<view class="flex align-center justify-between mt-2">
						<view>
							开始时间：{{$u.timeFormat(item.createTime, 'yyyy-mm-dd')}}
						</view>
						<view>
							结束时间：{{$u.timeFormat(item.endTime, 'yyyy-mm-dd')}}
						</view>
					</view>
				</template>

				<!-- 这里我分开判断  每个状态按钮-->
				<template v-if="current == 0">
					<view class="flex align-center justify-between mt-2">
						<view style="border-radius: 13rpx;width: 130rpx;height: 50rpx;" class="bg-gray text-bai flex align-center justify-center">
							推荐任务
						</view>
						<view style="border-radius: 13rpx;width: 140rpx;height: 50rpx;" class="bg-gray text-bai flex align-center justify-center">
							刷新任务
						</view>
						<view style="border-radius: 13rpx;width: 140rpx;height: 50rpx;" class="bg-gray text-bai flex align-center justify-center">
							审批任务
						</view>
						<view style="border-radius: 13rpx;width: 140rpx;height: 50rpx;" class="bg-gray text-bai flex align-center justify-center">
							完成列表
						</view>
					</view>
				</template>

				<template v-if="current == 1">
					<view class="flex align-center justify-between mt-2">
						<view @click="clickRecommend(item.taskId)" style="border-radius: 13rpx;width: 130rpx;height: 50rpx;" class="bg-info text-bai flex align-center justify-center">
							推荐任务
						</view>
						<view @click="clickRefresh(item.taskId)" style="border-radius: 13rpx;width: 140rpx;height: 50rpx;" class="bg-error text-bai flex align-center justify-center">
							刷新任务
						</view>
						<view @click="clickApproval(item.taskId)" style="border-radius: 13rpx;width: 140rpx;height: 50rpx;" class="bg-success text-bai flex align-center justify-center">
							审批任务
						</view>
						<view @click="clickOk(2,item.taskId)" style="border-radius: 13rpx;width: 140rpx;height: 50rpx;" class="bg-zi text-bai flex align-center justify-center">
							完成列表
						</view>
					</view>
				</template>

				<template v-if="current == 2">
					<view class="flex align-center justify-between mt-2">
						<view style="border-radius: 13rpx;width: 130rpx;height: 50rpx;" class="bg-gray text-bai flex align-center justify-center">
							推荐任务
						</view>
						<view style="border-radius: 13rpx;width: 140rpx;height: 50rpx;" class="bg-gray text-bai flex align-center justify-center">
							刷新任务
						</view>
						<view style="border-radius: 13rpx;width: 140rpx;height: 50rpx;" class="bg-gray text-bai flex align-center justify-center">
							审批任务
						</view>
						<view @click="clickOk(2,item.taskId)" style="border-radius: 13rpx;width: 140rpx;height: 50rpx;" class="bg-zi text-bai flex align-center justify-center">
							完成列表
						</view>
					</view>
				</template>

			</view>
			<u-gap height="19" bg-color="#f5f4f4"></u-gap>
		</block>

		<u-loadmore :status="loadStatus" v-show="taskList.length >= pageSize" marginTop="20" marginBottom="20" />
	</view>
</template>

<script>
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
	import mTabs from '@/components/m-tabs/m-tabs.vue';
	export default {
		components: {
			uniPopupDialog,
			mTabs
		},
		data() {
			return {
				userInfo: [],
				// tabs
				tabs: [{
						id: 0,
						name: '未上线'
					},
					{
						id: 1,
						name: '进行中'
					},
					{
						id: 2,
						name: '已结束'
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
				// 默认选择tabs
				current: 0,
				// 当前页码
				page: 1,
				// 每页数量
				pageSize: 4,
				// 加载状态
				loadStatus: 'loadmore',
				// 无列表数据
				noData: false
			};
		},
		onLoad(e) {
			if (!e.userInfo) return this.getUserInfo();
			this.userInfo = JSON.parse(e.userInfo);
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
			this.getMyTaskList(this.pageSize, this.page);
		},
		// 监听滑动到底部事件
		onReachBottom() {
			if (this.loadStatus != 'loadmore') return;
			// 页码加+1
			this.page++;
			// 修改加载状态
			this.loadStatus = 'loading';
			this.getMyTaskList(this.pageSize, this.page);
		},
		onNavigationBarButtonTap() {
			return this.clickAdd();
		},
		methods: {
			// 获取用户信息
			getUserInfo() {
				this.$u
					.get(
						'user/getUser', {}, {
							Authorization: this.$store.state.user.accessToken
						}
					)
					.then(res => {
						this.userInfo = res.data;
					});
			},
			// tab修改事件
			tabsChange(index) {
				this.current = index;
				this.page = 1;
				this.taskList = [];
				this.getMyTaskList(this.pageSize, this.page);
			},
			getMyTaskList(pageSize = 10, page = 1) {
				let data = {
					pageNo: page,
					pageSize: pageSize
				}
				this.noData = false;
				if (this.current == 0) {
					this.$u.get('task/ownList', data).then(res => {
						this.loadStatus = 'loadmore';
						let count = 0;
						if (res.data) {
							for (let i = 0; i <= res.data.length - 1; i++) {
								if (res.data[i].taskStatus == -1 || res.data[i].taskStatus == 0) {
									this.taskList.push(res.data[i]);
									count++;
								} else {
									continue;
								}
							}
						}
						if (count < 1) {
							this.loadStatus = 'nomore';
							if (this.page == 1) {
								this.noData = true;
								this.taskList = [];
							}
							return false;
						}
						if (count < this.pageSize) this.loadStatus = 'nomore';
					});
				} else {
					data = Object.assign({
						taskStatus: this.current
					}, data);
					this.$u
						.get('task/ownList', data)
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
							this.noData = false;
						});
				}
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 800);
			},
			clickAdd() {
				this.navigateTo({
					url: '../addTask/addTask'
				});
			},
			clickBzj() {
				this.navigateTo({
					url: '../bond/bond'
				});
			},
			clickApproval(tid) {
				return this.navigateTo({
					url: '../approval/list?tid=' + tid
				});
			},
			clickRecommend(tid) {
				uni.showModal({
					title: '温馨提示',
					content: '你确定要消耗余额将该任务上推荐吗?',
					confirmColor: '#f8c750',
					success: (res) => {
						if (res.confirm) {
							this.$u.get('task/recommend', {
								taskId: tid
							}).then(res => {
								return this.$U.outputMsg('购买成功,本次消耗金额' + res.data / 100 + '元');
							});
						}
					}
				});
			},
			clickRefresh(tid) {
				uni.showModal({
					title: '温馨提示',
					content: '你确定要使用刷新道具让任务刷新置顶吗?',
					confirmColor: '#f8c750',
					success: (res) => {
						if (res.confirm) {
							this.$u.get('task/refresh', {
								taskId: tid
							}).then(res => {
								return this.$U.outputMsg(res.message);
							});
						}
					}
				});
			},
			confirmDialog() {
				return this.$refs.dialogInput.open();
			},
			clickByMoney(done, money) {
				console.log(done);
				if (!money) return this.$U.outputMsg('转换金额不能为空');
				if (!this.$U.isRealNum(money)) return this.$U.outputMsg('转换金额只能是数字');
				if (money > this.userInfo.userBalance) return this.$U.outputMsg('转换失败，用户余额不足');
				this.$u.get('user/transfer2TaskBalance', {
					money: money
				}).then(res => {
					this.$refs.dialogInput.close();
					if (res.data) this.userInfo.taskBalance = res.data + this.userInfo.taskBalance;
					return this.$U.outputMsg(res.message);
				});
			},
			clickOk(current, tid) {
				return this.navigateTo({
					url: '../approval/list?current=' + current + '&tid=' + tid
				});
			}
		}
	};
</script>

<style></style>
