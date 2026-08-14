<template>
  <div class="main" ref="mainRef">
    <h2>风险地区</h2>
    <template v-if="areaHighList.length > 0" >
      <div class="tile">高风险区域 {{ areaHighList.length }}</div>
      <div class="areaitem" v-for="item in areaHighList" :key="item">
        <span>{{ item.name }}</span>
        <span>{{ item.desc }}</span>
      </div>
    </template>
    <template v-if="areaMidList.length > 0" >
      <div class="tile">中风险区域 {{ areaMidList.length }}</div>
      <div class="areaitem" v-for="item in areaMidList" :key="item">
        <span>{{ item.name }}</span>
        <span>{{ item.desc }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import { useCounterStore } from '@/stores/counter' // 引入pinia
import { storeToRefs } from 'pinia' // 保证areaList是响应式数据
const counterStore = useCounterStore() // 获取pinia实例
const { areaList} = storeToRefs(counterStore) // 获取areaList

import { showLoadingToast, closeToast } from 'vant' // 必须手动引入函数式组件的方法

// 组件挂载时调用接口获取数据
onMounted(async() => {
  // 利用Toast组件显示加载中提示
  showLoadingToast({
    message: '加载中...',
    forbidClick: true, // 禁止背景点击
    duration: 0, // 0表示不自动关闭
    type: 'loading',
    position: 'middle',
    getContainer: () => mainRef.value, // 指定挂载节点,默认是body
  })
  try {
    await counterStore.getAreaList();
  } catch (error) {
    console.log(error);
  } finally {
    closeToast(); // 关闭加载中提示
  }
})
// 通过计算属性获取高风险和中风险区域列表
const areaHighList = computed(() => areaList.value[0]?.high || []);
const areaMidList = computed(() => areaList.value[0]?.middle || []);
</script>

<style lang="less" scoped>
.main {
  min-height: 100vh;
  padding: 0.16rem;
  box-sizing: border-box;
}
</style>
