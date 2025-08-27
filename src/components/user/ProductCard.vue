<script setup>
import smallLoading from '@/components/smallLoading.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useUtils } from '@/composables/useUtils.js'
const { currency, imgPath } = useUtils()
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore.js'
const userStore = useUserStore()
const { favoriteId, activeProductId } = storeToRefs(userStore)
const { addFavorite, addCart } = userStore

const props = defineProps(['product', 'page'])

function moreProduct(id) {
  router.push(`/product/${id}`)
}

</script>
<template>
  <div :class="page" class="ice-box bg-white p-2 sm:p-5 cursor-pointer" @click="moreProduct(product.id)">
    <div class="relative pt-[100%] w-full overflow-hidden">
      <img :src="product.imageUrl" alt="product.title" class="ice-img" />
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
        <button @click="addFavorite(product.id, $event)" class="cursor-pointer transition duration-300 hover:scale-110">
          <img
            :src="`${favoriteId.indexOf(product.id) != -1 ? `${imgPath}heart-solid-red-icon.svg` : `${imgPath}heart-hollow-red-icon.svg`}`"
            alt="heart-icon" class="h-5.5" />
        </button>

        <button @click="addCart(product.id, 1, $event)" :disabled="activeProductId == product.id"
          class="flex items-center cursor-pointer transition duration-300 hover:scale-110">
          <img v-if="activeProductId != product.id" src="/images/cart-hollow-icon.svg" alt="cart-icon" class="h-6" />
          <smallLoading v-else />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  box-shadow: 0 0 10px #70a9ca34;
}

.product {
  border: 1px solid #d9d9d9;
  width: calc((100% - 20px * 2) / 3);
}

.favorite {
  border: 1px solid #d9d9d9;
  width: calc((100% - 20px * 3) / 4);
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

@media (hover: hover) {
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

@media screen and (max-width: 1260px) {
  .favorite {
    width: calc((100% - 20px * 2) / 3);
  }
}

@media screen and (max-width: 1170px) {
  .product {
    width: calc((100% - 20px) / 2);
  }
}

@media screen and (max-width: 1023px) {
  .product {
    width: calc((100% - 20px * 2) / 3);
  }
}

@media screen and (max-width: 900px) {
  .favorite {
    width: calc((100% - 20px) / 2);
  }
}

@media screen and (max-width: 800px) {
  .product {
    width: calc((100% - 20px) / 2);
  }
}

@media screen and (max-width: 639px) {
  .product {
    width: calc((100% - 8px) / 2);
    max-width: 300px;
  }

  .favorite {
    width: calc((100% - 8px) / 2);
    max-width: 300px;
  }
}
</style>
