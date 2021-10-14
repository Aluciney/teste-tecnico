import axios from 'axios';

const api = axios.create({
	baseURL: process.env.BASE_BRASILIO_URL,
	timeout: 10000,
});

api.interceptors.request.use(async config => {
	const token = process.env.BASE_BRASILIO_TOKEN;
	if (token && config.headers) {
		config.headers.Authorization = `Token ${token}`;
	}
	return config;
});

export default api;