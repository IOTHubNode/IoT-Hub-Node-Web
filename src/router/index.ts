
import {createRouter,createWebHistory} from 'vue-router'

import A from '@/views/a.vue' 
import B from '@/views/b.vue'
import C from '@/views/c.vue'


const router = createRouter({
    history: createWebHistory(), // 创建一个history模式的vue-router
    routes: [
    {
        path: '/a',
        component:A
    },
    {
        path: '/b',
        component:B
    },
    {
        path: '/c',
        component:C
    }
    ]
})


export default router   // 导出路由实例