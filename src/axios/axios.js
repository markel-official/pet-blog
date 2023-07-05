import axios from 'axios';

const instance = axios.create({
	baseURL: `http://localhost:7777`
});
instance.interceptors.request.use((config) => {
	const token = localStorage.getItem("_hh_token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
}, (err) => {
	console.log(err)
});

export default instance;