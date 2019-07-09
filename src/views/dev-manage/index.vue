<template>
    <div class="app-container">
        <el-table 
        :data="devData">
            <el-table-column label="设备名称" prop="name">

            </el-table-column>

            <el-table-column label="生产厂家" prop="manufacturer">

            </el-table-column>

            <el-table-column label="生产日期" prop="date">

            </el-table-column>

            <el-table-column label="规格" prop="standard">

            </el-table-column>

            <el-table-column label="类型" prop="type">

            </el-table-column>

            <el-table-column label="状态" prop="state">

            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name:'',
    component:{},
    data() {
        return {
            devData:[]
        }
    },
}
</script>
