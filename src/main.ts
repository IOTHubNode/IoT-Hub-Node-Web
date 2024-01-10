// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 按需引入element-plus的语言包
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'


// 创建应用实例
const app = createApp(App)

// 全局注册element-plus
app.use(ElementPlus, {
    locale: zhCn,
  })
  
// 挂载到index.html中id为app的标签上
app.mount('#app')