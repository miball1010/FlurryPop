<script setup>
//1.登入
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()


const account = ref('')
const password = ref('')

function login() {
  router.push('/dashboard/product')
}
</script>

<template>
  <div class="bg-[url('images/bg-2.jpg')] bg-cover bg-center h-screen w-full flex justify-center items-center">
    <div class="w-[90%] max-w-lg bg-white rounded-lg p-10">
      <div class="flex items-center justify-center gap-3">
        <img src="/images/logo-black.svg" alt="">
        <div class="title">後臺系統</div>
      </div>

      <form action="" class="max-w-[350px] mx-auto mt-10">
        <div class="relative">
          <input type="text" v-model="account" id="account"
            class="peer w-full border-b pt-7 pb-3 placeholder-transparent focus:outline-none"
            placeholder="帳號" />
          <label for="account"
            class="absolute  left-0 top-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-700 peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-500">
            帳號
          </label>
        </div>

        <div class="relative mt-5">
          <input type="password" v-model="password" id="password"
            class="peer w-full border-b pt-7 pb-3 placeholder-transparent focus:outline-none"
            placeholder="密碼" />
          <label for="password"
            class="absolute  left-0 top-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-7 peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-700 peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-500">
            密碼
          </label>
        </div>
        <button @click="login"
          class="btn-white float-right mt-15">
          登入
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
