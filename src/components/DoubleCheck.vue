<script setup>
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { confirm } = storeToRefs(globalStore)
import { useAdminStore } from '@/stores/adminStore.js'
const adminStore = useAdminStore()
const { delProduct, delOrder } = adminStore
</script>

<template>
<div class="bg-black/45 fixed w-full h-screen top-0 left-0 z-80 flex justify-center items-center"
     v-show="confirm.show">
  <transition name="fadeup">
    <div v-show="confirm.show" class="bg-white w-[90%] max-w-[400px] shadow-lg p-5">
      <div class="font-bold my-20 text-center text-lg text-[#D8473A]">{{ confirm.text }}</div>
      <div class="flex justify-end gap-5">
        <button class="font-semibold btn-white" @click="confirm.show = false">取消</button>
        <button v-if="confirm.type == 'product'" class="font-semibold btn-dark"
                @click="delProduct(confirm.item)">刪除</button>
        <button v-if="confirm.type == 'order'" class="font-semibold btn-dark"
                @click="delOrder(confirm.item)">刪除</button>
      </div>
    </div>
  </transition>
</div>
</template>