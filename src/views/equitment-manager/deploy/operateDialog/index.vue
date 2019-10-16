<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      :fullscreen="device === 'mobile'"
      :close-on-click-modal="false"
      width="500px">
      <el-form :model="dialogFormData" label-width="80px" label-position="left">
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

        <el-form-item label="设备状况">

          <el-input
            v-model="dialogFormData.eeCondition"
            placeholder=""/>

        </el-form-item>

        <el-form-item label="GPS经度">

          <el-input
            v-model="dialogFormData.eeLongitude"
            placeholder=""/>

        </el-form-item>

        <el-form-item label="GPS纬度">

          <el-input
            v-model="dialogFormData.eeLatitude"
            placeholder=""/>

        </el-form-item>

        <el-form-item label="应用授权">

          <el-radio-group v-model="dialogFormData.eeEnable">
            <el-radio :label="0" >关停</el-radio>
            <el-radio :label="1" >正常使用</el-radio>
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
import { addEqEnable, updateEqEnable } from '@/api/equitment-manager/deploy'
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
      default: '添加'
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
      devListDialogShow: false
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
    getDevList() {
      this.devListDialogShow = true
    },
    handleSubmit() {
      const parmas = Object.assign({}, this.dialogFormData)

      if (this.submitStatus === 'add') {
        if (!parmas.eId) {
          this.$message.error('请选择设备')
          return false
        }
        if (!parmas.eeLatitude || !parmas.eeLongitude) {
          this.$message.error('请输入经纬度')
          return false
        }
        addEqEnable(parmas).then((res) => {
          this.$message.info(res.resultMsg)
        })
      } else {
        updateEqEnable(parmas).then((res) => {
          this.$message.success('编辑成功')
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
