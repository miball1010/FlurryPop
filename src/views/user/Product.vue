<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import ProductCard from '@/components/user/ProductCard.vue'

import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { isFullLoading } = storeToRefs(globalStore)
const { pushMessage } = globalStore
import { useUserStore } from '@/stores/userStore.js'
const userStore = useUserStore()
const { product } = storeToRefs(userStore)
const { getProduct } = userStore

// onMounted(()=>{
//     getProduct()

// })
const filterType = ref('all')
const productFilter = computed(() => {
    if (filterType.value == 'all') {
        return product.value
    }
    else {
        return product.value.filter(item => item.category == filterType.value)
    }
})
</script>

<template>
    <div class="bg-gray-100 min-h-screen w-full relative pb-60 sm:pb-100">
        <div
            class="w-full bg-[url('images/bg-2.jpg')] h-60 bg-cover bg-[position:center_40%] absolute flex items-center justify-center sm:h-100">
            <!-- 會改變的內容 -->
            <div class="title itali text-[40px] text-white sm:text-[80px]">PRODUCT</div>
        </div>

        <div
            class="bg-white w-[90%] max-w-[1330px] relative z-[2] top-50 mx-auto rounded-lg px-5 py-10 shadow-md sm:px-15 sm:py-28  sm:top-80">
            <!-- 會改變的內容 -->
            <div class="flex justify-end"><input type="text" placeholder="搜尋" class="border border-b-gray-200 focus:outline-none"> <img
                    src="/images/search-icon.svg" alt="" class="h-5"></div>
            <div class="flex flex-col lg:flex-row gap-5">
                <div class="flex flex-col max-w-[160px]">
                    <button class="border border-gray-300 p-2 cursor-pointer" @click="filterType = 'all'">所有商品
                        ALL</button>
                    <button class="border border-gray-300 p-2 mt-[-1px] cursor-pointer" @click="filterType = 'ice'">冰淇淋
                        icecream</button>
                    <button class="border border-gray-300 p-2 mt-[-1px] cursor-pointer" @click="filterType = 'bar'">雪糕
                        ice cream bar</button>
                    <button class="border border-gray-300 p-2 mt-[-1px] cursor-pointer"
                        @click="filterType = 'store'">門市限定 In-store only</button>
                </div>
                <div class="flex gap-5 flex-wrap">
                    <ProductCard :product="productFilter" :page="'product'" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.aa {
    justify-content: end;
    flex-wrap: wrap;
    cursor: pointer;
}
</style>
