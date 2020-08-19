import Vue from 'vue'
import App from './App'
import store from './store/index.js';

import uView from "uview-ui";
Vue.use(uView);

Vue.prototype.$store = store;

Vue.config.productionTip = false

// 引入全局配置文件
import $C from '@/common/config.js';
Vue.prototype.$C = $C;

// 引入助手函数
import $U from '@/common/util.js';
Vue.prototype.$U = $U;

// 权限验证
Vue.prototype.checkAuth = (callback) => {
	if (!store.state.loginStatus) {
		$U.outputMsg('你还没有登陆,请先登陆');
		return uni.navigateTo({
			url: '/pages/login/login',
		});
	}
	callback();
}

// 权限验证跳转
Vue.prototype.navigateTo = (options) => {
	if (!store.state.loginStatus) {
		$U.outputMsg('你还没有登陆，请先登陆');
		return uni.navigateTo({
			url: '/pages/login/login',
		});
	}
	return uni.navigateTo(options);
}

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

// http拦截器
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app);

app.$mount()
