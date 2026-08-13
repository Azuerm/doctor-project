<template>
  <div>
    <div class="banner">
      <img src="../../assets/images/banner.jpg" alt="" height="180px" width="100%">
    </div>
    <InfoDisplay :userInfo="infoList"/>
    <div class="navlist">
      <div class="navitem">
        <div class="circle"></div>
        <div>手机</div>
      </div>
      <div class="navitem">
        <div class="circle"></div>
        <div>耳机</div>
      </div>
      <div class="navitem">
        <div class="circle"></div>
        <div>电脑</div>
      </div>
      <div class="navitem">
        <div class="circle"></div>
        <div>其他</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue"
import InfoDisplay from "./info-data/InfoDisplay.vue";
import { getInfo } from "../../api/index"
const infoList = ref([])
getInfo().then((res) => {
  infoList.value = res.data.data;
  console.log('xxx',infoList.value)
})
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
