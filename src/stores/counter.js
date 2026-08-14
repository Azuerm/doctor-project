import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getAreaData } from '@/api/index'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  // state: 风险地区数据(全局共享,多个页面/组件都在用)
  const areaList = ref([])

  // 步骤1: 记录"正在进行的请求 Promise",用于并发去重
  //   - 为 null: 当前没有请求在跑
  //   - 不为 null: 已有请求进行中,新调用直接复用该 Promise,不再发新请求
  let areaPromise = null

  // 步骤2: 把 getAreaList 改造成"幂等请求"
  // 参数 force:
  //   - 默认 false: 已有数据则直接用缓存,不发请求
  //   - 传 true: 忽略缓存,强制重新拉取(用于下拉刷新等场景)
  async function getAreaList(force = false) {
    // 步骤2.1 命中缓存: 数据已加载且不是强制刷新,直接返回缓存
    if (!force && areaList.value.length > 0) {
      return areaList.value
    }

    // 步骤2.2 并发去重: 已经有请求在跑,直接复用同一个 Promise
    if (areaPromise) {
      return areaPromise
    }

    // 步骤2.3 真正发请求,并把 Promise 存起来供后续复用
    areaPromise = getAreaData()
      .then((res) => {
        // 从响应中取 data 数组存入 store,页面通过 storeToRefs 读取
        areaList.value = res.data.data
        return areaList.value
      })
      .finally(() => {
        areaPromise = null
      })

    return areaPromise
  }

  return { count, doubleCount, increment, getAreaList, areaList }
})
