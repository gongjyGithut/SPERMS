<template>
<div class="left-container">
    <div class="equitment-table">
        <div class="table-name">
            设备列表
        </div>
        <el-table >
          <el-table-column label="编号"></el-table-column>
          <el-table-column label="名称"></el-table-column>
          <el-table-column label="产量"></el-table-column>
        </el-table>

        
    </div>


    <div class="error-table">
        <div class="table-name">
            故障列表
        </div>
        <el-table >
          <el-table-column label="编号"></el-table-column>
          <el-table-column label="名称"></el-table-column>
          <el-table-column label="问题"></el-table-column>
        </el-table>

        
    </div>
</div>
</template>
<style lang="scss" scoped>
.left-container{
    .equitment-table{
        height: 315px;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
        border-color: rgba(0, 0, 0, .05);
    }
    .error-table{
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