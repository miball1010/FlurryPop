<script setup>
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
import { ref, onMounted } from 'vue'

import { storeToRefs } from 'pinia';
import { useGlobalStore } from '@/stores/globalStore.js'
const globalStore = useGlobalStore()
const { isFullLoading } = storeToRefs(globalStore)
const { pushMessage } = globalStore
import { useAdminStore } from '@/stores/adminStore.js'
const adminStore = useAdminStore()
const { checkLogin } = adminStore

const admin = ref({
  username: 'FlurryPop@gmail.com',
  password: 'FlurryPop'
})

async function login() {
  isFullLoading.value = true
  let apiPath = `${import.meta.env.VITE_API}admin/signin`

  try {
    const res = await axios.post(apiPath, admin.value)
    console.log(res)
    if (res.data.success) {
      const { token, expired } = res.data
      document.cookie = `token=${token};expires=${new Date(expired)}`
      router.push('/dashboard/product')
    }
    else {
      pushMessage(res.data.success, res.data.message)
    }
  } catch (err) {
    global.pushMessage(false, err.message)
  }
  finally {
    isFullLoading.value = false
  }
}

onMounted(async () => {
  const isLoggedIn = await checkLogin()
  if (!isLoggedIn) {
    console.log("未登入")
    router.push({ path: "/login" })
  } else {
    console.log("已登入")
    router.push('/dashboard/product')
  }
})
</script>

<template>
  <div class="bg-[url('images/bg-2.jpg')] bg-cover bg-center h-screen w-full flex justify-center items-center">
    <div class="w-[90%] max-w-lg bg-white rounded-lg p-10">
      <div class="flex items-center justify-center gap-3 flex-col sm:flex-row">
        <img src="/images/logo-black.svg" alt="">
        <div class="text-xl font-bold">後臺系統</div>
      </div>

      <form action="" class="max-w-[350px] mx-auto mt-10">
        <div class="relative">
          <input type="text" v-model="admin.username" id="username" autocomplete="username"
            class="peer w-full border-b pt-7 pb-3 placeholder-transparent focus:outline-none" placeholder="帳號" />
          <label for="username"
            class="absolute  left-0 top-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-700 peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-500">
            帳號
          </label>
        </div>

        <div class="relative mt-5">
          <input type="password" v-model="admin.password" id="password" autocomplete="current-password"
            class="peer w-full border-b pt-7 pb-3 placeholder-transparent focus:outline-none" placeholder="密碼" />
          <label for="password"
            class="absolute  left-0 top-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-700 peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-500">
            密碼
          </label>
        </div>
        <div class="mt-15 flex justify-between items-end ">
          <router-link class="underline text-[#3F88B4] hover:opacity-80" to="/">回到前台</router-link>
          <button @click.prevent="login" class="btn-white">
            登入
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
