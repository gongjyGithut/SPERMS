<template>
    <div>
        <el-dialog 
        title="设备列表"
        :visible.sync="dialogVisible"
        :fullscreen="device === 'mobile'"
        :close-on-click-modal="false">
            <el-row class="toolbar">
                <el-form size="mini" :inline="true">
                    <el-form-item>
                        <el-input  placeholder="设备ID" v-model="eId" :disabled="eName !==''||e_enable !=='' "></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-input  placeholder="设备名称" v-model="eName" :disabled="eId !== ''"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-radio-group size="mini" v-model="e_enable" :disabled="eId !== ''">
                            <el-radio-button :label="0">关停</el-radio-button>
                            <el-radio-button :label="1">正常使用</el-radio-button>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item >
                            <el-button type="primary" size="mini" @click="handleUpdata(scope.row)" icon="el-icon-search"></el-button>
                    </el-form-item>
                </el-form>
            </el-row>
            <el-table 
            :data="listData"
            highlight-current-row 
            height="400px"
            size="mini">
              <el-table-column label="设备编号" prop="eId"></el-table-column>
              <el-table-column label="设备名称" prop="eName"></el-table-column>
              <el-table-column label="设备状况" prop="eeCondition"></el-table-column>
              <el-table-column label="授权状态" prop="eeEnable">
                  <template slot-scope="scope">
                    {{scope.row.eeEnable == 1?'正常使用':'关闭'}}
                  </template>
              </el-table-column>
              <el-table-column label="GPS经度" prop="eeLongitude"></el-table-column>
              <el-table-column label="GPS纬度" prop="eeLatitude"></el-table-column>

              <el-table-column min-width="120px">
                  <template slot-scope="scope">
                    <el-link icon="el-icon-edit" type="warning" @click="handleUpdata(scope.row)">修改</el-link>
                    <el-link icon="el-icon-delete"  type="danger" >删除</el-link>
                  </template>
              </el-table-column>
            </el-table>

        </el-dialog>

    </div>
</template>

<script>

export default {
    name:'listDialog',
    props:{
        isdialogShow:{
            default:false,
            type:Boolean
        },
        dialogTitle:{
            type:String
        },
        listData:{
            type:Array
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
    },
    data() {
        return {
            eId:'',
            eName:'',
            e_enable:''
        }
    },
    methods: {
        handleUpdata(row){
            this.$emit('updata',row)
        }
    },
}
</script>