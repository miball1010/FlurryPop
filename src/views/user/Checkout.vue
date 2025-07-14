<script setup>
import BaseLayout from '@/components/user/BaseLayout.vue'
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore.js'
const userStore = useUserStore()
const { step } = storeToRefs(userStore)
const { } = userStore
</script>

<template>
    <BaseLayout :title="'CHECKOUT'">
       
        <div class="flex max-w-[900px] mx-auto flex-wrap">
            <div class="flex-1 flex flex-col items-center min-w-[100px]">
                <div :class="step == 1 ? 'bg-[#3F88B4]' : 'bg-gray-300'"
                    class="serif text-white flex justify-center items-center rounded-full font-bold mb-2 w-10 h-10 text-lg md:w-14 md:h-14 md:text-2xl">
                    1</div>
                <div class="text-sm">訂單明細確認</div>
            </div>
            <div class="flex-2 h-[1px] bg-gray-300 top-7 relative"></div>
            <div class="flex-1 flex flex-col items-center min-w-[100px]">
                <div :class="step == 2 ? 'bg-[#3F88B4]' : 'bg-gray-300'"
                    class="serif text-white flex justify-center items-center rounded-full font-bold mb-2 w-10 h-10 text-lg md:w-14 md:h-14 md:text-2xl">
                    2</div>
                <div class="text-sm">填寫付款資料</div>
            </div>
            <div class="flex-2 h-[1px] bg-gray-300 top-7 relative"></div>
            <div class="flex-1 flex flex-col items-center min-w-[100px]">
                <div :class="step == 3 ? 'bg-[#3F88B4]' : 'bg-gray-300'"
                    class="serif text-white flex justify-center items-center rounded-full font-bold mb-2 w-10 h-10 text-lg md:w-14 md:h-14 md:text-2xl">
                    3</div>
                <div class="text-sm">購買完成</div>
            </div>
        </div>

        <template #checkout>
             <div class="relative top-60 w-[90%] max-w-[1050px] mx-auto sm:top-90">
             <router-view></router-view>
             </div>
        </template>
    </BaseLayout>
  
</template>

<style scoped></style>