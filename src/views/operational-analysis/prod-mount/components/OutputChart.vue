<template>
  <div>
    <div id="output-chart" :class="className" :style="{height:height,width:width}"/>
  </div>
</template>

<script>

import Highcharts from 'highcharts'

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
      handler() {
        this.setChartsData()
      }
    }
  },
  mounted() {
    this.createChart()
    this.setChartsData()
  },
  beforeDestroy() {
    this.chart.destroy()
    this.chart = null
  },
  methods: {
    createChart() {
      Highcharts.setOptions({
        lang: {
          noData: '暂无数据'
        }
      })
      this.chart = Highcharts.chart('output-chart', {
        title: {
          text: null
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false // 禁用版权信息
        },
        xAxis: {
          categories: [],
          tickWidth: 1,
          min: 0
        },
        yAxis: [{
          title: {
            text: null // 隐藏默认的title
          },
          min: 0

        }],
        tooltip: {
          shared: true,
          followPointer: true
        },
        series: [{
          name: '产量',
          data: []
        }]
      })
    },
    setChartsData() {
      const serie = this.chart.series[0]
      serie.setData(this.chartData.series)
      this.chart.xAxis[0].setCategories(this.chartData.categories)
    }
  }
}
</script>
