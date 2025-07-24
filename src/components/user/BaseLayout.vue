<script setup>
const props = defineProps(['title'])
</script>

<template>
    <div class="bg-gray-100 min-h-[calc(100vh-106px)] sm:min-h-[calc(100vh-116px)] w-full relative pb-60 sm:pb-100">
        <div
            class="bg-img w-full bg-[url('images/bg-2.jpg')] h-60  absolute flex items-center justify-center sm:h-100">
            <div class="title itali text-[40px] text-white sm:text-[80px]">{{ props.title }}</div>
        </div>

        <div :class="title=='CHECKOUT'?'px-15 py-5 sm:py-15':'p-5 sm:p-7 lg:p-15 xl:p-20'"
            class=" bg-white w-[90%] max-w-[1330px] relative z-[2] top-50 mx-auto rounded-lg shadow-md sm:top-80">
            <slot></slot>
        </div>
        <slot name="bottom"></slot>
    </div>
</template>

<style scoped>
.bg-img{
    background-position: right top;
    background-size: 110%;
}
</style>