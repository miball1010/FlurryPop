<script setup>

import ProductCard from '@/components/user/ProductCard.vue'
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore.js'
const userStore = useUserStore()
const { product } = storeToRefs(userStore)
const { getProduct } = userStore
import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/virtual';

import { Pagination, Navigation, Virtual } from 'swiper/modules';
const modules = [Pagination, Navigation, Virtual]

gsap.registerPlugin(ScrollTrigger)
onMounted(() => {
    getProduct()
    gsap.fromTo('.ice',
        { y: 300, xPercent: -50 },
        {
            y: 0,
            duration: 2,
            ease: 'power2.out',
            onComplete: () => {
                gsap.to('.ice', {
                    y: 300,
                    scrollTrigger: {
                        trigger: '.bg',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: 3,
                        // markers: true,
                    }
                })
            }
        }
    )
})

</script>

<template>
    <div class="bg">
        <img src="/images/bg-1.jpg" alt="" class="bg-img">
    </div>
    <div class="w-full h-130 lg:h-screen overflow-hidden relative ">

        <div class="title-box relative top-40 lg:top-55">
            <div class="title text-[2rem] sm:text-[3rem] lg:text-[5rem] mb-3">Little flurries, big joy!</div>
            <RouterLink :to="{ name: 'user-product' }" class="btn">立即探索</RouterLink>
        </div>
        <img src="/images/bg-1.png" alt="" class="bg-img ice">
    </div>
    <div class="py-10 sm:py-25 bg-white">
        <div class="w-[85%] max-w-[996px] flex flex-col mx-auto gap-10 items-center lg:gap-35 sm:gap-20 sm:flex-row">
            <div class="flex-1">
                <div class="flex gap-2 items-center mb-2">
                    <img src="/images/sparkles-icon.svg" alt="" class="mt-0.5 h-5 sm:h-8">
                    <div class="serif text-[#85B1CA] text-lg sm:text-2xl font-bold">獨特風味</div>
                </div>
                <div class="text-justify text-sm sm:text-base">
                    Flurry Pop 的冰，是會說話的雪。每一球都藏著一種個性，一段氣味記憶。
                    有的輕盈，有的沉靜，有的像剛下過雪的森林，有的像擁抱前的猶豫。
                    我們用天然素材與靈感角色，打造冷而不距離的味覺旅程。
                </div>
                <div class="serif font-bold text-lg sm:text-xl mt-5">
                    Flurry Pop，不只是冰淇淋，是能融化心情的存在。
                </div>
            </div>
            <div class="flex-1">
                <img src="/images/home-1.jpg" alt="" class="w-full">
            </div>
        </div>
        <div
            class="mt-15 sm:mt-37 pt-[0] pb-6 w-[85%] max-w-[996px] flex flex-col mx-auto gap-10 items-center lg:gap-35 sm:gap-20 sm:flex-row-reverse sm:pt-[7vw] sm:pb-[7vw]">
            <div class="flex-1">
                <div class="flex gap-2 items-center mb-2">
                    <img src="/images/milk-icon.svg" alt="" class="h-5 sm:h-8">
                    <div class="serif text-[#85B1CA] text-lg sm:text-2xl font-bold">嚴選食材</div>
                </div>
                <div class="text-justify text-sm sm:text-base">
                    Flurry Pop 堅持使用無香精天然原料，所有冰品皆選用本地牧場鮮奶、當季水果，手工製作，無添加色素，讓每一口都能吃得開心也放心。
                </div>
                <div class="serif font-bold text-lg sm:text-xl mt-5">
                    不只涼甜，還要溫柔地照顧你的味蕾和心情。
                </div>
            </div>
            <div class="flex-1">
                <div class="relative aa">
                    <img src="/images/home-2.jpg" alt=""
                        class="relative top-0 left-[0%] w-[70%] sm:top-[2vw] sm:left-[11vw] sm:w-[18vw] ">
                    <img src="/images/home-3.jpg" alt=""
                        class="relative top-3 left-[10%] w-[70%] sm:top-[-3vw] sm:left-[-8vw] sm:w-[18vw]">
                    <img src="/images/home-4.jpg" alt=""
                        class="relative top-6 left-[20%] w-[80%] sm:top-[-2vw] sm:left-[0vw] sm:w-[20vw]">
                </div>
            </div>
        </div>
    </div>

    <div class="bg-gradient-to-b from-[#E4F2FA] to-[#F8FCFF]">
        <div class="relative top-[-20px] left-30 w-fit z-[2]">
            <img src="/images/pop-title-1.svg" alt="" class="">
            <img src="/images/pop-title-2.svg" alt="" class="absolute top-4 left-2 z-[-1]">
            <div class="bg-[#FFEFA8] h-5 w-30 absolute top-[-5px] left-[-20px] z-[-1]"></div>
        </div>

        <div class="w-[90%] ml-auto pt-12 pb-22">
            <swiper class="pop-swiper" :navigation="true" :slides-per-view="6" :spaceBetween="30"
                :autoplay="{ delay: 500, disableOnInteraction: false }" :modules="modules" :breakpoints="{
                    '1': {
                        slidesPerView: 1,
                        centeredSlides: true,
                        spaceBetween: 20
                    },
                    '640': {
                        slidesPerView: 2.5,
                    },
                    '1024': {
                        slidesPerView: 4,
                    }
                }">

                <swiper-slide v-for="item in product" :key="item.id">
                    <ProductCard :product="item" :page="'home'" />
                </swiper-slide>
                <swiper-slide>
                    <div class="card"><div class="text-[#85B1CA] font-bold">所有商品</div></div>
                </swiper-slide>
            </swiper>
        </div>

    </div>
</template>

<style scoped>
.card {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    aspect-ratio: 1/1;
    box-shadow: 0 0 10px #85b1ca34;
    cursor: pointer;
    transition: 0.3s;
    margin-right: 30px;
}

.card:hover {
    /* transform: scale(1.05); */
}

.bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
}

.bg-img {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    pointer-events: none;
}

.ice {
    left: 50%;
}

@media screen and (max-width:1023px) {
    .ice {
        width: auto;
        height: 75%;
    }
}

@media screen and (max-width:639px) {
    .ice {
        height: 80%;
    }
}

.title-box {
    transform: translateY(300px);
    opacity: 0;
    animation: title-fade 1.5s ease-in-out forwards;
    animation-delay: 0.1s;
}

@keyframes title-fade {
    0% {
        transform: translateY(300px);
        opacity: 0;
    }

    100% {
        transform: translateY(0);
        opacity: 1;
    }
}

.title {
    text-align: center;
    color: white;
    font-family: 'italiana';
    animation: shine 3s ease-in-out infinite alternate;

}

@keyframes shine {
    0% {
        text-shadow:
            0 0 5px #97C9E6,
            0 0 10px #97C9E6,
            0 0 20px #97C9E6,
            0 0 40px #97C9E6;
    }

    85% {
        text-shadow:
            0 0 5px #97C9E6,
            0 0 10px #97C9E6,
            0 0 20px #97C9E6,
            0 0 40px #97C9E6;
    }

    100% {
        text-shadow:
            0 0 5px #ffffff,
            0 0 10px #ffffff;
    }
}

.btn {
    display: block;
    margin: 0 auto;
    width: fit-content;
    cursor: pointer;
    border: 1px solid white;
    color: white;
    backdrop-filter: blur(0px);
    background-color: rgba(255, 255, 255, 0.1);
    transition: 0.3s;
}

.btn:hover {
    box-shadow:
        0 0 5px #97C9E6,
        0 0 10px #97C9E6;
    background-color: rgba(255, 255, 255, 0);
    backdrop-filter: blur(15px);
}
</style>
