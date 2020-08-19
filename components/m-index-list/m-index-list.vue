<template>
	<view class="animated fadeIn">
		<block v-for="(item, index) in list" :key="index">
			<view class="px-2 flex pt-2" @click="openDetail(item.taskId)">
				<view class="flex align-center justify-start"><u-avatar size="95" :src="item.avatarImage" mode="circle"></u-avatar></view>
				<view class="flex flex-column justify-center">
					<view class="flex align-center" style="font-size: 28rpx;justify-content: space-between;margin-left: 26rpx;">
						<text class="nowrap" style="width: 360rpx;">{{ item.taskName }}</text>
						<view class="text-jin font-weight-bold" style="position: absolute;right: 30rpx;">+{{ item.rewardPrice / 100 }}</view>
					</view>
					<view class="flex align-center" style="margin: 6rpx 0rpx 6rpx 25rpx">
						<m-tags size="18" :text="getTaskTypeName(item.taskType)" class="mr-1"></m-tags>
						<m-tags size="18" :text="item.projectName"></m-tags>
					</view>
					<view class="flex align-center" style="font-size: 35rpx;margin-left: 27rpx;">
						<view style="font-size: 20rpx;margin-right: 25rpx;" class="text-gray">
							<view class="flex align-center justify-between">
								<u-icon name="rmb" size="20" color="#9299a0" style="margin-right: 4rpx;"></u-icon>
								<view>{{ item.finishedNum }}人已赚</view>
							</view>
						</view>
						<view style="font-size: 20rpx;" class="text-gray">
							<view class="flex align-center justify-between">
								<u-icon name="account" size="20" color="#9299a0" class="mr-1"></u-icon>
								<view class="nowrap">剩余{{ item.taskNum - item.finishedNum }}人</view>
							</view>
						</view>
						<view style="position: absolute;right: 33rpx;">
							<u-icon name="more-dot-fill" size="23" color="#9299a0"></u-icon>
						</view>
					</view>
				</view>
			</view>
			<!-- 分割线 -->
			<view class="pt-2 pb-1"><u-line color="#ced7e0"></u-line></view>
		</block>
	</view>
</template>

<script>
import mTags from '@/components/m-tags/m-tags.vue';
export default {
	components: {
		mTags
	},
	props: {
		list: {
			type: [Array,Object]
		}
	},
	methods: {
		openDetail(taskId) {
			uni.navigateTo({
				url: '../../pages/taskDetail/taskDetail?id='+taskId
			});
		},
		getTaskTypeName(index) {
			return this.$U.getTaskTypeName(index);
		}
	}
};
</script>

<style></style>
