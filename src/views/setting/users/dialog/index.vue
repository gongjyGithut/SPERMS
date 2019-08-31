<template>
    <div>
        <el-dialog 
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :fullscreen="device === 'mobile'"
        :close-on-click-modal="false">
            <el-form  label-width="80px" label-position="left" :model="dialogFormData" ref="dialogForm">
                <el-form-item label="用户账号" prop="uId">
                    
                    <el-input
                    style="max-width:300px"  
                    v-model="dialogFormData.uId"
                    placeholder=""
                    :disabled="this.submitStatus == 'update'">

                    </el-input>
                    
                </el-form-item>
                
                <el-form-item label="用户名称" prop="uName">
                    
                    <el-input 
                    v-model="dialogFormData.uName" 
                    placeholder="">

                    </el-input>
                    
                    
                </el-form-item>

                <el-form-item label="当前角色" prop="roleName">

                      <span style="color:#409EFF;margin-right:30px;">{{!!dialogFormData.roleName?dialogFormData.roleName:"未配置"}}</span>
                      <el-link 
                      icon="el-icon-edit" 
                      type="danger" 
                      :underline="false" 
                      @click.stop="handlePromission">(配置角色)</el-link>
                        
                </el-form-item>

                <el-form-item label="密码" prop="uPassword" v-show="dialogTitle == '添加'">
                    
                    <el-input 
                    v-model="dialogFormData.uPassword" 
                    placeholder=""
                    type="password">

                    </el-input>
                    
                    
                </el-form-item>

            </el-form>

            <div slot="footer">
                <el-button type="primary" @click="handleSubmit">确定</el-button>
                <el-button @click="handleReset">重置</el-button>
            </div>
        </el-dialog>
        <role-dialog :roleDialogShow.sync="roleDialogShow"/>
    </div>
</template>

<script>
import {addUsers,addUserRelation,updateUsers} from '@/api/setting/users'
import {getRoleList,getRoleListById} from '@/api/setting/sysrole'
import roleDialog from './roleDialog';
export default {
    name:'formDialog',
    components:{roleDialog},
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
            roleDialogShow:false,
        }
    },
    methods: {
        handleSubmit(){
            let usersParmas = Object.assign({},this.dialogFormData)
            
            if(this.submitStatus === 'add'){
                addUsers(usersParmas).then((res) =>{
                    this.$message.success('修改成功')
                    this.$emit('reload')
                })
                
            }else{
                updateUsers(usersParmas).then((res) =>{
                    this.$message.success('修改成功')
                    this.$emit('reload')
                })
            }
            this.dialogVisible = false
            
        },
        getRoleList(){

        },
        handlePromission(){
            this.roleDialogShow = true
            this.dialogVisible = false
        },
        handleReset(){
           console.log(this.$refs.dialogForm)
           this.$refs.dialogForm.resetFields()
        }
    },
}
</script>
