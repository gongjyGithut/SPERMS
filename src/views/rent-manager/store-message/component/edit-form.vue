<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :fullscreen="device === 'mobile'"
      :close-on-click-modal="false">
      <el-form ref="dialogForm" :model="dialogFormData" :rules="rules" label-width="80px" label-position="left">
        <el-form-item label="仓库编号" prop="storeId">

          <el-input
            v-model="dialogFormData.storeId"
            :disabled="titleType === 1 "
            placeholder=""/>

        </el-form-item>

        <el-form-item label="仓库名称" prop="storeName">

          <el-input
            v-model="dialogFormData.storeName"
            placeholder=""/>

        </el-form-item>

        <el-form-item label="所在区域" prop="storePlace">

          <el-input
            v-model="dialogFormData.storePlace"
            placeholder=""/>

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
import { addStoreMessage, updateStoreMessage } from '@/api/rent-manager/store-message'
export default {
  name: 'EditForm',
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
        storeId: [{ required: true, message: '请输入仓库编号', trigger: 'blur' }],
        storeName: [{ required: true, message: '请输入仓库名称', trigger: 'blur' }],
        storePlace: [{ required: true, message: '请输入所在区域', trigger: 'blur' }]

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
          return false
        }
      })
    },
    _handleSubmit() {
      const parmas = Object.assign({}, this.dialogFormData)
      if (this.titleType === 0) {
        addStoreMessage(parmas).then(res => {
          notifySuccess('添加成功')
          this.$emit('reload')
        })
      }

      if (this.titleType === 1) {
        updateStoreMessage(parmas).then(res => {
          notifySuccess('编辑成功')
          this.$emit('reload')
        })
      }
    }
  }
}
</script>
