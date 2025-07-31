<script setup>
import InlineLoading from '@/components/InlineLoading.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useUtils } from '@/composables/useUtils.js'
const { currency } = useUtils()
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { isInlineLoading } = storeToRefs(globalStore)
const { pushMessage } = globalStore
import { useUserStore } from '@/stores/userStore.js'
const userStore = useUserStore()
const { step, orderId } = storeToRefs(userStore)

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
            order.value = res.data.order

    } catch (err) {
        console.error(err)
    }
    finally {
        isInlineLoading.value = false
    }
}

async function copy() {
    try {
        await navigator.clipboard.writeText(order.value.id)
        pushMessage(true, '已複製訂單編號！')
    } catch (err) {
        pushMessage(false, '複製失敗：' + err)
    }
}
</script>

<template>
    <div class="relative py-5 top-55 w-[90%] max-w-[650px] mx-auto sm:py-0 sm:top-90">
        <div class="bg-white shadow-md p-8 sm:p-10">
            <div class="w-full p-10 text-center" v-if="isInlineLoading">
                <InlineLoading />
            </div>

            <div v-else class="ani-fade">
                <div class="flex items-center gap-2 justify-center mb-5">
                    <img src="/images/snow-icon.svg" alt="snow-icon" class="h-4 sm:h-5">
                    <span class="serif text-lg sm:text-2xl font-bold text-[#3F88B4]">訂單完成</span>
                    <img src="/images/snow-icon.svg" alt="snow-icon" class="h-4 sm:h-5 scale-x-[-1]">
                </div>
                <div @click="copy"
                    class="cursor-pointer text-[#7DB14A] font-bold flex flex-col sm:flex-row gap-x-2 justify-center items-center hover:opacity-80">
                    <div class="flex items-center gap-2 justify-center text-sm sm:text-base"><img
                            src="/images/copy-icon.svg" alt="copy-icon" class="h-3 sm:h-4">訂單編號</div>
                    <div class="text-center text-sm sm:text-base">{{ order.id }}</div>
                </div>
                <div class="w-fit flex mt-10 max-w-[500px] mx-auto gap-x-10 gap-y-4 flex-col sm:flex-row">
                    <div class="sm:flex-1">
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
                            <div class="text-sm sm:text-base font-bold text-[#3F88B4] w-20">寄送方式</div>
                            <div>{{ order.user.address == "實體店取貨" ? "實體店取貨" : "宅配" }}</div>
                        </div>
                        <div v-if="order.user.address != '實體店取貨'"
                            class="text-sm sm:text-base mt-1.5 border-b border-gray-200 pb-1 w-fit">
                            {{ order.user.address }}
                        </div>
                        <div class="flex items-center mt-4">
                            <div class="text-sm sm:text-base font-bold text-[#3F88B4] w-20">付款狀態</div>
                            <div class="flex gap-3">
                                <div class="font-bold">NT$ {{ currency(order.total) }}</div>
                                <div :class="order.is_paid ? 'text-[#7DB14A]' : 'text-[#D8473A]'" class="font-bold ">
                                    {{ order.is_paid ? '已付款' : '未付款' }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>