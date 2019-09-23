<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <el-row class="chart-wrapper">
      <bar-chart v-if="equitmentStatData.length > 0 && showType === 'equitmentStat'" :chart-data="equitmentStatData" />
      <line-chart v-if="productStatData.length > 0 && showType === 'productStat'" :chart-data="productStatData"/>
      <pie-chart v-if="saleStatData.length > 0 && showType === 'saleStat'" :chart-data="saleStatData"/>
      <div v-if="equitmentStatData.length === 0|| productStatData.length === 0|| saleStatData.length === 0" class="isEmpty">
        暂无统计信息
      </div>
    </el-row>

  </div>
</template>
<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
import { getEquitmentStat, getProductStat, getSaleStat } from '@/api/data-stat'
export default {
  name: 'Chart',
  components: { PanelGroup, LineChart, BarChart, PieChart },
  data() {
    return {
      showType: 'equitmentStat',
      equitmentStatData: [],
      productStatData: [],
      saleStatData: []
    }
  },
  computed: {

  },
  created() {
    this._getEquitmentStat()
  },
  methods: {
    handleSetLineChartData(type) {
      this.showType = type
      switch (type) {
        case 'equitmentStat':
          this._getEquitmentStat()
          break
        case 'productStat':
          this._getProductStat()
          break
        case 'saleStat':
          this._getSaleStat()
          break
        default:
          break
      }
    },
    _getEquitmentStat() {
      this.equitmentStatData = []
      getEquitmentStat().then(res => {
        this.equitmentStatData = res.records
      })
    },
    _getProductStat() {
      this.productStatData = []
      getProductStat().then(res => {
        this.productStatData = res.records
      })
    },
    _getSaleStat() {
      this.saleStatData = []
      getSaleStat().then(res => {
        this.saleStatData = res.records
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  height: calc(100vh - 50px);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .isEmpty{
    font-size: 24px;
    text-align: center;
    color:rgba(100, 121, 118, 0.623);
    padding: 20px
  }
}
</style>
