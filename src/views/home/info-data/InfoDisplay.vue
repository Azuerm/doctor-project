<template>
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
</template>

<script setup>
defineOptions({
  name: 'InfoDisplay',
})
defineProps({
  userInfo: {
    type: Object,
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
</style>