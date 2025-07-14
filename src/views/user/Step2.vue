<script setup>
// import InlineLoading from '@/components/InlineLoading.vue'
import BaseInput from '@/components/BaseInput.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { isInlineLoading, isFullLoading } = storeToRefs(globalStore)
const { pushMessage } = globalStore
import { useUserStore } from '@/stores/userStore.js'
const userStore = useUserStore()
const { step } = storeToRefs(userStore)
const { } = userStore

const cart = ref([])
const total = ref(0)

const information = ref({
    name: '',
    phone: null,
    email: '',
    delivery: '',
    city: '',
    area: '',
    address: '',
    pay: '',
    cardNumber: null,
    validDate: '',
    securityCode: null
})
onMounted(() => {
    step.value = 2
    // isInlineLoading.value = true
    // getProduct()
})

// [API]: /api/:api_path/order
// [方法]: post
// [說明]: 建立訂單後會把所選的購物車資訊刪除, user 物件為必要
//        name(String)、email(String)、tel(String)、address(String) 為必填欄位
// [參數]: @api_path: 'thisismycourse2'
//     {
//       "data": {
//         "user": {
//           "name": "test",
//           "email": "test@gmail.com",
//           "tel": "0912346768",
//           "address": "kaohsiung"
//         },
//         "message": "這是留言"
//       }
//     }
// [成功回傳]:
// 	{
//         "success": true,
//         "message": "已建立訂單",
//         "total": 100,
//         "create_at": 1523539519,
//         "orderId": "-L9tH8jxVb2Ka_DYPwng"
//     }
</script>

<template>


    <div class="ani-fade flex flex-col gap-5 md:flex-row">
        <div class="flex-2 flex flex-col gap-10">
            <div>
                <div class="font-bold mb-2 text-lg">基本資料</div>
                <div class="bg-white shadow-md p-10 space-y-8">
                    <BaseInput :inputType="'text'" v-model="information.name" :id="'name'" :placeholder="'姓名'"
                        :description="'姓名'" />
                    <BaseInput :inputType="'text'" v-model="information.phone" :id="'phone'" :placeholder="'電話'"
                        :description="'電話'" />
                    <BaseInput :inputType="'text'" v-model="information.email" :id="'email'" :placeholder="'Email '"
                        :description="'Email '" />
                </div>
            </div>
            <div>
                <div class="font-bold mb-2 text-lg">寄送方式</div>
                <div class="bg-white shadow-md p-10 space-y-8">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="delivery" v-model="information.delivery" value="宅配" class="w-4 h-4">
                        <span>宅配</span>
                    </label>
                    <div v-if="information.delivery == '宅配'">
                        <div class="flex gap-5">
                            <BaseInput :inputType="'text'" v-model="information.city" :id="'city'" :placeholder="'縣市'"
                                :description="'縣市'" class="flex-1" />
                            <BaseInput :inputType="'text'" v-model="information.area" :id="'area'" :placeholder="'地區'"
                                :description="'地區'" class="flex-1" />
                        </div>
                        <BaseInput :inputType="'text'" v-model="information.address" :id="'address'" :placeholder="'地址'"
                            :description="'地址'" class="mt-2" />
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
                <div class="bg-white shadow-md p-10 space-y-8">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="card" v-model="information.pay" value="信用卡" class="w-4 h-4">
                        <span>信用卡</span>
                    </label>
                    <div v-if="information.pay == '信用卡'">
                        <BaseInput :inputType="'text'" v-model="information.cardNumber" :id="'cardNumber'"
                            :placeholder="'卡號'" :description="'卡號'" class="mb-2" />
                        <div class="flex gap-5">
                            <BaseInput :inputType="'text'" v-model="information.validDate" :id="'validDate'"
                                :placeholder="'有效日期'" :description="'有效日期'" class="flex-1" />
                            <BaseInput :inputType="'text'" v-model="information.securityCode" :id="'securityCode'"
                                :placeholder="'安全碼'" :description="'安全碼'" class="flex-1" />
                        </div>

                    </div>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="delivery" v-model="information.pay" value="貨到付款" class="w-4 h-4">
                        <span>貨到付款</span>
                    </label>
                </div>
            </div>
        </div>

        <div class="flex-1">
            <div class="sticky top-25">
                <div class="font-bold mb-2 text-lg">結帳明細{{information.pay}}</div>
                <div class="bg-white shadow-md p-5 flex flex-col items-end gap-5">
                    <div class="w-full border-b border-gray-200">
                        <div class="flex justify-between my-2">
                            <div>原價總金額</div>
                            <div class="font-bold">NT$ 1200</div>
                        </div>
                        <div v-if="information.pay=='宅配'" class="flex justify-between my-2">
                            <div>宅配運費</div>
                            <div class="font-bold">+ NT$ 70</div>
                        </div>
                    </div>

                    <div><span class="font-bold">總計</span><span class="ml-1 font-bold text-xl text-[#3F88B4]">NT$
                            123</span>
                    </div>
                    <RouterLink :to="{ name: 'user-checkout-step3' }" class="bg-[#85B1CA] text-white px-6 py-2 w-fit">
                        下一步
                    </RouterLink>
                </div>
            </div>

        </div>
    </div>


</template>

<style scoped>
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