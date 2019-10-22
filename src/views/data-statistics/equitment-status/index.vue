<template>
  <div>
    <status-group/>

    <el-row class="table-container">

      <el-row class="search-form">
        <el-form :inline="true">
          <el-form-item label="">
            <el-date-picker v-model="startTime" placeholder="开始时间"/>
          </el-form-item>

          <el-form-item label="">
            <el-date-picker v-model="endTime" placeholder="结束时间"/>
          </el-form-item>

          <el-form-item label="">
            <el-input placeholder=" 客户编号或名称"/>
          </el-form-item>

          <el-form-item label="">
            <el-button type="primary" icon="el-icon-search" @click="handleSearch"/>
          </el-form-item>
        </el-form>

      </el-row>

      <el-table :data="tableData">
        <el-table-column label="客户名称" prop="customerName"/>
        <el-table-column label="设备数量"/>
        <el-table-column label="在线" prop="normalCount"/>
        <el-table-column label="离线"/>
        <el-table-column label="故障"/>
        <el-table-column label="停机"/>
      </el-table>

    <!-- <pagination :total="total" :current-page.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getEqList"/> -->

    </el-row>
  </div>
</template>
<script>
import StatusGroup from './components/StatusGroup'
import { getEquitmentStatus } from '@/api/data-statistics/equitment-status.js'
export default {
  name: '',
  components: { StatusGroup },
  data() {
    return {
      startTime: '',
      endTime: '',
      tableData: []

    }
  },
  methods: {
    _getEquitmentStatus() {
      getEquitmentStatus().then(res => {

      })
    },
    handleSearch() {

    }
  }
}
</script>
<style lang="scss" scoped>
.table-container{
    padding: 20px;
}
</style>
