import { defineStore } from 'pinia'
import { useGlobalStore } from './globalStore.js'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useAdminStore = defineStore('adminStore', () => {
  const global = useGlobalStore()

  //登入
  async function checkLogin() {
    global.isFullLoading = true
    closeProductModal()
    closeOrderModal()
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
    finally {
      global.isFullLoading = false
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
    category: 'ice',
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
        category: 'ice',
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
    document.body.style.overflow = 'hidden'
  }

  function closeProductModal() {
    productIsOpen.value = false
    document.body.style.overflow = ''
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
    let msg = []
    if (NowProduct.value.title == '') {
      msg.push("產品名稱不得為空")
    }
    if (NowProduct.value.price == '') {
      msg.push("價格不得為0")
    }
    if (NowProduct.value.description == '') {
      msg.push("產品描述不得為空")
    }
    if (NowProduct.value.content == '') {
      msg.push("主成分不得為空")
    }
    if (NowProduct.value.imageUrl == '') {
      msg.push("需上傳一張主要圖片")
    }
    if (msg.length > 0) {
      if (Array.isArray(msg)) {
        msg = msg.join('、')
      }
      global.pushMessage(false, msg)
    }
    else {
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
          closeProductModal()
          getProduct()
        }
        msg = res.data.message
        if (Array.isArray(msg)) {
          msg = msg.join('、')
        }
        global.pushMessage(res.data.success, msg)
      } catch (err) {
        global.pushMessage(false, err.message)
      }
      finally {
        global.isFullLoading = false
      }
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

  //訂單管理
  const orders = ref([])
  const pagination = ref({})

  async function getOrder(page = 1) {
    global.isInlineLoading = true
    let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/orders/?page=${page}`
    try {
      const res = await axios.get(apiPath)
      orders.value = res.data.orders
      pagination.value=res.data.pagination
      console.log(pagination.value)
    } catch (err) {
      global.pushMessage(false, err.message)
    }
    finally {
      global.isInlineLoading = false
    }
  }

  const NowOrder = ref({
    products: {},
    user: {
      address: '',
    }
  })

  const orderIsOpen = ref(false)

  function openOrderModal(order) {
    NowOrder.value = JSON.parse(JSON.stringify(order))
    document.body.style.overflow = 'hidden'
    orderIsOpen.value = true
  }

  function closeOrderModal() {
    document.body.style.overflow = ''
    orderIsOpen.value = false
  }

  let nameRegex = /^(?!\s*$)[\u4e00-\u9fa5A-Za-z\s]+$/
  let mobileRegex = /^09\d{8}$/
  let emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/

  async function updateOrder() {
    let msg1 = []
    let msg2 = []
    if (NowOrder.value.user.name == '') {
      msg1.push("姓名")
    }
    else if (!nameRegex.test(NowOrder.value.user.name)) {
      msg2.push("姓名")
    }

    if (NowOrder.value.user.tel == '') {
      msg1.push("手機號碼")
    }
    else if (!mobileRegex.test(NowOrder.value.user.tel)) {
      msg2.push("手機號碼")
    }

    if (NowOrder.value.user.email == '') {
      msg1.push("Email")
    }
    else if (!emailRegex.test(NowOrder.value.user.email)) {
      msg2.push("Email")
    }

    if (NowOrder.value.user.address == '') {
      msg1.push("地址")
    }

    if (msg1.length > 0 || msg2.length > 0) {
      if (Array.isArray(msg1))
        msg1 = msg1.join('、')
      if (Array.isArray(msg2))
        msg2 = msg2.join('、')
      let msg = `${msg1 == '' ? '' : '請填寫'}${msg1}${msg1 != '' && msg2 != '' ? '，' : ''}${msg2}${msg2 == '' ? '' : '為錯誤格式'}`
      global.pushMessage(false, msg)
    }
    else {
      global.isFullLoading = true
      let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/order/${NowOrder.value.id}`

      try {
        const res = await axios.put(apiPath, { data: { ...NowOrder.value } })
        if (res.data.success) {
          closeOrderModal()
          getOrder()
        }
        global.pushMessage(res.data.success, res.data.message)
      } catch (err) {
        global.pushMessage(false, err.message)
      }
      finally {
        global.isFullLoading = false
      }
    }
  }

  async function delOrder(item) {
    global.isFullLoading = true
    let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/order/${item.id}`
    try {
      const res = await axios.delete(apiPath)
      if (res.data.success) {
        global.confirm.show = false
        closeOrderModal()
        getOrder()
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
    openProductModal, closeProductModal, getProduct, updateProduct, delProduct,

    orders, orderIsOpen, NowOrder,pagination,
    getOrder, openOrderModal, closeOrderModal, updateOrder, delOrder
  }
})
