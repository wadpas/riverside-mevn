import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: 'http://localhost:5000/api',
})

axiosInstance.interceptors.request.use(
	(config) => {
		const localToken = JSON.parse(localStorage.getItem('token')) || ''
		config.headers.authorization = `Bearer ${localToken}`
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

export default axiosInstance
