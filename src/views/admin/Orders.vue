<script setup>
import InlineLoading from '@/components/InlineLoading.vue'
import { onMounted, computed, ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { isInlineLoading } = storeToRefs(globalStore)
const { currency, date } = globalStore
import { useAdminStore } from '@/stores/adminStore.js'
const adminStore = useAdminStore()
const { orders } = storeToRefs(adminStore)
const { getOrder, openOrderModal } = adminStore

onMounted(() => {
    orders.value = []
    isInlineLoading.value = true
    setTimeout(async () => {
        await getOrder()
        console.log(orders.value)
    }, 100)

})

const status = ref('all')
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

// function toLocaleDateString(date) {
//   return new Date(date).toLocaleDateString('zh-TW')
// }


</script>

<template>
    <div class="flex gap-5 mb-5">
        <button @click="status = 'all'" :class="status == 'all' ? 'btn-dark' : 'btn-white'">ALL</button>
        <button @click="status = 'home'" :class="status == 'home' ? 'btn-dark' : 'btn-white'">宅配</button>
        <button @click="status = 'shop'" :class="status == 'shop' ? 'btn-dark' : 'btn-white'">店取</button>
    </div>
    <div class="w-full text-left">
        <div class="font-bold border-b hidden gap-4 lg:flex">
            <div class="basis-1/6">購買時間</div>
            <div class="basis-1/6">Email</div>
            <div class="basis-1/6 min-w-40">購買款項</div>
            <div class="basis-1/12">應付</div>
            <div class="basis-1/12">付款</div>
            <div class="basis-1/12">寄送</div>
            <div class="basis-1/12">出貨</div>
            <div class="w-21"></div>
        </div>

        <div class="w-full p-10 text-center" v-if="isInlineLoading">
            <InlineLoading />
        </div>

        <div class="flex flex-wrap gap-4" v-else>
            <div class="border-b border-gray-300 flex flex-wrap lg:flex-nowrap gap-4 py-4 w-full"
                v-for="item in filterOrder" :key="item.id">

                <div class="basis-1/6">{{ date(item.create_at) }}</div>
                <div class="basis-1/6">{{ item.user.email }}</div>
                <div class="basis-1/6 min-w-40">
                    <div v-for="i in item.products" :key="i.id">
                        {{ i.product.title }} x{{ i.qty }}
                    </div>
                </div>
                <div class="basis-1/12">{{ currency(item.total) }}$</div>
                <div class="basis-1/12">{{ item.is_paid ? '已付款' : '未付款' }}</div>
                <div class="basis-1/12">
                    {{ item.user.address == '實體店取貨' ? '店取' : '宅配' }}
                </div>
                <div class="basis-1/12">未出貨</div>
                <div class="min-w-21">
                    <button class="font-semibold btn-white" @click="openOrderModal(item)">詳細</button>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped></style>