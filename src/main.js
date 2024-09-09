import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import '../node_modules/flowbite-vue/dist/index.css'

import './style.css'
import App from './App.vue'

createApp(App).use(createPinia()).use(router).mount('#app')
