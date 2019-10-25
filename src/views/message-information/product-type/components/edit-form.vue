<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :fullscreen="device === 'mobile'"
      :close-on-click-modal="false"
      width="750px">
      <el-form ref="dialogForm" :model="dialogFormData" label-width="70px" label-position="left">
        <el-row :gutter="27">
          <el-col :span="12">
            <el-form-item label="编号" prop="proId">

              <el-input
                v-model="dialogFormData.proId"
                :disabled="submitStatus == 'update'"
                placeholder=""/>

            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="名称" prop="proName">

              <el-input
                v-model="dialogFormData.proName"
                placeholder=""/>

            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="27">
          <el-col :span="12">

            <el-form-item label="规格" prop="proSize">

              <el-input
                v-model="dialogFormData.proSize"
                placeholder=""/>

            </el-form-item>
          </el-col>

          <el-col :span="12">

            <el-form-item label="类型" prop="proType">

              <el-input
                v-model="dialogFormData.proType"
                placeholder=""/>

            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="27">
          <el-col :span="12">

            <el-form-item label="材质" prop="proMaterial">

              <el-input
                v-model="dialogFormData.proMaterial"
                placeholder=""/>

            </el-form-item>
          </el-col>

          <el-col :span="12">

            <el-form-item label="长度" prop="proLength">

              <el-input
                v-model="dialogFormData.proLength"
                placeholder=""/>

            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="27">
          <el-col :span="12">

            <el-form-item label="理论重量" prop="proWeightStd">

              <el-input
                v-model="dialogFormData.proWeightStd"
                placeholder=""/>

            </el-form-item>
          </el-col>

          <el-col :span="12">

            <el-form-item label="实际重量" prop="proWeightActual">

              <el-input
                v-model="dialogFormData.proWeightActual"
                placeholder=""/>

            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="handleSubmit">确定</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { notifySuccess } from '@/utils/notify.js'
import { addProductType, updateProductType } from '@/api/message-information/product-type'
export default {
  name: 'FormDialog',
  props: {
    isdialogShow: {
      default: false,
      type: Boolean
    },
    // eslint-disable-next-line vue/require-default-prop
    dialogTitle: {
      type: String
    },
    // eslint-disable-next-line vue/require-default-prop
    dialogFormData: {
      type: Object
    }
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device
    },
    username() {
      return sessionStorage.getItem('username').split('"').join('')
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
        addProductType(parmas).then(() => {
          notifySuccess('添加成功')
        })
      } else {
        updateProductType(parmas).then((res) => {
          notifySuccess('修改成功')
        })
      }
      this.dialogVisible = false
      this.$emit('reload')
    },
    handleReset() {
      this.$refs.dialogForm.resetFields()
    }
  }
}
</script>
