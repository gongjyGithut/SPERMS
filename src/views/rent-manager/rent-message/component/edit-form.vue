<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :fullscreen="device === 'mobile'"
      :close-on-click-modal="false"
      width="700px">
      <el-form ref="dialogForm" :model="dialogFormData" :rules="rules" label-width="110px" label-position="right">
        <el-form-item label="交易编号" prop="tradeNo" >

          <el-input
            v-model="dialogFormData.tradeNo"
            :disabled="submitStatus == 'update'"
            placeholder=""/>

        </el-form-item>

        <el-row >
          <el-col :span="12">
            <el-form-item label="设备名称" prop="eName">
              <el-input
                :disabled="true"
                v-model="dialogFormData.eName"
                placeholder="请选择设备">
                <el-button slot="append" @click="handleSelete(0)">
                  选择
                </el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">

            <el-form-item label="计费编号" prop="cmNo">

              <el-input
                :disabled="true"
                v-model="dialogFormData.cmNo"
                placeholder="请选择计费方式">

                <el-button slot="append" @click="handleSelete(1)">
                  选择
                </el-button>
              </el-input>

            </el-form-item>
          </el-col>
        </el-row>

        <el-row >
          <el-col :span="12">
            <el-form-item label="客户名称" prop="customerName">
              <el-input
                :disabled="true"
                v-model="dialogFormData.customerName"
                placeholder="请选择客户">

                <el-button slot="append" @click="handleSelete(2)">
                  选择
                </el-button>
              </el-input>
            </el-form-item>

          </el-col>

          <el-col :span="12">

            <el-form-item label="产量总额" prop="lrMount" >
              <el-input
                v-model="dialogFormData.lrMount"
                placeholder="">

                <template slot="append">
                  <el-link :underline="false" type="primary" icon="el-icon-warning">0为无限量</el-link>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="使用地点" prop="rentPlace ">

          <el-input
            v-model="dialogFormData.rentPlace"
            placeholder=""/>

        </el-form-item>

        <el-row>
          <el-col :span="12">

            <el-form-item label="租借开始时间" prop="rentBeginDate">

              <el-date-picker v-model="dialogFormData.rentBeginDate" placeholder="" type="date" value-format="yyyy-MM-dd HH:mm:ss"/>

            </el-form-item>
          </el-col>

          <el-col :span="12">

            <el-form-item label="租借结束时间" prop="rentEndDate">

              <el-date-picker v-model="dialogFormData.rentEndDate" placeholder="" type="date" value-format="yyyy-MM-dd HH:mm:ss"/>

            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="自动锁机策略" prop="autoLock">

          <el-radio-group v-model="dialogFormData.autoLock">
            <el-radio :label="0" >启动</el-radio>
            <el-radio :label="1" >不启动</el-radio>
          </el-radio-group>

        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="handleSubmit">确定</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </el-dialog>

    <select-table v-if="tableVisible" :table-visible.sync="tableVisible" :title-type="titleType" @cancel="handleTabelCancel" @select="getSelect"/>
  </div>
</template>

<script>
import { addRentMessage, updateRentMessage } from '@/api/rentmanager/rent-message'
import SelectTable from './select-table'
export default {
  name: 'EditForm',
  components: { SelectTable },
  props: {
    isdialogShow: {
      default: false,
      type: Boolean
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    dialogFormData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      rules: {
        tradeNo: [{ required: true, message: '请输入交易编号', trigger: 'blur' }],
        eName: [{ required: true, message: '请选择设备', trigger: 'blur' }],
        cmNo: [{ required: true, message: '请选择计费方式', trigger: 'blur' }],
        customerName: [{ required: true, message: '请选择客户', trigger: 'blur' }],
        rentBeginDate: [{ required: true, message: '请选择租借开始日期', trigger: 'blur' }],
        rentEndDate: [{ required: true, message: '请选择租借结束日期', trigger: 'blur' }]
      },
      tableVisible: false,
      titleType: 0
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device
    },
    dialogVisible: {
      get() {
        return this.isdialogShow
      },
      set(val) {
        this.$emit('update:isdialogShow', val)
      }
    },
    submitStatus() {
      return this.dialogTitle === '添加' ? 'add' : 'update'
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          this._handleSubmit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    _handleSubmit() {
      const parmas = Object.assign({}, this.dialogFormData)

      if (parmas.rentEndDate <= parmas.rentBeginDate) {
        this.$message.error('租借开始时间要大于租借结束时间')
        return false
      }
      if (this.submitStatus === 'add') {
        addRentMessage(parmas).then(() => {
          this.$message.success('添加成功')
        })
      } else {
        updateRentMessage(parmas).then((res) => {
          this.$message.success('修改成功')
        })
      }
      this.dialogVisible = false
      this.$emit('reload')
    },
    getSelect(val) {
      console.log(val)
      if (val.type === 0) {
        this.dialogFormData.eName = val.data.eName
        this.dialogFormData.eId = val.data.eId
      }
      if (val.type === 1) {
        this.dialogFormData.cmNo = val.data.cmNo
      }
      if (val.type === 2) {
        this.dialogFormData.customerName = val.data.customerName
        this.dialogFormData.customerNo = val.data.customerNo
      }
      this.handleTabelCancel()
    },
    handleSelete(type) {
      this.tableVisible = true
      this.dialogVisible = false
      this.titleType = type
    },
    handleTabelCancel() {
      this.tableVisible = false
      this.dialogVisible = true
    },
    handleReset() {
      this.$refs.dialogForm.resetFields()
    }
  }
}
</script>
