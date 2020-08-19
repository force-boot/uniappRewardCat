<template>
	<view class="u-recharge u-bg-gray">
		<view class="bg-bai p-3">
			<view class="flex align-center justify-between">
				<view class="font-s-3 font-weight-bold">提现金额</view>
				<view class="text-gray" style="font-size: 27rpx;">当前可提现余额：{{userInfo.userBalance ? userInfo.userBalance : '0.00'}}</view>
			</view>
			<view class="flex align-center py-2 font-s-5">
				<view class="mr-2 text-jin">¥</view>
				<view class="flex-1">
					<u-input placeholderStyle="font-size: 36rpx" :customStyle="inputStyle" v-model="moneny" type="number" placeholder="输入提现金额" />
				</view>
			</view>
			<view class="pt-1">
				<u-line color="#ced7e0"></u-line>
			</view>
			<view class="flex align-center justify-between mt-2">
				<view class="text-gray" style="font-size: 27rpx;">
					实际到账：￥0.00
				</view>
				<view class="text-gray" style="font-size: 27rpx;">
					手续费：￥0.00
				</view>
				<view class="text-jin">
					全部提现
				</view>
			</view>
		</view>

		<view class="bg-bai pt-3 px-3 mt-2">
			<view class="flex align-center justify-between">
				<view class="font-s-3 font-weight-bold">收款账户</view>
				<view class="text-jin" @click="navigateTo({
					url:'payment'
				})" style="font-size: 27rpx;">
					添加收款账户
				</view>
			</view>
			<view class="pt-2">
				<u-line color="#ced7e0"></u-line>
			</view>
			<u-radio-group active-color="#f8c750" style="width: 100%;" v-model="accountType">
				<view style="width: 100%;">
					<block v-if="account.length > 0"  v-for="(item,index) in account" :key="index">
						<view style="width: 100%;" class="flex py-2 justify-between" @click="handleClick(index)">
							<view class="flex flex-column">
								<template v-if="item.typeText == '支付宝'">
									<view>支付宝收款账户 {{item.number}}</view>
								</template>
								<template v-else>
									<view>{{item.bankText}} {{item.number}}</view>
								</template>
								<view class="flex align-center justify-between mt-1">
									<view class="text-gray mr-2">收款人：{{item.name}}</view>
									<view class="text-gray">联系电话：{{$U.hiddenPhone(item.phone)}}</view>
								</view>
							</view>
							<u-radio shape="circle" :name="item.typeText"></u-radio>
						</view>
					</block>
					<view>
						<u-line color="#ced7e0"></u-line>
					</view>
				</view>
			</u-radio-group>
		</view>


		<view class="bg-bai pt-3 px-3 mt-2">
			<view class="font-s-3 font-weight-bold">提现规则</view>
			<view class="pt-2">
				<u-line color="#ced7e0"></u-line>
			</view>

		</view>

		<view class="p-3">
			<view class="border-bai bg-main" style="border-radius: 50rpx;margin-top: 35rpx;" @click="handleSubmit">
				<view style="height: 90rpx;" class="flex align-center justify-center font-weight-bold">确定提现</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				moneny: '',
				userInfo: [],
				accountType:'',
				inputStyle: {
					fontSize: '36rpx'
				},
				account: [{
					number: '621938324932',
					phone: '15084859818',
					name: '刘德华',
					bankText: '中国建设银行',
					typeText: '银行卡'
				},
				{
					number: 'alipay0888@163.com',
					phone: '15084859818',
					name: '刘德华',
					bankText: '',
					typeText: '支付宝'
				}
				]
			};
		},
		onLoad(e) {
			if (e.userInfo) {
				this.userInfo = e.userInfo;
			} else {
				this.getUserInfo();
			}
		},
		methods: {
			handleSubmit() {
				uni.navigateTo({
					url: 'payment'
				});
			},
			handleClick(index){
				this.accountType= this.account[index].typeText;
			},
			getUserInfo() {
				this.$u
					.get(
						'user/getUser', {}, {
							Authorization: this.$store.state.user.accessToken
						}
					)
					.then(res => {
						this.userInfo = res.data;
					});
			}
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
