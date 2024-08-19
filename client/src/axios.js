import axios from 'axios'
const token = localStorage.getItem('neos_token')

axios.defaults.baseURL = 'http://localhost:5000/api/v1'
axios.defaults.headers.common = { Authorization: `Bearer ${token}` }

export default axios
