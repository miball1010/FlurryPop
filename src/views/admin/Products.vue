<script setup>
import InlineLoading from '@/components/InlineLoading.vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { isInlineLoading } = storeToRefs(globalStore)
const { doubleCheck } = globalStore
import { useAdminStore } from '@/stores/adminStore.js'
const adminStore = useAdminStore()
const { products } = storeToRefs(adminStore)
const { getProduct, openProductModal } = adminStore
import { useUtils } from '@/composables/useUtils.js'
const { currency } = useUtils()

onMounted(() => {
  products.value = []
  isInlineLoading.value = true
  setTimeout(() => {
    getProduct()
  }, 100)
})
</script>

<template>
  <div class="flex justify-end mb-5">
    <button @click="openProductModal(true)" class="btn-dark">新增商品</button>
  </div>
  <div class="w-full text-left">
    <div class="font-bold border-b hidden lg:flex">
      <div class="w-28">商品</div>
      <div class="flex flex-1 gap-2">
        <div class="w-[250px]"></div>
        <div class="flex-1">售價</div>
        <div class="flex-1">狀態</div>
      </div>
      <div class="w-46"></div>
    </div>

    <div class="w-full p-10 text-center" v-if="isInlineLoading">
      <InlineLoading />
    </div>

    <div class="ani-fade flex flex-wrap gap-4" v-else>
      <div class="border-b border-gray-300 flex flex-wrap  gap-8 lg:gap-0  px-0 py-4 w-full flex-col md:flex-row"
        v-for="item in products" :key="item.id">
        <div class="flex flex-1">
          <div class="w-25 sm:w-28"> <img :src="item.imageUrl" alt="" class="w-20 h-20 object-cover" /></div>
          <div class="flex flex-1 gap-1 sm:gap-2 flex-col lg:flex-row items-start lg:items-center">
            <div class="w-auto lg:w-[250px]">
              <div class="text-sm sm:text-base font-bold break-words">{{ item.title }}</div>
              <div class="text-sm text-gray-400 hidden md:block">ID:{{ item.id }}</div>
            </div>
            <div class=" flex-1 text-[#3F88B4] font-bold">NT$ {{ currency(item.price) }}</div>
            <div class=" flex-1 text-sm sm:text-base font-bold" :class="item.is_enabled ? 'text-lime-600' : 'text-neutral-400'">{{
              item.is_enabled ?
                "上架中"
                :
                "未上架" }}</div>
          </div>
        </div>
        <div class="w-auto lg:w-46 flex justify-end gap-5 items-center">
          <button class="font-semibold btn-white" @click="openProductModal(false, item)">編輯</button>
          <button class="font-semibold btn-white" @click="doubleCheck(item, 'product')">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>