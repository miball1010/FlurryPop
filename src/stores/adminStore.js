import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAdminStore = defineStore('adminStore', () => {
  const NowProduct = ref({
    name: '',
    price: null,
    description: '',
    component: ''
  })

  function updateProduct() {
    console.log(NowProduct.value)
  }

  return {
    NowProduct,
    updateProduct
  }
})
