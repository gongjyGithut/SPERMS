<template>
  <div class="app-container">

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

    <el-row :gutter="10" class="table-container">
      <el-col :span="6">
        <el-table :data="tableData" border >
          <el-table-column label="客户名称" prop="customerName"/>
          <el-table-column label="设备数量"/>
          <el-table-column label="销售总额" />

          <empty-container slot="empty" class="empty"/>
        </el-table>

      </el-col>

      <el-col :span="12"/>
    </el-row>

  </div>
</template>
<script>
import EmptyContainer from '@/components/EmptyContainer'
export default {
  name: '',
  components: { EmptyContainer }
}
</script>
<style lang="scss" scoped>
.app-container{
  background-color: #f5f4f4;
}
.table-container{
  background-color: #fff;
  height: 500px;

  .empty{
    text-align: center;
  }
}
</style>
