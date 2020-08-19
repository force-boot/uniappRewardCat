<template>
	<view>
		<u-navbar :is-back="false" title="邀请好友" :background="{
					backgroundColor: '#ff433c'
				}" :border-bottom="false"
		 :is-fixed="false" title-color="#FFFFFF">
			<template v-slot:right="">
				<view class="mr-3" @click="confirmDialog"><text style="color: #FFFFFF;">填写邀请码</text></view>
			</template>
		</u-navbar>
		<image src="../../static/image/inv_index.png" style="width: 750rpx;height: 3000rpx;">
			<view style="position: absolute;left: 60rpx;" :style="'top:'+getMessgeH+'rpx'">
				<u-notice-bar mode="vertical" :list="messageList" :font-size="27" color="#FFFFFF" bg-color="rgba(225, 225, 225,0.3)"
				 style="border-radius: 38rpx;width: 700rpx;"></u-notice-bar>
			</view>
			<view style="position: absolute;left: 130rpx;" :style="'top:'+getTop+'rpx;'">
				<uni-popup ref="dialogInput" type="dialog">
					<uni-popup-dialog mode="input" title="填写推广邀请码" placeholder="请输入邀请码" @confirm="inputCode"></uni-popup-dialog>
				</uni-popup>
				<view v-if="$store.state.user.userId" class="flex justify-center">
					<view class="mr-1 text-bai">我的邀请码</view>
					<view class="text-bai mr-2">{{$store.state.user.userId}}</view>
					<view class="text-jin" @click="copy($store.state.user.userId)">复制</view>
				</view>
				<view style="width: 500rpx;height: 80rpx;border-radius: 60rpx; box-shadow: 0rpx 8rpx 0rpx #ffa928;" class="flex align-center justify-center mt-3 bg-main">
					<view class="text-bai">
						立即邀请
					</view>
				</view>
			</view>
			<view class="flex align-center justify-between" style="position: absolute;" :style="'top:'+getChangeBtn+'rpx;'">
				<view class="flex align-center justify-center btn-triangle" :class="tabId == 0 ? 'text-bai bg-main':'bg-bai text-jin'"
				 style="width: 390rpx;height: 80rpx;" @click="changeTab(false)">
					奖励说明
				</view>
				<view class="flex align-center justify-center" :class="tabId == 1 ? 'text-bai bg-main':'bg-bai text-jin'" style="width: 390rpx;height: 80rpx;"
				 @click="changeTab(true)">
					我的好友
				</view>
			</view>
			<template v-if="!tabId">
				<view style="position: absolute;margin-left: 80rpx;" :style="'top:'+getMainPage+'rpx;'">
					<image src="../../static/image/inv_desc.png" mode="widthFix" style="width: 600rpx;"></image>
				</view>
			</template>
			<template v-else>
				<view style="position: absolute;margin-left: 80rpx;" :style="'top:'+getMainPage+'rpx;'">
					<view class="flex flex-wrap ml-1">
						<view class="flex align-center justify-between p-1 pr-5" style="border: #E5E5E5 1rpx solid;border-left: none;border-top: none;">
							<view class="flex flex-column mr-4 mt-2">
								<view class="text-hon mb-1">{{count.todayTotalNum || 0}}</view>
								<view class="mt-1">今日新增</view>
							</view>
							<view class="flex flex-column text-gray" style="font-size: 26rpx;">
								<view class="mb-1">一级：<text class="text-hon">{{count.todayFirstNum || 0}}</text></view>
								<view class="mb-1">二级：<text class="text-hon">{{count.todaySecondNum || 0}}</text></view>
								<view>三级：<text class="text-hon">{{count.todayThirdNum || 0}}</text></view>
							</view>
						</view>

						<view class="flex align-center justify-between p-1" style="border-bottom: #E5E5E5 1rpx solid;">
							<view class="flex flex-column mr-3 mt-2 ml-2">
								<view class="text-hon mb-1">{{count.wholeTotalNum || 0}}</view>
								<view class="mt-1">累计好友</view>
							</view>
							<view class="flex flex-column text-gray" style="font-size: 26rpx;">
								<view class="mb-1">一级：<text class="text-hon">{{count.wholeFirstNum || 0}}</text></view>
								<view class="mb-1">二级：<text class="text-hon">{{count.wholeSecondNum || 0}}</text></view>
								<view>三级：<text class="text-hon">{{count.wholeThirdNum || 0}}</text></view>
							</view>
						</view>

						<view class="flex align-center justify-between p-1 pr-5" style="border-right: #E5E5E5 1rpx solid;">
							<view class="flex flex-column mr-4 mt-2">
								<view class="text-hon mb-1">{{count.todayTotalCommission || 0}}</view>
								<view class="mt-1">今日收益</view>
							</view>
							<view class="flex flex-column text-gray" style="font-size: 26rpx;">
								<view class="mb-1">一级：<text class="text-hon">{{count.todayFirstCommission || 0}}</text></view>
								<view class="mb-1">二级：<text class="text-hon">{{count.todaySecondCommission || 0}}</text></view>
								<view>三级：<text class="text-hon">{{count.todayThirdCommission || 0}}</text></view>
							</view>
						</view>

						<view class="flex align-center justify-between p-1">
							<view class="flex flex-column mr-3 mt-2 ml-2">
								<view class="text-hon mb-1">{{count.wholeTotalCommission || 0}}</view>
								<view class="mt-1">累计收益</view>
							</view>
							<view class="flex flex-column text-gray" style="font-size: 26rpx;">
								<view class="mb-1">一级：<text class="text-hon">{{count.wholeFirstCommission || 0}}</text></view>
								<view class="mb-1">二级：<text class="text-hon">{{count.wholeSecondCommission || 0}}</text></view>
								<view>三级：<text class="text-hon">{{count.wholeThirdCommission || 0}}</text></view>
							</view>
						</view>
						<!-- 搜索框  -->
						<view class="flex justify-between my-3" style="margin-left: 90rpx;">
							<view>
								<input type="text" placeholder="请输入下级好友ID或昵称" maxlength="20" v-model="searchText" style="font-size: 26rpx;width: 320rpx;border: #E5E5E5 1rpx solid;padding: 4rpx;border-radius: 8rpx;"
								 class="text-gray" />
							</view>
							<view class="ml-2" @click="clickSearch">
								<view style="width: 70rpx;height: 45rpx;border-radius: 5rpx;font-size: 26rpx;" class="bg-hon text-bai flex align-center justify-center">
									查询
								</view>
							</view>
						</view>
					</view>
					<!-- tabs -->
					<view class="flex mt-2">
						<view class="flex justify-center" style="border: #FD4F0C 2rpx solid;border-radius: 8rpx;height: 50rpx;">
							<view @click="changeUserTab(1)" :class="userTabId == 1 ?'bg-hon text-bai' : ''" style="border-right: #FD4F0C 1rpx solid;">
								<text class="mx-5 mt-2" style="font-size: 26rpx;">一级好友</text>
							</view>
							<view style="border-right: #FD4F0C 1rpx solid;" @click="changeUserTab(2)" :class="userTabId == 2 ?'bg-hon text-bai' : ''">
								<text class="mx-5" style="font-size: 26rpx;">二级好友</text>
							</view>
							<view @click="changeUserTab(3)" :class="userTabId == 3 ?'bg-hon text-bai' : ''">
								<text class="mx-5" style="font-size: 26rpx;">三级好友</text>
							</view>
						</view>
					</view>

					<!-- 列表 -->
					<view class="flex mt-2" style="margin-left: -80rpx;">
						<view style="background-color: #ffd9d9;height: 45rpx;font-size: 25rpx;" class="flex align-center justify-between mt-2 flex-1">
							<view style="margin-left: 70rpx;">头像</view>
							<view>下级信息</view>
							<view>邀请时间</view>
							<view>上级</view>
							<view class="mr-3">收益（累计）</view>
						</view>
					</view>
					<template v-if="noData">
						<view class="animated fadeIn" style="margin: 120rpx 160rpx 160rpx 120rpx;">
							<u-empty mode="data" text="暂无数据"></u-empty>
						</view>
					</template>
					<template v-else>
						<block v-for="(item,index) in userList" :key="index">
							<view class="flex flex-column my-2" style="margin-left: -30rpx;">
								<view class="flex justify-between">
									<view class="flex mx-2">
										<u-avatar :src="item.friendAvatarImage" mode="circle" :size="50"></u-avatar>
									</view>
									<view class="flex flex-1 justify-between ml-3">
										<view style="font-size: 25rpx;max-width: 140rpx;" class="nowrap">
											{{item.friendUsername}}
											<view style="font-size: 25rpx;">(ID:{{item.friendId}})</view>
										</view>
									</view>

									<view class="flex-1 flex" style="font-size: 25rpx;">
										<view>
											{{$u.timeFormat($U.getTime(item.createTime), 'yyyy/mm/dd hh:MM:ss')}}
										</view>
									</view>

									<view class="flex-1" style="font-size: 25rpx;">
										<view>
											ID:{{item.friendParentId}}
										</view>
									</view>

									<view class="flex-1" style="font-size: 25rpx;">
										<view>
											{{item.commissionFee}}
										</view>
									</view>
								</view>
							</view>
							<view class="flex align-center justify-between mt-5" style="margin-right: 130rpx;margin-left: 60rpx;">
								<view @click="changePage(0)" style="width: 70rpx;height: 35rpx;" class="flex align-center justify-center"
								 :style="page == 1 ? 'background-color: #e8e8e8;' : ''">
									<u-icon name="arrow-left" size="26" :class="page == 1 ? 'text-bai' : ''"></u-icon>
								</view>
								<view @click="changePage(1)" style="width: 70rpx;height: 35rpx;" class="flex align-center justify-center">
									<text style="color: #007AFF;">{{page}}</text>/{{pages}}
								</view>
								<view style="width: 70rpx;height: 35rpx;background-color: #E3E3E3;" class="flex align-center justify-center">
									<u-icon name="arrow-right" size="26"></u-icon>
								</view>
							</view>
						</block>
					</template>
				</view>
			</template>
		</image>
		<view style="position: absolute;top: 2650rpx;">
			<image src="../../static/image/inv_foot.png" mode="widthFix" style="width: 750rpx;"></image>
		</view>
	</view>
	</view>
</template>

<script>
	import h5Copy from '../../js_sdk/junyi-h5-copy/junyi-h5-copy/junyi-h5-copy.js';
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
	import data from './data.js';
	export default {
		components: {
			uniPopupDialog
		},
		onLoad() {
			// #ifdef APP-PLUS
			let systemInfo = uni.getSystemInfoSync();
			let i = systemInfo.statusBarHeight + 44;
			let a = systemInfo.statusBarHeight + 48;
			if (systemInfo.platform == "android") {
				this.statusH = 750 * a / 750;
			} else {
				this.statusH = 750 * i / 750;
			}
			// #endif
			// 获取消息轮播消息
			this.getMessageList();
		},
		data() {
			return {
				messageList: [],
				userList: [],
				count: {},
				searchText: '',
				tabId: false,
				userTabId: 1,
				statusH: 0,
				page: 1,
				pages: 0,
				pageSize: 10,
				noData: true
			};
		},
		computed: {
			getTop() {
				// #ifdef APP-PLUS
				return this.statusH + 580;
				// #endif
				return 600;
			},
			getChangeBtn() {
				return this.getTop + 270;
			},
			getMainPage() {
				return this.getTop + 480;
			},
			getMessgeH() {
				// #ifdef APP-PLUS
				if (uni.getSystemInfoSync().platform == "android") {
					return this.statusH + 80;
				}
				if (uni.getSystemInfoSync().platform == "ios") {
					return this.statusH + 110;
				}
				// #endif
				return 123;
			}
		},
		methods: {
			changeTab(e) {
				this.tabId = e;
				//切换到我的好友时 加载数据
				if (this.tabId) {
					if (!this.$store.state.user.userId) return uni.navigateTo({
						url: '../login/login'
					});
					this.countNum();
					this.loadUserList(this.userTabId, this.page, this.pageSize);
				}
			},
			confirmDialog() {
				if (!this.$store.state.user.userId) return uni.navigateTo({
					url: '../login/login'
				});
				return this.$refs.dialogInput.open()
			},
			changeUserTab(id) {
				this.userTabId = id;
				this.loadUserList(this.userTabId, 1, this.pageSize);
			},
			changePage(type) {
				if (type) {
					this.page++;
				} else {
					this.page--;
				}
				this.loadUserList(this.userTabId, this.page, this.pageSize);
			},
			getMessageList() {
				// 循环获取昵称列表
				for (let i = 0; i <= data.length - 1; i++) {
					this.messageList.push('“' + data[i] + '”刚刚邀请了' + this.$U.random(1, 300) + '人预计收入' + this.$U.random(1, 500) + '.00');
				}
			},
			copy(data) {
				// #ifdef APP-PLUS
				uni.setClipboardData({
					data: data.toString()
				});
				// #endif
				// #ifdef H5
				const result = h5Copy(data);
				if (result === false) {
					return this.$U.outputMsg('当前浏览器不支持');
				} else {
					return this.$U.outputMsg('复制邀请码成功');
				}
				// #endif
			},
			clickSearch() {
				if (!this.searchText) return this.$U.outputMsg('搜索内容不能为空');
				return this.loadUserList(this.userTabId, this.page, this.pageSize, this.searchText);
			},
			loadUserList(friendLevel = 1, pageNo = 1, pageSize = 10, searchText = false) {
				let params = {
					friendLevel: friendLevel,
					pageNo: pageNo,
					pageSize: pageSize
				};
				if (searchText) {
					if (this.$U.isRealNum(searchText)) {
						params = Object.assign({
							friendUserId: searchText
						}, params);
					} else {
						params = Object.assign({
							friendUsername: searchText
						}, params);
					}
				}
				this.$u.get('friend/list', params).then(res => {
					if (!res.data) {
						this.noData = true;
					} else {
						this.userList = res.data;
						this.page = res.page.pageNum;
						this.pages = res.page.pages;
					}
				});
			},
			inputCode(e, val) {
				if (!val) return this.$U.outputMsg('邀请码不能为空');
				if (!this.$U.isRealNum(val)) return this.$U.outputMsg('邀请码只能是数字');
				this.$u.get('user/parent', {
					parentUserId: val
				}).then(res => {
					this.$refs.dialogInput.close()
					if (!res.data) return this.$U.outputMsg(res.message);
					return this.$U.outputMsg('填写邀请码成功');
				});
			},
			countNum() {
				this.$u.get('friend/count').then(res => {
					this.count = res;
				});
			}
		}
	};
</script>

<style>
	.text-jin {
		color: #fac92a;
	}

	.bg-main {
		background-color: #ffb633;
	}

	.text-hon {
		color: #fd4f0c;
	}

	.bg-hon {
		background-color: #fd4f0c;
	}
</style>
