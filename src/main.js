import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import '@/assets/style/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from '@/router'

import App from '@/App.vue'


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')


import 'bootstrap/dist/js/bootstrap.bundle.min.js'
