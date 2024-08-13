import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '../src/assets/style.css'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faPencilAlt)

createApp(App).use(router).use(createPinia()).component('fa', FontAwesomeIcon).mount('#app')
