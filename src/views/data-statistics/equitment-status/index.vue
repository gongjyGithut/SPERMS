<template>
  <div>
    <status-group/>

    <el-row class="table-container">

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

      <el-table :data="tableData" border >
        <el-table-column label="客户名称" prop="customerName"/>
        <el-table-column label="设备数量"/>
        <el-table-column label="在线" prop="normalCount"/>
        <el-table-column label="离线"/>
        <el-table-column label="故障"/>
        <el-table-column label="停机"/>

        <empty-container slot="empty" class="empty"/>

      </el-table>

    <!-- <pagination :total="total" :current-page.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getEqList"/> -->

    </el-row>
  </div>
</template>
<script>
import StatusGroup from './components/StatusGroup'
import EmptyContainer from '@/components/EmptyContainer'
import { getEquitmentStatus } from '@/api/data-statistics/equitment-status.js'
import { notifyWarning } from '@/utils/notify.js'
export default {
  name: '',
  components: { StatusGroup, EmptyContainer },
  data() {
    return {
      startTime: '',
      endTime: '',
      keyword: '',
      tableData: []

    }
  },
  created() {
    this._getEquitmentStatus()
  },
  methods: {
    _getEquitmentStatus() {
      const parmas = {}
      if (!!this.startTime && !!this.endTime) {
        if (this.startTime > this.endTime) {
          notifyWarning('开始时间不能大于结束时间')
          return
        }
        parmas.startTime = this.startTime
        parmas.endTime = this.endTime
      }
      getEquitmentStatus(parmas).then(res => {
        const { records } = res
        this.tableData = records
      })
    },
    handleSearch() {
      this.tableData = []
      this._getEquitmentStatus()
    }
  }
}
</script>
<style lang="scss" scoped>
.table-container{
    padding: 20px;
}
</style>
