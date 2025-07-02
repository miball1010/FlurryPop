<script setup>
import Navbar from '@/components/admin/Navbar.vue'
import ProductModal from '@/components/admin/ProductModal.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useAdminStore } from '@/stores/adminStore.js'
const store = useAdminStore()
const { checkLogin } = store
import { onMounted } from 'vue'

onMounted(async () => {
  const isLoggedIn = await checkLogin()
  if (!isLoggedIn) {
    console.log("未登入")
    router.push({ path: "/login" })
  } else {
    console.log("已登入")
  }
})
</script>

<template>
    <Navbar />
    <ProductModal />
    <div class="bg-gray-100 min-h-screen w-full relative pb-35 sm:pb-50">
        <div class="w-full bg-[url('images/bg-2.jpg')] h-70 bg-cover bg-[position:center_40%] absolute">
        </div>
        <div class="bg-white w-[90%] max-w-[1330px] relative z-2 top-25 mx-auto rounded-lg p-5 shadow-md sm:p-10 sm:top-30">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<style scoped></style>