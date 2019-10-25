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
          <el-input v-model="keyword" placeholder=" 客户编号或名称"/>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch"/>
        </el-form-item>
      </el-form>

    </el-row>

    <el-row class="table-container">
      <el-col :span="6" class="left">
        <el-table :data="tableData" border height="500px">
          <el-table-column label="客户名称" prop="customerName"/>
          <el-table-column label="设备数量"/>
          <el-table-column label="销售总额" prop="salesAccount"/>

          <empty-container slot="empty"/>
        </el-table>

      </el-col>

      <el-col :span="17" class="right">
        <div class="sale-text">营业额</div>

        <div class="sale-chart">
          <div class="text">营业总额：{{ saleCount }}</div>
          <sale-chart :chart-data="chartData"/>
        </div>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import EmptyContainer from '@/components/EmptyContainer'
import { getSaleStat } from '@/api/operational-analysis/sales-account.js'
import SaleChart from './components/SaleChart'
import { notifyWarning } from '@/utils/notify.js'
export default {
  name: '',
  components: { EmptyContainer, SaleChart },
  data() {
    return {
      chartData: {
        saleList: [],
        customerList: []
      },
      tableData: [],
      startTime: '',
      endTime: '',
      keyword: '',
      saleCount: 0
    }
  },
  created() {
    this.getStateData()
  },
  methods: {
    async getStateData() {
      const parmas = {}
      if (!!this.startTime && !!this.endTime) {
        if (this.startTime > this.endTime) {
          notifyWarning('开始时间不能大于结束时间')
          return
        }
        parmas.startTime = this.startTime
        parmas.endTime = this.endTime
      }
      await getSaleStat(parmas).then(res => {
        const { records } = res
        records.forEach(item => {
          const { customerName, salesAccount } = item
          this.saleCount += salesAccount
          this.chartData.saleList.push(salesAccount)
          this.chartData.customerList.push(customerName)
        })
        this.tableData = records
        console.log(this.chartData)
      })
    },
    handleSearch() {
      this.tableData = []
      this.saleCount = 0
      this.chartData = {
        saleList: [],
        customerList: []
      }
      this.getStateData()
    }
  }
}
</script>
<style lang="scss" scoped>

.table-container{
  .right{
    height: 500px;
    border: 1px solid #d8d8d8;
    margin-top: 20px;
    margin-left: 10px;
    .sale-text{
      width: 100%;
      height: 44px;
      background-color: #d8d8d8;
      color: #425464;
      font-weight: bold;
      font-size: 18px;
      padding: 15px;
    }

    .sale-chart{
      margin-top: 30px;
      text-align: center;
      color:#3888fa;
      font-size: 20px;
      font-weight: 550;
    }
  }

}
</style>
