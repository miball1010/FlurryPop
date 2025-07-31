<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import { useUtils } from '@/composables/useUtils.js'
const { currency, imgPath } = useUtils()
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore.js'
const userStore = useUserStore()
const { favoriteId,addLoading } = storeToRefs(userStore)
const { addFavorite, addCart } = userStore

const props = defineProps(['product', 'page'])

function moreProduct(id) {
    router.push(`/product/${id}`)
}
</script>
<template>
    <div :class="page" class="bg-white p-2 sm:p-5">

        <div @click="moreProduct(product.id)" class="ice-box">
            <img :src="product.imageUrl" alt="product.title" class="ice-img">
            <div class="ice-ifo">
                <div class="ice-ifo-text">詳細資訊</div>
            </div>
        </div>

        <div class="sm:font-bold mt-2 sm:mt-3 mb-1 sm:mb-5 text-sm sm:text-lg">
            {{ product.title }}
        </div>
        <div class="flex justify-between">

            <div class="font-bold text-[#3F88B4]">NT$ {{ currency(product.price) }}</div>

            <div v-if="product.category != 'store'" class="gap-3 products-center hidden sm:flex">

                <button @click="addFavorite(product.id)"
                    class="cursor-pointer transition duration-300 hover:scale-110"><img
                        :src="`${favoriteId.indexOf(product.id) != -1 ? `${imgPath}heart-solid-red-icon.svg` : `${imgPath}heart-hollow-red-icon.svg`}`"
                        alt="heart-icon" class="h-5.5"></button>

                <button @click="addCart(product.id, 1)" class="cursor-pointer transition duration-300 hover:scale-110"><img
                        src="/images/cart-hollow-icon.svg" alt="cart-icon" class="h-6"></button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.home {
    box-shadow: 0 0 10px #85b1ca34;
}

.product {
    border: 1px solid #D9D9D9;
    width: calc((100% - 20px*2)/3);
}

.favorite {
    border: 1px solid #D9D9D9;
    width: calc((100% - 20px*3)/4);
}

.ice-box {
    position: relative;
    padding-top: 100%;
    width: 100%;
    overflow: hidden;
    cursor: pointer;
}

.ice-img {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translateX(-50%);
    transition: 0.5s ease;
}

.ice-ifo {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: 0.5s;
}

.ice-ifo-text {
    color: white;
    position: relative;
    transform: translateY(50%);
    transition: 0;
    transition: 0.3s;
    transition-delay: 0.1s;
    opacity: 0;
    border: 1px solid white;
    padding: 10px 15px;
}

@media(hover:hover) {
    .ice-box:hover .ice-img {
        transform: translateX(-50%) scale(1.1);
    }

    .ice-box:hover .ice-ifo {
        opacity: 1;
    }

    .ice-box:hover .ice-ifo-text {
        transform: translateY(0);
        transition: 0.5s ease;
        transition-delay: 0.3s;
        opacity: 1;
    }
}

@media screen and (max-width:1260px) {

    .favorite {
        width: calc((100% - 20px*2)/3);
    }
}

@media screen and (max-width:1170px) {
    .product {
        width: calc((100% - 20px)/2);
    }
}

@media screen and (max-width:1023px) {
    .product {
        width: calc((100% - 20px*2)/3);
    }
}

@media screen and (max-width:900px) {

    .favorite {
        width: calc((100% - 20px)/2);
    }
}

@media screen and (max-width:800px) {
    .product {
        width: calc((100% - 20px)/2);
    }
}

@media screen and (max-width:639px) {
    .product {
        width: calc((100% - 8px)/2);
        max-width: 300px;
    }

    .favorite {
        width: calc((100% - 8px)/2);
        max-width: 300px;
    }
}
</style>
