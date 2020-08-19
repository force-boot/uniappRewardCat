<template>
	<view>
		<m-notice-list v-for="(item,index) in list" :key="index" :data="item"></m-notice-list>
	</view>
</template>

<script>
	import mNoticeList from '../../components/m-notice-list/m-notice-list.vue';
	export default {
		components: {
			mNoticeList
		},
		data() {
			return {
				list: [{
					username:'你女友',
					content:'安徽考勤打卡去问驱蚊器可谓空前我看情况',
					date:'2019-09-21',
					img:'https://img.jinsom.cn/avatar/3.png'
				},
				{
					username:'隔壁老王',
					content:'在吗？',
					date:'2020-05-21',
					img:'https://img.jinsom.cn/avatar/8.png'
				},
				{
					username:'张三',
					content:'出来吃个饭？',
					date:'2020-05-22',
					img:'https://img.jinsom.cn/avatar/9.png'
				},
				{
					username:'李四',
					content:'这个怎么弄呢？',
					date:'2020-05-19',
					img:'https://img.jinsom.cn/avatar/10.png'
				},
				{
					username:'麻花疼',
					content:'喀什你打开能看出',
					date:'2020-04-21',
					img:'https://img.jinsom.cn/avatar/4.png'
				}
				],
			}
		},
		// 监听下拉刷新
		onPullDownRefresh() {
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 800)
		},
		methods: {

		}
	}
</script>

<style>

</style>
