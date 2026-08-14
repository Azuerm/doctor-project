<template>
  <div>
    <div class="titlepig">
      <img :src="titleimage" alt="" height="180px" width="100%"> 
    </div>
    <div class="content">
      <van-tabs :active="active" swiperable>
        <van-tab v-for="item in danList " :key="item.id" :title="item.name">
          <img :src="item.img" alt="">
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import titleimage from '@/assets/images/compute1.jpg'
import dandan1 from '@/assets/images/banner.jpg'
import dandan2 from '@/assets/images/compute2.jpg'
const active = ref(0)
const danList = ref([
  { id: 1, name: '蛋蛋1', img:dandan1  },
  { id: 2, name: '蛋蛋2', img:dandan2  },
])
</script>

<style lang="less" scoped>
  .titlepig {
    height: 180px;
    width: 100%;
  }
  .content {
    background-color: skyblue;
    height: calc(100vh - 180px);
    padding: 0.2rem;
    img {
      width: calc(100vw - 0.4rem);
      height: calc(100vh - 180px - 44px - 0.4rem);
    }
  }
</style>