<template>
  <div class="main">
    <swiper
      :modules="modules"
      :loop="true"
      :autoplay="{ delay: 2000 }"
      :pagination="{ clickable: true }"
      class="my-swiper"
      @swiper="setSwiperRef"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="item in slideList" :key="item">
        <div>img-----{{ item }}</div>
      </swiper-slide>
    </swiper>
    <div class="content">
      <ul>
        <li v-for="item in slideList" :key="item" :class="{active: textNum == item }" @click="changeTextNum(item)">文字{{ item }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination  } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
const modules = [Autoplay, Pagination]
const slideList = [1, 2, 3,  4, 5]
const textNum = ref(1)
// swiper 初始化完成后,会通过 @swiper 事件把 Swiper 实例对象"送"给我们
const swiperInstance = ref(null) // 存放 Swiper 实例的引用
const setSwiperRef = (swiper) => {
  swiperInstance.value = swiper
}
// @slideChange: 每次轮播切换(自动播放 / 手动滑动 / 调用 slideTo)时都会触发
const onSlideChange = (swiper) => {
  textNum.value = swiper.realIndex + 1
}
// 点击文字时,调用实例的 slideTo() 跳转到对应 banner
const changeTextNum = (item) => {
  textNum.value = item // 更新高亮状态
  // slideTo(index, speed): index 从 0 开始,所以 item - 1; speed 是过渡时长(ms)
  if (swiperInstance.value) {
    swiperInstance.value.slideTo(item - 1, 1000)
  }
}


</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 5rem;
  background-color: skyblue;

  .my-swiper {
    width: 100%;
    height: 100%;

    .swiper-slide {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .content {
    width: 100%;
    ul {
      display: flex;
      li {
        flex: 1;
        height: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ccc;
        margin: 0.1rem !important;
      }
      :deep(.active)  {
        background-color: rgb(219, 193, 46) ;
      }
    }
  }
} 


</style>