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
        ref="usersTable"
        :data="userList"
        border
        @selection-change="selChange"
        @row-click="rowClick"
        highlight-current-row
         
        style="width:100%">
            <el-table-column type="selection"></el-table-column>
            <el-table-column label="用户账号" prop="uId"></el-table-column>
            
            <el-table-column label="用户名称" prop="uName">

            </el-table-column>

            <!-- <el-table-column label="用户密码" prop="uPassword">

            </el-table-column> -->

            <el-table-column label="角色" prop="roleName">
                <template slot-scope="scope">
                    {{!!scope.row.roleName?scope.row.roleName:'未配置'}}
                </template>
            </el-table-column>
            

        </el-table>
        
        <pagination :total="total" :currentPage.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getUsersList"/>
        
        <form-dialog :isdialogShow.sync="isdialogShow" :dialogTitle="dialogTitle" :dialogFormData="dialogFormData" @reload="reload"/>
    </div>
</template>

<script>
import {getUsersList,deleteUsers} from '@/api/setting/users'
import {getRoleList} from '@/api/setting/sysrole'
import Pagination from '@/components/Pagination'
import formDialog from './dialog'
import {parseTime} from '@/utils/index'
export default {
    name:'',
    components:{Pagination,formDialog},
    data() {
        let me = this
        return {
            userList:[],
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
                uId: '',
                uName: '',
                uPassword: '',
                roleId:'',
                roleList:[],
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
            this.getUsersList()
            this.dialogFormData = Object.assign({},this.dialogForm)
        })
    },
    methods: {
        getUsersList(){
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
            getUsersList(parmas).then((res)=>{
                this.userList = res.records
                this.total = res.totalCount

                this.loading = false
            })
        },
        handleSearch(){
            this.page.pageNo = 1
            this.getUsersList()
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
            let userParmas = {}
            let uIds = []
            this.selectData.forEach(v=>{
                uIds.push(v.uId)
            })
            userParmas.uIds = uIds
            
            this.$confirm('将删除选中信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                deleteUsers(userParmas).then((res)=>{
                    this.$message.success('删除成功')
                    this.startTime = new Date(new Date().getTime() - 3600 * 1000 * 24 * 7)
                    this.endTime = new Date()
                    this.getUsersList()
                })
            })
            
        },
        reload(){
            this.startTime = new Date(new Date().getTime() - 3600 * 1000 * 24 * 7)
            this.endTime = new Date()
            this.getUsersList()
        },
        selChange(row){
            console.log(row)
            this.selectData=row
        },
        rowClick(row){
            console.log(row)
            this.$refs.usersTable.clearSelection()
            this.$refs.usersTable.toggleRowSelection(row)

        },
        formatTime(row){
            return parseTime(row.eDate)
        }
    },
}
</script>
<style lang="scss" scoped>

</style>
