<template>
  <van-tabbar
    v-if="isTabPage"
    route
    fixed
    placeholder
    safe-area-inset-bottom
  >
    <van-tabbar-item
      v-for="tab in tabs"
      :key="tab.path"
      :to="tab.path"
      :icon="tab.icon"
    >
      {{ tab.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// 标签页配置：标题、路由、图标集中维护，便于后续替换图标或调整顺序
const tabs = [
  { title: '首页', path: '/', icon: 'home-o' },
  { title: '分类', path: '/category', icon: 'apps-o' },
  { title: '消息', path: '/message', icon: 'chat-o' },
  { title: '我的', path: '/profile', icon: 'user-o' },
]

const route = useRoute()
const tabPaths = tabs.map((tab) => tab.path)

// 仅标签页路由显示 TabBar，/province、/list、/detail 等非标签页路由隐藏
const isTabPage = computed(() => tabPaths.includes(route.path))
</script>