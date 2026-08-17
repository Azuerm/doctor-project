<template>
  <div>
    <h2>{{provinceName}}省份</h2>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { getProvinceDetail} from "@/api/index"
import { encryptCity } from '@/utlis/encrypt'
// 1 
// const props = defineProps({
//   provinceName: {
//     type: String,
//   }
// })
// onMounted(async() => {
//   const res = await getProvinceDetail( {name: encryptCity(props.provinceName)} )
//   console.log('省份详情', res.data.data);
  
// })
// 2
// // 解构赋值，但直接解构会丢失响应式
// const {provinceName} = defineProps({
//   provinceName: {
//     type: String,
//   }
// })
// onMounted(async() => {
//   const res = await getProvinceDetail( {name: encryptCity(provinceName)} )
//   console.log('省份详情', res.data.data);
// })
// 3
const props = defineProps({
  provinceName: {
    type: String,
  }
})
import { toRefs, watch } from 'vue'
// 将props转换为响应式数据
const {provinceName} = toRefs(props)
watch(provinceName, (newVal) => {
  console.log('省份名称变化', newVal);
})
onMounted(async() => {
  const res = await getProvinceDetail( {name: encryptCity(props.provinceName)} )
  console.log('省份详情', res.data.data);
})
</script>

<style lang="less" scoped>

</style>