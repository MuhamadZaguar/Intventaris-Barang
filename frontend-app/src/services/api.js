import axios from 'axios';

const API = axios.create({
	baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Attach token if present
API.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export async function login(payload) {
	const res = await API.post('/auth/login', payload);
	return res.data;
}

export async function register(payload) {
	const res = await API.post('/auth/register', payload);
	return res.data;
}

export default API;
