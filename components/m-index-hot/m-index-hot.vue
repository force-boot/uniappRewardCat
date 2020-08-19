<template>
	<view>
		<view class="flex mt-1 animated fadeIn" style="flex-wrap: nowrap;">
			<block v-for="(item, index) in list" :key="index">
				<view @click="openDetail(item.taskId)" style="border-radius: 17rpx;min-height: 230rpx;min-width: 200rpx;margin-left: 18rpx;" class="box-shadow border-hui">
					<view class="flex align-center justify-center mx-3 mt-2"><u-avatar :src="item.avatarImage" mode="circle" size="mini"></u-avatar></view>
					<view class="nowrap text-center" style="font-size: 23rpx;margin:10rpx 18rpx 6rpx; 15rpx;max-width: 170rpx;">{{ item.taskName }}</view>
					<view class="flex align-center justify-center">
						<view :style="item.projectName ? 'margin-right: 3rpx;' : ''">
							<m-tags :text="getTaskTypeName(item.taskType)" ></m-tags>
						</view>
						<m-tags :text="item.projectName"></m-tags>
					</view>
					<view class="flex align-center justify-center mr-2">
						<text style="font-weight: bold;font-size: 25rpx;position: absolute;bottom: 33rpx;" class="text-jin">+3.09</text>
					</view>
				</view>
			</block>
			<view style="padding-left: 18rpx;"></view>
		</view>
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
			type: Array
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
