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
            class="peer text-base w-full border border-gray-300 pt-5 pb-2 px-3 placeholder-transparent 
            focus:placeholder-gray-400 focus:outline-none"
            :placeholder="placeholder" />
        <label :for="id"
            class="absolute left-2.5 top-1 text-xs sm:text-sm text-gray-500 transition-all 
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-700 peer-focus:top-1 peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-gray-500">
            {{description}}
        </label>
    </div>
</template>
