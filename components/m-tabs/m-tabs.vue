<template>
	<view>
		<u-tabs :list="list" :current="current" @change="tabsChange" inactive-color="gray" active-color="#f8c750" :gutter="gutter"
		 :bold="false" :active-item-style="activeStyle" :font-size="fontSize"></u-tabs>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array
			},
			current: {
				type: [Number,String]
			},
			gutter: {
				type: Number,
				default: 20
			},
			activeStyle: {
				type: Object
			},
			fontSize: {
				type: Number,
				default:25
			}
		},
		methods:{
			tabsChange(index){
				this.$emit('change',index);
			}
		}
	}
</script>

<style>
	.m-tabs-fixed {
		position: fixed;
		width: 100%;
		height: 80rpx;
		z-index: 10;
	}
</style>
