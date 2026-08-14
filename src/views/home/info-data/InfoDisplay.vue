<template>
  <div class="main" v-if="!loading">
    <div class="info1">
      <div class="title">头部信息</div>
      <div class="content" v-for="(item) in userInfo" :key="item.id">
        <span>姓名：{{item.name}}</span>
        <span>手机号：{{item.mobile}}</span>
        <span>描述：{{item.desc}}</span>
      </div>
    </div>
    <div class="info2">
      <div class="title">中部信息</div>
      <div class="content" v-for="(item) in userInfo" :key="item.id">
        <span>姓名：{{item.name}}</span>
        <span>手机号：{{item.mobile}}</span>
        <span>描述：{{item.desc}}</span>
      </div>
    </div>
  </div>
  <div v-else class="loading-wrapper">
    <van-loading  type="spinner" color="#1989fa" size="2rem">加载中...</van-loading>
  </div>
</template>

<script setup>
defineOptions({
  name: 'InfoDisplay',
})
import {ref, onMounted} from 'vue'
import {getInfo} from '@/api/index'
const loading = ref(true)
const userInfo = ref([])
onMounted(async() => {
  try {
    const res = await getInfo()
    userInfo.value = res.data.data || []
  } catch (error) {
    console.log(error)
  } finally {
    setTimeout(() => {
      loading.value = false
    }, 1000)
  }
})
</script>

<style scoped>
  .info1,.info2 {
    padding: 0.2rem 0.2rem;
  }
  .title {
    border-left: 0.1rem solid blue;
    padding-left: 0.1rem;
    margin-bottom: 0.1rem;
  }
  span {
    display: inline-block;
    margin: 0.1rem 0.1rem;
  }
  .loading-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px; /* 给个高度撑开 */
    background-color: pink;
  }
</style>