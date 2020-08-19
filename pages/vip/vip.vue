<template>
  <view class="u-tools bg-page">
    <view class="flex bg-bai p-2 mb-2">
      <view><image src="http://www.xuanshangcat.com/assets/img/Preloader.png" class="mr-2 w-8 h-8" mode="aspectFill"></image></view>
      <view>
        <view class="font-s-3 mb-1">追梦人</view>
        <view class="font-s-2 text-gray">当前尚未开通超级商人</view>
      </view>
    </view>

    <view class="py-2 bg-bai">
      <view class="font-s-3 font-weight-bold px-2 pb-2">超级商人</view>
      <view class="mb-2 p-2 flex u-super align-center justify-between">
        <view>超级商人特权+猫达人特权</view>
        <u-icon name="arrow-right"></u-icon>
      </view>
      <view :class="{ 'u-select': index === toolIndex }" class="p-2 flex align-center justify-between" v-for="(item, index) in toolsList" :key="index" @click="toolIndex = index">
        <view class="flex flex-1">
          <view class="font-weight-bold font-s-3 mr-2">{{ item.name }}</view>
          <u-tag :text="item.extra" mode='dark' type="error" bg-color='#fa8c16' />
        </view>
        <view class="flex">
          <view class="mr-2 text-gray" style="text-decoration: line-through;">¥{{ item.originPrice }}</view>
          <view>¥{{ item.price }}</view>
        </view>
      </view>
      
      <view class="p-2"><u-line color="#ced7e0"></u-line></view>
      <view class="text-gray text-center">《会员服务协议》</view>
    </view>

    <view class="bg-bai pt-3 px-3 mt-2">
      <view class="flex justify-between align-center">
        <view class="font-s-3 font-weight-bold">支付方式</view>
        <view class="flex justify-between align-center">
          <view>应付金额：</view>
          <view class="u-paymoney">¥{{ payMoney }}</view>
        </view>
      </view>
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

   <view class="p-2">
   	 <u-button class="mt-2 u-recharge__btn" type="warning" @click="handleSubmit">确认支付</u-button>
   </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      moneny: '',
      toolIndex: 0,
      toolsList: [
        {
          name: '1个月',
          extra: '送8刷新',
          originPrice: '98',
          price: '88'
        },
        {
          name: '3个月',
          extra: '送24刷新',
          originPrice: '294',
          price: '248'
        },
        {
          name: '12个月',
          extra: '送96刷新',
          originPrice: '1176',
          price: '888'
        }
      ],
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
  computed: {
    payMoney() {
      return Number(this.toolsList[this.toolIndex].price).toFixed(2);
    }
  },
  methods: {
    handleSubmit() {
      const momeny = this.payMoney;
      const type = this.payType;
      uni.showToast({
        icon: 'none',
        title: type + ':' + momeny
      });
    },
    handleClick(item) {
      this.payType = item.name;
    },
    radioGroupChange() {}
  }
};
</script>

<style lang="less">
.u-tools {
  min-height: 100vh;
  .u-super {
    background-color: #fef9e2;
    color: #fa8c16;
  }
  .u-paymoney {
    color: #f5222d;
  }
  .u-select {
    background-color: #fef9e2;
  }
}
</style>
