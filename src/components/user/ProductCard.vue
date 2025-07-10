<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore.js'
const userStore = useUserStore()
const { favorite } = storeToRefs(userStore)
const { addFavorite, addCart } = userStore

const props = defineProps(['product', 'page'])

function moreProduct(id) {
    router.push(`/product/${id}`)
}

</script>
<template>
    <div :class="page" class="bg-white p-5" v-for="item in product">
        <div @click="moreProduct(item.id)" class="w-full pt-[100%] relative overflow-hidden">
            <img :src="item.imageUrl" alt="" class="ice-img ">
        </div>
        <div class="font-bold mt-3 mb-5 text-lg">
            {{ item.title }}
        </div>
        <div class="flex justify-between">
            <div class="font-bold text-[#3F88B4]">NT$ {{ item.price }}</div>
            <div class="flex gap-3 items-center">
                <button @click="addFavorite(item.id)"
                    class="cursor-pointer transition duration-300 hover:scale-110"><img
                        :src="`${favorite.indexOf(item.id) != -1 ? '/images/heart-solid-red-icon.svg' : '/images/heart-hollow-red-icon.svg'}`"
                        alt="" class="h-5.5"></button>
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
    max-width: 300px;
}

.ice-img {
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 100%;
    height: auto;
    transform: translateX(-50%);
    transition: transform 0.3s ease;
}

.ice-img:hover {
    transform: translateX(-50%) scale(1.1);
}

@media screen and (max-width:1170px) {
    .product {
        width: calc((100% - 20px)/2);
    }
}

@media screen and (max-width:570px) {
    .product {
        width: 100%;
    }
}
</style>
