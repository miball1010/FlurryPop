<script setup>
import Navbar from '@/components/user/Navbar.vue'
import SiteFooter from '@/components/user/Footer.vue'
</script>

<template>
    <Navbar />
    <router-view></router-view>
    <SiteFooter />
</template>

<style scoped>
</style>
