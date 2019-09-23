<template>
  <div :class="className" :style="{height:height,width:width}" />
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
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      xData: [],
      yData: {
        normalCount: [],
        repairCount: [],
        scrappCount: []
      }
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      console.log(this.chartData)

      this.chartData.forEach(item => {
        const { customerName, normalCount, repairCount, scrappCount } = item
        this.xData.push(customerName)
        this.yData.normalCount.push(normalCount)
        this.yData.repairCount.push(repairCount)
        this.yData.scrappCount.push(scrappCount)
      })
      console.log(this.xData)
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
          // formatter(condition) {
          //  condition.forEach(item =>{

          //  })
          // }
        },
        legend: {
          data: this.xData
        },
        grid: {
          top: 30,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.xData,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '正常',
          type: 'bar',
          stack: 'vistors',
          barWidth: '30%',
          data: this.yData.normalCount
        }, {
          name: '维修',
          type: 'bar',
          stack: 'vistors',
          barWidth: '30%',
          data: this.yData.repairCount
        }, {
          name: '报废',
          type: 'bar',
          stack: 'vistors',
          barWidth: '30%',
          data: this.yData.scrappCount
        }]
      })
    }
  }
}
</script>
