<template>
  <div>
    <status-group/>

    <el-row class="table-container">
      <el-table :data="tableData">
        <el-table-column label="客户名称"/>
        <el-table-column label="设备数量"/>
        <el-table-column label="在线"/>
        <el-table-column label="离线"/>
        <el-table-column label="故障"/>
        <el-table-column label="停机"/>
      </el-table>
    </el-row>
  </div>
</template>
<script>
import StatusGroup from './components/StatusGroup'
export default {
  name: '',
  components: { StatusGroup },
  data() {
    return {
      tableData: []
    }
  }
}
</script>
<style lang="scss" scoped>
.table-container{
    padding: 20px;
}
</style>
