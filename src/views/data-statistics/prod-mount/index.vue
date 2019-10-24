<template>
  <div class="app-container">
    <el-row class="search-form">
      <el-form :inline="true">
        <el-form-item label="">
          <el-date-picker v-model="startTime" type="date" value-format="yyyy-MM-dd" placeholder="开始时间"/>
        </el-form-item>

        <el-form-item label="">
          <el-date-picker v-model="endTime" type="date" value-format="yyyy-MM-dd" placeholder="结束时间"/>
        </el-form-item>

        <el-form-item label="">
          <el-input
            v-model="keywords"
            placeholder="设备编号或客户编号">
            <el-select slot="prepend" v-model="selectOption">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
            </el-select>
          </el-input>
        </el-form-item>

        <el-form-item label="统计方式">
          <el-select v-model="statType" style="width:100px;">
            <el-option :value="1" label="按天"/>
            <el-option :value="2" label="按月"/>
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch"/>
        </el-form-item>
      </el-form>

    </el-row>

    <el-row class="chart-container">
      <div class="chart-item">
        <div class="chart-text">
          型号数量统计
        </div>

        <model-chart :chart-data="outputData" class="chart"/>
      </div>

      <div class="chart-item">
        <div class="chart-text">
          设备产量统计
        </div>
        <output-chart :chart-data="outputData"/>
      </div>

    </el-row>

    <el-row >
      <el-table :data="tableData" border >
        <el-table-column label="设备编号"/>
        <el-table-column label="设备名称"/>
        <el-table-column label="开始时间"/>
        <el-table-column label="结束时间"/>
        <el-table-column label="产量"/>

        <empty-container slot="empty"/>
      </el-table>
    </el-row>
  </div>
</template>
<script>
import EmptyContainer from '@/components/EmptyContainer'
import OutputChart from './components/OutputChart'
import ModelChart from './components/ModelChart'
import { notifyWarning } from '@/utils/notify.js'
import { getOutputStatistics } from '@/api/data-statistics/prod-mount.js'
export default {
  name: '',
  components: { EmptyContainer, OutputChart, ModelChart },
  data() {
    return {
      keywords: '',
      startTime: '',
      endTime: '',
      tableData: [],
      options: [{
        label: '客户编号',
        value: 'customerNo'
      }, {
        label: '设备编号',
        value: 'eId'
      }],
      selectOption: '',
      statType: 1,
      chartData: {
        saleList: [],
        customerList: []
      },
      outputData: {
        series: [],
        xAxis: []
      }
    }
  },
  created() {
    this.getChartData()
  },
  methods: {
    getChartData() {
      const parmas = {}
      if (!!this.startTime && !!this.endTime) {
        parmas.startTime = this.startTime
        parmas.endTime = this.endTime

        if (this.startTime > this.endTime) {
          notifyWarning('开始时间不能大于结束时间')
          return
        }
      }
      parmas[this.selectOption] = this.keywords
      parmas['statType'] = this.statType
      this.total = 0
      this.tableData = []
      this._getOutputStatistics(parmas)
    },
    _getOutputStatistics(parmas) {
      getOutputStatistics(parmas).then(res => {
        const { records } = res
        records.forEach(item => {
          this.outputData.series.push(item.psMount)
          this.outputData.xAxis.push(item.dataTime)
        })
      })
    },
    handleSearch() {
      this.outputData = {
        series: [],
        xAxis: []
      }
      this.getChartData()
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container{
  // background-color: #F2F6FC;
  .chart-container{
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    .chart-item{
      flex: 1;
      border:1px solid #EBEEF5;
      .chart-text{
        background-color: whitesmoke;
        height: 50px;
        line-height: 50px;
        font-size: 20px;
        font-weight: 600;
        color: #425464;
        padding-left: 20px;

      }
      &:not(:last-child){
        margin-right: 40px;
      }
    }
  }
}

</style>
