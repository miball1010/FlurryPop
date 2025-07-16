<script setup>
const model = defineModel()
const props=defineProps({
    inputType:String,
    placeholder:String,
    id:String,
    description:String,
    maxlength:Number
})
</script>

<template>
    <div class="relative">
        <input :type="inputType" v-model="model" :id="id" :maxlength="maxlength"
            class="peer w-full border border-gray-300 pt-4 pb-1 px-2 placeholder-transparent 
            focus:placeholder-gray-400 focus:outline-none sm:pt-5 sm:pb-2 sm:px-3"
            :placeholder="placeholder" />
        <label :for="id"
            class="absolute left-2 sm:left-2.5 top-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 sm:peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-700 peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-500">
            {{description}}
        </label>
    </div>
</template>

<style scoped></style>
