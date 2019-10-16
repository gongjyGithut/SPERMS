<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :fullscreen="device === 'mobile'"
      :close-on-click-modal="false"
      width="700px">
      <el-form :model="dialogFormData" label-width="90px" label-position="left" >
        <el-row :gutter="27">
          <el-col :span="12">
            <el-form-item label="设备编号" prop="eId">
              <el-input
                v-model="dialogFormData.eId"
                disabled
                placeholder="请选择设备">
                <el-button slot="append" :disabled="dialogTitle !== '添加'" @click="getDevList">选择</el-button>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="设备名称" prop="eName">
              <el-input
                v-model="dialogFormData.eName"
                :disabled="true"
                style=""
                placeholder="请选择设备"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="27">
          <el-col :span="12" prop="rCost">
            <el-form-item label="维修费用">
              <el-input
                v-model.number="dialogFormData.rCost"
                placeholder=""/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="维修厂家" prop="rManufacturer">
              <el-input
                v-model="dialogFormData.rManufacturer"
                placeholder=""/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="27">
          <el-col :span="12">
            <el-form-item label="维修负责人" prop="rPerson">
              <el-input
                v-model="dialogFormData.rPerson"
                placeholder=""/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="维修时间" prop="rTime">
              <el-date-picker
                v-model="dialogFormData.rTime"
                :picker-options="pickerOptions"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="维修状态">

          <el-radio-group v-model="dialogFormData.rState">
            <el-radio :label="0" >维修完成</el-radio>
            <el-radio :label="1" >未维修</el-radio>
          </el-radio-group>

        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="handleSubmit">确定</el-button>
        <el-button>重置</el-button>
      </div>
    </el-dialog>

    <select-equitment v-if="devListDialogShow" :dev-list-dialog-show.sync="devListDialogShow" @back="devListDialogBack" @select="handlSelect" @cancel="handleCancel"/>
  </div>
</template>

<script>
import SelectEquitment from './select-equitment'
import { addRepair, updateRepair } from '@/api/equitment-manager/repair'
import { notifySuccess, notifyWarning } from '@/utils/notify.js'
import { validNumber } from '@/utils/validate'
export default {
  name: 'EditForm',
  components: { SelectEquitment },
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
      devListDialogShow: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      formRules: {
        eId: [{ required: true, message: '请选择设备', trigger: 'blur' }],
        eName: [{ required: true, message: '请选择设备', trigger: 'blur' }]

      }
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
        console.log(val)
        this.$emit('update:isdialogShow', val)
      }
    },
    submitStatus() {
      return this.dialogTitle === '添加' ? 'add' : 'update'
    }
  },
  methods: {
    getDevList() {
      this.dialogVisible = false
      this.devListDialogShow = true
    },
    handleSubmit() {
      const parmas = Object.assign({}, this.dialogFormData)
      if (!parmas.eId) {
        notifyWarning('请选择设备')
        return false
      }
      if (!parmas.rCost) {
        notifyWarning('请输入维修费用')
        return false
      }
      if (!validNumber(parmas.rCost)) {
        notifyWarning('维修费用为数字')
        return false
      }
      if (!parmas.rTime) {
        notifyWarning('请选择维修时间')
        return false
      }
      if (this.submitStatus === 'add') {
        addRepair(parmas).then((res) => {
          this.$message.info(res.resultMsg)
        })
      } else {
        updateRepair(parmas).then((res) => {
          notifySuccess('编辑成功')
        })
      }
      this.$emit('reload')
      this.dialogVisible = false
    },
    handlSelect(row) {
      const { eId, eName } = row[0]
      this.dialogFormData.eId = eId
      this.dialogFormData.eName = eName
      this.handleCancel()
    },
    handleCancel() {
      this.dialogVisible = true
      this.devListDialogShow = false
    },
    devListDialogBack() {
      this.dialogVisible = true
      this.devListDialogShow = false
    }
  }
}
</script>
