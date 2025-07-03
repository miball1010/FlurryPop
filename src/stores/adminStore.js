import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAdminStore = defineStore('adminStore', () => {
  // let api="https://vue3-course-api.hexschool.io/"
  // let path="flurrypop-api"
  // let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/product`
  //   try {
  //     const res = await axios.post(apiPath)
  //     console.log(res.data)
  //   } catch (err) {
  //      console.error(err)
  //   }

  //Loading
  const loadingIsOpen = ref(false)

  //通知
  const message = ref({
    text: '',
    status: false,
    active: false
  })

  let time = null
  function pushMessage(success, newMessage) {
    if (newMessage) {
      if (message.value.active)
        clearTimeout(time)

      message.value.text = newMessage
      message.value.status = success
      message.value.active = true
      time = setTimeout(() => {
        message.value.active = false
      }, 3000)
    }
  }

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
      console.log("登入驗證結果:", res.data)
      return res.data.success
    }
    catch (err) {
      console.error("驗證失敗:", err)
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
    loadingIsOpen.value = true
    let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/products/all`
    try {
      const res = await axios.get(apiPath)
      products.value = res.data.products
      // console.log(products.value)
      loadingIsOpen.value = false
    } catch (err) {
      console.error(err)
    }
  }

  async function updateProduct() {
    loadingIsOpen.value = true
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
      pushMessage(res.data.success, res.data.message)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    loadingIsOpen, message,
    pushMessage,checkLogin,

    products, productIsOpen, NowProduct, isNew,
    openProductModal, closeProductModal, getProduct, updateProduct
  }
})
