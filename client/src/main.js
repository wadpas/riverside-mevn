import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '../src/assets/style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5000/api/v1'

createApp(App).use(createPinia()).use(router).mount('#app')
