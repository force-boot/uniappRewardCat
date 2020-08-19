<template>
	<view>
		<view class="p-2">
			<view class="flex align-center justify-between pt-1 pb-3" style="border-bottom: #F3F4F6 1rpx solid;">
				<view>真实姓名</view>
				<view><input type="text" value="" maxlength="18" placeholder="请输入真实姓名" style="font-size: 26rpx;" v-model="name" /></view>
			</view>
			<view class="flex align-center justify-between pt-3 pb-1">
				<view>身份证号码</view>
				<view><input type="text" value="" maxlength="18" placeholder="请输入身份证号码" style="font-size: 26rpx;" v-model="idNumber" /></view>
			</view>
		</view>
		<u-gap height="20" bg-color="#f5f4f4"></u-gap>
		<view class="p-2">
			<view class="pt-1 flex flex-column">
				<text class="font-s-3 mb-2">请拍摄以下证件照片</text>
				<text class="text-gray" style="font-size: 27rpx;">请上传真实的身份证照片，确保照片清晰可见，否则无法通过审核。</text>
			</view>
			<view class="grace-idcard-text">身份证照片 ( 正面 )</view>
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn" @tap="selectImg1">
					<view class="img">
						<image src="../../static/image/camera.png" mode="widthFix" />
					</view>
					<view class="text">拍摄或选择照片</view>
				</view>
				<view class="grace-idcard-preview">
					<image :src="imgs[0].url" @tap="previewImg1" mode="widthFix"></image>
				</view>
			</view>
			<view class="grace-idcard-text">身份证照片 ( 背面 )</view>
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn" @tap="selectImg2">
					<view class="img">
						<image src="../../static/image/camera.png" mode="widthFix" />
					</view>
					<view class="text">拍摄或选择照片</view>
				</view>
				<view class="grace-idcard-preview">
					<image :src="imgs[1].url" @tap="previewImg2" mode="widthFix" />
				</view>
			</view>
			<view class="grace-idcard-text">身份证照片 ( 手持 )</view>
			<view class="grace-idcard-items">
				<view class="grace-idcard-uper-btn" @tap="selectImg3">
					<view class="img">
						<image src="../../static/image/camera.png" mode="widthFix" />
					</view>
					<view class="text">拍摄或选择照片</view>
				</view>
				<view class="grace-idcard-preview">
					<image :src="imgs[2].url" @tap="previewImg3" mode="widthFix" />
				</view>
			</view>
			<view style="margin-top:38rpx;"><button style="background-color: #f8c750;" @click="submit">提交认证</button></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				idNumber: '',
				imgs: [{
						url: '../../static/image/idcard1.png'
					},
					{
						url: '../../static/image/idcard2.png'
					},
					{
						url: '../../static/image/idcard3.jpg'
					}
				]
			};
		},
		methods: {
			selectImg1() {
				uni.chooseImage({
					count: 1,
					success: res => {
						this.imgs[0].url = res.tempFilePaths[0];
					}
				});
			},
			selectImg2() {
				uni.chooseImage({
					count: 1,
					success: res => {
						this.imgs[1].url = res.tempFilePaths[0];
					}
				});
			},
			selectImg3() {
				uni.chooseImage({
					count: 1,
					success: res => {
						this.imgs[2].url = res.tempFilePaths[0];
					}
				});
			},
			previewImg1() {
				uni.previewImage({
					urls: [this.imgs[0].url]
				});
			},
			previewImg2() {
				uni.previewImage({
					urls: [this.imgs[1].url]
				});
			},
			previewImg3() {
				uni.previewImage({
					urls: [this.imgs[2].url]
				});
			},
			submit() {
				if (this.name.length < 1) {
					uni.showToast({
						title: '请输入真实姓名',
						icon: 'none'
					});
					return;
				}
				if (this.idNumber.length != 18) {
					uni.showToast({
						title: '请输入正确的身份证号码',
						icon: 'none'
					});
					return;
				}
				if (this.idCard1 == '../../static/image/idcard1.png' || this.idCard2 == '../../static/image/idcard2.png') {
					uni.showToast({
						title: '请选择身份证照片',
						icon: 'none'
					});
					return;
				}
				if (this.idCard3 == '../../static/image/idcard3.jpg') {
					uni.showToast({
						title: '请选择手持身份证照片',
						icon: 'none'
					});
					return;
				}
				// 因底层限制一次上传一个
				uni.showLoading({
					title: '上传中'
				});
				for (let i = 0; i <= this.imgs.length - 1; i++) {
					var uploadTask2 = uni.uploadFile({
						url: this.$C.apiUrl + '/system/uploadFile',
						filePath: this.imgs[i].url,
						fileType: 'image',
						header: {
							Authorization: this.$store.state.user.accessToken
						},
						name: 'file',
						success: uploadFileRes => {
							this.imgs[i].url = JSON.parse(uploadFileRes.data);
						}
					});
				}
				uni.hideLoading();
				this.$u.post('user/nameAuth', {
					realName: this.name,
					idNumber: this.idNumber,
					positiveImage: this.imgs[0].url,
					negativeImage: this.imgs[1].url,
					holdingImage: this.imgs[2].url,
				}).then(res => {
					if (res.data) {
						return this.$U.outputMsg('提交实名认证成功，请等待审核');
					} else {
						return this.$U.outputMsg(res.message);
					}
				});
			}
		}
	};
</script>

<style>
	.grace-idcard-text {
		line-height: 2em;
		margin-top: 30rpx;
	}

	.grace-idcard-items {
		background: #ffffff;
		padding: 30rpx 0;
		display: flex;
		margin: 30rpx 0;
		border-radius: 10rpx;
		align-items: flex-start;
	}

	.grace-idcard-uper-btn {
		width: 276rpx;
		margin: 0 60rpx;
		background: #f1f1f1;
		padding-bottom: 10rpx;
		border-radius: 10rpx;
		text-align: center;
	}

	.grace-idcard-uper-btn .img {
		width: 100rpx;
		height: 100rpx;
		margin: 0 auto;
		margin-top: 30rpx;
	}

	.grace-idcard-uper-btn .img image {
		width: 100rpx;
		height: 100rpx;
	}

	.grace-idcard-uper-btn .text {
		width: 100%;
		margin-top: 10rpx;
		text-align: center;
		line-height: 2em;
	}

	.grace-idcard-preview {
		width: 50%;
		margin: 0 30rpx;
	}

	.grace-idcard-preview image {
		width: 100%;
	}
</style>
