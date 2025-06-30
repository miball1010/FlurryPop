<script setup>
import Navbar from '@/components/admin/Navbar.vue'
import ProductModal from '@/components/admin/ProductModal.vue'
</script>

<template>
    <Navbar />
    <ProductModal />
    <div class="bg-gray-100 min-h-screen w-full relative pb-50">
        <div class="w-full bg-[url('images/bg-2.jpg')] h-70 bg-cover bg-[position:center_40%] absolute">
        </div>
        <div class="bg-white w-[90%] max-w-[1330px] relative z-2 top-30 mx-auto rounded-lg p-10 shadow-md">
            <RouterView></RouterView>
        </div>
    </div>
</template>

<style scoped></style>