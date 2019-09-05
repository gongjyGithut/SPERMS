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
                    style="" 
                    v-model="dialogFormData.eId"
                    placeholder="">

                    </el-input>
                    
                </el-form-item>
                
                <el-form-item label="设备名称">
                    
                    <el-input 
                    v-model="dialogFormData.eName" 
                    placeholder="">

                    </el-input>
                    
                    
                </el-form-item>

                <el-form-item label="生产厂家">
                    
                    <el-input 
                    v-model="dialogFormData.eManufacturer"  
                    placeholder="">

                    </el-input>
                     
                </el-form-item>

                <el-form-item label="生产日期">
                
                    <el-date-picker
                    v-model="dialogFormData.eDate" 
                    style="width:250px;"
                    type="datetime"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :picker-options="pickerOptions">
                    </el-date-picker>
                    
                    
                </el-form-item>

                <el-form-item label="规格">
                    
                    <el-input 
                    v-model="dialogFormData.eStandard"  
                    placeholder="">

                    </el-input>
                        
                </el-form-item>

                <el-form-item label="类型">
                    
                        
                    <el-radio-group v-model="dialogFormData.eType">
                        <el-radio label='1' style="color:#FFF">类型1</el-radio>
                        <el-radio label='2' style="color:#FFF">类型2</el-radio>
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
import {addEq,updateEq} from '@/api/dev-manage/message'
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
            pickerOptions :{
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
        }
    },
    methods: {
        handleSubmit(){
            let parmas = Object.assign({},this.dialogFormData)
            if(this.submitStatus === 'add'){
                addEq(parmas).then((res) =>{
                    this.$message.success('添加成功')
                })
            }else{
                updateEq(parmas).then((res) =>{
                    this.$message.success('修改成功')
                })
            }
            this.dialogVisible = false
            this.$emit('reload')
        }
    },
}
</script>
