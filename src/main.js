import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useGlobalStore } from '@/stores/globalStore.js'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'


const app = createApp(App)

AOS.init({
    duration: 800, // 動畫持續時間 (ms)
    easing: 'ease-in-out', // 動畫效果
})

app.use(createPinia())
app.use(router)
app.config.globalProperties.$axios = axios

app.mount('#app')


router.beforeEach((to, from, next) => {
    const globalStore = useGlobalStore()
    globalStore.isFullLoading = true
    next()
})


router.afterEach((to, from, next) => {
    const globalStore = useGlobalStore()
    window.scrollTo(0, 0)
    AOS.refresh()
    setTimeout(() => {
        globalStore.isFullLoading = false
    }, 1000)
})


