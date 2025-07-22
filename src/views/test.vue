<template>
  <button @click="showMessage">顯示訊息</button>
  <transition name="fade">
    <div v-if="visible" class="message-box">
      Hello! 這是一段測試訊息！
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)

function showMessage() {
  visible.value = true
  setTimeout(() => {
    visible.value = false
  }, 2000)
}
showMessage()
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.message-box {
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999;
  will-change: transform, opacity;
}
</style>
