<template>
  <div class="map-container">
    <div class="title">国内地图</div>
    <div class="content">
      <van-tabs v-model="active" swipeable :lazy-render="false" >
        <van-tab title="务工人数">
          <div ref="workChart" class="chart"></div>
        </van-tab>
        <van-tab title="低于18岁人数">
          <div ref="lowChart" class="chart"></div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { getMapData } from '@/api/index'
import { useRouter } from 'vue-router'
const router = useRouter()
// ---------- 性能优化①: echarts 按需引入 ----------
// 之前用 `import * as echarts from 'echarts'` 会打进整个 echarts 全量包(约 1MB),
// 现在只引入地图相关的核心模块,首屏 JS 体积明显减小。
import * as echarts from 'echarts/core'
import { MapChart } from 'echarts/charts'
import { TooltipComponent, VisualMapComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
// 注册用到的图表类型 / 组件 / 渲染器
echarts.use([MapChart, TooltipComponent, VisualMapComponent, CanvasRenderer])

// ---------- 性能优化②: 中国地图 GeoJSON 动态加载 ----------
let chinaReady = null // 缓存注册 Promise,避免重复 import/registerMap
function ensureChinaMap() {
  if (!chinaReady) {
    chinaReady = import('@/assets/json/china.json').then(({ default: chinaJson }) => {
      echarts.registerMap('china', chinaJson) // 以 "china" 为名注册,series.map 会引用它
    })
  }
  return chinaReady
}

// tab 当前激活索引(与 v-model 双向绑定)
const active = ref(0)
// 图表容器(ref 与模板中 ref="workChart"/"lowChart" 自动绑定)
const workChart = ref(null)
const lowChart = ref(null)
// 图表实例对象(供 resize / dispose 使用)
let workMyChart = null
let lowMyChart = null

// ---------- 核心: option 工厂函数 ----------
// 两张地图共用同一套配置,只有 data 不同;想改样式/tooltip/配色只改这一处。
function buildMapOption(data) {
  // visualMap 的最大值按当前数据动态计算
  const values = data.map((item) => item.value)
  const max = values.length ? Math.max(...values) : 1

  return {
    // tooltip: 悬浮到省份上时显示的数据提示框
    tooltip: {
      // trigger: 'item', // item: 按数据项触发
      triggerOn: 'click',
      enterable: true, // 鼠标进入提示框区域时,不立即隐藏
      formatter: (params) => `${params.name}<br/>数值: ${params.value || 0}<br/>详情：<span class="province-link" data-province="${params.name}">跳转</span>`, // 自定义悬浮内容
      // data-name的作用：点击跳转时，作为路由参数传递
    },
    // visualMap: 按 value 大小映射颜色深浅
    visualMap: {
      min: 0, // 最小值(最浅色)
      max: max, // 最大值(最深色),按数据动态取
      top: 'bottom',
      text: ['高', '低'], // 图例文字
      inRange: {
        // 颜色渐变范围
        color: ['#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
      },
    },
    series: [
      {
        type: 'map',
        map: 'china', // 对应上面注册的地图名
        roam: false,
        zoom: 1.2,
        label: {
          show: true, // 显示省份名称
          fontSize: 9,
        },
        emphasis: {
          label: { show: true, color: '#333' },
          itemStyle: { areaColor: '#ffd666' }, // 悬浮高亮色
        },
        data, // 务工图传 workData,低龄图传 lowData
      },
    ],
  }
}

// 初始化一张地图: 传入容器 DOM 和该图数据,返回图表实例
function createChart(container, data) {
  if (!container) return null
  const chart = echarts.init(container)
  chart.setOption(buildMapOption(data))

  // tooltip 内容是纯 HTML,不支持 @click;改用事件委托绑定跳转
  container.addEventListener('click', (e) => {
    // closest的作用：从当前元素开始向上查找，直到找到符合条件的元素
    const link = e.target.closest?.('.province-link')
    if (link) goProvince(link.dataset.province)
  })

  return chart
}

onMounted(async () => {
  // ---------- 性能优化③: 接口请求 与 地图数据注册 并行执行 ----------
  // 两者互不依赖,串行会白白浪费一次网络/加载时间
  let list = []
  try {
    const [res] = await Promise.all([getMapData(), ensureChinaMap()])
    list = res.data.data
  } catch (error) {
    console.error('获取省数据失败:', error)
    // 失败也要确保地图注册完成,避免后续 init 时报 "Map china not exists"
    try { await ensureChinaMap() } catch (e) { /* 忽略 */ }
    return
  }

  // 整理成 echarts 需要的 { name, value } 格式;value 转成数字,否则 visualMap 不按数值着色
  const workData = list.map((item) => ({ name: item.provincearea, value: Number(item.worknum) }))
  const lowData = list.map((item) => ({ name: item.provincearea, value: Number(item.kidnum) }))

  // :lazy-render="false" 后两个容器在挂载时都已存在,onMounted 里可直接拿 ref 初始化
  workMyChart = createChart(workChart.value, workData)
  lowMyChart = createChart(lowChart.value, lowData)
})

// 切 tab 时,把显示出来的那张图 resize 恢复正确尺寸
// 原因: 非激活 tab 的面板是 display:none,初始化时它的尺寸为 0,
//   echarts 在 0 尺寸容器上画不出来,切回显示时必须 resize 才可见。
watch(active, (val) => {
  const chart = val === 1 ? lowMyChart : workMyChart
  chart && chart.resize()
})

// 点击省份跳转到详情页
const goProvince = (name) => {
  router.push({
    name: 'province',
    params: { provinceName: name } 
  })
}
onBeforeUnmount(() => {
  // 卸载时销毁两个图表实例,释放内存
  if (workMyChart) {
    workMyChart.dispose()
    workMyChart = null
  }
  if (lowMyChart) {
    lowMyChart.dispose()
    lowMyChart = null
  }
})
</script>

<style lang="less" scoped>
  .map-container {
    padding: 0.2rem;
  }
  /* 图表容器: 必须有明确高度,否则 echarts 无法渲染 */
  .chart {
    width: 100%;
    height: 8rem;
  }
  // :global(.province-link) {
  //   color: red;
  // }
  :deep(.province-link) {
    color: red;
  }
  // 所以是因为vue的scoped机制做了防伪标，但echarts的tooltip是js动态生成的，直接挂载在body根节点，不知道vue的存在，没有防伪标对不上，只有通过global/deep不管防伪标才能找到元素
</style>
