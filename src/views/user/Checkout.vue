<script setup>
import BaseLayout from '@/components/user/BaseLayout.vue'
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore.js'
const userStore = useUserStore()
const { step } = storeToRefs(userStore)
</script>

<template>
    <BaseLayout :title="'CHECKOUT'">
        <div class="flex max-w-[900px] mx-auto flex-col gap-3 sm:flex-row sm:gap-0">
            <div class="flex-1 flex flex-row items-center gap-2 min-w-[100px] sm:flex-col">
                <div :class="step == 1 ? 'bg-[#3F88B4]' : 'bg-gray-300'"
                    class="serif text-white flex justify-center items-center rounded-full font-bold w-7 h-7 text-sm md:w-14 md:h-14 md:text-2xl sm:text-lg sm:w-10 sm:h-10">
                    1</div>
                <div class="text-sm">訂單明細確認</div>
            </div>

            <div class="flex-2 h-[1px] bg-gray-300 top-7 relative"></div>

            <div class="flex-1 flex flex-row items-center gap-2 min-w-[100px] sm:flex-col">
                <div :class="step == 2 ? 'bg-[#3F88B4]' : 'bg-gray-300'"
                    class="serif text-white flex justify-center items-center rounded-full font-bold w-7 h-7 text-sm md:w-14 md:h-14 md:text-2xl sm:text-lg sm:w-10 sm:h-10">
                    2</div>
                <div class="text-sm">填寫付款資料</div>
            </div>

            <div class="flex-2 h-[1px] bg-gray-300 top-7 relative"></div>

            <div class="flex-1 flex flex-row items-center gap-2 min-w-[100px] sm:flex-col">
                <div :class="step == 3 ? 'bg-[#3F88B4]' : 'bg-gray-300'"
                    class="serif text-white flex justify-center items-center rounded-full font-bold w-7 h-7 text-sm md:w-14 md:h-14 md:text-2xl sm:text-lg sm:w-10 sm:h-10">
                    3</div>
                <div class="text-sm">購買完成</div>
            </div>
        </div>

        <template #bottom>
                <router-view></router-view>
        </template>
    </BaseLayout>
</template>