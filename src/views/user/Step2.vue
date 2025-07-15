<script setup>
// import InlineLoading from '@/components/InlineLoading.vue'
import BaseInput from '@/components/BaseInput.vue'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { isInlineLoading, isFullLoading } = storeToRefs(globalStore)
const { pushMessage } = globalStore
import { useUserStore } from '@/stores/userStore.js'
const userStore = useUserStore()
const { step, total, freight } = storeToRefs(userStore)
const { getCheckProduct } = userStore


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
onMounted(async () => {
    step.value = 2
    // console.log(total.value)
    isInlineLoading.value = true
    await getCheckProduct()
})

const finalTotal = computed(() => {
    return information.value.delivery == "宅配" ? total.value + freight.value.price : total.value
})

// async function addFreight(id, num) {
//     addLoading.value = true
//     let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/cart`
//     const cart = {
//         data: {
//             "product_id": id,
//             "qty": num
//         }
//     }
//     try {
//         const res = await axios.post(apiPath, cart)
//         global.pushMessage(res.data.success, res.data.message)
//     } catch (err) {
//         global.pushMessage(false, err.message)
//     }
//     finally {
//         addLoading.value = false
//     }
// }

let nameRegex = /^(?!\s*$)[\u4e00-\u9fa5A-Za-z\s]+$/
let mobileRegex = /^09\d{8}$/
let emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

async function getOrder() {
    let msg1 = []
    let msg2 = []
    if (information.value.name == '') {
        msg1.push("姓名")
    }
    else if (!nameRegex.test(information.value.name)) {
        msg2.push("姓名")
    }

    if (information.value.tel == '') {
        msg1.push("手機號碼")
    }
    else if (!mobileRegex.test(information.value.tel)) {
        msg2.push("手機號碼")
    }

    if (information.value.email == '') {
        msg1.push("Email")
    }
    else if (!emailRegex.test(information.value.email)) {
        msg2.push("Email")
    }

    if (information.value.delivery == '') {
        msg1.push("寄送方式")
    }
    if (information.value.delivery == '宅配') {
        if (information.value.city == '' || information.value.area == '' || information.value.address == '') {
            msg1.push("地址")
        }
    }

    if (information.value.pay == '') {
        msg1.push("付款方式")
    }
    if (information.value.pay == '信用卡') {
        if (information.value.cardNumber == '' || information.value.validDate == '' || information.value.securityCode == '') {
            msg1.push("信用卡資訊")
        }
    }
    if (msg1.length > 0 || msg2.length > 0) {
        if (Array.isArray(msg1))
            msg1 = msg1.join('、')
        if (Array.isArray(msg2))
            msg2 = msg2.join('、')
        console.log(msg2 == '')
        let msg = `${msg1 == '' ? '' : '請填寫'}${msg1}${msg1 != '' && msg2 != '' ? '，' : ''}${msg2}${msg2 == '' ? '' : '為錯誤格式'}`
        pushMessage(false, msg)
    }
    else {
        let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/order`
        const order = {
            data: {
                user: {
                    name: information.name,
                    email: information.email,
                    tel: information.tel,
                    address: information.city + " " + information.area + " " + information.address

                },
                message: ''
            }
        }
        console.log(order)
        // try {
        //     const res = await axios.post(apiPath, cart)
        //     global.pushMessage(res.data.success, res.data.message)
        // } catch (err) {
        //     global.pushMessage(false, err.message)
        // }
        // finally {
        //     addLoading.value = false
        // }
    }

}
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
                    <BaseInput :inputType="'text'" v-model="information.tel" :id="'tel'" :placeholder="'手機號碼'"
                        :description="'手機號碼'" />
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
                                :placeholder="'MM/YY'" :description="'有效日期'" class="flex-1" />
                            <BaseInput :inputType="'text'" v-model="information.securityCode" :id="'securityCode'"
                                :placeholder="'安全碼'" :description="'安全碼'" class="flex-1" />
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
                <div class="font-bold mb-2 text-lg">結帳明細</div>
                <div class="bg-white shadow-md p-5 flex items-end flex-col gap-5">
                    <div class="w-full border-b border-gray-200">
                        <div class="flex justify-between my-2">
                            <div>原價總金額</div>
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
</template>

<style scoped></style>