<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :fullscreen="device === 'mobile'"
      :close-on-click-modal="false">
      <el-form ref="dialogForm" :model="dialogFormData" :rules="rules" label-width="80px" label-position="left">
        <el-form-item label="锁机策略" prop="lrNo">

          <el-input
            v-model="dialogFormData.lrNo"
            :disabled="titleType === 1 "
            placeholder=""/>

        </el-form-item>

        <el-form-item label="锁机名称" prop="lrName">

          <el-input
            v-model="dialogFormData.lrName"
            placeholder=""/>

        </el-form-item>

        <el-form-item label="锁机金额" prop="lrTotal">

          <el-input
            v-model="dialogFormData.lrTotal"
            placeholder=""/>

        </el-form-item>

        <el-form-item label="锁机天数" prop="lrUnit">

          <el-input
            v-model="dialogFormData.lrUnit"
            placeholder=""/>

        </el-form-item>

        <el-form-item label="锁机类型" prop="lrType">

          <el-radio-group v-model="dialogFormData.lrType">
            <el-radio :label="1">按量</el-radio>
            <el-radio :label="2">按天</el-radio>
            <el-radio :label="3">其他</el-radio>
          </el-radio-group>

        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button type="primary" size="mini" @click="handleSubmit">确定</el-button>
        <el-button size="mini">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { notifySuccess } from '@/utils/notify.js'
import { addLockRule, updateLockRule } from '@/api/rentmanager/lock-rule'
export default {
  name: 'LockRuleEdit',
  components: {},
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
      rules: {
        lrNo: [{ required: true, message: '请输入锁机策略', trigger: 'blur' }],
        lrName: [{ required: true, message: '请输入锁机名称', trigger: 'blur' }],
        lrUnit: [{ required: true, message: '请输入锁机天数', trigger: 'blur' }],
        lrTotal: [{ required: true, message: '请输入锁机金额', trigger: 'blur' }]
      }
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
          this._handleSubmit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    _handleSubmit() {
      const parmas = Object.assign({}, this.dialogFormData)
      if (this.titleType === 0) {
        addLockRule(parmas).then(res => {
          notifySuccess('添加成功')
          this.$emit('reload')
        })
      }

      if (this.titleType === 1) {
        updateLockRule(parmas).then(res => {
          notifySuccess('编辑成功')
          this.$emit('reload')
        })
      }
    }
  }
}
</script>
