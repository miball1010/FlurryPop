import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useGlobalStore } from './globalStore.js'
import axios from 'axios'

export const useUserStore = defineStore('userStore', () => {
  const global = useGlobalStore()

  //複製網址
  async function share() {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      global.pushMessage(true, '已複製網址！')
    } catch (err) {
      global.pushMessage(false, '複製失敗：' + err)
    }
  }

  // 我的最愛
  const favoriteId = ref([])

  function getFavorite() {
    const saved = localStorage.getItem('favorites')
    if (saved) {
      favoriteId.value = JSON.parse(saved)
    }
  }

  function addFavorite(id) {
    if (favoriteId.value.includes(id)) {
      favoriteId.value = favoriteId.value.filter(i => i != id)
      global.pushMessage(false, "已取消收藏")
    }
    else {
      favoriteId.value.push(id)
      global.pushMessage(true, "已加入收藏")
    }
    localStorage.setItem('favorites', JSON.stringify(favoriteId.value))
  }

  //購物車
  const addLoading = ref(false)
  async function addCart(id, num) {
    global.isFullLoading = true
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
      global.isFullLoading = false
      addLoading.value = false
    }
  }
  //商品

  const product = ref([])
  const freight = ref({})

  async function getProduct() {
    let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/products/all`
    try {
      const res = await axios.get(apiPath)
      product.value = res.data.products
      freight.value = product.value.find(i => i.title == '運費')
      product.value = product.value.filter(i => i.category != 'internal')
      // console.log(product.value)
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
    global.isInlineLoading = true
    let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/cart`
    try {
      const res = await axios.get(apiPath)
      cart.value = res.data.data.carts
      total.value = res.data.data.total
    } catch (err) {
      console.error(err)
    }
    finally {
      global.isInlineLoading = false
    }
  }


  let nameRegex = /^(?!\s*$)[\u4e00-\u9fa5A-Za-z\s]+$/
  let mobileRegex = /^09\d{8}$/
  let emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  let cardNumberRegex = /^\d{16}$/
  let validDateRegex = /^\d{4}$/
  let securityCodeRegex = /^\d{3}$/
  const orderId = ref('')

  async function checkOrder(information) {
    let msg1 = []
    let msg2 = []
    if (information.name == '') {
      msg1.push("姓名")
    }
    else if (!nameRegex.test(information.name)) {
      msg2.push("姓名")
    }

    if (information.tel == '') {
      msg1.push("手機號碼")
    }
    else if (!mobileRegex.test(information.tel)) {
      msg2.push("手機號碼")
    }

    if (information.email == '') {
      msg1.push("Email")
    }
    else if (!emailRegex.test(information.email)) {
      msg2.push("Email")
    }

    if (information.delivery == '') {
      msg1.push("寄送方式")
    }
    if (information.delivery == '宅配') {
      if (information.city == '' || information.area == '' || information.address == '') {
        msg1.push("地址")
      }
    }

    if (information.pay == '') {
      msg1.push("付款方式")
    }
    if (information.pay == '信用卡') {
      if (information.cardNumber == '') {
        msg1.push("卡號")
      }
      else if (!cardNumberRegex.test(information.cardNumber)) {
        msg2.push("卡號")
      }

      if (information.validDate == '') {
        msg1.push("卡片有效日期")
      }
      else if (!validDateRegex.test(information.validDate)) {
        msg2.push("卡片有效日期")
      }

      if (information.securityCode == '') {
        msg1.push("安全碼")
      }
      else if (!securityCodeRegex.test(information.securityCode)) {
        msg2.push("安全碼")
      }
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

      let address = "實體店取貨"
      if (information.delivery == '宅配') {
        await addFreight(freight.value.id, 1)
        address = information.city + information.area + information.address
      }

      let pay = false
      if (information.pay == '信用卡')
        pay = true

      let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/order`
      const order = {
        data: {
          user: {
            name: information.name,
            email: information.email,
            tel: information.tel,
            address: address
          },
          message: ''
        }
      }
      try {
        const res = await axios.post(apiPath, order)
        if (res.data.success) {
          orderId.value = res.data.orderId
          if (localStorage.getItem('orderId')) {
            localStorage.removeItem('orderId')
          }
          localStorage.setItem('orderId', orderId.value)
          if (pay)
            await cardPay(orderId.value)
          return true

        }
        else {
          global.isFullLoading = false
          global.pushMessage(res.data.success, res.data.message)
        }
      } catch (err) {
        global.isFullLoading = false
        global.pushMessage(false, err.message)
      }
    }
  }

  //運費
  async function addFreight(id, num) {
    let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/cart`
    const cart = {
      data: {
        "product_id": id,
        "qty": num
      }
    }
    try {
      const res = await axios.post(apiPath, cart)
    } catch (err) {
      console.error(err)
    }
  }

  //付款
  async function cardPay(id) {
    let apiPath = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/pay/${id}`

    try {
      const res = await axios.post(apiPath)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    share,

    favoriteId,
    addFavorite, getFavorite,

    addLoading,
    addCart,

    product, freight,
    getProduct,

    step, cart, total, orderId,
    getCheckProduct, checkOrder
  }
})
