<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <el-row class="chart-wrapper">
      <status-chart
        v-if="showType === 'equitmentStat'"/>
      <!-- <line-chart v-if="showType === 'productStat'"/> -->
      <sale-chart v-if="showType === 'saleStat'" />
    </el-row>

  </div>
</template>
<script>
import PanelGroup from './components/PanelGroup'
import SaleChart from './components/SaleChart'
import StatusChart from './components/StatusChart'
import PieChart from './components/PieChart'
import { getEquitmentStat, getProductStat, getSaleStat } from '@/api/data-stat'
export default {
  name: 'Chart',
  components: { PanelGroup, SaleChart, StatusChart},
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
    // this._getEquitmentStat()
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
      }
    },
    handleSearch(obj) {
      const { type, condition } = obj
      if (type === 'status') {
        const params = {}
        if (condition.dateArr) {
          params.startTime = condition.dateArr[0]
          params.endTime = condition.dateArr[1]
        }
        this._getEquitmentStat(params)
      }
    },
    _getEquitmentStat(paramsData) {
      const params = paramsData | {}
      this.equitmentStatData = []
      getEquitmentStat(params).then(res => {
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
