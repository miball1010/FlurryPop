<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
import InlineLoading from '@/components/InlineLoading.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { isInlineLoading } = storeToRefs(globalStore)
import { useUserStore } from '@/stores/userStore.js'
const userStore = useUserStore()
const { step, orderId } = storeToRefs(userStore)
const {share } = userStore

onMounted(() => {
    step.value = 3
    if (localStorage.getItem('orderId')) {
        orderId.value = localStorage.getItem('orderId')
        getOrder()
    }
    else {
        router.push('/')
    }
})

const order = ref({
    user: {}
})

async function getOrder() {
    isInlineLoading.value = true
    let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/order/${orderId.value}`
    try {
        const res = await axios.get(apiPath)
        if (res)
            console.log(res.data.order)
        order.value = res.data.order

    } catch (err) {
        console.error(err)
    }
    finally {
        isInlineLoading.value = false
    }
}
</script>

<template>
    <div class="relative py-5 top-55 w-[90%] max-w-[650px] mx-auto sm:py-0 sm:top-90">
        <div class="bg-white shadow-md p-10">
            <div class="flex items-center gap-2 justify-center mb-5">
                <img src="/images/snow-icon.svg" alt="" class="h-5">
                <span class="serif text-2xl font-bold text-[#3F88B4]">訂單完成</span>
                <img src="/images/snow-icon.svg" alt="" class="h-5 scale-x-[-1]">
            </div>

            <div class="w-full p-10 text-center" v-if="isInlineLoading">
                <InlineLoading />
            </div>

            <div v-else>
                <div @click="share" class="cursor-pointer text-[#7DB14A] font-bold flex flex-col space-x-5 justify-center hover:opacity-80 sm:flex-row">
                    <div class="flex items-center gap-2 justify-center "><img src="/images/copy-icon.svg" alt="" class="h-4">訂單編號</div>
                    <div class="text-center">{{ order.id }}</div>
                </div>
                <div class="flex mt-10 max-w-[500px] mx-auto space-x-10 space-y-4 flex-col sm:flex-row">
                    <div class="flex-1">
                        <div class="flex mb-4">
                            <div class="font-bold text-[#3F88B4] w-20">姓名</div>
                            <div class="flex-1">{{ order.user.name }}</div>
                        </div>
                        <div class="flex mb-4">
                            <div class="font-bold text-[#3F88B4] w-20">電話</div>
                            <div class="flex-1">{{ order.user.tel }}</div>
                        </div>
                        <div class="flex">
                            <div class="font-bold text-[#3F88B4] w-20">Email</div>
                            <div class="flex-1 w-10">{{ order.user.email }}</div>
                        </div>
                    </div>
                    <div class="flex-1">
                        <div class="flex mb-4">
                            <div class="font-bold text-[#3F88B4] w-20">寄送方式</div>
                            <div class="flex-1">{{ order.user.address == "實體店取貨" ? "實體店取貨" : "宅配" }}</div>
                        </div>
                        <div v-if="order.user.address != '實體店取貨'" class="mb-4 border-b border-gray-200">
                            {{ order.user.address }}
                        </div>
                        <div class="flex">
                            <div class="font-bold text-[#3F88B4] w-20">付款狀態</div>
                            <div class="flex-1">{{ order.is_paid ? "已付款" : "未付款" }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>