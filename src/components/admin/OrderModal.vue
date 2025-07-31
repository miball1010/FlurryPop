<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue'
import { useUtils } from '@/composables/useUtils.js'
const { currency, date } = useUtils()
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { doubleCheck } = globalStore
import { useAdminStore } from '@/stores/adminStore.js'
const adminStore = useAdminStore()
const { NowOrder, orderIsOpen, productCount, address } = storeToRefs(adminStore)
const { updateOrder, closeOrderModal } = adminStore

onMounted(() => {
    adjustModalHeight()
    window.addEventListener('resize', adjustModalHeight)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', adjustModalHeight)
})

const modalHeight = ref('100vh')
function adjustModalHeight() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    modalHeight.value = `calc(var(--vh, 1vh) * 100)`
}
</script>

<template>
    <div :style="{ height: modalHeight }" class="w-full fixed top-0 left-0 bg-black/45 z-50" v-show="orderIsOpen">
        <transition name="fadeup">
            <div v-show="orderIsOpen"
                class="bg-transparent max-w-[1200px] w-[95%] max-h-[80%] absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] overflow-x-hidden overflow-y-auto">

                <div class="bg-neutral-700 text-white py-5 px-5 sm:px-10 text-base sm:text-lg font-semibold">訂單</div>

                <div class="bg-white p-5 sm:p-10">
                    <div class="flex justify-end mb-5">
                        <button @click="doubleCheck(NowOrder, 'order')"
                            class="px-6 py-2 bg-[#D8473A] text-white cursor-pointer text-sm sm:text-base hover:opacity-90">取消訂單</button>
                    </div>
                    <div class="flex flex-wrap gap-x-8 gap-y-4 flex-col lg:flex-row ">

                        <div class="w-full lg:w-[calc((100%-32px)/2)] flex flex-col gap-8">
                            <div class="flex items-center">
                                <div class="text-sm sm:text-base w-20 sm:w-25">訂購日期</div>
                                <div class="w-[calc(100%-80px)] sm:w-[calc(100%-100px)]">{{ date(NowOrder.create_at) }}
                                </div>
                            </div>
                            <div class="flex items-center">
                                <div class="text-sm sm:text-base w-20 sm:w-25">訂單編號</div>
                                <div class="flex-1">{{ NowOrder.id }}</div>
                            </div>
                            <div class="w-full flex items-center">
                                <div class="text-sm sm:text-base w-20 sm:w-25">姓名</div>
                                <div class="w-[calc(100%-80px)] sm:w-[calc(100%-100px)] max-w-[300px]">
                                    <input type="text" v-model="NowOrder.user.name"
                                        class="w-full px-2 py-1 border border-gray-300 outline-none">
                                </div>
                            </div>

                            <div class="flex items-center">
                                <div class="text-sm sm:text-base w-20 sm:w-25">電話</div>
                                <div class="w-[calc(100%-80px)] sm:w-[calc(100%-100px)] max-w-[300px]">
                                    <input type="text" v-model="NowOrder.user.tel"
                                        class="w-full px-2 py-1 border border-gray-300 outline-none">
                                </div>
                            </div>
                            <div class="flex items-center">
                                <div class="text-sm sm:text-base w-20 sm:w-25">Email</div>
                                <div class="w-[calc(100%-80px)] sm:w-[calc(100%-100px)] max-w-[300px]">
                                    <input type="text" v-model="NowOrder.user.email"
                                        class="w-full px-2 py-1 border border-gray-300 outline-none">
                                </div>
                            </div>
                            <div class="flex items-center">
                                <div class="text-sm sm:text-base w-20 sm:w-25">應付金額</div>
                                <div class="flex-1">NT$ {{ currency(NowOrder.total) }}</div>
                            </div>
                            <div class="flex items-center">
                                <div class="text-sm sm:text-base w-20 sm:w-25">付款狀況</div>
                                <div class="flex-1 font-bold"
                                    :class="NowOrder.is_paid ? 'text-[#7DB14A]' : 'text-[#D8473A]'">
                                    {{ NowOrder.is_paid ? '已付款' : '未付款' }}
                                </div>
                            </div>
                        </div>

                        <div class=" flex flex-col gap-8">
                            <div class="flex">
                                <div class="text-sm sm:text-base w-20 sm:w-25">寄送方式</div>
                                <div class="flex-1">
                                    <div v-if="NowOrder.user.address == '實體店取貨'">店取</div>
                                    <div v-else class="flex flex-wrap items-center gap-2 cursor-pointer">
                                        <div>宅配</div>
                                        <input type="text" v-model="NowOrder.user.address"
                                            class=" w-full px-2 py-1 border border-gray-300 outline-none">
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center">
                                <div class="text-sm sm:text-base w-20 sm:w-25">出貨狀態</div>
                                <div class="flex-1 font-bold text-[#D8473A]">未出貨</div>
                            </div>
                            <div class="flex " :class="{ 'items-center': productCount < 2 }">
                                <div class="text-sm sm:text-base w-20 sm:w-25">購買款項</div>
                                <div class="flex-1">
                                    <div v-for="(item, index) in NowOrder.products" :key="index">{{ item.product.title
                                    }}
                                        x{{ item.qty }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end gap-5 mt-5">
                        <button @click="closeOrderModal" class="btn-white">取消</button>
                        <button @click="updateOrder(address)" class="btn-dark">修改</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
