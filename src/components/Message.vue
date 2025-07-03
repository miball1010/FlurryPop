<script setup>
import { storeToRefs } from 'pinia';
import { useAdminStore } from '@/stores/adminStore.js'
const store = useAdminStore()
const { message } = storeToRefs(store)
</script>

<template>

    <div :class="{ 'active': message.active }"
        class="message-box fixed bottom-5 left-5 bg-white rounded-lg w-[200px] shadow-lg p-5 flex justify-between items-center">
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
    z-index: 10;
}
</style>
