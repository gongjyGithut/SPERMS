<template>
    <div>
        <el-dialog 
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :fullscreen="device === 'mobile'"
        :close-on-click-modal="false">
            <el-form  label-width="80px" label-position="left" :model="dialogFormData" ref="dialogForm">
                <el-form-item label="计费编号" prop="cmNo">
                    
                    <el-input  
                    v-model="dialogFormData.cmNo"
                    placeholder=""
                    :disabled="this.submitStatus == 'update'">

                    </el-input>
                    
                </el-form-item>
                

                <el-form-item label="费用" prop="cmFee">
                    <el-input 
                    v-model="dialogFormData.cmFee"  
                    placeholder="">

                    </el-input>
                </el-form-item>

                <el-form-item label="计费方式" prop="cmDay">
                    
                    <el-radio-group v-model="dialogFormData.cmDay">
                        <el-radio label='0' >按天</el-radio>
                        <el-radio label='1' >按量</el-radio>
                    </el-radio-group>
                        
                </el-form-item>

            </el-form>

            <div slot="footer">
                <el-button type="primary" @click="handleSubmit">确定</el-button>
                <el-button @click="handleReset">重置</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {addCaculation,updateCaculation} from '@/api/rentmanager/caculation'
export default {
    name:'formDialog',
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
            let caculationParmas = Object.assign({},this.dialogFormData)
            
            if(this.submitStatus === 'add'){

                addCaculation(caculationParmas).then(()=>{
                    this.$message.success('添加成功')
                })
                
            }else{
                updateCaculation(caculationParmas).then((res) =>{
                    this.$message.success('修改成功')
                })
            }
            this.dialogVisible = false
            this.$emit('reload')
        },
        handleReset(){
           //console.log(this.$refs.dialogForm)
           this.$refs.dialogForm.resetFields()
        }
    },
}
</script>
