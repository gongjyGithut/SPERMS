<template>
    <div>
        <el-dialog 
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :fullscreen="device === 'mobile'"
        :close-on-click-modal="false">
            <el-form  label-width="80px" label-position="left" :model="dialogFormData" ref="dialogForm">
                <el-form-item label="菜单名" prop="menuName">
                    
                    <el-input
                    v-model="dialogFormData.menuName"
                    placeholder="">

                    </el-input>
                    
                </el-form-item>
                
                <el-form-item label="菜单URL" prop="menuUrl">
                    
                    <el-input 
                    v-model="dialogFormData.menuUrl" 
                    placeholder="">

                    </el-input>
                    
                    
                </el-form-item>

                <el-form-item label="图标名" prop="menuIcon">
                    
                    <el-input 
                    v-model="dialogFormData.menuIcon"  
                    placeholder="">

                    </el-input>
                    
                    
                </el-form-item>

                <el-form-item label="所属菜单" prop="menuIcon" v-show="parentId !== 0">
                    
                    <el-cascader
                    ref="cascaderTree"
                    v-model="parentId"
                    :options="options"
                    :props="props"
                    @change="handleChange">
                    </el-cascader>

                </el-form-item>

                <el-form-item label="状态" prop="menuStatus">
                      
                    <el-radio-group v-model="dialogFormData.menuStatus">
                        <el-radio :label='0' >停用</el-radio>
                        <el-radio :label='1' >启用</el-radio>
                    </el-radio-group>
                        
                </el-form-item>

                

                <el-form-item label="备注" prop="menuRemark">
                   
                    <el-input 
                    v-model="dialogFormData.menuRemark"  
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
import {addSysmenu,updataSysmenu} from '@/api/setting/sysmenu'
import {getSysmenuAllList} from '@/api/setting/sysmenu'
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
        parentId:{
            get(){
                return parseInt(this.dialogFormData.parentId)
            },
            set(val){
                console.log(val)
                // this.$emit('updata:parentId',val[val.length-1])
            }
            
            
        }
    },
    data() {
        return {
            pickerOptions :{
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            // parentId:1,
            props:{
                label:'menuName',
                value:'menuId',
                checkStrictly: true
            },
            options:[]
        }
    },
    created() {
        this.getAllMenuList()
    },
    methods: {
        getAllMenuList(){
            getSysmenuAllList().then(res =>{
                this.options = this.toTree(res.records)
            })
        },
        handleSubmit(){
            let Parmas = Object.assign({},this.dialogFormData)
            delete Parmas.parentId 
            Parmas.parentId = this.$refs.cascaderTree.getCheckedNodes(true)[0].value
            console.log(Parmas)
            //return
            // delete Parmas.parentId 
            // Parmas.parentId = this.parentId[this.parentId.length-1]
            if(this.submitStatus === 'add'){
                addSysmenu(Parmas).then(res =>{
                    this.$message.success('添加成功')
                })
                
            }else{
                updataSysmenu(Parmas).then((res) =>{
                    this.$message.success('修改成功')
                })
            }
            this.dialogVisible = false
            this.$emit('reload')
        },
        handleReset(){
           console.log(this.$refs.dialogForm)
           this.$refs.dialogForm.resetFields()
        },
        handleChange(value){
            console.log(value)
        },
        toTree(data) {
            let result = []
            if(!Array.isArray(data)) {
                return result
            }
            data.forEach(item => {
                delete item.children;
            });
            let map = {};
            data.forEach(item => {
                map[item.menuId] = item;
            });
            data.forEach(item => {
                let parent = map[item.parentId];
                if(parent) {
                    (parent.children || (parent.children = [])).push(item);
                } else {
                    result.push(item);
                }
            });
            return result;
        }
    },
}
</script>
