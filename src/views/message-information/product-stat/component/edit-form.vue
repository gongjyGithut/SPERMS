<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :fullscreen="device === 'mobile'"
      :close-on-click-modal="false"
      width="400px">
      <el-form ref="dialogForm" :model="dialogFormData" :rules="rules" label-width="80px" label-position="left">
        <el-form-item label="设备编号" prop="eId">

          <el-input
            v-model="dialogFormData.eId"
            :disabled="true"
            placeholder="">

            <el-button slot="append" :disabled="title === '编辑'" @click="handleSelect(0)">选择</el-button>
          </el-input>
        </el-form-item>

        <el-form-item label="类型" prop="proId">

          <el-input
            v-model="dialogFormData.proId"
            :disabled="true"
            placeholder="">

            <el-button slot="append" :disabled="title === '编辑'" @click="handleSelect(1)">选择</el-button>
          </el-input>
        </el-form-item>

        <el-form-item label="开始日期" prop="psDate">

          <el-date-picker
            v-model="dialogFormData.psDate"
            :picker-options="pickerOptions"
            type="date"
            placeholder=""
            style="width:100%"
            value-format="yyyy-MM-dd HH:mm:ss"/>

        </el-form-item>

        <el-form-item label="结束日期" prop="psEndDate">

          <el-date-picker
            v-model="dialogFormData.psEndDate"
            :picker-options="pickerOptions"
            type="date"
            style="width:100%"
            placeholder=""
            value-format="yyyy-MM-dd HH:mm:ss"/>

        </el-form-item>

        <el-form-item label="产量" prop="psMount">

          <el-input
            v-model="dialogFormData.psMount"
            placeholder=""/>

        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" @click="handleSubmit">确定</el-button>
        <el-button >重置</el-button>
      </div>
    </el-dialog>

    <select-equitment :table-visible.sync="tableVisible" @cancel="handleCancel" @select="handleSelectEq"/>
    <select-type :type-visible.sync="typeVisible" @cancel="handleTypeCancel" @select="handleSelectType"/>
  </div>
</template>
<script>
import { notifySuccess, notifyWarning } from '@/utils/notify.js'
import { addProductStat, updateProductStat } from '@/api/message-information/product-stat'
import SelectEquitment from './select-equitment'
import SelectType from './select-type'
import { validNumber } from '@/utils/validate'
export default {
  name: 'ProductStatEdit',
  components: { SelectEquitment, SelectType },
  props: {
    editShow: {
      type: Boolean,
      default: false
    },
    titleType: {
      type: Number,
      default: 0
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
      titleMap: ['添加', '编辑'],
      tableVisible: false,
      rules: {
        eId: [{ required: true, message: '请选择设备', trigger: 'blur' }],
        proId: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        psDate: [{ required: true, message: '请选择日期', trigger: 'blur' }],
        psEndDate: [{ required: true, message: '请选择日期', trigger: 'blur' }],
        psMount: [{ required: true, message: '请输入产量数', trigger: 'blur' }]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      typeVisible: false
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device
    },
    dialogVisible: {
      get() {
        return this.editShow
      },
      set(val) {
        this.$emit('update:editShow', val)
      }
    },
    title() {
      return this.titleMap[this.titleType]
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          if (this.dialogFormData.psDate > this.dialogFormData.psEndDate) {
            notifyWarning('开始时间不能大于结束时间')
            return false
          }
          if (!validNumber(this.dialogFormData.psMount)) {
            notifyWarning('产量为数值')
            return false
          }
          this._handleSubmit()
        } else {
          return false
        }
      })
    },
    _handleSubmit() {
      const parmas = Object.assign({}, this.dialogFormData)
      if (this.titleType === 0) {
        addProductStat(parmas).then(res => {
          notifySuccess('添加成功')
          this.$emit('reload')
        })
      }

      if (this.titleType === 1) {
        updateProductStat(parmas).then(res => {
          notifySuccess('编辑成功')
          this.$emit('reload')
        })
      }
    },
    handleSelectEq(data) {
      this.dialogFormData.eId = data.eId
      this.handleCancel()
    },
    handleSelect(type) {
      if (+type === 1) {
        this.typeVisible = true
      } else {
        this.tableVisible = true
      }
      this.dialogVisible = false
    },
    handleCancel() {
      this.tableVisible = false
      this.dialogVisible = true
    },
    handleSelectType(data) {
      this.dialogFormData.proId = data.proId
      this.handleTypeCancel()
    },
    handleTypeCancel() {
      this.typeVisible = false
      this.dialogVisible = true
    }
  }
}
</script>
