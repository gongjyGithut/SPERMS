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
        ref="menuTable"
        :data="menuList"
        border
        @selection-change="selChange"
        @row-click="rowClick"
        highlight-current-row
         
        style="width:100%">
            <el-table-column type="selection"></el-table-column>
            
            <el-table-column label="菜单名" prop="menuName"></el-table-column>

            <el-table-column label="URL" prop="menuUrl"></el-table-column>

            <el-table-column label="图标名" prop="menuIcon"></el-table-column>

            <el-table-column label="状态" prop="menuStatus">
                <template slot-scope="scope">
                    {{scope.row.menuStatus == 0?'停用':'启用'}}
                </template>
            </el-table-column>

            <el-table-column label="备注" prop="menuRemark">

            </el-table-column>

            <el-table-column label="创建时间" prop="creationTime" :formatter="formatTime">

            </el-table-column>

        </el-table>
        <pagination :total="total" :currentPage.sync="page.pageNo" :limit.sync="page.pageSize" @pagination="getMenuList"/>
        
        <form-dialog :isdialogShow.sync="isdialogShow" :dialogTitle="dialogTitle" :dialogFormData="dialogFormData" @reload="reload"/>

    </div>
</template>

<script>
import {getSysmenuList,getSysmenuListById,addSysmenu,deleteSysmenu} from '@/api/setting/sysmenu'
import Pagination from '@/components/Pagination'
import MenuContainer from '@/components/MenuContainer'
import formDialog from './dialog'
import {parseTime} from '@/utils/index'
export default {
    name:'',
    components:{Pagination,formDialog,MenuContainer},
    data() {
        let me = this
        return {
            menuList:[],
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
            this.getMenuList()
            this.dialogFormData = Object.assign({},this.dialogForm)
        })
    },
    methods: {
        getMenuList(){
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
            getSysmenuList(parmas).then((res)=>{
                this.menuList = res.records
                this.total = res.totalCount
                this.loading = false
            })
        },
        handleSearch(){
            this.page.pageNo = 1
            this.getMenuList()
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
            let menuIds = []
            this.selectData.forEach(v=>{
                menuIds.push(v.menuId)
            })
            parmas.menuIds = menuIds

            this.$confirm('将删除选中信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                deleteSysmenu(parmas).then(res =>{
                    this.$message.success('删除成功')
                    this.startTime = new Date(new Date().getTime() - 3600 * 1000 * 24 * 7)
                    this.endTime = new Date()
                    this.getMenuList()
                })
            })
            
        },
        reload(){
            this.startTime = new Date(new Date().getTime() - 3600 * 1000 * 24 * 7)
            this.endTime = new Date()
            this.getMenuList()
        },
        selChange(row){
            console.log(row)
            this.selectData=row
        },
        rowClick(row){
            console.log(row)
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
