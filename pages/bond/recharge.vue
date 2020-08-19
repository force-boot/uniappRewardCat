<template>
  <view class="u-recharge u-bg-gray">
    <view class="bg-bai p-3">
      <view class="font-s-3 font-weight-bold">充值金额</view>
      <view class="flex align-center py-2 font-s-5">
        <view class="mr-2 text-jin">¥</view>
        <view class="flex-1"><u-input placeholderStyle="font-size: 36rpx" :customStyle="inputStyle" v-model="moneny" type="number" placeholder="输入充值金额" /></view>
      </view>
    </view>

    <view class="bg-bai pt-3 px-3 mt-2">
      <view class="font-s-3 font-weight-bold">支付方式</view>
      <view class="pt-2"><u-line color="#ced7e0"></u-line></view>

      <u-radio-group active-color="#f8c750" style="width: 100%;" v-model="payType" @change="radioGroupChange">
        <view style="width: 100%;" v-for="(item, index) in payList" :key="index" @click="handleClick(item)">
          <view style="width: 100%;" class="flex py-2 justify-between">
            <view class="flex align-center">
              <image :src="item.icon" class="mr-2 w-8 h-8" mode="aspectFill"></image>
              <view>{{ item.name }}</view>
            </view>
            <u-radio shape="circle" :name="item.name"></u-radio>
          </view>
          <view v-if="index == 0"><u-line color="#ced7e0"></u-line></view>
        </view>
      </u-radio-group>
    </view>
    
   <view class="p-2 mt-3">
	   <button style="background-color: #f8c750;" @click="handleSubmit">确认支付</button>
   </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      moneny: '',
      inputStyle: {
        fontSize: '36rpx'
      },
      payList: [
        {
          name: '支付宝',
          icon: '../../static/image/alipay.png'
        },
        {
          name: '微信',
          icon: '../../static/image/wechat.png'
        }
      ],
      payType: '支付宝'
    };
  },
  methods: {
    handleSubmit() {
      const momeny = this.moneny;
      const type = this.payType;
      uni.showToast({
        icon: 'none',
        title: type + ':' + momeny
      })
    },
    handleClick(item) {
      this.payType = item.name;
    },
    radioGroupChange() {}
  }
};
</script>

<style lang="less">
.u-recharge {
  min-height: 100vh;
  background-color: #f0f0f0;
  &__btn {
    border-radius: 0;
    background-color: #f8c750;
  }
}
</style>
