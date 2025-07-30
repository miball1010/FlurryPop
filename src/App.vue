<script setup>
import FullScreenLoading from '@/components/FullScreenLoading .vue'
import Message from '@/components/Message.vue'
import DoubleCheck from '@/components/DoubleCheck.vue'
import { onMounted } from 'vue'
const preloadImage = (src) => {
    const img = new Image()
    img.src = src
}

onMounted(()=>{
  preloadImage('/images/bg-2.jpg')
})
</script>

<template>
  <FullScreenLoading />
  <Message />
  <DoubleCheck />
  <RouterView />
</template>

<style scoped></style>
