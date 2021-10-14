import axios from 'axios';

const api = axios.create({
	baseURL: process.env.BASE_API_URL,
	timeout: 10000,
});

api.interceptors.request.use(async config => {
	if (config.headers) {
		config.headers.MeuNome = `Aluciney Wanderley`;
	}
	return config;
});

export default api;