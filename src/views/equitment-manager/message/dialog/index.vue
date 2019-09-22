<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :fullscreen="device === 'mobile'"
      :close-on-click-modal="false">
      <el-form :model="dialogFormData" label-width="80px" label-position="left">
        <el-form-item label="设备编号">

          <el-input
            v-model="dialogFormData.eId"
            style=""
            placeholder=""/>

        </el-form-item>

        <el-form-item label="设备名称">

          <el-input
            v-model="dialogFormData.eName"
            placeholder=""/>

        </el-form-item>

        <el-form-item label="生产厂家">

          <el-input
            v-model="dialogFormData.eManufacturer"
            placeholder=""/>

        </el-form-item>

        <el-form-item label="生产日期">

          <el-date-picker
            v-model="dialogFormData.eDate"
            :picker-options="pickerOptions"
            style="width:250px;"
            type="datetime"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"/>

        </el-form-item>

        <el-form-item label="规格">

          <el-input
            v-model="dialogFormData.eStandard"
            placeholder=""/>

        </el-form-item>

        <el-form-item label="类型">

          <el-input
            v-model="dialogFormData.eType"
            placeholder=""/>
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
          this.$message.success('添加成功')
        })
      } else {
        updateEq(parmas).then((res) => {
          this.$message.success('修改成功')
        })
      }
      this.dialogVisible = false
      this.$emit('reload')
    }
  }
}
</script>
