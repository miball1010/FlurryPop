<script setup>
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { confirm } = storeToRefs(globalStore)
const { } = globalStore

import { useAdminStore } from '@/stores/adminStore.js'
const adminStore = useAdminStore()
const { } = storeToRefs(adminStore)
const { delProduct } = adminStore
</script>

<template>
    <div v-if="confirm.show"
        class="bg-black/45 fixed w-full h-screen top-0 left-0 z-60 flex justify-center items-center">
        <div class="bg-white w-[90%] max-w-[400px] shadow-lg p-10">

            <div class="font-bold my-20 text-center">{{ confirm.text }}</div>

            <div class="flex justify-end gap-5">
                <button class="font-semibold btn-white" @click="confirm.show = false">取消</button>
                <button class="font-semibold btn-white" @click="delProduct(confirm.item)">刪除</button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
