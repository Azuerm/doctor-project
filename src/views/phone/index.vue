<template>
  <div>
    手机界面
    <button @click="goHome">返回首页</button>
  </div>
</template>

<script setup>
defineOptions({
  name: 'Phone'
})
import { useRouter} from 'vue-router'
const router = useRouter()
const goHome = () => {
  router.go(-1)
}
</script>