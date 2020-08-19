<template>
	<view class="wrap">
		<view class="top">
			<view class="item">
				<view class="left">收款人姓名<text class="text-hon ml-1">*</text></view>
				<input type="text" placeholder-class="line" placeholder="请填写收款人姓名" class="ml-1" v-model="data.name" />
			</view>
			<view class="item">
				<view class="left">手机号码<text class="text-hon ml-1">*</text></view>
				<input type="number" placeholder-class="line" maxlength="11" placeholder="请填写手机号" v-model="data.phone" />
			</view>
			<view class="item" @click="showSelectPayType">
				<view class="left">收款方式<text class="text-hon ml-1">*</text></view>
				<input disabled type="text" placeholder-class="line" placeholder="请选择收款方式" v-model="data.typeText" />
			</view>
			<template v-if="data.typeText == '支付宝'">
				<view class="item">
					<view class="left">支付宝账号<text class="text-hon ml-1">*</text></view>
					<input type="text" placeholder-class="line" placeholder="请填写支付宝账号" class="ml-1" v-model="data.number" />
				</view>
			</template>
			<template v-else-if="data.typeText == '银行卡'">
				<view class="item">
					<view class="left">银行类型<text class="text-hon ml-1">*</text></view>
					<input type="text" disabled placeholder-class="line" placeholder="自动识别卡号" v-model="data.bankText" />
				</view>
				<view class="item">
					<view class="left">银行卡号<text class="text-hon ml-1">*</text></view>
					<input type="number" placeholder-class="line" style="width: 340rpx;" placeholder="请填写银行卡号" maxlength="21" @input="onInputNumber"
					 v-model="data.number" />
				</view>
				<view class="item">
					<view class="left">开户行<text class="text-hon ml-1">*</text></view>
					<input type="text" placeholder-class="line" placeholder="开户行" v-model="data.openBank" />
				</view>
				<view class="item">
					<view class="left">支行名称<text class="text-hon ml-1">*</text></view>
					<input type="text" placeholder-class="line" placeholder="支行名称" v-model="data.bankBranch" />
				</view>
				<view class="item">
					<view class="left">银行归属行<text class="text-hon ml-1">*</text></view>
					<input type="text" placeholder-class="line" placeholder="银行归属行" class="ml-1" v-model="data.bankAfBank" />
				</view>
			</template>
			<view class="p-3">
				<view class="border-bai bg-main" style="border-radius: 50rpx;margin-top: 35rpx;" @click="submit">
					<view style="height: 90rpx;" class="flex align-center justify-center font-weight-bold">确定添加</view>
				</view>
			</view>
		</view>
		<u-select v-model="showSelect" :list="papTypeList" confirm-color="#f8c750" @confirm="confirmPay">
		</u-select>
	</view>
</template>

<script>
	import tools from './bankTools.js';
	import supBank from './bankData.js';
	export default {
		data() {
			return {
				showSelect: false,
				data: {
					typeText: '',
					bankText: '',
					number: '',
					phone: '',
					name: '',
					openBank: '',
					bankBranch: '',
					bankAfBank: ''
				},
				papTypeList: [{
						value: 0,
						label: '银行卡'
					},
					{
						value: 1,
						label: '支付宝'
					}
				],
				// 延时执行句柄
				timer: null,
			};
		},
		onLoad(e) {
			// 如果有参数 证明是编辑操作
		},
		methods: {
			setDefault() {},
			showSelectPayType() {
				this.showSelect = true;
			},
			confirmPay(e) {
				let res = e[0];
				this.data.typeText = res.label;
			},
			onInputNumber(e) {
				if (this.timer) clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					let numberInfo = tools.bankCardAttribution(this.data.number);
					if (numberInfo != 'error') {
						if (numberInfo.cardType != 'DC') {
							this.$U.outputMsg('仅支持储蓄卡添加，请检查输入是否有误');
							return this.data.number = '';
						}
						if (supBank.indexOf(numberInfo.bankCode) == '-1') {
							this.$U.outputMsg('暂不支持' + numberInfo.bankName + ',请切换其他卡添加');
							return this.data.number = '';
						}
						this.data.bankText = numberInfo.bankName;
					} else {
						if (this.data.bankText != '') this.data.bankText = '';
					}
					this.timer = null;
				}, 300);
			},
			submit() {
				if (!this.data.name) return this.$U.outputMsg('请输入收款人姓名');
				if (!this.$u.test.mobile(this.data.phone)) return this.$U.outputMsg('请输入正确的手机号码');
				if (!this.data.typeText) return this.$U.outputMsg('请选择收款方式');
				uni.setStorageSync('testAddPay', this.data);
				this.$U.outputMsg('添加收款方式成功');
				setTimeout(() => {
					uni.redirectTo({
						url: './payment'
					});
				}, 500);
			}
		}
	};
</script>

<style lang="scss" scoped>
	/deep/ .line {
		color: $u-light-color;
		font-size: 28rpx;
	}

	.wrap {
		background-color: #f2f2f2;

		.top {
			background-color: #ffffff;
			border-top: solid 2rpx $u-border-color;
			padding: 22rpx;

			.item {
				display: flex;
				font-size: 32rpx;
				line-height: 100rpx;
				align-items: center;
				border-bottom: solid 2rpx $u-border-color;

				.left {
					width: 180rpx;
				}

				input {
					text-align: left;
				}
			}

			.address {
				padding: 20rpx 0;

				textarea {
					// width: 100%;
					height: 150rpx;
					background-color: #f7f7f7;
					line-height: 60rpx;
					margin: 40rpx auto;
					padding: 20rpx;
				}
			}

			.site-clipboard {
				padding-right: 40rpx;

				textarea {
					// width: 100%;
					height: 150rpx;
					background-color: #f7f7f7;
					line-height: 60rpx;
					margin: 40rpx auto;
					padding: 20rpx;
				}

				.clipboard {
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 26rpx;
					color: $u-tips-color;
					height: 80rpx;

					.icon {
						margin-top: 6rpx;
						margin-left: 10rpx;
					}
				}
			}
		}

		.bottom {
			margin-top: 20rpx;
			padding: 40rpx;
			padding-right: 0;
			background-color: #ffffff;
			font-size: 28rpx;

			.tag {
				display: flex;

				.left {
					width: 160rpx;
				}

				.right {
					display: flex;
					flex-wrap: wrap;

					.tags {
						width: 140rpx;
						padding: 16rpx 8rpx;
						border: solid 2rpx $u-border-color;
						text-align: center;
						border-radius: 50rpx;
						margin: 0 10rpx 20rpx;
						display: flex;
						font-size: 28rpx;
						align-items: center;
						justify-content: center;
						color: $u-content-color;
						line-height: 1;
					}

					.plus {
						//padding: 10rpx 0;
					}
				}
			}

			.default {
				margin-top: 50rpx;
				display: flex;
				justify-content: space-between;
				border-bottom: solid 2rpx $u-border-color;
				line-height: 64rpx;

				.tips {
					font-size: 24rpx;
				}

				.right {}
			}
		}
	}
</style>
