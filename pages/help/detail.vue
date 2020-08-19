<template>
  <view class="u-help__detail">
    <view class="px-3 py-2">{{info.title}}</view>
    <view class="text-gray px-3">{{info.type}}</view>
    <view class="mx-2 pt-2 pb-1"><u-line color="#ced7e0"></u-line></view>
    <view class="mx-2 pt-2 pb-1" style="color: #f5222d;">{{info.content}}</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    };
  },
  created() {
    this.info = JSON.parse(uni.getStorageSync('help_detail'))
  },
  methods: {}
};
</script>

<style lang="less" scoped></style>
