<!-- 需要簡化 -->
<!-- <script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const router = useRouter()
const menuIsOpen = ref(false)
const isScrolled = ref(false)

function OpenMenu() {
  menuIsOpen.value = true
  document.body.style.overflow = 'hidden'
}
function CloseMenu() {
  menuIsOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 200
  })
})
onUnmounted(() => {
  window.removeEventListener('scroll', () => {})
})
</script> -->
<script setup>
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

// const isScrolled =ref(false)
onMounted(() => {
    gsap.to('.black', {
        y: 0,
        duration: 0.5,
        scrollTrigger: {
            trigger: document.body,
            start: 'top -200',
            toggleActions: 'play none none reverse',
        },
    })
})
</script>

<template>
    <div class="px-5 py-4 absolute top-0 left-0  w-full z-10">
        <div class="w-full max-w-[1400px] mx-auto flex justify-between items-center">
            <!-- 背景 -->
            <div @click="CloseMenu"
                class="w-full h-screen fixed top-0 left-0 bg-black/45 transition duration-300 md:transition-none"
                :class="menuIsOpen ? 'pointer-events-all opacity-100 md:pointer-events-none md:opacity-0' : 'pointer-events-none opacity-0'">
            </div>
            <!-- logo -->
            <RouterLink to="/"><img src="/images/logo-white.svg" alt="" class="h-8"></RouterLink>

            <!-- menu -->
            <div class=" fixed flex gap-8 items-center bg-white pt-25 px-25 pb-7 flex-col top-0  shadow-lg h-screen right-0 transition-transform duration-0
            md:relative md:bg-transparent md:pt-0 md:px-0 md:pb-0 md:flex-row md:shadow-none md:h-auto md:translate-x-0 md:transition-none"
                :class="menuIsOpen ? 'text-neutral-700 translate-x-0 duration-300' : 'text-white translate-x-full md:translate-x-0'">

                <button @click="CloseMenu" class="cursor-pointer absolute top-6 right-4 md:hidden"> <img
                        src="/images/cross.svg" alt="" class="h-5"></button>
                <RouterLink :to="{ name: 'user-about' }" class="navbtn">關於Flurry Pop</RouterLink>
                <RouterLink :to="{ name: 'user-product' }" class="navbtn">所有商品</RouterLink>
                <RouterLink :to="{ name: 'user-order' }" class="navbtn">訂單查詢</RouterLink>
                <RouterLink :to="{ name: 'user-QA' }" class="navbtn">常見問題</RouterLink>
                <div class="flex item-center justify-center gap-5">
                    <button @click="favoritePopup" class=" cursor-pointer flex items-center justify-center py-3"><img
                            src="/images/heart-solid-white-icon.svg" alt="" class="h-4.5"></button>
                    <RouterLink :to="{ name: 'user-checkout' }" class="flex items-center justify-center py-3"><img
                            src="/images/cart-solid-white-icon.svg" alt="" class="h-4.5"></RouterLink>
                </div>
            </div>
            <!-- menu-btn -->
            <button @click="OpenMenu" class="cursor-pointer md:hidden"> <img src="/images/menu-white.svg" alt=""
                    class="h-5"></button>
        </div>
    </div>

    <div class="black px-5 py-4 fixed top-0 left-0 translate-y-[-110%] bg-white w-full z-10 shadow-md">
        <div class="w-full max-w-[1400px] mx-auto flex justify-between items-center">

            <div @click="CloseMenu"
                class="w-full h-screen fixed top-0 left-0 bg-black/45 transition duration-300 md:transition-none"
                :class="menuIsOpen ? 'pointer-events-all opacity-100 md:pointer-events-none md:opacity-0' : 'pointer-events-none opacity-0'">
            </div>

            <RouterLink to="/"><img src="/images/logo-black.svg" alt="" class="h-8"></RouterLink>


            <div class=" fixed flex gap-8 items-center bg-white pt-25 px-25 pb-7 flex-col top-0  shadow-lg h-screen right-0 transition-transform duration-0
            md:relative md:bg-transparent md:pt-0 md:px-0 md:pb-0 md:flex-row md:shadow-none md:h-auto md:translate-x-0 md:transition-none"
                :class="menuIsOpen ? 'translate-x-0 duration-300' : 'translate-x-full md:translate-x-0'">

                <button @click="CloseMenu" class="cursor-pointer absolute top-6 right-4 md:hidden"> <img
                        src="/images/cross.svg" alt="" class="h-5"></button>
                <RouterLink :to="{ name: 'user-about' }" class="navbtn">關於Flurry Pop</RouterLink>
                <RouterLink :to="{ name: 'user-product' }" class="navbtn">所有商品</RouterLink>
                <RouterLink :to="{ name: 'user-order' }" class="navbtn">訂單查詢</RouterLink>
                <RouterLink :to="{ name: 'user-QA' }" class="navbtn">常見問題</RouterLink>
                <div class="flex item-center justify-center gap-5">
                    <button @click="favoritePopup" class=" cursor-pointer flex items-center justify-center py-3"><img
                            src="/images/heart-solid-dark-icon.svg" alt="" class="h-4.5"></button>
                    <RouterLink :to="{ name: 'user-checkout' }" class="flex items-center justify-center py-3"><img
                            src="/images/cart-solid-dark-icon.svg" alt="" class="h-4.5"></RouterLink>
                </div>
            </div>

            <button @click="OpenMenu" class="cursor-pointer md:hidden"> <img src="/images/menu.svg" alt=""
                    class="h-5"></button>
        </div>
    </div>
</template>

<style scoped></style>
