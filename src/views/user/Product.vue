<script setup>
import BaseLayout from '@/components/user/BaseLayout.vue'
import InlineLoading from '@/components/InlineLoading.vue'
import ProductCard from '@/components/user/ProductCard.vue'
import { ref, watch, onMounted } from 'vue'
import { useUtils } from '@/composables/useUtils.js'
const { imgPath } = useUtils()
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { isInlineLoading } = storeToRefs(globalStore)
import { useUserStore } from '@/stores/userStore.js'
const userStore = useUserStore()
const { product } = storeToRefs(userStore)
const { getProduct } = userStore

onMounted(() => {
    isInlineLoading.value = true
    getProduct()
    filterProducts.value = product.value
})

const fade = ref(true)
const searchText = ref('')
const filterProducts = ref([])

watch(product, (newVal) => {
    if (newVal.length > 0)
        filterProducts.value = product.value
})

const filterType = ref('all')
function applyFilter(type) {
    fade.value = false

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
    setTimeout(() => {
        fade.value = true
    }, 1)
}
</script>

<template>
    <BaseLayout :title="'PRODUCT'">
        <div class="flex justify-end">
            <input type="text" placeholder="搜尋"
                class="text-sm sm:text-base w-full p-1 border-b border-b-gray-200 focus:outline-none sm:w-auto"
                @keyup.enter="applyFilter('search')" v-model="searchText">
            <button @click="applyFilter('search')" class="cursor-pointer transition hover:scale-110 "><img
                    src="/images/search-icon.svg" alt="search-icon" class="h-5"></button>
        </div>
        <div class="flex flex-col space-x-5 space-y-5 mt-2 lg:flex-row sm:mt-5">
            <div class="w-full flex flex-row overflow-x-auto lg:flex-col lg:w-50">
                <button :class="{ active: filterType == 'all' }" class="filter-btn text-sm lg:text-base"
                    :disabled="filterType == 'all'" @click="applyFilter('all')">
                    <img :src="`${imgPath}${filterType == 'all' ? 'all-white-icon' : 'all-dark-icon'}.svg`" alt="all-icon"
                        class="h-3.5 mt-0.5">
                    所有商品</button>
                <button :class="{ active: filterType == 'ice' }" class="filter-btn text-sm lg:text-base"
                    :disabled="filterType == 'ice'" @click="applyFilter('ice')">
                    <img :src="`${imgPath}${filterType == 'ice' ? 'ice-white-icon' : 'ice-dark-icon'}.svg`" alt="ice-icon"
                        class="h-3.5 mt-0.5">冰淇淋
                </button>
                <button :class="{ active: filterType == 'bar' }" class="filter-btn text-sm lg:text-base"
                    :disabled="filterType == 'bar'" @click="applyFilter('bar')">
                    <img :src="`${imgPath}${filterType == 'bar' ? 'icebar-white-icon' : 'icebar-dark-icon'}.svg`" alt="icebar-icon"
                        class="h-3.5 mt-0.5">
                    冰棒</button>
                <button :class="{ active: filterType == 'store' }" class="filter-btn text-sm lg:text-base"
                    :disabled="filterType == 'store'" @click="applyFilter('store')">
                    <img :src="`${imgPath}${filterType == 'store' ? 'store-white-icon' : 'store-dark-icon'}.svg`" alt="store-icon"
                        class="h-3.5 mt-0.5">
                    門市限定</button>
            </div>
            <div class="flex-1 p-10 text-center" v-if="isInlineLoading">
                <InlineLoading />
            </div>
            <div :class="{ 'ani-fade': fade }" class="flex-1 flex flex-wrap gap-2 sm:gap-5 justify-start opacity-0"
                v-else>

                <div class="w-full p-10 text-center" v-if="filterProducts.length == 0 && !isInlineLoading">
                    <div>目前尚未有此產品</div>
                </div>
       
                    <ProductCard :product="item" :page="'product'" v-for="item in filterProducts" :key="item.id"/>
           
            </div>
        </div>
    </BaseLayout>
</template>

<style scoped>
.filter-btn {
    display: flex;
    gap: 12px;
    border: 1px solid #D9D9D9;
    padding: 15px 20px;
    align-items: center;
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
    .filter-btn {
        padding: 10px 15px;
        text-align: center;
        flex: 1;
    }

    .filter-btn:not(:first-child) {
        border-top: 1px solid #D9D9D9;
        border-left: none !important;
    }
}
</style>
