<template>
	<view class="u-tools bg-page">
		<view class="u-tools__tip p-2">
      刷新后任务位置提升到首页任务区域顶部，可获取超高流量曝光！
    </view>
    <view class="flex bg-bai p-2 mb-2">
      <view>
        <image src="http://www.xuanshangcat.com/assets/img/Preloader.png" class="mr-2 w-8 h-8" mode="aspectFill"></image>
      </view>
      <view>
        <view class="font-s-3 mb-1">悬赏猫刷新功能</view>
        <view class="font-s-2 text-gray">刷新包套餐购买</view>
      </view>
    </view>
    
    <view class="py-2 bg-bai">
      <view :class="{'u-select': index === toolIndex}" class="p-2 flex align-center justify-between" v-for="(item, index) in toolsList" :key="index" @click="toolIndex = index">
        <view class="flex flex-1">
          <view style="width: 200rpx;">{{item.name}}</view>
          <view class="text-gray">{{item.signle}}</view>
        </view>
        <view class="flex">
          <view class="mr-2 text-gray" style="text-decoration: line-through;">¥{{item.originPrice}}</view>
          <view>¥{{item.price}}</view>
        </view>
      </view>
    </view>
    
    <view class="bg-bai pt-3 px-3 mt-2">
      <view class="flex justify-between align-center">
        <view class="font-s-3 font-weight-bold">支付方式</view>
        <view class="flex justify-between align-center">
          <view>应付金额：</view>
          <view class="u-paymoney">¥{{payMoney}}</view>
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
            name: '600次',
            signle: '0.8元/次',
            originPrice: '1800',
            price: '480'
          },{
            name: '300次',
            signle: '0.9元/次',
            originPrice: '900',
            price: '270'
          },{
            name: '100次',
            signle: '0.95元/次',
            originPrice: '300',
            price: '95'
          },{
            name: '50次',
            signle: '1.0元/次',
            originPrice: '150',
            price: '50'
          },{
            name: '20次',
            signle: '1.25元/次',
            originPrice: '60',
            price: '25'
          },{
            name: '10次',
            signle: '1.5元/次',
            originPrice: '30',
            price: '15'
          },{
            name: '5次',
            signle: '2.0元/次',
            originPrice: '15',
            price: '10'
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
        return Number(this.toolsList[this.toolIndex].price).toFixed(2)
      }
    },
    methods: {
      handleSubmit() {
        const momeny = this.payMoney;
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
	}
</script>

<style lang="less">
.u-tools {
  min-height: 100vh;
  .u-paymoney {
    color: #f5222d;
  }
  .u-select {
    background-color: #fef9e2;
  }
  &__tip {
    background-color: #fef9e2;
    color: #fa8c16;
  }
}
</style>
