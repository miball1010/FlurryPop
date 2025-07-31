<template>
    <div class="bg-neutral-700 text-neutral-400 text-xs sm:text-sm py-5 sm:py-8 flex justify-center flex-col items-center gap-1">
        <div class="w-[90%] max-w-[1330px] flex flex-col items-center sm:items-end gap-2">
            <div class="flex gap-3">
                <a href="#" class="transition duration-300 hover:scale-110">
                    <img src="/images/ig-icon.svg" alt="ig-icon" class="h-6">
                </a>
                <a href="#" class="transition duration-300 hover:scale-110">
                    <img src="/images/fb-icon.svg" alt="fb-icon" class="h-6">
                </a>
                <a href="#" class="transition duration-300 hover:scale-110">
                    <img src="/images/line-icon.svg" alt="line-icon" class="h-6">
                </a>
            </div>
            <div class="flex flex-col-reverse sm:flex-row items-center gap-0.5 sm:gap-3">
                <div>Copyright © 2025 - Flurry Pop</div>
                <router-link :to="{ name: 'admin-login' }" class="hover:underline">後台系統</router-link>
            </div>
        </div>
    </div>
</template>
 