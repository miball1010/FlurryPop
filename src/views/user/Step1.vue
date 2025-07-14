<script setup>
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
const { step } = storeToRefs(userStore)
const { } = userStore

const cart = ref([])
const total=ref(0)

onMounted(() => {
    step.value=1
    isInlineLoading.value = true
    getProduct()
})

async function getProduct() {
    let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/cart`
    try {
        const res = await axios.get(apiPath)
        console.log(res.data.data)
        cart.value = res.data.data.carts
        total.value=res.data.data.total
    } catch (err) {
        console.error(err)
    }
    finally {
        isInlineLoading.value = false
    }
}

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
            getProduct()
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
            getProduct()
        }
        console.log(res.data)
        pushMessage(res.data.success, res.data.message)

    } catch (err) {
        console.error(err)
    }
    finally {
    }
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

    <div v-if="cart.length > 0" class="ani-fade flex flex-col gap-5 md:flex-row">
        <div class="flex-2">
            <div class="font-bold mb-2 text-lg">購物清單</div>
            <div class="bg-white shadow-md px-5">
                <div :class="{ 'border-b border-b-gray-200': cart.length != index + 1 }"
                    class="flex items-center justify-between py-5" v-for="(item, index) in cart">
                    <div class="flex gap-5">
                        <div class="w-30 h-30"><img :src="item.product.imageUrl" alt=""
                                class="w-full h-full object-cover">
                        </div>
                        <div class="flex flex-col">
                            <div class="font-bold">{{ item.product.title }}</div>
                            <div class="font-bold text-[#3F88B4]">NT$ {{ item.product.price }}</div>
                            <!-- 數量 -->
                            <div class="flex w-full mt-3">
                                <button @click="decrease(item)"
                                    :class="item.qty > 1 ? 'cursor-pointer hover:bg-gray-100' : 'bg-gray-100'"
                                    class=" w-10 aspect-square border border-gray-200 text-center">-</button>
                                <input type="number" v-model.number.lazy="item.qty" @change="updateCart(item)"
                                    class="flex-1 border-t border-b border-gray-200 text-center outline-none" />
                                <button @click="increase(item)"
                                    class="cursor-pointer hover:bg-gray-100 w-10 aspect-square border border-gray-200 text-center">+</button>
                            </div>
                        </div>
                    </div>
                    <div class="m-3 w-5 h-5"><img src="/images/trash-icon.svg" alt="" @click="delCart(item.id)"
                            class="w-full h-full cursor-pointer transition duration-300 hover:scale-110">
                    </div>
                </div>
                <div>
                </div>
            </div>

        </div>
        <div class="flex-1">
            <div class="font-bold mb-2 text-lg">結帳明細</div>
            <div class="bg-white shadow-md p-5 flex flex-col items-end gap-5">
                <div><span class="font-bold">總計</span><span class="ml-1 font-bold text-xl text-[#3F88B4]">NT$ {{total}}</span></div>
                <RouterLink :to="{name:'user-checkout-step2'}" class="bg-[#85B1CA] text-white px-6 py-2 w-fit">下一步</RouterLink>
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