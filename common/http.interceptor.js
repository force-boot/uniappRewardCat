const install = (Vue, vm) => {
	// 请求配置
	Vue.prototype.$u.http.setConfig({
		baseUrl: vm.$C.apiUrl,
		loadingText: '加载中...',
		loadingTime: 300,
		noToken: false,
		header: {
			'content-type': 'application/json;charset=UTF-8',
			'Authorization': ''
		}
	});

	// 请求拦截部分
	Vue.prototype.$u.http.interceptor.request = (config) => {
		let noTokenUrl = [
			'user/login',
			'user/create',
			'user/codeLogin',
			'user/refreshToken',
			'user/code',
			'user/getUser',
			'task/detail'
		];
		if (noTokenUrl.indexOf(config.url) != '-1') {
			config.header.noToken = true;
		} else {
			let user = uni.getStorageSync('user');
			if (user) {
				const token = JSON.parse(user);
				config.header.Authorization = token.accessToken;
			} else {
				config.header.noToken = true;
			}
		}
		// 判断是否需要刷新token
		const loginTime = uni.getStorageSync('loginTime');
		const diffTime = Math.round(new Date() / 1000) - loginTime;
		const userInfo = vm.$U.getUserInfo();
		if (loginTime && userInfo && diffTime > 3600 * 24) {
			uni.request({
				url: vm.$C.apiUrl + '/user/refreshToken',
				method: 'POST',
				data: {
					refreshToken: userInfo.refreshToken
				},
				success: (refreshRes) => {
					let refreshData = refreshRes.data;
					let user = vm.$u.deepMerge(userInfo, refreshData.data);
					if (refreshData.code == 200) {
						vm.$store.commit('login', user);
					} else {
						vm.$store.commit('logout');
					}
				}
			});
		}
		return config;
	}

	// 响应拦截
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if (res.code == 200) {
			return res;
		} else if (res.code == '-100') {
			vm.$U.outputMsg('你还没登录，请先登录');
			setTimeout(() => {
				return uni.navigateTo({
					url: '/pages/login/login'
				});
			}, 800);
		} else {
			return {
				message: res.message,
				code: res.code,
			};
		}
	}
}

export default {
	install
}
