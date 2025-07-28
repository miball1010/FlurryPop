<script setup>
import BaseInput from '@/components/BaseInput.vue'
import BaseLayout from '@/components/user/BaseLayout.vue'
import { ref } from 'vue'
import axios from 'axios'
import { useUtils } from '@/composables/useUtils.js'
const { currency, date } = useUtils()
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
const orderId = ref('')
</script>

<template>
    <BaseLayout :title="'ORDER'">
        <div class="w-full max-w-[600px] mx-auto relative">
            <BaseInput :inputType="'text'" v-model="orderId" :id="'orderId'" :placeholder="'ex:-OVQfn3K63mBOrDDx0bl'"
                            :description="'訂單編號'" />
            <button @click="getOrder(orderId)"
                class="absolute translate-y-[-50%] top-[50%] right-3 cursor-pointer transition hover:scale-110 "><img
                    src="/images/search-icon.svg" alt="" class="h-4 sm:h-5"></button>
        </div>

        <template #bottom>
            <div v-if="order" class="relative py-5 top-55 w-[90%] max-w-[650px] mx-auto sm:py-0 sm:top-90">
                <div class="bg-white shadow-md p-8 sm:p-10">
                    <div class="flex items-center gap-2 justify-center">
                        <img src="/images/snow-icon.svg" alt="" class="h-4 sm:h-5">
                        <span class="serif text-lg sm:text-2xl font-bold text-[#3F88B4]">訂單資訊</span>
                        <img src="/images/snow-icon.svg" alt="" class="h-4 sm:h-5 scale-x-[-1]">
                    </div>

                    <div>
                        <div class="flex mt-4 sm:mt-10 max-w-[500px] mx-auto gap-x-10 gap-y-4 flex-col sm:flex-row w-fit">
                            <div class="sm:flex-1">
                                <div class="flex mb-4 items-center">
                                    <div class="text-sm sm:text-base font-bold text-[#3F88B4] w-20">訂購日期</div>
                                    <div>{{ date(order.create_at) }}</div>
                                </div>
                                <div class="flex mb-4 items-center">
                                    <div class="text-sm sm:text-base font-bold text-[#3F88B4] w-20">姓名</div>
                                    <div>{{ order.user.name }}</div>
                                </div>
                                <div class="flex mb-4 items-center">
                                    <div class="text-sm sm:text-base font-bold text-[#3F88B4] w-20">電話</div>
                                    <div>{{ order.user.tel }}</div>
                                </div>
                                <div class="flex items-center">
                                    <div class="text-sm sm:text-base font-bold text-[#3F88B4] w-20">Email</div>
                                    <div>{{ order.user.email }}</div>
                                </div>
                            </div>
                            <div class="sm:flex-1">
                                <div class="flex items-center">
                                    <div class="text-sm sm:text-base font-bold text-[#3F88B4] w-20">出貨狀態</div>
                                    <div class="font-bold text-[#D8473A]">處理中</div>
                                </div>
                                <div class="flex mt-4 items-center">
                                    <div class="text-sm sm:text-base font-bold text-[#3F88B4] w-20">寄送方式</div>
                                    <div class="flex-1"> {{ order.user.address == '實體店取貨' ? '店取' : '宅配' }}</div>
                                </div>
                                <div v-if="order.user.address != '實體店取貨'"
                                    class="text-sm sm:text-base mt-1.5 border-b border-gray-200 pb-1 w-fit">
                                    {{ order.user.address }}
                                </div>
                                <div class="flex items-center mt-4">
                                    <div class="text-sm sm:text-base font-bold text-[#3F88B4] w-20">付款狀態</div>
                                    <div class="flex gap-3">
                                        <div class="font-bold">NT$ {{ currency(order.total) }}</div>
                                        <div :class="order.is_paid?'text-[#7DB14A]':'text-[#D8473A]'" class="font-bold ">{{ order.is_paid ? '已付款' : '未付款' }}</div>
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
