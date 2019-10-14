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
    <div class="select">
      <el-select v-model="value" placeholder="请选择" @change="selectChange">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    
    <div id="stuste-stat" :class="className" :style="{height:height,width:width}"/>
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { getEquitmentStat } from '@/api/data-stat'
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
      dataList: [],
      value:'all',
      options:[{
        value: 'all',
        label: '所有'
      }],
      chartData:[]
    }
  },
  computed: {
    data(){
      if(!!this.dataList){
        return this.dataList[this.value]

      }
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        const dataObj ={
          data:val
        }
        this.setOptions(dataObj)
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
      let allNormalCount = 0
      let allRepairCount = 0
      let allScrappCount = 0
      await getEquitmentStat(params).then(res => {
        res.records.forEach(item =>{
          const { customerName, normalCount, repairCount, scrappCount } = item
          let ary = [].concat([normalCount, repairCount, scrappCount])
          allNormalCount += normalCount
          allRepairCount += repairCount
          allScrappCount += scrappCount
          this.dataList[customerName] = ary
          this.options.push({
            value:customerName,
            label: customerName
          })
        })
        this.dataList['all'] = [].concat([allNormalCount, allRepairCount, allScrappCount])
        this.chartData = this.dataList['all']
      })
    },
    selectChange(val){
      this.chartData = this.dataList[val]
    },
    handleSearch(){
      this.dataList = {}
      this.options = [{
        value: 'all',
        label: '所有'
      }]
      this.getStateData()
    },
    setOptions({data} = {}) {
      if(!data){
        return
      }
      this.chart.setOption({
        title: {
          text: `在线${data[0]?data[0]:'0'}台,离线${data[1]?data[1]:'0'}台,停机${data[2]?data[2]:'0'}台,故障${data[3]?data[3]:'0'}台`,
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
          data: ['在线','离线','停机','故障'],
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
          data: data,
          color:function(params) { 
            var colorList = ['#3888fa','#CD5B45','#ABABAB','#EE9201'];
            return colorList[params.dataIndex] 
            } 
          }]
        
      })
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('stuste-stat'), 'macarons')
      // this.getStateData()
      this.setOptions(this.dataList)
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
