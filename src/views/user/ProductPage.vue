<script setup>
import BaseLayout from '@/components/user/BaseLayout.vue'
import InlineLoading from '@/components/InlineLoading.vue'
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
const route = useRoute()
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { isInlineLoading } = storeToRefs(globalStore)
import { useUserStore } from '@/stores/userStore.js'
const userStore = useUserStore()
const { favoriteId, addLoading } = storeToRefs(userStore)
const { addFavorite, addCart, share } = userStore
import { useUtils } from '@/composables/useUtils.js'
const { currency, imgPath } = useUtils()
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-fade'
import "swiper/css/thumbs"
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import { Thumbs, Navigation, FreeMode } from 'swiper/modules'
const modules = [FreeMode, Navigation, Thumbs]

const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper) => {
    thumbsSwiper.value = swiper
}

const productId = route.params.productId
const product = ref({})
const notice = ref(1)
onMounted(() => {
    isInlineLoading.value = true
    getProduct()
})

async function getProduct() {
    let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/product/${productId}`
    try {
        const res = await axios.get(apiPath)
        product.value = res.data.product
    } catch (err) {
        console.error(err)
    }
    finally {
        isInlineLoading.value = false
    }
}

const number = ref(1)

function increase() {
    if (number.value < 151)
        number.value++
}

function decrease() {
    if (number.value > 1)
        number.value--
}

watch(number, () => {
    if (number.value < 1)
        number.value = 1
})

async function handleAddCart() {
    try {
        await addCart(product.value.id, number.value)
        number.value = 1
    }
    catch {
    }
}
</script>

<template>
    <BaseLayout :title="'PRODUCT'">
        <div class="w-full p-10 text-center" v-if="isInlineLoading">
            <InlineLoading />
        </div>
        <div v-else class="ani-fade">
            <!-- 麵包屑 -->
            <div class="hidden sm:block text-[#85B1CA] text-xs sm:text-sm">
                <RouterLink :to="{ name: 'user-product' }" class="hover:underline">所有商品</RouterLink> / {{ product.title
                }}
            </div>

            <!-- 商品 -->
            <div class="flex gap-8 mt-0 sm:mt-2 flex-col md:flex-row lg:gap-12">
                <div class="w-full lg:w-[calc((100%-48px)/2)]">
                    <div class="hidden md:block">
                        <img :src="product.imageUrl" alt="">
                        <img :src="item" alt="" v-for="item in product.imagesUrl">
                    </div>

                    <div class="block md:hidden" v-if="product.imagesUrl">
                        <!-- 主要圖片 -->
                        <swiper :loop="false" :spaceBetween="10" :thumbs="{ swiper: thumbsSwiper }" :modules="modules"
                            class="mySwiper1">
                            <swiper-slide>
                                <img :src="product.imageUrl" loading="lazy">
                            </swiper-slide>
                            <swiper-slide v-for="item in product.imagesUrl">
                                <img :src="item" loading="lazy" />
                            </swiper-slide>
                        </swiper>

                        <!-- 下面的按鈕 -->
                        <swiper @swiper="setThumbsSwiper" :loop="false" :spaceBetween="10" :slidesPerView="4"
                            :direction="'horizontal'" :freeMode="true" :watchSlidesProgress="true" :modules="modules"
                            class="mySwiper2">
                            <swiper-slide>
                                <img :src="product.imageUrl" loading="lazy" class="slider-img" />
                            </swiper-slide>
                            <swiper-slide v-for="item in product.imagesUrl">
                                <img :src="item" loading="lazy" class="slider-img" />
                            </swiper-slide>
                        </swiper>
                    </div>
                    <div class="block md:hidden" v-else>
                        <img :src="product.imageUrl" alt="">
                    </div>
                </div>
                <div class="w-full lg:w-[calc((100%-48px)/2)] relative">
                    <div class="sticky top-27">
                        <div class="absolute top-1 right-0 flex gap-3">
                            <button @click="addFavorite(product.id)"
                                class="cursor-pointer transition duration-300 hover:scale-110"><img
                                    :src="`${favoriteId.indexOf(product.id) != -1 ? `${imgPath}heart-solid-red-icon.svg` : `${imgPath}heart-hollow-red-icon.svg`}`"
                                    alt="" class="h-5.5"></button>
                            <button @click="share" class="cursor-pointer transition duration-300 hover:scale-110"><img
                                    src="/images/share-icon.svg" alt="" class="h-5.5"></button>
                        </div>
                        <div class="text-base sm:text-2xl font-bold">{{ product.title }}</div>
                        <div class="text-lg sm:text-xl font-bold text-[#3F88B4] mt-1 sm:mt-5">NT$ {{
                            currency(product.price) }}</div>
                        <div
                            class="text-xs sm:text-sm border-l-5 border-[#BFD6E4]  bg-[#F3F3F3] p-4 sm:p-5 text-justify mt-5 sm:mt-7">
                            {{ product.description }}
                        </div>
                        <div class="mt-5 font-bold text-sm sm:text-base">主成分</div>
                        <div class="text-sm sm:text-base">{{ product.content }}</div>
                        <div class="flex w-full mt-7">
                            <button @click="decrease"
                                :class="number > 1 ? 'cursor-pointer hover:bg-gray-100' : 'bg-gray-100'"
                                class=" w-10 aspect-square border border-gray-200 text-center">-</button>
                            <input type="number" v-model.number.lazy="number"
                                class="flex-1 border-t border-b border-gray-200 text-center outline-none" />
                            <button @click="increase"
                                class="cursor-pointer hover:bg-gray-100 w-10 aspect-square border border-gray-200 text-center">+</button>
                        </div>

                        <button @click="handleAddCart" :disabled="addLoading"
                            :class="addLoading ? 'bg-gray-400' : 'cursor-pointer bg-[#3F88B4] hover:opacity-90'"
                            class="text-sm sm:text-base w-full text-white p-3 text-center mt-3 transition">加入購物車
                        </button>
                        <!-- text-white bg-[#3F88B4] hover:text-[#3F88B4] hover:bg-white -->
                    </div>

                </div>
            </div>

            <!-- 注意事項 -->
            <div class="mt-10">
                <div class="border-b border-b-gray-200 mb-5 flex space-x-1">
                    <button @click="notice = 1"
                        :class="notice == 1 ? 'text-[#3F88B4] border-b-4 border-b-[#3F88B4] ' : 'cursor-pointer border-b-2 border-b-transparent hover:opacity-80'"
                        class="text-sm sm:text-base px-4 py-2 transition mb-[-1px]">
                        購買須知
                    </button>
                    <button @click="notice = 2"
                        :class="notice == 2 ? 'text-[#3F88B4] border-b-4 border-b-[#3F88B4]' : 'cursor-pointer border-b-2 border-b-transparent hover:opacity-80'"
                        class="text-sm sm:text-base px-4 py-2 transition mb-[-1px]">
                        退換貨須知
                    </button>
                </div>

                <div :class="notice == 1 ? 'block ani-fade' : 'hidden opacity-0'">
                    <ul class="text-xs sm:text-sm list-disc pl-5 space-y-2 text-justify">
                        <li>可於 Flurry Pop 官方網站選購冰品，提供<strong>宅配</strong>與<strong>門市自取</strong>兩種方式。建議提前下單以保留心儀風味。</li>
                        <li>我們採用<strong>黑貓冷凍宅配</strong>，全程低溫出貨，僅限<strong>台灣本島</strong>配送。出貨時間為付款後<strong>3–5
                                個工作天</strong>，特殊節日另行公告。</li>
                        <li>門市提供預訂自取服務，請於結帳時選擇<strong>「門市自取」</strong>，並備註取貨時間。完成付款後，商品將為您保留<strong>2 日</strong>。</li>
                        <li>冰品請於收到後<strong>立即放入冷凍（建議 -18°C 以下）</strong>。天然原料製作，不含防腐劑，建議於<strong>兩週內食用完畢</strong>，風味最佳。
                        </li>
                        <li>所有商品為冷凍保存之食品，因拍攝及顯示器差異，顏色與實品可能略有不同。產品外觀與裝飾可能因批次略有差異，敬請見諒。</li>
                    </ul>
                </div>
                <div :class="notice == 2 ? 'block ani-fade' : 'hidden opacity-0'">
                    <ul class="text-xs sm:text-sm list-disc pl-5 space-y-2 text-justify">
                        <li>因本商品為食品類冷凍商品，依《消費者保護法》第19條及《通訊交易解除權合理例外情事適用準則》，<strong>不適用 7 日鑑賞期規範</strong>。</li>
                        <li>商品經拆封、退冰、食用或因消費者保存不當導致變質，<strong>恕不接受退換貨</strong>。</li>
                        <li>若您收到商品時發現有誤、缺件或瑕疵，請於<strong>到貨後 24 小時內</strong>，透過官方聯絡管道與我們聯繫，並提供相關照片與訂單資訊，我們將盡快為您處理。</li>
                        <li>退換貨商品請保持原包裝完整（含外箱、配件、發票），以便後續作業。</li>
                        <li>如因個人因素（如：無人收貨、填寫錯誤地址、臨時更改心意）導致配送失敗或退件，<strong>將無法提供補寄或退款</strong>，敬請理解。</li>
                    </ul>
                </div>
            </div>
        </div>
    </BaseLayout>
</template>
<style scoped>
.slider-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    cursor: pointer;
    transition: 0.3s;
}

.slider-img:hover {
    transform: scale(1.1);
}



input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type=number] {
    -moz-appearance: textfield;
}
</style>