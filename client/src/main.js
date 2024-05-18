import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api/v1'
createApp(App).mount('#app')
