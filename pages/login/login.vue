<template>
	<view>
		<!-- LOGO -->
		<view class="flex align-center justify-center" style="padding: 80rpx 50rpx 70rpx 50rpx;">
			<image src="http://www.xuanshangcat.com/assets/img/Preloader.png" mode="aspectFit" style="width: 120rpx;height: 120rpx;"></image>
		</view>
		<view class="px-3">
			<!-- 输入框 -->
			<view v-show="isReg" class="border-bai mb-3" style="background-color: #EEEEEE;border-radius: 40rpx">
				<view class="flex align-center">
					<u-icon name="account" color="#f8c750" size="35" class="ml-2 mr-1"></u-icon>
					<input type="text" class="w-100" value="" placeholder="请输入昵称" style="caret-color:#f8c750;height: 85rpx;" maxlength="12"
					 v-model="username" @input="checkInputLen" />
				</view>
			</view>

			<view class="border-bai mb-3" style="background-color: #EEEEEE;border-radius: 40rpx">
				<view class="flex align-center">
					<u-icon name="phone" color="#f8c750" size="35" class="ml-2 mr-1"></u-icon>
					<input type="number" value="" placeholder="请输入手机号" class="w-100" style="caret-color:#f8c750;height: 85rpx;"
					 maxlength="11" v-model="phone" @input="checkInputLen" />
				</view>
			</view>

			<view v-show="!isCode || isReg" class="border-bai" style="background-color: #EEEEEE;border-radius: 40rpx">
				<view class="flex align-center">
					<u-icon name="lock" color="#f8c750" size="35" class="ml-2 mr-1"></u-icon>
					<input type="text" value="" placeholder="请输入密码" class="w-100" style="caret-color:#f8c750;height: 85rpx;" password
					 maxlength="25" v-model="password" @input="checkInputLen" />
				</view>
			</view>

			<view v-show="isReg" class="border-bai mt-3" style="background-color: #EEEEEE;border-radius: 40rpx">
				<view class="flex align-center">
					<u-icon name="gift" color="#f8c750" size="35" class="ml-2 mr-1"></u-icon>
					<input type="text" focus value="" class="w-100" placeholder="邀请码,没有可留空" style="caret-color:#f8c750;height: 85rpx;"
					 maxlength="11" v-model="invCode" />
				</view>
			</view>

			<view v-show="isCode || isReg" class="border-bai" :class="isReg ? 'mt-3' : ''" style="background-color: #EEEEEE;border-radius: 40rpx">
				<view class="flex align-center">
					<u-icon name="checkmark" color="#f8c750" size="35" class="ml-2 mr-1"></u-icon>
					<input type="number" value="" class="w-100" placeholder="请输入验证码" style="caret-color:#f8c750;height: 85rpx;"
					 :maxlength="codeLen" v-model="code" @input="checkInputLen" />
					<view style="position: absolute;right: 55rpx;" class="text-jin" @click="getCode">
						{{getCodeTime === 0 ? '获取验证码' : getCodeTime+' 秒'}}
					</view>
				</view>
			</view>

			<!-- 登陆按钮 -->
			<view class="border-bai" :class="disabled ? 'bg-main' : 'btn-disabled'" style="border-radius: 50rpx;margin-top: 75rpx;"
			 @click="submit">
				<view style="height: 90rpx;" class="flex align-center justify-center font-weight-bold">
					{{isReg ? '立即注册' : '立即登陆'}}
				</view>
			</view>

			<!-- other -->
			<view class="flex align-center justify-center pt-5 pb-3">
				<template v-if="!isCode && !isReg">
					<view @click="clickLoginType">
						验证码登陆
					</view>
				</template>
				<template v-else-if="isCode && !isReg">
					<view @click="clickLoginType">
						密码登陆
					</view>
				</template>
				<view class="mx-2 text-gray" v-show="!isReg">|</view>
				<template v-if="!isReg">
					<view @click="clickReg">
						注册账号
					</view>
				</template>
				<template v-else>
					<view @click="clickReg">
						已有账号? 去登陆
					</view>
				</template>
			</view>
			<!-- 用户协议 -->
			<view style="position: absolute;bottom: 50rpx;left: 100rpx;">
				<view class="flex align-center justify-center">
					<u-checkbox-group>
						<u-checkbox icon-size="15" active-color="#f8c750" shape="circle" v-model="checked"></u-checkbox>
					</u-checkbox-group>
					<text class="ml-1">我已阅读并同意</text>
					<view style="color: #2B85E4;">《xxx用户协议和隐私政策》</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 勾选协议
				checked: true,
				// 禁用提交
				disabled: false,
				// 是否验证码登陆
				isCode: false,
				// 是否注册
				isReg: false,
				// 获取验证码间隔
				getCodeTime: 0,
				// 客户端推送ID
				cid: '',
				// 设备唯一ID
				did: '',
				// 手机号
				phone: '',
				// 密码
				password: '',
				// 验证码
				code: '',
				// 邀请码
				invCode: '',
				// 昵称
				username: '',
				// 验证码长度
				codeLen: 4,
			}
		},
		onReady() {
			// #ifdef APP-PLUS
			// 获取客户端ID
			this.cid = this.$U.getClientId();
			// 获取设备唯一ID
			plus.device.getInfo({
				success: e => {
					this.did = e.uuid;
				},
			});
			// #endif
			// #ifdef H5
			// 获取客户端ID
			this.cid = 'h5_' + this.$u.guid(18);
			// 获取设备唯一ID
			this.did = 'h5_' + this.$u.guid(18);
			// #endif
		},
		// 监听返回
		onBackPress(options) {
			if (options.from === 'navigateBack') {
				return false;
			}
			uni.switchTab({
				url: '../index/index'
			});
			return true;
		},
		methods: {
			// 点击切换登陆类型
			clickLoginType() {
				this.clearInput();
				this.isCode = !this.isCode;
			},
			// 点击注册
			clickReg() {
				this.clearInput();
				this.isReg = !this.isReg;
			},
			// 验证参数长度
			checkInputLen(e = '') {
				if (!this.isReg) {
					if ((this.$U.checkPhone(this.phone) && this.password.length > 4) || (this.$U.checkPhone(this.phone) && this.code.length ==
							this
							.codeLen)) {
						return this.disabled = true;
					}
					return this.disabled = false;
				} else {
					if (!this.isEmpty(this.username) && this.password.length > 4 && this.$U.checkPhone(this.phone) && this.code.length ==
						this.codeLen) {
						return this.disabled = true;
					}
					return this.disabled = false;
				}

			},
			// 判断是否为空
			isEmpty(value) {
				return this.$u.test.isEmpty(value);
			},
			// 重置表单
			clearInput() {
				this.password = '';
				this.code = '';
				this.phone = '';
				this.invCode = '';
				this.username = '';
				this.disabled = false;
				return true;
			},
			// 获取验证码
			getCode() {
				if (this.getCodeTime > 0) return false;
				if (this.phone.length != 11) return this.$U.outputMsg('请输入11位手机号码');
				if (!this.$U.checkPhone(this.phone)) return this.$U.outputMsg('手机号码格式不正确');
				this.$u.get('user/code', {
					phone: this.phone
				}).then(res => {
					if (res.data) {
						this.getCodeTime = 60;
						let timer = setInterval(() => {
							if (this.getCodeTime >= 1) {
								this.getCodeTime--;
							} else {
								this.getCodeTime = 0;
								clearInterval(timer);
							}
						}, 1000);
						return this.$U.outputMsg(res.message);
					}
					return this.$U.outputMsg(res.message);
				});
			},
			// 提交登陆
			login() {
				let apiPath = 'user/login';
				let data = {
					phone: this.phone,
					deviceId: this.did,
					clientId: this.cid
				};
				if (this.isCode) {
					if (this.code.length == 0) return this.$U.outputMsg('请输入验证码');
					if (this.code.length != this.codeLen) return this.$U.outputMsg('验证码长度不正确');
					apiPath = 'user/codeLogin';
					Object.assign(data, {
						code: this.code
					});
				} else {
					if (this.password.length == 0) return this.$U.outputMsg('请输入密码');
					if (this.password.length < 4) return this.$U.outputMsg('密码长度不正确');
					Object.assign(data, {
						password: this.password
					});
				}
				// 请求登陆
				this.$u.post(apiPath, data).then(res => {
					if (res.data) {
						this.$U.outputMsg('登陆成功，欢迎回来');
						this.saveData(res.data);
					} else {
						this.disabled = true;
						return this.$U.outputMsg(res.message);
					}
				});
			},
			// 账号注册
			reg() {
				let data = {
					phone: this.phone,
					username: this.username,
					parentUserId: this.invCode,
					code: this.code,
					password: this.password,
					userType: 1,
					deviceId: this.did,
					clientId: this.cid
				};
				if (this.isEmpty(this.username)) return this.$U.outputMsg('请输入昵称');
				if (this.password.length == 0) return this.$U.outputMsg('请输入密码');
				if (this.password.length < 4) return this.$U.outputMsg('密码长度不正确');
				if (this.code.length == 0) return this.$U.outputMsg('请输入验证码');
				if (this.code.length != this.codeLen) return this.$U.outputMsg('验证码长度不正确');
				// 请求注册
				this.$u.post('user/create', data).then(res => {
					if (res.data) {
						this.$U.outputMsg('注册成功')
						return this.saveData(res.data);
					} else {
						this.disabled = true;
						return this.$U.outputMsg(res.message);
					}
				});
			},
			// 保存数据
			saveData(data) {
				this.$u.get('user/getUser', {}, {
					Authorization: data.accessToken
				}).then(res => {
					if (res.data) {
						let userInfo = this.$u.deepMerge(data, res.data);
						this.$store.commit('login', userInfo);
						setTimeout(() => {
							return uni.switchTab({
								url: '../index/index'
							});
						}, 800);
					} else {
						this.$U.outputMsg('获取登陆用户信息失败');
					}
				});
			},
			// 表单提交
			submit() {
				if (!this.disabled) return this.$U.outputMsg('非法提交');
				this.disabled = false;
				if (!this.checked) return this.$U.outputMsg('请勾选我已阅读并同意协议');
				if (!this.$U.checkPhone(this.phone)) return this.$U.outputMsg('请输入正确的手机号码');
				if (!this.isReg) {
					return this.login();
				} else {
					return this.reg();
				}
			}
		}
	}
</script>

<style>
</style>
