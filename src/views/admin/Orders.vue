<script setup>
import InlineLoading from '@/components/InlineLoading.vue'
import { onMounted, computed, ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { isInlineLoading } = storeToRefs(globalStore)
const { } = globalStore
import { useAdminStore } from '@/stores/adminStore.js'
const adminStore = useAdminStore()
const { orders, pagination, productCount } = storeToRefs(adminStore)
const { getOrder, openOrderModal, loadMore } = adminStore
import { useUtils } from '@/composables/useUtils.js'
const { currency, date, imgPath } = useUtils()

onMounted(() => {
    isInlineLoading.value = true
    setTimeout(async () => {
        await getOrder()
    }, 100)

})

const status = ref('all')
const fade = ref(true)
const filterOrder = computed(() => {
    if (status.value == 'all')
        return orders.value
    if (status.value == 'home') {
        return orders.value.filter(i => i.user.address != '實體店取貨')
    }
    if (status.value == 'shop') {
        return orders.value.filter(i => i.user.address == '實體店取貨')
    }
})

function changeStatus(s) {
    fade.value = false
    status.value = s
    setTimeout(() => {
        fade.value = true
    }, 1)
}
async function Page(page) {
    console.log(page)
    // await getOrder(pagination.value.current_page++)
}
async function prePage() {
    console.log(123)
    await getOrder(pagination.value.current_page--)
}
async function nextPage() {
    await getOrder(pagination.value.current_page++)
}

</script>

<template>
    <div class="flex gap-3 sm:gap-5 mb-7 sm:mb-5">
        <button @click="changeStatus('all')" :class="status == 'all' ? 'btn-dark' : 'btn-white'">ALL</button>
        <button @click="changeStatus('home')" :class="status == 'home' ? 'btn-dark' : 'btn-white'">宅配</button>
        <button @click="changeStatus('shop')" :class="status == 'shop' ? 'btn-dark' : 'btn-white'">店取</button>
    </div>
    <div class="w-full text-left">
        <div class="w-full p-10 text-center" v-if="isInlineLoading">
            <InlineLoading />
        </div>

        <div v-else>
            <div :class="{ 'ani-fade': fade }" class="flex flex-wrap gap-4 opacity-0">
                <div v-for="item in filterOrder" :key="item.id" class=" w-[100%] lg:w-[calc((100%-16px)/2)] ">
                    <div class="border border-[#3F88B4] bg-[#3F88B4] flex justify-between p-3 items-center">
                        <div class="text-sm text-white">{{ date(item.create_at) }}</div>
                        <div class="text-xs sm:text-sm text-white">{{ item.id }}</div>
                    </div>
                    <div class="p-3 border border-gray-200 overflow-x-auto">
                        <div class="flex mb-4 items-center">
                            <div class="w-20 sm:w-25 text-sm sm:text-base">Email</div>
                            <div class="w-[calc(100%-100px)] font-bold">{{ item.user.email }}</div>
                        </div>
                        <div class="flex mb-4" :class="{ 'items-center': productCount < 2 }">
                            <div class="w-20 sm:w-25 text-sm sm:text-base">購買款項</div>
                            <div class="flex-1">
                                <div v-for="i in item.products" :key="i.id">
                                    {{ i.product.title }} x{{ i.qty }}
                                </div>
                            </div>
                        </div>
                        <div class="flex mb-4 items-center">
                            <div class="w-20 sm:w-25 text-sm sm:text-base">應付金額</div>
                            <div class="flex-1 font-bold">
                                NT$ {{ item.total }}
                            </div>
                        </div>
                        <div class="flex mb-4 items-center">
                            <div class="w-20 sm:w-25 text-sm sm:text-base">付款狀況</div>
                            <div class="flex-1 font-bold" :class="item.is_paid ? 'text-[#7DB14A]' : 'text-[#D8473A]'">
                                {{ item.is_paid ? '已付款' : '未付款' }}
                            </div>
                        </div>
                        <div class="flex mb-4 items-center">
                            <div class="w-20 sm:w-25 text-sm sm:text-base">寄送方式</div>
                            <div class="flex-1"> {{ item.user.address == '實體店取貨' ? '店取' : '宅配' }}</div>
                        </div>
                        <div class="flex mb-4 items-center">
                            <div class="w-20 sm:w-25 text-sm sm:text-base">出貨狀態</div>
                            <div class="flex-1 font-bold text-[#D8473A]">未出貨</div>
                        </div>
                        <div class="flex justify-end">
                            <button class="font-semibold btn-white" @click="openOrderModal(item)">詳細</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-5 flex gap-2 justify-center items-center">
                <button @click="prePage" :disabled="!pagination.has_pre"
                    :class="pagination.has_pre ? 'cursor-pointer hover:scale-110 opacity-60' : 'opacity-20'"
                    class="p-2 transition duration-3">
                    <img src="/images/arrow-small.svg" alt="" class="h-3 scale-[-1]">
                </button>

                <button @click="Page(i)" :disabled="pagination.current_page == i"
                    v-for="(i, index) in pagination.total_pages" :key="index"
                    :class="pagination.current_page == i ? 'text-[#3F88B4]' : 'cursor-pointer hover:underline'"
                    class="p-1 text-sm sm:text-base">{{ i }}
                </button>

                <button @click="nextPage" :disabled="!pagination.has_next"
                    :class="pagination.has_next ? 'cursor-pointer hover:scale-110 opacity-60' : 'opacity-20'"
                    class="p-2 transition duration-3">
                    <img src="/images/arrow-small.svg" alt="" class="h-3">
                </button>
            </div>
        </div>
    </div>
</template>
