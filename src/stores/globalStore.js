import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('globalStore', () => {
  //Loading
  const isFullLoading = ref(false)
  const isInlineLoading = ref(false)

  //通知
  const message = ref({
    text: '',
    status: false,
    active: false
  })

  let time = null
  function pushMessage(success, newMessage) {
    if (newMessage) {
      if (message.value.active) {
        message.value.active = false
        clearTimeout(time)
      }
      setTimeout(() => {
        message.value.text = newMessage
        message.value.status = success
        message.value.active = true
      }, 100)


      time = setTimeout(() => {
        message.value.active = false
      }, 3000)
    }
  }

  //doubleCheck
  const confirm = ref({
    show: false,
    text: '',
    item: null,
    type: ''
  })

  function doubleCheck(item, type) {
    confirm.value.item = item
    if (type == 'product')
      confirm.value.text = `你確定要刪除${item.title}嗎?`
    if (type == 'order')
      confirm.value.text = `你確定要刪除訂單嗎?`
    confirm.value.type = type
    confirm.value.show = true
  }

  return {
    isFullLoading, isInlineLoading, message, confirm,
    pushMessage, doubleCheck
  }
})
