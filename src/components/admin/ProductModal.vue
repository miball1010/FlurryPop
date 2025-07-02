<script setup>
import { storeToRefs } from 'pinia';
import { useAdminStore } from '@/stores/adminStore.js'
const store = useAdminStore()
const { NowProduct, productIsOpen, isNew } = storeToRefs(store)
const { updateProduct, closeProductModal } = store
import { ref } from 'vue'
import axios from 'axios';

const fileInput1 = ref(null)
const fileInput2 = ref(null)

function uploadFile(isMain) {
    let uploadfiel = null
    if (isMain) {
        uploadfiel = fileInput1.value.files[0]
    }
    else {
        uploadfiel = fileInput2.value.files[0]
    }
    const formData = new FormData()
    formData.append('file-to-upload', uploadfiel)
    console.log(formData)

    axios.post(`${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/upload`, formData)
        .then(res => {
            if (res.data.success) {
                if (isMain) {
                    NowProduct.value.imageUrl = res.data.imageUrl
                }
                else {
                    NowProduct.value.imagesUrl.push(res.data.imageUrl)
                }

                console.log(res.data)
            }
            else {
                alert("產品圖片錯誤")
            }
        })
}

function delImage(id) {
    if (id == "main") {
        NowProduct.value.imageUrl = ''
    }
    else{
        NowProduct.value.imagesUrl.splice(id,1)
    }
}
</script>

<template>
    <div class="w-full h-screen fixed top-0 left-0 bg-black/45" :class="{ active: productIsOpen }">
        <div class="bg-white max-w-[1200px] w-[90%] mx-auto mt-20">
            <div class="bg-neutral-700 text-white py-5 px-10 text-lg font-semibold">{{ isNew ? "新增產品" : "編輯產品" }}</div>

            <div class="flex p-10 mx-auto gap-8">
                <div class="flex-1 flex flex-col gap-4">
                    <div class="relative">
                        <input type="text" v-model="NowProduct.title" id="title"
                            class="peer w-full border border-gray-300 pt-5 pb-2 px-3 placeholder-transparent focus:outline-none"
                            placeholder="產品名稱" />
                        <label for="title"
                            class="absolute  left-2.5 top-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-700 peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-500">
                            產品名稱
                        </label>
                    </div>
                    <div class="relative">
                        <input type="number" v-model="NowProduct.price" id="price"
                            class="peer w-full border border-gray-300 pt-5 pb-2 px-3 placeholder-transparent focus:outline-none"
                            placeholder="價格" />
                        <label for="price"
                            class="absolute  left-2.5 top-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-700 peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-500">
                            價格
                        </label>
                    </div>
                    <div class="relative">
                        <textarea name="description" id="description" placeholder="產品描述"
                            v-model="NowProduct.description"
                            class="peer w-full min-h-30 border border-gray-300 pt-5 pb-2 px-3 placeholder-transparent focus:outline-none"></textarea>
                        <label for="description"
                            class="absolute bg-white w-[calc(100%-20px)] left-2.5 top-[1px] text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-700 peer-focus:top-[1px] peer-focus:text-sm peer-focus:text-gray-500">
                            產品描述
                        </label>
                    </div>
                    <div class="relative">
                        <textarea name="content" id="content" placeholder="主成分" v-model="NowProduct.content"
                            class="peer w-full min-h-30 border border-gray-300 pt-5 pb-2 px-3 placeholder-transparent focus:outline-none"></textarea>
                        <label for="content"
                            class="absolute bg-white w-[calc(100%-20px)] left-2.5 top-[1px] text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-700 peer-focus:top-[1px] peer-focus:text-sm peer-focus:text-gray-500">
                            主成分
                        </label>
                    </div>
                    <div class="flex items-center gap-2">
                        <input type="checkbox" id="is_enabled" v-model="NowProduct.is_enabled" :true-value="1"
                            :false-value="0" class="w-4 h-4 cursor-pointer"><label for="is_enabled">上架</label>
                    </div>
                </div>

                <div class="flex-1 flex flex-col justify-between">
                    <div>
                        <div>產品圖片</div>
                        <div class="flex gap-2 mt-1 flex-wrap">
                            <div v-if="NowProduct.imageUrl" class="w-25 h-25 border border-gray-500 relative">
                                <img :src="NowProduct.imageUrl" alt="" class="w-full h-full object-contain ">
                                <div @click="delImage('main')"
                                    class="absolute top-0 left-0 bg-black/70 w-full h-full flex justify-center items-center text-white opacity-0 hover:opacity-100 cursor-pointer">
                                    <img src="/images/trash-white-icon.svg" alt="" class="w-5">
                                </div>
                            </div>

                            <div v-else class="relative w-25 h-25 border border-gray-500">
                                <input type="file" ref="fileInput1"
                                    class="w-full h-full relative z-10 opacity-0 cursor-pointer"
                                    @change="uploadFile(true)" />
                                <div class="absolute z-[1] top-0 left-0 w-25 h-25 flex justify-center items-center">
                                    +
                                </div>
                            </div>

                            <div v-for="(item, index) in NowProduct.imagesUrl" :key="index"
                                class="w-25 h-25 border border-gray-300 relative">
                                <img :src="item" alt="" class="w-full h-full object-contain ">
                                <div @click="delImage(index)"
                                    class="absolute top-0 left-0 bg-black/70 w-full h-full flex justify-center items-center text-white opacity-0 hover:opacity-100 cursor-pointer">
                                    <img src="/images/trash-white-icon.svg" alt="" class="w-5">
                                </div>
                            </div>

                            <div class="relative w-25 h-25 border border-gray-300">
                                <input type="file" ref="fileInput2"
                                    class="w-full h-full relative z-10 opacity-0 cursor-pointer"
                                    @change="uploadFile(false)" />
                                <div class="absolute z-[1] top-0 left-0 w-25 h-25 flex justify-center items-center">
                                    +
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-end gap-5">
                        <button @click="closeProductModal" class="btn-white">取消</button>
                        <button @click="updateProduct" class="btn-dark">確認</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.active {
    z-index: 20;
}

.a {
    position: absolute;
}
</style>
