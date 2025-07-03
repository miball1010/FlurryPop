<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter()

async function logout() {
    let apiPath = `${import.meta.env.VITE_API}logout`
    try {
        const res = await axios.post(apiPath)
        if (res.data.success) {
            router.push('/login')
        }
        else {
            alert(res.data.message)
        }
    } catch (err) {
        console.error(err)
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
</script>

<template>
    <div class="px-5 py-4 fixed top-0 left-0 bg-white w-full z-10 shadow-sm">
        <div class="w-full max-w-[1400px] mx-auto flex justify-between items-center">
            <!-- 背景 -->
            <div @click="CloseMenu"
                class="w-full h-screen fixed top-0 left-0 bg-black/45 transition duration-300 md:transition-none"
                :class="menuIsOpen ? 'pointer-events-all opacity-100 md:pointer-events-none md:opacity-0' : 'pointer-events-none opacity-0'">
            </div>
            <!-- logo -->
            <div class="flex items-center gap-4">
                <img src="/images/logo-black.svg" alt="" class="h-8">
                <div class="title">後臺系統</div>
            </div>
            <!-- menu -->
            <div class="fixed flex gap-8 items-center bg-white pt-25 px-25 pb-7 flex-col top-0  shadow-lg h-screen right-0 transition-transform duration-0
            md:relative md:bg-transparent md:pt-0 md:px-0 md:pb-0 md:flex-row md:shadow-none md:h-auto md:translate-x-0 md:transition-none"
                :class="menuIsOpen ? 'translate-x-0 duration-300' : 'translate-x-full md:translate-x-0'">

                <button @click="CloseMenu" class="cursor-pointer absolute top-6 right-4 md:hidden"> <img
                        src="/images/cross.svg" alt="" class="h-5"></button>
                <RouterLink to="/dashboard/product" class="navbtn">產品</RouterLink>
                <RouterLink to="/dashboard/order" class="navbtn">訂單</RouterLink>
                <RouterLink to="/dashboard/coupon" class="navbtn">優惠券</RouterLink>
                <div @click="logout" class="navbtn cursor-pointer">登出</div>
            </div>
            <!-- menu-btn -->
            <button @click="OpenMenu" class="cursor-pointer md:hidden"> <img src="/images/menu.svg" alt=""
                    class="h-5"></button>
        </div>
    </div>
</template>

<style scoped>
@media screen and (max-width:375px) {
    .title {
        display: none;
    }
}
</style>
