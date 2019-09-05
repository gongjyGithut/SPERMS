<template>
    <div class="app-container">
        <el-row  class="toolbar">
            <el-form :inline="true">
              <el-form-item label="">
                <el-input 
                v-model="cmNo"
                placeholder="计费编号" 
                prefix-icon="el-icon-search">
                    
                </el-input>
              </el-form-item>

              <el-form-item>
                <el-button 
                    type="primary" 
                    icon="el-icon-search"
                    @click="handleSearch">
                </el-button>

                <el-button-group >
                    <el-button 
                        type="success" 
                        icon="el-icon-circle-plus" 
                        @click.stop="handleAdd">
                    </el-button>

                    <el-button 
                        type="warning" 
                        icon="el-icon-edit" 
                        :disabled="selectData.length !== 1"
                        @click.stop="handleUpdate">
                    </el-button>

                    <el-button 
                        type="danger" 
                        icon="el-icon-delete" 
                        :disabled="selectData.length <= 0"
                        @click.stop="handleDelete">
                    </el-button>
                </el-button-group>
              </el-form-item>
            </el-form>
            
        </el-row>
        
        <el-table 
        ref="caculationTable"
        :data="caculationList"
        border
        @selection-change="selChang"
        @row-click="rowClick"
        highlight-current-row
         
        style="width:100%">
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="计费编号" prop="cmNo"></el-table-column>
            
            <el-table-column label="计费方式" prop="cmDay">

            </el-table-column>

            <el-table-column label="费用" prop="cmFee">

            </el-table-column>

        </el-table>
        
        <pagination :total="total" :currentPage.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getCaculationList"/>
        
        <form-dialog :isdialogShow.sync="isdialogShow" :dialogTitle="dialogTitle" :dialogFormData="dialogFormData" @reload="getCaculationList"/>
    </div>
</template>

<script>
import {getCaculationList,deleteCaculation} from '@/api/setting/caculation'
import Pagination from '@/components/Pagination'
import formDialog from './dialog'
import {parseTime} from '@/utils/index'
export default {
    name:'',
    components:{Pagination,formDialog},
    data() {
        let me = this
        return {
            caculationList:[],
            cmNo:'',
            total:0,
            page:{
                pageNo:1,
                pageSize:50,
            },
            selectData:[],
            loading:false,
            isdialogShow:false,
            dialogTitle:'',
            dialogForm:{
                cmNo: '',
                cmFee: '',
                cmDay: '0',
            },
            dialogFormData:{},
            
        }
    },
    mounted() {
        this.$nextTick(() =>{
            this.getCaculationList()
            this.dialogFormData = Object.assign({},this.dialogForm)
        })
    },
    methods: {
        getCaculationList(){
            let parmas = Object.assign({},this.page)

            parmas.cmNo = this.cmNo
            this.loading = true
            getCaculationList(parmas).then((res)=>{
                this.caculationList = res.records
                this.total = res.totalCount
                this.loading = false
            })
        },
        handleSearch(){
            this.page.pageNo = 1
            this.getCaculationList()
        },
        handleAdd(){
            this.isdialogShow = true
            this.dialogTitle = '添加'
            this.dialogFormData = Object.assign({},this.dialogForm)
        },
        handleUpdate(){
            this.isdialogShow = true
            this.dialogTitle = '修改'
            this.dialogFormData = Object.assign({},this.selectData[0])
        },
        handleDelete(){
            let caculationParmas = {}
            let cmNos = []
            this.selectData.forEach(v=>{
                cmNos.push(v.cmNo)
            })
            caculationParmas.cmNos = cmNos

            this.$confirm('将删除选中信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                
                deleteCaculation(caculationParmas).then(() =>{
                    this.$message.success('删除成功')
                })
            })
            
        },
        selChang(row){
            console.log(row)
            this.selectData=row
        },
        rowClick(row){
            console.log(row)
            this.$refs.caculationTable.clearSelection()
            this.$refs.caculationTable.toggleRowSelection(row)

        },
        formatTime(row){
            return parseTime(row.eDate)
        }
    },
}
</script>
<style lang="scss" scoped>

</style>
