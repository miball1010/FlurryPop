<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
import BaseInput from '@/components/BaseInput.vue'
import { ref, onMounted, computed } from 'vue'

import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore.js'
const userStore = useUserStore()
const { step, total, freight } = storeToRefs(userStore)
const { getCheckProduct, checkOrder } = userStore

onMounted(async () => {
    step.value = 2
    await getCheckProduct()
    if(total.value==0)
     router.push('/')
})

const information = ref({
    name: '',
    tel: '',
    email: '',
    delivery: '',
    city: '',
    area: '',
    address: '',
    pay: '',
    cardNumber: '',
    validDate: '',
    securityCode: ''
})

const finalTotal = computed(() => {
    return information.value.delivery == "宅配" ? total.value + freight.value.price : total.value
})


async function getOrder() {
    const res = await checkOrder(information.value)
    if (res)
        router.push('/checkout/step3')
}

function test(){
    information.value = {
    name: '測試A',
    tel: '0912345678',
    email: 'sample@gmail.com',
    delivery: '宅配',
    city: '台北市',
    area: '大安區',
    address: '信義路四段256號',
    pay: '貨到付款',
    cardNumber: '',
    validDate: '',
    securityCode: ''
}
}
</script>

<template>
    <div class="relative py-5 top-55 w-[90%] max-w-[1050px] mx-auto sm:py-0 sm:top-90">
        <div class="ani-fade flex flex-col gap-5 lg:flex-row">
            <div class="flex-2 flex flex-col gap-10">
                <div>
                    <div class="font-bold mb-2 text-lg">基本資料</div>
                    <button @click="test">test</button>
                    <div class="bg-white shadow-md p-5 space-y-5 sm:p-10 sm:space-y-8">
                        <BaseInput :inputType="'text'" v-model="information.name" :id="'name'" :placeholder="''"
                            :description="'姓名'" />
                        <BaseInput :inputType="'text'" v-model="information.tel" :id="'tel'" :placeholder="'0912345678'" :maxlength="10"
                            :description="'手機號碼'" />
                        <BaseInput :inputType="'text'" v-model="information.email" :id="'email'"
                            :placeholder="'sample@gmail.com'" :description="'Email '" />
                    </div>
                </div>
                <div>
                    <div class="font-bold mb-2 text-lg">寄送方式</div>
                    <div class="bg-white shadow-md p-5 space-y-5 sm:p-10 sm:space-y-8">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="delivery" v-model="information.delivery" value="宅配"
                                class="w-4 h-4">
                            <span>宅配</span>
                        </label>
                        <div v-if="information.delivery == '宅配'">
                            <div class="flex gap-5">
                                <BaseInput :inputType="'text'" v-model="information.city" :id="'city'" :placeholder="''"
                                    :description="'縣市'" class="flex-1" />
                                <BaseInput :inputType="'text'" v-model="information.area" :id="'area'" :placeholder="''"
                                    :description="'地區'" class="flex-1" />
                            </div>
                            <BaseInput :inputType="'text'" v-model="information.address" :id="'address'"
                                :placeholder="''" :description="'地址'" class="mt-2" />
                        </div>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="delivery" v-model="information.delivery" value="實體店取貨"
                                class="w-4 h-4">
                            <span>實體店取貨</span>
                        </label>
                    </div>
                </div>
                <div>
                    <div class="font-bold mb-2 text-lg">付款方式</div>
                    <div class="bg-white shadow-md p-5 space-y-5 sm:p-10 sm:space-y-8">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="card" v-model="information.pay" value="信用卡" class="w-4 h-4">
                            <span>信用卡</span>
                        </label>
                        <div v-if="information.pay == '信用卡'">
                            <BaseInput :inputType="'text'" v-model="information.cardNumber" :id="'cardNumber'"
                                :maxlength="16" :placeholder="'0000 0000 0000 0000'" :description="'卡號'" class="mb-2" />
                            <div class="flex gap-5">
                                <BaseInput :inputType="'text'" v-model="information.validDate" :id="'validDate'"
                                    :maxlength="4" :placeholder="'MM/YY'" :description="'有效日期'" class="flex-1" />
                                <BaseInput :inputType="'text'" v-model="information.securityCode" :id="'securityCode'"
                                    :maxlength="3" :placeholder="'CVC'" :description="'安全碼'" class="flex-1" />
                            </div>
                        </div>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="pay" v-model="information.pay" value="貨到付款" class="w-4 h-4">
                            <span>貨到付款</span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="flex-1">
                <div class="sticky top-25">
                    <div class="font-bold mb-2 text-lg hidden lg:block">結帳明細</div>
                    <div class="bg-white shadow-md p-5 flex items-end flex-col gap-5">
                        <div class="w-full border-b border-gray-200">
                            <div class="flex justify-between my-2">
                                <div>總金額</div>
                                <div class="font-bold">NT$ {{ total }}</div>
                            </div>
                            <div v-if="information.delivery == '宅配'" class="flex justify-between my-2">
                                <div>宅配運費</div>
                                <div class="font-bold">+ NT$ {{ freight.price }}</div>
                            </div>
                        </div>

                        <div><span class="font-bold">總計</span><span class="ml-1 font-bold text-xl text-[#3F88B4]">NT$
                                {{ finalTotal }}</span>
                        </div>
                        <div class="flex gap-5">
                            <RouterLink :to="{ name: 'user-checkout-step1' }"
                                class="bg-gray-300 text-white px-6 py-2 w-fit transition hover:opacity-90">
                                上一步
                            </RouterLink>
                            <button @click="getOrder"
                                class="cursor-pointer bg-[#85B1CA] text-white px-6 py-2 w-fit transition hover:opacity-90">下一步</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>