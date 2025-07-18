<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore.js'
const userStore = useUserStore()
const { favoriteId } = storeToRefs(userStore)
const { addFavorite, addCart } = userStore
import { useUtils } from '@/composables/useUtils.js'
const { currency, imgPath } = useUtils()

const props = defineProps(['product', 'page'])

function moreProduct(id) {
    router.push(`/product/${id}`)
}

</script>
<template>
    <div :class="page" class="bg-white p-2 sm:p-5" v-for="item in product">
        <!-- 圖片 -->
        <div @click="moreProduct(item.id)" class="w-full pt-[100%] relative overflow-hidden">
            <img :src="item.imageUrl" alt="" class="ice-img">
        </div>

        <!-- 標題 -->
        <div class="font-bold mt-2 sm:mt-3 mb-1 sm:mb-5 text-sm sm:text-lg">
            {{ item.title }}
        </div>
        <div class="flex justify-between">
            <!-- 價錢 -->
            <div class="font-bold text-[#3F88B4]">{{ currency(item.price) }}$</div>

            <div v-if="item.category != 'store'" class="gap-3 items-center hidden sm:flex">
                <!-- 我的最愛 -->
                <button @click="addFavorite(item.id)"
                    class="cursor-pointer transition duration-300 hover:scale-110"><img
                        :src="`${favoriteId.indexOf(item.id) != -1 ? `${imgPath}heart-solid-red-icon.svg` : `${imgPath}heart-hollow-red-icon.svg`}`"
                        alt="" class="h-5.5"></button>

                <!-- 加入購物車 -->
                <button @click="addCart(item.id, 1)" class="cursor-pointer transition duration-300 hover:scale-110"><img
                        src="/images/cart-hollow-icon.svg" alt="" class="h-6"></button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.home {
    box-shadow: 0 0 10px #85b1ca34;
    margin-right: 20px;
    min-width: 300px;
}

.product {
    border: 1px solid #D9D9D9;
    width: calc((100% - 20px*2)/3);
}

.favorite {
    border: 1px solid #D9D9D9;
    width: calc((100% - 20px*3)/4);
}

.ice-img {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translateX(-50%);
    transition: transform 0.3s ease;
}

.ice-img:hover {
    transform: translateX(-50%) scale(1.1);
}

@media screen and (max-width:1260px) {

    .favorite {
        width: calc((100% - 20px*2)/3);
    }
}

@media screen and (max-width:1170px) {
    .product {
        width: calc((100% - 20px)/2);
        /* width: 50%; */
    }
}

@media screen and (max-width:900px) {

    .favorite {
        width: calc((100% - 20px)/2);
    }
}

@media screen and (max-width:640px) {
    .product {
        width: calc((100% - 8px)/2);
        /* width: 100%; */
        max-width: 300px;
    }

    .favorite {
        width: 100%;
        max-width: 300px;
    }
}
</style>
