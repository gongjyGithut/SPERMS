<template>
<div class="right-container">
    <div class="customer-table">
        <div class="table-name">
            客户列表
        </div>
        <el-table >
          <el-table-column label="名称"></el-table-column>
          <el-table-column label="数量"></el-table-column>
          <el-table-column label="产量"></el-table-column>
        </el-table>

        
    </div>


    <div class="lock-table">
        <div class="table-name">
            锁机设备
        </div>
        <el-table >
          <el-table-column label="编号"></el-table-column>
          <el-table-column label="名称"></el-table-column>
          <el-table-column label="锁机原因"></el-table-column>
        </el-table>

        
    </div>
</div>
</template>
<style lang="scss" scoped>
.right-container{
    .customer-table{
        height: 315px;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
        border-color: rgba(0, 0, 0, .05);
    }
    .lock-table{
        margin-top: 40px;
        height: 315px;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
        border-color: rgba(0, 0, 0, .05);
    }
    .table-name{
        padding: 10px;
        font-size: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-weight: bold;
        
    }
}
</style>