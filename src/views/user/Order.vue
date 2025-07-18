<script setup>
import BaseLayout from '@/components/user/BaseLayout.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useUtils } from '@/composables/useUtils.js'
const { currency, date, imgPath } = useUtils()
import { storeToRefs } from 'pinia';

import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { isFullLoading } = storeToRefs(globalStore)
const { pushMessage } = globalStore

const order = ref(null)

async function getOrder(id) {
    isFullLoading.value = true
    let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/order/${id}`
    try {
        const res = await axios.get(apiPath)
        order.value = res.data.order
        if (res.data.order == null)
            pushMessage(false, "查無此訂單")
    } catch (err) {
        console.error(err)
    }
    finally {
        isFullLoading.value = false
    }
}
const orderId = ref('-OVQfn3K63mBOrDDx0bl')
</script>

<template>
    <BaseLayout :title="'ORDER'">
        <div class="w-full max-w-[600px] mx-auto relative">
            <div class="relative">
                <input type="text" v-model="orderId" id="orderId" class="peer w-full border border-gray-300 pt-4 pb-1 px-2 placeholder-transparent 
             focus:outline-none sm:pt-5 sm:pb-2 sm:px-3" placeholder="訂單編號" />
                <label for="orderId"
                    class="absolute left-2 sm:left-2.5 top-0 sm:top-1 text-sm text-gray-500 transition-all 
            peer-placeholder-shown:top-3 sm:peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-700 peer-focus:top-0 sm:peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-500">
                    訂單編號
                </label>
            </div>
            <button @click="getOrder(orderId)"
                class="absolute translate-y-[-50%] top-[50%] right-3 cursor-pointer transition hover:scale-110 "><img
                    src="/images/search-icon.svg" alt="" class="h-5"></button>
        </div>

        <template #bottom>
            <div v-if="order" class="relative py-5 top-55 w-[90%] max-w-[650px] mx-auto sm:py-0 sm:top-90">
                <div class="bg-white shadow-md p-10">
                    <div class="flex items-center gap-2 justify-center mb-5">
                        <img src="/images/snow-icon.svg" alt="" class="h-5">
                        <span class="serif text-2xl font-bold text-[#3F88B4]">訂單資訊</span>
                        <img src="/images/snow-icon.svg" alt="" class="h-5 scale-x-[-1]">
                    </div>

                    <div>
                        <div class="flex mt-10 max-w-[500px] mx-auto space-x-10 space-y-4 flex-col sm:flex-row">
                            <div class="flex-1">
                                <div class="flex mb-4">
                                    <div class="font-bold text-[#3F88B4] w-20">訂購日期</div>
                                    <div class="flex-1">{{ date(order.create_at) }}</div>
                                </div>
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
                                    <div class="font-bold text-[#3F88B4] w-20">出貨狀態</div>
                                    <div class="flex-1">處理中</div>
                                </div>
                                <div class="flex mb-4">
                                    <div class="font-bold text-[#3F88B4] w-20">寄送方式</div>
                                    <div class="flex-1"> {{ order.user.address == '實體店取貨' ? '店取' : '宅配' }}</div>
                                </div>
                                <div v-if="order.user.address != '實體店取貨'"
                                    class="mb-4 border-b border-gray-200 pb-1 w-fit">
                                    {{ order.user.address }}
                                </div>
                                <div class="flex">
                                    <div class="font-bold text-[#3F88B4] w-20">付款狀態</div>
                                    <div class="flex-1 flex gap-3">
                                        <div>{{ currency(order.total) }}$</div>
                                        <div>{{ order.is_paid ? '已付款' : '未付款' }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

    </BaseLayout>


</template>

<style scoped></style>
