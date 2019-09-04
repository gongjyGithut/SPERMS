<template>
    <div>
        <el-dialog 
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :fullscreen="device === 'mobile'"
        :close-on-click-modal="false">
            <el-form  label-width="80px" label-position="left" :model="dialogFormData" ref="dialogForm">
                <el-form-item label="客户编号" prop="customerNo">
                    
                    <el-input
                    style="max-width:300px"  
                    v-model="dialogFormData.customerNo"
                    placeholder=""
                    :disabled="this.submitStatus == 'update'">

                    </el-input>
                    
                </el-form-item>
                
                <el-form-item label="姓名" prop="customerName">
                    
                    <el-input 
                    v-model="dialogFormData.customerName" 
                    placeholder="">

                    </el-input>
                    
                    
                </el-form-item>

                <el-form-item label="性别" prop="customerSex">
                      
                    <el-radio-group v-model="dialogFormData.customerSex">
                        <el-radio label='0' style="color:#FFF">女</el-radio>
                        <el-radio label='1' style="color:#FFF">男</el-radio>
                    </el-radio-group>
                        
                </el-form-item>

                <el-form-item label="年龄" prop="customerAge">
                    
                    <el-input 
                    v-model="dialogFormData.customerAge"  
                    placeholder="">

                    </el-input>
                    
                    
                </el-form-item>

                <el-form-item label="手机号" prop="customerPhone">
                   
                    <el-input 
                    v-model="dialogFormData.customerPhone"  
                    placeholder="">

                    </el-input>
                    
                </el-form-item>

                <el-form-item label="邮箱" prop="customerEmail">
                    
                    <el-input 
                    v-model="dialogFormData.customerEmail"  
                    placeholder="">

                    </el-input>
                    
                </el-form-item>

                <el-form-item label="地址" prop="customerAddr">
                     
                    <el-input 
                    v-model="dialogFormData.customerAddr"  
                    placeholder="">

                    </el-input>
                        
                </el-form-item>

                <el-form-item label="单位" prop="customerCompany">
                      
                    <el-input 
                    v-model="dialogFormData.customerCompany"  
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
import {addCustomer,addUserRelation,updateCustomer} from '@/api/setting/customer'
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
        username() {
            return sessionStorage.getItem('username').split('"').join('')
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
            let customerParmas = Object.assign({},this.dialogFormData)
            
            if(this.submitStatus === 'add'){

                let relationParmas = {}
                let userIds = []
                console.log(this.username)
                userIds.push(this.username)

                relationParmas.customerNo = this.dialogFormData.customerNo
                relationParmas.userIds = userIds

                Promise.all([addCustomer(customerParmas),addUserRelation(relationParmas)]).then(()=>{
                    this.$message.success('添加成功')
                })
                
            }else{
                updateCustomer(customerParmas).then((res) =>{
                    this.$message.success('修改成功')
                })
            }
            this.dialogVisible = false
            this.$emit('reload')
        },
        handleReset(){
           console.log(this.$refs.dialogForm)
           this.$refs.dialogForm.resetFields()
        }
    },
}
</script>
