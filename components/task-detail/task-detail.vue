<template>
	<view class="animated fadeIn">
		<view class="flex align-center justify-between p-3">
			<view class="flex flex-column">
				<view style="font-size: 30rpx;font-weight: bold;max-width: 450rpx;" class="nowrap">{{ taskInfo.taskName }}</view>
				<view class="flex align-center mt-1">
					<view class="mr-1">
						<m-tags :size="20" :text="getTaskTypeName(taskInfo.taskType)"></m-tags>
					</view>
					<view v-show="taskInfo.projectName != ''">
						<m-tags :size="20" :text="taskInfo.projectName"></m-tags>
					</view>
				</view>
			</view>
			<view style="position: absolute;right: 170rpx;">
				<u-line color="#dadada" length="80rpx" direction="col" />
			</view>

			<view class="flex flex-column">
				<view style="color: #6e788c;" class="mb-1 flex align-center">
					<u-icon name="integral-fill" size="28"></u-icon>
					<view class="ml-1">+{{ taskInfo.rewardPrice /100  || taskInfo.taskPrice /100}}</view>
				</view>
				<view style="color: #ff843c;" class="flex align-center">
					<u-icon name="integral-fill" size="28"></u-icon>
					<view class="ml-1">+{{ taskInfo.superRewardPrice /100|| taskInfo.taskPrice /100}}</view>
				</view>
			</view>
		</view>
		<view class="flex align-center justify-end mb-3 mr-3" v-if="showType">
			<view style="font-size: 28rpx;">本次结算：<text class="text-jin" style="font-size: 28rpx;">+{{ taskInfo.rewardFee / 100}}</text></view>
		</view>
		<view class="px-3">
			<u-line color="#dadada" length="700rpx" />
		</view>
		<view class="px-3 py-2">
			<view class="flex align-center justify-between">
				<view style="font-size: 20rpx;margin-right: 25rpx;" class="text-gray">
					<view class="flex align-center justify-between">
						<u-icon name="rmb" size="20" color="#9299a0" class="mr-1"></u-icon>
						<view>{{ taskInfo.finishedNum }}人已赚</view>
					</view>
				</view>
				<view style="font-size: 20rpx;margin-right: 25rpx;" class="text-gray">
					<view class="flex align-center justify-between">
						<u-icon name="account" size="20" color="#9299a0" class="mr-1"></u-icon>
						<view>剩余{{ taskInfo.taskNum - taskInfo.finishedNum }}人</view>
					</view>
				</view>
				<view style="font-size: 20rpx;margin-right: 25rpx;" class="text-gray">
					<view class="flex align-center justify-between">
						<view>
							<text class="mr-1">#</text>
							编号{{ taskInfo.taskId }}
						</view>
					</view>
				</view>
				<view style="font-size: 20rpx;margin-right: 25rpx;" class="text-gray">
					<view class="flex align-center justify-between">
						<u-icon name="clock" size="20" color="#9299a0" class="mr-1"></u-icon>
						<view>{{ taskInfo.confirmDuration ?   taskInfo.confirmDuration :'24'}}小时到账</view>
					</view>
				</view>
			</view>
		</view>
		<view class="px-3">
			<u-line color="#dadada" length="700rpx" />
		</view>

		<view class="px-3 pt-1 pb-3">
			<view class="flex align-center justify-start pt-2">
				<u-avatar :src="taskInfo.avatarImage" mode="circle" :size="90"></u-avatar>
				<view>
					<view class="flex flex-column ml-2 mb-1">
						<view class="font-weight-bold ml-1 flex align-center">
							<view style="font-size: 30rpx;max-width: 330rpx;" class="nowrap">{{ taskInfo.username }}</view>
							<text>（ID:{{ taskInfo.userId }}）</text>
						</view>
						<view class="flex align-center" style="margin-top: 15rpx;">
							<view style="border-radius: 20rpx;height: 35rpx;width: 100rpx;" class="border-bai flex align-center justify-center mr-1"
							 :class="taskInfo.hasNameAuth ? 'my-icon-bgcolor-cheng' : 'my-icon-bgcolor-hui'">
								<view class="text-bai" style="margin-left: 5rpx;font-size: 20rpx;">{{ taskInfo.hasNameAuth ? '已实名' : '未实名' }}</view>
							</view>
							<view style="border-radius: 20rpx;height: 35rpx;width: 100rpx;" class="border-bai flex align-center justify-center mr-1 my-icon-bgcolor-hc"
							 v-show="taskInfo.userDeposit > 0">
								<view class="text-bai" style="margin-left: 5rpx;font-size: 20rpx;">保证金</view>
							</view>
							<view style="border-radius: 20rpx;height: 35rpx;width: 125rpx;" class="border-bai flex align-center justify-center"
							 :class="taskInfo.superTrader == 1 ? 'my-icon-bgcolor-hon' : 'my-icon-bgcolor-hui'">
								<view style="margin-bottom: 8rpx;">
									<u-icon name="integral" color="#FFFFFF" size="17"></u-icon>
								</view>
								<text class="text-bai" style="margin-left: 5rpx;font-size: 20rpx;">超级商人</text>
							</view>
						</view>
					</view>
				</view>
				<view class="flex justify-end flex-1 mb-1" @click="clickChat(taskInfo.userId)">
					<view class="flex align-center flex-column">
						<u-icon name="chat" color="#9299a0" size="48"></u-icon>
						<view class="text-gray" style="font-size: 25rpx;">联系商家</view>
					</view>
				</view>
			</view>
			<view class="flex align-center justify-between mt-3 mb-1" v-if="taskInfo.taskUrl">
				<view class="font-s-3">任务链接</view>
				<view class="flex align-center">
					<view @click="openLink(taskInfo.taskUrl)" style="border-radius: 30rpx; width: 150rpx;height: 48rpx;" class="bg-main flex align-center justify-center mr-2">
						<view style="font-size: 26rpx;">打开链接</view>
					</view>
					<view @click="copyLink(taskInfo.taskUrl)" style="border-radius: 30rpx; width: 150rpx;height: 48rpx;" class="bg-main flex align-center justify-center">
						<view style="font-size: 26rpx;">复制链接</view>
					</view>
				</view>
			</view>
		</view>
		<u-gap height="19" bg-color="#f5f4f4"></u-gap>
		<view class="p-3">
			<view class="mb-2">任务步骤</view>
			<block v-for="(item, index) in steps" :key="index">
				<view class="my-3">
					<view class="flex align-center justify-between">
						<view class="flex align-center">
							<text style="border-radius: 100%;width: 35rpx;height: 35rpx;" class="bg-main mr-1 flex align-center justify-center">{{item.stepOrder}}</text>
							<view class="font-weight-bold">
								步骤{{ $U.numberToHz(item.stepOrder) }}</view>
							<view class="font-weight-bold">（{{ item.stepMode == 1 ? '图文说明' : '收集截图' }}）</view>
						</view>
					</view>
					<view class="mt-2" :class="item.stepImage.length > 0 ? '' : 'mb-3'" style="font-size: 30rpx;max-width: 640rpx;">{{ item.stepContent }}</view>
					<view class="my-2" style="margin-left: -11rpx;" v-if="item.stepImage.length > 0">
						<template v-if="showType">
							<view class="mx-1 flex align-center">
								<view class="mr-3">
									<image :src="item.stepImage" mode="aspectFill" style="width: 200rpx;height: 200rpx;" @click.stop="previewImage(item.stepImage)"></image>
								</view>
								<view v-if="item.stepMode == 2">
									<u-upload @on-success="upImgCallBack" @on-choose-complete="uploadImg(index)" :max-count="1" name="file"
									 del-bg-color="#dcdcdc" :auto-upload="true" :action="actionUrl" :header="header" :multiple="false" upload-text="上传截图凭证">
									</u-upload>
								</view>
							</view>
						</template>
						<template v-else>
							<view class="mx-1">
								<image :src="item.stepImage" mode="aspectFill" style="width: 200rpx;height: 200rpx;" @click.stop="previewImage(item.stepImage)"></image>
							</view>
						</template>
					</view>
				</view>
			</block>
		</view>

		<u-gap height="19" bg-color="#f5f4f4"></u-gap>
		<template v-if="taskInfo.extraData">
			<view class="pt-1 px-3 pb-4">
				<view class="mt-2">
					<view class="flex align-center">
						<view style="font-size: 30rpx;">提交数据</view>
						<text class="text-gray ml-2" style="font-size: 27rpx;">任务完成后需要提交的信息</text>
					</view>
					<view class="mt-3">
						<view style="background-color: #EEEEEE;height: 70rpx;border-radius: 15rpx;" class="flex align-center" v-show="!showType">
							<text class="text-gray ml-1" style="font-size: 27rpx;">{{ taskInfo.extraData}}</text>
						</view>
						<view style="background-color: #EEEEEE;border-radius: 15rpx;height: 70rpx;width: 100%;" v-if="showType">
							<input type="text" style="font-size: 27rpx;height: 70rpx;width: 100%;" class="ml-1" :placeholder="taskInfo.extraData ? taskInfo.extraData : '无需提交额外数据'"
							 v-model="commitTask.extraData" />
						</view>
					</view>
				</view>
			</view>
			<u-gap height="19" bg-color="#f5f4f4"></u-gap>
		</template>
	</view>
</template>

<script>
	import h5Copy from '../../js_sdk/junyi-h5-copy/junyi-h5-copy/junyi-h5-copy.js';
	import mTags from '@/components/m-tags/m-tags.vue';
	export default {
		components: {
			mTags
		},
		props: {
			taskInfo: {
				type: Object
			},
			steps: {
				type: Array
			},
			showType: {
				type: Number,
				default: 0
			},
			orderId: {
				type: [Number, String],
				default: 0
			}
		},
		data() {
			return {
				actionUrl: this.$C.apiUrl + '/system/uploadFile',
				header: {
					Authorization: this.$store.state.user.accessToken
				},
				upId: '',
				commitTask: {
					extraData: null,
					orderId: this.orderId,
					vouchers: []
				},
			};
		},
		methods: {
			uploadImg(index) {
				return (this.upId = index);
			},
			upImgCallBack(data) {
				let upInfo = JSON.parse(data);
				let voucher = {
					voucherId: this.steps[this.upId].voucherId,
					voucherImage: upInfo.data
				};
				this.commitTask.vouchers.push(voucher);
				this.upId = '';
				this.$U.outputMsg('上传成功');
				return true;
			},
			getTaskTypeName(index) {
				return this.$U.getTaskTypeName(index);
			},
			openLink(data) {
				if (!this.$u.test.url(data)) {
					return this.$U.outputMsg('内容不是一个合法的链接，请复制该内容查看');
				} else {
					return window.location.href = data;
				}
			},
			previewImage(imgUrl) {
				uni.previewImage({
					urls: [imgUrl],
				})
			},
			clickChat(userId) {
				uni.navigateTo({
					url: '../../pages/talk/index?chatId='+userId
				});
			},
			copyLink(data) {
				// #ifndef H5
				uni.setClipboardData({
					data: data
				});
				// #endif
				// #ifdef H5
				const result = h5Copy(data);
				if (result === false) {
					return this.$U.outputMsg('当前浏览器不支持');
				} else {
					return this.$U.outputMsg('复制链接成功');
				}
				// #endif
			}
		}
	}
</script>

<style>

</style>
