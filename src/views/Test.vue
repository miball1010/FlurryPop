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
    <div class="bg-gradient-to-b from-[#E4F2FA] to-[#F8FCFF]">
        <div class="w-[90%] max-w-[1400px] ml-auto flex gap-25 py-35">
            <img src="/images/pop-title.svg" alt="" class="relative top-[-175px]">

            <swiper class="mySwiper" :navigation="true" :slides-per-view="3.5" :spaceBetween="30"
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
                        slidesPerView: 3.5,
                    }
                }">
                <swiper-slide class="box p-5" v-for="item in 5">
                    <div class="w-full pt-[100%] relative">
                        <img src="/images/a.jpg" alt=""
                            class="absolute top-0 left-0 w-full h-full object-cover object-bottom">
                        <img src="/images/heart-hollow-red-icon.svg" alt="" class="absolute top-4 left-4 h-6">
                    </div>
                    <div class="text-lg font-bold">
                        月光花冰淇淋 500ml
                    </div>
                    <div class="flex justify-between">
                        <div class="font-bold">NT$ 450</div>
                        <img src="/images/cart-hollow-icon.svg" alt="" class="h-6">
                    </div>
                </swiper-slide>
            </swiper>
        </div>

        <!-- <div class="p-40">
            <div class="box p-5" v-for="item in 5">
                <div class="w-full pt-[100%] relative">
                    <img src="/images/a.jpg" alt=""
                        class="absolute top-0 left-0 w-full h-full object-cover object-bottom">
                    <img src="/images/heart-hollow-red-icon.svg" alt="" class="absolute top-4 left-4 h-6">
                </div>
                <div class="text-lg font-bold">
                    月光花冰淇淋 500ml
                </div>
                <div class="flex justify-between">
                    <div class="font-bold">NT$ 450</div>
                    <img src="/images/cart-hollow-icon.svg" alt="" class="h-6">
                </div>
            </div>
        </div> -->
    </div>
</template>

<style scoped>


.box {
    box-shadow: 0 0 10px #85b1ca34;
    background: white;
    width: 300px;
    cursor: pointer;
}

.pop-title {
    writing-mode: vertical-lr;
    font-size: 3rem;
    color: #3F88B4;
    font-weight: bold;
}


</style>
