<template>
	<view>
		<view class="px-3 pt-3">
			<view style="border-bottom: #e5e5e5 1rpx solid;" v-show="data.taskType == 1">
				<view class="flex align-center">
					<view style="font-size: 30rpx;">项目名字</view>
					<text class="mt-1 ml-1" style="color: #DD524D;">*</text>
				</view>
				<view class="my-2"><input type="text" value="" placeholder="请输入项目名字" style="font-size: 26rpx;" v-model="data.projectName" /></view>
			</view>

			<view style="border-bottom: #e5e5e5 1rpx solid;" :class="data.taskType == 1 ? 'mt-2' : ''">
				<view class="flex align-center">
					<view style="font-size: 30rpx;">任务标题</view>
					<text class="mt-1 ml-1" style="color: #DD524D;">*</text>
				</view>
				<view class="my-2"><input type="text" value="" placeholder="请输入任务标题" style="font-size: 26rpx;" v-model="data.taskName" /></view>
			</view>

			<view style="border-bottom: #e5e5e5 1rpx solid;" class="mt-2">
				<view class="flex align-center">
					<view style="font-size: 30rpx;">任务链接</view>
					<view>（选填）</view>
				</view>
				<view class="my-2"><input type="text" value="" placeholder="请输入任务链接" style="font-size: 26rpx;" v-model="data.taskUrl" /></view>
			</view>
		</view>
		<u-gap height="19" bg-color="#f5f4f4"></u-gap>
		<!-- end -->
		<view class="px-3 pt-3">
			<view class="flex align-center justify-between" style="border-bottom: #e5e5e5 1rpx solid;">
				<view class="flex align-center mb-3">
					<view style="font-size: 30rpx;">任务步骤</view>
					<text class="mt-1 ml-1" style="color: #DD524D;">*</text>
				</view>
				<view class="text-jin mb-3" @click="clickAddStep">
					<u-icon name="plus" size="28"></u-icon>
					<text class="ml-1">添加步骤</text>
				</view>
			</view>
			<block v-for="(item, index) in step" :key="index">
				<view class="pt-3" style="border-bottom: #e5e5e5 1rpx solid;">
					<view class="flex align-center justify-between">
						<view class="flex align-center">
							<view style="font-size: 30rpx;">第{{ numberTo(index) }}步</view>
							<view>（{{ item.stepMode == 1 ? '图文说明' : '收集截图' }}）</view>
						</view>
						<view class="text-gray" @click="closeImg(index)"><u-icon name="close" size="26"></u-icon></view>
					</view>
					<view class="mt-2"><input type="text" :placeholder="placeholder[item.stepMode - 1]" style="font-size: 25rpx;" v-model="item.stepContent" /></view>
					<view class="my-2" style="margin-left: -11rpx;">
						<u-upload
							@on-success="upImgCallBack"
							@on-choose-complete="uploadImg(index)"
							:max-count="1"
							name="file"
							upload-text="最多一张"
							del-bg-color="#dcdcdc"
							:auto-upload="true"
							:action="actionUrl"
							:header="header"
							:multiple="false"
							 ref="upload"
						></u-upload>
					</view>
				</view>
			</block>
		</view>

		<u-gap height="19" bg-color="#f5f4f4"></u-gap>

		<view class="pt-1 px-3 pb-3">
			<view style="border-bottom: #e5e5e5 1rpx solid;" class="mt-2">
				<view class="flex align-center">
					<view style="font-size: 30rpx;">提交数据</view>
					<view>（选填）</view>
				</view>
				<view class="my-3">
					<textarea value="" placeholder="如:提交手机号或者昵称" maxlength="30" v-model="data.extraData" style="font-size: 28rpx;height: 70rpx;" />
					<view class="flex justify-end mr-1 text-gray">{{data.extraData ? data.extraData.length :0}}/30</view>
				</view>
			</view>
		</view>
		<u-gap height="20" bg-color="#f5f4f4"></u-gap>
		<u-action-sheet :list="actionList" v-model="actionShow" :tips="tips" :cancel-btn="true" @click="addStep"></u-action-sheet>
		<view class="p-3 animated fadeIn">
			<view class="flex align-center justify-center bg-main" style="height: 83rpx;border-radius: 18rpx;" @click="clickNext">下一步</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			actionShow: false,
			actionUrl: this.$C.apiUrl + '/system/uploadFile',
			header: {
				Authorization: this.$store.state.user.accessToken
			},
			placeholder: ['请填写任务步骤图文说明,图片选填', '您可以在这里详细说明要截图哪个界面,图片必填'],
			data: {
				taskType: '',
				taskName: '',
				taskUrl: '',
				extraData: null,
				taskPrice: '',
				projectName: null,
				taskNum: '',
				autoClose: 0,
				endTime: '',
				commitDuration: '',
				confirmDuration: ''
			},
			step: [
				{
					stepOrder: 1,
					stepMode: 1,
					stepContent: '',
					stepImage: ''
				}
			],
			upId: '',
			tips: {
				text: '请选择你要新增的步骤类型',
				color: '#909399',
				fontSize: 28
			},
			actionList: [
				{
					text: '图文说明'
				},
				{
					text: '收集截图'
				}
			]
		};
	},
	onLoad(e) {
		if (!e.id)
			return this.navigateTo({
				url: '../addTask/addTask'
			});
		this.data.taskType = e.id;
	},
	// 监听返回
	onBackPress(options) {
		if (options.from === 'navigateBack') {
			return false;
		}
		uni.navigateBack({
			delta: 1
		});
		return true;
	},
	methods: {
		clickAddStep() {
			this.actionShow = true;
		},
		addStep(index) {
			if (this.step.length == 6) return this.$U.outputMsg('最多只能添加6个步骤');
			let addData = {
				stepOrder: this.step.length + 1,
				stepMode: index + 1,
				stepContent: '',
				stepImage: ''
			};
			this.step.push(addData);
		},
		numberTo(num) {
			let index = num + 1;
			this.step[num].stepOrder = index;
			return this.$U.numberToHz(index);
		},
		closeImg(index) {
			uni.showModal({
				content: '确定要移除该步骤吗？',
				cancelText: '取消',
				confirmText: '确认',
				confirmColor: '#f8c750',
				success: res => {
					if (res.confirm) {
						this.step.splice(index, 1);
					}
				}
			});
		},
		uploadImg(index) {
			return (this.upId = index);
		},
		upImgCallBack(data) {
			let upInfo = JSON.parse(data);
			this.step[this.upId].stepImage = upInfo.data;
			this.upId = '';
			this.$U.outputMsg('上传成功');
			return true;
		},
		clickNext(){
			let is = 0;
			if (this.data.taskId == 1 && !this.data.projectName) return this.$U.outputMsg('请输入项目名称');
			if (!this.data.taskName) return this.$U.outputMsg('请输入任务标题');
			if (this.data.taskName.length < 5) return this.$U.outputMsg('任务标题长度应为5-20个字符');
			if (this.step.length < 1) return this.$U.outputMsg('任务步骤不能为空');
			for (let i = 0; i <= this.step.length - 1; i++) {
				let data = this.step[i];
				if (data.stepMode == 2) {
					is++;
					if (!data.stepImage) return this.$U.outputMsg('收集截图步骤图片不能为空');
				}
				if (data.stepMode == 1 && !data.stepContent) {
					return this.$U.outputMsg('图文步骤文字内容不能为空');
				}
				if (data.stepMode == 1 && !data.stepImage) {
					return this.$U.outputMsg('图文步骤图片不能为空');
				}
			}
			if (is < 1) return this.$U.outputMsg('请至少添加一个收集截图类型的步骤');
			this.navigateTo({
				url: '../addTask/addTask3?step=' + JSON.stringify(this.step) + '&data=' + JSON.stringify(this.data)
			});
			return;
		}
	}
};
</script>

<style></style>
