<script setup>
import Loading from '@/components/Loading.vue'
import DoubleCheck from '@/components/DoubleCheck.vue'
import Message from '@/components/Message.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { storeToRefs } from 'pinia';
import { useAdminStore } from '@/stores/adminStore.js'
const store = useAdminStore()
const { products, loadingIsOpen } = storeToRefs(store)
const { getProduct, openProductModal, pushMessage } = store

onMounted(() => {
  products.value = []
  loadingIsOpen.value = true
  setTimeout(() => {
    getProduct()
  }, 100)
})

const showConfirm = ref(false)
const confirmText = ref('')
const itemToDelete = ref(null)

function openDelete(item) {
  itemToDelete.value = item
  confirmText.value = `你確定要刪除${item.title}嗎?`
  showConfirm.value = true
}

async function delProduct() {
  let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/product/${itemToDelete.value.id}`
  try {
    const res = await axios.delete(apiPath)
    if (res.data.success) {
      showConfirm.value = false
      getProduct()
    }
    pushMessage(res.data.success, res.data.message)
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <DoubleCheck :text="confirmText" :show="showConfirm" @cancel="showConfirm = false" @confirm="delProduct" />

  <div class="flex justify-end mb-5">
    <button @click="openProductModal(true)" class="btn-dark">新增商品</button>
  </div>
  <div class="w-full text-left">
    <div class="font-bold border-b hidden lg:flex">
      <div class="w-28">商品</div>
      <div class="flex flex-1 gap-2">
        <div class="w-[250px]"></div>
        <div class=" flex-1">售價</div>
        <div class=" flex-1">狀態</div>
      </div>
      <div class="w-46"></div>
    </div>

    <div class="w-full p-10 text-center" v-if="loadingIsOpen">
      <Loading />
    </div>

    <div class="flex flex-wrap gap-4" v-else>
      <div class="border-b border-gray-300 flex flex-wrap  gap-8  px-0 py-4 w-full flex-col lg:gap-0 md:flex-row"
        v-for="item in products" :key="item.id">
        <div class="flex flex-1">
          <div class=" w-28"> <img :src="item.imageUrl" alt="" class="w-20 h-20 object-cover" /></div>
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
        <div class="w-auto flex justify-end gap-5 items-center lg:w-46">
          <button class="font-semibold btn-white" @click="openProductModal(false, item)">編輯</button>
          <button class="font-semibold btn-white" @click="openDelete(item)">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>