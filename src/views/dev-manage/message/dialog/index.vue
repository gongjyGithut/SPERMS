<template>
    <div>
        <el-dialog 
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :fullscreen="device === 'mobile'"
        :close-on-click-modal=false
        center >
            <el-form  label-width="100px" label-position="left" :model="dialogFormData">
                <el-form-item label="设备编号">
                    <el-col :xs="24" :sm="16">
                        <el-input  
                        v-model="dialogFormData.eId"
                        placeholder="">

                        </el-input>
                    </el-col>
                </el-form-item>
                
                <el-form-item label="设备名称">
                    <el-col :xs="24" :sm="16">
                        <el-input 
                        v-model="dialogFormData.eName" 
                        placeholder="">

                        </el-input>
                    
                    </el-col>
                </el-form-item>

                <el-form-item label="生产厂家">
                    <el-col :xs="24" :sm="16">
                        
                        <el-input 
                        v-model="dialogFormData.eManufacturer"  
                        placeholder="">

                        </el-input>
                        
                    </el-col>
                </el-form-item>

                <el-form-item label="生产日期">
                    <el-col :xs="24" :sm="16">
                    
                        <el-date-picker
                        v-model="dialogFormData.eDate" 
                        style="width:100%"
                        type="datetime"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions">
                        </el-date-picker>
                    
                    </el-col>
                </el-form-item>

                <el-form-item label="规格">
                    <el-col :xs="24" :sm="16">
                        
                        <el-input 
                        v-model="dialogFormData.eStandard"  
                        placeholder="">

                        </el-input>
                        
                    </el-col>
                </el-form-item>

                <el-form-item label="类型">
                    <el-col :xs="24" :sm="16">
                        
                        <el-radio-group v-model="dialogFormData.eType">
                            <el-radio label='1' style="color:#FFF">类型1</el-radio>
                            <el-radio label='2' style="color:#FFF">类型2</el-radio>
                        </el-radio-group>
                        
                    </el-col>
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
