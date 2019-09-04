<template>
    <div class="app-container">
        <el-row  class="toolbar">
            <el-form :inline="true">
                <el-form-item label="">
                    <el-date-picker
                        type="datetime"
                        placeholder="开始时间"
                        v-model="startTime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                
            

                <el-form-item label="">
                    <el-date-picker
                        type="datetime"
                        placeholder="结束时间"
                        v-model="endTime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="">
                    <el-input 
                        style="min-width:220px"
                        v-model="tradeNo"
                        placeholder="交易编号" >
                        
                    </el-input>
                </el-form-item>



                <el-form-item label="">
                    <el-input 
                        style="min-width:220px"
                        v-model="customerName"
                        placeholder="客户名称" >
                        
                    </el-input>
                </el-form-item>

                <el-form-item label="">
                    <el-input 
                        style="min-width:220px"
                        v-model="equipmentName"
                        placeholder="设备名称" >
                        
                    </el-input>
                </el-form-item>

                <el-form-item label="">
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
        ref="rentmanagerTable"
        :data="rentmanagerList"
        v-loading="loading"
        @selection-change="selChang"
        @row-click="rowClick"
        highlight-current-row
        height="calc(100vh - 260px)"
        style="width:100%">
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="交易编号" prop="tradeNo"></el-table-column>
            
            <el-table-column label="计费方式" prop="cmNo">

            </el-table-column>

            <el-table-column label="客户编号" prop="customerNo">

            </el-table-column>

            <el-table-column label="设备编号" prop="eId">

            </el-table-column>

            <el-table-column label="租借时间" prop="rentDate"></el-table-column>
            
            <el-table-column label="租借结束时间" prop="rentEndDate">

            </el-table-column>

            <el-table-column label="使用地点" prop="rentPlace">

            </el-table-column>

        </el-table>
        
        <pagination :total="total" :currentPage.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getRentmanagerList"/>
        
        <form-dialog :isdialogShow.sync="isdialogShow" :dialogTitle="dialogTitle" :dialogFormData="dialogFormData" @reload="reload"/>
    </div>
</template>

<script>
import {getRentmanagerList,deleteRentmanager} from '@/api/setting/rentmanager'
import Pagination from '@/components/Pagination'
import formDialog from './dialog'
import {parseTime} from '@/utils/index'
export default {
    name:'',
    components:{Pagination,formDialog},
    data() {
        let me = this
        return {
            rentmanagerList:[],
            startTime:new Date(new Date().getTime() - 3600 * 1000 * 24 * 7),
            endTime:new Date(),
            tradeNo:'',
            customerName:'',
            equipmentName:'',
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
            pickerOptions :{
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            
        }
    },
    mounted() {
        this.$nextTick(() =>{
            this.getRentmanagerList()
            this.dialogFormData = Object.assign({},this.dialogForm)
        })
    },
    methods: {
        getRentmanagerList(){
            let parmas = Object.assign({},this.page)

            parmas.tradeNo = this.tradeNo
            parmas.customerName = this.customerName
            parmas.equipmentName = this.equipmentName

            if(!!this.startTime && !!this.endTime){
                
                parmas.startTime = parseTime(this.startTime)
                parmas.endTime = parseTime(this.endTime)

                if(parmas.startTime > parmas.endTime){
                    this.$message.error('开始时间不能大于结束时间')
                    return
                }
            }else{
                this.$message.error('请检查是否选择时间')
                return
            }
            this.loading = true
            getRentmanagerList(parmas).then((res)=>{
                this.rentmanagerList = res.records
                this.total = res.totalCount
                this.loading = false
            })
        },
        handleSearch(){
            this.page.pageNo = 1
            this.getRentmanagerList()
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
            let rentmanagerParmas = {}
            let tradeNos = []
            this.selectData.forEach(v=>{
                tradeNos.push(v.tradeNo)
            })
            rentmanagerParmas.tradeNos = tradeNos

            this.$confirm('将删除选中信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                
                deleteRentmanager(rentmanagerParmas).then(() =>{
                    this.$message.success('删除成功')
                    this.startTime = new Date(new Date().getTime() - 3600 * 1000 * 24 * 7)
                    this.endTime = new Date()
                    this.getRentmanagerList()
                })
            })
            
        },
        reload(){
            this.startTime = new Date(new Date().getTime() - 3600 * 1000 * 24 * 7)
            this.endTime = new Date()
            this.getRentmanagerList()
        },
        selChang(row){
            console.log(row)
            this.selectData=row
        },
        rowClick(row){
            console.log(row)
            this.$refs.rentmanagerTable.clearSelection()
            this.$refs.rentmanagerTable.toggleRowSelection(row)

        },
        formatTime(row){
            return parseTime(row.eDate)
        }
    },
}
</script>
<style lang="scss" scoped>

</style>
