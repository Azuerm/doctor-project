
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// // 引用公共初始化css
import './assets/css/base.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
