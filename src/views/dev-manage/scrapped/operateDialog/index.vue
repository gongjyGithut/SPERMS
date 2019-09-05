<template>
    <div>
        <el-dialog 
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :fullscreen="device === 'mobile'"
        :close-on-click-modal="false"
        width="500px">
            <el-form  label-width="80px" label-position="left" :model="dialogFormData">
                <el-form-item label="设备编号">
                    
                    <el-input 
                    v-model="dialogFormData.eId"
                    placeholder="请选择设备"
                    :disabled='true'>

                    </el-input>
                    <el-button @click="getDevList" v-show="dialogTitle === '添加'">选择</el-button>
                </el-form-item>

                <el-form-item label="设备名称">
                    
                    <el-input 
                    style="" 
                    v-model="dialogFormData.eName"
                    placeholder="请选择设备"
                    :disabled='true'>

                    </el-input>
                    
                </el-form-item>
                
                <el-form-item label="报废原因">
                    
                    <el-input 
                    v-model="dialogFormData.scReason" 
                    placeholder="">

                    </el-input>
                    
                    
                </el-form-item>

            </el-form>

            <div slot="footer">
                <el-button type="primary" @click="handleSubmit">确定</el-button>
                <el-button>重置</el-button>
            </div>
        </el-dialog>

        <dev-list-dialog :devListDialogShow.sync="devListDialogShow" v-if="devListDialogShow" @back="devListDialogBack"/>
    </div>
</template>

<script>
import devListDialog from '../devListDialog'
import {addEqEnable,updateEqEnable} from '@/api/dev-manage/deploy'
export default {
    name:'operateDialog',
    components:{devListDialog},
    props:{
        isdialogShow:{
            default:false,
            type:Boolean
        },
        dialogTitle:{
            type:String
        },
        dialogFormData:{
            type:Object
        }
    },
    computed: {
        device() {
            return this.$store.state.app.device
        },
        dialogVisible:{
            get(){
                return this.isdialogShow
            },
            set(val){
                console.log(val)
                this.$emit('update:isdialogShow', val)
            }
        },
        submitStatus(){
            return this.dialogTitle === '添加'? 'add':'update'
        },
    },
    data() {
        return {
            devListDialogShow:false
        }
    },
    methods: {
        getDevList(){
            this.devListDialogShow = true
        },
        handleSubmit(){
            let parmas = Object.assign({},this.dialogFormData)

            if(this.submitStatus === 'add'){
                addEqEnable(parmas).then((res) =>{
                    this.$message.info(res.resultMsg)
                })
            }else{
                updateEqEnable(parmas).then((res) =>{
                    this.$message.success('修改成功')
                })
            }
            this.$emit('reload')
            this.dialogVisible = false
        },
        devListDialogBack(){
            this.dialogVisible = true
            this.devListDialogShow = false
        }
    },
}
</script>
