<template>
	<view>
		<uni-list>
			<uni-list-item :nClick="true" :showArrow="false">
				<template v-slot:left="">
					<view>
						<view class="flex align-center">
							<view style="font-size: 30rpx;">投放单价</view>
							<text class="mt-1 ml-1" style="color: #DD524D;">*</text>
						</view>
					</view>
				</template>
				<template v-slot:right="">
					<view style="width: 150rpx;"><input type="number" value="" placeholder="￥最低1.2元" style="font-size: 28rpx;" v-model="taskPrice" /></view>
				</template>
			</uni-list-item>
			<uni-list-item :nClick="true" :showArrow="false">
				<template v-slot:left="">
					<view>
						<view class="flex align-center">
							<view style="font-size: 30rpx;">投放数量</view>
							<text class="mt-1 ml-1" style="color: #DD524D;">*</text>
						</view>
					</view>
				</template>
				<template v-slot:right="">
					<view style="width: 150rpx;"><input type="number" value="" placeholder="不能低于10" style="font-size: 28rpx;" v-model="data.taskNum" /></view>
				</template>
			</uni-list-item>
			<uni-list-item :nClick="false" :showArrow="true" @click="selectEndTime()">
				<template v-slot:left="">
					<view>
						<view class="flex align-center">
							<view style="font-size: 30rpx;">结束时间</view>
							<text class="mt-1 ml-1" style="color: #DD524D;">*</text>
						</view>
					</view>
				</template>
				<template v-slot:right="">
					<view>
						<text class="text-gray" style="font-size: 27rpx;">
							{{ data.autoClose || !data.endTime ? '数量完成自动结束' : $u.timeFormat(data.endTime, 'yyyy年mm月dd日') }}
						</text>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item :nClick="false" :showArrow="true" @click="onClickSelect(0)">
				<template v-slot:left="">
					<view>
						<view class="flex align-center">
							<view style="font-size: 30rpx;">提交限时</view>
							<text class="mt-1 ml-1" style="color: #DD524D;">*</text>
						</view>
					</view>
				</template>
				<template v-slot:right="">
					<view>
						<text class="text-gray" style="font-size: 27rpx;">{{ data.commitDuration ? data.commitDuration + '小时' : '请选择' }}</text>
					</view>
				</template>
			</uni-list-item>
			<uni-list-item :nClick="false" :showArrow="true" @click="onClickSelect(1)">
				<template v-slot:left="">
					<view>
						<view class="flex align-center">
							<view style="font-size: 30rpx;">审核周期</view>
							<text class="mt-1 ml-1" style="color: #DD524D;">*</text>
						</view>
					</view>
				</template>
				<template v-slot:right="">
					<view>
						<text class="text-gray" style="font-size: 27rpx;">{{ data.confirmDuration ? data.confirmDuration + '小时' : '请选择' }}</text>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<!-- 时间选择 -->
		<u-picker v-model="selectTime.show" mode="time" :params="selectTime.params" confirm-color="#f8c750" :zdyClick="true"
		 @zdyOn="autoClose" @confirm="onSelectEndTime"></u-picker>
		<!-- 单列选择 -->
		<u-select v-model="selectShow" :list="selectList[selectType].list" confirm-color="#f8c750" @confirm="onSelectRes"></u-select>
		<view class="flex justify-between pb-4 pl-2" style="position: absolute;bottom: 90rpx;">
			<view class="flex align-center justify-center">
				<u-checkbox-group>
					<u-checkbox icon-size="14" active-color="#f8c750" shape="circle" v-model="checked"></u-checkbox>
				</u-checkbox-group>
				<view class="flex align-center justify-between" style="font-size: 28rpx;">
					<text class="ml-1">我已阅读并遵守</text>
					<view class="main-color">《发布规则》</view>
				</view>
				<view @click="submit(2)" class="flex align-center justify-center border-bai bg-main" style="border-radius: 40rpx;width: 155rpx;height: 55rpx;margin-left: 140rpx;">
					<view>预览任务</view>
				</view>
			</view>
		</view>
		<view class="bg-bai px-2 py-1" style="position: absolute;bottom: 0;width: 100%;">
			<view class="flex align-center justify-between">
				<view>
					<text style="font-size: 33rpx;">总计：</text>
					<text class="text-jin" style="font-size: 30rpx;">{{taskPrice * data.taskNum || '0.00'}}</text>
				</view>
				<view @click="submit()" class="flex align-center justify-center border-bai bg-main" style="border-radius: 40rpx;width: 230rpx;height: 82rpx;">
					<text>提交订单</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: true,
				actionShow: false,
				selectShow: false,
				selectList: [{
						list: [{
								value: 1,
								label: '1小时'
							},
							{
								value: 2,
								label: '2小时'
							},
						]
					},
					{
						list: [{
							value: 24,
							label: '24小时'
						}]
					}
				],
				selectType: 0,
				actionList: [{
						text: '数量完成自动结束'
					},
					{
						text: '自定义结束时间'
					}
				],
				tips: {
					text: '请选择你想处理该事件的方式',
					color: '#909399',
					fontSize: 23
				},
				taskPrice: '',
				selectTime: {
					show: false,
					params: {
						year: true,
						month: true,
						day: true
					}
				},
				data: {},
				step: []
			};
		},
		onLoad(e) {
			this.data = JSON.parse(e.data);
			this.step = JSON.parse(e.step);
		},
		methods: {
			selectEndTime() {
				this.selectTime.show = true;
			},
			onSelectEndTime(e) {
				let date = new Date(e.year + '/' + e.month + '/' + e.day+' 23:00:00');
				this.data.endTime = date.getTime();
			},
			onClickSelect(type) {
				this.selectType = type;
				this.selectShow = true;
			},
			onSelectRes(e) {
				let res = e[0];
				if (this.selectType == 0) {
					if (res.valut) {
						this.data.commitDuration = res.valut;
					} else {
						this.data.commitDuration = res.value;
					}
				} else {
					this.data.confirmDuration = res.valut;
				}
			},
			autoClose(check) {
				this.data.autoClose = check ? 1 : 0;
			},
			prview(data) {
				return uni.navigateTo({
					url: '../taskPreview/taskPreview?info=' + JSON.stringify(data),
				});
			},
			submit(type = 1) {
				if (!this.taskPrice) return this.$U.outputMsg('投放单价不能为空');
				if (!this.data.taskNum || this.data.taskNum < 10) return this.$U.outputMsg('投放数量不正确');
				if (!this.data.endTime) return this.$U.outputMsg('请选择结束时间');
				if (!this.data.commitDuration) return this.$U.outputMsg('请选择提交限时');
				if (!this.data.confirmDuration) return this.$U.outputMsg('请选择审核周期');
				this.data.taskPrice = this.taskPrice * 100;
				let data = this.data;
				let post = Object.assign(data, {
					steps: this.step
				});
				if (type != 1) return this.prview(post);
				this.$u.post('task/create', post).then(res => {
					if (res.data) {
						this.$U.outputMsg('发布任务成功')
						return setTimeout(res => {
						    uni.navigateBack({
						    	delta: 3
						    });
						}, 600);
					} else {
						return this.$U.outputMsg(res.message);
					}
				});
			}
		}
	};
</script>

<style>
	page {
		background-color: #f5f5f5;
	}
</style>
