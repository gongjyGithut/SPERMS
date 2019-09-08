<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :fullscreen="device === 'mobile'"
      :close-on-click-modal="false">
      <el-form ref="dialogForm" :model="dialogFormData" label-width="80px" label-position="left">
        <el-form-item label="计费编号" prop="cmNo">

          <el-input
            v-model="dialogFormData.cmNo"
            :disabled="submitStatus == 'update'"
            placeholder=""/>

        </el-form-item>

        <el-form-item label="费用" prop="cmFee">
          <el-input
            v-model="dialogFormData.cmFee"
            placeholder=""/>
        </el-form-item>

        <el-form-item label="计费方式" prop="cmDay">

          <el-radio-group v-model="dialogFormData.cmDay">
            <el-radio :label="1" >按天</el-radio>
            <el-radio :label="2" >按量</el-radio>
            <el-radio :label="3" >其他</el-radio>
          </el-radio-group>

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
import { addCaculation, updateCaculation } from '@/api/rentmanager/caculation'
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
      const caculationParmas = Object.assign({}, this.dialogFormData)

      if (this.submitStatus === 'add') {
        addCaculation(caculationParmas).then(() => {
          this.$message.success('添加成功')
        })
      } else {
        updateCaculation(caculationParmas).then((res) => {
          this.$message.success('修改成功')
        })
      }
      this.dialogVisible = false
      this.$emit('reload')
    },
    handleReset() {
      // console.log(this.$refs.dialogForm)
      this.$refs.dialogForm.resetFields()
    }
  }
}
</script>
