<script setup>
import BaseInput from '@/components/BaseInput.vue'
import { onMounted, ref, onBeforeUnmount } from 'vue'
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { isFullLoading } = storeToRefs(globalStore)
const { pushMessage } = globalStore
import { useAdminStore } from '@/stores/adminStore.js'
const adminStore = useAdminStore()
const { NowProduct, productIsOpen, isNew } = storeToRefs(adminStore)
const { updateProduct, closeProductModal } = adminStore

onMounted(() => {
   
    adjustModalHeight()
    window.addEventListener('resize', adjustModalHeight)
  
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', adjustModalHeight)
})

const modalHeight = ref('100vh')
function adjustModalHeight() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
    modalHeight.value = `calc(var(--vh, 1vh) * 100)`
}

const fileInput1 = ref(null)
const fileInput2 = ref(null)

async function uploadFile(isMain) {
    isFullLoading.value = true
    let uploadfiel = null
    if (isMain) {
        uploadfiel = fileInput1.value.files[0]
    }
    else {
        uploadfiel = fileInput2.value.files[0]
    }
    const formData = new FormData()
    formData.append('file-to-upload', uploadfiel)
    let api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/upload`

    try {
        const res = await axios.post(api, formData)
        if (res.data.success) {
            if (isMain) {
                NowProduct.value.imageUrl = res.data.imageUrl
            }
            else {
                NowProduct.value.imagesUrl.push(res.data.imageUrl)
            }
        }
        pushMessage(res.data.success, res.data.message)
    }
    catch (err) {
        pushMessage(false, err.message)
    }
    finally {
        isFullLoading.value = false
    }
}

function delImage(id) {
    if (id == "main") {
        NowProduct.value.imageUrl = ''
    }
    else {
        NowProduct.value.imagesUrl.splice(id, 1)
    }
}
</script>

<template>
    <div :style="{ height: modalHeight }" class="w-full fixed top-0 left-0 bg-black/45 z-50" v-show="productIsOpen">
        <transition name="fadeup">
            <div v-show="productIsOpen" 
                class="modal-product bg-transparent max-w-[1200px] w-[95%] max-h-[80%] absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] overflow-x-hidden overflow-y-auto">

                <div class="bg-neutral-700 text-white py-5 px-5 sm:px-10 text-base sm:text-lg font-semibold">
                    {{ isNew ? "新增產品" : "編輯產品" }}
                </div>

                <div class="bg-white flex p-5 gap-x-8 gap-y-4 flex-col sm:flex-row sm:p-10">

                    <div class="flex-1 flex flex-col gap-4">
                        <BaseInput :inputType="'text'" v-model="NowProduct.title" :id="'title'" :placeholder="' '"
                            :description="'產品名稱'" />

                        <BaseInput :inputType="'number'" v-model="NowProduct.price" :id="'price'" :placeholder="' '"
                            :description="'價格'" />

                        <div class="relative">
                            <textarea name="description" id="description" placeholder="產品描述"
                                v-model="NowProduct.description"
                                class="peer w-full min-h-30 border border-gray-300 pt-4 sm:pt-5 pb-1 sm:pb-2 px-2 sm:px-3 placeholder-transparent focus:outline-none"></textarea>
                            <label for="description"
                                class="absolute bg-white w-[calc(100%-20px)] left-2 sm:left-2.5 pt-[2px] top-[1px] text-xs sm:text-sm text-gray-500 transition-all 
                                 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-700 peer-focus:top-[1px] peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-gray-500">
                                產品描述
                            </label>
                        </div>
                        <div class="relative">
                            <textarea name="content" id="content" placeholder="主成分" v-model="NowProduct.content"
                                class="peer w-full min-h-30 border border-gray-300 pt-4 sm:pt-5 pb-1 sm:pb-2 px-2 sm:px-3 placeholder-transparent focus:outline-none"></textarea>
                            <label for="content"
                                class="absolute bg-white w-[calc(100%-20px)] left-2 sm:left-2.5 pt-[2px] top-[1px] text-xs sm:text-sm text-gray-500 transition-all 
                                 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-700 peer-focus:top-[1px] peer-focus:text-xs sm:peer-focus:text-sm peer-focus:text-gray-500">
                                主成分
                            </label>
                        </div>
                        <div class="flex items-center gap-2">
                            <input type="checkbox" id="is_enabled" v-model="NowProduct.is_enabled" :true-value="1"
                                :false-value="0" class="w-4 h-4 cursor-pointer"><label for="is_enabled">上架</label>
                        </div>
                        <div>
                            <div> 類別</div>
                            <div class="flex items-center gap-2 flex-wrap">
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="category" v-model="NowProduct.category" value="ice"
                                        class="w-4 h-4">
                                    <span>冰淇淋</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="category" v-model="NowProduct.category" value="bar"
                                        class="w-4 h-4">
                                    <span>雪糕</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="category" v-model="NowProduct.category" value="store"
                                        class="w-4 h-4">
                                    <span>門市限定</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="category" v-model="NowProduct.category" value="other"
                                        class="w-4 h-4">
                                    <span>其他</span>
                                </label>
                                <label class="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="category" v-model="NowProduct.category" value="internal"
                                        class="w-4 h-4">
                                    <span>內部用途</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="flex-1 flex flex-col justify-between">
                        <div>
                            <div class="mb-2">產品圖片</div>
                            <div class="mb-3">
                                <div class="text-sm text-gray-500 mb-1">主要圖片</div>
                                <div v-if="NowProduct.imageUrl" class="w-25 h-25 border border-gray-500 relative">
                                    <img :src="NowProduct.imageUrl" alt="" class="w-full h-full object-contain ">
                                    <div @click="delImage('main')"
                                        class="absolute top-0 left-0 bg-black/70 w-full h-full flex justify-center items-center text-white opacity-0 hover:opacity-100 cursor-pointer">
                                        <img src="/images/trash-white-icon.svg" alt="" class="w-5">
                                    </div>
                                </div>

                                <div v-else class="relative w-25 h-25 border border-gray-500">
                                    <input type="file" ref="fileInput1" accept="image/*"
                                        class="w-full h-full relative z-10 opacity-0 cursor-pointer"
                                        @change="uploadFile(true)" />
                                    <div class="absolute z-[1] top-0 left-0 w-25 h-25 flex justify-center items-center">
                                        +
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="text-sm text-gray-500 mb-1">其他圖片</div>
                                <div class="flex gap-2 mt-1 flex-wrap">
                                    <div v-for="(item, index) in NowProduct.imagesUrl" :key="index"
                                        class="w-25 h-25 border border-gray-300 relative">
                                        <img :src="item" alt="" class="w-full h-full object-contain ">
                                        <div @click="delImage(index)"
                                            class="absolute top-0 left-0 bg-black/70 w-full h-full flex justify-center items-center text-white opacity-0 hover:opacity-100 cursor-pointer">
                                            <img src="/images/trash-white-icon.svg" alt="" class="w-5">
                                        </div>
                                    </div>

                                    <div class="relative w-25 h-25 border border-gray-300">
                                        <input type="file" ref="fileInput2" accept="image/*"
                                            class="w-full h-full relative z-10 opacity-0 cursor-pointer"
                                            @change="uploadFile(false)" />
                                        <div
                                            class="absolute z-[1] top-0 left-0 w-25 h-25 flex justify-center items-center">
                                            +
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-end gap-5 mt-5">
                            <button @click="closeProductModal" class="btn-white">取消</button>
                            <button @click="updateProduct" class="btn-dark">確認</button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>