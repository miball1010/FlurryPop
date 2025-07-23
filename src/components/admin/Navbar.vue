<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { isFullLoading } = storeToRefs(globalStore)
const { pushMessage } = globalStore

async function logout() {
    CloseMenu()
    isFullLoading.value = true
    let apiPath = `${import.meta.env.VITE_API}logout`
    try {
        const res = await axios.post(apiPath)

        if (res.data.success) {
            router.push('/login')
        }
        else {
            pushMessage(res.data.success, res.data.message)
        }
    } catch (err) {
        pushMessage(false, err.message)
    }
    finally {
        isFullLoading.value = false
    }
}

const menuIsOpen = ref(false)
function OpenMenu() {
    menuIsOpen.value = true
    document.body.style.overflow = 'hidden'
}

function CloseMenu() {
    menuIsOpen.value = false
    document.body.style.overflow = ''
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 768)
        CloseMenu()
})
</script>

<template>
    <div class="px-5 py-4 fixed top-0 left-0 bg-white w-full z-10 shadow-sm">
        <div class="w-full max-w-[1400px] mx-auto flex justify-between items-center">

            <div @click="CloseMenu"
                class="w-full h-screen fixed top-0 left-0 bg-black/45 transition md:transition-none duration-300"
                :class="menuIsOpen ? 'pointer-events-all opacity-100 md:pointer-events-none md:opacity-0' : 'pointer-events-none opacity-0'">
            </div>

            <div class="flex items-center gap-4">
                <img src="/images/logo-black.svg" alt="" class="h-6 sm:h-8">
                <div class="title text-xl font-bold">後臺系統</div>
            </div>

            <div class="menu text-sm sm:text-base flex gap-8 top-0 shadow-lg md:shadow-none items-center"
                :class="{ open: menuIsOpen }">

                <button @click="CloseMenu" class="cursor-pointer absolute top-6 right-4 md:hidden">
                    <img src="/images/cross.svg" alt="" class="h-4 sm:h-5"></button>
                <RouterLink :to="{ name: 'admin-product' }" @click="CloseMenu" class="navbtn">產品</RouterLink>
                <RouterLink :to="{ name: 'admin-order' }" @click="CloseMenu" class="navbtn">訂單</RouterLink>
                <div @click="logout" class="navbtn cursor-pointer">登出</div>
            </div>

            <button @click="OpenMenu" class="cursor-pointer md:hidden"> <img src="/images/menu.svg" alt=""
                    class="h-4 sm:h-5"></button>
        </div>
    </div>
</template>

<style scoped>
.navbtn {
    color: #404040;
    transition: 0.3s;
}

.navbtn:hover {
    color: #3F88B4;
}

@media screen and (max-width:768px) {
    .menu {
        flex-direction: column;
        position: fixed;
        transition: right 0.5s;
        right: -100%;
        background-color: white;
        height: 100vh;
        top: 0;
        width: 70%;
        max-width: 300px;
        padding: 100px 30px 30px;
    }

    .open.menu {
        right: 0;
    }
}

@media screen and (max-width:375px) {
    .title {
        display: none;
    }
}
</style>
