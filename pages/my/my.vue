<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view v-show="!showLogin">
			<!-- start -->
			<view class="p-2">
				<view class="flex align-center justify-end" @click="navigateTo({
					url:'../notice/notice'
				})">
					<u-icon name="bell" size="50" color="#3b3c3f"></u-icon>
				</view>
				<view class="flex align-center pt-2">
					<u-avatar :src="userInfo.avatarImage" mode="circle" :size="100" @click="clickChange"></u-avatar>
					<view>
						<view class="flex  align-center ml-2 mb-1">
							<view class="font-weight-bold" style="font-size: 33rpx;">{{ userInfo.username }}</view>
							<view style="position: absolute;right: 30rpx;">
								<text style="font-size: 22rpx;" class="text-gray">ID:{{ userInfo.userId }}</text>
							</view>
						</view>
						<view class="flex justify-between align-center ml-2">
							<view style="border-radius: 20rpx;height: 35rpx;width: 120rpx;" class="border-bai flex align-center justify-center mr-1"
							 :class="userInfo.superTrader == 1 ? 'my-icon-bgcolor-cheng' : 'my-icon-bgcolor-hui'">
								<view style="margin-bottom: 8rpx;">
									<u-icon name="integral" color="#FFFFFF" size="17"></u-icon>
								</view>
								<view class="text-bai" style="margin-left: 5rpx;font-size: 19rpx;">超级商人</view>
							</view>
							<view style="border-radius: 20rpx;height: 35rpx;width: 120rpx;" class="border-bai flex align-center justify-center"
							 :class="userInfo.superTalent == 1 ? 'my-icon-bgcolor-cheng' : 'my-icon-bgcolor-hui'">
								<view style="margin-bottom: 8rpx;">
									<u-icon name="heart" color="#FFFFFF" size="17"></u-icon>
								</view>
								<text class="text-bai" style="margin-left: 5rpx;font-size: 19rpx;">爱心达人</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 账户信息 -->
				<view class="mt-3 my-icon-bgcolor-cheng" style="border-radius: 15rpx;height: 230rpx;">
					<view class="flex align-center justify-center">
						<view class="flex flex-column align-center" style="margin-left: 75rpx;">
							<view style="color: #FFFFFF;font-size: 23rpx;" class="pl-3 pt-3">用户余额 (元)</view>
							<view style="color: #FFFFFF;margin-left: 10rpx;" class="font-s-5 pt-1 pb-2">
								{{userInfo.userBalance == 0 ? '0.00' : userInfo.userBalance / 100}}
							</view>
							<view @click="navigateTo({
									url:'../wallet/tx?userInfo='+JSON.stringify(userInfo)
								})" class="flex align-center justify-center border-bai mb-3"
							 style="border-radius: 16rpx;background-color: #FFFFFF;width: 100rpx;height: 40rpx;">
								<text class="text-jin" style="font-size: 24rpx;">提现</text>
							</view>
						</view>
						<view class="flex flex-column align-center " style="flex: 1;">
							<view style="color: #FFFFFF;font-size: 23rpx;" class="pl-3 pt-3">发布余额 (元)</view>
							<view class="font-s-5 pt-1 pb-2 ml-4" style="color: #FFFFFF;">
								{{userInfo.taskBalance == 0 ? '0.00' : userInfo.taskBalance / 100}}
							</view>
							<view class="flex align-center justify-between" style="margin-right: -60rpx;">
								<view @click="navigateTo({
									url:'../bond/recharge'
								})" class="flex align-center justify-center border-bai mb-3 mr-2"
								 style="border-radius: 16rpx;background-color: #FFFFFF;width: 100rpx;height: 40rpx;">
									<text class="text-jin" style="font-size: 24rpx;">充值</text>
								</view>
								<view @click="navigateTo({
									url:'../wallet/tx?userInfo='+JSON.stringify(userInfo)
								})" class="flex align-center justify-center border-bai mb-3"
								 style="border-radius: 16rpx;background-color: #FFFFFF;width: 100rpx;height: 40rpx;">
									<text class="text-jin" style="font-size: 24rpx;">提现</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="flex align-center text-gray mt-2 mb-1" style="font-size: 25rpx;">
					<view class="mr-3">今日到账：0.00元</view>
					<view>待审核金额：0.00元</view>
				</view>
			</view>
			<u-gap height="19" bg-color="#f5f4f4"></u-gap>
			<!--  end -->

			<!-- start -->
			<view class="p-2">
				<view class="flex" style="justify-content: space-between;" @click="clickMyTask(9)">
					<view class="flex align-center ml-1" style="margin-top: -5rpx;">
						<view style="font-size: 30rpx;font-weight: bold;" class="">我的任务</view>
					</view>
					<view class="text-gray" style="font-size: 25rpx;">
						查看全部
						<u-icon name="arrow-right" color="#bec6cd"></u-icon>
					</view>
				</view>

				<view class="flex align-center justify-between px-4 pt-3 pb-2 text-center">
					<view @click="clickMyTask(0)">
						<u-icon name="clock" color="#f8c750" size="55"></u-icon>
						<view class="text-gray">待提交</view>
					</view>
					<view @click="clickMyTask(1)">
						<u-icon name="error-circle" color="#f8c750" size="55"></u-icon>
						<view class="text-gray">审核中</view>
					</view>
					<view @click="clickMyTask(2)">
						<u-icon name="checkmark-circle" color="#f8c750" size="55"></u-icon>
						<view class="text-gray">已通过</view>
					</view>
					<view @click="clickMyTask(3)">
						<u-icon name="close-circle" color="#f8c750" size="55"></u-icon>
						<view class="text-gray">未通过</view>
					</view>
					<view @click="clickMyTask(4)">
						<u-icon name="warning" color="#f8c750" size="55"></u-icon>
						<view class="text-gray">复审举报</view>
					</view>
				</view>
			</view>
			<u-gap height="19" bg-color="#f5f4f4"></u-gap>
			<!-- end -->

			<!-- start -->
			<uni-list>
				<uni-list-item @click="clickItemList('setTask')">
					<template v-slot:left="">
						<view class="my-1 flex align-center">
							<u-icon name="edit-pen" color="#f8c750" size="40"></u-icon>
							<text class="ml-1">发布/管理任务</text>
						</view>
					</template>
					<template v-slot:right="">
						<text class="text-jin">免费发布</text>
					</template>
				</uni-list-item>
				<uni-list-item  @click="clickItemList('notice')">
					<template v-slot:left="">
						<view class="my-1 flex align-center">
							<u-icon name="chat" color="#f8c750" size="42"></u-icon>
							<text class="ml-1">我的聊天</text>
						</view>
					</template>
				</uni-list-item>
				<!-- <uni-list-item>
					<template v-slot:left="">
						<view>
							<u-icon name="man-delete" color="#f8c750" size="28"></u-icon>
							<text class="ml-1">黑户名单</text>
						</view>
					</template>
				</uni-list-item> -->
				<uni-list-item @click="navigateTo({
					url:'../vip/home?info='+JSON.stringify(userInfo)
				})">
					<template v-slot:left="">
						<view class="my-1 flex align-center">
							<u-icon name="integral" color="#f8c750" size="40"></u-icon>
							<text class="ml-1">会员中心</text>
						</view>
					</template>
					<template v-slot:right="">
						<text class="text-jin">专享特权</text>
					</template>
				</uni-list-item>
				<uni-list-item @click="clickItemList('inv')">
					<template v-slot:left="">
						<view class="my-1 flex align-center">
							<u-icon name="share" color="#f8c750" size="40"></u-icon>
							<text class="ml-1">邀友赚钱</text>
						</view>
					</template>
					<template v-slot:right="">
						<text class="text-gray">躺着收钱</text>
					</template>
				</uni-list-item>
				<uni-list-item @click="clickItemList('rank')">
					<template v-slot:left="">
						<view class="my-1 flex align-center">
							<u-icon name="gift" color="#f8c750" size="40"></u-icon>
							<text class="ml-1">排名奖励</text>
						</view>
					</template>
					<template v-slot:right="">
						<text class="text-jin">三万元大奖</text>
					</template>
				</uni-list-item>
				<uni-list-item @click="navigateTo({
					url:'../help/help'
				})">
					<template v-slot:left="">
						<view class="my-1 flex align-center">
							<u-icon name="question" color="#f8c750" size="40"></u-icon>
							<text class="ml-1">帮助中心</text>
						</view>
					</template>
				</uni-list-item>
				<uni-list-item @click="clickItemList('smrz')">
					<template v-slot:left="">
						<view class="my-1 flex align-center">
							<u-icon name="account" color="#f8c750" size="40"></u-icon>
							<text class="ml-1">实名认证</text>
						</view>
					</template>
					<template v-slot:right="">
						<text class="text-gray">{{ userInfo.hasNameAuth ? '已实名' : '未实名' }}</text>
					</template>
				</uni-list-item>
				<!-- 
				<uni-list-item @click="clickItemList('setting')">
					<template v-slot:left="">
						<view>
							<u-icon name="setting" color="#f8c750" size="28"></u-icon>
							<text class="ml-1">设置</text>
						</view>
					</template>
				</uni-list-item> -->
			</uni-list>
			<!-- end -->
			<u-gap height="19" bg-color="#f5f4f4"></u-gap>
		</view>
		<!-- 未登陆提示 -->
		<view style="position: absolute;top: 450rpx;left: 250rpx;" @click="clickLogin" v-show="showLogin" class="animated fadeIn">
			<u-empty mode="permission" text="你还没登陆,请先登陆"></u-empty>
			<view class="border-bai bg-main" style="border-radius: 50rpx;margin-top: 20rpx;">
				<view style="height: 90rpx;" class="flex align-center justify-center font-weight-bold">立即登陆</view>
			</view>
		</view>
		<u-action-sheet :list="actionList" v-model="actionShow" :tips="tips" :cancel-btn="true" @click="changeInfo"></u-action-sheet>
		<uni-popup ref="dialogInput" type="dialog">
			<uni-popup-dialog mode="input" title="请输入新昵称" placeholder="请输入昵称" @confirm="changeUserName"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniStatusBar from '@/components/uni-status-bar/uni-status-bar.vue';
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
	export default {
		components: {
			uniStatusBar,
			uniPopupDialog,
			uniList,
			uniListItem
		},
		data() {
			return {
				showLogin: false,
				userInfo: {},
				actionShow: false,
				tips: {
					text: '请选择你想修改的内容',
					color: '#909399',
					fontSize: 28
				},
				imgUrl: '',

				actionList: [{
						text: '编辑头像'
					},
					{
						text: '修改昵称'
					}
				]
			};
		},
		onShow() {
			this.showLogin = !this.$store.state.loginStatus;
			this.getUserInfo();
		},
		methods: {
			clickChange() {
				this.actionShow = true;
			},
			// 点击登陆
			clickLogin() {
				return uni.navigateTo({
					url: '../login/login'
				});
			},
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
			// 点击我的任务
			clickMyTask(item = 9) {
				return uni.navigateTo({
					url: '../myTaskList/myTaskList?item=' + item
				});
			},
			// 点击item list 列表
			clickItemList(page) {
				let url = '../' + page + '/' + page;
				if (page == 'setTask') {
					url = '../' + page + '/' + page + '?userInfo=' + JSON.stringify(this.userInfo);
				}
				return uni.navigateTo({
					url: url,
					fail: () => {
						return uni.switchTab({
							url: url
						});
					}
				});
			},
			changeUserName(done,value){
				if (value == '') return this.$U.outputMsg('昵称不能为空');
				this.$u.post('user/edit',{
					username:value
				}).then(res=>{
					this.$refs.dialogInput.close();
					if (res.data) {
						this.getUserInfo();
						return this.$U.outputMsg('修改头像成功');
					} else {
						return this.$U.outputMsg(res.message);
					}
				});
			},
			changeInfo(e) {
				this.actionShow = false;
				if (e == 0) {
					uni.chooseImage({
						count: 1,
						success: res => {
							this.imgUrl = res.tempFilePaths[0];
							uni.showLoading({
								title: '上传中'
							});
							var uploadTask = uni.uploadFile({
								url: this.$C.apiUrl + '/system/uploadFile',
								filePath: this.imgUrl,
								fileType: 'image',
								header: {
									Authorization: this.$store.state.user.accessToken
								},
								name: 'file',
								success: uploadFileRes => {
									this.$u.post('user/edit', {
										avatarImage: JSON.parse(uploadFileRes.data).data
									}).then(res => {
										uni.hideLoading();
										if (res.data) {
											this.getUserInfo();
											return this.$U.outputMsg('修改头像成功');
										} else {
											return this.$U.outputMsg(res.message);
										}
									});
								}
							});
						}
					});
				} else {
					this.$refs.dialogInput.open();
				}

			}
		}
	};
</script>

<style></style>
