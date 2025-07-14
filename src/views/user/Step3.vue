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

})
onMounted(() => {
    step.value = 3
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


    <div class="bg-white shadow-md p-10">
        <div class="flex items-center gap-2 justify-center mb-5">
            <img src="/images/snow-icon.svg" alt="" class="h-5">
            <span class="serif text-2xl font-bold text-[#3F88B4]">訂單完成</span>
            <img src="/images/snow-icon.svg" alt="" class="h-5 scale-x-[-1]">
        </div>
        <div class="font-bold text-[#7DB14A] text-center">訂單編號:1232123123</div>
        <div>
            <div>
                <div class="font-bold text-[#3F88B4]">姓名</div>
                <div class="font-bold text-[#3F88B4]">電話</div>
                <div class="font-bold text-[#3F88B4]">Email</div>
                <div>王曉明</div>
                <div>0912345678</div>
                <div>123@gmail.com</div>
            </div>
             <div>
                <div class="font-bold text-[#3F88B4]">寄送方式</div>
                <div class="font-bold text-[#3F88B4]">付款狀態</div>
                <div>宅配</div>
                <div>XX市XX區XX路123號1樓</div>
                <div>已付款</div>
            </div>
        </div>
    </div>


</template>

<style scoped></style>