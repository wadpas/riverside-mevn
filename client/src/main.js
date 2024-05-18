import { createApp } from 'vue'
import '../src/assets/style.css'
import App from './App.vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api/v1'
createApp(App).mount('#app')
