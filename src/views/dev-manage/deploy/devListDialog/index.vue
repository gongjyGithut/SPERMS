<template>
    <div>
        <el-dialog 
        title="选择设备"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :show-close="false">
            <div class="dev-container">
                <el-table 
                ref="equipmentTable"
                :data="listData"
                @selection-change="selChange"
                @row-click="rowClick"
                highlight-current-row
                border 
                height="400px">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column label="设备编号"></el-table-column>
                    <el-table-column label="设备名称"></el-table-column>
                    <el-table-column label="对接厂家"></el-table-column>
                    <el-table-column label="规格"></el-table-column>
                </el-table>
                <pagination :total="total" :currentPage.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getDevList"/>
            </div>
            
            <div slot="footer">
                <el-button @click="handleBack">取消</el-button>
                <el-button type="primary" @click="handleSubmit">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {getEqList} from '@/api/dev-manage/message'
import Pagination from '@/components/Pagination'
export default {
    name:'devListDialog',
    components:{Pagination},
    props:{
        devListDialogShow:{
            type:Boolean,
            default:false
        }
    },
    computed: {
        dialogVisible:{
            get(){
                return this.devListDialogShow
            },
            set(val){
                this.$emit('update:devListDialogShow',val)
            }
        }
    },
    created() {
        this.getDevList()
    },
    data() {
        return {
            listData:[],
            total:0,
            page:{
                pageNo:1,
                pageSize:50,
            },
            selectData:[]
        }
    },
    methods: {
        getDevList(){

        },
        handleSubmit(){

        },
        handleBack(){
            this.$emit('back')
        },
        selChange(row){
            console.log(row)
            this.selectData=row
        },
        rowClick(row){
            console.log(row)
            this.$refs.equipmentTable.clearSelection()
            this.$refs.equipmentTable.toggleRowSelection(row)

        },
    },
}
</script>

<style lang="scss" scoped>
.dev-container{
    // height: 50px;
}
</style>