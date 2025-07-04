import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useGlobalStore } from './globalStore.js'

export const useUserStore = defineStore('userStore', () => {
  const global = useGlobalStore()
  // let api="https://vue3-course-api.hexschool.io/"
  // let path="flurrypop-api"
  // let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/product`
  //   try {
  //     const res = await axios.post(apiPath)
  //     console.log(res.data)
  //   } catch (err) {
  //      console.error(err)
  //   }
  //   finally{
      
  //   }

  return {  }
})
