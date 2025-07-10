<script setup>
const props = defineProps(['title'])
</script>

<template>
    <div class="bg-gray-100 min-h-screen w-full relative pb-60 sm:pb-100">
        <div
            class="w-full bg-[url('images/bg-2.jpg')] h-60 bg-cover bg-[position:center_40%] absolute flex items-center justify-center sm:h-100">
            <div class="title itali text-[40px] text-white sm:text-[80px]">{{ props.title }}</div>
        </div>

        <div
            class="bg-white w-[90%] max-w-[1330px] relative z-[2] top-50 mx-auto rounded-lg px-5 py-10 shadow-md sm:px-15 sm:py-28  sm:top-80">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped></style>