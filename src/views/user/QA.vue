<script setup>
import BaseLayout from '@/components/user/BaseLayout.vue'
import { ref } from 'vue'

const question = ref([
    {
        title: "購物與配送",
        data: [
            {
                Q: "Q1. 支援哪些付款方式？",
                A: "目前支援信用卡付款，LINE Pay、超商代碼與其他電子支付將於後續開放。",
                isOpen: false,
            },
            {
                Q: "Q2. 訂單多久會出貨？",
                A: "完成付款後約 3–5 個工作天內出貨，特殊節日或高峰期可能略有延遲。",
                isOpen: false,
            },
            {
                Q: "Q3. 可以指定到貨日期或時間嗎？",
                A: "可於結帳時選擇「指定到貨日」。但無法保證精準到貨時間，若有需求可備註，我們將盡力協助安排。",
                isOpen: false,
            },
            {
                Q: "Q4. 配送方式是什麼？",
                A: "所有商品皆使用「黑貓冷凍宅配」，全程低溫保鮮，限台灣本島配送。",
                isOpen: false,
            },
            {
                Q: "Q5. 商品到了但融化了怎麼辦？",
                A: "若收到商品有解凍、損壞等情形，請於 24 小時內拍照並聯繫我們，我們會協助處理。",
                isOpen: false,
            }
        ]
    },
    {
        title: "門市資訊",
        data: [
            {
                Q: "Q6. 有實體店嗎？",
                A: "有！Flurry Pop 門市位於 台北市○○區○○路 88 號（近〇〇站），每日 11:00 – 21:30 營業。",
                isOpen: false,
            },
            {
                Q: "Q7. 可以線上訂購、門市自取嗎？",
                A: "當然可以！結帳時選擇「門市自取」並備註取貨時間，完成付款後我們將保留商品至指定日。",
                isOpen: false,
            },
            {
                Q: "Q8. 門市有提供內用或試吃嗎？",
                A: "有設少量內用座位，每日也有限定風味提供試吃，歡迎親臨體驗。",
                isOpen: false,
            },
            {
                Q: "Q9. 有即時外送嗎？",
                A: "線上訂單為冷凍宅配。門市現場購買部分區域支援 Uber Eats 或 Lalamove 配送。",
                isOpen: false,
            },
            {
                Q: "Q10. 可以企業合作或包場嗎？",
                A: "我們提供企業訂購、派對包場與聯名合作，歡迎來信：collab@flurrypop.com",
                isOpen: false,
            }
        ]
    },
    {
        title: "產品與成分",
        data: [
            {
                Q: "Q11. 商品保存期限多長？",
                A: "冷凍保存下建議於 30 天內食用完畢，最佳風味期為 2 週內。",
                isOpen: false,
            },
            {
                Q: "Q12. 成分中是否含乳、蛋、堅果等過敏原？",
                A: "各商品成分標示於頁面下方，若有過敏疑慮，建議先與我們聯繫確認。",
                isOpen: false,
            },
            {
                Q: "Q13. 商品適合素食者嗎？",
                A: "部分品項可供蛋奶素食者食用，純素者請留意成分表，或來信詢問。",
                isOpen: false,
            }
        ]
    }
])
</script>

<template>
    <BaseLayout :title="'Q&A'">
        <div class="ani-fade flex flex-col gap-10 sm:gap-20 mt-5 lg:mt-0">
            <div v-for="(item, index) in question" :key="index">
               
                <div class="flex items-center gap-2 justify-center mb-5 sm:mb-10">
                    <img src="/images/snow-icon.svg" alt="" class="h-4 sm:h-5">
                    <div class="serif text-lg sm:text-2xl font-bold text-[#3F88B4]">{{ item.title }}</div>
                    <img src="/images/snow-icon.svg" alt="" class="h-4 sm:h-5 scale-x-[-1]">
                </div>

                <div class="text-sm sm:text-base flex flex-col gap-4 sm:gap-8">
                    <div v-for="(x, i) in item.data" :key="i">
                        <div @click="x.isOpen = !x.isOpen"
                            :class="x.isOpen ? 'bg-[#3F88B4] text-white border-[#3F88B4]' : 'bg-white border-gray-300 hover:border-[#3F88B4] hover:bg-[#3F88B4] hover:text-white'"
                            class="cursor-pointer transition duration-300 relative px-5 py-3 border">
                            <div class="serif absolute top-[50%] translate-y-[-50%] right-3 text-lg">
                                {{ x.isOpen ? "–" : "+" }}
                            </div>
                            <div>{{ x.Q }}</div>
                        </div>
                        <div :class="x.isOpen ? 'ani-fade active block' : 'hidden'">
                            <div class="px-5 py-3 border border-gray-300">{{ x.A }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </BaseLayout>
</template>
