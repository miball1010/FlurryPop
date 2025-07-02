<script setup>
import { onMounted, ref } from 'vue'
// import axios from 'axios'
import { storeToRefs } from 'pinia';
import { useAdminStore } from '@/stores/adminStore.js'
const store = useAdminStore()
const { products } = storeToRefs(store)
const { getProduct, delProduct, openProductModal } = store

onMounted(() => {
  setTimeout(() => {
    getProduct()
  }, 100)
})
</script>

<template>
  <!-- <button @click="openProductModal(true)" class="btn-dark float-right mb-5">新增商品</button> -->

  <div class="w-full text-left">
    <div class="font-bold border-b hidden lg:flex">
      <div class="w-28">商品</div>
      <div class="flex">
        <div class="p-4 w-[290px]"></div>
        <div class="p-4 flex-1">售價</div>
        <div class="p-4 flex-1">狀態</div>
      </div>
      <div class="p-4 min-w-[220px]"></div>
    </div>

    <div class="flex flex-wrap gap-4">
      <!-- 產品 -->
      <div class="border-b border-gray-300 flex flex-wrap  gap-8  px-0 py-4 w-full flex-col lg:gap-0 md:flex-row"
        v-for="item in products" :key="item.id">

        <div class="flex flex-1">
          <!-- 圖片 -->
          <div class=" w-28"> <img :src="item.imageUrl" alt="" class="w-20 h-20 object-cover" /></div>
          <!-- 文字 -->
          <div class="flex flex-1 gap-2 flex-col items-start lg:flex-row lg:items-center">
            <div class="w-auto lg:w-[250px]">
              <div class="font-semibold break-words">{{ item.title }}</div>
              <div class="text-sm text-gray-400 hidden md:block">ID:{{ item.id }}</div>
            </div>
            <div class=" flex-1 text-[#3F88B4] font-semibold">${{ item.price }}</div>
            <div class=" flex-1 font-semibold" :class="item.is_enabled ? 'text-lime-600' : 'text-neutral-400'">{{
              item.is_enabled ?
                "上架中"
                :
              "未上架" }}</div>
          </div>
        </div>
        <!-- 按鈕 -->
        <div class="flex justify-end gap-5 items-center">
          <button class="font-semibold btn-white" @click="openProductModal(false, item)">編輯</button>
          <button class="font-semibold btn-white" @click="delProduct(item)">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aa {
  justify-content: start;
  align-items: start;
}
</style>