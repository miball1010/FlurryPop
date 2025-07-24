<script setup>
import BaseInput from '@/components/BaseInput.vue'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import { useUtils } from '@/composables/useUtils.js'
const { currency } = useUtils()
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore.js'
const userStore = useUserStore()
const { step, total, freight } = storeToRefs(userStore)
const { getProduct, getCheckProduct, checkOrder } = userStore

onMounted(async () => {
    step.value = 2
    await getProduct()
    await getCheckProduct()
    if (total.value == 0)
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

function test() {
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

const formattedCardNumber= computed({
    get() {
        return information.value.cardNumber.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim()
    },
    set(val) {
        information.value.cardNumber = val.replace(/\D/g, '').slice(0, 16)
    }
})

const formattedValidDate = computed({
    get() {
        let val = information.value.validDate.replace(/\D/g, '').slice(0, 4)
        if (val.length <= 2) return val
        return val.slice(0, 2) + '/' + val.slice(2)
    },
    set(val) {
        information.value.validDate = val.replace(/\D/g, '').slice(0, 4)
    }
})
</script>

<template>
    <div class="relative py-5 top-55 w-[90%] max-w-[1050px] mx-auto sm:py-0 sm:top-90">
        <div class="ani-fade flex flex-col gap-5 lg:flex-row">
            <div class="flex-2 flex flex-col gap-7 sm:gap-10">
                <div>
                    <div class="font-bold mb-2 text-base sm:text-lg">基本資料</div>
                    <button @click="test">test</button>
                    <div class="bg-white shadow-md p-4 sm:p-5 space-y-5 sm:p-10 sm:space-y-8">

                        <!-- <input :value="displayValue" @input="handleInput" class="border p-2 font-mono tracking-widest"
                            maxlength="9" />
                        {{ displayValue }} -->


                        <BaseInput :inputType="'text'" v-model="information.name" :id="'name'" :placeholder="''"
                            :description="'姓名'" />
                        <BaseInput :inputType="'text'" v-model="information.tel" :id="'tel'" :placeholder="'0912345678'"
                            :maxlength="10" :description="'手機號碼'" />
                        <BaseInput :inputType="'text'" v-model="information.email" :id="'email'"
                            :placeholder="'sample@gmail.com'" :description="'Email '" />
                    </div>
                </div>
                <div>
                    <div class="font-bold mb-2 text-base sm:text-lg">寄送方式</div>
                    <div class="bg-white shadow-md p-4 sm:p-5 space-y-5 sm:p-10 sm:space-y-8">
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
                    <div class="font-bold mb-2 text-base sm:text-lg">付款方式</div>
                    <div class="bg-white shadow-md p-4 sm:p-5 space-y-5 sm:p-10 sm:space-y-8">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="card" v-model="information.pay" value="信用卡" class="w-4 h-4">
                            <span>信用卡</span>
                        </label>
                        <div v-if="information.pay == '信用卡'">

                            <BaseInput :inputType="'text'" v-model="formattedCardNumber" :id="'cardNumber'" :maxlength="19"
                                :placeholder="'0000 0000 0000 0000'" :description="'卡號'" class="mb-2" />
                            <div class="flex gap-5">
                                     <BaseInput :inputType="'text'" v-model="formattedValidDate" :id="'validDate'"
                                    :maxlength="5" :placeholder="'MM/YY'" :description="'有效日期'" class="flex-1" />

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
                    <div class="bg-white shadow-md p-4 sm:p-5 flex items-end flex-col gap-5">
                        <div class="w-full border-b border-gray-200">
                            <div class="flex justify-between my-2 items-center">
                                <div class="text-sm sm:text-base">總金額</div>
                                <div class="">NT$ {{ currency(total) }}</div>
                            </div>
                            <div v-if="information.delivery == '宅配'" class="flex items-center justify-between my-2">
                                <div class="text-sm sm:text-base">宅配運費</div>
                                <div class="font-bold">+ NT$ {{ freight.price }}</div>
                            </div>
                        </div>

                        <div><span class="font-bold text-sm sm:text-base">總計</span><span
                                class="ml-1 font-bold text-lg sm:text-xl text-[#3F88B4]">NT$
                                {{ currency(finalTotal) }}</span>
                        </div>
                        <div class="flex gap-5">
                            <RouterLink :to="{ name: 'user-checkout-step1' }"
                                class="btn bg-gray-300 text-white transition hover:opacity-90">
                                上一步
                            </RouterLink>
                            <button @click="getOrder"
                                class="btn bg-[#85B1CA] text-white transition hover:opacity-90">下一步</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>