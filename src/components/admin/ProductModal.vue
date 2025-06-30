<script setup>
import { storeToRefs } from 'pinia';
import { useAdminStore } from '@/stores/adminStore.js'
const store = useAdminStore()
const { NowProduct } = storeToRefs(store)
const { updateProduct } = store
</script>

<template>
    <div class="w-full h-screen fixed top-0 left-0 bg-black/45 z-20">
        <div class="bg-white max-w-[1200px] w-[90%] mx-auto mt-20">
            <div class="bg-neutral-700 text-white p-4">新增產品</div>
            <div class="flex p-4">
                <div class="flex-1 flex flex-col gap-4">
                    <div class="relative">
                        <input type="text" v-model="NowProduct.name" id="name"
                            class="peer w-full border pt-5 pb-2 px-3 placeholder-transparent focus:outline-none"
                            placeholder="產品名稱" />
                        <label for="name"
                            class="absolute  left-2.5 top-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-700 peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-500">
                            產品名稱
                        </label>
                    </div>
                    <div class="relative">
                        <input type="text" v-model="NowProduct.price" id="price"
                            class="peer w-full border pt-5 pb-2 px-3 placeholder-transparent focus:outline-none"
                            placeholder="價格" />
                        <label for="price"
                            class="absolute  left-2.5 top-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-700 peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-500">
                            價格
                        </label>
                    </div>



                    <div class="relative">
                        <textarea name="description" id="description" placeholder="產品描述" v-model="NowProduct.description"
                            class="peer w-full min-h-30 border pt-5 pb-2 px-3 placeholder-transparent focus:outline-none"></textarea>
                        <label for="description"
                            class="absolute bg-white w-[calc(100%-20px)] left-2.5 top-[1px] text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-700 peer-focus:top-[1px] peer-focus:text-sm peer-focus:text-gray-500">
                            產品描述
                        </label>
                    </div>
                     <div class="relative">
                        <textarea name="component" id="component" placeholder="主成分" v-model="NowProduct.component"
                            class="peer w-full min-h-30 border pt-5 pb-2 px-3 placeholder-transparent focus:outline-none"></textarea>
                        <label for="component"
                            class="absolute bg-white w-[calc(100%-20px)] left-2.5 top-[1px] text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-700 peer-focus:top-[1px] peer-focus:text-sm peer-focus:text-gray-500">
                            主成分
                        </label>
                    </div>

                </div>
                <div class="flex-1">
                    <div v-html="NowProduct.description"></div>
                    <button @click="updateProduct" class="btn-dark">確認</button>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.a {
    width: calc(100% - 10px);
    flex-direction: column;
}
</style>
