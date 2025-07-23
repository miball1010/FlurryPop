<script setup>
import BaseLayout from '@/components/user/BaseLayout.vue'
import InlineLoading from '@/components/InlineLoading.vue'
import { ref, watch, computed, onMounted } from 'vue';
import axios from 'axios';
import ProductCard from '@/components/user/ProductCard.vue'

import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { isInlineLoading } = storeToRefs(globalStore)
import { useUserStore } from '@/stores/userStore.js'
const userStore = useUserStore()
const { product } = storeToRefs(userStore)
const { getProduct } = userStore

onMounted(() => {
    isInlineLoading.value=true
    getProduct()
    filterProducts.value = product.value
})

const searchText = ref('')
const filterProducts = ref([])

watch(product, (newVal) => {
    if (newVal.length > 0)
        filterProducts.value = product.value
})

const filterType = ref('all')
function applyFilter(type) {
    filterType.value = type
    if (type == 'all') {
        filterProducts.value = product.value
    }
    else if (type == 'search') {
        filterProducts.value = product.value.filter(item => item.title.match(searchText.value))
    }
    else {
        filterProducts.value = product.value.filter(item => item.category == type)
    }
}
</script>

<template>
    <BaseLayout :title="'PRODUCT'">
        <div class="flex justify-end">
            <input type="text" placeholder="搜尋" class="w-full p-1 border-b border-b-gray-200 focus:outline-none sm:w-auto"
                @keyup.enter="applyFilter('search')" v-model="searchText">
            <button @click="applyFilter('search')" class="cursor-pointer transition hover:scale-110 "><img
                    src="/images/search-icon.svg" alt="" class="h-5"></button>
        </div>
        <div class="flex flex-col space-x-5 space-y-5 mt-2 lg:flex-row sm:mt-5">
            <div class="w-full flex flex-row overflow-x-auto lg:flex-col lg:w-45">
                <button :class="{ active: filterType == 'all' }" class="filter-btn text-sm lg:text-base"
                    @click="applyFilter('all')">所有商品</button>
                <button :class="{ active: filterType == 'ice' }" class="filter-btn text-sm lg:text-base"
                    @click="applyFilter('ice')">冰淇淋</button>
                <button :class="{ active: filterType == 'bar' }" class="filter-btn text-sm lg:text-base"
                    @click="applyFilter('bar')">雪糕</button>
                <button :class="{ active: filterType == 'store' }" class="filter-btn text-sm lg:text-base"
                    @click="applyFilter('store')">門市限定</button>
            </div>
            <div class="flex-1 flex flex-wrap gap-2 sm:gap-5 justify-start">
                <div class="w-full p-10 text-center" v-if="isInlineLoading">
                    <InlineLoading />
                </div>
                <div class="w-full p-10 text-center" v-if="filterProducts.length == 0 && !isInlineLoading">
                    <div>目前尚未有此產品</div>
                </div>
                <ProductCard :product="filterProducts" :page="'product'" />
            </div>
        </div>
    </BaseLayout>
</template>

<style scoped>
.filter-btn {
  
    border: 1px solid #D9D9D9;
    padding: 8px 20px;
    text-align: left;
    min-width: fit-content;
}

.filter-btn:not(:first-child) {
    border-top: none;
}

.filter-btn.active {
    background-color: #85B1CA;
    border: 1px solid #85B1CA;
    color: white;
}

.filter-btn:not(.active):hover {
    color: #3F88B4;
    cursor: pointer;
}

@media screen and (max-width:1023px) {
    .filter-btn{
        text-align: center;
          flex: 1;
    }
    .filter-btn:not(:first-child) {
        border-top: 1px solid #D9D9D9;
        border-left: none !important;
    }
}

</style>
