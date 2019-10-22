<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :fullscreen="device === 'mobile'"
      :close-on-click-modal="false"
      width="720px">
      <el-form :model="dialogFormData" :rules="formRule" label-position="left" label-width="80px">
        <el-row :gutter="27">
          <el-col :span="12">
            <el-form-item label="设备编号" prop="eId">
              <el-input
                :disabled="dialogTitle === '编辑'"
                v-model="dialogFormData.eId"
                placeholder=""/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="设备名称" prop="eName">
              <el-input
                v-model="dialogFormData.eName"
                placeholder=""/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="27">
          <el-col :span="12">
            <el-form-item label="GPS经度" prop="eLongitude">
              <el-input
                v-model="dialogFormData.eLongitude"
                placeholder=""/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="GPS纬度" prop="eLatitude">
              <el-input
                v-model="dialogFormData.eLatitude"
                placeholder=""/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="27">
          <el-col :span="12">
            <el-form-item label="生产厂家" prop="eManufacturer">
              <el-input
                v-model="dialogFormData.eManufacturer"
                placeholder=""/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="生产日期" prop="eDate">
              <el-date-picker
                v-model="dialogFormData.eDate"
                :picker-options="pickerOptions"
                style="width:250px;"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="27">
          <el-col :span="12">
            <el-form-item label="规格" prop="eStandard">
              <el-input
                v-model="dialogFormData.eStandard"
                placeholder=""/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="类型" prop="eType">
              <el-input
                v-model="dialogFormData.eType"
                style="width:100%"
                placeholder=""/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="应用授权" prop="eEnable">
          <el-radio-group v-model="dialogFormData.eEnable">
            <el-radio :label="0">关停</el-radio>
            <el-radio :label="1">正常使用</el-radio>
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
import { notifySuccess } from '@/utils/notify.js'
import { addEq, updateEq } from '@/api/equitment-manager/message'
export default {
  name: 'FormDialog',
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      formRule: {
        eId: [{ required: true, message: '请输入设备编号', trigger: 'blur' }]
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
        this.$emit('update:isdialogShow', val)
      }
    },
    submitStatus() {
      return this.dialogTitle === '添加' ? 'add' : 'update'
    }
  },
  methods: {
    handleSubmit() {
      const parmas = Object.assign({}, this.dialogFormData)
      if (this.submitStatus === 'add') {
        addEq(parmas).then((res) => {
          notifySuccess('添加成功')
        })
      } else {
        updateEq(parmas).then((res) => {
          notifySuccess('编辑成功')
        })
      }
      this.dialogVisible = false
      this.$emit('reload')
    }
  }
}
</script>
