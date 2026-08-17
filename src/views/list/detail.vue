<template>
  <div>
    <h2>商品详情: {{ productName }}</h2>
  </div>
</template>

<script setup>
defineProps(['productName'])
</script>