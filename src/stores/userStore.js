import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useGlobalStore } from './globalStore.js'
import axios from 'axios'

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

  // 我的最愛
  const favoriteId = ref([])
  function addFavorite(id) {
    const index = favoriteId.value.indexOf(id)
    if (favoriteId.value.indexOf(id) > -1) {
      favoriteId.value.splice(index, 1)
      global.pushMessage(false, "已取消收藏")
    }
    else {
      favoriteId.value.push(id)
      global.pushMessage(true, "已加入收藏")
    }
  }

  //購物車
  const addLoading = ref(false)
  async function addCart(id, num) {
      addLoading.value = true
      let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/cart`
      const cart = {
        data: {
          "product_id": id,
          "qty": num
        }
      }
      try {
        const res = await axios.post(apiPath, cart)
        global.pushMessage(res.data.success, res.data.message)
      } catch (err) {
        global.pushMessage(false, err.message)
      }
      finally {
        addLoading.value = false
      }
  }
  //商品
  onMounted(() => {
    global.isInlineLoading = true
    getProduct()
  })

  const product = ref([])

  async function getProduct(page = 1) {
    let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/products?page=${page}`
    try {
      const res = await axios.get(apiPath)
      console.log(res.data)
      product.value = res.data.products
    } catch (err) {
      console.error(err)
    }
    finally {
      global.isInlineLoading = false
    }
  }

  return {
    favoriteId,
    addFavorite,

    addLoading,
    addCart,

    product,
    getProduct
  }
})
