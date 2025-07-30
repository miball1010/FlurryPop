<script setup>
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { isFullLoading } = storeToRefs(globalStore)
</script>

<template>
  <transition name="fade">
    <!-- bg-[#3F88B4] black/50 -->
    <div v-if="isFullLoading"
      class="fixed top-0 left-0 w-full h-screen bg-[#3F88B4] flex justify-center items-center z-70">
      <div class="flex flex-col items-center">
        <div class="relative w-15 h-15">
          <img src="/images/cake.svg" alt="" class="cake">
          <img src="/images/cake.svg" alt="" class="cake cake-second">
        </div>
        <div class="load-text text-white mt-2">Loading...</div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.cake {
  width: 100%;
  animation: scale 1.2s ease-in-out infinite;
  position: absolute;
  top: 0;
  left: 0;
}

.cake-second {
  animation-delay: 0.6s;
}

@keyframes scale {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: scale(1.2);
  }
}

.fade-enter-active {
  transition: none; /* 進場不要動畫 */
}

.fade-leave-active {
  transition: opacity 0.3s ease; /* 退場才淡出 */
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
/* 123 */
.fadeup-enter-active,
.fadeup-leave-active {
  transition: all 0.4s ease;
}

.fadeup-enter-from,
.fadeup-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
