import { defineStore } from 'pinia'
import { useGlobalStore } from './globalStore.js'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useAdminStore = defineStore('adminStore', () => {
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


  //登入
  async function checkLogin() {
    const token = getCookie('token')
    if (!token) {
      return false
    }
    axios.defaults.headers.common['Authorization'] = token
    const apiPath = `${import.meta.env.VITE_API}api/user/check`
    try {
      const res = await axios.post(apiPath)
      return res.data.success
    }
    catch (err) {
      return false
    }
  }

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)'))//尋找有沒有符合name的cookie
    return match ? match.pop() : ''
  }

  //商品管理
  const isNew = ref(false)
  const productIsOpen = ref(false)
  const products = ref([])
  const NowProduct = ref({
    title: '',
    category: '無',
    origin_price: 0,
    price: null,
    unit: "個",
    description: '',
    content: '',
    is_enabled: 0,
    imageUrl: '',
    imagesUrl: []
  })

  function openProductModal(New, product) {
    isNew.value = New
    if (!isNew.value) {
      NowProduct.value = JSON.parse(JSON.stringify(product))
    }
    else {
      NowProduct.value = {
        title: '',
        category: '無',
        origin_price: 0,
        price: null,
        unit: "個",
        description: '',
        content: '',
        is_enabled: 0,
        imageUrl: '',
        imagesUrl: []
      }
    }
    productIsOpen.value = true
  }

  function closeProductModal() {
    productIsOpen.value = false
  }

  async function getProduct() {
    global.isInlineLoading = true
    let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/products/all`
    try {
      const res = await axios.get(apiPath)
      products.value = res.data.products
    } catch (err) {
      global.pushMessage(false, err.message)
    }
    finally {
      global.isInlineLoading = false
    }
  }

  async function updateProduct() {
    global.isFullLoading = true
    let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/product`
    let method = 'post'
    if (!isNew.value) {
      apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/product/${NowProduct.value.id}`
      method = 'put'
    }
    try {
      const res = await axios[method](apiPath, { data: { ...NowProduct.value } })
      if (res.data.success) {
        productIsOpen.value = false
        getProduct()
      }
      global.pushMessage(res.data.success, res.data.message)
    } catch (err) {
      global.pushMessage(false, err.message)
    }
    finally {
      global.isFullLoading = false
    }
  }

  async function delProduct(item) {
    global.isFullLoading = true
    let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/product/${item.id}`
    try {
      const res = await axios.delete(apiPath)
      if (res.data.success) {
        global.confirm.show = false
        getProduct()
      }
      global.pushMessage(res.data.success, res.data.message)
    } catch (err) {
      console.error(err)
      global.pushMessage(false, err.message)
    }
    finally {
      global.isFullLoading = false
    }
  }

  return {
    checkLogin,

    products, productIsOpen, NowProduct, isNew,
    openProductModal, closeProductModal, getProduct, updateProduct, delProduct
  }
})
