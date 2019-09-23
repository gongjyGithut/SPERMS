<template>
  <div v-if="chartData.length > 0" :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null,
      yCondition: {
        type: 'bar',
        stack: 'vistors',
        barWidth: '30%'
      }
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }

    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions(dataArr) {
      const xData = []
      const yData = []
      const productCount = {}
      dataArr.forEach(item => {
        if (!productCount[item.eId]) {
          productCount[item.eId] = item.psMount
          xData.push(item.eId)
        } else {
          productCount[item.eId] += item.psMount
        }
      })
      for (const item in productCount) {
        const data = []
        const temp = Object.assign({}, this.yCondition)
        data.push(productCount[item])
        temp.data = data
        yData.push(temp)
      }
      console.log(yData)
      this.chart.setOption({
        xAxis: {
          data: xData,
          boundaryGap: true,
          axisTick: {
            show: true
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        // legend: {
        //   data: legend
        // },
        series: yData
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
