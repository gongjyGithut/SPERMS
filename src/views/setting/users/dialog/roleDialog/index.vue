<template>
    <div>
        <el-dialog 
        title="角色配置"
        :visible.sync="dialogVisible"
        :fullscreen="device === 'mobile'"
        :close-on-click-modal="false">
           

            <div slot="footer">
                <el-button type="primary" @click="handleSubmit">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {getRoleList,getRoleListById} from '@/api/setting/sysrole'
// import RoleContainer from './sysrole'
export default {
    name:'roleDialog',
    //components:{RoleContainer},
    props:{
        roleDialogShow:{
            type:Boolean,
            default:false
        }
    },
    computed: {
        device() {
            return this.$store.state.app.device
        },
        dialogVisible:{
            get(){
                return this.roleDialogShow
            },
            set(val){
                console.log(val)
                this.$emit('update:roleDialogShow',val)
            }
        }
    },
    data() {
        return {
            roleData:[],
        }
    },
    methods: {
        handleSubmit(){
            this.dialogVisible = false
        }
    },
}
</script>