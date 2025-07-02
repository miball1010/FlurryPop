<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
</script>

<template>
    <div class="px-5 py-4 fixed top-0 left-0 w-full z-10">
        <div class="w-full max-w-[1400px] mx-auto flex justify-between items-center">

            <img src="/images/logo-white.svg" alt="" class="h-8">

            <div class="flex text-white gap-8 items-center">
                <RouterLink :to="{ name: 'user-about' }" class="navbtn">關於Flurry Pop</RouterLink>
                <RouterLink to="/dashboard/order" class="navbtn">所有商品</RouterLink>
                <RouterLink to="/dashboard/coupon" class="navbtn">訂單查詢</RouterLink>
                <RouterLink to="/dashboard/coupon" class="navbtn">常見問題</RouterLink>
                <div class="flex item-center justify-center gap-5">
                    <button @click="favoritePopup" class=" cursor-pointer flex items-center justify-center py-3"><img
                            src="/images/heart-solid-white-icon.svg" alt="" class="h-4.5"></button>
                    <RouterLink to="/dashboard/coupon" class="flex items-center justify-center py-3"><img
                            src="/images/cart-solid-icon.svg" alt="" class="h-4.5"></RouterLink>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.a {}
</style>
