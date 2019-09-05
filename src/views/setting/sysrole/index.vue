<template>
    <div class="app-container" >

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
                ref="menuTable"
                :data="roleList"
                border
                @selection-change="selChang"
                @row-click="rowClick"
                highlight-current-row
                 
                style="width:100%">
                    <el-table-column type="selection"></el-table-column>
                    
                    <el-table-column label="角色名称" prop="roleName"></el-table-column>

                    <el-table-column label="备注" prop="roleRemark"></el-table-column>

                    <el-table-column label="状态" prop="roleStatus">
                        <template slot-scope="scope">
                            {{scope.row.roleStatus == 0?'停用':'启用'}}
                        </template>
                    </el-table-column>

                    <el-table-column label="">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="handlePromission(scope.row)">权限</el-button>
                        </template>
                    </el-table-column>


                </el-table>
                <pagination :total="total" :currentPage.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getRoleList"/>
          
        
        
        <form-dialog :isdialogShow.sync="formDialogShow" :dialogTitle="dialogTitle" :dialogFormData="dialogFormData" @reload="reload"/>

        <menu-dialog :isdialogShow.sync="menuDialogShow"/>

    </div>
</template>

<script>
import {getRoleList,getRoleListById,deleteRelationByRoleId,deleteRole} from '@/api/setting/sysrole'
import {getSysmenuListByRoleid} from '@/api/setting/sysmenu';
import Pagination from '@/components/Pagination'
import formDialog from './formDialog'
import menuDialog from './menuDialog'
import {parseTime} from '@/utils/index'
export default {
    name:'',
    components:{Pagination,formDialog,menuDialog},
    data() {
        return {
            roleList:[],
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
            formDialogShow:false,
            menuDialogShow:false,
            dialogTitle:'',
            dialogForm:{
                roleName: '',
                roleStatus: '0',
                roleRemark :''
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
            this.getRoleList()
            this.dialogFormData = Object.assign({},this.dialogForm)
        })
    },
    methods: {
        getRoleList(){
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
            getRoleList(parmas).then((res)=>{
                this.roleList = res.records
                this.total = res.totalCount
                this.loading = false
            })
        },
        handleSearch(){
            this.page.pageNo = 1
            this.getRoleList()
        },
        handleAdd(){
            this.formDialogShow = true
            this.dialogTitle = '添加'
            this.dialogFormData = Object.assign({},this.dialogForm)
        },
        handleUpdate(){
            this.formDialogShow = true
            this.dialogTitle = '修改'
            this.dialogFormData = Object.assign({},this.selectData[0])
        },
        handleDelete(){
            let roleParmas = {}
            let roleIds = []
            this.selectData.forEach(v=>{
                roleIds.push(v.roleId)
            })
            roleParmas.roleIds = roleIds
            
            let relationParmas = {}
            relationParmas.roleIds = roleIds.join(',')

            this.$confirm('将删除选中信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                
                Promise.all([deleteRole(roleParmas),deleteRelationByRoleId(relationParmas)]).then(()=>{
                    this.$message.success('删除成功')
                    this.startTime = new Date(new Date().getTime() - 3600 * 1000 * 24 * 7)
                    this.endTime = new Date()
                    this.getRoleList()
                })
            })
            
        },
        handlePromission(row){
            this.menuDialogShow = true
            let parmas = {}
            parmas.roleId = row.roleId
            getSysmenuListByRoleid(parmas).then(res =>{
                let checkNodes = res.records.map(val =>{
                    return val.menuId
                })
                this.$store.dispatch('setRoleId',row.roleId)
                this.$store.dispatch('setCheckNodes',checkNodes)
            })
        },
        reload(){
            this.startTime = new Date(new Date().getTime() - 3600 * 1000 * 24 * 7)
            this.endTime = new Date()
            this.getRoleList()
        },
        selChang(row){
            this.selectData=row
        },
        rowClick(row){
            this.$refs.menuTable.clearSelection()
            this.$refs.menuTable.toggleRowSelection(row)
        },
        formatTime(row){
            return parseTime(row.creationTime)
        }
    },
} 
</script>
<style lang="scss" scoped>

</style>
