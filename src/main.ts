// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

// import router from './router' // 引入路由实例

// 创建应用实例
const app = createApp(App)

// app.use(router)
// 全局注册element-plus
app.use(ElementPlus)
  
// 挂载到index.html中id为app的标签上
app.mount('#app')