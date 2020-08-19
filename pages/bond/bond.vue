<template>
  <view class="u-bond">
    <view class="my-icon-bgcolor-cheng text-bai p-3 my-2 u-bond__card">
      <view>保证金余额度</view>
      <view>
        <view class="flex justify-between align-center">
          <view class="font-s-6 font-weight-bold">100</view>
          <view class="flex align-center justify-between">
            <view @click="navigateTo({
					url:'recharge'
				})" class="mr-2 px-2 u-bond__btn" size="mini" plain>充值保证金</view>
            <view class="px-2 u-bond__btn" size="mini" plain>申请退还</view>
          </view>
        </view>
      </view>
    </view>
    <view class="font-s-4 mb-2 font-weight-bold">保证金说明</view>
    <view class="mb-3 font-s-3">1、阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰</view>
    <view class="mb-3 font-s-3">2、阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰</view>
    <view class="mb-3 font-s-3">3、阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰</view>
    <view class="mb-3 font-s-3">4、阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰</view>
    <view class="mb-3 font-s-3">5、阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰</view>
    <view class="mb-3 font-s-3">6、阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰阿斯顿发顺丰</view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
  .u-bond {
    width: 700rpx;
    margin: 0 auto;
    color: #333;
    &__card {
      border-radius: 20rpx;
    }
    &__btn {
      border-radius: 20rpx;
      background: #fff;
      color: #fa8c16;
      padding-top: 5rpx;
      padding-bottom: 5rpx;
    }
  }
</style>
