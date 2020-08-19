<template>
	<view class="animated fadeIn">
		<block v-for="(item, index) in list" :key="index">
			<view class="px-2 flex pt-1 justify-between align-center" @click="goDetail(item)">
        <view>{{item.title}}</view>
        <u-icon class="text-gray" name="arrow-right"></u-icon>
      </view>
			<!-- 分割线 -->
			<view class="mx-2 pt-2 pb-1"><u-line color="#ced7e0"></u-line></view>
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
		goDetail(item) {
      uni.setStorageSync('help_detail', JSON.stringify(item))
      uni.navigateTo({
        url: '/pages/help/detail'
      })
    }
	}
};
</script>

<style></style>
