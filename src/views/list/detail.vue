<template>
  <div>
    <h2>商品详情: {{ productName }}</h2>
  </div>
</template>

<script setup>
const props = defineProps(['productName'])
console.log('productName', props.productName)
</script>