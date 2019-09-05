<template>
    <div>
        <bmap-container :listData="mapData" v-if="mapData.length > 0"/>

        <el-dropdown class="bmapMenu"  @command="handleCommand" trigger="click">
            <el-button type="primary" icon="el-icon-menu" ></el-button>

             <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="equitmentList">设备应用信息列表</el-dropdown-item>
                <el-dropdown-item command="addEquitment">新增设备应用信息</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <operate-dialog :dialogFormData="operateFormData" :isdialogShow.sync="isOperateShow" :dialogTitle="operateFormTitle" @reload="fecthEqList"/>

        <deploy-list-dialog :isdialogShow.sync="isListShow" :listData="listData" @update="handleUpdate" @delete="handleDelete" @search="handleSearch"/>
    </div>
</template>

<script>
import {getEqEnableList,deleteEqEnable,getEqEnableListById} from '@/api/dev-manage/deploy'
import bmapContainer from '@/components/BMapContainer'
import operateDialog from './operateDialog'
import deployListDialog from './deployListDialog'
export default {
    components:{bmapContainer,operateDialog,deployListDialog},
    data() {
        return {
            operateForm:{
                eId: '',
                eName: '',
                eeCondition: '',
                eeLongitude: '',
                eeLatitude: '',
                eeEnable: ''
            },
            operateFormData:{},
            operateFormTitle:'',
            isOperateShow:false,
            isListShow:false,
            mapData:[],
            listData:[],

        }
    },
    created() {
        
    },
    mounted() {
        
        this.$nextTick(()=>{
            this.fecthEqList()
        })
    },
    methods: {
        handleCommand(command){
            switch(command){
                case 'equitmentList':this.handleEquitmentList();break;
                case 'addEquitment' :this.handleAddEquitment();break;
            }
        },
        fecthEqList(){
            let parmas = {}
            parmas.pageNo = 1
            parmas.pageSize = 100
            getEqEnableList(parmas).then(res =>{
                this.listData = res.records
                this.mapData = res.records
            })
        },
        fecthEqListById(parmas){
            getEqEnableListById(parmas).then(res =>{
                this.listData = []
                if(!!res.record){
                    this.listData.push(res.record)
                }
                
            })
        },
        handleEquitmentList(){
            this.isListShow = true
            this.fecthEqList()
        },
        handleSearch(parmas){
            if(!!parmas.recordId){
                console.log(parmas)
                this.fecthEqListById(parmas)
            }else{
                parmas.pageNo = 1
                parmas.pageSize = 100
                getEqEnableList(parmas).then(res =>{
                    this.listData = res.records
                })
            }
        },
        handleAddEquitment(){
            this.isOperateShow = true
            this.operateFormTitle = '添加'
            this.operateFormData = Object.assign({},this.operateForm)
        },
        handleUpdate(row){
            this.isOperateShow = true
            this.isListShow = false
            this.operateFormTitle = '修改'
            this.operateFormData = Object.assign({},row)
        },
        handleDelete(row){
            let parmas = {}
            let eIds = []
            eIds.push(row.eId)
            parmas.eIds = eIds
            
            this.$confirm('将删除选中设备, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                deleteEqEnable(parmas).then((res) =>{
                    this.$message.success('删除成功')
                    this.fecthEqList()
                })
            })
            
        }
    },
}
</script>
<style>
.bmapMenu{
    position: absolute;
    top: 10%;
    left: 8%;
}
</style>
