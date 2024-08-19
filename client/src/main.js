import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '../src/assets/style.css'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPencilAlt, faCamera } from '@fortawesome/free-solid-svg-icons'
import ClickOutsideDirective from './plugins/ClickOutsideDirective'
import PageScrollDirective from './plugins/PageScrollDirective'

library.add(faPencilAlt, faCamera)

createApp(App)
	.use(ClickOutsideDirective)
	.use(PageScrollDirective)
	.use(router)
	.use(createPinia())
	.component('fa', FontAwesomeIcon)
	.mount('#app')
