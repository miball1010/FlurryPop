<script setup>
import Navbar from '@/components/admin/Navbar.vue'
import ProductModal from '@/components/admin/ProductModal.vue'
import OrderModal from '@/components/admin/OrderModal.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useAdminStore } from '@/stores/adminStore.js'
const adminStore = useAdminStore()
const { checkLogin } = adminStore

onMounted(async () => {
  const isLoggedIn = await checkLogin()
  if (!isLoggedIn) 
    router.push({ path: "/login" })
})
</script>

<template>
  <Navbar />
  <ProductModal />
  <OrderModal />
  <div class="bg-gray-100 min-h-screen w-full relative pb-35 sm:pb-50">
    <div class="w-full bg-[url('images/bg-2.jpg')] h-70 bg-cover bg-[position:center_40%] absolute">
    </div>
    <div
      class="bg-white w-[90%] max-w-[1330px] relative z-[2] top-25 sm:top-30 mx-auto rounded-lg p-5 sm:p-10 shadow-md">
      <RouterView></RouterView>
    </div>
  </div>
</template>