<template>
    <div>
        <bmap-container/>

        <el-dropdown class="bmapMenu"  @command="handleCommand" trigger="click">
            <el-button type="primary" icon="el-icon-menu" ></el-button>

             <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="equitmentList">设备列表</el-dropdown-item>
                <el-dropdown-item command="addEquitment">新增设备</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <operate-dialog :dialogFormData="operateFormData" :isdialogShow.sync="isOperateShow" :dialogTitle="operateFormTitle" @reload="fecthEqList"/>

        <list-dialog :isdialogShow.sync="isListShow" :listData="listData" @updata="handleUpdata"/>
    </div>
</template>

<script>
import {getEqList} from '@/api/dev-manage/deploy'
import bmapContainer from '@/components/BMapContainer'
import operateDialog from './operateDialog'
import listDialog from './listDialog'
export default {
    components:{bmapContainer,operateDialog,listDialog},
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
            listData:[],

        }
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
            parmas.pageSize = 10
            getEqList(parmas).then(res =>{
                this.listData = res.records
            })
        },
        handleEquitmentList(){
            this.isListShow = true
        },
        handleAddEquitment(){
            this.isOperateShow = true
            this.operateFormTitle = '添加'
            this.operateFormData = Object.assign({},this.operateForm)
        },
        handleUpdata(row){
            this.isOperateShow = true
            this.operateFormTitle = '修改'
            this.operateFormData = Object.assign({},row)
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
