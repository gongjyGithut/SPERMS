<template>
  <div>
    <div class="search-form">

      <el-date-picker
        v-model="dateArr"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd HH:mm:ss"/>

      <el-button class="search-btn" icon="el-icon-search" type="primary" @click.stop="handleSearch"/>

    </div>  
    <div id="stuste-stat" :class="className" :style="{height:height,width:width}"/>
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { getSaleStat } from '@/api/data-stat'
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
      default: '400px'
    }
  },
  data() {
    return {
      chart: null,
      dateArr: '',
      chartData:{
        saleList:[],
        customerList:[]
      },
      saleCount:0
    }
  },
  computed: {
    
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        
        this.setOptions(val)
      }
    },
  },
  created() {
    this.getStateData()
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    async getStateData() {
      const params = {}
      if (this.dateArr) {
        params.startTime = this.dateArr[0]
        params.endTime = this.dateArr[1]
      }
      
      await getSaleStat(params).then(res => {
        res.records.forEach(item =>{
          const { customerName, salesAccount} = item
          this.saleCount += salesAccount
          this.chartData.saleList.push(salesAccount)
          this.chartData.customerList.push(customerName)
        })
        
      })
    },
    handleSearch(){
      this.saleCount = 0
      this.chartData={
        saleList:[],
        customerList:[]
      }
      this.getStateData()
    },
    setOptions({saleList,customerList} = {}) {
      this.chart.setOption({
        title: {
          text: `销售总额:${this.saleCount}`,
          subtext: '',
          top: '0',
          left:'center'
        },
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
          data: customerList,
          axisTick: {
            show: false
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
          data: saleList,
          color:['#3888fa']
          }]
        
      })
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('stuste-stat'), 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
<style lang="scss" scoped>
.search-form{
  display: flexbox;
  padding: 20px;
  // margin-bottom: 20px;
  .search-btn{
    margin-left: 10px;
  }
}

.select{
  display: inline;
  padding: 20px;
}
</style>
