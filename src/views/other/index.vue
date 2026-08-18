<template>
  <div>
    <h2>选择地区</h2>
    <div class="content">
      <van-field
        v-model="fieldValue"
        is-link
        readonly
        label="出发地区"
        placeholder="请选择所在地区"
        @click="show = true"
      />
      <van-popup v-model:show="show" round position="bottom">
        <van-cascader
          v-model="cascaderValue"
          title="请选择所在地区"
          :options="options"
          @close="show = false"
          @finish="onFinish"
        />
      </van-popup>

      <van-field
        v-model="fieldValue2"
        is-link
        readonly
        label="到达地区"
        placeholder="请选择所在地区"
        @click="show2 = true"
      />
      <van-popup v-model:show="show2" round position="bottom" >
        <van-cascader
          v-model="cascaderValue2"
          title="请选择所在地区"
          :options="options"
          @close="show2 = false"
          @finish="onFinish2"
        />
      </van-popup>
      <div class="btn">
        <van-button type="primary" size="small">确 定</van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getSelectArea } from '@/api/index'
const show = ref(false)
const fieldValue = ref('')
const cascaderValue = ref('')
const cascaderValue2 = ref('')
const show2 = ref(false)
const fieldValue2 = ref('')
const options = ref([])
const onFinish = ({ selectedOptions }) => {
  show.value = false
  fieldValue.value = selectedOptions.map((option) => option.text).join('/')
  // join 数组转换为字符串，用 '/' 分隔
}
const onFinish2 = ({ selectedOptions }) => {
  show2.value = false
  fieldValue2.value = selectedOptions.map((option) => option.text).join('/')
}
onMounted(async() => {
  const res = await getSelectArea()
  const areaList = res.data.data
  console.log('areaList', areaList);
  const areaOptions = areaList.map((item) => {
    return {
      text: item.province,
      value: item.province_id,
      children: item.citys.map((city) => {
        return {
          text: city.city,
          value: city.city_id,
        }
      })
    }
  })
  options.value = areaOptions
  
})
</script>

<style lang="less" scoped>
  :deep(.van-cascader__option) {
    padding: 0.1rem 0.28rem !important;
  }
  .btn {
    display: flex;
    justify-content: center;
  }
</style>