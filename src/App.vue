<script setup>
import FullScreenLoading from '@/components/FullScreenLoading .vue'
import Message from '@/components/Message.vue'
import DoubleCheck from '@/components/DoubleCheck.vue'
</script>

<template>
  <FullScreenLoading />
  <Message />
  <DoubleCheck />
  <RouterView />
</template>

<style scoped></style>
