import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '../src/assets/style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faPencilAlt)

axios.defaults.baseURL = 'http://localhost:5000/api/v1'

createApp(App).use(createPinia()).use(router).component('fa', FontAwesomeIcon).mount('#app')
