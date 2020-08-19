<template>
	<view>
		<view style="margin-bottom: -10rpx;">
			<uni-notice-bar :showGetMore="false" text="温馨提示:请正确选择发布任务类型,分类选择错误会导致发布审核不通过" color="#333"
			 :backgroundColor="'#f5edcd'" :scrollable="false">
			</uni-notice-bar>
		</view>
		<uni-list>
			<block v-for="(item,index) in typeList" :key="index">
				<template v-if="item.desc">
					<uni-list-item @click="clickType(item.id)">
						<template v-slot:left="">
							<view class="flex flex-column">
								<view class="mb-1">
									<text style="font-size: 35rpx;" class="text-jin">{{item.name}}</text>
								</view>
								<view>
									<text class="text-gray" style="font-size: 28rpx;">{{item.desc}}</text>
								</view>
							</view>
						</template>
					</uni-list-item>
				</template>
			</block>
		</uni-list>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
	export default {
		components: {
			uniNoticeBar
		},
		data() {
			return {
				typeList: this.$C.indexClassTab
			}
		},
		methods: {
			clickType(id) {
				this.navigateTo({
					url: '../addTask/addTask2?id=' + id,
				});
			}
		}
	}
</script>

<style>

</style>
