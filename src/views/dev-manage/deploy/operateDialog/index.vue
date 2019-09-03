<template>
    <div>
        <el-dialog 
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :fullscreen="device === 'mobile'"
        :close-on-click-modal="false">
            <el-form  label-width="80px" label-position="left" :model="dialogFormData">
                <el-form-item label="设备编号">
                    
                    <el-input 
                    v-model="dialogFormData.eId"
                    placeholder=""
                    :disabled="submitStatus == 'update'">

                    </el-input>
                    
                </el-form-item>

                <el-form-item label="设备名称">
                    
                    <el-input 
                    style="" 
                    v-model="dialogFormData.eName"
                    placeholder="">

                    </el-input>
                    
                </el-form-item>
                
                <el-form-item label="设备状况">
                    
                    <el-input 
                    v-model="dialogFormData.eeCondition" 
                    placeholder="">

                    </el-input>
                    
                    
                </el-form-item>

                <el-form-item label="GPS经度">
                    
                    <el-input 
                    v-model="dialogFormData.eeLongitude" 
                    placeholder="">

                    </el-input>
                    
                    
                </el-form-item>

                <el-form-item label="GPS纬度">
                    
                    <el-input 
                    v-model="dialogFormData.eeLatitude" 
                    placeholder="">

                    </el-input>
                    
                    
                </el-form-item>

                <el-form-item label="应用授权">
                    
                    <el-radio-group v-model="dialogFormData.eeEnable">
                        <el-radio :label='0' style="color:#FFF">关停</el-radio>
                        <el-radio :label='1' style="color:#FFF">正常使用</el-radio>
                    </el-radio-group>
                        
                    
                </el-form-item>
            </el-form>

            <div slot="footer">
                <el-button type="primary" @click="handleSubmit">确定</el-button>
                <el-button>重置</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {addEqEnable,updateEqEnable} from '@/api/dev-manage/deploy'
export default {
    name:'operateDialog',
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
            
        }
    },
    methods: {
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
        }
    },
}
</script>
