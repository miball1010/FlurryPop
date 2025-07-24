<script setup>
import BaseLayout from '@/components/user/BaseLayout.vue'
import InlineLoading from '@/components/InlineLoading.vue'
import ProductCard from '@/components/user/ProductCard.vue'
import { ref } from 'vue'
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore.js'
const userStore = useUserStore()
const { favoriteId, product } = storeToRefs(userStore)
const { getProduct, getFavorite } = userStore

const loading = ref(false)
onMounted(async () => {
    loading.value = true
    getFavorite()
    await getProduct()
    loading.value = false
})

const favoriteProduct = computed(() => product.value.filter(item => favoriteId.value.includes(item.id)))
</script>

<template>
    <BaseLayout :title="'FAVORITES'">
        <div class="w-full p-10 text-center" v-if="loading">
            <InlineLoading />
        </div>
        <div v-else>
            <div v-if="favoriteProduct.length > 0"
                class="ani-fade flex flex-wrap gap-2 sm:gap-5 justify-start">
                <ProductCard :product="favoriteProduct" :page="'favorite'" />
            </div>
            <div v-else class="flex flex-col gap-4 sm:gap-7 justify-center items-center ani-fade">
                <div class="text-[#85B1CA] text-sm sm:text-base">目前沒有任何商品</div>
                <RouterLink :to="{ name: 'user-product' }"
                    class="btn transition text-white bg-[#3F88B4] hover:opacity-90">
                    購物去</RouterLink>
            </div>
        </div>
    </BaseLayout>
</template>
