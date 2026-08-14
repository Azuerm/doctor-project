<template>
  <div>
    <div class="banner">
      <img :src="picture" alt="" height="180px" width="100%">
    </div>
    <InfoDisplay/>
    <div class="navlist" >
      <div class="navitem" @click='goPhone'>
        <div class="circle"></div>
        <div>手机</div>
      </div>
       <div class="navitem">
          <router-link to="/erji">
            <div class="circle"></div>
            <div>耳机</div>
          </router-link>
      </div>
      <div class="navitem" @click="goComputer">
        <div class="circle"></div>
        <div>电脑</div>
      </div>
      <div class="navitem">
        <div class="circle"></div>
        <div>其他</div>
      </div>
    </div>
    <div>
      <template v-if="areaMidList.length > 0" >
        <div class="tile">中风险区域 {{ areaMidList.length }}</div>
        <div class="areaitem" v-for="item in areaMidList" :key="item">
          <span>{{ item.name }}</span>
          <span>{{ item.desc }}</span>
        </div>
      </template>
    </div>
    <DataDisplay/>
    <ChinaMap/>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from "vue"
import InfoDisplay from "@/views/home/info-data/InfoDisplay.vue";
import DataDisplay from "@/views/home/info-data/dataDisplay.vue"
import ChinaMap from "@/views/home/map-data/chinaMap.vue"
import { getInfo } from "@/api/index"
import picture from "@/assets/images/banner.jpg"
import { useRouter } from "vue-router";

import { storeToRefs } from "pinia"
import { useCounterStore } from "@/stores/counter"
const counterStore = useCounterStore()
const { areaList } = storeToRefs(counterStore)

const router = useRouter();

const goPhone = () => {
  router.push('/phone')
}
const goComputer = () => {
  router.push('/computer')
}
onMounted(() => {
  counterStore.getAreaList()
}) 
const areaMidList = computed(() => areaList.value[0]?.middle || [])
</script>

<style scoped>
.navlist {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0.2rem auto;
}
.navitem {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.circle {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  background-color: pink;
}
</style>
