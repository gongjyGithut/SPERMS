<template>
  <div>
    <div id="model-chart" :class="className" :style="{height:height,width:width}"/>
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
      handler() {
        this.setChartsData()
      },
      deep: true
      // immediate: true
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
      this.chart = Highcharts.chart('model-chart', {
        title: {
          text: null
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
        // legend: { // 设置图例位置
        //   verticalAlign: 'middle',
        //   align: 'right',
        //   layout: 'vertical'
        // },
        series: []
      })
    },
    setChartsData() {
      if (this.chart.series.length > 0) {
        this.chart.series.forEach((item, index) => {
          this.chart.series[index].remove(true)
        })
      }
      this.chartData.series.forEach((item, index) => {
        this.chart.addSeries(item)
      })

      this.chart.xAxis[0].setCategories(this.chartData.categories)
    }
  }
}
</script>
