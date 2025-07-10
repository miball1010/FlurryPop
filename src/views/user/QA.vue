<script setup>
import BaseLayout from '@/components/user/BaseLayout.vue'
// import { ref,onMounted } from 'vue'
// import axios from 'axios'

// const cart=ref([])
// onMounted(() => {
//     getProduct()
// })
// async function getProduct() {
//     let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/cart`
//     try {
//         const res = await axios.get(apiPath)
//         console.log(res.data.data)
//         cart.value = res.data.data.carts
//     } catch (err) {
//         console.error(err)
//     }
//     finally {
//         //   global.isInlineLoading = false
//     }
// }
</script>

<template>
    <BaseLayout :title="'Q&A'">
    </BaseLayout>


</template>
