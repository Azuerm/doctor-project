<template>
  <div class="main">
    <div class="content">
      <div class="title">截止 {{ formatNumber }} 全国数据统计</div>
      <div class="datalist" >
        <div class="dataitem" v-for="item in formattedList" :key="item">
          <div class="word">较昨日</div>
          <!-- <div class="color" :class="item.rawnumber >= 1000 ? 'text-red' : 'text-green'">{{ item.number }}</div> -->
          <div class="color" :class="{ 'text-red': item.rawnumber >= 1000 , 'text-green': item.rawnumber < 1000 }">{{ item.number }}</div>
          <div class="big">{{ item.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getNumberData } from '@/api/index'
import {ref,reactive,computed} from 'vue'
const numberList = ref([])
const numberTime = ref('')
// 格式化数据
const formattedList = computed(() => {
  return numberList.value.map(item => {
    return {
      ...item,
      number: Number(item.number).toLocaleString('zh-CN'),
      rawnumber: Number(item.number)
    }
  })
})
const formatNumber = computed(() =>{
  if (!numberTime.value) return '--'
  const date = new Date(Number(numberTime.value))
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  const second = String(date.getSeconds()).padStart(2, '0')
  return `${year}年${month}月${day}日 ${hour}:${minute}:${second}`
})
// 用async await 调用接口
async function getNumberDataList(){
  const res = await getNumberData()
  numberList.value = res.data.data
  numberTime.value = res.data.time
  console.log('数据接口', numberList.value);
}
getNumberDataList()
</script>

<style lang="less" scoped>
  .main {
    width: 100%;
    background-color: #706e6e;
    overflow: hidden;
    box-sizing: border-box;
    .content{
      background-color: #fff;
      padding: 0.2rem;
      margin-top: 0.3rem;
    }
    .datalist {
      margin-top: 0.2rem;
      border-radius: 10px;
      border: 1px solid #000;
      padding: 0.2rem;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      text-align: center;
      .dataitem {
        width: 33%;
      }
      .dataitem:nth-child(n+4) {
        margin-top: 0.2rem;
        // .color {
        //   color: red;
        // }
      }
      .word {
        color: #706e6e;
      }
      .big {
        font-weight: bold;
      }
    }
  }
  .text-red {
    color: red;
  }
  .text-green {
    color: green;
  }
</style>
