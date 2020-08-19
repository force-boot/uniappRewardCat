import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 引入全局配置文件
import config from '@/common/config.js';
export default new Vuex.Store({
	state: {
		loginStatus: false,
		loginTime: 0,
		user: {

		},
	},
	mutations: {
		login(state, user) {
			let time = Math.round(new Date() / 1000);
			state.loginStatus = true;
			state.user = user;
			state.loginTime = time;
			uni.setStorageSync('loginTime', time);
			uni.setStorageSync('user', JSON.stringify(user));
		},
		initLogin(state) {
			let user = uni.getStorageSync('user');
			let loginTime = uni.getStorageSync('loginTime');
			if (user && loginTime) {
				state.loginTime = loginTime;
				state.loginStatus = true;
				state.user = JSON.parse(user);
			}
		},
		logout(state) {
			state.loginStatus = false;
			uni.removeStorageSync('loginTime');
			uni.removeStorageSync('user');
		},
	}
})
