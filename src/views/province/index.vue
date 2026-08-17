<template>
  <div>
    <h2>{{provinceName}}省份</h2>
  </div>
</template>

<script setup>
defineProps({
  provinceName: {
    type: String,
    default: ''
  }
})
</script>

<style lang="less" scoped>

</style>