// 引入全局配置文件
import config from '@/common/config.js';
export default {
	/**
	 * 验证手机号是否合法
	 * @param {Number} number
	 */
	checkPhone(number) {
		let reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
		if (number == '' || number.length != 11 || !reg.test(number)) return false;
		return true;
	},
	/**
	 * 数字转汉字
	 * @param {Object} num
	 */
	numberToHz(num) {
		let arr = ['一', '二', '三', '四', '五', '六'];
		return arr[num - 1];
	},
	/**
	 * 快捷输出提示
	 * @param {String} msg
	 */
	outputMsg(msg) {
		return uni.showToast({
			icon: 'none',
			title: msg
		});
	},
	/**
	 * 获取设备ClientID
	 */
	getClientId() {
		// #ifdef APP-PLUS
		const clientInfo = plus.push.getClientInfo()
		return clientInfo.clientid;
		// #endif
	},
	/**
	 * 获取用户Token
	 */
	getUserToken() {
		const info = uni.getStorageSync('user');
		return info ? JSON.parse(info).accessToken : false;
	},
	/**
	 * 获取用户刷新Token
	 */
	getUserRefreshToken() {
		const info = uni.getStorageSync('user');
		return info ? JSON.parse(info).refreshToken : false;
	},
	/**
	 * 获取用户信息
	 */
	getUserInfo() {
		const info = uni.getStorageSync('user');
		return info ? JSON.parse(info) : false;
	},
	/**
	 * 获取任务类型名称
	 * @param {Number} index
	 */
	getTaskTypeName(index) {
		if (config.indexClassTab[index]) {
			return config.indexClassTab[index].name
		}
	},
	/**
	 * 获取时间戳 不为空时 转换秒 为空获取当前时间戳（秒）
	 * @param {Object} time
	 */
	getTime(time = false) {
		if (!time) return Math.round(new Date() / 1000);
		return Math.round(time / 1000);
	},

	/**
	 * 生成随机数
	 * @param {Object} min
	 * @param {Object} max
	 */
	random(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	},
	/**
	 * 判断是否是数字
	 * @param {Object} val
	 */
	isRealNum(val) {
		if (val === "" || val == null) return false;
		if (!isNaN(val)) return true;
		return false;
	},
	/**
	 * 隐藏手机号4位
	 * @param {Object} number
	 */
	hiddenPhone(number) {
		number = "" + number;
		var reg = /(\d{3})\d{4}(\d{4})/;
		return number.replace(reg, "$1****$2")
	}
}
