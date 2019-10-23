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
          <el-input v-model="keyword" placeholder=" 客户编号或客户名称"/>
        </el-form-item>

        <el-form-item label="">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch"/>
        </el-form-item>
      </el-form>

    </el-row>

    <el-row class="container-item">
      <div class="container-text">
        <span>图表</span>
      </div>

      <div class="chart-container">
        <div class="chart-item"/>
        <div class="chart-item"/>
      </div>
    </el-row>

    <el-row class="container-item">
      <div class="container-text">
        <span>表格</span>
      </div>

      <div class="table-container">
        <el-table :data="tableData" border >
          <el-table-column label="设备编号"/>
          <el-table-column label="设备名称"/>
          <el-table-column label="开始时间"/>
          <el-table-column label="结束时间"/>
          <el-table-column label="产量"/>

          <empty-container slot="empty"/>

        </el-table>
      </div>
    </el-row>
  </div>
</template>
<script>
import EmptyContainer from '@/components/EmptyContainer'
export default {
  name: '',
  components: { EmptyContainer },
  data() {
    return {
      tableData: []
    }
  },
  created() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.app-container{
  background-color: #F2F6FC;
  .container-item{
    height: 500px;
    border:1px solid rgb(224, 227, 235);
    margin-bottom: 20px;
    background-color: #fff;
    .container-text{
      letter-spacing:15px;
      background-color: #E4E7ED;
      height: 50px;
      padding: 10px;
      font-size: 20px;
      font-weight: 600;
      color: #606266;
    }
    .table-container{
      padding: 20px;
    }
    .chart-container{
      display: flex;
      display:-webkit-flex;
      justify-content: space-around;
      flex-wrap: wrap;
      width: 100%;
      .chart-item{
        flex: 1;
        height: 470px;
      }
      :not(:last-child){
        border-right: 1px solid #E4E7ED;
      }
    }
  }
}

</style>
