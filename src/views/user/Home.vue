<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/virtual';

import { Pagination, Navigation, Virtual } from 'swiper/modules';
const modules = [Pagination, Navigation, Virtual]
</script>

<template>
    <div class="w-full h-180 bg-[url('images/bg-1.jpg')] bg-cover bg-[position:center_20%]">
        <div class="title">Little flurries, big joy!</div>
        <RouterLink :to="{ name: 'user-product' }" class="btn px-6 py-2">立即探索</RouterLink>
    </div>
    <div class="py-25">
        <div class="w-[80%] max-w-[996px] flex flex-col mx-auto gap-10 items-center lg:gap-35 sm:gap-20 sm:flex-row">
            <div class="flex-1">
                <div class="flex gap-2 items-center mb-2">
                    <img src="/images/sparkles-icon.svg" alt="" class="h-8">
                    <div class="serif text-[#85B1CA] text-2xl font-bold">獨特風味</div>
                </div>
                <div class="text-justify">
                    Flurry Pop 的冰，是會說話的雪。每一球都藏著一種個性，一段氣味記憶。
                    有的輕盈，有的沉靜，有的像剛下過雪的森林，有的像擁抱前的猶豫。
                    我們用天然素材與靈感角色，打造冷而不距離的味覺旅程。
                </div>
                <div class="serif font-bold text-xl mt-5">
                    Flurry Pop，不只是冰淇淋，是能融化心情的小怪物。
                </div>
            </div>
            <div class="flex-1">
                <img src="/images/home-1.jpg" alt="" class="w-full">
            </div>
        </div>
        <div
            class="mt-37 pt-[0] pb-6 w-[80%] max-w-[996px] flex flex-col mx-auto gap-10 items-center lg:gap-35 sm:gap-20 sm:flex-row-reverse sm:pt-[7vw] sm:pb-[7vw]">
            <div class="flex-1">
                <div class="flex gap-2 items-center mb-2">
                    <img src="/images/milk-icon.svg" alt="" class="h-8">
                    <div class="serif text-[#85B1CA] text-2xl font-bold">嚴選食材</div>
                </div>
                <div class="text-justify">
                    Flurry Pop 堅持使用無香精天然原料，所有冰品皆選用本地牧場鮮奶、當季水果，手工製作，無添加色素，讓每一口都能吃得開心也放心。
                </div>
                <div class="serif font-bold text-xl mt-5">
                    不只涼甜，還要溫柔地照顧你的味蕾和心情。
                </div>
            </div>
            <div class="flex-1">
                <div class="relative left-0 xl:left-0 lg:left-15 sm:left-10">
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
    <!-- <div class="fixed top-50 left-[50%] -translate-x-1/2 w-[90%] max-w-[1200px] bg-black h-10 mx-auto"></div> -->

    <div class="bg-gradient-to-b from-[#E4F2FA] to-[#F8FCFF]">
        <div class="w-[90%] ml-auto flex gap-25 pt-12 pb-22">
            <img src="/images/pop-title.svg" alt="" class="relative top-[-175px]">


            <div class="flex overflow-y-hidden overflow-x-scroll p-10">
                <div class="box p-5 mr-10" v-for="item in 8">
                    <div class="w-full pt-[100%] relative overflow-hidden">
                        <img src="/images/a.jpg" alt="" class="ice-img ">
                        <img src="/images/heart-hollow-red-icon.svg" alt="" class="absolute top-4 left-4 h-6">
                    </div>
                    <div class="text-lg font-bold mt-3 mb-5">
                        月光花冰淇淋 500ml
                    </div>
                    <div class="flex justify-between">
                        <div class="font-bold text-[#3F88B4]">NT$ 450</div>
                        <img src="/images/cart-hollow-icon.svg" alt="" class="h-6">
                    </div>
                </div>
            </div>


        </div>
    </div>
    <!-- <div class="bg-gradient-to-b from-[#E4F2FA] to-[#F8FCFF]">
        <div class="w-[90%] ml-auto flex gap-25 pt-12 pb-22">
            <img src="/images/pop-title.svg" alt="" class="relative top-[-175px]">

            <swiper class="pop-swiper" :navigation="true" :slides-per-view="3.8" :spaceBetween="30"
                :autoplay="{ delay: 500, disableOnInteraction: false }" :modules="modules" :breakpoints="{
                    '1': {
                        slidesPerView: 1.5,
                        centeredSlides: true,
                        spaceBetween: 20
                    },
                    '640': {
                        slidesPerView: 2.5,
                    },
                    '1024': {
                        slidesPerView: 3.8,
                    }
                }">
                <swiper-slide class="box p-5" v-for="item in 8">
                    <div class="w-full pt-[100%] relative overflow-hidden">
                        <img src="/images/a.jpg" alt="" class="ice-img ">
                        <img src="/images/heart-hollow-red-icon.svg" alt="" class="absolute top-4 left-4 h-6">
                    </div>
                    <div class="text-lg font-bold mt-3 mb-5">
                        月光花冰淇淋 500ml
                    </div>
                    <div class="flex justify-between">
                        <div class="font-bold text-[#3F88B4]">NT$ 450</div>
                        <img src="/images/cart-hollow-icon.svg" alt="" class="h-6">
                    </div>
                </swiper-slide>
                <swiper-slide></swiper-slide>
            </swiper>
        </div>
    </div> -->
</template>

<style scoped>
.aaa {
    display: flex;

    overflow-y: auto;
}

.box {
    box-shadow: 0 0 10px #85b1ca34;
    background: white;
    min-width: 300px;
    cursor: pointer;

}

.ice-img {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 100%;
    height: auto;
    transform: translateX(-50%);
    transition: transform 0.3s ease;
}

.box:hover .ice-img {
    transform: translateX(-50%) scale(1.1);
}

.title {
    position: relative;
    text-align: center;
    transform: translateY(100px);
    font-size: 5rem;
    color: white;
    font-family: 'italiana';
    text-shadow: 0 0 10px #97C9E6;
}

.btn {
    display: block;
    transform: translateY(140px);
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
    box-shadow: 0 0 10px #97C9E6;
    background-color: rgba(255, 255, 255, 0);
    backdrop-filter: blur(15px);
}

.pop-title {
    writing-mode: vertical-lr;
    font-size: 3rem;
    color: #3F88B4;
    font-weight: bold;
}
</style>
