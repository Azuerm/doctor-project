<template>
  <div>
    <h2>列表</h2>
    <div class="listnum" @click="handleListClick">
      <div v-for="item in productList" :key="item.id" class="list-item">
        <div>产品名称: {{ item.name }}</div>
        <div>产品价格: {{ item.price }}</div>
        <van-button type="primary" size="small" data-action="detail" :data-id="item.id" data-name="item.name">
          查看详情
        </van-button>
        <van-button type="danger" size="small" data-action="delete" :data-id="item.id"> 
          删除
        </van-button>
      </div>
    </div>
    <van-popup v-model:show="showDelete" round :style="{ padding: '20px'}">
      <div>确定删除吗？</div>
      <van-button type="primary" size="small" @click="handleDelete">确定</van-button>
      <van-button type="danger" size="small" @click="showDelete = false">取消</van-button>
    </van-popup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const productList = ref([
  { id: 1, name: '苹果' , price: 10 },
  { id: 2, name: '香蕉', price: 20 },
  { id: 3, name: '橙子', price: 30 },
  { id: 4, name: '西瓜', price: 40 },
  { id: 5, name: '葡萄', price: 50 },
  { id: 6, name: '草莓', price: 60 },
  { id: 7, name: '樱桃', price: 70 },
  { id: 8, name: '芒果', price: 80 },
  { id: 9, name: '火龙果', price: 90 },
  { id: 10, name: '梨', price: 100 },
  { id: 11, name: '桃子', price: 110 },
  { id: 12, name: '柚子', price: 120 }
])
const showDelete = ref(false)
const deleteId = ref(null) // 记录待删除项的 id,供确认弹窗使用
const handleListClick = (event) => {
  const targetButton = event.target.closest?.('[data-action]')
  if (!targetButton) return
  const action = targetButton.dataset.action
  const productId = Number(targetButton.dataset.id)
  const productName = productList.value.find(item => item.id === productId)?.name || ''
  switch (action) {
    case 'detail':
      router.push({
        name: 'detail',
        params: {
          productId,
          productName
        }
      })
      break;
    case 'delete':
      deleteId.value = productId // 先存下要删的 id
      showDelete.value = true
      break;
    default:
      break;
  }
}
const handleDelete = () => {
  productList.value = productList.value.filter(item => item.id !== deleteId.value)
  showDelete.value = false
}
</script>

<style lang="less" scoped>
.listnum {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.list-item {
  margin: 0.2rem 0;
  display: flex;
  // flex-direction: column;
  width: 100%;
  div {
    flex: 1;
  }
  van-button {
    flex: 1;
  }
}
</style>