
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// // 引用公共初始化css
import './assets/css/base.css'
// 引入 vant 样式(函数式组件 showLoadingToast 等必须要,否则不渲染样式)
import 'vant/lib/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
