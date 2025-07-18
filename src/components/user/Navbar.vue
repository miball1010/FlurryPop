<script setup>
import { useUtils } from '@/composables/useUtils.js'
const { imgPath } = useUtils()
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const menuIsOpen = ref(false)
function OpenMenu() {
    menuIsOpen.value = true
    document.body.style.overflow = 'hidden'
}
function CloseMenu() {
    menuIsOpen.value = false
    document.body.style.overflow = ''
}

const isScroll = ref(false)

window.addEventListener('scroll', () => {
    let top = window.scrollY
    if (top > 200) {
        isScroll.value = true
    }
    else {
        isScroll.value = false
    }
})

window.addEventListener('resize', () => {
    if (window.innerWidth > 768)
        CloseMenu()
})
</script>

<template>
    <div :class="{ scroll: isScroll }" class="navbar px-5 py-4">
        <div class="w-full max-w-[1400px] mx-auto flex justify-between items-center">
            <!-- 背景 -->
            <div @click="CloseMenu"
                class="w-full h-screen fixed top-0 left-0 bg-black/45 transition duration-300 md:transition-none"
                :class="menuIsOpen ? 'pointer-events-all opacity-100 md:pointer-events-none md:opacity-0' : 'pointer-events-none opacity-0'">
            </div>
            <!-- logo -->
            <RouterLink to="/"><img :src="`${imgPath}${isScroll ? 'logo-black' : 'logo-white'}.svg`" alt="" class="h-8">
            </RouterLink>

            <!-- menu -->
            <div :class="{ open: menuIsOpen }" class="menu gap-8 pt-25 px-25 pb-7 shadow-lg
            md:pt-0 md:px-0 md:pb-0 md:shadow-none ">
                <button @click="CloseMenu" class="cursor-pointer absolute top-6 right-4 md:hidden">
                    <img src="/images/cross.svg" alt="" class="h-5">
                </button>
                <RouterLink @click="CloseMenu" :to="{ name: 'user-about' }" class="navbtn">關於Flurry Pop</RouterLink>
                <RouterLink @click="CloseMenu" :to="{ name: 'user-product' }" class="navbtn">所有商品</RouterLink>
                <RouterLink @click="CloseMenu" :to="{ name: 'user-order' }" class="navbtn">訂單查詢</RouterLink>
                <RouterLink @click="CloseMenu" :to="{ name: 'user-QA' }" class="navbtn">常見問題</RouterLink>
                <div class="flex item-center justify-center gap-5">
                    <RouterLink @click="CloseMenu" :to="{ name: 'user-favorite' }"
                        class=" cursor-pointer flex items-center justify-center py-3 transition duration-300 hover:scale-110">
                        <img :src="`${imgPath}${isScroll || menuIsOpen ? 'heart-solid-dark-icon' : 'heart-solid-white-icon'}.svg`"
                            alt="" class="h-4.5">
                    </RouterLink>
                    <RouterLink @click="CloseMenu" :to="{ name: 'user-checkout-step1' }"
                        class="flex items-center justify-center py-3 transition duration-300 hover:scale-110"><img
                            :src="`${imgPath}${isScroll || menuIsOpen ? 'cart-solid-dark-icon' : 'cart-solid-white-icon'}.svg`"
                            alt="" class="h-4.5"></RouterLink>
                </div>
            </div>
            <!-- menu-btn -->
            <button @click="OpenMenu" class="cursor-pointer md:hidden"> <img
                    :src="`${imgPath}${isScroll ? 'menu' : 'menu-white'}.svg`" alt="" class="h-5"></button>
        </div>
    </div>
</template>

<style scoped>
.navbar {
    background-color: #ffffff00;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
}

.scroll.navbar {
    background-color: #ffffff;
    position: fixed;
    box-shadow: 0 1px 10px #00000049;
    animation: slide 0.3s forwards;

}

@keyframes slide {
    0% {
        transform: translateY(-100%);
    }

    100% {
        transform: translateY(0);
    }
}

.menu {
    display: flex;
     align-items: center;
}

.navbtn {
    color: white;
    transition: 0.3s;
}

.navbtn:hover {
    opacity: 0.8;
}

.scroll .navbtn {
    color: #404040;
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
    }

    .open.menu {
        right: 0;
    }

    .open .navbtn {
        color: #404040;
    }
}
</style>
