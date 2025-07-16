<script setup>
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { message } = storeToRefs(globalStore)
</script>

<template>

    <div :class="{ 'active': message.active }"
        class="message-box border border-gray-200 fixed bottom-5 right-5 bg-white rounded-lg w-fit 
        max-w-[calc(100%-40px)] min-w-[200px] shadow-lg p-5 flex justify-between items-center gap-3 sm:max-w-[500px]">
        <div>{{ message.text }}</div>
        <img v-if="message.status" src="/images/check-circle-icon.svg" alt="" class="h-5">
        <img v-else src="/images/cross-circle-icon.svg" alt="" class="h-5">
    </div>
</template>

<style scoped>
.message-box {
    opacity: 0;
    transition: 0.5s;
    transform: translateY(20px);
    z-index: -1;
}

.message-box.active {
    opacity: 1;
    transform: translateY(0);
    z-index: 80;
}
</style>
