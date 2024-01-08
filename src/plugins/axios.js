import axios from 'axios';
import router from '~/router.js';
import { useAuth } from '~/store/auth.js';
import { notify } from '@kyvg/vue3-notification';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE;

// before sending the request
axios.interceptors.request.use(
	config => {

		let token = useAuth().token;
		if (
			token
			&& config.url !== '/captchaImage'
			&& config.url !== '/send/sendSms'
		) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	error => {
		
		return Promise.reject(error);
	}
);

// after getting the response
axios.interceptors.response.use(
	response => {

		let data = response.data;

		if (data instanceof Blob) {
			return response;
		}
		else if (!data.code.toString().startsWith('2')) {

			notify({
				text: data.msg,
				type: 'red',
			});

			if (data.code === 401) {
				useAuth().clearAuth();
				router.push({
					name: 'login',
				});
			}

			return Promise.reject(data);
		}
		else {
			return response;
		}
	},
	error => {
		
	}
);

export default axios;