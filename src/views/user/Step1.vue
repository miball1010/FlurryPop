<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
import InlineLoading from '@/components/InlineLoading.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { isInlineLoading, isFullLoading } = storeToRefs(globalStore)
const { pushMessage } = globalStore
import { useUserStore } from '@/stores/userStore.js'
const userStore = useUserStore()
const { step ,cart,total} = storeToRefs(userStore)
const {getCheckProduct } = userStore

onMounted(async() => {
    step.value = 1
    isInlineLoading.value = true
    await getCheckProduct()
})

function decrease(item) {
    if (item.qty > 1) {
        item.qty--
        updateCart(item)
    }
}

function increase(item) {
    item.qty++
    updateCart(item)
}

async function updateCart(item) {
    if (item.qty <= 0 || isNaN(item.qty)) {
        item.qty = 1
    }
    isFullLoading.value = true
    let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/cart/${item.id}`
    const cart = {
        data: {
            product_id: item.id,
            qty: item.qty
        }
    }
    try {
        const res = await axios.put(apiPath, cart)
        if (res.data.success) {
            getCheckProduct()
        }
        pushMessage(res.data.success, res.data.message)

    } catch (err) {
        console.error(err)
    }
    finally {
        isFullLoading.value = false
    }
}

async function delCart(id) {
    let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/cart/${id}`
    console.log(apiPath)
    try {
        const res = await axios.delete(apiPath)
        if (res.data.success) {
            getCheckProduct()
        }
        console.log(res.data)
        pushMessage(res.data.success, res.data.message)

    } catch (err) {
        console.error(err)
    }
    finally {
    }
}

function moreProduct(id) {
    router.push(`/product/${id}`)
}
</script>

<template>
    <div class="w-full p-10 text-center" v-if="isInlineLoading">
        <InlineLoading />
    </div>
    <div v-if="cart.length == 0 && !isInlineLoading" class="flex flex-col gap-7 justify-center items-center ani-fade">
        <div class="text-[#85B1CA]">目前沒有任何商品</div>
        <RouterLink :to="{ name: 'user-product' }"
            class="w-fit  border border-[#3F88B4] px-6 py-2 transition text-white bg-[#3F88B4] hover:text-[#3F88B4] hover:bg-white">
            購物去</RouterLink>
    </div>

    <div v-if="cart.length > 0" class="ani-fade flex flex-col gap-5 lg:flex-row">
        <div class="flex-2">
            <div class="font-bold mb-2 text-lg">購物清單</div>
            <div class="bg-white shadow-md px-2 sm:px-5">
                <div :class="{ 'border-b border-b-gray-200': cart.length != index + 1 }"
                    class="flex items-center justify-between py-2 sm:py-5" v-for="(item, index) in cart">

                    <div class="flex gap-5 min-w-0 w-full">
                        <div @click="moreProduct(item.product.id)" class="cursor-pointer w-20 h-auto sm:w-30 sm:h-30">
                            <img :src="item.product.imageUrl" alt="" class="w-full h-full object-center object-cover">
                        </div>
                        <div class="flex flex-col flex-1 min-w-0">
                            <div class="font-bold">{{ item.product.title }}</div>
                            <div class="font-bold text-[#3F88B4]">NT$ {{ item.product.price }}</div>
                            <!-- 數量 -->
                            <div class="flex w-full max-w-[300px] mt-3">
                                <button @click="decrease(item)"
                                    :class="item.qty > 1 ? 'cursor-pointer hover:bg-gray-100' : 'bg-gray-100'"
                                    class=" w-8 aspect-square border border-gray-200 text-center sm:w-10">-</button>
                                <input type="number" v-model.number.lazy="item.qty" @change="updateCart(item)"
                                    class="flex-1 min-w-0 border-t border-b border-gray-200 text-center outline-none" />
                                <button @click="increase(item)"
                                    class="cursor-pointer hover:bg-gray-100 w-8 aspect-square border border-gray-200 text-center sm:w-10">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="ml-5 mr-2 h-6 sm:mr-5 sm:ml-7"><img src="/images/trash-icon.svg" alt="" @click="delCart(item.id)"
                            class="w-full h-full cursor-pointer transition duration-300 hover:scale-110">
                    </div>
                </div>
            </div>
        </div>

        <div class="flex-1">
            <div class="font-bold mb-2 text-lg">結帳明細</div>
            <div class="bg-white shadow-md p-5 flex flex-row items-center justify-end gap-5 lg:flex-col lg:items-end">
                <div><span class="font-bold text-sm">總計</span><span class="ml-1 font-bold text-lg text-[#3F88B4] sm:text-xl">NT$
                        {{ total }}</span></div>
                <RouterLink :to="{ name: 'user-checkout-step2' }"
                    class="bg-[#85B1CA] text-white px-6 py-2 w-fit transition hover:opacity-90">下一步
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}
</style>