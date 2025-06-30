<script setup>

</script>

<template>
    <div class="px-5 py-2 fixed top-0 left-0 bg-white w-full z-10">
        <div class="w-full max-w-[1400px] mx-auto flex justify-between items-center">

            <div class="flex items-center gap-4">
                <img src="/images/logo-black.svg" alt="" class="h-8">
                <div class="title">2123</div>
                <!-- 後臺系統 -->
            </div>

            <div class="flex">
                <RouterLink to="/dashboard/products" class="navbtn">產品</RouterLink>
                <RouterLink to="/dashboard/order" class="navbtn">訂單</RouterLink>
                <RouterLink to="/dashboard/coupon" class="navbtn">優惠券</RouterLink>
                <div class="navbtn cursor-pointer">登出</div>
            </div>
        </div>

    </div>
</template>

<style scoped>
</style>
