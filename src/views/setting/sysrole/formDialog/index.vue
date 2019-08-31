<template>
    <div>
        <el-dialog 
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :fullscreen="device === 'mobile'"
        :close-on-click-modal="false">
            <el-form  label-width="80px" label-position="left" :model="dialogFormData" ref="dialogForm">
                <el-form-item label="角色名称" prop="roleName">
                    
                    <el-input
                    v-model="dialogFormData.roleName"
                    placeholder="">
                    </el-input>
                    
                </el-form-item>


                <el-form-item label="状态" prop="roleStatus">
                      
                    <el-radio-group v-model="dialogFormData.roleStatus">
                        <el-radio :label='0' style="color:#FFF">停用</el-radio>
                        <el-radio :label='1' style="color:#FFF">启用</el-radio>
                    </el-radio-group>
                        
                </el-form-item>


                <el-form-item label="备注" prop="roleRemark">
                      
                    <el-input 
                    v-model="dialogFormData.roleRemark"  
                    placeholder="">

                    </el-input>
                        
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
import {addRole,updateRole} from '@/api/setting/sysrole'
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
        // username() {
        //     return sessionStorage.getItem('username').split('"').join('')
        // },
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
            let roleParmas = Object.assign({},this.dialogFormData)
            
            if(this.submitStatus === 'add'){
                addRole(roleParmas).then(() =>{
                    this.$message.success('添加成功')
                    this.dialogVisible = false
                    this.$emit('reload')
                })
                
            }else{
                updateRole(roleParmas).then(() =>{
                    this.$message.success('修改成功')
                    this.dialogVisible = false
                    this.$emit('reload')
                })
            }

        },
        handleReset(){
           console.log(this.$refs.dialogForm)
           this.$refs.dialogForm.resetFields()
        }
    },
}
</script>
