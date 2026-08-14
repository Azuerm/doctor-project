import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getAreaData } from '@/api/index'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  // state 
  const areaList = ref([])
  // actions
  async function getAreaList() {
    try {
      const res = await getAreaData()
      const data = res.data.data
      areaList.value = data
    }catch (error) {
      console.log(error)
    }
  }

  return { count, doubleCount, increment, getAreaList, areaList }
})
