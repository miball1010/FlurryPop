<script setup>
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { message } = storeToRefs(globalStore)
</script>

<template>
    <transition name="fadeup">
        <div v-show="message.active" class="message-box z-80 border border-gray-200 fixed bottom-5 right-5 bg-white rounded-lg w-fit 
      max-w-[calc(100%-40px)] sm:max-w-[500px] min-w-[200px] shadow-lg p-5 flex justify-between items-center gap-3">
            <div>{{ message.text }}</div>
            <img v-if="message.status" src="/images/check-circle-icon.svg" alt="" class="h-5">
            <img v-else src="/images/cross-circle-icon.svg" alt="" class="h-5">
        </div>
    </transition>
</template>
