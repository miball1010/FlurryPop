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
  const freight=ref({})

  async function getProduct(page = 1) {
    let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/products?page=${page}`
    try {
      const res = await axios.get(apiPath)
      product.value = res.data.products
      freight.value=product.value.find(i=>i.title=='運費')
    } catch (err) {
      console.error(err)
    }
    finally {
      global.isInlineLoading = false
    }
  }
  //結帳
  const step = ref(1)

  const cart = ref([])
  const total = ref(0)
  async function getCheckProduct() {
    let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/cart`
    try {
      const res = await axios.get(apiPath)
      // console.log(res.data.data)
      cart.value = res.data.data.carts
      total.value = res.data.data.total
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

    product,freight,
    getProduct,

    step,cart,total,
    getCheckProduct
  }
})
