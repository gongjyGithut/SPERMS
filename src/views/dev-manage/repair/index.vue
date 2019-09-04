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
        ref="equipmentTable"
        :data="equipmentList"
        @selection-change="selChang"
        @row-click="rowClick"
        highlight-current-row
        border
        tooltip-effect="light"
        style="width:100%">
            <el-table-column type="selection"></el-table-column>

            <el-table-column label="设备编号" :show-overflow-tooltip="true" prop="eId"></el-table-column>

            <el-table-column label="维修厂家" prop="rManufacturer"></el-table-column>

            <el-table-column label="维修费用" prop="rCost"></el-table-column>

            <el-table-column label="维修厂家" prop="rPerson"></el-table-column>

            <el-table-column label="生产日期" prop="rTime" :formatter="formatTime"></el-table-column>

            <el-table-column label="状态" prop="rState">
                <template slot-scope="scope">
                    <span :class="scope.row.state == 1?'successText':'warningText'">
                        {{scope.row.state == 1?'维修完成':'未维修'}}
                    </span>
                </template>
            </el-table-column>

            <!-- <el-table-column label="操作">
                <template slot-scope="scope">
                   <el-button v-if="scope.row.state == 1" type="warning" size="mini">关闭</el-button>
                   <el-button v-else type="success" size="mini">开启</el-button>
                </template>

            </el-table-column> -->
        </el-table>
        
        <pagination :total="total" :currentPage.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getRepairList"/>
        
        <form-dialog :isdialogShow.sync="isdialogShow" :dialogTitle="dialogTitle" :dialogFormData="dialogFormData" @reload="getRepairList"/>
    </div>
</template>

<script>
import {getRepairList,deleteRepair} from '@/api/dev-manage/repair'
import Pagination from '@/components/Pagination'
import formDialog from './dialog'
import {parseTime} from '@/utils/index'
export default {
    name:'',
    components:{Pagination,formDialog},
    data() {
        let me = this
        return {
            equipmentList:[],
            startTime:new Date(new Date().getTime() - 3600 * 1000 * 24 * 7),
            endTime:new Date(),
            keywords:'',
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
                eDate: '',
                eId: '',
                eManufacturer: '',
                eName: '',
                eStandard: '',
                eType: ''
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
            this.getRepairList()
            this.dialogFormData = Object.assign({},this.dialogForm)
        })
    },
    methods: {
        getRepairList(){
            let parmas = Object.assign({},this.page)
            
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

            parmas.keywords = this.keywords
            this.loading = true
            getRepairList(parmas).then((res)=>{
                this.equipmentList = res.records
                this.total = res.totalCount
                this.loading = false
            })
        },
        handleSearch(){
            this.page.pageNo = 1
            this.getRepairList()
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
            let parmas = {}
            let eIds = []
            this.selectData.forEach(v=>{
                eIds.push(v.eId)
            })
            parmas.eIds = eIds
            console.log(parmas)
            this.$confirm('将删除选中设备, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                deleteRepair(parmas).then((res) =>{
                    this.$message.success('删除成功')
                    this.getRepairList()
                })
            })
            
        },
        selChang(row){
            console.log(row)
            this.selectData=row
        },
        rowClick(row){
            console.log(row)
            this.$refs.equipmentTable.clearSelection()
            this.$refs.equipmentTable.toggleRowSelection(row)

        },
        formatTime(row){
            return parseTime(row.eDate)
        }
    },
}
</script>
<style lang="scss" scoped>
// .test{
//     background-color: 
// }
</style>
