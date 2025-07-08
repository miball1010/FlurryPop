<script setup>

</script>

<template>
    <div class="bg-gray-100 min-h-screen w-full relative pb-35 sm:pb-50">
        <div
            class="w-full bg-[url('images/bg-2.jpg')] h-100 bg-cover bg-[position:center_40%] absolute flex items-center">
            <!-- 會改變的內容 -->
            <div class="title itali ">ABOUT</div>
        </div>

        <div
            class="bg-white w-[90%] max-w-[1330px] relative z-[2] top-25 mx-auto rounded-lg px-5 py-5 shadow-md sm:px-15 sm:py-28  sm:top-80">
            <!-- 會改變的內容 -->
            <div class="max-w-[700px] mx-auto flex flex-col gap-15">
                <div>
                    不是每一種冰，都值得慢慢融化。<br>Flurry Pop，誕生於對溫度與情感的執著。<br><br>
                    我們相信，味道不只取悅味蕾，更能喚醒記憶、安靜片刻、照亮某段模糊的心情。<br><br>
                    每一支冰品，都有自己的語言——冷，卻不疏離；甜，卻不喧嘩。
                </div>
                <div>
                    <img src="/images/about-1.jpg" alt="">
                    <div class="text-gray-400 text-sm text-center">Flurry Pop店內裝潢</div>
                </div>
                <div>
                    從選料、調香到製作，我們堅持少即是多。<br>
                    天然食材，柔和配方，以低溫緩慢凝結出一種風格，也是一種態度。<br><br>
                    Flurry Pop 不是為了討好所有人，只為了與理解它的人，相遇一次，就足夠深刻。
                </div>
                <div>
                    <img src="/images/about-2.jpg" alt="">
                    <div class="text-gray-400 text-sm text-center">喜愛Flurry Pop的客人</div>
                </div>
            </div>
            <div class="mt-30 p-4 border border-gray-300 flex gap-10">
                <div class="flex-1"><img src="/images/shop.jpg" alt=""></div>
                <div class="flex-1">
                    <div class="itali text-2xl my-4">Flurry Pop</div>
                    <div><span class="text-[#3F88B4]">營業時間｜</span>Daily 11:00–21:30</div>
                    <div class="mt-2"><span class="text-[#3F88B4]">地址｜</span>新北市新莊區幸福路123號</div>
                    <div class="mt-2"><span class="text-[#3F88B4]">電話｜</span>(02) 1234 5678</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.title {
    font-size: 80px;
    color: white;
    width: fit-content;
    margin: 0 auto;
}
</style>
