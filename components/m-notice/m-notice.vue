<template>
	<view>
		<uni-notice-bar single showGetMore :text="text" :moreText="moreText" :color="color" :moreColor="moreColor" :backgroundColor="'#f5edcd'" class="h-7 mt-1"
		 :scrollable="false" v-show="isShow" @click="clickNotice">
		</uni-notice-bar>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue';
	export default {
		components: {
			uniNoticeBar,
		},
		props: {
			text: {
				type: String,
				default: '免费领取会员,做任务多赚20%'
			},
			moreText:{
				type:String,
				default:'去领取'
			},
			isShow:{
				type:Boolean,
				default:true
			},
			color:{
				type:String,
				default:'#333333'
			},
			moreColor:{
				type:String,
				default:'#ff6e07'
			}
		},
		methods: {
			clickNotice() {
				this.$emit('clickNotice');
			},
		}
	}
</script>

<style>

</style>
