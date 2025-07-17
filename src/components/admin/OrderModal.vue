<script setup>
import BaseInput from '@/components/BaseInput.vue'
import { storeToRefs } from 'pinia';

import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { isFullLoading } = storeToRefs(globalStore)
const { doubleCheck, pushMessage, currency, date } = globalStore

import { useAdminStore } from '@/stores/adminStore.js'
const adminStore = useAdminStore()
const { NowOrder, orderIsOpen } = storeToRefs(adminStore)
const { updateOrder, closeOrderModal } = adminStore

import { onMounted, ref, watch } from 'vue'
import axios from 'axios';

const fileInput1 = ref(null)
const fileInput2 = ref(null)

onMounted(() => {
    // if (NowOrder.value.user.address === '實體店取貨') {
    //     deliveryType.value = 'store'
    //     NowOrder.value.user.address = '實體店取貨'
    // } else {
    //     deliveryType.value = 'home'
    //     NowOrder.value.user.address = NowOrder.value.user.address
    // }
})


const deliveryType = ref('home') // 預設是宅配

watch(() => NowOrder.value.user.address, (newVal) => {
    console.log(123)
    deliveryType.value = newVal == '實體店取貨' ? 'store' : 'home'
})

watch(deliveryType, (newVal) => {
    if (newVal == 'store') {
        NowOrder.value.user.address = '實體店取貨'
    }
    else {
        NowOrder.value.user.address = ""
    }
})
</script>

<template>
    <div class="w-full h-screen fixed top-0 left-0 bg-black/45" :class="{ active: orderIsOpen }">
        <div
            class="bg-white max-w-[1200px] w-[90%] max-h-[90%] absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] overflow-x-hidden overflow-y-auto">
            <div class="bg-neutral-700 text-white py-5 px-10 text-lg font-semibold">訂單</div>

            <div class="p-5 sm:p-10">
                <div class="flex justify-end mb-5">
                    <button @click="doubleCheck(NowOrder, 'order')"
                        class="px-6 py-2 bg-[#D8473A] text-white cursor-pointer hover:opacity-90">取消訂單</button>
                </div>

                <div class="flex  space-x-8 space-y-4 flex-col sm:flex-row ">
                    <div class="flex-2 flex flex-col gap-4">

                        <div class="flex mb-4">
                            <div class="font-bold w-20">購買時間</div>
                            <div class="flex-1">{{ date(NowOrder.create_at) }}</div>
                        </div>
                        <div class="flex mb-4">
                            <div class="font-bold w-20">訂單編號</div>
                            <div class="flex-1">{{ NowOrder.id }}</div>
                        </div>
                        <div class="flex mb-4">
                            <div class="font-bold w-20">姓名</div>
                            <div class="flex-1"><input type="text" v-model="NowOrder.user.name" class="px-2 py-1 border border-gray-300 outline-none"></div>
                        </div>
                        <div class="flex mb-4">
                            <div class="font-bold w-20">電話</div>
                            <div class="flex-1"><input type="text" v-model="NowOrder.user.tel" class="px-2 py-1 border border-gray-300 outline-none"></div>
                        </div>
                        <div class="flex mb-4">
                            <div class="font-bold w-20">Email</div>
                            <div class="flex-1"><input type="text" v-model="NowOrder.user.email" class="px-2 py-1 border border-gray-300 outline-none"></div>
                        </div>
                        <div class="flex mb-4">
                            <div class="font-bold w-20">應付金額</div>
                            <div class="flex-1">{{ NowOrder.total }}$</div>
                        </div>
                        <div class="flex mb-4">
                            <div class="font-bold w-20">付款狀況</div>
                            <div class="flex-1">{{ NowOrder.is_paid ? '已付款' : '未付款' }}</div>
                        </div>

                    </div>

                    <div class="flex-2 flex flex-col ">
                        <div class="flex mb-4">
                            <div class="font-bold w-20">寄送方式</div>
                            <div>
                                <label class="flex flex-wrap items-center gap-2 cursor-pointer">
                                    <input type="radio" name="delivery" v-model="deliveryType" value="home"
                                        class="w-4 h-4">
                                    <span>宅配</span>
                                    <input v-if="deliveryType == 'home'" type="text" v-model="NowOrder.user.address" class="px-2 py-1 border border-gray-300 outline-none">
                                </label>

                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="delivery" v-model="deliveryType" value="store"
                                        class="w-4 h-4">
                                    <span>店取</span>
                                </label>
                            </div>
                        </div>
                        <div class="flex mb-4">
                            <div class="font-bold w-20">出貨狀態</div>
                            <div class="flex-1">未出貨</div>
                        </div>
                        <div class="flex mb-4">
                            <div class="font-bold w-20">購買款項</div>
                            <div class="flex-1">
                                <div v-for="item in NowOrder.products">{{ item.product.title }} x{{ item.qty }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-1 hidden lg:block"></div>
                </div>

                <div class="flex justify-end gap-5 mt-5">
                    <button @click="closeOrderModal" class="btn-white">取消</button>
                    <button @click="updateOrder" class="btn-dark">確認</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.active {
    z-index: 50;
}

.aa {
    border: 1px solid firebrick;
}
</style>
