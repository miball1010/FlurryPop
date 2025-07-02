<script setup>
</script>

<template>
    <div class="bg-neutral-700 text-white text-sm py-6 flex justify-center flex-col items-center gap-2">
        <div class="flex gap-3">
            <img src="/images/ig-icon.svg" alt="" class="h-7">
            <img src="/images/fb-icon.svg" alt="" class="h-7">
            <img src="/images/line-icon.svg" alt="" class="h-7">
        </div>
        <router-link :to="{ name: 'admin-login' }" class="hover:underline">後台系統</router-link>
        <div>Copyright © 2025 - Flurry Pop</div>
    </div>
</template>

<style scoped></style>
