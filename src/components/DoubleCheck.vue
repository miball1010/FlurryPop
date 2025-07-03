<script setup>
const props = defineProps({
    text: String,
    show: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['cancel', 'confirm'])
</script>

<template>
    <div v-if="show" class="bg-black/45 fixed w-full h-screen top-0 left-0 z-30 flex justify-center items-center">
        <div class="bg-white w-[90%] max-w-[400px] shadow-lg p-10">

            <div class="font-bold my-20 text-center">{{ text }}</div>

            <div class="flex justify-end gap-5">
                <button class="font-semibold btn-white" @click="emit('cancel')">取消</button>
                <button class="font-semibold btn-white" @click="emit('confirm')">刪除</button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
