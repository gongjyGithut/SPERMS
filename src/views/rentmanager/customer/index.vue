<template>
    <div class="app-container">
        <el-row  class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-date-picker
                        type="datetime"
                        placeholder="开始时间"
                        v-model="startTime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-date-picker
                        type="datetime"
                        placeholder="结束时间"
                        v-model="endTime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>

                <el-form-item>
                    <el-input 
                        style="min-width:220px"
                        v-model="keywords"
                        placeholder="关键字查询" 
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
        ref="customerTable"
        :data="customerList"
        border
        @selection-change="selChange"
        @row-click="rowClick"
        highlight-current-row
         
        style="width:100%">
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="客户编号" prop="customerNo"></el-table-column>
            
            <el-table-column label="姓名" prop="customerName">

            </el-table-column>

            <el-table-column label="年龄" prop="customerAge">

            </el-table-column>

            <el-table-column label="性别" prop="customerSex">
                <template slot-scope="scope">
                    {{scope.row.customerSex == 0?'女':'男'}}
                </template>
            </el-table-column>

            <el-table-column label="手机号" prop="customerPhone">

            </el-table-column>

            <el-table-column label="邮箱" prop="customerEmail">

            </el-table-column>

            <el-table-column label="单位" prop="customerCompany">
                
            </el-table-column>

            <el-table-column label="地址" prop="customerAddr">
            </el-table-column>
        </el-table>
        
        <pagination :total="total" :currentPage.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getCustomerList"/>
        
        <form-dialog :isdialogShow.sync="isdialogShow" :dialogTitle="dialogTitle" :dialogFormData="dialogFormData" @reload="reload"/>
    </div>
</template>

<script>
import {getCustomerList,deleteCustomer,deleteUserRelation} from '@/api/rentmanager/customer'
import Pagination from '@/components/Pagination'
import formDialog from './dialog'
import {parseTime} from '@/utils/index'
export default {
    name:'',
    components:{Pagination,formDialog},
    data() {
        let me = this
        return {
            customerList:[],
            startTime:'',
            endTime:'',
            keywords:'',
            total:0,
            page:{
                pageNo:1,
                pageSize:50,
            },
            selectData:[],
            isdialogShow:false,
            dialogTitle:'',
            dialogForm:{
                customerNo: '',
                customerName: '',
                customerSex: '0',
                customerAge :'',
                customerPhone: '',
                customerEmail: '',
                customerAddr :'',
                customerCompany: ''
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
            this.getCustomerList()
            this.dialogFormData = Object.assign({},this.dialogForm)
        })
    },
    methods: {
        getCustomerList(){
            let parmas = Object.assign({},this.page)
            
            if(!!this.startTime && !!this.endTime){
                
                parmas.startTime = parseTime(this.startTime)
                parmas.endTime = parseTime(this.endTime)

                if(parmas.startTime > parmas.endTime){
                    this.$message.error('开始时间不能大于结束时间')
                    return
                }
            }

            parmas.keywords = this.keywords
            
            getCustomerList(parmas).then((res)=>{
                this.customerList = res.records
                this.total = res.totalCount
                
            })
        },
        handleSearch(){
            this.page.pageNo = 1
            this.getCustomerList()
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
            let customerParmas = {}
            let customerNos = []
            this.selectData.forEach(v=>{
                customerNos.push(v.customerNo)
            })
            customerParmas.customerNos = customerNos
            
            let relationParmas = {}
            relationParmas.customerNos = customerNos.join(',')

            this.$confirm('将删除选中信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                
                Promise.all([deleteCustomer(customerParmas),deleteUserRelation(relationParmas)]).then(()=>{
                    this.$message.success('删除成功')
                    this.getCustomerList()
                })
            })
            
        },
        reload(){
            
            
            this.getCustomerList()
        },
        selChange(row){
            console.log(row)
            this.selectData=row
        },
        rowClick(row){
            console.log(row)
            this.$refs.customerTable.clearSelection()
            this.$refs.customerTable.toggleRowSelection(row)

        },
        formatTime(row){
            return parseTime(row.eDate)
        }
    },
}
</script>
<style lang="scss" scoped>

</style>
