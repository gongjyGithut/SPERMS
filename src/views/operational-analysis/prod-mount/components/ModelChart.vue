<template>
  <div>
    <div id="model-chart" :class="className" :style="{height:height,width:width}"/>
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
// import { debounce } from '@/utils'
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
      default: '350px'
    },
    chartData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      chart: null
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
  },
  beforeDestroy() {
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    setOptions({ series, xAxis } = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          // data: ['expected', 'actual'],
        },
        grid: {
          top: 50,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          data: xAxis,
          axisTick: {
            show: true
          },
          axisLabel: {
            interval: 0,
            rotate: 30
            // textStyle: {
            //   color: '#fff'// x轴刻度数值颜色
            // }
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          type: 'bar',
          barWidth: 30,
          data: series,
          color: ['#3888fa']
        }]

      })
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('model-chart'), 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
