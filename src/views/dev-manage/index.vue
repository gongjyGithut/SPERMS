<template>
    <div class="app-container">
        <el-table 
        :data="devData"
        style="width:100%">
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
                <template slot-scope="scope">
                    <span v-if='scope.row.state == 1' style="color:#5daf34">开启</span>
                    <span v-else style="color:#e6a23c">关闭</span>
                    <!-- {{scope.row.state == 1?'开启':'关闭'}} -->
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                   <el-button v-if="scope.row.state == 0" type="success" size="mini">开启</el-button>
                   <el-button v-else type="warning" size="mini">关闭</el-button>
                </template>

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
            devData:[
                {
                    name:'设备1',
                    state:0,
                },
                {
                    name:'设备2',
                    state:1,
                }
            ]
        }
    },
}
</script>
