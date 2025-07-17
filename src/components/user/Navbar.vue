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

window.addEventListener('resize',()=>{
    if(window.innerWidth>768)
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
            <RouterLink to="/"><img :src="`/images/${isScroll ? 'logo-black' : 'logo-white'}.svg`" alt="" class="h-8">
            </RouterLink>

            <!-- menu -->
            <div :class="{ open: menuIsOpen }" class="menu gap-8 pt-25 px-25 pb-7 shadow-lg
            md:pt-0 md:px-0 md:pb-0 md:shadow-none ">

                <button @click="CloseMenu" class="cursor-pointer absolute top-6 right-4 md:hidden"> <img
                        src="/images/cross.svg" alt="" class="h-5"></button>
                <RouterLink @click="CloseMenu" :to="{ name: 'user-about' }" class="navbtn">關於Flurry Pop</RouterLink>
                <RouterLink @click="CloseMenu" :to="{ name: 'user-product' }" class="navbtn">所有商品</RouterLink>
                <RouterLink @click="CloseMenu" :to="{ name: 'user-order' }" class="navbtn">訂單查詢</RouterLink>
                <RouterLink @click="CloseMenu" :to="{ name: 'user-QA' }" class="navbtn">常見問題</RouterLink>
                <div class="flex item-center justify-center gap-5">
                    <RouterLink @click="CloseMenu" :to="{ name: 'user-favorite' }"
                        class=" cursor-pointer flex items-center justify-center py-3 transition duration-300 hover:scale-110">
                        <img :src="`/images/${isScroll || menuIsOpen ? 'heart-solid-dark-icon' : 'heart-solid-white-icon'}.svg`"
                            alt="" class="h-4.5">
                    </RouterLink>
                    <RouterLink @click="CloseMenu" :to="{ name: 'user-checkout-step1' }"
                        class="flex items-center justify-center py-3 transition duration-300 hover:scale-110"><img
                            :src="`/images/${isScroll || menuIsOpen ? 'cart-solid-dark-icon' : 'cart-solid-white-icon'}.svg`"
                            alt="" class="h-4.5"></RouterLink>
                </div>
            </div>
            <!-- menu-btn -->
            <button @click="OpenMenu" class="cursor-pointer md:hidden"> <img
                    :src="`/images/${isScroll ? 'menu' : 'menu-white'}.svg`" alt="" class="h-5"></button>
        </div>
    </div>
    <!-- 
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
                    <RouterLink :to="{ name: 'user-favorite' }"
                        class=" cursor-pointer flex items-center justify-center py-3"><img
                            src="/images/heart-solid-dark-icon.svg" alt="" class="h-4.5"></RouterLink>
                    <RouterLink :to="{ name: 'user-checkout-step1' }" class="flex items-center justify-center py-3"><img
                            src="/images/cart-solid-dark-icon.svg" alt="" class="h-4.5"></RouterLink>
                </div>
            </div>

            <button @click="OpenMenu" class="cursor-pointer md:hidden"> <img src="/images/menu.svg" alt=""
                    class="h-5"></button>
        </div>
    </div> -->
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
        align-items: center;
        /* transition: 0; */
        /* transform: translateX(100%); */
    }

    .open.menu {
        right: 0;
        /* transition: 0.3s; */
        /* transform: translateX(0); */
    }

    .open .navbtn {
        color: #404040;
    }

}

/* 
.menu-bg {
    display: none;
}

.logo {
    height: 100%;
}

.logo img {
    height: 100%;
    padding: 8px;
    transition: 0.3s;
}

.logo img:hover {
    transform: scale(1.1);
}

.menu {
    margin-bottom: 0;
}

.menu li {
    display: inline-block;
    padding: 5px 20px;
    margin: 0 5px;
    font-size: 1.1rem;
    cursor: pointer;
    position: relative;
    color: white;
    font-weight: 600;
    border-radius: 50px;
} */
</style>
