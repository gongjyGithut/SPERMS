<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :fullscreen="device === 'mobile'"
      :close-on-click-modal="false"
      width="500px">
      <el-form :model="dialogFormData" label-width="90px" label-position="left" >
        <el-form-item label="设备编号">

          <el-input
            v-model="dialogFormData.eId"
            :disabled="true"
            placeholder="请选择设备"/>
          <el-button v-show="dialogTitle === '添加'" @click="getDevList">选择</el-button>
        </el-form-item>

        <el-form-item label="设备名称">

          <el-input
            v-model="dialogFormData.eName"
            :disabled="true"
            style=""
            placeholder="请选择设备"/>

        </el-form-item>

        <el-form-item label="维修费用">

          <el-input
            v-model.number="dialogFormData.rCost"
            placeholder=""/>

          <span>/万</span>

        </el-form-item>

        <el-form-item label="维修厂家">

          <el-input
            v-model="dialogFormData.rManufacturer"
            placeholder=""/>

        </el-form-item>

        <el-form-item label="维修负责人" >

          <el-input
            v-model="dialogFormData.rPerson"
            placeholder=""/>

        </el-form-item>

        <el-form-item label="维修时间">

          <el-date-picker
            v-model="dialogFormData.rTime"
            :picker-options="pickerOptions"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"/>

        </el-form-item>

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

    <dev-list-dialog v-if="devListDialogShow" :dev-list-dialog-show.sync="devListDialogShow" @back="devListDialogBack" @select="handlSelect"/>
  </div>
</template>

<script>
import devListDialog from '../devListDialog'
import { addRepair, updateRepair } from '@/api/equitment-manager/repair'
import { validNumber } from '@/utils/validate'
export default {
  name: 'OperateDialog',
  components: { devListDialog },
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
      this.devListDialogShow = true
    },
    handleSubmit() {
      const parmas = Object.assign({}, this.dialogFormData)
      if (!parmas.eId) {
        this.$message.error('请选择设备')
        return false
      }
      if (!parmas.rCost) {
        this.$message.error('请输入维修费用')
        return false
      }
      if (!validNumber(parmas.rCost)) {
        this.$message.error('维修费用为数字')
        return false
      }
      if (!parmas.rTime) {
        this.$message.error('请选择维修时间')
        return false
      }
      if (this.submitStatus === 'add') {
        addRepair(parmas).then((res) => {
          this.$message.info(res.resultMsg)
        })
      } else {
        updateRepair(parmas).then((res) => {
          this.$message.success('修改成功')
        })
      }
      this.$emit('reload')
      this.dialogVisible = false
    },
    handlSelect(row) {
      const { eId, eName } = row[0]
      this.dialogFormData.eId = eId
      this.dialogFormData.eName = eName
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
