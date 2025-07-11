<script setup>
import BaseLayout from '@/components/user/BaseLayout.vue'
import ProductCard from '@/components/user/ProductCard.vue'
import { storeToRefs } from 'pinia';
// import { useGlobalStore } from '@/stores/globalStore.js'
// const globalStore = useGlobalStore()
// const { isInlineLoading } = storeToRefs(globalStore)
import { useUserStore } from '@/stores/userStore.js'
const userStore = useUserStore()
const { favoriteId, product } = storeToRefs(userStore)
// const { getProduct } = userStore
import { ref, onMounted, computed } from 'vue'
// import axios from 'axios'
const favoriteProduct = computed(() => product.value.filter(item => favoriteId.value.includes(item.id)))
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
    <BaseLayout :title="'FAVORITES'">

            <div v-if="favoriteProduct.length > 0" class="ani-fade flex flex-wrap gap-5 justify-center sm:justify-start">
                <ProductCard :product="favoriteProduct" :page="'favorite'" />
            </div>
            <div v-else class="flex flex-col gap-7 justify-center items-center ani-fade">
                <div class="text-[#85B1CA]">目前沒有任何商品</div>
                <RouterLink :to="{ name: 'user-product' }"
                    class="w-fit  border border-[#3F88B4] px-6 py-2 transition text-white bg-[#3F88B4] hover:text-[#3F88B4] hover:bg-white">
                    購物去</RouterLink>
            </div>
    </BaseLayout>
</template>
